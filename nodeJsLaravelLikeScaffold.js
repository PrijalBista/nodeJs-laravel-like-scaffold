const fs = require("fs");


const createDirectory = dirname => {
	return new Promise( ( resolve, reject ) => {
		if(fs.existsSync(dirname)) reject("Directory'"+dirname+"' already Exists");
		
		fs.mkdir(dirname, err => {
			if (err) reject(err);
			else resolve("Directory: "+dirname+" created");
		});
		
	});
	
}

const createFile = ( file, content )  => {
	return new Promise( ( resolve, reject ) => {
		let pathToFile = file;
		fs.stat(pathToFile, "utf8", (err, data) => {

			if(err == null) reject("File exists");
			else if(err.code == "ENOENT"){
				//file doesnot exist so creating the file

				fs.writeFile(pathToFile,content, err => {
					if(err) reject(err);
					else resolve("FILE: "+file+" created");
				});
			}
		});
	});	
}

if(!process.argv[2]){
	console.log(` ERR:// One Argument missing <project name>
------------------------------------------------------------------------------------
	Custom NodeJs + Express template generator :)

	Usage: node simpleExpressTemplateWithRoute.js <project-name>
------------------------------------------------------------------------------------
	Example:
	$ node simpleExpressTemplateWithRoute.js myExpressProject
------------------------------------------------------------------------------------
	`);
	process.exit(-1);
}

PROJECT_NAME = process.argv[2];

( async() => {
	try {
		//create project directory
		console.log(await createDirectory(PROJECT_NAME));

		//Create simple package.json file

		packageJson = {
		  "name": PROJECT_NAME.split('/').pop(),
		  "version": "1.0.0",
		  "description": "",
		  "main": "index.js",
		  "scripts": {
		    "start": "nodemon index.js"
		  },
		  "author": "",
		  "license": "ISC",
		  "dependencies": {
		    "express": "latest",
		    "morgan" : "latest",
		    "app-module-path": "latest",
		    "dotenv": "latest",
		  }
		};

		console.log(await createFile(PROJECT_NAME+"/package.json",JSON.stringify(packageJson, null, 4 )));


		//Create directories for Basic project Structure
		console.log(await createDirectory(PROJECT_NAME+"/routes"));
		console.log(await createDirectory(PROJECT_NAME+"/public"));
		console.log(await createDirectory(PROJECT_NAME+"/App"));
		console.log(await createDirectory(PROJECT_NAME+"/App/Http"));
		console.log(await createDirectory(PROJECT_NAME+"/App/Http/Controllers"));

		//Create index.js

		indexFile = `
// adding project directory to search path of require()
require('app-module-path').addPath(__dirname);

// require and load .env
require('dotenv').config();

const express = require("express");
const app = express();

const morgan = require("morgan"); // used for logging because express.logger is deprecated.

// Routes
const webRoute = require("./routes/web");
const apiRoute = require("./routes/api");

// Middlewares
app.use(express.json());
app.use(morgan("tiny"));
app.use(express.static('public'));

// Route Middlewares
app.use("/", webRoute);
app.use("/api", apiRoute);


// Middleware for catching all unregistered routes (can be used to throw 404)
app.use( (req, res, next) => {
	// send 404 err to the error handler
	next(createError(404));
});

// Error handling Middleware . called whenever next function is called with arguments eg. next("Error occured: details");
app.use( (err, req, res, next) => {
	// handle all errors
	res.status(err.status || 500)
	res.send("ERROR OCCURED");
});

app.listen( process.env.PORT || 3000, () => {
	console.log("Server running at port 3000");
});  `;

		console.log(await createFile(PROJECT_NAME+"/index.js",indexFile));


		//Create webRoute .. routes/web.js
		webRouteFile = `
const router = require("express").Router();

const HomeController = require("App/Http/Controllers/HomeController");

router.get("/", (req,res) => {
	res.send("Project <strong>"+process.env.APP_NAME + "</strong> is Ready !");
	// Access variables from .env file with: process.env.variable_name
});

// Using a Controller
router.get("/home", HomeController.index);

module.exports = router;  `;

		console.log(await createFile(PROJECT_NAME+"/routes/web.js", webRouteFile));

		//Create HomeController
		HomeControllerFile = `
exports.index = (req, res, next) => {
	res.send("Hello From HomeController index");
}

// Resource Controller ? Uncomment below
// exports.show = (req, res, next) => {
// 	res.send("Welcome to custom Express Generator :)");
// }

// exports.create = (req, res, next) => {
// 	res.send("Welcome to custom Express Generator :)");
// }
// exports.store = (req, res, next) => {
// 	res.send("Welcome to custom Express Generator :)");
// }
// exports.edit = (req, res, next) => {
// 	res.send("Welcome to custom Express Generator :)");
// }
// exports.update = (req, res, next) => {
// 	res.send("Welcome to custom Express Generator :)");
// }
// exports.delete = (req, res, next) => {
// 	res.send("Welcome to custom Express Generator :)");
// }

`;
		console.log(await createFile(PROJECT_NAME+"/App/Http/Controllers/HomeController.js", HomeControllerFile));

		//create apiRoute .. routes/api.js
		apiRouteFile = `
const router = require("express").Router();

router.get("/", (req,res) => {
	res.json({msg:"Share JSON data : Make Restful API"});
});

module.exports = router;  `;

		console.log(await createFile(PROJECT_NAME+"/routes/api.js", apiRouteFile));

		//create .env file
		envFile = `
APP_NAME=${PROJECT_NAME.split('/').pop()}

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=myDatabaseName
DB_USERNAME=root
DB_PASSWORD=
`;
		console.log(await createFile(PROJECT_NAME+"/.env", envFile));

		console.log("-------------------------------------------------------------------------------------");
		console.log("PROJECT "+PROJECT_NAME+" Created ! Now You can");
		console.log("-------------------------------------------------------------------------------------");
		console.log("\n$ cd "+PROJECT_NAME+"\n\n$ npm install\n\n$ npm start\n");
		console.log("-------------------------------------------------------------------------------------");
		console.log("start script uses nodemon so if u dont have it you can install it globally using\n$ npm install -g nodemon");

	}catch(err) {
		console.log("ERR://"+err);		
	}
})();