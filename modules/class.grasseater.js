var LivingCreature = require("./class.LivingCreature");

module.exports = class GrassEater extends LivingCreature {
    constructor(x, y, index){
        super(x, y, index);
        this.tariq = 0;
        this.energy = 8;
        this.acted = false;
    }
   getNewCoordinates() {
       this.directions = [
           [this.x - 1, this.y - 1],
           [this.x, this.y - 1],
           [this.x + 1, this.y - 1],
           [this.x - 1, this.y],
           [this.x + 1, this.y],
           [this.x - 1, this.y + 1],
           [this.x, this.y + 1],
           [this.x + 1, this.y + 1]
       ];
   }
   chooseCell(character, matrix) {
       this.getNewCoordinates();
       return super.chooseCell(character, matrix);
   }
    mul(matrix) {
        var newCell = random_item(this.chooseCell(0, matrix));
        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = new GrassEater(newX, newY, 2);
            GrassEater.born++;
            GrassEater.current++;
        }
    }
    move(matrix) {
        if (this.acted == false) {
            var newCell = random_item(this.chooseCell(0, matrix));
            if (newCell) {
                var newX = newCell[0];
                var newY = newCell[1];
                matrix[newY][newX] = matrix[this.y][this.x];
                matrix[this.y][this.x] = 0;
                this.x = newX;
                this.y = newY;
            }
            this.energy--;
            if (this.energy <= 0) {
                this.die(matrix);
            }
            this.acted = true;
        }
        else
        {
            this.acted == false;
        }
    }
    eat(matrix, speed) {
        if (this.acted == false) {
            var newCell = random_item(this.chooseCell(1, matrix));
            if (newCell) {
                var newX = newCell[0];
                var newY = newCell[1];
                matrix[newY][newX].die();
                matrix[newY][newX] = matrix[this.y][this.x];
                matrix[this.y][this.x] = 0;
                this.x = newX;
                this.y = newY;
                this.energy++;
                this.acted = true;
                if (this.energy >= speed) {
                    this.mul(matrix);
                    this.energy = 4;
                }
            }
            else 
            {
                this.move(matrix);
                this.acted = true;
            }
        }
        else
        {
            this.acted = false;
        }

    }
    die(matrix) {
        matrix[this.y][this.x] = 0;
        GrassEater.dead++;
        GrassEater.current--;
    }
}
function random_item(items) 
{
    return items[Math.floor(Math.random() * items.length)];
}