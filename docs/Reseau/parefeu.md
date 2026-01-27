---
title: Pare-feu
sidebar_position: 1
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


Le pare-feu se place:
- Sur la machine localhost et l'exérieur (LAN)
- En coupure entre différents réseaux

*Dans le modèle OSI le pare-feu se place à la 3 et 4e couche.*

### Pare-feu personnels
Sur Windows : Pare-feu Windows
Sur linux: Netfilter via iptables/nftables
BSD/FreeBSD/MacOS: Packet Filter

### Caractéristiques
- Positionné en coupure, tous les flux passent au travers
- Seuls les flux autorisés par une politique locale peuvent passer (Whitelist)
- Le système lui même est résistant aux agressions

### Pare-feu moderne
- IDS / IPS
- IGC
- Tunnel VPN
    - SSL/TLS
    - IpSec (de type site à site)
    - GRE
### Parfeu Debian

Activer le routage entre les cartes reseaux

```bash
iptables -t nat POSTROUTING -o INTERFACE-WAN -j MASQUERADE
sysctl net.ipv4.ip_forward=1
```

### Les tables
- La table `filter`
- La table `nat`
- La table `mangle` (ttl, mark...)
- La table `raw`
- La table `security`

### Les chaines

Table `filter`
- INPUT
- OUTPUT

Table `nat`
- PREROUTING (DNAT)
- POSTROUTING (SNAT)

### Regles

Visualiser les chaines
```bash
iptables -nvL
```
```bash
# Option iptables

iptables -A # Append (Inserer à la fin)
iptables -D # Delete (supprime une regle)
iptables -F # Flush (Vider la chaine)
iptables -I # Insert (Insrer au debut)
iptables -Z # Zero (remettre a zero le compteur)
iptables -N # New (créer une nouvelle chaine)
iptables -X # Supprimer une nouvelle chaine
```

Bloquer toutes les chaines

```bash
iptables -P OUTPUT DROP
iptables -P INPUT DROP
iptables -P FORWARD DROP
```

### Modules

```bash
# Autoriser les nouvelles connexions
-m conntrack --ctstate NEW

# Autoriser les connexions déjà établies
-m conntrack --ctstate ESTABLISHED

# Autoriser plusieurs ports de destination (80 et 443)
# (Il est aussi possible d'utiliser --sports pour les ports source, mais un seul type à la fois)
-m multiport --dports 80,443

# Ajouter un log pour une règle spécifique
# La règle de log doit être dupliquée et placée **au-dessus** de la règle concernée
-j LOG --log-prefix "IPT SSH INPUT ACCEPT "

```
## Protection de la passerelle
Section **S3: Protection de la passerelle**

```bash
iptables -A INPUT -j LOG --log-prefix "IPT INPUT DROP"
iptables -A OUTPUT -j LOG --log-prefix "IPT OUTPUT DROP"
iptables -A INPUT -j DROP
iptables -A OUTPUT -j DROP
```

## Regles NAT

```bash
# Réinitialiser toutes les règles existantes
iptables -F

# Réinitialiser les règles de la table NAT
iptables -t nat -F

# SNAT (Source NAT) : Remplacer l’IP source des paquets sortant par l’IP du firewall
# Utile pour masquer un réseau LAN derrière une IP publique
iptables -t nat -A POSTROUTING -o <INTERFACE_WAN> -j SNAT --to-source <IP_FIREWALL>

# DNAT (Destination NAT) : Rediriger le trafic entrant sur le port 8080 vers une IP interne
# Exemple : Rediriger les requêtes TCP vers un serveur interne
iptables -t nat -A PREROUTING -i <INTERFACE_WAN> -d <IP_FIREWALL> -p tcp --dport 8080 -j DNAT --to-destination <IP_CIBLE>

```