var express = require('express');
var app = express();

var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use(express.static("./public"));

app.get('/', function (req, res) {
   res.redirect('index.html');
});

server.listen(3000);

var matrix = require("./modules/matrix.js");

var Grass = require("./modules/class.grass.js");
var GrassEater = require("./modules/class.grasseater.js");
var Predator = require("./modules/class.predator.js");
var Tank = require("./modules/class.tank.js");
var Glutton = require("./modules/class.glutton.js");

io.on('connection', function (socket) {
	socket.emit("send matrix", matrix);

	setInterval(function(){  
          for (var y = 0; y < matrix.length; y++) {
            for (var x = 0; x < matrix[y].length; x++) {
                if (matrix[y][x].index == 1) {
                    matrix[y][x].mul(matrix);
                }
                else if (matrix[y][x].index == 2) {
                    matrix[y][x].eat(matrix);
                }
                else if(matrix[y][x].index == 3)
                {
                    matrix[y][x].eat(matrix);
                }
                else if(matrix[y][x].index == 4)
                {
                    matrix[y][x].eat(matrix);
                }
                else if(matrix[y][x].index == 5)
                {
                    matrix[y][x].kill(matrix);
                }
            }
          }

		socket.emit("redraw", matrix);
	}, time);
});

var matrix = require("./modules/matrix.js");

var time = frameRate(5);

function frameRate(frameCount)
{
    return 1000 / frameCount;
}




//setInterval(draw, time) 