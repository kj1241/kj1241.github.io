---
layout: post
title: "게임인공지능 - 중간 과제(FSM 구현)"
date: 2023-01-25 23:49:14 +0900
image: https://drive.google.com/thumbnail?id=1eDnZVIPQnzZqPyPK7TcEWEHGM-JmZDM9
toc: true
categories: [AI]
tags: [C++, FSM]
---

## <ai_h2> 프로젝트 소개 </ai_h2>

C++에서 구현한 FSM(유한 상태 기계) 디자인 패턴을 활용하여 NPC의 인공지능을 개발합니다. FSM은 NPC의 다양한 상태를 정의하고, 각 상태 전이에 대한 규칙을 구현하여 NPC의 행동을 효과적으로 제어합니다. 이를 통해 NPC는 상황에 따라 다양한 행동을 수행하며 인공지능을 향상시킵니다.  

<br>
<br>

## <ai_h2> 프로젝트 개요 </ai_h2>

- <span><ai_h5>프로젝트명:</ai_h5> FSM 구현</span>
- <span><ai_h5>과제:</ai_h5> 2018년 1학기 게임인공지능 중간 과제</span>
- <span><ai_h5> 장르:</ai_h5> Toy Project</span>
- <span><ai_h5>기간:</ai_h5> 제작 완료</span>
    - ver.1: 2018.04.08~2018.04.15
- <span><ai_h5>개발인원:</ai_h5> Developer(1명)</span>
- <span><ai_h5>플랫폼:</ai_h5> PC (Window)</span>

<br>

### <ai_h3> 기술 스택 </ai_h3>

- <span><ai_h5>개발 도구:</ai_h5> visual Studio 2015 → 2022  </span>
- <span><ai_h5>개발 언어:</ai_h5> C++  </span>


<br>
<br>

## <ai_h2> 프로젝트 특징 및 기능 구현 </ai_h2>

1. 플레이어 근처에 x 축 거리 y 축 거리 3이내에 적이 없으면 move state 상태가 되어 이동합니다.
2. 적과 조우하는 순간 Attack state 상태로 전환 후 적을 공격는 상태로 변경되어 적을 공격하게 됩니다.
3. 적을 죽이면 플레이어 승리하게 만들었습니다.


<br>

### <ai_h3>인공지능 상태 FSM 설계</ai_h3><red1_error> (전체 제작 기여도: 100%)</red1_error>

1. 플레이어와 몬스터를 상속받는 부모객체 Enitiy 구현.
2. 플레이어의 현재 상태를 나타낼 수 있는 유한상태기계(FSM)를 state로 구현.

<br>
<br>

## <ai_h2>클래스 다이어그램</ai_h2>

![시퀸스]({{ site.google_drive }}1eDnZVIPQnzZqPyPK7TcEWEHGM-JmZDM9{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}

1. NPC의 상태를 설계하고 FSM 패턴으로 구현하였습니다.
2. NPC의 인공지능에 대해서 공부하였습니다.


<br>
<br>

## <ai_h2> 결과(성과) 및 데모 </ai_h2>

<iframe width="100%" style="aspect-ratio:16/9" src="https://www.youtube.com/embed/2FgzgUDakqI" title="FSM(C++ 콘솔)" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

- <span><ai_h5>성과:</ai_h5> 2018년 1학기 게임인공지능 중간 과제 </span>
- <span><ai_h5>깃허브(코드):</ai_h5> [https://github.com/kj1241/Other-Etc/tree/main/AI/FSM](https://github.com/kj1241/Other-Etc/tree/main/AI/FSM)</span>

## <ai_h2> 비고 및 여담 </ai_h2>

- 배운점 및 수정할 점
    - NPC의 상태를 설계하고 FSM 패턴으로 구현할 수 있게 되었습니다.