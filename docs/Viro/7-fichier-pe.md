---
title: Fichier PE
sidebar_position: 7
---

Format d'executable Windows Portable
## Format PE
- En-tête MZ-DOS
- Segment DOS
- En-tête PE
- Table des sections
- Section n

### En tête MZ-DOS
L'entête MZ-DOS occupe 64 premier octet du fichier PE

Tout les fichiers PE valides débutent par le magic number MZ (4D5A)

### Segment DOS

Exécuter quand le programme est lancé sous MS DOS