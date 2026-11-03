const progress = document.getElementById('scrollProgress');
const menuToggle = document.getElementById('menuToggle');
const mainNav = document.getElementById('mainNav');
const modal = document.getElementById('projectModal');
const modalClose = document.getElementById('modalClose');

function updateProgress(){
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = (scrollable > 0 ? window.scrollY / scrollable * 100 : 0) + '%';
}
window.addEventListener('scroll', updateProgress, {passive:true});
updateProgress();

menuToggle.addEventListener('click', () => {
  const opened = mainNav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(opened));
});
mainNav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  mainNav.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
}));

const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){ entry.target.classList.add('visible'); observer.unobserve(entry.target); }
  });
}, {threshold:0.12});
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');
const projectCount = document.getElementById('projectCount');
filterButtons.forEach(button => button.addEventListener('click', () => {
  filterButtons.forEach(b => b.classList.remove('active'));
  button.classList.add('active');
  const filter = button.dataset.filter;
  let visible = 0;
  projectCards.forEach(card => {
    const show = filter === 'all' || card.dataset.category === filter;
    card.classList.toggle('is-hidden', !show);
    if(show) visible++;
  });
  projectCount.textContent = String(visible).padStart(2,'0') + ' PROJECTS';
}));

function openModal(card){
  document.getElementById('modalImage').src = card.dataset.img;
  document.getElementById('modalImage').alt = card.dataset.title + ' 3D CAD model';
  document.getElementById('modalType').textContent = card.dataset.type;
  document.getElementById('modalTitle').textContent = card.dataset.title;
  document.getElementById('modalDesc').textContent = card.dataset.desc;
  document.getElementById('modalFocus').textContent = card.dataset.focus;
  modal.classList.add('open');
  modal.setAttribute('aria-hidden','false');
  document.body.style.overflow = 'hidden';
  modalClose.focus();
}
function closeModal(){
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden','true');
  document.body.style.overflow = '';
}
projectCards.forEach(card => card.addEventListener('click', () => openModal(card)));
modalClose.addEventListener('click', closeModal);
modal.querySelectorAll('[data-close]').forEach(el => el.addEventListener('click', closeModal));
document.addEventListener('keydown', e => { if(e.key === 'Escape' && modal.classList.contains('open')) closeModal(); });
document.getElementById('year').textContent = new Date().getFullYear();
