var matrix = [];
var socket;

var side = 12;
function setup() 
{
    background('#acacac');
    frameRate(0);

    socket = io();

    socket.on('send matrix', function (mtx) {
        matrix = mtx;
        background('#acacac');
        console.log(matrix);
        createCanvas(matrix[0].length * side, matrix.length *  side); 
        redraw();

        socket.on("redraw", function(mtx){
            matrix = mtx;
            redraw();
        })
    });

    noLoop();
}


function draw() {
    background("#acacac");
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x].index == 1) {
                fill("green");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 0) {
                fill("#acacac");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x].index == 2) {
                fill("yellow");
                rect(x * side, y * side, side, side);
                //matrix[y][x].acted = false;
            }
            else if (matrix[y][x].index == 3) {
                fill("red");
                rect(x * side, y * side, side, side);
                //matrix[y][x].acted = false;
            }
            else if (matrix[y][x].index == 4) {
                fill("purple");
                rect(x * side, y * side, side, side);
                //matrix[y][x].acted = false;
            }
            else if (matrix[y][x].index == 5) {
                fill("blue");
                rect(x * side, y * side, side, side);
                //matrix[y][x].acted = false;
            }
        }
    }
}