---
layout: post
title: "모바일증강현실프로그래밍실습 - 기말 과제"
date: 2024-02-21 09:00:00 +09:00
image: https://drive.google.com/thumbnail?id=1Qv8uEaaQQ2fC8W3Uu9d2HMOLnCT7cfGp
toc: true
categories: [Unity_TP] 
keywords: C#, Unity, BFS, 넓이 우선탐색
related_links:
    - url: /unity_tp/MobileProgramming.html
---

## <unity_h2> 프로젝트 소개 </unity_h2>

모바일 증강현실 프로그래밍 실습에서 몬스터 AI와 게임 플레이를 구현한 Toy Project입니다. 플레이어는 마우스를 사용하여 이동하며, 몬스터들은 특정 조건에 따라 플레이어를 추적하고 공격합니다. 몬스터들의 소리 및 시각 탐지 영역을 시각적으로 표시할 수 있도록 제작하였습니다.

<br>
<br>

## <unity_h2> 프로젝트 개요 </unity_h2>

- <span><unity_h5>프로젝트명:</unity_h5> 몬스터 ai 및 게임 플레이 구현</span>
- <span><unity_h5>과제:</unity_h5> 2016년 2학기 모바일증강현실프로그래밍실습 기말 과제</span>
- <span><unity_h5>게임 장르:</unity_h5> Toy Project</span>
- <span><unity_h5>기간:</unity_h5> 제작 완료</span>
    - ver.1: 2016.12.17~2016.12.23(제작)
- <span><unity_h5>개발인원:</unity_h5> Developer(1명)</span>
- <span><unity_h5>플랫폼:</unity_h5> PC (Window)</span>

<br>

### <unity_h3> 기술 스택 </unity_h3>

- <span><unity_h5>개발 도구:</unity_h5> Unity 5.4.1f1 / visual stuido </span>
- <span><unity_h5>개발 언어:</unity_h5> C# / mono </span>

<br>
<br>


## <unity_h2> 프로젝트 특징 및 기능 구현 </unity_h2>

시험 내용:
1. Procedural Content Generation 기법을 적용하여 맵을 생성하세요.
2. 던전내 이동시 마우스 좌클릭을 이용하여 자동으로 길찾기를 수행하여 이동합니다.
3. 화살표키를 이용하여 플레이어의 움직임을 수동으로 조작합니다. 이동시 플레이어의 시선도 이동 방향으로 회전 이동해야 합니다. 
4. 다음과 같이 단순 지능을 가진 다양한 몬스터 NPC들을 던전내 적절한 위치에 배치하며 다음과 같이 간이 인공지능 기능이 부여 되어 있습니다. - 전진몬스터: idle시, x축 방향으로 전진, 앞에 벽이 있으면 반대 방향으로 회전후 전진. 5미터 이내 플레이어가 보이면 플레이 어를 추적하고 1미터 내이면 플레이어를 공격. - Z전진몬스터: idle시, z축 방향으로 전진, 앞에 벽이 있으면 반대 방향으로 회전한 후 전진. 5미터 이내 플레이어가 보이면 플레이어를 추적하고 1미터 이내이면 플 레이어를 공격. - 랜덤몬스터: idle시, x 혹은 z축 방향으로 전진하며 동일 방향으로 계속 전진. 앞에 벽이 있으면 랜덤하게 90도 오른쪽 혹은 왼쪽 회전 후 전진. 8미터 이내 플레이어 가 보이면 플레이어를 추적하고 1미터 이내이면 플레이어를 공격. - 보스몬스터: 자신의 위치에 가만히 있으나 소리에 민감하여 30미터 이내 플레이어의 발자국소리를 들을 수 있으며 들리는 즉시, 해당 방향으로 이동. 30미터이내 소리가 들리지 않으면 해당위치에서 정지해 있음. 10 미터 이내 플레이어가 보이면 플레이어를 추적하고 1미터 이내이면 플레이어를 공격함.
5. F1키를 누르면 몬스터들의 소리 탐지 영역, 시각 탐지 영역을 시각적으로 보여주며 다시 F1키를 누르면 사라져야합니다.

<br>

### <unity_h3>몬스터 ai 및 게임 플레이 구현 ver.1</unity_h3><red1_error> (전체 제작 기여도: 100%)</red1_error>

![AI 플레이어 추격]({{ site.google_drive }}1Qv8uEaaQQ2fC8W3Uu9d2HMOLnCT7cfGp{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<unity_h6>AI 플레이어 추격</unity_h6>*

1. 던전 제너릭 생성 - 실패
2. 좌클릭 길찾기 - 구현
3. 플레이어 이동 및 회전 - 구현
4. 몬스터 ai - 공격모션을 제외하고 구현
5. 몬스터 영역 ui - 구현

<br>
<br>

## <unity_h2> 결과(성과) 및 데모 </unity_h2>

<iframe width="100%" style="aspect-ratio:16/9" src="https://www.youtube.com/embed/OVavf6x_VMI" title="AI 길찾기 알고리즘 (BFS)" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

<iframe width="100%" style="aspect-ratio:16/9" src="https://drive.google.com/file/d/1VUN_ODBqFznrGLK9dgXmL9ehWq-aapPC/preview" title="기말과제 -모바일 증강현실 프로젝트 보고서" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

- <span><unity_h5>성과:</unity_h5> 2018년 1학기 기능성 프로그래밍 기말 과제 </span>
- <span><unity_h5>깃허브(코드):</unity_h5> </span>

<br>
<br>

## <unity_h2> 비고 및 여담 </unity_h2>

- 배운점
    1. BFS를 사용하여 몬스터 ai를 구현하는 방법을 배웠습니다.
    2. 플레이어와 몬스터의 상호 작용을 만드는 방법에 대해서 배웠습니다.
    3. 라인 랜더러를 통해서 범위를 만드는 방법에 대해서 학습하였습니다.
- 문제점
    - 정확하게 구현하지 못한 이유는 기말과제의 시간 분배를 제대로 하지 못해서 생겼습니다.