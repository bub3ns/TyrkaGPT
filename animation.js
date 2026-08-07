const titleText = "TyrkaGPT\u2800TyrkaGPT\u2800TyrkaGPT\u2800";
const blurTitle = "Juz quitujesz pedale jebany?";

let index = 0;
let lastTime = 0;
const speed = 300;

function animateTitle(timestamp) {
    if (document.hidden) return;

    if (!lastTime) lastTime = timestamp;

    if (timestamp - lastTime >= speed) {
        document.title =
            titleText.slice(index) + titleText.slice(0, index);

        index++;

        if (index >= titleText.length) {
            index = 0;
        }

        lastTime = timestamp;
    }

    requestAnimationFrame(animateTitle);
}

document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
        document.title = blurTitle;
    } else {
        index = 0;
        lastTime = 0;
        requestAnimationFrame(animateTitle);
    }
});

requestAnimationFrame(animateTitle);