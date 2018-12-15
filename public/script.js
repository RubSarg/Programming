var matrix = [];
var side = 12;
function setup() {
    for (var y = 0; y < 80; y++) {
        matrix[y] = [];
        for (var x = 0; x < 80; x++) {
            matrix[y][x] = random([0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,2,2,2,2,2,2,2,2,2,2,2,3,3,3,3,4,5]);
        }
    }      

    // matrix = [
    //     [0, 0, 1, 0, 0],
    //     [1, 0, 0, 0, 0],
    //     [0, 1, 2, 0, 0],
    //     [0, 1, 1, 1, 2],
    //     [1, 1, 2, 4, 3],
    //     [1, 1, 3, 2, 2],
    //     [1, 1, 0, 0, 0]
    // ];

    frameRate(5);
    createCanvas(matrix[0].length * side, matrix.length * side);
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                matrix[y][x] = new Grass(x, y, 1);
            }
            else if (matrix[y][x] == 2) {
                matrix[y][x] = new GrassEater(x, y, 2);
            }
            else if (matrix[y][x] == 3) 
            {
                matrix[y][x] = new Predator(x, y, 3);
            }
            else if (matrix[y][x] == 4)
            {
                matrix[y][x] = new Glutton(x,y,4);
            }
            else if (matrix[y][x] == 5)
            {
                matrix[y][x] = new Tank(x,y,5);
            }
        }
    }
}
function draw() {
    background("#acacac");
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x].index == 1) {
                matrix[y][x].mul();
            }
            else if (matrix[y][x].index == 2) {
                matrix[y][x].eat();
            }
            else if(matrix[y][x].index == 3)
            {
                matrix[y][x].eat();
            }
            else if(matrix[y][x].index == 4)
            {
                matrix[y][x].eat();
            }
            else if(matrix[y][x].index == 5)
            {
                matrix[y][x].kill();
            }
        }
    }
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x].index == 1) 
            {
                fill("green");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 0) 
            {
                fill("#acacac");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x].index == 2) 
            {
                fill("yellow");
                rect(x * side, y * side, side, side);
                matrix[y][x].acted = false;
            }
            else if (matrix[y][x].index == 3) 
            {
                fill("red");
                rect(x * side, y * side, side, side);
                matrix[y][x].acted = false;
            }
            else if (matrix[y][x].index == 4)
            {
                fill("purple");
                rect(x * side, y * side, side, side);
                matrix[y][x].acted = false;
            }
            else if (matrix[y][x].index == 5)
            {
                fill("blue");
                rect(x * side, y * side, side, side);
                matrix[y][x].acted = false;
            }
        }
    }
}