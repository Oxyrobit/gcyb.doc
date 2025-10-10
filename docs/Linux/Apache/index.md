---
sidebar_position: 6
---

# Apache

Installer Apache: 
```bash
sudo dnf install httpd httpd-manual
```

Démarrage automatique du service
```bash
sudo systemctl enable httpd --now
```

Autoriser les accès au pare-feu
```bash
sudo firewall-cmd --add-service=http --permanent

sudo firewall-cmd --reload
```