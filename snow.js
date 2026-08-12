(function () {
    const canvas = document.getElementById('snow-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let mouseX = null;
    let mouseY = null;
    let isLeftMouseDown = false;

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        isLeftMouseDown = (e.buttons & 1) === 1;
    });

    window.addEventListener('mousedown', (e) => {
        if (e.button === 0) {
            isLeftMouseDown = true;
        }
    });

    window.addEventListener('mouseup', (e) => {
        if (e.button === 0) {
            isLeftMouseDown = false;
        }
    });

    window.addEventListener('mouseleave', () => {
        mouseX = null;
        mouseY = null;
        isLeftMouseDown = false;
    });

    let baseFlakeCount = Math.floor((width * height) / 6000);
    let maxHoldFlakes = baseFlakeCount * 2;
    const flakes = [];

    function initFlakes() {
        flakes.length = 0;
        baseFlakeCount = Math.floor((width * height) / 6000);
        maxHoldFlakes = baseFlakeCount * 2;
        for (let i = 0; i < baseFlakeCount; i++) {
            flakes.push(new Flake());
        }
    }

    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
        initFlakes();
    });

    class Flake {
        constructor() {
            this.reset(true);
        }

        reset(initial = false) {
            this.x = Math.random() * width;
            this.y = initial ? Math.random() * height : -10;
            this.size = Math.random() * 3 + 1; // 1px to 4px
            this.speed = Math.random() * 1.2 + 0.5;
            this.velY = this.speed;
            this.velX = Math.random() * 0.5 - 0.25;
            this.pushVx = 0;
            this.pushVy = 0;
            this.step = Math.random() * Math.PI * 2;
            this.stepSize = Math.random() * 0.03 + 0.01;
            this.baseOpacity = Math.random() * 0.7 + 0.3;
            this.opacity = this.baseOpacity;
            this.glow = Math.random() > 0.6;
            this.maxLife = Math.random() * 700 + 240;
            this.life = this.maxLife;
            this.fadeFrames = 60;
        }

        update() {
            this.step += this.stepSize;
            this.pushVx *= 0.92;
            this.pushVy *= 0.92;

            this.x += Math.sin(this.step) * 0.6 + this.velX + this.pushVx;
            this.y += this.velY + this.pushVy;

            if (isLeftMouseDown) {
                this.life = Math.max(this.life, this.fadeFrames + 30);
                this.opacity = this.baseOpacity;
            } else {
                this.life--;
                if (this.life <= this.fadeFrames) {
                    const fadeRatio = Math.max(0, this.life / this.fadeFrames);
                    this.opacity = this.baseOpacity * fadeRatio;
                }
            }

            if (mouseX !== null && mouseY !== null) {
                const dx = mouseX - this.x;
                const dy = mouseY - this.y;
                const dist = Math.hypot(dx, dy);

                if (isLeftMouseDown) {
                    const maxRadius = 225;
                    if (dist < maxRadius && dist > 0) {
                        const normalizedDist = dist / maxRadius;
                        const force = Math.pow(1 - normalizedDist, 2) * 5.25;
                        const nx = dx / dist;
                        const ny = dy / dist;

                        this.pushVx += nx * force;
                        this.pushVy += ny * force;
                    }
                } else {
                    if (dist < 75 && dist > 0) {
                        const pull = (1 - dist / 75) * (this.speed * 0.75);
                        this.x += (dx / dist) * pull;
                        this.y += (dy / dist) * pull;
                    }
                }
            }

            if (this.life <= 0 || this.y > height + 10 || this.x < -50 || this.x > width + 50) {
                if (flakes.length > baseFlakeCount) {
                    return false;
                } else {
                    this.reset();
                }
            }
            return true;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);

            if (this.glow) {
                ctx.shadowBlur = 8;
                ctx.shadowColor = `rgba(215, 235, 255, ${this.opacity})`;
            } else {
                ctx.shadowBlur = 0;
            }

            ctx.fillStyle = `rgba(235, 245, 255, ${this.opacity})`;
            ctx.fill();
            ctx.shadowBlur = 0;
        }
    }

    initFlakes();

    function render() {
        ctx.clearRect(0, 0, width, height);

        if (isLeftMouseDown && flakes.length < maxHoldFlakes) {
            for (let s = 0; s < 2; s++) {
                if (flakes.length < maxHoldFlakes) {
                    const newFlake = new Flake();
                    newFlake.reset(false);
                    flakes.push(newFlake);
                }
            }
        }

        for (let i = 0; i < flakes.length; i++) {
            const isAlive = flakes[i].update();
            if (!isAlive) {
                flakes.splice(i, 1);
                i--;
                continue;
            }
            flakes[i].draw();
        }
        requestAnimationFrame(render);
    }

    render();
})();
