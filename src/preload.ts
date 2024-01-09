import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('api', {
  getGpuStats: async () => await ipcRenderer.invoke('getGpuStats')
})
