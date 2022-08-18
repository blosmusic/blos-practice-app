let timerDisplay = document.getElementById("timer-display");
let timerStartPause = document.getElementById("timer-start-pause");
let timerReset = document.getElementById("timer-reset");
let timerDuration = document.querySelectorAll(
  'input[name="timer-duration"]');
let duration, durationSelected; //get duration converted to seconds for timer

timerDisplay.innerHTML = "Select Time";

timerDuration.forEach(function (durationSelected) {
    durationSelected.oninput = function () {
      console.log("user selected: " + durationSelected.value + " minutes");
    };
}
);

function startTimer(duration, timerDisplay) {
  duration = durationSelected * 60;
  let timer = duration,
    minutes,
    seconds;
  setInterval(function () {
    minutes = parseInt(timer / 60, 10);
    seconds = parseInt(timer % 60, 10);

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    timerDisplay.textContent = minutes + ":" + seconds;

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
