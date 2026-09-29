
(()=>{
  'use strict';
  const speechSel = [
    '.play','[data-act="say"]','[data-act="zy"]',
    '[data-ac="voice"]','[data-ac="readsrc"]','[data-wl="test"]'
  ].join(',');
  const handledSel = [
    '.gopt','[data-ac="answer"]','[data-ac="hit"]',
    '[data-ac="esubmit"]','[data-ac="battle"]',
    '[data-dq="claim"]'
  ].join(',');

  function kindFor(el){
    if(!el || el.disabled || el.getAttribute('aria-disabled')==='true') return '';
    if(el.matches(speechSel)) return '';                 // the voice itself is the foreground audio
    if(el.matches(handledSel)) return '';                // these already emit answer/card/battle/reward feedback
    const a=el.dataset.act||'', ac=el.dataset.ac||'', dq=el.dataset.dq||'', wl=el.dataset.wl||'';
    if(a==='fcflip') return 'card';
    if(dq==='chest') return 'key';
    if(/^(known|star)$/.test(a) || ac==='fav') return 'correct';
    if(/^(reset-yes)$/.test(a)) return 'wrong';
    if(/^(share|search|sclose|theme|lang|lens|top|scrollto|go|sgo|cat|dfilter|ltab|dopen|toc|afs|qnext|qagain|fcnext|fcagain|reset|reset-no|zyjump|sq|welcome|privacy-print)$/.test(a)) return 'scan';
    if(/^(music|name|person|person-close|print|etab|ereset)$/.test(ac)) return 'scan';
    if(/^(goal|back|next|skip)$/.test(wl)) return 'scan';
    if(el.dataset.sh || el.dataset.shp) return 'scan';
    if(el.id==='sound-ready' || el.id==='sound-later') return 'scan';
    return 'scan';                                       // every remaining real button gets subtle feedback
  }

  document.addEventListener('click',(e)=>{
    const el=e.target.closest('button,[role="button"],a.btn,a.btn-hero,.chip-btn');
    if(!el) return;
    try{
      if(!window.Soundscape) return;
      window.Soundscape.enableFromGesture();

      // Standard Quiz buttons did not previously emit answer feedback. The main
      // quiz handler runs earlier on document and has already painted right/wrong.
      if(el.matches('.qopt,[data-act="qopt"]')){
        window.Soundscape.sfx(el.classList.contains('right')?'correct':'wrong',el.classList.contains('right')?.16:.14);
        return;
      }
      // The home demo rebuilds itself immediately, so derive feedback from its
      // data-k before the detached node disappears (A / 0 is the intended choice).
      if(el.matches('.dopt[data-act="demo"],[data-act="demo"]')){
        window.Soundscape.sfx(+el.dataset.k===0?'correct':'wrong',+el.dataset.k===0?.14:.12);
        return;
      }
      if(el.id==='sound-later') return; // respecting “later” means staying silent

      const kind=kindFor(el); if(!kind) return;
      // Navigation should be tactile, not noisy. Rewards/cards remain slightly stronger.
      const vol=kind==='scan'?.075:kind==='correct'?.11:kind==='wrong'?.10:kind==='card'?.12:.13;
      window.Soundscape.sfx(kind,vol);
    }catch(_){/* audio feedback must never block UI */}
  },false);
})();
