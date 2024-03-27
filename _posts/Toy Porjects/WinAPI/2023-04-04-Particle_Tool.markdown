---
layout: post
title: "간단한 Particle Tool 제작 ver.2"
date: 2023-04-04 20:07:40 +0900
image: https://drive.google.com/thumbnail?id=1MhhJ_XKxtKB6dFu_GekihZ9NsH8UQAWD
toc: true
categories: [WinAPI]
tags: [C++,WinAPI]
keywords: C++, WinAPI
---

## <cpp_h2> 프로젝트 소개 </cpp_h2>

Particle tool은 WinAPI를 사용하여 개발된 소프트웨어로, 입자 효과를 생성하고 제어하는 도구입니다. WinAPI는 Windows 응용 프로그램을 개발하기 위한 API이며, 이를 활용하여 입자 시스템을 구현한 것입니다.  
<br>
<br>

## <cpp_h2>프로젝트 개요</cpp_h2>

- <span><cpp_h5>프로젝트명:</cpp_h5>Particle Tool</span>
- <span><cpp_h5>게임 장르:</cpp_h5> ool</span>
- <span><cpp_h5>기간:</cpp_h5> 제작 완료</span>
    - ver.1: 2022.12.02~2022.12.04(제작)
    - ver.2: 2022.12.21~2022.12.22(제작)
- <span><cpp_h5>개발인원:</cpp_h5> Developer(1명)</span>
- <span><cpp_h5>플랫폼:</cpp_h5> PC (Window)</span>

<br>

### <cpp_h3> 기술 스택 </cpp_h3>

- <span><cpp_h5>개발 도구:</cpp_h5> viusal studio 2022  </span>
- <span><cpp_h5>개발 언어:</cpp_h5> C++ / winAPI  </span>


<br>
<br>

## <cpp_h2> 프로젝트 특징 및 기능 구현 </cpp_h2>

프로젝트 특징과 기능 구현 내용입니다.

<br>

### <cpp_h3>폭발하는 Particl Tool 제작 ver.1</cpp_h3><red1_error> (전체 제작 기여도: 100%)</red1_error>

1. 수치해석학적을 이용하여 폭발하는 파티클을 제작하였습니다.
2. 버튼, 에디트 박스 컨트롤을 이용하여 UI를 제작하였습니다.
3. 브러쉬, 팬 등을 이용한 오브젝트 랜더링에 사용하였습니다.
4. 랜더링: 이중버퍼링 방식 적용하였습니다.


<br>

### <cpp_h3>유체역학 적용된 Water Particl 제작 ver.2</cpp_h3><red1_error> (전체 제작 기여도: 100%)</red1_error>

1. 물리 강체를 파티클에 적용하여 중력구현 하였습니다.
2. 유체역학(공기저항, 바람)등을 적용하였습니다.
3. OBB를 이용한 콜라이더 충돌 처리하였습니다.
4. 수학 라이브러리를 구현하였습니다.
 

<br>
<br>

## <cpp_h2>동작 다이어 그램</cpp_h2>

#### **<cpp_h4>폭발하는 Particl ver.1</cpp_h4>**

![폭발하는 Particl]({{ site.google_drive }}1SjSy2DLP-7ak1raaIup2Re3XzlvKdaSz{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}

#### **<cpp_h4>유체역학 Particl ver.2</cpp_h4>**

![유체역학 Particl]({{ site.google_drive }}1MhhJ_XKxtKB6dFu_GekihZ9NsH8UQAWD{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}

1. WInAPI로 제작된 UI로 구성되어 있습니다.
2. 파티클의 물리계산이 적용되어 있어 값을 적용해 볼 수 있습니다.

<br>
<br>

## <cpp_h2> 결과(성과) 및 데모 </cpp_h2>

#### **<cpp_h4>폭발하는 Particl ver.1</cpp_h4>**

<iframe width="100%" style="aspect-ratio:16/9" src="https://www.youtube.com/embed/0KmnYV9FBWs" title="ParticleToyProjcet(WinAPI)" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe> 

#### **<cpp_h4>유체역학 Particl ver.2</cpp_h4>**

<iframe width="100%" style="aspect-ratio:16/9" src="https://www.youtube.com/embed/WWH5v5rbWY0" title="ParticleToyProjcet2(WInAPI)" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

- <span><cpp_h5>성과:</cpp_h5> 툴 데모 제작 </span>
- <span><cpp_h5>깃허브(코드):</cpp_h5></span>
    유체역학 Particl Tool: [https://github.com/kj1241/WinAPI_ToyProejct/tree/main/WinAPI_Particle2](https://github.com/kj1241/WinAPI_ToyProejct/tree/main/WinAPI_Particle2)  
    폭발하는 Particl Tool: [https://github.com/kj1241/WinAPI_ToyProejct/tree/main/WinAPI_Particle](https://github.com/kj1241/WinAPI_ToyProejct/tree/main/WinAPI_Particle) 

<br>
<br>

## <cpp_h2> 비고 및 여담 </cpp_h2>

- Unreal Full Engine Source 5.1 버전 빌드를 Incredibuild 없이 돌리는 중에 너무 많은 시간을 잡아 먹어서, 그래픽카드 없는 노트북으로 주제를 고민하다 WinAPI 스킬을 점검할 겸 Particl Tool을 제작하게 되었습니다.