---
title: Compte Utilisateur
sidebar_position: 4
---

Un compte utilisateur du domaine permet:
- L'**authentification**
- L'**accès à des ressources** (dossiers, fichiers, imprimantes)
- L'**administration** d'autres entité de sécurité
- L'**audit** des actions écécutée sur le compte

le compte utilisateur possède un **SID**
*SID = Security Identifier*


Peut se connecter de deux façon différentes:
- Son nom d'ouverture de session 
    *Nom_du_domaine*\\*Nom_ouverture_de_session*
- Son Nom d'ouverture de session UPN
    *Nom_ouverture_de_session*@*suffixe_upn*

## Création d'un compte utilisateur

```powershell
# Convertie une chaine de caractère en Secure String
$pwd = ConvertTo-SecureString "Azerty+35" -AsPlainText -Force

# Paramètre minimal -Name; -SamAccountName & -AccountPassword (les comptes sont désactivés de base)
New-ADUser `
    -Name "Amice Anne" `
    -SamAccountName "A.Amice" `
    -Path "OU=Unite,DC=free,DC=fr" `
    -Description "Chef de l'unité" `
    -Title "Chef de l'unité" `
    -AccountPassword $pwd `
    -UserPrincipalName "A.Amice@free.fr"

# Création d'un compte utilisateur activé
New-ADUser `
    -Name "Flamme Capitaine" `
    -SamAccountName "C.Flamme" `
    -Path "OU=Unite,DC=free,DC=fr" `
    -Description "Adjoint de l'unité" `
    -Title "Adjoint de l'unité" `
    -AccountPassword $pwd `
    -UserPrincipalName "C.Flamme@free.fr" `
    -Enabled $true
```

## Modification, déplacement d'OU et suppression d'un compte utilisateur

```powershell

Set-ADUser -Identity "C.Flamme" -Title "Officier adjoint de l'unité"

Move-ADObject -Identity "CN=Flamme Capitaine,OU=Unite,DC=free,DC=fr" -TargetPath "OU=Cdt,OU=Unite,DC=free,DC=fr"

Remove-ADUser -Identity "C.Flamme"
```

## Recherche et activation

```powershell

# On peut utiliser 2 fonctions de recherche: Get-ADUser
Get-ADUser -Filter {enabled -eq $false} -SearchBase "OU=Unite,DC=free,DC=fr" | Set-ADUser -Enabled $true

# ou Search-ADAccount
Search-ADAccount -AccountDisabled -SearchBase "OU=Unite,DC=free,DC=fr" | Set-ADUser -Enabled $true
```

