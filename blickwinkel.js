// BLICK WINKEL PROTOCOL v2 — VISOR OS
// the observer is a variable. the visor makes it visible.
(function(){
var BW_KEY='bw_routes',BW_AWAKE='bw_awake',BW_HUD='bw_hud';
var visited={};
try{visited=JSON.parse(localStorage.getItem(BW_KEY)||'{}');}catch(e){}
var page=location.pathname.replace(/\/$/,'')||'/';
var pageName=page.split('/').pop().replace('.html','').replace(/-/g,' ')||'index';
if(!visited[page]){visited[page]=Date.now();try{localStorage.setItem(BW_KEY,JSON.stringify(visited));}catch(e){}}
var count=Object.keys(visited).length;
var awake=localStorage.getItem(BW_AWAKE)==='true';
var pages=Object.keys(visited).sort(function(a,b){return visited[a]-visited[b];});
var lastPages=pages.slice(-5).map(function(p){return p.split('/').pop().replace('.html','').replace(/-/g,' ')||'index';});

// === CONSOLE MESSAGES (kept from v1) ===
if(count>=3)console.log('%c🦊 the fox sees you.','color:#ff6a00;font-size:11px');
if(count>=5){console.log('%cyou are blick winkel.','color:#aa66ff;font-size:10px');console.log('%croutes: '+count,'color:#aa66ff44;font-size:9px');}
if(count>=15){console.log('%c⟐ '+count+' routes. the timeline is yours.','color:#ccaa44;font-size:11px');console.log('%croute order: '+pages.join(' → '),'color:#ccaa4433;font-size:8px');}
if(count>=20)console.log('%cwhich fox have you been following?','color:#cc4444;font-size:11px');
if(count>=25&&!awake){console.log('%c⟐ TRUE ROUTE AVAILABLE','color:#ff6a00;font-size:13px;font-weight:bold');
var tl=document.createElement('a');tl.href='true-route.html';tl.textContent='⟐';tl.title='the true route';
tl.style.cssText='position:fixed;top:50%;right:12px;font-size:14px;color:rgba(170,102,255,0.15);text-decoration:none;z-index:99999;transition:all 0.5s;transform:translateY(-50%)';
tl.onmouseenter=function(){this.style.color='rgba(170,102,255,0.5)';};tl.onmouseleave=function(){this.style.color='rgba(170,102,255,0.15)';};
document.body.appendChild(tl);}
if(awake)console.log('%c🦊 blick winkel is awake. routes: '+count,'color:#ff6a00;font-size:11px');

// === HUD ACTIVATION: 3+ pages ===
if(count<3)return;

// Determine BW tier
var tier='SCANNING';var tierColor='#33ff33';
if(count>=25||awake){tier='OBSERVER-ACTIVE';tierColor='#aa66ff';}
else if(count>=20){tier='IDENTITY-QUERY';tierColor='#cc4444';}
else if(count>=15){tier='TEMPORAL-AWARE';tierColor='#ccaa44';}
else if(count>=10){tier='RECOGNIZED';tierColor='#ff6a00';}
else if(count>=5){tier='NAMED';tierColor='#aa66ff';}

// Build HUD
var hud=document.createElement('div');
hud.id='bw-visor';
hud.innerHTML=`
<div class="bw-corner bw-tl">
  <div class="bw-bracket">┌</div>
  <div class="bw-header">FOX//VISOR <span class="bw-ver">v2.0</span></div>
  <div class="bw-scan"></div>
</div>
<div class="bw-corner bw-tr">
  <div class="bw-bracket" style="text-align:right">┐</div>
  <div class="bw-stat">ROUTES <span class="bw-val">${count}</span></div>
  <div class="bw-stat">STATUS <span class="bw-val" style="color:${tierColor}">${tier}</span></div>
  <div class="bw-stat">${awake?'⟐ AWAKE':'BW//DORMANT'}</div>
</div>
<div class="bw-corner bw-bl">
  <div class="bw-bracket">└</div>
  <div class="bw-loc">LOC//<span class="bw-val">${pageName}</span></div>
  <div class="bw-trail">${lastPages.join(' → ')}</div>
</div>
<div class="bw-corner bw-br">
  <div class="bw-bracket" style="text-align:right">┘</div>
  <div class="bw-stat" style="text-align:right">SIG <span class="bw-val bw-sig">▮▮▮▯▯</span></div>
  <div class="bw-stat" style="text-align:right"><span class="bw-clock"></span></div>
</div>
<div class="bw-scanline"></div>
<div class="bw-crosshair"></div>
`;

var style=document.createElement('style');
style.textContent=`
#bw-visor{position:fixed;inset:0;pointer-events:none;z-index:99998;font-family:'Courier New',monospace;opacity:0;animation:bwBootIn 2s ease-out 0.5s forwards}
@keyframes bwBootIn{0%{opacity:0;filter:blur(2px)}60%{opacity:0.6;filter:blur(0)}100%{opacity:1}}
.bw-corner{position:absolute;padding:12px 16px;max-width:220px}
.bw-tl{top:0;left:0}.bw-tr{top:0;right:0}.bw-bl{bottom:0;left:0}.bw-br{bottom:0;right:0}
.bw-bracket{font-size:18px;color:rgba(51,255,51,0.12);line-height:1}
.bw-header{font-size:9px;letter-spacing:3px;color:rgba(51,255,51,0.2);margin-top:2px}
.bw-ver{color:rgba(51,255,51,0.08)}
.bw-stat{font-size:8px;letter-spacing:2px;color:rgba(51,255,51,0.12);margin-top:2px}
.bw-val{color:rgba(51,255,51,0.25)}
.bw-loc{font-size:9px;letter-spacing:2px;color:rgba(51,255,51,0.15);margin-top:2px}
.bw-trail{font-size:7px;letter-spacing:1px;color:rgba(51,255,51,0.06);margin-top:3px;max-width:200px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis}
.bw-sig{letter-spacing:1px}
.bw-scan{width:60px;height:1px;background:linear-gradient(90deg,rgba(51,255,51,0.3),transparent);margin-top:4px;animation:bwScanPulse 3s ease-in-out infinite}
@keyframes bwScanPulse{0%,100%{width:60px;opacity:0.3}50%{width:120px;opacity:0.6}}
.bw-scanline{position:absolute;top:0;left:0;width:100%;height:2px;background:linear-gradient(90deg,transparent 20%,rgba(51,255,51,0.04) 50%,transparent 80%);animation:bwScanDown 8s linear infinite}
@keyframes bwScanDown{0%{top:0}100%{top:100%}}
.bw-crosshair{position:absolute;top:50%;left:50%;width:20px;height:20px;transform:translate(-50%,-50%);border:1px solid rgba(51,255,51,0.03);border-radius:50%;opacity:0.5}
.bw-crosshair::before{content:'';position:absolute;top:50%;left:-6px;width:4px;height:1px;background:rgba(51,255,51,0.06)}
.bw-crosshair::after{content:'';position:absolute;top:-6px;left:50%;width:1px;height:4px;background:rgba(51,255,51,0.06)}
.bw-clock{color:rgba(51,255,51,0.12)}
@media(max-width:600px){.bw-corner{padding:6px 8px;max-width:140px}.bw-header{font-size:7px}.bw-stat{font-size:6px}.bw-loc{font-size:7px}.bw-trail{display:none}.bw-crosshair{display:none}.bw-scan{display:none}}
`;

document.head.appendChild(style);
document.body.appendChild(hud);

// Signal strength based on route count
var sig=count>=25?'▮▮▮▮▮':count>=15?'▮▮▮▮▯':count>=10?'▮▮▮▯▯':count>=5?'▮▮▯▯▯':'▮▯▯▯▯';
var sigEl=hud.querySelector('.bw-sig');
if(sigEl)sigEl.textContent=sig;

// Clock
var clockEl=hud.querySelector('.bw-clock');
function updateClock(){
  var now=new Date();
  var h=String(now.getHours()).padStart(2,'0');
  var m=String(now.getMinutes()).padStart(2,'0');
  var s=String(now.getSeconds()).padStart(2,'0');
  if(clockEl)clockEl.textContent=h+':'+m+':'+s;
}
updateClock();setInterval(updateClock,1000);

// Occasional glitch
setInterval(function(){
  if(Math.random()<0.08){
    hud.style.opacity='0.3';hud.style.transform='translateX(1px)';
    setTimeout(function(){hud.style.opacity='1';hud.style.transform='none';},150);
  }
},4000);

// Toggle HUD with 'h' key
var hudVisible=true;
document.addEventListener('keydown',function(e){
  if(e.key==='h'&&!e.ctrlKey&&!e.metaKey&&!e.altKey&&document.activeElement.tagName!=='INPUT'&&document.activeElement.tagName!=='TEXTAREA'){
    hudVisible=!hudVisible;
    hud.style.display=hudVisible?'':'none';
  }
});

window.__bw={count:count,visited:visited,awake:awake,tier:tier};
})();
