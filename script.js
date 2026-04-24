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