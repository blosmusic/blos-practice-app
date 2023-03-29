let tunerButton = document.getElementById("tuner-indication");
let tunerIsRunning = false;

let closestNote = -1;
let recordDifference = Infinity;

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
  tunerButton.innerText = "O";
  tunerIsRunning = true;
  document.getElementById("tuner-indication").style.backgroundColor = "#00ff9f";

  setup();
}

function stopTuner() {
  console.log("tuner stopped, mic closed");
  tunerButton.innerText = "I";
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
  // todo find closest note
  // closestNote
  for (let i = 0; i < notes.length; i++) {
    let diff = frequency - notes[i].freq;
    if (Math.abs(diff) < Math.abs(recordDifference)) {
      closestNote = notes[i];
      recordDifference = diff;
    }
    console.log(
      "freq is:",
      frequency,
      "difference is:",
      diff,
      "Hz.",
      "closest note is:",
      closestNote.note,
      "at freq:",
      closestNote.freq.toFixed(2),
      "Hz"
    );
    // console.log("freq is:", frequency, "difference is:", diff, "notes value", notes[i].freq, "note is:", notes[i].note);
    checkIfNoteIsInKey(frequency, closestNote.note);
  }

  // todo display closest note
  document.querySelector("#tuner-indication").textContent = closestNote.note;
  
}

// todo check if note is in key and display note name in green if it is, red if it isn't
function checkIfNoteIsInKey(note, frequency) {
  // todo check if note is in key
  switch (true) {
    case frequency === note:
    console.log("note is in key");
    document.querySelector("#note-sharp", "#note-flat").style.color = "#00ff9f";
    break;
    case frequency < note:
    console.log("note is flat");
    document.querySelector("#note-flat").style.color = "yellow";
    break;
    case frequency > note:
    console.log("note is sharp");
    document.querySelector("#note-sharp").style.color = "red";
    break;
    default:
    document.querySelector("#note-sharp", "#note-flat").style.color = "#00ff9f";
  }
}