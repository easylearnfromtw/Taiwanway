
(function(){
  function releaseBoot(){
    var b=document.getElementById('boot-screen');
    if(b){b.style.opacity='0';b.style.visibility='hidden';b.style.pointerEvents='none';setTimeout(function(){try{b.remove()}catch(_){}},500);}
  }
  function releaseWelcomeLoader(){
    var w=document.getElementById('welcome');
    if(!w)return;
    var loader=w.querySelector('.wl-loader');
    if(loader && !w.classList.contains('ready')){
      w.classList.add('ready','instant');
      try{w.style.setProperty('--lp','1')}catch(_){}
      var c=w.querySelector('.wl-count b'); if(c)c.textContent='100';
    }
  }
  setTimeout(releaseBoot,3400);
  setTimeout(releaseWelcomeLoader,4200);
  window.addEventListener('pageshow',function(){setTimeout(releaseBoot,3400);setTimeout(releaseWelcomeLoader,4200)});
})();
