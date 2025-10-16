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

La gestion des groupes se fait grâce aux fichiers `/etc/group` et `/etc/gshadow`

### Commande: groupadd

```bash
groupadd -g 1000 GroupeUtilisateurs
    -g : Précise le GID du groupe
```

### Commande: groupmod

```bash
groupmod -g 1001 -n GroupeUser
    -g : Précise le nouveau GID du groupe
    -n : Précise le nouveau nom du groupe
```

### Commande: groupdel
```bash
groupdel -f GroupeUser
    -f : Force la suppression du groupe, même si un utilisateur a le groupe comme groupe principal
```

### Commande: gpasswd
```bash
gpasswd -A GroupeAdmin -a admin-p.nom -d admin-old -M invité1
    -A : Définit l’administrateur du groupe
    -a : Ajoute l’utilisateur au groupe
    -d : Retire l’utilisateur du groupe
    -M : Définit la liste exhaustive des invités
```

