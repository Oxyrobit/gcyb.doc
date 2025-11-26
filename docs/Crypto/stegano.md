---
title: Stéganographie
sidebar_position: 4
--- 

## Terms

- **Stéganographie** : L'art et science de dissimuler des messages secrets dans des supports apparents et non suspicieux (un image, un fichier audio, vidéo, ou même texte). Ce n'est pas du chiffrement, mais peut être intégrer en +.

- **Stéganalyse** : L'art de détecter la présence d'information cachée dans un support.
:::tip
Des outils comme *exiftool*, *zsteg* (pour image PNG), ou *steghide* peuvent aider à trouvé des message caché dans images.
:::

## Méthodes de dissimulation

### Acrostiche :
(*Exemple du couple qui cache chaque mot en début de phrases)

### Least Significant Bit (LSB):

1 pixel = 3 couleurs (Red, Green, Blue ou **RGB**)  
1 couleurs = valeur entre 0 et 255

Plus la valeur d'une des trois couleurs est haute par rapport au autre, plus la couleur du pixel sera prononcé. 

Si une couleur bleu de '255' donne '1111 1111' en binaire, alors '1' donnera '0000 0001'.  
Le bleu du pixel à '255' sera très visible, alors que celui à '1' sera pratiquement que du noir.  
Mais est-ce que l'oeil humain peut dicerné la différence entre un bleu à '255' et un bleu à '254'? **Non.**

Les bits de poids fort (les plus à gauche) on plus d'influence sur la couleur et sont plus visible que les bit de poids faible (les plus à droite), aussi appeler **Least Significant Bits**.

![](.\ressources\stegano.jpg)

***En utillisant juste la valeur des derniers bits de chaque couleur, il est donc possible de créer un message sans aucune influence visible sur l'image.***

:::info
Faisons un calcul, prenons une image simple de 1280x720 pixel.  
Cette image contient donc 1280 \* 720 = 921 600 pixels.  
Chaque pixel contient 3 couleurs et nous allons réservé le dernier bit de chaque couleurs pour notre message. Ce qui nous donne 921600 \* 3 = 2 764 800 de bits utilisables pour notre message.  
Chaque charactère en UTF-8 est codé sur 8 bits, ce qui donne 2764800 / 8 = 345 600 caractères.

**Je pense qu'il est largement possible de passé un message secret avec 345 600 caractères.**
:::

## Méthodes de detection

### Détection de signature :

Détecter une caractérostique liée à l'utilisation d'un outil spécifique plus que liée à la présence d'une information cachée elle-même.

### Détection statistique/modélisation :

Complexe à mettre en oeuvre en pratique car elle nécessite de disposer d'un modèle statistique très précis.