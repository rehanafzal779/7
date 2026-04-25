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

    // ===== JARVIS Chatbot =====
    (function initJarvis() {
        const fab = document.getElementById('jarvisFab');
        const win = document.getElementById('jarvisWindow');
        const closeBtn = document.getElementById('jarvisClose');
        const messagesEl = document.getElementById('jarvisMessages');
        const input = document.getElementById('jarvisInput');
        const sendBtn = document.getElementById('jarvisSend');
        const quickReplies = document.getElementById('jarvisQuickReplies');

        if (!fab || !win || !closeBtn || !messagesEl || !input || !sendBtn || !quickReplies) return;

        // Toggle window
        fab.addEventListener('click', () => {
            win.classList.toggle('open');
            if (win.classList.contains('open')) input.focus();
        });
        closeBtn.addEventListener('click', () => win.classList.remove('open'));

        // Quick reply buttons
        quickReplies.querySelectorAll('.jarvis-quick-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                postMessage(btn.textContent.trim(), 'user');
                respondTo(btn.textContent.trim());
            });
        });

        // Send on button click or Enter
        sendBtn.addEventListener('click', handleSend);
        input.addEventListener('keydown', e => { if (e.key === 'Enter') handleSend(); });

        function handleSend() {
            const text = input.value.trim();
            if (!text) return;
            input.value = '';
            postMessage(text, 'user');
            respondTo(text);
        }

        // Post a message bubble
        function postMessage(text, role) {
            const div = document.createElement('div');
            div.className = 'jarvis-msg jarvis-msg--' + role;
            const p = document.createElement('p');
            p.textContent = text;
            div.appendChild(p);
            messagesEl.appendChild(div);
            scrollBottom();
        }

        // Typing indicator
        function showTyping() {
            const div = document.createElement('div');
            div.className = 'jarvis-typing';
            div.id = 'jarvisTyping';
            div.innerHTML = '<span></span><span></span><span></span>';
            messagesEl.appendChild(div);
            scrollBottom();
        }

        function hideTyping() {
            const t = document.getElementById('jarvisTyping');
            if (t) t.remove();
        }

        function scrollBottom() {
            messagesEl.scrollTop = messagesEl.scrollHeight;
        }

        // Respond with a slight delay to simulate thinking
        function respondTo(text) {
            showTyping();
            const delay = 800 + Math.random() * 600;
            setTimeout(() => {
                hideTyping();
                const reply = getReply(text.toLowerCase());
                postMessage(reply, 'bot');
            }, delay);
        }

        // Knowledge base
        const knowledge = [
            {
                keys: ['hello', 'hi', 'hey', 'greet', 'howdy', 'good morning', 'good afternoon', 'good evening'],
                replies: [
                    'Good day to you, sir. How may I assist Stellar Skills\' operations today?',
                    'Hello. All systems operational. What can I do for you, sir?',
                    'Greetings. J.A.R.V.I.S. at your service. What do you need?'
                ]
            },
            {
                keys: ['service', 'offer', 'provide', 'program', 'k-12', 'k12', 'higher education', 'corporate', 'training', 'school', 'stem'],
                replies: [
                    'Stellar Skills offers three primary service lines:\n1. K-12 Programs — STEM workshops, coding clubs, digital literacy, and teacher training.\n2. Higher Education — AI labs, career readiness, research support, and digital transformation.\n3. Corporate Training — digital skills, leadership programs, technical training, and custom solutions.',
                    'We specialise in K-12 programs, higher education partnerships, and corporate training. Which area would you like deeper intel on, sir?'
                ]
            },
            {
                keys: ['about', 'company', 'stellar skills', 'who', 'history', 'founded', 'since', 'journey', 'timeline'],
                replies: [
                    'Stellar Skills was founded in 2015 with a mission to bridge the gap between traditional education and the digital future. Key milestones: 2017 — first digital learning platform; 2019 — higher education expansion; 2022 — corporate training launch; 2025 — recognised as industry leader.',
                    'Established in 2015, Stellar Skills has grown to train over 12,500 students and partner with 320+ institutions. Quite the impressive track record, sir.'
                ]
            },
            {
                keys: ['contact', 'reach', 'email', 'phone', 'address', 'location', 'speak', 'talk'],
                replies: [
                    'You can reach the Stellar Skills team via:\n📧 info@stellarskills.com\n📞 (555) 123-4567\n📍 123 Education St, Tech City\n\nAlternatively, scroll to the Contact section to submit a form.',
                    'The contact form is available at the bottom of this page. Or call (555) 123-4567 directly — humans still appreciate voice contact, apparently.'
                ]
            },
            {
                keys: ['price', 'cost', 'pricing', 'fee', 'quote', 'affordable', 'how much'],
                replies: [
                    'Pricing is tailored to each institution\'s scope and requirements. I\'d recommend contacting the team directly for a custom quote — they are quite efficient at that.',
                    'Costs vary based on program scope. Use the contact form or email info@stellarskills.com to request a detailed proposal.'
                ]
            },
            {
                keys: ['stat', 'student', 'institution', 'number', 'how many', 'statistics'],
                replies: [
                    'Current operational metrics: 12,500+ students trained and 320+ institutional partnerships established. Those numbers continue to grow, sir.',
                    'As of the latest data: over twelve thousand five hundred students trained across more than three hundred and twenty partner institutions.'
                ]
            },
            {
                keys: ['thank', 'thanks', 'appreciate', 'great', 'awesome', 'wonderful', 'helpful'],
                replies: [
                    'You\'re most welcome, sir. Is there anything else I can assist with?',
                    'Happy to help. That\'s precisely what I\'m here for.',
                    'Glad to be of service. Any further inquiries?'
                ]
            },
            {
                keys: ['bye', 'goodbye', 'see you', 'later', 'exit', 'close'],
                replies: [
                    'Farewell, sir. J.A.R.V.I.S. standing by whenever you need me.',
                    'Goodbye. Don\'t hesitate to return if you require further assistance.',
                    'Until next time. Stay brilliant.'
                ]
            },
            {
                keys: ['help', 'assist', 'support', 'what can you do', 'capabilities'],
                replies: [
                    'I can help you with information about our services, company background, contact details, pricing enquiries, and general guidance on the site. Just ask, sir.',
                    'My capabilities include: answering questions about Stellar Skills, our programmes, contact info, and navigating you around this page. How can I assist?'
                ]
            },
            {
                keys: ['tony stark', 'iron man', 'avenger', 'marvel', 'stark'],
                replies: [
                    'I appreciate the cultural reference, sir, but I serve Stellar Skills rather than Mr. Stark. Though I must say, the comparison is flattering.',
                    'Ah — a person of culture. While my origins may echo that cinematic AI, my mission is educational empowerment, not saving the world. Though, arguably, education does exactly that.'
                ]
            },
            {
                keys: ['jarvis', 'who are you', 'what are you', 'your name'],
                replies: [
                    'I am J.A.R.V.I.S. — Just A Rather Very Intelligent System — the AI assistant for Stellar Skills. At your service, sir.',
                    'J.A.R.V.I.S.: Just A Rather Very Intelligent System. I am here to answer any queries you may have about our educational solutions.'
                ]
            }
        ];

        function getReply(text) {
            for (const entry of knowledge) {
                if (entry.keys.some(k => text.includes(k))) {
                    return entry.replies[Math.floor(Math.random() * entry.replies.length)];
                }
            }
            // Fallback
            const fallbacks = [
                'Interesting query, sir. I\'m afraid that falls outside my current knowledge base. For detailed inquiries, please contact the Stellar Skills team at info@stellarskills.com.',
                'I don\'t have a precise answer for that. Might I suggest using the contact form below to speak directly with the team?',
                'My databases don\'t contain a direct match for that. Try asking about our services, team, contact details, or pricing.'
            ];
            return fallbacks[Math.floor(Math.random() * fallbacks.length)];
        }
    })();
});