---
title: Kerberos
sidebar_position: 8
---

## Histoire

Protocole d'Authentification basé sur le protocole NEEDHAM-SCHROEDER (1978) et issu du projet Athena.

Version 5 créer en 1993, MaJ en 2005 par IETF.
    + Augmentation de la sécurité (ex: implémentation d'AES)

Par défaut depuis windows 2000


## Le protocole

- Assure l'Authentification mutuelle de deux entité sur un réseau
- Evite la diffusion des mots de passes sur le réseau
- Utilise un chiffrement à clé symétrique
- Utilise l'horodatage (timestamps)
- C'est une solution SSO (Single Sign On)

## Key Distribution Center (KDC)

Joue le rôle de tiers de confiance

se compose de deux entités:
    - un Authentification Service (ou AS)
    - un Ticket-Granting Service (ou TGS)

## Authentification Service

Fournit à l'utilisateur:

- Un TGT (un octroit de tickets d'une durée de vie limitées) valable 10H
- une clé de session (entre User et le TGS)

Doit avoir accès aux informations suivantes de l'utilisateur:
- ID utilisateur (SID)
- Haché du mot de passe

## Tickets Granting Service

Service pour obtenir des TS (Ticket de Service) d'une duréer de vie limitée

Le TGS possède les clés secrètes associés à:
- Chacune des machines du reseau
- Chacun des services

Ces clés secrètes sont créer lors de l'enregistrement du service ou de la machine sur le KDC

## Echange de pré-authentification

1. 
    USER : KRB_AS_REQ
    SVR  : ERR_PREAUTH_REQUIRED

2. 
    USER : KRB_AS_REQ+
    SVR : défi de pré_auth



## Principe générale

### Ticket Service

- Clé de session (K u/s)
- ID Utilisateur
- ID service
- Durée de vie de TS


### Inconvénients
- Tout les services doivent être comptatible avec Kerberos
- Doivent être synchronisuer
- La machine hébergeant le KDC doit être parfaitement sûre
- Kerberose ne chiffre que la phase d'authentification

## Royaume Kerbérisé

## Conclusion

Joue un rôle important

Empêche les attaquants:
- De déchiffrer illégitimement des TGT hors ligne
- Usurper identité des (pas eux le temps de finir)