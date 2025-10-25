document.addEventListener('DOMContentLoaded', () => {
    // --- ELEMENT SELECTORS ---
    const header = document.getElementById('main-header');
    const scrollProgressBar = document.getElementById('scroll-progress-bar');
    const backToTopButton = document.getElementById('back-to-top');
    const sections = document.querySelectorAll('main section[id]');
    const navLinks = document.querySelectorAll('#nav-links .nav-link');

    // --- RIPPLE EFFECT ---
    document.querySelectorAll('.btn-ripple').forEach(button => {
        button.addEventListener('click', function (e) {
            const buttonEl = e.currentTarget;
            const rect = buttonEl.getBoundingClientRect();
            const ripple = document.createElement('span');

            ripple.className = 'ripple';
            ripple.style.left = `${e.clientX - rect.left}px`;
            ripple.style.top = `${e.clientY - rect.top}px`;

            const oldRipple = buttonEl.querySelector('.ripple');
            if (oldRipple) {
                oldRipple.remove();
            }
            
            buttonEl.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // --- FAQ ACCORDION (NEW LAYOUT) ---
    window.toggleItem = function(id) {
        const content = document.getElementById(`content-${id}`);
        const iconPlus = document.getElementById(`icon-plus-${id}`);
        const iconMinus = document.getElementById(`icon-minus-${id}`);
        
        if (content.style.maxHeight) {
            content.style.maxHeight = null;
        } else {
            content.style.maxHeight = content.scrollHeight + 'px';
        }

        iconPlus.classList.toggle('hidden');
        iconMinus.classList.toggle('hidden');
    }

    // --- SMOOTH SCROLLING ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');

            // Do nothing for placeholder links (e.g., social media icons)
            if (targetId === '#' && !this.closest('nav')) {
                e.preventDefault();
                return;
            }
            
            const targetElement = targetId && targetId.length > 1 ? document.querySelector(targetId) : null;
            
            // Only proceed if we have a valid scroll target
            if (targetElement || targetId === '#' || targetId === '#home') {
                e.preventDefault();

                // If it's a main navigation click (header/mobile menu), update active class immediately.
                const isNavClick = this.closest('#main-header') || this.closest('#mobile-menu');
                if (isNavClick) {
                    const effectiveTargetId = (targetId === '#') ? '#home' : targetId;
                    navLinks.forEach(link => link.classList.remove('active'));
                    const linkToActivate = document.querySelector(`#nav-links .nav-link[href="${effectiveTargetId}"]`);
                    if (linkToActivate) {
                        linkToActivate.classList.add('active');
                    }
                }

                // Scroll to the element
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                } else {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }
            }
        });
    });

    // --- MOBILE MENU ---
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenuCloseButton = document.getElementById('mobile-menu-close-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const pageOverlay = document.getElementById('page-overlay');
    const mobileNavLinks = document.querySelectorAll('.nav-link-mobile');

    if (mobileMenuButton && mobileMenu) {
        const openMenu = () => {
            mobileMenu.classList.add('is-open');
            pageOverlay?.classList.add('is-visible');
        };

        const closeMenu = () => {
            mobileMenu.classList.remove('is-open');
            pageOverlay?.classList.remove('is-visible');
        };

        mobileMenuButton.addEventListener('click', openMenu);
        mobileMenuCloseButton?.addEventListener('click', closeMenu);
        pageOverlay?.addEventListener('click', closeMenu);
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', closeMenu);
        });
    }
    
    // --- BACK TO TOP BUTTON ---
    if (backToTopButton) {
        backToTopButton.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
    
    // --- ENHANCED ANIMATIONS & MICRO-INTERACTIONS ---
    
    // Parallax Scrolling Effect
    function handleParallax() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.parallax-slow, .parallax-fast');
        
        parallaxElements.forEach(element => {
            const speed = element.classList.contains('parallax-slow') ? 0.5 : 0.3;
            const yPos = -(scrolled * speed);
            element.style.setProperty('--parallax-offset', `${yPos}px`);
        });
    }

    // Enhanced Scroll Progress Bar
    function updateScrollProgress() {
        const scrollProgress = document.getElementById('scroll-progress');
        if (scrollProgress) {
            const scrollTop = window.pageYOffset;
            const docHeight = document.body.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            scrollProgress.style.width = scrollPercent + '%';
        }
    }

    // Typewriter Effect for Headlines
    function initTypewriterEffect() {
        const typewriterElements = document.querySelectorAll('.typewriter-text');
        typewriterElements.forEach(element => {
            const text = element.textContent;
            element.textContent = '';
            element.style.borderRight = '2px solid #3b82f6';
            
            let i = 0;
            const timer = setInterval(() => {
                if (i < text.length) {
                    element.textContent += text.charAt(i);
                    i++;
                } else {
                    clearInterval(timer);
                    setTimeout(() => {
                        element.style.borderRight = 'none';
                    }, 1000);
                }
            }, 100);
        });
    }

    // Enhanced Button Interactions
    function enhanceButtonInteractions() {
        const buttons = document.querySelectorAll('.btn-micro-interaction');
        buttons.forEach(button => {
            button.addEventListener('mouseenter', () => {
                button.style.transform = 'translateY(-2px) scale(1.05)';
            });
            
            button.addEventListener('mouseleave', () => {
                button.style.transform = 'translateY(0) scale(1)';
            });
        });
    }

    // Card Hover Enhancements
    function enhanceCardInteractions() {
        const cards = document.querySelectorAll('.card-micro-interaction');
        cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-8px) scale(1.02)';
                card.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.3)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) scale(1)';
                card.style.boxShadow = '';
            });
        });
    }

    // Staggered Animation System
    function initStaggeredAnimations() {
        const staggerGroups = document.querySelectorAll('.stagger-group');
        staggerGroups.forEach(group => {
            const children = group.querySelectorAll('.stagger-1, .stagger-2, .stagger-3, .stagger-4, .stagger-5, .stagger-6');
            children.forEach((child, index) => {
                child.style.opacity = '0';
                child.style.transform = 'translateY(20px)';
                
                setTimeout(() => {
                    child.style.transition = 'all 0.6s ease-out';
                    child.style.opacity = '1';
                    child.style.transform = 'translateY(0)';
                }, index * 100);
            });
        });
    }

    // --- INTERSECTION OBSERVERS (FOR PERFORMANCE) ---
    // Generic "Reveal on Scroll" Animations
    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    if (revealElements.length > 0) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        revealElements.forEach(element => {
            revealObserver.observe(element);
        });
    }
    
    // Animated Number Counters
    const counters = document.querySelectorAll('.counter');
    function animateCounter(element) {
        const targetString = element.dataset.target;
        if (!targetString) return;

        const match = targetString.match(/^([^\d.]*)([\d.]+)(.*)$/);
        if (!match) {
            element.textContent = targetString;
            return;
        }

        const prefix = match[1] || '';
        const targetNumber = parseFloat(match[2]);
        const suffix = match[3] || '';
        
        if (isNaN(targetNumber)) {
            element.textContent = targetString;
            return;
        }

        const duration = 2000;
        let startTime = null;
        
        const step = (currentTime) => {
            if (startTime === null) startTime = currentTime;
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / duration, 1);
            const easedProgress = 1 - Math.pow(1 - progress, 3);
            const currentNumber = easedProgress * targetNumber;
            
            element.textContent = targetString.includes('.') 
                ? prefix + currentNumber.toFixed(1) + suffix
                : prefix + Math.floor(currentNumber) + suffix;

            if (progress < 1) {
                requestAnimationFrame(step);
            } else {
                element.textContent = targetString;
            }
        };
        requestAnimationFrame(step);
    }

    if (counters.length > 0) {
        const counterObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    animateCounter(counter);
                    observer.unobserve(counter);
                }
            });
        }, { threshold: 0.5 });
        counters.forEach(counter => counterObserver.observe(counter));
    }

    // Active Nav Link Observer
    if (sections.length > 0 && navLinks.length > 0 && header) {
        const navObserver = new IntersectionObserver(() => {
            let activeSectionId = 'home';
            let smallestDistance = Infinity;
            const detectionPoint = window.innerHeight * 0.4;

            sections.forEach(section => {
                const rect = section.getBoundingClientRect();
                
                // Only consider sections that are visible on screen
                if (rect.top <= window.innerHeight && rect.bottom >= 0) {
                    const distance = Math.abs(rect.top - detectionPoint);
                    if (distance < smallestDistance) {
                        smallestDistance = distance;
                        activeSectionId = section.id;
                    }
                }
            });
            
            // If the user is near the top of the page, force "Home" to be active.
            if (window.scrollY < window.innerHeight / 2) {
                activeSectionId = 'home';
            }

            // Update nav links based on the determined active section.
            navLinks.forEach(link => {
                const href = link.getAttribute('href');
                const isMatch = (href === '#home' && activeSectionId === 'home') || href === `#${activeSectionId}`;
                
                if (isMatch) {
                    link.classList.add('active');
                } else {
                    link.classList.remove('active');
                }
            });

        }, {
            threshold: 0.01 // Trigger as soon as a tiny part is visible
        });

        sections.forEach(section => {
            navObserver.observe(section);
        });
    }

    // --- SCROLL-BASED FUNCTIONALITIES ---
    const handleScroll = () => {
        const scrollTop = window.scrollY;
        
        // Sticky Header - Disabled to prevent jitter
        // if (header) {
        //     header.classList.toggle('scrolled', scrollTop > 50);
        // }
        
        // Scroll Progress Bar
        if (scrollProgressBar) {
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            scrollProgressBar.style.width = scrollPercent + '%';
        }

        // Back to Top Button Visibility
        if (backToTopButton) {
            backToTopButton.classList.toggle('is-visible', scrollTop > 300);
        }
        
        // Enhanced scroll effects
        handleParallax();
        updateScrollProgress();
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call
    
    // Initialize enhanced animations
    initTypewriterEffect();
    enhanceButtonInteractions();
    enhanceCardInteractions();
    initStaggeredAnimations();
    
    // --- SKELETON LOADING SYSTEM ---
    
    // Show skeleton loading
    function showSkeletonLoading() {
        const skeleton = document.getElementById('skeleton-loading');
        if (skeleton) {
            skeleton.style.display = 'flex';
        }
    }
    
    // Hide skeleton loading
    function hideSkeletonLoading() {
        const skeleton = document.getElementById('skeleton-loading');
        if (skeleton) {
            skeleton.style.display = 'none';
        }
    }
    
    // Show testimonial skeleton
    function showTestimonialSkeleton() {
        const testimonialWrapper = document.getElementById('testimonial-wrapper');
        const skeleton = document.getElementById('testimonial-skeleton');
        if (testimonialWrapper && skeleton) {
            // Clone skeleton multiple times for carousel effect
            for (let i = 0; i < 3; i++) {
                const clone = skeleton.cloneNode(true);
                clone.classList.remove('hidden');
                clone.classList.add('skeleton-card');
                testimonialWrapper.appendChild(clone);
            }
        }
    }
    
    // Hide testimonial skeleton
    function hideTestimonialSkeleton() {
        const testimonialWrapper = document.getElementById('testimonial-wrapper');
        if (testimonialWrapper) {
            const skeletons = testimonialWrapper.querySelectorAll('.skeleton-card');
            skeletons.forEach(skeleton => skeleton.remove());
        }
    }
    
    // Simulate loading for avatars
    function simulateAvatarLoading() {
        const avatars = document.querySelectorAll('img[src*="ui-avatars.com"]');
        avatars.forEach(avatar => {
            avatar.style.opacity = '0';
            avatar.addEventListener('load', () => {
                avatar.style.transition = 'opacity 0.3s ease';
                avatar.style.opacity = '1';
            });
        });
    }
    
    // Initialize skeleton loading
    simulateAvatarLoading();
    
    // --- ERROR BOUNDARY SYSTEM ---
    
    // Global error handler
    window.addEventListener('error', (event) => {
        console.error('Global error caught:', event.error);
        showErrorNotification('Something went wrong. Please refresh the page.');
    });
    
    // Unhandled promise rejection handler
    window.addEventListener('unhandledrejection', (event) => {
        console.error('Unhandled promise rejection:', event.reason);
        showErrorNotification('A network error occurred. Please check your connection.');
        event.preventDefault();
    });
    
    // Error notification system
    function showErrorNotification(message) {
        // Remove existing error notifications
        const existing = document.querySelector('.error-notification');
        if (existing) existing.remove();
        
        const notification = document.createElement('div');
        notification.className = 'error-notification fixed top-4 right-4 bg-red-600 text-white p-4 rounded-lg shadow-lg z-50 max-w-sm';
        notification.innerHTML = `
            <div class="flex items-center">
                <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path>
                </svg>
                <span>${message}</span>
                <button onclick="this.parentElement.parentElement.remove()" class="ml-2 text-white hover:text-gray-200">
                    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                    </svg>
                </button>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 5000);
    }
    
    // Network error handling
    function handleNetworkError(error) {
        console.error('Network error:', error);
        showErrorNotification('Network error. Please check your internet connection.');
    }
    
    // API error handling
    function handleAPIError(error, context = '') {
        console.error(`API error in ${context}:`, error);
        showErrorNotification(`Failed to ${context || 'load data'}. Please try again.`);
    }
    
    // Form submission error handling
    function handleFormError(error, formName) {
        console.error(`Form error in ${formName}:`, error);
        showErrorNotification(`Failed to submit ${formName}. Please try again.`);
    }
    
    // Safe function wrapper
    function safeExecute(fn, context = '', fallback = null) {
        try {
            return fn();
        } catch (error) {
            console.error(`Error in ${context}:`, error);
            if (fallback) {
                return fallback();
            }
            showErrorNotification(`Error in ${context}. Please refresh the page.`);
            return null;
        }
    }
    
    // Enhanced form submission with error handling
    function setupFormErrorHandling() {
        const forms = document.querySelectorAll('form');
        forms.forEach(form => {
            form.addEventListener('submit', (e) => {
                try {
                    // Existing form logic here
                } catch (error) {
                    handleFormError(error, form.id || 'form');
                    e.preventDefault();
                }
            });
        });
    }
    
    // Initialize error handling
    setupFormErrorHandling();

    // --- TESTIMONIAL CAROUSEL ---
    const carouselWrapper = document.getElementById('testimonial-wrapper');
    const carousel = document.getElementById('testimonial-carousel');
    const prevButton = document.getElementById('testimonial-prev');
    const nextButton = document.getElementById('testimonial-next');
    const dotsContainer = document.getElementById('testimonial-dots');

    if (carouselWrapper && carousel && nextButton && prevButton && dotsContainer) {
        let originalTestimonials = Array.from(carousel.querySelectorAll('.testimonial-card:not(.clone)'));
        let autoSlideInterval;
        let isTransitioning = false;
        let transitionEndTimeout;
        
        const gap = 32; // Corresponds to Tailwind's `gap-8` (2rem = 32px)

        if (originalTestimonials.length > 0) {
            const getItemsPerView = () => {
                const width = window.innerWidth;
                if (width >= 1024) return 3; // lg
                if (width >= 640) return 2; // sm & md
                return 1;
            };
            let itemsPerView = getItemsPerView();
            let slideWidth = 0;
            let currentIndex = getItemsPerView();

            const setCardWidths = () => {
                const wrapperRect = carouselWrapper.getBoundingClientRect();
                itemsPerView = getItemsPerView();
                
                const allCards = Array.from(carousel.children);
                let theoreticalCardWidth = (itemsPerView > 1)
                    ? (wrapperRect.width - ((itemsPerView - 1) * gap)) / itemsPerView
                    : wrapperRect.width;

                allCards.forEach(card => card.style.flexBasis = `${theoreticalCardWidth}px`);
                
                void carousel.offsetWidth; 
                
                if (allCards.length > 1) {
                    slideWidth = allCards[1].getBoundingClientRect().left - allCards[0].getBoundingClientRect().left;
                } else if (allCards.length === 1) {
                    slideWidth = wrapperRect.width;
                }
            };

            const setupCarousel = () => {
                carousel.querySelectorAll('.clone').forEach(clone => clone.remove());
                originalTestimonials = Array.from(carousel.querySelectorAll('.testimonial-card:not(.clone)'));

                const createClone = (node) => {
                    const clone = node.cloneNode(true);
                    clone.classList.add('clone');
                    clone.setAttribute('aria-hidden', 'true');
                    return clone;
                };

                const clonesToAppend = originalTestimonials.slice(0, itemsPerView).map(createClone);
                const clonesToPrepend = originalTestimonials.slice(-itemsPerView).map(createClone);

                carousel.append(...clonesToAppend);
                carousel.prepend(...clonesToPrepend);
            };

            const positionCarousel = () => {
                carousel.style.transform = `translateX(-${slideWidth * currentIndex}px)`;
            };

            const updateDots = () => {
                let realIndex = (currentIndex - itemsPerView);
                realIndex = (realIndex % originalTestimonials.length + originalTestimonials.length) % originalTestimonials.length;
                Array.from(dotsContainer.children).forEach((dot, index) => {
                    dot.classList.toggle('active', index === realIndex);
                });
            };

            const finishTransition = () => {
                if (!isTransitioning) return;
                isTransitioning = false;
                clearTimeout(transitionEndTimeout);

                if (currentIndex < itemsPerView) {
                    currentIndex += originalTestimonials.length;
                    carousel.classList.add('no-transition');
                    positionCarousel();
                } else if (currentIndex >= originalTestimonials.length + itemsPerView) {
                    currentIndex -= originalTestimonials.length;
                    carousel.classList.add('no-transition');
                    positionCarousel();
                }
            };

            const moveToSlide = (newIndex) => {
                if (isTransitioning) return;
                isTransitioning = true;
                currentIndex = newIndex;
                carousel.classList.remove('no-transition');
                positionCarousel();
                updateDots();

                clearTimeout(transitionEndTimeout);
                transitionEndTimeout = setTimeout(finishTransition, 700); // CSS transition is 600ms
            };
            
            dotsContainer.innerHTML = '';
            originalTestimonials.forEach((_, index) => {
                const dot = document.createElement('button');
                dot.classList.add('testimonial-dot');
                dot.setAttribute('aria-label', `Go to testimonial ${index + 1}`);
                dot.addEventListener('click', () => {
                    moveToSlide(index + itemsPerView);
                });
                dotsContainer.appendChild(dot);
            });

            const handleSlide = (direction) => {
                moveToSlide(currentIndex + direction);
            };

            const stopAutoSlide = () => clearInterval(autoSlideInterval);
            const startAutoSlide = () => {
                stopAutoSlide();
                autoSlideInterval = window.setInterval(() => handleSlide(1), 4000);
            };

            carousel.addEventListener('transitionend', finishTransition);
            
            nextButton.addEventListener('click', () => handleSlide(1));
            prevButton.addEventListener('click', () => handleSlide(-1));

            // --- SWIPE LOGIC (FIX FOR SCROLL-TRAPPING) ---
            let isDragging = false, startX = 0, startY = 0, currentSwipeOffset = 0, isHorizontalSwipe = null;

            const dragStart = (e) => {
                isDragging = true;
                const touch = e.touches ? e.touches[0] : null;
                startX = touch ? touch.clientX : e.clientX;
                startY = touch ? touch.clientY : e.clientY;
                carousel.classList.add('no-transition');
                isHorizontalSwipe = null;
                stopAutoSlide();
            };

            const dragging = (e) => {
                if (!isDragging) return;
                const touch = e.touches ? e.touches[0] : null;
                const currentX = touch ? touch.clientX : e.clientX;
                const currentY = touch ? touch.clientY : e.clientY;
                
                if (isHorizontalSwipe === null) {
                    const deltaX = Math.abs(currentX - startX);
                    const deltaY = Math.abs(currentY - startY);
                    isHorizontalSwipe = deltaX > deltaY + 5; // Add a small buffer to favor vertical scroll
                }

                if (isHorizontalSwipe) {
                    if (e.touches) e.preventDefault();
                    currentSwipeOffset = currentX - startX;
                    carousel.style.transform = `translateX(${(-slideWidth * currentIndex) + currentSwipeOffset}px)`;
                }
            };

            const dragEnd = () => {
                if (!isDragging) return;
                isDragging = false;
                carousel.classList.remove('no-transition');
                
                if (isHorizontalSwipe) {
                    const swipeThreshold = slideWidth / 5;
                    if (currentSwipeOffset < -swipeThreshold) {
                        handleSlide(1);
                    } else if (currentSwipeOffset > swipeThreshold) {
                        handleSlide(-1);
                    } else {
                        positionCarousel();
                    }
                }
                currentSwipeOffset = 0;
                startAutoSlide();
            };
            
            carousel.addEventListener('touchstart', dragStart, { passive: true });
            carousel.addEventListener('touchmove', dragging, { passive: false });
            carousel.addEventListener('touchend', dragEnd);
            carousel.addEventListener('mousedown', dragStart);
            window.addEventListener('mousemove', dragging);
            window.addEventListener('mouseup', dragEnd); 

            
            ['mouseenter', 'focusin'].forEach(event => carouselWrapper.addEventListener(event, stopAutoSlide));
            ['mouseleave', 'focusout'].forEach(event => carouselWrapper.addEventListener(event, startAutoSlide));

            const initialize = () => {
                itemsPerView = getItemsPerView();
                setupCarousel();
                setCardWidths();
                currentIndex = itemsPerView;
                carousel.classList.add('no-transition');
                positionCarousel();
                updateDots();
                startAutoSlide();
            };
            
            window.addEventListener('resize', () => {
                stopAutoSlide();
                initialize();
            });

            initialize();
        }
    }
    
    // --- ANIMATED FAVICON ---
    function animateFavicon() {
        const favicon = document.querySelector("link[rel*='icon']");
        if (!favicon) return;
        const originalFavicon = favicon.href;
        const frame1 = `data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><rect width=%22100%22 height=%22100%22 rx=%2220%22 fill=%22%233B82F6%22></rect></svg>`;
        const frame2 = `data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><rect width=%22100%22 height=%22100%22 rx=%2220%22 fill=%22%233B82F6%22></rect><text x=%2250%%22 y=%2250%%22 dominant-baseline=%22central%22 text-anchor=%22middle%22 font-size=%2260%22 font-family=%22sans-serif%22 font-weight=%22bold%22 fill=%22%23FFFFFF%22>T</text></svg>`;
        const frames = [frame1, frame2, originalFavicon];
        let currentFrame = 0;
        const animationInterval = setInterval(() => {
            if (currentFrame < frames.length) {
                favicon.href = frames[currentFrame];
                currentFrame++;
            } else {
                clearInterval(animationInterval);
            }
        }, 300);
    }
    animateFavicon();

    // --- FORM HANDLERS ---
    function setupAnimatedForms() {
        const handleFormSubmission = (form) => {
            const submitButton = form.querySelector('button[type="submit"]');
            if (!submitButton) return;
            const successMessage = document.getElementById(`${form.id}-success`);

            const validateEmail = (email) => /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(String(email).toLowerCase());

            form.addEventListener('submit', (e) => {
                e.preventDefault();
                let isValid = true;
                
                form.querySelectorAll('[id$="-error"]').forEach(el => el.classList.add('hidden'));
                successMessage?.classList.remove('is-visible');

                const inputs = form.querySelectorAll('input[required], textarea[required]');
                
                inputs.forEach(input => {
                    const errorEl = document.getElementById(`${input.id}-error`);
                    if (!errorEl) return;
                    const value = input.value.trim();
                    let isFieldValid = true;

                    if (input.type === 'email') {
                        if (value === '') {
                            isFieldValid = false;
                            errorEl.textContent = 'Email is required.';
                        } else if (!validateEmail(value)) {
                            isFieldValid = false;
                            errorEl.textContent = 'Please enter a valid email address.';
                        }
                    } else if (value === '') {
                        isFieldValid = false;
                        errorEl.textContent = 'This field is required.';
                    }

                    if (!isFieldValid) {
                        isValid = false;
                        errorEl.classList.remove('hidden');
                    }
                });

                if (isValid) {
                    submitButton.classList.add('is-loading');
                    submitButton.disabled = true;

                    setTimeout(() => { // Simulate API call
                        submitButton.classList.remove('is-loading');
                        submitButton.classList.add('is-success');
                        submitButton.classList.remove('bg-blue-600', 'hover:bg-blue-700');
                        submitButton.classList.add('bg-green-500');
                        successMessage?.classList.add('is-visible');

                        setTimeout(() => {
                            form.reset();
                            submitButton.classList.remove('is-success', 'bg-green-500');
                            submitButton.classList.add('bg-blue-600', 'hover:bg-blue-700');
                            submitButton.disabled = false;
                            successMessage?.classList.remove('is-visible');
                        }, 2500);
                    }, 1500);
                }
            });
        };
        
        const contactForm = document.getElementById('contact-form');
        if (contactForm) handleFormSubmission(contactForm);

        // Careers form not implemented yet - will be added when needed
    }
    setupAnimatedForms();

    // --- COOKIE CONSENT BANNER ---
    const cookieBanner = document.getElementById('cookie-consent-banner');
    if (cookieBanner) {
        const acceptBtn = document.getElementById('cookie-accept-btn');
        const declineBtn = document.getElementById('cookie-decline-btn');
        const COOKIE_CONSENT_KEY = 'tradlyst_cookie_consent';

        const hideBanner = () => cookieBanner.classList.remove('is-visible');
        const showBanner = () => setTimeout(() => cookieBanner.classList.add('is-visible'), 100);

        const handleConsent = (consent) => {
            try {
                localStorage.setItem(COOKIE_CONSENT_KEY, consent);
                hideBanner();
            } catch (error) {
                // Cookie consent could not be saved
            }
        };

        acceptBtn?.addEventListener('click', () => handleConsent('accepted'));
        declineBtn?.addEventListener('click', () => handleConsent('declined'));

        try {
            if (!localStorage.getItem(COOKIE_CONSENT_KEY)) showBanner();
        } catch (error) {
            // localStorage not accessible, show banner
            showBanner();
        }
    }
});
