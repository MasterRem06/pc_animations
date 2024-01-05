const gpuTemp = document.getElementById('gpu-temp')

async function setGpuTemp(): Promise<void> {
  if (gpuTemp != null) {
    // @ts-expect-error Electron api not recognized by vs-code
    const temp = await window.api.getGpuTemperature()
    console.log('temp', temp)
    gpuTemp.innerText = `Temperature = ${temp}`
  }
}

setInterval(() => {
  void setGpuTemp()
}, 1000)
