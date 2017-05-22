# Image Generator from URL

Generate an image from instructions given in an URL or the command line.

Made by the team at **Weld** ([www.weld.io](https://www.weld.io?utm_source=github-image-generator-from-url)), the code-free app and web creation tool:

[![Weld](https://s3-eu-west-1.amazonaws.com/weld-social-and-blog/gif/weld_explained.gif)](https://www.weld.io?utm_source=github-image-generator-from-url)


## Screenshot

![Image Generator from URL](example.png)


## How to start it

1. Install GraphicsMagick.
2. Install NPM packages: `npm install`
3. Start with `npm start` (development: `npm run-script dev`)


## How to use it

1. Browser: Open your favorite browser and make an image like this:

	`http://localhost:3030/background:*6ec8dc/fill:white/fontSize:100/text:30,100,Weld.io/stroke:white,5/line:0,500,50,250/line:50,250,100,300/line:100,300,200,200`

2. Embed a an image directly into an HTML page:

	`<img src="http://localhost:3030/background:*6ec8dc/fill:white/fontSize:100/text:30,100,Weld.io/stroke:white,5/line:0,500,50,250/line:50,250,100,300/line:100,300,200,200">`

3. Command line:

	`npm start background:*6ec8dc/fill:white/fontSize:100/text:30,100,Weld.io/stroke:white,5/line:0,500,50,250/line:50,250,100,300/line:100,300,200,200 myimage.png`


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

Later*:

* Draw an image: `image:10,10,50%,50%,http://server.com/image.png`

Draw commands: `arc`, `bezier`, `circle`, `ellipse`, `line`, `point`, `polygon`, `polyline`, `rectangle`, `text`.
See [gm NPM package](https://github.com/aheckmann/gm#methods) for full list of drawing commands.


## *Upcoming features

* More drawing commands, e.g. insert an external image.
* Support for relative units e.g. `50%`.
* Image templates that require less parameters, e.g. `http://localhost:3030/template/my-template/color:red/text:Hello%20World!`.


## Deploying on Heroku

Note: currently only runs on [Heroku Cedar-14](https://github.com/Xerpa/heroku-buildpack-graphicsmagick/issues/1)

	# Set up and configure app
	heroku create MYAPPNAME
	heroku stack:set cedar-14 -a MYAPPNAME
	heroku buildpacks:add https://github.com/xerpa/heroku-buildpack-graphicsmagick.git
	git push heroku master
