## Pirate Metrics

AARRR: Acquisition, Activation, Retention, Referral, Revenue

- **Acquisition**	You acquire the user. For a SaaS product, this usually means a sign up.
- **Activation**	 The user uses your product, indicating a good first visit.
- **Retention**	The user continues to use your product, indicating they like your product.
- **Referral**	 The user likes your product so much he refers other new users.
- **Revenue**	The user pays you.

-----------

## Google Analytics

Filter out localhost: http://chipsandtv.com/articles/localhost-google-analytics

Admin -> Profiles -> Filters

* Custom filter
* Name: Exclude localhost
* Exclude
* Field: Hostname
* Pattern: localhost

-----------

Campaign Source: * (referrer: google, citysearch, newsletter4)
Campaign Medium: * (marketing medium: cpc, banner, email)
Campaign Term: (identify the paid keywords)
Campaign Content: (use to differentiate ads)
Campaign Name*: (product, promo code, or slogan)

?utm_content=bigimage&utm_campaign=WeldNewsletterFeb2014&utm_source=weld.io&utm_medium=email
?utm_content=FastestTool&utm_campaign=FacebookSE20-45&utm_source=facebook.com&utm_medium=cpc
?utm_content=TwitterCard1&utm_campaign=Twitter1&utm_source=twitter.com&utm_medium=cpc

https://www.weld.io?utm_content=TwitterCard1LetsBuild&utm_campaign=Twitter1&utm_source=twitter.com&utm_medium=cpc

https://www.fundedbyme.com/en/campaign/2988/invest-in-fundedbyme/?utm_source=TomSoderlund&utm_medium=social&utm_campaign=TomSoderlund&utm_content=The Inception of crowdfunding


Youtube links - specific time:

http://www.youtube.com/watch?v=d5ZNKwAp9ww&t=0m45s

## Mixpanel

### Reserved Properties for User Profiles

- $distinct_id: unique user ID
- $first_name, $last_name, $name
- Avatar ($avatar)
- Email ($email)
- Phone ($phone)
- $transactions
- Created ($created)
- City ($city)
- Region ($region)
- Country ($country_code)
- Timezone ($timezone)
- Unsubscribed ($unsubscribed)
- Bucket ($bucket and bucket)
