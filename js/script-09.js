
(()=>{
  /*
    Do not call scrollTo() from the scroll event itself. On iOS Safari that can
    interrupt vertical momentum scrolling. CSS owns the X-axis lock; this is
    only a defensive X reset after viewport changes / completed gestures.
  */
  const snapX=()=>{
    if(innerWidth<=820 && Math.abs(window.scrollX||0)>.5){
      window.scrollTo(0, window.scrollY||0);
    }
  };
  addEventListener('pageshow',()=>requestAnimationFrame(snapX),{passive:true});
  addEventListener('resize',()=>requestAnimationFrame(snapX),{passive:true});
  document.addEventListener('touchend',()=>requestAnimationFrame(snapX),{passive:true});
})();
