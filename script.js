const citation = `@article{cao2026adatempo,
  title={AdaTempo: Learning Shared Relative Tempo from Demonstrations for Faster Robot Manipulation},
  author={Cao, Jiale and Niu, Yike and Xue, Zhengrong and Xu, Huazhe},
  journal={arXiv preprint arXiv:2610.02706},
  year={2026}
}`;
const copyButton = document.getElementById('copy-citation');
const toast = document.getElementById('toast');
const citationDialog = document.getElementById('citation-dialog');
const citationText = document.getElementById('citation-text');
let toastTimer;
copyButton.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(citation);
    toast.textContent = 'BibTeX copied to clipboard';
    toast.classList.add('visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('visible'), 2800);
  } catch {
    citationText.value = citation;
    citationDialog.showModal();
    citationText.focus();
    citationText.select();
  }
});
document.getElementById('close-citation').addEventListener('click', () => citationDialog.close());
citationDialog.addEventListener('click', (event) => {
  if (event.target === citationDialog) {
    const box = citationDialog.getBoundingClientRect();
    if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) citationDialog.close();
  }
});

const wechatDialog = document.getElementById('wechat-dialog');
document.getElementById('wechat-link').addEventListener('click', (event) => {
  event.preventDefault();
  wechatDialog.showModal();
});
document.getElementById('close-wechat').addEventListener('click', () => wechatDialog.close());
wechatDialog.addEventListener('click', (event) => {
  if (event.target === wechatDialog) {
    const box = wechatDialog.getBoundingClientRect();
    if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) wechatDialog.close();
  }
});


// Display preferences and bilingual content. Original English markup is retained for switching back.
(() => {
  const root = document.documentElement;
  const readPreference = (key, fallback) => { try { return localStorage.getItem(key) || fallback; } catch { return fallback; } };
  const savePreference = (key, value) => { try { localStorage.setItem(key, value); } catch {} };
  const style = document.createElement('style');
  style.id = 'site-preferences-styles';
  style.textContent = ':root{color-scheme:light;--page:#fff;--panel:#f7f8fa;--ink:#292824;--muted:#68675f;--line:#deded8;--link:#1767a5;--field:#fff;--code:#f7f7f3}:root[data-theme="dark"]{color-scheme:dark;--page:#1c1c1a;--panel:#242422;--ink:#e8e6df;--muted:#b6b4aa;--line:#44443f;--link:#91bde0;--field:#30302c;--code:#262623}body{background:var(--page);color:var(--ink);font-family:Georgia,"Times New Roman","Songti SC","Noto Serif CJK SC",serif;font-size:16px;line-height:1.75}.profile-header{background:var(--panel);color:var(--ink)}a,button,summary,.profile-text a{color:var(--link)}h1,h2,h3{font-family:Georgia,"Times New Roman","Songti SC",serif}.profile-text h1{font-weight:400}.profile-text .affiliation{font-size:19px}.header-links,.contact,.paper-links,.site-controls{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI","PingFang SC","Microsoft YaHei",sans-serif}.section-note,.dates,.coursework,details,footer,.profile-text .contact,.wechat-caption{color:var(--muted)}h2,footer,dialog,.publication-visual img{border-color:var(--line)}dialog{background:var(--panel);color:var(--ink)}textarea{background:var(--code);color:var(--ink);border-color:var(--line)}.skip{background:var(--page)}a:focus-visible,button:focus-visible,summary:focus-visible,textarea:focus-visible,select:focus-visible{outline:2px solid var(--link);outline-offset:3px}.site-controls{width:min(840px,calc(100% - 48px));margin:0 auto;padding-top:12px;display:flex;justify-content:flex-end;gap:10px}.site-controls select{max-width:100%;background:var(--field);color:var(--ink);border:1px solid var(--line);border-radius:7px;padding:6px 10px;font:13px/1.4 -apple-system,BlinkMacSystemFont,"Segoe UI","PingFang SC",sans-serif;cursor:pointer}.profile-inner{padding-top:12px;padding-bottom:24px}.sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}@media(max-width:600px){body{font-size:15px}.site-controls{width:calc(100% - 36px);gap:8px}.profile-inner{padding-top:14px;padding-bottom:24px}.profile-text .affiliation{font-size:17px}:lang(zh-CN) .bio{line-height:1.9}}@media print{.site-controls{display:none}:root{--page:#fff;--panel:#fff;--ink:#222;--muted:#555;--line:#ddd;--link:#222}body{font-size:11px}.profile-inner{padding-top:10px}}';
  style.textContent += ".site-controls{gap:8px}.site-controls .icon-toggle{width:36px;height:36px;display:inline-grid;place-items:center;position:relative;padding:0;border:1px solid transparent;border-radius:50%;background:transparent;color:var(--ink);cursor:pointer;flex:none}.site-controls .icon-toggle:hover{background:var(--field);border-color:var(--line);text-decoration:none}.icon-toggle svg{width:21px;height:21px;grid-area:1/1;pointer-events:none;transition:opacity .4s ease,transform .5s cubic-bezier(.2,.7,.2,1)}.theme-toggle .sun{opacity:1;transform:rotate(0) scale(1)}.theme-toggle .moon{opacity:0;transform:rotate(-80deg) scale(.5)}:root[data-theme=\"dark\"] .theme-toggle .sun{opacity:0;transform:rotate(90deg) scale(.5)}:root[data-theme=\"dark\"] .theme-toggle .moon{opacity:1;transform:rotate(0) scale(1)}.language-toggle span{grid-area:1/1;font:600 16px/1 -apple-system,BlinkMacSystemFont,\"Segoe UI\",\"PingFang SC\",sans-serif;transition:opacity .2s ease,transform .2s ease}.language-toggle .lang-en{opacity:1;transform:translateY(0)}.language-toggle .lang-zh{opacity:0;transform:translateY(4px)}:root:lang(zh-CN) .language-toggle .lang-en{opacity:0;transform:translateY(-4px)}:root:lang(zh-CN) .language-toggle .lang-zh{opacity:1;transform:translateY(0)}.theme-transitions body,.theme-transitions .profile-header,.theme-transitions dialog,.theme-transitions textarea,.theme-transitions .site-controls button,.theme-transitions a,.theme-transitions summary,.theme-transitions h2,.theme-transitions footer,.theme-transitions .publication-visual img,.theme-transitions .section-note,.theme-transitions details,.theme-transitions .contact{transition:background-color .45s ease,color .4s ease,border-color .4s ease}@media(prefers-reduced-motion:reduce){.theme-transitions *,.icon-toggle svg,.language-toggle span{transition:none!important}}";
  style.textContent += ".profile-text h1{font-size:44px;line-height:1.12;letter-spacing:-.025em;font-weight:400;margin-bottom:12px}.profile-text .affiliation{font-family:-apple-system,BlinkMacSystemFont,\"Segoe UI\",\"PingFang SC\",sans-serif;font-size:17px;line-height:1.55;color:var(--muted);margin-bottom:13px}h2{font-size:25px;font-weight:400;letter-spacing:-.015em;margin-top:34px;padding-bottom:9px}.section-note{font-family:-apple-system,BlinkMacSystemFont,\"Segoe UI\",\"PingFang SC\",sans-serif;font-size:12px}.publication h3{font-size:18px;line-height:1.45;font-weight:400;letter-spacing:-.01em;margin:0 0 7px}.publication .authors{font-family:-apple-system,BlinkMacSystemFont,\"Segoe UI\",\"PingFang SC\",sans-serif;font-size:13px;line-height:1.7;color:var(--muted);margin:0 0 3px}.publication .authors strong{color:var(--ink);font-weight:600}.publication .venue{font-family:-apple-system,BlinkMacSystemFont,\"Segoe UI\",\"PingFang SC\",sans-serif;font-size:12.5px;line-height:1.65;font-style:normal;color:var(--muted);margin:0 0 10px}.publication .summary{font-size:15px;line-height:1.75;margin-top:11px}.publication .role{font-size:13px;line-height:1.75;color:var(--muted);margin-top:9px}.publication .role strong{color:var(--ink);font-weight:600}.publication details{font-size:12.5px;margin-top:10px}.publication .paper-links{gap:7px;margin:10px 0 11px;align-items:center}.paper-links a,.paper-links button{display:inline-flex;align-items:center;justify-content:center;gap:5px;min-height:30px;padding:4px 8px;border:1px solid var(--line);border-radius:5px;background:transparent;color:var(--link);font-size:12px;font-weight:500;line-height:1.5;text-decoration:none}.paper-links a:hover,.paper-links button:hover{background:var(--panel);border-color:var(--link);text-decoration:none}.paper-links svg{width:14px;height:14px;flex:none;pointer-events:none}.resource-label{white-space:nowrap}.publication{margin-bottom:36px}@media(max-width:600px){.profile-text h1{font-size:34px}.profile-text .affiliation{font-size:15px}.publication h3{font-size:17px}.publication .summary{font-size:14px}h2{font-size:23px}.paper-links a,.paper-links button{min-height:34px;padding:5px 9px}}@media print{.profile-text h1{font-size:28px}.publication h3{font-size:14px}.publication .summary{font-size:11px}.paper-links a,.paper-links button{padding:0;border:0;min-height:0}.paper-links svg{display:none}}";
  document.head.append(style);
  const controls = document.createElement('div');
  controls.className = 'site-controls';
  controls.innerHTML = "<button id=\"theme-toggle\" class=\"icon-toggle theme-toggle\" type=\"button\"><svg class=\"sun\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.7\" stroke-linecap=\"round\" aria-hidden=\"true\"><circle cx=\"12\" cy=\"12\" r=\"4\"/><path d=\"M12 2v2m0 16v2M2 12h2m16 0h2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42\"/></svg><svg class=\"moon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.7\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M20.8 13.2A9 9 0 0 1 10.8 3a9 9 0 1 0 10 10.2Z\"/></svg></button><button id=\"language-toggle\" class=\"icon-toggle language-toggle\" type=\"button\"><span class=\"lang-en\" aria-hidden=\"true\">En</span><span class=\"lang-zh\" aria-hidden=\"true\">中</span></button>";
  document.querySelector('.profile-header').prepend(controls);
  const themeButton = document.getElementById('theme-toggle');
  const languageButton = document.getElementById('language-toggle');
  const translations = [
    ['.affiliation', '清华大学本科生'],
    ['.bio p:nth-child(1)', '我是<a href="https://www.tsinghua.edu.cn/en/" target="_blank" rel="noopener">清华大学</a>未央书院本科生，修读数理基础科学与机械工程双学士学位，预计于 2028 年毕业。'],
    ['.bio p:nth-child(2)', '我的研究兴趣是<strong>机器人学习与操作</strong>，尤其关注高效、可靠的视觉运动模仿学习。我也对强化学习、策略适应与泛化，以及用于长时程操作的视觉-语言-动作模型感兴趣。'],
    ['.bio p:nth-child(3)', '我在清华大学<a href="http://hxu.rocks/" target="_blank" rel="noopener">许华哲教授</a>的课题组从事机器人研究。在 AdaTempo 项目中，我参与了示范数据处理、策略训练、仿真实验和真实机器人评估。'],
    ['.bio p:nth-child(4)', '科研之外，我喜欢做饭，尤其擅长川菜，也喜欢烘焙。我还喜欢打篮球、健身，目前正在学习网球。'],
    ['.skip', '跳至正文'],
    ['#publications > h2', '学术论文'],
    ['.section-note', '* 表示共同第一作者'],
    ['.publication:nth-of-type(1) h3 a', 'AdaTempo：从示范中学习共享相对节奏，加速机器人操作'],
    ['.publication:nth-of-type(1) .venue', '预印本，2026。已投稿至 ICRA 2027。'],
    ['.publication .summary', '从示范数据中学习共享的相对节奏，训练更快的视觉运动策略。在 11 项仿真与真实机器人操作任务的评估中，执行速度最高提升至 3.57 倍。'],
    ['.publication:nth-of-type(1) .role', '<strong>我的工作：</strong>主导 robomimic 和 ALOHA 仿真实验、ACT 与 Diffusion Policy 对比实验，以及系统性消融研究。'],
    ['details summary', '更多个人贡献'],
    ['details li:nth-child(1)', '参与方法设计、示范数据处理、策略训练和超参数调优。'],
    ['details li:nth-child(2)', '参与真实机器人系统搭建、任务设计、数据采集与评估。'],
    ['details > p', '导师：许华哲教授'],
    ['.publication:nth-of-type(2) h3 a', 'PAM：用于仿真到现实人-物交互视频生成的姿态、外观与运动引擎'],
    ['.publication:nth-of-type(2) .venue', 'IEEE/CVF 计算机视觉与模式识别会议（CVPR），2026。'],
    ['.publication:nth-of-type(2) .role', '<strong>我的工作：</strong>处理和转换实验数据；参与定性分析、结果筛选及论文图表制作。'],
    ['.publication .dates', '2025 年 9 月至 12 月'],
    ['#misc > h2', '其他信息'],
    ['#misc > p', '语言：中文；英语（托福 iBT 110/120）。'],
    ['footer', '最后更新：2026 年 11 月。'],
    ['#citation-title', 'AdaTempo · 引用格式'],
    ['#citation-dialog > p', '选中并复制下方的引用信息。'],
    ['#wechat-title', '微信'],
    ['.wechat-caption', '扫描二维码添加我的微信。'],
  ];
  const entries = translations.flatMap(([selector, zh]) => Array.from(document.querySelectorAll(selector), node => ({node, en:node.innerHTML, zh})));
  const linkLabels = {'CV':'简历','WeChat':'微信','[Project Website]':'[项目主页]','[Paper]':'[论文]','[PDF]':'[PDF]','[Code]':'[代码]'};
  document.querySelectorAll('.header-links a,.paper-links a').forEach(node => { const en = node.textContent; if (linkLabels[en]) entries.push({node,en,zh:linkLabels[en]}); });
  const attributes = [
    ['.bio','aria-label','关于我'],
    ['.publication:nth-of-type(1) .publication-visual','aria-label','查看 AdaTempo 动画原图'],
    ['.publication:nth-of-type(2) .publication-visual','aria-label','查看 PAM 方法概览原图'],
    ['.publication:nth-of-type(1) img','alt','AdaTempo：ALOHA 插入任务对比及真实机器人传送带任务。'],
    ['.publication:nth-of-type(2) img','alt','PAM：姿态、外观与运动生成方法及定量评估。'],
    ['#close-citation','aria-label','关闭引用弹窗'],
    ['#close-wechat','aria-label','关闭微信二维码'],
    ['#citation-text','aria-label','BibTeX 引用'],
    ['.wechat-qr','alt','Yike Niu 的微信二维码，使用微信扫码添加好友。']
  ].flatMap(([selector,attribute,zh]) => Array.from(document.querySelectorAll(selector), node => ({node,attribute,en:node.getAttribute(attribute),zh})));
  function decorateResources() {
    document.querySelectorAll('.paper-links a,.paper-links button').forEach(node => {
      if (node.querySelector('.resource-label')) return;
      let label = node.textContent.trim().replace(/^\[|\]$/g,'');
      const kind = node.id === 'copy-citation' ? 'citation' : label === 'PDF' ? 'pdf' : /Code|代码/.test(label) ? 'code' : /Project|项目/.test(label) ? 'project' : 'paper';
      if (label === 'Project Website') label = 'Project';
      const paths = {
        project: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c5 5 5 13 0 18-5-5-5-13 0-18Z"/>',
        paper: '<path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9Z"/><path d="M14 3v6h6M8 13h8M8 17h6"/>',
        pdf: '<path d="M12 3v12m-4-4 4 4 4-4M5 17v4h14v-4"/>',
        code: '<path d="m8 6-6 6 6 6m8-12 6 6-6 6M14 3l-4 18"/>',
        citation: '<rect x="8" y="8" width="12" height="13" rx="2"/><path d="M16 8V3H4v13h4"/>'
      };
      const svg = document.createElementNS('http://www.w3.org/2000/svg','svg');
      svg.setAttribute('viewBox','0 0 24 24');
      svg.setAttribute('fill','none');
      svg.setAttribute('stroke','currentColor');
      svg.setAttribute('stroke-width','1.6');
      svg.setAttribute('stroke-linecap','round');
      svg.setAttribute('stroke-linejoin','round');
      svg.setAttribute('aria-hidden','true');
      svg.innerHTML = paths[kind];
      const text = document.createElement('span');
      text.className = 'resource-label';
      text.textContent = label;
      node.replaceChildren(svg,text);
    });
  }
  function updateButtons() {
    const zh = root.lang === 'zh-CN';
    const dark = root.dataset.theme === 'dark';
    const themeLabel = zh ? (dark ? '切换为浅色模式' : '切换为深色模式') : (dark ? 'Switch to light mode' : 'Switch to dark mode');
    const languageLabel = zh ? '切换为英文 / Switch to English' : 'Switch to Chinese / 切换为中文';
    themeButton.setAttribute('aria-label',themeLabel);
    themeButton.setAttribute('aria-pressed',String(dark));
    themeButton.title = themeLabel;
    languageButton.setAttribute('aria-label',languageLabel);
    languageButton.title = languageLabel;
  }
  function setTheme(theme) { root.dataset.theme = theme === 'dark' ? 'dark' : 'light'; updateButtons(); }
  function setLanguage(language) {
    const zh = language === 'zh-CN';
    root.lang = zh ? 'zh-CN' : 'en';
    updateButtons();
    entries.forEach(entry => { entry.node.innerHTML = zh ? entry.zh : entry.en; });
    attributes.forEach(entry => { entry.node.setAttribute(entry.attribute,zh ? entry.zh : entry.en); });
    decorateResources();
    const description = document.querySelector('meta[name="description"]');
    description.content = zh ? 'Yike Niu，清华大学本科生。研究方向：机器人学习、模仿学习与机器人操作。' : 'Yike Niu, Tsinghua University. Research in robot learning, imitation learning, and manipulation.';
  }
  themeButton.addEventListener('click', () => { setTheme(root.dataset.theme === 'dark' ? 'light' : 'dark'); savePreference('yike-theme',root.dataset.theme); });
  languageButton.addEventListener('click', () => { setLanguage(root.lang === 'zh-CN' ? 'en' : 'zh-CN'); savePreference('yike-language',root.lang); });
  setTheme(readPreference('yike-theme','light'));
  setLanguage(readPreference('yike-language','en'));
  requestAnimationFrame(() => requestAnimationFrame(() => root.classList.add('theme-transitions')));
  new MutationObserver(() => { if (root.lang === 'zh-CN' && toast.textContent === 'BibTeX copied to clipboard') toast.textContent = 'BibTeX 已复制到剪贴板'; }).observe(toast,{childList:true});
})();


// A lightweight glass treatment for controls and publication resources.
(() => {
  const controls = document.querySelector('.site-controls');
  const capsule = document.createElement('div');
  capsule.className = 'glass-capsule';
  capsule.append(...controls.children);
  controls.append(capsule);
  const glassStyle = document.createElement('style');
  glassStyle.id = 'glass-styles';
  glassStyle.textContent = ':root{--glass-fill:rgba(255,255,255,.58);--glass-rim:rgba(255,255,255,.85);--glass-shadow:rgba(35,65,95,.12);--glass-shine:rgba(255,255,255,.65);--glass-hover:rgba(255,255,255,.74)}:root[data-theme="dark"]{--glass-fill:rgba(48,53,59,.56);--glass-rim:rgba(255,255,255,.18);--glass-shadow:rgba(0,0,0,.3);--glass-shine:rgba(255,255,255,.12);--glass-hover:rgba(109,128,145,.2)}.profile-header{background-image:radial-gradient(ellipse at 85% 0%,rgba(135,178,213,.18),transparent 60%),radial-gradient(ellipse at 10% 100%,rgba(192,187,221,.1),transparent 55%)}.site-controls{padding-top:14px}.glass-capsule{display:flex;align-items:center;gap:4px;padding:4px;border:1px solid var(--glass-rim);border-radius:999px;background:var(--field);box-shadow:0 6px 22px var(--glass-shadow),inset 0 1px 0 var(--glass-shine),inset 0 -1px 0 rgba(90,120,150,.06);position:relative;isolation:isolate}.glass-capsule:before{content:"";position:absolute;inset:0;border-radius:inherit;pointer-events:none;background:linear-gradient(145deg,var(--glass-shine),transparent 45%,rgba(135,178,213,.07));z-index:-1}.site-controls .glass-capsule .icon-toggle{width:38px;height:38px;border:0}.site-controls .glass-capsule .icon-toggle:hover{background:var(--glass-hover);box-shadow:inset 0 1px 0 var(--glass-shine)}.glass-capsule .icon-toggle:active{transform:scale(.93)}.paper-links a,.paper-links button{position:relative;background:var(--field);border:1px solid var(--glass-rim);border-radius:999px;padding:5px 11px;box-shadow:0 2px 8px var(--glass-shadow),inset 0 1px 0 var(--glass-shine);isolation:isolate}.paper-links a:before,.paper-links button:before{content:"";position:absolute;inset:0;border-radius:inherit;pointer-events:none;background:linear-gradient(150deg,var(--glass-shine),transparent 65%);z-index:-1}.paper-links a:hover,.paper-links button:hover{background:var(--glass-hover);border-color:var(--glass-rim);box-shadow:0 5px 14px var(--glass-shadow),inset 0 1px 0 var(--glass-shine);transform:translateY(-1px)}.paper-links a:active,.paper-links button:active{transform:translateY(0) scale(.97)}.theme-transitions .glass-capsule,.theme-transitions .paper-links a,.theme-transitions .paper-links button,.theme-transitions .glass-capsule .icon-toggle{transition:background-color .4s ease,color .4s ease,border-color .4s ease,box-shadow .25s ease,transform .2s ease}@supports ((backdrop-filter:blur(1px)) or (-webkit-backdrop-filter:blur(1px))){.glass-capsule{background:var(--glass-fill);-webkit-backdrop-filter:blur(24px) saturate(165%);backdrop-filter:blur(24px) saturate(165%)}.paper-links a,.paper-links button{background:var(--glass-fill);-webkit-backdrop-filter:blur(12px) saturate(150%);backdrop-filter:blur(12px) saturate(150%)}.paper-links a:hover,.paper-links button:hover{background:var(--glass-hover)}}@media(prefers-reduced-motion:reduce){.theme-transitions .glass-capsule,.theme-transitions .paper-links a,.theme-transitions .paper-links button,.theme-transitions .glass-capsule .icon-toggle{transition:none}.paper-links a:hover,.paper-links button:hover,.glass-capsule .icon-toggle:active{transform:none}}@media(prefers-reduced-transparency:reduce){.glass-capsule,.paper-links a,.paper-links button{background:var(--field);-webkit-backdrop-filter:none;backdrop-filter:none}.glass-capsule:before,.paper-links a:before,.paper-links button:before{display:none}}@media print{.profile-header{background-image:none}.paper-links a,.paper-links button{background:none;box-shadow:none;border:0;-webkit-backdrop-filter:none;backdrop-filter:none;padding:0}.paper-links a:before,.paper-links button:before{display:none}}';
  document.head.append(glassStyle);
})();


// Use the author's Chinese name in the Chinese edition.
(() => {
  function localizeName() {
    const name = document.documentElement.lang === 'zh-CN' ? '牛一轲' : 'Yike Niu';
    document.title = name;
    document.querySelectorAll('.profile-text h1,.authors strong').forEach(node => { node.textContent = node.textContent.replace(/Yike Niu|牛一轲/g,name); });
    document.querySelectorAll('.avatar img,.wechat-qr').forEach(node => { node.alt = node.alt.replace(/Yike Niu|牛一轲/g,name); });
    const description = document.querySelector('meta[name="description"]');
    description.content = description.content.replace(/Yike Niu|牛一轲/g,name);
  }
  localizeName();
  new MutationObserver(localizeName).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
})();
