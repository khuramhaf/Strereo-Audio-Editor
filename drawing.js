var canvas = null

var ctx = null


var isresize = false;
var rectx = 0;
var recty =0
var rectwidth = 0;
var rectheight = 0;

var rectstatus = null;

var previousx = 0;
var isdrawing = false;

var endx;

function mouseDown(event) {


    if(bufferarray.length>0){





   canvas = document.getElementById("canvas11");
    ctx = canvas.getContext("2d");

    ctx.fillStyle = "black"; // Set the fill color
    ctx.globalAlpha = 1;   // Set the global alpha (transparency)
drawline()
    ctx.fillStyle = "red"; // Set the fill color
    ctx.globalAlpha = 0.2;   // Set the global alpha (transparency)
    ctx.fillRect(rectx, recty, rectwidth, rectheight);


    var rect = canvas.getBoundingClientRect();
    var mouseX = event.clientX - rect.left;
    var mouseY = event.clientY - rect.top;

    previousx = rectx;

    if (mouseX >= rectx - 10 && mouseX <= rectx + 10) {
        // Adjust the mouse coordinates to be relative to the rectangle
        isresize = true;
rectstatus = "left"
    
    }

   else if (mouseX >=rectx + rectwidth-10 && mouseX <=rectx + rectwidth+10 ) {
        // Adjust the mouse coordinates to be relative to the rectangle
        isresize = true
rectstatus = "right"
    }

    else {
        ctx.clearRect(0,0, canvas.width, canvas.height)
        rectx = mouseX;
        isdrawing = true;
    }

    document.getElementById("start").value = " "
    var selectionEnd = Math.floor((rectx / canvas.width) * bufferarray.length);
  document.getElementById("start").value = selectionEnd/audiocontext.sampleRate
}

else{

}
}
function mouseMove(event) {

    if(bufferarray.length>0){


   

    canvas = document.getElementById("canvas11");
    ctx = canvas.getContext("2d");
    var rect = canvas.getBoundingClientRect();
    var mouseX = event.clientX - rect.left;
    var mouseY = event.clientY - rect.top;
  
    if(isresize===true){
        if (rectstatus === "left") {
         
        rectwidth -= (mouseX - previousx);
        rectx = mouseX;
        ctx.clearRect(0,0, canvas.width, 150)
        ctx.fillStyle = "black"; // Set the fill color
    ctx.globalAlpha = 1;   // Set the global alpha (transparency)
drawline()
    ctx.fillStyle = "red"; // Set the fill color
    ctx.globalAlpha = 0.2; 
      ctx.fillRect(rectx, 0, rectwidth, 150);
     
            previousx = mouseX;


            document.getElementById("start").value = " "
            var selectionEnd = Math.floor((mouseX / canvas.width) * bufferarray.length);
          document.getElementById("start").value = selectionEnd/audiocontext.sampleRate

      
    }


   else if (rectstatus === "right") {
        // Adjust the mouse coordinates to be relative to the rectangle
        rectwidth = mouseX - rectx;
        ctx.clearRect(0,0, canvas.width, canvas.height)
        ctx.fillStyle = "black"; // Set the fill color
        ctx.globalAlpha = 1;   // Set the global alpha (transparency)
    drawline()
        ctx.fillStyle = "red"; // Set the fill color
        ctx.globalAlpha = 0.2; 
 
        ctx.fillRect(rectx, 0, rectwidth, 150);

        document.getElementById("end").value = " "
        var selectionEnd = Math.floor((mouseX / canvas.width) * bufferarray.length);
      document.getElementById("end").value = selectionEnd/audiocontext.sampleRate
    }

    else{

    }

    }

    // Check if the mouse coordinates are within the rectangle bounds
    if (mouseX >= rectx-10 && mouseX <= rectx + 10) {
        // Adjust the mouse coordinates to be relative to the rectangle
        

        canvas.style.cursor = 'ew-resize';
    }

   else if (mouseX >=rectx + rectwidth-10 && mouseX <=rectx + rectwidth+10) {
        // Adjust the mouse coordinates to be relative to the rectangle
       

        canvas.style.cursor = 'ew-resize';
    }

    else {
        canvas.style.cursor = 'auto';
    }

    if (isdrawing === true){

        endx = mouseX;

     rectwidth= endx - rectx;
        ctx.clearRect(0,0, canvas.width, canvas.height)

        ctx.fillStyle = "black"; // Set the fill color
    ctx.globalAlpha = 1;   // Set the global alpha (transparency)
drawline()
    ctx.fillStyle = "red"; // Set the fill color
    ctx.globalAlpha = 0.2; 

ctx.fillRect(rectx, 0, rectwidth, 150);

document.getElementById("end").value = " "
    var selectionEnd = Math.floor((mouseX / canvas.width) * bufferarray.length);
  document.getElementById("end").value = selectionEnd/audiocontext.sampleRate

    }

}

else{


}
    
}

function mouseUp(event) {
if(bufferarray.length>0){



  
    isresize = false;
isdrawing = false;
    
  var rect = canvas.getBoundingClientRect();
  var mouseX = event.clientX - rect.left;
  if (isdrawing === true){

      
      isdrawing = false;
  }

  else if (rectstatus === "left"){
     
      rectstatus = null;

      document.getElementById("start").value = " "
      var selectionEnd = Math.floor((mouseX / canvas.width) * bufferarray.length);
    document.getElementById("start").value = selectionEnd/audiocontext.sampleRate
  }

  else if (rectstatus === "right"){

    
      rectstatus = null;

      document.getElementById("end").value = " "
      var selectionEnd = Math.floor((mouseX / canvas.width) * bufferarray.length);
    document.getElementById("end").value = selectionEnd/audiocontext.sampleRate
  }


  isresize = false;

}

else{

}


 
}


function drawline(){


    var canvascontext = document.getElementById('canvas11');
    var newarray = bufferarray.getChannelData(0);
       var canctx = canvascontext.getContext('2d');
       canctx.globalAlpha = 1;
       canctx.clearRect(0,0,canvascontext.width, canvascontext.height)
       canctx.fillStyle = "black"
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



function drawline1(){


    var canvascontext = document.getElementById('canvas11');
    var newarray = bufferarray.getChannelData(0);
       var canctx = canvascontext.getContext('2d');

    
       canctx.globalAlpha = 1;
       canctx.clearRect(0,0,canvascontext.width, canvascontext.height)
       canctx.fillStyle = "black"
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

    ctx.fillStyle = "red"; // Set the fill color
    ctx.globalAlpha = 0.2; 

ctx.fillRect(rectx, 0, rectwidth, 150);
}