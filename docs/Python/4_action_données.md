---
title: Action - Chercher des données
description: Information et example pour trouver du texte dans un fichier ou autre.
sidebar_position: 4
---

# Action - Chercher des données

## Situation
Pour pouvoir  trouver des informations (textes) dans un fichier ou une donnée de type string (chaine de charactère), il est utile de connaitre 4 actions:
1. Extraire le contenu d'un fichier
2. Comprendre l'encodage/decodage
3. Utiliser le module *re*
4. Manipuler un texte comme une liste

#### 1. Extraire le contenu d'un fichier?
Pour accéder au contenu d'un fichier il doit être ouvert, lu/ecrit, puis fermé. La manière recommander et simple pour ouvrir un fichier et le lire est comme suit:

```py
contenu = ''
with open('chemin_de_mon_fichier/mon_fichier.txt', 'r') as file:
	contenu = file.read()
```

Explication:

- **open()** : est la fonction permettant d'avoir accès au fichier (pas le lire).
- **'chemin_de_mon_fichier/mon_fichier.txt'** : est le chemin relatif pointant sur mon fichier.
- **'r'** : est le type d'accès au fichier, ici **R**ead (lecture).<br/>
	-- Il existe aussi a (append), w (write), rb (read bytes), ab (append bytes), wb (write bytes)...<br/>
	-- Utiliser un *b* avec le r/a/w va retourner des résultats en valeur hexadécimal (0xFFFF...)<br/>
	-- Ne pas utiliser le *b* retournera les résultats en texte encoder selon le les paramètres du fichier (mais vous pouvez essayer de forcé un encodage spécifique en ajoutant *encoding="utf-8"* pour l'utf-8).
- **with ... as file** : permet de créer une variable *file* qui représentera notre accès au fichier seulement dans la 'zone' défini après le ':'. Permet d'ouvrir et fermé le fichier automatiquement.
- **file.read()** : retour la totalité du texte (une suite hexadécimal si 'rb') contenu dans le fichier et la sauvegarde dans la variable contenu. **ATTENTION - Si fichier de 10Go alors il prendra 10Go de RAM! Il faudra alors utiliser '.readline()' ou '.read(1024)' ou similaire selon la situation.**

#### 2. Comprendre l'encodage/decodage?

Chaque fichier est en réalité une suit de bits (0 et 1) souvent représenter en hexadécimal (0 à F). L'argument **r** permet de forcé un encodage ou utiliser l'encodage du fichier, ce qui signifie que les valeurs hexadécimales sont interprété dans un certain language (encoder) souvent utf-8 ou assci (il y en a d'autre).

`with open('fichier', 'r') as file:`

Vous pouvez forcé la lecture en utf-8:

`with open('fichier', 'r', encoding='utf-8') as file:`

**ATTENTION** - Si le fichier est encoder de manière à ne pas prendre en compte l'utf-8 (en partie ou c'est juste pas de texte) vous allez avoir une error de type ***UnicodeDecodeError***. 

#### 3. Utiliser le module *re*?

Import le module re: <br/>
`import re`

Sites utiles:
- https://regex101.com/ -> Permet de texter les regex.
- https://www.pythoncheatsheet.org/cheatsheet/regular-expressions -> Cheatsheet pour créer des regex.

#### 4. Manipuler un texte comme une liste?

Un texte de type *string* est une liste de charactères.

`mon_text = 'Hello world!'`

... est actuellement comparable à...

`ma_liste_text = ['H', 'e', 'l', 'l', 'o', ' ', 'w', 'o', 'r', 'l', 'd', '!']`

Donc si je fair une boucle *for* je peux vérifier chaque charactère du texte. Ce qui est très utile pour trouver des logique de mots particulière (comme des palindromes), changer des charactères, ou autre.

```py
text = ''				# Déclaration de variable string
for lettre in mon_texte:		# Pour chaque lettre dans mon_texte je vais...
	text += lettre			# ...ajouter cette lettre à ma variable text
print(f'{text}')			# Afficher ma variable text
```

> Hello world!

<br/>

## Exercice 1 - Trouver des mots de passes dans un fichier

#### Contexte:
Nous avons un fichier nommé "log.txt" qui contient des mots de passes et d'autre information. Le bût est de récupérer chaque mot de passes (pas nécessaire d'avoir le pseudo associé ici).

#### Questions à se poser:
- A quoi ressemble l'intérieure du fichier? C'est du texte ou des octets? Plusieurs lignes?
- Est-ce que ce que je recherche à une structure consistente ou pas? Une mot de pass en claire est variable mais un hash de mot de passe est facilement reconnaissable.

#### Le fichier 'log.txt':
```conf
daniel={pseudo=daniel,password=Hello}
bob={pseudo=bob,password=15jukeoma!::}
jorge={pseudo=jorge,password=god}
```
Le fichier contient du texte. <br/>
Les mots de passes sont écrits en clair et pas en hash.<br/>
Chaque mot de passe est précédé par le texte ",password=".<br/>
Il semblerait que pour chaque ligne se trouve un utilisateur.<br/>
On peut voir que le fichier à une structure consistent mais la donnée recherché ne l'ai pas. Donc, on va plutôt chercher la **position du mot de passe** plutôt que le **mot de passe** directement.

#### Code:
Il y a presque une infinitée de manière de faire mais en voilà une:
```py
""" 
Le bût est de récupérer les mots de passes dans un fichier log.txt:
	1) Récupérer une par une les lignes du fichier et travailler dessus.
	2) Utiliser une regex pour récupérer tout le text à partir de ',password='.
	3) Suprimmer la partie ',password'.
	4) Suprimmer le dernier charactère '}' qui n'est pas une partie du mot de passe.
	5) Afficher le mot de passe.
"""

import re	# Importer le module re pour faire une regex

# Ouvrir le fichier dans le même dossier que ce programme
# Utilisation de 'r' car le fichier semble encoder en texte 
with open('./log.txt', 'r') as file:
    
	# Le fichier est constituer de lignes donc utilisation de boucle for pour les récupérer une par une.
	for line in file:
        
		password = re.search(',password=(.*)', line).group() 	# Recupère le  texte à partir de ',password=' grace à .group() et pas juste l'objet Match().
	
		password = password.removeprefix(',password=') 		# Enlève le premier ',password=' pour éviter de toucher le mdp si ce texte est présent dans le mdp.

		password = password.removesuffix('}')		# Enlève le dernier char '}' ce qui évite de touché le mdp.
		print(password)					# Afficher les mots de passes trouvé
```

Il est aussi possible de simplement récupérer la position des characters:
```py
import re
with open('./log.txt', 'r') as file:
	for line in file:
		password = re.search(',password=(.*)', line).group()
		
		# Ici je vais juste récupérer les characters à partir de l'index n°10 jusqu'à l'avant-dernier charactère.
		password = password[10 : len(password)-1]
		
		print(password)
```
Sur cette dernière version je sais que je dois ignorer la partie *',password='* du début.<br/>
Donc je vais ignorer les index de 0 à 9 (10 premières lettres) et commençer à l'index 10.<br/>
En suite je veux m'arréter 1 letter avant la fin, donc je prend la taille totale de mon texte (len(password)) et je retire 1.<br/>
Ce qui nous donne: `password[10 : len(password)-1]`


## Exercice 2 - Trouver des HASH de mots de passes dans un fichier

#### Contexte
Nous avons un fichier nommé "log2.txt" qui contient des mots de passes comme dans l'exercice 1. Mais il est organiser différament.

#### Le fichier 'log2.txt':

```log
daniel/b73bf7d3ba1a517644661bc4bcd85f9a/True/bob/a652d6bae8b080315c8c7664d5be7ead/jorge/a4757d7419ff3b48e92e90596f0e7548/
```

Ici le fichier est sur une seule ligne.<br/>
Le structure n'est pas très consistante (daniel a deux données après un '/' mais bob et jorge n'ont qu'un hash).<br/>
Chaque donnée est séparer par un '/'.<br/>
Dans ce cas présent les hash sont très identifiable et ont tous 32 charactères et sont écrit en Héxadécimal, il est donc mieux de chercher directement les hashes.

#### Code:
```py
import re
with open('./log2.txt', 'r') as file:
    texte = file.read()
	
	#Regex pour hash MD5
    password_liste = re.findall('[0-9a-fA-F]{32}', texte)	# Recupère une liste de tout se qui ressemble à un MD5.
	
	for password in password_liste:
		print(password)	
```