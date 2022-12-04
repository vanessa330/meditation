const playBtn = document.querySelector(".play-btn");
let audio = document.querySelector("#audio");
let video = document.querySelector("#video");

let timeDisplay = document.querySelector(".time-display");
let fakeDuration = 600; // Defalut 10 mins

const timeSelect = Array.from(document.querySelectorAll(".time-select"));

// Select the Audio and Video background

document.querySelector('.rain').addEventListener('click', () => {
  audio.innerHTML = `<source src="./sounds/rain.mp3" />`;
  video.innerHTML = `<source src="./video/rain.mp4" type="video/mp4" />`;
})

document.querySelector('.beach').addEventListener('click', () => {
  audio.innerHTML = `<source src="./sounds/beach.mp3" />`;
  video.innerHTML = `<source src="./video/beach.mp4" type="video/mp4" />`;
})

// Stop and play the sound

playBtn.addEventListener("click", () => {
  checkPlaying(audio);
});

const checkPlaying = (audio) => {
  if (audio.paused) {
    playBtn.innerHTML = `<i class="fa-solid fa-pause display-3"></i>`;
    audio.play();
    video.play();
  } else {
    playBtn.innerHTML = `<i class="fa-solid fa-play display-3"></i>`;
    audio.pause();
    video.pause();
  }
};

// Select the time button

timeSelect.map((button) => {
  button.addEventListener("click", () => {
    fakeDuration = button.getAttribute("data-time");

    timeDisplay.textContent = `${Math.floor(fakeDuration / 60)}:${Math.floor(
      fakeDuration % 60
    )}`;
  });
});

// Animated the time display

audio.ontimeupdate = () => {
  let currentTime = audio.currentTime;
  let coundDown = fakeDuration - currentTime;
  let minutes = Math.floor(coundDown / 60);
  let seconds = Math.floor(coundDown % 60);

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

  if (currentTime >= fakeDuration) {
    audio.pause();
    video.pause();
    audio.currentTime = 0;
  }
};
