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
````

Bloquer toutes les chaines

```bash
iptables -P OUTPUT DROP
iptables -P INPUT DROP
iptables -P FORWARD DROP
```