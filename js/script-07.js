
(()=>{'use strict';
  const root=document.documentElement;
  const syncModalLock=()=>{const open=!!document.querySelector('.cert-save-modal,.cert-name-gate,.cert-award-fx');root.classList.toggle('xw-modal-open',open)};
  const mo=new MutationObserver(syncModalLock);mo.observe(document.documentElement,{childList:true,subtree:true});syncModalLock();
  document.addEventListener('keydown',e=>{
    if(e.key!=='Tab')return;
    const modal=document.querySelector('.cert-save-modal.in,.cert-name-gate.in');if(!modal)return;
    const items=[...modal.querySelectorAll('button:not([disabled]),input:not([disabled]),a[href]')].filter(x=>x.offsetParent!==null);if(items.length<2)return;
    const first=items[0],last=items[items.length-1];
    if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}
  });
})();
