// Make step items visible when section is in viewport
const observerOptions = {
    threshold: 0.3
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const stepItems = entry.target.querySelectorAll('.step-item');
            stepItems.forEach((item, index) => {
                setTimeout(() => {
                    item.classList.add('visible');
                }, index * 1500);
            });
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

const aboutSection = document.querySelector('.about-service-merged');
if (aboutSection) {
    observer.observe(aboutSection);
}

// Category data object
const categories = [
    {
        icon: '�',
        title: 'Elektroninės patyčios',
        description: 'Pasikartojantis žmogaus žeminimas, bauginimas ar persekiojimas internete.',
        examples: [
            'nuolatiniai grasinantys komentarai',
            'koordinuotas užgauliojimas',
            'netikra paskyra žmogui pažeminti',
            'privataus turinio naudojimas šantažui'
        ]
    },
    {
        icon: '⚠️',
        title: 'Vieši grasinimai',
        description: 'Viešai paskelbti grasinimai rimtai pakenkti žmogui.',
        examples: [
            'grasinimai sumušti',
            'grasinimai nužudyti',
            'grasinimai vaikui',
            'grasinimai šeimos nariams'
        ]
    },
    {
        icon: '🫂',
        title: 'Turinys, skatinantis savižudybę ar savęs žalojimą',
        description: 'Turinys, kuris skatina ar romantizuoja savęs žalojimą.',
        examples: [
            'raginimai nusižudyti',
            'savęs žalojimo instrukcijos',
            'savęs žalojimo šlovinimas',
            'pavojingi iššūkiai'
        ]
    },
    {
        icon: '�',
        title: 'Neapykantos kalba / kurstymas prieš tam tikrą žmonių grupę',
        description: 'Turinys, kuris kursto neapykantą ar smurtą prieš žmonių grupę.',
        examples: [
            'rasistiniai pasisakymai',
            'antisemitinis turinys',
            'homofobiniai išpuoliai',
            'raginimai smurtauti'
        ]
    },
    {
        icon: '�',
        title: 'Įžeidžiantis ar žalingas turinys nepilnamečiams',
        description: 'Turinys, galintis rimtai pakenkti vaikų gerovei.',
        examples: [
            'vaiko seksualizavimas',
            'nuogo vaiko atvaizdo viešinimas',
            'itin žiaurus turinys',
            'nepilnamečių išnaudojimas'
        ]
    },
    {
        icon: '🛑',
        title: 'Smurtas',
        description: 'Smurtinis arba itin žiaurus turinys.',
        examples: [
            'sumušimų vaizdo įrašai',
            'smurtas prieš vaiką',
            'kankinimai',
            'raginimai smurtauti'
        ]
    },
    {
        icon: '🎯',
        title: 'Pavojingi internetiniai iššūkiai',
        description: 'Internete platinami iššūkiai, galintys sukelti rimtą žalą.',
        examples: [
            'smaugimo iššūkiai',
            'pavojingas vaistų vartojimas',
            'šokinėjimas nuo aukščio',
            'iššūkiai su ugnimi'
        ]
    },
    {
        icon: '📋',
        title: 'Kita',
        description: 'Kitas viešai prieinamas žalingas arba galimai neteisėtas turinys.',
        examples: [
            'vaiko privatumo pažeidimai',
            'apsimetimas kitu asmeniu',
            'intymaus turinio platinimas be sutikimo',
            'kiti rimti pažeidimai'
        ]
    }
];

// Dynamically generate category cards
function generateCategoryCards() {
    const grid = document.getElementById('categories-grid');
    if (!grid) return;

    categories.forEach((category, index) => {
        const card = document.createElement('div');
        card.className = 'category-card';
        
        const examplesList = category.examples.map(ex => `<li>${ex}</li>`).join('');
        
        card.innerHTML = `
            <div class="category-icon">${category.icon}</div>
            <h3>${category.title}</h3>
            <p>${category.description}</p>
            <button class="expand-btn" aria-expanded="false" aria-controls="examples-${index}" tabindex="0">+</button>
            <div class="category-examples" id="examples-${index}" style="display: none;">
                <strong>Pavyzdžiai:</strong>
                <ul>${examplesList}</ul>
            </div>
        `;
        
        grid.appendChild(card);
        
        // Add accordion functionality
        const expandBtn = card.querySelector('.expand-btn');
        const examplesDiv = card.querySelector('.category-examples');
        
        expandBtn.addEventListener('click', () => {
            const isExpanded = expandBtn.getAttribute('aria-expanded') === 'true';
            expandBtn.setAttribute('aria-expanded', !isExpanded);
            expandBtn.textContent = isExpanded ? '+' : '−';
            examplesDiv.style.display = isExpanded ? 'none' : 'block';
        });
        
        // Keyboard support
        expandBtn.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                expandBtn.click();
            }
        });
    });
}

// Initialize category cards
document.addEventListener('DOMContentLoaded', () => {
    generateCategoryCards();
    initCarousel();
});

// Carousel functionality
function initCarousel() {
    const carouselContainer = document.querySelector('.carousel-container');
    if (!carouselContainer) return;

    const track = carouselContainer.querySelector('.carousel-track');
    const slides = track.querySelectorAll('.carousel-slide');
    const prevBtn = carouselContainer.querySelector('.carousel-prev');
    const nextBtn = carouselContainer.querySelector('.carousel-next');
    const dotsContainer = carouselContainer.querySelector('.carousel-dots');

    let currentIndex = 0;
    const totalSlides = slides.length;
    let autoPlayInterval;
    const autoPlayDelay = 5000; // 5 seconds

    // Create dots
    slides.forEach((_, index) => {
        const dot = document.createElement('button');
        dot.className = 'carousel-dot';
        dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });

    const dots = dotsContainer.querySelectorAll('.carousel-dot');

    function goToSlide(index) {
        if (index < 0) index = totalSlides - 1;
        if (index >= totalSlides) index = 0;
        
        currentIndex = index;
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
        
        // Update dots
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentIndex);
        });
        
        // Reset auto-play timer
        resetAutoPlay();
    }

    function startAutoPlay() {
        autoPlayInterval = setInterval(() => {
            goToSlide(currentIndex + 1);
        }, autoPlayDelay);
    }

    function stopAutoPlay() {
        clearInterval(autoPlayInterval);
    }

    function resetAutoPlay() {
        stopAutoPlay();
        startAutoPlay();
    }

    // Start auto-play
    startAutoPlay();

    // Pause on hover
    carouselContainer.addEventListener('mouseenter', stopAutoPlay);
    carouselContainer.addEventListener('mouseleave', startAutoPlay);

    prevBtn.addEventListener('click', () => goToSlide(currentIndex - 1));
    nextBtn.addEventListener('click', () => goToSlide(currentIndex + 1));

    // Keyboard navigation
    carouselContainer.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            goToSlide(currentIndex - 1);
        } else if (e.key === 'ArrowRight') {
            goToSlide(currentIndex + 1);
        }
    });

    // Touch/swipe support
    let touchStartX = 0;
    let touchEndX = 0;

    track.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    track.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                goToSlide(currentIndex + 1);
            } else {
                goToSlide(currentIndex - 1);
            }
        }
    }
}

// Expandable Cards functionality
document.querySelectorAll('.expandable-card').forEach(card => {
    const header = card.querySelector('.card-header');
    const content = card.querySelector('.card-content');
    const icon = card.querySelector('.expand-icon');
    
    header.addEventListener('click', () => {
        const isExpanded = content.style.display === 'block';
        
        // Toggle current card
        content.style.display = isExpanded ? 'none' : 'block';
        icon.textContent = isExpanded ? '+' : '−';
    });
});

// Prevent learning card from closing when clicking the link
const learningLink = document.querySelector('.learning-cta');

if (learningLink) {
    learningLink.addEventListener('click', function (event) {
        event.stopPropagation();
    });
}

// Tooltip ARIA management for accessibility
document.querySelectorAll('.tooltip-trigger').forEach(trigger => {
    const tooltipContent = trigger.nextElementSibling;
    
    // Update ARIA attributes on hover
    trigger.addEventListener('mouseenter', () => {
        tooltipContent.setAttribute('aria-hidden', 'false');
    });
    
    trigger.addEventListener('mouseleave', () => {
        tooltipContent.setAttribute('aria-hidden', 'true');
    });
    
    // Update ARIA attributes on focus
    trigger.addEventListener('focus', () => {
        tooltipContent.setAttribute('aria-hidden', 'false');
    });
    
    trigger.addEventListener('blur', () => {
        tooltipContent.setAttribute('aria-hidden', 'true');
    });
    
    // Mobile tap functionality - add class for visual display
    trigger.addEventListener('click', (e) => {
        e.stopPropagation();
        const isHidden = tooltipContent.getAttribute('aria-hidden') === 'true';
        tooltipContent.setAttribute('aria-hidden', isHidden ? 'false' : 'true');
        
        // Toggle class for mobile visual display
        if (isHidden) {
            tooltipContent.classList.add('visible');
        } else {
            tooltipContent.classList.remove('visible');
        }
    });
});

// Close tooltips when clicking outside (mobile)
document.addEventListener('click', (e) => {
    if (!e.target.closest('.tooltip')) {
        document.querySelectorAll('.tooltip-content').forEach(content => {
            content.setAttribute('aria-hidden', 'true');
            content.classList.remove('visible');
        });
    }
});

// Status lookup form functionality
const statusForm = document.querySelector('.status-form');
if (statusForm) {
    const checkBtn = statusForm.querySelector('.btn-primary');
    const statusInput = statusForm.querySelector('.status-input');
    
    checkBtn.addEventListener('click', function() {
        const reportId = statusInput.value.trim();
        if (reportId) {
            alert(`Pranešimo būsena: ${reportId}\n\nŠi funkcija bus sujungta su duomenų baze vėliau.`);
        } else {
            alert('Prašome įvesti pranešimo ID');
        }
    });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
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
