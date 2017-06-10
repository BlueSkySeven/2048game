var app = new PIXI.Application(window.innerWidth, window.innerHeight, {backgroundColor:0xFFFACD});
document.body.appendChild(app.view);

var basicText = new PIXI.Text('2048',{fontSize:233,fill: '#00FF00',

    fontFamily: 'Arial',
    align: 'center',
    stroke: '#32CD32',
    strokeThickness: 6});

basicText.anchor.set(0.5);//将Text左上角的光标移动到Text的中间，方便居中
basicText.x = app.renderer.width/2;
basicText.y = app.renderer.height / 4;
app.stage.addChild(basicText);

function getColorByNumber(number) {
    var colorValue = {
        0: 0xFFFF00,
        2: 0xFFD700,
        4: 0xFFA500
    };

    return colorValue[number];
}
function GetRandomNumber() {
    return Math.floor(Math.random() * 4);
}
function DrawCell(rowIndex, columnIndex) {
    var graphics = new PIXI.Graphics();
    graphics.beginFill(getColorByNumber(grid[rowIndex][columnIndex]), 1);
    graphics.drawRect(window.innerWidth / 5 + 155 * columnIndex, window.innerHeight / 8 * 3 + 155 * rowIndex, 150, 150);

    app.stage.addChild(graphics);
    if(grid[rowIndex][columnIndex]!=0) {
        var Number = new PIXI.Text(grid[rowIndex][columnIndex], {fontSize: 100, fill: '#DC143C'});
        Number.anchor.set(0.5);//将Text左上角的光标移动到Text的中间，方便居中
        Number.x = 155 / 2 + window.innerWidth / 5 + 155 * columnIndex;
        Number.y = 155 / 2 + window.innerHeight / 8 * 3 + 155 * rowIndex;
        app.stage.addChild(Number);
    }
}

var grid=[];
for (var i=0 ;i<4;i++)
{
    grid[i]=[0,0,0,0];
}
var rowIndex=GetRandomNumber();
var columnIndex=GetRandomNumber();

grid[rowIndex][columnIndex] = 2;

function flushUI() {
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            DrawCell(i, j);
        }
    }
}
flushUI();
document.addEventListener("keydown",function(event){
    if (event.keyCode === 39) {
        moveCellToRight();
        flushUI();
    }
})
function moveCellToRight() {
    for (var rowIndex = 0; rowIndex < 4; rowIndex++) {
        for (var columnIndex = 2; columnIndex >= 0; columnIndex--) {
            if (grid[rowIndex][columnIndex] === 0) continue;

            var theEmptyCellIndex = findTheFirstRightCell(rowIndex, columnIndex);
            if (theEmptyCellIndex !== -1) {
                grid[rowIndex][theEmptyCellIndex] = grid[rowIndex][columnIndex];
                grid[rowIndex][columnIndex] = 0;

            }
            var currentIndex = theEmptyCellIndex === -1 ? columnIndex : theEmptyCellIndex;

            if (grid[rowIndex][currentIndex] === grid[rowIndex][currentIndex + 1]) {
                grid[rowIndex][currentIndex+ 1] += grid[rowIndex][currentIndex];
                grid[rowIndex][currentIndex] = 0;
            }

        }
    }
}
function findTheFirstRightCell(rowIndex, columnIndex) {
    for (var i = 3; i > columnIndex; i--) {
        if (grid[rowIndex][i] === 0) {
            return i;
        }
    }

    return -1;
}