$(document).ready(function () {
  // Global variables

  const startBtn = $("#start-btn");
  const playPauseBtn = $("#play-pause-btn");
  const resetBtn = $("#reset-btn");

  let time = 300;
  let soundPath = "./sounds/beach.mp3";
  let audio = $("#audio");
  let playingStatus = true;
  let timerInterval = null;
  let timeDisplay = $("#time-display");

  // Select the duration and the sound

  function selectTime() {
    time = $("select#time-options").val();
  }

  function selectSound() {
    soundPath = $("select#sound-options").val();
  }

  $("select#time-options").change(selectTime);
  $("select#sound-options").change(selectSound);

  // Start , play, pause and reset buttons

  startBtn.click(() => {
    $("#duration").attr("data-time", time);
    audio.attr("src", soundPath);

    $("#timer").css("display", "block");
    $("#selection").css("display", "none");

    timerInterval = setInterval(countdown, 1000);
    audio.trigger("play");
  });

  playPauseBtn.click(() => {
    if (playingStatus === true) {
      playPauseBtn.html(`<i class="fa-solid fa-play display-3"></i>`);
      audio.trigger("pause");
      playingStatus = false;
      clearInterval(timerInterval);
    } else {
      playPauseBtn.html(`<i class="fa-solid fa-pause display-3"></i>`);
      audio.trigger("play");
      playingStatus = true;
      timerInterval = setInterval(countdown, 1000);
    }
  });

  resetBtn.click(function () {
    window.location.href = "index.html";
  });

  // Animated the time display
  function countdown() {
    let minutes = Math.floor(time / 60);
    let seconds = Math.floor(time % 60);
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

    timeDisplay.text(`${leadingMinutes} : ${leadingSeconds}`);

    time--;

    if (time === -1) {
      audio.trigger("pause");
      clearInterval(timerInterval);
      timeDisplay.text("00 : 00");
      playPauseBtn.css("display", "none");
    }
  }
});
