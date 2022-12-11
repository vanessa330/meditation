const playBtn = document.querySelector(".play-btn");
let audio = document.querySelector("#audio");
let timeDisplay = document.querySelector(".time-display");
let fakeDuration = 300;
const timeSelect = Array.from(document.querySelectorAll(".time-select"));

// Select the time druration button

timeSelect.map((button) => {
  button.addEventListener("click", () => {
    fakeDuration = button.getAttribute("data-time");

    timeDisplay.textContent = `${Math.floor(fakeDuration / 60)}:00`;
  });
});

// Select the different audio

let changeSound = (musicPath) => {
  audio.pause();
  audio.setAttribute("src", musicPath);
  audio.load();
};

// Stop and play the sound

playBtn.addEventListener("click", () => {
  checkPlaying();
})

function checkPlaying(){
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

  timeDisplay.innerText = `${leadingMinutes}:${leadingSeconds}`;

  if (timeRemaining <= 0) {
    playBtn.innerHTML = `<i class="fa-solid fa-play display-3"></i>`;
    audio.pause();
    timeDisplay.innerHTML = `00:00`;
  }
}
