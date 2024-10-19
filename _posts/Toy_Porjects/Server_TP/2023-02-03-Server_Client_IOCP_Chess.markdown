---
layout: post
title: "고급웹서버프로그래밍 - 중간 과제(IOCP 서버 체스 판 이동 게임)"
date: 2023-02-04 16:14:05 +09:00
image: https://drive.google.com/thumbnail?id=10EZdRZOPRR7M0tCOfMJcTU1Ln1C8et7w
toc: true
categories: [Server_TP]
keywords: IOCP Server, TCP/IP, C++, Windows Thread API, Multithreading, Semaphore, Network Programming, Asynchronous I/O, Client-Server Architecture, Synchronization, Real-time Communication, Chessboard Game, Parallel Processing, File I/O, CreateThread API
addsence: true
lastmod: 2024-10-18 08:35:40 +09:00
sitemap: 
  changefreq : daily
  priority : 0.7
excerpt: 해당 프로젝트는 C++과 IOCP를 사용하여 다중 클라이언트와의 통신을 지원하는 TCP/IP 서버-클라이언트 체스 게임입니다. 비동기 입출력 및 스레드 관리를 통해 실시간 체스판 상태 동기화를 구현했습니다.
related_links:
    - url: /server_tp/Server_Client_IOCP_Chatting_Program.html
---

## <server_h2>프로젝트 소개</server_h2>

이 프로젝트는 C++을 사용하여 IOCP(입출력 완료 포트)를 기반으로 한 서버-클라이언트 체스판 이동 게임입니다. 이 게임은 체스판의 말 이동 정보를 여러 클라이언트 간에 실시간으로 전송하고, 서버는 이를 처리하여 전체 게임 상태를 유지하고 동기화하는 역할을 합니다. IOCP를 통해 비동기적으로 클라이언트의 요청을 처리함으로써, 다수의 클라이언트와의 통신을 효율적으로 관리할 수 있었습니다.

<br>
<br>

## <server_h2>프로젝트 개요</server_h2>

- <span><server_h5>프로젝트명:</server_h5> IOCP TCP/IP 서버 클라이언트 제작</span>
- <span><server_h5>과제:</server_h5> 2018년 2학기 고급웹서버프로그래밍 중간 과제</span>
- <span><server_h5>게임 장르:</server_h5> Toy Project</span>
- <span><server_h5>기간:</server_h5> 제작 완료</span>
    - ver.1: 2018.09.14~2018.09.21(제작)
- <span><server_h5>개발 인원:</server_h5> Developer(1명)</span>
- <span><server_h5>개발 언어:</server_h5> C++ </span>
- <span><server_h5>플랫폼:</server_h5> PC (Window)</span>

<br>

### <server_h3> 기술 스택 </server_h3>

- <span><server_h5>개발 도구:</server_h5> Visual Studio 2015 (최종 2019로 업그레이드) </span>
- <span><server_h5>네트워크 프로그래밍:</server_h5> IOCP (입출력 완료 포트), TCP/IP </span>
- <span><server_h5>API:</server_h5> Windows Thread API (CreateThread), IOCP API, Windows Synchronization API </span>
- <span><server_h5>기술:</server_h5> 비동기 입출력, 멀티스레드 프로그래밍, 서버-클라이언트 통신, 네트워크 동기화 </span>
- <span><server_h5>처리 방식:</server_h5> 입출력 완료 포트(IOCP) 기반 비동기 작업 처리 </span>
- <span><server_h5>서버 스레드 관리:</server_h5> 시스템 코어 수 기반 스레드 풀 할당 </span>

<br>
<br>

## <server_h2> 프로젝트 특징 및 기능 구현 </server_h2>

프로젝트 특징과 기능 구현 내용입니다.

<br>

### <server_h3>채스판 이동 이벤트 로직 IOCP TCP/IP 서버 제작</server_h3><red1_error> (전체 제작 기여도: 100%)</red1_error>

1. **서버 스레드 관리:** 서버의 코어 수를 조사하여, 해당 수만큼 작업 스레드를 할당하였습니다. 입출력 완료 포트(IOCP)를 통해 다중 클라이언트의 요청을 비동기적으로 처리합니다.
2. **유휴 스레드 관리:** 유휴 스레드가 있을 경우 클라이언트 통신을 해당 스레드에 할당하고, 그렇지 않으면 윈도우 큐를 이용하여 통신을 처리하는 로직을 구현하였습니다.
3. **클라이언트-서버 통신:** 키보드 입력을 클라이언트에서 서버로 전송하고, 서버는 해당 입력에 따라 체스판 말의 이동을 처리한 후 각 클라이언트로 그 결과를 전송하는 구조를 구현하였습니다.
4. **실시간 업데이트:** 서버에서 처리된 이동 결과는 각 클라이언트에서 실시간으로 화면에 반영되어, 사용자는 즉시 게임 상황을 확인할 수 있습니다.

<br>
<br>

## <server_h2>아키텍처 다이어그램</server_h2>

![IOCP 서버 체스 판 이동 게임 시퀸스]({{ site.google_drive }}10EZdRZOPRR7M0tCOfMJcTU1Ln1C8et7w{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<server_h6>IOCP 서버 체스 판 이동 게임 아키텍처 다이어그램</server_h6>*

- 키보드 입력 이벤트를 클라이언트에서 서버로 전송하고, 서버는 이동 로직을 처리한 후 결과를 클라이언트에 다시 전송하여 체스판에 실시간으로 반영합니다

IOCP를 활용한 비동기 처리: IOCP를 이용하여 다중 클라이언트와의 통신을 비동기적으로 처리하고, 서버 스레드 풀을 사용하여 성능을 최적화하였습니다. 클라이언트의 요청이 발생하면, 서버의 코어 수만큼 스레드를 생성하여 작업을 병렬적으로 처리합니다.
  
또한, 위 이미지에서 볼 수 있듯이, 각 클라이언트는 윈도우 I/O 시스템을 통해 입출력 완료 포트(IOCP)로 전달되며, 서버 메인 스레드가 이를 처리합니다. 서버는 시스템 코어 수에 따라 작업 스레드를 생성하여 클라이언트의 요청을 처리합니다.

<br>
<br>

## <server_h2> 결과(성과) 및 데모 </server_h2>

<iframe  width="100%" style="aspect-ratio:16/9" src="https://www.youtube.com/embed/hA4AJzZA-Xk" title="IOCP Chessboard Game Server - C++ Asynchronous TCP/IP Server Project" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe> 

- <span><server_h5>성과:</server_h5> 2015년 2학기 시스템 프로그래밍 실습 중간 과제 </span>
- <span><server_h5>깃허브(코드):</server_h5> [kj124-Server_Portfolio GitHub 저장소](https://github.com/kj1241/Server_Portfolio/tree/main/Advanced%20Web%20Server%20Programming/IOCPServerAssignments)</span>

<br>
<br>

## <server_h2> 비고 및 여담 </server_h2>

- 배운점:
    - IOCP의 동작 방식 및 서버 스레드 관리 방법을 익혔으며, 네트워크 비동기 처리의 중요성을 배웠습니다. 하지만 키보드 입력 방식 구현 시 간헐적으로 입력이 누락되는 문제점이 있었으며, 이를 해결하기 위한 개선이 필요합니다.
    - 특히, 입출력 완료 포트를 이용한 비동기 처리는 대규모 클라이언트 처리에 있어 중요한 역할을 하였으며, 네트워크 통신과 스레드 관리에 대한 귀중한 경험을 제공하였습니다.