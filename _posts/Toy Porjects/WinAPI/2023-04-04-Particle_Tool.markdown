---
layout: post
title:  "간단한 Particle Tool 제작"
date:   2023-04-04 20:07:40 +0900
image: https://github.com/kj1241/kj1241.github.io/assets/22047442/da5fe94a-7410-446b-9adc-f93af0e6420a
toc: true
categories: [WinAPI]
tags: [C++,WinAPI]
---

<h2><green1_h2> 토이 프로젝트 소개 </green1_h2></h2>
Particle tool은 WinAPI를 사용하여 개발된 소프트웨어로, 입자 효과를 생성하고 제어하는 도구입니다.  
WinAPI는 Windows 응용 프로그램을 개발하기 위한 API이며, 이를 활용하여 입자 시스템을 구현한 것입니다.  

<br>
<br>
<h2><green1_h2> 토이 프로젝트 개요 </green1_h2></h2><ul>
<li><h5><green1_h5>프로젝트명: </green1_h5><span> Particle Tool </span></h5></li>
<li><h5><green1_h5>장르: </green1_h5><span> Tool </span></h5></li>
<li><h5><green1_h5>기간: </green1_h5><span> 2022.12.02~2022.12.04</span></h5></li>
<li><h5><green1_h5>플랫폼: </green1_h5><span> PC </span></h5></li></ul>


<br>
<br>
<h2><green1_h2> 팀 구성 </green1_h2></h2><ul> 
<li><h5><green1_h5>Developer(1명): </green1_h5><span> 화면 전환 구성, 파티클 계산 로직 제작, UI 구성 </span></h5></li>
</ul>

<br>
<h2><green1_h2> 기술 스택 </green1_h2></h2><ul>
<li><h5><green1_h5>엔진: </green1_h5><span> visual Studio 2022 </span></h5></li>
<li><h5><green1_h5>언어: </green1_h5><span> C++ / winAPI   </span></h5></li>
</ul>

<br>
<br>
<h2 ><green1_h2> 토이 프로젝트 특징 </green1_h2></h2>
1. WInAPI로 제작된 UI로 구성되어 있습니다.
2. 파티클의 물리계산이 적용되어 있어 값을 적용해 볼 수 있습니다.

<br>
<br>
<h2><green1_h2> 개발자의 역활 및 경험 </green1_h2></h2>
- **Patrticl Tool 제작** <span><red1_error>(전체 게임 제작 기여도: 100%)</red1_error></span>
    1. 버튼, 에디트 박스 컨트롤을 이용하여 UI를 제작하였습니다.
    2. 브러쉬, 팬 등을 이용한 오브젝트 랜더링에 사용하였습니다.
    3. 랜더링: 이중버퍼링 방식 적용하였습니다.


<br>
<h3><green1_h3> 프로그래밍 로직 구조 </green1_h3></h3>
![화면 구성](https://github.com/kj1241/kj1241.github.io/assets/22047442/da5fe94a-7410-446b-9adc-f93af0e6420a){: width="740" height="400"}



<br>
<br>
<h2><green1_h2> 결과(성과) 및 데모 </green1_h2></h2>
<ul>
<li><h5><green1_h5>성과: </green1_h5><span> 툴 데모 제작 </span></h5></li>
<li><h5><green1_h5>깃 허브(코드): </green1_h5><span> 
<a href="https://github.com/kj1241/WinAPI_ToyProejct/tree/main/WinAPI_Particle">https://github.com/kj1241/WinAPI_ToyProejct/tree/main/WinAPI_Particle</a> </span></h5></li>
<li><h5><yellow1_h5>유튜브 동영상: </yellow1_h5></h5> 
<iframe width="700" height="480" src="https://www.youtube.com/embed/0KmnYV9FBWs" title="ParticleToyProjcet(WinAPI)" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
</li>
</ul>


<br>
<h3><green1_h3> 여담 </green1_h3></h3>
- Unreal Full Engine Source 5.1 버전 빌드를 Incredibuild 없이 돌리는 중에 너무 많은 시간을 잡아 먹어서, 그래픽카드 없는 노트북으로 주제를 고민하다 WinAPI 스킬을 점검할 겸 Particl Tool을 제작하게 되었습니다.


