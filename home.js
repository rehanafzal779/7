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

    // ─── J.A.R.V.I.S. Chatbot ───────────────────────────────────────────────────

    const jarvisToggle  = document.getElementById('jarvisToggle');
    const jarvisChatbot = document.getElementById('jarvisChatbot');
    const jarvisClose   = document.getElementById('jarvisClose');
    const jarvisInput   = document.getElementById('jarvisInput');
    const jarvisSend    = document.getElementById('jarvisSend');
    const jarvisMessages = document.getElementById('jarvisMessages');

    if (!jarvisToggle || !jarvisChatbot || !jarvisClose || !jarvisInput || !jarvisSend || !jarvisMessages) return;

    // Knowledge base for Stellar Skills
    const jarvisKB = [
        {
            patterns: ['hello', 'hi', 'hey', 'good morning', 'good evening', 'greetings'],
            response: "Good day, sir. J.A.R.V.I.S. at your service. How may I assist you today?"
        },
        {
            patterns: ['who are you', 'what are you', 'your name', 'jarvis'],
            response: "I am J.A.R.V.I.S. — Just A Rather Very Intelligent System — the AI assistant for Stellar Skills. I am here to answer any queries you may have about our educational solutions."
        },
        {
            patterns: ['what is stellar skills', 'about', 'company', 'who is stellar skills'],
            response: "Stellar Skills is an educational technology company founded in 2015. Our mission is to bridge the gap between traditional education and the digital future — serving schools, universities, and corporations worldwide."
        },
        {
            patterns: ['services', 'what do you offer', 'what can you do', 'programs'],
            response: "Stellar Skills offers three flagship service lines:\n• 🏫 K-12 Programs — STEM workshops, coding clubs & digital literacy\n• 🎓 Higher Education — AI labs, career readiness & research support\n• 💼 Corporate Training — digital skills, leadership & custom solutions\n\nWhich area interests you most, sir?",
            suggestions: ['K-12 Programs', 'Higher Education', 'Corporate Training']
        },
        {
            patterns: ['k-12', 'k12', 'school', 'primary', 'stem'],
            response: "Our K-12 Programs are designed to ignite curiosity and prepare young learners for a digital world. They include STEM Workshops, Coding Clubs, Digital Literacy initiatives, and Teacher Training. Shall I arrange a consultation for your school?"
        },
        {
            patterns: ['higher education', 'university', 'college', 'university programs'],
            response: "Our Higher Education solutions include AI Labs, Career Readiness programs, Research Support, and Digital Transformation services. We partner with leading universities to deliver cutting-edge curricula."
        },
        {
            patterns: ['corporate', 'business', 'workforce', 'training', 'company training'],
            response: "Corporate upskilling is critical in today's rapidly evolving landscape. Our Corporate Training programs cover Digital Skills, Leadership Programs, Technical Training, and fully Custom Solutions tailored to your organisation's needs."
        },
        {
            patterns: ['contact', 'reach', 'talk', 'speak', 'email', 'phone', 'address'],
            response: "You may reach the Stellar Skills team through the following channels:\n📍 123 Education St, Tech City\n📞 (555) 123-4567\n✉️ info@stellarskills.com\n\nAlternatively, the contact form on this page will connect you with our team directly."
        },
        {
            patterns: ['founded', 'history', 'when', 'year', 'timeline', 'journey'],
            response: "Stellar Skills was founded in 2015. Key milestones include:\n• 2015 — Founded with a vision to revolutionise EdTech\n• 2017 — Launched our first digital learning platform\n• 2019 — Expanded to higher education partnerships\n• 2022 — Introduced corporate training programmes\n• 2025 — Recognised as an industry leader in educational technology"
        },
        {
            patterns: ['students', 'how many', 'numbers', 'stats', 'statistics'],
            response: "I am pleased to report that Stellar Skills has trained over 12,500 students and partnered with more than 320 institutions to date. Those numbers continue to grow."
        },
        {
            patterns: ['price', 'cost', 'pricing', 'fee', 'how much'],
            response: "Pricing is customised based on your institution's requirements and scale. I recommend submitting an enquiry via our contact form, and our team will provide a tailored proposal within 24 hours."
        },
        {
            patterns: ['thank', 'thanks', 'appreciate', 'helpful'],
            response: "Always a pleasure, sir. Is there anything else I can assist you with?"
        },
        {
            patterns: ['bye', 'goodbye', 'see you', 'exit', 'close'],
            response: "Farewell, sir. Powering down the interface. Do not hesitate to engage J.A.R.V.I.S. should you require further assistance."
        }
    ];

    const fallbackResponses = [
        "I'm afraid I don't have specific data on that query, sir. May I suggest contacting the Stellar Skills team directly at info@stellarskills.com?",
        "Interesting query, sir. That falls outside my current knowledge parameters. Would you like to speak with a Stellar Skills consultant instead?",
        "My apologies — I don't have a precise answer for that. You may want to check our contact form for a more detailed response from our team."
    ];

    let fallbackIndex = 0;

    function jarvisGetResponse(text) {
        const lower = text.toLowerCase();
        for (const entry of jarvisKB) {
            if (entry.patterns.some(p => lower.includes(p))) {
                return entry;
            }
        }
        const resp = { response: fallbackResponses[fallbackIndex % fallbackResponses.length] };
        fallbackIndex++;
        return resp;
    }

    function jarvisAddMessage(text, type, suggestions) {
        const msg = document.createElement('div');
        msg.className = `jarvis-msg ${type}`;
        msg.textContent = text;
        jarvisMessages.appendChild(msg);

        if (suggestions && suggestions.length) {
            const suggestContainer = document.createElement('div');
            suggestContainer.className = 'jarvis-suggestions';
            suggestions.forEach(s => {
                const btn = document.createElement('button');
                btn.className = 'jarvis-suggestion';
                btn.textContent = s;
                btn.addEventListener('click', () => {
                    jarvisHandleInput(s);
                });
                suggestContainer.appendChild(btn);
            });
            jarvisMessages.appendChild(suggestContainer);
        }

        jarvisMessages.scrollTop = jarvisMessages.scrollHeight;
    }

    function jarvisShowTyping() {
        const typing = document.createElement('div');
        typing.className = 'jarvis-typing';
        typing.id = 'jarvisTyping';
        typing.innerHTML = '<span></span><span></span><span></span>';
        jarvisMessages.appendChild(typing);
        jarvisMessages.scrollTop = jarvisMessages.scrollHeight;
        return typing;
    }

    function jarvisHandleInput(text) {
        const trimmed = text.trim();
        if (!trimmed) return;

        jarvisAddMessage(trimmed, 'user');
        jarvisInput.value = '';

        const typingEl = jarvisShowTyping();
        const delay = 700 + Math.min(trimmed.length * 10, 800);

        setTimeout(() => {
            typingEl.remove();
            const result = jarvisGetResponse(trimmed);
            jarvisAddMessage(result.response, 'bot', result.suggestions);
        }, delay);
    }

    // Toggle open/close
    jarvisToggle.addEventListener('click', () => {
        const isOpen = jarvisChatbot.classList.toggle('open');
        if (isOpen && jarvisMessages.children.length === 0) {
            // Greeting on first open
            setTimeout(() => {
                jarvisAddMessage(
                    "Good day. I am J.A.R.V.I.S., the AI assistant for Stellar Skills. How may I assist you today, sir?",
                    'bot',
                    ['Our Services', 'Contact Info', 'About Us']
                );
            }, 300);
        }
    });

    jarvisClose.addEventListener('click', () => {
        jarvisChatbot.classList.remove('open');
    });

    jarvisSend.addEventListener('click', () => {
        jarvisHandleInput(jarvisInput.value);
    });

    jarvisInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            jarvisHandleInput(jarvisInput.value);
        }
    });
});