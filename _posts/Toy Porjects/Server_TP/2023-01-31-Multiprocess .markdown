---
layout: post
title:  "멀티 프로세스 통신 제작 실습"
date:   2023-01-31 15:08:46 +0900
image: https://github.com/kj1241/kj1241.github.io/assets/22047442/5f0f34ae-4d67-471a-bd33-e119d44c41b6
toc: true
categories: [Server_TP]
tags: [C++, Multiprocess Communication]
---

<h2><green1_h2> 토이 프로젝트 소개 </green1_h2></h2>
C++을 사용한 멀티 프로세서 통신은 여러 프로세서 간의 효율적인 정보 교환을 위한 기술입니다.  
멀티 프로세서 통신은 병렬 처리를 최적화하여 빠른 계산 및 효율적인 자원 활용을 가능케 합니다.

<br>
<br>
<h2><green1_h2> 토이 프로젝트 개요 </green1_h2></h2><ul>
<li><h5><green1_h5>프로젝트명: </green1_h5><span> 멀티 프로세스 통신 구현하기</span></h5></li>
<li><h5><green1_h5>장르: </green1_h5><span> Toy Project(Server)</span></h5></li>
<li><h5><green1_h5>기간: </green1_h5><span> 2015.12.05~2015.12.15</span></h5></li>
<li><h5><green1_h5>플랫폼: </green1_h5><span> PC </span></h5></li></ul>

<br>
<br>
<h2><green1_h2> 팀 구성 </green1_h2></h2><ul> 
<li><h5><green1_h5>Developer(1명): </green1_h5><span> 멀티 프로세스 통신 설계 및 구현 </span></h5></li>
</ul>

<br>
<h2><green1_h2> 기술 스택 </green1_h2></h2><ul>
<li><h5><green1_h5>엔진: </green1_h5><span> viusal studio 2015 → 2019 </span></h5></li>
<li><h5><green1_h5>언어: </green1_h5><span> c++ </span></h5></li>
</ul>

<br>
<br>
<h2 ><green1_h2> 토이 프로젝트 특징 </green1_h2></h2>
- 멀티 프로세스 통신하는 과정을 공부하고 적용하는 방법을 연습합니다.

<br>
<h3 ><green1_h3> 토이 프로젝트 과정 </green1_h3></h3>
1. System IO에 의해서 데이터를 입력받습니다.
2. IO프로세스은 입력 이벤트가 발생하면 MailBox를 통하여 IO2 프로세스로 전달합니다.
3. IO2 프로세스는 IO프로세스에 전달받는 상황 발생 시 Chat 프로세스로 입력 내용을 전달합니다.


<br>
<br>
<h2><green1_h2> 개발자의 역활 및 경험 </green1_h2></h2>
- **멀티 프로세스 통신 제작** <span><red1_error>(전체 게임 제작 기여도: 100%)</red1_error></span>
    1. MailBox를 이용한 멀티 프로세스 통신 프로그램 제작.

<br>
<h3><green1_h3> 시퀀스 다이어 그램 </green1_h3></h3>
![img](https://github.com/kj1241/kj1241.github.io/assets/22047442/5f0f34ae-4d67-471a-bd33-e119d44c41b6){: width="740" height="400"}


<br>
<br>
<h2><green1_h2> 결과(성과) 및 데모 </green1_h2></h2>
<ul>
<li><h5><green1_h5>성과: </green1_h5><span> 2015년 2학기 시스템 프로그래밍 실습 기말 과제 </span></h5></li>
<li><h5><green1_h5>깃 허브(코드): </green1_h5><span> 
<a href="https://github.com/kj1241/Server_Assignment/tree/main/System%20Programming/MultiProcess/MultiProcess">https://github.com/kj1241/Server_Assignment/tree/main/System%20Programming/MultiProcess/MultiProcess</a> </span></h5></li>
<li><h5><green1_h5>유튜브 동영상: </green1_h5></h5> 
<iframe width="700" height="400" src="https://www.youtube.com/embed/cOH9jgKtj8k" title="멀티 프로세스 통신(화질 개선)" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
</li>
</ul>

<br>
<h3><green1_h3> 배운 점 및 앞으로 수정할 점 </green1_h3></h3>
- MailBox API 활용법 및 멀티 프로세스 상황에서 프로세스의 통신 방법에 대하여 학습했습니다.
- 단순한 입력 내용 전달 말고 특별한 기능을 구현하여 전달해 주는 로직을 작성하지 못해서 아쉽습니다.
