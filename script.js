const menuToggle=document.getElementById('menuToggle');const navigation=document.getElementById('navigation');menuToggle.addEventListener('click',()=>{let isOpen=navigation.classList.toggle('open');menuToggle.setAttribute('aria-expanded',String(isOpen));menuToggle.textContent=isOpen?'×':'☰'});navigation.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{navigation.classList.remove('open');menuToggle.setAttribute('aria-expanded','false');menuToggle.textContent='☰'}));
// Ganti tanggal ini sesuai tanggal peluncuran resmi. Waktu memakai zona WIB (+07:00).
const launchDate=new Date('2026-11-20T19:00:00+07:00').getTime();function renderCountdown(){const diff=Math.max(0,launchDate-Date.now());const d=Math.floor(diff/86400000),h=Math.floor(diff/3600000)%24,m=Math.floor(diff/60000)%60,s=Math.floor(diff/1000)%60;for(const [key,value] of [['days',d],['hours',h],['minutes',m],['seconds',s]])document.getElementById(key).textContent=String(value).padStart(2,'0')}renderCountdown();setInterval(renderCountdown,1000);
function wireChoices(groupId,dataKey,inputName){const group=document.getElementById(groupId);group.querySelectorAll('button').forEach(button=>button.addEventListener('click',()=>{group.querySelectorAll('button').forEach(b=>b.classList.remove('active'));button.classList.add('active');document.querySelector(`[name="${inputName}"]`).value=button.dataset[dataKey]}))}wireChoices('attendanceChoice','attendance','attendance');wireChoices('guestChoice','guests','guests');
document.getElementById('rsvpForm').addEventListener('submit',event=>{event.preventDefault();const form=event.currentTarget;if(!form.reportValidity())return;const data=Object.fromEntries(new FormData(form));const text=`Konfirmasi Kehadiran - Hidup Kedua\nNama: ${data.name}\nEmail: ${data.email}\nWhatsApp: ${data.phone}\nInstansi: ${data.organization||'-'}\nStatus: ${data.attendance}\nJumlah tamu: ${data.guests}\nPesan: ${data.message||'-'}`;document.getElementById('formFeedback').textContent='Data konfirmasi sudah siap. Aplikasi email akan dibuka untuk pengiriman (belum tersambung ke server RSVP).';window.location.href=`mailto:?subject=${encodeURIComponent('RSVP Peluncuran Hidup Kedua')}&body=${encodeURIComponent(text)}`});document.getElementById('year').textContent=new Date().getFullYear();

// Progressive enhancement: scrolling section highlights, reveals and interactions.
(()=>{
  const motionOK=!window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const sectionIds=['tentang','penulis','acara','lokasi'];
  const navLinks=[...document.querySelectorAll('.nav a[href^="#"]')];
  const sections=sectionIds.map(id=>document.getElementById(id)).filter(Boolean);
  function updateActive(){
    let active='';
    for(const section of sections){if(section.getBoundingClientRect().top<=window.innerHeight*.35)active=section.id}
    navLinks.forEach(link=>{const yes=link.getAttribute('href')==='#'+active;link.classList.toggle('is-current',yes);if(yes)link.setAttribute('aria-current','location');else link.removeAttribute('aria-current')});
  }
  window.addEventListener('scroll',updateActive,{passive:true});updateActive();
  if(motionOK && 'IntersectionObserver' in window){
    const targets=document.querySelectorAll('.section-heading,.story-photo,.story-columns,.testimonial,.author-block,.event-grid,.rsvp-grid,.location-grid');
    const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target)}})},{threshold:.05,rootMargin:'0px 0px -35px 0px'});
    targets.forEach(el=>{el.dataset.reveal='';observer.observe(el)});
    document.documentElement.classList.add('has-motion');
  }
  // Close mobile menu on Escape and when tapping outside.
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&navigation.classList.contains('open')){navigation.classList.remove('open');menuToggle.setAttribute('aria-expanded','false');menuToggle.textContent='☰';menuToggle.focus()}});
  document.addEventListener('pointerdown',e=>{if(navigation.classList.contains('open')&&!navigation.contains(e.target)&&!menuToggle.contains(e.target)){navigation.classList.remove('open');menuToggle.setAttribute('aria-expanded','false');menuToggle.textContent='☰'}});
  document.querySelectorAll('.choice-row').forEach(group=>group.querySelectorAll('.choice').forEach(btn=>{btn.setAttribute('aria-pressed',String(btn.classList.contains('active')));btn.addEventListener('click',()=>group.querySelectorAll('.choice').forEach(b=>b.setAttribute('aria-pressed',String(b.classList.contains('active')))))}));
})();
