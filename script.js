// Best Sellers - JavaScript

document.addEventListener('DOMContentLoaded', () => {
  generateStars();
  setupImageHover();
  setupShowMore();
  setupAnimations();
});

// Generate star SVGs for all .stars containers
function generateStars() {
  const starPath = `M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z`;
  const fullStar = `<svg width="12" height="12" fill="currentColor" viewBox="0 0 20 20"><path d="${starPath}"/></svg>`;
  const emptyStar = `<svg width="12" height="12" class="star-empty" fill="currentColor" viewBox="0 0 20 20"><path d="${starPath}"/></svg>`;
  const halfStar = `<span class="star-half"><svg class="star-half-filled" width="12" height="12" fill="currentColor" viewBox="0 0 20 20"><path d="${starPath}"/></svg><svg class="star-half-empty" width="12" height="12" fill="currentColor" viewBox="0 0 20 20"><path d="${starPath}"/></svg></span>`;

  document.querySelectorAll('.stars').forEach(container => {
    const rating = parseFloat(container.dataset.rating || '5');
    const full = Math.floor(rating);
    const hasHalf = rating % 1 !== 0;
    const empty = 5 - full - (hasHalf ? 1 : 0);
    container.innerHTML = fullStar.repeat(full) + (hasHalf ? halfStar : '') + emptyStar.repeat(empty);
  });
}

// Image hover swap
function setupImageHover() {
  document.querySelectorAll('.product-card').forEach(card => {
    const primary = card.querySelector('.product-img-primary');
    const secondary = card.querySelector('.product-img-secondary');
    if (!primary || !secondary) return;

    card.addEventListener('mouseenter', () => {
      primary.style.opacity = '0';
      secondary.style.opacity = '1';
    });

    card.addEventListener('mouseleave', () => {
      primary.style.opacity = '1';
      secondary.style.opacity = '0';
    });
  });
}

// Show More toggle for mobile
function setupShowMore() {
  const btn = document.getElementById('show-more-btn');
  const hiddenCards = document.querySelectorAll('.mobile-hidden');
  if (!btn || hiddenCards.length === 0) return;

  let expanded = false;

  btn.addEventListener('click', () => {
    expanded = !expanded;

    if (expanded) {
      hiddenCards.forEach((card, i) => {
        card.style.display = 'block';
        card.classList.remove('opacity-0');
        // Stagger the reveal animation
        setTimeout(() => {
          card.classList.add('revealed');
        }, i * 80);
      });
      btn.textContent = 'Show Less';
    } else {
      hiddenCards.forEach(card => {
        card.classList.remove('revealed');
      });
      // Wait for transition to finish before hiding
      setTimeout(() => {
        hiddenCards.forEach(card => {
          if (!expanded) {
            card.style.display = 'none';
          }
        });
      }, 500);
      btn.textContent = 'Show More';
    }
  });
}

// Page load animations
function setupAnimations() {
  // Remove flash of unstyled content delay for title
  const title = document.querySelector('h2');
  if (title) {
    setTimeout(() => {
      title.classList.remove('opacity-0');
    }, 100);
  }

  // Stagger animate in cards
  const cards = document.querySelectorAll('.product-card');
  let visibleIndex = 0;

  cards.forEach((card) => {
    // Only animate cards currently visible (handles desktop vs mobile logic)
    if (getComputedStyle(card).display !== 'none') {
      setTimeout(() => {
        card.classList.remove('opacity-0');
        card.classList.add('animate-fade-in-up');
      }, 150 + (visibleIndex * 80));
      visibleIndex++;
    }
  });
}
