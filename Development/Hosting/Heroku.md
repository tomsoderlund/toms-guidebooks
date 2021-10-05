## Heroku (Node.js on Heroku)

https://devcenter.heroku.com/articles/getting-started-with-nodejs

### Push to Heroku

  git init
  git add .
  git commit -m 'Version 1.0.0'
  git commit -m 'Empty commit' --allow-empty
  git push heroku master
  git push heroku MYBRANCH:master

### Set up Heroku app

heroku login
heroku create myappname
heroku config:set NODE_ENV=production #optional
heroku config:get DATABASE_URL
heroku addons:add papertrail

heroku addons:create scheduler:standard
heroku addons:add mongolab
heroku addons:create heroku-postgresql:hobby-dev

heroku access:add user@domain.com # collaborator first, then owner
heroku apps:transfer -a appname [user@domain.com or teamname] # owner
heroku apps:transfer --bulk [user@domain.com or teamname]

Change stack:
heroku stack:set heroku-18 -a appname

Delete app:
heroku apps:destroy -a appname

heroku features:enable preboot # double servers

git push heroku master
git push heroku production -a 

heroku rename NEWNAME #also renames Heroku-Git remote

  # Add new target, done by heroku create normally:
  git remote add heroku git@heroku.com:MY-HEROKU-APP.git

### Multiple apps

  heroku logs -a appname

  heroku create myappname --remote beta
  git push beta master

### Heroku NPM issues - clear cache

  heroku config:set NODE_MODULES_CACHE=false

### Scheduler

heroku run node app/scheduler/postToSlack.js
Scheduler: "node app/scheduler/postToSlack.js"
