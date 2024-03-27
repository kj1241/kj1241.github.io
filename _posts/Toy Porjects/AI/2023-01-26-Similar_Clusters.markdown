---
layout: post
title: "게임인공지능 - 기말 과제(유사 Clustering AI 제작 ver.2)"
date: 2023-01-26 16:30:56 +0900
image: https://drive.google.com/thumbnail?id=1HLt16M6v9ypxd6jGv3sM4deHXQI280Y_
toc: true
categories: [AI]
tags: [AI, c#, Unity, repulsive force, similar clustering]
keywords: AI, c#, Unity, repulsive force, similar clustering
related_links:
    - url: /unity/Similar_Clustering_log.html
---

## <ai_h2> 프로젝트 소개 </ai_h2>

유니티를 활용하여 구현한 척력과 인력을 활용한 유사 군집 알고리즘은 물체들 간의 상호작용을 시뮬레이션합니다. 이 알고리즘은 물리적 특성을 고려하여 물체들이 서로 반발하거나 인력에 의해 서로 끌리는 행동을 모델링하여 현실적인 군집 형성을 시뮬레이션합니다. 이를 통해 다양한 시나리오에서 물체 군집 형성과 상호작용을 시각적으로 표현할 수 있습니다.

<br>
<br>

## <ai_h2> 프로젝트 개요 </ai_h2>

- <span><ai_h5>프로젝트명:</ai_h5>Similar_Clusters 구현</span>
- <span><ai_h5>과제:</ai_h5> 2018년 1학기 게임인공지능 기말 과제</span>
- <span><ai_h5> 장르:</ai_h5> Toy Project</span>
- <span><ai_h5>기간:</ai_h5> 제작 완료</span>
    - ver.1: 2018.06.09~ 2018.06.10
    - ver.2: 2018.06.10~ 2018.06.14
- <span><ai_h5>개발인원:</ai_h5> Developer(1명)</span>
- <span><ai_h5>플랫폼:</ai_h5> PC (Window)</span>

<br>

### <ai_h3> 기술 스택 </ai_h3>

- <span><ai_h5>개발 도구:</ai_h5> Unity  / visual stuido </span>
- <span><ai_h5>개발 언어:</ai_h5> C# </span>

<br>
<br>

## <ai_h2> 프로젝트 특징 및 기능 구현 </ai_h2>

테라에서 영감 받아 소형 몬스터들이 군집체인 대형 몬스터를 찾아가는 시뮬레이션을 제작했습니다.

<br>

### <ai_h3>척력과 인력을 통한 AI구현 ver.1</ai_h3><red1_error> (전체 제작 기여도: 100%)</red1_error>

1. 군집체 기준으로 척력과 인력을 구현하였습니다.
2. 소속을 해당 오브젝트 색으로 표현하였습니다.
3. 키보드를 사용하여 플레이어 조종 가능을 만들었습니다.


### <ai_h3>미니게임 구현</ai_h3><red1_error> (전체 제작 기여도: 100%)</red1_error>

![대장 NPC가 가지고 있는 영역]({{ site.google_drive }}1HLt16M6v9ypxd6jGv3sM4deHXQI280Y_{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<art_h6>대장 NPC가 가지고 있는 영역</art_h6>* 


1. 부하 NPC는 대장 NPC의 거리에 따라서 소속을 결정할 수 있습니다.
2. 대장 NPC는 영역을 가지고 있으며 부하 NPC가 영역에 들어오게 되면 대장 NPC의 소속 색으로 변경됩니다.
3. 소속이 변경된 NPC는 대장 NPC 방향으로 이동합니다.  
4. 모든 부하 NPC를 얻으면 승리하게 됩니다.


<br>
<br>

## <ai_h2> 결과(성과) 및 데모 </ai_h2>

<iframe width="100%" style="aspect-ratio:16/9" src="https://www.youtube.com/embed/Spt5XdKhHHE" title="유사 Clustering 군집 AI 제작" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

- <span><ai_h5>성과:</ai_h5>  2018년 1학기 게임 인공지능 기말 과제 </span>
- <span><ai_h5>깃허브(코드):</ai_h5> [https://github.com/kj1241/Other-Etc/tree/main/AI/Clustering](https://github.com/kj1241/Other-Etc/tree/main/AI/Clustering</span>

<br>
<br>

## <ai_h2> 비고 및 여담 </ai_h2>

- 배운점 및 수정할 점
    - 우두머리의 청력과 인력을 바탕으로 군집 AI를 제작하였습니다.
    - 군집체에 넓이 우선탐색을 추가하여 AI를 작성해야 할 필요성이 있습니다.

