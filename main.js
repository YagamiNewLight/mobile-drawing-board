/**
 * Created by WKZ on 2017/7/20.
 */
var prepageX;
var prepageY;
var myCanvas = document.createElement('canvas');
var canvasText = myCanvas.getContext('2d');
myCanvas.height = document.documentElement.clientHeight ;
myCanvas.width = document.documentElement.clientWidth;
myCanvas.globalCompositeOperation = 'source-atop';
document.body.appendChild(myCanvas);

function start1(e) {
    var pageX = e.originalEvent.touches[0].pageX;
    var pageY = e.originalEvent.touches[0].pageY;
    prepageX = pageX;
    prepageY = pageY;
}
function start2(e) {
    var pageX = e.originalEvent.touches[0].pageX;
    var pageY = e.originalEvent.touches[0].pageY;
    prepageX = pageX;
    prepageY = pageY;
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

function eraser(e) {
    e.preventDefault();
}
$(myCanvas).on('touchstart', start1);
$(myCanvas).on('touchmove', painting);
$('.pen').on('click', function () {
    console.log(1);
    $('.pen').parent().addClass('active');
    $('.eraser').parent().removeClass('active');
    $(myCanvas).on('touchstart', start1);
    $(myCanvas).on('touchmove', painting);
    $(myCanvas).off('touchstart',start2);
    $(myCanvas).off('touchmove', eraseing);
});
function eraseing(e){
    e.preventDefault();
    var pageX = e.originalEvent.touches[0].pageX;
    var pageY = e.originalEvent.touches[0].pageY;
    canvasText.beginPath();
    canvasText.lineWidth='20';
    canvasText.strokeStyle='#fff';
    canvasText.moveTo(prepageX, prepageY);
    canvasText.lineTo(pageX, pageY);
    canvasText.stroke();
    prepageX = pageX;
    prepageY = pageY;
}
$('.eraser').on('click',function(){
    $('.eraser').parent().addClass('active');
    $('.pen').parent().removeClass('active');
    $(myCanvas).on('touchstart',start2);
    $(myCanvas).on('touchmove', eraseing);
    $(myCanvas).off('touchstart',start1);
    $(myCanvas).off('touchmove', painting);
});
$('.icons').on('touchmove',function(e){
    e.originalEvent.preventDefault();
});
$('.qingkong').on('click',function(){
    canvasText.clearRect(0,0,myCanvas.width,myCanvas.height);
    $('.eraser').parent().removeClass('active');
    $('.pen').parent().addClass('active');
    $(myCanvas).on('touchstart', start1);
    $(myCanvas).on('touchmove', painting);
    $(myCanvas).off('touchstart',start2);
    $(myCanvas).off('touchmove', eraseing);
});
$('.camera').on('click',function(e){
    e.originalEvent.preventDefault();
    var data = myCanvas.toDataURL('image/png');
    var w=window.open('about:blank','image from canvas');
    w.document.write("<img src='"+data+"' alt='from canvas'/>");
})
