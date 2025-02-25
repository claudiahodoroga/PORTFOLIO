// website loading 

document.addEventListener('DOMContentLoaded', () => {
    //initialize elements
    const mainFrame = document.getElementById('main-frame');
    const sectionTitle = document.getElementById('section-title');
    const subtitle = document.getElementById('subtitle');
    const navbar = document.querySelector('.navbar');
    const canvas = document.getElementById('canvas');
    const pages = document.querySelectorAll('.page');
    const navItems = document.querySelectorAll('.nav-item');
    
    sectionTitle.style.opacity = 0;
    subtitle.style.opacity = 0;
    navbar.style.opacity = 0;
    canvas.style.opacity = 0;
    
    pages.forEach(page => {
        page.style.opacity = 0;
        page.style.display = 'none';
    });

    //initial animation
    function initLoadAnim(){
        // loading sequence
        const titleDelay = 500;
        const subtitleDelay = titleDelay + 800;
        const navbarDelay = subtitleDelay + 600;
        const canvasDelay = navbarDelay + 400;
        const firstSectionDelay = canvasDelay + 600;

        setTimeout(() => {
            fadeIn(sectionTitle, 1200);
        }, titleDelay);
        
        setTimeout(() => {
            fadeIn(subtitle, 1000);
        }, subtitleDelay);
        
        setTimeout(() => {
            fadeIn(navbar, 800);
        }, navbarDelay);
        
        setTimeout(() => {
            fadeIn(canvas, 1500);
        }, canvasDelay);
        
        setTimeout(() => {
            showSection('home');
        }, firstSectionDelay);
    }

    function fadeIn(element, duration){
        let opacity = 0;
        element.style.display = 'block';
        const interval = 20;
        const increment = interval/duration;

        const fadeEffect = setInterval(() =>{
            opacity += increment;
            element.style.opacity = opacity;

            if(opacity >= 1){
                clearInterval(fadeEffect);
                element.style.opacity = 1;
            }
        }, interval);
    }

    function fadeOut(element, duration, callback){
        let opacity = 1;
            
            const interval = 20;
            const decrement = interval / duration;
            
            const fadeEffect = setInterval(() => {
                opacity -= decrement;
                element.style.opacity = opacity;
                
                if (opacity <= 0) {
                    clearInterval(fadeEffect);
                    element.style.opacity = 0;
                    element.style.display = 'none';
                    if (callback) callback();
                }
            }, interval);
    }

    function scrollToTop(){
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    // logic for switching between sections

    function showSection(sectionId) {
        // current section
        let visibleSection = null;
        pages.forEach(page => {
            if (page.style.display === 'block' && page.style.opacity > 0) {
                visibleSection = page;
            }
        });
        
        // get target
        const targetSection = document.getElementById(sectionId);
        
        // fade out current visible section
        if (visibleSection) {
            fadeOut(visibleSection, 500, () => {
                // fade in target section
                targetSection.style.display = 'block';
                fadeIn(targetSection, 800);
            });
        } else {
            targetSection.style.display = 'block';
            fadeIn(targetSection, 800);
        }
        
        // update navbar
        updateActiveNav(sectionId);
    }

    function updateActiveNav(sectionId) {
        // deselect all nav items
        navItems.forEach(item => {
            item.classList.remove('is-selected');
        });

        // select the target nav item
        const selectedItem = document.querySelector(`.nav-item[data-section="${sectionId}"]`);
        if (selectedItem) {
            selectedItem.classList.add('is-selected');
        }
    }

    function setupNavEvents(){
        // navigation click events
        navItems.forEach(item => {
            const link = item.querySelector('a');
            link.addEventListener('click', (e) => {
                e.preventDefault(); 
                const sectionId = item.getAttribute('data-section');
                showSection(sectionId);
                
                history.pushState(null, null, `#${sectionId}`);
            });
        });
    }    

    // initial load and navigation
    function handleInitialSection() {
        // check url
        const hash = window.location.hash.substring(1);
        if (hash && document.getElementById(hash)) {
            // show section 
            showSection(hash);
        } else {
            // default
            showSection('home');
            history.pushState(null, null, '#home');
        }
    }    

    // logic for generating the background design in the canvas
        // Initialize canvas with the dot animation
        function setupCanvas() {
            const ctx = canvas.getContext('2d');
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
            
            // Simple animation example - moving dots
            const dots = [];
            const numDots = 50;
            
            for (let i = 0; i < numDots; i++) {
                dots.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    radius: Math.random() * 3 + 1,
                    dx: (Math.random() - 0.5) * 1,
                    dy: (Math.random() - 0.5) * 1,
                    color: getRandomColor()
                });
            }
            
            function getRandomColor() {
                const colors = [
                    'rgba(204, 65, 76, 0.7)',    // red
                    'rgba(162, 135, 98, 0.7)',   // light-brown
                    'rgba(136, 157, 100, 0.7)',  // light-green
                    'rgba(224, 178, 86, 0.7)',   // yellow
                    'rgba(98, 132, 132, 0.7)'    // light-blue
                ];
                return colors[Math.floor(Math.random() * colors.length)];
            }
            
            function animate() {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                
                dots.forEach(dot => {
                    // Draw dot
                    ctx.beginPath();
                    ctx.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2);
                    ctx.fillStyle = dot.color;
                    ctx.fill();
                    
                    // Move dot
                    dot.x += dot.dx;
                    dot.y += dot.dy;
                    
                    // Bounce off edges
                    if (dot.x + dot.radius > canvas.width || dot.x - dot.radius < 0) {
                        dot.dx *= -1;
                    }
                    
                    if (dot.y + dot.radius > canvas.height || dot.y - dot.radius < 0) {
                        dot.dy *= -1;
                    }
                });
                
                requestAnimationFrame(animate);
            }
            
            // Handle resize
            window.addEventListener('resize', () => {
                canvas.width = canvas.offsetWidth;
                canvas.height = canvas.offsetHeight;
            });
            
            animate();
        }
        
        setupNavEvents();
        initLoadAnim();
        setTimeout(setupCanvas, 2500);
        setTimeout(handleInitialSection, 3000);

        window.addEventListener('popstate', () =>{
            const hash = window.location.hash.substring(1);
            if (hash && document.getElementById(hash)) {
                showSection(hash);
            } else {
                showSection('home');
            }
        });
});