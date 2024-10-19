---
layout: post
title: "시스템 프로그래밍 실습 - 중간 과제(멀티 프로세스 통신)"
date: 2023-01-31 15:08:46 +09:00
image: https://drive.google.com/thumbnail?id=1oFZn2Hs3d_fpAVByLg_0llVipQWIl04s
toc: true
categories: [Server_TP]
keywords: C++, Multi-Process Communication, Mailbox, System Programming, Windows API, IPC, Parallel Processing
addsence: true
lastmod: 2024-10-07 05:35:40 +09:00
sitemap: 
  changefreq : daily
  priority : 0.7
excerpt: C++을 사용하여 멀티 프로세스 간 통신을 구현한 프로젝트입니다. Mailbox API를 이용해 프로세스 간 효율적인 데이터 교환을 처리했으며, 병렬 처리와 프로세스 동기화를 학습했습니다.
related_links:
    - url: /server_tp/MultiProcess.html

---

## <server_h2>프로젝트 소개</server_h2>

이번 프로젝트는 C++ 언어를 사용해 멀티 프로세스 간의 통신을 구현한 프로젝트입니다. 메일박스(Mailbox) API를 활용해 프로세스 간에 데이터를 효율적으로 교환하며, 이를 통해 병렬 처리와 프로세스 동기화 작업을 배우고 최적화했습니다.

<br>

### <server_h2>프로젝트 설명</server_h2>

멀티 프로세서 통신은 여러 프로세서 간의 효율적인 정보 교환을 가능하게 하는 중요한 기술입니다. 이를 통해 병렬 처리의 장점을 활용하여 빠르고 정확한 계산이 가능해지며, 시스템 자원을 최적화하는 데 도움을 줍니다.

이번 과제는 이러한 멀티 프로세스 통신을 직접 설계하고 구현하는 것을 목표로 하였습니다. 특히, Windows 환경에서 C++과 메일박스를 사용해 프로세스 간 통신을 구현하였으며, 병렬 처리를 통해 데이터를 빠르게 주고받는 시스템을 만들었습니다.

<br>
<br>

## <server_h2>프로젝트 개요</server_h2>

- <span><server_h5>프로젝트명:</server_h5> 멀티 프로세스 통신 구현하기</span>
- <span><server_h5>과제:</server_h5> 2015년 2학기 시스템 프로그래밍 실습 중간 과제</span>
- <span><server_h5>게임 장르:</server_h5> Toy Project</span>
- <span><server_h5>기간:</server_h5> 제작 완료</span>
    - ver.1: 2015.10.05~2015.10.15(제작)
- <span><server_h5>개발 인원:</server_h5> Developer(1명)</span>
- <span><server_h5>개발 언어:</server_h5> C++</span>
- <span><server_h5>플랫폼:</server_h5> PC (Window)</span>

<br>

### <server_h3> 기술 스택 </server_h3>

- <span><server_h5>개발 도구:</server_h5>  Visual Studio 2015 (최종 2019로 업그레이드)  </span>
- <span><server_h5>API:</server_h5> Mailbox API (프로세스 간 통신)  </span>
- <span><server_h5>기술:</server_h5> 병렬 처리, 멀티 프로세스 통신, 비동기 처리 </span>

<br>
<br>

## <server_h2> 프로젝트 특징 및 기능 구현 </server_h2>

프로젝트 특징과 기능 구현 내용입니다.

<br>

### <server_h3>메일박스를 이용한 멀티 프로세스 통신 ver. 1</server_h3><red1_error> (전체 제작 기여도: 100%)</red1_error>

1. 입력 처리:
    - System.IO에서 데이터를 입력받습니다.
    - 이 과정에서 사용자는 특정 명령어를 입력하거나 데이터를 전송할 수 있습니다.
2. IO 프로세스와 메일박스 통신:
    - 입력 이벤트가 발생하면 IO 프로세스는 입력된 데이터를 MailBox API를 통해 IO2 프로세스에 전달합니다.
    - 메일박스를 이용해 데이터를 비동기적으로 주고받는 구조를 채택해 병목현상을 최소화하고, 병렬 처리의 장점을 살렸습니다.
3. IO2와 Chat 프로세스 간의 통신:
    - IO2 프로세스는 IO 프로세스로부터 받은 데이터를 처리한 후, 이를 Chat 프로세스로 전달합니다.
    - 이때 데이터 전달 속도와 정확성을 보장하기 위해 프로세스 간의 동기화와 비동기 처리 방식을 적절히 조합했습니다.
4. 최종 통신 및 결과 처리:
    - Chat 프로세스는 최종적으로 데이터를 받아 사용자가 보낸 메시지나 명령어를 처리하고 응답합니다.
    - 이러한 구조를 통해 멀티 프로세스 간의 통신이 원활하게 이루어졌습니다.

<br>
<br>

## <server_h2>시퀸스 다이어그램</server_h2>

![멀티 프로세스 통신 시퀸스]({{ site.google_drive }}1oFZn2Hs3d_fpAVByLg_0llVipQWIl04s{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<server_h6>멀티 프로세스 통신 시퀸스</server_h6>*

아래 다이어그램은 각 프로세스 간의 통신 흐름을 나타냅니다. 다이어그램을 통해 프로세스 간의 상호작용과 데이터를 주고받는 과정이 명확하게 표현되었습니다.

1. System.IO에서 데이터를 입력합니다.
2. IO 프로세스가 메일박스를 통해 IO2 프로세스로 데이터를 전달합니다.
3. IO2 프로세스는 이를 다시 Chat 프로세스로 넘겨 최종적으로 통신이 이루어집니다.

<br>
<br>

## <server_h2> 결과(성과) 및 데모 </server_h2>

<iframe  width="100%" style="aspect-ratio:16/9" src="https://www.youtube.com/embed/cOH9jgKtj8k" title="Multi-Process Communication Using Mailbox API - C++ System Programming Project" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

- <span><server_h5>성과:</server_h5> 2015년 2학기 시스템 프로그래밍 실습 중간 과제 </span>
- <span><server_h5>깃허브(코드):</server_h5> [kj124-Server_Portfolio GitHub 저장소](https://github.com/kj1241/Server_Portfolio/tree/main/System%20Programming/MultiProcess)</span>

<br>
<br>

## <server_h2> 비고 및 여담 </server_h2>

- 배운점:
    - MailBox API를 사용하여 멀티 프로세스 통신을 구현하는 방법을 익혔습니다.
    - 프로세스 간의 동기화 문제를 해결하기 위해 다양한 비동기 기법을 적용해보았습니다.
    - 아쉬운 점은 복잡한 기능을 구현하는 데에 집중하지 못하고, 기본적인 통신에 그친 점입니다. 향후에는 더 복잡한 시나리오를 적용해보고 싶습니다.
- 여담:
    - 이번 프로젝트를 통해 멀티 프로세스 통신의 개념을 깊이 이해하게 되었으며, 특히 메일박스 API를 통한 프로세스 간의 비동기 통신 방법을 익혔습니다. 또한, 병렬 처리 환경에서 어떻게 자원을 최적화하고 통신 효율을 높일 수 있을지에 대한 구체적인 경험을 쌓을 수 있었습니다.