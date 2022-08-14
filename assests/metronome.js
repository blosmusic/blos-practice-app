let startButton = document.getElementById("onoff-button");
let tempoSlider = document.getElementById("tempo-slider");
let bpmDisplay = document.getElementById("bpm-display");
let decreaseTempo = document.getElementById("decrease-tempo");
let increaseTempo = document.getElementById("increase-tempo");
let beatsArray = [0, 1, 2, 3];

bpmDisplay.innerHTML = tempoSlider.value;

decreaseTempo.onclick = function () {
  tempoSlider.value--;
  bpmDisplay.innerHTML = this.value;
  updateMetronome();
};

increaseTempo.onclick = function () {
  tempoSlider.value++;
  bpmDisplay.innerHTML = this.value;
  updateMetronome();
};

tempoSlider.oninput = function () {
  bpmDisplay.innerHTML = this.value;
  updateMetronome();
};

let updateMetronome = function () {
  bpmDisplay.innerHTML = tempoSlider.value;
  Tone.Transport.bpm.value = tempoSlider.value;
};

// todo modify array to change time signature with user input

let synth;
let loop = new Tone.Sequence(
  function (time, col) {
    console.log(col);
    synth.triggerAttackRelease("C2", "64n");
  },
  [0, 1, 2, 3],
  "8n"
).start(0);

Tone.Transport.on("stop", function () {
  console.log("loop stopped");
});
Tone.Transport.bpm.value = tempoSlider.value;
startButton.onclick = function () {
  if (!synth) {
    synth = new Tone.Synth().toMaster();
    console.log("created synth");
  }
  if (Tone.Transport.state !== "started") {
    Tone.Transport.start();
    startButton.innerText = "STOP";
  } else {
    Tone.Transport.stop();
    startButton.innerText = "START";
  }
};
