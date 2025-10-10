---
sidebar_position: 4
title: Utilisateurs et Groupes
---

## Utilisateurs

La gestion des utilisateurs ce fait grâce aux fichiers `/etc/passwd` et `/etc/shadow`

Commandes intéragissant avec ces fichiers

```bash
useradd # Ajouter un utilisateur
usermod # Modifier un utilisateur
userdel # Supprimer un utilisateur
```

Autres commandes:

```bash
lid userName → afficher les groupes d’un utilisateur
```
### Commande: useradd
```bash
sudo useradd -u 1000 -g 1013 –d /home/esi/o.truche  o.truche
    -u : Précise l’uid de l’utilisateur à créer
    -g : Précise le GID du groupe principal 
    -d : Précise le répertoire de connexion ⚠️ Tu dois créer le répertoire en amont !! `mkdir -p /home/esi/ ` 
    -G : Précise le GID du ou des groupe(s) secondaire(s) séparé(s) par des virgules
    -s : Précise l’interpréteur de commande
```
### Commande: usermod
```bash
sudo usermod –aG terre,etnc d.luge 
```
## Groupes