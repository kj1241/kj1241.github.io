---
layout: post
title:  "IOCP TCP/IP 채팅 서버 WinAPI 어플리케이션 제작"
date: 2023-02-04 16:14:05 +0900
image: https://drive.google.com/uc?export=view&id=1H10wVWRfnG5FMa39x1YcdFJ4eea8l0-q
toc: true
categories: [Server_TP]
tags: [C++, IOCP Server, IOCP Client, Synchronization]
---

## <green1_h2> 고급웹서버프로그래밍 기말 과제 프로젝트 소개 </green1_h2>

C++으로 제작한 WinAPI 기반의 IOCP TCP/IP 채팅 서버 어플리케이션은 비동기 입출력 완료 포트를 활용하여 다중 클라이언트 간의 실시간 채팅을 구현합니다.  
소켓 통신을 통해 클라이언트가 메시지를 전송하면 서버에서 비동기적으로 수신하고, 이를 모든 연결된 클라이언트에게 브로드캐스트하여 실시간 채팅 대화를 가능케 합니다.  
WinAPI를 이용하여 안정적이고 효율적인 서버 애플리케이션을 개발합니다.

<br>
<br>

## <green1_h2> 고급웹서버프로그래밍 기말 과제 프로젝트 개요 </green1_h2>

- <span><green1_h5>프로젝트명: </green1_h5> IOCP TCP/IP 채팅 서버 클라이언트 제작 </span>
- <span><green1_h5>장르: </green1_h5> 2018년 2학기 고급웹서버프로그래밍 기말 과제 </span>
- <span><green1_h5>기간: </green1_h5> 2018.12.14~2018.12.29 </span>
- <span><green1_h5>플랫폼: </green1_h5> PC(consol)</span>

<br>
<br>

## <green1_h2> 팀 구성 </green1_h2>

- <span><green1_h5>Developer(1명): </green1_h5>IOCP TCP/IP 채팅 서버 클라이언트 제작, 비동기 통신, 동기화 코드 </span>

<br>
<br>

## <green1_h2> 기술 스택 </green1_h2>

- <span><green1_h5>엔진: </green1_h5> viusal studio 2015 → 2019 </span>
- <span><green1_h5>언어:  </green1_h5> c++ </span>

<br>
<br>

## <green1_h2> 고급웹서버프로그래밍 기말 과제 프로젝트 특징 </green1_h2>

- IOCP 서버와 클라이언트가 통신하여 클라이언트 간에 채팅을 주고 받는 방식을 알 수 있습니다.
- 서버 통신 패킷 제작 방식에대해 알 수 있습니다.

<br>

### <green1_h3> 프로젝트 주제 </green1_h3>

1. 채팅서버는 IOCP로 제작하야여 합니다.
2. 클라이언트는 스레드로 서버에서부터 받는 recv 보내는 send로 따로 구성되어야 합니다.
3. 채팅 메시지는 동기화 처리를 해야합니다.
4. 오류처리를 try-catch 문으로 작성해야 합니다.

<br>
<br>

## <green1_h2> 개발자의 역활 및 경험 </green1_h2>

- **IOCP TCP/IP 채팅 서버 제작 (v1.0)** <span><red1_error>(전체 게임 제작 기여도: 100%)</red1_error></span>
    1. 크리티컬 섹션과 인터락을 사용하여 스레드 동기화
    2. 아이디를 전달하는 패킷과 대화를 전달하는 패킷으로 제작.
    3. 크리티컬 섹션과 인터락을 사용하여 스레드 동기화를 구현.
    4. WinAPI UI를 사용하여 채팅 프로그램 제작.
    5. STL List에 접속 소켓을 저장하여 모든 클라이언트에 전송 (서버)

- **패킷 제작** <span><red1_error>(전체 게임 제작 기여도: 100%)</red1_error></span>
    1. 로그인 ID 패킷 제작.
    2. 메시지 페킷 제작.

<br>

### <green1_h3> 다이어 그램 </green1_h3>

![다이어 그램](https://drive.google.com/uc?export=view&id=1H10wVWRfnG5FMa39x1YcdFJ4eea8l0-q){: width="100%" style="aspect-ratio:16/9"}

<br>

### <green1_h3> 패킷 구성 </green1_h3>

![패킷 구성](https://drive.google.com/uc?export=view&id=1vAi9hX6LY-VBoD8p8S2bMKLSmtXt1i8w){: width="60%" }

<br>
<br>

## <green1_h2> 고급웹서버프로그래밍 기말 과제 결과(성과) 및 데모 </green1_h2>

- <span><green1_h5>성과: </green1_h5>2018년 2학기 고급웹서버프로그래밍 기말 과제</span>
- <span><green1_h5>깃 허브(코드): </green1_h5> [https://github.com/kj1241/Server_Assignment/tree/main/Advanced%20Web%20Server%20Programming/IOCPChattingServer/](https://github.com/kj1241/Server_Assignment/tree/main/Advanced%20Web%20Server%20Programming/IOCPChattingServer/) </span>
- <green1_h5>유튜브 동영상: </green1_h5>
    <iframe width="100%" style="aspect-ratio:16/9" src="https://www.youtube.com/embed/THE9nnwgT3k" title="IOCP 채팅 서버 WinAPI 어플리케이션 개발" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

<br>
<br>

### <green1_h3> 배운 점 및 앞으로 수정할 점 </green1_h3>

- IOCP 서버에 구현에 관하여 학습 및 TCP/IP 소켓 프로그래밍을 작성하는 방법을 공부하였습니다.
- WinAPI를 사용하여 클라이언트 및 서버 UI 구현하는 방법을 습득하였습니다.
- STL List 사용하는 방식 학습하였습니다.
