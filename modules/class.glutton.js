var LivingCreature = require("./class.LivingCreature");

module.exports = class Glutton extends LivingCreature {
    constructor(x, y, index) {
        super(x, y, index);
        this.energy = 10;
        this.directions = [];
        this.acted = false;
    }
    getNewCoordinates() {
        this.directions = [
            [this.x - 3, this.y - 3],
            [this.x - 3, this.y - 2],
            [this.x - 3, this.y - 1],
            [this.x - 3, this.y],
            [this.x - 3, this.y + 1],
            [this.x - 3, this.y + 2],
            [this.x - 3, this.y + 3],
            [this.x - 2, this.y - 3],
            [this.x - 2, this.y + 3],
            [this.x - 1, this.y - 3],
            [this.x - 1, this.y - 3],
            [this.x, this.y - 3],
            [this.x, this.y + 3],
            [this.x + 1, this.y - 3],
            [this.x + 1, this.y + 3],
            [this.x + 2, this.y - 3],
            [this.x + 2, this.y + 3],
            [this.x + 3, this.y - 3],
            [this.x + 3, this.y + 3],
            [this.x + 3, this.y - 2],
            [this.x + 3, this.y - 1],
            [this.x + 3, this.y],
            [this.x + 3, this.y + 1],
            [this.x + 3, this.y + 2],
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
        ]
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
            matrix[newY][newX] = new Glutton(newX, newY, 4);
            Glutton.born++;
            Glutton.current++;
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
            this.energy--;
            if (this.energy <= 0) {
                this.die(matrix);
            }
        }
        else
        {
            this.acted == false;
        }
    }
    die(matrix) {
        matrix[this.y][this.x] = 0;
        Glutton.dead++
        Glutton.current--;
    }
    eat(matrix) {
        if (this.acted == false)
        {
            var dexinner = this.chooseCell(2, matrix);
            var karmirner = this.chooseCell(3, matrix);
            if (dexinner.length > 0) {
                for (var i = 0; i < dexinner.length; i++) {
                    var newX = dexinner[i][0];
                    var newY = dexinner[i][1];
                    if(matrix[newY][newX].index == 2)
                    {
                        matrix[newY][newX].die(matrix);
                        matrix[newY][newX] = 0;
                        this.energy++;
                    }
                }
                if (this.energy >= 12) {
                    this.mul(matrix);
                    this.energy = 1;
                }
                this.acted = true;
            }
            else if (karmirner.length > 0) {
                for (var i = 0; i < karmirner.length; i++) {
                    var newX = karmirner[i][0];
                    var newY = karmirner[i][1];
                    if(matrix[newY][newX].index == 3)
                    {
                        matrix[newY][newX].die(matrix);
                        matrix[newY][newX] = 0;
                        this.energy++;
                    }
                }
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
        }
        else
        {
            this.acted = false;
        }
    }

}
function random_item(items) 
{
    return items[Math.floor(Math.random() * items.length)];
}