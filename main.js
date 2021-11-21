Status = "";
objects = "";

function setup(){
    canvas = createCanvas(600 , 400);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(600,400);
    video.hide();
}

function draw(){
    image(video , 0 , 0 , 600 , 400);
    objectDetector.detect(video , gotResult);

    if(Status == true){
        
        for(i = 0 ; i < objects.length ; i++){

            if(objects[i].label == object_name){
                document.getElementById("status").innerHTML = "Status: Object Detected!!";
                

                var synth = window.speechSynthesis;
                utter_this = SpeechSynthesisUtterance(object_name + "found");
                synth.speak(utter_this);

                percent = floor(objects[i].confidece * 100);
                text(objects[i].label + " " + percent + "%" , objects[i].x + 15 , objects[i].y + 15);

                fill("#FF0000");
                noFill();
                stroke("#FF0000");
                rect(objects[i].x , objects[i].y , objects[i].width , objects[i].height);
            }

            else{
                document.getElementById("status").innerHTML = "Status: Object STILL not Detected";   
            }

        }
    }

    
}

function start(){
    objectDetector = ml5.objectDetector('cocossd' , modelLoaded);
    object_name = document.getElementById("input").value;
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
}

function modelLoaded(){
    console.log("Model has Loaded!!");
    Status = true;
}

function gotResult(error , results){
    if(error){
        console.log(error);
    }
    console.log(results);
    objects = results;
}
    