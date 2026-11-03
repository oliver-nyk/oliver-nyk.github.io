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
  nav.innerHTML = '<a class="wordmark" href="#intro">YN</a><div class="nav-sections"><a href="#intro" data-nav="about"></a><a href="#research" data-nav="research"></a><a href="#publications" data-nav="publications"></a></div>';
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
  // Reveal each card once. Reduced-motion visitors see it immediately.
  if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.remove('reveal-pending'); observer.unobserve(entry.target); }
    }), {threshold:0.08});
    document.querySelectorAll('.publication').forEach(card => { card.classList.add('reveal-pending'); observer.observe(card); });
  }
})();
