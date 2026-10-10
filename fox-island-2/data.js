/* FOXY ISLAND 2 · the undertow — world data: maps, objects, duels, quiz */
(()=>{'use strict';
const FX=window.FX=window.FX||{};
FX.MAPS={};
const grid=(w,h,c)=>Array.from({length:h},()=>Array(w).fill(c));
const rect=(G,x0,y0,x1,y1,c)=>{for(let y=y0;y<=y1;y++)for(let x=x0;x<=x1;x++)G[y][x]=c;};
const outline=(G,x0,y0,x1,y1,c)=>{rect(G,x0,y0,x1,y0,c);rect(G,x0,y1,x1,y1,c);rect(G,x0,y0,x0,y1,c);rect(G,x1,y0,x1,y1,c);};
function defMap(id,name,w,h,base,theme,fn){const G=grid(w,h,base);outline(G,0,0,w-1,h-1,'#');const O=[];fn(G,O);FX.MAPS[id]={id,name,w,h,G,O,theme};}

/* THE LANDING (hub) */
defMap('hub','the landing',22,14,'.','sand',(G,O)=>{
  rect(G,2,2,5,4,',');rect(G,16,2,19,4,',');rect(G,3,9,6,11,',');rect(G,15,9,19,11,',');
  rect(G,9,5,12,8,':');
  for(const [x,y] of [[10,0],[11,0],[10,13],[11,13],[0,6],[0,7],[21,6],[21,7]])G[y][x]='.';
  for(const [x,y] of [[3,3],[18,3],[4,10],[17,10],[7,2],[14,12]])G[y][x]='T';
  O.push({t:'exit',x:10,y:0,to:'market',tx:12,ty:14,d:'u'},{t:'exit',x:11,y:0,to:'market',tx:13,ty:14,d:'u'});
  O.push({t:'exit',x:21,y:6,to:'grove',tx:1,ty:7,d:'r'},{t:'exit',x:21,y:7,to:'grove',tx:1,ty:8,d:'r'});
  O.push({t:'exit',x:0,y:6,to:'library',tx:22,ty:6,d:'l'},{t:'exit',x:0,y:7,to:'library',tx:22,ty:7,d:'l'});
  O.push({t:'exit',x:10,y:13,to:'court',tx:12,ty:1,d:'d'},{t:'exit',x:11,y:13,to:'court',tx:13,ty:1,d:'d'});
  for(let i=0;i<4;i++)O.push({t:'dais',i,x:10+(i%2),y:6+(i>>1)});
  O.push({t:'npc',id:'stranger',x:6,y:9,look:{cloth:'#3a3a4a',hair:'#222',ears:'#8a8a9a',hood:1}});
  O.push({t:'sign',x:8,y:5,text:`four sockets. one oath. the door under the island has been waiting a long time.`});
  O.push({t:'shell',id:'hub',x:19,y:12});
});

/* THE DROWNED MARKET (north) */
defMap('market','the drowned market',26,16,'.','sand',(G,O)=>{
  rect(G,1,6,24,9,'~');
  outline(G,2,1,8,5,'#');rect(G,3,2,7,4,'=');G[5][5]='.';
  G[15][12]='.';G[15][13]='.';
  O.push({t:'exit',x:12,y:15,to:'hub',tx:10,ty:1,d:'d'},{t:'exit',x:13,y:15,to:'hub',tx:11,ty:1,d:'d'});
  O.push({t:'plate',id:'p1',x:5,y:12});
  O.push({t:'gate',x:5,y:5,plate:'p1',lever:'L1'});
  O.push({t:'lever',id:'L1',x:5,y:3});
  for(let y=6;y<=9;y++)for(const x of [13,14])O.push({t:'bridge',x,y,lever:'L1'});
  O.push({t:'frag',i:0,x:20,y:2});
  O.push({t:'shell',id:'market',x:23,y:4});
  O.push({t:'deco',kind:'stall',x:11,y:2},{t:'deco',kind:'stall',x:16,y:3},{t:'deco',kind:'stall',x:19,y:4});
  O.push({t:'deco',kind:'crate',x:2,y:13},{t:'deco',kind:'crate',x:3,y:13},{t:'deco',kind:'crate',x:23,y:13});
  O.push({t:'npc',id:'ferryman',x:14,y:12,look:{cloth:'#2d5a8a',hair:'#3a2a1a',skin:'#c99a74',hat:'#8a6a3a'}});
  O.push({t:'npc',id:'netseller',x:20,y:12,look:{cloth:'#4a7a4a',hair:'#6a4a2a',skin:'#d9a77c'}});
  O.push({t:'sign',x:8,y:12,text:`the tide went out. the market didn't notice. it's still open.`});
});

/* THE MIRROR GROVE (east) */
defMap('grove','the mirror grove',24,16,',','grove',(G,O)=>{
  G[7][0]='.';G[8][0]='.';
  O.push({t:'exit',x:0,y:7,to:'hub',tx:20,ty:6,d:'l'},{t:'exit',x:0,y:8,to:'hub',tx:20,ty:7,d:'l'});
  rect(G,8,3,15,3,'#');G[3][11]=',';G[3][12]=',';
  G[1][9]='#';G[2][9]='#';G[1][14]='#';G[2][14]='#';
  O.push({t:'gate',x:11,y:3,flag:'grove_solved'},{t:'gate',x:12,y:3,flag:'grove_solved'});
  O.push({t:'frag',i:1,x:11,y:1});
  outline(G,2,1,6,4,'#');rect(G,3,2,5,3,',');G[4][4]='|';
  O.push({t:'glyph',x:4,y:2,text:`the grove remembers, in this order:\nMOON. EYE. SUN. STAR.`});
  outline(G,17,1,21,4,'#');rect(G,18,2,20,3,',');G[4][19]='|';
  O.push({t:'glyph',x:19,y:2,text:`the roots grow toward whoever is watching them.\nso don't watch. be.`});
  O.push({t:'statue',sym:'sun',x:7,y:8},{t:'statue',sym:'star',x:10,y:11},{t:'statue',sym:'moon',x:14,y:11},{t:'statue',sym:'eye',x:17,y:8});
  for(const [x,y] of [[5,10],[19,11],[3,13],[8,6],[16,6],[21,9]])G[y][x]='T';
  O.push({t:'npc',id:'echo',x:12,y:13,look:{cloth:'#9ab8d8',hair:'#dfe8f5',skin:'#c8d8ea',ears:'#c8d8ea',ghost:1}});
  O.push({t:'shell',id:'grove',x:21,y:13});
});

/* THE QUIET STACKS (west) */
defMap('library','the quiet stacks',24,14,'=','library',(G,O)=>{
  G[6][23]='=';G[7][23]='=';
  O.push({t:'exit',x:23,y:6,to:'hub',tx:1,ty:6,d:'r'},{t:'exit',x:23,y:7,to:'hub',tx:1,ty:7,d:'r'});
  rect(G,11,1,11,12,'#');G[6][11]='=';G[7][11]='=';
  O.push({t:'gate',x:11,y:6,lever:'L2'},{t:'gate',x:11,y:7,lever:'L2'});
  outline(G,13,1,17,4,'#');rect(G,14,2,16,3,'=');G[4][15]='|';
  O.push({t:'lever',id:'L2',x:15,y:2});
  for(let x=2;x<=9;x++){O.push({t:'deco',kind:'shelf',x,y:1});O.push({t:'deco',kind:'shelf',x,y:12});}
  for(let x=19;x<=22;x++)O.push({t:'deco',kind:'shelf',x,y:1});
  for(let x=13;x<=21;x++)O.push({t:'deco',kind:'shelf',x,y:12});
  O.push({t:'npc',id:'lostone',x:6,y:6,look:{cloth:'#aab0c0',hair:'#dfe3ee',skin:'#c8ccd8',ears:'#c8ccd8',ghost:1}});
  O.push({t:'npc',id:'page',x:19,y:6,look:{cloth:'#7a4a6a',hair:'#2a1a22',skin:'#d9a77c'}});
  O.push({t:'sign',x:21,y:9,text:`SILENCE. the books can hear you thinking.`});
  O.push({t:'shell',id:'library',x:21,y:2});
});

/* THE CINDER COURT (south) */
defMap('court','the cinder court',26,16,':','court',(G,O)=>{
  G[0][12]=':';G[0][13]=':';
  O.push({t:'exit',x:12,y:0,to:'hub',tx:10,ty:12,d:'u'},{t:'exit',x:13,y:0,to:'hub',tx:11,ty:12,d:'u'});
  rect(G,1,6,24,6,'#');G[6][12]=':';G[6][13]=':';
  rect(G,1,12,24,12,'#');G[12][12]=':';G[12][13]=':';G[12][3]='|';
  O.push({t:'plate',id:'pA',x:4,y:3});
  O.push({t:'gate',x:12,y:6,plate:'pA',lever:'L3'},{t:'gate',x:13,y:6,plate:'pA',lever:'L3'});
  O.push({t:'lever',id:'L3',x:6,y:8});
  O.push({t:'lever',id:'L4',x:3,y:14});
  O.push({t:'gate',x:12,y:12,lever:'L4'},{t:'gate',x:13,y:12,lever:'L4'});
  O.push({t:'npc',id:'queen',x:12,y:14,look:{cloth:'#8a1f2b',hair:'#e8d8a0',skin:'#e0b08a',ears:'#e8833a',crown:1,tails:3}});
  for(const [x,y] of [[2,2],[23,2],[2,9],[23,9],[8,14],[17,14]])O.push({t:'deco',kind:'brazier',x,y});
  O.push({t:'sign',x:8,y:3,text:`the court burned. the queen kept the chairs.`});
  O.push({t:'shell',id:'court',x:24,y:10});
});

/* THE UNDERTOW */
defMap('undertow','the undertow',16,12,':','under',(G,O)=>{
  rect(G,1,1,14,2,'~');
  G[11][7]=':';G[11][8]=':';
  O.push({t:'exit',x:7,y:11,to:'hub',tx:10,ty:9,d:'d'},{t:'exit',x:8,y:11,to:'hub',tx:11,ty:9,d:'d'});
  O.push({t:'npc',id:'voice',x:8,y:4,look:{}});
});

/* THE OATH */
FX.oath=[`no voice shall rise`,`above my own`,`within me.`,`my yes is sacred. my no is a sword.`];
FX.order=['moon','eye','sun','star'];

/* SPELLS & DUELS */
FX.spells=[
  {id:'hold',name:'systolic hold',blurb:`one point. hold.`,beats:'chaos'},
  {id:'paradox',name:'inscryption paradox',blurb:`remind it it's in a game.`,beats:'certainty'},
  {id:'party',name:'kitsune party',blurb:`throw a party inside the cage.`,beats:'control'}
];
FX.counter={chaos:'hold',certainty:'paradox',control:'party'};
FX.hintOf={chaos:`scattered. everything at once. what answers chaos?`,certainty:`it's SURE. what answers certainty?`,control:`it wants you small and caged. what answers a cage?`};
FX.duels={
  queen:{name:`the fox queen`,rounds:3,pips:2,
    lines:{chaos:[`you're all over the place, tourist. pick a lane. 🌀`,`three plans, zero follow-through. cute. 🌀`,`you flinch at everything at once. 🌀`],
           certainty:[`i know exactly who you are. i decided already. 🔒`,`you're the type who always loses here. it's settled. 🔒`,`facts. i have facts. you have vibes. 🔒`],
           control:[`rules are rules. sit. stay. be a good little fox. 📜`,`you don't leave until you're allowed. 📜`,`stay inside the lines i drew. 📜`]},
    good:[`okay. that landed. 🦊`,`...fine. again. 😈`,`hm.`],bad:[`nope. wrong tool. 😈`,`that's not what it needs.`,`try again.`]},
  voice:{name:`the voice`,rounds:5,pips:3,
    lines:{chaos:[`you started six things this week and finished none. look at all of it. everything is loud and none of it is done.`,`too many tabs open in you. too many people to be. you can't even hold one thought.`,`it's too much. it's all too much. everything, everywhere, right now.`],
           certainty:[`you are not real enough for this. you know it. everyone does.`,`i counted every mistake already. the verdict was in a long time ago.`,`you will always be this. i'm not guessing. i'm certain.`],
           control:[`stay small and nothing can hit you. don't want anything. don't move.`,`keep it quiet. keep it tidy. don't be seen. that's the rule.`,`if you never try, you can't fail. stay in the cage. it's warm.`]},
    good:[`...that cracked something.`,`no.`,`how.`,`stop doing that.`],bad:[`louder.`,`see? you don't even know.`,`wrong. as usual.`]}
};

/* THE QUIZ (the descent, again) */
FX.quiz=[
  {q:`a story keeps spinning in my head. first move?`,o:[`feed it more detail`,`strip it to what's actually dangerous`,`argue with it`],c:1,ok:`...yes. where's the actual danger. only that.`,no:`no. that feeds it. again.`},
  {q:`it wants my attention. what do i point it at?`,o:[`why did this happen`,`wait it out`,`what can i do in the next hour`],c:2,ok:`redirect. give the loop a job.`,no:`no. that's just more loop.`},
  {q:`step back. what do i ask?`,o:[`who's to blame?`,`will it ever end?`,`how am i processing this?`],c:2,ok:`meta. watching the watcher.`,no:`no. that's still inside it.`},
  {q:`closer. what's the personal part?`,o:[`it's about them`,`it's about what i'm scared of`,`it's about nothing`],c:1,ok:`...yes. that one stings. good.`,no:`no. look at yourself, not the room.`},
  {q:`the knife.`,o:[`how do i make it stop?`,`who's right?`,`what happens when the loop ends?`],c:2,ok:`...yes. real eyes.`,no:`no. that's the dodge. again.`}
];
})();