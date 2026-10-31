/* FOX ISLAND — EXPANSION: the Moonlit Pier, 4 new characters, new puzzles. loaded after fix.js */
(function(){
'use strict';
var ED=window.EXP_DLG;
/* ---------- style ---------- */
var css=document.createElement('style');
css.textContent=[
".bg-pier{background:#07061a!important;position:relative;overflow:hidden}",
".bg-pier::before{content:'';position:absolute;inset:0;background:url('bg/dock.jpg') 4% 92%/240% auto no-repeat;filter:hue-rotate(35deg) brightness(.6) saturate(1.25) contrast(1.05);z-index:0}",
".bg-pier::after{content:'';position:absolute;inset:0;background:radial-gradient(ellipse at 50% 30%,rgba(255,190,90,.1),rgba(6,4,24,.6) 85%);z-index:0;pointer-events:none}",
".lantern{position:absolute;width:5.5%;height:13%;z-index:3;border-radius:8px 8px 5px 5px;background:linear-gradient(#2a2538,#1a1626);border:2px solid #4a3f66;box-shadow:inset 0 0 8px #000;transition:all .5s;pointer-events:none}",
".lantern::before{content:'';position:absolute;left:50%;top:-16px;width:2px;height:16px;background:#4a3f66}",
".lantern.lit{background:radial-gradient(circle at 50% 55%,#fff3b0,#ffb347 55%,#c8641e);border-color:#ffd27a;box-shadow:0 0 24px 9px rgba(255,190,80,.6),inset 0 0 10px rgba(255,255,255,.3)}",
".lantern.k-burner.lit{background:radial-gradient(circle at 50% 55%,#ffd0b0,#ff6a3a 55%,#a02a10);box-shadow:0 0 24px 9px rgba(255,90,40,.6)}",
".lantern.k-dreamer.lit{background:radial-gradient(circle at 50% 55%,#e8dcff,#a06bff 55%,#4a2a9a);box-shadow:0 0 24px 9px rgba(160,107,255,.6)}",
".lantern.k-watcher.lit{background:radial-gradient(circle at 50% 55%,#e0f4ff,#6ac0ff 55%,#2a6a9a);box-shadow:0 0 24px 9px rgba(106,192,255,.6)}",
"#dlg-anim .emo{font-size:84px;line-height:168px;text-align:center;filter:drop-shadow(0 0 12px rgba(255,190,90,.45))}"
].join('\n');
document.head.appendChild(css);

/* ---------- items ---------- */
ITEMS['lantern-oil']={n:'Lantern Oil',i:'🛢️',d:'smells like a bedtime story.'};
ITEMS['crow-feather']={n:'Crow Feather',i:'🪶',d:'light as a lie, sharp as a truth.'};
ITEMS['last-lantern']={n:'Last Lantern',i:'🏮',d:'warm. it knows the way back.'};
window.fxRm=function(id){var i=S.inv.indexOf(id);if(i>=0){S.inv.splice(i,1);renderInv();}};
S.pierLit=[];

/* ---------- dialogue registration ---------- */
Object.keys(ED).forEach(function(k){DLG[k]=ED[k];});
var EMO={lampwick:'🏮',moth:'🦋',dregs:'🐈‍⬛',pip:'🐦'};
Object.keys(EMO).forEach(function(k){NPC_IMG[k]='emoji';});
var _setPortrait=setPortrait;
setPortrait=function(key){
  var a=document.getElementById('dlg-anim');
  if(a&&key&&EMO[key]){a.style.width='112px';a.style.height='168px';a.className='on';a.innerHTML='<div class="emo">'+EMO[key]+'</div>';_portraitKey='emo-'+key;return;}
  _setPortrait(key);
};
/* extend existing characters */
var bk=DLG.barkeeper;
bk.push({s:'Barkeeper',t:`"lampwick. sweet old thing. lit every lantern on this island until the court burned. now he stands on the pier and waits for somebody to do it for him. the cat knows a piece of the order. she charges in riddles."`,a:function(){S.flags.lampHeard=1;},ch:[{t:'> "Thanks."',x:1}]});
bk[0].ch.splice(bk[0].ch.length-1,0,{t:'> "The lamplighter on the pier?"',n:bk.length-1,c:function(){return S.flags.dockTalked;}});
var st=DLG.stranger;
st.push({s:'Stranger',t:`"strange? the tide went out. it never does that. there's a pier left of the dock that was underwater. now it's just dark. somebody ought to light it. 🦊"`,a:function(){S.flags.lampHeard=1;},ch:[{t:'> "Noted."',x:1}]});
st[0].ch.push({t:'> "Anything strange lately?"',n:st.length-1});

/* ---------- the pier ---------- */
var ORDER=['watcher','dreamer','keeper','burner'];
var LANT={keeper:[8,12],burner:[26,10],watcher:[60,10],dreamer:[82,12]};
function renderLit(){
  document.querySelectorAll('.lantern').forEach(function(el){
    var k=el.getAttribute('data-k');el.classList.toggle('lit',!!S.flags.pierDone||S.pierLit.indexOf(k)>-1);
  });
}
function light(k){
  if(S.flags.pierDone)return 'warm. lit. it hums.';
  if(!S.flags.lampReady)return S.flags.lampTalk?'cold glass. no oil. maybe the village has some.':'a dark lantern. the lamplighter might say something.';
  if(S.pierLit.indexOf(k)>-1)return 'already burning.';
  if(ORDER[S.pierLit.length]===k){
    S.pierLit.push(k);sfx('spell');renderLit();
    if(S.pierLit.length===ORDER.length)return finish();
    return '<span class="g">the '+k+' lantern catches.</span> '+S.pierLit.length+' / 4';
  }
  S.pierLit=[];renderLit();sfx('fail');flash('flash-pink');
  return '<span class="h">the lanterns gutter. all of them. the pier forgets. try again.</span>';
}
function finish(){
  S.flags.pierDone=1;S.flags.favorPier=1;renderLit();
  setTimeout(function(){addI('last-lantern');sfx('secret');flash('flash-pink');notif('The pier remembers! 🏮','secret');updateQuest();},700);
  return '<span class="s">the last lantern catches. light runs down the pier like it was waiting. somewhere far off, something exhales.</span> talk to lampwick.';
}
function lanternSpot(k,label,look){
  var p=LANT[k];var act=function(){return light(k);};
  return H('ln_'+k,p[0]-1,p[1]-2,8,19,label,'obj',{look:S.flags.lampReady&&!S.flags.pierDone?act:look,take:act,use:act},p[0]+2,Math.min(p[1]+34,80));
}
function bPier(c){
  c.innerHTML+='<div class="npc npc-lampwick" style="left:44%;top:40%"></div>';
  Object.keys(LANT).forEach(function(k){c.innerHTML+='<div class="lantern k-'+k+'" data-k="'+k+'" style="left:'+LANT[k][0]+'%;top:'+LANT[k][1]+'%"></div>';});
  renderLit();
}
SC.pier={nm:'The Moonlit Pier',bg:'bg-pier',enter:'a pier the tide forgot. four dark lanterns, a lamplighter with nothing to light, and the sound of water rethinking itself.',build:bPier,
  hs:function(){return [
    H('lampwick',40,38,12,28,'Lampwick','npc',{look:'an old lamplighter. fox ears gone gray. a wick behind one ear instead of a pencil.',talk:function(){startDlg('lampwick');return 0;},take:0},46,72),
    lanternSpot('keeper','Keeper Lantern','a dark lantern shaped like a clenched hand. the label says KEEPER.'),
    lanternSpot('burner','Burner Lantern','a soot-black lantern. the label says BURNER. it smells like a decision.'),
    lanternSpot('watcher','Watcher Lantern','a lantern with one round window like an eye. WATCHER.'),
    lanternSpot('dreamer','Dreamer Lantern','a lantern with a crescent cut into the glass. DREAMER.'),
    H('pool',6,64,30,28,'Tide Pool','obj',{look:`the water went out so far you can see the pier's legs. something blinks. it's a crab, judging you.`,take:'the crab raises a claw the size of a grain of rice. you reconsider.',use:0},20,80),
    H('pback',78,62,20,30,'Dock →','exit',{walk:function(){fadeGo('dock');return 0;}},88,78)
  ];}};
MAP_LOCS.push({id:'pier',nm:'Pier',r:2,c:0});
if(typeof MUS!=='undefined'&&MUS.dock&&!MUS.pier)MUS.pier=MUS.dock;

/* ---------- hook the pier and new characters into existing scenes ---------- */
function wrapHS(id,extra){var old=SC[id].hs;SC[id].hs=function(){var a=old();var add=extra();return a.concat(add);};}
function wrapBuild(id,fn){var old=SC[id].build;SC[id].build=function(c){old(c);fn(c);};}
wrapHS('dock',function(){return S.flags.dockTalked?[H('pier',2,28,22,34,'Pier ←','exit',{walk:function(){fadeGo('pier');return 0;}},14,62)]:[];});
wrapHS('village',function(){return [H('moth',3,72,10,16,'Moth','npc',{look:'a moth the size of a cat, wearing a tiny scarf. eating a candle.',talk:function(){startDlg('moth');return 0;},take:0},12,84)];});
wrapBuild('village',function(c){c.innerHTML+='<div class="npc npc-moth" style="left:7%;top:76%"></div>';});
wrapHS('tavern',function(){return [H('dregs',27,62,10,13,'Dregs','npc',{look:'a black cat on a barstool. she is judging your posture.',talk:function(){startDlg('dregs');return 0;},take:'the cat looks at your hand. then at you. then at your hand.'},32,80)];});
wrapBuild('tavern',function(c){c.innerHTML+='<div class="npc npc-dregs" style="left:30%;top:66%"></div>';});
wrapHS('garden',function(){return [H('pip',3,1,10,10,'Pip','npc',{look:'a crow on the gatepost. watching you like a landlord.',talk:function(){startDlg('pip');return 0;},take:0},10,30)];});
wrapBuild('garden',function(c){c.innerHTML+='<div class="npc npc-pip" style="left:5%;top:3%"></div>';});
wrapHS('temple',function(){return [H('pillar',2,64,14,22,'Carved Pillar','obj',{look:function(){if(!S.flags.clueWatcher){S.flags.clueWatcher=1;notif('Clue: the watcher begins','info');}return 'worn letters, carved by someone patient: <span class="h">"THE WATCHER BEGINS."</span>';},take:0,use:0},10,86)];});

/* ---------- quest text, hints, ending ---------- */
var _uq=updateQuest;
updateQuest=function(){
  _uq();var el=document.getElementById('quest-text');if(!el)return;
  var t=el.textContent;
  if(S.flags.lampTalk&&!S.flags.pierDone)t+=' | pier: '+(S.flags.lampReady?'light the lanterns':(has('lantern-oil')?'show lampwick the oil':'find lamp oil'));
  var n=favors();if(n>0)t+=' | favors: '+n+'/4';
  el.textContent=t;
};
function favors(){return ['favorPier','favorMoth','favorCat','favorPip'].filter(function(k){return S.flags[k];}).length;}
HINTS.push(
  function(){return S.flags.dockTalked&&!S.visited.has('pier')?'there is a dark pier to the left of the dock. someone should light it.':null;},
  function(){return S.flags.lampTalk&&!S.flags.gotOil&&!has('lantern-oil')&&!S.flags.lampReady?'the moth in the village trades oil for things that point at feelings.':null;},
  function(){return has('lantern-oil')&&!S.flags.lampReady?'bring the oil to the lamplighter on the pier.':null;},
  function(){return S.flags.lampReady&&!S.flags.pierDone?'the cat in the tavern, the pillar in the temple, and the moth each know a piece of the lantern order.':null;}
);
var _showEnd=showEnd;
showEnd=function(){_showEnd();var p=document.getElementById('end-p');if(p)p.innerHTML+='<br><br>'+(S.flags.pierDone?'the pier is lit. ':'')+'island favors: '+favors()+' / 4';};
})();