// === PAGE LOADER ===
(function() {
    const loader = document.getElementById('loader');
    const bar = document.getElementById('loaderBar');
    const percent = document.getElementById('loaderPercent');
    let progress = 0;
    
    function updateLoader() {
        progress += Math.random() * 15 + 5;
        if (progress > 100) progress = 100;
        bar.style.width = progress + '%';
        percent.textContent = Math.floor(progress) + '%';
        if (progress < 100) {
            setTimeout(updateLoader, Math.random() * 100 + 50);
        } else {
            setTimeout(() => {
                loader.classList.add('hidden');
                setTimeout(() => {
                    document.body.classList.add('animations-ready');
                }, 400); // Wait for loader fade out
            }, 300);
        }
    }
    
    // Start loader after a brief delay to ensure DOM is ready
    setTimeout(updateLoader, 100);
})();

// === CURSOR ===
const cursor = document.getElementById('cursor');
const trail = document.getElementById('cursorTrail');
let mx = 0, my = 0;

// Check if device supports hover (not touch device)
const isTouchDevice = window.matchMedia('(hover: none)').matches || 
                       window.matchMedia('(pointer: coarse)').matches;

if (!isTouchDevice) {
    document.addEventListener('mousemove', e => {
        mx = e.clientX; my = e.clientY;
        cursor.style.left = mx - 6 + 'px';
        cursor.style.top = my - 6 + 'px';
        trail.style.left = mx - 20 + 'px';
        trail.style.top = my - 20 + 'px';
    });
    
    document.querySelectorAll('a, button, .work-card, .term-skill').forEach(el => {
        el.addEventListener('mouseenter', () => cursor.style.transform = 'scale(2)');
        el.addEventListener('mouseleave', () => cursor.style.transform = 'scale(1)');
    });
}

// === ASCII BACKGROUND ===
const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノ#@%&*+=<>[]{}|\\/:;.,?!~^';
const canvas = document.getElementById('ascii-canvas');
let bgLines = [];

function buildBg() {
    const cols = Math.floor(window.innerWidth / 8.5);
    const rows = Math.floor(window.innerHeight / 13.5);
    bgLines = [];
    for (let r = 0; r < rows; r++) {
        let line = '';
        for (let c = 0; c < cols; c++) {
            line += Math.random() < 0.18 ? chars[Math.floor(Math.random() * chars.length)] : ' ';
        }
        bgLines.push(line.split(''));
    }
    canvas.textContent = bgLines.map(l => l.join('')).join('\n');
}

function animateBg() {
    const mutations = 30 + Math.floor(Math.random() * 40);
    for (let m = 0; m < mutations; m++) {
        const r = Math.floor(Math.random() * bgLines.length);
        const c = Math.floor(Math.random() * bgLines[r].length);
        bgLines[r][c] = Math.random() < 0.22
            ? chars[Math.floor(Math.random() * chars.length)]
            : ' ';
    }
    canvas.textContent = bgLines.map(l => l.join('')).join('\n');
    requestAnimationFrame(() => setTimeout(animateBg, 60));
}

buildBg();
animateBg();
window.addEventListener('resize', buildBg);

// === FOX MASCOT ASCII ART ===
const foxArt = `
        /\                         /\
        /░░\                       /░░\
    /░░░░\                     /░░░░\
    /░░░░░░\___________________/░░░░░░\
    /░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░\
    /░░░░▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒░░░░░\
/░░░▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒░░░\
/░░░▒▒▒▒▒▒░░░░░░░░░░░░░░░░░░░▒▒▒▒▒▒░░░\
/░░░▒▒▒▒░░   ▄▀▀▀▀▀▄      ▄▀▀▀▀▀▄  ░▒▒▒▒░░░\
█░░▒▒▒▒░░  ▐█▌╲ ◆ /█▌    ▐█▌╲ ◆ /█▌  ░▒▒▒▒░░█
█░░▒▒▒▒░░   ▀▀▀▀▀▀▀▀▀      ▀▀▀▀▀▀▀▀▀  ░▒▒▒▒░░█
█░░▒▒▒▒▒░░░░░░░░░░░░░░░░░░░░░░░░░░░▒▒▒▒░░█
█░░░▒▒▒▒▒▒░░░  ░░  ▄█████▄  ░░  ░░▒▒▒▒▒▒░░░█
▀█░░░▒▒▒▒▒░░░░░░  ███████  ░░░░░░▒▒▒▒▒░░░█▀
    ▀▄░░░▒▒▒░░░░░░   ▀████▀   ░░░░░▒▒▒░░░▄▀
    ▀▄░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░▄▀
        ▐░░░  ▄▄▀▀▄  ░░░░░░  ▄▀▀▄▄  ░░░▌
        ▐░░░ ▐██████▌░░░░░░▐██████▌ ░░░▌
        ▐░░░  ▀████▀ ░░░░░░ ▀████▀  ░░░▌
        ▐░░░░░░░░░░░░░░░░░░░░░░░░░░░░░▌
        ▀▄░░░░░░░░░░░░░░░░░░░░░░░░▄▀
        ▀▀▄▄░░░░░░░░░░░░░░▄▄▀▀
            ▀▀▀▀▀▀▀▀▀▀▀▀▀▀

┌──────────────────────────────────────────────┐
│  fox.exe  [▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░]  ready   │
└──────────────────────────────────────────────┘`;

const foxEl = document.getElementById('foxArt');
const foxGlitchEl = document.getElementById('foxGlitch');
const foxShadowEl = document.getElementById('foxShadow');
if (foxEl) {
    foxEl.textContent = foxArt;
    foxGlitchEl.textContent = foxArt;
    foxShadowEl.textContent = foxArt;
}

// Animate a few random chars in the fox art for a 'live' dither feel
const foxLines = foxArt.split('\n').map(l => l.split(''));
const ditherChars = ['░', '▒'];
// Only animate lines 1-22 (face area), skip the terminal box at bottom
const faceLineCount = foxLines.length - 4;
function animateFox() {
    for (let i = 0; i < 8; i++) {
        const r = 1 + Math.floor(Math.random() * (faceLineCount - 1));
        const row = foxLines[r];
        if (!row) continue;
        const c = Math.floor(Math.random() * row.length);
        const ch = row[c];
        if (ch === '░') { row[c] = Math.random() < 0.6 ? '▒' : '░'; }
        else if (ch === '▒') { row[c] = Math.random() < 0.6 ? '░' : '▒'; }
    }
    if (foxEl) {
        const updated = foxLines.map(l => l.join('')).join('\n');
        foxEl.textContent = updated;
        foxGlitchEl.textContent = updated;
    }
    setTimeout(animateFox, 100);
}
animateFox();

// === WORK CARD ASCII FILLS ===
function makeAsciiBlock(el) {
    if (!el) return;
    const w = Math.floor(el.offsetWidth / 7);
    const h = Math.floor(el.offsetHeight / 9);
    const c = '░▒▓█#@+=-:.';
    let s = '';
    for (let i = 0; i < h; i++) {
        for (let j = 0; j < w; j++) {
            s += Math.random() < 0.3 ? c[Math.floor(Math.random() * c.length)] : ' ';
        }
        s += '\n';
    }
    el.textContent = s;
}
window.addEventListener('load', () => {
    ['ascii1','ascii2','ascii3','ascii4'].forEach(id => makeAsciiBlock(document.getElementById(id)));
});

// === STICKY NAV ===
window.addEventListener('scroll', () => {
    document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 60);
});

// === CLICK TO SCROLL ===
const scrollIndicator = document.querySelector('.hero-scroll-indicator');
if (scrollIndicator) {
    scrollIndicator.addEventListener('click', () => {
        const aboutSection = document.getElementById('about');
        if (aboutSection) {
            aboutSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
}

// === MOBILE MENU ===
const toggle = document.getElementById('mobileToggle');
const overlay = document.getElementById('mobileOverlay');
toggle.addEventListener('click', () => {
    toggle.classList.toggle('active');
    overlay.classList.toggle('active');
    document.body.style.overflow = overlay.classList.contains('active') ? 'hidden' : '';
});
overlay.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
        toggle.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// === SCROLL REVEAL ===
const reveals = document.querySelectorAll('.work-card, .about-left, .about-right, .contact-left, .contact-right, .contact-terminal, .contact-links');
reveals.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
});
const revealObs = new IntersectionObserver(entries => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, i * 80);
            revealObs.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });
reveals.forEach(el => revealObs.observe(el));

// === CONTACT FORM HANDLING ===
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const data = Object.fromEntries(formData.entries());
        
        // Create terminal-style feedback
        const terminalOutput = document.createElement('div');
        terminalOutput.className = 'form-feedback';
        terminalOutput.innerHTML = `
            <div class="term-line">
                <span class="term-prompt">$</span>
                <span class="term-cmd">send_message --to craig@dowdall560.gmail.com</span>
            </div>
            <div class="term-output success">
                <span class="term-skill">✓ Message sent successfully!</span>
                <span class="term-skill">From: ${data.name}</span>
                <span class="term-skill">Reply-to: ${data.email}</span>
            </div>
        `;
        
        // Hide form, show success
        this.style.display = 'none';
        const terminal = this.closest('.contact-terminal');
        terminal.appendChild(terminalOutput);
        
        // Add cursor blink to success
        const successLine = document.createElement('div');
        successLine.className = 'term-line';
        successLine.innerHTML = '<span class="term-prompt">$</span><span class="term-cursor"></span>';
        terminalOutput.appendChild(successLine);
    });
}

// === LIGHTBOX ===
const projects = [
    {
        id: 1,
        number: '001',
        title: 'PAM AI Dashboard',
        description: 'A dynamic dashboard for a PAM AI project, built with React and TypeScript. Features real-time data visualization with D3.js, interactive filters, and a responsive design. Styled with CSS modules and animated with Framer Motion for smooth transitions.',
        tags: ['HTML5', 'CSS', 'JavaScript', 'Figma'],
        link: '#',
        media: {
            type: 'video', // or 'image'
            src: '', // path to video or image - e.g., 'assets/dashboard.mp4'
            alt: 'PAM AI Dashboard preview'
        }
    },
    {
        id: 2,
        number: '002',
        title: 'PAM AI Website Redesign',
        description: 'A complete redesign of the PAM AI website, focusing on a sleek, modern glassmorphism aesthetic with improved UX. Built with HTML5, CSS3, and JavaScript, and designed in Figma. The project included creating a component library for consistent UI elements and integrating Storybook for development.',
        tags: ['Figma', 'HTML5', 'CSS3', 'JavaScript'],
        link: 'https://itsxyzzy.github.io/CSC1002-DIME-Project/',
        media: {
            type: 'image',
            src: '', // path to image - e.g., 'assets/website-preview.jpg'
            alt: 'PAM AI Website Redesign preview'
        }
    },
    {
        id: 3,
        number: '003',
        title: 'Android Apps',
        description: 'Two native Android wallpaper applications built with Java and the Android SDK. Features a clean Material Design interface, local database storage with Firebase. Published on the Google Play Store.',
        tags: ['Java', 'Android SDK', 'Firebase', 'Material Design'],
        link: '#',
        media: null // Uses default ASCII
    },
    {
        id: 4,
        number: '004',
        title: 'Pyskip',
        description: 'A music player built with Python using Pygame for a student project. Features a custom UI, playlist management, and support for common audio formats. The project focused on implementing core music player functionalities and creating an intuitive user experience.',
        tags: ['Python', 'Pygame', 'tkinter', 'OOP'],
        link: 'https://github.com/ItsXyzzy/Pyskip',
        media: null // Uses default ASCII
    }
];

// Lightbox elements
const lightboxOverlay = document.getElementById('lightboxOverlay');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxMedia = document.getElementById('lightboxMedia');
const lightboxVideo = document.getElementById('lightboxVideo');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxAscii = document.getElementById('lightboxAscii');
const lightboxNumber = document.getElementById('lightboxNumber');
const lightboxHeading = document.getElementById('lightboxHeading');
const lightboxDescription = document.getElementById('lightboxDescription');
const lightboxTags = document.getElementById('lightboxTags');
const lightboxLink = document.getElementById('lightboxLink');

// Default ASCII art for projects without media
const defaultAscii = `
    ╔══════════════════════════╗
    ║  ███╗   ██╗███████╗██╗  ║
    ║  ████╗  ██║██╔════╝██║  ║
    ║  ██╔██╗ ██║█████╗  ██║  ║
    ║  ██║╚██╗██║██╔══╝  ██║  ║
    ║  ██║ ╚████║███████╗███████║
    ║  ╚═╝  ╚═══╝╚══════╝╚══════╝
    ╚══════════════════════════╝`;

// Open lightbox
function openLightbox(projectId) {
    const project = projects.find(p => p.id === projectId);
    if (!project) return;
    
    // Populate lightbox content
    lightboxNumber.textContent = project.number;
    lightboxHeading.textContent = project.title;
    lightboxDescription.textContent = project.description;
    lightboxLink.href = project.link;
    
    // Handle media
    if (project.media && project.media.src) {
        lightboxMedia.classList.add('has-media');
        
        if (project.media.type === 'video') {
            lightboxVideo.src = project.media.src;
            lightboxVideo.style.display = 'block';
            lightboxImage.style.display = 'none';
            lightboxImage.src = '';
        } else {
            lightboxImage.src = project.media.src;
            lightboxImage.alt = project.media.alt;
            lightboxImage.style.display = 'block';
            lightboxVideo.style.display = 'none';
            lightboxVideo.src = '';
        }
        lightboxAscii.textContent = '';
    } else {
        // No media - show ASCII fallback
        lightboxMedia.classList.remove('has-media');
        lightboxVideo.style.display = 'none';
        lightboxImage.style.display = 'none';
        lightboxVideo.src = '';
        lightboxImage.src = '';
        lightboxAscii.textContent = defaultAscii;
    }
    
    // Build tags
    lightboxTags.innerHTML = project.tags
        .map(tag => `<span class="lightbox-tag">${tag}</span>`)
        .join('');
    
    // Show lightbox
    lightboxOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Close lightbox
function closeLightbox() {
    lightboxOverlay.classList.remove('active');
    document.body.style.overflow = '';
}

// Event listeners
if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox);
}

if (lightboxOverlay) {
    lightboxOverlay.addEventListener('click', (e) => {
        if (e.target === lightboxOverlay) {
            closeLightbox();
        }
    });
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightboxOverlay.classList.contains('active')) {
        closeLightbox();
    }
});

// Add click handlers to work cards
document.querySelectorAll('.work-card').forEach((card, index) => {
    card.style.cursor = 'pointer';
    card.addEventListener('click', () => {
        openLightbox(index + 1);
    });
});

// === INITIALIZE WORK CARD MEDIA ===
function initWorkCardMedia() {
    projects.forEach((project, index) => {
        const card = document.querySelector(`.work-card[data-project="${project.id}"]`);
        if (!card) return;
        
        const mediaContainer = card.querySelector('.work-card-media');
        const video = card.querySelector('.work-card-video');
        const image = card.querySelector('.work-card-image');
        
        if (project.media && project.media.src) {
            mediaContainer.classList.add('has-media');
            
            if (project.media.type === 'video') {
                video.querySelector('source').src = project.media.src;
                video.load();
                video.style.display = 'block';
                image.style.display = 'none';
            } else {
                image.src = project.media.src;
                image.alt = project.media.alt;
                image.style.display = 'block';
                video.style.display = 'none';
            }
        }
    });
}

// Initialize on load
window.addEventListener('load', initWorkCardMedia);