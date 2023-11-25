---
layout: post
title:  "Echo TCP/IP 서버-클라이언트 채팅 프로그램 제작(v 1.2)"
date:   2023-01-31 23:50:31 +0900
image: https://github.com/kj1241/kj1241.github.io/assets/22047442/aa72d382-2c3f-4e46-887c-eb4ab9d7e785
toc: true
categories: [Server_TP]
tags: [C++, Echo Server, Echo Client, Chatting Progrm]
---

<h2><green1_h2> 토이 프로젝트 소개 </green1_h2></h2>
C++으로 제작한 Echo TCP/IP 채팅 프로그램은 서버와 클라이언트 간의 양방향 통신을 허용합니다.  
클라이언트가 서버에 메시지를 보내면 서버가 해당 메시지를 수신하고 그대로 클라이언트에게 다시 보내어 에코 채팅을 실현합니다.  
Winsock 등의 라이브러리를 활용하여 소켓 통신을 구현하며, 비동기적인 방식으로 여러 클라이언트를 동시에 처리할 수 있습니다.

<br>
<br>
<h2><green1_h2> 토이 프로젝트 개요 </green1_h2></h2><ul>
<li><h5><green1_h5>프로젝트명: </green1_h5><span> Echo TCP/IP 서버-클라이언트 채팅 프로그램(v1.2)</span></h5></li>
<li><h5><green1_h5>장르: </green1_h5><span> 2016년 2학기 게임서버실습(1) 기말 과제</span></h5></li>
<li><h5><green1_h5>기간: </green1_h5><span> 2016.12.05~2016.12.19</span></h5></li>
<li><h5><green1_h5>플랫폼: </green1_h5><span> PC(consol) </span></h5></li></ul>

<br>
<br>
<h2><green1_h2> 팀 구성 </green1_h2></h2><ul> 
<li><h5><green1_h5>Developer(1명): </green1_h5><span> Echo 채팅 서버 구현, 채팅 클라이언트 구현, 동기화 구현, 오류처리 사용  </span></h5></li>
</ul>

<br>
<h2><green1_h2> 기술 스택 </green1_h2></h2><ul>
<li><h5><green1_h5>엔진: </green1_h5><span> viusal studio 2015 → 2019 </span></h5></li>
<li><h5><green1_h5>언어: </green1_h5><span> c++  </span></h5></li>
</ul>

<br>
<br>
<h2 ><green1_h2> 토이 프로젝트 특징 </green1_h2></h2>
- Echo 서버와 클라이언트가 통신하여 클라이언트 간에 채팅을 주고 받는 방식을 알 수 있습니다.
- 서버 통신 패킷 제작 방식에대해 알 수 있습니다.

<br>
<h3 ><green1_h3> 토이 프로젝트 주제 </green1_h3></h3>
1. 채팅서버는 클라이언트 접속할 때마다 스레드로 할당해 주어야 합니다.
2. 클라이언트는 스레드로 서버에서부터 받는 recv 보내는 send로  구성되어야 합니다.
3. 패킷은 아이디를 받는 부분과 메시지를 보내는 부분으로 구성되어야 합니다.
4. 오류처리를 try-catch 문으로 작성해야 합니다.


<br>
<br>
<h2><green1_h2> 개발자의 역활 및 경험 </green1_h2></h2>
- **Echo 서버,클라이언트 채팅 프로그램 제작(v1.0)** <span><red1_error>(전체 게임 제작 기여도: 100%)</red1_error></span>
    1. WinSocket2 라이브러리를 사용하여 TCP/IP 소캣 통신 프로세스 구현 (서버)
    2. WaitForSingleObject를 사용하여 뮤텍스 형식의 멀티 스레드 동기화 방식 구현 (서버)
    3. 내용 없이 엔터를 누르면 접속 종료 조건 구현(클라이언트)

- **채팅 프로그램 패킷 디자인 추가 (v1.2)**<span><red1_error>(전체 게임 제작 기여도: 100%)</red1_error></span>
    1. 패킷 디자인 PacketType  구조체 추가 및 헤더에 따른 로직 처리
    2. 서버 편의성을 위한 시간 로그 추가 (서버)

<br>
<h3><green1_h3> 다이어 그램 </green1_h3></h3>
![다이어 그램](https://github.com/kj1241/kj1241.github.io/assets/22047442/811b8a3d-8cf9-4a91-9db8-f434c8b8c582){: width="740" height="450"}


<br>
<h3><green1_h3> 패킷 디자인(v1.2) </green1_h3></h3>
![패킷 디자인](https://github.com/kj1241/kj1241.github.io/assets/22047442/aa72d382-2c3f-4e46-887c-eb4ab9d7e785){: width="740" }


<br>
<br>
<h2><green1_h2> 결과(성과) 및 데모 </green1_h2></h2>
<ul>
<li><h5><green1_h5>성과: </green1_h5><span> 2016년 2학기 게임서버실습(1) 기말 과제 </span></h5></li>
<li><h5><green1_h5>깃 허브(코드): </green1_h5>
<p>v.1.0 채팅 프로그램 제작: <a href="https://github.com/kj1241/Server_Assignment/tree/main/Game%20Server%20Practice%20(1)/ChattingServer/">https://github.com/kj1241/Server_Assignment/tree/main/Game%20Server%20Practice%20(1)/ChattingServer/ </a>
v.1.2 패킷 디자인 추가: <a href="https://github.com/kj1241/Server_Assignment/tree/main/Game%20Server%20Practice%20(1)/ChattingServer(ver.1.2)/">https://github.com/kj1241/Server_Assignment/tree/main/Game%20Server%20Practice%20(1)/ChattingServer(ver.1.2)/ </a> </p></h5></li>
<li><h5><green1_h5>유튜브 동영상: </green1_h5></h5> 
v 1.0 채팅 프로그램 제작:  
<iframe width="700" height="400" src="https://www.youtube.com/embed/jfzdyEIj1hU" title="채팅 서버 제작(화질 개선)" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

v1.2 패킷 디자인 추가: 
<iframe width="700" height="400" src="https://www.youtube.com/embed/y5QNQ_o9nDI" title="채팅 서버 제작(ver.1.2)" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
</li>
</ul>

<br>
<h3><green1_h3> 배운 점 및 앞으로 수정할 점 </green1_h3></h3>
- ehco 서버 방식 및 멀티스레드를 사용하여 동기화하는 방법을 학습하였습니다.
- 클라이언트에서 send와 recv를 스레드로 분리하여 코드작성 하였습니다.
- 패킷 디자인에 대해 공부하였고 헤더에 따른 로직을 처리 할 수 있게 되었습니다.
