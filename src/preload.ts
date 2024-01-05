import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('api', {
  getGpuTemperature: async () => await ipcRenderer.invoke('getGpuTemperature')
})
