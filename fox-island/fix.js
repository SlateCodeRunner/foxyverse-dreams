window.addEventListener('load',function(){
  var btn=document.getElementById('start-btn');
  if(!btn)return;
  btn.addEventListener('click',function(){
    try{
      // Try calling the IIFE functions first
      if(typeof initA==='function'){initA();}
      else{
        // Fallback: create AudioContext ourselves
        var ac=new(window.AudioContext||window.webkitAudioContext)();
        window.actx=ac;
      }
      // Set music state
      if(typeof musOn!=='undefined'){musOn=true;}
      var mb=document.getElementById('mus-btn');
      if(mb){mb.textContent='\u266a ON';mb.classList.add('on');}
      // Hide title
      var tt=document.getElementById('title');
      if(tt){tt.style.display='none';}
      // Try loading the scene
      if(typeof loadScene==='function'){loadScene('dock');}
      if(typeof playMus==='function'){playMus('dock');}
    }catch(e){
      console.error('Fix.js:',e);
      // Last resort: just hide the title
      var tt=document.getElementById('title');
      if(tt){tt.style.display='none';}
    }
  });
});