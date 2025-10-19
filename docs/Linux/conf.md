---
sidebar_position: 2
---
# Configuration globale

## Nom d'hôte

```bash
sudo hostnamectl set-hostname fqdn
```

Editer le fichier `/etc/host`
```
<IP> 	<FQDN> <hostname>
```

## Adressage IP
```bash
sudo vi /etc/sysconfig/network-scripts/ifcg-ethX
```

Editer le fichier correspondant à l'interface à modifier

```bash
BOOTPROTO=static
DEVICE=eth<X>
ONBOOT=yes
IPADDR=<IP>
NETMASK=<MASQUE COMPLET>
GATEWAY=<IP PASSERELLE>
DNS1=<IP DNS1>
```

Redémarrer le service `NetworkManager` sur le serveur `sudo systemctl restart NetworkManager`

### Vérification
```bash
sudo nmcli device show
sudo nmcli device disconnect eth0 # Déconnecter eth0
sudo nmcli device connect eth0 # Reconnecter eth0
```
