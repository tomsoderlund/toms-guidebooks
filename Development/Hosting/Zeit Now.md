## Zeit Now

https://zeit.co/now

  yarn global upgrade now@latest

Teams

  now switch  # Switch teams

Run locally (serverless)

  now dev --listen 3123

Deploy

  now
  now --prod  # Production

Now Secrets

  now secrets add my-now-secret my-value-here

  now -e BING_API_KEY=
  now -e BING_API_KEY=@my-now-secret

You can use `now.json`, `.env` (localhost) and `.env.build` (production) files, too.

List deployments

  now ls

Delete deployment

  now rm https://zeit-es38wlezy.now.sh/

Domains and Aliases:

  now domains add mixbag.app
  now domains verify mixbag.app

  now alias mixbag.tomsoderlund.now.sh www.mixbag.app
  now alias scraping-service-lb71ypc0g.now.sh scraping-service

DNS changes:

  now dns ls
  now dns add YOURDOMAINHERE.COM @ TXT 'your string'
  now dns add YOURDOMAINHERE.COM SUBDOMAIN TXT 'your string'
  # Mailgun:
  now dns add mydomain.com mg TXT 'v=spf1 include:eu.mailgun.org ~all'
  now dns add mydomain.com k1._domainkey.mg TXT 'k=rsa; p=MIGf...'
  now dns add mydomain.com mg MX mxa.eu.mailgun.org 10
  now dns add mydomain.com email.mg CNAME eu.mailgun.org

### now.json

https://zeit.co/docs/configuration/

`now.json`:

  {
    "name": "zeit-chat",
    "version": 2,
    "alias": ["my-domain.com", "my-alias"],
    "scope": "my-team",
    "env": {
      "MY_KEY": "this is the value",
      "SECRET": "@my-secret-name"
    },
    "build": { "env": {} },
    "builds": [{ "src": "*.js", "use": "@now/node" }],
    "routes": [{ "src": "/about", "dest": "/about.html" }],
    "regions": ["arn1", "sfo1"],
    "public": true,
    "github": {},
    "currentTeam": "team_ofwUZockJlL53hINUGCc1ONW",
    "api": "https://api-sfo1.zeit.co",
    "collectMetrics": true
  }

#### Redirect

301 for root/apex domain: handle in Dashboard.

### Serverless functions

- `/api` folder
- All REST actions go here
- `/api/people/[person].js`: will receive `req.query.person`
- Prefix with _ or . to disable serverless function
- Run `now dev` to test locally.
  - Place environment in `.env`.
  - `now dev --listen 3123`

Example module:

  module.exports = (req, res) => {
    const { method, url, headers, body, query, cookies } = req
    res.json({ method, url, headers, body, query, cookies })
  }
