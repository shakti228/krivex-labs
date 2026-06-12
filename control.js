const loginBtn = document.getElementById('loginBtn');
if (loginBtn && window.netlifyIdentity) {
  loginBtn.addEventListener('click', () => window.netlifyIdentity.open());
}

function copyText(text) {
  navigator.clipboard.writeText(text).then(() => toast('Copied: ' + text));
}

function buildAiPrompt() {
  const targetFile = document.getElementById('targetFile').value;
  const userPrompt = document.getElementById('aiPrompt').value.trim();
  const output = document.getElementById('outputPrompt');

  if (!userPrompt) {
    toast('Write your edit instruction first.');
    return;
  }

  output.value = `You are editing my Krivex Labs website. Target file: ${targetFile}.\n\nMy request:\n${userPrompt}\n\nRules:\n1. Keep the design professional, clean, mobile responsive, and monetization-friendly.\n2. Do not break existing navigation, admin links, or Netlify/Decap setup.\n3. Preserve founder name: Shakti Prasad Mallik.\n4. Give me complete replacement code for the target file, not partial patches.\n5. Keep cybersecurity content ethical, legal, and safe.`;
  toast('AI edit prompt created.');
}

function copyGeneratedPrompt() {
  const output = document.getElementById('outputPrompt');
  if (!output.value.trim()) {
    toast('No generated prompt to copy.');
    return;
  }
  navigator.clipboard.writeText(output.value).then(() => toast('Generated prompt copied.'));
}

function clearPrompt() {
  document.getElementById('aiPrompt').value = '';
  document.getElementById('outputPrompt').value = '';
  toast('Cleared.');
}

function toast(message) {
  const old = document.querySelector('.toast');
  if (old) old.remove();
  const t = document.createElement('div');
  t.className = 'toast';
  t.textContent = message;
  t.style.position = 'fixed';
  t.style.left = '50%';
  t.style.bottom = '22px';
  t.style.transform = 'translateX(-50%)';
  t.style.background = '#2563eb';
  t.style.color = '#fff';
  t.style.padding = '12px 18px';
  t.style.borderRadius = '12px';
  t.style.fontWeight = '900';
  t.style.zIndex = '9999';
  t.style.boxShadow = '0 16px 35px rgba(37,99,235,.25)';
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 1800);
}
