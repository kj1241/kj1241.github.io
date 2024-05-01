---
layout: post
title: "유니티 기능성 프로그래밍 - 중간2 과제(Plattach ver.2)"
date: 2024-03-01 13:36:45 +0900
image: https://drive.google.com/thumbnail?id=1mWoi8-t7NBuMtiCCzfw4USA5i5tT7KBO
toc: true
categories: [Unity_TP] 
tags: [C#, Unity, 2D Puzzle Game]
keywords: C#, Unity, 2D Puzzle Game
related_links:
    - url: /unity_tp/FunctionalProgramming.html
    - url: /unity_tp/FunctionalProgramming_Middle1Exam.html
    - url: /unity_tp/FunctionalProgramming_FinalExam.html
---

## <unity_h2> 프로젝트 소개 </unity_h2>

Plattach 은 2D 퍼즐 게임으로, 특정 시간마다 블록을 제거하여 점수를 획득하는 콤보 시스템과 다양한 아이템을 활용하는 퍼즐 요소를 갖추고 있습니다. 
해당 프로젝트의 로직은 퍼즐게임이라는 기반으로 다양하게 응용해봤습니다.

<br>
<br>

## <unity_h2> 프로젝트 개요 </unity_h2>

- <span><unity_h5>프로젝트명:</unity_h5> Plattach ver.2</span>
- <span><unity_h5>과제:</unity_h5> 2018년 1학기 기능성 프로그래밍 중간2 과제</span>
- <span><unity_h5>게임 장르:</unity_h5> 2D 퍼즐게임 </span>
- <span><unity_h5>기간:</unity_h5> 제작 완료</span>
    - ver.1: 2018.05.02~2018.05.09(제작)
    - ver.2: 2023.02.17~2023.02.19(제작)
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

![Plattach_levelDesign]({{ site.google_drive }}1NRSQGeM53N5i56bO8CejtqRkT1ktd0Xq{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<unity_h6>Plattach levelDesign</unity_h6>*

시험 내용: 기존의 Plattach 프로젝트에서 특징 3가지 기능을 추가하여 프로젝트를 완성해야 합니다.
기본 규칙:
    - 최소 3개(상하좌우 방향)의 블록을 모아야 점수 획득
    - 3개이상의 블록은 연속해서 모을 수 있고, 가산점 부여
    - 3개이상 모아진 블록이 사라질 때까지 시간이 걸림
    - 블록은 언제든 자유롭게 교체 가능
    - 사라진 블록은 위에서 보충
    - 지정된 점수만큼 블록을 모으면 게임 플레이 시간 측정 및 게임 종료

<br>

### <unity_h3>게임 기능 구현 ver.1</unity_h3><red1_error> (전체 제작 기여도: 100%)</red1_error>

![게임 기능 구현]({{ site.google_drive }}18RFQ4SjmPe4Aif9Sh_hw-_rH1g0NRTK3{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<unity_h6>게임 기능 구현</unity_h6>*

1. 처음 블록들이 겹치는 경우 안겹치도록 새로 배치하였습니다.
2. 라스트 팡 구현: 시간이 끝났을때 블록을 못터트렸다면 터트린 것을 보여줍니다.


<br>

### <unity_h3>3-match 게임 제작 ver.2</unity_h3><red1_error> (전체 제작 기여도: 100%)</red1_error>

![3-match 게임 제작]({{ site.google_drive }}1mWoi8-t7NBuMtiCCzfw4USA5i5tT7KBO{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<unity_h6>3-match 게임 제작</unity_h6>*

1. 블록 스왑해서 3-match 매칭된다면 블록을 제거하는 방식으로 제작하였습니다.
2. 4개, 5개로 블록들이 매칭된다면 아이템을 만들도록 제작하였습니다.(캔디 크러쉬 사가 참고)
3. 벽이 존재한다면 블록이 옆에서 흐르도록 제작하였습니다.


<br>
<br>

## <unity_h2> 수정된 규칙의 기획안 ver.1 </unity_h2>

- Item:
    - 검은 블록 : 고득점을 획득 가능하게 만들어주는 아이템 폭탄 같이 하나를 누르면 다른 검은 블록들 주위로 터짐
    - 레드 블록 : 페이크 블록 레드블록이 터지면 점수를 얻지 못하고 모든 블록들이 다같이 터저버린다.
    
- 엔드 조건:
    - 시간이 끝나면 게임은 끝남

- 게임에서 추가된 UI
    - 게임의 끝나는 부분을 만들기 위해서 시간바 제작
    - 엔드 장면에 자신의 획득 스코어 노출

- 배경음악 및 효과음
    - 배경음악 삽입
    - 효과음 : 레드, 블랙 블록을 제외한 블록들 터질 때

- 게임 시퀸스 : 인트로 → 메인 → 엔드 화면으로 씬전환


<br>
<br>

## <unity_h2> 결과(성과) 및 데모 </unity_h2>

- <span><unity_h5>성과:</unity_h5> 2018년 1학기 기능성 프로그래밍 중간1 과제 </span>
- <span><unity_h5>깃허브(코드):</unity_h5> 공개 예정</span>

<br>
<br>

## <unity_h2> 비고 및 여담 </unity_h2>

- 수업에서 제작한 Plattach와 중간1 과제로 제출한 Plattach ver.1과 다른 점
    1. 수업에서 제작한 Plattach는 블록이 스왑할때 3-match 되면 블록을 제거하였지만, 중간고사로 제출한 프로젝트는 특정 시간마다 제거하도록 만들었습니다. 이로 인해 콤보 시스템을 제작하였습니다.
    2. 수업에서 제작한 Plattach는 로직을 3D 오브젝트 블록을 생성하고 제거했지만, 중간고사로 제출한 프로젝트는 로직을 UI로 만들었습니다. 따라서 유니티 UI에서 블록들을 제거하고 컨트롤 합니다.

- 배운점:
    - 3-match 알고리즘에 대해서 알게 되었습니다.(당시에는 3-match 알고리즘 자체가 없었습니다.)
    - 아이템, 벽 오브젝트등을 사용하여 로직을 제작 및 확장 할 수 있게 되었습니다.
    - 유니티 내부에서 오브젝트를 그리는 것이 유티니 UI에서 그리는 것보다 좀 더 빠르게 작동 한다는 것을 경험하게 되었습니다.

- 추가할 점:
    - ver.2는 ver.1과 다르게 Divide and Conquer방식으로 제로부터 로직을 제작하였습니다. 따라서 추후 Technical_Article를 통해서 개발 로그를 작성 할 예정입니다.