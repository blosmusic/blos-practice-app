let tunerButton = document.getElementById("tuner-indication");
let tunerIsRunning = false;

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
  activeTuner();
  document.getElementById("tuner-indication").style.backgroundColor = "black";
}

function stopTuner() {
  console.log("tuner stopped");
  tunerIsRunning = false;
  tunerButton.innerText = "START";
  document.getElementById("tuner-indication").style.backgroundColor = "red";
}

function activeTuner() {
  console.log("tuner is running");
  if (tunerIsRunning === true) {
    console.log("fft data");
    //todo create functional fft analysis
    // let audioContext = new AudioContext();
    // let analyser = audioContext.createAnalyser();
    // let microphone = audioContext.createMediaStreamSource(stream);
    // let javascriptNode = audioContext.createScriptProcessor(2048, 1, 1);
    // analyser.smoothingTimeConstant = 0.3;
    // analyser.fftSize = 1024;
    // microphone.connect(analyser);
    // analyser.connect(javascriptNode);
    // javascriptNode.connect(audioContext.destination);
    // javascriptNode.onaudioprocess = function () {
    //     let array = new Uint8Array(analyser.frequencyBinCount);
    //     analyser.getByteFrequencyData(array);
    //     let values = 0;
    //     let length = array.length;
    //     for (let i = 0; i < length; i++) {
    //     values += array[i];
    //     }
    //     let average = values / length;
    //     console.log(Math.round(average));
    // };
  }
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
