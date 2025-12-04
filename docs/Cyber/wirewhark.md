---
title: Wireshark
sidebar_position: 4
---

Outil capture et analyse de trame reseaux.

PCAP: contient l'intégralité des trames réseaux emit dans un temps imparti

Reseau -> libpcap/winpcap -> Filtre de capture


Afficher les interfaces disponible

```bash
ip link show | grep "state UP"
```

Voir les details d'un fichier pcap
```bash
capinfos <fichier>
```


Capturer Syn Ack tcp
```
# Sync
tcpdump tcp[13]==2

# Ack 
tcpdump tcp[13]==16
# Syn Ack
tcpdump tcp[13]==18
```

# Filtre d'affichage
Rechercher les adresse MAC par contructeur
```
(eth.src[0:3] == xx:xx:xx) 
```