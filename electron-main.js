const { app, BrowserWindow, Tray, Menu, nativeImage } = require('electron');
const path = require('path');

let mainWindow = null;
let tray = null;
let isQuitting = false;

const ICON = nativeImage.createFromDataURL(
  'data:image/svg+xml;base64,' + Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="12" fill="#06091C"/><text x="32" y="42" text-anchor="middle" font-size="32">⚽</text></svg>`).toString('base64')
);

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 380,
    height: 300,
    minWidth: 320,
    minHeight: 220,
    alwaysOnTop: true,
    title: 'WC 2026 Tracker',
    backgroundColor: '#06091C',
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
    },
    show: false,
  });

  mainWindow.loadFile(path.join(__dirname, 'wc2026_tracker.html'), {
    query: { view: 'float', app: '1' },
  });

  mainWindow.once('ready-to-show', () => mainWindow.show());

  mainWindow.on('close', (e) => {
    if (process.platform === 'darwin' && !isQuitting) {
      e.preventDefault();
      mainWindow.hide();
    }
  });
}

function createTray() {
  tray = new Tray(ICON);
  tray.setToolTip('WC 2026 Tracker');
  tray.setContextMenu(Menu.buildFromTemplate([
    { label: 'Show Tracker', click: () => { mainWindow?.show(); mainWindow?.focus(); } },
    { type: 'separator' },
    { label: 'Quit', click: () => { isQuitting = true; app.quit(); } },
  ]));
  tray.on('click', () => {
    if (mainWindow?.isVisible()) mainWindow.hide();
    else { mainWindow?.show(); mainWindow?.focus(); }
  });
}

app.whenReady().then(() => {
  createWindow();
  createTray();
  app.dock?.show();
});

app.on('before-quit', () => { isQuitting = true; });

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (!mainWindow) createWindow();
  else mainWindow.show();
});
