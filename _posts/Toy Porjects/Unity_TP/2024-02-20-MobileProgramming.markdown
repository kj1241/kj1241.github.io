---
layout: post
title: "모바일증강현실프로그래밍실습 - 일반 과제"
date: 2024-02-20 09:00:00 +09:00
image: https://drive.google.com/thumbnail?id=1jo91tPIDGQz2umSVyPjEheLdCDj4-kjo
toc: true
categories: [Unity_TP] 
keywords: C#, Unity, BFS, 넓이 우선탐색, 레이 케스트, 픽킹 
related_links:
---

## <unity_h2> 프로젝트 소개 </unity_h2>



<br>
<br>

## <unity_h2> 프로젝트 개요 </unity_h2>

- <span><unity_h5>프로젝트명:</unity_h5> PlaplaPlanet ver.1</span>
- <span><unity_h5>과제:</unity_h5> 2016년 2학기 모바일증강현실프로그래밍실습 일반 과제</span>
- <span><unity_h5>게임 장르:</unity_h5> Toy Project</span>
- <span><unity_h5>기간:</unity_h5> 제작 완료</span>
    - ver.1: 2016.09.03~2016.12.10(제작)
- <span><unity_h5>개발인원:</unity_h5> Developer(1명)</span>
- <span><unity_h5>플랫폼:</unity_h5> PC (Window)</span>

<br>

### <unity_h3> 기술 스택 </unity_h3>

- <span><unity_h5>개발 도구:</unity_h5> Unity 5.4.1f1 → 2019.4.22f1 / visual stuido </span>
- <span><unity_h5>개발 언어:</unity_h5> C# / mono </span>

<br>
<br>


## <unity_h2> 프로젝트 특징 및 기능 구현 </unity_h2>

개인적으로 공부했던 부분을 제작하여 제출한 과제들 입니다.


<br>

### <unity_h3>두 오브젝트 사이 거리 제기 ver.1</unity_h3><red1_error> (전체 제작 기여도: 100%)</red1_error>

![오브젝트 사이 거리]({{ site.google_drive }}1udSrQofiZhOOymElYmII2kH35dSZFvVs{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<unity_h6>오브젝트 사이 거리</unity_h6>*

피타고라스의 정리를 활용하여 두 개의 오브젝트 간의 거리를 계산하는 코드를 작성했습니다. 이 코드는 Unity 엔진에서 작동하며, Debug.DrawLine 함수를 사용하여 두 오브젝트를 연결하는 선을 시각적으로 표시합니다.

<br>

### <unity_h3>레이 케스트 연습 ver.1</unity_h3><red1_error> (전체 제작 기여도: 100%)</red1_error>

![레이 캐스트]({{ site.google_drive }}1CCCh4h8TAcVNw28yOeAm-R0y0DLaosXF{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<unity_h6>레이 캐스트 연습</unity_h6>*

카메라에서 레이를 발사하는 코드를 작성하여 원하는 방향으로 레이를 쏠 수 있도록 구현했습니다. 그 후에는 레이캐스트를 사용하여 레이와 충돌하는 오브젝트의 정보를 얻을 수 있습니다. 이를 통해 오브젝트의 위치를 정확하게 파악할 수 있습니다.

<br>

### <unity_h3>넓이 우선 탐색을 이용해서 오브젝트 이동시키기 ver.1</unity_h3><red1_error> (전체 제작 기여도: 100%)</red1_error>

![레이 캐스트]({{ site.google_drive }}1jo91tPIDGQz2umSVyPjEheLdCDj4-kjo{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<unity_h6>레이 캐스트 연습</unity_h6>*

보이는것보다 복잡함으로 차근차근 이야기해보겠습니다. 
1. 마우스가 클릭한 지점을 입력받아서 뷰잉 좌표 → 월드 좌표로 변환해서 목적지 값을 산출합니다.
2. 화면에 안보이는 10*10의 셀을 나누고 오브젝트가 있는 지점에서 부터 마우스 클릭 목적지까지 넓이 우선탐색으로 계산합니다.
3. 계산에 도출된 셀들을 리스트에 넣고 코루틴을 이용하여 하나씩 빼주면서 이동시켜줍니다.

<br>
<br>

## <unity_h2> 비고 및 여담 </unity_h2>

- 배운점
    1. 수학공식을 이용하여 코드로 적용시키는 방법에 대해서 학습하였습니다.
    2. 레이 캐스트를 이용해서 카메라에서부터 오브젝트까지 레이를 쏴 충돌하여 해당 좌표를 얻는 방법을 학습하였습니다.
    3. BFS 방식을 사용하여 오브젝트의 길 찾는 방법에 대해서 학습하였습니다.