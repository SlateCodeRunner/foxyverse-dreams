
// CHAOS PANELS — decorative complexity
var cxData={
  samsara:['轮回','因果','业力','解脱','涅槃','无常'],
  realm:['国力','威望','天命','民望'],
  yinyang:['阴','阳'],
  borders:['北境','东疆','南关','西域','中原','海防','山隘','沙漠'],
  hexagrams:['☰乾','☷坤','☵坎','☲离','☳震','☴巽','☶䉮','☱兑','太极'],
  census:['士族','农民','商贾','工匠','军户','流民'],
  factions:['丞相党','将军阀','文官派','外戚系','宦官团'],
  trade:['丝绸','瓷器','茶叶','铁器','玉石','香料','马匹','粮草'],
  fengshui:['龙脉','穴位','水口','明堂','朝山','案山','青龙','白虎','玄武'],
  terrain:['山地','平原','河流','沙漠','森林','沼泽'],
  objectives:['统一北方','开拓丝路','修建长城','编纂律法','开科取士','铸造神兵','收服蛮族','建立水师','祭天封禅'],
  beacons:['甲台','乙台','丙台','丁台','戊台','己台','庚台','辛台','壬台','癸台','子台','丑台'],
  celestial:['紫微','天枢','天璇','天珑','天权','玉衡','开阳','摇光','北辰'],
  grain:['洛阳','长安','汴梁','临安','建康','成都','襄阳','荆州','扬州','幽州','凉州','交趾'],
  merit:['斩首','破城','夺旗','先登','殿后','奇谋','死战','围点','打援'],
  supply:['粮道','水路','驿站','仓储'],
  intel:['暗桩','线人','密探','卧底','哨兵','信鸽','暗号','死信箱'],
  seasonal:['立春','惊蛰','清明','立夏','芒种','小暑','立秋','白露','寒露','立冬','大雪','小寒'],
  loyalty:['忠','疑','叛','惧','敬','恨','慕','畏','服'],
  stockpile:['刀','剑','弓','弩','枪','盾','甲','盔','车','炮','旗','鼓'],
  astro:['太白','荧惑','岁星','镇星','辰星','月孛','罗睺','计都','紫气'],
  refugees:['入境','出境','安置','流散']
};
var cxColors=['var(--gold)','var(--red)','var(--blue)','rgba(80,200,120,0.4)','rgba(200,120,255,0.4)'];

function cxVal(seed,range){return Math.floor((Math.sin(turn*0.1+seed)*0.5+0.5)*range);}
function cxPct(seed){return Math.floor((Math.sin(turn*0.07+seed)*0.5+0.5)*100);}

function updateChaos(){
  // Samsara dials
  var h='';cxData.samsara.forEach(function(n,i){
    h+='<div class="dc'+(i%3===0?' dc-glow':'')+'"><div class="dc-v">'+cxVal(i*7,999)+'</div><div class="dc-n">'+n+'</div></div>';
  });var el=document.getElementById('cx-samsara');if(el)el.innerHTML=h;

  // Realm
  h='';cxData.realm.forEach(function(n,i){
    h+='<div class="dc"><div class="dc-v" style="font-size:11px">'+cxVal(i*13,9999)+'</div><div class="dc-n">'+n+'</div></div>';
  });el=document.getElementById('cx-realm');if(el)el.innerHTML=h;

  // Yin-Yang
  h='';cxData.yinyang.forEach(function(n,i){
    var v=cxPct(i*50);
    h+='<div class="dc"><div class="dc-v" style="font-size:14px">'+(i===0?v:100-v)+'%</div><div class="dc-bar"><div class="dc-fill" style="width:'+(i===0?v:100-v)+'%;background:'+(i===0?'rgba(80,140,255,0.4)':'rgba(255,80,80,0.4)')+'"></div></div><div class="dc-n">'+n+'</div></div>';
  });el=document.getElementById('cx-yinyang');if(el)el.innerHTML=h;

  // Sentiment — 5 faction bars
  h='';cxData.factions.forEach(function(n,i){
    var v=cxPct(i*17+3);
    h+='<div style="display:flex;align-items:center;gap:4px;padding:2px 0;position:relative;z-index:2"><span class="dc-n" style="min-width:45px;text-align:right">'+n+'</span><div class="dc-bar" style="flex:1;height:6px"><div class="dc-fill" style="width:'+v+'%;background:'+cxColors[i%5]+'"></div></div><span class="dc-v" style="font-size:6px;min-width:25px">'+v+'%</span></div>';
  });el=document.getElementById('cx-sentiment');if(el)el.innerHTML=h;

  // Dynasty progress
  h='';['先秦','春秋','战国','秦','汉','三国'].forEach(function(n,i){
    var v=i<3?100:cxPct(i*23);
    h+='<div style="display:flex;align-items:center;gap:3px;padding:1px 0;position:relative;z-index:2"><span class="dc-n" style="min-width:30px;text-align:right;font-size:7px">'+n+'</span><div class="dc-bar" style="flex:1"><div class="dc-fill" style="width:'+v+'%;background:var(--gold)"></div></div></div>';
  });el=document.getElementById('cx-dynasty-prog');if(el)el.innerHTML=h;

  // Fortune
  h='';['气','运','命'].forEach(function(n,i){
    var v=cxPct(i*31+7);
    h+='<div class="dc"><div class="dc-v">'+v+'</div><div class="dc-bar"><div class="dc-fill" style="width:'+v+'%;background:'+cxColors[(i+2)%5]+'"></div></div><div class="dc-n">'+n+'</div></div>';
  });el=document.getElementById('cx-fortune');if(el)el.innerHTML=h;

  // Borders — status dots
  h='';cxData.borders.forEach(function(n,i){
    var status=cxVal(i*11,3);var colors=['rgba(80,200,120,0.5)','rgba(255,180,80,0.5)','rgba(255,80,80,0.5)'];
    var cls=status===2?'dc-blink':'';
    h+='<div class="dc'+(status===2?' dc-red':'')+'"><span class="dc-dot '+cls+'" style="background:'+colors[status]+'"></span><div class="dc-n">'+n+'</div></div>';
  });el=document.getElementById('cx-border');if(el)el.innerHTML=h;

  // Hexagrams
  h='';cxData.hexagrams.forEach(function(n,i){
    h+='<div class="hex'+(i===0?' dc-pulse':'')+'"><div class="hex-val">'+n.charAt(0)+'</div><div class="dc-n">'+n.substring(1)+'</div></div>';
  });el=document.getElementById('cx-hexagram');if(el)el.innerHTML=h;

  // Census
  h='';cxData.census.forEach(function(n,i){
    h+='<div class="dc'+(i===5?' dc-red':'')+'"><div class="dc-v">'+cxVal(i*19+2,50000)+'</div><div class="dc-n">'+n+'</div></div>';
  });el=document.getElementById('cx-census');if(el)el.innerHTML=h;

  // Factions (reuse sentiment data but as bars in panel)
  h='';cxData.factions.forEach(function(n,i){
    var v=cxPct(i*17+3);
    h+='<div style="display:flex;align-items:center;gap:4px;padding:2px 0;position:relative;z-index:2"><span class="dc-n" style="min-width:50px;text-align:right">'+n+'</span><div class="dc-bar" style="flex:1;height:5px"><div class="dc-fill" style="width:'+v+'%;background:'+cxColors[i%5]+'"></div></div><span class="dc-v" style="font-size:5px">'+v+'</span></div>';
  });el=document.getElementById('cx-factions');if(el)el.innerHTML=h;

  // Trade data
  h='';cxData.trade.forEach(function(n,i){
    var v=cxVal(i*7+5,999);var delta=cxVal(i*7+turn,20)-10;
    h+='<div class="dc"><div class="dc-v">'+v+'</div><div class="dc-n">'+n+'</div><div style="font-size:5px;color:'+(delta>=0?'rgba(80,200,120,0.3)':'rgba(255,80,80,0.3)')+'">'+( delta>=0?'+':