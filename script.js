document.addEventListener('DOMContentLoaded', () => {
  
  // =========================================================================
  // 1. MOBILE MENU TOGGLE
  // =========================================================================
  const menuToggle = document.getElementById('menuToggle');
  const navMenu = document.getElementById('navMenu');
  
  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      navMenu.classList.toggle('open');
      const icon = menuToggle.querySelector('i');
      if (navMenu.classList.contains('open')) {
        icon.className = 'fa-solid fa-xmark';
      } else {
        icon.className = 'fa-solid fa-bars';
      }
    });

    // Close menu when clicking a link
    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        menuToggle.querySelector('i').className = 'fa-solid fa-bars';
      });
    });

    // Close menu when clicking anywhere else
    document.addEventListener('click', (e) => {
      if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
        navMenu.classList.remove('open');
        menuToggle.querySelector('i').className = 'fa-solid fa-bars';
      }
    });
  }

  // =========================================================================
  // 2. SCROLL SPY (HIGHLIGHT ACTIVE NAV LINK)
  // =========================================================================
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const scrollSpyOptions = {
    root: null,
    rootMargin: '-30% 0px -60% 0px', // Trigger when section occupies the middle portion of viewport
    threshold: 0
  };

  const scrollSpyCallback = (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };

  const observer = new IntersectionObserver(scrollSpyCallback, scrollSpyOptions);
  sections.forEach(section => observer.observe(section));

  // =========================================================================
  // 3. CHAPTER 1 TAB SWITCHING (TECHNICAL MODERNIZATION)
  // =========================================================================
  const tabButtons = document.querySelectorAll('#techTabs .tab-btn');
  const tabPanes = document.querySelectorAll('#techContent .tab-pane');

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTab = btn.getAttribute('data-tab');
      
      // Update active button state
      tabButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      // Update active pane state
      tabPanes.forEach(pane => {
        pane.classList.remove('active');
        if (pane.getAttribute('id') === `pane-${targetTab}`) {
          pane.classList.add('active');
        }
      });
    });
  });

  // =========================================================================
  // 4. CNC WORKFLOW GUIDE INTERACTIVE STEPS
  // =========================================================================
  const cncStepIndicators = document.querySelectorAll('#cncStepsNav .cnc-step-indicator');
  const cncStepPanes = document.querySelectorAll('#cncStepsContent .cnc-step-pane');

  cncStepIndicators.forEach(indicator => {
    indicator.addEventListener('click', () => {
      const targetStep = indicator.getAttribute('data-step');

      // Update active indicators
      cncStepIndicators.forEach(ind => ind.classList.remove('active'));
      indicator.classList.add('active');

      // Update active step pane
      cncStepPanes.forEach(pane => {
        pane.classList.remove('active');
        if (pane.getAttribute('id') === `paneStep-${targetStep}`) {
          pane.classList.add('active');
        }
      });
    });
  });

  // =========================================================================
  // 5. ECONOMIC EFFICIENCY CALCULATOR
  // =========================================================================
  const quantitySlider = document.getElementById('quantitySlider');
  const quantityVal = document.getElementById('quantityVal');
  const resHand = document.getElementById('resHand');
  const resPower = document.getElementById('resPower');
  const resCNC = document.getElementById('resCNC');
  const resSaving = document.getElementById('resSaving');

  // Format minutes into a friendly string (e.g. "31.7 ч" or "40 мин")
  function formatMinutes(minutes) {
    if (minutes < 60) {
      return `${minutes} <span>мин</span>`;
    }
    const hours = Math.floor(minutes / 60);
    const remainingMins = minutes % 60;
    if (remainingMins === 0) {
      return `${hours} <span>ч</span>`;
    }
    // Round to one decimal place of hours for display
    const hoursDecimal = (minutes / 60).toFixed(1);
    return `${hoursDecimal} <span>ч</span>`;
  }

  function updateCalculator() {
    const qty = parseInt(quantitySlider.value, 10);
    quantityVal.textContent = qty;

    // Formulas:
    // Hand tools: 190 min per stool (linear)
    const minutesHand = 190 * qty;

    // Power tools: Setup = 20 min, unit = 38 min (matches Q=10 at 400 min, Q=1 at 58 min)
    const minutesPower = 20 + (38 * qty);

    // CNC: Setup = 20 min, unit = 5 min (matches Q=10 at 70 min, Q=1 at 25 min)
    const minutesCNC = 20 + (5 * qty);

    // Update fields
    resHand.innerHTML = formatMinutes(minutesHand);
    resPower.innerHTML = formatMinutes(minutesPower);
    resCNC.innerHTML = formatMinutes(minutesCNC);

    // Calculate savings vs Hand Tools
    const savedMinutes = minutesHand - minutesCNC;
    const savedHours = (savedMinutes / 60).toFixed(1);
    const savingPercent = ((savedMinutes / minutesHand) * 100).toFixed(1);

    resSaving.innerHTML = `<i class="fa-solid fa-square-check"></i> Станки с ЧПУ экономят <strong>${savedHours} ч</strong> рабочего времени (${savingPercent}%)!`;
  }

  if (quantitySlider) {
    quantitySlider.addEventListener('input', updateCalculator);
    // Initial run
    updateCalculator();
  }

  // =========================================================================
  // 6. APPENDIX LIGHTBOX / MODAL VIEWER
  // =========================================================================
  const galleryCards = document.querySelectorAll('.gallery-card');
  const galleryModal = document.getElementById('galleryModal');
  const modalContentWrapper = document.getElementById('modalContentWrapper');
  const modalClose = document.getElementById('modalClose');

  galleryCards.forEach(card => {
    card.addEventListener('click', () => {
      const svg = card.querySelector('svg');
      const captionTitle = card.querySelector('h4').textContent;
      const captionDesc = card.querySelector('p').textContent;
      
      if (svg && galleryModal && modalContentWrapper) {
        // Clear previous content
        modalContentWrapper.innerHTML = '';
        
        // Clone the SVG element
        const clonedSvg = svg.cloneNode(true);
        clonedSvg.style.width = '100%';
        clonedSvg.style.height = 'auto';
        clonedSvg.style.maxHeight = '70vh';
        
        // Create title and description elements
        const titleEl = document.createElement('h3');
        titleEl.textContent = captionTitle;
        titleEl.style.color = '#ffffff';
        titleEl.style.marginTop = '15px';
        titleEl.style.fontFamily = 'var(--font-serif)';
        
        const descEl = document.createElement('p');
        descEl.textContent = captionDesc;
        descEl.style.color = 'var(--text-muted)';
        
        // Append everything
        modalContentWrapper.appendChild(clonedSvg);
        modalContentWrapper.appendChild(titleEl);
        modalContentWrapper.appendChild(descEl);
        
        // Display modal
        galleryModal.style.display = 'flex';
        document.body.style.overflow = 'hidden'; // Lock scroll
      }
    });
  });

  function closeModal() {
    if (galleryModal) {
      galleryModal.style.display = 'none';
      document.body.style.overflow = ''; // Unlock scroll
    }
  }

  if (modalClose) {
    modalClose.addEventListener('click', closeModal);
  }

  if (galleryModal) {
    galleryModal.addEventListener('click', (e) => {
      if (e.target === galleryModal) {
        closeModal();
      }
    });
  }

  // Escape key closes modal
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeModal();
    }
  });

});
