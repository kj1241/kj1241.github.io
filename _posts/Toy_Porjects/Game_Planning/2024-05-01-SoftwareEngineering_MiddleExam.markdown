---
layout: post
title: "소프트웨어 공학 - 중간 과제(요구사항 명세서)"
date: 2024-05-01 09:00:00 +09:00
image: https://drive.google.com/thumbnail?id=1j7x9ajLpAQluJdkMcmDhu36kj8elcb1b
toc: true
categories: [Game_Planning] 
keywords: 요구사항 명세서, 게임 디자인 패턴, 명령 패턴, 상태 패턴, FSM 패턴, 옵저버 패턴
addsence: false
lastmod: 2024-06-12 09:00:00 +09:00
sitemap:
  changefreq : daily
  priority : 1.0
excerpt: 디자인 패턴을 활용해 게임 클래스 구현을 목표로 한 소프트웨어 공학 과제로, 요구사항 명세서를 작성하고 이를 기반으로 클래스 구조를 설계했습니다.
related_links:
    - url: /game_planning/SoftwareEngineering_FinalExam.html
---

## <data_h2> 프로젝트 소개 </data_h2>

이 프로젝트는 2016년 2학기에 진행된 소프트웨어 공학 중간 과제로, 요구사항 명세서를 작성하는 것이 목표였습니다. 프로젝트의 주된 목적은 수업에서 학습한 디자인 패턴을 활용하여 개인이 구상한 게임 아이디어에 클래스 구현을 적용하는 것이었습니다. 이를 위해 명령, 상태, FSM, 옵저버 패턴 등을 활용하여 클래스를 설계하고 구현했습니다.

<br>
<br>

## <data_h2> 프로젝트 개요 </data_h2>

- <span><data_h5>프로젝트명:</data_h5> 요구사항 명세서 작성</span>
- <span><data_h5>게임 장르:</data_h5> 2016년 2학기 소프트웨어 공학 중간 과제</span>
- <span><data_h5>기간:</data_h5> 제작 완료</span>
    - ver.1: 2016.10.20
- <span><data_h5>개발인원:</data_h5> Game Designer(1명)</span>
- <span><data_h5>플랫폼:</data_h5> PC (Window)</span>

<br>

### <data_h3> 기술 스택 </data_h3>

- <span><data_h5>개발 도구:</data_h5> Microsoft Word </span>

<br>
<br>

## <data_h2> 프로젝트 특징 및 기능 구현 </data_h2>

<data_h5>요구사항 분석:</data_h5>
- 명령 패턴: 플레이어의 입력에 따라 명령을 큐에 저장하고 처리하는 방식으로 구현.
- 상태 패턴: 플레이어의 상태 변화를 관리하고 각 상태에 따른 행동을 정의.
- FSM 패턴: 몬스터의 인공지능을 상태 기계로 구현하여 다양한 행동 패턴을 설계.
- 옵저버 패턴: 보스 몬스터가 주변 상황을 관찰하고, 다른 몬스터에게 명령을 내리는 방식으로 구현.

<br>

### <data_h3> 요구사항 명세서 작성하기 ver.1</data_h3><red1_error> (전체 제작 기여도: 100%)</red1_error>

![요구사항 명세서(명령 패턴)]({{ site.google_drive }}1j7x9ajLpAQluJdkMcmDhu36kj8elcb1b{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<data_h6> 요구사항 명세서(명령 패턴) </data_h6>*

- 해당 내용은 수업시간에 공부한 디자인 패턴을 바탕으로 본인이 구상한 게임에 클래스 구현을 접목시키는 방식입니다.
- 명령, 상태, FSM, 옵저버 패턴을 이용하여 해당 클래스를 구상하였습니다.

<br>
<br>

## <data_h2> 결과(성과) 및 데모 </data_h2>

<iframe width="100%" style="aspect-ratio:16/9" src="https://drive.google.com/file/d/1EjnSwHcna9BpUr2ygzoODc3WvgQc6vhU/preview" title="팀 프로젝트(the_Untitled_Kingdom)" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

- <span><data_h5>성과:</data_h5> 2016년 2학기 소프트웨어 공학 중간 과제 </span>
- <span><data_h5>구글드라이브(코드): </data_h5>[https://drive.google.com/drive/folders/1Y8Ko0TxZfCiw1MJqmL0HXIMm9tXLWnJE?usp=drive_link](https://drive.google.com/drive/folders/1Y8Ko0TxZfCiw1MJqmL0HXIMm9tXLWnJE?usp=drive_link)</span>

<br>
<br>

## <data_h2> 비고 및 여담 </data_h2>

- 여담:
    - 해당 내용은 버스를 타고 집으로 갈때 버스 안에서 수기로 구성한 내용입니다.

- 배운점:
    - 요구사항 명세서 작성하는 방법에 대해서 학습하였습니다.
    - 명령, 상태, FSM, 옵저버 패턴등 디자인 패턴을 공부하고 클래스 구조를 설계하였습니다.
    - 설계를 바탕으로 코드를 작성하였습니다.
    - Divide and Conquer 방법론을 통해 복잡한 문제를 작은 단위로 나누어 해결하는 접근 방식을 배웠습니다.
    - 객체지향 분석을 통해 각 기능을 명확히 정의하고 설계하는 방법을 익혔습니다.