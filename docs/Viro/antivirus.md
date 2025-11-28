---
title: Les Antivirus
sidebar_position: 14
---


**PUA **: Potentially Unwanted Application

## Défis

**La pertinence** : detecter la menace réelle, eviter faux positif

**Les formats de fichiers** : traiter touts les formats de fichiers, les fichier « polyglotte »

**La décompression** : décompression d’executable, de données

**La rapidité de mutation de virus**

## Les modes de fonctionnement

**Statique** 
- Scan des sigantures (comparaison des offsets)
- Heuristique : recherche de code correspondant à des fonction viral
- Vérification d’intégrité (verifie les composant d’un logiciel)
**Dynamique**
    Comportementale
	
**En cloud**

    + Soumission échantillonnage sur des serveur de l’éditeur
	+ Allège le client antivirus
	+ MàJ en temps réel
	+ File Réputation
	- Besoin de connexion internet
	- Confidentialité des données

## Faiblesses

Technique passives
- Furtivité
- Polymorphisme
- Blindage

Technique active

- Attaque des logiciels antivirus