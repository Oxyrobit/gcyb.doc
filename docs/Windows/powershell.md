---
slug: powershell
title: Généralités sur Powershell
---
# Powershell

Afficher une propriété:
```powershell
(Get-Item -path "F:\temp").CreationTime
```
Afficher une méthode:
```powershell
(Get-Item -path "F:\temp").GetFiles()
```

Tester un chemin, créer un dossier, créer un fichier vide
```powershell
Test-Path -Path E:\
New-Item -ItemType Directory -Name TP-Ps -Path E:\
New-Item -ItemType File -Name fichier.txt -Path E:\TP-Ps
```

### Pipeline
*Récupère les processus commençant par `s`, on ne garde que la colonne "ProcessName et ont export le resultat le la commande dans un fichier csv"*
```powershell
Get-Process -Name s* | Select-Object ProcessName | Export-Csv "E:\rpt.csv"
```

*Recupère les éléments présent dans un dossier et ses enfants, n'affiche que les colonnes selectionné*
```powershell
Get-ChildItem -Path "E:\" -recurse | Select Name, PSIsContainer, Creationtime
```

### Les variables

```powershell
$Variable = valeur
# Uniquement a-zA-Z0-9 "_"
$var1 = 12
$Var_2 = 'Bonjour'
$Folders = Get-Item -Path "E:\TP-Ps"
```

*Supprimer une variable*
```powershell
$var = $null
```

*Type de variable*
```powershell
[int]$var = 1
[double]$var = 1,56
[string]$var = "Bonjour"
[bool]$var = 0 # [Bool] fonctionne egalement
```
Connaitre le type `$var.GetType()`

*Afficher toutes les valeurs des propriétés d'un objet*
```powershell
$dossier = Get-Item -Path "E:\TP-Ps"
$dossier | select *
$dossier | format-list *
```

*Utilisation des guillemets*
```powershell
#Les simple guillemet n'interprête pas les variables qu'il y a à l'intérieur
$prenom = 'bob'
Write-Host 'Mon prenom est $prenom' # Resultat: Mon prenom est $prenom

#Les double guillemets interprètent les variables
$prenom = 'bob'
Write-Host "Mon prenom est $prenom" # Resultat: Mon prenom est bob

# Sous execution de commande
$rep = Get-Item E:\TP-Ps
Write-Host "Le dossier $rep à été créer le $($rep.CreationTime)"
```

### Variables d'environement
```powershell
Get-ChildItem env: 
# ou
Dir env:
```

*Utilisation de la variable d'environement*
```powershell
$env:windir
```

*Modifier une variable d'environement*
```powershell
Set-Item -Path Env:COMPUTERNAME -Value "Nouvelle Valeur"
```
:::info
La modification n'est active que durant l'éxécution du script
:::

*Variable de session*
```powershell
Get-Variable
```echo
### Interaction avec la console

*Affiche des données dans la console*
```powershell
Write-Host "Bonjour"
Write-Host $ma_varirable
```

*Demande à l'utilisateur et récupère les données dans `$reponse`*
```powershell
$reponse = Read-Host "Donnez votre réponse"
```
:::info
Pas besoin de mettre les `:`, powershell les affiches automatiquement
:::

*Efface le contenu de la fenêtre*
```powershell
Clear-Host
```

### Commande indispensable

*Obtenir de l'aide sur n'importe quelle commande
```Powershell
Get-Help
    -Detailed
    -Examples
    -Full
```

*Liste toutes les commandes disponible et affiches des informations de base*
```powershell
Get-Command
```

*Liste les membres des objets*
```powershell
Get-member

# Exemple
Get-Item -Path "E:\" | Get-Member
```

### Gestion des fichiers et dossiers

| **CmdLet**        | **Détails**                                                   |
|--------------------|---------------------------------------------------------------|
| Get-ChildItem      | Obtient tous les éléments d'un lecteur ou d'un dossier        |
| Get-Item           | Obtient l’élément à l’emplacement spécifié                    |
| Set-Location       | Se déplacer dans une arborescence                             |
| Get-Location       | Affiche l’emplacement actuel                                  |
| New-Item           | Création de fichiers, dossiers                                |
| Move-Item          | Déplacement de fichiers, dossiers                             |
| Rename-Item        | Renommer fichiers, dossiers                                   |
| Remove-Item        | Suppression de fichiers, dossiers                             |
| Copy-Item          | Copier fichiers, dossiers                                     |
| Get-Content        | Lire le contenu d’un fichier                                  |
| Add-Content        | Ajoute des données à un fichier existant                      |
| Clear-Content      | Efface les données d’un fichier, mais pas le fichier          |
| Set-Content        | Remplace le contenu d’un fichier                              |

### Alias Powershell
```powershell
Get-Alias
```

| **DOS/CMD**   | **Shell Unix** | **Cmdlet PowerShell** | **Description**                              |
|----------------|----------------|------------------------|----------------------------------------------|
| help           | man            | Get-Help               | Aide                                         |
| dir            | ls, dir        | Get-ChildItem          | Lister le contenu d’un répertoire            |
| type           | cat            | Get-Content            | Obtenir le contenu d’un fichier              |
| cd             | cd             | Set-Location           | Changer de répertoire courant                |
| mkdir / md     | mkdir          | New-Item               | Créer un fichier/répertoire                  |
| rmdir / rd     | rm, rmdir      | Remove-Item            | Supprimer un fichier/répertoire              |
| move           | mv             | Move-Item              | Déplacer un fichier/répertoire               |
| ren            | mv             | Rename-Item            | Renommer un fichier/répertoire               |
| copy           | cp             | Copy-Item              | Copier un fichier/répertoire                 |

