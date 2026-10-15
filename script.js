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
