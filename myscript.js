// ===== 1. Link to HTML: Add this to bottom of myindex1.html =====
// <script src="/c:/Users/sinye/MyCoder/myscript.js"></script>

// ===== 2. Toggle Navigation Menu =====
function toggleNav() {
    const navMenu = document.querySelector('nav ul');
    navMenu.classList.toggle('active');
    console.log('Navigation toggled');
}

document.querySelector('.hamburger')?.addEventListener('click', toggleNav);

// ===== 3. Smooth Scrolling for Navigation Links =====
document.querySelectorAll('nav a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
            console.log('Scrolling to:', link.getAttribute('href'));
        }
    });
});

// ===== 4. Filter Feature for Projects Section =====
function filterProjects(category) {
    const projects = document.querySelectorAll('.project-item');
    projects.forEach(project => {
        if (category === 'all' || project.dataset.category === category) {
            project.style.display = 'block';
        } else {
            project.style.display = 'none';
        }
    });
    console.log('Projects filtered by:', category);
}

document.querySelectorAll('.filter-btn')?.forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        filterProjects(btn.dataset.filter);
    });
});

// ===== 5 & 6. Lightbox for Images/Figures =====
function openLightbox(src) {
    const lightbox = document.getElementById('lightbox') || createLightbox();
    const img = lightbox.querySelector('img');
    img.src = src;
    lightbox.style.display = 'flex';
    console.log('Lightbox opened with:', src);
}

function createLightbox() {
    const lightbox = document.createElement('div');
    lightbox.id = 'lightbox';
    lightbox.innerHTML = `
        <div class="lightbox-content">
            <img src="" alt="Lightbox Image">
            <span class="close" onclick="closeLightbox()">&times;</span>
        </div>
    `;
    lightbox.style.cssText = 'display:none;position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.8);justify-content:center;align-items:center;z-index:1000;';
    document.body.appendChild(lightbox);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });
    return lightbox;
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (lightbox) lightbox.style.display = 'none';
    console.log('Lightbox closed');
}

document.querySelectorAll('img, figure img')?.forEach(img => {
    img.style.cursor = 'pointer';
    img.addEventListener('click', () => openLightbox(img.src));
});

// ===== 7. Form Validation for Contact Form =====
function validateContactForm(e) {
    e.preventDefault();
    const form = e.target;
    const fields = form.querySelectorAll('input, textarea');
    let isValid = true;

    fields.forEach(field => {
        const feedback = field.nextElementSibling;
        if (!field.value.trim()) {
            isValid = false;
            field.classList.add('error');
            if (feedback?.classList.contains('feedback')) {
                feedback.textContent = 'All fields are required';
                feedback.style.display = 'block';
            } else {
                const msg = document.createElement('span');
                msg.className = 'feedback error-msg';
                msg.textContent = 'All fields are required';
                msg.style.cssText = 'color:red;font-size:12px;display:block;';
                field.parentNode.insertBefore(msg, field.nextSibling);
            }
            console.warn('Field empty:', field.name);
        } else {
            field.classList.remove('error');
            if (feedback?.classList.contains('feedback')) {
                feedback.style.display = 'none';
            }
        }
    });

    if (isValid) {
        console.log('Form submitted successfully');
        alert('Form submitted!');
        form.reset();
    }
}

document.querySelector('form#contact')?.addEventListener('submit', validateContactForm);

// ===== 8. Real-time Feedback =====
document.querySelectorAll('input, textarea').forEach(field => {
    field.addEventListener('blur', () => {
        const feedback = field.nextElementSibling;
        if (!field.value.trim()) {
            field.classList.add('error');
            if (feedback?.classList.contains('feedback')) {
                feedback.textContent = 'All fields are required';
            }
            console.log('Missing input:', field.name);
        } else {
            field.classList.remove('error');
            if (feedback?.classList.contains('feedback')) {
                feedback.textContent = 'Valid!';
            }
        }
    });
});

// ===== 9. Testing & Debugging =====
console.log('myscript.js loaded successfully');
console.log('DOM Elements found:', {
    hamburger: !!document.querySelector('.hamburger'),
    navLinks: document.querySelectorAll('nav a').length,
    projects: document.querySelectorAll('.project-item').length,
    form: !!document.querySelector('form#contact'),
    images: document.querySelectorAll('img').length
});