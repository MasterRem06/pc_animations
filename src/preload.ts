import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("api", {
    getGpuTemperature: () => ipcRenderer.invoke("getGpuTemperature")
});
