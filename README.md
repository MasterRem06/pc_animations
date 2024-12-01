# pc_animations

I embedded a small raspberry pi monitor inside my computer case and I created this small application in Electron to display animated gif in full screen in it.

In dev mode, the application opens in a small window with the dev tools.
In prod mode, the applciation checks all the displays of the PC to find teh smallest one and go ful lscreen on it.
To change the mode, change the `prod` variable in the `main.ts`.

To create the executable of the app for Windows, run `npm run build:exe`.
