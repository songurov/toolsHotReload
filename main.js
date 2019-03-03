// Modules to control application life and create native browser window
const {app, BrowserWindow, Menu,Tray} = require('electron')
const opn = require('opn');
var path = require('path')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow
let author = 'https://github.com/songurov';
let tray = null

function createWindow () {
  // Create the browser window.NP
  mainWindow = new BrowserWindow({
    width: 350,
    height: 250,
    resizable: false,
    icon: path.join(__dirname, 'assets/hot_reload.png')
  })

  tray = new Tray(path.join(__dirname, 'assets/hot_reload.png'))

  const contextMenu = Menu.buildFromTemplate([
    { label: 'Item1', type: 'radio' },
    { label: 'Item2', type: 'radio' },
    { label: 'Item3', type: 'radio', checked: true },
    { label: 'Item4', type: 'radio' }
  ])

  tray.setToolTip('This is my application.')
  tray.setContextMenu(contextMenu)

  mainWindow.on('minimize', () => {
     mainWindow.hide() 
  });

  tray.on('click', () => {
    mainWindow.isVisible() ? mainWindow.hide() : mainWindow.show()
  })

  const name = "Reference"
  const template = [
    {
      label: 'File',
      submenu: [
        {
          label:'Quit',
          click:_ => {
            app.quit();
          },
          accelerator: 'Cmd+Q'
        }
      ]
    },
    {
      label: name,
      submenu: [
        {
          label:'About',
          click:_ => {
            opn(author);
          }
        }
      ]
    }
   ]

  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)

  mainWindow.loadFile('src/windows/views/splash.html')

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


