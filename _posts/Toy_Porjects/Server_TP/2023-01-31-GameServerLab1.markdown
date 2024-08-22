---
layout: post
title: "게임서버실습(1) - 일반 과제"
date: 2023-01-31 22:50:31 +0900
image: https://drive.google.com/thumbnail?id=17Q-N5pqqphxCrkkxczaSHcxZLKordf0U
toc: true
categories: [Server_TP]
tags: [C++, Game Server]
keywords: C++, Game Server
related_links:
    - url: /server_tp/GameServerLab1_FinalExam.html
---

## <server_h2>프로젝트 소개</server_h2>

대학교 시절 게임 서버 실습(1) 학과 과제 모음입니다. 당시에는 프로젝트를 완성시키는 것 빼고 크게 관심이 없어서 코드가 더러울 수 있습니다. 양해해 주시면 감사하겠습니다.

<br>
<br>

## <server_h2>프로젝트 개요</server_h2>

- <span><server_h5>프로젝트명:</server_h5> 게임서버실습(1) 과제 </span>
- <span><server_h5>과제:</server_h5> 2016년 2학기 게임서버실습(1) 일반 과제</span>
- <span><server_h5>게임 장르:</server_h5> Toy Project</span>
- <span><server_h5>기간:</server_h5> 제작 완료</span>
    - ver.1: 2016.09.03~2016.12.10(제작)
- <span><server_h5>개발인원:</server_h5> Developer(1명)</span>
- <span><server_h5>플랫폼:</server_h5> PC (Window)</span>

<br>

### <server_h3> 기술 스택 </server_h3>

- <span><server_h5>개발 도구:</server_h5> viusal studio 2015 → 2019  </span>
- <span><server_h5>개발 언어:</server_h5> c++  </span>

<br>
<br>

## <server_h2> 프로젝트 특징 및 기능 구현 </server_h2>

개인적으로 공부했던 부분을 제작하여 제출한 과제들 입니다. 
1. 해당 코드들은 error C4996을 해결 한 코드들 입니다. 
2. 유니코드로 작성하여 콘솔에서 한글이 출력이 되지 않아서 std::wcout.imbue(std::locale("kor")); 찾아서 트레블 슈팅을 하였습니다.


<br>

### <server_h3> 접속한 클라이언트 IP 확인하기 </server_h3>

![inet_ntop]({{ site.google_drive }}1ilFLWq79V7bSQPTvUGRVxZ6XgBurloOU{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<unity_h6>inet ntop</unity_h6>*

원래는 inet_ntoa()를 사용해서 접속한 클라이언트 ip를 찾았지만, inet_ntoa()는 더 이상 사용되지 않음으로 C4996 error가 발생합니다. 따라서 inet_ntoa() 대신 inet_ntop()를 사용하여 접속한 클라이언트 ip를 찾는 방법을 작성했습니다.

<br>

### <server_h3> ByteOrder </server_h3>

![ByteOrder]({{ site.google_drive }}1EEuiHTwqgb_LQ0_yGBtnRGgfvPk3TlNc{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<unity_h6>Byte Order</unity_h6>*

호스트 바이트를 네트워크 바이트 변환하는 방법을 구현했습니다. 즉, 리틀 엔디안인 호스트 바이트를 네트워크 통신하기 위해서 빅 엔디안으로 변경하는 방법에 대해서 코드를 작성하였습니다.

<br>

### <server_h3> IPAddr </server_h3>

![IPAddr]({{ site.google_drive }}1MFK4RgAcXGbLUbJsfAe_evUFYjZrdaXp{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<unity_h6>IPAddr → InetPton</unity_h6>*

IP주소를 빅엔디안의 네트워크 주소로 변환시키는데 IPAddr()코드는 보안상의 이후로 더 이상 사용되지 않습니다. 따라서 최신 규정에 마춰서 InetPton() 코드를 바꿨습니다.

<br>

### <server_h3> NameResolution </server_h3>

![NameResolution]({{ site.google_drive }}1t7DwL10nXVdH8pfyMvZKkQfy2FUbQEwh{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<unity_h6>NameResolution</unity_h6>*

도메인 주소를 ip로 변환 시키는 코드입니다. 기존에는 gethostbyname() 코드를 사용하여 변환했지만, 해당 코드는 ipv4 전용입니다. 따라서 ipv6도 지원해야하기 때문에 더 이상 사용되지 않습니다. gethostbyname() 대신 getaddrinfo()로 변경하여 작성하였습니다. 또한 유니코드를 사용하기 떄문에 getaddrinfo()을 유니코드 전용인 GetAddrInfoW()로 사용하였습니다.

<br>

### <server_h3> TCP Server - TCP client </server_h3>

![TCP]({{ site.google_drive }}1qFkMvfIu1Kdmye86FETTkExF86Pl7sjC{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<unity_h6>TCP server - client</unity_h6>*

TCP프로토콜을 사용하여 서버와 클라이언트 통신하는 것을 구현하였습니다. 유니코드 사용하여 전송할 수 있습니다.

<br>

### <server_h3> TCP_FixedVariable </server_h3>

![TCP_FixedVariable]({{ site.google_drive }}1Ilukv5y-QhMXsh53T-bQzh8TgD6Ui9rG{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<unity_h6>TCP FixedVariable</unity_h6>*

위의 코드는 고정 버퍼 크기로 데이터를 보냈다면, 해당 코드는 가변 데이터를 보내기 위해서 처음 고정 데이터의 크기만큼 데이터를 보내줍니다. 그 후 가변 크기의 데이터를 보내줍니다.

<br>

### <server_h3> UDP Server - UDP client </server_h3>

![UDP]({{ site.google_drive }}1srct8CVWhnWCBqnykrQBa9ekehXxQz6V{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<unity_h6>UDP server - client</unity_h6>*

UDP프로토콜을 사용하여 서버와 클라이언트 통신하는 것을 구현하였습니다. 유니코드 사용하여 전송할 수 있습니다.

<br>

### <server_h3> Broadcast Sander - Broadcast Receiver </server_h3>

![Broadcast]({{ site.google_drive }}1zhzGy3UjKsa16vuVRHoWR1ZfnSZtUCoc{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<unity_h6>Broadcast Sander - Receiver</unity_h6>*

네트워크의 모든 사용자에게 데이터를 전송하는 Broadcast를 사용하여 센더와 리시브 통신하는 것을 구현하였습니다. 


<br>

### <server_h3> Multicast Sander - Broadcast Receiver </server_h3>

![Multicast]({{ site.google_drive }}1xyCYR6NuNhq0kiwpWOoMQqTTwbLvzdhk{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<unity_h6>Multicast Sander - Receiver</unity_h6>*

멀티 캐스트 그룹으로 묶인 사용자에게 데이터를 전송하는 Multicast를 사용하여 센더와 리시브 통신하는 것을 구현하였습니다. 


<br>

### <server_h3> CriticalSection </server_h3>

![CriticalSection]({{ site.google_drive }}1vVaMd7RFapMsvsU6vcmZaYONHMuua_lo{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<unity_h6>CriticalSection</unity_h6>*

멀티 스레드를 사용하고 데이터 동기화를 위해서 크리티컬 섹션(임계영역)을 사용하여 구현하였습니다.

<br>

### <server_h3> Event </server_h3>

![Event]({{ site.google_drive }}1GSjnnfziyyDs6VLW1Y_Ad5KYY35_xXzk{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<unity_h6>Event</unity_h6>*

멀티 스레드를 사용하고 데이터 동기화를 위해서 이벤트를 사용하여 구현하였습니다.

<br>

### <server_h3> NonblockTCP </server_h3>

![NonblockTCP]({{ site.google_drive }}1j6V5iYJb8X2Ni6sAz6rGlbsvi1p8h7p1{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<unity_h6>Nonblock TCP</unity_h6>*

입출력 모델인 넌블로킹 모델으로 작성된 코드입니다. 장점으로는  데드락 상태가 발생하지 않습니다. 또한 소켓과 관련없는 작업도 가능합니다. 단점으로는 오류 코드를 확인 하고 처리해야함으로 코드가 복잡해지고 CPU 사용률이 매우 높습니다.


<br>

### <server_h3> SelectTCP </server_h3>

![SelectTCP]({{ site.google_drive }}17LNo2HUdan1lVK1gO9j1n7pgWY3x5Jc3{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<unity_h6>Select TCP</unity_h6>*

입출력 모델인 셀렉트 모델으로 작성된 코드입니다. 논블록킹 소켓보다는 CPU점유율이 줄어든 것을 알수 있습니다. 하지만 소켓의 정보를 관리해 주지 않기 때문에 피룡한 기능은 구현해야합니다.

<br>

### <server_h3> EvnetSelectTCP </server_h3>

![EvnetSelectTCP]({{ site.google_drive }}1aTYSXX7HbbYy0Yc8qS_RAEgrrdReNaR-{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<unity_h6>EvnetSelect TCP</unity_h6>*

입출력 모델인 이벤트 셀렉트 모델으로 작성된 코드입니다. 전반적으로 이벤트 모델과 같지만, 소켓에서 발생한 문제나 에러사항등을 이벤트를 네트워크 이벤트로 알려주기 때문에 유용합니다.

<br>

### <server_h3> OverlappedTCP </server_h3>

![OverlappedTCP]({{ site.google_drive }}1NLUCFT9BrAk8rPsr4PQ79twEipCMd_M7{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<unity_h6>Overlapped TCP</unity_h6>*

운영체제 고성능 파일 입출력을 위해 만들어진 overlapped 방식을 이용하여 만든 overlapped 모델은 비동기 입출력 입니다. 즉 운영체제 단에서 콜백 함수를 통해서 입출력 통지를 받게 됩니다. 해당 영상을 보면 클라이언트가 종료될때 잠시동안 cpu 점유율이 올라간 것을 알 수 있습니다.

<br>

### <server_h3> CompletionPortTCP </server_h3>

![CompletionPortTCP]({{ site.google_drive }}17Q-N5pqqphxCrkkxczaSHcxZLKordf0U{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<unity_h6>CompletionPort TCP</unity_h6>*

운영체제가 제공하는 입출력 모델인 CompletionPort모델은 비동기 작업으로서 운영체제는 입룩력 완료 포트에 결과를 저장하고 대기중인 스레드를 꺠워서 처리하게 결과를 처리하게 됩니다.

<br>
<br>

## <unity_h2> 결과(성과) 및 데모 </unity_h2>

- <span><unity_h5>성과:</unity_h5> 2016년 2학기 게임서버실습(1) 일반 과제 </span>
- <span><unity_h5>깃허브(코드):</unity_h5> 공개 예정</span>


<br>
<br>

## <unity_h2> 비고 및 여담 </unity_h2>

- 배운점
    1. 클라이언트와 서버사이에 소켓 통신하는 방법에 대해서 이해하게 되었습니다.
    2. TCP/UDP 프로토콜을 사용하여 소켓을 작성하는 방법에 대해서 알게 되었습니다.
    3. 입출력 모델들의 사용 방법과 구현 방법에 대해서 알게 되었습니다. (어짜피 IOCP 밖에 사용 안하지 않나...)

<br>

---

<br>

###### <unity_h6>교제:</unity_h6> TCP/IP 윈도우 소켓 프로그래밍
