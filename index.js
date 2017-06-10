/**
 * Created by lenovo on 2017/6/10.
 */
var app = new PIXI.Application(window.innerWidth, window.innerHeight, {backgroundColor: 0x1099bb});
document.body.appendChild(app.view);

var basicText = new PIXI.Text('2048',{fontSize:233});

basicText.anchor.set(0.5);
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
        graphics.lineStyle(2, 0x0000FF, 1);
        graphics.beginFill(0xFF700B, 1);
        graphics.drawRect(window.innerWidth/8 + j*155,window.innerHeight/8 *3 + i*155 , 150, 150);

        app.stage.addChild(graphics);
    }
}