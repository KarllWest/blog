/* Оновлений стиль для блогу */

document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll(".btn-green, .btn-red");

    buttons.forEach(button => {
        button.addEventListener("click", (event) => {
            event.preventDefault(); // Запобігаємо миттєвому переходу
            const link = button.closest("a").getAttribute("href");
            
            const effect = document.createElement("div");
            effect.classList.add("click-effect");
            document.body.appendChild(effect);

            effect.style.left = `${event.clientX}px`;
            effect.style.top = `${event.clientY}px`;
            
            if (button.classList.contains("btn-green")) {
                effect.style.background = "rgba(0, 255, 0, 0.4)";
            } 

            if (button.classList.contains("btn-red")) {
                effect.style.background = "rgba(255, 0, 0, 0.4)";
            }

            setTimeout(() => {
                effect.remove();
                window.location.href = link;
            }, 500);
        });

        // Додаємо ефект хвиль при наведенні
        button.addEventListener("mouseenter", () => {
            const waveEffect = document.createElement("div");
            waveEffect.classList.add("wave-effect");
            document.body.appendChild(waveEffect);
            
            if (button.classList.contains("btn-green")) {
                waveEffect.classList.add("wave-green");
            }
            
            if (button.classList.contains("btn-red")) {
                waveEffect.classList.add("wave-red");
            }

            setTimeout(() => waveEffect.remove(), 1000);
        });
    });
});

const style = document.createElement("style");
style.innerHTML = `
    .click-effect {
        position: fixed;
        width: 200px;
        height: 200px;
        border-radius: 50%;
        transform: translate(-50%, -50%) scale(0);
        animation: clickAnimation 0.5s ease-out forwards;
        pointer-events: none;
        z-index: 1000;
    }

    @keyframes clickAnimation {
        0% {
            transform: translate(-50%, -50%) scale(0);
            opacity: 1;
        }
        100% {
            transform: translate(-50%, -50%) scale(3);
            opacity: 0;
        }
    }

    .wave-effect {
        position: fixed;
        top: 50%;
        left: 50%;
        width: 100vw;
        height: 100vh;
        background: radial-gradient(circle, rgba(0, 255, 0, 0.2) 10%, transparent 70%);
        opacity: 0.5;
        transform: translate(-50%, -50%) scale(1);
        animation: waveAnimation 1s ease-out forwards;
        pointer-events: none;
        z-index: -1;
    }

    .wave-green {
        background: radial-gradient(circle, rgba(0, 255, 0, 0.4) 10%, transparent 70%);
    }

    .wave-red {
        background: radial-gradient(circle, rgba(255, 0, 0, 0.4) 10%, transparent 70%);
    }

    @keyframes waveAnimation {
        0% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 0.5;
        }
        100% {
            transform: translate(-50%, -50%) scale(2);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Фон з частинками
const canvas = document.createElement("canvas");
document.body.appendChild(canvas);
const ctx = canvas.getContext("2d");
canvas.style.position = "fixed";
canvas.style.top = "0";
canvas.style.left = "0";
canvas.style.zIndex = "-1";
canvas.style.pointerEvents = "none";

let particles = [];
const numParticles = 50;

function initParticles() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    particles = [];
    for (let i = 0; i < numParticles; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 3 + 1,
            speedX: (Math.random() - 0.5) * 2,
            speedY: (Math.random() - 0.5) * 2
        });
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
        p.x += p.speedX;
        p.y += p.speedY;
        if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
        if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(0, 255, 255, 0.5)";
        ctx.fill();
    });
    requestAnimationFrame(animateParticles);
}

window.addEventListener("resize", initParticles);
initParticles();
animateParticles();
