// Make step items visible on page load
document.addEventListener('DOMContentLoaded', function() {
    const stepItems = document.querySelectorAll('.step-item');
    stepItems.forEach((item, index) => {
        setTimeout(() => {
            item.classList.add('visible');
        }, index * 1500);
    });
});

// Expandable Cards functionality
document.querySelectorAll('.expandable-card').forEach(card => {
    const header = card.querySelector('.card-header');
    const content = card.querySelector('.card-content');
    const icon = card.querySelector('.expand-icon');
    
    header.addEventListener('click', () => {
        const isExpanded = content.style.display === 'block';
        
        // Close all other cards
        document.querySelectorAll('.expandable-card').forEach(otherCard => {
            if (otherCard !== card) {
                otherCard.querySelector('.card-content').style.display = 'none';
                otherCard.querySelector('.expand-icon').textContent = '+';
            }
        });
        
        // Toggle current card
        content.style.display = isExpanded ? 'none' : 'block';
        icon.textContent = isExpanded ? '+' : '−';
    });
});

// Situation Quiz functionality
let currentSituation = 1;
const totalSituations = 8;

document.querySelectorAll('.situation-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const isCorrect = this.dataset.correct === 'true';
        const resultDiv = this.closest('.situation-item').querySelector('.situation-result');
        
        // Hide buttons
        this.closest('.situation-buttons').style.display = 'none';
        
        // Show result
        resultDiv.classList.remove('hidden');
        
        if (!isCorrect) {
            resultDiv.querySelector('p').innerHTML = '<strong>Neteisingai!</strong> ' + resultDiv.querySelector('p').innerHTML.split('</strong>')[1];
        }
    });
});

document.querySelectorAll('.btn-next-situation').forEach(btn => {
    btn.addEventListener('click', function() {
        const currentItem = this.closest('.situation-item');
        currentItem.classList.remove('active');
        
        currentSituation++;
        if (currentSituation > totalSituations) {
            currentSituation = 1;
        }
        
        const nextItem = document.querySelector(`.situation-item[data-scenario="${currentSituation}"]`);
        nextItem.classList.add('active');
        
        // Reset the previous item
        currentItem.querySelector('.situation-buttons').style.display = 'flex';
        currentItem.querySelector('.situation-result').classList.add('hidden');
    });
});

document.querySelectorAll('.btn-restart-quiz').forEach(btn => {
    btn.addEventListener('click', function() {
        const currentItem = this.closest('.situation-item');
        currentItem.classList.remove('active');
        
        currentSituation = 1;
        const firstItem = document.querySelector(`.situation-item[data-scenario="1"]`);
        firstItem.classList.add('active');
        
        // Reset all items
        document.querySelectorAll('.situation-item').forEach(item => {
            item.querySelector('.situation-buttons').style.display = 'flex';
            item.querySelector('.situation-result').classList.add('hidden');
        });
    });
});

// Emoji Quiz functionality
let currentEmoji = 1;
const totalEmojis = 8;

document.querySelectorAll('.emoji-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const selectedEmoji = this.dataset.emoji;
        const resultDiv = this.closest('.emoji-item').querySelector('.emoji-result');
        
        // Hide emoji options
        this.closest('.emoji-options').style.display = 'none';
        
        // Show result (any emoji selection is considered correct for this supportive quiz)
        resultDiv.classList.remove('hidden');
    });
});

document.querySelectorAll('.btn-next-emoji').forEach(btn => {
    btn.addEventListener('click', function() {
        const currentItem = this.closest('.emoji-item');
        currentItem.classList.remove('active');
        
        currentEmoji++;
        if (currentEmoji > totalEmojis) {
            currentEmoji = 1;
        }
        
        const nextItem = document.querySelector(`.emoji-item[data-situation="${currentEmoji}"]`);
        nextItem.classList.add('active');
        
        // Reset the previous item
        currentItem.querySelector('.emoji-options').style.display = 'flex';
        currentItem.querySelector('.emoji-result').classList.add('hidden');
    });
});

document.querySelectorAll('.btn-restart-emoji').forEach(btn => {
    btn.addEventListener('click', function() {
        const currentItem = this.closest('.emoji-item');
        currentItem.classList.remove('active');
        
        currentEmoji = 1;
        const firstItem = document.querySelector(`.emoji-item[data-situation="1"]`);
        firstItem.classList.add('active');
        
        // Reset all items
        document.querySelectorAll('.emoji-item').forEach(item => {
            item.querySelector('.emoji-options').style.display = 'flex';
            item.querySelector('.emoji-result').classList.add('hidden');
        });
    });
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
