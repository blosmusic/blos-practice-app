const audioContext = new AudioContext();

navigator.permissions.query({ name: "microphone" }).then(function (result) {
  if (result.state == "granted") {
    console.log("Microphone access granted");
    //TODO: start app
  } else if (result.state == "prompt") {
    console.log("Microphone access prompt");
    

  } else if (result.state == "denied") {
    console.log("Microphone access denied");
    //TODO: show error message

  }
  result.onchange = function () {};
});

const tuner = document.querySelector(".tuner");
const tunerDisplay = document.querySelector(".tuner-display");
const tunerStartStop = document.querySelector(".tuner-start-stop");
const tunerIsRunning = false;

tunerStartStop.addEventListener("click", function () {
    if (!tunerIsRunning) {
        console.log("tuner started");
        tunerStartStop.innerText = "STOP";

    } else {
        console.log("tuner stopped");
        tunerStartStop.innerText = "START";
    }
});
