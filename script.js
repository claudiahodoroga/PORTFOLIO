// website loading 
import { PatternManager } from "./PatternManager.js";

document.addEventListener('DOMContentLoaded', () => {
    //initialize elements
    const mainFrame = document.getElementById('main-frame');
    const sectionTitle = document.getElementById('section-title');
    const subtitle = document.getElementById('subtitle');
    const navbar = document.querySelector('.navbar');
    const canvas = document.getElementById('canvas');
    const pages = document.querySelectorAll('.page');
    const navItems = document.querySelectorAll('.nav-item');
    const projectLinks = document.querySelectorAll('.project-link');
    const projectInfo = document.querySelector('.project-info');
    const projectDesc = document.getElementById('project-desc');
    const projectImgs = document.getElementById('project-imgs');
    const projectVideo = document.getElementById('project-video');

    const projectData = {
        "project-1": {
            desc: "As lead project manager, I implemented SCRUM methodology with sprint-based workflows that kept our Unity game development on track. Beyond management, I contributed technically by programming advanced visual elements including custom toon and water shaders, a comprehensive sound system, and post-processing effects that defined the game's distinctive aesthetic. My dual role extended to 3D modeling and UI design, demonstrating my ability to balance technical leadership with hands-on development.",
            images: [],
            video: "./assets/gotb-playthrough.mp4"
        },
        "project-2": {
            desc: "Under a 24-hour deadline, I collaborated with a classmate to conceptualize, design, and develop a promotional website for our podcast project. This high-pressure challenge showcased my rapid ideation and execution skills. I translated our collaborative design into functioning code using HTML, CSS, and JavaScript, creating an effective digital presence that met our tight timeline without compromising quality or user experience.",
            images: ["./assets/renderiza2.1.png"],
            video: "renderiza2-clip.mp4"
        }
    };
    
    // color schemes
    const colorSchemes = [
        ['#cc414c', '#a28762', '#889d64', '#e0b256', '#628484'],  // default
        ['#628484', '#41a6cc', '#56a0e0', '#4162cc', '#628498'],  // blue
        ['#889d64', '#64cc41', '#56e087', '#41cc82', '#649862']   // green
    ];
    
    sectionTitle.style.opacity = 0;
    subtitle.style.opacity = 0;
    navbar.style.opacity = 0;
    canvas.style.opacity = 0;

    // initialize pattern manager
    const patternManager = new PatternManager(canvas, colorSchemes);
    setTimeout(() => patternManager.drawPattern(), 500);

    // color scheme changes
    document.querySelectorAll('.scheme-button').forEach(button => {
        button.addEventListener('click', () => {
            const index = parseInt(button.getAttribute('data-scheme'));
            patternManager.setColorScheme(index);
        });
    });

    window.addEventListener('hashchange', () => patternManager.adjustOpacity()); // adjust opacity

    
    pages.forEach(page => {
        page.style.opacity = 0;
        page.style.display = 'none';
    });

    // toggle animation for projects
    projectLinks.forEach(link => {
        link.addEventListener('click', () => {
            const isActive = link.classList.contains('active');
            
            // close active projects
            if (isActive) {
                link.classList.remove('active');
                
                projectInfo.style.opacity = 0;
                projectInfo.style.maxHeight = '0';
                projectInfo.style.paddingTop = '0';
                projectInfo.style.paddingBottom = '0';
                
                setTimeout(() => {
                    projectInfo.classList.remove('open');
                }, 600);
                
                return;
            }
            
            // switch active project
            projectLinks.forEach(item => item.classList.remove('active'));
            link.classList.add('active');
            
            const projectId = link.id;
            
            // transition between project info
            if (projectInfo.classList.contains('open')) {
                projectInfo.style.opacity = 0;
                projectInfo.style.maxHeight = '0';
                
                setTimeout(() => {
                    updateProjectContent(projectId);
                    
                    void projectInfo.offsetWidth;
                    
                    projectInfo.style.opacity = 1;
                    projectInfo.style.maxHeight = '600px';
                    projectInfo.style.paddingTop = '15px';
                    projectInfo.style.paddingBottom = '15px';
                }, 300);
            } else {
                updateProjectContent(projectId);
                projectInfo.classList.add('open');
                
                void projectInfo.offsetWidth;
                
                projectInfo.style.opacity = 1;
                projectInfo.style.maxHeight = '600px';
            }
        });
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

    // logic for updating project section content
    function updateProjectContent(projectId) {
        if (projectData[projectId]) {
            projectDesc.textContent = projectData[projectId].desc;
            
            // clear previous content
            projectImgs.innerHTML = '';
            projectVideo.innerHTML = '';
            
            // add images if available
            if (projectData[projectId].images && projectData[projectId].images.length > 0) {
                projectImgs.innerHTML = projectData[projectId].images.map(img => 
                    `<img src="${img}" alt="${projectId}" class="project-image">`
                ).join('');
            }
            
            // cdd video if available
            if (projectData[projectId].video) {
                projectVideo.innerHTML = `
                    <video class="project-video" controls>
                        <source src="${projectData[projectId].video}" type="video/mp4">
                        Your browser does not support the video tag.
                    </video>`;
            }
        }
    }

    // Initialize components
    setupNavEvents();
    initLoadAnim();
    //setTimeout(() => patternManager.initialize(), 2500);
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