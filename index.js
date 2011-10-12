var canvasMinX;
var canvasMaxX;
var canvasMinY;
var canvasMaxY;
var canvasWidth = $("#mycanvas").width();
var canvasHeight= $("#mycanvas").height();


function hexToR(h) {return parseInt((cutHex(h)).substring(0,2),16)}
function hexToG(h) {return parseInt((cutHex(h)).substring(2,4),16)}
function hexToB(h) {return parseInt((cutHex(h)).substring(4,6),16)}
function cutHex(h) {return (h.charAt(0)=="#") ? h.substring(1,7):h}




var mouseDownInCanvas = false;
var cvs = document.getElementById('mycanvas');
var ctx = cvs.getContext('2d');
var myImageData = ctx.createImageData(canvasWidth,canvasHeight);
var pixelArray = myImageData.data;
for (var i = 0; i < pixelArray.length; i++) {
    if ((i % 4) === 3) {
        myImageData.data[i] = 255;
    }
}
ctx.putImageData(myImageData, 0, 0);
function drawPixel (x,y) {
    var horiz = canvasWidth*4;
    var pos = y*canvasWidth*4 + x*4;
    myImageData.data[pos] = Math.floor(Math.random()*255);
    myImageData.data[pos+1] = Math.floor(Math.random()*255);
    myImageData.data[pos+2] = Math.floor(Math.random()*255);
    
    myImageData.data[pos + 3]= myImageData.data[pos];
    myImageData.data[pos + 4] = myImageData.data[pos+1];
    myImageData.data[pos + 5] = myImageData.data[pos+2];
    
    myImageData.data[pos + horiz]= myImageData.data[pos];
    myImageData.data[pos + horiz + 1] = myImageData.data[pos+1];
    myImageData.data[pos + horiz + 2] = myImageData.data[pos+2];
    
    myImageData.data[pos + horiz + 3]= myImageData.data[pos];
    myImageData.data[pos + horiz + 4] = myImageData.data[pos+1];
    myImageData.data[pos + horiz + 5] = myImageData.data[pos+2];
    ctx.putImageData(myImageData,0,0);
}
function init_mouse() {
    canvasMinX = $("#mycanvas").offset().left;
    canvasMaxX = canvasMinX + $("#mycanvas").width();
    canvasMinY = $("#mycanvas").offset().top;
    canvasMaxY = canvasMinY + $("#mycanvas").height();
}
function onMouseMove(evt) {
    if (mouseDownInCanvas) {
        var canvasx = evt.pageX - canvasMinX;
        var canvasy = evt.pageY - canvasMinY;
        client.emit('relayCanvasPosition',{canvasx:canvasx,canvasy:canvasy});
        drawPixel(canvasx,canvasy); 
    }
}
function onMouseDown(evt) {
    if ((evt.pageX > canvasMinX && evt.pageX < canvasMaxX) && (evt.pageY > canvasMinY && evt.pageY < canvasMaxY)) {
        mouseDownInCanvas = true;
    }
}
init_mouse();
$(document).mousedown(onMouseDown);
$(document).mousemove(onMouseMove);
$(document).mouseup(function(){mouseDownInCanvas = false;});
