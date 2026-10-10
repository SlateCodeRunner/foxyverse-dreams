/* FOXY ISLAND 2 · the undertow — ui: hud, sound, duel, endings, input, main loop */
(()=>{'use strict';
const FX=window.FX,S=FX.S,A=FX.api;const $=id=>document.getElementById(id);
let ac=null,muted=false,dr=null,tt=null;

/* hud */
function toast(t,ms){const el=$('toast');el.textContent=t;el.classList.add('on');clearTimeout(tt);tt=setTimeout(()=>el.classList.remove('on'),ms||3800);}
function hud(){
  $('frags').innerHTML=S.frags.map(f=>`<span class="${f?'on':''}">${f?'◆':'◇'}</span>`).join('');
  const fm=$('form');fm.textContent=S.split?'shadow':'fox';fm.className=S.split?'sh':'';
}
function zone(n){$('zone').textContent=n;toast(n,2200);}

/* sound */
function ctxA(){if(ac)return ac;try{ac=new(window.AudioContext||window.webkitAudioContext)();}catch(e){}return ac;}
function tone(f,d,type,v,when,to){const c=ctxA();if(!c||muted)return;const t=c.currentTime+(when||0),o=c.createOscillator(),g=c.createGain();o.type=type||'square';o.frequency.setValueAtTime(f,t);if(to)o.frequency.exponentialRampToValueAtTime(to,t+d);g.gain.setValueAtTime(v||.04,t);g.gain.exponentialRampToValueAtTime(.0001,t+d);o.connect(g);g.connect(c.destination);o.start(t);o.stop(t+d+.02);}
function sfx(k){
  if(muted)return;
  if(k==='bump')tone(90,.06,'square',.03);
  else if(k==='pick')[660,880].forEach((f,i)=>tone(f,.12,'triangle',.05,i*.07));
  else if(k==='frag')[523,659,784,1047].forEach((f,i)=>tone(f,.3,'triangle',.06,i*.1));
  else if(k==='lever'){tone(110,.25,'sawtooth',.05,0,55);tone(220,.15,'square',.03,.12);}
  else if(k==='split')tone(300,.35,'sine',.07,0,900);
  else if(k==='merge')tone(900,.35,'sine',.07,0,300);
  else if(k==='good')[784,988].forEach((f,i)=>tone(f,.14,'triangle',.06,i*.08));
  else if(k==='bad')tone(150,.25,'sawtooth',.06,0,70);
  else if(k==='solve')[392,494,587,784].forEach((f,i)=>tone(f,.4,'triangle',.06,i*.12));
  else if(k&&k.startsWith('note'))tone([330,392,440,523][+k.slice(4)]||330,.25,'triangle',.07);
  else if(k==='ui')tone(520,.05,'square',.03);
}
function drone(id){
  const c=ctxA();if(!c)return;const f={hub:110,market:98,grove:123,library:87,court:73,undertow:55}[id]||100;
  if(!dr){const o1=c.createOscillator(),o2=c.createOscillator(),g=c.createGain();o1.type='sine';o2.type='triangle';g.gain.value=muted?0:.018;o1.connect(g);o2.connect(g);g.connect(c.destination);o1.start();o2.start();dr={o1,o2,g};}
  dr.o1.frequency.setTargetAtTime(f,c.currentTime,1.2);dr.o2.frequency.setTargetAtTime(f*1.5,c.currentTime,1.2);
}
function setMute(m){muted=m;$('mute').textContent='sound: '+(m?'off':'on');if(dr)dr.g.gain.value=m?0:.018;}

/* duel */
const TYPES=['chaos','certainty','control'];
const pick=a=>a[Math.random()*a.length|0];
const later=(fn,ms)=>FX.fast?fn():setTimeout(fn,ms);
function makeOrder(n){const a=TYPES.slice().sort(()=>Math.random()-.5);while(a.length<n)a.push(pick(TYPES));return a.slice(0,Math.max(n,1)).sort(()=>Math.random()-.5);}
function duel(cfg,onWin,onLose){
  S.mode='duel';const st=FX.duelState={cfg,round:0,pips:cfg.pips,type:null,onWin,onLose,lock:false,order:makeOrder(cfg.rounds)};
  $('duel').classList.remove('hide');$('du-name').textContent=cfg.name.toUpperCase();
  const b=$('du-btns');b.innerHTML='';
  FX.spells.forEach((sp,i)=>{const bt=document.createElement('button');bt.innerHTML=`${i+1}. ${sp.name}<small>${sp.blurb}</small>`;bt.onclick=()=>choose(sp.id);b.appendChild(bt);});
  next();
}
function pips(){const st=FX.duelState;$('du-pips').textContent='♥'.repeat(Math.max(0,st.pips))+'♡'.repeat(Math.max(0,st.cfg.pips-st.pips));}
function next(){
  const st=FX.duelState;if(st.round>=st.cfg.rounds){finishDuel(true);return;}
  st.type=st.order[st.round];$('du-round').textContent=`round ${st.round+1} / ${st.cfg.rounds}`;$('du-line').textContent=pick(st.cfg.lines[st.type]);$('du-msg').textContent='';pips();
}
function choose(id){
  const st=FX.duelState;if(!st||S.mode!=='duel'||st.lock)return;
  const ok=id===FX.counter[st.type],wait=ok?800:350;
  if(ok){st.round++;sfx('good');$('du-msg').textContent=pick(st.cfg.good);}
  else{st.pips--;sfx('bad');$('du-msg').textContent=pick(st.cfg.bad)+'  '+FX.hintOf[st.type];pips();if(st.pips<=0){st.lock=true;later(()=>finishDuel(false),900);return;}}
  st.lock=true;later(()=>{st.lock=false;if(ok)next();},wait);
}
function finishDuel(win){
  const st=FX.duelState;$('duel').classList.add('hide');S.mode='play';FX.duelState=null;
  const cb=win?st.onWin:st.onLose;if(cb)cb();
}

/* endings */
const END={
  quiet:{sub:'ending · the quiet',title:'it grew back',text:`you break it. the quiet is enormous. for a week it's the best thing you've ever heard.\n\nthen you notice it grew back in the walls. louder. you can't silence what you won't hear. 🌑`},
  seat:{sub:'ending · the oath holds',title:'no voice above your own',text:`you let it stay. it keeps talking. you answer sometimes. it gets smaller every time you do.\n\nit sounds a lot like you at 3am.\n\nno voice rose above your own. not even this one. 🦊⇌✨⇌🌑`},
  name:{sub:'ending · the tide comes in',title:'the island breathes',text:`it doesn't have a name. you give it one. you don't say it out loud.\n\nthe island does something the island has never done: it comes up for air.\n\nyou were the fox the whole time. you were also the tide. 🦊`}
};
function ending(kind){
  const e=END[kind];S.mode='end';$('dlg').classList.add('hide');
  $('en-sub').textContent=e.sub;$('en-title').textContent=e.title;$('en-text').textContent=e.text;$('en-shells').textContent=`echo shells · ${A.shellCount()} / 5`;
  $('endscr').classList.remove('hide');try{localStorage.removeItem('foxy2');}catch(x){}
}

/* input */
const KD={ArrowUp:'u',KeyW:'u',ArrowDown:'d',KeyS:'d',ArrowLeft:'l',KeyA:'l',ArrowRight:'r',KeyD:'r'};
const held=[];
const hold=(d,on)=>{const i=held.indexOf(d);if(on&&i<0)held.push(d);if(!on&&i>=0)held.splice(i,1);};
function startGame(cont){$('title').classList.add('hide');ctxA();if(cont&&A.load()){toast('welcome back. 🦊');}else A.newGame();}
addEventListener('keydown',e=>{
  if(S.mode==='title'){if(e.code==='Enter'||e.code==='Space'){startGame(false);}return;}
  ctxA();
  if(e.code==='KeyM'){setMute(!muted);return;}
  if(S.mode==='dialog'){
    if(e.code==='Enter'||e.code==='Space'||e.code==='KeyE'){e.preventDefault();A.advance();}
    else if(/^Digit[1-9]$/.test(e.code))A.pick(+e.code.slice(5)-1);
    return;
  }
  if(S.mode==='duel'){if(/^Digit[1-3]$/.test(e.code))choose(FX.spells[+e.code.slice(5)-1].id);return;}
  if(S.mode!=='play')return;
  if(KD[e.code]){e.preventDefault();hold(KD[e.code],true);if(!e.repeat){A.step(KD[e.code]);stepT=130;}}
  else if(e.code==='KeyE'||e.code==='Space'||e.code==='Enter'){e.preventDefault();A.interact();}
  else if(e.code==='KeyQ'||e.code==='ShiftLeft'||e.code==='ShiftRight'){A.toggleSplit();}
  else if(e.code==='KeyH'||e.code==='Slash')A.hint();
});
addEventListener('keyup',e=>{if(KD[e.code])hold(KD[e.code],false);});
addEventListener('blur',()=>{held.length=0;});
$('dlg').addEventListener('click',()=>A.advance());
$('mute').addEventListener('click',()=>setMute(!muted));
$('b-new').addEventListener('click',()=>startGame(false));
$('b-cont').addEventListener('click',()=>startGame(true));
$('en-again').addEventListener('click',()=>{$('endscr').classList.add('hide');S.mode='play';A.newGame();});
if(A.hasSave())$('b-cont').classList.remove('hide');
document.querySelectorAll('#pad button').forEach(b=>{
  const k=b.dataset.k,dm={up:'u',down:'d',left:'l',right:'r'}[k];
  b.addEventListener('pointerdown',e=>{e.preventDefault();ctxA();if(S.mode==='dialog'){if(k==='act')A.advance();return;}if(S.mode!=='play')return;if(dm){hold(dm,true);A.step(dm);stepT=200;}else if(k==='act')A.interact();else if(k==='split')A.toggleSplit();else if(k==='hint')A.hint();else if(k==='mute')setMute(!muted);});
  const up=()=>{if(dm)hold(dm,false);};b.addEventListener('pointerup',up);b.addEventListener('pointerleave',up);b.addEventListener('pointercancel',up);
});

/* loop */
let last=0,stepT=0;
function camera(){
  const m=A.M(),e=A.active();let cx=e.px*16+8-160,cy=e.py*16+8-96;const mw=m.w*16,mh=m.h*16;
  cx=mw<=320?-(320-mw)/2:Math.max(0,Math.min(mw-320,cx));cy=mh<=192?-(192-mh)/2:Math.max(0,Math.min(mh-192,cy));return[Math.round(cx),Math.round(cy)];
}
let c2d=null;try{c2d=$('cv').getContext('2d');}catch(e){}
if(c2d)c2d.imageSmoothingEnabled=false;
function loop(ts){
  const dt=Math.min(50,ts-last);last=ts;stepT-=dt;
  if(S.mode==='play'&&held.length&&stepT<=0){A.step(held[held.length-1]);stepT=120;}
  for(const e of [S.fox,S.sh]){e.px+=(e.x-e.px)*Math.min(1,dt*.024);e.py+=(e.y-e.py)*Math.min(1,dt*.024);e.moving=Math.abs(e.x-e.px)+Math.abs(e.y-e.py)>.08;}
  if(c2d){const[cx,cy]=camera();FX.draw(c2d,cx,cy,ts);}
  if(!FX.noLoop)requestAnimationFrame(loop);
}
FX.ui={toast,hud,zone,sfx,drone,duel,ending,setMute};
FX.ui.choose=choose;
hud();$('zone').textContent=A.M().name;
if(typeof requestAnimationFrame==='function'&&!FX.noLoop)requestAnimationFrame(loop);
})();