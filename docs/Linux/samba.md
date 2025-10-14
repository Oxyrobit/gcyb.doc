# Samba 4

## Installation

Installer Samba: 
```bash
sudo dnf install samba ou samba-client
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

Configuration minimum
````
[global]
    netbios name = NOM_STAGIAIRE
    security = USER
    server string = Serveur de fichiers samba %v
    workgroup = ETNC
    hosts allow = 10.0.0.
````

Activer le partage de fichier
```
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

:::danger Attention
    Ne pas oublier
    Owner `sudo chown root:[groupe forcer] /export/`
    UGO: `sudo chmod -R 770 /export/`
    SE Linux `sudo chcon -vR -t samba_share_t /export/`
:::

## Gestion des utilisateurs

```bash
pdbedit -a -u bob -f "Bob Leponge"
pdbedit -L

smbpasswd bob 
    -d Désactiver un compte
    -e reactiver un compte
    -a Ajout compte + mdp à la bdd
```

## SE Linux

Partager les répertoires de connexion des utilisateurs

```
setsebool -P samba_enable_home_dirs on
```

## Coté client 

```
# Windows
smbclient -L //srvpartage/ -U pascal
# linux
smbclient //srvsamba/nom_du_partage -U alain
```
