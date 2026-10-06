document.addEventListener('DOMContentLoaded', () => {
  try {
    const menuButton = document.getElementById('menuButton');
    const mobileMenu = document.getElementById('mobileMenu');
    const siteHeader = document.getElementById('siteHeader');
    const backToTop = document.getElementById('backToTop');
    const navLinks = document.querySelectorAll('.nav-link');
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const closeMobileMenu = () => {
      if (!menuButton || !mobileMenu) return;
      mobileMenu.classList.add('hidden');
      menuButton.setAttribute('aria-expanded', 'false');
    };

    if (menuButton && mobileMenu) {
      menuButton.addEventListener('click', () => {
        const isOpen = !mobileMenu.classList.contains('hidden');
        mobileMenu.classList.toggle('hidden');
        menuButton.setAttribute('aria-expanded', String(!isOpen));
      });
    }

    document.querySelectorAll('#mobileMenu a').forEach((link) => {
      link.addEventListener('click', () => {
        closeMobileMenu();
      });
    });

    const syncHeaderShadow = () => {
      if (!siteHeader) return;
      if (window.scrollY > 10) {
        siteHeader.classList.add('shadow-md');
      } else {
        siteHeader.classList.remove('shadow-md');
      }
    };

    const syncBackToTop = () => {
      if (!backToTop) return;
      if (window.scrollY > 400) {
        backToTop.classList.remove('hidden');
        backToTop.classList.add('flex');
      } else {
        backToTop.classList.add('hidden');
        backToTop.classList.remove('flex');
      }
    };

    syncHeaderShadow();
    syncBackToTop();

    window.addEventListener('scroll', () => {
      syncHeaderShadow();
      syncBackToTop();
    }, { passive: true });

    if (backToTop) {
      backToTop.addEventListener('click', () => {
        window.scrollTo({
          top: 0,
          behavior: prefersReducedMotion ? 'auto' : 'smooth'
        });
      });
    }

    const setActiveNav = (activeKey) => {
      navLinks.forEach((link) => {
        const linkKey = link.dataset.navSection || '';
        link.classList.toggle('is-active', linkKey === activeKey);
      });
    };

    const aboutSection = document.getElementById('about');
    const howSection = document.getElementById('how-it-works');

    if ('IntersectionObserver' in window && (aboutSection || howSection)) {
      const sectionVisibility = {
        about: false,
        'how-it-works': false
      };

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            sectionVisibility[entry.target.id] = entry.isIntersecting;
          });

          if (sectionVisibility.about) {
            setActiveNav('about');
          } else if (sectionVisibility['how-it-works']) {
            setActiveNav('help');
          } else {
            setActiveNav(null);
          }
        },
        {
          root: null,
          rootMargin: '-35% 0px -45% 0px',
          threshold: 0.01
        }
      );

      if (aboutSection) observer.observe(aboutSection);
      if (howSection) observer.observe(howSection);
    } else {
      const updateActiveFromScroll = () => {
        const offset = window.scrollY + 120;
        const sections = [aboutSection, howSection].filter(Boolean);
        let activeKey = null;
        sections.forEach((section) => {
          if (section.offsetTop <= offset) {
            activeKey = section.id === 'about' ? 'about' : 'help';
          }
        });
        setActiveNav(activeKey);
      };

      updateActiveFromScroll();
      window.addEventListener('scroll', updateActiveFromScroll, { passive: true });
    }

    const revealElements = document.querySelectorAll('[data-reveal], .reveal-on-scroll');

    if (revealElements.length) {
      const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.12,
        rootMargin: '0px 0px -6% 0px'
      });

      revealElements.forEach((element) => {
        revealObserver.observe(element);
      });

      if (siteHeader) {
        requestAnimationFrame(() => {
          siteHeader.classList.add('is-visible');
        });
      }
    }

    const mascotWrap = document.getElementById('mascotWrap');
    const heroSection = document.querySelector('[data-hero]');

    if (!prefersReducedMotion && heroSection && mascotWrap) {
      let currentX = 0;
      let currentY = 0;
      let targetX = 0;
      let targetY = 0;
      let currentRotateX = 0;
      let currentRotateY = 0;
      let targetRotateX = 0;
      let targetRotateY = 0;

      heroSection.addEventListener('pointermove', (event) => {
        const rect = heroSection.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width;
        const y = (event.clientY - rect.top) / rect.height;

        targetX = (x - 0.5) * 18;
        targetY = (y - 0.5) * 18;
        targetRotateY = (x - 0.5) * 8;
        targetRotateX = (0.5 - y) * 8;
      });

      heroSection.addEventListener('pointerleave', () => {
        targetX = 0;
        targetY = 0;
        targetRotateX = 0;
        targetRotateY = 0;
      });

      const tick = () => {
        currentX += (targetX - currentX) * 0.12;
        currentY += (targetY - currentY) * 0.12;
        currentRotateX += (targetRotateX - currentRotateX) * 0.12;
        currentRotateY += (targetRotateY - currentRotateY) * 0.12;

        mascotWrap.style.transform = `translate(${currentX}px, ${currentY}px) rotateX(${currentRotateX}deg) rotateY(${currentRotateY}deg)`;
        requestAnimationFrame(tick);
      };

      requestAnimationFrame(tick);
    }

    if (mascotWrap) {
      const mascotImage = mascotWrap.querySelector('img');

      mascotWrap.addEventListener('mouseenter', () => {
        if (mascotImage && !prefersReducedMotion) {
          mascotImage.classList.remove('wiggle');
          void mascotImage.offsetWidth;
          mascotImage.classList.add('wiggle');
        }
      });

      mascotWrap.addEventListener('click', () => {
        if (!mascotImage || prefersReducedMotion) return;
        mascotImage.animate(
          [
            { transform: 'translateY(0px)' },
            { transform: 'translateY(-20px)' },
            { transform: 'translateY(0px)' }
          ],
          { duration: 500, easing: 'ease-out' }
        );
      });
    }
  } catch (error) {
    console.error('Landing page script error:', error);
  }
});
