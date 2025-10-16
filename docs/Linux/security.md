---
sidebar_position: 5
slug: security
title: Sécurité globale
---

### Sécurisation du mot de passe d'un utilisateur

```bash
chage -M 90 -m 60 -W 10 -I 7 d.luge

  -M : Durée de vie maximale du mot de passe
  -m : Durée de vie minimale du mot de passe
  -W : Délai d’avertissement avant expiration
  -I : Délai avant désactivation du compte
  -E : Date d’expiration du compte
  -d : Date de prochaine modification du mot de passe
```

### Sécurité lors de la création des utilisateurs

Modification du fichier `/etc/login.defs`
```bash
PASS_MAX_DAYS 9999  # Durée de vie max du mot de passe
PASS_MIN_DAYS 0    # Durée de vie mini du mot de passe
PASS_MIN_LEN 18    # Taille mini du mot de passe
PASS_WARN_AGE 7    # Délai d’avertissement avant expiration du mot de passe
```

### Commande: useradd
```bash
useradd -D -f 10 -b /home -e 2028-09-25

  -D : Modification du fichier /etc/default/useradd
  -f : Nombre de jours suivant l’expiration du mot de passe avant que le compte ne soit désactivé
  -b : Définit le répertoire de connexion par défaut
  -e : Date à laquelle le compte sera désactivé
  -s : Définit le shell par défaut
```

### Permission pour utiliser les privilèges `sudo`
```bash
usermod -aG wheel adm-p.nom

visudo    # Modifie le fichier /etc/sudoers

# Si manquante, on ajoute la ligne suivante:
%wheel		ALL=(root)	ALL
```

### Restriction du ssh
```bash
vi /etc/ssh/sshd_config

PermitRootLogin no

systemctl restart sshd
```

### Désactivation du compte root
```bash
usermod -L root    # /!!\ être sûr du compte admin avant cette commande /!!\
```
