---
title: NTFS et DL
sidebar_position: 7
---

##Importer le module `ntfssecurity`
:::warn
Importation à rejouer/ non tester
:::

1. Importer le dossier **NTFSSecurity** dans `C:\NTFSSecurity`  ou [Télécharger le module ici](https://www.powershellgallery.com/packages/NTFSSecurity/4.2.6)
2. Executer en tant qu'Administrateur `NTFSSecurity.Init.ps1`
3. Fermer et relancer Powershell
4. Tester le bon fonctionnement:
```powershell
Import-Module "C:\NTFSSecurity"
Get-NTFSAccess
```

## Création Automatique des DL et Autorisations NTFS

```powershell
cls

Import-Module "C:\NTFSSecurity"

$Parent = "E:\Bdd"

$Folders = Get-ChildItem -Path $Parent -Directory -Recurse


$CurrentOUs = Get-ADOrganizationalUnit -Filter 'Name -like "*"'

($CurrentOUs | Where-Object { $_.Name -eq $user.OU}).DistinguishedName

$ou = ($CurrentOUs | Where-Object { $_.Name -eq "DL"}).DistinguishedName

# Creation du DL BDD, Autorisation à mettre à la main pcq flemme de faire une fonction
New-ADGroup -GroupCategory Security -GroupScope DomainLocal -Path $ou -Name "DL_$($Parent)_R"
New-ADGroup -GroupCategory Security -GroupScope DomainLocal -Path $ou -Name "DL_$($Parent)_RW"

foreach ($folder in $Folders) {

    # 0. Créer les deux DL
    $DL_RW_NAME = "DL_$($folder.Name)_RW"
    $DL_R_NAME = "DL_$($folder.Name)_R"

    New-ADGroup -GroupCategory Security -GroupScope DomainLocal -Path $ou -Name $DL_RW_NAME
    New-ADGroup -GroupCategory Security -GroupScope DomainLocal -Path $ou -Name $DL_R_NAME

    Write-Host "Traitement du dossier : $($Folder.FullName)"

    # 1. Casser l’héritage
    Disable-NTFSAccessInheritance -Path $Folder.FullName -RemoveInheritedAccessRules

    # 2. Supprimer toutes les ACL existantes
    Clear-NTFSAccess -Path $Folder.FullName

    # 3. Ajouter les permissions pour NT System
    Add-NTFSAccess -Path $Folder.FullName -Account "AUTORITE NT\Système" -AccessRights FullControl

    # 4. Ajouter Administrateurs en full aussi
    Add-NTFSAccess -Path $Folder.FullName -Account "BUILTIN\Administrateurs" -AccessRights FullControl

    # 5. Ajouter Createur Propriétaire
    Add-NTFSAccess -Path $Folder.FullName -Account "CREATEUR PROPRIETAIRE" -AccessRights GenericAll

    #6.  Ajouter nos DL
    Add-NTFSAccess -Path $Folder.FullName -Account $DL_RW_NAME -AccessRights ReadAndExecute,Write
    Add-NTFSAccess -Path $Folder.FullName -Account $DL_R_NAME -AccessRights ReadAndExecute
}

```