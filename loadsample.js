

function loadsample() {

    document.getElementById("status").innerHTML = "Loading and decoding file..."
    document.getElementById("Spinner").style.display = "block"
    document.getElementById("spinner1").style.display = "block"

     
            clearInterval(intervalid);
    
        if (audiocontext === undefined){
     
     audiocontext= new AudioContext();
    }
    
    
    if (source){
     source.stop();
    }

    fetch('sample.mp3')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.arrayBuffer();
    })
    .then(audiodata => {


        audiocontext.decodeAudioData(audiodata, function(audiofile){
       
        
            if (bufferarray.length >0){
    
                var array3 = audiocontext.createBuffer(bufferarray.numberOfChannels, bufferarray.length, bufferarray.sampleRate);
                var array3channel = array3.getChannelData(0)
                array3channel.set(bufferarray.getChannelData(0), 0)
    
                if(bufferarray.numberOfChannels >1){
                    array4channel = array3.getChannelData(1)
                    array4channel.set(bufferarray.getChannelData(1), 0)
                }
                            if (undo.length ===3){
                    
                                undo.splice(0, 1)
                               
                    
                                
                            }
                    
                            undo.push(array3);
    
    
                var combinedbuffer1 = audiocontext.createBuffer(audiofile.numberOfChannels, audiofile.length+bufferarray.length, audiofile.sampleRate)
                var newbuffer1 = combinedbuffer1.getChannelData(0)
                newbuffer1.set(bufferarray.getChannelData(0), 0)
                newbuffer1.set(audiofile.getChannelData(0), bufferarray.length)
    
                if(audiofile.numberOfChannles>1){
                newbuffer1.set(bufferarray.getChannelData(1), 0)
                newbuffer1.set(audiofile.getChannelData(1), bufferarray.length)
            }
                bufferarray = combinedbuffer1;
    
    
               
                
                
                }
                
                else{
                   bufferarray = audiofile
    
              
                }
        
            document.getElementById("totallength").innerHTML=bufferarray.length;
            source = audiocontext.createBufferSource();
        check = 1;
        
            time = parseInt(sourceduration);
           
            
            document.getElementById("error").innerHTML = "";
        
        
         var canvascontext = document.getElementById('canvas11');
    var newarray = bufferarray.getChannelData(0);
       var canctx = canvascontext.getContext('2d');
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
        
        
        
           
               
               source.buffer=bufferarray;
               source.connect(audiocontext.destination);
               source.start(0, sourceduration);
               sourceduration = source.buffer.duration;
               
               document.getElementById("duration").innerHTML = source.buffer.duration.toFixed(3);
        
           if (source.buffer.duration>=1){
        intervalid =   setInterval(()=>{
                time++;
            document.getElementById("timer").innerHTML = time;
        
            if (time ===parseInt(source.buffer.duration)){
                clearInterval(intervalid);
            }
            
        }, 1000);
        }
        document.getElementById("status").innerHTML = "";
        document.getElementById("Spinner").style.display = "none"
        document.getElementById("spinner1").style.display = "none"
           })
    
    })
    .catch(error => {
        document.getElementById("status").innerHTML = "";
        document.getElementById("error").innerHTML = "Cannot open file"
        document.getElementById("Spinner").style.display = "none"
        document.getElementById("spinner1").style.display = "none"
    });
  
  
  


    
    
    
    
      
     } 
    
   