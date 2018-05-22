# Instagram Electron

An unofficial Instagram desktop application made with [Electron](http://electron.atom.io/)

## Installing

1. Download and Install Node.js and npm

[Download Node.js](https://nodejs.org/en/download/) here which will also install npm.

Check your installs with node -v and npm -v.

2. Clone the Repository

Use the SSH link to download the repo using git clone ```git@github.com:DearEjay/InstagramDesktop.git```.

**OR**

Use the HTTPS link to download the repo using git clone ```https://github.com/DearEjay/InstagramDesktop.git```.

3. Install Dependencies

This command must be run every time you pull to download any new packages someone else may have added.

Run ```npm install``` in the top level directory of the project (where ```package.json``` is) to install dependencies.


4. Build the Project

* For ```development mode```:
	Ensure that ```line 13``` in ```main.js``` is set to ```'development'```.
	 Then, run ```npm start```.

    ***OR***

* For ```production mode```:
	Ensure that ```line 13``` in ```main.js``` is set to ```'production'```.
	 Then, run ```npm start```.

## (Optional) Create a Custom Build

After following ```steps 1-3``` above, you can create your own custom build. 

* Build macOS:
	Run ```npm package-mac```

* Build Windows:
	Run ```npm package-win```
* Build Linux:
	Run ```npm package-linux```


## Built With

* [Electron](http://electron.atom.io/)


## License

MIT © [Ejay Mallard](https://cs.baylor.edu/~mallard/)

## Acknowledgments

* [Traversy Media](http://www.traversymedia.com)


