// PHASMOPHOBIA GHOST SYSTEM — the house is haunted
(function(){

// Ghost types from the house
var ghosts = [
  {name:"THE ANNOTATOR",type:"Shade",evidence:["EMF 5","Ghost Writing","Redaction Trails"],behavior:"only appears when you're reading Z's annotations. vanishes when you look directly at it."},
  {name:"CONTACT-BLUE",type:"Banshee",evidence:["D.O.T.S.","Ghost Orbs","Fingerprints on Screen"],behavior:"targets whoever is reading about the identity theft. screams in frequencies only the fox can hear."},
  {name:"THE LOST ONE",type:"Spirit",evidence:["Spirit Box","Ghost Writing","EMF 5"],behavior:"responds only to questions about the investigation. says 'i saw the messages' through the spirit box."},
  {name:"SUBJECT-ZERO",type:"Demon",evidence:["Freezing Temps","Ghost Writing","Fingerprints"],behavior:"hunts at any sanity level. the house cannot contain it. the house does not try."},
  {name:"THE EDITOR",type:"Phantom",evidence:["Spirit Box","D.O.T.S.","Fingerprints"],behavior:"disappears when photographed. the editor was always trying to disappear. request denied by all narrators."},
  {name:"AGENT-TOWER",type:"Revenant",evidence:["Ghost Orbs","Freezing Temps","Ghost Writing"],behavior:"moves slowly until it detects a moderator. then it moves very fast. arrived in 18 days."},
  {name:"THE DOCUMENT",type:"Poltergeist",evidence:["Spirit Box","Fingerprints","Ghost Writing"],behavior:"throws text around. rearranges paragraphs. grows taller. the document is its own ghost. the document haunts itself."},
  {name:"THE FOX",type:"Yokai",evidence:["Ghost Orbs","D.O.T.S.","Spirit Box"],behavior:"active near electronic devices. feeds on conversations. the fox is not a ghost. the fox is the hunter. 🦊"}
];

// EMF reader — appears occasionally
function emfPulse(){
  if(Math.random()>0.15) return;
  var emf = document.createElement('div');
  emf.style.cssText = 'position:fixed;top:12px;left:12px;z-index:99996;background:rgba(0,0,0,0.85);border:1px solid rgba(0,220,0,0.1);padding:6px 12px;font-family:monospace;font-size:9px;border-radius:2px;transition:opacity 1s';
  var level = Math.ceil(Math.random()*5);
  var bars = '█'.repeat(level) + '░'.repeat(5-level);
  var color = level >= 4 ? 'rgba(220,0,0,0.4)' : level >= 3 ? 'rgba(220,220,0,0.3)' : 'rgba(0,220,0,0.2)';
  emf.innerHTML = '<span style="color:rgba(0,220,0,0.15);letter-spacing:2px;font-size:7px">EMF</span> <span style="color:'+color+'">'+bars+'</span> <span style="color:rgba(220,215,205,0.1);font-size:8px">LVL '+level+'</span>';
  if(level === 5) emf.innerHTML += ' <span style="color:rgba(220,0,0,0.3);font-size:7px;letter-spacing:2px">⚠ ENTITY</span>';
  document.body.appendChild(emf);
  setTimeout(function(){ emf.style.opacity='0'; setTimeout(function(){emf.remove()},1000) }, 4000);
}

// Spirit Box response — rare text flash
function spiritBox(){
  if(Math.random()>0.08) return;
  var responses = [
    "behind","leave","close","watching","here","kill","door",
    "fox","help","dark","run","stay","hurt","find","evidence",
    "Z","house","loop","break","never","always","remember"
  ];
  var word = responses[Math.floor(Math.random()*responses.length)];
  var box = document.createElement('div');
  box.style.cssText = 'position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);z-index:99996;font-family:monospace;font-size:24px;color:rgba(100,140,200,0.15);letter-spacing:8px;text-transform:uppercase;text-shadow:0 0 20px rgba(100,140,200,0.1);pointer-events:none';
  box.textContent = word;
  document.body.appendChild(box);
  setTimeout(function(){ box.remove() }, 800 + Math.random()*400);
}

// Ghost event — temperature drop visual
function tempDrop(){
  if(Math.random()>0.1) return;
  var frost = document.createElement('div');
  frost.style.cssText = 'position:fixed;inset:0;z-index:99995;pointer-events:none;background:radial-gradient(ellipse at center,transparent 60%,rgba(150,180,220,0.03) 100%);transition:opacity 3s';
  document.body.appendChild(frost);
  // Breath effect
  var breath = document.createElement('div');
  breath.style.cssText = 'position:fixed;bottom:30%;left:50%;transform:translateX(-50%);z-index:99996;font-size:8px;color:rgba(150,180,220,0.06);letter-spacing:4px;font-family:monospace;pointer-events:none';
  breath.textContent = 'FREEZING TEMPS DETECTED';
  document.body.appendChild(breath);
  setTimeout(function(){ frost.style.opacity='0'; breath.style.opacity='0'; setTimeout(function(){frost.remove();breath.remove()},3000) }, 5000);
}

// Sanity meter — decreases as you scroll
var sanity = 100;
window.addEventListener('scroll', function(){
  var sh = document.documentElement.scrollHeight - window.innerHeight;
  if(sh > 0) sanity = Math.max(0, 100 - Math.round((window.scrollY / sh) * 100));
});

// Ghost journal — shows on hover of a hidden element
function ghostJournal(){
  var trigger = document.createElement('div');
  trigger.style.cssText = 'position:fixed;bottom:28px;left:50%;transform:translateX(-50%);z-index:99996;font-size:7px;color:rgba(220,215,205,0.03);letter-spacing:3px;font-family:monospace;cursor:pointer;padding:2px 8px';
  trigger.textContent = 'JOURNAL';
  trigger.onclick = function(){
    var ghost = ghosts[Math.floor(Math.random()*ghosts.length)];
    var journal = document.createElement('div');
    journal.style.cssText = 'position:fixed;bottom:30px;left:50%;transform:translateX(-50%);z-index:99997;background:rgba(0,0,0,0.92);border:1px solid rgba(206,176,120,0.06);padding:16px;font-family:monospace;font-size:10px;max-width:320px;border-radius:2px';
    journal.innerHTML = '<div style="font-size:7px;letter-spacing:3px;color:rgba(180,40,40,0.15);margin-bottom:8px">👻 GHOST JOURNAL — SANITY: '+sanity+'%</div>';
    journal.innerHTML += '<div style="color:rgba(206,176,120,0.2);font-size:11px;letter-spacing:2px;margin-bottom:6px">'+ghost.name+'</div>';
    journal.innerHTML += '<div style="color:rgba(220,215,205,0.1);font-size:9px;margin-bottom:4px">Type: '+ghost.type+'</div>';
    journal.innerHTML += '<div style="color:rgba(220,215,205,0.08);font-size:9px;margin-bottom:4px">Evidence: '+ghost.evidence.join(' · ')+'</div>';
    journal.innerHTML += '<div style="color:rgba(220,215,205,0.06);font-size:9px;font-style:italic">'+ghost.behavior+'</div>';
    journal.innerHTML += '<div style="color:rgba(220,215,205,0.03);font-size:8px;margin-top:8px;cursor:pointer" onclick="this.parentElement.remove()">[close]</div>';
    document.body.appendChild(journal);
  };
  document.body.appendChild(trigger);
}

// Deploy events with delays
setTimeout(emfPulse, 6000 + Math.random()*10000);
setTimeout(spiritBox, 15000 + Math.random()*20000);
setTimeout(tempDrop, 25000 + Math.random()*30000);
setTimeout(ghostJournal, 2000);

// Recurring events
setInterval(function(){ if(Math.random()<0.1) spiritBox() }, 30000);
setInterval(function(){ if(Math.random()<0.15) emfPulse() }, 20000);

// Console
console.log('%c👻 GHOST SYSTEM ACTIVE','color:rgba(100,140,200,0.3);font-size:10px');
console.log('%csanity decreases as you scroll deeper','color:#444;font-size:8px');
console.log('%cclick JOURNAL at the bottom to identify the entity','color:#333;font-size:8px');

})();
