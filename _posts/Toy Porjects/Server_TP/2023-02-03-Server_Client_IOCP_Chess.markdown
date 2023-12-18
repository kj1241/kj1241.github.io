---
layout: post
title:  "IOCP TCP/IP 서버를 이용한 체스 판 이동 이벤트 제작"
date: 2023-02-04 16:14:05 +0900
image: https://drive.google.com/uc?export=view&id=10EZdRZOPRR7M0tCOfMJcTU1Ln1C8et7w
toc: true
categories: [Server_TP]
tags: [C++, IOCP Server, IOCP Client, Synchronization]
---

## <green1_h2> 고급웹서버프로그래밍 중간 과제 프로젝트 소개 </green1_h2>

C++으로 구현한 IOCP 기반의 서버-클라이언트 채스판 이동 토이 프로젝트는 비동기 입출력 완료 포트를 사용하여 다중 클라이언트 간의 통신을 지원합니다.  이 프로젝트는 체스보드에서 말의 이동을 클라이언트 간에 전송하고, 서버에서 이를 처리하여 실시간으로 게임 상태를 유지하고 업데이트합니다.  
IOCP를 이용하여 효율적인 네트워크 통신을 구현하여 다수의 클라이언트와의 대화를 처리합니다.  

<br>
<br>

## <green1_h2> 고급웹서버프로그래밍 중간 과제 프로젝트 개요 </green1_h2>

- <span><green1_h5>프로젝트명: </green1_h5> IOCP TCP/IP 서버 클라이언트 제작 </span>
- <span><green1_h5>장르: </green1_h5> 2018년 2학기 고급웹서버프로그래밍 중간 과제 </span>
- <span><green1_h5>기간: </green1_h5> 2018.09.14~2018.09.21 </span>
- <span><green1_h5>플랫폼: </green1_h5> PC(consol)</span>

<br>
<br>

## <green1_h2> 팀 구성 </green1_h2>

- <span><green1_h5>Developer(1명): </green1_h5>IOCP TCP/IP 비동기 통신, 동기화 코드 </span>

<br>
<br>

## <green1_h2> 기술 스택 </green1_h2>

- <span><green1_h5>엔진: </green1_h5> viusal studio 2015 → 2019 </span>
- <span><green1_h5>언어:  </green1_h5> c++ </span>

<br>
<br>

## <green1_h2> 고급웹서버프로그래밍 중간 과제 프로젝트 특징 </green1_h2>

- 키보드 입력 이벤트를 발생 처리
- 클라이언트의 동기화를 위해 서버 로직 처리

<br>
<br>

## <green1_h2> 개발자의 역활 및 경험 </green1_h2>

- **채스판 이동 이벤트 로직 IOCP TCP/IP 서버 제작 (v1.0)** <span><red1_error>(전체 게임 제작 기여도: 100%)</red1_error></span>
    1. 서버 컴퓨터 코어 수를 조사하여 코어수만큼 작업 스레드를 할당
    2. 유후 스레드가 존재하면 유후 스레드에 클라이언트 통신 처리 존재하지 않으면 윈도우 큐 구현 및 처리
    3. 키보드 값을 클라이언트에서 서버로 전송 구현
    4. 서버에서 이동 로직과 물리적 처리를 한후 서버에서 클라이언트 전송 구현
    5. 전송받은 패킷을 이용하여 클라이언트 화면 적용


<br>

### <green1_h3> 다이어 그램 </green1_h3>

![다이어그램](https://drive.google.com/uc?export=view&id=10EZdRZOPRR7M0tCOfMJcTU1Ln1C8et7w){: width="100%" style="aspect-ratio:16/9"}


<br>
<br>

## <green1_h2> 고급웹서버프로그래밍 중간 과제 결과(성과) 및 데모 </green1_h2>

- <span><green1_h5>성과: </green1_h5>2018년 2학기 고급웹서버프로그래밍 중간 과제</span>
- <span><green1_h5>깃 허브(코드): </green1_h5> [https://github.com/kj1241/Server_Assignment/tree/main/Advanced%20Web%20Server%20Programming/IOCPServerAssignments/](https://github.com/kj1241/Server_Assignment/tree/main/Advanced%20Web%20Server%20Programming/IOCPServerAssignments/) </span>
- <green1_h5>유튜브 동영상: </green1_h5>
    <iframe  width="100%" style="aspect-ratio:16/9" src="https://www.youtube.com/embed/hA4AJzZA-Xk" title="IOCP 서버 제작 과제" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

