var Grass = require("./class.grass.js");
var GrassEater = require("./class.grasseater.js");
var Predator = require("./class.predator.js");
var Tank = require("./class.tank.js");
var Glutton = require("./class.glutton.js");

var matrix = [];
for (var y = 0; y < 50; y++) {
    matrix[y] = [];
    for (var x = 0; x < 50; x++) {
        matrix[y][x] = random_item([0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 4, 5]);
    }
}
for (var y = 0; y < matrix.length; y++) {
    for (var x = 0; x < matrix[y].length; x++) {
        if (matrix[y][x] == 1) {
            matrix[y][x] = new Grass(x, y, 1);
            Grass.born++;
            Grass.current++;
        }
        else if (matrix[y][x] == 2) {
            matrix[y][x] = new GrassEater(x, y, 2);
            GrassEater.born++;
            GrassEater.current++;
        }
        else if (matrix[y][x] == 3) {
            matrix[y][x] = new Predator(x, y, 3);
            Predator.born++;
            Predator.current++;
        }
        else if (matrix[y][x] == 4) {
            matrix[y][x] = new Glutton(x, y, 4);
            Glutton.born++;
            Glutton.current++;
        }
        else if (matrix[y][x] == 5) {
            matrix[y][x] = new Tank(x, y, 5);
            Tank.born++;
            Tank.current++;
        }
    }
}
function random_item(items) 
{
    return items[Math.floor(Math.random() * items.length)];
}
module.exports = matrix;  