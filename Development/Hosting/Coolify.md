# Coolify – “open source Vercel”

## Install

https://coolify.io/docs/installation

Follow the manual steps if the script fails.

## Deploy a new website

1. New project
2. Select GitHub repo
3. Set environment variables
4. Set domain settings
5. Deploy

## Connecting a domain

In your name server, set `www`	point to `A` and your IP address.

Coolify:

1. Servers → server → Proxy tab (see below)
  - Then restart proxy
2. Project → project → application
  - Domains field
  - Then restart application

Proxy config (see the “Domain: mydomain.com” section):

    networks:
      coolify:
        external: true
    services:
      traefik:
        container_name: coolify-proxy
        image: 'traefik:v3.1'
        restart: unless-stopped
        environment:
          - HETZNER_API_KEY=...
        extra_hosts:
          - 'host.docker.internal:host-gateway'
        networks:
          - coolify
        ports:
          - '80:80'
          - '443:443'
          - '443:443/udp'
          - '8080:8080'
        healthcheck:
          test: 'wget -qO- http://localhost:80/ping || exit 1'
          interval: 4s
          timeout: 2s
          retries: 5
        volumes:
          - '/var/run/docker.sock:/var/run/docker.sock:ro'
          - '/data/coolify/proxy:/traefik'
        command:
          # Ping and API
          - '--ping=true'
          - '--ping.entrypoint=http'
          - '--api.dashboard=true'
          - '--api.insecure=false'
          # Enable HTTP/HTTPS Entrypoints
          - '--entrypoints.http.address=:80'
          - '--entrypoints.https.address=:443'
          - '--entrypoints.http.http.encodequerysemicolons=true'
          - '--entryPoints.http.http2.maxConcurrentStreams=50'
          - '--entrypoints.https.http.encodequerysemicolons=true'
          - '--entryPoints.https.http2.maxConcurrentStreams=50'
          - '--entrypoints.https.http3'
          # Providers
          - '--providers.file.watch=true'
          - '--providers.file.directory=/traefik/dynamic/'
          - '--providers.docker=true'
          - '--providers.docker.exposedbydefault=false'
          # ACME (Let’s Encrypt)
          - '--certificatesresolvers.letsencrypt.acme.httpchallenge=true'
          - '--certificatesresolvers.letsencrypt.acme.httpchallenge.entrypoint=http'
          - '--certificatesresolvers.letsencrypt.acme.storage=/traefik/acme.json'
          - '--certificatesresolvers.letsencrypt.acme.dnschallenge=true'
          - '--certificatesresolvers.letsencrypt.acme.dnschallenge.provider=hetzner' # hetzner
          - '--certificatesresolvers.letsencrypt.acme.dnschallenge.delaybeforecheck=0'
        labels:
          # Coolify Labels
          - coolify.managed=true
          - coolify.proxy=true
          # Enable Traefik
          - traefik.enable=true
          # Dashboard Router (Optional: Secured with HTTPS)
          - traefik.http.routers.traefik.entrypoints=http
          - traefik.http.routers.traefik.service=api@internal
          - traefik.http.services.traefik.loadbalancer.server.port=8080
          # Middlewares (Shared Across All Routers)
          - traefik.http.middlewares.redirect-to-https.redirectscheme.scheme=https
          - traefik.http.middlewares.gzip.compress=true
          # Default Wildcard Certificate
          - traefik.http.routers.traefik.tls.certresolver=letsencrypt
          # Domain 1: mydomain.com
          - traefik.http.routers.mydomain-http.rule=Host(`www.mydomain.com`) # HTTP Router
          - traefik.http.routers.mydomain-http.entryPoints=http
          - traefik.http.routers.mydomain-http.middlewares=redirect-to-https
          - traefik.http.routers.mydomain.rule=Host(`www.mydomain.com`) # HTTPS Router
          - traefik.http.routers.mydomain.entryPoints=https
          - traefik.http.routers.mydomain.middlewares=gzip
          - traefik.http.routers.mydomain.tls=true
          - traefik.http.routers.mydomain.tls.certresolver=letsencrypt
          - traefik.http.services.mydomain.loadbalancer.server.port=80
          # Domain 2: mydomain2.com (copy from mydomain.com)
