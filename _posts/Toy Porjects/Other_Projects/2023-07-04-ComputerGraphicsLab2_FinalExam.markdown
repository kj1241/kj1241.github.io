---
layout: post
title: "컴퓨터그래픽스실습(2) - 기말 과제"
date: 2024-07-04 09:00:00 +09:00
image: https://drive.google.com/thumbnail?id=1FIPnFph8Jon6cia7BFwsXU26M8bnjirX
toc: true
categories: [Other_Projects]
keywords: 컴퓨터 그래픽스, 3D 게임, Ogre3D, 오우거 엔진, c++, 좀비 게임, 아케이드 게임
addsence: false
lastmod: 2024-07-04 09:00:00 +09:00
sitemap:
  changefreq : daily
  priority : 1.0
excerpt: 오거엔진을 이용하여 만든 3D 좀비 아케이드 게임 제작 프로젝트. 최신 Ogre 엔진으로 업데이트 하여서 개선된 기능을 추가 구현하였습니다.
related_links:
  - url: /other_projects/ComputerGraphicsLab2.html
  - url: /other_projects/ComputerGraphicsLab2_MiddleExam.html
---

## <cpp_h2> 프로젝트 소개 </cpp_h2>

본 프로젝트는 3D 좀비 아케이드 게임을 제작하는 것을 목표로 하였으며, 컴퓨터그래픽스실습(2)의 기말 과제로 수행되었습니다. 또한 최신 Ogre 엔진 버전 14.2를 사용하여 기존의 프로젝트를 개선하고 기능을 확장하였습니다. 혼자서 모든 개발을 담당하며 프로젝트의 모든 요소를 직접 구현하였습니다.

<br>
<br>

## <cpp_h2> 프로젝트 개요 </cpp_h2>

- <span><cpp_h5>프로젝트명:</cpp_h5> 3D 좀비 아케이드 게임 만들기</span>
- <span><cpp_h5>과제:</cpp_h5> 2016년 2학기 컴퓨터그래픽스실습(2) 기말 과제</span>
- <span><cpp_h5> 장르:</cpp_h5> Toy Project</span>
- <span><cpp_h5>기간:</cpp_h5> 제작 완료</span>
    - ver.1: 2016.10.01~2016.10.06(리포트)
    - ver.1: 2016.12.09~2016.12.15(ogre engine ver.1.17a)
    - ver.2: 2024.07.03~2024.07.04(ogre engine ver.14.2)
- <span><cpp_h5>개발인원:</cpp_h5> Developer(1명)</span>
- <span><cpp_h5>플랫폼:</cpp_h5> PC (Window)</span>

<br>

### <cpp_h3> 기술 스택 </cpp_h3>

- <span><cpp_h5>개발 도구:</cpp_h5> visual studio 2015 → 2019 / ogre engine 1.17a → 14.2 </span>
- <span><cpp_h5>개발 언어:</cpp_h5> c++ </span>

<br>
<br>

## <cpp_h2> 프로젝트 특징 및 기능 구현 </cpp_h2>

좀비 아케이드 게임에 대한 기능과 구현 내용입니다.

<br>

### <cpp_h3>3D 좀비 아케이드 게임 ver.2</cpp_h3><red1_error> (전체 제작 기여도: 100%)</red1_error>

![Pong game]({{ site.google_drive }}1FIPnFph8Jon6cia7BFwsXU26M8bnjirX{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<cpp_h6>Pong game 실행 결과</cpp_h6>*

- 기본 설정 및 초기화
  - OgreApplicationContext를 상속받아 기본적인 애플리케이션 초기화 및 설정을 수행합니다.
  - OgreInput과 OgreFrameListener를 사용하여 입력 이벤트와 프레임 이벤트를 처리합니다.

- 카메라 및 라이트, 씬 매니저 설정
  - CreateCamera 함수를 통해 카메라를 생성하고 설정합니다.
  - CrateLight 함수를 통해 빛을 생성하고 설정합니다.
  - 씬 매니저를 생성하고 오버레이 시스템을 추가합니다.

- UI 생성
  - CreateOverlay 함수를 통해 게임 내의 UI 요소(HP 바, 점수 레이블 등)를 생성하고 설정합니다.
  - OgreBites::TrayManager를 사용하여 UI 요소들을 관리합니다.
  
- 프레임 리스너 구현 (FianlExamFrameListener 클래스)
  - 플레이어의 움직임 및 애니메이션 상태를 관리합니다.
  - 몬스터 AI를 구현하여 플레이어를 추적하고 공격합니다.
  - 충돌 감지 및 충돌 처리 로직을 포함합니다.
  - 파티클 시스템을 사용하여 몬스터가 죽을 때의 효과를 구현합니다.

- 플레이어 설정
  - 플레이어의 엔티티 및 애니메이션 상태를 설정합니다.
  - 플레이어의 움직임(앞, 뒤, 좌, 우) 및 공격(마우스 클릭)을 처리합니다.
  - 플레이어 매쉬에 세이더를 적용하여 노멀맵을 부착합니다.
  - 플레이어가 마우스 우클릭으로 공격을 할 시, 주변의 적을 죽이고 점수를 얻도록 설정하였습니다.

- 몬스터 AI 설정 및 관리
  - AIMonster 구조체를 사용하여 몬스터의 상태, 애니메이션, 위치 등을 관리합니다.
  - Std::vector를 사용하여 몬스터들을 관리합니다.
  - 몬스터를 생성하고 플레이어를 바라보고 추적하도록 AI를 설정합니다.
  - 몬스터가 플레이어와 충돌했을 때의 로직을 구현합니다.

- 애니메이션 상태 전환
  - 3Ds Max를 통하여 플레이어 및 몬스터의 리깅을 잡고 애니메이션을 제작하였습니다.
  - changeAnimationState 함수를 통해 플레이어의 애니메이션 상태(대기, 걷기, 공격)를 전환합니다.
  - 함수를 구현하여 몬스터의 걷는 애니에미션을 무한 재생합니다.

- 게임 로직 및 충돌 처리
  - 플레이어와 몬스터 간의 충돌을 감지하고, 충돌 시 HP 감소 및 몬스터 파괴 효과를 적용합니다.
  - 플레이어와 건물 오브젝트의 충돌을 감지하고 충돌전의 위치로 이동시킵니다.
  - 충돌 시 파티클 이펙트를 사용하여 시각적 효과를 추가합니다.
  
- 입력 이벤트 처리
  - 키보드 및 마우스 입력을 처리하여 플레이어의 움직임과 방향 및 공격을 제어합니다.
  - keyPressed, keyReleased, mouseMoved, mousePressed 함수들을 통해 입력 이벤트를 처리합니다.

- UI 업데이트
  - ChnageUI 함수를 통해 플레이어의 HP와 점수를 업데이트합니다.
  - start 버튼을 구현하여 씬을 넘깁니다.
  - 오버레이를 제작하여 GameOver화면을 구상합니다.

- 파티클
  - 파티클 입자와 동작을 생각하여 스크립트를 제작해서 구현하였습니다.

- 환경처리
  - 백그라운드 색을 잡아 안개로 환경를 설정해줍니다.

- 씬 관리
  - 시작 씬 - 메인 씬 - 엔드 씬으로 씬 상태를 만들고 관리하였습니다.
  - 스타트 버튼을 누르면 시작 씬에서 메인 씬으로 전환하게 하였습니다.
  - 플레이어의 피가 0이 될때 메인 씬에서 엔드 씬으로 전환하게 하였습니다.


<br>

### <cpp_h3>3D 오우거엔진 흥미있는 샘플 3개 분석 리포트 ver.1</cpp_h3><red1_error> (전체 제작 기여도: 100%)</red1_error>

<iframe width="100%" style="aspect-ratio:16/9" src="https://drive.google.com/file/d/1tkaMIKk4IVkH-8CJPuyf4bPb6TSNt-u8/preview" title="오우거엔진 샘플 리포트" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

1. SKY DOME
2. Skeletal Animation
3. Water Simulation

<br>
<br>

## <cpp_h2> 결과(성과) 및 데모 </cpp_h2>

<iframe width="100%" style="aspect-ratio:16/9" src="https://drive.google.com/file/d/1xdZHN1rywkIv_rYIEAxdKdRhvwUMUx4l/preview" title="좀비 아케이드 게임" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

- <span><cpp_h5>성과:</cpp_h5> 2016년 2학기 컴퓨터그래픽스실습(2) 중간 과제 </span>
- <span><cpp_h5>깃허브(코드):</cpp_h5>[https://github.com/kj1241/Other-Etc_Portfolio/tree/main/ComputerGraphicsLab2](https://github.com/kj1241/Other-Etc_Portfolio/tree/main/ComputerGraphicsLab2)</span>


## <cpp_h2> 비고 및 여담 </cpp_h2>

- 배운점
  - 논리적 사고와 도큐먼트를 통한 자율 학습 능력 향상되었습니다.

- 여담
  - 이 프로젝트는 제게 큰 의미가 있는 프로젝트입니다. 처음에는 교수님께 도움을 요청했지만, “알아서 프로그래밍해”라는 말을 듣고 스스로 모든 문제를 해결하며 완성했습니다. 이 과정을 통해 독립적으로 문제를 해결하는 능력을 키웠습니다.
  - 무료 모델링 사이트에서 모델을 받아 직접 리깅과 애니메이션을 제작하였습니다.
  - 해당 과목에서 높은 학점을 받지 못한 이유는 그래픽적인 완성도가 부족하다고 느꼈기 때문에 프로젝트 설명회에 참석하지 않았기 때문입니다. 이로 인해 학점에 대한 관심이 줄어들었으나, 더 중요한 것은 프로젝트를 통해 얻은 경험과 지식이라고 생각합니다.
  