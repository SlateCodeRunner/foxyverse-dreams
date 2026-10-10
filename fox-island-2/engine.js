/* FOXY ISLAND 2 · the undertow — core engine: state, movement, puzzles, dialogue, save */
(()=>{'use strict';
const FX=window.FX;const $=id=>document.getElementById(id);
const DIRS={u:[0,-1],d:[0,1],l:[-1,0],r:[1,0]};
const S=FX.S={map:'hub',fox:{x:10,y:10,d:'u',px:10,py:10},sh:{x:10,y:10,d:'u',px:10,py:10},split:false,flags:{},frags:[0,0,0,0],shells:{},mode:'title',seq:[],lit:{},hintN:0};
let IDX=new Map();
const M=()=>FX.MAPS[S.map];
function buildIdx(){const m=M();IDX=new Map();for(const o of m.O){const k=o.y*m.w+o.x;if(!IDX.has(k))IDX.set(k,[]);IDX.get(k).push(o);}}
const objsAt=(x,y)=>IDX.get(y*M().w+x)||[];
const flag=k=>!!S.flags[k];const setFlag=(k,v)=>{S.flags[k]=v===undefined?1:v;};
const fragCount=()=>S.frags.filter(Boolean).length;
const shellCount=()=>Object.keys(S.shells).length;
const active=()=>S.split?S.sh:S.fox;
const bridgeOn=(x,y)=>objsAt(x,y).some(o=>o.t==='bridge'&&flag('lever_'+o.lever));
function floorCh(x,y){const m=M();if(x<0||y<0||x>=m.w||y>=m.h)return' ';const c=m.G[y][x];return(c==='~'&&bridgeOn(x,y))?'=':c;}
function platePressed(id){for(const o of M().O)if(o.t==='plate'&&o.id===id)return S.fox.x===o.x&&S.fox.y===o.y;return false;}
function gateOpen(o){return !!((o.plate&&platePressed(o.plate))||(o.lever&&flag('lever_'+o.lever))||(o.flag&&flag(o.flag)));}
function blocks(o){switch(o.t){case'npc':case'statue':case'deco':case'sign':case'lever':case'glyph':return true;case'dais':return !flag('undertow_open');case'gate':return !gateOpen(o);default:return false;}}
function passable(who,x,y){const c=floorCh(x,y);if(c==='#'||c==='T'||c===' ')return false;if((c==='~'||c==='|')&&who!=='sh')return false;for(const o of objsAt(x,y))if(blocks(o))return false;return true;}

/* movement */
function step(d){
  if(S.mode!=='play')return false;
  const e=active();e.d=d;const[dx,dy]=DIRS[d];const nx=e.x+dx,ny=e.y+dy;
  if(!passable(S.split?'sh':'fox',nx,ny)){FX.ui.sfx('bump');return false;}
  e.x=nx;e.y=ny;onEnter();return true;
}
function onEnter(){
  if(S.split)return;const f=S.fox;
  for(const o of objsAt(f.x,f.y)){
    if(o.t==='exit'){goMap(o.to,o.tx,o.ty,o.d);return;}
    if(o.t==='frag'&&!S.frags[o.i]){giveFrag(o.i);return;}
    if(o.t==='shell'&&!S.shells[o.id]){S.shells[o.id]=1;FX.ui.sfx('pick');FX.ui.toast('echo shell · '+shellCount()+' / 5');FX.ui.hud();save();}
    if(o.t==='dais'&&flag('undertow_open')){goMap('undertow',8,10,'u');return;}
  }
}
function toggleSplit(){
  if(S.mode!=='play')return;
  if(!S.split){S.split=true;Object.assign(S.sh,{x:S.fox.x,y:S.fox.y,px:S.fox.x,py:S.fox.y,d:S.fox.d});FX.ui.sfx('split');}
  else{S.split=false;FX.ui.sfx('merge');}
  FX.ui.hud();
}

/* interaction */
function interact(){
  if(S.mode!=='play')return;
  const e=active(),[dx,dy]=DIRS[e.d],os=objsAt(e.x+dx,e.y+dy);
  if(S.split){
    for(const o of os){
      if(o.t==='lever'){pull(o);return;}
      if(o.t==='glyph'){say([['',o.text]]);return;}
      if(['npc','sign','statue','dais'].includes(o.t)){FX.ui.toast('no hands. press Q to come home.');return;}
    }return;
  }
  for(const o of os){
    if(o.t==='npc'){if(FX.talk[o.id])FX.talk[o.id]();return;}
    if(o.t==='sign'){say([['',o.text]]);return;}
    if(o.t==='statue'){press(o);return;}
    if(o.t==='dais'){dais();return;}
    if(o.t==='lever'){FX.ui.toast(`it won't budge. something without a body might pull it.`);return;}
    if(o.t==='glyph'){FX.ui.toast('just a wall.');return;}
  }
}
function pull(o){
  if(flag('lever_'+o.id)){FX.ui.toast('already pulled.');return;}
  setFlag('lever_'+o.id);FX.ui.sfx('lever');FX.ui.toast('something shifts, far away.');save();
}
function press(o){
  if(flag('grove_solved')){FX.ui.toast('the grove is quiet now.');return;}
  const i=S.seq.length;
  if(FX.order[i]!==o.sym){S.seq=[];S.lit={};FX.ui.sfx('bad');FX.ui.toast('the grove forgets. start again.');return;}
  S.seq.push(o.sym);S.lit[o.sym]=1;FX.ui.sfx('note'+i);
  if(S.seq.length===FX.order.length){setFlag('grove_solved');save();FX.ui.sfx('solve');say([['','all four statues hum at once. somewhere north, a gate lets go.']]);}
}
function dais(){
  const n=fragCount();
  if(flag('undertow_open')){say([['','the door is open. step on it.']]);return;}
  if(n<4){say([['',`${n} of 4 sockets are lit. the rest are cold.`]]);return;}
  say([['','four pieces. four sockets. they click in one at a time.'],['',FX.oath.join(' ')],['','the floor lets go.']],()=>{setFlag('undertow_open');FX.ui.sfx('solve');FX.ui.toast('the door is open');save();});
}
function giveFrag(i){
  S.frags[i]=1;FX.ui.sfx('frag');FX.ui.hud();save();
  say([['',`piece ${i+1} of the oath:`],['',`“${FX.oath[i]}”`]],()=>{if(fragCount()===4)say([['',`that's all four. the landing is humming. go home.`]]);});
}

/* dialogue */
const D={q:[],then:null,typing:false,full:'',tm:null,choices:null};
function openDlg(){S.mode='dialog';$('dlg').classList.remove('hide');}
function closeDlg(){$('dlg').classList.add('hide');if(S.mode==='dialog')S.mode='play';}
function say(lines,then){D.q=(Array.isArray(lines)?lines:[lines]).map(l=>typeof l==='string'?{n:'',t:l}:{n:l[0],t:l[1]});D.then=then||null;openDlg();nextLine();}
function nextLine(){clearTimeout(D.tm);if(!D.q.length){closeDlg();const th=D.then;D.then=null;if(th)th();return;}show(D.q.shift());}
function ask(n,t,choices){D.q=[];D.then=null;openDlg();show({n,t,choices});}
function show(l){
  $('dn').textContent=l.n||'';$('dc').innerHTML='';D.choices=l.choices||null;D.full=l.t;const el=$('dt');
  if(FX.fast){D.typing=false;finish();return;}
  el.textContent='';D.typing=true;let i=0;
  const tick=()=>{if(!D.typing)return;i++;el.textContent=l.t.slice(0,i);if(i>=l.t.length){D.typing=false;finish();}else D.tm=setTimeout(tick,16);};tick();
}
function finish(){
  $('dt').textContent=D.full;
  if(D.choices){const c=$('dc');D.choices.forEach((ch,k)=>{const b=document.createElement('button');b.textContent=(k+1)+'. '+ch[0];b.onclick=ev=>{ev.stopPropagation();pick(k);};c.appendChild(b);});}
}
function pick(k){if(S.mode!=='dialog'||!D.choices||!D.choices[k])return;const ch=D.choices[k];D.choices=null;$('dc').innerHTML='';FX.ui.sfx('ui');closeDlg();if(ch[1])ch[1]();}
function advance(){if(S.mode!=='dialog')return;if(D.typing){D.typing=false;clearTimeout(D.tm);finish();return;}if(D.choices)return;nextLine();}

/* world */
function goMap(id,x,y,d,silent){
  S.map=id;Object.assign(S.fox,{x,y,px:x,py:y,d:d||'d',moving:false});Object.assign(S.sh,{x,y,px:x,py:y});S.split=false;S.seq=[];S.lit={};S.hintN=0;
  buildIdx();if(flag('grove_solved'))FX.order.forEach(s=>S.lit[s]=1);
  FX.ui.zone(M().name);FX.ui.hud();FX.ui.drone(id);if(!silent)save();
}
const KEY='foxy2';
function save(){try{localStorage.setItem(KEY,JSON.stringify({map:S.map,x:S.fox.x,y:S.fox.y,flags:S.flags,frags:S.frags,shells:S.shells}));}catch(e){}}
function hasSave(){try{return !!localStorage.getItem(KEY);}catch(e){return false;}}
function load(){try{const j=JSON.parse(localStorage.getItem(KEY));if(!j)return false;S.flags=j.flags||{};S.frags=j.frags||[0,0,0,0];S.shells=j.shells||{};S.mode='play';goMap(j.map,j.x,j.y,'d',true);return true;}catch(e){return false;}}
function newGame(){
  try{localStorage.removeItem(KEY);}catch(e){}
  S.flags={};S.frags=[0,0,0,0];S.shells={};S.mode='play';goMap('hub',10,10,'u',true);save();
  say([['',`the tide went out.`],['',`the island didn't end. it just stopped hiding what was under it.`],['',`arrows or wasd to move. E talks and pulls. Q lets your shadow off the leash.`]]);
}
function hint(){if(S.mode!=='play')return;const h=FX.hints(FX.api);S.hintN=Math.min(2,S.hintN+1);FX.ui.toast(h[S.hintN-1]);}

FX.api={S,M,DIRS,objsAt,floorCh,flag,setFlag,fragCount,shellCount,active,passable,gateOpen,platePressed,step,interact,toggleSplit,say,ask,advance,pick,giveFrag,goMap,hint,newGame,load,save,hasSave,
  duel:(...a)=>FX.ui.duel(...a),ending:k=>FX.ui.ending(k)};
buildIdx();
})();