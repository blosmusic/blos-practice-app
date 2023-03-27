let tunerButton = document.getElementById("tuner-indication");
let tunerIsRunning = false;

let closestNote = -1;
let recordDifference = Infinity;
// let frequency = 0;

let notes = [
  {
    instrument: "GUITAR",
    note: "E",
    freq: 82.41,
  },
  {
    instrument: "GUITAR",
    note: "A",
    freq: 110,
  },
  {
    instrument: "GUITAR",
    note: "D",
    freq: 146.83,
  },
  {
    instrument: "GUITAR",
    note: "G",
    freq: 196,
  },
  {
    instrument: "GUITAR",
    note: "B",
    freq: 246.94,
  },
  {
    instrument: "GUITAR",
    note: "e",
    freq: 329.63,
  },
];

// ml5 code from https://learn.ml5js.org/#/reference/pitch-detection
let model_url =
  "https://cdn.jsdelivr.net/gh/ml5js/ml5-data-and-models/models/pitch-detection/crepe";

document
  .getElementById("tuner-indication")
  .addEventListener("click", async () => {
    await Tone.start();
    document.querySelector("h4").innerText = "Permission Granted";
    console.log("audio is ready");
  });

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

  setup();
}

function stopTuner() {
  console.log("tuner stopped, mic closed");
  tunerButton.innerText = "START";
  tunerIsRunning = false;
  document.getElementById("tuner-indication").style.backgroundColor = "red";
  audioContext.close();
}

async function setup() {
  audioContext = new AudioContext();
  stream = await navigator.mediaDevices.getUserMedia({
    audio: true,
    video: false,
  });
  startPitch(stream, audioContext);
}

function startPitch(stream, audioContext) {
  pitch = ml5.pitchDetection(model_url, audioContext, stream, modelLoaded);
}

function modelLoaded() {
  getPitch();
}

function getPitch() {
  pitch.getPitch(function (err, frequency) {
    if (frequency) {
      frequency = frequency.toFixed(3);
      noteValueOfFrequency(frequency);
      document.querySelector("#result").textContent = frequency;
      console.log(
        "ml5 frequency is:",
        frequency,
        "Hz",
        "\t",
        "note:",
        noteValueOfFrequency(frequency)
      );
      comparePitchToNote(frequency);
    } else if (err) {
      err = "No pitch detected";
      document.querySelector("#result").textContent = err;
      console.log("ml5:", err);
    }
    getPitch();
  });
}

function noteValueOfFrequency(frequencyValue) {
  frequencyValue = Tone.Frequency(frequencyValue, "hz").toNote();
  document.querySelector("#value").textContent = frequencyValue;
  return frequencyValue;
}

// todo compare pitch to closest note in scale and display note
function comparePitchToNote(frequency) {
  for (let i = 0; i < notes.length; i++) {
    let diff = frequency - notes[i].freq;
    console.log("freq is:", frequency, "diff is:", diff);
    if (Math.abs(diff) < Math.abs(recordDifference)) {
      closestNote = notes[i];
      recordDifference = diff;
    }

    console.log("closest note is:", closestNote.note);
    // if (diff == 0) {
    //   break;
    // }

    // if (diff < 0) {
    //   closestNote = notes[i - 1];
    //   break;
    // }

    // if (diff > 0) {
    //   closestNote = notes[i];
    // }
  }
  console.log(closestNote);
}

// todo check if note is in key and display note name in green if it is, red if it isn't

// todo highlight flat or sharp indicator if note is flat or sharp

// measure the difference in pitch as cents and display
