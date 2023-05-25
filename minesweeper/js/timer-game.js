import { timerCount } from './header.js';

let min = 0;
let hour = 0;
let sec;
let timerInterval;

function timerTick() {
  sec += 1;
  if (sec >= 60) {
    min += 1;
    sec = 0;
  }
  if (min >= 60) {
    hour += 1;
    min = 0;
  }
  const hourStr = (hour < 10) ? `0${hour}` : `${hour}`;
  const minStr = (min < 10) ? `0${min}` : `${min}`;
  const secStr = (sec < 10) ? `0${sec}` : `${sec}`;

  timerCount.innerHTML = `${hourStr}:${minStr}:${secStr}`;
}

export function timer() {
  sec = 0;
  timerInterval = setInterval(timerTick, 1000);
}

export function timerStop() {
  clearInterval(timerInterval);
}
