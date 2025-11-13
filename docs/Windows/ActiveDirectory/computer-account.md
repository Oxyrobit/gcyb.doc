---
title: Compte Ordinateur
sidebar_position: 3
---

*Tout ordinateur qui rejoint un domaine possède un compte ordinateur dans l’annuaire Active directory de ce domaine.*

Un compte ordinateur est reconnu dans Active Directory :
- Le nom complet limité à 64 caractères.
- Le nom antérieur à Windows 2000 (NETBIOS) limité à 15 caractères.


Par défaut les comptes ordinateur sont créer dans le conteneur **Computer**

:::tip
Il est conseillé de créer le compte ordinateur dans l'AD avant de l'intégré au domaine
:::


## Ajout d'un compte ordinateur
```powershell
New-ADComputer -Name "W10-20" -SamAccountName "W10-20" -Path "ou=chemin,dc=ldap,dc=du,dc=parent"
```

## Supprimer un compte ordinateur
```powershell
Remove-ADComputer –identity "W10-20" 
```