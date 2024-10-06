---
layout: post
title: "윈도우 프로그래밍 실습 - 기말 과제(모작 산성비 게임)"
date: 2023-04-04 11:50:19 +09:00
image: https://drive.google.com/thumbnail?id=1LyM9BeqxNITFOcE1ZrbtedVnbDM9a84p
toc: true
categories: [WinAPI]
keywords: WinAPI, Visual Studio, C++ 게임 개발, 산성비 게임 모작, 단어 타이핑 게임, UI 구현, 문자열 입력/출력
addsence: true
lastmod: 2024-10-06 11:50:19 +09:00
sitemap: 
  changefreq : daily
  priority : 1.0
excerpt: Acid Rain 모작은 WinAPI를 활용해 제작된 단어 타이핑 게임입니다. 하늘에서 떨어지는 단어를 빠르게 입력해 소멸시키고, 속도와 정확성으로 최고 점수에 도전하세요.
related_links:
---

## <cpp_h2> 프로젝트 소개 </cpp_h2>

하늘에서 떨어지는 글자를 신속하게 지우는 게임, '글자 소멸' 산성비의 모작. 플레이어는 떨어지는 알파벳이나 단어를 터치하여 소멸시키고, 높은 난이도에 도전하면서 빠른 반응과 어휘력을 향상하세요. 시간 경쟁이 주된 요소인 이 게임은 속도와 정확성을 겸비한 플레이어에게 적합한 놀이터입니다.  

<br>
<br>

## <cpp_h2>프로젝트 개요</cpp_h2>

- <span><cpp_h5>프로젝트명:</cpp_h5> Acid Rain 모작</span>
- <span><cpp_h5>과제:</cpp_h5> 2015년 1학기 윈도우 프로그래밍 실습 기말 과제</span>
- <span><cpp_h5>게임 장르:</cpp_h5> Toy Project</span>
- <span><cpp_h5>기간:</cpp_h5> 제작 완료</span>
    - ver.1: 2015.06.09~2015.06.14(제작)
- <span><cpp_h5>개발인원:</cpp_h5> Developer(1명)</span>
- <span><cpp_h5>플랫폼:</cpp_h5> PC (Window)</span>


<br>

### <cpp_h3> 기술 스택 </cpp_h3>

- <span><cpp_h5>개발 도구:</cpp_h5> Visual Studio 2015 → 2022  </span>
- <span><cpp_h5>개발 언어:</cpp_h5> C++ / winAPI  </span>


<br>
<br>

## <cpp_h2> 프로젝트 특징 및 기능 구현 </cpp_h2>

프로젝트 특징과 기능 구현 내용입니다.

<br>

### <cpp_h3>산성비 데모 제작 ver.1</cpp_h3><red1_error> (전체 제작 기여도: 100%)</red1_error>

1. 스테이지 구성 및 스테이지 전환 (Start - Main - End)을 구성하였습니다.
2. WInAPI를 이용하여 문자열 입출력 UI 코드 작성하였습니다.
3. WinAPI를 이용하여 문자열 뒤의 캐럿 UI 구현하였습니다.
4. 단어 작성 성공 시 점수 및 UI 구현하였습니다.


<br>
<br>

## <cpp_h2>동작 다이어 그램</cpp_h2>

#### **<cpp_h4>Main 화면 동작 다이어 그램</cpp_h4>**

![화면 구성]({{ site.google_drive }}1zKEYUwqaFaXoUhlxfduV6Fda4wNwjjZD{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}

#### **<cpp_h4>게임 스테이지 구성</cpp_h4>**

![화면동작]({{ site.google_drive }}1LyM9BeqxNITFOcE1ZrbtedVnbDM9a84p{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}

1. 게임 화면을 시작- 메인 - 끝으로 구성하였습니다.
2. 하늘에서 떨어지는 단어를 올바르게 치시면 점수를 얻는 방식으로 구성하였습니다.

<br>
<br>

## <cpp_h2> 결과(성과) 및 데모 </cpp_h2>

<iframe  width="100%" style="aspect-ratio:16/9" src="https://www.youtube.com/embed/eYwX1WuaEYE" title="산성비(WinAPI)" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

- <span><cpp_h5>성과:</cpp_h5> 2015년 1학기 윈도우 프로그래밍 실습 기말 과제 </span>
- <span><cpp_h5>깃허브(코드):</cpp_h5> [https://github.com/kj1241/WinAPI_ToyProejct/tree/main/AcidRain](https://github.com/kj1241/WinAPI_ToyProejct/tree/main/AcidRain)</span>

<br>
<br>

## <cpp_h2> 비고 및 여담 </cpp_h2>

- 배운점
    - WinAPI를 사용하여 간단한 게임 동작 로직을 디자인 설계를 할 수 있게 되었고 툴 프로그램의 UI 코드를 작성할 수 있게되었습니다.
    - WinAPI를 사용하여 게임을 제작할 수 있게 되었습니다.

- 보완해야 할 사항
    - UI를 좀 더 디자인해서 보완 할 필요성이 있습니다.
    - 아이템을 추가 및 글자를 가리거나 화면을 다시 그리는 위치를 좀 더 크게 하여 속도가 빨라 보이도록 제작 할 필요성이 있습니다.