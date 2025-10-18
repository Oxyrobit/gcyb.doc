# Website


This website is built using [Docusaurus](https://docusaurus.io/), a modern static website generator.

## Installation

```bash
npm ci
```

## Local Development

```bash
npm run start 
## ou 
npm run start -- --poll 1000 # WSL
```

# Contribuer au projet

Ce guide explique comment contribuer au projet en utilisant un **fork** et une **pull request**.

## 1. Forker le dépôt

1. Cliquez sur le bouton **Fork** (en haut à droite).
2. Cela créera une copie du projet dans votre propre espace GitHub.

## 2. Cloner votre fork en local

Dans votre terminal :

```bash
git clone https://github.com/<votre-nom-utilisateur>/<nom-du-projet>.git
cd <nom-du-projet>
```

## 3. Apporter vos modifications

- La documentation ce trouve dans `/docs`
- Testez vos changements avant de les valider.

## 4. Valider et pousser les changements

```bash
git add .
git commit -m "Description claire de la modification"
git push origin ma-branche-de-travail
```

## 5. Créer une Pull Request (PR)

1. Allez sur votre dépôt forké sur GitHub.
2. Cliquez sur **Compare & pull request**.
3. Vérifiez que la base est bien le **projet original** et la branche `dev`.
4. Décrivez vos changements puis soumettez la **Pull Request**.

## 6. Attendre la revue

Les mainteneurs du projet examineront votre PR.  
Ils pourront :
- approuver et fusionner vos modifications ;
- ou demander des ajustements.

Soyez patient, et mettez à jour la PR si besoin.


