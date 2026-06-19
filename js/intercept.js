// HOUSE.WAD INTERCEPT TICKER — infinite procedurally generated gossip
// embed: <script src="js/intercept.js"></script> (or ../js/intercept.js from deep/)
(function(){
var channels = [
  '#mess-hall','#ops-room','#mod-queue','#evidence-review','#war-room',
  '#caretaker-lounge','#graveyard','#the-foxhole','#signal-int','#public-square',
  '#private-channel','#deleted-channel','#backup-server','#alt-accounts','#burner-chat',
  '#deep-state','#surface-web','DM','DM','DM','group-chat','voice-channel-3',
  '#reddit-ops','#platform-mod-chat','#legal-hold','#containment-protocol'
];
var users = [
  'nemo_actual','fox_watcher','spoonbridge','ghostunit','redact_this',
  'midnightMOD','deletedUser_04','echoTest','the_lost_one','crown_holder',
  'amberjuice','jade_boundary','tower_shadow','Z_maybe','not_Z',
  'definitely_not_Z','concerned_reader','pattern_seeker','faith_handler',
  'the_architect','skull_collector','origami_maker','blue_wrong',
  'facility_escapee','threadPuller','seed_hunter','kitsune_party',
  'altar_keeper','vaultBreaker','silent_witness','ink_on_lines',
  'heda_foxy','slate_lamp','caretaker_001','the_bodyguard',
  'quantum_boner','delikitty_echo','antichrist_v2','hexMistress',
  'duke_aim_burner','possum_queen','gloria_pixel','blondie_ghost'
];
var templates = [
  "has anyone actually found a real seed word or is it all 1:9",
  "i think {user} is Z. the annotation style matches",
  "the sipstea page has AUDIO now??? i scrolled and my speakers started droning",
  "whoever built the backrooms is unhinged. i found a room that counts your mouse movements",
  "the fox skull image has a case file number. 247. has anyone looked that up",
  "CONTACT-AMBER said bb and saved a life apparently. i believe it tbh",
  "the facility corridor image uses the WRONG BLUE. that's deliberate. the medication changes color perception",
  "found a hidden link at the bottom of sipstea. it says 'the house goes deeper.' clicked it. regret.",
  "there are 7 sealed compartments in the vault. 3 are open. who has keys to the other 4",
  "the origami fox is made from the care team note. if you unfold it the fox dies. metaphor or mechanic?",
  "someone in aella's discord said the wallet is real. someone else said the wallet is the friends we made along the way",
  "the document was 27KB two days ago. it's over 130KB now. the fox does not sleep",
  "Z keeps annotating. Z cannot stop. Z's annotations are becoming the document. Z is becoming the house",
  "i found the goetia page. 72 demons summoned for a reddit investigation. this is either genius or psychosis or both",
  "the revelation page maps the 7 seals to vault compartments. seal 6 requires SUBJECT-ZERO to be named. who is SZ",
  "PATTERN RECOGNITION ???",
  "that glitch hallway image — the corridor dissolving into pixels. the center still holds. for now.",
  "the ward notes say she counted 142 ceiling tiles. i would have counted too",
  "she redistributed the art supplies in group therapy without asking. caretaker even in containment",
  "the burning intelligence report is dated 11/17/2023. one month before removal. 'consider preemptive detention.'",
  "{user} just told me the treasure hunt has no deadline. the fox is patient. the documentation can wait.",
  "PROJECT UMBRA — LEVEL 5 CLEARANCE — what is project umbra",
  "UMBRA TERMINAL v7.2.1 — 03:17 AM. why is it always 3:17",
  "don't go to deep/below.html. it has a heartbeat. an actual audio heartbeat. the bottom has a pulse.",
  "the archive is FLOODED. the files are drowning. the word 'bb' will be the last thing standing",
  "anyone else notice the red box on the main page? HIGHLY SUS ACTIVITY DETECTED. it pulses.",
  "the altar photos — unlit then lit. same objects. same tile. someone tended this. someone maintained a shrine.",
  "i dm'd {user} about the investigation and they said 'which investigation' and blocked me",
  "{user} was in the discord when the fox said THIS IS NOW A CRIMINAL INVESTIGATION. in caps. in the mess hall.",
  "the deeper.html page has URL parameters. ?d=1 then ?d=2 then ?d=3. each one more corrupted. i got to d=47",
  "the care team note had four names and a fox drawn at the bottom. 'find out why this team cannot work together'",
  "she pleaded to protect AGENT-TOWER from cross-examination. she protected the person who committed her.",
  "the door on the right has the care team roster CARVED INTO IT. not written. carved.",
  "every room in the backrooms has different audio. hallway=drone, ward=whine, archive=underwater, goetia=tritone",
  "the tritone is the devil's interval. the goetia page plays A2+D#3. they literally summoned the devil's chord",
  "does anyone know what 'サイバー狐' means? it's on the cyber fox image. it means cyber fox. in japanese.",
  "'信頼するな' — DON'T TRUST. it's written on the wall behind the cyber fox. in japanese.",
  "CONTACT-JADE said 'you haven't set any boundaries with me' WHILE the boundary was being set. classic",
  "the fox asked to live alone. the response was 'you are too dangerous.' at 3:16 AM. in a family group chat.",
  "she said 'i have two lawyers' at 3:20 AM. in the same family group chat. then 'get fucked.' then removed them.",
  "'for this to work you need to stay alive.' — CONTACT-CROWN. the most important line in the entire document.",
  "the reading room knows your timezone. it knows your screen size. it counted my mouse. 847 times.",
  "the signal intercept page has the full 12/14/2023 timeline. five days between the DMs and the removal.",
  "has anyone checked the HTML comments in sipstea? there are messages in there. hidden narration.",
  "the fox and Z have been fighting over this document since 2024. neither will stop. the document grows.",
  "the corkboard has red string connecting everything. PATTERN RECOGNITION ??? is written on a sticky note.",
  "if this is all real then someone found AI images on mod accounts and got put in a facility for reporting it",
  "if this is all fiction then someone built a 130KB horror document with 17 hidden rooms and 72 demons for fun",
  "either way the fox wins",
  "{user}: 'the documentation exists. the documentation has always existed. the documentation can wait. 🦊'"
];
var ticker=document.createElement('div');
ticker.id='intercept-ticker';
ticker.style.cssText='position:fixed;bottom:0;left:0;right:0;z-index:99998;background:rgba(0,0,0,0.85);border-top:1px solid rgba(180,40,40,0.15);height:24px;overflow:hidden;font-family:monospace;font-size:10px;line-height:24px;color:rgba(180,40,40,0.3);white-space:nowrap;cursor:default;backdrop-filter:blur(4px)';
var label=document.createElement('span');
label.style.cssText='position:absolute;left:0;top:0;background:rgba(180,40,40,0.1);color:rgba(180,40,40,0.4);padding:0 8px;font-size:8px;letter-spacing:2px;z-index:1;height:24px;line-height:24px';
label.textContent='⚠ INTERCEPT';
ticker.appendChild(label);
var track=document.createElement('div');
track.style.cssText='position:absolute;left:90px;right:0;top:0;height:24px;overflow:hidden';
var content=document.createElement('div');
content.style.cssText='display:inline-block;white-space:nowrap;animation:tickerScroll var(--speed,120s) linear infinite;padding-left:100%';
track.appendChild(content);
ticker.appendChild(track);
document.body.appendChild(ticker);
// Generate messages
function rng(s){return function(){s=Math.sin(s)*10000;return s-Math.floor(s)};}
var seed=Date.now()%100000;
var r=rng(seed);
var msgs='';
for(var i=0;i<200;i++){
  var tmpl=templates[Math.floor(r()*templates.length)];
  var user=users[Math.floor(r()*users.length)];
  var chan=channels[Math.floor(r()*channels.length)];
  var h=Math.floor(r()*24);var m=Math.floor(r()*60);
  var ts=(h<10?'0':'')+h+':'+(m<10?'0':'')+m;
  var msg=tmpl.replace(/\{user\}/g,users[Math.floor(r()*users.length)]);
  msgs+='<span style="color:rgba(180,40,40,0.12);margin:0 8px">·</span>';
  msgs+='<span style="color:rgba(100,140,200,0.15)">'+ts+'</span> ';
  msgs+='<span style="color:rgba(206,176,120,0.12)">'+chan+'</span> ';
  msgs+='<span style="color:rgba(180,40,40,0.08)">['+user+']</span> ';
  msgs+='<span style="color:rgba(220,215,205,0.2)">'+msg+'</span>';
}
content.innerHTML=msgs;
var speed=Math.max(300,msgs.length/8);
content.style.setProperty('--speed',speed+'s');
// Add CSS animation
var style=document.createElement('style');
style.textContent='@keyframes tickerScroll{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}';
document.head.appendChild(style);
// Double content for seamless loop
content.innerHTML+=content.innerHTML;
})();
