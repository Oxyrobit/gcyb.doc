---
title: Réaction à une menace
sidebar_position: 5
---

## Acteurs de la détéction

- Utilisateurs
- Admins
- Techniciens / Aides usager

## Symptomes d'une inféction

- Ralentissement
- Comportement suspect
- Utilisations éléveé du processeur
- Trafic réseau suspect
- Logs suspects
- Plantes multiple et soudaines

### Ce qu'on doit chercher
- Tout éléments pouvant être la cause du symptômes

## Ou doit-ont chercher
- Impossible de savoir
:::info
Une connaissance du système est nécessaire
:::


### Processus légitimes

*Il ce lance tous dans System32*
- csrssq
- rundll32
- svchost
- taskmgr
- dwm

### Variables d'environement


### Clé de registre cible

- HKEY_CURRENT_USER\Software\Microsoft\Windows\CurrentVersion

### Réseau

```cmd
netstat -bano # en tant qu'admin
```

## Mode d'investigation

- Technique de la Clé USB
- Contrôler les processus actif 

### Mesures immédiate 
- Je qualifie l'incident
- J'avalue l'impact opérationnel
- Je réalise le compte rendu

### Traçabilité

Conserver une trace écrite des opérations réalisé 
- Condition de découverte
- Actions entreprises

### Autres moyen de detection
- Pare-feu
- Trafic réseau
- HIPS

