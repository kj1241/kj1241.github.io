---
layout: post
title: "시스템 프로그래밍 실습 - 기말 과제(멀티 스레드를 이용한 덧셈)"
date: 2023-01-31 16:03:34 +09:00
image: https://drive.google.com/thumbnail?id=1mmDHfeR2VsfovZXrl-Bs0gg8iwNHrb_j
toc: true
categories: [Server_TP]
keywords: C++, Multi Thread, 세마포어, 비동기 처리, 병렬 처리, 동기화, Visual Studio, 파일 입출력, Mailbox API, 시스템 프로그래밍
addsence: true
lastmod: 2024-10-18 05:35:40 +09:00
sitemap: 
  changefreq : daily
  priority : 0.7
excerpt: C++로 작성된 멀티스레드 덧셈 프로그램. 스레드 동기화와 병렬 처리 기술을 사용하여 숫자 계산을 빠르게 수행하며, 세마포어로 안전한 동작을 보장합니다.
related_links:
    - url: /server_tp/MultiThread.html
---

## <server_h2>프로젝트 소개</server_h2>

본 프로젝트는 C++로 작성된 멀티스레드 덧셈 프로그램입니다. 여러 스레드를 사용하여 대용량의 데이터를 병렬로 처리하고, 그 결과를 효율적으로 계산하는 방식으로 설계되었습니다. 이 프로그램은 파일 입출력을 통해 데이터를 읽고, 각각의 스레드가 데이터를 나누어 계산한 뒤, 최종적으로 모든 결과를 집계하여 출력합니다. 이 과정에서 스레드 간의 동기화를 위해 세마포어(Semaphore)와 같은 동기화 메커니즘이 사용되었습니다. 이로 인해 여러 스레드가 동시에 안전하게 작업할 수 있으며, 동기화 문제를 방지할 수 있습니다.

<br>
<br>

## <server_h2>프로젝트 개요</server_h2>

- <span><server_h5>프로젝트명:</server_h5> 멀티 스레드를 이용한 덧셈 프로그램 </span>
- <span><server_h5>과제:</server_h5> 2015년 2학기 시스템 프로그래밍 실습 기말 과제</span>
- <span><server_h5>장르:</server_h5> Toy Project</span>
- <span><server_h5>기간:</server_h5> 제작 완료</span>
    - ver.1: 2015.11.05~2015.11.19(제작)
- <span><server_h5>개발 인원:</server_h5> Developer(1명)</span>
- <span><server_h5>개발 언어:</server_h5> C++</span>
- <span><server_h5>플랫폼:</server_h5> PC (Window)</span>

<br>

### <server_h3> 기술 스택 </server_h3>

- <span><server_h5>개발 도구:</server_h5> Visual Studio 2015 (최종 2019로 업그레이드)  </span>
- <span><server_h5>동기화 메커니즘:</server_h5> 세마포어(Semaphore) </span>
- <span><server_h5>API:</server_h5> Windows Thread API (CreateThread), Windows Synchronization API (CreateSemaphore) </span>
- <span><server_h5>기술:</server_h5> 멀티스레드 프로그래밍, 병렬 처리, 동기화, 파일 입출력 </span>
- <span><server_h5>파일 처리:</server_h5> ifstream을 통한 텍스트 파일 데이터 입력 </span>

<br>
<br>

## <server_h2> 프로젝트 특징 및 기능 구현 </server_h2>

프로젝트 특징과 기능 구현 내용입니다.

<br>

### <server_h3>멀티 스레드 통신 제작 ver.1</server_h3><red1_error> (전체 제작 기여도: 100%)</red1_error>

1. **스레드 생성:** CreateThread API를 사용하여 여러 개의 스레드를 생성했습니다. 이 스레드들은 각기 다른 부분의 데이터를 병렬로 처리하도록 설계되었습니다.
2. **동기화 처리:** 스레드 간의 동시성 문제를 해결하기 위해 CreateSemaphore를 사용하여 동기화를 구현했습니다. 세마포어를 통해 여러 스레드가 동시에 같은 자원에 접근할 때 발생할 수 있는 문제를 방지하였습니다.
3. **파일 입출력 처리:** number.txt 파일에서 30개의 숫자를 읽어들여 각각의 스레드에 10개씩 나누어 전달합니다. 이때 파일 입출력 부분은 메인 스레드에서 처리되며, 각 스레드는 자신이 할당받은 데이터를 계산합니다.
4. **결과 집계:** 각 스레드가 계산한 결과를 메인 스레드로 전달하고, 최종적으로 메인 스레드에서 모든 결과를 합산하여 출력합니다. 이 과정에서 계산 순서를 보장하기 위해 세마포어가 사용됩니다.

<br>
<br>

## <server_h2>시퀸스 다이어그램</server_h2>

![멀티 프로세스 덧셈 프로그램 시퀸스]({{ site.google_drive }}1mmDHfeR2VsfovZXrl-Bs0gg8iwNHrb_j{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<server_h6>멀티 프로세스 덧셈 프로그램 시퀸스</server_h6>*

시퀀스 다이어그램은 프로그램의 주요 흐름을 시각적으로 보여줍니다. 아래 이미지를 통해 전체적인 프로그램 동작을 이해할 수 있습니다.

1. **텍스트 읽기:** 메인 스레드는 number.txt 파일을 읽습니다.
2. **스레드 생성:** 스레드를 생성하고, 각각의 스레드에게 데이터를 분배합니다.
3. **숫자 계산:** 각 스레드는 자신이 받은 데이터를 처리하여 결과를 메인 스레드에 전달합니다.
4. **결과 출력:** 메인 스레드는 모든 스레드가 계산한 결과를 집계하고, 이를 출력합니다.

<br>

### <server_h3>프로그램 동작 흐름</server_h3>

1. 파일 읽기: 프로그램 실행 시 number.txt에서 30개의 숫자를 읽습니다.
2. 스레드 생성 및 데이터 분배: 프로그램은 총 3개의 스레드를 생성하고, 각 스레드에게 10개의 숫자를 할당합니다.
3. 병렬 계산: 각 스레드는 자신이 할당받은 10개의 숫자의 합계를 계산합니다.
4. 결과 집계: 메인 스레드는 각 스레드가 계산한 결과를 수집하여 최종 합계를 계산하고 출력합니다.


<br>
<br>

## <server_h2> 결과(성과) 및 데모 </server_h2>

<iframe  width="100%" style="aspect-ratio:16/9" src="https://www.youtube.com/embed/apWhZFFAme8" title="Multi-Threaded Addition Program Using Semaphores - C++ System Programming Project" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

- <span><server_h5>성과:</server_h5> 2015년 2학기 시스템 프로그래밍 실습 기말 과제 </span>
- <span><server_h5>깃허브(코드):</server_h5> [kj124-Server_Portfolio GitHub 저장소](https://github.com/kj1241/Server_Portfolio/tree/main/System%20Programming/MultiThreadedSumProgram)</span>

<br>
<br>

## <server_h2> 비고 및 여담 </server_h2>

- 배운점
    - 본 프로젝트를 통해 멀티스레드 프로그래밍에 대한 이해를 심화할 수 있었습니다. 특히, 스레드 간 동기화 문제를 해결하기 위해 세마포어와 같은 동기화 메커니즘을 직접 구현하면서, 멀티스레드 환경에서의 안정적인 프로그램 구현 방법을 배웠습니다.
- 여담
    - 본 프로젝트는 2015년 2학기 시스템 프로그래밍 실습의 기말 과제로 제출되었습니다. 이 프로젝트를 통해 멀티스레드 프로그래밍의 기본 개념과 동기화 문제를 해결하는 방법을 실습하였으며, 실질적인 성과로 높은 성능의 병렬 계산 프로그램을 구현하였습니다.