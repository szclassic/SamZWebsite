// Applying the theme immediately before each page loads
const savedTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', savedTheme);

document.addEventListener('DOMContentLoaded', () => {
    // Theme switching functionality
    const themeToggle = document.getElementById('theme-toggle');
    
    // Get theme from URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    // Ensuring in case line 10 fails, the page opens in light mode.
    const currentTheme = urlParams.get('theme') || 'light';
    
    // Applying the initial theme
    document.documentElement.setAttribute('data-theme', currentTheme);
    themeToggle.checked = currentTheme === 'dark';
    
    // Updating all navigation links to include current theme
    const updateNavLinks = (theme) => {
        const navLinks = document.querySelectorAll('.nav-list a');
        navLinks.forEach(link => {
            const href = link.getAttribute('href').split('?')[0]; // Remove existing query params
            link.href = `${href}?theme=${theme}`;
        });
    };
    
    // Initializing nav links with current theme
    updateNavLinks(currentTheme);
    
    // Theme toggle event listener
    themeToggle.addEventListener('change', () => {
        const newTheme = themeToggle.checked ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', newTheme);
        updateNavLinks(newTheme);
    });
    
    // Setting active navigation link
    const currentPage = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-list a');
    
    navLinks.forEach(link => {
        if (currentPage.includes(link.getAttribute('href').split('?')[0])) {
            link.classList.add('active');
        }
    });
}); 