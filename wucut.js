function cut(){
    clearInterval(intervalid);
        var start = parseFloat(document.getElementById("start").value);
    var end = parseFloat(document.getElementById("end").value);
    
    time=0;
        if(source){
            source.stop();
        }
    
     
        document.getElementById("timer").innerHTML = time;
      
        if (check === null ){
    
    document.getElementById("error").innerHTML = "Please select a file"
    
    }
    
    else if (bufferarray===null){
    
    document.getElementById("error").innerHTML = "No data available"
    
    }
    
    else if (isNaN(start)){
    document.getElementById("error").innerHTML = "Starting point is not a number"
    
    
    }
    else if (start >= source.buffer.duration){
    document.getElementById("error").innerHTML = "starting point is greater than or equal to source buffer duration"
    
    } 
    
    else if (start < 0 )
    {
    
    document.getElementById("error").innerHTML = "Starting Point must be greater than 0"
    
    }
    else if (start >= end) {
    document.getElementById("error").innerHTML = "Starting Point must be less than Ending Point"
    
    }
    
    else if (isNaN(end)){
    document.getElementById("error").innerHTML = "Ending Point is not a number"
    } 
    else if ( end > source.buffer.duration ){
    
    document.getElementById("error").innerHTML = "Ending point is greater than  duration"
    
    end < 0 }
    
    else if ( end <= start){
    
    document.getElementById("error").innerHTML = "Ending Point is greater than equal to Starting Point"
    
    }



else{


    var newbuffer = audiocontext.createBuffer(bufferarray.numberOfChannels, bufferarray.length, bufferarray.sampleRate)
var ab3 = newbuffer.getChannelData(0)

ab3.set(bufferarray.getChannelData(0), 0)

if (bufferarray.numberOfChannels>1){
    var ab4 = newbuffer.getChannelData(1)
    ab4.set(bufferarray.getChannelData(1), 0)

}

if (undo.length ===3){
                
    undo.splice(0, 1)
   

    
}

undo.push(newbuffer);


var array1 = bufferarray.getChannelData(0);
var array2;
var array7
var array8;

if (bufferarray.numberOfChannels>1){

array2 = bufferarray.getChannelData(1)
var array8 = array2.subarray(start*bufferarray.sampleRate, end*bufferarray.sampleRate)
}


var array7 = array1.subarray(start*bufferarray.sampleRate, end*bufferarray.sampleRate)



var audiobuffer =   audiocontext.createBuffer(bufferarray.numberOfChannels, array7.length, audiocontext.sampleRate);

var ab1 = audiobuffer.getChannelData(0);
ab1.set(array7)

if (bufferarray.numberOfChannels>1){

    var ab2 = audiobuffer.getChannelData(1)
    ab2.set(array8);
}

bufferarray = audiobuffer;

source = audiocontext.createBufferSource()
source.buffer=audiobuffer;
source.connect(audiocontext.destination);
source.start(0);

sourceduration = source.buffer.duration;
document.getElementById("duration").innerHTML = source.buffer.duration.toFixed(3);


var canvascontext = document.getElementById('canvas11');

var canctx = canvascontext.getContext('2d');
canctx.clearRect(0,0,canvascontext.width, canvascontext.height)
canctx.fillStyle = "black"
canctx.beginPath();
canctx.moveTo(0, canvascontext.height / 2);
canctx.lineWidth = 1;
const topOffset = 10;
const bottomOffset = 10;
for (let i = 0; i < array7.length; i=i+500) {
const x = i / array7.length * canvascontext.width;
const y = ((array7[i] + 1) / 2 * (canvascontext.height - topOffset - bottomOffset)) + topOffset;
canctx.lineTo(x, y);
}
canctx.stroke();
      
     
   if (source.buffer.duration>=1){

   
   
intervalid =   setInterval(()=>{
       time++;
   document.getElementById("timer").innerHTML = time;
   if (time === parseInt(source.buffer.duration)){
       clearInterval(intervalid);
   }
}, 1000);}
   
}
}