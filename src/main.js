const { app, BrowserWindow } = require('electron')
const path = require('path');

process.env.NODE_ENV='production';

const isDev=process.env.NODE_ENV !== 'production';

const createWindow = () => {
    //console.log(path.join(__dirname,'./icons/ms.ico'));
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
        nodeIntegration: true,
        devTools: isDev ? true : false 
    },
    
    icon:path.join(__dirname,'./icons/ms.ico')
  });
  

  // Check if --icon switch is provided and if the icon path is specified

  // const argv = process.argv;
  // const iconIndex = argv.indexOf('--icon');
  // if (iconIndex !== -1 && argv.length > iconIndex + 1) {
  //   const iconPath = argv[iconIndex + 1];
  //   win.setIcon(path.resolve(iconPath));
  // }

  if(isDev){
    win.webContents.openDevTools();
  }

  win.loadFile('src/index.html')
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});