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

