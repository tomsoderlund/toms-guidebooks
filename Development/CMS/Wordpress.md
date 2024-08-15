# Wordpress

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

1. Clone the custom theme `wp-theme` into `/Applications/MAMP/htdocs/wordpress/wp-content/themes/wp-theme`
2. Activate the theme under http://localhost:8888/wordpress/wp-admin/themes.php

## Adding a plugin manually

1. Open WP Admin e.g. http://localhost:8888/wordpress/wp-admin/plugin-install.php
2. Click the “Upload Plugin” button
3. Select the ZIP file with the plugin

## Making a plug-in

https://codex.wordpress.org/Writing_a_Plugin

# WooCommerce

- Install in http://localhost:8888/wordpress/wp-admin/plugin-install.php?s=woocommerce&tab=search
