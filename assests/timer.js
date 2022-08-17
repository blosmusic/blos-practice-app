let timerDisplay = document.getElementById("timer-display");
let timerStartPause = document.getElementById("timer-start-pause");
let timerReset = document.getElementById("timer-reset");
let timerDurartion = document.querySelector(
  'input[name="timer-duration"]:checked'
).value;
let duration = timerDurartion * 60;

timerDisplay.innerHTML = document.querySelector(
  'input[name="timer-duration"]:checked'
).value;

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
      timerDisplay.innerHTML = "FINISHED";
    }
  }, 1000);
}

timerStartPause.onclick = function () {
  if (timerStartPause.innerText === "START") {
    startTimer(duration, timerDisplay);
    timerStartPause.innerText = "PAUSE";
  }
};

timerReset.onclick = function () {
  timerDisplay.innerHTML = "00:00";
  timerStartPause.innerText = "START";
};
