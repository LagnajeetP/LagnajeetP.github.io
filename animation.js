const canvas = document.getElementById("matrix");
const ctx    = canvas.getContext("2d");

canvas.width  = innerWidth;
canvas.height = innerHeight;

const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&*()*&^%";
const matrixChars = chars.split("");

const fontSize = 16;
const columns = Math.floor(canvas.width / fontSize);
const drops = Array(columns).fill(1);

function draw() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#0F0";
  ctx.font = fontSize + "px monospace";

  drops.forEach((yPos, index) => {
    const text = matrixChars[Math.floor(Math.random() * matrixChars.length)];
    const x = index * fontSize;
    ctx.fillText(text, x, yPos * fontSize);

    if (yPos * fontSize > canvas.height && Math.random() > 0.975) {
      drops[index] = 0;
    }
    drops[index]++;
  });
}

setInterval(draw, 50);

window.addEventListener("resize", () => {
  canvas.width  = innerWidth;
  canvas.height = innerHeight;
});
