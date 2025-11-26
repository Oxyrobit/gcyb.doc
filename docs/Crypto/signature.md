---
title: Signature
sidebar_position: 7
---

3 critères:
- Authentification : *Identité du signataire*
- Intégrité: *Intégrité du document signé*
- Non-répudiation: *Ont est sur du signataire*

Ils sont obtenu par l'utilisation d'un cryptosystème asymétrique et fonction de hashage.

## Protocole
1. Alice hache la donnée
2. Alice Chiffre le hash avec sa **clé privée**
3. Bob dechiffre le haché avec la **clé publique** de Alice
4. Bob hache la donnée
5. Bob compara le haché calculé et le hash reçu

