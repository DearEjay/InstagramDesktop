const electron   = require("electron");
const url 		 = require("url");
const path       = require("path");
const filesystem = require("fs");
const state    = require("./state.js");

const {app, BrowserWindow, Menu} = electron; 

let mainWindow = null;
let closingApp = false;

// SET ENV { 'development' or 'production'}
process.env.NODE_ENV = 'production';



//if it's already open show it
const isAlreadyRunning = app.makeSingleInstance(() => {
	if (!mainWindow)
		return;

	if (mainWindow.isMinimized())
		mainWindow.restore();

	mainWindow.show();
});

//if already running then quit if mainWindow is not null
if (isAlreadyRunning)
	app.quit();

electron.ipcMain.on("count-badges-result", (event, data) => {
	if (typeof app.setBadgeCount === "function")
		app.setBadgeCount(isNaN(data) ? 0 : data);
});



//before you quit get the window bounds  
app.on("before-quit", () => {
	closingApp = true;

	//save application state
	if (mainWindow && !mainWindow.isFullScreen())
		state.set("prevState", mainWindow.getBounds());
});

function createMainWindow() {
	const prevState = state.get("prevState") || {width: 900, height: 675};

	//create the default browswer window with these options 
	const browser = new BrowserWindow({
		width: 1000,
		height: 800,
		minWidth: 1000,
		minHeight: 450,
		title: app.getName(),
		show: false,
		autoHideMenuBar: true,
		titleBarStyle: "hidden-inset",
		webPreferences: {
			nodeIntegration: false,
			preload: path.join(__dirname, "inject/app.js"),
			webSecurity: false
		}
	});


	//when the app quits, close/hide all windows
	browser.on("close", event => {
		if (closingApp)
			return;
		event.preventDefault();
		if (process.platform === "darwin")
			app.hide();
		else
			app.quit();
	});

	//this is loading instagram
	browser.loadURL("https://www.instagram.com", {userAgent: ""});

	//load the css
	browser.webContents.on("dom-ready", () => {
		//browser.webContents.insertCSS(filesystem.readFileSync(path.join(__dirname, "inject/app.css"), "utf8"));
		browser.show();
	});


	//new window handler
	browser.webContents.on("new-window", (event, url) => {
		event.preventDefault();
		electron.shell.openExternal(url);
	});

	return browser;
} // end of function createMainWindow()


//on application ready build the app and menu
app.on("ready", () => {
	//Build menu from template 
	const mainMenu = Menu.buildFromTemplate(mainMenuTemplate); 

	//Insert menu 
	Menu.setApplicationMenu(mainMenu);

	if (!mainWindow)
		mainWindow = createMainWindow();
});


// when app is active, create window if not already and show it
app.on("activate", () => {
	if (!mainWindow)
		mainWindow = createMainWindow();

	mainWindow.show();
});




const mainMenuTemplate = [
	{ //Start of File Label
		label: process.platform === "darwin" ? app.getName() : "File",
		submenu: [
			{
				role: "about"
			},
			{
				type: "separator"
			},
			{
				role: "services",
				submenu: []
			},
			{
				type: "separator"
			},
			{
				role: "hide"
			},
			{
				role: "hideothers"
			},
			{
				role: "unhide"
			},
			{
				type: "separator"
			},
			{
				label: "Quit",
				accelerator: process.platform === "darwin" ? "Command+Q" : "Ctrl+Q",
				click(){
					app.quit();
				}
			}
		] 
	}, // End of File label
	{ //Start of Account Label 
		label: 'Account', 
		submenu: [
			{
				label: "View Profile",
				click() {
					sendAction("show-profile");
				}
			},
			{
				label: "Notifications",
				accelerator: process.platform === "darwin" ? "Command+N" : "Ctrl+N",
				click() {
					sendAction("show-notifications");
				}
			},
			{
				type: "separator"
			},
			{
				label: "Edit Profile",
				click() {
					sendAction("edit-profile");
				}
			},
			{
				label: "Settings",
				accelerator: process.platform === "darwin" ? "Command+," : "Ctrl+,",
				click() {
					sendAction("show-settings");
				}
			},
			{
				type: "separator"
			},
			{
				label: "Log Out",
				click() {
					sendAction("log-out");
				}
			},
		] 
	}, // End of Account label
];

// If OSX, add empty object to menu
if(process.platform == 'darwin'){
  mainMenuTemplate.unshift({});
}



// Add developer tools option if in dev
if(process.env.NODE_ENV !== 'production'){
  mainMenuTemplate.push({
    label: 'Developer Tools',
    submenu:[
      {
        role: 'reload'
      },
      {
        label: 'Toggle DevTools',
        accelerator:process.platform == 'darwin' ? 'Command+I' : 'Ctrl+I',
        click(item, focusedWindow){
          focusedWindow.toggleDevTools();
        }
      }
    ]
  });
}

