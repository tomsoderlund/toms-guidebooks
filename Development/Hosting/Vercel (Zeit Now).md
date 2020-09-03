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
  # Google Search Console:
  now dns add mydomain.com @ TXT 'google-site-verification=UKMH7gni3xbkJDxpVGtRVJV2DbY-tK3qyN0az5pUSZY'
  # Mailgun:
  now dns add mydomain.com mg TXT 'v=spf1 include:eu.mailgun.org ~all'
  now dns add mydomain.com k1._domainkey.mg TXT 'k=rsa; p=MIGf...'
  now dns add mydomain.com mg MX mxa.eu.mailgun.org 10
  now dns add mydomain.com email.mg CNAME eu.mailgun.org

### DNS servers

Update: https://dcc.godaddy.com/manage/DOMAIN.EXT/dns

ns1.vercel-dns.com
ns2.vercel-dns.com

### Email forwarding

https://forwardemail.net/en/faq?domain=trustlinc.com#table-dns-management-by-registrar
@ or leave blank  3600  MX  10  mx1.forwardemail.net
@ or leave blank  3600  MX  20  mx2.forwardemail.net

  now dns add trustlinc.com www CNAME 7841671.group21.sites.hubspot.net

forward-email=tom:xxx@tomorroworld.com,adam:yyyy@gmail.com

### now.json

https://zeit.co/docs/configuration/

`now.json`:

{
  "version": 2,
  "name": "myapp",
  "regions": [
    "arn1"
  ]
}

Larger:

  {
    "version": 2,
    "name": "myapp",
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
