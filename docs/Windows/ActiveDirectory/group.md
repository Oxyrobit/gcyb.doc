---
title: Groupes
sidebar_position: 5
---

## Etendue des groupes
- Domaine Locale (DL)
    Visile dans son domaine
    *Contrôler l'accèes aux ressources (ex: Autorisation NTFS)*
- Groupe Universelle (GU)
    Visible dans toute la forêt
    *Utilisé en générale par la messagerie*
- Groupe Globale (GG)
    Visiblilité inter-forêts
    *Organiser les comptes utilisateurs et/ou les comptes ordinateurs*


## Types de groupes
- Sécurité
- Distribution


## Domaine Locale (DL)

**Convention de nommages**

:::note
DL_Ressource_Permissions
:::

# Exemple

```conf
DL_Commun_R
DL_Commun_RW
```

:::tip
Casser l'héritage pour mettre nos propres autorisations
:::

## Stratégie d'imbrication

Entité -> GG -> GG -> DL -> A

## Powershell
```powershell
# Création d'un groupe global
New-ADGroup -Name "GG_Chefs" -Path "OU=Unite,DC=XX,DC=intradef,DC=gouv,DC=fr" -GroupScope Global -GroupCategory Security

# Création d'un DL
New-ADGroup -Name "DL_Ressource_R" -Path "OU=DL,DC=XX,DC=intradef,DC=gouv,DC=fr" -GroupScope DomainLocal -GroupCategory Security

# Ajout des utilisateurs dans le GG
Add-ADGroupMember -Identity "GG_Chefs" -Members "CN=Oposte Fidel,OU=Pers,OU=Unite,DC=XX,DC=intradef,DC=gouv,DC=fr","CN=Pan Amedee,OU=Cdt,OU=Unite,DC=XX,DC=intradef,DC=gouv,DC=fr"

# Suppression d'un GG
Remove-ADGroup -Identity "GG_Chefs"
```

