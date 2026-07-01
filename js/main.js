/* ============================================================
   WELLOADED SCHOOLS — main.js
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ----------------------------------------------------------
     1. DARK MODE
  ---------------------------------------------------------- */
  const darkBtn  = document.getElementById('dark-mode-btn');
  const htmlEl   = document.documentElement;
  const saved    = localStorage.getItem('ws-theme');

  if (saved === 'dark') htmlEl.setAttribute('data-theme', 'dark');

  if (darkBtn) {
    darkBtn.addEventListener('click', () => {
      const isDark = htmlEl.getAttribute('data-theme') === 'dark';
      htmlEl.setAttribute('data-theme', isDark ? 'light' : 'dark');
      localStorage.setItem('ws-theme', isDark ? 'light' : 'dark');
      darkBtn.innerHTML = isDark
        ? '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>'
        : '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>';
    });
    // Set correct icon on load
    if (saved === 'dark') {
      darkBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>';
    }
  }

  /* ----------------------------------------------------------
     2. STICKY HEADER
  ---------------------------------------------------------- */
  const header = document.querySelector('.site-header');
  if (header) {
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 20);
    }, { passive: true });
  }

  /* ----------------------------------------------------------
     3. ANNOUNCEMENT BAR CLOSE
  ---------------------------------------------------------- */
  const annBar   = document.getElementById('announcement-bar');
  const annClose = document.getElementById('announcement-close');
  if (annClose && annBar) {
    annClose.addEventListener('click', () => {
      annBar.style.maxHeight = annBar.offsetHeight + 'px';
      annBar.style.overflow  = 'hidden';
      annBar.style.transition = 'max-height 0.3s ease, padding 0.3s ease, opacity 0.3s ease';
      requestAnimationFrame(() => {
        annBar.style.maxHeight = '0';
        annBar.style.padding   = '0';
        annBar.style.opacity   = '0';
      });
      setTimeout(() => annBar.remove(), 350);
    });
  }

  /* ----------------------------------------------------------
     4. MOBILE NAVIGATION
  ---------------------------------------------------------- */
  const hamburger    = document.getElementById('hamburger');
  const mobileNav    = document.getElementById('mobile-nav');
  const mobileOverlay = document.getElementById('mobile-nav-overlay');
  const mobileClose  = document.getElementById('mobile-nav-close');

  function openMobileNav() {
    mobileNav?.classList.add('active');
    mobileOverlay?.classList.add('active');
    hamburger?.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileNav() {
    mobileNav?.classList.remove('active');
    mobileOverlay?.classList.remove('active');
    hamburger?.classList.remove('active');
    document.body.style.overflow = '';
  }

  hamburger?.addEventListener('click', openMobileNav);
  mobileClose?.addEventListener('click', closeMobileNav);
  mobileOverlay?.addEventListener('click', closeMobileNav);

  /* ----------------------------------------------------------
     5. SEARCH OVERLAY
  ---------------------------------------------------------- */
  const searchBtns    = document.querySelectorAll('.search-btn');
  const searchOverlay = document.getElementById('search-overlay');
  const searchClose   = document.getElementById('search-overlay-close');
  const searchInput   = document.getElementById('search-input');

  function openSearch() {
    searchOverlay?.classList.add('active');
    document.body.style.overflow = 'hidden';
    setTimeout(() => searchInput?.focus(), 200);
  }

  function closeSearch() {
    searchOverlay?.classList.remove('active');
    document.body.style.overflow = '';
  }

  searchBtns.forEach(btn => btn.addEventListener('click', openSearch));
  searchClose?.addEventListener('click', closeSearch);
  searchOverlay?.addEventListener('click', e => {
    if (e.target === searchOverlay) closeSearch();
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      closeSearch();
      closeMobileNav();
    }
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      openSearch();
    }
  });

  /* ----------------------------------------------------------
     6. READING PROGRESS BAR
  ---------------------------------------------------------- */
  const progressBar = document.getElementById('progress-bar');
  if (progressBar) {
    window.addEventListener('scroll', () => {
      const docH   = document.documentElement.scrollHeight - window.innerHeight;
      const pct    = docH > 0 ? (window.scrollY / docH) * 100 : 0;
      progressBar.style.width = pct + '%';
    }, { passive: true });
  }

  /* ----------------------------------------------------------
     7. BACK TO TOP
  ---------------------------------------------------------- */
  const backToTop = document.getElementById('back-to-top');
  if (backToTop) {
    window.addEventListener('scroll', () => {
      backToTop.classList.toggle('visible', window.scrollY > 400);
    }, { passive: true });

    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ----------------------------------------------------------
     8. EXAM TABS
  ---------------------------------------------------------- */
  const examTabs   = document.querySelectorAll('.exam-tab');
  const examPanels = document.querySelectorAll('.exam-panel');

  examTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.tab;
      examTabs.forEach(t => t.classList.remove('active'));
      examPanels.forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      document.getElementById('panel-' + target)?.classList.add('active');
    });
  });

  /* ----------------------------------------------------------
     9. FAQ ACCORDION
  ---------------------------------------------------------- */
  document.querySelectorAll('.faq-question').forEach(q => {
    q.addEventListener('click', () => {
      const item   = q.closest('.faq-item');
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });

  /* ----------------------------------------------------------
     10. TABLE OF CONTENTS TOGGLE
  ---------------------------------------------------------- */
  const tocToggle = document.getElementById('toc-toggle');
  const tocList   = document.getElementById('toc-list');
  if (tocToggle && tocList) {
    tocToggle.addEventListener('click', () => {
      const hidden = tocList.style.display === 'none';
      tocList.style.display = hidden ? 'block' : 'none';
      tocToggle.textContent = hidden ? 'Hide' : 'Show';
    });
  }

  /* ----------------------------------------------------------
     11. SMOOTH TOC SCROLL
  ---------------------------------------------------------- */
  document.querySelectorAll('.toc-list a, .toc-link').forEach(a => {
    a.addEventListener('click', e => {
      const href = a.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const el = document.querySelector(href);
        if (el) {
          const offset = 90;
          const top = el.getBoundingClientRect().top + window.scrollY - offset;
          window.scrollTo({ top, behavior: 'smooth' });
        }
      }
    });
  });

  /* ----------------------------------------------------------
     12. NEWSLETTER FORM
  ---------------------------------------------------------- */
  document.querySelectorAll('.newsletter-form').forEach(form => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const input = form.querySelector('input[type="email"]');
      const btn   = form.querySelector('button');
      if (!input?.value) return;

      const orig = btn.textContent;
      btn.textContent = '✓ Subscribed!';
      btn.style.background = '#0E9F6E';
      btn.style.color = '#fff';
      input.value = '';

      setTimeout(() => {
        btn.textContent = orig;
        btn.style.background = '';
        btn.style.color = '';
      }, 3500);
    });
  });

  /* ----------------------------------------------------------
     13. CONTACT FORM
  ---------------------------------------------------------- */
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', e => {
      e.preventDefault();
      const btn  = contactForm.querySelector('button[type="submit"]');
      const orig = btn.textContent;
      btn.textContent = '✓ Message Sent!';
      btn.style.background = '#0E9F6E';

      setTimeout(() => {
        btn.textContent = orig;
        btn.style.background = '';
        contactForm.reset();
      }, 4000);
    });
  }

  /* ----------------------------------------------------------
     14. SHARE BUTTONS
  ---------------------------------------------------------- */
  const copyBtn = document.getElementById('copy-link-btn');
  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(window.location.href).then(() => {
        const orig = copyBtn.innerHTML;
        copyBtn.innerHTML = '✓ Copied!';
        setTimeout(() => { copyBtn.innerHTML = orig; }, 2000);
      });
    });
  }

  /* ----------------------------------------------------------
     15. SEARCH FORM SUBMIT
  ---------------------------------------------------------- */
  const searchForms = document.querySelectorAll('.search-input-wrap, .search-form-large');
  searchForms.forEach(form => {
    form.addEventListener('keydown', e => {
      if (e.key === 'Enter') {
        const q = form.querySelector('input')?.value.trim();
        if (q) window.location.href = `search.html?q=${encodeURIComponent(q)}`;
      }
    });
  });

  const searchSubmit = document.getElementById('search-submit');
  if (searchSubmit) {
    searchSubmit.addEventListener('click', () => {
      const q = searchInput?.value.trim();
      if (q) window.location.href = `search.html?q=${encodeURIComponent(q)}`;
    });
  }

  /* ----------------------------------------------------------
     16. CATEGORY FILTER (search/category pages)
  ---------------------------------------------------------- */
  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  /* ----------------------------------------------------------
     17. INTERSECTION OBSERVER — fade in sections
  ---------------------------------------------------------- */
  const fadeEls = document.querySelectorAll('.fade-in');
  if ('IntersectionObserver' in window && fadeEls.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity  = '1';
          entry.target.style.transform = 'translateY(0)';
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    fadeEls.forEach(el => {
      el.style.opacity   = '0';
      el.style.transform = 'translateY(24px)';
      el.style.transition = 'opacity 0.55s ease, transform 0.55s ease';
      io.observe(el);
    });
  }

  /* ----------------------------------------------------------
     18. SEARCH RESULTS PAGE
  ---------------------------------------------------------- */
  const urlParams = new URLSearchParams(window.location.search);
  const q         = urlParams.get('q');
  const qDisplay  = document.getElementById('search-query-display');
  const qInput    = document.getElementById('search-query-input');
  if (q) {
    if (qDisplay) qDisplay.textContent = `"${q}"`;
    if (qInput)   qInput.value = q;
  }

});
