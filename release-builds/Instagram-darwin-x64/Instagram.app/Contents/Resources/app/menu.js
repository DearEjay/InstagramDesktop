const electron = require('electron');
const url = require('url');
const path = require('path');
const os       = require("os");



function getWindow(callback) {
	const browser = electron.BrowserWindow.getFocusedWindow() || electron.BrowserWindow.getAllWindows()[0];
	if (!browser)
		return;

	browser.restore();
	if (typeof callback === "function")
		callback(browser);
}

function sendAction(action) {
	getWindow(browser => {
		browser.webContents.send(action);
	});
}


//build menu from template
const mainMenu = Menu.buildFromTemplate(mainMenuTemplate); 

//Create menu template
const mainMenuTemplate = [
	{
		label: process.platform === "darwin" ? electron.app.getName() : "File",
		submenu:[
			{
				role: "about"
			},
			{
				type: "separator"
			},
			{
				label: "Quit Mist",
				accelerator: process.platform === "darwin" ? 'Command+Q' : 'Ctrl+Q',
				click(){
					app.quit();
				}
			},

		]
	},
	{
		label: 'Controls'
		submenu:[
			{
				label: "Search",
				accelerator: process.platform === "darwin" ? 'Command+' : 'Ctrl+P',

				click(){
					alert("show-profile");
				}
			},
			{
				type: "separator"
			},
			{
				label: "View Your Notifications",
				accelerator: process.platform === "darwin" ? 'Command+N' : 'Ctrl+N',
				click(){
					alert("show-notifications");
				}
			},
			{
				label: "View Your Stats",
				accelerator: process.platform === "darwin" ? 'Command+S' : 'Ctrl+S',

				click(){
					alert("show-stats");
				}
			},
			{
				type: "separator"
			},
			{
				label: "Quit Mist",
				accelerator: process.platform === "darwin" ? 'Command+Q' : 'Ctrl+Q',
				click(){
					app.quit();
				}
			},

		]
	}
];