// Immediately apply theme before any content loads
const urlParams = new URLSearchParams(window.location.search);
const urlTheme = urlParams.get('theme');
const savedTheme = urlTheme || localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', savedTheme);

// If URL theme parameter exists and differs from stored theme, update localStorage
if (urlTheme) {
    localStorage.setItem('theme', urlTheme);
}

document.addEventListener('DOMContentLoaded', () => {
    // Get the current theme
    const urlParams = new URLSearchParams(window.location.search);
    const urlTheme = urlParams.get('theme');
    const currentTheme = urlTheme || localStorage.getItem('theme') || 'light';

    // Theme switching functionality
    const themeToggle = document.getElementById('theme-toggle');
    
    // Set initial toggle state based on current theme
    themeToggle.checked = currentTheme === 'dark';
    
    // Update all navigation links to include current theme
    const updateNavLinks = (theme) => {
        // Update main navigation links
        const navLinks = document.querySelectorAll('.nav-list a');
        navLinks.forEach(link => {
            const href = link.getAttribute('href').split('?')[0];
            link.href = `${href}?theme=${theme}`;
        });

        // Update project links in projects page
        const projectLinks = document.querySelectorAll('.project-links a, .project-links-section a');
        projectLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href && !href.startsWith('#') && !href.startsWith('http')) {
                link.href = `${href.split('?')[0]}?theme=${theme}`;
            }
        });
    };
    
    // Initialize nav links with current theme
    updateNavLinks(currentTheme);
    
    // Theme toggle event listener
    themeToggle.addEventListener('change', () => {
        const newTheme = themeToggle.checked ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateNavLinks(newTheme);
    });
    
    // Set active navigation link
    const currentPage = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-list a');
    
    navLinks.forEach(link => {
        if (currentPage.includes(link.getAttribute('href').split('?')[0])) {
            link.classList.add('active');
        }
    });

    // Load animation template
    fetch('../html/homeanimation.html')
        .then(response => response.text())
        .then(html => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            document.body.appendChild(doc.querySelector('#animation-script').content.cloneNode(true));
        });

    // Initialize animations
    const animateElements = () => {
        const profileContainer = document.querySelector('.profile-container');
        const textContent = document.querySelector('.text-content');
        const imageContainer = document.querySelector('.image-container');

        // Add animated class to trigger animations
        if (profileContainer) profileContainer.classList.add('animated');
        if (textContent) textContent.classList.add('animated');
        if (imageContainer) imageContainer.classList.add('animated');
    };

    // Trigger animations when page loads
    animateElements();

    // Add intersection observer for animations when scrolling
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, { threshold: 0.1 });

    // Observe elements
    document.querySelectorAll('.profile-container, .text-content, .image-container').forEach(el => {
        observer.observe(el);
    });
}); 