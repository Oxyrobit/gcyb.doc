# GitHub Actions Workflows

## Auto PR from dev to main

### Description
Ce workflow crée automatiquement une Pull Request de la branche `dev` vers `main` après un certain nombre de commits.

### Configuration

Le nombre de commits requis avant la création automatique d'une PR est configurable via la variable d'environnement `COMMIT_THRESHOLD` dans le fichier `.github/workflows/auto-pr-dev-to-main.yml`.

```yaml
env:
  COMMIT_THRESHOLD: 5  # Modifiez cette valeur selon vos besoins
```

### Fonctionnement

1. **Déclenchement** : Le workflow se déclenche à chaque push sur la branche `dev`
2. **Comptage** : Il compte le nombre de commits sur `dev` qui ne sont pas encore dans `main`
3. **Vérification** : Il vérifie qu'il n'existe pas déjà une PR ouverte de `dev` vers `main`
4. **Création** : Si le nombre de commits atteint ou dépasse le seuil ET qu'aucune PR n'est ouverte, une nouvelle PR est créée automatiquement

### Exemple

Avec `COMMIT_THRESHOLD: 5`, après avoir poussé 5 commits ou plus sur la branche `dev` :
- Le workflow vérifie automatiquement le nombre de commits
- Si aucune PR n'existe déjà, il crée une PR avec un titre descriptif
- La PR inclut un résumé du nombre de commits et du seuil configuré

### Permissions requises

Le workflow nécessite les permissions suivantes :
- `contents: read` - Pour lire le code du repository
- `pull-requests: write` - Pour créer des Pull Requests

Ces permissions sont déjà configurées dans le workflow.

## Docker Publish

Workflow qui publie l'image Docker sur GitHub Container Registry quand une PR est fusionnée dans `main`.

### Mise à jour automatique via SSH

À la fin du workflow, un fichier `UPDATE_GCYB` est créé avec la date et l'heure de l'exécution du workflow, puis envoyé sur un serveur distant via SSH dans le répertoire mentionner.

#### Secrets requis

Pour que cette fonctionnalité fonctionne, vous devez configurer les secrets suivants dans GitHub :

- `SSH_PRIVATE_KEY` : La clé privée SSH pour se connecter au serveur distant
- `SSH_HOST_KEY`: Resulat de la commande : `ssh-keyscan -t ed25519 <@ IP ou FAQN>` **Faire l'etape de génération de secrets** Empreinte de l'hôte. 
- `SSH_HOST` : L'adresse du serveur distant (ex: example.com ou 192.168.1.1)
- `SSH_USER` : Le nom d'utilisateur SSH pour la connexion



#### Générer les secrets

```bash
sudo adduser --system --shell /bin/bash --home /var/lib/gcyb-ci --group gcyb-ci
sudo mkdir -p /var/lib/gcyb-ci/.ssh
sudo chown -R gcyb-ci:gcyb-ci /var/lib/gcyb-ci/.ssh
sudo chmod 700 /var/lib/gcyb-ci/.ssh

ssh-keygen -t ed25519 -C "gcyb-ci@$(hostname) (gha)" -f ./gcyb_ci_ed25519
PUB=$(cat ./gcyb_ci_ed25519.pub)

echo 'command="/usr/local/bin/rrsync -wo /tmp",no-pty,no-agent-forwarding,no-port-forwarding '"$PUB" | \
  sudo tee -a /var/lib/gcyb-ci/.ssh/authorized_keys >/dev/null


sudo chown -R gcyb-ci:gcyb-ci /var/lib/gcyb-ci/.ssh
sudo chmod 600 /var/lib/gcyb-ci/.ssh/authorized_keys

```

#### Configuration des secrets

1. Allez dans **Settings** → **Secrets and variables** → **Actions**
2. Cliquez sur **New repository secret**
3. Ajoutez chaque secret avec son nom et sa valeur correspondante

**Note :** Assurez-vous que la clé publique correspondant à `SSH_PRIVATE_KEY` est ajoutée dans le fichier `~/.ssh/authorized_keys` du serveur distant.
