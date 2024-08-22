---
layout: post
title: "컴퓨터그래픽스실습(1) - 중간 과제"
date: 2023-04-23 09:00:00 +09:00
image: https://drive.google.com/thumbnail?id=1KRbxkazl0w2vUgejw0HsY_Kx1ZB9rMcz
toc: true
categories: [DirectX]
keywords: C++, DirectX 9
addsence: false
lastmod: 2024-07-07 09:00:00 +09:00
sitemap:
  changefreq : daily
  priority : 1.0
excerpt: DX9 기반의 간단한 퍼즐게임으로, 중복 블록을 클릭해 제거하는 방식입니다. 게임 로직보다 DirectX 9 활용에 중점을 두고 개발했습니다.
related_links:
  - url: /directx/ComputerGraphicsLab1_DX9.html
---

## <cpp_h2>프로젝트 소개</cpp_h2>

해당 프로젝트는 2016년 1학기 컴퓨터그래픽스실습(1) 중간 과제로 진행된 DirectX 9 기반의 간단한 퍼즐게임입니다. 게임의 핵심은 중복되는 블록을 마우스 클릭으로 제거하는 것으로, 게임 로직보다 DirectX 9의 사용에 중점을 두었습니다. 개발자는 Visual Studio 2010을 사용하여 C++로 게임을 구현하였으며, 프로젝트는 Windows 플랫폼을 타겟으로 하였습니다. 

<br>
<br>

## <cpp_h2>프로젝트 개요</cpp_h2>

- <span><cpp_h5>프로젝트명:</cpp_h5> 간단한 퍼즐게임 만들기</span>
- <span><cpp_h5>과제:</cpp_h5> 2016년 1학기 컴퓨터그래픽스실습(1) 중간 과제</span>
- <span><cpp_h5>게임 장르:</cpp_h5> Toy Project</span>
- <span><cpp_h5>기간:</cpp_h5> 제작 완료</span>
    - ver.1: 2016.04.22~2016.04.24
- <span><cpp_h5>개발인원:</cpp_h5> Developer(1명)</span>
- <span><cpp_h5>플랫폼:</cpp_h5> PC (Window)</span>

<br>

### <cpp_h3> 기술 스택 </cpp_h3>

- <span><cpp_h5>개발 도구:</cpp_h5> viusal studio 2010 / DirectX 9 </span>
- <span><cpp_h5>개발 언어:</cpp_h5> c++  </span>

<br>
<br>

## <cpp_h2> 프로젝트 특징 및 기능 구현 </cpp_h2>

![ComputerGraphicsLab1 MiddleExam]({{ site.google_drive }}1KRbxkazl0w2vUgejw0HsY_Kx1ZB9rMcz{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<cpp_h6>ComputerGraphicsLab1 MiddleExam</cpp_h6>*

시험 내용: DirectX를 이용해서 간단한 게임을 제작하십시오.

<br>

### <cpp_h3> 1) 게임 기능 구현</cpp_h3><red1_error> (전체 제작 기여도: 100%)</red1_error>

1. 화면은 당시 메이플스토리 기본화면처럼 640*480으로 리사이즈 하였습니다.(녹화 영상이랑 다르게 게임을 실행하면 화면이 크게 바뀝니다.)
2. 초기 블럭을 랜덤하게 생성하였습니다.
3. 클릭한 블록을 중심으로 상하 좌우를 체크하고 블록을 지웠습니다.


<br>
<br>

## <cpp_h2> 결과(성과) 및 데모 </cpp_h2>

- <span><cpp_h5>성과:</cpp_h5> 2016년 1학기 컴퓨터그래픽스실습(1) 중간 과제 </span>
- <span><cpp_h5>깃허브(코드):</cpp_h5> 공개 예정</span>

<br>
<br>

## <cpp_h2> 비고 및 여담 </cpp_h2>

- 배운점 및 수정할 점
	- DXUT를 사용해서 게임을 간단하게 제작하는 방법에 대해서 학습하였습니다.
	- 퍼즐게임을 만드는 방법에 대해서 학습하였습니다.