---
layout: post
title: "컴퓨터그래픽스실습(2) - 오거엔진 연습 코드"
date: 2024-07-01 09:00:00 +09:00
image: https://drive.google.com/thumbnail?id=17ECcs1Jgt4C6BOTSlWLle1NyWZLwibSj
toc: true
categories: [Other_Projects]
keywords: 컴퓨터 그래픽스, 오거 엔진, Ogre Engine, 그래픽 렌더링, C++
addsence: false
lastmod: 2024-07-01 09:00:00 +09:00
sitemap:
  changefreq : daily
  priority : 1.0
excerpt: 이 프로젝트는 오거 엔진을 활용한 컴퓨터 그래픽스 실습 결과물로, 다양한 그래픽 기능을 구현한 예제들을 포함하고 있습니다.
related_links:
  - url: /other_projects/ComputerGraphicsLab2_MiddleExam.html
  - url: /other_projects/ComputerGraphicsLab2_FinalExam.html
---


## <cpp_h2> 프로젝트 소개 </cpp_h2>

이 프로젝트는 컴퓨터 그래픽스 실습(2)의 과제로, 오거 엔진(Ogre Engine)을 사용하여 다양한 그래픽스 기능을 구현하고 테스트한 내용을 포함하고 있습니다. 오거 엔진의 여러 버전을 활용하여 그래픽스 렌더링, 애니메이션, 조명 및 기타 다양한 기능을 실습한 결과물입니다.

<br>
<br>

## <cpp_h2> 프로젝트 개요 </cpp_h2>

- <span><cpp_h5>프로젝트명:</cpp_h5> 오거엔진 연습용 코드 구현</span>
- <span><cpp_h5>과제:</cpp_h5> 2016년 2학기 컴퓨터그래픽스실습(2) 일반 과제</span>
- <span><cpp_h5> 장르:</cpp_h5> Toy Project</span>
- <span><cpp_h5>기간:</cpp_h5> 제작 완료</span>
    - ver.1: 2016.09.02~2016.11.17(ogre engine ver.1.17a)
    - ver.2: 2024.06.24~2024.06.30(ogre engine ver.14.2)
- <span><cpp_h5>개발인원:</cpp_h5> Developer(1명)</span>
- <span><cpp_h5>플랫폼:</cpp_h5> PC (Window)</span>

<br>

### <cpp_h3> 기술 스택 </cpp_h3>

- <span><cpp_h5>개발 도구:</cpp_h5> visual studio 2005 → 2019 / ogre engine 1.17a → 14.2 </span>
- <span><cpp_h5>개발 언어:</cpp_h5> c++ </span>

<br>
<br>

## <cpp_h2> 프로젝트 특징 및 기능 구현 </cpp_h2>

이 프로젝트는 오거 엔진을 활용하여 다양한 그래픽 기능을 구현하는 것을 목표로 합니다. 각 실습에서는 특정 기능을 중점적으로 다루어, 오거 엔진의 강력한 그래픽 처리 능력을 체험하고 이해할 수 있도록 구성되어 있습니다.

<br>

### <cpp_h3>Practice.1</cpp_h3><red1_error> (전체 제작 기여도: 100%)</red1_error>

![Practice.1]({{ site.google_drive }}15fBwOZOYcXZ0VUm8ueSTnQj6xJGOQ7qn{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<cpp_h6>Practice.1 실행 결과</cpp_h6>*

- 오거 엔진 14.2버전을 설치하고, 이전 과제로 작성한 코드를 업데이트했습니다.
- Sinbad 메쉬가 씬에 나타나는 것을 확인할 수 있습니다.

<br>

### <cpp_h3>Practice.2</cpp_h3><red1_error> (전체 제작 기여도: 100%)</red1_error>

![Practice.2]({{ site.google_drive }}1YZko3_i5ZTAnuIhXv5AWctbV7H4XMdti{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<cpp_h6>Practice.2 실행 결과</cpp_h6>*

- Sinbad 메쉬가 Node1 씬 노드에 첨부되어 씬에 나타나는 것을 확인할 수 있습니다.
- 오브젝트를 이동시키는 예제 코드입니다.

<br>

### <cpp_h3>Practice.3</cpp_h3><red1_error> (전체 제작 기여도: 100%)</red1_error>

![Practice.3]({{ site.google_drive }}1oOLx187EZjoztFgkGxELXDwbUD53zNCj{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<cpp_h6>Practice.3 실행 결과</cpp_h6>*

- 여러 개의 Sinbad 메쉬가 각각의 씬 노드에 첨부되어 씬에 나타나는 것을 확인할 수 있습니다.
- 오브젝트를 여러 개 만들고 자유롭게 변형시키는 예제 코드입니다.

<br>

### <cpp_h3>Practice.4</cpp_h3><red1_error> (전체 제작 기여도: 100%)</red1_error>

![Practice.4]({{ site.google_drive }}1TyVcWOv6pg80of42KMPFVjE5QbmTuNGd{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<cpp_h6>Practice.4 실행 결과</cpp_h6>*

- 프레임워크 코드를 변경하였습니다.
- 카메라와 라이트를 추가하고, 디렉셔널 라이트의 색을 변경하였습니다.

<br>

### <cpp_h3>Practice.5</cpp_h3><red1_error> (전체 제작 기여도: 100%)</red1_error>

![Practice.5]({{ site.google_drive }}1yU5GpXWoXcmDQlTuBBs_WWnpvIvSvbJR{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<cpp_h6>Practice.5 실행 결과</cpp_h6>*

- 라이트에 스포트라이트를 추가하였습니다.
- 텍스트 그림자를 추가하였습니다.

<br>

### <cpp_h3>Practice.6</cpp_h3><red1_error> (전체 제작 기여도: 100%)</red1_error>

![Practice.6]({{ site.google_drive }}16aL1N6XifvxBkSp0UHEpNHH8rgUSk73f{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<cpp_h6>Practice.6 실행 결과</cpp_h6>*

- 프레임 리스너를 추가하였습니다. 
- 오브젝트가 오른쪽으로 프레임마다 이동하도록 구현하였습니다.
- 디렉셔널 라이트의 원래 색을 입혔습니다.

<br>

### <cpp_h3>Practice.7</cpp_h3><red1_error> (전체 제작 기여도: 100%)</red1_error>

![Practice.7]({{ site.google_drive }}1UXlImZTX1A-SCxVOlaiRur27960w8Z4K{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<cpp_h6>Practice.7 실행 결과</cpp_h6>*

- 임풋 리스너를 사용하여 키보드로 카메라 이동을 구현하였습니다.
- 마우스 움직임에 따라 카메라 회전을 구현하였습니다.
- 스포트라이트를 추가하였습니다.

<br>

### <cpp_h3>Practice.8</cpp_h3><red1_error> (전체 제작 기여도: 100%)</red1_error>

![Practice.8]({{ site.google_drive }}1yp_o8vZfnoEzhC-xB0cZ57kccNgO2Zvf{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<cpp_h6>Practice.8 실행 결과</cpp_h6>*

- 키보드 입력으로 카메라가 이동할 수 있도록 구현하였습니다.
- 마우스의 회전에 따라서 카메라가 회전하도록 구현하였습니다.

<br>

### <cpp_h3>Practice.9</cpp_h3><red1_error> (전체 제작 기여도: 100%)</red1_error>

![Practice.9]({{ site.google_drive }}1sRjnMCxeoGtX00s5B04VdMJlAeUBz2MN{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<cpp_h6>Practice.9 실행 결과</cpp_h6>*

- 캐릭터 스켈레톤 애니메이션(춤) 예제를 구현하였습니다.

<br>

### <cpp_h3>Practice.10</cpp_h3><red1_error> (전체 제작 기여도: 100%)</red1_error>

![Practice.10]({{ site.google_drive }}1XnDkM_OHq6z9f32-cIgv6hZVDsLrnRb5{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<cpp_h6>Practice.10 실행 결과</cpp_h6>*

- 캐릭터 상태를 적용하여 키보드를 누르면 걷는 애니메이션이 실행되고, 키보드를 때면 idle 상태가 되도록 구현하였습니다.

<br>

### <cpp_h3>Practice.11</cpp_h3><red1_error> (전체 제작 기여도: 100%)</red1_error>

![Practice.11]({{ site.google_drive }}1Ehl5xrMerVwlkP-ImbJy6U1oN2RMfX-1{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<cpp_h6>Practice.11 실행 결과</cpp_h6>*

- ManualObject를 만들어 잔디를 조성하였습니다. 
  - ManualObject는 코드로 직접 3D 객체를 생성하고 조작할 수 있는 클래스입니다. 이를 통해 복잡한 메쉬 구조를 동적으로 만들고 수정할 수 있습니다.

<br>

### <cpp_h3>Practice.12</cpp_h3><red1_error> (전체 제작 기여도: 100%)</red1_error>

![Practice.12]({{ site.google_drive }}1TJ4bm0zKFzJTvUYZa6DDRs8k8ZbdBq6G{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<cpp_h6>Practice.12 실행 결과</cpp_h6>*

- 오브젝트에 적용되는 머테리얼과 스크립트를 제작하여 부착하였습니다.

<br>

### <cpp_h3>Practice.13</cpp_h3><red1_error> (전체 제작 기여도: 100%)</red1_error>

![Practice.13]({{ site.google_drive }}1wRoC0sFn0CljDp7LIm4dCb9jge3LF0Uv{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<cpp_h6>Practice.13 실행 결과</cpp_h6>*

- Compositor를 제작하여 렌더링에 효과를 더했습니다.
  - Compositor는 여러 렌더링 패스를 결합하여 최종 이미지를 생성하는 시스템입니다. 예를 들어, 블러 효과, HDR(High Dynamic Range) 렌더링, 화면 공간 반사 등과 같은 다양한 후처리 효과를 적용할 때 사용됩니다.
  - Compositor는 렌더링 파이프라인의 후처리 단계에서 여러 렌더 타겟을 결합하거나 조작하여 최종 이미지를 생성합니다.
  - Compositor는 씬이 렌더링된 후 다양한 후처리 효과를 추가합니다. 예를 들어, 블러, 글로우, 그림자, 반사 효과 등을 적용합니다.

<br>

### <cpp_h3>Practice.14</cpp_h3><red1_error> (전체 제작 기여도: 100%)</red1_error>

![Practice.14]({{ site.google_drive }}17ECcs1Jgt4C6BOTSlWLle1NyWZLwibSj{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<cpp_h6>Practice.14 실행 결과</cpp_h6>*

- 불에 타서 생성되는 연기 파티클 코드를 제작하였습니다.

<br>

### <cpp_h3>Practice.15</cpp_h3><red1_error> (전체 제작 기여도: 100%)</red1_error>

![Practice.15]({{ site.google_drive }}1ql2k1fAiRwV8USrGrOQxNBWcYJgYR26Z{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<cpp_h6>Practice.15 실행 결과</cpp_h6>*

- 오버레이와 트레이 시스템을 이용하여 UI 버튼을 제작하였습니다.

<br>
<br>

## <cpp_h2> 결과(성과) 및 데모 </cpp_h2>

- <span><cpp_h5>성과:</cpp_h5> 2016년 2학기 컴퓨터그래픽스실습(2) 일반 과제 </span>
- <span><cpp_h5>깃허브(코드):</cpp_h5>[https://github.com/kj1241/Other-Etc_Portfolio/tree/main/ComputerGraphicsLab2](https://github.com/kj1241/Other-Etc_Portfolio/tree/main/ComputerGraphicsLab2)</span>


## <cpp_h2> 비고 및 여담 </cpp_h2>

- 힘들었던 점
  - 프레임 리스너를 만들고 키보드 입출력을 구현할 때, 오거 엔진의 문서에서 SDL2를 사용하라고 권장했으나, 이벤트 값이 간헐적으로 들어오고 입력 값이 너무 느려서 고민했습니다. 결국 OBI인 OgreBites를 사용하여 코드를 작성하였습니다.
  - UI 예제 코드를 만들 때 가장 힘들었습니다. 오거 위키, 책, 인터넷 검색을 통해서도 UI가 보이지 않는 현상의 원인을 찾을 수 없었습니다. 문서를 읽고 논리를 세워서 UI 예제 코드를 완성할 수 있었습니다.
- 배운 점
  - 오거 엔진을 사용하면서 3D 그래픽의 기본 개념과 렌더링 파이프라인에 대해 깊이 이해하게 되었습니다.
  - 다양한 문제를 해결하는 과정에서 디버깅 능력과 문제 해결 능력을 크게 향상시켰습니다.
  - 여러 가지 그래픽 기술을 실습하면서 실제 게임 개발에서 적용할 수 있는 경험을 쌓았습니다.