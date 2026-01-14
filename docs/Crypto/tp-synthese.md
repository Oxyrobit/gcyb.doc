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

## Sécuriser site vert

Depuis l'**Station Administration**


```bash
sudo su -
```

Modifier `/etc/hosts`

```bash
vim /etc/hosts

# Ajouter 
#<IP de ACI-CYBER> ad-aci-cyber.cyber.xxx
192.168.56.5 ad-aci-cyber.cyber.xxx
```

```bash
cd /etc/ssl
```

**Création du fichier random**
```bash
dd if=/dev/urandom of=private/.rand bs=1k count=16
```

**Génération de la clé privée**
```
openssl genrsa -out private/SITE-VERT.key -rand private/.rand 4096
```

**Créer la requête**
```
openssl req -new -config 4_Modele_pour_requete_SITE -key private/SITE-VERT.key --addext "subjectAltName = DNS:vert.cyber.xxx" -out /media/sf_PartageVbox/SITE-VERT.req
```

*La requête est directement enregistrer dans le *dossier partagé*

### Génération du certificat pour le site vert

- [ ] Copier le contenu du fichier `media/sf_PartageVbox/SITE-VERT.req`
- [ ] Importer le certificat `ACR-CYBER.crt` (et si necessaire `ACI-CYBER`) dans "Authority"
- [ ] Se rendre sur `https://ad-aci-cyber.cyber.xxx/certsrv` (se connecter avec Administrateur) et Demander un certificat avancée
- [ ] Coller le contenu de la requete et séléctionner `Serveur Web` dans **Modèle de Certificat**, puis **Envoyer**
- [ ] **Télécharger** le certificat au format `base64`.

Renommer le certificat `SITE-VERT.crt` puis le déplacer dans le dossier `/media/sf_PartageVbox/`

**Exporter le certificat et sa clé privée.**

```bash
openssl pkcs12 -export -inkey /etc/ssl/private/SITE-VERT.key -in /media/sf_PartageVbox/SITE-VERT.crt -name "SITE-VERT" -out /media/sf_PartageVbox/SITE-VERT.pfx
```

### Configurer le site vert

Depuis **Serveur-linux**

```bash
sudo su -
```

Importer la clé privée et le certificat.

```bash
openssl pkcs12 -in /media/sf_PartageVbox/SITE-VERT.pfx -nokeys -out /etc/ssl/certs/SITE-VERT.crt
openssl pkcs12 -in /media/sf_PartageVbox/SITE-VERT.pfx -nocerts -out /etc/ssl/private/SITE-VERT.key
chown root:cert-ssl /etc/ssl/private/SITE-VERT.key
chmod 640 /etc/ssl/private/SITE-VERT.key
```

Modifier le fichier `/etc/apache2/sites-available/vert-ssl.conf`

Ajouter/Décommenter les lignes:

```bash
SSLCertificateFile /etc/ssl/certs/SITE-VERT.crt
SSLCertificateKeyFile /etc/ssl/private/SITE-VERT.key
```

**Sauvegarder** et quitter

Puis:
- Activer le module SSL `a2enmod ssl`
- Activer le site vert `a2ensite vert-ssl`
- Redemarer Apache2 `systemctl restart apache2`


Depuis la **Station Administration** 

- Vérifier que le site vert fonctionne en `https`

Depuis la **Windows 10**

:::warning
Vérifier les enregistrements DNS avant d'essayer. Dans la console DNS (ACI-CYBER), `vert` doit pointer vers l'adresse IP de `serveur-linux`
:::

- Vérifier que le site vert fonctionne en `https`

## Authentification Client

Depuis la **Windows 10**

Afficher le magasin de **Certificat utilisateur local** (`certmgr.msc`)

- [ ] Demander un nouveau certificat
- [ ] Cocher `Utilisateur`, puis **Détails** et **Propriétés**
- [ ] Activer la **protection de clé privée forte**

Un fois le certificat, on va l'exporter, il nous servira plus tard. 

Dans le Magasin Personnel/Certificats

- [ ] Exporter au format PKCS#12 (avec la clé privée) et l'exporter dans le **Dossier partagée** et nommée le `user1.pfx`

Convertir les certificats Binaire en base64

Se rendre dans le *Dossier partagé**

Ouvrir le certiciat `ACR-CYBER.crt` puis `Copier le fichier`. Et l'exporter au format `base64` avec le même nom

Faire la même chose avec `ACI-CYBER.crt`

Cette action permet de rendre visible les certificats par Linux.

:::warning
Bien activer les `Extensions de fichiers` dans l'explorateur Windows
:::

Depuis **Serveur-linux**

```bash
sudo su -
```

Importer les certificats dans le magasin linux

```bash
cp /media/sf_PartageVbox/AC*.crt /usr/local/share/ca-certificates/.
update-ca-certificates --fresh
```

Modifier le fichier `/etc/apache2/sites-available/vert-ssl.conf`

Ajouter/Décommenter les lignes:

```bash
#52
SSLCACertificateFile /etc/ssl/certs/ca-certificates.crt
#69
SSLVerifyClient require
#70
SSLVerifyDepth 2
```

Redemarer le service Apache2

```bash
systemctl restart apache2
```

### Vérification

Depuis la **Station Administration** 

- Importer le certificat Client (fichier `user1.pfx`)
- Vider les caches
- Vérifier que le site vert fonctionne en `https`

Depuis la **Windows 10** (edge)

- Vérifier que le site vert fonctionne en `https`