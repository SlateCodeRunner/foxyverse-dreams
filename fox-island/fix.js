// ═══════════════════════════════════════════════
// FOX ISLAND — PATCH v3
// Fixes: save system, map secrets, mobile UX
// Removed: destructive CSS overrides that broke
// player positioning, walk animations, and flipping
// ═══════════════════════════════════════════════
(function(){
var p=document.getElementById('player');
if(!p)return;

// ═══ 1. SAVE SYSTEM ═══
var SAVE_KEY='fox-island-save';

function saveGame(){
  var tt=document.getElementById('title');if(tt&&getComputedStyle(tt).display!=='none')return; // nothing to save on the main menu
  try{
    localStorage.setItem(SAVE_KEY,JSON.stringify({
      scene:S.scene, inv:S.inv.slice(), flags:Object.assign({},S.flags),
      spells:S.spells.slice(), secrets:S.secrets,
      visited:Array.from(S.visited), px:px, py:py, v:2
    }));
  }catch(e){}
}

function loadSave(){
  try{
    var raw=localStorage.getItem(SAVE_KEY);
    if(!raw)return false;
    var d=JSON.parse(raw);
    if(!d||!d.v)return false;
    S.inv.length=0; d.inv.forEach(function(i){S.inv.push(i);});
    Object.keys(S.flags).forEach(function(k){delete S.flags[k];});
    if(d.flags)Object.keys(d.flags).forEach(function(k){S.flags[k]=d.flags[k];});
    S.spells.length=0; if(d.spells)d.spells.forEach(function(s){S.spells.push(s);});
    S.secrets=d.secrets||0;
    S.visited=new Set(d.visited||[]);
    if(typeof renderInv==='function')renderInv();
    if(typeof loadScene==='function'&&d.scene)loadScene(d.scene);
    if(typeof setPos==='function'&&d.px!==undefined)setPos(d.px,d.py);
    return true;
  }catch(e){return false;}
}

// Auto-save every 30 seconds
setInterval(saveGame,30000);

// Save on scene transitions
var origFadeGo=window.fadeGo;
if(typeof origFadeGo==='function'){
  window.fadeGo=function(id){
    origFadeGo(id);
    setTimeout(saveGame,500);
  };
}

// Load save on startup (delayed to let game init)
setTimeout(function(){
  if(loadSave()){
    console.log('[fix.js] Save loaded');
  }
},500);

// ═══ 1b. DELETE SAVE (main menu) ═══
(function(){
  var titleEl=document.getElementById('title');
  if(!titleEl)return;
  var LABEL='\uD83D\uDDD1 DELETE SAVE';
  var del=document.createElement('button');
  del.id='del-save';del.type='button';del.textContent=LABEL;
  del.style.cssText="font-family:'Press Start 2P',cursive;font-size:8px;color:#c9708a;background:transparent;border:1px solid #6a3050;padding:9px 14px;margin-top:22px;cursor:pointer;position:relative;z-index:2;transition:all .2s;display:none";
  titleEl.appendChild(del);
  function hasSave(){try{return !!localStorage.getItem(SAVE_KEY);}catch(e){return false;}}
  function refresh(){del.style.display=hasSave()?'':'none';}
  var armTimer=null;
  function disarm(){armTimer=null;del.textContent=LABEL;del.style.color='#c9708a';del.style.borderColor='#6a3050';del.style.background='transparent';}
  function wipe(){
    try{localStorage.removeItem(SAVE_KEY);}catch(e){}
    // reset the running game back to a clean new game
    S.inv.length=0;S.spells.length=0;S.secrets=0;S.selItem=null;S.duelS={p:0,q:0};S.duelR=0;S.visited=new Set();
    Object.keys(S.flags).forEach(function(k){delete S.flags[k];});
    if(typeof renderInv==='function')renderInv();
    if(typeof loadScene==='function')loadScene('dock');
    if(typeof setPos==='function')setPos(50,78);
    del.textContent='\u2713 SAVE DELETED';del.style.color='#8fd08f';del.style.borderColor='#3a6a3a';
    setTimeout(function(){disarm();refresh();},1500);
  }
  del.onclick=function(e){
    e.stopPropagation();
    if(del.textContent.indexOf('DELETED')>-1)return;
    if(armTimer===null){
      del.textContent='\u26A0 SURE? CLICK AGAIN';del.style.color='#fff';del.style.borderColor='#ff6b8a';del.style.background='rgba(255,107,138,.18)';
      armTimer=setTimeout(disarm,4000);return;
    }
    clearTimeout(armTimer);armTimer=null;wipe();
  };
  // the save is read ~500ms after load; check for it just after that, and again in case storage changes
  setTimeout(refresh,700);setTimeout(refresh,3000);
  window.addEventListener('storage',refresh);
})();
// ═══ 2. MAP SECRETS COUNTER ═══
var mapGrid=document.getElementById('map-grid');
if(mapGrid){
  var obs=new MutationObserver(function(){
    var sec=document.querySelector('.map-secrets');
    if(!sec){
      sec=document.createElement('div');
      sec.className='map-secrets';
      sec.style.cssText='text-align:center;font-size:11px;color:#aa66ff;margin-top:8px;letter-spacing:2px';
      mapGrid.parentElement.insertBefore(sec,document.getElementById('map-close'));
    }
    sec.textContent='secrets: '+S.secrets+'/4';
  });
  obs.observe(mapGrid,{childList:true});
}

// ═══ 3. KEYBOARD SHORTCUTS ═══
document.addEventListener('keydown',function(e){
  if(e.target.tagName==='INPUT'||e.target.tagName==='TEXTAREA')return;
  var key=e.key.toLowerCase();
  // Tab = highlight hotspots
  if(key==='tab'){e.preventDefault();if(typeof toggleHL==='function')toggleHL();}
  // M = map
  if(key==='m'){if(typeof toggleMap==='function')toggleMap();}
  // 1-5 = verb selection
  if(key==='1'){if(typeof sv==='function')sv('look');}
  if(key==='2'){if(typeof sv==='function')sv('use');}
  if(key==='3'){if(typeof sv==='function')sv('take');}
  if(key==='4'){if(typeof sv==='function')sv('talk');}
  if(key==='5'){if(typeof sv==='function')sv('cast');}
  // Escape = close dialogs/map
  if(key==='escape'){
    var dlg=document.getElementById('dlg');
    if(dlg&&dlg.classList.contains('show'))dlg.classList.remove('show');
    var map=document.getElementById('map');
    if(map&&map.classList.contains('show'))map.classList.remove('show');
  }
});

// ═══ 4. MOBILE TOUCH IMPROVEMENTS ═══
if('ontouchstart' in window){
  document.body.style.userSelect='none';
  document.body.style.webkitUserSelect='none';
  // Prevent zoom on double-tap
  var lastTap=0;
  document.addEventListener('touchend',function(e){
    var now=Date.now();
    if(now-lastTap<300)e.preventDefault();
    lastTap=now;
  },{passive:false});
}

// ═══ 5. BLICK WINKEL INTEGRATION ═══
if(typeof window.bw_visit==='function'){
  var origLoad=window.loadScene;
  if(typeof origLoad==='function'){
    window.loadScene=function(id){
      origLoad(id);
      window.bw_visit('fox-island-'+id);
    };
  }
}

console.log('[fix.js] Fox Island Patch v3 loaded');
})();
