export class PatternManager {
    constructor(canvas, colorSchemes) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.colorSchemes = colorSchemes;
        this.currentSchemeIndex = 0;
        this.gridSize = 20; 
        this.cols = 0;
        this.rows = 0;
        this.grid = [];
        this.animationFrameId = null;
        this.animationProgress = 0;
        this.animationSpeed = 2; // Control speed of animation
        this.baseScale = 0.3; // Start from 30% size instead of 0%

        this.resizeCanvas();
        window.addEventListener("resize", () => this.resizeCanvas());
    }

    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.cols = Math.ceil(this.canvas.width / this.gridSize);
        this.rows = Math.ceil(this.canvas.height / this.gridSize);
        this.grid = [];

        for (let y = 0; y < this.rows; y++) {
            for (let x = 0; x < this.cols; x++) {
                if ((x + y) % 2 === 0) {
                    this.grid.push({ 
                        x, 
                        y, 
                        opacity: 0, 
                        scale: this.baseScale, // Start from 30%
                        delay: (x + y) * 2 // Creates a diagonal "wave" effect
                    });
                }
            }
        }

        this.animationProgress = 0;
        this.animatePattern();
    }

    animatePattern() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        const colors = this.colorSchemes[this.currentSchemeIndex];

        let completed = true; // Track if all squares are fully visible

        for (let i = 0; i < this.grid.length; i++) {
            const square = this.grid[i];

            if (this.animationProgress >= square.delay) {
                const color = colors[Math.floor(Math.random() * colors.length)];
                this.ctx.fillStyle = color;
                this.ctx.globalAlpha = square.opacity;
                
                const size = Math.max(this.gridSize * square.scale, 1);
                const offsetX = (this.gridSize - size) / 2;
                const offsetY = (this.gridSize - size) / 2;

                this.ctx.fillRect(
                    square.x * this.gridSize + offsetX, 
                    square.y * this.gridSize + offsetY, 
                    size, 
                    size
                );

                // Smoothly increase opacity and scale
                if (square.opacity < 1) {
                    square.opacity += 0.07;
                    completed = false;
                }
                if (square.scale < 1) {
                    square.scale += 0.07;
                    completed = false;
                }
            }
        }

        if (!completed) {
            this.animationProgress += this.animationSpeed; // Control animation speed
            this.animationFrameId = requestAnimationFrame(() => this.animatePattern());
        }
    }

    setColorScheme(index) {
        this.currentSchemeIndex = index;
        this.animationProgress = 0;
        this.animatePattern();
    }

    adjustOpacity() {
        const isHomePage = document.getElementById("home")?.classList.contains("active");
        this.canvas.style.opacity = isHomePage ? "1" : "0.3";
    }
}
