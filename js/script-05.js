/* Decoded, sample-continuous ambience loops. No external libraries. */
(() => {
  'use strict';
  let ctx, master;
  const cache = new Map(), active = new Set();
  const issues = [];
  function ensure() {
    if (!ctx) {
      const C = window.AudioContext || window.webkitAudioContext;
      if (!C) throw new Error('Web Audio unavailable');
      ctx = new C(); master = ctx.createDynamicsCompressor();
      master.threshold.value=-12;master.knee.value=12;master.ratio.value=4;master.attack.value=.008;master.release.value=.2;master.connect(ctx.destination);
    }
    return ctx;
  }
  function blendLoop(buffer, context) {
    const n=Math.min(Math.floor(buffer.sampleRate*.16),Math.floor(buffer.length/4));
    if(n<2)return buffer;
    const out=context.createBuffer(buffer.numberOfChannels,buffer.length-n,buffer.sampleRate);
    for(let c=0;c<buffer.numberOfChannels;c++){
      const src=buffer.getChannelData(c), dst=out.getChannelData(c); dst.set(src.subarray(n));
      for(let i=0;i<n;i++){
        // Complementary raised-cosine weights avoid boosting correlated material.
        const t=.5-.5*Math.cos(Math.PI*i/(n-1));
        dst[dst.length-n+i]=src[src.length-n+i]*(1-t)+src[i]*t;
      }
    }
    return out;
  }
  class LoopTrack {
    constructor(url) { this.url=url;this.paused=true;this._volume=0;this.epoch=0;this.currentTime=0;active.add(this); }
    get volume(){return this._volume;}
    set volume(v){this._volume=Math.max(0,Math.min(1,Number(v)||0));if(this.gain)this.gain.gain.setTargetAtTime(this._volume,ctx.currentTime,.015);}
    async play(){
      if(!this.paused)return;
      this.paused=false;const token=++this.epoch;
      try{
        const c=ensure();await c.resume();
        if(!cache.has(this.url))cache.set(this.url,(async()=>{
          const controller=new AbortController(), timer=setTimeout(()=>controller.abort(),10000);
          try{
            // Resolve through the site's Audio wrapper first. Embedded soundscape files
            // become blob: URLs here, so hosted builds do not depend on a physical
            // /soundscape/ directory. Fall back to the original URL only when needed.
            let resolved=this.url;
            try{const probe=new Audio(this.url); if(probe&&probe.src) resolved=probe.src;}catch(_){}
            const r=await fetch(resolved,{signal:controller.signal});if(!r.ok)throw new Error('HTTP '+r.status);return blendLoop(await c.decodeAudioData(await r.arrayBuffer()),c);
          }finally{clearTimeout(timer);}
        })().catch(e=>{cache.delete(this.url);throw e;}));
        const buffer=await cache.get(this.url);while(cache.size>8)cache.delete(cache.keys().next().value);if(this.paused||token!==this.epoch||document.hidden)return;
        const source=c.createBufferSource(), gain=c.createGain();source.buffer=buffer;source.loop=true;gain.gain.setValueAtTime(0,c.currentTime);gain.gain.linearRampToValueAtTime(this._volume,c.currentTime+.12);
        const high=c.createBiquadFilter(), low=c.createBiquadFilter();high.type='highpass';high.frequency.value=65;low.type='lowpass';low.frequency.value=this.url.includes('/amb_')?4200:14000;
        source.connect(high).connect(low).connect(gain).connect(master);this.source=source;this.gain=gain;this.nodes=[source,high,low,gain];source.start();
      }catch(e){if(token===this.epoch)this.paused=true;issues.push({url:this.url,error:String(e)});throw e;}
    }
    pause(){this.paused=true;this.epoch++;const nodes=this.nodes;this.nodes=null;const source=this.source,gain=this.gain;this.source=null;this.gain=null;if(source){const at=ctx.currentTime;if(gain){gain.gain.cancelScheduledValues(at);gain.gain.setTargetAtTime(0,at,.012);}try{source.stop(at+.06);}catch{}setTimeout(()=>nodes.forEach(n=>n.disconnect()),100);}}
    dispose(){this.pause();active.delete(this);}
  }
  window.LoopAudio={pauseAll(){active.forEach(t=>t.pause());},Track:LoopTrack,blendLoop,issues,get activeCount(){return [...active].filter(t=>!t.paused).length;}};
})();
