const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow

const path = require('path')
const url = require('url')
const fs = require('fs')

//Figure out if the settings exists and if not, create the default settings
const spath = path.join(app.getPath('userData'), 'settings.json')
let gotSettings = false;

try {
	fs.openSync(spath, 'wx')
} catch(err) {
	if(err.code === "EEXIST") gotSettings = true
}
let settings = JSON.stringify({"packpath":"RPFramework\\pack.bat","buildpath":"RPFramework\\pack.bat","srvrpath":"C:\\Program Files (x86)\\Steam\\steamapps\\common\\Arma 3\\arma3server_x64.exe","params":"-port=2302 \"-config=C:\\Program Files (x86)\\Steam\\steamapps\\common\\Arma 3\\TADST\\rpf\\TADST_config.cfg\" \"-cfg=C:\\Program Files (x86)\\Steam\\steamapps\\common\\Arma 3\\TADST\\rpf\\TADST_basic.cfg\" \"-profiles=C:\\Program Files (x86)\\Steam\\steamapps\\common\\Arma 3\\TADST\\rpf\" -name=rpf -pid=pid.log -ranking=ranking.log \"-mod=@extDB3;@RPF_Server;@RPFramework\"","logs":"C:\\Program Files (x86)\\Steam\\steamapps\\common\\Arma 3\\TADST\\rpf"})
if (gotSettings) {
	settings = fs.readFileSync(spath)
} else {
	fs.writeFile(spath, settings, (err) => {if (err) throw err})
}

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