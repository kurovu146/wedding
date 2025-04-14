document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS
    AOS.init({
        duration: 500,
        easing: 'ease-in-out',
        once: false,
        mirror: true
    });

    // Enhanced scroll effects for reverse animation
    let scrollPos = window.pageYOffset;
    
    window.addEventListener('scroll', function() {
        const currentScrollPos = window.pageYOffset;
        const scrollingUp = currentScrollPos < scrollPos;
        
        const aosElements = document.querySelectorAll('[data-aos]');
        
        aosElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top + window.pageYOffset;
            const elementVisible = 146;
            
            if (scrollingUp) {
                // Scrolling up
                if (currentScrollPos < elementTop - elementVisible) {
                    element.classList.add('aos-animate-reverse');
                } else {
                    element.classList.remove('aos-animate-reverse');
                }
            } else {
                // Scrolling down
                element.classList.remove('aos-animate-reverse');
            }
        });
        
        scrollPos = currentScrollPos;
    });

    // Music Player Control
    const musicControl = document.getElementById('musicControl');
    const bgMusic = document.getElementById('bgMusic');
    let isPlaying = false;

    musicControl.addEventListener('click', function() {
        if (isPlaying) {
            bgMusic.pause();
            musicControl.innerHTML = '<i class="fas fa-music"></i>';
        } else {
            bgMusic.play().catch(e => console.log("Audio play failed:", e));
            musicControl.innerHTML = '<i class="fas fa-pause"></i>';
        }
        isPlaying = !isPlaying;
    });

    // Smooth Scroll for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Countdown Timer
    const weddingDate = new Date("July 13, 2025 00:00:00").getTime();
    
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = weddingDate - now;
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        document.getElementById("countdown-days").innerHTML = String(days).padStart(2, '0');
        document.getElementById("countdown-hours").innerHTML = String(hours).padStart(2, '0');
        document.getElementById("countdown-minutes").innerHTML = String(minutes).padStart(2, '0');
        document.getElementById("countdown-seconds").innerHTML = String(seconds).padStart(2, '0');
    }
    
    // Initial update
    updateCountdown();
    // Update every second
    setInterval(updateCountdown, 1000);

    // Form submission
    const rsvpForm = document.querySelector('#rsvp form');
    rsvpForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Cảm ơn bạn đã xác nhận tham dự!');
        rsvpForm.reset();
    });
});