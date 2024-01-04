const gpuTemp = document.getElementById('gpu-temp');

async function setGpuTemp(): Promise<void> {
    if (gpuTemp) {
        // @ts-expect-error
        const temp = await window.api.getGpuTemperature();
        console.log('temp',temp);
        gpuTemp.innerText = `Temperature = ${temp}`;
    }
}

setInterval(() => {
    setGpuTemp();
}, 1000);
