---
sidebar_position: 2
slug: config
---

# Configuration

Fichier de configuration
```bash
sudo vim /etc/httpd/conf/httpd.conf
```

#### Afficher le servers-status
Affiche le status serveur uniquement pour une station.
```conf
<Location /server-status>
    SetHandler server-status
    Require all denied
    Require ip ip_de_votre_sation_admin
</Location>
```

#### Afficher le servers-info

Affiche le server info uniquement pour une station.
```conf
    <Location /server-info>
    SetHandler server-info
    Require all denied
    Require ip ip_de_votre_sation_admin
    </Location>
```
#### Configurer adresse mail Webmaster

Aussi disponible dans Virtual host
```
ServerAdmin monmail@test.fr
```
#### Garder les connexion cliente
```conf
KeepAlive On
KeepAliveTimeOut 10
```