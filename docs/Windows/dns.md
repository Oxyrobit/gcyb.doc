---
title: DNS
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

