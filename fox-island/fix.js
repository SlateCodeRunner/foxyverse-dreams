// ═══════════════════════════════════════════════
// FOX ISLAND — PATCH v2
// sprite flicker · save system · map secrets
// combinations · cast responses · mobile UX
// ═══════════════════════════════════════════════
(function(){
var p=document.getElementById('player');
if(!p)return;

// ═══ 1. SPRITE DIRECTION — kill class conflict ═══
p.textContent='';

// Nuke the OLD walk/idle CSS animations so they never fire
var killOld=document.createElement('style');
killOld.textContent='#player.walk,#player.fl.walk,#player.fl.idle,#player.fl{animation:none!important;transform:none!important}';
document.head.appendChild(killOld);

// Direction watcher — only source of truth for player class
var lastX=0,lastY=0,idleTimer=null;
p.className='idle';
var obs=new MutationObserver(function(){
  var x=parseFloat(p.style.left)||0,y=parseFloat(p.style.top)||0;
  var dx=x-lastX,dy=y-lastY;
  if(Math.abs(dx)>0.1||Math.abs(dy)>0.1){
    p.className=Math.abs(dx)>Math.abs(dy)?(dx>0?'walk-r':'walk-l'):(dy>0?'walk-d':'walk-u');
    clearTimeout(idleTimer);
    idleTimer=setTimeout(function(){p.className='idle';},200);
  }
  lastX=x;lastY=y;
});
obs.observe(p,{attributes:true,attributeFilter:['style']});


// ═══ 2. SAVE SYSTEM ═══
var SAVE_KEY='fox-island-save';

function saveGame(){
  try{
    localStorage.setItem(SAVE_KEY,JSON.stringify({
      scene:S.scene, inv:S.inv.slice(), flags:Object.assign({},S.flags),
      spells:S.spells.slice(), secrets:S.secrets,
      visited:Array.from(S.visited), px:px, py:py, v:1
    }));
  }catch(e){}
}

function loadSave(){
  try{
    var raw=localStorage.getItem(SAVE_KEY);
    if(!raw)return false;
    var d=JSON.parse(raw);
    if(!d||!d.v)return false;
    // Restore state
    S.inv.length=0; d.inv.forEach(function(i){S.inv.push(i);});
    Object.keys(S.flags).forEach(function(k){delete S.flags[k];});
    Object.keys(d.flags).forEach(function(k){S.flags[k]=d.flags[k];});
    S.spells.length=0; d.spells.forEach(function(s){S.spells.push(s);});
    S.secrets=d.secrets||0;
    S.visited.clear();
    (d.visited||[]).forEach(function(v){S.visited.add(v);});
    // Load scene
    document.getElementById('title').style.display='none';
    loadScene(d.scene);
    if(d.px!=null)setPos(d.px,d.py);
    renderInv();
    return true;
  }catch(e){return false;}
}

// Wrap functions for auto-save
var _addI=window.addI;
window.addI=function(id){_addI(id);saveGame();};
var _loadScene=window.loadScene;
window.loadScene=function(id){_loadScene(id);document.getElementById('viewport').setAttribute('data-scene',id);saveGame();};
var _endDuel=window.endDuel;
window.endDuel=function(){_endDuel();saveGame();};
var _closeDlg=window.closeDlg;
window.closeDlg=function(){_closeDlg();saveGame();};

// Wrap showEnd to clear save on completion
var _showEnd=window.showEnd;
window.showEnd=function(){
  try{localStorage.removeItem(SAVE_KEY);}catch(e){}
  _showEnd();
};

// Continue button on title screen
try{
  if(localStorage.getItem(SAVE_KEY)){
    var startBtn=document.getElementById('start-btn');
    var origClick=startBtn.onclick;
    // Restyle start as "new game"
    startBtn.textContent='\u25B6 NEW GAME';
    startBtn.style.fontSize='11px';
    startBtn.onclick=function(){
      try{localStorage.removeItem(SAVE_KEY);}catch(e){}
      origClick();
    };
    // Add continue button
    var cont=document.createElement('button');
    cont.textContent='\u25B6 CONTINUE';
    cont.style.cssText='font-family:"Press Start 2P",cursive;font-size:11px;color:#9b7abf;background:transparent;border:2px solid #9b7abf;padding:10px 22px;cursor:pointer;margin-top:12px;z-index:2;position:relative;transition:all .3s';
    cont.onmouseenter=function(){cont.style.background='#9b7abf';cont.style.color='#0a0a0f';};
    cont.onmouseleave=function(){cont.style.background='transparent';cont.style.color='#9b7abf';};
    cont.onclick=function(){
      initA();musOn=true;
      document.getElementById('mus-btn').textContent='\u266A ON';
      document.getElementById('mus-btn').classList.add('on');
      loadSave();
      if(musOn)playMus(S.scene);
    };
    startBtn.parentNode.insertBefore(cont,startBtn.nextSibling);
  }
}catch(e){}


// ═══ 3. MAP — SECRET ROOMS ═══
var _toggleMap=window.toggleMap;
window.toggleMap=function(){
  _toggleMap();
  // Remove old secret section if re-opening
  var old=document.getElementById('secret-map');
  if(old)old.remove();
  var secrets=[
    {id:'underdock',nm:'\uD83D\uDD2E Underdock',flag:'fdock'},
    {id:'hearth',nm:'\uD83D\uDD2E Hearth',flag:'fhearth'},
    {id:'wellspring',nm:'\uD83D\uDD2E Wellspring',flag:'fwell'},
    {id:'sanctum',nm:'\uD83D\uDD2E Sanctum',flag:'fsanc'}
  ];
  var found=secrets.filter(function(s){return S.visited.has(s.id);});
  if(!found.length)return;
  var wrap=document.createElement('div');
  wrap.id='secret-map';
  wrap.style.cssText='display:flex;gap:6px;margin-top:14px;flex-wrap:wrap;justify-content:center';
  var lbl=document.createElement('div');
  lbl.style.cssText='width:100%;text-align:center;font-family:"Press Start 2P",cursive;font-size:7px;color:rgba(255,100,255,0.3);letter-spacing:3px;margin-bottom:4px';
  lbl.textContent='SECRET ROOMS';
  wrap.appendChild(lbl);
  found.forEach(function(s){
    var btn=document.createElement('button');
    btn.style.cssText='font-family:"Press Start 2P",cursive;font-size:9px;color:#ff6bff;background:'+(s.id===S.scene?'#2a1545':'#1a0a2a')+';border:1px solid rgba(255,100,255,0.3);padding:8px 14px;cursor:pointer;border-radius:4px;transition:all .15s';
    btn.textContent=s.nm;
    btn.onmouseenter=function(){btn.style.borderColor='#ff6bff';btn.style.boxShadow='0 0 10px rgba(255,100,255,.3)';};
    btn.onmouseleave=function(){btn.style.borderColor='rgba(255,100,255,0.3)';btn.style.boxShadow='none';};
    btn.onclick=function(){
      document.getElementById('map').classList.remove('active');
      if(s.id!==S.scene)fadeGo(s.id);
    };
    wrap.appendChild(btn);
  });
  var closeBtn=document.getElementById('map-close');
  document.getElementById('map').insertBefore(wrap,closeBtn);
};


// ═══ 4. MORE ITEM COMBINATIONS ═══
// Flavor combos — r:null means no new item, just text
COMBOS['fox-mask+cinder-ember']={r:null,rm:[],t:'<span class="s">the mask catches fire briefly — a vision of nine foxes dancing in flames. then silence. both items remain, warmer.</span>'};
COMBOS['cinder-ember+fox-mask']=COMBOS['fox-mask+cinder-ember'];
COMBOS['hearth-coal+spring-tear']={r:null,rm:[],t:'<span class="h">the coal hisses in the tear. steam rises — it smells like every conversation you\'ve ever had near a fire. both glow but remain.</span>'};
COMBOS['spring-tear+hearth-coal']=COMBOS['hearth-coal+spring-tear'];
COMBOS['cinder-ember+sanctum-rune']={r:null,rm:[],t:'<span class="h">ember and rune pulse in unison. for a second you hear all four secret songs at once. then silence. both remain.</span>'};
COMBOS['sanctum-rune+cinder-ember']=COMBOS['cinder-ember+sanctum-rune'];
COMBOS['fox-mask+skeleton-key']={r:null,rm:[],t:'<span class="h">the mask\'s expression shifts to match the key\'s teeth. then relaxes. "not yet," it whispers.</span>'};
COMBOS['skeleton-key+fox-mask']=COMBOS['fox-mask+skeleton-key'];
COMBOS['old-compass+charged-crystal']={r:null,rm:[],t:'<span class="h">the compass needle spins wildly then locks — pointing at YOU. the crystal confirms what the compass always knew.</span>'};
COMBOS['charged-crystal+old-compass']=COMBOS['old-compass+charged-crystal'];
COMBOS['spring-tear+moonwater']={r:null,rm:[],t:'<span class="h">tear dissolves into moonwater. for a moment the liquid shows your reflection — but with fox ears. both remain.</span>'};
COMBOS['moonwater+spring-tear']=COMBOS['spring-tear+moonwater'];
COMBOS['sanctum-rune+skeleton-key']={r:null,rm:[],t:'<span class="s">the rune inscribes itself onto the key. the key hums a note you\'ve never heard. then the inscription fades. both remember.</span>'};
COMBOS['skeleton-key+sanctum-rune']=COMBOS['sanctum-rune+skeleton-key'];

// Override tryCombine to handle flavor combos (r:null)
var _tryCombine=window.tryCombine;
window.tryCombine=function(a,b){
  var key=a+'+'+b;
  var combo=COMBOS[key];
  if(combo&&combo.r===null){
    // Flavor combo — show text, don't modify inventory
    sfx('spell');flash('flash-purple');say(combo.t,5000);
    return true;
  }
  return _tryCombine(a,b);
};


// ═══ 5. CAST RESPONSES ═══
var castLines={
  npc:['they deflect with a raised eyebrow. impressive.','the spell bounces off their personality.','they\'re immune. probably used to it.','you cast. they stare. "was that supposed to do something?"','magic slides off. they have wards. or just vibes.'],
  exit:['you cast at a doorway. it remains a doorway. revolutionary.','the path absorbs the magic and glows briefly. then stops caring.','a portal? no. still just a door. but shinier.'],
  obj:['sparkles land. nothing transforms. but it looks prettier for a second.','the spell sinks in. something hums. then stops.','magic accepted. effect pending. the island processes at its own speed.','a faint resonance. not enough to change it but enough to notice.','your spell is acknowledged. the universe files it under "noted."'],
  item:['the item shimmers but holds its shape. it knows what it is.','cast received. the item vibrates — acknowledging, not obeying.'],
  secret:['the spell reveals... that this is worth investigating further.','magic pools here. something is hidden. the charged crystal might help.','a flicker. definitely something here. try USE with the right item.']
};
var _execAction=window.execAction;
window.execAction=function(spot){
  if(S.verb==='cast'&&!spot.act.cast){
    var lines=castLines[spot.tp]||castLines.obj;
    var line=lines[Math.floor(Math.random()*lines.length)];
    if(S.spells.length>=3&&spot.tp==='npc')line='all three spells fire at once. '+spot.lbl+' is unimpressed but secretly flattered.';
    say(line);sfx('spell');flash('flash-purple');
    return;
  }
  _execAction(spot);
};


// ═══ 6. MOBILE UX ═══
var mob=document.createElement('style');
mob.textContent='\
@media(max-width:820px){\
  .vb{padding:8px 10px!important;font-size:8px!important;min-height:36px!important}\
  #inv{position:relative!important;-webkit-overflow-scrolling:touch!important}\
  #inv::after{content:"\\2192";position:absolute;right:2px;top:50%;transform:translateY(-50%);color:rgba(255,170,50,0.15);font-size:14px;pointer-events:none;animation:scrollH 2s ease-in-out infinite;z-index:5}\
  @keyframes scrollH{0%,100%{opacity:.15;transform:translateY(-50%)}50%{opacity:.4;transform:translateY(-50%) translateX(3px)}}\
  .is{width:42px!important;height:42px!important;font-size:22px!important}\
  .hs-lbl{font-size:12px!important}\
  .dc{padding:12px 14px!important;font-size:16px!important;min-height:44px!important}\
  .do{padding:12px 14px!important;font-size:15px!important;min-height:44px!important}\
  .map-loc{font-size:10px!important;min-height:44px!important}\
}\
@media(max-width:480px){\
  .vb{padding:6px 7px!important;font-size:7px!important}\
  #quest-text{font-size:6px!important}\
}';
document.head.appendChild(mob);

// Hide scroll arrow when inventory doesn't overflow
var _renderInv=window.renderInv;
window.renderInv=function(){
  _renderInv();
  setTimeout(function(){
    var inv=document.getElementById('inv');
    if(inv){
      var arrow=inv.scrollWidth>inv.clientWidth;
      inv.style.setProperty('--show-arrow',arrow?'1':'0');
    }
  },50);
};

// Also save after spell learning (spells.push happens inside addI flow)
// and after garden solve / other flag-setting actions
// Periodic save as safety net
setInterval(saveGame,30000);

})();

