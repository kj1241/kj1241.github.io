---
layout: post
title: "객체지향프로그래밍실습 - 기말 과제(콘솔 슈팅 게임 제작)"
date: 2024-04-29 09:00:00 +09:00
image: https://drive.google.com/thumbnail?id=1zlZhzN3BtyG07cPCSFnklDyO0_6jh17S
toc: true
categories: [Algorithm]
keywords: C++, 슈팅게임, 객체지향프로그래밍, 콘솔게임
addsence: false
lastmod: 2024-07-22 09:00:00 +09:00
sitemap:
  changefreq : daily
  priority : 1.0
excerpt: C++로 제작된 콘솔 슈팅 게임입니다. 두 플레이어가 캐릭터를 제어하며 총알을 발사해 상대방을 격파합니다. 기본적인 충돌 검사와 점수 시스템이 구현되어 있습니다.
related_links:
    - url: /algorithm/OOPLab.html
---

## <cpp_h2>프로젝트 소개</cpp_h2>

해당 게임은 객체지항프로그래밍 실습 과제로서, 두 플레이어가 각각의 캐릭터를 제어하고 총알을 발사하여 상대방을 격파하는 2D 게임을 구현하였습니다. 게임은 콘솔 환경에서 실행되며, 플레이어의 입력을 받아 캐릭터 이동과 총알 발사를 처리하고, 적중한 총알에 대한 충돌 검사를 수행합니다.

<br>
<br>

## <cpp_h2>프로젝트 개요</cpp_h2>

- <span><cpp_h5>프로젝트명:</cpp_h5> 간단한 도스형 슈팅 게임 만들기</span>
- <span><cpp_h5>과제:</cpp_h5> 2015년 1학기 객체지향프로그래밍실습 기말 과제</span>
- <span><cpp_h5>게임 장르:</cpp_h5> Toy Project</span>
- <span><cpp_h5>기간:</cpp_h5> 제작 완료</span>
    - ver.1: 2015.05.20
    - ver.2: 2024.07.22
- <span><cpp_h5>개발인원:</cpp_h5> Developer(1명)</span>
- <span><cpp_h5>플랫폼:</cpp_h5> PC (console)</span>

<br>

### <cpp_h3> 기술 스택 </cpp_h3>

- <span><cpp_h5>개발 도구:</cpp_h5> viusal studio 2010 → 2019 </span>
- <span><cpp_h5>개발 언어:</cpp_h5> c++ </span>

<br>
<br>

## <cpp_h2> 프로젝트 특징 및 기능 구현 </cpp_h2>

시험 내용: c++ consle을 사용하여 자유롭게 제작하시오.

<br>

### <cpp_h3> 1) 콘솔 슈팅 게임 제작 ver.2</cpp_h3><red1_error> (전체 제작 기여도: 100%)</red1_error>

![콘솔 슈팅게임 Active 다이어그램]({{ site.google_drive }}1zlZhzN3BtyG07cPCSFnklDyO0_6jh17S{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<cpp_h6>콘솔 슈팅게임 Active 다이어그램</cpp_h6>*

게임의 주요 목표는 플레이어가 서로에게 총알을 발사하여 명중시키는 것입니다. 상대방을 성공적으로 맞춘 플레이어가 점수를 얻습니다. 플레이어는 위아래로 이동하고, 총알을 발사하고, 방패를 활성화하여 들어오는 총알로부터 자신을 보호할 수 있습니다.

<cpp_h5>게임플레이 메커니즘</cpp_h5>

1. 플레이어
  - 두 명의 플레이어는 화면의 반대쪽에 위치한 수직 막대로 표시됩니다.
  - 플레이어 1은 왼쪽에, 플레이어 2는 오른쪽에 시작합니다.

2. 이동
  - 플레이어 1은 'q'로 위로, 'a'로 아래로 이동할 수 있습니다.
  - 플레이어 2는 'o'로 위로, 'l'로 아래로 이동할 수 있습니다.

3. 총알 발사
  - 플레이어 1은 's'로 총알을 발사할 수 있습니다.
  - 플레이어 2는 'k'로 총알을 발사할 수 있습니다.
  - 총알은 수평으로 상대방 쪽으로 이동합니다.

4. 방패
  - 각 플레이어는 게임당 한 번씩 방패를 'd'(플레이어 1)와 'j'(플레이어 2)로 활성화할 수 있습니다.
  - 방패는 잠시 동안 들어오는 총알을 막아줍니다.

5. 점수
  - 총알이 방패를 사용하지 않은 상대방을 맞추면, 발사한 플레이어가 점수를 얻습니다.
  - 명중 후, 플레이어의 위치와 총알이 초기화됩니다.

6. 총알 이동
  - 총알은 상대방을 맞추거나 화면을 벗어날 때까지 계속 이동합니다.
  - 플레이어는 여러 발의 총알을 발사할 수 있습니다.

<cpp_h5>유저 인터페이스</cpp_h5>

- 콘솔에는 플레이어, 총알, 방패가 표시됩니다.
- 화면 상단에는 두 플레이어의 현재 점수가 표시됩니다.
- 화면의 위와 아래에는 경계가 그려집니다.


<cpp_h5>게임 루프</cpp_h5>

- 게임은 플레이어의 입력을 지속적으로 확인하여 이동 또는 발사를 처리합니다.
- 게임은 플레이어와 총알의 위치를 업데이트합니다.
- 게임은 총알과 플레이어 간의 충돌을 확인합니다.
- 게임은 점수를 업데이트하고 게임 종료 조건을 처리합니다.

<br>
<br>

## <cpp_h2> 결과(성과) 및 데모 </cpp_h2>

![OPPLab FinalExam]({{ site.google_drive }}1OAYgioMny8pcc5c4qS7T6bN7844IErr-{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<cpp_h6>객체지향프로그래밍 실습 기말 ver.1</cpp_h6>*

<iframe width="100%" style="aspect-ratio:16/9" src="https://www.youtube.com/embed/feuafvzAX94" title="Simple Console Shooting Game C++ OOPLab" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

- <span><cpp_h5>성과:</cpp_h5> 2015년 1학기 객체지향프로그래밍실습 기말 과제 </span>
- <span><cpp_h5>깃허브(코드):</cpp_h5> [https://github.com/kj1241/Algorithm_Portfolio/tree/main/OOPLab](https://github.com/kj1241/Algorithm_Portfolio/tree/main/OOPLab)</span>

<br>
<br>

## <cpp_h2> 비고 및 여담 </cpp_h2>

- 배운점 및 수정할 점
	- 간단한 게임을 만드는 방법에 대해서 학습하였습니다.
	- 코드를 사용해서 키보드 메크로를 사용하는 방법에 대해서 학습하였습니다.
	- 충돌 검사하는 방법에 대해서 학습하였습니다.