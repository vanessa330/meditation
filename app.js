const playBtn = document.querySelector(".play-btn");
let audio = document.querySelector("#audio");
let timeDisplay = document.querySelector(".time-display");
let fakeDuration = 10; // Default 300 = 5mins
const timeSelect = Array.from(document.querySelectorAll(".time-select"));
const soundSelect = Array.from(document.querySelectorAll(".sound-select"));

// Select the time druration button

timeSelect.map((button) => {
  button.addEventListener("click", () => {
    fakeDuration = button.getAttribute("data-time");

    if (fakeDuration < 600) {
      timeDisplay.textContent = `0${fakeDuration / 60}:00`;
    } else {
      timeDisplay.textContent = `${fakeDuration / 60}:00`;
    }
  });
});

// Select the different audio

soundSelect.map((button) => {
  button.addEventListener("click", () => {
    let soundPath = button.getAttribute("data-audio");
    
    audio.setAttribute("src", soundPath);
    audio.load();
  });
});

// Stop and play the sound

playBtn.addEventListener("click", () => {
  checkPlaying();
});

function checkPlaying() {
  if (audio.paused) {
    playBtn.innerHTML = `<i class="fa-solid fa-pause display-3"></i>`;
    audio.play();
    timerInterval = window.setInterval(countdown, 1000);
  } else {
    playBtn.innerHTML = `<i class="fa-solid fa-play display-3"></i>`;
    audio.pause();
    window.clearInterval(timerInterval);
  }
}

// Animated the time display

function countdown() {
  let timeRemaining = fakeDuration;

  fakeDuration--;
  let minutes = Math.floor(timeRemaining / 60);
  let seconds = Math.floor(timeRemaining % 60);

  let leadingSeconds = 0;
  let leadingMinutes = 0;

  if (minutes < 10) {
    leadingMinutes = "0" + minutes.toString();
  } else {
    leadingMinutes = minutes;
  }

  if (seconds < 10) {
    leadingSeconds = "0" + seconds.toString();
  } else {
    leadingSeconds = seconds;
  }

  timeDisplay.textContent = `${leadingMinutes}:${leadingSeconds}`;

  if (timeRemaining <= 0) {
    timeDisplay.textContent = `05:00`;
    fakeDuration = 300;
    checkPlaying();
  }
}