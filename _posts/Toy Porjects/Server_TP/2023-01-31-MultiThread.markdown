---
layout: post
title:  "멀티 스레드를 이용한 숫자 덧셈 프로그램 제작"
date:   2023-01-31 16:03:34 +0900
image: https://github.com/kj1241/kj1241.github.io/assets/22047442/3986700c-f4de-4713-8e6a-e433602e70b5
toc: true
categories: [Server_TP]
tags: [C++, Multi Thread]
---

<h2><green1_h2> 토이 프로젝트 소개 </green1_h2></h2>
C++로 작성한 멀티쓰레드 덧셈 프로그램은 여러 쓰레드를 사용하여 숫자의 합을 효과적으로 계산합니다.  
이 프로그램은 쓰레드 간의 작업을 분할하고 결과를 안전하게 집계하여 병렬처리를 통해 높은 성능을 제공합니다.  
Mutex나 원자적 연산 등을 활용하여 쓰레드 간의 동기화를 보장하여 안정적으로 동작합니다.

<br>
<br>
<h2><green1_h2> 토이 프로젝트 개요 </green1_h2></h2><ul>
<li><h5><green1_h5>프로젝트명: </green1_h5><span> 멀티 스레드를 이용한 덧셈 프로그램</span></h5></li>
<li><h5><green1_h5>장르: </green1_h5><span> Toy Project(Server)</span></h5></li>
<li><h5><green1_h5>기간: </green1_h5><span> 2015.11.05~2015.11.19</span></h5></li>
<li><h5><green1_h5>플랫폼: </green1_h5><span> PC </span></h5></li></ul>

<br>
<br>
<h2><green1_h2> 팀 구성 </green1_h2></h2><ul> 
<li><h5><green1_h5>Developer(1명): </green1_h5><span> 멀티 스레드 설계 및 동기화 구현 </span></h5></li>
</ul>

<br>
<h2><green1_h2> 기술 스택 </green1_h2></h2><ul>
<li><h5><green1_h5>엔진: </green1_h5><span> viusal studio 2015 → 2019 </span></h5></li>
<li><h5><green1_h5>언어: </green1_h5><span> c++  </span></h5></li>
</ul>

<br>
<br>
<h2 ><green1_h2> 토이 프로젝트 특징 </green1_h2></h2>
- 멀티 쓰레드를 공부하고 동기화 교착상태를 해결하는 방법에 대해서 공부합니다.

<br>
<h3 ><green1_h3> 토이 프로젝트 과정 </green1_h3></h3>
1. main number.txt 파일에 있는 숫자 30개 파일 입출력으로 읽습니다.
2. 멀티 스레드 생성 및 각각 10개씩 데이터 넘겨 줍니다.
3. 스레드 안에서 합계를 계산해 줍니다.
4. 이때 동기화를 사용하기 위해 세마포어를 구현해 줍니다.


<br>
<br>
<h2><green1_h2> 개발자의 역활 및 경험 </green1_h2></h2>
- **멀티 스레드 통신 제작** <span><red1_error>(전체 게임 제작 기여도: 100%)</red1_error></span>
    1. CrateThread를 사용하여 스레드 생성.
    2. CreateSemaphore를 사용해서 동기화.

<br>
<h3><green1_h3> 시퀀스 다이어 그램 </green1_h3></h3>
![시퀸스 다이어그램](https://github.com/kj1241/kj1241.github.io/assets/22047442/3986700c-f4de-4713-8e6a-e433602e70b5){: width="740" height="400"}


<br>
<br>
<h2><green1_h2> 결과(성과) 및 데모 </green1_h2></h2>
<ul>
<li><h5><green1_h5>성과: </green1_h5><span> 2015년 2학기 시스템 프로그래밍 실습 중간 과제 </span></h5></li>
<li><h5><green1_h5>깃 허브(코드): </green1_h5><span> 
<a href="https://github.com/kj1241/Server_Assignment/tree/main/System%20Programming/MultiThreadedSumProgram/FinalAssignment(ver.1) ">https://github.com/kj1241/Server_Assignment/tree/main/System%20Programming/MultiThreadedSumProgram/FinalAssignment(ver.1) </a> </span></h5></li>
<li><h5><green1_h5>유튜브 동영상: </green1_h5></h5> 
<iframe width="700" height="400" src="https://www.youtube.com/embed/apWhZFFAme8" title="멀티스레드 덧셈 프로그램 제작(화질 개선)" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
</li>
</ul>

<br>
<h3><green1_h3> 배운 점 및 앞으로 수정할 점 </green1_h3></h3>
- 멀티 스레드에 관해서 학습하고 동기화하는 방법을 공부했습니다.
