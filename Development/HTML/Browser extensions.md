# Browser extensions

## Manifest

    {
      "manifest_version": 2,
      "name": "My Extension",
      "version": "1.0.0",
      "icons": {
        "128": "icon.png"
      },
      "browser_action": {
        "default_icon": "icon.png"
      },
      "content_scripts": [
        {
          "matches": [
            "<all_urls>"
          ],
          "js": [
            "content.js"
          ]
        }
      ],
      "background": {
        "scripts": [
          "background.js"
        ]
      }
    }

- `content.js` runs in the same context as the web page you’re on.
- `background.js` runs in the same context as the web page you’re on.


## In React/Next.js

- [Using Next.js to create a browser extension (Chrome & Firefox)](https://dev.to/alexbh/using-next-js-to-create-a-browser-extension-chrome-firefox-490h)
- [Creating a Chrome extension with React and TypeScript](https://blog.logrocket.com/creating-chrome-extension-react-typescript/)
