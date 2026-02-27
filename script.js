// Best Sellers - JavaScript

document.addEventListener('DOMContentLoaded', () => {
  generateStars();
  setupImageHover();
  setupShowMore();
  setupAnimations();
  setupCustomScrollbar();
});

// Generate star SVGs for all .stars containers
function generateStars() {
  const starPath = `M5.53568 0.0730128C5.33151 -0.0243376 5.0943 -0.0243376 4.89012 0.0730128C4.71361 0.15717 4.6163 0.303289 4.56722 0.38345C4.51648 0.466319 4.4644 0.571883 4.41364 0.674777L3.33577 2.85842L0.924746 3.21082C0.81125 3.22739 0.694796 3.24439 0.600339 3.2671C0.508958 3.28908 0.340003 3.3366 0.205548 3.47852C0.0500022 3.6427 -0.0231489 3.86831 0.0064613 4.09253C0.0320567 4.28635 0.140979 4.42397 0.202079 4.49538C0.265238 4.5692 0.349563 4.6513 0.431745 4.73132L2.17564 6.42987L1.76416 8.82901C1.74473 8.94213 1.72481 9.05818 1.71714 9.15506C1.70972 9.24877 1.70254 9.42422 1.79589 9.59608C1.90387 9.79487 2.09581 9.93431 2.31824 9.97554C2.51055 10.0112 2.67519 9.95013 2.76201 9.91411C2.85178 9.87686 2.95599 9.82203 3.05757 9.76858L5.2129 8.63511L7.36824 9.76859C7.46982 9.82203 7.57403 9.87686 7.6638 9.91411C7.75062 9.95013 7.91526 10.0112 8.10756 9.97554C8.33 9.93431 8.52194 9.79487 8.62991 9.59608C8.72326 9.42422 8.71609 9.24877 8.70867 9.15506C8.701 9.05818 8.68107 8.94214 8.66165 8.82903L8.25016 6.42987L9.99408 4.7313C10.0763 4.65129 10.1606 4.5692 10.2237 4.49538C10.2848 4.42397 10.3937 4.28635 10.4193 4.09253C10.449 3.86831 10.3758 3.6427 10.2203 3.47852C10.0858 3.3366 9.91685 3.28908 9.82547 3.2671C9.73101 3.24439 9.61455 3.22739 9.50106 3.21082L7.09003 2.85842L6.01219 0.674815C5.96142 0.571914 5.90933 0.466325 5.85859 0.38345C5.80951 0.303289 5.71219 0.15717 5.53568 0.0730128Z`;
  const fullStar = `<svg width="11" height="10" viewBox="0 0 11 10" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="${starPath}" fill="#231F20"/></svg>`;
  const emptyStar = `<svg width="11" height="10" class="star-empty" style="transform: rotate(50deg); transform-origin: center;" viewBox="0 0 11 10" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="${starPath}" fill="#D1D5DB"/></svg>`;

  document.querySelectorAll('.stars').forEach(container => {
    const rating = parseFloat(container.dataset.rating || '5');
    const full = Math.floor(rating);
    const fraction = rating % 1;
    const hasPartial = fraction > 0;
    const empty = 5 - full - (hasPartial ? 1 : 0);

    let partialHtml = '';
    if (hasPartial) {
      const percentage = fraction * 100;
      const emptyPercentage = 100 - percentage;
      partialHtml = `<span class="star-partial" style="position: relative; display: inline-flex; align-items: center; justify-content: center; width: 11px; height: 10px;">
        <svg class="star-partial-empty" style="position: absolute; transform: rotate(50deg); transform-origin: center;" width="11" height="10" viewBox="0 0 11 10" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="${starPath}" fill="#D1D5DB"/></svg>
        <span style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; clip-path: inset(0 ${emptyPercentage}% 0 0);">
            <svg class="star-partial-filled" style="transform: rotate(50deg); transform-origin: center;" width="11" height="10" viewBox="0 0 11 10" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="${starPath}" fill="#231F20"/></svg>
        </span>
      </span>`;
    }

    container.innerHTML = fullStar.repeat(full) + partialHtml + emptyStar.repeat(empty);
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

  const shopAll = document.getElementById('shop-all-link');
  if (shopAll) {
    setTimeout(() => {
      shopAll.classList.remove('opacity-0');
      shopAll.classList.add('animate-fade-in');
    }, 200);
  }

  // Stagger animate in cards
  const cards = document.querySelectorAll('.product-card');
  const isMobile = window.innerWidth < 768;

  cards.forEach((card, index) => {
    // On mobile: only animate first 4 cards
    // On desktop: animate all cards
    const shouldAnimate = !isMobile || !card.classList.contains('mobile-hidden');

    if (shouldAnimate) {
      setTimeout(() => {
        card.classList.add('animate-fade-in-up');
      }, 300 + (index * 120));
    }
  });

  const track = document.getElementById('custom-scrollbar-track');
  const thumb = document.getElementById('custom-scrollbar-thumb');

  if (track && thumb) {
    // Trigger scrollbar animations shortly after cards START loading
    const trackDelay = 300; // Trigger while cards are staggering in
    setTimeout(() => {
      // Draw track
      track.classList.remove('opacity-0');
      track.classList.add('animate-draw-width');

      // Fade in thumb at the EXACT same time
      thumb.classList.remove('opacity-0');
      thumb.classList.add('animate-fade-in');
    }, trackDelay);
  }
}

// Custom scrollbar logic
function setupCustomScrollbar() {
  const container = document.getElementById('products-container');
  const track = document.getElementById('custom-scrollbar-track');
  const thumb = document.getElementById('custom-scrollbar-thumb');

  if (!container || !track || !thumb) return;

  function updateThumbPosition() {
    const scrollMax = container.scrollWidth - container.clientWidth;
    if (scrollMax <= 0) {
      track.style.display = 'none';
      return;
    } else {
      track.style.display = ''; // revert to default responsive class display
    }

    const trackMax = track.clientWidth - thumb.clientWidth;
    const scrollRatio = container.scrollLeft / scrollMax;
    thumb.style.transform = `translateX(${scrollRatio * trackMax}px)`;
  }

  container.addEventListener('scroll', () => {
    if (!isDragging) {
      updateThumbPosition();
    }
  });
  window.addEventListener('resize', updateThumbPosition);
  // Give it a small timeout to let images load / layout settle
  setTimeout(updateThumbPosition, 100);

  // Drag logic
  let isDragging = false;
  let startX;
  let scrollLeftStart;

  track.addEventListener('mousedown', (e) => {
    isDragging = true;
    document.body.style.userSelect = 'none'; // prevent text selection
    thumb.classList.add('grabbing');
    track.classList.add('is-dragging');

    // If they clicked the track outside the thumb, jump to that position first
    if (e.target !== thumb) {
      const trackRect = track.getBoundingClientRect();
      const clickX = e.clientX - trackRect.left;
      const trackMax = track.clientWidth - thumb.clientWidth;
      const scrollMax = container.scrollWidth - container.clientWidth;

      // Calculate where the center of the thumb should be
      let thumbLeft = clickX - (thumb.clientWidth / 2);

      // Keep it within bounds
      if (thumbLeft < 0) thumbLeft = 0;
      if (thumbLeft > trackMax) thumbLeft = trackMax;

      const scrollRatio = thumbLeft / trackMax;
      container.scrollLeft = scrollRatio * scrollMax;

      // Instantly update thumb DOM matching new scroll ratio
      thumb.style.transform = `translateX(${scrollRatio * trackMax}px)`;
    }

    startX = e.pageX;
    scrollLeftStart = container.scrollLeft;
  });

  document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    const dx = e.pageX - startX;
    const scrollMax = container.scrollWidth - container.clientWidth;
    const trackMax = track.clientWidth - thumb.clientWidth;

    if (trackMax > 0) {
      // Convert thumb movement back to scroll movement
      const scrollDx = (dx / trackMax) * scrollMax;
      container.scrollLeft = scrollLeftStart + scrollDx;
      // Also instantly update thumb position visually to avoid lag
      const scrollRatio = container.scrollLeft / scrollMax;
      thumb.style.transform = `translateX(${scrollRatio * trackMax}px)`;
    }
  });

  document.addEventListener('mouseup', () => {
    if (isDragging) {
      isDragging = false;
      document.body.style.userSelect = '';
      thumb.classList.remove('grabbing');
      track.classList.remove('is-dragging');
    }
  });
}
