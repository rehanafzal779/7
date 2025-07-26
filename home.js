document.addEventListener('DOMContentLoaded', function() {
            // Initialize AOS animations
            AOS.init({
                duration: 800,
                easing: 'ease-in-out',
                once: true,
                offset: 100
            });

            // Mobile Menu Toggle
            const mobileMenuBtn = document.getElementById('mobileMenuBtn');
            const nav = document.getElementById('mainNav');

            mobileMenuBtn.addEventListener('click', () => {
                nav.classList.toggle('active');
                mobileMenuBtn.innerHTML = nav.classList.contains('active') ?
                    '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
            });

            // Close mobile menu when clicking on a link
            document.querySelectorAll('#mainNav a').forEach(link => {
                link.addEventListener('click', () => {
                    if (nav.classList.contains('active')) {
                        nav.classList.remove('active');
                        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
                    }
                });
            });

            // Header scroll effect
            const header = document.getElementById('mainHeader');
            window.addEventListener('scroll', () => {
                if (window.scrollY > 100) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }
            });

            // Scroll Progress Bar
            window.addEventListener('scroll', function() {
                const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
                const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
                const scrolled = (winScroll / height) * 100;
                document.getElementById("progressBar").style.width = scrolled + "%";
            });

            // Back to Top Button
            const backToTop = document.getElementById('backToTop');
            window.addEventListener('scroll', () => {
                if (window.scrollY > 300) {
                    backToTop.classList.add('active');
                } else {
                    backToTop.classList.remove('active');
                }
            });

            backToTop.addEventListener('click', (e) => {
                e.preventDefault();
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });

            // Smooth scrolling for anchor links
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function(e) {
                    e.preventDefault();
                    const targetId = this.getAttribute('href');
                    if (targetId === '#') return;

                    const targetElement = document.querySelector(targetId);
                    if (targetElement) {
                        window.scrollTo({
                            top: targetElement.offsetTop - 80,
                            behavior: 'smooth'
                        });
                    }
                });
            });

            // Initialize Typed.js
            const typed = new Typed('.typed-text', {
                strings: ["Education", "Learning", "Schools", "The Future"],
                typeSpeed: 60,
                backSpeed: 30,
                loop: true,
                showCursor: true,
                cursorChar: '|'
            });

            // Initialize Particles.js
            if (document.getElementById('particles-js')) {
                particlesJS('particles-js', {
                    particles: {
                        number: { value: 80, density: { enable: true, value_area: 800 } },
                        color: { value: "#8E7260" },
                        shape: { type: "circle" },
                        opacity: { value: 0.5, random: true },
                        size: { value: 3, random: true },
                        line_linked: { enable: true, distance: 150, color: "#A29891", opacity: 0.4, width: 1 },
                        move: { enable: true, speed: 2, direction: "none", random: true, straight: false, out_mode: "out" }
                    },
                    interactivity: {
                        detect_on: "canvas",
                        events: {
                            onhover: { enable: true, mode: "repulse" },
                            onclick: { enable: true, mode: "push" }
                        }
                    }
                });
            }

            // Before/After Slider
            const slider = document.querySelector('.comparison-slider');
            if (slider) {
                const before = document.querySelector('.before');
                const sliderHandle = document.querySelector('.slider-handle');
                let isDragging = false;

                sliderHandle.addEventListener('mousedown', () => {
                    isDragging = true;
                });

                window.addEventListener('mouseup', () => {
                    isDragging = false;
                });

                window.addEventListener('mousemove', (e) => {
                    if (!isDragging) return;

                    const sliderRect = slider.getBoundingClientRect();
                    let position = e.clientX - sliderRect.left;

                    if (position < 0) position = 0;
                    if (position > sliderRect.width) position = sliderRect.width;

                    const percentage = position / sliderRect.width * 100;
                    before.style.width = percentage + '%';
                    sliderHandle.style.left = percentage + '%';
                });

                // Mobile touch support for slider
                sliderHandle.addEventListener('touchstart', () => {
                    isDragging = true;
                });

                window.addEventListener('touchend', () => {
                    isDragging = false;
                });

                window.addEventListener('touchmove', (e) => {
                    if (!isDragging) return;

                    const sliderRect = slider.getBoundingClientRect();
                    let position = e.touches[0].clientX - sliderRect.left;

                    if (position < 0) position = 0;
                    if (position > sliderRect.width) position = sliderRect.width;

                    const percentage = position / sliderRect.width * 100;
                    before.style.width = percentage + '%';
                    sliderHandle.style.left = percentage + '%';
                });
            }

            // Multi-Step Form
            const form = document.getElementById('multiStepForm');
            if (form) {
                const formSteps = document.querySelectorAll('.form-step');
                const progressSteps = document.querySelectorAll('.form-progress-step');
                const nextButtons = document.querySelectorAll('.next-step');
                const prevButtons = document.querySelectorAll('.prev-step');
                const formSuccess = document.getElementById('formSuccess');

                let currentStep = 0;

                // Next button click handler
                nextButtons.forEach(button => {
                    button.addEventListener('click', () => {
                        if (!validateStep(currentStep)) return;

                        formSteps[currentStep].classList.remove('active');
                        progressSteps[currentStep].classList.remove('active');
                        progressSteps[currentStep].classList.add('complete');

                        currentStep++;

                        formSteps[currentStep].classList.add('active');
                        progressSteps[currentStep].classList.add('active');

                        // Update form review on last step
                        if (currentStep === formSteps.length - 1) {
                            updateFormReview();
                        }
                    });
                });

                // Previous button click handler
                prevButtons.forEach(button => {
                    button.addEventListener('click', () => {
                        formSteps[currentStep].classList.remove('active');
                        progressSteps[currentStep].classList.remove('active');

                        currentStep--;

                        formSteps[currentStep].classList.add('active');
                        progressSteps[currentStep].classList.add('active');
                        progressSteps[currentStep + 1].classList.remove('complete');
                    });
                });

                // Form submission
                form.addEventListener('submit', (e) => {
                    e.preventDefault();

                    // Simulate form processing
                    setTimeout(() => {
                        form.style.display = 'none';
                        formSuccess.style.display = 'block';
                    }, 1000);
                });

                // Simple step validation
                function validateStep(step) {
                    if (step === 0) {
                        const inputs = formSteps[step].querySelectorAll('input[required]');
                        let isValid = true;

                        for (let input of inputs) {
                            if (!input.value.trim()) {
                                input.style.borderColor = 'red';
                                setTimeout(() => {
                                    input.style.borderColor = '';
                                }, 2000);
                                isValid = false;
                            }
                        }
                        return isValid;
                    }
                    return true;
                }

                // Update form review
                function updateFormReview() {
                    const reviewContainer = document.getElementById('form-review');
                    reviewContainer.innerHTML = '';

                    // Get form values
                    const name = formSteps[0].querySelector('input[type="text"]').value;
                    const email = formSteps[0].querySelector('input[type="email"]').value;
                    const phone = formSteps[0].querySelector('input[type="tel"]').value;

                    const selectedServices = [];
                    formSteps[1].querySelectorAll('input[type="checkbox"]:checked').forEach(checkbox => {
                        selectedServices.push(checkbox.nextElementSibling.querySelector('span').textContent);
                    });

                    // Create review HTML
                    let reviewHTML = `
                <div class="review-item">
                    <h4>Contact Information</h4>
                    <p><strong>Name:</strong> ${name}</p>
                    <p><strong>Email:</strong> ${email}</p>
                    <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
                </div>
            `;

                    if (selectedServices.length > 0) {
                        reviewHTML += `
                    <div class="review-item">
                        <h4>Services Requested</h4>
                        <ul>
                            ${selectedServices.map(service => `<li>${service}</li>`).join('')}
                        </ul>
                    </div>
                `;
            }
            
            reviewContainer.innerHTML = reviewHTML;
        }
    }

    // Animated Stats Counter
    const statsSection = document.querySelector('.stats-grid');
    if (statsSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateValue("studentsCount", 0, 12500, 2000);
                    animateValue("institutionsCount", 0, 320, 2000);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        observer.observe(statsSection);
    }

    function animateValue(id, start, end, duration) {
        const obj = document.getElementById(id);
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const value = Math.floor(progress * (end - start) + start);
            obj.innerHTML = value.toLocaleString();
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }

    // Timeline Animation
    const timelineItems = document.querySelectorAll('.timeline-item');
    function checkTimelineItems() {
        timelineItems.forEach(item => {
            const itemTop = item.getBoundingClientRect().top;
            if (itemTop < window.innerHeight * 0.8) {
                item.classList.add('visible');
            }
        });
    }
    
    window.addEventListener('scroll', checkTimelineItems);
    checkTimelineItems(); // Check on initial load
});