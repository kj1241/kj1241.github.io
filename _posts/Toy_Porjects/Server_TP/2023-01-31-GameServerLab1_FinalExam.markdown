---
layout: post
title: "게임서버실습(1) - 기말 과제(Echo TCP/IP 채팅 서버 ver.2)"
date: 2023-01-31 23:50:31 +09:00
image: https://drive.google.com/thumbnail?id=1tdtL0ira98kAtleTr07iy-NLtYEgE5Og
toc: true
categories: [Server_TP]
keywords: C++, Echo Server, Echo Client, Chatting Progrm, TCP/IP Socket Programming, Winsock, Multithreading, Packet Design, Mutex, Visual Studio, Game Server, Client-Server Model, Asynchronous Communication,Network Programming
addsence: true
lastmod: 2024-10-07 05:07:40 +09:00
sitemap: 
  changefreq : daily
  priority : 0.7
excerpt: C++로 개발된 Echo TCP/IP 채팅 프로그램으로, 서버-클라이언트 간 양방향 통신을 구현했습니다. Winsock을 사용하여 멀티스레드 동기화와 패킷 디자인을 적용했습니다.
related_links:
    - url: /server_tp/GameServerLab1.html
---

## <server_h2>프로젝트 소개</server_h2>

이번 프로젝트는 C++로 개발된 Echo TCP/IP 채팅 프로그램입니다. 
서버와 클라이언트 간 양방향 통신을 구현하여, 클라이언트가 메시지를 서버로 전송하면 서버는 이를 수신한 후, 다시 클라이언트로 응답하는 구조입니다. 
Winsock 라이브러리를 사용해 TCP/IP 소켓 통신을 처리했으며, 비동기 방식으로 멀티스레드 환경을 구축해 여러 클라이언트를 동시에 처리할 수 있도록 설계했습니다.

<br>
<br>

## <server_h2>프로젝트 개요</server_h2>

- <span><server_h5>프로젝트명:</server_h5> Echo TCP/IP 서버-클라이언트 채팅 프로그램 ver.2</span>
- <span><server_h5>과제:</server_h5> 2016년 2학기 게임 서버 실습(1) 기말 과제</span>
- <span><server_h5>게임 장르:</server_h5> Toy Project</span>
- <span><server_h5>기간:</server_h5> 제작 완료</span>
    - ver.1: 2016.12.05~2016.12.10
    - ver.2: 2016.12.10~2016.12.19(패킷 디자인 추가)
- <span><server_h5>개발 인원:</server_h5> Developer(1명)</span>
- <span><server_h5>개발 언어:</server_h5> C++</span>
- <span><server_h5>플랫폼:</server_h5> PC (Window)</span>

<br>

### <server_h3> 기술 스택 </server_h3>

- <span><server_h5>개발 도구:</server_h5> Visual Studio 2015 (최종 2019로 업그레이드)  </span>
- <span><server_h5>라이브러리:</server_h5> WinSocket2 </span>
- <span><server_h5>멀티스레딩:</server_h5> WaitForSingleObject와 Mutex를 사용해 동기화 </span>


<br>
<br>

## <server_h2> 프로젝트 특징 및 기능 구현 </server_h2>

프로젝트 특징과 기능 구현 내용입니다.

<br>

### <server_h3>1. Echo 서버와 클라이언트 채팅 프로그램 ver.1</server_h3><red1_error> (전체 제작 기여도: 100%)</red1_error>

1. TCP/IP 소켓 통신
    - Winsock2 라이브러리를 사용하여 TCP/IP 소켓 통신 프로세스를 구현했습니다.
2. 멀티스레드 환경 구축
    - WaitForSingleObject와 Mutex를 사용하여 스레드 동기화를 구현했습니다. 이로 인해 서버는 여러 클라이언트와 동시에 통신할 수 있습니다.
3. 종료 조건 설정
    - 클라이언트에서 빈 엔터를 입력하면 접속이 종료되도록 설정하여, 사용자 편의를 고려한 기능을 추가했습니다.

<br>

### <server_h3>패킷 디자인 추가 ver.2</server_h3><red1_error> (전체 제작 기여도: 100%)</red1_error>

1. 패킷 구조 추가
    - PacketType 구조체를 추가하여 패킷을 여러 유형으로 처리할 수 있도록 했습니다. 예를 들어, 로그인 패킷, 메시지 전송 패킷 등이 있으며, 각 패킷은 고유의 packetType으로 구분됩니다.
2. 서버 로그 추가
    - 서버의 관리 편의성을 위해 각 이벤트의 발생 시점을 기록하는 시간 로그 기능을 추가했습니다.

<br>
<br>

## <server_h2>시퀸스 다이어그램</server_h2>

#### **<server_h4>Echo 서버,클라이언트 채팅 프로그램 제작 ver.1</server_h4>**

![Echo 서버,클라이언트 채팅 프로그램 아키텍쳐 다이어그램]({{ site.google_drive }}1nE_cbaLZZMKboa-tYxLOm9g3emT2_BPw{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<server_h6>Echo 서버,클라이언트 채팅 프로그램 아키텍쳐 다이어 그램</server_h6>*

서버는 각 클라이언트의 접속 요청을 스레드로 처리합니다.

- 채팅 서버는 클라이언트가 접속할 때마다 새로운 스레드를 할당해 통신을 처리합니다.
- 클라이언트는 서버로부터 수신하는 recv와 서버로 데이터를 보내는 send 스레드를 각각 운영합니다.
- 오류 처리는 try-catch 구문을 통해 안전하게 처리하도록 설계했습니다.


#### **<server_h4>패킷 디자인 추가 ver.2</server_h4>**

![Echo 서버 패킷 디자인]({{ site.google_drive }}1tdtL0ira98kAtleTr07iy-NLtYEgE5Og{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<server_h6>Echo 서버 패킷 디자인</server_h6>*

패킷 디자인 구조도는 로그인 데이터와 메시지 데이터를 구분합니다.

- 패킷은 헤더와 본문으로 구성되며, 각각의 패킷은 일정 크기로 정의됩니다.
- 로그인 데이터와 메시지 데이터는 서로 다른 형식으로 전송되며, 각 패킷 유형에 맞게 서버와 클라이언트가 데이터를 처리합니다.

<br>
<br>

## <server_h2> 결과(성과) 및 데모 </server_h2>

#### **<server_h3>Echo 서버,클라이언트 채팅 프로그램 제작 ver.1</server_h3>**
<iframe width="100%" style="aspect-ratio:16/9" src="https://www.youtube.com/embed/jfzdyEIj1hU" title="Echo TCP/IP Chatting Server (Ver. 1) - C++ Game Server Project" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

#### **<server_h3>패킷 디자인 추가 ver.2</server_h3>**
<iframe width="100%" style="aspect-ratio:16/9" src="https://www.youtube.com/embed/y5QNQ_o9nDI" title="Echo TCP/IP Chatting Server (Ver. 2) - C++ Game Server Project with Packet Design" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

- <span><server_h5>성과:</server_h5> 2016년 2학기 게임서버실습(1) 기말 과제 </span>
- <span><server_h5>깃허브(코드):</server_h5> [kj1241-Server_Portfolio GitHub 링크](https://github.com/kj1241/Server_Portfolio/tree/main/Game%20Server%20Practice%20(1)/GameServerPractice1%20ExamFInal)</span>

<br>
<br>

## <server_h2> 비고 및 여담 </server_h2>

- 배운점:
    - 서버-클라이언트 구조에서 비동기 통신 및 멀티스레드 환경을 구축하는 방법을 학습했습니다
    - 패킷 디자인을 통해 메시지 송수신에서의 효율성과 안정성을 높일 수 있었습니다.
    - 클라이언트에서 메시지 송수신 기능을 스레드로 분리하여 비동기 통신의 안정성을 확인할 수 있었습니다.
- 개선할 점:
    - 클라이언트와 서버 간의 오류 처리 로직을 더욱 세분화하여, 예외 발생 시 보다 안정적인 성능을 제공할 수 있도록 개선이 필요합니다.
    - 다수의 클라이언트가 동시에 접속할 때 성능 저하를 최소화할 수 있는 추가적인 최적화 기법을 적용하는 것이 필요합니다.
- 여담:
    - 해당 프로젝트에서는 Winsock2 라이브러리를 사용해 클라이언트와 서버 간의 TCP/IP 통신을 처리했습니다.  각 클라이언트가 접속할 때마다 서버는 별도의 스레드를 생성하여 각 클라이언트를 개별적으로 처리하도록 구현했습니다.