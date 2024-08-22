---
layout: post
title: "게임인공지능 - 기말 과제(유사 Clustering AI 제작 ver.2)"
date: 2023-01-26 16:30:56 +09:00
image: https://drive.google.com/thumbnail?id=1HLt16M6v9ypxd6jGv3sM4deHXQI280Y_
toc: true
categories: [AI]
keywords: AI, c#, Unity, repulsive force, similar clustering
addsence: false
lastmod: 2024-06-23 09:00:00 +09:00
sitemap:
  changefreq : daily
  priority : 1.0
excerpt: 유니티로 척력과 인력을 활용하여 유사 군집 알고리즘을 구현한 2018년 게임인공지능 프로젝트입니다.
related_links:
  - url: /algorithm/GameAI.html
  - url: /unity/Similar_Clustering_log.html
  - url: /ai/GameAI.html
  - url: /ai/GameAI_MiddleExam.html
  - url: /ai/GameAI_LuaFinalProject.html
---

## <ai_h2> 프로젝트 소개 </ai_h2>

유니티를 활용하여 구현한 척력과 인력을 활용한 유사 군집 알고리즘은 물체들 간의 상호작용을 시뮬레이션합니다. 이 알고리즘은 물리적 특성을 고려하여 물체들이 서로 반발하거나 인력에 의해 서로 끌리는 행동을 모델링하여 현실적인 군집 형성을 시뮬레이션합니다. 이를 통해 다양한 시나리오에서 물체 군집 형성과 상호작용을 시각적으로 표현할 수 있습니다.

<br>
<br>

## <ai_h2> 프로젝트 개요 </ai_h2>

- <span><ai_h5>프로젝트명:</ai_h5>Similar_Clusters 구현</span>
- <span><ai_h5>과제:</ai_h5> 2018년 1학기 게임인공지능 기말 과제</span>
- <span><ai_h5>장르:</ai_h5> Toy Project</span>
- <span><ai_h5>기간:</ai_h5> 제작 완료</span>
    - ver.1: 2018.06.09~2018.06.10
    - ver.2: 2018.06.10~2018.06.14
- <span><ai_h5>개발인원:</ai_h5> Developer(1명)</span>
- <span><ai_h5>플랫폼:</ai_h5> PC (Window)</span>

<br>

### <ai_h3> 기술 스택 </ai_h3>

- <span><ai_h5>개발 도구:</ai_h5> Unity 2018.2 / visual stuido 2017 </span>
- <span><ai_h5>개발 언어:</ai_h5> C# </span>

<br>
<br>

## <ai_h2> 프로젝트 특징 및 기능 구현 </ai_h2>

테라에서 영감을 받아 소형 몬스터들이 군집체인 대형 몬스터를 찾아가는 시뮬레이션을 제작했습니다.

<br>

### <ai_h3>척력과 인력을 통한 AI구현 ver.1</ai_h3><red1_error> (전체 제작 기여도: 100%)</red1_error>

1. 군집체 척력과 인력 구현
    - 개별 오브젝트가 서로 반발하거나 끌리는 행동을 물리 법칙에 따라 구현하였습니다.
2. 소속 색상 표현
    - 각 오브젝트의 소속을 색상으로 구분하여 시각적으로 쉽게 파악 가능게 구현하였습니다.
3. 플레이어 조작 기능
    - 키보드를 사용해 플레이어가 특정 오브젝트를 직접 조작할 수 있도록 했습니다.


### <ai_h3>미니게임 구현</ai_h3><red1_error> (전체 제작 기여도: 100%)</red1_error>

![대장 NPC가 가지고 있는 영역]({{ site.google_drive }}1HLt16M6v9ypxd6jGv3sM4deHXQI280Y_{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<art_h6>대장 NPC가 가지고 있는 영역</art_h6>* 


1. 소속 결정 알고리즘
    - 부하 NPC가 대장 NPC의 거리 및 영역에 따라 소속을 결정합니다.
2. 영역 기반 소속 변경
    - 부하 NPC가 대장 NPC의 영역에 들어오면 색상이 대장 NPC의 색상으로 변경합니다.
3. 소속 NPC 이동
    - 소속이 변경된 NPC는 대장 NPC 방향으로 자동 이동합니다.
4. 승리 조건
    - 모든 부하 NPC를 획득하면 승리합니다.


<br>
<br>

## <ai_h2> 결과(성과) 및 데모 </ai_h2>

<iframe width="100%" style="aspect-ratio:16/9" src="https://www.youtube.com/embed/Spt5XdKhHHE" title="유사 Clustering 군집 AI 제작" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

- <span><ai_h5>성과:</ai_h5> 2018년 1학기 게임 인공지능 기말 과제 </span>
- <span><ai_h5>깃허브(코드):</ai_h5> [https://github.com/kj1241/AI_Portfolio/tree/main/GameAI](https://github.com/kj1241/AI_Portfolio/tree/main/GameAI)</span>

<br>
<br>

## <ai_h2> 비고 및 여담 </ai_h2>

- 배운점:
    - 척력과 인력을 바탕으로 군집 AI를 구현하는 방법을 배웠습니다.
    - 유니티에서의 물리적 상호작용을 활용하여 현실적인 군집 형성을 시뮬레이션할 수 있음을 깨달았습니다.
- 수정할 점:
    - 군집체 AI에 넓이 우선 탐색을 추가하여 더욱 정교한 AI를 작성할 필요가 있습니다.
    - 성능 최적화를 통해 대규모 군집 시뮬레이션에서도 원활하게 작동하도록 개선할 필요가 있습니다.

이 프로젝트를 통해 유사 군집 알고리즘의 기본 원리와 구현 방법을 학습하고, 이를 게임 AI에 적용할 수 있는 능력을 키웠습니다. 향후 프로젝트에서도 이러한 알고리즘을 활용하여 더욱 복잡하고 흥미로운 군집 AI를 개발할 계획입니다.

