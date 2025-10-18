---
slug: samba
title: Samba
---


# Samba 4

## Installation

Installer Samba :

```bash
sudo dnf install samba
```

Autoriser le pare-feu :

```bash
sudo firewall-cmd --add-service=samba --permanent
sudo firewall-cmd --reload
```

Activer et démarrer le service Samba :

```bash
sudo systemctl enable smb --now
```

Vérifier la configuration Samba :

```bash
sudo testparm
```

## Configuration

Fichier : `/etc/samba/smb.conf`
```bash
sudo vi /etc/samba/smb.conf
```
### Configuration minimale

```ini
[global]
    netbios name = NOM_STAGIAIRE
    security = USER
    server string = Serveur de fichiers Samba %v
    workgroup = ETNC
    hosts allow = 10.0.0.0/24
```

Redémarrer les services `smb` et `nmb` :

```bash
sudo systemctl restart smb
sudo systemctl restart nmb
```

## Gestion des utilisateurs

### Ajouter un utilisateur

Il est impératif de créer un utilisateur système **avant** de créer l'utilisateur Samba :

```bash
sudo useradd -u <UID> -s /sbin/nologin <user>
```

Ensuite, ajouter l'utilisateur Samba (exemples) :

Avec pdbedit :

```bash
sudo pdbedit -a -u <user> -f "Nom Complet (facultatif)"
```

Avec smbpasswd :

```bash
sudo smbpasswd -a <user>
```

Le mot de passe renseigné sera celui utilisé par les utilisateurs Samba.

Actions sur un utilisateur Samba déjà existant :

- Désactiver un compte :

```bash
sudo smbpasswd -d <user>
```
- Réactiver un compte :

```bash
sudo smbpasswd -e <user>
```
- Ajouter un compte (ajout + mot de passe) :

```bash
sudo smbpasswd -a <user>
```

## SELinux

Partager les répertoires personnels des utilisateurs :

```bash
sudo setsebool -P samba_enable_home_dirs on
```

### Exemple de partage de fichiers
Fichier : `/etc/samba/smb.conf`
```bash
sudo vi /etc/samba/smb.conf
```
Créer un espace commun pour certains utilisateurs :

```ini
[partage]
    comment = Partage de fichiers pour certains utilisateurs
    writable = yes
    path = /export/data
    valid users = bob, @users
    invalid users = alice
    read list = bob
    write list = patrick, alain
    create mask = 0664
    directory mask = 0775
    force group = users
```

Ne pas oublier :

- Propriété du répertoire :

```bash
sudo chown root:users /export/
```
- Permissions :

```bash
sudo chmod -R 770 /export/
```
- Contexte SELinux pour le partage Samba :

```bash
sudo chcon -vR -t samba_share_t /export/
```

Redémarrer les services Samba :

```bash
sudo systemctl restart smb
sudo systemctl restart nmb
```

## Client Samba

Installer le client Samba :

```bash
sudo dnf install samba-client
```

Exemples d'utilisation :

- Lister les partages d'un serveur :

```bash
smbclient -L //srvpartage/ -U pascal
```

- Se connecter à un partage :

```bash
smbclient //srvsamba/nom_du_partage -U alain
```

Remarque : selon la distribution, les unités systemd peuvent s'appeler `smb.service` / `nmb.service` ou `samba.service`.

