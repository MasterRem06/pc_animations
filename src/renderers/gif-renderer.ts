// eslint-disable-next-line @typescript-eslint/no-unused-vars
declare interface Window {
    electronApi: {
        updateImageSrc: (src: string) => string;
    };
  }

const TIMER = 60 * 1000;

const IMAGES = [
    'dan_da_dan',
    'ichigo',
    'kaiju',
    'luffy',
    'naruto',
    'tanjiro',
];

let currentImageIndex: number = 0;

function renderNewGif(): void {
    window.electronApi.updateImageSrc(IMAGES[currentImageIndex]);
    currentImageIndex = currentImageIndex < IMAGES.length - 1 ? currentImageIndex + 1 : 0;
}

setInterval(renderNewGif, TIMER);
renderNewGif();