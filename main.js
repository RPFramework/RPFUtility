const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow

const path = require('path')
const url = require('url')
const fs = require('fs')

let settings = fs.readFileSync(app.getPath("userData") + "\\settings.json")

const hbs = require('electron-handlebars')({
  title: app.getName(),
  data: JSON.parse(settings),
  version: app.getVersion()
})

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow () {
  mainWindow = new BrowserWindow({width: 990, height: 915, frame: false, backgroundColor: '#fff'})

  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.hbs'),
    protocol: 'file:',
    slashes: true
  }))

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