// ===================================
// INDIAN WEDDING WEBSITE - ENHANCED
// ===================================

// Global Variables
let scrollOpened = false;
let currentScene = 0;
const scenes = ['scene-elephants', 'scene-entry'];

// ===================================
// INITIALIZATION
// ===================================
document.addEventListener('DOMContentLoaded', function() {
    initOpeningScroll();
    initMusicPlayer();
    initCountdown();
    initMapToggles();
    initFlowerRain();
});

// ===================================
// OPENING SCROLL ANIMATION
// ===================================
function initOpeningScroll() {
    const openingLayer = document.getElementById('opening-layer');
    const scrollContainer = document.querySelector('.scroll-container');
    const globalOverlay = document.getElementById('global-overlay');
    const mainContent = document.getElementById('main-content');
    const hangingDecor = document.querySelector('.hanging-decor');
    const rainContainer = document.getElementById('rain-container');
    const animationStage = document.getElementById('animation-stage');
    const backgroundMusic = document.getElementById('background-music');
    const musicToggle = document.getElementById('music-toggle');
    
    // Click to open scroll
    openingLayer.addEventListener('click', function() {
        if (!scrollOpened) {
            scrollOpened = true;
            
            // Auto-play music
            if (backgroundMusic) {
                backgroundMusic.play().then(function() {
                    if (musicToggle) {
                        musicToggle.classList.add('playing');
                        musicToggle.innerHTML = '<i class="fas fa-pause"></i>';
                    }
                }).catch(function(error) {
                    console.log('Audio autoplay failed:', error);
                });
            }
            
            // Add open state class
            scrollContainer.classList.add('open-state');
            
            // Hide tap hint
            document.querySelector('.tap-hint').style.opacity = '0';
            
            // After scroll opens, fade out opening layer
            setTimeout(function() {
                openingLayer.style.opacity = '0';
                
                setTimeout(function() {
                    openingLayer.style.display = 'none';
                    
                    // Show main content
                    mainContent.classList.add('show-content');
                    
                    // Clear the overlay
                    globalOverlay.classList.add('clear-view');
                    
                    // Show decorations
                    if (hangingDecor) hangingDecor.classList.remove('hidden');
                    if (rainContainer) rainContainer.style.display = 'block';
                    if (animationStage) animationStage.style.display = 'block';
                    
                    // Start flower rain
                    startFlowerRain();
                    
                    // Start scene rotation
                    startSceneRotation();
                    
                    // Add fade-in animations to cards
                    addScrollAnimations();
                }, 1000);
            }, 2000);
        }
    });
}

// ===================================
// FLOWER PETAL RAIN
// ===================================
function initFlowerRain() {
    // Initialization placeholder
}

function startFlowerRain() {
    const rainContainer = document.getElementById('rain-container');
    if (!rainContainer) return;
    
    const petalTypes = ['marigold', 'rose'];
    
    function createPetal() {
        const petal = document.createElement('div');
        petal.className = 'flower-petal ' + petalTypes[Math.floor(Math.random() * petalTypes.length)];
        petal.style.left = Math.random() * 100 + '%';
        petal.style.animationDuration = (Math.random() * 0.2 + 8) + 's';
        petal.style.animationDelay = Math.random() * 0.1 + 's';
        
        rainContainer.appendChild(petal);
        
        // Remove petal after animation
        setTimeout(function() {
            petal.remove();
        }, 15000);
    }
    
    // Create initial petals
    for (let i = 0; i < 50; i++) {
        setTimeout(createPetal, i * 200);
    }
    
    // Continuously create petals (more frequently)
    setInterval(createPetal, 1000);
}

// ===================================
// SCENE ROTATION (Elephants & Couple)
// ===================================
function startSceneRotation() {
    const sceneElements = document.querySelectorAll('.scene');
    
    function rotateScenes() {
        // Hide all scenes
        sceneElements.forEach(scene => scene.classList.remove('active'));
        
        // Show current scene
        if (sceneElements[currentScene]) {
            sceneElements[currentScene].classList.add('active');
        }
        
        // Move to next scene
        currentScene = (currentScene + 1) % sceneElements.length;
    }
    
    // Start with first scene
    rotateScenes();
    
    // Rotate scenes every 8 seconds
    setInterval(rotateScenes, 8000);
}

// ===================================
// MUSIC PLAYER
// ===================================
function initMusicPlayer() {
    const musicToggle = document.getElementById('music-toggle');
    const backgroundMusic = document.getElementById('background-music');
    let isPlaying = false;
    
    if (!musicToggle || !backgroundMusic) return;
    
    musicToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        
        if (isPlaying) {
            backgroundMusic.pause();
            musicToggle.classList.remove('playing');
            musicToggle.innerHTML = '<i class="fas fa-music"></i>';
            isPlaying = false;
        } else {
            backgroundMusic.play().then(function() {
                musicToggle.classList.add('playing');
                musicToggle.innerHTML = '<i class="fas fa-pause"></i>';
                isPlaying = true;
            }).catch(function(error) {
                console.log('Audio play failed:', error);
            });
        }
    });
}

// ===================================
// COUNTDOWN TIMER
// ===================================
function initCountdown() {
    const weddingDate = new Date('2026-05-08T10:00:00+05:30').getTime();
    
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = weddingDate - now;
        
        if (distance < 0) {
            document.getElementById('days').textContent = '00';
            document.getElementById('hours').textContent = '00';
            document.getElementById('minutes').textContent = '00';
            document.getElementById('seconds').textContent = '00';
            return;
        }
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        document.getElementById('days').textContent = String(days).padStart(2, '0');
        document.getElementById('hours').textContent = String(hours).padStart(2, '0');
        document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
        document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
    }
    
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// ===================================
// MAP TOGGLES
// ===================================
function initMapToggles() {
    // Map toggle functionality is handled by inline onclick
}

function toggleMap(iconElement) {
    const eventItem = iconElement.closest('.event-item');
    if (!eventItem) return;
    
    const mapEmbed = eventItem.querySelector('.map-embed');
    if (!mapEmbed) return;
    
    const icon = iconElement.querySelector('i');
    
    if (mapEmbed.classList.contains('open')) {
        mapEmbed.classList.remove('open');
        icon.className = 'fas fa-map';
    } else {
        // Close all other maps first
        document.querySelectorAll('.map-embed.open').forEach(function(map) {
            map.classList.remove('open');
            const otherIcon = map.closest('.event-item').querySelector('.map-icon i');
            if (otherIcon) otherIcon.className = 'fas fa-map';
        });
        
        mapEmbed.classList.add('open');
        icon.className = 'fas fa-times';
    }
}

// ===================================
// SCROLL ANIMATIONS
// ===================================
function addScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe cards
    const cards = document.querySelectorAll('.date-card, .hero-card, .thankyou-card, .invite-msg');
    cards.forEach(function(card) {
        observer.observe(card);
    });
}

// ===================================
// SPARKLE EFFECTS
// ===================================
function createSparkle(x, y) {
    const sparkle = document.createElement('div');
    sparkle.textContent = '✨';
    sparkle.style.position = 'fixed';
    sparkle.style.left = x + 'px';
    sparkle.style.top = y + 'px';
    sparkle.style.fontSize = '24px';
    sparkle.style.pointerEvents = 'none';
    sparkle.style.zIndex = '9999';
    sparkle.style.animation = 'sparkleFloat 1.5s ease-out forwards';
    
    document.body.appendChild(sparkle);
    
    setTimeout(function() {
        sparkle.remove();
    }, 1500);
}

// Add sparkle animation to CSS dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes sparkleFloat {
        0% {
            transform: translateY(0) scale(0);
            opacity: 1;
        }
        100% {
            transform: translateY(-60px) scale(1.5);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Add sparkle effects to special elements
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(function() {
        const sparkleElements = document.querySelectorAll('.cd-box, .family-photo-container, .ev-title');
        sparkleElements.forEach(function(element) {
            element.addEventListener('mouseenter', function(e) {
                const rect = element.getBoundingClientRect();
                const x = rect.left + rect.width / 2;
                const y = rect.top + rect.height / 2;
                createSparkle(x, y);
            });
        });
    }, 3000);
});

// ===================================
// CONFETTI CELEBRATION
// ===================================
function createConfetti() {
    const colors = ['#d4af37', '#ffd700', '#ff69b4', '#87ceeb', '#98fb98', '#ffca28', '#ef5350'];
    const confettiCount = 100;
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.top = '-10px';
        confetti.style.opacity = Math.random();
        confetti.style.transform = 'rotate(' + Math.random() * 360 + 'deg)';
        confetti.style.zIndex = '9999';
        confetti.style.pointerEvents = 'none';
        confetti.style.borderRadius = '50%';
        
        document.body.appendChild(confetti);
        
        const duration = Math.random() * 3 + 2;
        const delay = Math.random() * 0.5;
        
        confetti.animate([
            {
                transform: 'translateY(0) rotate(0deg)',
                opacity: 1
            },
            {
                transform: 'translateY(' + (window.innerHeight + 20) + 'px) rotate(' + (Math.random() * 720) + 'deg)',
                opacity: 0
            }
        ], {
            duration: duration * 1000,
            delay: delay * 1000,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        });
        
        setTimeout(function() {
            confetti.remove();
        }, (duration + delay) * 1000);
    }
}

// Trigger confetti on countdown boxes click
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(function() {
        const countdownBoxes = document.querySelectorAll('.cd-box');
        let clickCount = 0;
        
        countdownBoxes.forEach(function(box) {
            box.addEventListener('click', function() {
                clickCount++;
                if (clickCount >= 3) {
                    createConfetti();
                    clickCount = 0;
                }
            });
        });
    }, 3000);
});

// ===================================
// SMOOTH SCROLL
// ===================================
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// ===================================
// PARALLAX EFFECT
// ===================================
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.hero-card, .thankyou-card');
    
    parallaxElements.forEach(function(element) {
        const speed = 0.5;
        const yPos = -(scrolled * speed);
        element.style.transform = 'translateY(' + yPos + 'px)';
    });
});

// ===================================
// RESIZE HANDLER
// ===================================
window.addEventListener('resize', function() {
    // Adjust animations on resize if needed
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile) {
        // Mobile-specific adjustments
        document.querySelectorAll('.umbrella.u2, .umbrella.u3').forEach(function(el) {
            el.style.display = 'none';
        });
    } else {
        document.querySelectorAll('.umbrella.u2, .umbrella.u3').forEach(function(el) {
            el.style.display = 'block';
        });
    }
});

// ===================================
// PERFORMANCE OPTIMIZATION
// ===================================
// Debounce function for scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = function() {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to scroll-heavy operations
const debouncedScroll = debounce(function() {
    // Refresh any scroll-dependent features
}, 250);

window.addEventListener('scroll', debouncedScroll);

// ===================================
// EASTER EGG - CLICK COUPLE NAMES
// ===================================
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(function() {
        const coupleNames = document.querySelector('.couple-names');
        if (coupleNames) {
            let clickCount = 0;
            coupleNames.style.cursor = 'pointer';
            
            coupleNames.addEventListener('click', function() {
                clickCount++;
                if (clickCount === 5) {
                    createConfetti();
                    
                    // Show love message
                    const message = document.createElement('div');
                    message.textContent = '💕 Love is in the air! 💕';
                    message.style.position = 'fixed';
                    message.style.top = '50%';
                    message.style.left = '50%';
                    message.style.transform = 'translate(-50%, -50%)';
                    message.style.fontSize = '3rem';
                    message.style.color = '#d4af37';
                    message.style.zIndex = '10001';
                    message.style.textShadow = '2px 2px 8px rgba(0,0,0,0.8)';
                    message.style.animation = 'pulse 2s ease-in-out';
                    message.style.fontFamily = 'var(--script-font)';
                    message.style.pointerEvents = 'none';
                    
                    document.body.appendChild(message);
                    
                    setTimeout(function() {
                        message.remove();
                    }, 2000);
                    
                    clickCount = 0;
                }
            });
        }
    }, 3000);
});

// ===================================
// CONSOLE MESSAGE
// ===================================
console.log('%c💒 Welcome to Gayathri & Amaresh\'s Wedding! 💒', 
    'font-size: 24px; color: #d4af37; font-weight: bold; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);');
console.log('%c✨ Crafted with love and Indian traditions ✨', 
    'font-size: 16px; color: #800000; font-weight: bold;');
console.log('%c🎉 May your journey together be filled with joy! 🎉', 
    'font-size: 14px; color: #666;');

// ===================================
// PREVENT FORM RESUBMISSION
// ===================================
if (window.history.replaceState) {
    window.history.replaceState(null, null, window.location.href);
}

// ===================================
// IMAGE LAZY LOADING
// ===================================
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                }
                observer.unobserve(img);
            }
        });
    });
    
    const lazyImages = document.querySelectorAll('img[data-src]');
    lazyImages.forEach(function(img) {
        imageObserver.observe(img);
    });
}

// ===================================
// ACCESSIBILITY ENHANCEMENTS
// ===================================
document.addEventListener('DOMContentLoaded', function() {
    // Add keyboard navigation for map toggles
    const mapIcons = document.querySelectorAll('.map-icon');
    mapIcons.forEach(function(icon) {
        icon.setAttribute('tabindex', '0');
        icon.setAttribute('role', 'button');
        icon.setAttribute('aria-label', 'Toggle map');
        
        icon.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleMap(icon);
            }
        });
    });
    
    // Add ARIA labels to countdown
    const countdownBoxes = document.querySelectorAll('.cd-box');
    countdownBoxes.forEach(function(box) {
        const label = box.querySelector('.cd-label').textContent;
        const value = box.querySelector('.cd-num').textContent;
        box.setAttribute('aria-label', value + ' ' + label);
    });
});

// ===================================
// FOOTER VISIBILITY ON SCROLL
// ===================================
function checkFooterVisibility() {
    const footer = document.querySelector('.website-footer');
    if (!footer) return;
    
    const scrollPosition = window.scrollY + window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    
    // Show footer when scrolled to bottom (within 100px)
    if (scrollPosition >= documentHeight - 100) {
        footer.classList.add('visible');
    } else {
        footer.classList.remove('visible');
    }
}

window.addEventListener('scroll', debounce(checkFooterVisibility, 100));
window.addEventListener('resize', debounce(checkFooterVisibility, 100));

// Check on load
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(checkFooterVisibility, 1000);
});

// ===================================
// AUTO SCROLL FUNCTIONALITY
// ===================================
let autoScrollEnabled = false;
let autoScrollInterval = null;

function startAutoScroll() {
    if (autoScrollInterval) return;
    
    autoScrollInterval = setInterval(function() {
        if (autoScrollEnabled) {
            window.scrollBy({
                top: 0.5,
                behavior: 'auto'
            });
            
            // Stop if reached bottom
            if ((window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight) {
                stopAutoScroll();
            }
        }
    }, 20); // Scroll 0.5px every 20ms for ultra-smooth effect
}

function stopAutoScroll() {
    autoScrollEnabled = false;
    if (autoScrollInterval) {
        clearInterval(autoScrollInterval);
        autoScrollInterval = null;
    }
}

// Start auto-scroll after opening animation completes
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(function() {
        if (scrollOpened) {
            autoScrollEnabled = true;
            startAutoScroll();
        }
    }, 5000); // Start 5 seconds after page loads
});

// Stop auto-scroll on any user interaction
document.addEventListener('click', stopAutoScroll);
document.addEventListener('wheel', stopAutoScroll);
document.addEventListener('touchstart', stopAutoScroll);
document.addEventListener('keydown', stopAutoScroll);

// ===================================
// BRIGHTNESS ON SCROLL
// ===================================
function updateBrightness() {
    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    
    // Calculate scroll percentage (0 to 1)
    const scrollPercentage = Math.min(scrollPosition / (documentHeight - windowHeight), 1);
    
    // Calculate opacity: starts at 0.3 (slightly dull), goes to 0 (fully bright)
    // Gradually decreases as user scrolls
    const opacity = Math.max(0, 0.4 - (scrollPercentage * 0.4));
    
    // Apply opacity to the overlay
    const overlay = document.querySelector('body::before');
    if (document.body.style) {
        document.body.style.setProperty('--overlay-opacity', opacity);
    }
    
    // Alternative: directly set on pseudo-element via custom property
    document.documentElement.style.setProperty('--overlay-opacity', opacity);
}

// Update brightness on scroll (no debounce for smooth transition)
window.addEventListener('scroll', updateBrightness);

// Check on load
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(updateBrightness, 1000);
});

// Made with ❤️ for Gayathri & Amaresh

// Made with Bob
