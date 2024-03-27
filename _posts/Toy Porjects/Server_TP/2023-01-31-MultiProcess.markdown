---
layout: post
title: "시스템 프로그래밍 실습 - 중간 과제(멀티 프로세스 통신)"
date: 2023-01-31 15:08:46 +0900
image: https://drive.google.com/thumbnail?id=1oFZn2Hs3d_fpAVByLg_0llVipQWIl04s
toc: true
categories: [Server_TP]
tags: [C++, Multi Process Communication]
keywords: C++, Multi Process Communication, server
---

## <server_h2>프로젝트 소개</server_h2>

C++을 사용한 멀티 프로세서 통신은 여러 프로세서 간의 효율적인 정보 교환을 위한 기술입니다. 멀티 프로세서 통신은 병렬 처리를 최적화하여 빠른 계산 및 효율적인 자원 활용을 가능케 합니다.

<br>
<br>

## <server_h2>프로젝트 개요</server_h2>

- <span><server_h5>프로젝트명:</server_h5> 멀티 프로세스 통신 구현하기</span>
- <span><server_h5>과제:</server_h5> 2015년 2학기 시스템 프로그래밍 실습 중간 과제</span>
- <span><server_h5>게임 장르:</server_h5> Toy Project</span>
- <span><server_h5>기간:</server_h5> 제작 완료</span>
    - ver.1: 2015.10.05~2015.10.15(제작)
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

### <server_h3>메일박스를 이용한 멀티프로세서 제작 ver.1</server_h3><red1_error> (전체 제작 기여도: 100%)</red1_error>

1. System IO에 의해서 데이터를 입력받습니다.
2. IO프로세스은 입력 이벤트가 발생하면 MailBox를 통하여 IO2 프로세스로 전달합니다.
3. IO2 프로세스는 IO프로세스에 전달받는 상황 발생 시 Chat 프로세스로 입력 내용을 전달합니다.

<br>
<br>

## <server_h2>시퀸스 다이어그램</server_h2>

![시퀸스]({{ site.google_drive }}1oFZn2Hs3d_fpAVByLg_0llVipQWIl04s{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}

- MailBox를 이용한 멀티 프로세스 통신 프로그램 제작하였습니다.
- 멀티 프로세스 통신 설계 및 구현하였습니다.

<br>
<br>

## <server_h2> 결과(성과) 및 데모 </server_h2>

<iframe  width="100%" style="aspect-ratio:16/9" src="https://www.youtube.com/embed/cOH9jgKtj8k" title="멀티 프로세스 통신(화질 개선)" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

- <span><server_h5>성과:</server_h5> 2015년 2학기 시스템 프로그래밍 실습 중간 과제 </span>
- <span><server_h5>깃허브(코드):</server_h5> [https://github.com/kj1241/Server_Assignment/tree/main/System%20Programming/MultiProcess/MultiProcess](https://github.com/kj1241/Server_Assignment/tree/main/System%20Programming/MultiProcess/MultiProcess)</span>

<br>
<br>

## <unity_h2> 비고 및 여담 </unity_h2>

- 배운점 및 수정할 점
    - MailBox API 활용법 및 멀티 프로세스 상황에서 프로세스의 통신 방법에 대하여 학습했습니다.
    - 단순한 입력 내용 전달 말고 특별한 기능을 구현하여 전달해 주는 로직을 작성하지 못해서 아쉽습니다.