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

1. Browser: open your browser and make an image like this:

	`http://localhost:3030/background:*6ec8dc/fill:white/fontSize:100/text:0,20,Weld.io,South/stroke:white,5/line:0,100%,50,250/line:50,250,100,300/line:100,300,50%,20%`

2. Embed a an image directly into an HTML page:

	`<img src="http://localhost:3030/background:*6ec8dc/fill:white/fontSize:100/text:0,20,Weld.io,South/stroke:white,5/line:0,100%,50,250/line:50,250,100,300/line:100,300,50%,20%">`

3. Command line:

	`npm start background:*6ec8dc/fill:white/fontSize:100/text:0,20,Weld.io,South/stroke:white,5/line:0,100%,50,250/line:50,250,100,300/line:100,300,50%,20% myimage.png`


### Parameters

* Image format: `format:jpg` (default: 'png')
* Image size: `size:200,200` (default: 500,500)
* Image width: `width:200` (default: 500)
* Image height: `height:200` (default: 500)
* Background: `background:*DDAADD`** (default: white)
* Line stroke color/size: `stroke:*DDAADD,5`**
* Fill color: `fill:*DDAADD`**
* Draw a line: `line:10,10%,50,50%` (x1,y1,x2,y2)
* Draw a rectangle: `rectangle:10,10%,50,50%` (x1,y1,x2,y2)
* Draw an ellipse: `ellipse:10,10%,50,50%` (x1,y1,x2,y2)
* Draw text: `text:10,10,A%20beautiful%20golden%20sun%20is%20setting,Center`

**Since you can’t use `#` in an URL, use `*` instead for hexadecimal colors.

Later*:

* Draw an image: `image:10,10,50,50,http:!!server.com!image.png` (note: `!` instead of `/`)

Draw commands: `arc`, `bezier`, `circle`, `ellipse`, `line`, `point`, `polygon`, `polyline`, `rectangle`, `text`.
See [gm NPM package](https://github.com/aheckmann/gm#methods) for full list of drawing commands.


## *Upcoming features

* Support for commas in text.
* More drawing commands, e.g. insert an external image (GraphicsMagick `composite`).
* Image templates that require less parameters, e.g. `http://localhost:3030/template:my-template/header-color:red/header-text:Hello%20World!`.


## Deploying on Heroku

Note: currently only runs on [Heroku Cedar-14](https://github.com/Xerpa/heroku-buildpack-graphicsmagick/issues/1)

	# Set up and configure app
	heroku create MYAPPNAME
	heroku stack:set cedar-14 -a MYAPPNAME
	heroku buildpacks:add https://github.com/xerpa/heroku-buildpack-graphicsmagick.git
	git push heroku master
