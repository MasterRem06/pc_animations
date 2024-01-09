const THERMO_TEMP_BAR_MIN = 30;
const THERMO_TEMP_BAR_MAX = 80;
const THERMO_TEMP_BAR_MIDDLE = (THERMO_TEMP_BAR_MAX + THERMO_TEMP_BAR_MIN) / 2;

const gpuTemp = document.getElementById('gpu-temp')
const thermoTempBar = document.getElementById('thermo-temp-bar')
const thermoTempCircle = document.getElementById('thermo-temp-circle')

setInterval(() => {
  void setGpuTemp()
}, 1000)


async function setGpuTemp(): Promise<void> {
  // @ts-expect-error Electron api not recognized by vs-code
  const gpuStats = JSON.parse(await window.api.getGpuStats() as string);

  const fps: number = gpuStats.gpuFPS;

  setGpuTemperature(gpuStats.gpuTemp as number);

  console.log('fps',fps);
}

function setGpuTemperature(temperature: number): void {
  if (gpuTemp != null && thermoTempBar != null) {
    gpuTemp.innerText = `Temperature = ${temperature}`;

    const tempBarHeight = temperature - THERMO_TEMP_BAR_MIN;
    thermoTempBar.style.height = `${tempBarHeight}px`;
  
    setThermometerColor(temperature)
  }
}

function setThermometerColor(temperature: number): void {
  const thermometerColor = getThermometerColor(temperature);

  if (thermoTempBar != null && thermoTempCircle != null) {
    thermoTempBar.style.backgroundColor = thermometerColor
    thermoTempCircle.style.backgroundColor = thermometerColor
  }
}

function getThermometerColor(temperature: number): string {
  const tempRebased = temperature - THERMO_TEMP_BAR_MIN;
  const middleTempRebased = THERMO_TEMP_BAR_MIDDLE - THERMO_TEMP_BAR_MIN;

  if (tempRebased < middleTempRebased) {
      return getRgbColor(tempRebased * 10, 255);
  } else if (tempRebased > middleTempRebased) {
      return getRgbColor(255, Math.abs(((tempRebased - middleTempRebased) * 10) - 255 ));
  } else {
      return getRgbColor(255, 255);
  }
}

function getRgbColor(redValue: number = 0, greenValue: number = 0, blueValue: number = 0): string {
  return `rgb(${redValue},${greenValue},${blueValue})`
}