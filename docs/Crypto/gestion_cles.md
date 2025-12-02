---
title: Infrastructures de Gestion de Clés
sidebar_position: 9
---

**I**nfrastructure de **G**estion de **C**lés = Key Management Infrastructure

Infrastructure à Clé Publique = **P**ublic **K**ey **I**nfrastructure

:::info
Un certification permet de prouver l'identité du propriétaire de la clé
:::

## Modèle certifiant l'identité de l'émétteur

### Web of Trust *Modèle de confiance décentralisé*

- PGP (**P**retty **G**ood **P**rivacy)
    - Méthode de chiffrement

- Open PGP (version libre de PGP)
    - Standisé en 1997

- GPG (Gnu Privacy Guard)
    - Logiciel de chiffrement bas sur OpenPGP


### Chain of Trust *Modèle de confiance centralisée*

*Autorité Racine* délègue au *Autorité de Certification Intermédiaire*

#### Différente autorités

- Autorité de Certification Racine (Root Certificate Authority)
    1. Entité principale de l'IGC
    1. Emet des certificats pour les autorités Intermédiaires

- Autorité de Certification Intermédiaire (ACI)
    1. Emet des certificats pour des ACI ou pour des **entités final**
    2. Assure la révoation (Liste de révocation ou OCSP)

- Autorité d'enregistrement (AE)
    1. Vérifie l'identité du demandeur
    1. Génération numérique des demandes de certificat (To Be Signed)
    1. Transmission à l'ACI

- Autorité de dépôt (Repository)
    1. Autorité de stockage des certificats
    1. Autorité de stockage des liste de revocation

- Autorité de séquestre (Key Escrow)
    1. Autorité de stockage des clés de chiffrement générées par l'IGC
