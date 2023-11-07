function exportdata(){

    

    if (check!=null && bufferarray.length>0){

        document.getElementById("Spinner").style.display = "block"
        document.getElementById("spinner1").style.display = "block"
        document.getElementById("status").innerHTML = "Encoding in Progress it may take some time";
        var buttons = document.getElementsByClassName("button")
        var buttons1 = document.getElementsByClassName("button2")
	
    const obj ={
        
        data1:bufferarray.getChannelData(0),
        samplerate: source.buffer.sampleRate,
        data2:null
    
    
        
    }

   if(bufferarray.numberOfChannels>1){
    obj.data2 = bufferarray.getChannelData(1)
   }


  var  w = new Worker("worker.js");
    w.postMessage(obj);

    w.onmessage = function(event) {
  const result = event.data;
  const blob = new Blob(result, { type: "audio/mp3" });
  const audioURL = window.URL.createObjectURL(blob);
  var a = document.createElement("a");
  a.href = audioURL;
  a.download = "downloaded.mp3";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  document.getElementById("status").innerHTML = "";
  document.getElementById("Spinner").style.display = "none"
  document.getElementById("spinner1").style.display = "none"

  var buttons = document.getElementsByClassName("button")
  var buttons1 = document.getElementsByClassName("button2")
	
};
}

else {

    document.getElementById("error").innerHTML = "Please select a file";
}
}