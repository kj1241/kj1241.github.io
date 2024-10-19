---
layout: post
title: "게임서버실습(1) - 일반 과제"
date: 2023-01-31 22:50:31 +09:00
image: https://drive.google.com/thumbnail?id=17Q-N5pqqphxCrkkxczaSHcxZLKordf0U
toc: true
categories: [Server_TP]
keywords: 게임 서버, TCP/IP, Winsock, 소켓 프로그래밍, 네트워크 프로그래밍, 게임 서버, 멀티스레딩, 브로드캐스트, 멀티캐스트
addsence: true
lastmod: 2024-10-07 05:20:40 +09:00
sitemap: 
  changefreq : daily
  priority : 0.7
excerpt: C++로 작성한 네트워크 소켓 과제입니다. TCP/UDP 프로토콜을 사용한 서버-클라이언트 통신, 멀티스레드 및 비동기 I/O 모델을 구현한 프로젝트입니다.
related_links:
    - url: /server_tp/GameServerLab1_FinalExam.html
---

## <server_h2>프로젝트 소개</server_h2>

이 프로젝트는 제가 대학교에서 수강한 "게임서버실습(1)" 수업의 과제들로 구성된 네트워크 소켓 프로그래밍 프로젝트입니다. C++을 사용하여 TCP/IP 기반의 서버-클라이언트 통신을 구현했으며, TCP/UDP 프로토콜을 활용한 다양한 입출력 모델과 멀티스레드 기술을 적용했습니다.

주요 내용은 클라이언트와 서버 간의 데이터 송수신을 다루며, 비동기 I/O와 멀티스레드 처리를 통해 성능을 최적화하는 방법을 학습했습니다. 이 과제를 통해 네트워크 프로그래밍의 기초부터 고급 기술인 IOCP, 브로드캐스트, 멀티캐스트 통신 등을 실습할 수 있었습니다.

당시 완성도가 부족할 수 있으나, 네트워크 통신의 기초와 다양한 프로토콜 및 입출력 모델을 실습한 프로젝트입니다. 최신 API로 업데이트된 코드와 함께 다양한 기능을 다루고 있습니다.

<br>
<br>

## <server_h2>프로젝트 개요</server_h2>

- <span><server_h5>프로젝트명:</server_h5> 게임서버실습(1) 과제 </span>
- <span><server_h5>과제:</server_h5> 2016년 2학기 게임서버실습(1) 일반 과제</span>
- <span><server_h5>게임 장르:</server_h5> Toy Project</span>
- <span><server_h5>기간:</server_h5> 제작 완료</span>
    - ver.1: 2016.09.03~2016.12.10(제작)
- <span><server_h5>개발 인원:</server_h5> Developer(1명)</span>
- <span><server_h5>개발 언어:</server_h5> C++</span>
- <span><server_h5>플랫폼:</server_h5> PC (Window)</span>

<br>

### <server_h3> 기술 스택 </server_h3>

- <span><server_h5>개발 도구:</server_h5> Visual Studio 2015 (최종 2019로 업그레이드)  </span>
- <span><server_h5>라이브러리:</server_h5> WinSocket2 </span>
- <span><server_h5>멀티스레딩네트워크 프로토콜:</server_h5> TCP 및 UDP를 사용하여 안정적인 서버-클라이언트 통신 구현 </span>
- <span><server_h5>멀티스레딩:</server_h5> WaitForSingleObject와 Mutex를 사용해 스레드 동기화 처리 </span>
- <span><server_h5>비동기 입출력:</server_h5> Overlapped I/O 모델을 사용하여 비동기 통신 구현 </span>
- <span><server_h5>패킷 전송:</server_h5> 클라이언트와 서버 간 패킷 구조 설계 및 처리 </span>

<br>
<br>

## <server_h2> 프로젝트 특징 및 기능 구현 </server_h2>

해당 과제는 개인적으로 공부하며 작성한 네트워크 소켓 프로그램입니다. 코드는 최신 표준을 준수하도록 개선하였으며, 다음과 같은 기능을 포함합니다:
1. C4996 에러 해결: 사용되지 않는 API를 최신 대체 함수로 교체하였습니다.
2. 한글 출력 문제 해결: 유니코드 환경에서 콘솔 한글 출력을 위해 std::wcout.imbue(std::locale("kor"))를 적용하여 문제를 해결했습니다.

<br>

### <server_h3> 기초 구현 </server_h3>

#### <server_h4> 접속한 클라이언트 IP 확인 </server_h4>

![inet_ntop]({{ site.google_drive }}1ilFLWq79V7bSQPTvUGRVxZ6XgBurloOU{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<server_h6>inet ntop</server_h6>*

기존에는 inet_ntoa()로 클라이언트 IP를 확인했으나, 더 이상 사용되지 않으므로 inet_ntop()로 대체하였습니다. 이 과정에서 발생한 문제들과 해결 방법을 설명합니다.

#### <server_h4> 바이트 오더(Byte Order) 변환 </server_h4>

![ByteOrder]({{ site.google_drive }}1EEuiHTwqgb_LQ0_yGBtnRGgfvPk3TlNc{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<server_h6>Byte Order</server_h6>*

리틀 엔디안(호스트 바이트 오더)을 네트워크 전송을 위한 빅 엔디안으로 변환하는 코드를 작성했습니다. 네트워크 통신에서 중요한 이 변환 과정을 자세히 다룹니다.

#### <server_h4> IP 주소 변환 </server_h4>

![IPAddr]({{ site.google_drive }}1MFK4RgAcXGbLUbJsfAe_evUFYjZrdaXp{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<server_h6>IPAddr → InetPton</server_h6>*

이전 버전의 IPAddr() 대신, 보안상의 이유로 더 이상 사용되지 않는 함수들을 최신 함수인 InetPton()으로 대체하여, IP 주소를 네트워크 바이트 오더로 변환하는 방법을 구현했습니다.

#### <server_h4> 도메인 네임 해석(Name Resolution) </server_h4>

![NameResolution]({{ site.google_drive }}1t7DwL10nXVdH8pfyMvZKkQfy2FUbQEwh{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<server_h6>NameResolution</server_h6>*

도메인 주소를 IP 주소로 변환하는 작업을 위해 gethostbyname() 대신 getaddrinfo()를 사용하였습니다. 이로써 IPv4뿐만 아니라 IPv6도 지원합니다. 또한 유니코드를 지원하기 위해 GetAddrInfoW()를 사용하여 네트워크 관련 문제들을 해결했습니다.

<br>

### <server_h3> 통신 프로토콜 구현 </server_h3>

#### <server_h4> TCP 서버 - 클라이언트 </server_h4>

![TCP server & client]({{ site.google_drive }}1qFkMvfIu1Kdmye86FETTkExF86Pl7sjC{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<server_h6>TCP server - client</server_h6>*

TCP 프로토콜을 활용하여 서버와 클라이언트 간의 통신을 구현하였으며, 유니코드로 데이터를 송수신할 수 있도록 작성했습니다.

#### <server_h4> 고정/가변 데이터 전송(TCP Fixed/Variable) </server_h4>

![TCP_FixedVariable]({{ site.google_drive }}1Ilukv5y-QhMXsh53T-bQzh8TgD6Ui9rG{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<server_h6>TCP FixedVariable</server_h6>*

고정된 버퍼 크기로 데이터를 전송하는 방식 외에도, 가변 크기의 데이터를 전송하는 방법을 구현하여 유연한 데이터 전송을 가능하게 했습니다.

#### <server_h4> UDP 서버 - 클라이언트 </server_h4>

![UDP server & client]({{ site.google_drive }}1srct8CVWhnWCBqnykrQBa9ekehXxQz6V{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<server_h6>UDP server - client</server_h6>*

UDP 프로토콜을 통해 서버와 클라이언트 간의 통신을 구현하였습니다. TCP와 달리 비연결형 통신을 다루며, 유니코드 데이터를 전송할 수 있는 코드를 작성했습니다.

#### <server_h4> 브로드캐스트(Broadcast) 통신 </server_h4>

![Broadcast Sander & Receiver]({{ site.google_drive }}1zhzGy3UjKsa16vuVRHoWR1ZfnSZtUCoc{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<server_h6>Broadcast Sander - Receiver</server_h6>*

네트워크 상의 모든 사용자에게 데이터를 전송하는 Broadcast 기능을 구현했습니다. 이를 통해 간단한 멀티캐스트 기능도 시험했습니다.

#### <server_h4> 멀티캐스트(Multicast) 통신 </server_h4>

![Multicast Sander & Receiver]({{ site.google_drive }}1xyCYR6NuNhq0kiwpWOoMQqTTwbLvzdhk{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<server_h6>Multicast Sander - Receiver</server_h6>*

멀티캐스트 그룹을 통해 특정 사용자들에게만 데이터를 전송하는 기능을 구현했습니다. 멀티캐스트는 특정 그룹 내에서만 데이터를 주고받는 방식으로, 보다 효율적인 네트워크 자원 사용을 가능하게 합니다. 

<br>

### <server_h3> 멀티스레딩 및 동기화 </server_h3>

#### <server_h4> 크리티컬 섹션(Critical Section) </server_h4>

![CriticalSection]({{ site.google_drive }}1vVaMd7RFapMsvsU6vcmZaYONHMuua_lo{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<server_h6>CriticalSection</server_h6>*

멀티스레드 환경에서 데이터 동기화를 위해 크리티컬 섹션을 사용하였습니다. 이로써 여러 스레드가 동시에 동일한 데이터에 접근하지 못하게 하여 데이터 불일치를 방지합니다.

#### <server_h4> 멀티스레딩 및 동기화 - 이벤트(Event) 동기화 </server_h4>

![Event]({{ site.google_drive }}1GSjnnfziyyDs6VLW1Y_Ad5KYY35_xXzk{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<server_h6>Event</server_h6>*

멀티스레드에서 이벤트 기반으로 동작을 관리하기 위한 코드를 작성하였습니다. 이벤트를 통해 스레드 간의 동기화를 보다 효율적으로 처리하였습니다.

<br>

### <server_h3> 비동기 입출력 모델 </server_h3>

#### <server_h4> 논블로킹 TCP(Nonblocking TCP) </server_h4>

![NonblockTCP]({{ site.google_drive }}1j6V5iYJb8X2Ni6sAz6rGlbsvi1p8h7p1{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<unity_h6>Nonblock TCP</unity_h6>*

논블로킹 방식으로 입출력을 처리하는 코드입니다. 이 방식은 데드락을 방지하고 소켓 외의 작업도 병행할 수 있지만, 처리 복잡도와 CPU 사용량이 증가하는 단점이 있습니다.

#### <server_h4> 셀렉트 TCP(Select TCP) </server_h4>

![SelectTCP]({{ site.google_drive }}17LNo2HUdan1lVK1gO9j1n7pgWY3x5Jc3{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<unity_h6>Select TCP</unity_h6>*

입출력 모델인 셀렉트 모델으로 작성된 코드입니다. 논블록킹 소켓보다는 CPU점유율이 줄어든 것을 알수 있습니다. 하지만 소켓의 정보를 관리해 주지 않기 때문에 피룡한 기능은 구현해야합니다.

#### <server_h4> 이벤트 셀렉트 TCP(EvnetSelectTCP) </server_h4>

![EvnetSelectTCP]({{ site.google_drive }}1aTYSXX7HbbYy0Yc8qS_RAEgrrdReNaR-{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<unity_h6>EvnetSelect TCP</unity_h6>*

입출력 모델인 이벤트 셀렉트 모델으로 작성된 코드입니다. 전반적으로 이벤트 모델과 같지만, 소켓에서 발생한 문제나 에러사항등을 이벤트를 네트워크 이벤트로 알려주기 때문에 유용합니다.

#### <server_h4> 오버랩드 모델(Overlapped TCP) </server_h4>

![OverlappedTCP]({{ site.google_drive }}1NLUCFT9BrAk8rPsr4PQ79twEipCMd_M7{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<unity_h6>Overlapped TCP</unity_h6>*

운영체제 고성능 파일 입출력을 위해 만들어진 overlapped 방식을 이용하여 만든 overlapped 모델은 비동기 입출력 입니다. 즉 운영체제 단에서 콜백 함수를 통해서 입출력 통지를 받게 됩니다. 해당 영상을 보면 클라이언트가 종료될때 잠시동안 cpu 점유율이 올라간 것을 알 수 있습니다.

#### <server_h4> 완료 포트 모델(Completion Port TCP) </server_h4>

![CompletionPortTCP]({{ site.google_drive }}17Q-N5pqqphxCrkkxczaSHcxZLKordf0U{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<unity_h6>CompletionPort TCP</unity_h6>*

입출력 완료 포트를 사용하는 비동기 모델로, 운영체제가 입출력 완료 여부를 포트에 저장하고 대기 중인 스레드를 깨워 작업을 처리하는 방식입니다. 높은 성능을 자랑하는 입출력 처리 모델입니다.

<br>
<br>

## <unity_h2> 결과(성과) 및 데모 </unity_h2>

- <span><unity_h5>성과:</unity_h5> 2016년 2학기 게임서버실습(1) 일반 과제 </span>
- <span><unity_h5>데모:</unity_h5> TCP/UDP 통신, 멀티캐스트, 브로드캐스트 통신, 비동기 입출력 모델 등 다양한 네트워크 통신 방식을 구현하여 시연할 수 있습니다. 각 기능은 서버-클라이언트 환경에서 정상적으로 작동하며, 데모는 콘솔 환경에서 실행됩니다.</span>
- <span><unity_h5>깃허브(코드):</unity_h5> [kj124-Server_Portfolio GitHub 저장소](https://github.com/kj1241/Server_Portfolio/tree/main/Game%20Server%20Practice%20(1)/GameServerPractice1%20Portfolio)</span>

<br>
<br>

## <server_h2> 비고 및 여담 </server_h2>

- 배운점

    1. **소켓 통신의 이해:** 클라이언트와 서버 간의 기본적인 소켓 통신 구조를 이해하고, TCP/UDP 프로토콜을 활용한 네트워크 프로그래밍 방법을 배웠습니다.
    2. **다양한 입출력 모델 적용:** 비동기 입출력(IOCP), 넌블로킹, 오버랩드, 셀렉트 모델 등 다양한 입출력 방식을 적용하며 각 방식의 장단점을 비교할 수 있었습니다.
    3. **최신 기술 적용:** 더 이상 사용되지 않는 API를 최신 API로 대체하면서, 최신 네트워크 프로그래밍 규격을 반영할 수 있었습니다. 특히 IPv6를 지원하는 함수를 사용한 점이 유익했습니다.

    - 교재: "TCP/IP 윈도우 소켓 프로그래밍"을 기반으로 학습하였으며, 이 프로젝트를 통해 이론을 실습으로 연결할 수 있었습니다.

- 여담
    - 이 프로젝트는 TCP/IP 기반의 소켓 통신을 심도 있게 다룬 과제입니다. 네트워크 프로그래밍에 입문하거나, 입출력 모델에 대해 배우고자 하는 분들께 좋은 참고 자료가 될 것입니다.
    - 해당 프로젝트에서는 Winsock2 라이브러리를 통해 클라이언트와 서버 간의 TCP/IP 통신을 처리하며, 안정적인 데이터 송수신을 위한 다양한 프로토콜을 사용했습니다. 각 클라이언트의 요청을 처리하기 위해 멀티스레드 환경을 구축하였으며, WaitForSingleObject와 Mutex를 활용해 스레드 동기화 문제를 해결했습니다.


