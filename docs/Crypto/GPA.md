---
title: Générateur Pseudo Aléatoire
sidebar_position: 4
---


*Algorithme utilisé pour produire des nombres ou des donées qui semblent aléatoire.*

Utilité:
- Création de clés cryptographiques
- Génération de vecteurs d'initialisation (IV)
- Production d'aléatoire pour d'autre algorithmes

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