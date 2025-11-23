---
title: Introduction
sidebar_position: 1
---

## Cryptologie moderne

*Science du secret*

:::info
Cryptologie = Cryptographie (écriture secrète) + Cryptanalyse (étude des attaques)
:::

### Mécanismes cryptographiques et garanties de sécurité

| Mécanisme    | Garanties                                       |
|--------------|--------------------------------------------------|
| Chiffrement  | Confidentialité                                  |
| Hachage      | Intégrité                                        |
| Signature    | Authentification, Intégrité, Non-répudiation     |

### Associations
- **CHIFFREMENT** : Procédé de cryptographie grâce auquel on souhaite rendre la compréhension d’un document impossible à toute personne qui n’a pas la clé (dé)chiffrement.

- **CODER / ENCODER** : En informatique, il s’agit d’une façon d’écrire les mêmes données, mais de manière différente (ex. en base64, en hexadécimal). Ce procédé est facilement inversible (il n’y a aucune notion de clé dans ces opérations).

- **CRYPTER / CRYPTAGE** : Reviendrait à chiffrer un fichier sans en connaître la clé et donc sans pouvoir le déchiffrer ensuite.

- **DECRYPTER** : Consiste à retrouver le texte original à partir d’un message chiffré sans posséder la clé (dé)chiffrement.

- **DECHIFFRER** : Consiste à retrouver le texte original d’un message chiffré dont on possède la clé de (dé)chiffrement.

### GPA (Générateur de nombre aléatoires)

Un générateur aléatoire est un algorithme ou un dispositif utilisé pour produire des nombres ou des données qui semblent aléatoires.

Utilité:
- création de clés cryptographiques
- génération de vecteurs d'initialisation (IV)
- production d'aléatoire pour d'autre algorithmes

Exigences d'un bon GPA:
- Imprévisibilité -> Valeur généré non-prévisible même avec une partie de la séquence précédente connue.
- Uniformité -> Probabilité égale d'être généré pour chaque possibilité.
- Résistance -> A la rétro-analyse. Persone ne doit pouvoir retrouvé la **seed** à partir du résultat.

Deux types de GPA:

1. **Générateurs de nombre aléatoires véritable** (TRNG - True Random Number Generator):  
-Vrai aléatoire utilisant des phénomènes physiques imprévisible (la radioactivité, bruit thermiques...)  
-Sécurisé++  
-Lent  
-Difficile à intégrer dans des systèmes logiciels

2. **Générateurs de nombres pseudo-aléatoires** (PRNG - Pseudo-Random Number Generator) :
-Faux aléatoire issue d'algorithmes déterministes à partir d'un valeur initial appelée graine (**Seed**).  
-Souvent suffisament imprévisible pour cryptographie (tant que la **Seed** soit bien protégée)  
-Exigenges de sécurité nécessaire.

:::info
Exemple - Linear Feedback SHift Register (LFSR):  
Générateur pseudo aléatoire, utilisé dans les algorithmes de chiffrement par flux (**stream cypher** comme A5/1 et A5/2), utilisation d'un registre à décalage (entrée = fonction linéaire de l'état précédent), fonction XOR. 
:::




