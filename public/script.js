var matrix = [];
var socket;
var stat;
var side = 13;
var count;

function setup() 
{

    socket = io();

    socket.on('send matrix', function (mtx) {
        matrix = mtx;
        background('#acacac');
        createCanvas(matrix[0].length * side + 1000, matrix.length *  side); 
        redraw();

        socket.on("redraw", function(mtx){
            matrix = mtx;
            redraw();
        })
        socket.on("stats", function(stats)
        {
            stat = stats;
            return stat;
        })
        socket.on("count", function(counts)
        {
            count = counts;
            return count;
        })
    }); 
    noLoop();
}
function draw() {
    background("#acacac");
    fill("black"); 
    textSize(32);
    text('Born', matrix[0].length * side + 300, 30);

    fill("black"); 
    textSize(32);
    text('Dead', matrix[0].length * side + 500, 30);

    fill("black"); 
    textSize(32);
    text('Current', matrix[0].length * side + 700, 30);

    fill("green");
    textSize(32);
    text("Grass", matrix[0].length * side + 50, 100);

    fill("yellow");
    textSize(32);
    text("GrassEater", matrix[0].length * side + 50, 200);

    fill("red");
    textSize(32);
    text("Predator", matrix[0].length * side + 50, 300);

    fill("purple");
    textSize(32);
    text("Glutton", matrix[0].length * side + 50, 400);

    fill("blue");
    textSize(32);
    text("Tank", matrix[0].length * side + 50, 500);
    
    if (stat != undefined)
    {
        fill("green");
        textSize(32);
        text(str(stat.Grass.born), matrix[0].length * side + 300, 100);

        fill("green");
        textSize(32);
        text(str(stat.Grass.dead), matrix[0].length * side + 500, 100);

        fill("green");
        textSize(32);
        text(str(stat.Grass.current), matrix[0].length * side + 700, 100);

        fill("yellow");
        textSize(32);
        text(str(stat.GrassEater.born), matrix[0].length * side + 300, 200);

        fill("yellow");
        textSize(32);
        text(str(stat.GrassEater.dead), matrix[0].length * side + 500, 200);

        fill("yellow");
        textSize(32);
        text(str(stat.GrassEater.current), matrix[0].length * side + 700, 200);

        fill("red");
        textSize(32);
        text(str(stat.Predator.born), matrix[0].length * side + 300, 300);

        fill("red");
        textSize(32);
        text(str(stat.Predator.dead), matrix[0].length * side + 500, 300);

        fill("red");
        textSize(32);
        text(str(stat.Predator.current), matrix[0].length * side + 700, 300);

        fill("purple");
        textSize(32);
        text(str(stat.Glutton.born), matrix[0].length * side + 300, 400);

        fill("purple");
        textSize(32);
        text(str(stat.Glutton.dead), matrix[0].length * side + 500, 400);

        fill("purple");
        textSize(32);
        text(str(stat.Glutton.current), matrix[0].length * side + 700, 400);

        fill("blue");
        textSize(32);
        text(str(stat.Tank.born), matrix[0].length * side + 300, 500);

        fill("blue");
        textSize(32);
        text(str(stat.Tank.dead), matrix[0].length * side + 500, 500);

        fill("blue");
        textSize(32);
        text(str(stat.Tank.current), matrix[0].length * side + 700, 500);
    }
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x].index == 1) 
            {
                if(count < 1000)
                {
                    fill("green");
                    rect(x * side, y * side, side, side);
                }
                else if (count >= 1000)
                {
                    fill("white");
                    rect(x * side, y * side, side, side);
                }
                if (count == 2000)
                {
                    count = 0;
                }
            }
            else if (matrix[y][x] == 0) {
                fill("#acacac");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x].index == 2) {
                fill("yellow");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x].index == 3) {
                fill("red");
                rect(x * side, y * side, side, side);
                
            }
            else if (matrix[y][x].index == 4) {
                fill("purple");
                rect(x * side, y * side, side, side);
                
            }
            else if (matrix[y][x].index == 5) {
                fill("blue");
                rect(x * side, y * side, side, side)
            }
        }
    }
    count+=50;
}

    