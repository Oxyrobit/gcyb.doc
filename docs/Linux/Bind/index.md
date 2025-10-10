---
sidebar_position: 6
---
# Bind

Installer Bind: 
```bash
sudo dnf install bind
```
Pour utiliser la commande `dig` 
```bash
sudo dnf install bind-utils
```

Démarrage automatique du service
```bash
sudo systemctl enable named --now
```

Autoriser les accès au pare-feu
```bash
sudo firewall-cmd --add-service=dns --permanent

sudo firewall-cmd --reload
```


