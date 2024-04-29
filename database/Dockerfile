# Utiliser l'image officielle PostgreSQL comme image de base
FROM postgres:latest

# Ajouter les scripts SQL ou les scripts de migration dans le dossier /docker-entrypoint-initdb.d
COPY ./sql-scripts/ /docker-entrypoint-initdb.d/

# Exposer le port standard PostgreSQL
EXPOSE 5432
