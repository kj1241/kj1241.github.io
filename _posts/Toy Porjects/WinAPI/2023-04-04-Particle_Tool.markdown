---
layout: post
title:  "간단한 Particle Tool 제작 (v.2)"
date:   2023-04-04 20:07:40 +0900
image: https://drive.google.com/uc?export=view&id=1MhhJ_XKxtKB6dFu_GekihZ9NsH8UQAWD
toc: true
categories: [WinAPI]
tags: [C++,WinAPI]
---

## <green1_h2> 토이 프로젝트 소개 </green1_h2>

Particle tool은 WinAPI를 사용하여 개발된 소프트웨어로, 입자 효과를 생성하고 제어하는 도구입니다.  
WinAPI는 Windows 응용 프로그램을 개발하기 위한 API이며, 이를 활용하여 입자 시스템을 구현한 것입니다.  

<br>
<br>

## <green1_h2> 토이 프로젝트 개요 </green1_h2>

- <span><green1_h5>프로젝트명: </green1_h5> Particle Tool</span>
- <span><green1_h5>게임 장르: </green1_h5> Tool </span>
- <span><green1_h5>기간: </green1_h5> 2022.12.21~2022.12.22(v.2) / 2022.12.02~2022.12.04(v.1) </span>
- <span><green1_h5>플랫폼: </green1_h5> PC (Window)</span> 

<br>
<br>

## <green1_h2> 팀 구성 </green1_h2>

- <span><green1_h5>Developer(1명): </green1_h5> 화면 전환 구성, 파티클 계산 로직 제작, UI 구성, 물리엔진 제작</span>

<br>
<br>

## <green1_h2> 기술 스택 </green1_h2>

- <span><yellow1_h5>게임 엔진: </yellow1_h5> visual Studio 2022 </span>
- <span><yellow1_h5>언어: </yellow1_h5>C++ / winAPI</span>

<br>
<br>

## <green1_h2> 토이 프로젝트 특징 </green1_h2>

1. WInAPI로 제작된 UI로 구성되어 있습니다.
2. 파티클의 물리계산이 적용되어 있어 값을 적용해 볼 수 있습니다.

<br>
<br>

## <green1_h2> 개발자의 역활 및 경험 </green1_h2>

- **유체역학 적용된 Water Part 제작 (v.2)** <span><red1_error>(전체 게임 제작 기여도: 100%)</red1_error></span>
    1. 물리 강체를 파티클에 적용하여 중력구현 하였습니다.
    2. 유체역학(공기저항, 바람)등을 적용하였습니다.
    3. OBB를 이용한 콜라이더 충돌 처리하였습니다.
    4. 수학 라이브러리를 구현하였습니다.
 

- **폭발하는 Particl Tool 제작 (v.1)** <span><red1_error>(전체 게임 제작 기여도: 100%)</red1_error></span>
    1. 수치해석학적을 이용하여 폭발하는 파티클을 제작.
    2. 버튼, 에디트 박스 컨트롤을 이용하여 UI를 제작.
    3. 브러쉬, 팬 등을 이용한 오브젝트 랜더링에 사용.
    4. 랜더링: 이중버퍼링 방식 적용.

<br>

### <green1_h3> 프로그래밍 로직 구조 </green1_h3>

<p><green1_h5>유체역학 Particl</green1_h5></p>

![유체역학 Particl Tool](https://drive.google.com/uc?export=view&id=1MhhJ_XKxtKB6dFu_GekihZ9NsH8UQAWD){: width="100%"}

<p><green1_h5>폭발하는 Particl</green1_h5></p>

![폭발하는 Particl Tool](https://drive.google.com/uc?export=view&id=1SjSy2DLP-7ak1raaIup2Re3XzlvKdaSz){: width="100%"}

<br>
<br>

## <green1_h2> 결과(성과) 및 데모 </green1_h2>

- <span><green1_h5>성과: </green1_h5> 툴 데모 제작 </span>
- <green1_h5>깃 허브(코드): </green1_h5>

    유체역학 Particl Tool: [https://github.com/kj1241/WinAPI_ToyProejct/tree/main/WinAPI_Particle2](https://github.com/kj1241/WinAPI_ToyProejct/tree/main/WinAPI_Particle2)  
    폭발하는 Particl Tool: [https://github.com/kj1241/WinAPI_ToyProejct/tree/main/WinAPI_Particle](https://github.com/kj1241/WinAPI_ToyProejct/tree/main/WinAPI_Particle)  

- <green1_h5>유튜브 동영상: </green1_h5> 
    유체역학 Particl Tool: 
    <iframe width="100%" style="aspect-ratio:16/9" src="https://www.youtube.com/embed/WWH5v5rbWY0" title="ParticleToyProjcet2(WInAPI)" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

    폭발하는 Particl Tool: 
    <iframe width="100%" style="aspect-ratio:16/9" src="https://www.youtube.com/embed/0KmnYV9FBWs" title="ParticleToyProjcet(WinAPI)" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

<br>

### <green1_h3> 여담 </green1_h3>

- Unreal Full Engine Source 5.1 버전 빌드를 Incredibuild 없이 돌리는 중에 너무 많은 시간을 잡아 먹어서, 그래픽카드 없는 노트북으로 주제를 고민하다 WinAPI 스킬을 점검할 겸 Particl Tool을 제작하게 되었습니다.



