---
title: DNS
sidebar_position: 4
---

## Espace de nom de domaine
C'est un **espace de noms** reposant sur une base de données: `Hiéarchisée` et `distribuée`.

Il repose sur 3 composants principaux:
- Espace de noms domaine
- Serveurs de nom DNS
- Client DNS

**L'espace de noms** organisé sous la forme d'une arborescence hiéarchique inverse, contenant les éléments suivants:
- La Racine (root)
- Des noeuds, représantants des domaines et identifié chacun par un label
- Machines et/ou être lié à des sous domaines

## Les serveurs Racines
Il y a 13 serveurs racines
renseigner par defaut sur touts les serveurs.

## Top Level Domain
Les domaine sous la racine sont appelés "domaine de premier niveau (TLD)

- gTLP (org, net, com)
- ccTLD (fr,be,de)
- Domaine ARPA (domaine résolution inverse)

## Convention de nommage
Un nnom de domaine est obtenu par concaténation de labels.

Caractère autorisés: "A ... Z", "a ... z", "0 ... 9", "-", La casse n'est pas prise en compte.

Longueur d'un label : 63 caractères
Longueur total: 254 caractères

## FQDN
*Fully Qualified Domain Name*

Le FQDN d'une machine est obtenu par la concaténation du nom d'hôte de l'ordinateur et du suffixe DNS.

## Serveur de nom DNS
- Serveur hébergeant le rôle **Serveur DNS**
- Répodre aux résolutios de nom demandés par les clients
- Héberge, dans un **fichier de zone**, tout ou partie de l'espace de nom qui lui a été délégué.
- Le serveur DNS qui administre une zone est appelé **SOA**

## Cache DNS
Le serveur DNS stocke les résolution **reussies** ou **non abouties** dans un fichier (le cache). (durée du cache: 1j par defaut)

## Enregistrements
- `A` et `AAAA` traduit un FQDn en @IP
- SOA (Start of Authority) indique le serveur DNS qui administre la zone
- CNAME (Cononical Name) indique l'`alias` d'un FQDN
- NS (Name Server) indique un serveur DNS capable de résoudre une requête DNS
- PTR (PoinTeR) traduit une @IP en FQDN
- MX (Mail eXchange) Indique un serveur de messagerie
- TXT fournit des informations au format texte

## Type de zones

### Zone principale
 *A completer*
### Zone secondaire
 *A completer*
### Zone de Stub
- Recupère une copie partielle du fichier de zone
- Le serveur DNS ne peut que lire le fichier de zone
- Permet de rediriger des requêtes vers un domaine précis