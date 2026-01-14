---
title: TP Synthèse
sidebar_position: 10
--- 

1. Recupérer le fichier ACR-CYBER.crt dans C:\Windows\System32\CertSrv\Enroll
2. Installer le rôle Adcs-cert-athority sur ACI
3. Transmettre la requete à ACR, soumettre la demande et la délivrer
4. Export le certificat ACI en .p7b (cocher la case aussi 'Inclure...')
5. Installer le rôle d'inscription web Adcs-Web-Enrollment, créer la liaisons, exiger SSL et redemarer le site
6. Créer la GPO pour importer de certificat
6. Vérifier sur la WIN10 le site https://ad-aci-cyber.cyber.$$$
8. Sur Admin linux créer le .rand et clé genrsa pour le site
8.1 Générer la demande et transmettre via le site
Recuperer le certificat en base64 et le mettre dans srv apache /etc/ssl/certs/.
transmettre aussi la clé privée au srv apache dans /etc/ssl/privates
mettre les bon droit `chown root:ssl-cert /etc/ssl/site.vert.key` et `chmod 640 /etc/ssl/private/site-vert.key`
faire la conf apache
active mod ssl, active site
vérifier bon fonctionnement 

Sur W10:
créer certificat client `certmgr.msc` puis en profiter pour l'exporter au format pkcs12

Sur APACHE:
Activer vérif client.
verifier que les certificat soit en base64, sinon l'ouvrir dans windows et `copier dans un fichier`
importer les crt ACR et ACI dans `/usr/local/share/ca-certificates/` et executer `ca-certifi[TAB] --fresh`
redemarer apache