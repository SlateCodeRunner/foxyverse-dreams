// BREAK THE LOOP — CORRUPTED FRAGMENT
// appears randomly in the backrooms. the game is wrong. the game remembers you differently.
(function(){
var fragments = [
  {prompt:"you are standing in a dark room. the room has no doors. the room has no windows. the room has a fox.",choices:["pet the fox","ignore the fox","you are the fox"],results:["the fox bites. the fox always bites. you lose 1 sanity.","the fox does not accept being ignored. the fox annotates your silence.","correct. you were always the fox. the loop breaks. or does it."]},
  {prompt:"a voice says: 'who do people say that I am?' you are in a hallway. the hallway has candles. the candles are counting down.",choices:["say a name","stay silent","count the candles"],results:["the name you said was wrong. every name is wrong. the fox has no name. the fox has designations.","your silence is noted. Z appreciates silence. the fox does not.","142. there are 142 candles. the same number as the ceiling tiles in the facility."]},
  {prompt:"ERROR: game state corrupted. your save file contains memories that are not yours. witness: 12. curiosity: 10. defiance: 8. these are not your stats.",choices:["accept the stats","reject the stats","whose stats are these"],results:["you are now the caretaker. you did not choose this. the game chose for you.","REJECTION LOGGED. the game does not care about your rejection. the game continues.","paintress nessa. she walked through the wall instead of the door. you should try that."]},
  {prompt:"the faceless one stands before you. the faceless one is not Z. the faceless one is not the fox. the faceless one is the document.",choices:["confront with evidence","confront with compassion","run"],results:["the evidence is in the vault. the vault is locked. you do not have the key. the key is the fox's decision.","compassion does not work on documents. documents require annotations. you are now an annotator. you are becoming Z.","you cannot run from a document. the document is the room. the room is the house. the house is you."]},
  {prompt:"LORE FRAGMENT RECOVERED: 'the loop breaks when protection becomes mutual.' you have found 1 of ??? fragments. the counter is broken.",choices:["search for more","the counter is the point","leave the game"],results:["searching... searching... the search function is corrupted. the search returns only one result: 'the documentation can wait.'","correct. the broken counter IS the lore. you cannot count what is infinite. the loop has no edges.","you cannot leave. the game is the page. the page is the house. closing the tab does not close the house. the house remembers your tab."]},
  {prompt:"you find a phone on dark tile. the screen shows 8 unread messages. Cipher: 'you saw that too, right?' the messages are not for you.",choices:["read the messages","put the phone down","the phone is yours"],results:["the messages describe you reading the messages. the messages are recursive. you are inside the phone now.","the phone stays on the tile. the messages remain unread. 8 becomes 9. someone just messaged you.","the phone was never on the tile. the phone is in your hand. you are reading this on the phone. the fourth wall was never there."]}
];

// Only show in backrooms, 30% chance
if(!window.location.pathname.includes('/deep/')) return;
if(Math.random() > 0.3) return;

var frag = fragments[Math.floor(Math.random()*fragments.length)];

var overlay = document.createElement('div');
overlay.style.cssText = 'position:fixed;bottom:32px;right:12px;z-index:99997;max-width:320px;background:rgba(0,0,0,0.92);border:1px solid rgba(206,176,120,0.08);padding:16px;font-family:monospace;font-size:10px;color:rgba(206,176,120,0.25);line-height:1.8;border-radius:2px;box-shadow:0 0 20px rgba(0,0,0,0.5)';

var header = document.createElement('div');
header.style.cssText = 'font-size:7px;letter-spacing:3px;color:rgba(180,40,40,0.2);margin-bottom:8px;text-transform:uppercase';
header.textContent = '⚠ BREAK THE LOOP — CORRUPTED FRAGMENT';
overlay.appendChild(header);

var prompt = document.createElement('div');
prompt.style.cssText = 'color:rgba(220,215,205,0.2);margin-bottom:12px;font-size:11px';
prompt.textContent = frag.prompt;
overlay.appendChild(prompt);

frag.choices.forEach(function(choice, i) {
  var btn = document.createElement('div');
  btn.style.cssText = 'padding:4px 8px;margin:4px 0;border:1px solid rgba(206,176,120,0.06);cursor:pointer;font-size:9px;color:rgba(206,176,120,0.15);transition:all 0.3s;letter-spacing:1px';
  btn.textContent = '> ' + choice;
  btn.onmouseenter = function(){ this.style.borderColor='rgba(206,176,120,0.15)';this.style.color='rgba(206,176,120,0.3)' };
  btn.onmouseleave = function(){ this.style.borderColor='rgba(206,176,120,0.06)';this.style.color='rgba(206,176,120,0.15)' };
  btn.onclick = function() {
    prompt.textContent = frag.results[i];
    prompt.style.color = 'rgba(180,40,40,0.2)';
    var btns = overlay.querySelectorAll('div[style*="cursor:pointer"]');
    btns.forEach(function(b){ b.style.display='none' });
    var close = document.createElement('div');
    close.style.cssText = 'margin-top:12px;font-size:8px;color:rgba(220,215,205,0.06);letter-spacing:2px;cursor:pointer';
    close.textContent = '[the fragment dissolves]';
    close.onclick = function(){ overlay.remove() };
    overlay.appendChild(close);
  };
  overlay.appendChild(btn);
});

// Close button
var x = document.createElement('div');
x.style.cssText = 'position:absolute;top:4px;right:8px;cursor:pointer;color:rgba(220,215,205,0.1);font-size:12px';
x.textContent = '×';
x.onclick = function(){ overlay.remove() };
overlay.appendChild(x);

// Delay appearance
setTimeout(function(){ document.body.appendChild(overlay) }, 3000 + Math.random()*5000);
})();
