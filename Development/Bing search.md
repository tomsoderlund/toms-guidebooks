# Bing search

https://azure.microsoft.com/en-us/services/cognitive-services/bing-web-search-api/

Set `BING_API_KEY` in env.

    yarn add @azure/cognitiveservices-websearch @azure/ms-rest-azure-js

## Code

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
