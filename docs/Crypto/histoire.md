---
title: Histoire
sidebar_position: 2
---

## La scytale(vers 404 av. JC)

Message enroulé sur un bâton

**k**=Diametre dy cylindre

Chiffrement par permutation (transposition)

## Le chiffrement de César (vers 50 av. J-C)

Décalage = Clé de chiffrement (k=3)

Chiffrement par substitution

`C = (P+k) mod 26`

Faiblesse: Analyse fréquenciel

## Chiffre de Vigenère

Chiffrement **polyalphabetique** par substitution

Notion de clé

C<sub>i</sub> = (p<sub>i</sub> + k<sub>i</sub>) mod 26

### Exemple

**Message :** ATTACK  

**Clé :** LEMON  

(clé répétée : L E M O N L)

| Lettre claire | Lettre clé | Décalage | Lettre chiffrée |
|---------------|------------|----------|------------------|
| A             | L          | +11      | L                |
| T             | E          | +4       | X                |
| T             | M          | +12      | F                |
| A             | O          | +14      | O                |
| C             | N          | +13      | P                |
| K             | L          | +11      | V                |

**Résultat final : `LXFOPV`**


## Cilindre de Jefferson (1793)

Substitution polyalphabétique

Composé de 26 roue

## Télégraphe de Chappe (1873)

Télégraphe optique, manuel

Transmettre rapidement des message codés sur de longues distances

Code "confidientiel"

## Principe de Kerckhoffs (1883)

1. Système matériellement sinon mathématiquement indécryptable
2. N'exige pas de secret, peut tomber dans les mains de l'ennemi
3. Clé communiqué sans notre écrite
4. Applicable à la correspondance télégraphique
5. Portatif, maniement ou son fonctionnement n'exige pas le concours de plusieurs personnes
6. Système d'udage facile

*Le deuxieme principe est le plus important*

:::tip
La sécurité doit essentiellement reposer sur le secret de la clé, pas sur le secret de l'algorithme
:::

Inconvénient:
- Pour retrouver le secret -> attaque par force brute

Avantages:
- Challenge
- Intéropérabilité


## Le chiffre de Bazeries (~1890)

- Surchiffrement: transposition de lettre puis subtitution simple

Clé : C'est un nombre

1. Découpage du message, chaque chiffre correspond on nombre de lettre découper
2. Une **transposition** en inversant des blocs du message chiffré.
3. Le tableau de transposition est égal au **Nombre** en toutes lettre en retirant tout les double et en complétant avec le reste des lettre de l'alphabet (dans l'ordre)

## Bataille de Tannenberg

## Télégramme de Zimmermaann (1917)

## Radiogramme de la Victoire



