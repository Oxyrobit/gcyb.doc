---
title: Environement virtuel
description: Créer un environement virtuel
sidebar_position: 3
---

# Environement virtuel

Sans utiliser un environement virtuel chaque utilisation ou installation de dépendences (packages) va utiliser le dossier python de l'ordinateur.

Le problème c'est qu'il n'y a qu'un seul dossier et si il y a une incompatibilité de packages (certain package on besoin de 2 versions différentes)... il faudrait donc créer un dossier a part pour chaque gros project python.

### Créer un environement virtuel manuellement

Dans le terminal tapez:<br/>
`python -m venv env`

Cela va vous créer un dossier nommé **env** qui sera une copy du dossier python enregistrer dans votre variable d'environement PATH. Donc vous aurez un python prévu pour être utiliser par ce projet uniquement.

Après ça, il faudra activer cet environement virtuel en tappant:<br/>
`env\Scripts\activate`

Resultat signifiant que l'environement est activé:
>(venv) C:\~\mon-projet>

### Installer des dépendances

*Dans le terminal où l'environement virtuel est activé*...
>(venv) C:\~\mon-projet>

Utiliser **pip** pour installer les packages demander (ex: pygame):<br/>
`pip install pygame`

Possible aussi d'intaller une liste de dependance venant d'un fichier:<br/>
`pip install -r requirements.txt`


### Version Pycharm (Recommander)
Heureusement (pour la plupart des cas) Pycharm intégre cette fontionalité nativement.

En créant un nouveau projet vous avez la possibilité de **créer un nouveau environement** ou **utiliser un déjà existant**. 

#### Changement d'interpréteur (environement):

Il est possible de changer l'environement, et donc le Python utilisé.<br/>
En allant dans ***settings*** et en tappant dans la bar de recherche ***interpreter python***.

Ici vous pourait changer le Python selon ceux disponible ou ajouter un chemin de dossier où se trouve un autre environement Python.

#### Installation de dependances :

Au même endroit ***setting\interpreter python*** vous pouvez installler de nouveau package ou les mettre à jour avec le button **+**.
