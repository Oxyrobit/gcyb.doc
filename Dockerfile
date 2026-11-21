# syntax=docker/dockerfile:1
#
# Images Docker Hardened Images (dhi.io, connexion Docker Hub requise) :
#   - étapes de build : variantes `-dev` (shell, npm/go) ;
#   - runtime : `static`, base quasi « scratch » (certificats CA, tzdata,
#     utilisateur nonroot) sans shell ni gestionnaire de paquets. Elle ne
#     contient que le site construit et un serveur Go statique.

# Étape 1 : construction du site Docusaurus.
FROM dhi.io/node:26.13.1-debian13-dev AS site
ENV FORCE_COLOR=0
WORKDIR /opt/docusaurus
## Dépendances d'abord (cache Docker tant que le lock ne change pas).
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
## Version affichée en pied de page (passée par la CI ; après `npm ci` pour
## ne pas invalider le cache des dépendances à chaque commit).
ARG GIT_SHA=""
ARG BUILD_DATE=""
ENV GIT_SHA=${GIT_SHA} BUILD_DATE=${BUILD_DATE}
RUN npm run build

# Étape 2 : serveur HTTP statique (binaire Go sans dépendance).
FROM dhi.io/golang:1.27.4-debian13-dev AS server
WORKDIR /src
COPY server/ ./
RUN CGO_ENABLED=0 go build -trimpath -ldflags="-s -w" -o /out/gcyb-serve .

# Étape 3 : runtime minimal.
FROM dhi.io/static:20261020-musl-alpine3.24 AS runtime
COPY --from=server /out/gcyb-serve /gcyb-serve
COPY --from=site /opt/docusaurus/build /site
USER nonroot
EXPOSE 3000
ENTRYPOINT ["/gcyb-serve", "-root", "/site", "-addr", ":3000"]
