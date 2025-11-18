---
slug: create-user-ad
title: Créer un User dans l'AD
sidebar_position: 4
---

```powershell
cls
$CurrentOUs = Get-ADOrganizationalUnit -Filter 'Name -like "*"'

$CsvPath = "C:\Users\adm-vlt\Desktop\Users.csv"

$users = Import-Csv -Path $CsvPath -Delimiter ','


foreach ($user in $users) {
    
    $SamAccountName = $user.Login
    $Nom            = $user.Nom
    $Prenom         = $user.Prenom
    $DisplayName    = $user.Prenom + " " + $user.Nom
    $Titre          = $user.Fonction
    $Description    = $user.Description
    $OUPath         = ($CurrentOUs | Where-Object { $_.Name -eq $user.OU}).DistinguishedName
    $MotDePasse     = $user.MotDePasse

    $SecurePassword = ConvertTo-SecureString $MotDePasse -AsPlainText -Force

    Write-Host "Création de l'utilisateur AD : $DisplayName ($SamAccountName) dans $OUPath"

    New-ADUser `
        -DisplayName $DisplayName `
        -Name $DisplayName `
        -GivenName $Prenom `
        -Surname $Nom `
        -SamAccountName $SamAccountName `
        -Path $OUPath `
        -AccountPassword $SecurePassword `
        -Description $Description `
        -Title $Titre
}
```

Le Fichier CSV associé

```csv
Nom,Prenom,Login,Fonction,Description,OU,MotDePasse
"Pan","Amedee","A.Pan","Chef du Cdt, adjoint au chef de l’unité","Chef du Cdt","Cdt","Azerty+35"
"Didon","Aubin","A.Didon","Chef du soutien","Chef Sout","Soutien","Azerty+35"
```