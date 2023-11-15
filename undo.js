function undodata(){
    document.getElementById("error").innerHTML = "";
if (undo.length >0){

    if (source){
source.stop()
}

clearInterval(intervalid);
time = 0;

bufferarray = undo[undo.length-1];
undo.pop();


document.getElementById("totallength").innerHTML=bufferarray.length;
source = audiocontext.createBufferSource();
source.buffer=bufferarray;
source.connect(audiocontext.destination);
source.start(0, 0, 0);
sourceduration = source.buffer.duration;
document.getElementById("duration").innerHTML = source.buffer.duration;
if ( source.buffer.duration >=1){

}

}

var canvascontext = document.getElementById('canvas11');
var newarray = bufferarray.getChannelData(0)
var canctx = canvascontext.getContext('2d');
canctx.clearRect(0,0,canvascontext.width, canvascontext.height)
canctx.fillStyle = "black"
canctx.globalAlpha = 1;
canctx.beginPath();
canctx.moveTo(0, canvascontext.height / 2);
canctx.lineWidth = 1;
const topOffset = 10;
const bottomOffset = 10;
for (let i = 0; i < newarray.length; i=i+500) {
const x = i / newarray.length * canvascontext.width;
const y = ((newarray[i] + 1) / 2 * (canvascontext.height - topOffset - bottomOffset)) + topOffset;
canctx.lineTo(x, y);
}
canctx.stroke();








}