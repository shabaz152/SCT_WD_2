let startTime = 0;
let elapsed = 0;
let running = false;
let interval = null;

const timerDisplay = document.getElementById("timer");
const lapList = document.getElementById("lapList");

document.getElementById("startBtn").addEventListener("click", () => {
    if (!running) {
        running = true;
        startTime = Date.now() - elapsed;
        interval = setInterval(updateTimer, 10);
    }
});

document.getElementById("pauseBtn").addEventListener("click", () => {
    if (running) {
        running = false;
        clearInterval(interval);
        elapsed = Date.now() - startTime;
    }
});

document.getElementById("resetBtn").addEventListener("click", () => {
    running = false;
    clearInterval(interval);
    startTime = 0;
    elapsed = 0;
    timerDisplay.textContent = "00:00:00.00";
    lapList.innerHTML = "";
});

document.getElementById("lapBtn").addEventListener("click", () => {
    if (running) {
        const li = document.createElement("li");
        li.textContent = timerDisplay.textContent;
        lapList.appendChild(li);
    }
});

function updateTimer() {
    elapsed = Date.now() - startTime;

    let ms = Math.floor((elapsed % 1000) / 10);
    let sec = Math.floor((elapsed / 1000) % 60);
    let min = Math.floor((elapsed / (1000 * 60)) % 60);
    let hr = Math.floor(elapsed / (1000 * 60 * 60));

    timerDisplay.textContent =
        `${pad(hr)}:${pad(min)}:${pad(sec)}.${pad(ms, true)}`;
}

function pad(n, ms = false) {
    return ms ? (n < 10 ? "0" + n : n) : n.toString().padStart(2, "0");
}
