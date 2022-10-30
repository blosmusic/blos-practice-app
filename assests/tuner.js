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
  document.getElementById("tuner-indication").style.backgroundColor = "black";
  
  mic
  .open()
  .then(() => {
    console.log("mic opened");
    startPitch();
    processAudioInputLevel();
  })
    .catch((e) => {
      console.log("mic error", e);
    });

}

function stopTuner() {
  console.log("tuner stopped");
  tunerIsRunning = false;
  tunerButton.innerText = "START";
  document.getElementById("tuner-indication").style.backgroundColor = "red";
  mic.close();
}

function processAudioInputLevel() {
  console.log("processAudioInputLevel called");
  inputLevelValueRead = meter.getValue().toFixed(2);
  // print the incoming mic levels in decibels
  console.log("The Decibel level is:", inputLevelValueRead, "dB");
}

function startPitch() {
  pitch = ml5.pitchDetection("./model/", audioContext, mic.stream, modelLoaded);
}

function modelLoaded() {
  // select("#tuner-indication").html("Model Loaded");
  console.log("model loaded");
  getPitch();
}

function getPitch() {
  pitch.getPitch(function (err, frequency) {
    if (frequency) {
      console.log(frequency, "Hz");
      // select("#tuner-indication").html(frequency);
    } else {
      console.log("no pitch");
      // select("#tuner-indication").html("No pitch detected");
    }
    getPitch();
  });
}

// navigator.permissions.query({ name: "microphone" }).then(function (result) {
//   if (result.state == "granted") {
//     console.log("Microphone access granted");
//     //TODO: start app
//   } else if (result.state == "prompt") {
//     console.log("Microphone access prompt");
//   } else if (result.state == "denied") {
//     console.log("Microphone access denied");
//     //TODO: show error message
//   }
//   result.onchange = function () {};
// });
