---
title: Unités d'Organisation
sidebar_position: 2
---

- Organiser les objets au sein d'un Active Directory
- Déléguer une aprtie de l'administration
- Appliquer des stratégies de Groupes

:::info Bonne pratique
- Limité le nombre de niveau à 10 maximums
- 64 caractèes max
- Eviter les espaces, les caractère accentués et la caractères spécifique
:::

Manipulation de l'oject grâce à son `Distinguished Name ou DN` 

## Obtenir les OU
```powershell
# Obtient toutes les OU
$ALL_OU = Get-ADOrganizationalUnit -Filter 'Name -like "*"'
```

### Obtenir à partir de son Nom
```powershell
#Obtenir le DN à partir d'un nom d'OU
$OU_DN = ($ALL_OU | Where-Object { $_.Name -eq "NOM DE L'OU"}).DistinguishedName
```

## Ajouter une OU
```powershell
New-ADOrganizationalUnit –Name "gcyb" –Path "ou=chemin,dc=ldap,dc=du,dc=parent"
```

## Supprimer une OU

*Dans cet exmple, on surprime une OU à partir de son Nom*
```powershell
$OU_a_supprimer = "gcyb"

$OU = Get-ADOrganizationalUnit -Filter 'Name -like $OU_a_supprimer'

Remove-ADOrganizationalUnit –identity $OU.DistinguishedName
```