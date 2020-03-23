https://www.electronjs.org/

Cross-platform desktop apps with JavaScript, HTML, and CSS

- https://medium.com/better-programming/cross-platform-apps-with-electron-and-react-part-1-68d6b6be4c1b
- https://www.freecodecamp.org/news/heres-how-i-created-a-markdown-app-with-electron-and-react-1e902f8601ca/

Boilerplate

- Redux + TypeScript: https://github.com/electron-react-boilerplate/electron-react-boilerplate

Build from scratch

- create-react-app
- Dev tools:
    - `yarn add electron-builder wait-on concurrently --dev`
    - `"electron-dev": "concurrently 'BROWSER=none yarn start' 'wait-on http://localhost:3000 && electron .'"`