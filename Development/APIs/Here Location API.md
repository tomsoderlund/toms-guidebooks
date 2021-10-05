# Here Location API

https://developer.here.com/projects


## Places API

https://places.demo.api.here.com/places/v1/discover/explore?at=52.5310%2C13.3848&cat=eat-drink&app_id=DemoAppId01082013GAL&app_code=AJKnXv84fjrb0KIHawS0Tg

Code:

    const queryObjectToString = queryObject => Object.keys(queryObject).reduce((result, key) => (queryObject[key] === undefined) ? result : result + (result.length ? '&' : '?') + key + '=' + queryObject[key], '')

    // HERE Explore API: https://places.demo.api.here.com/places/v1/discover/explore?at=52.5310%2C13.3848&cat=eat-drink&app_id=DemoAppId01082013GAL&app_code=AJKnXv84fjrb0KIHawS0Tg
    const doPlaceSearch = async ({ lat = 59.32003624836317, lng = 18.06499608, radius = 500 }) => {
      const params = {
        apiKey: config.hereApiKey,
        in: `${lat},${lng};r=${radius}`, // at: `${lat},${lng}`, OR in: `${lat},${lng};r=${radius}`
        cat: 'natural-geographical,sights-museums,administrative-areas-buildings,eat-drink,restaurant,coffee-tea,snacks-fast-food,going-out,transport,airport,accommodation,shopping,leisure-outdoor', // https://developer.here.com/documentation/places/dev_guide/topics/categories.html
        size: 20
      }

      const baseUrl = 'https://places.sit.ls.hereapi.com/places/v1/discover/explore'

      const url = `${baseUrl}${queryObjectToString(params)}`
      const result = await fetch(url).then(res => res.json())
      if (result.error_message) throw new Error(result.error_message)

      const formattedPlaces = result.results.items
        .map(({ id, title, position, vicinity, distance, category, icon }) => ({ // eslint-disable-line camelcase
          id, title, position, vicinity, distance, category, icon
        }))
      return formattedPlaces
    }


Results:

    {
      "position":[
        59.31979,
        18.06855
      ],
      "distance":203,
      "title":"Akkurat",
      "averageRating":0,
      "category":{
        "id":"going-out",
        "title":"Going Out",
        "href":"https://places.sit.ls.hereapi.com/places/v1/categories/places/going-out?app_id=r9khbzrodsdMJRZLuspx&app_code=8-p42u72vJ8zYIua3lz6_Q",
        "type":"urn:nlp-types:category",
        "system":"places"
      },
      "icon":"https://download.vcdn.cit.data.here.com/p/d/places2_stg/icons/categories/05.icon",
      "vicinity":"Hornsgatan 18<br/>SE-118 20 Stockholm",
      "having":[
        
      ],
      "type":"urn:nlp-types:place",
      "href":"https://places.sit.ls.hereapi.com/places/v1/places/752u6sc7-01598620f9214b1e8af94e9c8949ec23;context=Zmxvdy1pZD02YjVkYWM2Mi01ODYxLTU3MWMtYWYxOS1mZThmZWVjOWI3ODVfMTYwNTI4NzQ1OTgwM18wXzM4NDgmcmFuaz0w?app_id=r9khbzrodsdMJRZLuspx&app_code=8-p42u72vJ8zYIua3lz6_Q",
      "tags":[
        {
          "id":"belgian",
          "title":"Belgian",
          "group":"cuisine"
        },
        {
          "id":"european",
          "title":"European",
          "group":"cuisine"
        },
        {
          "id":"international",
          "title":"International",
          "group":"cuisine"
        },
        {
          "id":"scandinavian",
          "title":"Scandinavian",
          "group":"cuisine"
        },
        {
          "id":"swedish",
          "title":"Swedish",
          "group":"cuisine"
        }
      ],
      "id":"752u6sc7-01598620f9214b1e8af94e9c8949ec23",
      "openingHours":{
        "text":"Mon-Sun: 15:00 - 23:59",
        "label":"Opening hours",
        "isOpen":true,
        "structured":[
          {
            "start":"T150000",
            "duration":"PT08H59M",
            "recurrence":"FREQ:DAILY;BYDAY:MO,TU,WE,TH,FR,SA,SU"
          }
        ]
      },
      "alternativeNames":[
        {
          "name":"Akkurat Bar & Restaurant",
          "language":"en"
        }
      ]
    }
