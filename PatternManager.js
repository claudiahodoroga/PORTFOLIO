class PatternManager {
    constructor(canvas, colorSchemes) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.colorSchemes = colorSchemes;
        this.currentScheme = 0; // Default to first scheme
        
        // Collection of embroidery pattern definitions
        this.patterns = [
            // Cross pattern
            {
                draw: (x, y, size, color) => {
                    this.ctx.strokeStyle = color;
                    this.ctx.lineWidth = 2;
                    this.ctx.beginPath();
                    this.ctx.moveTo(x - size/2, y - size/2);
                    this.ctx.lineTo(x + size/2, y + size/2);
                    this.ctx.stroke();
                    this.ctx.beginPath();
                    this.ctx.moveTo(x + size/2, y - size/2);
                    this.ctx.lineTo(x - size/2, y + size/2);
                    this.ctx.stroke();
                },
                size: 15
            },
            // Diamond flower
            {
                draw: (x, y, size, color) => {
                    this.ctx.fillStyle = color;
                    this.ctx.beginPath();
                    this.ctx.moveTo(x, y - size/2);
                    this.ctx.lineTo(x + size/2, y);
                    this.ctx.lineTo(x, y + size/2);
                    this.ctx.lineTo(x - size/2, y);
                    this.ctx.closePath();
                    this.ctx.fill();
                    
                    // Center dot
                    this.ctx.fillStyle = '#fbebd2'; // cream color for contrast
                    this.ctx.beginPath();
                    this.ctx.arc(x, y, size/5, 0, Math.PI * 2);
                    this.ctx.fill();
                },
                size: 12
            },
            // Zigzag line
            {
                draw: (x, y, size, color) => {
                    this.ctx.strokeStyle = color;
                    this.ctx.lineWidth = 2;
                    this.ctx.beginPath();
                    this.ctx.moveTo(x - size, y - size/2);
                    this.ctx.lineTo(x - size/2, y + size/2);
                    this.ctx.lineTo(x, y - size/2);
                    this.ctx.lineTo(x + size/2, y + size/2);
                    this.ctx.lineTo(x + size, y - size/2);
                    this.ctx.stroke();
                },
                size: 20
            },
            // Square with center point
            {
                draw: (x, y, size, color) => {
                    this.ctx.strokeStyle = color;
                    this.ctx.lineWidth = 2;
                    this.ctx.strokeRect(x - size/2, y - size/2, size, size);
                    
                    this.ctx.fillStyle = color;
                    this.ctx.beginPath();
                    this.ctx.arc(x, y, size/4, 0, Math.PI * 2);
                    this.ctx.fill();
                },
                size: 16
            }
        ];
        
        this.formations = [];
        this.maxFormations = 5; // Maximum number of formations at once
        
        // Handle resize
        window.addEventListener('resize', () => {
            this.canvas.width = this.canvas.offsetWidth;
            this.canvas.height = this.canvas.offsetHeight;
        });
    }
    
    // Change to a different color scheme
    setColorScheme(schemeIndex) {
        if (schemeIndex >= 0 && schemeIndex < this.colorSchemes.length) {
            this.currentScheme = schemeIndex;
            
            // Get the main color for the background
            const mainColor = this.colorSchemes[schemeIndex][0];
            
            // Set a CSS variable for the main scheme color
            document.documentElement.style.setProperty('--current-scheme-color', mainColor);
            
            // Clear existing formations for immediate visual change
            this.formations = [];
        }
    }
    
    // Get current colors
    getCurrentColors() {
        return this.colorSchemes[this.currentScheme];
    }
    
    // Initialize the canvas with the current settings
    initialize() {
        this.canvas.width = this.canvas.offsetWidth;
        this.canvas.height = this.canvas.offsetHeight;
        this.animate();
    }
    
// Formation class for pattern groupings
PatternFormation() {
    const colors = this.getCurrentColors();
    const canvas = this.canvas; // Reference to the canvas
    const ctx = this.ctx; // Reference to the context
    
    return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        pattern: this.patterns[Math.floor(Math.random() * this.patterns.length)],
        color: colors[Math.floor(Math.random() * colors.length)],
        size: 0, // Will be set based on pattern
        points: [],
        maxPoints: 20 + Math.floor(Math.random() * 20), // 20-40 points in a formation
        growthRate: 0.5 + Math.random() * 0.5, // How fast new points appear
        decayRate: 0, // Set in initialization
        growthCounter: 0,
        decayCounter: 0,
        decayDelay: 30, // Delay before decay starts
        direction: Math.random() * Math.PI * 2,
        completed: false,
        canvas: canvas, // Store canvas reference
        
        initialize() {
            this.size = this.pattern.size;
            this.decayRate = this.growthRate * 0.7;
            this.generateFormation();
            return this;
        },
        
        // In generateFormation, change all references to this.canvas to canvas
        generateFormation() {
            // Start with initial point
            this.points.push({
                x: this.x,
                y: this.y,
                size: this.size,
                opacity: 0,
                growing: true,
                decaying: false
            });
            
            // Generate paths in embroidery style
            let currentX = this.x;
            let currentY = this.y;
            
            // Decide if it's a line or a grid pattern
            const isGrid = Math.random() > 0.6;
            
            if (isGrid) {
                // Create a grid-like formation
                const rows = 2 + Math.floor(Math.random() * 3); // 2-4 rows
                const cols = 2 + Math.floor(Math.random() * 3); // 2-4 columns
                const spacing = this.size * 1.5;
                
                for (let r = 0; r < rows; r++) {
                    for (let c = 0; c < cols; c++) {
                        if (r === 0 && c === 0) continue; // Skip the first point, already added
                        
                        this.points.push({
                            x: currentX + c * spacing,
                            y: currentY + r * spacing,
                            size: this.size,
                            opacity: 0,
                            growing: true,
                            decaying: false
                        });
                    }
                }
            } else {
                // Create a line formation with directional pattern
                const length = 5 + Math.floor(Math.random() * 10); // 5-15 points
                const spacing = this.size * 1.2;
                
                // Decide on direction
                const dx = Math.cos(this.direction) * spacing;
                const dy = Math.sin(this.direction) * spacing;
                
                for (let i = 1; i < length; i++) {
                    currentX += dx;
                    currentY += dy;
                    
                    // Skip if point would be off canvas
                    if (currentX < 0 || currentX > canvas.width || 
                         currentY < 0 || currentY > canvas.height) {
                        break;
                    }
                    
                    this.points.push({
                        x: currentX,
                        y: currentY,
                        size: this.size,
                        opacity: 0,
                        growing: true,
                        decaying: false
                    });
                }
            }
        },
        
        // Keep the rest of the methods the same
        update() {
            // Existing update code
        },
        
        draw(ctx) {
            // Existing draw code
        }
    };
}
    
    // Main animation loop
    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Remove completed formations
        for (let i = this.formations.length - 1; i >= 0; i--) {
            if (this.formations[i].completed) {
                this.formations.splice(i, 1);
            }
        }
        
        // Add new formations if needed
        if (this.formations.length < this.maxFormations && Math.random() < 0.02) { // 2% chance each frame
            this.formations.push(this.PatternFormation().initialize());
        }
        
        // Update and draw all formations
        this.formations.forEach(formation => {
            formation.update();
            formation.draw(this.ctx);
        });
        
        requestAnimationFrame(() => this.animate());
    }
}