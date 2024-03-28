---
layout: post
title: "유니티 기능성 프로그래밍 - 중간1 과제(PlasticRunner ver.2)"
date: 2024-03-01 11:36:45 +0900
image: https://drive.google.com/thumbnail?id=1GV6oHSbCIfWhWORAsLgvB5k2pn8esqGA
toc: true
categories: [Unity_TP] 
tags: [C#, Unity, 2D Running Game]
keywords: C#, Unity, 2D Running Game
related_links:
    - url: /unity_tp/FunctionalProgramming.html
    - url: /unity_tp/FunctionalProgramming_Middle2Exam.html
    - url: /unity_tp/FunctionalProgramming_FinalExam.html
---

## <unity_h2> 프로젝트 소개 </unity_h2>

당시 본 프로젝트의 목적은 유니티 엔진을 이용하여 러닝게임 제작에 목표를 두고 있습니다.
1. 주어진 프레임 워크에 자신의 소스를 덧붙여서 새로운 게임을 만드는데 목표를 두고 있습니다.
2. 다양한 개발을 통하여 프로그래밍 실력을 향상시키는데 목표를 두고 있습니다.
3. 유니티 엔진을 활용함에 있어서 다양한 기반의 스크립트를 연습하는데 목표를 두고 있습니다.

<br>
<br>

## <unity_h2> 프로젝트 개요 </unity_h2>

- <span><unity_h5>프로젝트명:</unity_h5> PlasticRunner ver.2</span>
- <span><unity_h5>과제:</unity_h5> 2018년 1학기 팀 기능성 프로그래밍 중간1 과제</span>
- <span><unity_h5>게임 장르:</unity_h5> 2D 러닝게임 </span>
- <span><unity_h5>기간:</unity_h5> 제작 완료</span>
    - ver.1: 2018.03.30~2018.04.7(제작)
    - ver.2: 2018.04.07~2018.04.14(제작)
- <span><unity_h5>개발인원:</unity_h5> Developer(1명)</span>
- <span><unity_h5>플랫폼:</unity_h5> PC (Window)</span>

<br>

### <unity_h3> 기술 스택 </unity_h3>

- <span><unity_h5>개발 도구:</unity_h5> Unity 2017.2.0f3 → 2019.4.22f1 / visual stuido </span>
- <span><unity_h5>개발 언어:</unity_h5> C# / mono </span>
- <span><unity_h5>그래픽 디자인:</unity_h5> Adobe Photoshop / Adobe Illustrator / World Creator </span>
- <span><unity_h5>음향 효과:</unity_h5> Adobe Audiition </span>

<br>
<br>


## <unity_h2> 프로젝트 특징 및 기능 구현 </unity_h2>

![PlasticRunner_levelDesign]({{ site.google_drive }}1yknCtY6K5dxyxQEX79IO9yRm8HcyUx3o{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<unity_h6>Plastic Runner levelDesign</unity_h6>*

시험 내용: 기존의 Plastic Runner 프로젝트에서 특징 3가지 기능을 추가하여 프로젝트를 완성해야 합니다.

<br>

### <unity_h3>게임 기능 구현 ver.1</unity_h3><red1_error> (전체 제작 기여도: 100%)</red1_error>

![게임 기능 구현]({{ site.google_drive }}1GV6oHSbCIfWhWORAsLgvB5k2pn8esqGA{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<unity_h6>게임 기능 구현</unity_h6>*

- 2단 점프 구현하였습니다.
- 장애물 블럭을 구현하였습니다. 
- 이 장애물 블럭을 격파하려면 플레이어의 색은 장애물 색과 맞아야 합니다.

<br>

### <unity_h3>예시 게임 모방 제작 ver.2</unity_h3><red1_error> (전체 제작 기여도: 100%)</red1_error>

![게임 기능 구현]({{ site.google_drive }}10IGPUgjv8K9Nf-xrZ3liFlCYiTAibnCb{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<unity_h6>게임 기능 구현</unity_h6>*

- 움직일수록 동전을 떨어트리면서 채력이 줄어듭니다.
- 장애물을 제작하였습니다.


<br>
<br>

## <unity_h2> 수정된 규칙의 기획안 ver.1 </unity_h2>

- 플레이어:
    - 이중 점프 구현
    
- 승리 조건:
    - 없음(점수를 많이 얻으면 얻을 수록 좋다.)

- 패배 조건:
    - 장애물에 부딪혔을때 장애물과 같은 색이 아니라면 패배
    - 발판을 못밟고 밑으로 떨어지면 패배

- 게임에서 추가된 UI
    - 장애물 구현

- 배경음악 및 효과음
    - 배경음악 삽입
    - 효과음 : 점프할 떄

- 게임 시퀸스 : 인트로 → 메인 → 엔드 화면으로 씬전환


<br>
<br>

## <unity_h2> 결과(성과) 및 데모 </unity_h2>

- <span><unity_h5>성과:</unity_h5> 2018년 1학기 팀 기능성 프로그래밍 중간1 과제 </span>
- <span><unity_h5>깃허브(코드):</unity_h5> 공개 예정</span>

<br>
<br>

## <unity_h2> 비고 및 여담 </unity_h2>

- 배운점:
    - 2D 점핑 게임이지만 실제로 제작할때는 3D 캐릭터 오브젝트 기반으로 제작하였습니다.
    - 충돌처리 로직에 관하여 학습하게 되었습니다.
    - 2중 점프에 관해서 구현하였습니다.
    - 당시에는 비주얼보다 만들어진 프로젝트에 작성자가 생각하는 기능적 방법의 로직을 삽입해서 동작시키는데 중점을 두었습니다.

- 수정할 점:
    - 아직 공개하지 못한 3D 러닝게임을 ver.3로 추가할 예정입니다.