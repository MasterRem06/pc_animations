import { app, ipcMain, BrowserWindow } from 'electron';
import path from 'node:path';
import si from 'systeminformation';

let mainWindow: BrowserWindow;

function createWindow(): void {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 480,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      sandbox: false
    },
    show:false
  })

  mainWindow.loadFile('./src/index.html')

  mainWindow.webContents.openDevTools()

  mainWindow.on("ready-to-show", () => mainWindow.show())
}

app.whenReady().then(() => {
  ipcMain.handle('getGpuTemperature', getGpuTemperature)
  createWindow();
})

app.on('window-all-closed', () => {
  app.quit()
})


async function getGpuTemperature(): Promise<number> {
    try {
      console.log('Calling function');
      const graphics = await si.graphics()
      console.log('graphics:', graphics);

      const gpuStats = graphics?.controllers[0].temperatureGpu;

      console.log('gpuStats:', gpuStats);


      return gpuStats ?? 0;
    } catch (error) {
      console.error('Error retrieving CPU temperature:', error);
      return -1;
    }
 }
