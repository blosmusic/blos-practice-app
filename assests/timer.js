let timerDisplay = document.getElementById("timer-display");
let timerStartPause = document.getElementById("timer-start-pause");
let timerReset = document.getElementById("timer-reset");
let timerDuration = document.querySelectorAll('input[name="timer-duration"]');
let duration = 60;
let durationSelected;

timerDisplay.innerHTML = "00:00";

timerDuration.forEach(function (durationSelected) {
  //clear selected duration
  durationSelected.oninput = function () {
    console.log("user selected: " + durationSelected.value + " minutes");
    console.log("converted to seconds: " + durationSelected.value * 60 + " seconds");
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
    minutes = parseInt(timer / 60, 10);
    seconds = parseInt(timer % 60, 10);

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    display.textContent = minutes + ":" + seconds;

    if (--timer < 0) {
      display.innerHTML = "FINISHED";
    }
  }, 1000);
}

timerStartPause.onclick = function () {
  if (timerStartPause.innerText === "START") {
    startTimer(duration, timerDisplay);
    timerStartPause.innerText = "PAUSE";
  } else {
    pauseTimer();
    timerStartPause.innerText = "START";
  }
}

timerReset.onclick = function () {
  timerDisplay.innerHTML = "00:00";
  timerStartPause.innerText = "START";
};

function pauseTimer() {
  console.log("timer paused");
  duration = timer.textContent;
  clearTimeout(timer);
}
