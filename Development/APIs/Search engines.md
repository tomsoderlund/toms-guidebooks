# Search Engines

- Google
- [[Bing search]]

## Google Custom Search JSON API

https://developers.google.com/custom-search/v1/overview

	GET https://www.googleapis.com/customsearch/v1?key=YOUR_API_KEY&cx=SEARCH_ENGINE_ID&q=Tomorroworld

Params: https://developers.google.com/custom-search/v1/reference/rest/v1/cse/list

### Google Custom Search in TypeScript

	interface GoogleSearchQuery {
		title: string;
		totalResults: string;
		searchTerms: string;
		count: number;
		startIndex: number;
		inputEncoding: string;
		outputEncoding: string;
		safe: string;
		cx: string;
	}

	interface GoogleSearchResult {
		kind: string;
		title: string;
		htmlTitle: string;
		link: string;
		displayLink: string;
		snippet: string;
		htmlSnippet: string;
		formattedUrl: string;
		htmlFormattedUrl: string;
		pagemap: {
			cse_thumbnail?: {
				src: string;
				width: string;
				height: string;
			}[];
			metatags?: Record<string, string>[];
			cse_image?: {
				src: string;
			}[];
			[key: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any
		};
	}

	interface GoogleSearchResponse {
		kind: string;
		url: {
			type: string;
			template: string;
		};
		queries: {
			request: GoogleSearchQuery[];
			nextPage?: GoogleSearchQuery[];
		};
		context: {
			title: string;
		};
		searchInformation: {
			searchTime: number;
			formattedSearchTime: string;
			totalResults: string;
			formattedTotalResults: string;
		};
		items: GoogleSearchResult[];
	}

	export async function googleSearch(query: string): Promise<GoogleSearchResult[]> {
		const url = `https://www.googleapis.com/customsearch/v1?key=${process.env.GOOGLE_SEARCH_API_KEY}&cx=${GOOGLE_SEARCH_ENGINE_ID}&q=${query}`;
		const response = await fetch(url);
		const googleResponse = (await response.json()) as GoogleSearchResponse;
		return googleResponse.items;
	}

## Text Search

- Elastic Search (open source)
- Algolia
- AddSearch
- Nosto (e-commerce)
- Loop54 (e-commerce)
- ElasticPress.io for WordPress
- Relevanssi for WordPress
- Bloomreach

## Visual Search

- **Visenze**: https://www.visenze.com/discovery-suite/modules/smart-tagging/
- **Wide Eyes**: https://wideeyes.ai/auto-tagging/ (bara fashion)
- **Google**
	- Vision API: https://cloud.google.com/vision
	- Vertex AI Search: https://cloud.google.com/vertex-ai
- **Microsoft Azure**: https://learn.microsoft.com/en-us/azure/ai-services/computer-vision/concept-tagging-images
- **OpenAI**
