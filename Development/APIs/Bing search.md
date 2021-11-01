# Bing search

https://azure.microsoft.com/en-us/services/cognitive-services/bing-web-search-api/

Set `BING_API_KEY` in env.

    yarn add @azure/cognitiveservices-websearch @azure/ms-rest-azure-js

## Web Search

    /**
     * bingSearch module
     * @description Microsoft Bing searching
     * @module bingSearch
     * @author Tom Söderlund
     */

    require('dotenv').config() // For BING_API_KEY

    const AzureWebSearch = require('@azure/cognitiveservices-websearch')
    const CognitiveServicesCredentials = require('@azure/ms-rest-azure-js').CognitiveServicesCredentials

    // Private functions

    // Search on Bing. options: 'market' can be 'sv-SE'
    const bingSearch = async function (searchText, options = { market: 'en-us', count: 10 }) {
      const azureCredentials = new CognitiveServicesCredentials(process.env.BING_API_KEY)
      const webSearchClient = new AzureWebSearch.WebSearchClient(azureCredentials)
      const { webPages: { value: webPages = [] } = {}, news: { value: news = [] } = {}, videos: { value: videos = [] } = {}, relatedSearches: { value: relatedSearches = [] } = {} } = await webSearchClient.web.search(searchText, options)
      return { webPages, news, videos, relatedSearches }
    }

    // Public API

    module.exports = bingSearch


## Image Search

https://www.npmjs.com/package/@azure/cognitiveservices-imagesearch

    yarn add @azure/cognitiveservices-imagesearch @azure/ms-rest-azure-js

Code:

    const { ImageSearchClient } = require('@azure/cognitiveservices-imagesearch')
    const { CognitiveServicesCredentials } = require('@azure/ms-rest-azure-js')

    const API_KEY = process.env.AZURE_IMAGESEARCH_API_KEY
    const API_ENDPOINT = 'https://api.cognitive.microsoft.com/bing/v7.0/images/search'

    // Search on Azure Image Search. options = { color: 'Monochrome', count: 10, imageType: 'Photo', safeSearch: 'Strict' };
    const azureImageSearch = async function (searchText, options = { count: 10 }) {
      const cognitiveServiceCredentials = new CognitiveServicesCredentials(API_KEY)
      const client = new ImageSearchClient(cognitiveServiceCredentials, { endpoint: API_ENDPOINT })
      return await client.images.search(searchText, options)
    }

Results:

    {
      "_type":"Images",
      "readLink":"images/search?q=Lego Star Wars",
      "webSearchUrl":"https://www.bing.com/images/search?q=Lego Star Wars&FORM=OIIARP",
      "totalEstimatedMatches":885,
      "nextOffset":10,
      "value":[
        {
          "webSearchUrl":"https://www.bing.com/images/search?view=detailv2&FORM=OIIRPO&q=Lego+Star+Wars&id=9810AB0F41124D5AFCBA29909689D4FCCF6EC43D&simid=608026945586463884",
          "name":"Space-Dock: LEGO STAR WARS TWELFTH ANNIVERSARY!",
          "thumbnailUrl":"https://tse1.mm.bing.net/th?id=OIP.QQOZAvz4dssCe9877b-9zQHaGH&pid=Api",
          "datePublished":"2011-03-02T12:00:00.0000000Z",
          "contentUrl":"http://1.bp.blogspot.com/-CY3C3Grvgf8/TW8lFGzrMHI/AAAAAAAAAxU/0QVCT1aF4kI/s1600/bg-death-star-lego.jpg",
          "hostPageUrl":"http://toy-attic.blogspot.com/2011/03/lego-star-wars-twelfth-anniversary.html",
          "contentSize":"225581 B",
          "encodingFormat":"jpeg",
          "hostPageDisplayUrl":"toy-attic.blogspot.com/2011/03/lego-star-wars-twelfth-anniversary.html",
          "width":1202,
          "height":993,
          "thumbnail":{
            "width":474,
            "height":391
          },
          "imageInsightsToken":"ccid_QQOZAvz4*cp_915492F735B665794566E1C4C17DF0D7*mid_9810AB0F41124D5AFCBA29909689D4FCCF6EC43D*simid_608026945586463884*thid_OIP.QQOZAvz4dssCe9877b-9zQHaGH",
          "insightsMetadata":{
            "pagesIncludingCount":44,
            "availableSizesCount":16
          },
          "imageId":"9810AB0F41124D5AFCBA29909689D4FCCF6EC43D",
          "accentColor":"95A02B",
          "isFamilyFriendly":true,
          "hostPageFavIconUrl":"https://www.bing.com/th?id=ODF.kCKFU1-d0l3Elu2Vvbpmew&pid=Api",
          "hostPageDomainFriendlyName":"blogspot.com",
          "hostPageDiscoveredDate":"2011-03-02T12:00:00.0000000Z"
        }
      ],
      "instrumentation":{
        "_type":"ResponseInstrumentation"
      },
      "queryContext":{
        "originalQuery":"Lego Star Wars",
        "alterationDisplayQuery":"lego star wars",
        "alterationOverrideQuery":"+Lego Star Wars",
        "alterationMethod":"AM_JustChangeIt",
        "alterationType":"CombinedAlterationsChained"
      },
      "currentOffset":0
    }
