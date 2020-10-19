# Wordpress

## Wordpress API

    const WORDPRESS_BASE_URL = 'https://public-api.wordpress.com/rest/v1.1/sites/'
    const WORDPRESS_SITE_ID = 'mysite.wordpress.com'
    const POSTS_LIMIT = 100

### List content pages

    const getPostsList = function (options = {}) {
      const url = [
        `${WORDPRESS_BASE_URL}${WORDPRESS_ID}/posts/?`,
        'fields=' + 'ID,slug,title,featured_image,date,excerpt,attachments,categories,sticky',
        options.order ? `&order_by=${options.order}&order=ASC` : '',
        options.category ? `&category=${options.category}` : '',
        options.search ? `&search=${options.search}` : '',
        `&number=${POSTS_LIMIT}`
      ].join('')
      return fetch(url).then(res => res.json()).then(res => res.posts.map(fixWordpressPost))
    }

### List one page

    const getPostDetails = function (slug) {
      const url = `${WORDPRESS_BASE_URL}${WORDPRESS_ID}/posts/slug:${slug}`
      return fetch(url).then(res => res.json()).then(res => res.error ? undefined : fixWordpressPost(res))
    }

Advanced:

    const Entities = require('html-entities').XmlEntities
    const entities = new Entities()

    const stripHtmlTags = str => str.replace(/<\/?("[^"]*"|'[^']*'|[^>])*(>|$)/g, '')
    const stripNewLines = str => str.replace(/\n/g, '')

    const fixWordpressPost = post => ({
      ...post,
      title: entities.decode(post.title),
      date: new Date(post.date),
      dateFormatted: moment(new Date(post.date)).format('YYYY-MM-DD'),
      excerpt: stripNewLines(stripHtmlTags(entities.decode(post.excerpt))),
      url: getURL(post),
      thumbnailImageUrl: post.featured_image || getAttachmentImages(post).thumbnail,
      bigImageUrl: post.featured_image || getAttachmentImages(post).large
    })

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

1. Download MAMP for Apache/MySQL: https://www.mamp.info/en/mac/
2. Run MAMP in Applications. Dashboard on http://localhost:8888/MAMP/
3. Set up database: http://localhost:8888/phpMyAdmin/
2. Download WordPress: https://wordpress.org/download/
3. Unzip to `/Applications/MAMP/htdocs/wordpress`
4. Login as root/root

https://www.elegantthemes.com/blog/tips-tricks/how-to-create-a-local-wordpress-installation-on-a-mac

## Adding a plugin manually

1. Open WP Admin e.g. http://localhost:8888/wordpress/wp-admin/plugin-install.php
2. Click the “Upload Plugin” button
3. Select the ZIP file with the plugin

## Making a plug-in

https://codex.wordpress.org/Writing_a_Plugin
