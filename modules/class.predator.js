var LivingCreature = require("./class.LivingCreature");

module.exports = class Predator extends LivingCreature {
    constructor(x, y, index) {
        super(x, y, index);
        this.energy = 10;
        this.directions = [];
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
            [this.x + 1, this.y + 1],
            [this.x - 2, this.y - 2],
            [this.x - 1, this.y - 2],
            [this.x, this.y - 2],
            [this.x + 1, this.y - 2],
            [this.x + 2, this.y - 2],
            [this.x - 2, this.y - 1],
            [this.x + 2, this.y - 1],
            [this.x - 2, this.y],
            [this.x + 2, this.y],
            [this.x - 2, this.y + 1],
            [this.x + 2, this.y + 1],
            [this.x - 2, this.y + 2],
            [this.x - 1, this.y + 2],
            [this.x, this.y + 2],
            [this.x + 1, this.y + 2],
            [this.x + 2, this.y + 2],
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
            matrix[newY][newX] = new Predator(newX, newY, 3);
            Predator.born++;
            Predator.current++;
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
                this.acted = true;

            }
        }
        else
        {
            this.acted == false;
        }
        this.energy--;
    }
    eat(matrix, tiv) {
        if (this.acted == false) {
            var newCell = random_item(this.chooseCell(2, matrix));
            if (newCell && tiv % 3 != 0) {
                var newX = newCell[0];
                var newY = newCell[1];
                matrix[newY][newX].die(matrix);
                matrix[newY][newX] = matrix[this.y][this.x];
                matrix[this.y][this.x] = 0;
                this.x = newX;
                this.y = newY;
                this.energy++;
                if (this.energy >= 12) {
                    this.mul(matrix);
                    this.energy = 1;
                }
                this.acted = true;
            }
            else {
                this.move(matrix);
                this.acted = true;
            }
            if (this.energy <= 0) {
                this.die(matrix);
            }
        }
        else{
            this.acted = false;
        }
    }
    die(matrix) {
        matrix[this.y][this.x] = 0;
        Predator.dead++;
        Predator.current--;
    }
}
function random_item(items) {
    return items[Math.floor(Math.random() * items.length)];
}