---
layout: post
title: "게임서버실습(1) - 기말 과제(Echo TCP/IP 채팅 서버)"
date: 2023-01-31 23:50:31 +0900
image: https://drive.google.com/thumbnail?id=1tdtL0ira98kAtleTr07iy-NLtYEgE5Og
toc: true
categories: [Server_TP]
tags: [C++, Echo Server, Echo Client, Chatting Progrm]
---

## <server_h2>프로젝트 소개</server_h2>

C++으로 제작한 Echo TCP/IP 채팅 프로그램은 서버와 클라이언트 간의 양방향 통신을 허용합니다. 클라이언트가 서버에 메시지를 보내면 서버가 해당 메시지를 수신하고 그대로 클라이언트에게 다시 보내어 에코 채팅을 실현합니다. Winsock 등의 라이브러리를 활용하여 소켓 통신을 구현하며, 비동기적인 방식으로 여러 클라이언트를 동시에 처리할 수 있습니다.

<br>
<br>

## <server_h2>프로젝트 개요</server_h2>

- <span><server_h5>프로젝트명:</server_h5> Echo TCP/IP 서버-클라이언트 채팅 프로그램 ver.2</span>
- <span><server_h5>과제:</server_h5> 2016년 2학기 게임서버실습(1) 기말 과제</span>
- <span><server_h5>게임 장르:</server_h5> Toy Project</span>
- <span><server_h5>기간:</server_h5> 제작 완료</span>
    - ver.1: 2016.12.05~2016.12.10(제작)
    - ver.2: 2016.12.10~2016.12.19(패킷 디자인 추가)
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

### <server_h3>Echo 서버,클라이언트 채팅 프로그램 제작 ver.1</server_h3><red1_error> (전체 제작 기여도: 100%)</red1_error>

1. WinSocket2 라이브러리를 사용하여 TCP/IP 소캣 통신 프로세스 구현하였습니다.(서버)
2. WaitForSingleObject를 사용하여 뮤텍스 형식의 멀티 스레드 동기화 방식 구현하였습니다.(서버)
3. 내용 없이 엔터를 누르면 접속 종료 조건 구현하였습니다.(클라이언트)

<br>

### <server_h3>패킷 디자인 추가 ver.2</server_h3><red1_error> (전체 제작 기여도: 100%)</red1_error>

1. 패킷 디자인 PacketType  구조체 추가 및 헤더에 따른 로직 처리하였습니다.
2. 서버 편의성을 위한 시간 로그 추가하였습니다. (서버)


<br>

## <server_h2>시퀸스 다이어그램</server_h2>

#### **<server_h3>Echo 서버,클라이언트 채팅 프로그램 제작 ver.1</server_h3>**

![시퀸스]({{ site.google_drive }}1nE_cbaLZZMKboa-tYxLOm9g3emT2_BPw{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}

1. 채팅서버는 클라이언트 접속할 때마다 스레드로 할당해 주어야 합니다.
2. 클라이언트는 스레드로 서버에서부터 받는 recv 보내는 send로  구성되어야 합니다.
3. 오류처리를 try-catch 문으로 작성해야 합니다.


#### **<server_h3>패킷 디자인 추가 ver.2</server_h3>**

![시퀸스]({{ site.google_drive }}1tdtL0ira98kAtleTr07iy-NLtYEgE5Og{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}

1. 패킷은 아이디를 받는 부분과 메시지를 보내는 부분으로 구성을 추가했습니다.

<br>
<br>

## <server_h2> 결과(성과) 및 데모 </server_h2>

#### **<server_h3>Echo 서버,클라이언트 채팅 프로그램 제작 ver.1</server_h3>**
<iframe width="100%" style="aspect-ratio:16/9" src="https://www.youtube.com/embed/jfzdyEIj1hU" title="채팅 서버 제작(화질 개선)" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

#### **<server_h3>패킷 디자인 추가 ver.2</server_h3>**
<iframe width="100%" style="aspect-ratio:16/9" src="https://www.youtube.com/embed/y5QNQ_o9nDI" title="채팅 서버 제작(ver.1.2)" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

- <span><server_h5>성과:</server_h5> 2016년 2학기 게임서버실습(1) 기말 과제 </span>
- <span><server_h5>깃허브(코드):</server_h5> [https://github.com/kj1241/Server_Assignment/tree/main/Game%20Server%20Practice%20(1)](https://github.com/kj1241/Server_Assignment/tree/main/Game%20Server%20Practice%20(1))</span>

<br>
<br>

## <unity_h2> 비고 및 여담 </unity_h2>

- 배운점 및 수정할 점
    - ehco 서버 방식 및 멀티스레드를 사용하여 동기화하는 방법을 학습하였습니다.
    - 클라이언트에서 send와 recv를 스레드로 분리하여 코드작성 하였습니다.
    - 패킷 디자인에 대해 공부하였고 헤더에 따른 로직을 처리 할 수 있게 되었습니다.