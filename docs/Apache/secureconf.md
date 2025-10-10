---
sidebar_position: 4
---

# Configuration sécuriser

### Générer un certificat SSL

```bash
sudo dnf install openssl
```

#### Générer une clé privé

```bash
openssl genrsa -out /etc/pki/tls/private/macle.key
```

#### Créer un fichier template

Exemple: Je veux certifier les sites: `secure.monsite.domaine` et `site_https.monsite.domaine`
Créer le fichier `vim fic_reponse.conf`

```conf
[ req ]
prompt = no
distinguished_name = dn
req_extensions = req_ext
[ dn ]

CN = secure.monsite.domaine # URL ou nom du site
O = etnc # Nom de l’organisation
L = CSN # Nom de la ville
ST = BZH # Nom de la région
C = FR # Code du pays
[ req_ext ]
subjectAltName = DNS: secure.monsite.domaine, DNS: site_https.monsite.domaine,
IP = <IP> # Ligne a supprimer si pas utilisé
```

### Générer ma demande de certificat

Grâce au fichier `fic_reponse.conf`

```bash
openssl req -key /etc/pki/tls/private/macle.key -new -sha256 -out mondomaine.csr -config fic_reponse.conf
```

Vérifier la demande de certificat
```bash
opensssl req -text -noout -verify -in mondomaine.csr
```

#### Téléverser ma demande de certificat

Téléverser la demande de certificat auprès de ton autorité de certification.

:::tip Astuce
En cas d'export difficile, il est possible d'afficher notre demande grâce à `cat mondomaine.csr`. Copier, puis créer le fichier sur la machine pouvant téléverser le fichier.
:::

#### Récupérer et importer le certificat

Si tout ce passe bien, le certificat est disponible et téléchargeable au format `.crt`

Copier le certificat dans 
```bash
/etc/pki/tls/certs/<mon_certificat>.crt
```
:::tip Astuce
En cas d'import difficile, il est possible d'afficher notre certificat, il suffit `D'ouvrir avec...` `Notepad.exe`. Copier, puis créer le fichier sur le serveur Apache.
:::

### Utiliser HTTPS pour son site

Installer le module SSL
```bash
sudo dnf install mod_ssl
```
Autoriser les accès au pare-feu
```bash
sudo firewall-cmd --add-service=https --permanent

sudo firewall-cmd --reload
```

:::tip Information
L'installation du module ajoute automatiquement `Listen 443` dans le fichier de configuration
:::

Dans le fichier de configuration de votre site (`/etc/httpd/conf.d/monsite.conf`), ajouter les entrées suivante: 


```conf
<VirtualHost IP_INT_de_votre_serveur:443>
    ServerName secure.monsite.domaine
    ServerAlias site_https.monsite.domaine

    SSLEngine on
    SSLCertificateFile /etc/pki/tls/certs/<mon_certificat>.crt
    SSLCertificateKeyFile /etc/pki/tls/private/macle.key


    DocumentRoot /var/www/html/MonSite
    DirectoryIndex IndexMonSite.htm
    <Directory /var/www/html/MonSite>
        Require all granted
    </Directory>
</VirtualHost>
```

Redémarer le service Apache[^1]

- [ ] Vérifier la bonne résolution DNS 
- [ ] Vérifier que le port `443` est indiqué dans l'entête `<VirtualHost>`
- [ ] Vérifier que le certificat (`.crt`) et la clé privée (`.key`) soit présent
- [ ] Vérifier que `ServerName` et `ServerAlias` corresponde au données du certificat

[^1]: `sudo systemctl restart httpd`