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
