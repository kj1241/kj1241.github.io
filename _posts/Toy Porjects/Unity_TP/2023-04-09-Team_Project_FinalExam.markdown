---
layout: post
title: "유니티 팀 프로젝트 - 기말 과제(팀 프로젝트)"
date: 2023-04-09 17:36:45 +0900
image: https://drive.google.com/thumbnail?id=1u11qy4bDtE6Weceoq52p_byLXVQ_sGAG
toc: true
categories: [Unity_TP] 
tags: [C#, Unity, Shader]
---

## <unity_h2> 프로젝트 소개 </unity_h2>

첫 팀프로젝트로 개발한 유니티 C# 게임은 간단한 버튼 클릭 기반의 게임입니다. 플레이어는 다양한 버튼을 활용하여 게임 내 도전과 퍼즐을 해결하며, 간단하면서도 재미있는 게임 경험을 제공합니다. 게임은 초보자에게 프로그래밍 및 게임 디자인의 기초를 익히기에 이상적입니다.  

<br>
<br>

## <unity_h2> 프로젝트 개요 </unity_h2>

- <span><unity_h5>프로젝트명:</unity_h5> the Untitled Kingdom</span>
- <span><unity_h5>과제:</unity_h5> 2016년 1학기 팀 프로젝트 최종 과제</span>
- <span><unity_h5>게임 장르:</unity_h5> 2D Platformer Game</span>
- <span><unity_h5>기간:</unity_h5> 제작 완료</span>
    - ver.1: 2016.03.15~2016.05.31(제작)
    - ver.2: 2023.04.07~2023.04.08(엔진 업데이트)  
- <span><unity_h5>개발인원:</unity_h5> Developer(5명)</span>
    - 역활: 프로그래머
- <span><unity_h5>플랫폼:</unity_h5> PC (Window)</span>

<br>

### <unity_h3> 기술 스택 </unity_h3>

- <span><unity_h5>개발 도구:</unity_h5> Unity 5.3.6.f1 → 2019.4.22f1 / visual stuido </span>
- <span><unity_h5>개발 언어:</unity_h5> C# / mono </span>
- <span><unity_h5>그래픽 디자인:</unity_h5> Adobe Photoshop / Adobe Illustrator / World Creator </span>
- <span><unity_h5>음향 효과:</unity_h5> Adobe Audiition </span>

<br>

### <unity_h3> 프로젝트 팀 구성 </unity_h3>

- <span><unity_h5>Prgrammer(1명):</unity_h5> 게임 로직 설계, 게임 구성, 연출 구성, 파티클 보조, 쉐이더제작, UI 제작</span>
- <span><unity_h5>Artist(3명):</unity_h5> World Creator를 통한 지형제작, UI 디자인, 폰트디자인, 원화, 에프트이펙트를 통한 이펙트디자인</span>
- <span><unity_h5>Game Designer(1명):</unity_h5> 게임 스크립트 제작, 시나리오 제작, 오디오 사운드 제작</span>

<br>
<br>


## <unity_h2> 프로젝트 특징 및 기능 구현 </unity_h2>

프로젝트 특징과 기능 구현 내용입니다.

<br>

### <unity_h3>버튼형 게임 제작 ver.1</unity_h3><red1_error> (전체 제작 기여도: 35%)</red1_error>

1. 그래픽 학과 아티스트와 협업하여 프로젝트를 제작하였습니다.
2. 버튼형 게임으로 포켓몬스터에서 영감을 받았습니다.
3. 게임 디자이너가 만든 사운드를 스크립트를 사용하여 유니티에 붙였습니다.

<br>

#### <unity_h4>인트로 화면</unity_h4>

![필름 효과]({{ site.google_drive }}1VsjzT_xRq5HS4WgF6zWIsImqx1yhh0QQ{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}

- 오래된 필름 효과를 주기 위해, 카메라에 에프트 이펙트 처럼 쉐이더를 제작하여 효과를 부여하였습니다. 
- 영화적 효과 연출을 위한 필름 효과 쉐이더 제작하였습니다. 
- 불타는 효과 제작하였습니다.

<br>

#### <unity_h4>오브젝트 부수기</unity_h4>

![오브젝트 부수기]({{ site.google_drive }}1vbSkzTuf9jrgv-9DQwLR6qm8GBY9j2Kj{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}

- GPU Gems라는 책을 읽고 부서지는 오크통에 영감을 받아서, 화면클릭시 화면을 부수는 효과를 제작하였습니다.

<br>

#### <unity_h4>씬 로딩 화면</unity_h4>

![씬 로딩 화면]({{ site.google_drive }}1u11qy4bDtE6Weceoq52p_byLXVQ_sGAG{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}

- 씬별 전환이기 떄문에 다른 로딩화면이 아닌 에셋을 초기 로드하기 위해서 5초간 기다리는 화면입니다. 
- 게임 일시정지 효과를 이용한 시작 전 일시정지 구현하였습니다.


<br> 

#### <unity_h4>엔진 업데이트 전 화면</unity_h4>

![엔진 업데이트 전]({{ site.google_drive }}1lijTJu5q_ZTjjdoDT-AEvIZoFo6-RC70{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}

- Silder를 이용한 HP 바 제작하였습니다. 
- 물을 표현하기 위해서 쉐이더로 물 쉐이더를 제작하고 안개를 넣어서 빛을 불투명하게 만들었습니다.  


<br>

#### <unity_h4>공격 스킬</unity_h4>

![공격 스킬]({{ site.google_drive }}1W09w_dWsqCQWKcFg0d1fYUq-lUirO7Uq{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}

- 플레이어와 적이 공격하기 위한 스킬입니다. 
- 공격하면 공격맞은 쪽의 채력이 줄어듭니다. 
- 폭발하는 파티클 제작하였습니다. 
- 펀치 머싱을 이용한 공격스킬 UI 효과 제작하였습니다.

<br>

#### <unity_h4>치료 스킬</unity_h4>

![회복 스킬]({{ site.google_drive }}1onwCkOwKGzyLhFJeRwaLvKmi70ZkmlNg{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}

- 플레이어가 적이 채력을 회복하기 위한 스킬입니다. 
- 사용하면 쿨타임이 존재하고 채력이 회복됩니다.  

<br>

#### <unity_h4>동맹 스킬</unity_h4>

![동맹 스킬]({{ site.google_drive }}1JiscniXBgFQHm6xcFh1734i76JTKFZZ3{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}

- AI와 동맹을 맺게 되면 같은 편이 되어서 함깨 적을 공격하게됩니다. 

<br>

#### <unity_h4>결과 화면</unity_h4>

![결과 화면]({{ site.google_drive }}1iPcieTBa1XU_0ieG8YYQBvxbuqPKFzrn{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}

- 자신의 HP가 0이 되었을 경우 패배, 상대 AI을 전부 죽이면 승리가 됩니다.

<br>

### <unity_h3>엔진 업데이트 ver.2</unity_h3><red1_error> (전체 제작 기여도: 100%)</red1_error>

1. 엔진을 업데이트 해서 화질을 개선하였습니다.
2. 플레이어와 AI의 스킬 로그 창을 제작하엿습니다.  

<br>

#### <unity_h4>엔진 업데이트 후 화면</unity_h4>

![결과 화면]({{ site.google_drive }}1N0c23zASRzrgoHOo4qBkpI81_EQ2HWsH{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}

- 플레이어와 AI의 스킬 로그 창을 제작하엿습니다.  


<br>
<br>

## <unity_h2> 프로그래밍 로직 및 파일 구조 </unity_h2>

![게임 구성 로직]({{ site.google_drive }}1PozHeEC6gcEAlcvhii2D_3Jkre1pBOjN{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}

- 당시 머리속으로 구상했던 게임로직입니다. 
- 게임 로직 코드 작성 및 UI 제작하였습니다.

<br>
<br>

## <unity_h2> 결과(성과) 및 데모 </unity_h2>

<iframe width="100%" style="aspect-ratio:16/9" src="https://www.youtube.com/embed/OY4DGZKvkF8" title="팀 프로젝트(the_Untitled_Kingdom)" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

- <span><unity_h5>성과:</unity_h5> 2016년 1학기 팀 프로젝트 최종 과제 </span>
- <span><unity_h5>깃허브(코드):</unity_h5> [https://github.com/kj1241/Unity_Portfolio/tree/main/Subject_Assignment/TeamProject/TeamProject_FinalExam](https://github.com/kj1241/Unity_Portfolio/tree/main/Subject_Assignment/TeamProject/TeamProject_FinalExam)</span>

<br>
<br>

## <unity_h2> 비고 및 여담 </unity_h2>

- 배운점
    - UI로직을 구현하고 HP, 쿨타임을 구현할 수 있게 되었습니다.
    - TimeSacle과 상태 스테이트 패턴을 이용하여 게임 일시정지를 구현할 수 있게 되었습니다.
    - 파티클을 이용하여 공격과 힐 스킬을 구현 할 수 있게 되었습니다.
    - 카메라 특수효과인 필름 효과와 물 효과 쉐이더를 제작할 수 있게 되었습니다.
    - 포토샵을 이용하여 필요한 리소스를 생성할 수 있게 되었습니다.
    - 로그 화면을 이용하여 에러 확인 및 게임 진행 상황을 이해할 수 있게 되었습니다.

- 수정할 점
    - 제작 당시 리더십이 부족해서 프로젝트를 좀 더 완성도 있게 제작하지 못했습니다.
    - 무조건 코드를 사용하여 제작해서 완성시켜야 한다는 생각 때문에 에셋을 사용하지 않았습니다.