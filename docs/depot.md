---
sidebar_position: 3
---
# Paquets et depôt

## Intérroger la base de données des logiciels

```bash
sudo rpm -qa # Liste tous les paquets installés
sudo rmp -qi tree # Affiche les informations du paquet
```
## Installer un paquet via rpm

```bash
sudo rpm -ivh /chemin/paquet.rpm # Installer le paquet -U : Met à jour un paquet déjà installé
sudo rpm -e paquet # Désinstaller 
```

## Configurer un depôt

#### Désactivation du message de subscription-manager
```bash
sudo vim /etc/yum/pluginconf.d/subscription-manager.conf

[main]
enabled=0
```
#### Ajouter un dépot
Dans `/etc/yum.repos.d/` créer un fichier avec l'extention `.repo`
```bash
[depotESI]
name=Le dépôt des ESI
baseurl=http://linux-depots.internet.comsic/depot
enabled=1
gpgcheck=0
```