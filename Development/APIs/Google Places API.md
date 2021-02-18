# Google Places API

- Client-side: https://developers.google.com/maps/documentation/javascript/overview
- Server-side: https://github.com/googlemaps/google-maps-services-js

Get API key etc: https://console.cloud.google.com/

- place_id
- icon: url
- name
- geometry: location
- plus_code: e.g. "9FFW83FC+3M"
- types: ["cafe", "food"]
- business_status
- formatted_address
- permanently_closed (deprecated)
- photos
- opening_hours
- price_level
- rating
- user_ratings_total


    /**
     * findPlace API
     * @description Use Google Place Search API to find points-of-interest
     * @module findPlace
     * @author Tom Söderlund

    Usage: http://localhost:3206/api/findPlace?query=V%C3%A4rdshus

    Google Place Search API: https://developers.google.com/places/web-service/search

    */

    // Private functions

    // Public API

    const fetch = require('isomorphic-unfetch')

    const { handleRestRequest, CustomError } = require('../../lib/handleRestRequest')

    const queryObjectToString = queryObject => Object.keys(queryObject).reduce((result, key) => (queryObject[key] === undefined) ? result : result + (result.length ? '&' : '?') + key + '=' + queryObject[key], '')

    const ALLOWED_HOSTS = ['localhost:3206']

    const GOOGLE_API_KEY = 'AIz...'

    const doPlacePhotoRequest = async (photoreference) => {
      const params = {
        key: GOOGLE_API_KEY,
        photoreference,
        maxheight: 400
      }
      const url = `https://maps.googleapis.com/maps/api/place/photo${queryObjectToString(params)}`
      const result = await fetch(url)
      return result.url
    }

    const doPlaceDetailsRequest = async (place_id) => { // eslint-disable-line camelcase
      const params = {
        key: GOOGLE_API_KEY,
        place_id,
        fields: 'website'
      }
      const url = `https://maps.googleapis.com/maps/api/place/details/json${queryObjectToString(params)}`
      const result = await fetch(url).then(res => res.json())
      if (result.error_message) throw new CustomError(result.error_message)
      return result.result
    }

    const doPlaceSearch = async (query) => {
      const params = {
        key: GOOGLE_API_KEY,
        inputtype: 'textquery',
        input: encodeURIComponent(query),
        fields: 'place_id,name,formatted_address,geometry,types,photos' // business_status, formatted_address, geometry, icon,name, permanently_closed (deprecated), photos, place_id, plus_code, types, opening_hours, price_level, rating, user_ratings_total
        // locationbias: `point:${lat},${long}`
      }
      const url = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json${queryObjectToString(params)}`
      const result = await fetch(url).then(res => res.json())
      if (result.error_message) throw new CustomError(result.error_message)
      const formattedPlaces = result.candidates.map(({ place_id, name, formatted_address, geometry, types, photos }) => ({ // eslint-disable-line camelcase
        place_id,
        name,
        address: formatted_address,
        coordinates: {
          lat: geometry.location.lat,
          long: geometry.location.lng
        },
        types
      }))

      if (formattedPlaces.length) {
        formattedPlaces[0].websiteUrl = (await doPlaceDetailsRequest(formattedPlaces[0].place_id)).website

        const photos = result.candidates[0].photos
        if (photos && photos.length) {
          // photos[0].photo_reference
          formattedPlaces[0].imageUrl = await doPlacePhotoRequest(photos[0].photo_reference)
        }
      }

      return formattedPlaces
    }

    module.exports = async (req, res) => handleRestRequest(async () => {
      if (req.method !== 'GET') throw new CustomError('Method not permitted')
      if (!ALLOWED_HOSTS.includes(req.headers.host)) throw new CustomError(`Host '${req.headers.host}' not allowed`, 401)
      if (!req.query.query) throw new CustomError('\'query\' not specified')

      const formattedPlaces = await doPlaceSearch(req.query.query)
      res.json(formattedPlaces)
    }, { req, res })
