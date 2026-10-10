/* FOXY ISLAND 2 · the undertow — dialogue and hints */
(()=>{'use strict';
const FX=window.FX;
FX.talk={
 stranger(){const a=FX.api;const n=a.fragCount();
  const menu=()=>a.ask(`the stranger`,n>=4?`you have all four. you know where the door is. 🦊`:(n>0?`${n} of 4. keep walking. 🦊`:`directions or answers? i only sell one cheap.`),[
    [`where do i start?`,()=>a.say([[`the stranger`,`anywhere. north's wet. east is watching. west is quiet. south is burnt.`],[`the stranger`,`each one keeps a piece of the oath. none of them hand it over for free.`]],menu)],
    [`what's the shadow thing?`,()=>a.say([[`the stranger`,`press Q. the one you've been dragging behind you gets to walk ahead.`],[`the stranger`,`your body stays where it is. the shadow can cross water, slip through veils, pull what has no handle. it can't pick anything up. no hands.`],[`the stranger`,`press Q again and it comes home. whatever your body stands on keeps holding. 🌑`]],menu)],
    [`who are you?`,()=>a.say([[`the stranger`,`stick around and see.`]],menu)],
    [`never mind`,()=>{}]]);
  if(!a.flag('met')){a.setFlag('met');a.say([[`the stranger`,`okay hi 🦊. you came back.`],[`the stranger`,`tide's out. the island's the same. what's under it isn't.`],[`the stranger`,`the door in the middle wants four pieces of an oath. they're out there with things that stopped listening.`]],menu);}else menu();},
 ferryman(){const a=FX.api;
  a.ask(`the ferryman`,`no water to ferry on, apparently. it's all still here. just not where it was.`,[
    [`how do i get across?`,()=>a.say([[`the ferryman`,`you don't. the fox can't swim.`],[`the ferryman`,`but there's a plate by the south wall. stand on it and don't move. it holds a door open for something that isn't you.`],[`the ferryman`,`the lever you want is north, behind a stone door. a shadow could reach it.`]])],
    [`what do you sell?`,()=>a.say([[`the ferryman`,`directions. cheap.`]])],
    [`never mind`,()=>{}]]);},
 netseller(){const a=FX.api;a.say([[`the net seller`,`nobody fishes in the undertow anymore.`],[`the net seller`,`they know what they'd catch.`]]);},
 echo(){const a=FX.api;
  a.ask(`the echo`,`you look like someone who reads walls.`,[
    [`and?`,()=>a.say([[`the echo`,`try reading them as someone who isn't there.`],[`the echo`,`some walls only speak to the part of you that stayed behind.`]])],
    [`what are you?`,()=>a.say([[`the echo`,`what's left when you leave a room and the room keeps your shape.`]])],
    [`never mind`,()=>{}]]);},
 page(){const a=FX.api;a.say([[`the page`,`shh.`],[`the page`,`someone left a lever up in the closet by the wall. there's no door. you'd have to be more of a shadow than a visitor.`]]);},
 lostone(){const a=FX.api;
  if(a.flag('quiz_done')){a.say([[`the lost one`,`i keep the shelves now. i don't loop.`],[`the lost one`,`you know the way out. you've always known.`]]);return;}
  const quiz=i=>{const Q=FX.quiz[i];
    a.ask(`the lost one`,`layer ${i+1}. ${Q.q}`,Q.o.map((o,k)=>[o,()=>{
      if(k===Q.c){
        if(i===FX.quiz.length-1){a.setFlag('quiz_done');a.say([[`the lost one`,Q.ok],[`the lost one`,`take it. i never needed it. you did.`]],()=>a.giveFrag(2));}
        else a.say([[`the lost one`,Q.ok]],()=>quiz(i+1));
      }else a.say([[`the lost one`,Q.no]],()=>quiz(i));}]));};
  if(!a.flag('lo_met')){a.setFlag('lo_met');a.say([[`the lost one`,`you came back. i don't loop anymore. mostly.`],[`the lost one`,`the third piece is here. i'll hand it over if you can still do the descent. five questions. answer like you mean it.`]],()=>quiz(0));}else quiz(0);},
 queen(){const a=FX.api;
  if(a.flag('queen_done')){a.say([[`the fox queen 🦊`,`the court's already ash. i just sit in it now.`],[`the fox queen 🦊`,`go finish what you came for.`]]);return;}
  const go=()=>a.duel(FX.duels.queen,()=>{a.setFlag('queen_done');a.say([[`the fox queen 🦊`,`well. 🦊 real smile.`],[`the fox queen 🦊`,`you don't need my permission. you never did. that's the piece.`]],()=>a.giveFrag(3));},()=>a.say([[`the fox queen 🦊`,`again. i'm not going anywhere.`]]));
  if(!a.flag('q_met')){a.setFlag('q_met');a.say([[`the fox queen 🦊`,`okay hi 🦊. you made it through my door. rude.`],[`the fox queen 🦊`,`the fourth piece is mine to give. insult spell duel again. three rounds.`],[`the fox queen 🦊`,`you remember the counters? chaos, certainty, control. 😈`]],go);}
  else a.ask(`the fox queen 🦊`,`ready?`,[[`duel`,go],[`later`,()=>{}]]);},
 voice(){const a=FX.api;
  const after=()=>a.say([[`the voice`,`...`],[`the voice`,`...what now?`]],()=>a.ask(``,`the voice waits. it looks smaller than it sounded.`,[
    [`silence it`,()=>a.ending('quiet')],
    [`make room for it`,()=>a.ending('seat')]].concat(a.shellCount()>=5?[[`ask its name`,()=>a.ending('name')]]:[])));
  const fight=()=>a.duel(FX.duels.voice,()=>{a.setFlag('voice_beaten');after();},()=>a.say([[`the voice`,`see? you came all this way to lose to me.`],[``,`(you wake at the landing. the pieces are still warm in your hands.)`]],()=>a.goMap('hub',10,9,'d')));
  if(a.flag('voice_beaten')){after();return;}
  a.say([[`the voice`,`you came down here on purpose. interesting.`],[`the voice`,`i'm the one who talks when you're alone. i'm loud because i'm the only one that does.`],[`the voice`,`no voice shall rise above your own. that's the oath, right? let's see whose is louder.`]],fight);}
};

FX.hints=(api)=>{const f=api.flag,n=api.fragCount(),F=api.S.frags;
  switch(api.S.map){
   case 'hub':return n>=4?[`the dais. you know what to do.`,`stand beside the dais and press E.`]:[`four directions. four pieces. wet, watching, quiet, burnt.`,`north is the market, east the grove, west the library, south the court.`];
   case 'market':return !f('lever_L1')?[`the fox can't cross water. something that isn't quite you can.`,`stand on the plate in the south, press Q, swim your shadow north into the walled room, pull the lever, then press Q again.`]:!F[0]?[`the bridge is down. look north.`,`cross the bridge and walk east to the glowing shard.`]:[`done here.`,`head back south.`];
   case 'grove':return !f('grove_solved')?[`some walls only speak to shadows. find the one behind the veil.`,`shadow through the veil in the top-left room, read the glyph, then press the four statues in that order.`]:!F[1]?[`the gate's open.`,`north, through the gate.`]:[`done here.`,`head back west.`];
   case 'library':return !f('lever_L2')?[`the closet by the wall hums. only a shadow would look.`,`shadow through the veil under the closet at the hall's top, pull the lever, then talk to the lost one in the west room.`]:!F[2]?[`he's waiting. five questions.`,`talk to the lost one: strip, redirect, meta, personal, knife.`]:[`done here.`,`head back east.`];
   case 'court':return !f('lever_L3')?[`the plate holds the door. the shadow does the walking.`,`stand on the plate top-left, press Q, slip your shadow through the gate, pull the lever in the second room.`]:!f('lever_L4')?[`there's a shimmer in the lower wall.`,`from the second room, send your shadow through the shimmering wall on the left and pull the lever beyond.`]:!F[3]?[`she's waiting.`,`talk to the queen. three rounds.`]:[`done here.`,`head back north.`];
   case 'undertow':return [`it isn't going anywhere.`,`talk to it.`];
  }return [`...`,`...`];};
})();