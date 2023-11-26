---
layout: post
title:  "언리얼 프로젝트 모방하기"
date:   2023-06-27 01:29:24 +0900
image: https://github.com/kj1241/kj1241.github.io/assets/22047442/8a4a5f90-b61d-4641-81f4-9d2673efcafd
toc: true
categories: [Unreal_TP]
tags: [C++,Unreal]
---

<h2><green1_h2> 토이 프로젝트 소개 </green1_h2></h2>
언리얼 엔진을 사용한 무한던전 모방 프로젝트는 C++로 구현되며,  
랜덤 생성된 던전과 캐릭터를 포함하며,  
플레이어는 계속해서 던전을 탐험하며 적들과 전투합니다.  

<br>
<br>
<h2><green1_h2> 토이 프로젝트 개요 </green1_h2></h2><ul>
<li><h5><green1_h5>프로젝트명: </green1_h5><span> Infinite Dungeon 모방하기 </span></h5></li>
<li><h5><green1_h5>장르: </green1_h5><span> 토이 프로젝트</span></h5></li>
<li><h5><green1_h5>기간: </green1_h5><span> 23.05.22~23.06.15</span></h5></li>
<li><h5><green1_h5>플랫폼: </green1_h5><span> PC </span></h5></li></ul>


<br>
<br>
<h2><green1_h2> 팀 구성 </green1_h2></h2><ul> 
<li><h5><green1_h5>Developer(1명): </green1_h5><span> 게임 로직 설계, 게임 구성, 언리얼 API 공부, 블루프린트 제작 </span></h5></li>
</ul>

<br>
<h2><green1_h2> 기술 스택 </green1_h2></h2><ul>
<li><h5><green1_h5>엔진: </green1_h5><span> Unreal 4.26.2  </span></h5></li>
<li><h5><green1_h5>언어: </green1_h5><span> C++ / bluePrint   </span></h5></li>
</ul>

<br>
<br>
<h2 ><green1_h2> 토이 프로젝트 특징 </green1_h2></h2>
1. 게임을 제작함으로써, 10년 만에 사용하는 언리얼 엔진의 숙련도를 높이는데 목표를 두고 있습니다.
2. 참고 도서를 보고, 지금까지 게임 만든 방식들을 돌아보며, 다른 개발자의 제작 방식을 살펴보는 데에 초점을 맞추었습니다.
3. 블루 프린터를 사용한 언리얼 툴에 대해서 집중적으로 보았습니다.

<br>
<br>
<h2><green1_h2> 개발자의 역활 및 경험 </green1_h2></h2>
- **무한 던전 토이 프로젝트 제작** <span><red1_error>(전체 게임 제작 기여도: 100%)</red1_error></span>
    1. GTA와 비슷한 3인칭 컨트롤 구현.
    2. 애니메이션 몽타주를 활용하여 애니메이션 콤보 공격을 구현.
    3. 콜리전을 이용하여 대미지 전달 방식을 구현.
    4. 에셋을 활용하여 캐릭터에 무기를 장착하는 방식을 구현.
    5. 블루 프린터를 이용하여 UI와 AI기능을 구현.
    6. 엑셀로 간편하게 레벨 디자인을 할 수 있도록 구현.

<br>
<h3><green1_h3> 언리얼 엔진 화면 </green1_h3></h3>
![화면](https://github.com/kj1241/kj1241.github.io/assets/22047442/8a4a5f90-b61d-4641-81f4-9d2673efcafd){: width="100%" style="aspect-ratio:16/9"}

<br>
<br>
<h2><green1_h2> 결과(성과) 및 데모 </green1_h2></h2>
<ul>
<li><h5><green1_h5>성과: </green1_h5><span> 2015년 1학기 윈도우 프로그래밍 실습 기말 과제 </span></h5></li>
<li><h5><green1_h5>깃 허브(코드): </green1_h5><span> 
<a href="https://github.com/kj1241/Unreal_Toy_Project">https://github.com/kj1241/Unreal_Toy_Project</a> </span></h5></li>
<li><h5><green1_h5>유튜브 동영상: </green1_h5></h5> 
<iframe width="100%" style="aspect-ratio:16/9" src="https://www.youtube.com/embed/MkTLRH3twNg" title="언리얼 프로젝트 모방하기 Ver.1(무한던전)" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
</li>
</ul>

<br>
<h3><green1_h3> 여담 </green1_h3></h3>
- 실행하는 데 있어서 발생한 각종 에러는 구글링과 언리얼 개발자 커뮤니티를 참조하여 해결하였습니다.

<br>
<h3><green1_h3> 배운 점 및 앞으로 수정할 점 </green1_h3></h3>
- 배운점
    - 블루 프린터를 사용하여 애니메이션, UI, 비헤이어 비어 트리등을 사용하는 방법을 익혔습니다.
    - C++ 사용하여 원활하게 블루프린터와 연동하는 방식에 대해서 익혔습니다. 
    - 책에 나와있지 않는 부분 (소켓 생성, 블루프린트 로직 작성등) 연습하기 위해 직접 제작하였습니다. 
<br>
- 보안해야될 사항
    - 실행하는데 문제가 없지만 캐릭터선택 화면에서 UI 블루프린터의 로직에러에 대해서 조사 중입니다.
    - 에셋을 사용하여 배경을 제작하였는데, 배경에 관해서 좀 더 심도 있게 진행할 예정입니다.

<br>

---

<br>

<h6><green1_h5>참조: [이득우의 언리얼 C++ 게임 개발의 정석]</green1_h5></h6>
<p></p>
![이득우 언리얼](https://github.com/kj1241/kj1241.github.io/assets/22047442/61fba4b5-46b8-45ed-b5a4-29b20eeca845){: width="20%" }

