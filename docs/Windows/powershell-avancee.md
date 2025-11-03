---
slug: powershell-avancee
title: Powershell Avancée
sidebar_position: 2
---

### Astuces
#### Formate un nombres avec des zéros.
```Powershell
# Exemple : afficher un compteur avec trois chiffres
for ($i = 1; $i -le 4; $i++) {
    "{0:D3}" -f $i
}

# Affiche
001
002
003
004
```

### Caractères d'échapements

| **Caractères spéciaux**     | **Observations**                                                        |
|-----------------------------|-------------------------------------------------------------------------|
| \`ENTER *(touche clavier)* | Dans un éditeur de script, la commande se poursuit sur la ligne suivante |
| \`"                        | Affiche un guillemet (Hello \`"Henry Dupont\`")                           |
| \`b                        | Retour arrière                                                         |
| \`a                        | Alerte (Bip sonore)                                                    |
| \`r\`n                   | Retour chariot et passage à la ligne suivante                          |
| \`t                        | Tabulation horizontale                                                 |
| \`v                        | Tabulation verticale                                                   |

### Opérateurs arithmétiques

Addition: `+`
Soustraction: `-`
Multiplication: `*`
Division: `/`
Modulo (reste de la division): `%`

*Possibilité d'additionné les variables*
```
$var1 + $var2
```

### Opérateurs de comparaisons

| **Type d’opérateur**                 | **Opérateur** | **Signification**                              | **Résultat**      |
|-------------------------------------|----------------|------------------------------------------------|-------------------|
| **Comparaison (booléen True/False)** | `-eq`          | Égal (equal)                                   | True / False      |
|                                     | `-ne`          | Non égal (not equal)                           | True / False      |
|                                     | `-gt`          | Strictement supérieur (greater than)           | True / False      |
|                                     | `-ge`          | Supérieur ou égal (greater than or equal)      | True / False      |
|                                     | `-lt`          | Strictement inférieur (less than)              | True / False      |
|                                     | `-le`          | Inférieur ou égal (less than or equal)         | True / False      |
| **Comparaison générique**           | `-like`        | Égalité avec caractères génériques (`*`, `?`)  | True / False      |
|                                     | `-notlike`     | Inégalité avec caractères génériques (`*`, `?`)| True / False      |

### Opérateurs logiques
| **Opérateur** | **Description**                                                                 | **Exemples**                      | **Résultat** |
|----------------|---------------------------------------------------------------------------------|----------------------------------|---------------|
| `-And`         | **And logique** — TRUE si **les deux** instructions sont vraies.                | `(2 -eq 2) -and (4 -ge 3)`       | True          |
|                |                                                                                 | `(1 -eq 1) -and (1 -eq 2)`       | False         |
| `-Or`          | **Or logique** — TRUE si **une ou les deux** instructions sont vraies.          | `(1 -eq 1) -or (1 -eq 2)`        | True          |
|                |                                                                                 | `(1 -eq 1) -or (2 -eq 2)`        | True          |
| `-Not` `(!)`   | **Not logique** — inverse le résultat d’une instruction.                        | `-not (1 -eq 1)`                 | False         |

### Opérateurs d'affectations

| **Classique**     | **Raccourci** |
|--------------------|----------------|
| `$i = $i + 8`      | `$i += 8`      |
| `$i = $i - 8`      | `$i -= 8`      |
| `$i = $i * 8`      | `$i *= 8`      |
| `$i = $i / 8`      | `$i /= 8`      |
| `$i = $i % 8`      | `$i %= 8`      |
| `$i = $i + 1`      | `$i++`         |
| `$i = $i - 1`      | `$i--`         |


### Structure conditionnelle
Le `SI`/`SINON`
```powershell
if (condition) {
    # ...
}
elseif(condition) {
    # ...
}
else {
    # ...
}
```

Le `SWITCH`
```powershell
Switch(expression) {
    <Valeur1> { Instruction1 }
    <Valeur2> { Instruction2 }
    Default { Instruction_par_defaut } -lt 
}
```

### Les boucles

#### La boucle **While**(`Tant que`)

```Powershell
While (condition) {
    # ..
}
```

#### La boucle **Do-While**(`Répéter tant que`)
*Test de condition est effectué à la f in*
```Powershell
Do {
    # ..
} While (Condition)
```

#### La boucle **For**
*Valeur de départ, condition de répétition, pas d'incrémentation*

```Powershell
for(initial; condition; incrément)
{
    # ..
}
```

#### La boucle **ForEach**
*Parcourir une collection d'objets*
```Powershell
ForEach (element in collection){
    # ..
}
```