---
layout: post
title:  "유사 Clustering AI 제작"
date:   2023-01-26 16:30:56 +0900
image: https://github.com/kj1241/kj1241.github.io/assets/22047442/aaeb8f21-7161-4368-8a7d-a60afcda8a2e
toc: true
categories: [AI]
tags: [C#, Unity, repulsive force]
---

<h2><green1_h2> 토이 프로젝트 소개 </green1_h2></h2>
유니티를 활용하여 구현한 척력과 인력을 활용한 유사 군집 알고리즘은 물체들 간의 상호작용을 시뮬레이션합니다.  
이 알고리즘은 물리적 특성을 고려하여 물체들이 서로 반발하거나 인력에 의해 서로 끌리는 행동을 모델링하여 현실적인 군집 형성을 시뮬레이션합니다.  이를 통해 다양한 시나리오에서 물체 군집 형성과 상호작용을 시각적으로 표현할 수 있습니다.

<br>
<br>
<h2><green1_h2> 토이 프로젝트 개요 </green1_h2></h2><ul>
<li><h5><green1_h5>프로젝트명: </green1_h5><span> Similar_Clusters 구현 </span></h5></li>
<li><h5><green1_h5>장르: </green1_h5><span>2018년 1학기 게임 인공지능 기말 과제  </span></h5></li>
<li><h5><green1_h5>기간: </green1_h5><span> 2018.06.09~ 018.06.14</span></h5></li>
<li><h5><green1_h5>플랫폼: </green1_h5><span> PC </span></h5></li></ul>


<br>
<br>
<h2><green1_h2> 팀 구성 </green1_h2></h2><ul> 
<li><h5><green1_h5>Developer(1명): </green1_h5><span> 유니티를 이용한 Similar Clusters 설계 및 구현 </span></h5></li>
</ul>

<br>
<h2><green1_h2> 기술 스택 </green1_h2></h2><ul>
<li><h5><green1_h5>엔진: </green1_h5><span> Unity </span></h5></li>
<li><h5><green1_h5>언어: </green1_h5><span> C# </span></h5></li>
</ul>

<br>
<br>
<h2 ><green1_h2> 토이 프로젝트 특징 </green1_h2></h2>
- 테라에서 영감 받아 소형 몬스터들이 군집체인 대형 몬스터를 찾아가는 시뮬레이션을 제작했습니다.

<br>
<h3 ><green1_h3> 토이 프로젝트 방식 </green1_h3></h3>
1. 부하 NPC는 대장 NPC의 거리에 따라서 소속을 결정할 수 있습니다.
2. 대장 NPC는 영역을 가지고 있으며 부하 NPC가 영역에 들어오게 되면 대장 NPC의 소속 색으로 변경됩니다.
3. 소속이 변경된 NPC는 대장 NPC 방향으로 이동합니다.  
4. 모든 부하 NPC를 얻으면 승리하게 됩니다.

<br>
<br>
<h2><green1_h2> 개발자의 역활 및 경험 </green1_h2></h2>
- **척력과 인력을 통한 AI구현** <span><red1_error>(전체 게임 제작 기여도: 100%)</red1_error></span>
    1. 군집체 기준으로 척력과 인력을 구현.
    2. 소속을 해당 오브젝트 색으로 표현.
    3. 키보드를 사용하여 플레이어 조종 가능

<br>
<h3><green1_h3> 대장 NPC가 가지고 있는 영역 </green1_h3></h3>
![군집](https://github.com/kj1241/kj1241.github.io/assets/22047442/aaeb8f21-7161-4368-8a7d-a60afcda8a2e){: width="740" height="400"}

<br>
<br>
<h2><green1_h2> 결과(성과) 및 데모 </green1_h2></h2>
<ul>
<li><h5><green1_h5>성과: </green1_h5><span> 2018년 1학기 게임 인공지능 기말 과제 </span></h5></li>
<li><h5><green1_h5>깃 허브(코드): </green1_h5><span> 
<a href="https://github.com/kj1241/Other-Etc/tree/main/AI/Clustering">https://github.com/kj1241/Other-Etc/tree/main/AI/Clustering</a></span></h5></li>
<li><h5><green1_h5>유튜브 동영상: </green1_h5></h5> 
<iframe width="700" height="400" src="https://www.youtube.com/embed/Spt5XdKhHHE" title="유사 Clustering 군집 AI 제작" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
</li>
</ul>





