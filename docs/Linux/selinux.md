---
slug: selinux
title: Se Linux
---
# SELINUX

### Commandes

```bash
sestatus
getenforce
setenforce 0|1
```

## Desactiver SELinux

```bash
sudo vi /etc/sysconfig/selinux

SELINUX=disable

reboot
```

### Afficher le contexte d'un répertoire
```bash
sudo ls -Z
```
L'option `-Z` existe sur beaucoup de commande

Connaitre le contexte par defaut `matchpathcon`
```bash
sudo matchpathcon /home
```

### Modifier/Restaurer le contexte d'un répertoire

Modifier:
```bash
sudo chcon -vR -t httpd_sys_content_t /travail/web
```

Restaurer:
```bash
sudo restorecon -R /travail/web
```

### Autoriser un port sur SELinux

```bash
sudo semanage port -a -t http_port_t -p tcp 8080
```