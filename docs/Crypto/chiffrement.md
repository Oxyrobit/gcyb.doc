---
title: Chiffrement
sidebar_position: 5
---

Il existe deux grands types de chiffrement.
- Symétrique
- Asymétrique


## Symétrique

Ils doivent:
- Convenir d'un **secret partagé**
- L'échanger de manière sécurisée

Compléxité d'utilisation: Il faut autant de clé que de paires de correspondants

**Avantages**: Chiffrement rapide

**Inconvénients**:
- Transmission des clés de manière sure
- Gestion d'un grands nombre de clé


### 2 grandes catégories
- Chiffrement par flot (*bit par bit*)
*par flot parfait*
    1. Clé parfaitement aléatoire
    2. Aussi long que le message
    3. Clé utilisé une seule fois
    
- Chiffrement par bloc (*divisées en bloc de taille fixe*)

## Asymétrique

Ils possèdent:
- Une clé privée
    - Non diffusable
    - Element à proteger
- Une clé publique
    - Annuaire public
    - Accessible à tous

Il y a un lien mathématique entre les deux clés

::info
Chiffrement **clé publique** -> déchiffrement **clé privée**
Chiffrement **clé privée** -> Déchiffrement **Clé publique** (Authentification)
::

### Algorithme

- Les mathématiques
- Problèmes mathématiques dits difficiles (exemple pour RSA: facto, courbe elliptique)


Taille minimal du module est de **2048bits** pour une utilisation avant 2030

**Sécurité des systeme de chiffrement :**

Repose sur la supperposition

### Conclusion
**Avantages:**
- Pas d'échange de clé necessaire

**Inconvénients:**
- Chiffrement très lent (de 100 à 1000 +/sym)

## Chiffrement hybride

Il combine:
- Rapidité du symétrique
- Absence d'échange de clés de l'asymétrique


1. Ils possèdent une paire de clé privée/publique
2. Le système génère une clé secrète partagée appelée **clé de session**

