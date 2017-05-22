# Image Generator from URL

Service that generates an image, based on input given in an URL.

Made by the team at **Weld** ([www.weld.io](https://www.weld.io?utm_source=github-image-generator-from-url)), the code-free app and web creation tool:

[![Weld](https://s3-eu-west-1.amazonaws.com/weld-social-and-blog/gif/weld_explained.gif)](https://www.weld.io?utm_source=github-image-generator-from-url)


## Screenshot

![Image Generator from URL](example.png)


## How to run it

1. Install GraphicsMagick.
2. Install NPM packages: `npm install`
3. Start with `npm start` (development: `npm run-script dev`)


## How to use it

1. Browser: Open your favorite browser and make an image like this:
`http://localhost:3030/background:*6ec8dc/stroke:white/line:0,0,50,250/drawLine:0,0,250,250`

2. Embed a an image directly into an HTML page:

	<img src="http://localhost:3030/background:*6ec8dc/stroke:white/line:0,0,50,250/drawLine:0,0,250,250">

3. Command line:

	npm start background:*6ec8dc/stroke:white/line:0,0,50,250/drawLine:0,0,250,250


### Parameters

* Image format: `format:jpg` (default: 'png')
* Image size: `size:500,500` (default: 500,500)
* Image width: `width:500` (default: 500)
* Image height: `height:200` (default: 500)
* Background: `background:*DDAADD` (default: white)
* Line stroke: `stroke:*DDAADD`
* Draw a line: `rectangle:10,10,50%,50%`
* Draw a rectangle: `rectangle:10,10,50%,50%`
* Draw an ellipse: `ellipse:10,10,50%,50%`
* Draw text: `10,10,text:A+beautiful+golden+sun\,+is+setting`

Later:

* Draw an image: `image:10,10,50%,50%,http://server.com/image.png`

Draw commands: `arc`, `bezier`, `circle`, `ellipse`, `line`, `point`, `polygon`, `polyline`, `rectangle`, `text`.
See [gm NPM package](https://github.com/aheckmann/gm#methods) for full list of drawing commands.


### Deploying on Heroku

	# Set up and configure app
	heroku create MYAPPNAME
	heroku config:set NODE_ENV=production
	heroku stack:set cedar-14 -a MYAPPNAME
	heroku buildpacks:add https://github.com/xerpa/heroku-buildpack-graphicsmagick.git
	git push heroku master
