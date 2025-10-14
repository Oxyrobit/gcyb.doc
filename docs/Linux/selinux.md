# SELINUX


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

### Modifier un contexte

```bash
sudo chcon -vR -t httpd_sys_content_t /travail/web
```