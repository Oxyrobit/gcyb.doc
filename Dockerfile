# syntax=docker/dockerfile:1@sha256:572cebbc2b15e6f84c077742952674889cb63cd5e9b80abdffcbe587b6f19183
#
# Images Docker Hardened Images (dhi.io, connexion Docker Hub requise) :
#   - étapes de build : variantes `-dev` (shell, npm/go) ;
#   - runtime : `static`, base quasi « scratch » (certificats CA, tzdata,
#     utilisateur nonroot) sans shell ni gestionnaire de paquets. Elle ne
#     contient que le site construit et un serveur Go statique.

# Étape 1 : construction du site Docusaurus.
FROM dhi.io/node:26.13.1-debian13-dev@sha256:efd29755a80e4753b972c58d0adeb3d45874c45d200d9ab8a17acf9dbb73620a AS site
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
FROM dhi.io/golang:1.27.4-debian13-dev@sha256:121afb8b390b1d6babba8cd0a93eaf2ffa3735f835d388b9d79c2be38b41ee4f AS server
WORKDIR /src
COPY server/ ./
RUN CGO_ENABLED=0 go build -trimpath -ldflags="-s -w" -o /out/gcyb-serve .

# Étape 3 : runtime minimal.
FROM dhi.io/static:20261020-musl-alpine3.24@sha256:efea846856e93b281bfb9b4da49430899aded25df424f2d0ecf946c703bed628 AS runtime
COPY --from=server /out/gcyb-serve /gcyb-serve
COPY --from=site /opt/docusaurus/build /site
USER nonroot
EXPOSE 3000
ENTRYPOINT ["/gcyb-serve", "-root", "/site", "-addr", ":3000"]
