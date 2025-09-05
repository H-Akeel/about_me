document.addEventListener('DOMContentLoaded',()=>{
  // Active link highlight
  const path = window.location.pathname.replaceAll('index.html','').replaceAll('/pages/','');
  document.querySelectorAll('.nav-link').forEach(a=>{
    if(a.getAttribute('href').includes(path)) a.classList.add('active');
  });
});