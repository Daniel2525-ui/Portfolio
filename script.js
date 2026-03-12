 const defaultConfig = {
            hero_name: "John Doe",
            hero_title: "Full Stack Web Developer",
            hero_tagline: "I create beautiful, responsive, and user-friendly web experiences using modern technologies. Let's build something amazing together!",
            about_text: "I'm a passionate web developer with expertise in building modern, responsive websites and web applications. With a strong foundation in HTML5, CSS, JavaScript, and Bootstrap, I create seamless user experiences that look great on any device. I also leverage Firebase for robust backend solutions, enabling real-time data synchronization and secure authentication.",
            contact_email: "hello@johndoe.dev",
            background_color: "#0a0a0f",
            surface_color: "#15151d",
            text_color: "#e8e8ed",
            primary_action: "#6366f1",
            secondary_action: "#818cf8"
        };

        // Hero/About Section updater
        async function onConfigChange(config) {
            document.getElementById('heroName').innerHTML = `Hi, I'm <span class="highlight">${config.hero_name || defaultConfig.hero_name}</span>`;
            document.getElementById('heroTitle').textContent = config.hero_title || defaultConfig.hero_title;
            document.getElementById('heroTagline').textContent = config.hero_tagline || defaultConfig.hero_tagline;
            document.getElementById('aboutText').textContent = config.about_text || defaultConfig.about_text;
            document.getElementById('contactEmail').textContent = config.contact_email || defaultConfig.contact_email;

            const root = document.documentElement;
            root.style.setProperty('--primary-bg', config.background_color || defaultConfig.background_color);
            root.style.setProperty('--secondary-surface', config.surface_color || defaultConfig.surface_color);
            root.style.setProperty('--text-color', config.text_color || defaultConfig.text_color);
            root.style.setProperty('--primary-action', config.primary_action || defaultConfig.primary_action);
            root.style.setProperty('--secondary-action', config.secondary_action || defaultConfig.secondary_action);
        }

        // Smooth scrolling
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                target?.scrollIntoView({ behavior: 'smooth', block: 'start' });

                // Close mobile menu
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse.classList.contains('show')) bootstrap.Collapse.getInstance(navbarCollapse)?.hide();
            });
        });

        // Scroll animations
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

        document.querySelectorAll('.skill-card, .project-card, .stat-item').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });

        // Contact Form Handler
        const form = document.querySelector('.contact-form');
        const submitBtn = document.getElementById('submitBtn');
        const formMessage = document.getElementById('formMessage');

        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            submitBtn.disabled = true;
            submitBtn.innerText = 'Sending...';
            formMessage.style.display = 'none';

            const formData = new FormData(form);

            try {
                const response = await fetch(form.action, {
                    method: 'POST',
                    body: formData,
                    headers: { 'Accept': 'application/json' }
                });

                if (response.ok) {
                    formMessage.style.display = 'block';
                    formMessage.style.color = 'green';
                    formMessage.innerText = '✓ Thank you! Your message has been sent.';
                    form.reset();
                } else {
                    formMessage.style.display = 'block';
                    formMessage.style.color = 'red';
                    formMessage.innerText = 'Oops! There was a problem submitting your form.';
                }
            } catch (error) {
                formMessage.style.display = 'block';
                formMessage.style.color = 'red';
                formMessage.innerText = 'Oops! There was a network error.';
            }

            submitBtn.disabled = false;
            submitBtn.innerText = 'Send Message';
        });