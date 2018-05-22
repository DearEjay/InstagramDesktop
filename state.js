const electron   = require("electron");
const url 		 = require("url");
const path       = require("path");
const filesystem = require("fs");

const dataPath = path.join(electron.app.getPath("userData"), "data.json");

function readDataFromFile() {
	try {
		return JSON.parse(filesystem.readFileSync(dataPath, "utf8"));
	} catch (error) {
	}
	return {};
}
exports.set = (key, val) => {
	const data = readDataFromFile();
	data[key] = val;
	filesystem.writeFileSync(dataPath, JSON.stringify(data));
};

exports.get = key => readDataFromFile()[key];