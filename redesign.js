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
  const eyebrow = document.createElement('p');
  eyebrow.className = 'eyebrow';
  document.querySelector('.profile-text').prepend(eyebrow);
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
  const englishLead = 'I study how robots can learn to manipulate the world efficiently and reliably.';
  function translateLayout() {
    const zh = document.documentElement.lang === 'zh-CN';
    nav.setAttribute('aria-label', zh ? '主导航' : 'Main navigation');
    nav.querySelector('[data-nav="about"]').textContent = zh ? '关于我' : 'About';
    nav.querySelector('[data-nav="research"]').textContent = zh ? '研究' : 'Research';
    nav.querySelector('[data-nav="publications"]').textContent = zh ? '论文' : 'Publications';
    eyebrow.textContent = zh ? '机器人学习 · 机器人操作' : 'Robot Learning · Manipulation';
    research.querySelector('h2').textContent = zh ? '研究方向' : 'Research';
    research.querySelector('.research-lead').textContent = zh ? '我关注如何让机器人通过学习，高效、可靠地与物理世界交互。' : englishLead;
    cue.textContent = zh ? '向下探索 ↓' : 'Explore ↓';
  }
  translateLayout();
  new MutationObserver(translateLayout).observe(document.documentElement, {attributes:true, attributeFilter:['lang']});
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
  const revealTargets = document.querySelectorAll('.section-heading,.research-intro > p,#publications > h2,.section-note,.publication,#misc');
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
