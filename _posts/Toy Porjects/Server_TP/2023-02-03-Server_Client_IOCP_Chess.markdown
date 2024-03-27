---
layout: post
title: "고급웹서버프로그래밍 - 중간 과제(IOCP 서버 체스 판 이동 게임)"
date: 2023-02-04 16:14:05 +0900
image: https://drive.google.com/thumbnail?id=10EZdRZOPRR7M0tCOfMJcTU1Ln1C8et7w
toc: true
categories: [Server_TP]
tags: [C++, IOCP Server, IOCP Client, Synchronization]
keywords: C++, IOCP Server, IOCP Client, Synchronization, server
---

## <server_h2>프로젝트 소개</server_h2>

C++으로 구현한 IOCP 기반의 서버-클라이언트 채스판 이동 토이 프로젝트는 비동기 입출력 완료 포트를 사용하여 다중 클라이언트 간의 통신을 지원합니다. 이 프로젝트는 체스보드에서 말의 이동을 클라이언트 간에 전송하고, 서버에서 이를 처리하여 실시간으로 게임 상태를 유지하고 업데이트합니다. IOCP를 이용하여 효율적인 네트워크 통신을 구현하여 다수의 클라이언트와의 대화를 처리합니다.  

<br>
<br>

## <server_h2>프로젝트 개요</server_h2>

- <span><server_h5>프로젝트명:</server_h5> IOCP TCP/IP 서버 클라이언트 제작</span>
- <span><server_h5>과제:</server_h5> 2018년 2학기 고급웹서버프로그래밍 중간 과제</span>
- <span><server_h5>게임 장르:</server_h5> Toy Project</span>
- <span><server_h5>기간:</server_h5> 제작 완료</span>
    - ver.1: 2018.09.14~2018.09.21(제작)
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

### <server_h3>채스판 이동 이벤트 로직 IOCP TCP/IP 서버 제작</server_h3><red1_error> (전체 제작 기여도: 100%)</red1_error>

1. 서버 컴퓨터 코어 수를 조사하여 코어 수만큼 작업 스레드를 할당하였습니다.
2. 유후 스레드가 존재하면 유후 스레드에 클라이언트 통신 처리 존재하지 않으면 윈도우 큐 구현 및 처리하였습니다.
3. 키보드 값을 클라이언트에서 서버로 전송 구현하였습니다.
4. 서버에서 이동 로직과 물리적 처리를 한후 서버에서 클라이언트 전송 구현하였습니다.
5. 전송받은 패킷을 이용하여 클라이언트 화면 적용하였습니다.

<br>
<br>

## <server_h2>시퀸스 다이어그램</server_h2>

![시퀸스]({{ site.google_drive }}10EZdRZOPRR7M0tCOfMJcTU1Ln1C8et7w{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}

- 키보드 입력 이벤트를 발생 처리하였습니다.
- 클라이언트의 동기화를 위해 서버 로직 처리하였습니다.

<br>
<br>

## <server_h2> 결과(성과) 및 데모 </server_h2>

<iframe  width="100%" style="aspect-ratio:16/9" src="https://www.youtube.com/embed/hA4AJzZA-Xk" title="IOCP 서버 제작 과제" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe> 

- <span><server_h5>성과:</server_h5> 2015년 2학기 시스템 프로그래밍 실습 중간 과제 </span>
- <span><server_h5>깃허브(코드):</server_h5> [https://github.com/kj1241/Server_Assignment/tree/main/Advanced%20Web%20Server%20Programming/IOCPServerAssignments/](https://github.com/kj1241/Server_Assignment/tree/main/Advanced%20Web%20Server%20Programming/IOCPServerAssignments/)</span>

## <unity_h2> 비고 및 여담 </unity_h2>

- 배운점 및 수정할 점
    - IOCP의 구동 방식과 동기화 하는 방법에 대해서 학습하였습니다.
    - 매크로를 사용하여 키보드 입력 방식을 구현하였으나 간혈적으로 씹히는 문제가 존재합니다.