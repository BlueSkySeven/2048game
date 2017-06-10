/**
 * Created by lenovo on 2017/6/10.
 */
var app = new PIXI.Application(window.innerWidth, window.innerHeight, {backgroundColor:0xFFC0CB});
document.body.appendChild(app.view);

var basicText = new PIXI.Text('2048',{fontSize:233,fill: '#FFB6C1',

    fontFamily: 'Arial',
    align: 'center',
    stroke: '#FF69B4',
    strokeThickness: 6});

basicText.anchor.set(0.5);//将Text左上角的光标移动到Text的中间，方便居中
basicText.x = app.renderer.width/2;
basicText.y = app.renderer.height / 4;
app.stage.addChild(basicText);


var gaid=[];
for (var i=0 ;i<4;i++)
{
    gaid[i]=[0,0,0,0];
}
for(var i=0;i<4;i++)
{
    for(var j=0;j<4;j++)
    {
        var graphics = new PIXI.Graphics();

        graphics.beginFill(0xFFF0F5, 1);
        graphics.drawRect(window.innerWidth/5 + j*155,window.innerHeight/8 *3 + i*155 , 150, 150);

        app.stage.addChild(graphics);
    }
}
function GetRandomNumber() {
    return Math.floor(Math.random() * 4);
}
var x=GetRandomNumber();
var y=GetRandomNumber();
var graphics = new PIXI.Graphics();
graphics.beginFill(0xF08080, 1);
graphics.drawRect(window.innerWidth/5 + 155*x,window.innerHeight/8 *3 + 155*y , 150, 150);

app.stage.addChild(graphics);
var basicText = new PIXI.Text('2',{fontSize:100,fill: '#DC143C'});

basicText.anchor.set(0.5);//将Text左上角的光标移动到Text的中间，方便居中
basicText.x =155/2 + window.innerWidth/5 + 155*x;
basicText.y =155/2 + window.innerHeight/8*3 + 155*y;
app.stage.addChild(basicText);