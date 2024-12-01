# pc_animations

I embedded a small raspberry pi monitor inside my computer case and I created this small application in Electron to display animated gif in full screen in it.

In dev mode, the application opens in a small window with the dev tools.
In prod mode, the applciation checks all the displays of the PC to find teh smallest one and go ful lscreen on it.
To change the mode, change the `prod` variable in the `main.ts`.

To create the executable of the app for Windows, run `npm run build:exe`.

https://github.com/user-attachments/assets/6b2ff40a-a230-40e2-8bf8-21136c184dd9
