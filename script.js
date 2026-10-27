document.addEventListener('DOMContentLoaded', () => {
  /* ==========================================================================
     MOBILE NAVIGATION MENU
     ========================================================================== */
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');

  if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      const icon = mobileMenuBtn.querySelector('i');
      if (icon) {
        if (navLinks.classList.contains('active')) {
          icon.className = 'ri-close-line';
        } else {
          icon.className = 'ri-menu-line';
        }
      }
    });

    // Close menu when a link is clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        const icon = mobileMenuBtn.querySelector('i');
        if (icon) icon.className = 'ri-menu-line';
      });
    });
  }

  /* ==========================================================================
     DYNAMIC TYPING EFFECT IN HERO
     ========================================================================== */
  const typedTextEl = document.getElementById('typedText');
  if (typedTextEl) {
    const phrases = [
      'Full-Stack Web Developer',
      'Java & Software Engineer',
      'AI & Machine Learning Enthusiast',
      'B.Tech CSE @ Mohan Babu University (CGPA 9.30)'
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 90;

    const typeLoop = () => {
      const currentPhrase = phrases[phraseIndex];

      if (isDeleting) {
        typedTextEl.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 40;
      } else {
        typedTextEl.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 80;
      }

      if (!isDeleting && charIndex === currentPhrase.length) {
        typingSpeed = 1800; // Pause at end of phrase
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typingSpeed = 400; // Pause before new phrase
      }

      setTimeout(typeLoop, typingSpeed);
    };

    setTimeout(typeLoop, 500);
  }

  /* ==========================================================================
     ACTIVE NAVIGATION LINK ON SCROLL
     ========================================================================== */
  const sections = document.querySelectorAll('section');
  const navItems = document.querySelectorAll('.nav-links a');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPosition = window.scrollY + 120; // Offset for navbar height

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navItems.forEach(item => {
      item.classList.remove('active');
      if (item.getAttribute('href') === `#${current}`) {
        item.classList.add('active');
      }
    });
  });

  /* ==========================================================================
     INTERACTIVE MOUSE MOVE GLOW EFFECT (GLASS CARDS)
     ========================================================================== */
  const glassCards = document.querySelectorAll('.glass-card');
  glassCards.forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });

  /* ==========================================================================
     CIRCULAR PROGRESS BAR (EDUCATION SCORE INDICATORS)
     ========================================================================== */
  const animateCircularProgress = (el, targetPercentage, duration = 1400) => {
    let start = 0;
    const increment = targetPercentage / (duration / 16);
    const progressColor = el.getAttribute('data-color') || '#00f2fe';
    const isCGPA = el.id === 'progressUni';
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= targetPercentage) {
        start = targetPercentage;
        clearInterval(timer);
      }
      
      const degrees = (start / 100) * 360;
      el.style.background = `conic-gradient(${progressColor} ${degrees}deg, rgba(255, 255, 255, 0.05) ${degrees}deg)`;
      const valText = el.querySelector('.progress-value');
      if (valText) {
        if (isCGPA) {
          valText.textContent = (start * 0.1).toFixed(2);
        } else {
          valText.textContent = `${start.toFixed(1)}%`;
        }
      }
    }, 16);
  };

  /* ==========================================================================
     SKILL PROGRESS BAR ANIMATION
     ========================================================================== */
  const animateSkillBars = () => {
    const skillProgresses = document.querySelectorAll('.skill-progress');
    skillProgresses.forEach(prog => {
      const level = prog.getAttribute('data-level');
      prog.style.width = `${level}%`;
    });
  };

  /* ==========================================================================
     INTERSECTION OBSERVER FOR TRIGGERING PROGRESS ANIMATIONS
     ========================================================================== */
  let educationAnimated = false;
  let skillsAnimated = false;

  const observerOptions = {
    threshold: 0.2
  };

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        if (entry.target.id === 'education' && !educationAnimated) {
          educationAnimated = true;
          document.querySelectorAll('.circular-progress').forEach(el => {
            const pct = parseFloat(el.getAttribute('data-percentage')) || 90;
            animateCircularProgress(el, pct);
          });
        }
        
        if (entry.target.id === 'skills' && !skillsAnimated) {
          skillsAnimated = true;
          animateSkillBars();
        }
      }
    });
  }, observerOptions);

  sections.forEach(sec => {
    sectionObserver.observe(sec);
  });

  /* ==========================================================================
     CLIPBOARD COPY FEATURE WITH TOAST NOTIFICATION
     ========================================================================== */
  const toast = document.getElementById('toastNotification');
  const toastMessage = document.getElementById('toastMessage');

  const showToast = (text) => {
    if (!toast) return;
    if (toastMessage) toastMessage.textContent = text;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3000);
  };

  document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const textToCopy = btn.getAttribute('data-copy');
      if (textToCopy) {
        navigator.clipboard.writeText(textToCopy).then(() => {
          showToast(`Copied "${textToCopy}" to clipboard!`);
        }).catch(() => {
          // Fallback
          showToast(`Copied to clipboard!`);
        });
      }
    });
  });

  /* ==========================================================================
     CONTACT FORM HANDLING
     ========================================================================== */
  const contactForm = document.getElementById('portfolioContactForm');
  const formStatus = document.getElementById('formStatus');

  if (contactForm && formStatus) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('inputName')?.value.trim();
      const email = document.getElementById('inputEmail')?.value.trim();
      const message = document.getElementById('inputMessage')?.value.trim();

      if (!name || !email || !message) {
        formStatus.textContent = 'Please fill out all fields before sending.';
        formStatus.className = 'form-status error';
        formStatus.style.display = 'block';
        return;
      }

      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalBtnText = submitBtn.innerHTML;
      
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="ri-loader-4-line" style="animation: spin 1s infinite linear;"></i> Sending...';
      
      // Dispatch via mailto fallback link for seamless zero-backend delivery
      const mailtoUrl = `mailto:asifkms934@gmail.com?subject=${encodeURIComponent('Portfolio Contact from ' + name)}&body=${encodeURIComponent('Name: ' + name + '\nEmail: ' + email + '\n\nMessage:\n' + message)}`;

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
        
        // Show status message & open mail client
        formStatus.textContent = 'Opening your email client to send message to Asif...';
        formStatus.className = 'form-status success';
        formStatus.style.display = 'block';
        
        window.location.href = mailtoUrl;
        
        contactForm.reset();
        
        setTimeout(() => {
          formStatus.style.display = 'none';
        }, 6000);
      }, 900);
    });
  }
});
