var Grass = require("./modules/class.grass");
var GrassEater = require("./modules/class.grasseater");
var Predator = require("./modules/class.predator");
var Tank = require("./modules/class.tank");
var Glutton = require("./modules/class.glutton");

var count = 0;

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
                if (matrix[y][x].index == 1) 
                {
                    if (count < 1000)
                    {
                        matrix[y][x].mul(matrix);                    
                    }
                    if(count == 2000)
                    {
                        count = 0;
                    }
                }
                else if (matrix[y][x].index == 2) {
                    if (count < 1000)
                    {
                        matrix[y][x].eat(matrix, 5);
                    }
                    else if (count >= 1000)
                    {
                        matrix[y][x].eat(matrix, 10);
                        if(count == 2000)
                        {
                            count = 0;
                        }
                    }
                }
                else if(matrix[y][x].index == 3)
                {
                    if(count < 1000)
                    {    
                        matrix[y][x].eat(matrix, 3 * count + 1);
                    }
                    else if(count >= 1000)
                    {
                        matrix[y][x].eat(matrix, count);
                        if(count == 2000)
                        {
                            count = 0;
                        }
                    }
                }
                else if(matrix[y][x].index == 4)
                {
                    if(count < 1000)
                    {
                        matrix[y][x].eat(matrix);
                    }
                    else if(count >= 1000)
                    {
                        if(count % 2 == 0)
                        { 
                            matrix[y][x].eat(matrix);
                        }
                        if(count == 2000)
                        {
                            count = 0;
                        }
                    }
                }
                else if(matrix[y][x].index == 5)
                {
                    if(count < 1000)
                    {
                        matrix[y][x].kill(matrix, 0);
                    }
                    else if(count >= 1000)
                    {
                        matrix[y][x].kill(matrix, 4);
                        if(count == 2000)
                        {
                            count = 0;
                        }
                    }
                }
            }
          }
        socket.emit("redraw", matrix);
        socket.emit("count", count);
        count += 50;
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
module.exports = stat;