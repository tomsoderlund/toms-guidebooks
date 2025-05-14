# Wordpress

## Setting up WordPress locally

(Instructions are for Mac, but MAMP works for Windows and it might be similar process for Windows too.)

### Installing Wordpress

1.  Install MAMP: <https://www.mamp.info/>
2.  Start MAMP (not MAMP PRO) from your Applications folder. You can configure MAMP so it automatically starts/stops Apache/MySQL. Dashboard on http://localhost:8888/MAMP/\
    ![image.gif](https://codahosted.io/docs/tNVZuk1T7p/blobs/bl-LJSs7IoTEY/c2aac9d1302ebc7279832dec72f0ee33b669135dc031bf7facd48affaf1d04a4471df41407409be836df9cf23207b66c0b5eb4550beaa5d4de1fd72a1b8249cd2fd1e24703f0f9c06a72654349fc59529df6718c1749b3f0754e0d0fa728a732e456c851)
3.  Create a new MySQL database called wordpress on <http://localhost:8888/phpMyAdmin/> (keep utf8 setting as is)
4.  Download WordPress: <https://wordpress.org/download/>
5.  Unzip to /Applications/MAMP/htdocs/wordpress (this is the default folder, you can [configure Apache to have files somewhere else, and have multiple sites](https://serverfault.com/questions/146550/how-to-set-up-multiple-websites-virtual-hosts-on-mamp))
6.  Go to <http://localhost:8888/wordpress/> and create your new site
7.  1.  Make sure to fill in database name wordpress
    2.  Username and password are both rootm
8.  Create your WordPress admin user
9.  Manage your WordPress site on <http://localhost:8888/wordpress/wp-admin/>
10. The WordPress site is now running on <http://localhost:8888/wordpress/>

More info:

-   <https://www.elegantthemes.com/blog/tips-tricks/how-to-create-a-local-wordpress-installation-on-a-mac>
-   If you need multiple Wordpress installations on same machine, [read this](https://github.com/tomsoderlund/toms-guidebooks/blob/master/Development/CMS/Wordpress.md#multiple-sites-on-same-machine)
-   Tobias recommends [Laravel Valet](https://laravel.com/docs/10.x/valet) instead of MAMP

### Adding a custom theme

1.  Clone a custom theme into /Applications/MAMP/htdocs/wordpress/wp-content/themes
2.  Activate the theme under <http://localhost:8888/wordpress/wp-admin/themes.php>

### Importing content from live WordPress site

1.  Export Wordpress (Tools → Export): <https://mywebsite.com/wp-admin/export.php>
2.  Import on localhost (Tools → Import): <http://localhost:8888/wordpress/wp-admin/import.php>
3.  Select your own username on all missing usernames.
4.  Check the checkbox to download file attachments.
5.  Start import and wait until it says "All done. Have fun!".

### Customize identity, main menu and home page

1.  View the website on <http://localhost:8888/wordpress/>
2.  Click Customize in top bar
3.  Click Site Identity
4.  Logo: search for ER-logo-White-Linear, skip cropping
5.  Tagline: Uppror för allt levande

Then:

1.  Go up on level, and find Menus
2.  Check the "Primary menu" checkbox:

![image.gif](https://codahosted.io/docs/tNVZuk1T7p/blobs/bl-tc2nugvgNe/7edb5508dba9e79f52fd20f8d0cda809d83a517ae356ef7a6cfdb705aeeb6aa80f9714dfc06995c8d56a3a230a08d2ee8048d4a19c2ebd45782515062fd2e18c62b43e750d5a082b7f7531b2c24321213f1d8910825f6a596b37047d7ffedf2d715c2cee)

1.  Then, go up on level, and find Homepage Settings
2.  Select Homepage = static page #1812 and Posts page = Nyheter
3.  Click Publish to save

![image.gif](https://codahosted.io/docs/tNVZuk1T7p/blobs/bl-7lFCPWal3e/eb803644990e717089adcf757e8613ea6de047c836eec107f3ecb62581317a65412d114ccfbe703d0026b5b62b58736539c803401ed96ce2aaf6e911dcf3d66a9ea13e662ab5e9ff79d4637adc4b68942235d73ba09b39d6d4e611f4a7cbb1798b3cd93e)


## Installing Wordpress (Mac)

1. Download MAMP: https://www.mamp.info/en/mac
2. Start MAMP (not MAMP PRO) from your Applications folder. You can configure MAMP so it automatically starts/stops Apache/MySQL when MAMP starts/stops. Dashboard on http://localhost:8888/MAMP/
3. Create a new MySQL database called `wordpress` on http://localhost:8888/phpMyAdmin/
4. Download WordPress: https://wordpress.org/download/
5. Unzip to `/Applications/MAMP/htdocs/wordpress` (this is the default folder, you can configure Apache to have files somewhere else, and have multiple sites)
6. Go to http://localhost:8888/wordpress/ and create your new site and WordPress admin user. Username and password are both "root".
7. Manage your WordPress site on http://localhost:8888/wordpress/wp-admin/
8. The WordPress site is now running on http://localhost:8888/wordpress/

More info: https://www.elegantthemes.com/blog/tips-tricks/how-to-create-a-local-wordpress-installation-on-a-mac

## Multiple sites on same machine

1. Go to MAMP > Preferences > Ports and set Apache Port to be 80
2. Add host to `sudo pico /etc/hosts` and add a row `127.0.0.1    local.MYSITE.COM`
3. Edit `/Applications/MAMP/conf/apache/httpd.con` and add:

```
	NameVirtualHost *
	
	<VirtualHost *>
	DocumentRoot "/Applications/MAMP/htdocs"
	ServerName localhost
	</VirtualHost>
	
	<VirtualHost *>
	DocumentRoot "/path/to/MYSITE"
	ServerName local.MYSITE.COM
	</VirtualHost>
```

4. Change MySQL settings in `wordpress/wp-config.php`

https://serverfault.com/questions/146550/how-to-set-up-multiple-websites-virtual-hosts-on-mamp

## Add a custom theme

1. Clone the custom theme `wp-theme` into `/Applications/MAMP/htdocs/wordpress/wp-content/themes`
2. Activate the theme under http://localhost:8888/wordpress/wp-admin/themes.php

## Adding a plugin manually

1. Open WP Admin e.g. http://localhost:8888/wordpress/wp-admin/plugin-install.php
2. Click the “Upload Plugin” button
3. Select the ZIP file with the plugin

## Making a plug-in

https://codex.wordpress.org/Writing_a_Plugin

# WooCommerce

- Install in http://localhost:8888/wordpress/wp-admin/plugin-install.php?s=woocommerce&tab=search


## WPAPI for Node.js

How to use WPAPI with Wordpress.com (endpoint)?

https://www.npmjs.com/package/wpapi

https://github.com/wp-api/node-wpapi

https://torquemag.io/2019/02/using-express-to-build-a-node-js-server-to-proxy-the-wordpress-rest-api/

    const WPAPI = require('wpapi')
    const site = await WPAPI.discover(`https://${WORDPRESS_SITE_DOMAIN}`)

## Wordpress API v2

    https://public-api.wordpress.com/wp/v2/sites/MYSITE.wordpress.com/pages?slug=about


## Wordpress API v1

    const POSTS_LIMIT = 100
    const WORDPRESS_BASE_URL = 'https://public-api.wordpress.com/rest/v1.1/sites/'
    const WORDPRESS_SITE_ID = 'MYSITE.wordpress.com'
    const getWpEndpointUrl = (resource = 'posts') => `https://public-api.wordpress.com/rest/v1.1/sites/${WORDPRESS_SITE_DOMAIN}/${resource}`

### List posts

https://developer.wordpress.com/docs/api/1.1/get/sites/%24site/posts/

    const getPostsList = function ({ category, search, sort = 'date,DESC', fields = 'ID,slug,title,featured_image,date,excerpt,categories,tags,sticky' } = {}) {
      const [orderBy, order] = sort.split(',')
      const url = [
        `${getWpEndpointUrl('posts')}?`,
        `fields=${fields}`,
        order ? `&order_by=${orderBy}&order=${order}` : '',
        category ? `&category=${category}` : '',
        search ? `&search=${search}` : '',
        `&number=${POSTS_LIMIT}`
      ].join('')
      return fetch(url) // eslint-disable-line no-undef
        .then(res => res.json())
        .then(res => res.posts.map(fixWordpressPost))
    }

### Get one post

https://developer.wordpress.com/docs/api/1.1/get/sites/%24site/posts/slug:%24post_slug/

    const getPostDetails = function (slug, { fields = 'ID,slug,title,featured_image,date,excerpt,content,attachments,categories,tags,sticky' } = {}) {
      const url = `${WORDPRESS_BASE_URL}${WORDPRESS_SITE_ID}/posts/slug:${slug}?fields=${fields}`
      return fetch(url).then(res => res.json()).then(res => res.error ? undefined : fixWordpressPost(res)) // eslint-disable-line no-undef
    }

Advanced:

    const { decode } = require('html-entities')

    const stripHtmlTags = str => str.replace(/<\/?("[^"]*"|'[^']*'|[^>])*(>|$)/g, '')
    const stripNewLines = str => str.replace(/\n/g, '')
    const formatDate = dateObj => `${dateObj.getFullYear()}-${('0' + (dateObj.getMonth()+1)).slice(-2)}-${('0' + dateObj.getDate()).slice(-2)}`

    const fixWordpressPost = post => ({
      ...post,
      title: decode(post.title),
      date: new Date(post.date),
      dateFormatted: formatDate(post.date),
      excerpt: stripNewLines(stripHtmlTags(decode(post.excerpt))),
      // url: getURL(post),
      thumbnailImageUrl: post.featured_image || getAttachmentImages(post).thumbnail,
      bigImageUrl: post.featured_image || getAttachmentImages(post).large
    })

    const getAttachmentImages = post => {
      const attachment0 = post.attachments && Object.values(post.attachments)[0]
      return (attachment0 ? attachment0.thumbnails : {})
    }

### JSON example

https://public-api.wordpress.com/rest/v1.1/sites/amazingstartupguide.wordpress.com/posts/slug:napkin-business-model

    {
      "ID":26,
      "site_ID":184352112,
      "author":{
        "ID":10258739,
        "login":"tomsoderlund",
        "email":false,
        "name":"tomsoderlund",
        "first_name":"Tom",
        "last_name":"S\u00f6derlund",
        "nice_name":"tomsoderlund",
        "URL":"http:\/\/tomsoderlundblog.wordpress.com",
        "avatar_URL":"https:\/\/0.gravatar.com\/avatar\/9c186f5bc27815e52418210f43c42f06?s=96&d=identicon&r=G",
        "profile_URL":"https:\/\/en.gravatar.com\/tomsoderlund",
        "site_ID":107414364
      },
      "date":"2020-10-19T22:57:36+02:00",
      "modified":"2020-10-19T23:05:54+02:00",
      "title":"Napkin Business Model",
      "URL":"https:\/\/amazingstartupguide.wordpress.com\/2020\/10\/19\/napkin-business-model\/",
      "short_URL":"https:\/\/wp.me\/pctwpa-q",
      "content":"\n<p>This is the body.<\/p>\n",
      "excerpt":"<p>This is the excerpt.<\/p>\n",
      "slug":"napkin-business-model",
      "guid":"https:\/\/amazingstartupguide.wordpress.com\/?p=26",
      "status":"publish",
      "sticky":false,
      "password":"",
      "parent":false,
      "type":"post",
      "discussion":{
        "comments_open":true,
        "comment_status":"open",
        "pings_open":true,
        "ping_status":"open",
        "comment_count":0
      },
      "likes_enabled":true,
      "sharing_enabled":true,
      "like_count":0,
      "i_like":false,
      "is_reblogged":false,
      "is_following":false,
      "global_ID":"bcb6f582038a963f3c743c0bd437a0f7",
      "featured_image":"https:\/\/amazingstartupguide.files.wordpress.com\/2020\/10\/photography_biopic.jpg",
      "post_thumbnail":{
        "ID":18,
        "URL":"https:\/\/amazingstartupguide.files.wordpress.com\/2020\/10\/photography_biopic.jpg",
        "guid":"http:\/\/amazingstartupguide.files.wordpress.com\/2020\/10\/photography_biopic.jpg",
        "mime_type":"image\/jpeg",
        "width":546,
        "height":546
      },
      "format":"standard",
      "geo":false,
      "menu_order":0,
      "page_template":"",
      "publicize_URLs":[
        
      ],
      "terms":{
        "category":{
          "Business Model":{
            "ID":13799,
            "name":"Business Model",
            "slug":"business-model",
            "description":"",
            "post_count":1,
            "parent":0,
            "meta":{
              "links":{
                "self":"https:\/\/public-api.wordpress.com\/rest\/v1.1\/sites\/184352112\/categories\/slug:business-model",
                "help":"https:\/\/public-api.wordpress.com\/rest\/v1.1\/sites\/184352112\/categories\/slug:business-model\/help",
                "site":"https:\/\/public-api.wordpress.com\/rest\/v1.1\/sites\/184352112"
              }
            }
          }
        },
        "post_tag":{
          "Napkin Business Model":{
            "ID":690569998,
            "name":"Napkin Business Model",
            "slug":"napkin-business-model",
            "description":"",
            "post_count":1,
            "meta":{
              "links":{
                "self":"https:\/\/public-api.wordpress.com\/rest\/v1.1\/sites\/184352112\/tags\/slug:napkin-business-model",
                "help":"https:\/\/public-api.wordpress.com\/rest\/v1.1\/sites\/184352112\/tags\/slug:napkin-business-model\/help",
                "site":"https:\/\/public-api.wordpress.com\/rest\/v1.1\/sites\/184352112"
              }
            }
          }
        },
        "post_format":{
          
        },
        "mentions":{
          
        }
      },
      "tags":{
        "Napkin Business Model":{
          "ID":690569998,
          "name":"Napkin Business Model",
          "slug":"napkin-business-model",
          "description":"",
          "post_count":1,
          "meta":{
            "links":{
              "self":"https:\/\/public-api.wordpress.com\/rest\/v1.1\/sites\/184352112\/tags\/slug:napkin-business-model",
              "help":"https:\/\/public-api.wordpress.com\/rest\/v1.1\/sites\/184352112\/tags\/slug:napkin-business-model\/help",
              "site":"https:\/\/public-api.wordpress.com\/rest\/v1.1\/sites\/184352112"
            }
          }
        }
      },
      "categories":{
        "Business Model":{
          "ID":13799,
          "name":"Business Model",
          "slug":"business-model",
          "description":"",
          "post_count":1,
          "parent":0,
          "meta":{
            "links":{
              "self":"https:\/\/public-api.wordpress.com\/rest\/v1.1\/sites\/184352112\/categories\/slug:business-model",
              "help":"https:\/\/public-api.wordpress.com\/rest\/v1.1\/sites\/184352112\/categories\/slug:business-model\/help",
              "site":"https:\/\/public-api.wordpress.com\/rest\/v1.1\/sites\/184352112"
            }
          }
        }
      },
      "attachments":{
        
      },
      "attachment_count":0,
      "metadata":[
        {
          "id":"128",
          "key":"_thumbnail_id",
          "value":"18"
        }
      ],
      "meta":{
        "links":{
          "self":"https:\/\/public-api.wordpress.com\/rest\/v1.1\/sites\/184352112\/posts\/26",
          "help":"https:\/\/public-api.wordpress.com\/rest\/v1.1\/sites\/184352112\/posts\/26\/help",
          "site":"https:\/\/public-api.wordpress.com\/rest\/v1.1\/sites\/184352112",
          "replies":"https:\/\/public-api.wordpress.com\/rest\/v1.1\/sites\/184352112\/posts\/26\/replies\/",
          "likes":"https:\/\/public-api.wordpress.com\/rest\/v1.1\/sites\/184352112\/posts\/26\/likes\/"
        }
      },
      "capabilities":{
        "publish_post":false,
        "delete_post":false,
        "edit_post":false
      },
      "other_URLs":{
        
      }
    }
