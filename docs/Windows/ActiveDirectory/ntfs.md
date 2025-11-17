---
title: NTFS et DL
sidebar_position: 7
---

##Importer le module `ntfssecurity`
:::warn
Importation à rejouer/ non tester
:::
1. [Télécharger le module ici](https://www.powershellgallery.com/packages/NTFSSecurity/4.2.6)
2. Importer le fichier sur le serveur
3. Renommer `ntfssecurity.4.2.6.nupkg` en `ntfssecurity.4.2.6.nupkg.zip`
4. Extraire le contenu dans `C:\Users\adm-xxx\Documents\WindowsPowerShell\Modules\ntfssecurity.4.2.6.nupkg` (Dossier Modules à créer)
5. Executer `NTFSSecurity.Init.ps1`


## Création Automatique des DL et Autorisations NTFS

```powershell
cls

Import-Module ntfssecurity

$Parent = "E:\Bdd"

$Folders = Get-ChildItem -Path $Parent -Directory -Recurse


$CurrentOUs = Get-ADOrganizationalUnit -Filter 'Name -like "*"'

($CurrentOUs | Where-Object { $_.Name -eq $user.OU}).DistinguishedName

$ou = ($CurrentOUs | Where-Object { $_.Name -eq "DL"}).DistinguishedName

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