const { app, BrowserWindow, ipcMain, dialog } = require('electron')
const electronReload = require('electron-reload')
const path = require('path')
const env = process.env.NODE_ENV || 'development'

// If development environment
// if (env === 'development') {
//   electronReload(__dirname, { 
//     electron: path.join(__dirname, 'node_modules', '.bin', 'electron'),
//   })
// }

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    webPreferences: {
      // preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      enableremotemodule: true,
      contextIsolation: false,
    }
  })

  if (env === 'development') mainWindow.loadURL('http://localhost:4000')
  else mainWindow.loadFile(path.join(__dirname, 'index.html'))

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

    evt.reply('selectDirectory', result)
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})