"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
function createWindow() {
    var mainWindow = new electron_1.BrowserWindow({
        width: 800,
        height: 480,
    });
    mainWindow.loadFile('src/index.html');
    mainWindow.webContents.openDevTools();
}
electron_1.app.whenReady().then(function () {
    createWindow();
    electron_1.app.on('activate', function () {
        if (electron_1.BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});
electron_1.app.on('window-all-closed', function () {
    electron_1.app.quit();
});
