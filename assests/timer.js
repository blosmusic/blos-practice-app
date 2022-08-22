let timerDisplay = document.getElementById("timer-display");
let timerStartPause = document.getElementById("timer-start-pause");
let timerReset = document.getElementById("timer-reset");
let timerDuration = document.querySelectorAll('input[name="timer-duration"]');
let duration = 60;
let durationSelected;
let timerIsPaused = false;

timerDisplay.innerHTML = "00:00";

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
        display.innerHTML = "FINISHED";
        timerStartPause.innerText = "START";
      }
    }
  }, 1000);
}

timerStartPause.onclick = function () {
  if (timerStartPause.innerText === "START") {
    startTimer(duration, timerDisplay);
    timerStartPause.innerText = "PAUSE";
  } else if (timerStartPause.innerText === "PAUSE") {
    pauseTimer();
    timerStartPause.innerText = "RESUME";
  } else if (timerStartPause.innerText === "RESUME") {
    resumeTimer();
    timerStartPause.innerText = "PAUSE";
  }
};

function pauseTimer() {
  console.log("timer paused");
  timerIsPaused = true;
  // duration = timer.textContent;
}

function resumeTimer() {
  console.log("timer resumed");
  timerIsPaused = false;
  // duration = timer.textContent;
}

timerReset.onclick = function () {
  console.log("timer reset");
  timerDisplay.innerHTML = "00:00";
  timerStartPause.innerText = "START";
  timerIsPaused = true;
  clearTimeout(startTimer(duration, timerDisplay));
};