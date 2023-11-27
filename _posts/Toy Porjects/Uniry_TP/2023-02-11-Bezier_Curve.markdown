---
layout: post
title:  "베지어 곡선을 이용한 스킬 제작"
date:   2023-02-11 00:24:51 +0900
image: https://github.com/kj1241/kj1241.github.io/assets/22047442/b43b529f-6c88-4852-a8bd-ddaafb78216e
toc: true
categories: [Unity_TP]
tags: [C#, Unity, Shader, Bezier Curve]
---

<h2><green1_h2> 토이 프로젝트 소개 </green1_h2></h2>
Unity와 C#을 이용하여 개발된 토이프로젝트입니다.  
이 프로젝트는 리그 오브 레전드(League of Legends) 챔피언인 카이사(Kai'Sa)의 Q 스킬을 모방하여, 베지어 곡선을 활용한 독특한 스킬을 제작하였습니다.  
이를 통해 게임 내 스킬 구현 및 애니메이션에 대한 실전 경험을 쌓았습니다.  

<br>
<br>
<h2><green1_h2> 토이 프로젝트 개요 </green1_h2></h2><ul>
<li><h5><green1_h5>프로젝트명: </green1_h5><span> 3D 전투 액션 스킬 제작하기 </span></h5></li>
<li><h5><green1_h5>장르: </green1_h5><span> 토이 프로젝트</span></h5></li>
<li><h5><green1_h5>기간: </green1_h5><span> 2022.11.24~2022.11.25 (베지어 곡선) / 2022.12.20 (트레일 렌더러) / 2023.02.13 (시각적 효과 업데이트)</span></h5></li>
<li><h5><green1_h5>플랫폼: </green1_h5><span> PC </span></h5></li></ul>


<br>
<br>
<h2><green1_h2> 팀 구성 </green1_h2></h2><ul> 
<li><h5><green1_h5>Developer(1명): </green1_h5><span> 로직 설계, 연출 구성, 쉐이더 제작, 스킬제작 </span></h5></li>
</ul>

<br>
<h2><green1_h2> 기술 스택 </green1_h2></h2><ul>
<li><h5><green1_h5>엔진: </green1_h5><span> Unity 2021.3.14f1 </span></h5></li>
<li><h5><green1_h5>언어: </green1_h5><span> C# / mono </span></h5></li>
</ul>


<br>
<br>
<h2 ><green1_h2> 토이 프로젝트 특징 </green1_h2></h2>
1. 카이사 Q 스킬 모방해서 스킬을 만들었습니다.
2. 모바일 게임처럼 스킬 쿨타임을 제작하였습니다.


<br>
<br>
<h2><green1_h2> 개발자의 역활 및 경험 </green1_h2></h2>
- **게임 캐릭터 스킬 제작** <span><red1_error>(전체 게임 제작 기여도: 100%)</red1_error></span>
   1. 스킬 쿨타임 시각적 효과 구현.
   2. 충돌시 터지는 파티클 구현.
   3. 베지어 곡선을 이용하여 스킬 이동 계산
   4. 림 라이트를 이용한 불투명 쉐이더
   5. 오브젝트 이동시 형태 변형 쉐이더
   6. 유니티 Trail Render를 사용한 궤적 효과 


<br>
<h3><green1_h3> 과정 </green1_h3></h3>
![불 이펙트](https://github.com/kj1241/kj1241.github.io/assets/22047442/b43b529f-6c88-4852-a8bd-ddaafb78216e){: width="50%" }



<br>
<br>
<h2><green1_h2> 결과(성과) 및 데모 </green1_h2></h2>
<ul>
<li><h5><green1_h5>성과: </green1_h5><span> 토이 프로젝트 데모 프로그램 제작 </span></h5></li>
<li><h5><green1_h5>지드라이브(코드): </green1_h5><span> 
<a href="https://github.com/kj1241/Unity_practice/tree/main/Bezier_Curves_test">https://github.com/kj1241/Unity_practice/tree/main/Bezier_Curves_test</a> </span></h5></li>
<iframe width="100%" style="aspect-ratio:16/9" src="https://www.youtube.com/embed/D5vNHpiF63I" title="Skill imitation bezier curve (기능 추가)" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
</li>
</ul>

<br>
<h3><green1_h3> 배운 점 및 앞으로 수정할 점 </green1_h3></h3>
- 배운점
    - 베지어 곡선을 사용하여 이동, 스킬 구현을 할 수 있게 되었습니다.
    - 유니티 Trail Render를 이용하여 오브젝트의 퀘적효과를 구현할 수 있게 되었습니다.