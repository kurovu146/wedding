document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS
    AOS.init({
        duration: 1000,
        easing: 'ease-in-out',
        once: false,
        mirror: true
    });

    // Tạo nhiều trái tim nhỏ bay lơ lửng
    const floatingHeartsContainer = document.querySelector('.floating-hearts');
    for (let i = 0; i < 15; i++) {
        createFloatingHeart(floatingHeartsContainer);
    }
    
    // Hiệu ứng hover cho tên cặp đôi
    const coupleNames = document.querySelector('.couple-names');
    if (coupleNames) {
        coupleNames.addEventListener('mouseover', function() {
            this.classList.add('glowing');
        });
        coupleNames.addEventListener('mouseout', function() {
            this.classList.remove('glowing');
        });
    }

    // Hàm tạo trái tim bay
    let heartCounter = 0; // Ensure unique animations for each heart

    // Pseudo elements for all floating hearts (added once)
    const baseHeartStyle = document.createElement('style');
    baseHeartStyle.innerHTML = `
        .floating-heart:before,
        .floating-heart:after {
            content: "";
            position: absolute;
            width: 100%;
            height: 100%;
            background-color: #ff85a2;
            border-radius: 50%;
        }

        .floating-heart:before { top: -50%; }
        .floating-heart:after { left: 50%; }
    `;
    document.head.appendChild(baseHeartStyle);

    function createFloatingHeart(container) {
        const heart = document.createElement('div');
        heart.classList.add('floating-heart');

        // Unique keyframe name for each heart
        const animName = `floatHeart${heartCounter++}`;
        
        // Tạo vị trí ngẫu nhiên
        const posX = Math.random() * 100; // vị trí % theo chiều ngang
        const posY = Math.random() * 100; // vị trí % theo chiều dọc
        const size = Math.random() * 10 + 5; // kích thước 5px-15px
        const opacity = Math.random() * 0.5 + 0.2; // độ trong suốt
        const animDuration = Math.random() * 10 + 10; // thời gian animation
        const delay = Math.random() * 5; // delay bắt đầu animation
        
        // Thiết lập style cho trái tim
        heart.style.cssText = `
            position: absolute;
            left: ${posX}%;
            top: ${posY}%;
            width: ${size}px;
            height: ${size}px;
            background-color: #ff85a2;
            opacity: ${opacity};
            transform: rotate(-45deg);
            animation: ${animName} ${animDuration}s infinite ease-in-out ${delay}s;
        `;

        // Thêm pseudo elements cho trái tim chỉ một lần
        if (!document.getElementById('floating-heart-style')) {
            const style = document.createElement('style');
            style.id = 'floating-heart-style';
            style.innerHTML = `
                @keyframes floatHeart {
                    0%, 100% { transform: translateY(0) rotate(-45deg); }
                    50% { transform: translateY(-${Math.random() * 70 + 30}px) rotate(-45deg); }
                }

                .floating-heart:before,
                .floating-heart:after {
                    content: "";
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    background-color: #ff85a2;
                    border-radius: 50%;
                }

                .floating-heart:before {
                    top: -50%;
                }

                .floating-heart:after {
                    left: 50%;
                }
            `;

            document.head.appendChild(style);
        }
        container.appendChild(heart);
    }

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

    // Add smooth scrolling for the RSVP button
    document.querySelector('.rsvp-fixed-btn').addEventListener('click', function(e) {
        e.preventDefault();
        const rsvpSection = document.querySelector('#rsvp');
        if (rsvpSection) {
        rsvpSection.scrollIntoView({ behavior: 'smooth' });
        }
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