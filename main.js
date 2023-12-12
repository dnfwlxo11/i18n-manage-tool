const { app, BrowserWindow } = require('electron')
const electronReload = require('electron-reload')
const path = require('path')
const env = process.env.NODE_ENV || 'development'

// If development environment
if (env === 'development') {
  electronReload(__dirname, { 
    electron: path.join(__dirname, 'node_modules', '.bin', 'electron'),
  })
}

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  if (env === 'development') mainWindow.loadURL('http://localhost:5173')
  else mainWindow.loadFile(path.join(__dirname, './dist/index.html'))

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})