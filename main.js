const { app, BrowserWindow, ipcMain, dialog } = require('electron')
const { initialize, enable } = require('@electron/remote/main')
const Datastore = require('nedb-promises')
const path = require('path')
const env = process.env.NODE_ENV || 'development'

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
      // preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: false,
      // sandbox: false
    }
  })

  enable(mainWindow.webContents)

  if (env === 'development') await mainWindow.loadURL('http://localhost:4000')
  else mainWindow.loadFile(path.join(__dirname, 'index.html'))

  // Open the DevTools.
  mainWindow.webContents.openDevTools()
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

  ipcMain.on('dbInit', (evt, args) => {
    // const dbPath = path.join(app.getAppPath('appData'), 'appData', 'app.db')
    const dbPath = path.join('./', 'appData', 'app.db')
    
    // const datastore = Datastore.create({
    //   autoload: true,
    //   filename: dbPath
    // })

    evt.reply('db', dbPath)
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})