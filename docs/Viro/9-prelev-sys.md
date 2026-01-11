---
title: Prélévements système DFIR ORC
sidebar_position: 9
---

## Traces d'attaque
*incomplet*
## Outis de Recherche de Compromission

*develeloper par l'ANSII*
- Conçu pour figer une scène
- Embarque des outils
- Permet d'ajouter des outils externe
- Configurable par des fichiers XML

### Lancement

- Ne fonctionne que sous Windows
- Nécessite des droits admins **du poste** (local)
- Peux être mis en quarantaine par un AV

### Options clés

- /?
- /out
- /tempdir
- /keys (liste touts les modules)
- /key=
- /offline

Passer ORCmedium en mode full `DFIR-ORC-medium.exe /key,logs,memory`

### Dump de la ram 

- Faire le dump `medium.exe /key=memory`
- Récuperer le fichier `.raw` et le placer dans le dossier `VOL2.6.1`
- Lancer `imageinfo` , `./vol.py -f <dump>.raw imageinfo` et recupérer la ligne `Suggested Profile`
- Executer Volatility `./vol.py -f <dump>.raw -profile=<suggested profile> <pstree, netscan, hivelist, psxview>`

### Résultats

- Compressés par défaut 7z
- portent le nom de la machine sur laquelle il est éxécuté, associé au GDH
- Peuvent contenir des données perso

### Collecte en mode OFFLINE

- Monter l'image avec `FTK Imager 4.7`
```cmd
Collect_Medium_v10_4.exe /Offline=F: /Computer=Victime
```
Donne un nom au PC sinon c'est celui du PC d'analyse qui est pris par defaut