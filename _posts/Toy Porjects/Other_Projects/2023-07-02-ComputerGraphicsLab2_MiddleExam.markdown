---
layout: post
title: "컴퓨터그래픽스실습(2) - 중간 과제"
date: 2024-07-02 09:00:00 +09:00
image: https://drive.google.com/thumbnail?id=1BdId0fHcv8Ty77kcRJojfAniWuVYpzgm
toc: true
categories: [Other_Projects]
keywords: 컴퓨터 그래픽스, 퐁 게임, Ogre3D, 오우거 엔진, c++
addsence: false
lastmod: 2024-07-02 09:00:00 +09:00
sitemap:
  changefreq : daily
  priority : 1.0
excerpt: Ogre3D를 사용해 구현한 퐁 게임 프로젝트 입니다. 3D 그래픽과 실시간 게임 로직을 적용하여 게임을 제작하였습니다.
related_links:
---


## <cpp_h2> 프로젝트 소개 </cpp_h2>

이번 프로젝트는 2016년 2학기 컴퓨터그래픽스실습(2) 중간 과제로 제작된 퐁 게임입니다. SDL2를 이용해 키보드 입력을 처리하고 Ogre3D를 통해 3D 그래픽을 렌더링한 단순한 공 주고받기 게임입니다. 플레이어는 방향키로 오브젝트를 조작하며, AI는 공의 Y 위치에 따라 자동으로 움직입니다. 충돌 처리와 경계 처리를 구현하여 게임의 완성도를 높였습니다.

<br>
<br>

## <cpp_h2> 프로젝트 개요 </cpp_h2>

- <span><cpp_h5>프로젝트명:</cpp_h5> 퐁 게임 만들기</span>
- <span><cpp_h5>과제:</cpp_h5> 2016년 2학기 컴퓨터그래픽스실습(2) 중간 과제</span>
- <span><cpp_h5> 장르:</cpp_h5> Toy Project</span>
- <span><cpp_h5>기간:</cpp_h5> 제작 완료</span>
    - ver.1: 2016.11.01~2016.11.11(ogre engine ver.1.17a)
    - ver.2: 2024.07.01(ogre engine ver.14.2)
- <span><cpp_h5>개발인원:</cpp_h5> Developer(1명)</span>
- <span><cpp_h5>플랫폼:</cpp_h5> PC (Window)</span>

<br>

### <cpp_h3> 기술 스택 </cpp_h3>

- <span><cpp_h5>개발 도구:</cpp_h5> visual studio 2005 → 2019 / ogre engine 1.17a → 14.2 </span>
- <span><cpp_h5>개발 언어:</cpp_h5> c++ </span>

<br>
<br>

## <cpp_h2> 프로젝트 특징 및 기능 구현 </cpp_h2>

해당 코드는 플레이어와 AI가 공을 주고받는 단순한 게임을 구현한 것입니다. SDL2를 이용해 키보드 입력을 처리하고, Ogre3D를 통해 3D 그래픽을 렌더링합니다. 플레이어는 위아래 방향키로 조작하며, 공은 스페이스바를 눌러 반사할 수 있습니다. AI는 공의 Y 위치에 따라 자동으로 움직입니다.

<br>

### <cpp_h3>Pong game ver.2</cpp_h3><red1_error> (전체 제작 기여도: 100%)</red1_error>

![Pong game]({{ site.google_drive }}1BdId0fHcv8Ty77kcRJojfAniWuVYpzgm{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<cpp_h6>Pong game 실행 결과</cpp_h6>*

- 조건
  - 공을 일정 속도로 이동시킵니다.
  - AI 노드를 공의 Y 위치에 맞추어 이동시킵니다.
  - 공이 화면 밖으로 나가지 않도록 경계를 처리합니다.
  - 공과 플레이어, AI의 충돌을 체크하고, 충돌 시 공의 방향을 반전시킵니다.

- 플레이어 상호작용
  - 스페이스바를 누르면 공을 팅겨 냅니다.
  - UP 키와 DOWN 키를 누르면 플레이어 노드를 위아래로 이동시킵니다.

<br>
<br>

## <cpp_h2> 결과(성과) 및 데모 </cpp_h2>

<iframe width="100%" style="aspect-ratio:16/9" src="https://drive.google.com/file/d/1mNf_3sntb7cl7ECgySx6mkaDzxN4QLKy/preview" title="팀 프로젝트(the_Untitled_Kingdom)" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

- <span><cpp_h5>성과:</cpp_h5> 2016년 2학기 컴퓨터그래픽스실습(2) 중간 과제 </span>
- <span><cpp_h5>깃허브(코드):</cpp_h5>[https://github.com/kj1241/Other-Etc_Portfolio/tree/main/ComputerGraphicsLab2](https://github.com/kj1241/Other-Etc_Portfolio/tree/main/ComputerGraphicsLab2)</span>


## <cpp_h2> 비고 및 여담 </cpp_h2>

- 배운점
  - 이번 프로젝트를 통해 실시간 게임 로직 구현과 SDL2 및 Ogre3D를 이용한 그래픽 렌더링 기술을 습득하였습니다. 또한, 게임 개발의 기본적인 개념과 AI를 이용한 상호작용을 학습하였습니다.