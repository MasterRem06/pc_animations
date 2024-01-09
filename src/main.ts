import { app, ipcMain, BrowserWindow, screen } from 'electron'
import path from 'node:path'
import si from 'systeminformation'

let mainWindow: BrowserWindow

const prod = false;

function createWindow(): void {
  const displays = screen.getAllDisplays();
  const primaryDisplay = screen.getPrimaryDisplay();

  const targetDisplay = displays.length === 3 && prod ? displays[2] : primaryDisplay;

  mainWindow = new BrowserWindow({
    width: 800,
    height: 480,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      sandbox: false
    },
    show: false,
    x: targetDisplay.bounds.x,
    y: targetDisplay.bounds.y,
    fullscreen: prod,
    autoHideMenuBar: prod
  })

  void mainWindow.loadFile('./src/index.html')

  mainWindow.webContents.openDevTools()

  mainWindow.on('ready-to-show', () => { mainWindow.show() })
}

app.whenReady().then(() => {
  ipcMain.handle('getGpuStats', getGpuStats)
  createWindow()
}).catch(() => {
  console.log('Can\'t start application')
})

app.on('window-all-closed', () => {
  app.quit()
})

async function getGpuStats(): Promise<string> {
  const graphics = await si.graphics();
  const cpu = await si.cpu();
  const cpuTemperature = await si.cpuTemperature();

  console.log('cpu',cpu);
  console.log('cpuTemperature',cpuTemperature);

  const gpuStats = graphics?.controllers[0].temperatureGpu

  return JSON.stringify({gpuTemp: gpuStats ?? 0, gpuFPS: 60})
}
