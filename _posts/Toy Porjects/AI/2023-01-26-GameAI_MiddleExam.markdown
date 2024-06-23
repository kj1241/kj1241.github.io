---
layout: post
title: "게임인공지능 - 중간 과제(FSM 구현)"
date: 2023-01-26 11:49:14 +09:00
image: https://drive.google.com/thumbnail?id=1eDnZVIPQnzZqPyPK7TcEWEHGM-JmZDM9
toc: true
categories: [AI]
keywords: AI, C++, FSM
addsence: false
lastmod: 2024-06-23 09:00:00 +09:00
sitemap:
  changefreq : daily
  priority : 1.0
excerpt: C++로 FSM 패턴을 사용해 NPC AI를 제작한 2018년 게임 인공지능 과제 프로젝트입니다.
related_links:
  - url: /algorithm/GameAI.html
  - url: /ai/GameAI.html
  - url: /ai/GameAI_FinalExam.html
---

## <ai_h2> 프로젝트 소개 </ai_h2>

C++에서 구현한 FSM(유한 상태 기계) 디자인 패턴을 활용하여 NPC의 인공지능을 제작합니다. FSM은 NPC의 다양한 상태를 정의하고, 각 상태 전이에 대한 규칙을 구현하여 NPC의 행동을 효과적으로 제어할 수 있습니다. 이 프로젝트는 NPC의 상태를 정의하고 AI로 부여하여 몬스터와 만나기까지의 과정을 다룹니다.

<br>
<br>

## <ai_h2> 프로젝트 개요 </ai_h2>

- <span><ai_h5>프로젝트명:</ai_h5> FSM 구현</span>
- <span><ai_h5>과제:</ai_h5> 2018년 1학기 게임인공지능 중간 과제</span>
- <span><ai_h5>장르:</ai_h5> Toy Project</span>
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

1. 휴식 상태 (Idel state)
    - 랜덤성을 부여하기 위해서 특정 확률로 쉽니다.
2. 이동 상태 (Move State)
    - 플레이어 근처 x축, y축 거리 3 이내에 적이 없으면 NPC가 move 상태로 전환되어 이동합니다.
3. 공격 상태 (Attack State)
    - 적과 조우하는 순간 Attack 상태로 전환되어 적을 공격합니다.
4. 도망 상태 (Return State)
    - 특정 상황이 되면 몬스터로 부터 도망칩니다.

<span><ai_h5>승리 조건:</ai_h5> 적을 물리치면 플레이어가 승리하게 됩니다.</span>


<br>

### <ai_h3>인공지능 상태 FSM 설계</ai_h3><red1_error> (전체 제작 기여도: 100%)</red1_error>

1. Entity 클래스 구현
    - 플레이어와 몬스터를 상속받는 부모 객체 Entity를 구현했습니다.
2. FSM 구현
    - 플레이어의 현재 상태를 나타낼 수 있는 유한 상태 기계(FSM)를 state로 구현했습니다.

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
- <span><ai_h5>깃허브(코드):</ai_h5> [https://github.com/kj1241/AI_Portfolio/tree/main/GameAI](https://github.com/kj1241/AI_Portfolio/tree/main/GameAI)</span>

## <ai_h2> 비고 및 여담 </ai_h2>

- 배운점
    - FSM 코드는 시스템의 상태와 이벤트에 따른 동작을 체계적으로 정의하는 강력한 도구입니다. 상태와 전환 규칙을 명확하게 정의함으로써 복잡한 시스템을 간단하고 이해하기 쉽게 모델링할 수 있습니다.
    - 위의 예제를 통해 FSM 코드의 구조와 동작 방식을 이해하고, 이를 다양한 응용 프로그램에 적용할 수 있게 되었습니다.
- 수정할 점
    - 더욱 복잡한 상태와 전환 규칙을 추가하여 NPC의 행동을 더욱 정교하게 구현할 수 있습니다.
    - FSM의 성능을 최적화하여 대규모 NPC가 있는 게임에서도 원활하게 동작하도록 개선할 수 있습니다.

이 프로젝트를 통해 FSM을 사용한 AI 설계의 기초를 다지고, 게임 인공지능 개발에 대한 깊은 이해를 얻을 수 있었습니다. 앞으로의 프로젝트에서도 이러한 설계를 활용하여 더 복잡하고 흥미로운 AI를 구현할 계획입니다.