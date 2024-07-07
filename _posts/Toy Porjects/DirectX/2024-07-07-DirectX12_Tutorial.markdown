---
layout: post
title: "DirectX 12 - 튜토리얼 작성(수정 중)"
date: 2024-07-07 09:00:00 +09:00
image: https://drive.google.com/thumbnail?id=1SJGlwRbyhcLusNKI-P94ZR019aUNQ6bp
toc: true
categories: [DirectX]
keywords: C++, DirectX 12
addsence: false
lastmod: 2024-07-07 09:00:00 +09:00
sitemap:
  changefreq : daily
  priority : 1.0
excerpt: 
related_links:related_links:
---

## <cpp_h2>프로젝트 소개</cpp_h2>

24년 5월부터 작성하기로 한 DirectX 12 튜토리얼 입니다. 아직 튜토리얼 제작중입니다. 어디까지 갈지 모르겠지만 목표는 애니메이션(?) 제작까지입니다.
지금 솔직히 못쓰고 있는 이유는 이걸 어디서부터 어떻게 써야 되는지 감이 안잡히기 때문입니다. ~~(왜 이렇게 도큐멘트 쓰는게 집중이 안되지)~~

<br>
<br>

## <cpp_h2>프로젝트 개요</cpp_h2>

- <span><cpp_h5>프로젝트명:</cpp_h5> DirectX 12 튜토리얼 공부 및 작성</span>
- <span><cpp_h5>과제:</cpp_h5> 토이 프로젝트</span>
- <span><cpp_h5>게임 장르:</cpp_h5> Toy Project</span>
- <span><cpp_h5>기간:</cpp_h5> 제작 완료</span>
    - ver.1: 2024.04.01~
- <span><cpp_h5>개발인원:</cpp_h5> Developer(1명)</span>
- <span><cpp_h5>플랫폼:</cpp_h5> PC (Window)</span>

<br>

### <cpp_h3> 기술 스택 </cpp_h3>

- <span><cpp_h5>개발 도구:</cpp_h5> viusal studio 2019 / DirectX 12 / Window 10</span>
- <span><cpp_h5>개발 언어:</cpp_h5> c++ </span>

<br>
<br>

## <cpp_h2> 프로젝트 특징 및 기능 구현 </cpp_h2>

개인적으로 공부했던 부분을 제작한 프로젝트입니다.


<br>

### <cpp_h3> 0) InitDirectX12 </cpp_h3><red1_error> (전체 제작 기여도: 100%)</red1_error>

![InitDirectX12]({{ site.google_drive }}1Z5evOCvV6b6F6MAQQDXCYzCWeJgReWp2{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<cpp_h6>InitDirectX12</cpp_h6>*


<br>

### <cpp_h3> 1) DrawTriangles </cpp_h3><red1_error> (전체 제작 기여도: 100%)</red1_error>

![DrawTriangles]({{ site.google_drive }}1vPpckvru1EZlsAJ7HRFB7yykQHhSnBLf{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<cpp_h6>DrawTriangles</cpp_h6>*

![DrawRectangle]({{ site.google_drive }}1IPHSVi6YorqXWUtrDdxVDsqtXn-jvePe{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<cpp_h6>DrawRectangle</cpp_h6>*

<br>

### <cpp_h3> 2) IndexTriangles </cpp_h3><red1_error> (전체 제작 기여도: 100%)</red1_error>

![IndexTriangles]({{ site.google_drive }}1L2_JsKDeolng5uaaa9zQz2JCmqTHtUmK{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<cpp_h6>IndexTriangles</cpp_h6>*

![IndexRectangle]({{ site.google_drive }}1Ypc5Q5IMQAsjeUKAWXh83TKDhTr8tgM8{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<cpp_h6>IndexRectangle</cpp_h6>*


<br>

### <cpp_h3> 3) TextureTriangles </cpp_h3><red1_error> (전체 제작 기여도: 100%)</red1_error>

![TextureTriangles]({{ site.google_drive }}1C9TYRNeOKUMi07xtqTQyBlANs8Mvr2fR{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<cpp_h6>TextureTriangles</cpp_h6>*

![TextureRectangle(WIC)]({{ site.google_drive }}1vZ6JaP9J5hc6qsmk4ugWZPvHkkNYC4qZ{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<cpp_h6>TextureRectangle(WIC)</cpp_h6>*

![TextureRectangle(DirectXTex)]({{ site.google_drive }}1hXCR84-MQ0HcWgCtcS8CSa_Y5zDSZrSc{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<cpp_h6>TextureRectangle(DirectXTex)</cpp_h6>*

<br>

### <cpp_h3> 4) Modelling </cpp_h3><red1_error> (전체 제작 기여도: 100%)</red1_error>

![Modelling(PMD)]({{ site.google_drive }}1SJGlwRbyhcLusNKI-P94ZR019aUNQ6bp{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<cpp_h6>Modelling(PMD)</cpp_h6>*



<br>
<br>

## <cpp_h2> 비고 및 여담 </cpp_h2>

- 배운점 및 수정할 점
	- DXUT를 사용해서 게임을 간단하게 제작하는 방법에 대해서 학습하였습니다.
	- 퍼즐게임을 만드는 방법에 대해서 학습하였습니다.