let timerDisplay = document.getElementById("timer-display");
let timerStartPause = document.getElementById("timer-start-pause");
let timerReset = document.getElementById("timer-reset");
let timerDuration = document.querySelectorAll('input[name="timer-duration"]');
let duration = 60;
let durationSelected;
let timerIsPaused = false;

timerDisplay.innerText = "00:00";

timerDuration.forEach(function (durationSelected) {
  durationSelected.oninput = function () {
    console.log("user selected: " + durationSelected.value + " minutes");
    console.log(
      "converted to seconds: " + durationSelected.value * 60 + " seconds"
    );
    duration = durationSelected.value * 60;
    let timerView =
      durationSelected.value < 10
        ? "0" + durationSelected.value
        : durationSelected.value;
    timerDisplay.textContent = timerView + ":00";
  };
});

function startTimer(duration, display) {
  let timer = duration,
    minutes,
    seconds;
  setInterval(function () {
    if (!timerIsPaused) {
      minutes = parseInt(timer / 60, 10);
      seconds = parseInt(timer % 60, 10);

      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;

      display.textContent = minutes + ":" + seconds;

      if (--timer < 0) {
        display.innerText = "FINISHED";
        resetTimer();
      }
    }
  }, 1000);
}

function pauseTimer() {
  console.log("timer paused");
  timerIsPaused = true;
  timerStartPause.innerText = "RESUME";
}

function resumeTimer() {
  console.log("timer resumed");
  timerIsPaused = false;
  timerStartPause.innerText = "PAUSE";
}

function resetTimer() {
  console.log("timer reset");
  //TODO reset app to default state
}

timerStartPause.onclick = function () {
  if (timerStartPause.innerText === "START") {
    startTimer(duration, timerDisplay);
    timerStartPause.innerText = "PAUSE";
  } else if (timerStartPause.innerText === "PAUSE") {
    pauseTimer();
  } else if (timerStartPause.innerText === "RESUME") {
    resumeTimer();
  }
};

timerReset.onclick = function () {
  resetTimer();
};