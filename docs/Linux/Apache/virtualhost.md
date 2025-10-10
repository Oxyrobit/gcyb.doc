---
sidebar_position: 3
slug: hosts
---
# Virtual Hosts
Tout d'abord, vérifier qu'Apache puis accéder aux fichiers de vos sites.

```bash
# Ici on admet que tout nos sites sont stocker dans /var/www/html/
sudo chown -R root:apache /var/www/html/
# Vérification
sudo ls -l /var/www/html/
```

Dossier de configuration des Virtual Hosts

```bash
sudo ls -l /etc/httpd/conf.d/
```

### Publier un site grâce à son adresse IP

Exemple: je veux publier mon site sur `http://172.0.0.2`

```conf
<VirtualHost IP_de_votre_serveur:80>
    DocumentRoot /var/www/html/SiteJaune
    DirectoryIndex IndexJaune.htm
    <Directory /var/www/html/SiteJaune>
        Require all granted
    </Directory>
</VirtualHost>
```
Redémarer le service Apache[^1]
### Publier un site via un port différent

Exemple: je veux publier mon site sur `http://172.0.0.2:1664`

**Pré-requis:**
- [ ] Ouvrir le port 1664 `sudo firewall-cmd --add-port=1664/tcp --permanent`
- [ ] Recharger la configuration du pare-feu `sudo firewall-cmd --reload`
- [ ] Vérifier que le port est bien en écoute `sudo ss -putan`
- [ ] Ajouter `Listen 1664` dans le fichier de configuation Apache[^2]

**Configuration:**

```bash
<VirtualHost IP_INT_de_votre_serveur:1664>
    DocumentRoot /var/www/html/SiteVert
    DirectoryIndex IndexVert.htm
    <Directory /var/www/html/SiteVert>
        Require all granted
    </Directory>
</VirtualHost>
```
Redémarer le service Apache[^1]

### Publier un site grace à un FQDN

Exemple: je veux publier mon site sur `http://www.orange.domaine` qui point vers l'adresse `172.0.0.2`

**Pré-requis:**
- [ ] Ajouter le FQDN à votre zone DNS[^4] et redemarer le service named[^3]
    ```conf
        www     IN      CNAME   dmz-int.orange.domaine.
    ```
- [ ] Vérifier la bonne résolution DNS avec dig: `dig www.orange.domaine` ou sur windows `nslookup www.orange.domaine`

**Configuration:**

```conf
<VirtualHost 172.0.0.2:80>
    ServerName www.orange.domaine
    DocumentRoot /var/www/html/SiteOrange
    DirectoryIndex IndexOrange.htm
    <Directory /var/www/html/SiteOrange>
        Require all granted
    </Directory>
</VirtualHost>
```

Redémarer le service Apache[^1]

### Mon site a plusieurs FQDN

Exemple: Je veux publier mon site sur `www.rose.domaine` et `www.portail.domaine`

**Pré-requis:**
- [ ] Ajouter les FQDN à votre zone DNS[^4] et redemarer le service named[^3]
- [ ] Vérifier la bonne résolution DNS avec dig

**Configuration:**

Dans le fichier de configuration du site[^5], ajouter l'entrée `ServerAlias www.rose.domaine` en dessous de l'entrer `ServerName`

Redémarer le service Apache[^1]

### Mon site a un alias (maintenance)

Exemple: je veux publier le site de maintenance qui sera accessible grâce à un alias `www.orange.domaine/Maintenance`

**Je dois**
- [ ] Ajouter `maintenance.html` dans `DirectoryIndex`
- [ ] Ajouter l'`Alias` 
- [ ] Ajouter la balise `<Directory>` qui me permet d'accéder aux fichiers du site maintenance

**Configuration:**

```conf
<VirtualHost IP_INT_de_votre_serveur:80>
    DocumentRoot /var/www/html/SiteOrange
    DirectoryIndex IndexOrange.htm maintenance.html
    <Directory /var/www/html/SiteOrange>
        Require all granted
    </Directory>

    Alias /Maintenance /var/www/html/Maintenance/
    <Directory /var/www/html/Maintenance>
        Require all granted
    </Directory>
</VirtualHost>
```
Redémarer le service Apache[^1]

### Ajouter des logs à mon site

Exemple: je veux que les logs de mon site soit stocker dans `/journaux/MonSite/`

**Pré-requis**
- [ ] Creer le répertoire de logs `sudo mkdir -p /journaux/MonSite/`
- [ ] Autoriser Apache à écrire dans ce répertoire `sudo chown -R :apache /journaux` et `sudo chmod 750 /journaux/`

**Configuration:**
Ouvrir le fichier de configuration du site et ajouter

```conf
<VirtualHost IP_INT_de_votre_serveur:80>
    ...
    ErrorLog /journaux/monSite/error_log
    CustomLog /journaux/monSite/access_log <combined | common>
    ...
</VirtualHost>
```
Redémarer le service Apache[^1]

### Publier les logs sur le site

Exemple: je veux publier les logs de mon site sur `http://monsite/logs`

**Configuration:**
Ouvrir le fichier de configuration du site et ajouter

```conf
<VirtualHost IP_INT_de_votre_serveur:80>
    ...
    ErrorLog /journaux/monSite/error_log
    CustomLog /journaux/monSite/access_log combined

    Alias /logs /journaux/monSite/
    <Directory /journaux/monSite/>
        Require all denied
        Require ip ip_de_votre_station_d'admin
        Options Indexes
    </Directory>
</VirtualHost>
```
Redémarer le service Apache[^1]

[^1]: `sudo systemctl restart httpd`
[^2]: `/etc/httpd/conf/httpd.conf`
[^3]: `sudo systemctl restart named`
[^4]: `sudo vim /var/named/masters/`
[^5]: `sudo vim /etc/httpd/conf.d/`

