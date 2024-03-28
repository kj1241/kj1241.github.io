---
layout: post
title: "고급웹서버프로그래밍 - 기말 과제(IOCP TCP/IP 채팅 서버 ver.2)"
date: 2023-02-04 16:14:05 +0900
image: https://drive.google.com/thumbnail?id=1vAi9hX6LY-VBoD8p8S2bMKLSmtXt1i8w
toc: true
categories: [Server_TP]
tags: [C++, IOCP Server, IOCP Client, Synchronization]
keywords: C++, IOCP Server, IOCP Client, Synchronization, server
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

### <server_h3>IOCP TCP/IP 채팅 서버 제작 ver.1</server_h3><red1_error> (전체 제작 기여도: 100%)</red1_error>

1. 크리티컬 섹션과 인터락을 사용하여 스레드 동기화 코드를 작성 했습니다.
2. 아이디를 전달하는 패킷과 대화를 전달하는 패킷으로 제작하였습니다.
3. 크리티컬 섹션과 인터락을 사용하여 스레드 동기화를 구현하였습니다.
4. WinAPI UI를 사용하여 채팅 프로그램 제작하였습니다.
5. STL List에 접속 소켓을 저장하여 모든 클라이언트에 전송 했습니다. (서버)    

<br>

### <server_h3>패킷 제작 ver.2</server_h3><red1_error> (전체 제작 기여도: 100%)</red1_error>

1. 로그인 ID 패킷 제작했습니다.
2. 메시지 페킷 제작했습니다.

<br>
<br>

## <server_h2>시퀸스 다이어그램</server_h2>

#### **<server_h3>IOCP TCP/IP 채팅 서버 제작 ver.1</server_h3>**

![시퀸스]({{ site.google_drive }}1vAi9hX6LY-VBoD8p8S2bMKLSmtXt1i8w{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}

- IOCP 서버와 클라이언트가 통신하여 클라이언트 간에 채팅을 주고 받는 방식을 알 수 있습니다.
- 서버 통신 패킷 제작 방식에 대해 알 수 있습니다.

#### **<server_h4>패킷 제작 ver.1</server_h4>** 

![시퀸스]({{ site.google_drive }}1H10wVWRfnG5FMa39x1YcdFJ4eea8l0-q{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}

- 패킷을 정의하고 구현하는 방식에 대해서 알 수 있습니다.


<br>
<br>

## <server_h2> 결과(성과) 및 데모 </server_h2>

<iframe width="100%" style="aspect-ratio:16/9" src="https://www.youtube.com/embed/THE9nnwgT3k" title="IOCP 채팅 서버 WinAPI 어플리케이션 개발" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

- <span><server_h5>성과:</server_h5> 2018년 2학기 고급웹서버프로그래밍 기말 과제 </span>
- <span><server_h5>깃허브(코드):</server_h5> [https://github.com/kj1241/Server_Assignment/tree/main/Advanced%20Web%20Server%20Programming/IOCPChattingServer/](https://github.com/kj1241/Server_Assignment/tree/main/Advanced%20Web%20Server%20Programming/IOCPChattingServer/)</span>

<br>
<br>

## <unity_h2> 비고 및 여담 </unity_h2>

- 배운점 및 수정할 점
    - IOCP 서버에 구현에 관하여 학습 및 TCP/IP 소켓 프로그래밍을 작성하는 방법을 공부하였습니다.
    - WinAPI를 사용하여 클라이언트 및 서버 UI 구현하는 방법을 습득하였습니다.
    - STL List 사용하는 방식 학습하였습니다.