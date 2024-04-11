---
layout: post
title: "WakeOnLan 에러 해결하기"
date: 2023-02-06 15:45:29 +09:00
image: https://drive.google.com/thumbnail?id=1T-j0j8smk65Xicsiu-s_wQvs0GTTEy5Y
toc: true
categories: [Network]
keywords: WakeOnLan, ARP table, 매직 패킷 에러 해결, 인터넷 5계층
addsence: true
lastmod: 2024-04-04 15:13:00 +09:00
sitemap:
  changefreq : daily
  priority : 1.0
excerpt: 이 글은 WakeOnLan(WOL) 기술을 사용할 때 발생할 수 있는 문제를 해결하는 방법에 대한 설명입니다. 내부망에서 특정 컴퓨터를 부팅시키는데 성공했으나, 시간이 지나면 실패하는 상황에 대처하기 위해 ARP table의 IP와 MAC 주소를 정적 할당하는 방법을 제시합니다.

---

<span><red1_error>※주의사항: </red1_error> WakeOnLan 기술에 들어가는 하드웨어 매직 패킷 설정을 찾으러 오신 분은 다른 블로그를 검색해 주시면 감사하겠습니다.</span>

<br>
<br>

## <server_h2>1. 요약 </server_h2>

<server_h5>에러 증상:</server_h5> 허브를 이용하는 내부망에서 특정 IP로 WakeOnLan의 매직 패킷을 컴퓨터로 보내는 순간 성공했으나, 컴퓨터 종료 후 시간 지나면 WakeOnLan을 사용하여 컴퓨터 부팅을 작동시킬 수 없는 상황
해결 방안: ARP table의 IP와 MAC 주소를 동적 할당 에서 정적 할당으로 변환하시면 됩니다. 
  
<br>
<br>

## <server_h2>2. WakeOnLan 문제 해결: 논리적인 해결 과정</server_h2>

제가 이슈에 관해서 논리적으로 말하겠다고 생각을 정리하지 않으면 논리의 비약이 자주 일어나기 때문에, 한번은 WakeOnLan 문제 ARP table 이야기를 한다고 한번 혼나고 제대로 설명 안 해준다고 두 번 혼난 적이 있습니다. 그러므로 생각을 정리하면서 WakeOnLan 문제와 ARP table이 무슨 연관관계를 가졌는지 확인해 봅시다.

<br>

### <server_h3>1) WakeOnLan </server_h3>

WakeOnLan을 지원하는 컴퓨터의 Mac 주소가 포함된 네트워크 카드에 매직 패킷이 도착하면 머더보드의 3핀에서 잔류 전력을 일으켜 컴퓨터를 부팅시켜 주는 기능을 이야기합니다.

<br>

## <server_h2>3. WakeOnLan의 프로그래밍적 구성</server_h2>

서버 프로그래머와 백엔드 프로그래머 측면에서 보면, TCP/IP UDP 소켓과의 다른 점이 무엇인지 찾아보면, 패킷을 단순히 매직 패킷으로 사용한다는 것 외에는 다른 TCP/UDP 소켓 프로그래밍이랑 다를 게 없습니다. 위의 문제를 해결하기 위해서 매직 패킷의 구성과는 상관이 없지만, 그래도 기왕 WakeOnLan을 살펴본 김에 매직 패킷을 구성을 살펴봅시다.

<br>

#### <server_h4>cpp:</server_h4>

```cpp

struct WOL_PACKET
{
	uint8_t Magic[6];
	uint8_t MAC_ADDR[6 * 16];
};

```

![매직 패킷]({{ site.google_drive }}1dd_ccvaTUx2B3L8QH_PEaQkyjo5jOtUg{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<server_h6>매직 패킷</server_h6>*

단순하게 위의 구조체로 이루어져 있습니다.
  
<br>

### <server_h3>1) 네트워크 5계층</server_h3>

그럼 다시 본론으로 들어가서, 에러에 관한 네트워크 현 성을 분석하기 위해서는 필요한 배경 지식이 있습니다. 

<br>

![네트워크 5계층]({{ site.google_drive }}1T-j0j8smk65Xicsiu-s_wQvs0GTTEy5Y{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<server_h6>네트워크 5계층</server_h6>*

바로 위의 그림과 같이 네트워크 계층을 이해하는 것입니다. 5계층의 응용 계층(application)을 좀 더 세분화하여 세션(Session), 표현(presentation), 응용(applictation)으로 나누어서 7계층으로 표현하시는 분들도 있습니다. 5계층 7계층 둘 다 틀린 말은 아닙니다. 물론 자세하게 들어가려면 더욱 세분화해야 한다고 생각하지만, 전체적인 관점으로 보면 5계층이 잘 표현하고 있다고 생각합니다.
간략하게 한번 짚고 넘어가겠습니다.

1. 물리 계층 (Physical Layer)
	- 역할: 주로 하드웨어적인 측면을 다루며, 데이터를 전기 신호로 변환하고 물리적인 매체(케이블, 무선 등)를 통해 전송합니다.
	- 장비: 케이블
	- 10 Base T, 802.11

2. 데이터 링크 계층 (Data Link Layer)
	- 역할: 물리 계층에서 받은 데이터를 프레임으로 나누고, 에러 검출 및 수정을 수행하여 신뢰성 있는 전송을 보장합니다.
	- 장비: 스위치, 허브, 브리치
	- 프로토콜: Ethernet, Wi-Fi

3. 네트워크 계층 (Network Layer)
	- 역할: 라우팅과 패킷 전달을 담당합니다.  
	IP 주소를 사용하여 최적의 경로를 선택하고, 데이터 패킷을 목적지까지 전달합니다.
	- 장비: 라우터
	- 프로토콜: IP

4. 전송 계층 (Transport Layer)
	- 역할: 데이터의 신뢰성을 제공하며, 에러 복구 및 흐름 제어를 담당합니다.  
	주로 TCP(Transmission Control Protocol)와 UDP(User Datagram Protocol)가 사용됩니다.
	- 장비: 게이트웨이
	- 프로토콜: TCP / UDP

5. 응용 계층 (applictation Layer)
	- 역할: 양 끝단의 애플리케이션 간의 통신을 관리하고 동기화합니다. 
	어플리케이션의 개설, 유지, 종료 등을 담당하여 데이터의 교환을 조절합니다.
	- 장비: 어플리케이션
	- 프로토콜: HTTP


<br>

### <server_h3>2) 네트워크 5계층과 WakeOnLan 문제 원인 추론</server_h3>

위의 지식을 이해하셨으면, 네트워크 계층의 지식을 배경 삼아서 WakeOnLan의 문제의 원인을 추론해 봅시다.

<br>

![실제 내부망 예시]({{ site.google_drive }}1cQZ32sBYX8TXggO-c0HEuS84KHLUnmDG{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<server_h6>실제 내부망 예시</server_h6>*

WakeOnLan의 매직 패킷을 보낼 메인 컴퓨터가 존재하고, 허브나 스위치를 통해서 받을 다수 컴퓨터가 구성되어 있다고 합시다. 그럼 이를 논리적 흐름으로 바꿔봅시다.

<br>

![내부망논리적흐름]({{ site.google_drive }}1I7W9G51F6YnffxZRhT9jARwjTj8zhUfR{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<server_h6>내부망 논리적 흐름</server_h6>*

WOL을 보내는 프로그램을 만들어서 매직 패킷을 PC에 뿌리게 되면, 위와 같이 전송계층에 도달하게 됩니다. 일단 여기서 WOL 받는 PC의 <server_h5>"응용계층은 왜 존재하지 않는지?"</server_h5>> 궁금하실 분이 있을 것입니다. 그 이유는 PC가 꺼져있어서 응용 프로그램이 동작할 수 없는 상황이기 때문입니다. 그러므로 추론에서 응용 계층을 제외합니다.    
  
그렇다면 <server_h5>"왜 매직 패킷이 전송계층까지 도달하지 않을까?"</server_h5>라는 의문을 가지게 됩니다. 그럼 먼저 체크해야 할 점은 로직(코드)의 점검입니다. 하지만 위와 같은 사례에서는 당연히 매직 패킷을 도달 성공시킨 사례가 있기 때문에 로직문제는 아닌 걸로 판명됩니다. 따라서 전송 계층도 추론에서 제외됩니다.
  
그럼 가장 점검하기 쉬운 방법은 물리 점검입니다. 선이 연결되어 있는지, 컴퓨터를 켜서 네트워크 연결은 할 수 있는지 확인을 하게 됩니다. 컴퓨터 전원과 네트워크 카드에 불이 들어온다면 물리 계층을 추론에서 제외할 수 있습니다.

그럼 결론으로 모이는 부분은 매직 패킷이 어떠한 이유 때문에 데이터링크 계층, 네트워크 계층을 거치지 못해서 도달하지 못했다고 판명할 수 있습니다. 위와 같이 소거법으로도 힌트를 얻을 수 있지만 좀 더 확신하기 위해서 다른 힌트를 찾으러 가봅시다.

WOL 기술 아티클을 검색하게 되면, 코드나 아티클 글은 UDP 적용에 대해서만 추천하고 있습니다. 그럼 자연스럽게 <server_h5>"왜 WOL은 UDP 전송을 추천하는지?"</server_h5>에 관해서 의문이 들게 됩니다. 여기에 대답을 내리기 위해 한 가지 생각해야 할 점이 있습니다. <server_h5>"그럼 TCP와 UDP의 근본적인 차이점은 무엇일까요?"</server_h5> 속도? 신뢰성? 통신방식? 전송순서? 이런 건 하나도 중요하지 않습니다. 왜냐하면 이런 특성은 근본적인 차이점으로부터 출발하였기 때문입니다. 힌트를 드리자면 소켓 프로그래밍 코드 로직 속에 답이 존재합니다.  

<br>

![TCP/UDP로직]({{ site.google_drive }}1zcQfcJOQcGG4AuMVZ4gD7Nnyv_uZUH1B{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<server_h6>TCP/UDP로직</server_h6>*

눈치채셨나요? 정답은 클라이언트 연결 유무입니다. 저희의 목적은 에러를 찾는 것이기 때문에 TCP/IP와 UDP 차이점은 다음에 추가로 정리를 하도록 합시다.

그럼 다시 본론으로 돌아가서, ＂왜 WOL은 UDP 전송을 추천하는지?＂에 관해서 대답을 정리해야 합니다. 위의 결과에 의해서 WOL기술에서 UDP를 추천하는 이유는 당연히 컴퓨터가 꺼져있음으로 응용 프로그래밍 단계에서 클라이언트가 반응을 할 수 없기 때문입니다.

UDP가 패킷을 뿌리는 방식은 브로드 캐스팅, 멀티캐스팅 방식입니다. 이 말을 돌려 말하면 UDP는 선이 연결되어 있고 특별한 차단을 하지 않는 이상, 특정한 Port를 가지고 있으면 모든 IP에 해당 패킷을 뿌립니다. 즉, 내가 내부망에 연결해 놓고 방화벽으로 차단하지 않았으면, UDP로 패킷을 전송하게 되면 모든 컴퓨터가 WOL으로 켜진다는 이야기입니다. 따라서 <server_h5>"매직 패킷은 UDP인 전송 계층으로 전달하는데 어떠한 이유 때문에 도달하지 못한다."</server_h5>라는 결론을 얻을 수 있습니다.

"네트워크 계층의 가장 큰 특징은 무엇일까요?" 바로 인터넷입니다. 즉, 다른 내부망과 내부망의 라우터 연결입니다. 따라서 독립적인 내부망을 사용한다는 조건으로 네트워크 계층을 제외 할 수 있습니다.  
  
<br>

### <server_h3>3) 데이터 링크계층과 WakeOnLan 문제</server_h3>

드디어 소거법에 따라 네트워크 5계층에서 전부 소거되고 데이터 링크 계층만 남았습니다. 그러면 정답으로 찾으러 가봅시다

우리는 앞서서 특정 IP에 관하여 접근하려면 TCP를 사용해야 한다고 했습니다. 하지만 거기에는 커다란 문제가 있었습니다. 바로 클라이언트의 응답을 받아야 한다는 점입니다.

<server_h5>"특정 IP에 접근하려면 왜 응답을 받아야 할까요?"</server_h5> 그 이유는 IP만 알고 있다고 해서 원하는 컴퓨터로 접속하지 못하기 때문입니다. IP는 네트워크 계층의 프로토콜입니다. IP는 통신사에서 어떻게 배당해 주는가에 따라 갈리게 됩니다. 즉 집에서 인터넷을 쓸 때와 카페에서 인터넷을 쓸 때 IP주소 유동적으로 바뀌게 됩니다. 하지만 라우터에 연결되지 않은 내부망에서의 IP는 어떻게 배정해 주든 상관이 없습니다. 그래도 패킷을 전달하라면 IP가 필요로 하므로 배정해 주게 됩니다.

IP는 네트워크 계층의 프로토콜인데 데이터링크와 무슨 연관인지 궁금해하시는 분들도 있을 겁니다. 리는 IP와 컴퓨터의 Mac 주소에 관해서 연결하는 방법에 대해서 이해를 해야 합니다. 바로 ARP(Address Resolution Protocol)입니다. ARP는 컴퓨터의 IP와 Mac 주소에 관해서 연결하는 주소 결정 프로토콜입니다.

<br>

![ARP]({{ site.google_drive }}1rHXU6EuG0N0rz6lAzBbn6vEtpMFdiY6_{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<server_h6>ARP 구조</server_h6>*

IP 주소에 관한 Mac 주소를 찾기 위해서 브로드 캐스팅을 하게 되고 응답을 받으면 cmd창에서 Arp table을 확인해 봅시다.


<br>

#### <server_h4>cmd:</server_h4>

```cmd

//cmd
C:\Users\>arp -a

인터페이스: 111.111.1111.111 --- 0xc
  인터넷 주소           물리적 주소           유형
  111.111.111.113       00-00-00-00-00-03     동적
  255.255.255.255       ff-ff-ff-ff-ff-ff     정적

```

위와 같이 동적으로 작성될 것입니다. 와이어 샤크라는 패킷 분석 툴을 이용하시면 더 자세히 분석할 수 있습니다.  
  
만약 WOL을 보내는 PC가 응답을 받지 못한다면 Arp table Mac 주소는 작성되지 않을 것입니다. 또한 Arp의 동적 테이블은 휘발성 메모리이기 때문에, 컴퓨터를 종료하고 시간이 지나면 사라지게 됩니다. 그렇기 때문에 WOL의 매직 패킷을 특정 IP로 보내는 데 실패한 것입니다.  
  
＂그러면 어떻게 해야 할까?＂ 해결 방안은 IP와 Mac주소를 조사하여서 수동으로 입력하여 정적 유형으로 만들어 주면 됩니다. netsh interface IP add neighbors ＂[망이름]＂ ＂111.111.111.111＂ ＂00-00-00-00-00-03＂ (관리자 권한으로 cmd를 실행시켜 주세요)로 작성하면 됩니다.  

<br>

![결과]({{ site.google_drive }}1uSbRIBGU8vhJeWA2VoXDgNtVO492_wSj{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<server_h6>cmd 결과</server_h6>*

이렇게 선언하시면 수동으로 IP와 Mac 주소를 연결해서 특정 IP로 매직 패킷을 전송할 수 있습니다. (arp를 정적으로 선언하면 스푸핑 공격을 방어할 수도 있습니다. )

<br>
<br>

## <server_h2>4. 결론</server_h2>

netsh interface IP add neighbors ＂[망 이름]＂ ＂111.111.111.111＂ ＂00-00-00-00-00-03＂을 사용해서 ARP Table을 정적으로 할당시켜주면 됩니다.
(＂111.111.111.111＂=IP / ＂00-00-00-00-00-03＂=Mac)

<br>

끝까지 읽으시느라 고생하셨습니다.  
감사합니다.
