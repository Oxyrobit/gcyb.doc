---
title: TP Synthèse
sidebar_position: 10
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Configuration de l'ACI

### Récupération du certificat racine
Sur l'**ACR**, récupérer les fichiers `ACR-CYBER.crt` et `ACR-CYBER.crl` dans `C:\Windows\System32\CertSrv\CertEnroll` et les copiers dans le dossier partage.

Renommer le fichier **ACR-CYBER_ACR-CYBERX** en **ACR-CYBER**

:::info Configuré la durée de vie d'un certificat
```cmd
certutils.exe -setreg CA\ValidityPeriodUnits 10
```
:::

### Diffusé le certificat via GPO

Sur l**ACI** (ou Domain Controller)

<Tabs>
  <TabItem value="exec" label="Win+R" default>

```cmd
gpmc.msc
```
  </TabItem>
</Tabs>

Créer la GPO `Deploiement_crt_ACR`

`Configuration Ordinateur` -> `Stratégies` -> `Paramètres Windows` -> `Paramètres de sécurité` -> `Stratégies de clé publique` -> `Autorité de certification de racine de confiance`

Importer le certificat **ACR-CYBER** et attendre le message "L'importation a reussi."

### Installation du rôle Adcs-Cert-Authority

*Ce rôle permet de configurer notre ACI*

<Tabs>
  <TabItem value="exec" label="powershell" default>

```powershell
Add-WindowsFeature Adcs-Cert-Authority -IncludeManagementTools
```
  </TabItem>
</Tabs>

Une fois l'installation terminé, **terminé la configuration** dans la Gestion du serveur.
- [ ] Selectionner `Autorité de certification`, **Suivant**
- [ ] `Autorité de certification d'entreprise`, **Suivant**
- [ ] `Autorité de certification secondaire`, **Suivant**
- [ ] `Créer une clé privée`, **Suivant**
- [ ] Option `RSA#Microsoft Sofware Key...` (par defaut), 2048, `SHA256, `**Suivant**
- [ ] Nom de l'AC  `ACI-CYBER`, `**Suivant**
- [ ] Enregistrer la **Demande de certificat** (laisser par défaut), `**Suivant**
- [ ] Base de donnée, `**Suivant**
- [ ] Confirmation, `**Configurer**
- [ ] Resultats (Si il y a un avertissemet c'est normal), `**Fermer**

**Copier** le fichier de requête dans le **dossier partagé**

### Générer le certificat de l'ACI

Depuis l'**ACR-CYBER**

Ouvrir la console d'**Autorité de Certification** (`certsrv.msc`)
- [ ] Soumettre une nouvelle demande
- [ ] Selectionner la requête précédament copier dans le dossier partagé
- [ ] Délivré le certificat dans `Demande en attente`
- [ ] Dans `Certificat délivrés`, **Ouvrir** le certificat, et le copier dans un fichier
- [ ] Copier au format `Certificats PKCS #7 (.P7B)` et coché la case `Inclure touts les certificats...`
- [ ] Enregistrer dans le **dossier partagé**

### Importer le certificat de l'ACI

Depuis l'**ACI-CYBER**

Ouvrir la console d'**Autorité de Certification** (`certsrv.msc`)

- [ ] Installer un certificat d'autorité de certification...
- [ ] Importer le fichier `.p7b`
- [ ] Démarer le service

:::warning Message d'erreur
Executer le fichier `.bat` en tant qu'administrateur (clic droit)
:::

**Relancer le service**.

**Eteindre l'ACR-CYBER** (les fichiers important sont déjà dans le **dossier partagé**).


## Installation du Service d'Inscription

Depuis l'**ACI-CYBER**

*Le site qui permet de faire les demandes de certificats*

<Tabs>
  <TabItem value="exec" label="powershell" default>

```powershell
Add-WindowsFeature Adcs-Web-Enrollment -IncludeManagementTools
```
  </TabItem>
</Tabs>

Puis:

```powershell
Install-AdcsWebEnrollment -confirm:$False
```

**Redémarer le serveur**

Dans le **Gestionnaire des services internet(IIS)**
- [ ] **Default Web Site**, modifier les liaisons
- [ ] **Ajouter**, `https` `<ADRESSE IP>` `443`,
- [ ] Nom de l'hôte, `ad-aci-cyber.cyber.xxx`, Cocher `Exiger l'indication..`
- [ ] Certificat SSL, `AD-ACI-CYBER.cyber.xxx`, Cocher `Exiger l'indication..`
- [ ] Valider et **Redemarer le site**

Dans l'onglet **Paramètre SSL**

- Exiger SSL, puis **Appliquer**
- Redémarer le site


Tentez d'y accéder depuis la `Windows 10`

`https://ad-aci-cyber.cyber.xxx/certsrv`, Login `Administrateur`


8. Sur Admin linux créer le .rand et clé genrsa pour le site
8.1 Générer la demande et transmettre via le site
Recuperer le certificat en base64 et le mettre dans srv apache /etc/ssl/certs/.
transmettre aussi la clé privée au srv apache dans /etc/ssl/privates
mettre les bon droit `chown root:ssl-cert /etc/ssl/site.vert.key` et `chmod 640 /etc/ssl/private/site-vert.key`
faire la conf apache
active mod ssl, active site
vérifier bon fonctionnement 

Sur W10:
créer certificat client `certmgr.msc` puis en profiter pour l'exporter au format pkcs12

Sur APACHE:
Activer vérif client.
verifier que les certificat soit en base64, sinon l'ouvrir dans windows et `copier dans un fichier`
importer les crt ACR et ACI dans `/usr/local/share/ca-certificates/` et executer `ca-certifi[TAB] --fresh`
redemarer apache