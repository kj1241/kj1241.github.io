---
layout: post
title: "고급웹서버프로그래밍 - 기말 과제(IOCP TCP/IP 채팅 서버 ver.2)"
date: 2023-02-04 16:14:05 +09:00
image: https://drive.google.com/thumbnail?id=1vAi9hX6LY-VBoD8p8S2bMKLSmtXt1i8w
toc: true
categories: [Server_TP]
keywords: IOCP, TCP/IP 서버, C++ 프로그래밍, 멀티스레딩, 동기화, 윈도우 API, 비동기 I/O, WinAPI
addsence: true
lastmod: 2024-10-18 12:35:40 +09:00
sitemap: 
  changefreq : daily
  priority : 0.7
excerpt: 해당 프로젝트는 C++을 사용하여 고성능 IOCP TCP/IP 채팅 서버를 구현하며, 비동기 I/O를 통해 다중 클라이언트 메시징과 최적화된 스레드 동기화를 제공합니다.
related_links:
    - url: /server_tp/Server_Client_IOCP_Chess.html
---

## <server_h2>프로젝트 소개</server_h2>

C++으로 제작한 WinAPI 기반의 IOCP TCP/IP 채팅 서버 어플리케이션은 비동기 입출력 완료 포트를 활용하여 다중 클라이언트 간의 실시간 채팅을 구현합니다. 소켓 통신을 통해 클라이언트가 메시지를 전송하면 서버에서 비동기적으로 수신하고, 이를 모든 연결된 클라이언트에게 브로드캐스트하여 실시간 채팅 대화를 가능케 합니다. WinAPI를 이용하여 안정적이고 효율적인 서버 애플리케이션을 개발합니다.

<br>
<br>

## <server_h2>프로젝트 개요</server_h2>

- <span><server_h5>프로젝트명:</server_h5> IOCP TCP/IP 서버 클라이언트 제작 ver.2</span>
- <span><server_h5>과제:</server_h5> 2018년 2학기 고급웹서버프로그래밍 기말 과제</span>
- <span><server_h5>게임 장르:</server_h5> Toy Project</span>
- <span><server_h5>기간:</server_h5> 제작 완료</span>
    - ver.1: 2018.12.14~2018.12.29(제작)
- <span><server_h5>개발 인원:</server_h5> Developer(1명)</span>
- <span><server_h5>개발 언어:</server_h5> C++</span>
- <span><server_h5>플랫폼:</server_h5> PC (Window)</span>

<br>

### <server_h3>기술 스택</server_h3>

- <span><server_h5>개발 도구:</server_h5> Visual Studio 2015 (최종 2019로 업그레이드)  </span>
- <span><server_h5>동기화 메커니즘:</server_h5>크리티컬 섹션(Critical Section), 인터락(Interlocked Functions) </span>
- <span><server_h5>API:</server_h5>Windows Thread API (CreateThread), Windows Synchronization API (CreateCriticalSection, InterlockedIncrement) </span>
- <span><server_h5>기술:</server_h5>멀티스레드 프로그래밍, 비동기 입출력, 클라이언트 소켓 관리</span>
- <span><server_h5>네트워크 프로그래밍:</server_h5>비동기 소켓(WSAAsyncSelect, WSARecv, WSASend)</span>
- <span><server_h5>파일 처리:</server_h5>STL을 사용한 소켓 리스트 관리</span>

<br>
<br>

## <server_h2> 프로젝트 특징 및 기능 구현 </server_h2>

프로젝트 특징과 기능 구현 내용입니다.

<br>

### <server_h3>IOCP TCP/IP 채팅 서버 제작 ver.1</server_h3><red1_error> (전체 제작 기여도: 100%)</red1_error>

1. **스레드 동기화:** 크리티컬 섹션과 인터락을 사용하여 서버의 스레드 동기화를 구현하였습니다. 이를 통해 다중 클라이언트로부터 동시에 들어오는 요청들을 안정적으로 처리할 수 있었습니다.
2. **패킷 구성:** 사용자의 ID와 채팅 메시지를 각각 전달하는 패킷을 제작하였습니다. 이를 통해 각 클라이언트가 메시지를 주고받는 기능을 보다 명확하게 분리할 수 있었습니다.
3. **채팅 프로그램 UI:** WinAPI를 이용하여 채팅 UI를 제작하였습니다. 채팅 창은 사용자들이 입력한 메시지를 실시간으로 보여주며, 편리한 채팅 환경을 제공하도록 구현되었습니다.
4. **클라이언트 관리:** 서버는 모든 클라이언트의 소켓을 STL 리스트에 저장하고, 각 클라이언트로부터 받은 메시지를 리스트에 있는 모든 클라이언트에게 브로드캐스트하는 방식으로 구현되었습니다.

<br>

### <server_h3>패킷 제작 ver.2</server_h3><red1_error> (전체 제작 기여도: 100%)</red1_error>

1. **로그인 ID 패킷:** 클라이언트가 서버에 접속할 때 로그인 ID를 전달하는 패킷을 새롭게 제작하였습니다. 이 패킷은 사용자의 ID가 서버에 정상적으로 등록되었는지 확인하는 역할을 합니다.
2. **메시지 패킷:** 클라이언트가 채팅 메시지를 주고받을 수 있도록 메시지 패킷을 제작하였습니다. 메시지 패킷은 각 클라이언트가 보낸 메시지를 다른 클라이언트에게 전달하기 위한 형식으로 정의되었습니다.

<br>
<br>

## <server_h2>아키텍쳐 다이어그램</server_h2>

#### **<server_h3>IOCP TCP/IP 채팅 서버 제작 ver.1</server_h3>**

**IOCP(입출력 완료 포트)**를 활용한 서버-클라이언트 구조를 시각적으로 설명한 다이어그램입니다. 각 요소의 역할을 설명하면 다음과 같습니다:

![IOCP TCP/IP 채팅 아키텍처 다이어그램]({{ site.google_drive }}1Bv-MMgsfZU7A2mjQuvayMt6zsxYnQeg8{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<server_h6>IOCP TCP/IP 채팅 아키텍처 다이어그램 ver.1</server_h6>*

1. 클라이언트 측 (빨간색 박스)
    - Client: 각 클라이언트는 서버와 통신하기 위해 소켓을 통해 연결됩니다.
    - WSAAsyncSelect: 클라이언트는 비동기 소켓 함수를 사용하여 비동기적으로 데이터를 주고받습니다.
    - 메시지 큐: 클라이언트는 송수신할 메시지를 큐에 저장하여, 메시지를 보낼 준비가 되었을 때 데이터를 전송합니다.
    - Recv/Send: 각각 메시지를 수신하고 전송하는 동작을 수행하는 부분입니다.
2. 서버 측 (파란색 박스)
    - Windows I/O 시스템: 서버는 Windows의 I/O 시스템을 통해 클라이언트로부터 들어오는 데이터를 처리합니다.
    - 입출력 완료 포트 (IOCP): 서버는 IOCP를 통해 비동기적으로 완료된 입출력 작업을 관리합니다. IOCP는 서버가 다중 클라이언트와의 통신을 효율적으로 처리할 수 있도록 도와줍니다.
    - QueuedCompletionStatus: 입출력 작업이 완료되면 상태를 큐에 저장합니다. 이 큐에서 작업이 완료된 순서대로 작업이 처리됩니다.
    - 작업 스레드: IOCP는 시스템 코어 수에 맞춰 여러 작업 스레드를 생성하여 동시에 처리할 수 있도록 합니다. 각 스레드는 큐에 있는 완료된 작업을 가져와 처리합니다.
    - 서버 메인 스레드: 서버 메인 스레드는 클라이언트의 연결을 관리하고, 새로운 작업이 들어올 때마다 작업 스레드가 처리할 수 있도록 분배합니다.

해당 구조는 비동기적으로 다중 클라이언트와 통신할 수 있게 하여 성능을 높이고, 입출력 작업을 효율적으로 관리합니다.

#### **<server_h4>패킷 제작 ver.2</server_h4>** 

![IOCP TCP/IP 채팅 서버 아키텍처 다이어그램]({{ site.google_drive }}1vAi9hX6LY-VBoD8p8S2bMKLSmtXt1i8w{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<server_h6>IOCP TCP/IP 채팅 서버 패킷추가 아키텍처 다이어그램 ver.2</server_h6>*

패킷 구조가 "user id"와 "메시지"라는 두 개의 필드로 나누어져 있는 것을 보여주고 있습니다. 각 필드의 크기가 다음과 같습니다:
- user id: 128비트
- 메시지: 256비트

이 패킷은 채팅 서버와 클라이언트 간의 통신에서 주요 데이터를 전달하는 역할을 합니다.

<br>
<br>

## <server_h2> 결과(성과) 및 데모 </server_h2>

<iframe width="100%" style="aspect-ratio:16/9" src="https://www.youtube.com/embed/THE9nnwgT3k" title="IOCP TCP/IP Chatting Server (Ver. 2) - C++ Asynchronous Server Project" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

- <span><server_h5>성과:</server_h5> 2018년 2학기 고급웹서버프로그래밍 기말 과제 </span>
- <span><server_h5>깃허브(코드):</server_h5> [kj124-Server_Portfolio GitHub 저장소](https://github.com/kj1241/Server_Portfolio/tree/main/Advanced%20Web%20Server%20Programming/IOCPChattingServer)</span>

<br>
<br>

## <server_h2> 비고 및 여담 </server_h2>

- 배운점:
    - IIOCP 서버와 TCP/IP 소켓 프로그래밍을 학습하고, 이를 통해 WinAPI UI를 구현하는 방법을 익혔습니다. 또한, STL 리스트를 이용하여 소켓을 관리하는 방법을 배웠습니다.
- 개선 사항:
    - 패킷의 구성과 동기화 방식을 개선할 수 있는 방법에 대해 더 깊이 연구해 볼 예정입니다.
