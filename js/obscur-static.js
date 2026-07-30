// obscur-static.js — if the visitor has found the obscur room,
// subtle static interference bleeds into other backroom pages.
// drop <script src="../js/obscur-static.js"></script> on any deep/ page.
(function(){
  try {
    var found = localStorage.getItem('obscur_found');
    if (!found) return;

    // how long ago they found it (decays over 7 days)
    var age = Date.now() - parseInt(found, 10);
    var maxAge = 7 * 24 * 60 * 60 * 1000;
    if (age > maxAge) return;

    var intensity = 1 - (age / maxAge);
    var baseOpacity = 0.015 * intensity;

    var vein = document.createElement('div');
    vein.style.cssText = 'position:fixed;inset:0;pointer-events:none;z-index:97;opacity:' + baseOpacity + ';';
    vein.innerHTML = '<div style="position:absolute;inset:0;background:repeating-linear-gradient(90deg,transparent,transparent 4px,rgba(200,90,53,0.3) 4px,rgba(200,90,53,0.3) 5px);animation:osc-drift 15s linear infinite"></div>';

    var style = document.createElement('style');
    style.textContent = '@keyframes osc-drift{0%{transform:translateX(0)}100%{transform:translateX(5px)}}';

    document.head.appendChild(style);
    document.body.appendChild(vein);

    // rare fracture whisper — a brief red flash at the edges
    setInterval(function(){
      if (Math.random() < 0.04 * intensity) {
        var flash = document.createElement('div');
        flash.style.cssText = 'position:fixed;inset:0;pointer-events:none;z-index:96;background:radial-gradient(circle at 50% 50%,transparent 60%,rgba(200,90,53,0.04) 100%);opacity:0;transition:opacity 0.3s;';
        document.body.appendChild(flash);
        requestAnimationFrame(function(){ flash.style.opacity = '1'; });
        setTimeout(function(){
          flash.style.opacity = '0';
          setTimeout(function(){ flash.remove(); }, 500);
        }, 200);
      }
    }, 8000);
  } catch(e){}
})();
