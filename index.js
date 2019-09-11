const { app, BrowserWindow, ipcMain, net } = require('electron');

let mainWindow

function createWindow() {
    mainWindow = new BrowserWindow({
        fullscreen: true,
        webPreferences: {
            nodeIntegration: true,
            webSecurity: false
        }
    })

    mainWindow.loadFile('./page/login/login.html')

    // mainWindow.webContents.openDevTools()


    mainWindow.on('closed', function () {
        mainWindow = null
    })

}

app.on('ready', createWindow)

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', function () {
    if (mainWindow === null) {
        createWindow()
    }
})

ipcMain.on('main-message', function (event, arg) {
    const path = arg.path;
    if (path) {
        mainWindow.loadFile(`./page/${path}/${path}.html`)
    }
    // event.sender.send('asynchronous-reply', 'pong')
})

global.sharedObject = {
    patient_pid: 'default value'
}