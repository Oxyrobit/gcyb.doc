---
title: Kerberos
sidebar_position: 3
--- 

## Terms

- **SSO** : Methode permettant à un utilisateur d'accéder à plusieurs applications informatiques (ou site HTTPS) en ne procédant qu'à une seule authentification.
- **NTLM** : Network Lan Manager (protocole d'authentification)
- **KDC** : Key Distribution Center
- **Royaume Kerberos** : Réseau au sein duquel on cherche à déployer Kerberos.


## Généralité

Kerberos = Protocole d'**authentification réseau**

Kerberos utilise un chiffrement à clé symétrique, *donc la clé utiliser pour le chiffrement et déchiffrement est la même.*

Il assure l'**authentification** de 2 entités sur un réseau, **évite** la diffusion de mots de passes, et **utilise l'horodatage** (timestamps). C'est une solution d'authentification unique.

## Fonctionnement

*Ce protocole se base sur un chiffrement symétrique couplé à une distribution de tickets permettant à un client d’accéder à un service. Kerberos chiffre et déchiffre les communications avec sa clé privée. Il utilise des tickets en remplacement des mots de passe. Cette méthode est plus flexible et plus sécurisée car elle évite la diffusion des mots de passes sur le réseau. L’authentification et la distribution des tickets sont effectuées par un tiers de confiance appelé KDC (Key Distribution Center). Au sein d’une infrastructure Microsoft le KDC fonctionne sur chaque contrôleur de domaine AD (Active Directory).*


####### BESOIN IMAGE

## Le Key Distribution Center (KDC)

Deux entité:
1. un **Authentication Service** (ou Authentication Server)
	> Fournit - un *Ticket Granting Tickets* + *clé de session*  
	> Besoin - *ID utilisateur (SID)* + *hash du mot de passe* 
2. un **Ticket-Granting Service** (ou Tickets Granting Server)
	> Service pour obtenir des TS (Tickets de Service) de durée limitée  
	> Possède les clés secrète associées à chaque machine du réseau + chaque services.
	> Ces clés secrètes sont créés lors de l'enregistrement du service ou machine sur le KDC.

### Le Ticket Service (TS)

Contient:
1. Clé de session (K u/s)
2. ID utilisateur
3. ID Service
4. Durée de vie du Ticket Service
5. Timestamp

### Pré-authentification

Option par défaut ajouté dans Kerberos V5.

:::tip
Permet d'évité des attaques où un attaquant télécharge les TGT de chaque utilisateur et tente de bruteforce le déchiffrement de ces TGT.
:::

 Au lieu d'envoyer le TGT imédiatement après avoir reçu une demande, le KDC va d'abord envoyer un défi à l'utilisateur (une pré-authentification). Souvent, ce défi est de renvoyer l'heure actuelle chiffée avec la clé du client.
