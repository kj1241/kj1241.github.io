---
layout: post
title: "페럴림픽"
date: 2023-01-11 12:33:59 +0900
image: https://drive.google.com/thumbnail?id=1tUbWhgVKW6auwhMvHCFnmMxoFlus1x2p
toc: true
categories: [Game_Jam]
tags: [C#,Unity,3D Simulation Game]
keywords: C#, Unity, 3D Simulation Game
excerpt: 평창 동계 패럴림픽 개최 기념, 선수들을 응원하는 취지의 마음으로 시작하였습니다. 게임 제작하다 실패해버린 희대의 망작. 그렇지만 게임 제작에 대해서 많은 것을 배웠습니다.
---

<!-- <h1><yellow1_h1>프로젝트 이름: 페럴림픽 </yellow1_h1></h1>
![페럴림픽](https://github.com/kj1241/kj1241.github.io/assets/22047442/50b0d39b-409c-4138-9d53-16859ae84fe5){: width="740" height="400"} -->

## <unity_h2> 게임 소개 </unity_h2>

평창 동계 패럴림픽 개최 기념, 선수들을 응원하는 취지의 마음으로 시작하였습니다.  
게임 제작하다 실패해버린 희대의 망작. 그렇지만 게임 제작에 대해서 많은 것을 배웠습니다.

<br>
<br>


## <unity_h2> 게임 개요 </unity_h2>

- <span><unity_h5>프로젝트명: </unity_h5> Paralympic </span>
- <span><unity_h5>게임 장르: </unity_h5> 3D Simulation Game </span>
- <span><unity_h5>기간: </unity_h5></span>
    - ver.1: 2021.03.19~2021.03.21(스토브인디 온라인 게임잼 Episode02)
    - ver.2: 2023.01.01~2023.01.15(리펙토링)
- <span><unity_h5>개발인원:</unity_h5> Developer(3명)</span>
    - 역활: Main Programmer
- <span><unity_h5>플랫폼: </unity_h5> PC (Window)</span> 


<br>

### <unity_h3> 기술 스택 </unity_h3>

- <span><unity_h5>개발 도구: </unity_h5> Unity 2019.4.19f1 / visual studio </span>
- <span><unity_h5>개발 언어: </unity_h5> C#  </span>
- <span><unity_h5>그래픽 디자인: </unity_h5> Adobe Photoshop , 3Ds Max</span>
- <span><unity_h5>음향 효과: </unity_h5> Adobe Audiition</span> 

<br>

### <unity_h3> 프로젝트 팀 구성 </unity_h3>

- <span><unity_h5>Prgrammer(1명): </unity_h5> 게임 로직, 캐릭터 제어 인터페이스, UI 디자인, 레벨 디자인</span>
- <span><unity_h5>3D Artist(1명): </unity_h5> 캐릭터 모델링</span>
- <span><unity_h5>Game Designer(1명): </unity_h5> 게임 컨셉 제안</span>

<br>
<br>

## <unity_h2> 프로젝트 특징 및 기능 구현 </unity_h2>

1. 주어진 역경을 이겨내고 동계 페럴림픽에서 1등을 차지해 보세요.


<br>

### <unity_h3>인디게임 참여</unity_h3><red1_error> (전체 제작 기여도: 70%)</red1_error>

1. 게임 로직 구성: 주어진 키보드 버튼으로 상대편 AI보다 빠르게 달리면 우승
2. UGUI를 사용한 UI 인터페이스 디자인


<br>
<br>

## <unity_h2> 결과(성과) 및 데모 </unity_h2>

- <span><unity_h5>성과:</unity_h5> 데모 프로젝트 제작  </span>
- <span><unity_h5>깃허브(코드):</unity_h5> [Paralympic-refactoring](Paralympic-refactoring)</span>

<br>

### <unity_h3> 게임 다운로드 </unity_h3>

<iframe width="100%" style="aspect-ratio:16/9" src="https://indie.onstove.com/ko/games/318" title="Paralympic" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

<br>
<br>

## <unity_h2> 비판 </unity_h2>

- 게임 제작 의 실패 이유:
    1. <unity_h5>소통의 부족 및 능력의 부족:</unity_h5>
        - 3D 모델링: 3D 모델링이 기괴하게 느껴저서 프로그래밍으로 커버쳐보려 했으나, 실패했습니다. 또한 총 5번의 모델링 수정 요구를 했습니다.
        - 디테일 부족의 문제: 페럴림픽이라는 주제를 게임으로 제작하기 위해서 필요한 세부 정보에 대해 요구하였으나 소통이 부족해서 개발이 어려웠습니다.
    
    2. <unity_h5>고증에 매몰되어 버린 경직된 사고:</unity_h5>
        - 트랙 변경 요청: 게임잼 당시 tenserflow 학습에 실패함에 따라 미리 학습시킨 데이터를 통하여 게임을 완성 시키고 싶었기 때문에 트랙 수정을 요청하였으나, 현실적인 고증을 우선시하여 트랙 수정이 거절 되었습니다.
    
    3. <unity_h5>개인의 욕심 문제:</unity_h5>
        - 페럴림픽 컨셉 수정 요청: 페럴림픽은 민감한 주제일 수 있어 수정을 요구했으나 받아들여지지 않았습니다.
        - 베지어 곡선을 통한 이동 거절: 초기 트랙은 100m, 400m, 1600m 및 육상 수영등 다양한 종목을 원했으나 개인적으로 레이싱 게임에 강화학습 AI를 적용시키고 싶어서 베지어 곡선 이동을 거절 하였습니다.



<br>

### <unity_h3>배운 점 및 반성</unity_h3>

- 제작할 당시에는 재작하면서 단순히 힘들었지만, 되돌아가서 생각해보면 저의 리더쉽 문제가 아니였을까 생각합니다. 이번 기회를 반면교사 삼아서 더욱 증진하겠습니다. 

- 게임 제작은 소통의 부족, 한계를 극복하지 못한 개인적인 욕망 등 여러 문제로 실패하였습니다. 해당 게임으로 인해 불편함을 느끼신 분들에게 깊은 사죄의 말씀을 드립니다. 앞으로는 이러한 경험을 토대로 더 나은 결과물을 만들 수 있도록 노력하겠습니다.

