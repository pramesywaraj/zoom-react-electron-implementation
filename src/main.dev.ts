/* eslint global-require: off, no-console: off */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `yarn build` or `yarn build-main`, this file is compiled to
 * `./src/main.prod.js` using webpack. This gives us some performance wins.
 */
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import path from 'path';
import { app, BrowserWindow, shell, ipcMain } from 'electron';
import { autoUpdater } from 'electron-updater';
import log from 'electron-log';
import MenuBuilder from './menu';

const os = require('os');

const platform = os.platform();
const arch = os.arch();

// Electron initialization
const {
  ZOOM_TYPE_OS_TYPE,
  ZoomSDK_LANGUAGE_ID,
  ZoomSDKError,
  ZoomAuthResult,
  ZoomLoginStatus,
  ZoomMeetingStatus,
  ZoomMeetingUIFloatVideoType,
  SDKCustomizedStringType,
  SDKCustomizedURLType,
  ZoomAPPLocale,
} = require('../lib/settings.js');

try {
  require('../lib/electron_sdk_pb.js');
} catch (error) {
  console.log(
    'Please execute npm install google-protobuf at root of the project \nRefer to README.md'
  );
  app.exit();
}

const ZOOMSDKMOD = require('../lib/zoom_sdk.js');

const ZOOM_API_KEY = 'g8FwPBnJ22Las2WYV5d2gRQBG66yYt85FAeX';
const ZOOM_API_SECRET = '3nNJcsR4fACjW9SMuABxMheqJCF0N8uWWQoN';

let zoomsdk = null;
let zoomauth = null;
let zoommeeting;
let zoomparticipantsctrl;
let zoomrawdata;
let hasRDLicense;

// Zoom SDK init callback functions
function hasRawDataLicense() {
  const ret = zoomrawdata.HasRawDataLicense();
  return ret;
}

function sdkauthCB(status) {
  console.log('CHECK SDK AUTH CALLBACK', status);
  if (ZoomAuthResult.AUTHRET_SUCCESS == status) {
    const opts = {
      meetingstatuscb: (status, result) => {
        console.log('check meeting status and result', status, result);
        if (status === ZoomMeetingStatus.MEETING_STATUS_ENDED) {
          // browserWindowInstance.webContents.send('ZOOM_MEETING_END');
        }
      },
      meetinguserjoincb: () => console.log('user joined the meeting'),
      meetinguserleftcb: () => console.log('USER LEFT THE MEETING'),
      meetinghostchangecb: () => console.log('meeting host change'),
    };
    zoommeeting = zoomsdk.GetMeeting(opts);
    app.zoommeeting = zoommeeting;
    zoomparticipantsctrl = zoommeeting.GetMeetingParticipantsCtrl(opts);
    app.zoomparticipantsctrl = zoomparticipantsctrl;
    zoomrawdata = zoomsdk.RawData();
    hasRDLicense = hasRawDataLicense();
    global.hasRDLicense = hasRDLicense;
    app.zoomrawdata = zoomrawdata;
  }
}

function apicallresultcb(apiname, ret) {
  if (apiname === 'InitSDK' && ZoomSDKError.SDKERR_SUCCESS === ret) {
    console.log('SDK IS READY');
  } else if (apiname === 'CleanUPSDK') {
    app.quit();
  }
}

const initoptions = {
  apicallretcb: apicallresultcb,
  ostype: ZOOM_TYPE_OS_TYPE.MAC_OS,
  path:
    platform === 'darwin'
      ? './../sdk/mac/'
      : arch === 'x64'
      ? './../sdk/win64/'
      : './../sdk/win32/',
};

zoomsdk = ZOOMSDKMOD.ZoomSDK.getInstance(initoptions);

console.log("CHECK ZOOM SDK VERSION", zoomsdk.GetZoomSDKVersion());

const ret = zoomsdk.InitSDK();
if (ZoomSDKError.SDKERR_SUCCESS === ret) {
  const options = {
    authcb: (status) => sdkauthCB(status),
    logincb: null,
    logoutcb: null,
  };
  // AUTH APP
  zoomauth = zoomsdk.GetAuth(options);
  global.zoomauth = zoomauth;

  const sdkAuthResult = zoomauth.SDKAuth(ZOOM_API_KEY, ZOOM_API_SECRET);
  console.log('CHECK SDK AUTH VALUE', sdkAuthResult);
  if (sdkAuthResult === 0) {
    // IF APP IS AUTHORIZED - CREATE MAIN WINDOW
    console.log('ZOOM SDK AUTHORIZED');
  }
}
// Zoom SDK init callback functions

export default class AppUpdater {
  constructor() {
    log.transports.file.level = 'info';
    autoUpdater.logger = log;
    autoUpdater.checkForUpdatesAndNotify();
  }
}

let mainWindow: BrowserWindow | null = null;

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

if (
  process.env.NODE_ENV === 'development' ||
  process.env.DEBUG_PROD === 'true'
) {
  require('electron-debug')();
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS'];

  return installer
    .default(
      extensions.map((name) => installer[name]),
      forceDownload
    )
    .catch(console.log);
};

const createWindow = async () => {
  if (
    process.env.NODE_ENV === 'development' ||
    process.env.DEBUG_PROD === 'true'
  ) {
    await installExtensions();
  }

  const RESOURCES_PATH = app.isPackaged
    ? path.join(process.resourcesPath, 'assets')
    : path.join(__dirname, '../assets');

  const getAssetPath = (...paths: string[]): string => {
    return path.join(RESOURCES_PATH, ...paths);
  };

  mainWindow = new BrowserWindow({
    show: false,
    width: 1024,
    height: 728,
    icon: getAssetPath('icon.png'),
    webPreferences: {
      nodeIntegration: true,
    },
  });

  mainWindow.loadURL(`file://${__dirname}/index.html`);

  // @TODO: Use 'ready-to-show' event
  //        https://github.com/electron/electron/blob/master/docs/api/browser-window.md#using-ready-to-show-event
  mainWindow.webContents.on('did-finish-load', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
      mainWindow.focus();
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();

  // Open urls in the user's browser
  mainWindow.webContents.on('new-window', (event, url) => {
    event.preventDefault();
    shell.openExternal(url);
  });

  // Remove this if your app does not use auto updates
  // eslint-disable-next-line
  new AppUpdater();
};

/**
 * Add event listeners...
 */

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.whenReady().then(createWindow).catch(console.log);

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) createWindow();
});

ipcMain.on('JOIN_MEETING', async (event, optionObj) => {
  console.log('CHECK OPTION Obj', optionObj);
  const joinMeetingResultStatus = await zoommeeting.JoinMeetingWithoutLogin(
    optionObj
  );

  console.log('CHECK', joinMeetingResultStatus);
});
