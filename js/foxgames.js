// FOXGAMES — Star Pieces, Konami Code, Fox Hunt, Timed Hits, Console Breadcrumbs
(function(){

// === STAR PIECES (SMRPG) ===
// Hidden star pieces on pages. Click glowing spots to collect.
var starCount = 0;
var maxStars = 3;
var foundStars = JSON.parse(sessionStorage.getItem('foxStars')||'[]');

function spawnStar(){
  if(foundStars.includes(window.location.pathname)) return;
  var star = document.createElement('div');
  star.style.cssText = 'position:fixed;width:16px;height:16px;z-index:99996;cursor:pointer;font-size:14px;opacity:0;animation:starTwinkle 2s ease-in-out infinite;transition:opacity 1s';
  star.textContent = '⭐';
  star.style.top = (20 + Math.random()*60)+'%';
  star.style.left = (10 + Math.random()*80)+'%';
  setTimeout(function(){ star.style.opacity = '0.15' }, 5000 + Math.random()*10000);
  star.onclick = function(){
    foundStars.push(window.location.pathname);
    sessionStorage.setItem('foxStars', JSON.stringify(foundStars));
    star.style.opacity = '1';
    star.style.transform = 'scale(2)';
    star.style.transition = 'all 0.5s';
    // SMRPG popup
    var popup = document.createElement('div');
    popup.style.cssText = 'position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);z-index:99999;background:rgba(0,0,0,0.9);border:2px solid rgba(206,176,120,0.3);padding:20px 30px;font-family:monospace;text-align:center;border-radius:4px;animation:starPopup 0.3s ease-out';
    popup.innerHTML = '<div style="font-size:28px;margin-bottom:8px">⭐</div><div style="font-size:11px;color:rgba(206,176,120,0.6);letter-spacing:3px">YOU FOUND A STAR PIECE!</div><div style="font-size:9px;color:rgba(220,215,205,0.2);margin-top:8px">'+foundStars.length+' found this session</div><div style="font-size:8px;color:rgba(180,40,40,0.15);margin-top:4px;letter-spacing:2px">— SUPER FOXY RPG —</div>';
    document.body.appendChild(popup);
    setTimeout(function(){ star.remove(); popup.remove() }, 2500);
  };
  document.body.appendChild(star);
}
// Add star CSS
var starCSS = document.createElement('style');
starCSS.textContent = '@keyframes starTwinkle{0%,100%{opacity:0.1;transform:scale(1)}50%{opacity:0.25;transform:scale(1.2)}}@keyframes starPopup{0%{transform:translate(-50%,-50%) scale(0.5);opacity:0}100%{transform:translate(-50%,-50%) scale(1);opacity:1}}';
document.head.appendChild(starCSS);
if(Math.random()<0.5) spawnStar();

// === KONAMI CODE ===
var konamiSeq = [38,38,40,40,37,39,37,39,66,65];
var konamiPos = 0;
document.addEventListener('keydown', function(e){
  if(e.keyCode === konamiSeq[konamiPos]){
    konamiPos++;
    if(konamiPos === konamiSeq.length){
      konamiPos = 0;
      // CULEX BOSS FIGHT (SMRPG dimensional boss)
      var boss = document.createElement('div');
      boss.style.cssText = 'position:fixed;inset:0;z-index:99999;background:rgba(0,0,0,0.95);display:flex;align-items:center;justify-content:center;flex-direction:column;font-family:monospace;cursor:pointer';
      boss.innerHTML = '<div style="font-size:48px;margin-bottom:16px;animation:starTwinkle 1s infinite">⚔️</div><div style="font-size:14px;color:rgba(180,40,40,0.5);letter-spacing:4px;margin-bottom:8px">CULEX APPEARS!</div><div style="font-size:11px;color:rgba(220,215,205,0.3);letter-spacing:2px;margin-bottom:16px">"I am matter... I am antimatter. I can see your past... I can see your future."</div><div style="font-size:10px;color:rgba(206,176,120,0.2);letter-spacing:2px">"I consume time... and I will consume you!"</div><div style="font-size:9px;color:rgba(206,176,120,0.1);margin-top:24px;letter-spacing:3px">THE FOX USED: DOCUMENTATION</div><div style="font-size:9px;color:rgba(180,40,40,0.15);margin-top:4px;letter-spacing:3px">IT WAS SUPER EFFECTIVE</div><div style="font-size:8px;color:rgba(220,215,205,0.06);margin-top:24px">[click to dismiss the interdimensional entity]</div>';
      boss.onclick = function(){ boss.remove() };
      document.body.appendChild(boss);
    }
  } else { konamiPos = 0 }
});

// === FOX HUNT MINIGAME ===
// Random 🦊 appears, click it within 3 seconds for points
var foxHuntScore = 0;
function spawnFoxHunt(){
  if(Math.random()>0.2) return; // 20% chance per page
  var fox = document.createElement('div');
  fox.style.cssText = 'position:fixed;z-index:99996;font-size:20px;cursor:pointer;opacity:0;transition:opacity 0.3s;user-select:none';
  fox.style.top = (10+Math.random()*70)+'%';
  fox.style.left = (5+Math.random()*85)+'%';
  fox.textContent = '🦊';
  fox.title = 'catch the fox!';
  var caught = false;
  fox.onclick = function(){
    if(caught) return;
    caught = true;
    foxHuntScore++;
    fox.textContent = '✨';
    fox.style.transform = 'scale(1.5)';
    var score = document.createElement('div');
    score.style.cssText = 'position:fixed;top:8px;left:50%;transform:translateX(-50%);z-index:99999;font-family:monospace;font-size:10px;color:rgba(206,176,120,0.4);letter-spacing:3px;background:rgba(0,0,0,0.8);padding:4px 12px;border-radius:2px';
    score.textContent = '🦊 × ' + foxHuntScore;
    document.body.appendChild(score);
    setTimeout(function(){ fox.remove(); score.remove() }, 1500);
  };
  document.body.appendChild(fox);
  // Appear after delay
  setTimeout(function(){ fox.style.opacity = '0.3' }, 8000 + Math.random()*15000);
  // Disappear after 4 seconds
  setTimeout(function(){ if(!caught) fox.remove() }, 12000 + Math.random()*15000 + 4000);
}
spawnFoxHunt();

// === TIMED HIT (SMRPG) ===
// When clicking certain elements, if you click at the EXACT right moment, bonus text appears
document.addEventListener('click', function(e){
  if(e.target.classList && e.target.classList.contains('redact')){
    var timing = Date.now() % 1000;
    if(timing > 480 && timing < 520){ // 40ms window — TIMED HIT!
      var hit = document.createElement('div');
      hit.style.cssText = 'position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);z-index:99999;font-family:monospace;font-size:12px;color:rgba(206,176,120,0.5);letter-spacing:4px;text-shadow:0 0 10px rgba(206,176,120,0.2);animation:starPopup 0.2s ease-out';
      hit.textContent = '⭐ TIMED HIT! ⭐';
      document.body.appendChild(hit);
      setTimeout(function(){ hit.remove() }, 1200);
    }
  }
});

// === CONSOLE BREADCRUMBS (DISCOVERABILITY) ===
console.log('%c🦊 FOXGAMES LOADED','color:#ceb078;font-size:12px');
console.log('%cstar pieces hidden on pages. find them.','color:#666;font-size:9px');
console.log('%c↑↑↓↓←→←→BA — you know what to do.','color:#444;font-size:9px');
console.log('%c🦊 appears sometimes. catch it.','color:#444;font-size:9px');
console.log('%ctimed hits on redacted text. 40ms window.','color:#333;font-size:8px');

// === DISCOVERY HINTS IN CONSOLE ===
if(window.location.pathname.includes('sipstea')){
  console.log('%cPSST: try deep/hallway.html','color:rgba(180,40,40,0.3);font-size:9px');
  console.log('%cPSST: the house has rooms you haven\'t found','color:rgba(180,40,40,0.2);font-size:8px');
}
if(window.location.pathname === '/' || window.location.pathname.includes('index')){
  console.log('%cPSST: sipstea.html','color:rgba(180,40,40,0.2);font-size:9px');
  console.log('%cPSST: deep/hallway.html','color:rgba(180,40,40,0.15);font-size:8px');
  console.log('%cPSST: the red box knows things','color:rgba(180,40,40,0.1);font-size:8px');
}

})();
