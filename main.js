const { app, BrowserWindow, ipcMain, dialog } = require('electron')
const { initialize, enable } = require('@electron/remote/main')
const Datastore = require('nedb-promises')
const path = require('path')
const env = process.env.NODE_ENV || 'development'
const fs = require('fs')

initialize()

// If development environment
// if (env === 'development') {
//   electronReload(__dirname, { 
//     electron: path.join(__dirname, 'node_modules', '.bin', 'electron'),
//   })
// }

async function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: false,
      // sandbox: false
    }
  })

  enable(mainWindow.webContents)

  if (env === 'development') await mainWindow.loadURL('http://localhost:4000')
  else mainWindow.loadFile(path.join(__dirname, 'out', 'build', 'index.html'))

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })

  ipcMain.on('openDialog', (evt, args) => {
    const result = dialog.showOpenDialogSync({
      properties: ['openDirectory']
    })

    if (result) evt.reply('selectDirectory', result)
  })

  ipcMain.on('writeXlsx', (evt, args) => {
    const { path: projectPath, data } = args
    // const basePath = `${path}/translations`
    const basePath = path.join(projectPath, 'translations')
    console.log(basePath)

    if (!fs.existsSync(basePath)) fs.mkdirSync(basePath)
    Object.keys(data || {}).map((lang) => {
      fs.writeFileSync(`${basePath}/${lang}.json`, JSON.stringify(data[lang], null, 2), 'utf-8')
    })
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})