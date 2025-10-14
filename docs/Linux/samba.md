---
slug: samba
title: Samba
---

# Samba 4

## Installation

Installer Samba: 
```bash
sudo dnf install samba
```


Autoriser les accès au pare-feu
```bash
sudo firewall-cmd --add-service=samba --permanent

sudo firewall-cmd --reload
```

Démarrage automatique du service
```bash
sudo systemctl enable smb --now
```

Tester la configuration
```bash
sudo testparm
```
## Configuration

`/etc/samba/smb.conf`

### Configuration minimum
````
[global]
    netbios name = NOM_STAGIAIRE
    security = USER
    server string = Serveur de fichiers samba %v
    workgroup = ETNC
    hosts allow = 10.0.0.
````

Redemarer les service `smb` et `nmb`

```bash
sudo systemctl restart smb
sudo systemctl restart nmb
```

## Gestion des utilisateurs

#### Ajouter un utilisateur

Il est impératif de créer un utilisateur système **avant** de créer un utilisateur `smb`

```bash
sudo useradd -u <UID> -s /sbin/nologin <user>
```

Ensuite créer l'utilisateur avec `pdbedit`
```bash
pdbedit -a -u <user> -f "Nom Complet (facultatif)"
```
*Le mot de passe renseigné sera celui utilisateur par vos utilisateurs de Samba.*

**Actions sur l'utilisateur Samba dejà existant**
```bash
smbpasswd bob 
    -d Désactiver un compte
    -e reactiver un compte
    -a Ajout compte + mdp à la bdd
```

## SE Linux

Partager les répertoires de connexion des utilisateurs

```bash
setsebool -P samba_enable_home_dirs on
```

### Activer le partage de fichier

Créer un espace commun pour certains utilisateur

```bash
[partage]
    comment = Partage de fichier pour tous

    # Autorise l'écriture sur le partage
    writeable = yes

    # Chemin absolu
    path = /export/data

    # utilisateur, [user, groupe utilisateur systeme]
    valid users = bob, @users

    invalid users = alice

    # Définis qui peux lire
    read list = bob

    # définis qui peux écrire
    write list = patrick, alain

    create mask = 0664
    directory mask = 0775
    
    # Groupe d'appartenance des nouveaux fichiers
    force group = users 
```

:::danger Ne pas oublier
    Owner `sudo chown root:[groupe forcer] /export/`
    UGO: `sudo chmod -R 770 /export/`
    SE Linux `sudo chcon -vR -t samba_share_t /export/`
:::

Redemarer les service `smb` et `nmb`

```bash
sudo systemctl restart smb
sudo systemctl restart smb
```


# Samba client

Installer Samba: 
```bash
sudo dnf install samba-client
``` 

```bash
# Windows
smbclient -L //srvpartage/ -U pascal
# Linux
smbclient //srvsamba/nom_du_partage -U alain
```
