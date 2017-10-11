/**
 * Created by WKZ on 2017/7/20.
 */
!function(){
var prepageX;
var prepageY;
var myCanvas = document.createElement('canvas');
var canvasText = myCanvas.getContext('2d');
myCanvas.height = document.documentElement.clientHeight ;
myCanvas.width = document.documentElement.clientWidth;
myCanvas.globalCompositeOperation = 'source-atop';
document.body.appendChild(myCanvas);

function start(e) {
    prepageX = e.originalEvent.touches[0].pageX;
    prepageY = e.originalEvent.touches[0].pageY;
}

function painting(e) {
    e.preventDefault();
    var pageX = e.originalEvent.touches[0].pageX;
    var pageY = e.originalEvent.touches[0].pageY;
    canvasText.beginPath();
    canvasText.lineWidth = '2';
    canvasText.strokeStyle='black';
    canvasText.moveTo(prepageX, prepageY);
    canvasText.lineTo(pageX, pageY);
    canvasText.stroke();
    prepageX = pageX;
    prepageY = pageY;
}

function eraseing(e){
    e.preventDefault();
    var pageX = e.originalEvent.touches[0].pageX;
    var pageY = e.originalEvent.touches[0].pageY;
    canvasText.beginPath();
    canvasText.lineWidth = '10';
    canvasText.strokeStyle='white';
    canvasText.moveTo(prepageX, prepageY);
    canvasText.lineTo(pageX, pageY);
    canvasText.stroke();
    prepageX = pageX;
    prepageY = pageY;
}


function paintOrErase(selectorOn,selectorOff,fnOn,fnOff){
    $(selectorOn).on('click',function(){
    $(selectorOn).parent().addClass('active');
    $(selectorOff).parent().removeClass('active');
    $(myCanvas).on('touchstart',start);
    $(myCanvas).on('touchmove', fnOn);
    $(myCanvas).off('touchmove', fnOff);
    })
}

paintOrErase('.eraser','.pen',eraseing,painting);
paintOrErase('.pen','.eraser',painting,eraseing);

$(myCanvas).on('touchstart', start);
$(myCanvas).on('touchmove', painting);


$('.icons').on('touchmove',function(e){
    e.originalEvent.preventDefault();
});
$('.qingkong').on('click',function(){
    canvasText.clearRect(0,0,myCanvas.width,myCanvas.height);
    $('.eraser').parent().removeClass('active');
    $('.pen').parent().addClass('active');
    $(myCanvas).on('touchstart', start);
    $(myCanvas).on('touchmove', painting);
    $(myCanvas).off('touchmove', eraseing);
});
$('.camera').on('click',function(e){
    e.originalEvent.preventDefault();
    var data = myCanvas.toDataURL('image/png');
    var w = window.open('about:blank','image from canvas');
    w.document.write("<img src='"+data+"' alt='from canvas'/>");
})
}();
