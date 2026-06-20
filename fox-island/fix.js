// Sprite direction handler - watches player movement and sets CSS classes
(function(){
  var p=document.getElementById('player');
  if(!p)return;
  var lastX=0,lastY=0,idleTimer=null;
  
  // Override player text to empty (hide emoji)
  p.textContent='';
  p.classList.add('idle');
  
  // Watch for style changes on player
  var obs=new MutationObserver(function(){
    var x=parseFloat(p.style.left)||0;
    var y=parseFloat(p.style.top)||0;
    var dx=x-lastX,dy=y-lastY;
    
    if(Math.abs(dx)>0.1||Math.abs(dy)>0.1){
      p.classList.remove('idle','walk-r','walk-l','walk-u','walk-d');
      if(Math.abs(dx)>Math.abs(dy)){
        p.classList.add(dx>0?'walk-r':'walk-l');
      }else{
        p.classList.add(dy>0?'walk-d':'walk-u');
      }
      clearTimeout(idleTimer);
      idleTimer=setTimeout(function(){
        p.classList.remove('walk-r','walk-l','walk-u','walk-d');
        p.classList.add('idle');
      },200);
    }
    lastX=x;lastY=y;
  });
  obs.observe(p,{attributes:true,attributeFilter:['style']});
})();