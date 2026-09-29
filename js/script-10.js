
(()=>{
  try{
    const q=new URL(location.href).searchParams;
    if(q.get('demo')!=='certprint') return;
    const run=()=>setTimeout(()=>{try{certificate({title:q.get('title')||'閒台文合格證書',name:q.get('name')||'學習者',color:'#C94A43'});}catch(e){console.error(e)}},700);
    if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',run,{once:true});else run();
  }catch(e){}
})();
