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






