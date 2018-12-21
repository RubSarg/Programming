var Grass = require("./modules/class.grass");
var GrassEater = require("./modules/class.grasseater");
var Predator = require("./modules/class.predator");
var Tank = require("./modules/class.tank");
var Glutton = require("./modules/class.glutton");

Grass.born = 0;
Grass.dead = 0;
Grass.current = 0;

GrassEater.born = 0;
GrassEater.dead = 0;
GrassEater.current = 0;

Predator.born = 0;
Predator.dead = 0;
Predator.current = 0;

Glutton.born = 0;
Glutton.dead = 0;
Glutton.current = 0;

Tank.born = 0;
Tank.dead = 0;
Tank.current = 0;   

var express = require('express');
var fs = require('fs');
var app = express();

var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use(express.static("./public"));

app.get('/', function (req, res) {
   res.redirect('index.html');
});

server.listen(3001);

io.on('connection', function (socket) {
	socket.emit("send matrix", matrix);

	setInterval(function(){  
          for (var y = 0; y < matrix.length; y++) {
            for (var x = 0; x < matrix[y].length; x++) {
                if (matrix[y][x].index == 1) {
                    matrix[y][x].mul(matrix);
                    //stat.Grass.born++;
                }
                else if (matrix[y][x].index == 2) {
                    matrix[y][x].eat(matrix);
                    //stat.GrassEater.born++;
                }
                else if(matrix[y][x].index == 3)
                {
                    matrix[y][x].eat(matrix);
                    //stat.Predator.born++;
                }
                else if(matrix[y][x].index == 4)
                {
                    matrix[y][x].eat(matrix);
                    //stat.Glutton.born++;
                }
                else if(matrix[y][x].index == 5)
                {
                    matrix[y][x].kill(matrix);
                    //stat.Tank.born++;
                }
            }
          }

		socket.emit("redraw", matrix);
    }, time);
    
    
    setInterval(function () {
        stat = {
            "Grass": {
                "born": Grass.born,
                "dead": Grass.dead,
                "current": Grass.current
            },
            "GrassEater": {
                "born": GrassEater.born,
                "dead": GrassEater.dead,
                "current": GrassEater.current
            },
            "Predator": {
                "born": Predator.born,
                "dead": Predator.dead,
                "current": Predator.current
            },
            "Glutton" : {
                "born": Glutton.born,
                "dead": Glutton.dead,
                "current": Glutton.current
            },
            "Tank":{
                "born": Tank.born,
                "dead": Tank.dead,
                "current": Tank.current
            }
        };
        
        var myJSON = JSON.stringify(stat);
        fs.writeFileSync("statistics.json", myJSON);
        socket.emit("stats", stat);
    }, 1000);
});



var time = frameRate(5);

function frameRate(frameCount)
{
    return 1000 / frameCount;
}

var matrix = require("./modules/matrix.js");

var stat = {
	"Grass": {
		"born": 0,
		"dead": 0,
		"current": 0
	},
	"GrassEater": {
		"born": 0,
		"dead": 0,
		"current": 0
	},
	"Predator": {
		"born": 0,
		"dead": 0,
		"current": 0
	},
	"Glutton" : {
		"born": 0,
		"dead": 0,
		"current" : 0
    },
    "Tank":{
        "born": 0,
		"dead": 0,
		"current" : 0
    }
};