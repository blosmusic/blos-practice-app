let tunerButton = document.getElementById("tuner-indication");
let tunerIsRunning = false;

const audioContext = new AudioContext();
const mic = new Tone.UserMedia();;
let pitch;

tunerButton.onclick = function () {
  if (!tunerIsRunning) {
    startTuner();
  } else {
    stopTuner();
  }
};

function startTuner() {
  console.log("tuner started");
  tunerButton.innerText = "STOP";
  tunerIsRunning = true;
  document.getElementById("tuner-indication").style.backgroundColor = "#00ff9f";
  
  mic
  .open()
  .then(() => {
    console.log("mic opened");
    // what to do with the mic
  })
    .catch((e) => {
      console.log("mic error", e);
    });

}

function stopTuner() {
  console.log("tuner stopped");
  tunerButton.innerText = "START";
  tunerIsRunning = false;
  document.getElementById("tuner-indication").style.backgroundColor = "red";
  mic.close();
}

// todo compare pitch to closest note in chromatic scale and display note name 


// todo check if note is in key and display note name in green if it is, red if it isn't


// todo highlight flat or sharp indicator if note is flat or sharp


// measure the difference in pitch as cents and display