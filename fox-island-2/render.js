/* FOXY ISLAND 2 · the undertow — procedural pixel renderer (no image files) */
(()=>{'use strict';
const FX=window.FX;const T=16;let ctx=null;
const TH={
 sand:{a:'#cbb07a',b:'#bd9f68',c:'#dcc794',wall:'#4b4359',wall2:'#3a3347',water:'#2a5b96',water2:'#4a86c4'},
 grove:{a:'#4a8247',b:'#3d7140',c:'#5f9d5a',wall:'#2e4a35',wall2:'#233b29',water:'#2a5b96',water2:'#4a86c4'},
 library:{a:'#7a5a3a',b:'#684c31',c:'#8e6d47',wall:'#3a2a24',wall2:'#2c201b',water:'#2a5b96',water2:'#4a86c4'},
 court:{a:'#3a3340',b:'#2e2835',c:'#473f4f',wall:'#1d1923',wall2:'#15121a',water:'#2a3b6e',water2:'#4a5ea0'},
 under:{a:'#1b2036',b:'#141829',c:'#262d4c',wall:'#0b0d19',wall2:'#07080f',water:'#18274e',water2:'#2f4a8c'}
};
const hash=(x,y,k)=>{let h=(x*374761393+y*668265263+(k||0)*2147483647)|0;h=(h^(h>>>13))*1274126177|0;return((h^(h>>>16))>>>0)/4294967296;};
const R=(c,x,y,w,h,a)=>{if(a!==undefined)ctx.globalAlpha=a;ctx.fillStyle=c;ctx.fillRect(Math.round(x),Math.round(y),w,h);if(a!==undefined)ctx.globalAlpha=1;};

function floor(ch,x,y,sx,sy,th){
 R(th.a,sx,sy,T,T);
 if(ch==='='){R(th.b,sx,sy+5,T,1);R(th.b,sx,sy+11,T,1);R(th.b,sx+((x+y)%2?4:11),sy,1,5);R(th.b,sx+((x+y)%2?11:4),sy+6,1,5);R(th.c,sx,sy,T,1);return;}
 if(ch===':'){R(th.b,sx,sy,T,1);R(th.b,sx,sy,1,T);R(th.c,sx+1,sy+1,T-2,1,.5);if(hash(x,y,3)>.7)R(th.b,sx+4,sy+6,5,3);return;}
 if(ch===','){for(let i=0;i<5;i++){const h=hash(x,y,i);R(i%2?th.c:th.b,sx+h*13,sy+hash(x,y,i+9)*12,1,3);}return;}
 for(let i=0;i<4;i++){const h=hash(x,y,i);R(i%2?th.b:th.c,sx+h*14,sy+hash(x,y,i+7)*14,2,1);}
}
function wall(x,y,sx,sy,th){R(th.wall,sx,sy,T,T);R(th.wall2,sx,sy+7,T,1);R(th.wall2,sx,sy+15,T,1);const o=(y%2)?0:8;R(th.wall2,sx+o,sy,1,7);R(th.wall2,sx+((o+8)%16),sy+8,1,7);R(th.wall2,sx,sy,T,1,.0);ctx.globalAlpha=.12;R('#fff',sx,sy,T,1);ctx.globalAlpha=1;}
function tree(x,y,sx,sy,th){floor('.',x,y,sx,sy,th);R('#5a3b22',sx+7,sy+9,3,6);R('#2c6238',sx+2,sy+2,12,9);R('#3b8049',sx+4,sy,8,4);R('#4a9a58',sx+5,sy+3,3,2);R('#24502d',sx+3,sy+8,10,2);}
function water(x,y,sx,sy,th,t){R(th.water,sx,sy,T,T);for(let i=0;i<2;i++){const yy=((t/260+hash(x,y,i)*16+i*8)%16)|0;R(th.water2,sx+((x*5+i*7)%9),sy+yy,6,1,.7);}}
function veil(x,y,sx,sy,th,t){floor('.',x,y,sx,sy,th);const p=Math.sin(t/300+x+y)*.15;for(let i=0;i<4;i++){R('#b49cff',sx+1+i*4,sy,2,T,.28+p+((i+((t/200)|0))%3)*.06);}R('#fff',sx,sy+((t/90+x*3)%16|0),T,1,.25);}

function person(sx,sy,o){
 const d=o.d||'d',y0=sy+(o.bob?-1:0),al=o.alpha==null?1:o.alpha;
 const sk=o.skin||'#e0b08a',hr=o.hair||'#0d0b12',cl=o.cloth||'#2a2236',tr=o.trim||'#e8833a',ea=o.ears||null,ei=o.earIn||'#3a1e1e';
 ctx.globalAlpha=al;
 if(o.tail){const n=o.tails||1;for(let k=0;k<n;k++){const tx=(d==='l'?sx+11:d==='r'?sx+1:sx+(k%2?2:10))+(n>1?(k-1)*(d==='u'||d==='d'?2:0):0);R(o.tail,tx,y0+8+k,4,6);R(o.tailTip||'#fff',tx+1,y0+12+k,3,2);}}
 R(o.legs||'#1a1522',sx+5,y0+13,2,3);R(o.legs||'#1a1522',sx+9,y0+13,2,3);
 R(cl,sx+4,y0+8,8,6);R(tr,sx+4,y0+8,8,1);R(tr,sx+7,y0+9,2,4);
 if(o.hood){R(o.hoodC||cl,sx+3,y0+1,10,4);R(o.hoodC||cl,sx+3,y0+5,2,6);R(o.hoodC||cl,sx+11,y0+5,2,6);}
 else{R(hr,sx+3,y0+3,10,3);R(hr,sx+3,y0+5,2,7);R(hr,sx+11,y0+5,2,7);}
 R(sk,sx+5,y0+3,6,5);
 R(o.hood?(o.hoodC||cl):hr,sx+5,y0+(d==='u'?3:2),6,d==='u'?5:2);
 if(ea){R(ea,sx+4,y0,3,3);R(ea,sx+9,y0,3,3);R(ei,sx+5,y0+1,1,1);R(ei,sx+10,y0+1,1,1);}
 if(o.hat){R(o.hat,sx+3,y0+1,10,2);R(o.hat,sx+5,y0-1,6,2);}
 if(o.crown){R('#ffd27a',sx+5,y0-1,6,2);R('#ffd27a',sx+5,y0-2,1,1);R('#ffd27a',sx+8,y0-2,1,1);R('#ffd27a',sx+10,y0-2,1,1);}
 const ey=o.eye||'#111';
 if(d==='d'){R(ey,sx+6,y0+5,1,1);R(ey,sx+9,y0+5,1,1);}else if(d==='l')R(ey,sx+5,y0+5,1,1);else if(d==='r')R(ey,sx+10,y0+5,1,1);
 ctx.globalAlpha=1;
}
const vixen=(sx,sy,d,bob)=>person(sx,sy,{d,bob,hair:'#0d0b12',ears:'#e8833a',tail:'#e8833a',tailTip:'#fff',cloth:'#2a2236',trim:'#a06bff'});
const shade=(sx,sy,d,bob,t)=>{R('#8f7bff',sx,sy,T,T,.1+Math.sin(t/220)*.04);const c='#9a86ff';person(sx,sy,{d,bob,alpha:.8,skin:c,hair:'#5a46c8',cloth:'#6b57d8',trim:'#cfc4ff',ears:c,tail:c,tailTip:'#e8e0ff',legs:'#5a46c8',eye:'#fff',earIn:'#fff'});};

function npc(o,sx,sy,t){
 const L=o.look||{},bob=((t/450|0)%2)?1:0;
 if(o.id==='voice'){
  R('#030208',sx-4,sy-16,24,32,.92);R('#14102a',sx-2,sy-14,20,28,.7);
  for(let i=0;i<9;i++){const mx=sx-2+hash(i,1,5)*16,my=sy-12+hash(i,2,5)*24;const o2=.5+.5*Math.sin(t/250+i*1.7);R('#e8e0f0',mx,my,3,1+((i+(t/180|0))%2),.25+o2*.6);}
  R('#a06bff',sx+2,sy-9,2,2,.8);R('#a06bff',sx+10,sy-9,2,2,.8);return;}
 person(sx,sy,Object.assign({d:'d',bob,alpha:L.ghost?.72:1,tail:L.tails?'#e8833a':null,tails:L.tails,tailTip:'#fff'},L));
}
function statue(o,sx,sy,lit,t){
 R('#7a7488',sx+2,sy+11,12,5);R('#8e889c',sx+3,sy+10,10,2);
 const c=lit?'#ffd27a':'#a49eb4';
 if(lit){R('#ffd27a',sx,sy,T,T,.14+Math.sin(t/180)*.05);}
 if(o.sym==='sun'){R(c,sx+5,sy+3,6,6);R(c,sx+7,sy+1,2,2);R(c,sx+7,sy+10,2,1);R(c,sx+3,sy+5,2,2);R(c,sx+11,sy+5,2,2);}
 else if(o.sym==='moon'){R(c,sx+5,sy+2,5,8);R(c,sx+4,sy+4,2,4);R('#4a4458',sx+8,sy+3,3,6);}
 else if(o.sym==='star'){R(c,sx+7,sy+1,2,9);R(c,sx+3,sy+5,10,2);R(c,sx+5,sy+3,6,5);}
 else{R(c,sx+3,sy+5,10,4);R('#201a30',sx+6,sy+5,4,4);R('#a06bff',sx+7,sy+6,2,2);R(c,sx+5,sy+4,6,1);}
}
function deco(o,sx,sy,t){
 if(o.kind==='stall'){R('#5a3b22',sx+1,sy+8,2,8);R('#5a3b22',sx+13,sy+8,2,8);R('#a8433a',sx,sy+2,16,3);R('#e8d8b8',sx+3,sy+2,3,3);R('#e8d8b8',sx+9,sy+2,3,3);R('#7a5532',sx+2,sy+10,12,3);R('#d4a847',sx+4,sy+8,3,2);R('#8fbf6a',sx+9,sy+8,3,2);}
 else if(o.kind==='crate'){R('#7a5532',sx+1,sy+3,14,12);R('#5a3b22',sx+1,sy+8,14,1);R('#5a3b22',sx+7,sy+3,2,12);}
 else if(o.kind==='shelf'){R('#4a3224',sx,sy,T,T);R('#2c1e16',sx,sy+7,T,1);for(let i=0;i<7;i++){const h=hash(o.x+i,o.y,2);R(['#8a3a3a','#3a5a8a','#c9a24a','#4a7a4a','#7a4a8a'][(h*5)|0],sx+1+i*2,sy+1+(i%2),1,5+(i%2));R(['#8a3a3a','#3a5a8a','#c9a24a','#4a7a4a','#7a4a8a'][((h*7)|0)%5],sx+1+i*2,sy+9,1,5);}}
 else if(o.kind==='brazier'){R('#4a4350',sx+3,sy+9,10,4);R('#2a2530',sx+5,sy+13,6,3);const f=Math.sin(t/110+o.x)*1.5;R('#ff7a2a',sx+5,sy+4+f,6,6);R('#ffd27a',sx+6,sy+6+f,4,4);R('#fff0b0',sx+7,sy+7+f,2,2);R('#ff7a2a',sx-2,sy-2,T+4,T+4,.07);}
}
function obj(o,sx,sy,t,A){
 const S=A.S;
 switch(o.t){
  case 'sign':R('#5a3b22',sx+7,sy+8,2,8);R('#9a7448',sx+2,sy+3,12,7);R('#6b4e2c',sx+3,sy+5,10,1);R('#6b4e2c',sx+3,sy+7,8,1);break;
  case 'plate':{const on=A.platePressed(o.id);R('#6b6580',sx+2,sy+2,12,12);R('#2a2538',sx+3,sy+3,10,10);R(on?'#ffd27a':'#3b3650',sx+5,sy+5,6,6);if(on)R('#ffd27a',sx,sy,T,T,.15);break;}
  case 'lever':{const on=A.flag('lever_'+o.id);R('#2a2538',sx+3,sy+10,10,5);R('#6b57d8',sx+4,sy+11,8,3);if(on){R('#cfc4ff',sx+10,sy+3,2,8);R('#ffd27a',sx+9,sy+1,4,3);}else{R('#cfc4ff',sx+4,sy+3,2,8);R('#8f7bff',sx+3,sy+1,4,3);}R('#8f7bff',sx,sy,T,T,S.split?.18:.07);break;}
  case 'gate':{const open=A.gateOpen(o);if(open){R('#6c6478',sx,sy,2,T);R('#6c6478',sx+14,sy,2,T);R('#b49cff',sx+2,sy+7,12,1,.25);}else{R('#7a7288',sx,sy,T,T);R('#5a5468',sx+1,sy+1,14,14);R('#b49cff',sx+4,sy+3,8,1);R('#b49cff',sx+7,sy+4,2,8);R('#b49cff',sx+4,sy+12,8,1);}break;}
  case 'bridge':if(A.flag('lever_'+o.lever)){R('#8b6a45',sx,sy,T,T);R('#6b4e2c',sx,sy+5,T,1);R('#6b4e2c',sx,sy+11,T,1);R('#a8845a',sx,sy,T,1);R('#5a3b22',sx,sy,1,T);R('#5a3b22',sx+15,sy,1,T);}break;
  case 'dais':{const filled=S.frags[o.i];R('#5a5470',sx,sy,T,T);R('#3a3550',sx+1,sy+1,14,14);R('#2a2538',sx+4,sy+4,8,8);if(filled){R(['#ffd27a','#a06bff','#8fd0ff','#ff7a8a'][o.i],sx+5,sy+5,6,6);R('#fff',sx+6,sy+6,2,2);R(['#ffd27a','#a06bff','#8fd0ff','#ff7a8a'][o.i],sx-2,sy-2,T+4,T+4,.12+Math.sin(t/200)*.04);}if(A.flag('undertow_open')){R('#a06bff',sx,sy,T,T,.35+Math.sin(t/160)*.15);}break;}
  case 'frag':if(!S.frags[o.i]){const b=Math.sin(t/200)*2,c=['#ffd27a','#a06bff','#8fd0ff','#ff7a8a'][o.i];R(c,sx,sy,T,T,.12);R(c,sx+6,sy+3+b,4,10);R(c,sx+4,sy+5+b,8,6);R('#fff',sx+7,sy+5+b,2,3);}break;
  case 'shell':if(!S.shells[o.id]){const b=Math.sin(t/300+o.x)*1;R('#f0e6d8',sx+5,sy+7+b,6,5);R('#d8c4b0',sx+6,sy+6+b,4,2);R('#c9a8b8',sx+7,sy+9+b,2,2);R('#fff',sx+4,sy+6+b,8,7,.06);}break;
  case 'glyph':{const a=S.split?.55+Math.sin(t/250)*.3:.09;for(let i=0;i<4;i++){R('#b49cff',sx+2+(i%2)*6,sy+2+(i>>1)*7,5,2,a);R('#b49cff',sx+3+((i+1)%2)*6,sy+4+(i>>1)*7,2,3,a);}if(S.split)R('#b49cff',sx-1,sy-1,T+2,T+2,.12);break;}
 }
}
FX.draw=function(c2d,camX,camY,t){
 ctx=c2d;if(!ctx)return;const A=FX.api,S=A.S,m=A.M(),th=TH[m.theme]||TH.sand;
 R('#000',0,0,320,192);
 const x0=Math.max(0,Math.floor(camX/T)),y0=Math.max(0,Math.floor(camY/T)),x1=Math.min(m.w-1,Math.ceil((camX+320)/T)),y1=Math.min(m.h-1,Math.ceil((camY+192)/T));
 for(let y=y0;y<=y1;y++)for(let x=x0;x<=x1;x++){
  const sx=x*T-camX,sy=y*T-camY,ch=A.floorCh(x,y);
  if(ch==='#')wall(x,y,sx,sy,th);else if(ch==='T')tree(x,y,sx,sy,th);else if(ch==='~')water(x,y,sx,sy,th,t);else if(ch==='|')veil(x,y,sx,sy,th,t);else if(ch===' ')R('#000',sx,sy,T,T);else floor(ch,x,y,sx,sy,th);
 }
 const ents=[];
 for(const o of m.O){
  if(o.x<x0-1||o.x>x1+1||o.y<y0-1||o.y>y1+1)continue;
  const sx=o.x*T-camX,sy=o.y*T-camY;
  if(o.t==='npc')ents.push({y:o.y,f:()=>npc(o,sx,sy,t)});
  else if(o.t==='statue')ents.push({y:o.y,f:()=>statue(o,sx,sy,!!S.lit[o.sym],t)});
  else if(o.t==='deco')ents.push({y:o.y,f:()=>deco(o,sx,sy,t)});
  else obj(o,sx,sy,t,A);
 }
 const fx=S.fox,sh=S.sh;
 ents.push({y:fx.py+.01,f:()=>vixen(Math.round(fx.px*T-camX),Math.round(fx.py*T-camY),fx.d,fx.moving&&((t/120|0)%2))});
 if(S.split)ents.push({y:sh.py+.02,f:()=>shade(Math.round(sh.px*T-camX),Math.round(sh.py*T-camY),sh.d,sh.moving&&((t/120|0)%2),t)});
 ents.sort((a,b)=>a.y-b.y);for(const e of ents)e.f();
 if(S.split){R('#1a0a3a',0,0,320,192,.34);for(const o of m.O){if(o.t==='glyph'||o.t==='lever'){obj(o,o.x*T-camX,o.y*T-camY,t,A);}}shade(Math.round(sh.px*T-camX),Math.round(sh.py*T-camY),sh.d,sh.moving&&((t/120|0)%2),t);}
 // vignette
 ctx.globalAlpha=.4;const g=ctx.createRadialGradient(160,96,70,160,96,200);g.addColorStop(0,'rgba(0,0,0,0)');g.addColorStop(1,'rgba(0,0,0,1)');ctx.fillStyle=g;ctx.fillRect(0,0,320,192);ctx.globalAlpha=1;
};
})();