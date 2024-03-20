---
layout: post
title: "시스템 프로그래밍 실습 - 기말 과제(멀티 스레드를 이용한 덧셈)"
date: 2023-01-31 16:03:34 +0900
image: https://drive.google.com/thumbnail?id=1mmDHfeR2VsfovZXrl-Bs0gg8iwNHrb_j
toc: true
categories: [Server_TP]
tags: [C++, Multi Thread]
---

## <server_h2>프로젝트 소개</server_h2>

C++로 작성한 멀티쓰레드 덧셈 프로그램은 여러 쓰레드를 사용하여 숫자의 합을 효과적으로 계산합니다. 이 프로그램은 쓰레드 간의 작업을 분할하고 결과를 안전하게 집계하여 병렬처리를 통해 높은 성능을 제공합니다. Mutex나 원자적 연산 등을 활용하여 쓰레드 간의 동기화를 보장하여 안정적으로 동작합니다.

<br>
<br>

## <server_h2>프로젝트 개요</server_h2>

- <span><server_h5>프로젝트명:</server_h5> 멀티 스레드를 이용한 덧셈 프로그램 </span>
- <span><server_h5>과제:</server_h5> 2015년 2학기 시스템 프로그래밍 실습 기말 과제</span>
- <span><server_h5>장르:</server_h5> Toy Project</span>
- <span><server_h5>기간:</server_h5> 제작 완료</span>
    - ver.1: 2015.11.05~2015.11.19(제작)
- <span><server_h5>개발인원:</server_h5> Developer(1명)</span>
- <span><server_h5>플랫폼:</server_h5> PC (Window)</span>

<br>

### <server_h3> 기술 스택 </server_h3>

- <span><server_h5>개발 도구:</server_h5> viusal studio 2015 → 2019  </span>
- <span><server_h5>개발 언어:</server_h5> c++  </span>

<br>
<br>

## <server_h2> 프로젝트 특징 및 기능 구현 </server_h2>

프로젝트 특징과 기능 구현 내용입니다.

<br>

### <server_h3>멀티 스레드 통신 제작 ver.1</server_h3><red1_error> (전체 제작 기여도: 100%)</red1_error>

1. CrateThread를 사용하여 스레드 생성하였습니다.
2. CreateSemaphore를 사용해서 동기화 및 구현하였습니다.


<br>

## <server_h2>시퀸스 다이어그램</server_h2>

![시퀸스]({{ site.google_drive }}1mmDHfeR2VsfovZXrl-Bs0gg8iwNHrb_j{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}

1. main number.txt 파일에 있는 숫자 30개 파일 입출력으로 읽습니다.
2. 멀티 스레드 생성 및 각각 10개씩 데이터 넘겨 줍니다.
3. 스레드 안에서 합계를 계산해 줍니다.
4. 이때 동기화를 사용하기 위해 세마포어를 구현해 줍니다.

<br>
<br>

## <server_h2> 결과(성과) 및 데모 </server_h2>

<iframe  width="100%" style="aspect-ratio:16/9" src="https://www.youtube.com/embed/apWhZFFAme8" title="멀티스레드 덧셈 프로그램 제작(화질 개선)" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

- <span><server_h5>성과:</server_h5> 2015년 2학기 시스템 프로그래밍 실습 기말 과제 </span>
- <span><server_h5>깃허브(코드):</server_h5> [https://github.com/kj1241/Server_Assignment/tree/main/System%20Programming/MultiThreadedSumProgram/FinalAssignment(ver.1)](https://github.com/kj1241/Server_Assignment/tree/main/System%20Programming/MultiThreadedSumProgram/FinalAssignment(ver.1))</span>

<br>
<br>

## <unity_h2> 비고 및 여담 </unity_h2>

- 배운점
    - 멀티 스레드에 관해서 학습하고 동기화하는 방법을 공부했습니다.