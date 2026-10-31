/* FOX ISLAND — EXPANSION: new dialogue trees (lampwick, moth, dregs, pip). loaded before expansion.js */
window.EXP_DLG={
 lampwick:[
  {s:'Lampwick',get t(){return S.flags.pierDone?`"look at them. warm. the pier remembers its way home. ...you did that. 🏮"`:`"huh. a visitor. mind the planks. they remember everyone."`;},
   ch:[{t:`> "Who are you?"`,n:1},{t:`> "What's with the lanterns?"`,n:2},{t:`> "I've got the oil."`,n:5,c:()=>has('lantern-oil')&&!S.flags.lampReady&&!S.flags.pierDone},
       {t:`> "What do I know so far?"`,n:6,c:()=>S.flags.lampTalk&&!S.flags.pierDone},{t:`> "Anything else?"`,n:7,c:()=>S.flags.pierDone},{t:`> [Leave]`,x:1}]},
  {s:'Lampwick',t:`"lampwick. i light things. that's the job. used to light the whole island. now i light nothing. long story. short tide."`,ch:[{t:`> "Why nothing?"`,n:2},{t:`> "Okay."`,n:0}]},
  {s:'Lampwick',t:`"four lanterns. WATCHER, KEEPER, DREAMER, BURNER. dark since the court burned. light them in the right order and the pier remembers its way home. wrong order and they all forget again. the island loves a lesson."`,
   a:()=>{S.flags.lampTalk=1;},ch:[{t:`> "What's the right order?"`,n:3},{t:`> "How do I light them?"`,n:4},{t:`> "Back."`,n:0}]},
  {s:'Lampwick',t:`"i don't know. i only ever lit them. the island kept the order. ask around. the cat. the old carvings. the moth. everybody knows a piece. nobody knows the whole."`,ch:[{t:`> "Back."`,n:0}]},
  {s:'Lampwick',t:`"oil. lamp oil. i'm out. the moth in the village hoards it. trades for things that point at feelings. i don't ask. 🏮"`,ch:[{t:`> "Back."`,n:0}]},
  {s:'Lampwick',t:`"good. now it's courage and sequence. touch a lantern to light it. get it wrong and they all go dark."`,a:()=>{if(!S.flags.lampReady){S.flags.lampReady=1;notif('The lanterns are ready','info');}},ch:[{t:`> "Back."`,n:0}]},
  {s:'Lampwick',get t(){return `"what you've pieced together. watcher: ${S.flags.clueWatcher?'begins.':'unknown.'} dreamer: ${S.flags.clueDreamer?'comes before the keeper.':'unknown.'} burner: ${S.flags.clueBurner?'goes last.':'unknown.'} oil: ${has('lantern-oil')||S.flags.lampReady?'got it.':'missing.'}"`;},ch:[{t:`> "Back."`,n:0}]},
  {s:'Lampwick',t:`"stay a while. lanterns do better with company. tell the barkeeper the pier's lit. he'll pretend he doesn't care."`,ch:[{t:`> "Back."`,n:0}]}
 ],
 moth:[
  {s:'Moth',get t(){return S.flags.gotOil?`"mm. you again. still warm. still pointing somewhere. 🦋"`:`"oh. big. warm. you carry the glow of someone who's been somewhere."`;},
   ch:[{t:`> "Who are you?"`,n:1},{t:`> "I heard you have lamp oil."`,n:2,c:()=>!S.flags.gotOil&&(S.flags.lampTalk||S.flags.lampHeard)},{t:`> "Any gossip?"`,n:4},{t:`> [Leave]`,x:1}]},
  {s:'Moth',t:`"moth. i eat light. i'm not proud. i hoard oil because a lamp is just light in a bottle with manners."`,ch:[{t:`> "Back."`,n:0}]},
  {s:'Moth',t:`"oil? sure. i don't give. i trade. i collect things that point at feelings. got something that points somewhere that isn't north? or something that lies beautifully?"`,
   a:()=>{S.flags.mothAsked=1;},ch:[{t:`> [Give the old compass]`,n:3,c:()=>has('old-compass')},{t:`> [Give the crow feather]`,n:5,c:()=>has('crow-feather')},{t:`> "Not yet."`,n:0}]},
  {s:'Moth',t:`"...oh. it TREMBLES. perfect. take the oil. don't spill it on a promise."`,a:()=>{if(has('old-compass')){fxRm('old-compass');addI('lantern-oil');S.flags.gotOil=1;S.flags.favorMoth=1;}},ch:[{t:`> "Thanks."`,n:0}]},
  {s:'Moth',t:`"the keepers are boring. dreamers always arrive first. then the keepers show up and say 'i'll hold that for you.' dreamer, then keeper. every time. 🦋"`,a:()=>{if(!S.flags.clueDreamer){S.flags.clueDreamer=1;notif('Clue: the dreamer comes before the keeper','info');}},ch:[{t:`> "Back."`,n:0}]},
  {s:'Moth',t:`"a feather. light as a lie, sharp as a truth. oil's yours. 🦋"`,a:()=>{if(has('crow-feather')){fxRm('crow-feather');addI('lantern-oil');S.flags.gotOil=1;S.flags.favorMoth=1;}},ch:[{t:`> "Thanks."`,n:0}]}
 ],
 dregs:[
  {s:'Dregs',get t(){return S.flags.clueBurner?`"mrrp. you again. you smell like a decision you already made."`:`"mrrp. you smell like a decision."`;},
   ch:[{t:`> [Pet the cat]`,n:1},{t:`> "Got any wisdom?"`,n:2},{t:`> "The lamplighter's lanterns?"`,n:3,c:()=>(S.flags.lampTalk||S.flags.lampHeard)&&!S.flags.clueBurner},{t:`> [Leave]`,x:1}]},
  {s:'Dregs',t:`"you may pet me. once. this is a gift."`,ch:[{t:`> "Back."`,n:0}]},
  {s:'Dregs',t:`"wisdom costs a riddle. right and i say something useful. wrong and i say something true."`,ch:[{t:`> "Riddle me."`,n:4},{t:`> "No thanks."`,n:0}]},
  {s:'Dregs',t:`"the lanterns. mrrp. i know a piece. i don't hand it over. riddle first."`,ch:[{t:`> "Riddle me."`,n:4},{t:`> "Never mind."`,n:0}]},
  {s:'Dregs',t:`"i eat wood and drink water, but water kills me. what am i?"`,ch:[{t:`> "A beaver."`,n:5},{t:`> "A fire."`,n:6},{t:`> "A boat."`,n:5}]},
  {s:'Dregs',t:`"wrong. mrrp. hint: i'm warm, i'm loud, and i'll end you if you hug me."`,ch:[{t:`> "Again."`,n:4},{t:`> [Leave]`,x:1}]},
  {s:'Dregs',t:`"...correct. annoying. fine: the BURNER goes last. fire doesn't wait its turn. it arrives, and it ends things. 🔥"`,a:()=>{if(!S.flags.clueBurner){S.flags.clueBurner=1;S.flags.favorCat=1;notif('Clue: the burner goes last','info');}},ch:[{t:`> "Thanks, cat."`,n:0}]}
 ],
 pip:[
  {s:'Pip',get t(){return S.flags.favorPip?`"you again. the feather suits you. insufferable. caw."`:`"caw. you strolled in looking hopeful. disgusting."`;},
   ch:[{t:`> "Who are you?"`,n:1},{t:`> "Which gate is real?"`,n:2},{t:`> [Answer Pip's riddle]`,n:2,c:()=>S.flags.pipAsked&&!S.flags.favorPip},{t:`> [Leave]`,x:1}]},
  {s:'Pip',t:`"pip. professional heckler. i sit on gates and judge people. the benefits are mostly spite."`,ch:[{t:`> "Back."`,n:0}]},
  {s:'Pip',t:`"i don't do 'real'. i do riddles. the three gates talk. COMFORT says: 'truth is lying.' TRUTH says: 'comfort is lying.' POWER says: 'comfort is honest.' exactly one of them tells the truth. which?"`,
   a:()=>{S.flags.pipAsked=1;},ch:[{t:`> "Comfort."`,n:3},{t:`> "Truth."`,n:4},{t:`> "Power."`,n:3},{t:`> "Never mind."`,n:0}]},
  {s:'Pip',t:`"nope. if that one were honest, a second gate would be honest too. exactly one. think. caw."`,ch:[{t:`> "Try again."`,n:2},{t:`> [Leave]`,x:1}]},
  {s:'Pip',t:`"...ugh. yes. the middle one. truth tells the truth. the other two are lying through their little wooden teeth. take a feather. don't make it weird. 🪶"`,a:()=>{if(!S.flags.favorPip){addI('crow-feather');S.flags.favorPip=1;}},ch:[{t:`> "Thanks."`,n:0}]}
 ]
};