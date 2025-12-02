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


## Le certificat élétronique

Généré par un tiers de confiance appelé **Autorité de Certification**
Associé à une clé privée detenue par le propriétaire du certificat

Décomposé en 3 parties:
- Informations relatives à l'**identification**
- Informations relatives à la **clé publique**
- **Signature d'un tiers de confiance**


1. On hash le "To be sign" pour donner une **empreinte**
2. L'AC chiffre le Hash avec sa clé privée pour donner une **signature**

### Vérification

1. Déchiffrement de la signature avec la clé publique de l'AC
2. On Hash le TBS pour obtenir l'**empreinte** et on la compare avec le certificat

Clé publique signée par une autre AC = **Chaine de certification**


### Format et standard de certificats

Structure: X.509

**Format des certificats(fichier):**

**DER** (Distinguished Encoding Rules)

- Utilisé pour les certificats bruts (.cer ou .crt)

**PEM** (Pricacy-Enchanced Mail) *Encodage Base64*

- Utilisé pour des certificats dans les fichiers texte (.pem, .crt ou .cer)

Standard
- PKCS#7 (Public Key Cryptography Standard)

Contient la chaine de certif *extension: .p7b*

- PKCS#12

Contient le certificat et la clé privée (protéger par un mot de passe) (.pfx ou .p12)


:::info
Un certificats est lié à une seule identité
:::

## TLS

SSL : ancêtre

TLS 1.3: Transport Layer Security

*Ce protocole permet d'authentifier (certificats) puis de sécurisé les échange entre un client et un serveur.

L'authentification est **obligatoire** pour le **serveur** et optionnelle pour le client.