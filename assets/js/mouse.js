// var colour="#639"; //시계 색상
// var clock_size=10; //시계 크기

// var clok;
// var cpos=0;
// var newx=xmo=400;
// var newy=ymo=300;
// window.onload=function() { if (document.getElementById) {
//   clok=document.createElement("div");
//   clok.style.position="absolute";
//   clok.appendChild(createDigit("dig0"));
//   clok.appendChild(createDigit("dig1"));
//   clok.appendChild(createColon());
//   clok.appendChild(createDigit("dig2"));
//   clok.appendChild(createDigit("dig3"));
//   clok.appendChild(createColon("ms"));
//   clok.appendChild(createDigit("dig4"));
//   clok.appendChild(createDigit("dig5"));
//   document.body.appendChild(clok);
//   tick();
// }}

// var digit=new Array(247, 146, 221, 219, 186, 235, 239, 210, 255, 251);

// function tick() {
//   var now=new Date();
//   var t=Math.floor(now.getTime()/500)%2;
//   var i, j, k;
//   var won=oo(now.getHours())+oo(now.getMinutes())+oo(now.getSeconds());
//   for (i=0; i<6; i++) for (j=0; j<7; j++) {
// 	k=digit[won.substring(i, i+1)].toString(2).substring(j+1, j+2);
// 	document.getElementById("dig"+i+j).style.backgroundColor=(k==1)?colour:"transparent";
//   }
//   document.getElementById("mstop").style.backgroundColor=(t)?"transparent":colour;
//   document.getElementById("msbot").style.backgroundColor=(t)?"transparent":colour;
//   xmo+=Math.floor((newx-xmo)/4);
//   clok.style.left=Math.round(xmo-(clock_size+2)*4)+"px";
//   ymo+=Math.floor((newy-ymo)/4);
//   clok.style.top=Math.round(ymo-clock_size*2.5)+"px";
//   setTimeout("tick()", 40);
// }

// document.onmousemove=mouse;

// function mouse(e) {
//   newy=(e)?e.pageY:event.y+scro();
//   newx=(e)?e.pageX:event.x;
// }

// function scro() {
//   var scro=0;
//   if (document.body.scrollTop) scro=document.body.scrollTop;
//   else if (document.documentElement && document.documentElement.scrollTop) scro=document.documentElement.scrollTop;
//   return (scro);
// }

// function oo(o) { return(((o<10)?"0"+o:o).toString()); }

// function createDigit(id) {
//   var odiv=createDiv(0, cpos, clock_size+clock_size+2, clock_size+2, false);
//   cpos+=clock_size+4;
//   odiv.appendChild(createDiv(0, 1, 2, clock_size, id+"0"));
//   odiv.appendChild(createDiv(1, 0, clock_size, 2, id+"1"));
//   odiv.appendChild(createDiv(1, clock_size, clock_size, 2, id+"2"));
//   odiv.appendChild(createDiv(clock_size, 1, 2, clock_size, id+"3"));
//   odiv.appendChild(createDiv(clock_size+1, 0, clock_size, 2, id+"4"));
//   odiv.appendChild(createDiv(clock_size+1, clock_size, clock_size, 2, id+"5"));
//   odiv.appendChild(createDiv(clock_size+clock_size, 1, 2, clock_size, id+"6"));
//   return (odiv);
// }

// function createColon(id) {
//   var odiv=createDiv(0, cpos, clock_size+clock_size+2, 2, false);
//   cpos+=4;
//   var dot1=createDiv(4, 0, 3, 2, (id)?id+"top":false);
//   dot1.style.backgroundColor=colour;
//   odiv.appendChild(dot1);
//   var dot2=createDiv(clock_size+clock_size-5, 0, 3, 2, (id)?id+"bot":false);
//   dot2.style.backgroundColor=colour;
//   odiv.appendChild(dot2);
//   return (odiv);
// }

// function createDiv(top, left, height, width, id) {
//   var div=document.createElement("div");
//   div.style.position="absolute";
//   div.style.top=top+"px";
//   div.style.left=left+"px";
//   div.style.height=height+"px";
//   div.style.width=width+"px";
//   div.style.overflow="hidden";
//   if (id) div.setAttribute("id", id);
//   return (div);
// }
////////

// var sparks=75; // 양
// var speed=33; // 속도
// var bangs=5; //지속시간
// var colours=new Array('#03f', '#f03', '#0e0', '#93f', '#0cf', '#f93', '#f0c'); 

// var intensity=new Array();
// var Xpos=new Array();
// var Ypos=new Array();
// var dX=new Array();
// var dY=new Array();
// var stars=new Array();
// var decay=new Array();
// var timers=new Array();
// var swide=800;
// var shigh=600;
// var sleft=sdown=0;
// var count=0;

// function addLoadEvent(funky) {
//   var oldonload=window.onload;
//   if (typeof(oldonload)!='function') window.onload=funky;
//   else window.onload=function() {
//     if (oldonload) oldonload();
//     funky();
//   }
// }

// addLoadEvent(clicksplode);

// function clicksplode() { if (document.getElementById) {
//   var i, j;
//   window.onscroll=set_scroll;
//   window.onresize=set_width;
//   document.onclick=eksplode;
//   set_width();
//   set_scroll();
//   for (i=0; i<bangs; i++) for (j=sparks*i; j<sparks+sparks*i; j++) {
//     stars[j]=createDiv('*', 13);
//     document.body.appendChild(stars[j]);
//   }
// }}

// function createDiv(char, size) {
//   var div, sty;
//   div=document.createElement('div');
//   sty=div.style;
//   sty.font=size+'px monospace';
//   sty.position='absolute';
//   sty.backgroundColor='transparent';
//   sty.visibility='hidden';
//   sty.zIndex='101';
//   div.appendChild(document.createTextNode(char));
//   return (div);
// }

// function bang(N) {
//   var i, Z, A=0;
//   for (i=sparks*N; i<sparks*(N+1); i++) { 
//     if (decay[i]) {
//       Z=stars[i].style;
//       Xpos[i]+=dX[i];
//       Ypos[i]+=(dY[i]+=1.25/intensity[N]);
//       if (Xpos[i]>=swide || Xpos[i]<0 || Ypos[i]>=shigh+sdown || Ypos[i]<0) decay[i]=1;
// 	  else {
//         Z.left=Xpos[i]+'px';
//         Z.top=Ypos[i]+'px';
// 	  }
//       if (decay[i]==15) Z.fontSize='7px';
//       else if (decay[i]==7) Z.fontSize='2px';
//       else if (decay[i]==1) Z.visibility='hidden';
// 	  decay[i]--;
// 	}
// 	else A++;
//   }
//   if (A!=sparks) timers[N]=setTimeout('bang('+N+')', speed);
// }

// function eksplode(e) { 
//   var x, y, i, M, Z, N;
//   set_scroll();
//   y=(e)?e.pageY:event.y+sdown;
//   x=(e)?e.pageX:event.x+sleft;
//   N=++count%bangs;
//   M=Math.floor(Math.random()*3*colours.length);
//   intensity[N]=5+Math.random()*4;
//   for (i=N*sparks; i<(N+1)*sparks; i++) {
//     Xpos[i]=x;
//     Ypos[i]=y-5;
//     dY[i]=(Math.random()-0.5)*intensity[N];
//     dX[i]=(Math.random()-0.5)*(intensity[N]-Math.abs(dY[i]))*1.25;
//     decay[i]=16+Math.floor(Math.random()*16);
//     Z=stars[i].style;
//     if (M<colours.length) Z.color=colours[i%2?count%colours.length:M];
//     else if (M<2*colours.length) Z.color=colours[count%colours.length];
//     else Z.color=colours[i%colours.length];
//     Z.fontSize='13px';
//     Z.visibility='visible';
//   }
//   clearTimeout(timers[N]);
//   bang(N);
// } 

// function set_width() {
//   var sw_min=999999;
//   var sh_min=999999;
//   if (document.documentElement && document.documentElement.clientWidth) {
//     if (document.documentElement.clientWidth>0) sw_min=document.documentElement.clientWidth;
//     if (document.documentElement.clientHeight>0) sh_min=document.documentElement.clientHeight;
//   }
//   if (typeof(self.innerWidth)=='number' && self.innerWidth) {
//     if (self.innerWidth>0 && self.innerWidth<sw_min) sw_min=self.innerWidth;
//     if (self.innerHeight>0 && self.innerHeight<sh_min) sh_min=self.innerHeight;
//   }
//   if (document.body.clientWidth) {
//     if (document.body.clientWidth>0 && document.body.clientWidth<sw_min) sw_min=document.body.clientWidth;
//     if (document.body.clientHeight>0 && document.body.clientHeight<sh_min) sh_min=document.body.clientHeight;
//   }
//   if (sw_min==999999 || sh_min==999999) {
//     sw_min=800;
//     sh_min=600;
//   }
//   swide=sw_min-7;
//   shigh=sh_min-7;
// }

// function set_scroll() {
//   if (typeof(self.pageYOffset)=='number') {
//     sdown=self.pageYOffset;
//     sleft=self.pageXOffset;
//   }
//   else if (document.body && (document.body.scrollTop || document.body.scrollLeft)) {
//     sdown=document.body.scrollTop;
//     sleft=document.body.scrollLeft;
//   }
//   else if (document.documentElement && (document.documentElement.scrollTop || document.documentElement.scrollLeft)) {
//     sleft=document.documentElement.scrollLeft;
//     sdown=document.documentElement.scrollTop;
//   }
//   else {
//     sdown=0;
//     sleft=0;
//   }
// }

