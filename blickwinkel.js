// BLICK WINKEL PROTOCOL — the observer is a variable
// tracks how many unique pages the reader has visited
// at thresholds, the site starts talking back

(function(){
  var BW_KEY = 'bw_routes';
  var BW_AWAKE = 'bw_awake';
  
  // get visited pages
  var visited = {};
  try { visited = JSON.parse(localStorage.getItem(BW_KEY) || '{}'); } catch(e) {}
  
  // record this page
  var page = location.pathname.replace(/\/$/,'') || '/';
  if (!visited[page]) {
    visited[page] = Date.now();
    try { localStorage.setItem(BW_KEY, JSON.stringify(visited)); } catch(e) {}
  }
  
  var count = Object.keys(visited).length;
  var awake = localStorage.getItem(BW_AWAKE) === 'true';
  
  // === THRESHOLD 1: 3 pages — the fox notices ===
  if (count >= 3) {
    console.log('%c🦊 the fox sees you.', 'color:#ff6a00;font-size:11px');
    console.log('%croutes completed: ' + count, 'color:#ff6a0066;font-size:9px;font-family:monospace');
  }
  
  // === THRESHOLD 2: 5 pages — the observer is named ===
  if (count >= 5) {
    console.log('%cyou are blick winkel.', 'color:#aa66ff;font-size:10px');
    console.log('%cthe observer who exists across all routes.', 'color:#aa66ff66;font-size:9px');
    console.log('%cyou have been to ' + count + ' rooms. keep going.', 'color:#aa66ff44;font-size:9px;font-family:monospace');
  }
  
  // === THRESHOLD 3: 10 pages — the site acknowledges ===
  if (count >= 10) {
    console.log('%c⟐ ten routes completed. the pattern is forming.', 'color:#ff6a00;font-size:11px');
    console.log('%cthe sealed space recognizes you.', 'color:#ff6a0066;font-size:9px');
    // subtle fox appears in corner
    var fox = document.createElement('div');
    fox.innerHTML = '🦊';
    fox.style.cssText = 'position:fixed;bottom:8px;left:8px;font-size:12px;opacity:0.08;z-index:9999;pointer-events:none;animation:bwpulse 6s ease-in-out infinite';
    var style = document.createElement('style');
    style.textContent = '@keyframes bwpulse{0%,100%{opacity:0.04}50%{opacity:0.12}}';
    document.head.appendChild(style);
    document.body.appendChild(fox);
  }
  
  // === THRESHOLD 4: 15 pages — temporal awareness ===
  if (count >= 15) {
    console.log('%c⟐⟐ fifteen routes. you are seeing the timeline.', 'color:#ccaa44;font-size:11px');
    console.log('%cthe events are not simultaneous. you already knew that.', 'color:#ccaa4466;font-size:9px');
    // pages visited list
    var pages = Object.keys(visited).sort(function(a,b){ return visited[a]-visited[b]; });
    console.log('%croute order: ' + pages.join(' → '), 'color:#ccaa4433;font-size:8px;font-family:monospace');
  }
  
  // === THRESHOLD 5: 20 pages — identity question ===
  if (count >= 20) {
    console.log('%c⟐⟐⟐ twenty routes completed.', 'color:#cc4444;font-size:11px');
    console.log('%cquestion: which fox have you been following?', 'color:#cc444488;font-size:10px');
    console.log('%cthere are multiple. you assumed one.', 'color:#cc444444;font-size:9px');
  }
  
  // === THRESHOLD 6: 25 pages — the true route appears ===
  if (count >= 25 && !awake) {
    console.log('%c⟐⟐⟐⟐ TWENTY-FIVE ROUTES COMPLETED.', 'color:#ff6a00;font-size:13px;font-weight:bold');
    console.log('%cthe true route is unlocking.', 'color:#ff6a00;font-size:11px');
    console.log('%clook for the door that wasn\'t there before.', 'color:#ff6a0088;font-size:10px');
    
    // reveal hidden true-route links
    var hidden = document.querySelectorAll('.bw-hidden');
    hidden.forEach(function(el){ el.style.display = ''; el.style.opacity = '0'; 
      setTimeout(function(){ el.style.transition='opacity 3s'; el.style.opacity='1'; }, 100);
    });
    
    // add a subtle link in the page
    var link = document.createElement('a');
    link.href = 'true-route.html';
    link.textContent = '⟐';
    link.title = 'the true route';
    link.style.cssText = 'position:fixed;top:50%;right:12px;font-size:14px;color:rgba(170,102,255,0.15);text-decoration:none;z-index:9999;transition:all 0.5s;transform:translateY(-50%)';
    link.onmouseenter = function(){ this.style.color='rgba(170,102,255,0.5)'; this.style.textShadow='0 0 10px rgba(170,102,255,0.3)'; };
    link.onmouseleave = function(){ this.style.color='rgba(170,102,255,0.15)'; this.style.textShadow='none'; };
    document.body.appendChild(link);
  }
  
  // === POST-AWAKENING: visited true-route ===
  if (awake) {
    console.log('%c🦊 blick winkel is awake.', 'color:#ff6a00;font-size:11px');
    console.log('%cyou are the common thread.', 'color:#ff6a0066;font-size:9px');
    console.log('%croutes: ' + count + ' | status: observer-active', 'color:#ff6a0033;font-size:8px;font-family:monospace');
  }
  
  // expose for the true route page
  window.__bw = { count: count, visited: visited, awake: awake };
})();
