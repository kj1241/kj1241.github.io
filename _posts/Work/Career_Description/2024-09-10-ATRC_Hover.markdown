---
layout: post
title: "ATRC 사이드 프로젝트 - 호버크래프트"
date: 2024-09-10 09:00:00 +09:00
image: https://drive.google.com/thumbnail?id=1kooBOfs-hYzbHH9DU2FgS0ZBQ3SAaNGD
toc: true
categories: [Career_Description]
keywords: Hover 프로젝트, 공기부양정 시뮬레이터, 제어 알고리즘, 동역학, WinAPI, Unity, 물리 시뮬레이션, C++, C#, P/Invoke, 마샬링, 사이드 프로젝트, 시뮬레이션 게임
addsence: false
lastmod: 2024-09-10 09:00:00 +09:00
sitemap:
  changefreq : daily
  priority : 1.0
excerpt: Hover 프로젝트는 제어 및 동역학 알고리즘을 기반으로 공기부양정 시뮬레이터를 개발한 사이드 프로젝트입니다. WinAPI와 Unity를 활용해 다양한 플랫폼에서 구현되었습니다.
related_links:
  - url: /career_description/ATRC.html
---

## <work_h2>프로젝트 소개</work_h2>

해당 프로젝트는 ATRC 프로젝트에서 연구원을 일할 때, 회사에 보고되지 않고 개인적으로 제어-동역학 부분을 심도 깊게 이해하기 위해서 논문을 보고 작성한 코드 입니다. 

<br>
<br>

## <work_h2>프로젝트 개요</work_h2>

- <span><work_h5>프로젝트명:</work_h5> Hover</span>
- <span><work_h5>장르:</work_h5> 사이드 프로젝트</span>
- <span><work_h5>게임 장르:</work_h5> Simulation</span>
- <span><work_h5>기간:</work_h5> 제작 완료</span>
  - ver.1: 2021.04.01~2021.04.05(논문 읽고 공기부양정 구현)
  - ver.2: 2021.04.15~2021.04.19(라이브러리 분리 후 유니티 구현)
- <span><work_h5>개발인원:</work_h5> </span>
  - 직업: 프로그래머
- <span><work_h5>플랫폼:</work_h5> PC (Window) </span>

<br>

### <work_h3> 기술 스택 </work_h3>

- <span><work_h5>개발 도구:</work_h5> Unity 2019.02.2f1 / visual studio 2019 / WinAPI  </span>
- <span><work_h5>주 개발 언어:</work_h5> C#(유니티) /  C++(WinAPI) </span>

<br>
<br>

## <work_h2> 프로젝트 특징 및 기능 구현 </work_h2>

![프로그램 구조 변경]({{ site.google_drive }}1kooBOfs-hYzbHH9DU2FgS0ZBQ3SAaNGD{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<cpp_h6>프로그램 구조 변경</cpp_h6>*

프로그램 구조 변경 전 코드는 Ver.1 코드로 제어-동역학 첫 미팅전에 논문을 읽고 구현한 코드입니다. 또한 구조 변경후 코드는 Ver.2 코드로 제어-동역학 부분을 DLL로 변형시키고 시뮬레이터 이식하기 위해서 연습한 코드입니다.

<br>

### <work_h3> 1) 논문 읽고 공기부양정 구현 Ver.1  </work_h3><red1_error> (전체 제작 기여도: 100%)</red1_error>

![WinAPI를 사용한 공기부양정 시뮬레이터]({{ site.google_drive }}1sxNldUWLxgEYo-sYyvZIrXSQ170hVGzy{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<cpp_h6>WinAPI를 사용한 공기부양정 시뮬레이터</cpp_h6>*

1. WinAPI의 GUI를 사용하여 공기부양정과 UI를 구현하였습니다.
2. 수학 라이브러리를 직접 제작하여 백터 및 백터 계산(외적, 내적), 행렬 계산, 백터 함수 구현(거리 계산, 스칼라 계산)
3. 공기부양정 계산을 위해서 운동방정식, 즉 힘과 토크에 관해서 구현하였습니다.
  - 선형운동 
    " $$ \mathbf{F} = m \mathbf{a} $$ "
  - 각 운동
    " $$ \tau = I \alpha $$ "
  - 쓰러스트에 의한 추력과 공기저항에 의한 항력 계산 
    " $$ \mathbf{F}_{\text{drag}} = -\frac{1}{2} C_d \rho A v^2 $$ "
  - 러더에 의한 모멘트 계산
    " $$ \mathbf{\tau}_{\text{rudder}} = \mathbf{F}_{\text{rudder}} \times \mathbf{r}_{\text{arm}} $$ "

<br>

### <work_h3> 2) 라이브러리 분리 후 유니티 구현 Ver.1  </work_h3><red1_error> (전체 제작 기여도: 100%)</red1_error>

![Unity를 사용한 공기부양정 시뮬레이터]({{ site.google_drive }}1AMlg8tLQT-K6fOuu2NJNGTYz9K6IMjme{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<cpp_h6>Unity를 사용한 공기부양정 시뮬레이터</cpp_h6>*

1. Unity Text Mesh Pro를 사용하여 UI를 제작하였습니다.
2. C++로 작성된 DLL을 C#의 P/Invoke를 통해 유니티에서 호출하고, C++과 C# 간의 데이터 타입 불일치를 해결하기 위해 마샬링을 사용하여 상호 운용성을 구현했습니다.


<br>
<br>

## <work_h2> 결과(성과) 및 데모 </work_h2>

<iframe width="100%" style="aspect-ratio:16/9" src="https://drive.google.com/file/d/1zPU8VvS2mzCRwZmeRKXTv50Otgyq2nST/preview" title="Hover(WinAPI)" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

<iframe width="100%" style="aspect-ratio:16/9" src="https://drive.google.com/file/d/1xLeYcxPUKeWWnan7mNxiZUk1E3FuphDr/preview" title="Hover(WinAPI)" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

- <span><work_h5>성과:</work_h5> 제어, 동역학 교수님 코드를 분석하여 성공적으로 시뮬레이터에 코드를 적용하였습니다. </span>
- <span><work_h5>깃허브(코드): </work_h5>제가 당시 읽은 논문들하고 문서들이 많아서 코드를 공개할 수는 없을 꺼 같습니다.</span>

<br>
<br>

## <work_h2> 비고 및 여담 </work_h2>

이 프로젝트는 제어 및 동역학 분야에서의 경험을 심화하기 위한 개인적인 학습 목적으로 진행되었습니다. 회사 업무와 무관하게 이루어진 프로젝트였으며, 특히 물리 시뮬레이션과 관련된 동역학 및 제어 알고리즘 구현에 초점을 맞췄습니다. WinAPI를 통한 공기부양정 시뮬레이터 구현과 유니티를 활용한 시스템 이식 과정을 통해 다양한 개발 환경에서의 문제 해결 능력을 키울 수 있었습니다. 

해당 영상에서 보이는 차이는 WinAPI와 Unity의 프레임 처리 방식 차이에서 비롯됩니다. WinAPI에서는 프레임당 시간 간격을 dt = 0.001로 고정하여 계산한 반면, Unity는 Time.deltaTime을 사용해 실제 렌더링 시간에 따라 동적으로 계산합니다. 이로 인해 시각적으로 차이가 있을 수 있으나, 두 버전 모두 동일한 물리 계산을 기반으로 작동하고 있습니다.
