import { contextBridge } from "electron";

const IMAGE_ID = 'dynamic-image';

contextBridge.exposeInMainWorld('electronApi', {
    updateImageSrc: (src: string) => {
      const imageElement = document.getElementById(IMAGE_ID);
      if (imageElement != null) {
        (imageElement as HTMLImageElement).src = `../dist/assets/${src}.gif`;
        (imageElement as HTMLImageElement).alt = src;
      } else {
        console.error(`Image with ID "${IMAGE_ID}" not found.`);
      }
    }
  });