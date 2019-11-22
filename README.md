## Laravel Like Scaffolding For NodeJs Express Application (MINIMAL VERSION)

### Overview 
Have u used laravel extensively for your projects before and love its project structure and overall organisation ?
Well I do and would love to bring similar structure and environment in node. So Here's my attempt of bringing some cool things from laravel. With the help of third party packages (WARNING: USE OF SOME THIRD PARTY PACKAGES like dotenv) a simple yet similar structure project can be built using this script. All the dependencies will be listed here in README as this script becomes bigger with more functionalities.

### Current List Of Dependencies (Minimum dependencies)
1. express
2. morgan

## How To Use The Script To Create A Project
The  Generator Script Itself requires no dependency other than node (Just make sure node is installed in the system).
1. Get the nodeJsLaravelLikeScaffold.js script by either cloning this repo or just copy and paste from raw version.
2. To Create a project do

	``` node nodeJsLaravelLikeScaffold.js <project_name> ``` 

	Example: ``` node nodeJsLaravelLikeScaffold.js myproject ```

	Note That project_name can be path as well like ```node nodeJsLaravelLikeScaffold.js projects/myproject```The last directory (i.e myproject) will be created and project name will be set to 'myproject' in package.json. If you use _ or - in your project name make sure to change the 'name' in package.json as it might give errors. ( project name should not contain _ , - , Uppercase etc look it up). If error shows up change the 'name' in package.json and then npm install again and then npm start.