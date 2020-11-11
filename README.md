"scripts": {
    "build": "webpack --mode production",
    "start": "webpack-dev-server --open"
},
  
"scripts": {
	"start": "node server.js", 
	"heroku-postbuild": "webpack -p" 
},
