// Editorial layout; move the existing nodes so translations and event handlers remain intact.
(() => {
  document.head.append(document.getElementById('redesign-styles'));
  const hero = document.querySelector('.profile-header');
  hero.id = 'intro';
  const content = document.querySelector('.profile-inner');
  const identity = document.createElement('div');
  identity.className = 'identity-block';
  identity.append(...content.children);
  content.append(identity);
  const bio = document.querySelector('.bio');
  const researchCopy = bio.querySelectorAll('p')[1];
  content.append(bio);
  const nav = document.createElement('nav');
  nav.className = 'site-nav';
  nav.innerHTML = '<div class="nav-sections"><a href="#intro" data-nav="about"></a><a href="#research" data-nav="research"></a><a href="#publications" data-nav="publications"></a></div>';
  nav.append(document.querySelector('.site-controls'));
  document.body.prepend(nav);
  const research = document.createElement('section');
  research.id = 'research';
  research.className = 'research-section';
  research.innerHTML = '<div class="section-heading"><span class="section-index">01</span><h2></h2></div><div class="research-intro"><p class="research-lead"></p></div>';
  research.querySelector('.research-intro').append(researchCopy);
  document.querySelector('#publications').before(research);
  const cue = document.createElement('a');
  cue.className = 'scroll-cue';
  cue.href = '#research';
  hero.append(cue);
  document.querySelectorAll('.publication-text').forEach(text => {
    const links = text.querySelector('.paper-links');
    text.append(links);
  });
  // Keep the original anchors and headings so existing dialogs and translations survive.
  const profileLinks = [...hero.querySelectorAll('.header-links a')];
  const iconPaths = [
    '<g fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M14 3H6a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V8z"/><path d="M14 3v5h5M8 13h8M8 17h6"/></g>',
    '<path fill="currentColor" d="M12 .8a11.2 11.2 0 0 0-3.54 21.83c.56.1.77-.24.77-.54v-2.1c-3.13.68-3.79-1.33-3.79-1.33-.51-1.3-1.25-1.65-1.25-1.65-1.02-.7.08-.69.08-.69 1.13.08 1.72 1.16 1.72 1.16 1 1.72 2.63 1.22 3.27.93.1-.73.39-1.22.71-1.5-2.5-.29-5.13-1.25-5.13-5.54 0-1.22.44-2.22 1.16-3-.12-.28-.5-1.42.11-2.96 0 0 .95-.3 3.08 1.15a10.7 10.7 0 0 1 5.6 0c2.13-1.45 3.08-1.15 3.08-1.15.61 1.54.23 2.68.11 2.96.72.78 1.16 1.78 1.16 3 0 4.3-2.64 5.25-5.15 5.53.4.35.76 1.03.76 2.08v3.11c0 .3.2.65.78.54A11.2 11.2 0 0 0 12 .8z"/>',
    '<path fill="currentColor" d="M18.9 2H22l-6.8 7.77L23.2 22h-6.3L12 14.58 5.5 22H2.3l8.2-9.37L2.8 2h6.46l4.43 6.77L18.9 2zM17.8 20h1.73L8.3 3.87H6.45z"/>',
    '<path fill="currentColor" d="M9.1 3C4.6 3 1 5.8 1 9.3c0 1.9 1.1 3.7 3 4.9l-.8 2.5 2.9-1.5c.9.3 1.8.4 2.7.4a5.8 5.8 0 0 1-.3-1.8c0-3.6 3.4-6.5 7.6-6.5h.7C15.6 4.8 12.6 3 9.1 3zm-2.7 4a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm5.2 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/><path fill="currentColor" d="M23 13.8c0-2.9-3-5.2-6.7-5.2s-6.7 2.3-6.7 5.2S12.6 19 16.3 19c.8 0 1.5-.1 2.2-.3l2.4 1.3-.6-2.1c1.7-.9 2.7-2.4 2.7-4.1zm-9-1.7a.85.85 0 1 1 0 1.7.85.85 0 0 1 0-1.7zm4.5 0a.85.85 0 1 1 0 1.7.85.85 0 0 1 0-1.7z"/>'
    ,'<g fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="3"/><path d="m4 7 8 6 8-6"/></g>'
  ];
  function decorateProfileLinks(zh) {
    profileLinks.forEach((link, index) => {
      const label = [zh ? '简历' : 'CV', 'GitHub', 'X', zh ? '微信' : 'WeChat', zh ? '邮件' : 'Mail'][index];
      if (link.querySelector('.social-label')?.textContent === label) return;
      link.classList.add('social-glass');
      link.setAttribute('aria-label', index === 4 ? `${label}: nyk24@mails.tsinghua.edu.cn` : label);
      link.innerHTML = `<svg viewBox="0 0 24 24" aria-hidden="true">${iconPaths[index]}</svg><span class="social-label">${label}</span>`;
    });
  }
  const publications = document.querySelector('#publications');
  const chapters = [research, publications].map((section, index) => {
    const heading = section.querySelector('h2');
    const body = document.createElement('div');
    body.className = 'chapter-body';
    if (index === 0) body.append(section.querySelector('.research-intro'));
    else body.append(...[...section.children].filter(node => node !== heading));
    const title = document.createElement('div');
    title.className = 'chapter-title-motion';
    const number = document.createElement('span');
    number.className = 'chapter-number';
    number.textContent = `0${index + 1}`;
    title.append(number, heading);
    const pin = document.createElement('div');
    pin.className = 'chapter-heading';
    pin.append(title);
    const runway = document.createElement('div');
    runway.className = 'chapter-runway';
    runway.setAttribute('aria-hidden', 'true');
    section.replaceChildren(pin, runway, body);
    section.classList.add('scroll-chapter');
    return {section, title, body, runway};
  });
  const englishLead = 'From human demonstrations to faster robot manipulation.';
  function translateLayout() {
    const zh = document.documentElement.lang === 'zh-CN';
    decorateProfileLinks(zh);
    nav.setAttribute('aria-label', zh ? '主导航' : 'Main navigation');
    nav.querySelector('[data-nav="about"]').textContent = zh ? '关于我' : 'About';
    nav.querySelector('[data-nav="research"]').textContent = zh ? '研究' : 'Research';
    nav.querySelector('[data-nav="publications"]').textContent = zh ? '论文' : 'Publications';
    research.querySelector('h2').textContent = zh ? '研究方向' : 'Research';
    research.querySelector('.research-lead').textContent = zh ? '从人类示范出发，让机器人更快地完成操作。' : englishLead;
    cue.textContent = zh ? '向下探索 ↓' : 'Explore ↓';
  }
  translateLayout();
  new MutationObserver(() => { translateLayout(); measure(); }).observe(document.documentElement, {attributes:true, attributeFilter:['lang']});
  function updateNav() { nav.classList.toggle('scrolled', window.scrollY > hero.offsetHeight - nav.offsetHeight); }
  updateNav();
  window.addEventListener('scroll', updateNav, {passive:true});
  window.addEventListener('resize', updateNav);
  // Motion enhances the existing layout; content remains visible without it.
  const motionPreference = matchMedia('(prefers-reduced-motion: reduce)');
  const wideViewport = matchMedia('(min-width: 801px)');
  const runningAnimations = new Set();
  const seen = new WeakSet();
  const ease = 'cubic-bezier(.16,1,.3,1)';
  function reveal(node, delay = 0, distance = 30) {
    if (motionPreference.matches || typeof node.animate !== 'function') return;
    const animation = node.animate([
      {opacity:0, transform:`translate3d(0,${distance}px,0)`},
      {opacity:1, transform:'translate3d(0,0,0)'}
    ], {duration:950, delay, easing:ease, fill:'backwards'});
    runningAnimations.add(animation);
    // Release temporary effects even if a browser suspends its animation timeline.
    const fallback = setTimeout(() => animation.cancel(), 1200 + delay);
    animation.onfinish = animation.oncancel = () => {
      clearTimeout(fallback);
      runningAnimations.delete(animation);
    };
  }
  // Separate foreground elements enter in a short sequence.
  if (scrollY < 80) {
    const entrance = [hero.querySelector('.avatar'), ...hero.querySelectorAll('.profile-text > *'), ...bio.children, cue];
    entrance.forEach((node, index) => reveal(node, 70 + index * 65, index ? 22 : 16));
  }
  const revealTargets = document.querySelectorAll('.publication,#misc');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting || seen.has(entry.target)) return;
        seen.add(entry.target);
        observer.unobserve(entry.target);
        if (entry.boundingClientRect.top > 0) reveal(entry.target, 0, entry.target.matches('.publication') ? 42 : 30);
      });
    }, {threshold:0, rootMargin:'0px 0px -8% 0px'});
    revealTargets.forEach(node => observer.observe(node));
  }
  // One frame per scroll update; no continuously running animation loop.
  const navLinks = [...nav.querySelectorAll('[data-nav]')];
  const sections = [hero, research, document.querySelector('#publications')];
  let metrics = {heroHeight:hero.offsetHeight, total:1, starts:[]};
  let scheduled = false;
  let frameId = 0;
  let frameFallback = 0;
  let activeSection = '';
  function measure() {
    metrics = {
      heroHeight:hero.offsetHeight,
      total:Math.max(1, document.documentElement.scrollHeight - innerHeight),
      starts:sections.map(section => section.getBoundingClientRect().top + scrollY)
    };
    scheduleFrame();
  }
  function renderFrame() {
    clearTimeout(frameFallback);
    scheduled = false;
    const y = Math.max(0, scrollY);
    chapters.forEach(({section, title, body, runway}) => {
      const distance = Math.max(1, runway.offsetHeight);
      const top = section.getBoundingClientRect().top;
      const raw = Math.max(0, Math.min(1, (nav.offsetHeight + 18 - top) / distance));
      const p = motionPreference.matches ? 1 : raw;
      const eased = p * p * (3 - 2 * p);
      const fit = Math.min(1, (section.clientWidth - 16) / title.offsetWidth);
      const compact = wideViewport.matches ? .38 : .48;
      const scale = fit + (compact - fit) * eased;
      const x = Math.max(0, (section.clientWidth - title.offsetWidth * fit) / 2) * (1 - eased);
      const rise = Math.max(100, (innerHeight - nav.offsetHeight) * .32);
      title.style.transform = `translate3d(${x}px,${rise * (1 - eased)}px,0) scale(${scale})`;
      const appear = Math.max(0, Math.min(1, (p - .22) / .78));
      body.style.opacity = appear;
      body.style.transform = `translate3d(0,${(1 - appear) * 48}px,0)`;
      // Invisible content must not intercept clicks, tab focus or accessibility reading.
      body.inert = appear < .04;
      section.style.setProperty('--chapter-progress', eased);
    });
    const progress = Math.min(1, y / metrics.heroHeight);
    const moving = !motionPreference.matches && wideViewport.matches;
    hero.style.setProperty('--photo-y', moving ? `${progress * 26}px` : '0px');
    hero.style.setProperty('--photo-scale', moving ? 1 + progress * .08 : 1);
    content.style.transform = moving ? `translate3d(0,${-progress * 22}px,0)` : '';
    content.style.opacity = moving ? 1 - progress * .45 : '';
    nav.style.setProperty('--reading-progress', Math.min(1, y / metrics.total));
    let current = 0;
    metrics.starts.forEach((top, index) => { if (y + innerHeight * .36 >= top) current = index; });
    const id = sections[current].id;
    if (activeSection !== id) {
      activeSection = id;
      navLinks.forEach(link => {
        if (link.hash === `#${id}`) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    }
  }
  function scheduleFrame() {
    if (scheduled) return;
    scheduled = true;
    frameId = requestAnimationFrame(renderFrame);
    // Keep navigation correct when background tabs throttle animation frames.
    frameFallback = setTimeout(() => {
      cancelAnimationFrame(frameId);
      renderFrame();
    }, 120);
  }
  motionPreference.addEventListener('change', () => {
    if (motionPreference.matches) runningAnimations.forEach(animation => animation.cancel());
    scheduleFrame();
  });
  wideViewport.addEventListener('change', measure);
  addEventListener('scroll', scheduleFrame, {passive:true});
  addEventListener('resize', measure, {passive:true});
  addEventListener('pageshow', measure);
  if ('ResizeObserver' in window) new ResizeObserver(measure).observe(document.body);
  document.fonts?.ready.then(measure);
  measure();
})();
