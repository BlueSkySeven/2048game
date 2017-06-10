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


function GetRandomNumber() {
    return Math.floor(Math.random() * 4);
}
function DrawCell(x,y) {
    var color= 0xFFD700;
    if(gaid[x][y] == 0)
    {
        color=0xFFFF00;
    }
    var graphics = new PIXI.Graphics();
    graphics.beginFill(color, 1);
    graphics.drawRect(window.innerWidth / 5 + 155 * x, window.innerHeight / 8 * 3 + 155 * y, 150, 150);

    app.stage.addChild(graphics);

    var Number = new PIXI.Text(gaid[x][y], {fontSize: 100, fill: '#DC143C'});
    Number.anchor.set(0.5);//将Text左上角的光标移动到Text的中间，方便居中
    Number.x = 155 / 2 + window.innerWidth / 5 + 155 * x;
    Number.y = 155 / 2 + window.innerHeight / 8 * 3 + 155 * y;
    app.stage.addChild(Number);
}

var gaid=[];
for (var i=0 ;i<4;i++)
{
    gaid[i]=[0,0,0,0];
}
var DrawX=GetRandomNumber();
var DrawY=GetRandomNumber();

gaid[DrawX][DrawY] = 2;

for(var i=0;i<4;i++)
{
    for(var j=0;j<4;j++)
    {
        DrawCell(i,j);
    }
}
document.addEventListener("keydown",function(event){
    console.log("1");
})