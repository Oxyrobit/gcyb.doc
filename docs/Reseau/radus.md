---
title: Radus
sidebar_position: 2
---

# Authentification
Processus permettant au système de s'assurer de la légitimité de la permsonne
Deux intervenant: Le prouveur et le vérifieur
### Facteur d'Auth
- Ce que je sais (Mdp, PIN, schéma, réponse à une qst secr)
- Ce que je suis (Empreinte digitale, Iris, voix, Visage)
- Ce que je possède (Smartphone, clé USB, Badge, CB)

### MFA (Multifactor)
L'authentification est multifactorielle: lorsqu'elle est réaliser avec au moins deux facteurs de catégorie différentes
Auth forte: Se base sur des mécanisme cryptographique robustes

## RADIUS
*Radius Authentification Dial-In User Service*
Protocole répondant au modèle AAA
Couche 7 du modèle OSI en UDP (1812 et 1813)

## 802.1x
Contrôler l'accès des équipements d'infrastructure sur les EAR.
Nécéssite une compatibilité 802.1x sur tout les équipements. S'appuie sur EAP et RADIUS.

