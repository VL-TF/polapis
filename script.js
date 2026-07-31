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

    const viewport = carouselContainer.querySelector('.carousel-viewport');
    if (!viewport) return;

    const track = viewport.querySelector('.carousel-track');
    if (!track) return;

    const slides = track.querySelectorAll('.carousel-slide');
    if (slides.length === 0) return;

    const prevBtn = carouselContainer.querySelector('.carousel-prev');
    const nextBtn = carouselContainer.querySelector('.carousel-next');
    const dotsContainer = carouselContainer.querySelector('.carousel-dots');
    if (!dotsContainer) return;

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

    // Pause on focus
    carouselContainer.addEventListener('focusin', stopAutoPlay);
    carouselContainer.addEventListener('focusout', startAutoPlay);

    if (prevBtn) {
        prevBtn.addEventListener('click', () => goToSlide(currentIndex - 1));
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => goToSlide(currentIndex + 1));
    }

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

// Status lookup form functionality
const statusForm = document.querySelector('.status-form');
if (statusForm) {
    const checkBtn = statusForm.querySelector('.btn-blue');
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
