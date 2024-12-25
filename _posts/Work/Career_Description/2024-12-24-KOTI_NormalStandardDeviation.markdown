---
layout: post
title: "KOTI 사이드 프로젝트 - 정규 분포(ver.3)"
date: 2024-12-24 09:00:00 +09:00
image: https://drive.google.com/thumbnail?id=1dtl_kqpm9MUcC89eMh7cVV_H-BiVKAYA
toc: true
categories: [Career_Description]
keywords: 정규분포, 데이터 시각화, 인원 배치, WinAPI, C++, 최적화 도구, 그래프 시각화, 자동화, 데이터 분석, 프로그램 개발
addsence: false
lastmod: 2024-12-24 09:00:00 +09:00
sitemap:
  changefreq : daily
  priority : 1.0
excerpt: 정규분포 인원 배치 프로그램은 데이터 분석과 시각화를 통해 인원을 최적화 배치하는 도구입니다. WinAPI 기반의 사용자 친화적 인터페이스와 간편한 데이터 추출 기능을 제공합니다.
related_links:
  - url: /career_description/ATRC.html
---

## <work_h2>프로젝트 소개</work_h2>

정규분포 인원 배치 프로그램은 데이터 분석과 시각화를 기반으로 인원 배치를 최적화하기 위해 설계된 도구입니다. 정규분포의 개념을 활용하여 효율적인 인원 배치와 데이터의 가시화를 지원하며, WinAPI를 통해 사용자 친화적인 그래픽 인터페이스를 제공합니다. 이 프로젝트는 실무 적용 가능성을 높이기 위해 간편한 데이터 추출 기능을 포함하고 있습니다.

<br>
<br>

## <work_h2>프로젝트 개요</work_h2>

- <span><work_h5>프로젝트명:</work_h5> 정규분포 인원 배치 프로그램 </span>
- <span><work_h5>장르:</work_h5> 데이터 시각화 및 최적화 도구 </span>
- <span><work_h5>프로젝트 유형:</work_h5> 사이드 프로젝트</span>
- <span><work_h5>기간:</work_h5> 제작 완료</span>
  - ver.1: 2024.09.24~2024.09.30(정규분포를 사용하여 인원수 배치)
  - ver.2: 2024.10.01~2024.10.04(WinAPI를 사용해 정규분포 그래프 구현)
  - ver.3: 2024.10.09~2024.10.09(WinAPI를 활용한 사용자 편의성 개선)
- <span><work_h5>개발인원: 1명</work_h5> </span>
  - 개발 역할: 프로그래머
- <span><work_h5>플랫폼:</work_h5> PC (Window) </span>

<br>

### <work_h3> 기술 스택 </work_h3>

- <span><work_h5>개발 도구:</work_h5> Visual Studio 2019, WinAPI </span>
- <span><work_h5>주 개발 언어:</work_h5> C++ (WinAPI) </span>

<br>
<br>

## <work_h2> 프로젝트 특징 및 기능 구현 </work_h2>

![정규분포 인원 배치 프로그램]({{ site.google_drive }}1dtl_kqpm9MUcC89eMh7cVV_H-BiVKAYA{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<cpp_h6>정규 분포 인원 배치 프로그램</cpp_h6>*

<br>

### <work_h3> 1) 정규분포 기반 인원 배치  Ver.1  </work_h3><red1_error> (전체 제작 기여도: 100%)</red1_error>

1. 텍스트 입력값에 따라 좌표별 인원을 정규분포에 따라 배치하였습니다.
2. CDF(누적분포함수) 공식을 사용해 정규분포 범위 계산하였습니다.
3. 결과 데이터를 XML 및 Excel 파일로 저장하였습니다.
4. 시간을 문자열로 변환하는 기능 구현하였습니다.
5. 표준편차 계산 함수 작성하였습니다.
 
<br>

### <work_h3> 2) 정규분포 그래프 시각화 Ver.2  </work_h3><red1_error> (전체 제작 기여도: 100%)</red1_error>

1. WinAPI의 Line 기능을 사용해 정규분포 그래프를 구현하였습니다.
2. 그래프 상에서 특정 범위에 해당하는 인원을 막대 그래프로 표시하였습니다.

<br>

### <work_h3> 3) 사용자 편의 기능 추가 Ver.2  </work_h3><red1_error> (전체 제작 기여도: 100%)</red1_error>

1. 정규분포 입력값을 손쉽게 설정할 수 있는 WinAPI 기반 버튼 구현하였습니다.
2. Excel 파일 추출 기능을 버튼으로 간편화하였습니다.

<br>
<br>

## <work_h2> 결과(성과) 및 데모 </work_h2>

<iframe width="100%" style="aspect-ratio:16/9" src="https://drive.google.com/file/d/1dtl_kqpm9MUcC89eMh7cVV_H-BiVKAYA/preview" title="NormalStandardDeviation" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

- <span><work_h5>성과:</work_h5> </span>
  - 해당 프로그램은 데이터 분석 및 그래프 시각화를 필요로 하는 다른 프로젝트에 활용 가능한 기반 프로그램으로 개발되었습니다.
  - 정규분포를 통해 효율적인 인원 배치 모델을 제공하며, 사용자 정의가 가능한 결과 추출 기능이 포함되어 있습니다.
- <span><work_h5>깃허브(코드): </work_h5> [https://github.com/kj1241/WinAPI_Portfolio/tree/main/NormalStandardDeviation(ver.3)](https://github.com/kj1241/WinAPI_Portfolio/tree/main/NormalStandardDeviation(ver.3)) </span>

<br>
<br>

## <work_h2> 비고 및 여담 </work_h2>

- WinAPI 사용 이유: 본 프로젝트는 실무 중 여유 시간을 활용하여 데이터 분석 및 시각화를 위한 도구를 개발한 사례입니다. WinAPI를 사용해 그래프 시각화와 사용자 입력 기능을 구현함으로써 C++ 개발 능력을 심화하였습니다. ~~(할일을 다해서 시간이 남아 만들었습니다.)~~
- 프로그램 작성 배경: 데이터 결과를 반복적으로 추출할 필요성이 예상되어 자동화 도구로서의 기능을 강화하였습니다. 이 과정에서 사용자 친화적인 UI와 데이터 저장 방식을 설계하였습니다.