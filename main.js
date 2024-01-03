const { app, BrowserWindow } = require('electron')
const path = require('node:path')

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 480,
  })

  mainWindow.loadFile('index.html')

  mainWindow.webContents.openDevTools()
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  app.quit()
})
