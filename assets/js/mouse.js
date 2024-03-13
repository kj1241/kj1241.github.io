var colour="#639"; //시계 색상
var clock_size=5; //시계 크기

var clok;
var cpos=0;
var newx=xmo=400;
var newy=ymo=300;
window.onload=function() { if (document.getElementById) {
  clok=document.createElement("div");
  clok.style.position="absolute";
  clok.appendChild(createDigit("dig0"));
  clok.appendChild(createDigit("dig1"));
  clok.appendChild(createColon());
  clok.appendChild(createDigit("dig2"));
  clok.appendChild(createDigit("dig3"));
  clok.appendChild(createColon("ms"));
  clok.appendChild(createDigit("dig4"));
  clok.appendChild(createDigit("dig5"));
  document.body.appendChild(clok);
  tick();
}}

var digit=new Array(247, 146, 221, 219, 186, 235, 239, 210, 255, 251);

function tick() {
  var now=new Date();
  var t=Math.floor(now.getTime()/500)%2;
  var i, j, k;
  var won=oo(now.getHours())+oo(now.getMinutes())+oo(now.getSeconds());
  for (i=0; i<6; i++) for (j=0; j<7; j++) {
	k=digit[won.substring(i, i+1)].toString(2).substring(j+1, j+2);
	document.getElementById("dig"+i+j).style.backgroundColor=(k==1)?colour:"transparent";
  }
  document.getElementById("mstop").style.backgroundColor=(t)?"transparent":colour;
  document.getElementById("msbot").style.backgroundColor=(t)?"transparent":colour;
  xmo+=Math.floor((newx-xmo)/4);
  clok.style.left=Math.round(xmo-(clock_size+2)*4)+"px";
  ymo+=Math.floor((newy-ymo)/4);
  clok.style.top=Math.round(ymo-clock_size*2.5)+"px";
  setTimeout("tick()", 40);
}

document.onmousemove=mouse;

function mouse(e) {
  newy=(e)?e.pageY:event.y+scro();
  newx=(e)?e.pageX:event.x;
}

function scro() {
  var scro=0;
  if (document.body.scrollTop) scro=document.body.scrollTop;
  else if (document.documentElement && document.documentElement.scrollTop) scro=document.documentElement.scrollTop;
  return (scro);
}

function oo(o) { return(((o<10)?"0"+o:o).toString()); }

function createDigit(id) {
  var odiv=createDiv(0, cpos, clock_size+clock_size+2, clock_size+2, false);
  cpos+=clock_size+4;
  odiv.appendChild(createDiv(0, 1, 2, clock_size, id+"0"));
  odiv.appendChild(createDiv(1, 0, clock_size, 2, id+"1"));
  odiv.appendChild(createDiv(1, clock_size, clock_size, 2, id+"2"));
  odiv.appendChild(createDiv(clock_size, 1, 2, clock_size, id+"3"));
  odiv.appendChild(createDiv(clock_size+1, 0, clock_size, 2, id+"4"));
  odiv.appendChild(createDiv(clock_size+1, clock_size, clock_size, 2, id+"5"));
  odiv.appendChild(createDiv(clock_size+clock_size, 1, 2, clock_size, id+"6"));
  return (odiv);
}

function createColon(id) {
  var odiv=createDiv(0, cpos, clock_size+clock_size+2, 2, false);
  cpos+=4;
  var dot1=createDiv(4, 0, 3, 2, (id)?id+"top":false);
  dot1.style.backgroundColor=colour;
  odiv.appendChild(dot1);
  var dot2=createDiv(clock_size+clock_size-5, 0, 3, 2, (id)?id+"bot":false);
  dot2.style.backgroundColor=colour;
  odiv.appendChild(dot2);
  return (odiv);
}

function createDiv(top, left, height, width, id) {
  var div=document.createElement("div");
  div.style.position="absolute";
  div.style.top=top+"px";
  div.style.left=left+"px";
  div.style.height=height+"px";
  div.style.width=width+"px";
  div.style.overflow="hidden";
  if (id) div.setAttribute("id", id);
  return (div);
}
