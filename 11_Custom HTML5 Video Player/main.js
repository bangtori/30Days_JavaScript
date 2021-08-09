const player = document.querySelector(".player");
const video = player.querySelector(".viewer");
const progress = player.querySelector(".progress");
const progressBar = player.querySelector(".progress__filled");
const toggle = player.querySelector(".toggle");
const skipButtons = player.querySelectorAll("[data-skip]");
const ranges = player.querySelectorAll(".player__slider");

// 비디오 재생, 일시 정지
function togglePlay() {
  const method = video.paused ? "play" : "pause";
  video[method]();
}
video.addEventListener("click", togglePlay);
toggle.addEventListener("click", togglePlay);

// 비디오 재생, 일시 정지에 맞게 아이콘 변경
function updateButton() {
  const icon = this.paused ? "►" : "❚ ❚";
  toggle.textContent = icon;
}
video.addEventListener("play", updateButton);
video.addEventListener("pause", updateButton);

// 15초 앞으로, 뒤로
function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
}
skipButtons.forEach((button) => button.addEventListener("click", skip));

//비디오 프로그래스바
function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}
video.addEventListener("timeupdate", handleProgress);
function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}
let mousedown = false;
progress.addEventListener("click", scrub);
progress.addEventListener("mousemove", (e) => mousedown && scrub(e));
progress.addEventListener("mousedown", () => (mousedown = true));
progress.addEventListener("mouseup", () => (mousedown = false));

//비디오 음량, 속도 range 변경
function handleRangeUpdate() {
  video[this.name] = this.value;
}
ranges.forEach((range) => range.addEventListener("change", handleRangeUpdate));
ranges.forEach((range) =>
  range.addEventListener("mousemove", handleRangeUpdate)
);
