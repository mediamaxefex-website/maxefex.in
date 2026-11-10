const toggle=document.querySelector('[data-nav-toggle]');
const nav=document.querySelector('[data-nav]');
function closeNav(){if(!toggle||!nav)return;toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-label','Open navigation');nav.classList.remove('is-open');}
toggle?.addEventListener('click',()=>{const open=toggle.getAttribute('aria-expanded')!=='true';toggle.setAttribute('aria-expanded',String(open));toggle.setAttribute('aria-label',open?'Close navigation':'Open navigation');nav?.classList.toggle('is-open',open);});
nav?.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeNav));
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&nav?.classList.contains('is-open')){closeNav();toggle.focus();}});
window.addEventListener('resize',()=>{if(innerWidth>1080)closeNav();});
const current=location.pathname.split('/').pop()||'index.html';
document.querySelectorAll('[data-nav-link]').forEach(a=>{if(a.getAttribute('href')===current){a.classList.add('is-active');a.setAttribute('aria-current','page');}});
document.querySelectorAll('[data-gallery-filter]').forEach(button=>button.addEventListener('click',()=>{let count=0;document.querySelectorAll('[data-gallery-filter]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));document.querySelectorAll('[data-gallery-category]').forEach(item=>{const visible=button.dataset.galleryFilter==='all'||button.dataset.galleryFilter===item.dataset.galleryCategory;item.hidden=!visible;if(visible)count++;});document.querySelector('.gallery-status').textContent=`${count} visual${count===1?'':'s'}`;}));
const lightbox=document.querySelector('.gallery-lightbox');let lastArtwork;
document.querySelectorAll('[data-gallery-open]').forEach(button=>button.addEventListener('click',()=>{lastArtwork=button;const image=button.querySelector('img');const preview=lightbox.querySelector('img');preview.src=image.src;preview.alt=image.alt;lightbox.querySelector('[data-gallery-caption]').textContent=button.closest('figure').querySelector('figcaption').textContent;lightbox.showModal();}));
lightbox?.querySelector('[data-gallery-close]').addEventListener('click',()=>lightbox.close());
lightbox?.addEventListener('close',()=>lastArtwork?.focus());
lightbox?.addEventListener('click',e=>{if(e.target===lightbox){const box=lightbox.getBoundingClientRect();if(e.clientX<box.left||e.clientX>box.right||e.clientY<box.top||e.clientY>box.bottom)lightbox.close();}});
let installPrompt;const installButtons=document.querySelectorAll('[data-install-app]');
window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();installPrompt=e;installButtons.forEach(b=>b.hidden=false);});
installButtons.forEach(b=>b.addEventListener('click',async()=>{if(!installPrompt)return;await installPrompt.prompt();await installPrompt.userChoice;installPrompt=null;installButtons.forEach(el=>el.hidden=true);}));
window.addEventListener('appinstalled',()=>{installPrompt=null;installButtons.forEach(b=>b.hidden=true);});
const offline=document.createElement('div');offline.className='offline-notice';offline.setAttribute('role','status');offline.textContent='You’re offline. Saved pages and the guided assistant are available. Prices may have changed; contact the studio when connected.';document.querySelector('.site-header')?.after(offline);
function updateConnection(){offline.hidden=navigator.onLine;}updateConnection();window.addEventListener('online',updateConnection);window.addEventListener('offline',updateConnection);
if('serviceWorker' in navigator&&(location.protocol==='https:'||location.hostname==='127.0.0.1'||location.hostname==='localhost')){window.addEventListener('load',()=>{navigator.serviceWorker.register('sw.js').then(()=>navigator.serviceWorker.ready).then(()=>{document.querySelectorAll('[data-offline-state]').forEach(el=>{el.hidden=false;el.textContent='Offline essentials saved';});}).catch(()=>{/* Regular browsing remains available if offline features are blocked. */});});}
