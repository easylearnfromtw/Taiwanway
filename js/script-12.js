
(function(){
  // Never allow the legacy boot overlay to trap the app indefinitely.
  setTimeout(function(){
    var boot=document.getElementById('boot-screen');
    if(boot){ boot.classList.add('out'); setTimeout(function(){ if(boot&&boot.parentNode) boot.remove(); },450); }
  },3500);
  window.addEventListener('error',function(e){ console.error('[閒台文 runtime]',e.error||e.message); });
  window.addEventListener('unhandledrejection',function(e){ console.error('[閒台文 promise]',e.reason); });
})();
