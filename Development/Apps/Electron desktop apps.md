# Electron

https://www.electronjs.org/

Cross-platform desktop apps with JavaScript, HTML, and CSS

## Guides

https://medium.com/@shivekkhurana/a-gluten-free-electron-react-setup-ft-live-reload-f6e5bbbd964

https://medium.com/better-programming/cross-platform-apps-with-electron-and-react-part-1-68d6b6be4c1b

https://www.freecodecamp.org/news/heres-how-i-created-a-markdown-app-with-electron-and-react-1e902f8601ca/

## Boilerplates

- React, PostCSS and Webpack: https://github.com/alexdevero/electron-react-webpack-boilerplate
- Redux + TypeScript: https://github.com/electron-react-boilerplate/electron-react-boilerplate
- Preact: https://github.com/BashCloud/preact-electron

## Build from scratch

create-react-app

    yarn create react-app my-app  # or npx create-react-app my-app, or npm init create-react-app my-app
    yarn add electron — dev

    "electron-start": "electron ."

- Dev tools:
    - `yarn add electron-builder wait-on concurrently --dev`
    - `"electron-dev": "concurrently 'BROWSER=none yarn start' 'wait-on http://localhost:3000 && electron .'"`

## Debugging

    mainWindow.webContents.openDevTools() // see main.js, could be included

## Main process vs Renderer process (backend/frontend)

NOTE: `console.log` in Main process is output in terminal, not browser console.

Main:

    const { app } = require('electron')

Renderer:

    const { app } = require('electron').remote

### IPC

    // Renderer
    const { ipcRenderer } = require('electron')
    ipcRenderer.send('myEvent', {})

    // Main
    const { ipcMain } = require('electron')
    ipcMain.on('myEvent', (event, args) => {
      event.reply('myEvent-reply', 'pong')
    })

Remove:

    ipcRenderer.removeListener('myEvent', myListenerFunction)

Synchronous (sendSync, returnValue):

    ipcRenderer.sendSync('myEvent', 'ping')

    ipcMain.on('myEvent', (event, arg) => {
      event.returnValue = 'pong'
    })

https://www.electronjs.org/docs/api/remote

## UI Kits

http://photonkit.com/components/

## Open/Save files

https://ourcodeworld.com/articles/read/106/how-to-choose-read-save-delete-or-create-a-file-with-electron-framework

### Dialogs

    const { dialog } = require('electron').remote
    const fs = require('fs')

    dialog.showOpenDialog((fileNames) => {
      // fileNames is an array that contains all the selected
      if (fileNames === undefined) {
        console.log('No file selected')
        return
      }

      const fileName1 = fileNames[0]

      fs.readFile(fileName1, 'utf-8', (err, data) => {
        if (err) {
          window.alert('An error ocurred reading the file :' + err.message)
          return
        }
        // Change how to handle the file content
        console.log('The file content is : ' + data)
        setText(data)
      })
    })

    dialog.showSaveDialog((fileName) => {})

### File locations

Useful in saving files to the the right place regardless of the OS:

    app.getPath(name)
    app.setPath(name, path)
    app.getAppPath()

### Keyboard shortcuts

https://www.electronjs.org/docs/tutorial/keyboard-shortcuts

    const { Menu, MenuItem } = require('electron')
    const menu = new Menu()

    menu.append(new MenuItem({
      label: 'Print',
      accelerator: 'CmdOrCtrl+P',
      click: () => { console.log('time to print stuff') }
    }))
