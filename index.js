var app = new PIXI.Application(window.innerWidth, window.innerHeight, {backgroundColor:0xFFFACD});
document.body.appendChild(app.view);

    var maxCount = 16;
    var currentCount = 0;
    var score = 0;
var basicText = new PIXI.Text('2048',{fontSize:233,fill: '#00FF00',

    fontFamily: 'Arial',
    align: 'center',
    stroke: '#32CD32',
    strokeThickness: 6});

basicText.anchor.set(0.5);//将Text左上角的光标移动到Text的中间，方便居中
basicText.x = app.renderer.width/2;
basicText.y = app.renderer.height / 4;
app.stage.addChild(basicText);
var scoreText = new PIXI.Text('Score: ' + score, {
    fontSize: 48
});
scoreText.anchor.set(0.5);
scoreText.x = app.renderer.width / 2;
scoreText.y = app.renderer.height / 10 * 9;
app.stage.addChild(scoreText);
function getColorByNumber(number) {
    var colorValue = {
        0: 0xFFFF00,
        2: 0xFFD700,
        4: 0xFFA500,
        8: 0xFF8C00,
        16:0xE9967A
    };
    color = colorValue[number];
    if(color == undefined)
    {
        color = 0xFF4500;
    }
    return color;
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
    scoreText.text = "Score: "+score;
}

var addRandomCell = function () {
    if(currentCount === maxCount) return;
    var rowIndex = GetRandomNumber();
    var columnIndex = GetRandomNumber();

    while (grid[rowIndex][columnIndex] !== 0 ) {
        rowIndex = GetRandomNumber();
        columnIndex = GetRandomNumber();
    }

    grid[rowIndex][columnIndex] = 2;
    currentCount++;
};

addRandomCell();
addRandomCell();

flushUI();
var onToRightEventHandler = function(){
    var isChanged = moveCellToRight();
    if(isChanged){
        addRandomCell();
    }
    flushUI();
    if (checkGameOver()){
        alert('Game Over!');
    }
}
var onToDownEventHandler = function () {
    rotateArray(3);
    var isChanged = moveCellToRight();
    rotateArray(1);
    if (isChanged) {
        addRandomCell();
    }
    flushUI();
    if (checkGameOver()) {
        alert('Game over!');
    }
}
var onToLeftEventHandler = function(){
    rotateArray(2);
    var isChanged = moveCellToRight();
    rotateArray(2);
    if (isChanged)
    {
        addRandomCell();
    }
    flushUI();
    if (checkGameOver()){
        alert('Game Over!')
    }
}
var onToUpEventHandler = function () {
    rotateArray(1);
    var isChanged = moveCellToRight();
    rotateArray(3);
    if (isChanged) {
        addRandomCell();
    }
    flushUI();
    if (checkGameOver()) {
        alert('Game over.');
    }
}
document.addEventListener("keydown",function(event){
    if (event.key === 'ArrowRight') {
      onToRightEventHandler();
    }
    if (event.key === 'ArrowUp') {
    onToUpEventHandler();
    }


    if (event.key === 'ArrowLeft') {
        onToLeftEventHandler();
    }



    if (event.key === 'ArrowDown') {
        onToDownEventHandler();
    }
})
var hammertime = new Hammer.Manager(document, {
    recognizers: [
        [Hammer.Swipe, {direction: Hammer.DIRECTION_ALL}]
    ]
});
hammertime.on('swiperight', function() {
    onToRightEventHandler();
});
hammertime.on('swipeup', function () {
    onToUpEventHandler();
});
hammertime.on('swipeleft', function () {
    onToLeftEventHandler();
});
hammertime.on('swipedown', function () {
    onToDownEventHandler();
});
function moveCellToRight() {
    var isChanged = false;
    for (var rowIndex = 0; rowIndex < 4; rowIndex++) {
        for (var columnIndex = 2; columnIndex >= 0; columnIndex--) {
            if (grid[rowIndex][columnIndex] === 0) continue;

            var theEmptyCellIndex = findTheFirstRightCell(rowIndex, columnIndex);
            if (theEmptyCellIndex !== -1) {
                grid[rowIndex][theEmptyCellIndex] = grid[rowIndex][columnIndex];
                grid[rowIndex][columnIndex] = 0;
                isChanged = true;
            }
            var currentIndex = theEmptyCellIndex === -1 ? columnIndex : theEmptyCellIndex;

            if (grid[rowIndex][currentIndex] === grid[rowIndex][currentIndex + 1]) {
                grid[rowIndex][currentIndex + 1] += grid[rowIndex][currentIndex];
                grid[rowIndex][currentIndex] = 0;

                score += grid[rowIndex][currentIndex + 1];

                isChanged = true;

                currentCount--;
            }
        }
        }
        return isChanged;
}



function findTheFirstRightCell(rowIndex, columnIndex) {
    for (var i = 3; i > columnIndex; i--) {
        if (grid[rowIndex][i] === 0) {
            return i;
        }
    }

    return -1;
}
function rotateArray(rotateCount = 1) {
    for (var i = 0; i < rotateCount; i++) {
        grid = rotateArrayToRightOnce(grid);
    }

    function rotateArrayToRightOnce(array) {
        return array.map((row, rowIndex) => {
            return row.map((item, columnIndex) => {
                return array[3 - columnIndex][rowIndex];
            })
        })
    }
}
function checkGameOver() {
    if (currentCount !== maxCount) return false;

    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            if (grid[i][j] === grid[i][j - 1] ||
                grid[i][j] === grid[i][j + 1] ||
                (grid[i-1] && grid[i][j] === grid[i - 1][j]) ||
                (grid[i+1] && grid[i][j] === grid[i + 1][j])
            ) {
                return false;
            }
        }
    }

    return true;
}