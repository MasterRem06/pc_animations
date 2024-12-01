import { app, BrowserWindow, screen, type BrowserWindowConstructorOptions, type Display } from 'electron'
import path from 'node:path'

let mainWindow: BrowserWindow

const prod = false
function createWindow(): void {
  let mainWindowConfig: BrowserWindowConstructorOptions = {
    width: 800,
    height: 480,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      sandbox: false
    },
    show: false,
    fullscreen: prod,
    autoHideMenuBar: prod
  }

  mainWindowConfig = setDisplay(mainWindowConfig);

  mainWindow = new BrowserWindow(mainWindowConfig)

  void mainWindow.loadFile('./src/index.html')

  if (!prod) {
    mainWindow.webContents.openDevTools()
  }

  mainWindow.on('ready-to-show', () => { mainWindow.show() })
}

app.whenReady().then(() => {
  createWindow()
}).catch(() => {
  console.log('Can\'t start application')
})

app.on('window-all-closed', () => {
  app.quit()
})

function setDisplay(options: BrowserWindowConstructorOptions): BrowserWindowConstructorOptions {
  const displays = screen.getAllDisplays();
  const primaryDisplay = screen.getPrimaryDisplay();

  let display = primaryDisplay;
  if (prod) {
    display = displays.reduce((acc: Display, display: Display) => {
      return display.size.width < acc.size.width ? display : acc
    }, primaryDisplay);
  }

  options.x = display.bounds.x;
  options.y = display.bounds.y;
  return options;
}
