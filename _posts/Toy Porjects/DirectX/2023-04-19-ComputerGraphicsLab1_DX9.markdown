---
layout: post
title: "컴퓨터그래픽스실습(1) - 일반 과제1(DirectX 9 & 쉐이더)"
date: 2024-04-19 09:00:00 +09:00
image: https://drive.google.com/thumbnail?id=1NPHNbxW0DaoyFPUtvwkikDYhD3R8gSKk
toc: true
categories: [DirectX]
keywords: C++, DirectX 9
related_links:
---

## <cpp_h2>프로젝트 소개</cpp_h2>

Direct X는 저의 대학교 시절을 차지하는 전부였습니다. 그래서 부끄럽다고 생각하지만 이런 기억들을 인정하고 가야 성장 할 수 있기 때문에 올리게 되었습니다. 비록 코드들은 엉망이지만 제가 만들고 싶은 부분들을 만들 수 있어서 가장 빛나는 기억입니다. 보다 초라하지만, 그냥 웃고 지나가 주세요.

<br>
<br>

## <cpp_h2>프로젝트 개요</cpp_h2>

- <span><cpp_h5>프로젝트명:</cpp_h5> 컴퓨터그래픽스실습(1) 과제</span>
- <span><cpp_h5>과제:</cpp_h5> 2016년 1학기 컴퓨터그래픽스실습(1) 일반 과제</span>
- <span><cpp_h5>게임 장르:</cpp_h5> Toy Project</span>
- <span><cpp_h5>기간:</cpp_h5> 제작 완료</span>
    - ver.1: 2016.03.15~2016.05.31
- <span><cpp_h5>개발인원:</cpp_h5> Developer(1명)</span>
- <span><cpp_h5>플랫폼:</cpp_h5> PC (Window)</span>

<br>

### <cpp_h3> 기술 스택 </cpp_h3>

- <span><cpp_h5>개발 도구:</cpp_h5> viusal studio 2015 </span>
- <span><cpp_h5>개발 언어:</cpp_h5> c++  </span>

<br>
<br>

## <cpp_h2> 프로젝트 챕터 </cpp_h2>

개인적으로 공부했던 부분을 제작하여 제출한 과제들 입니다.

<br>

### <cpp_h3> 1) DX sample browser 보며 연습하기</cpp_h3><red1_error> (전체 제작 기여도: 100%)</red1_error>

![오브젝트 만들기]({{ site.google_drive }}1NPHNbxW0DaoyFPUtvwkikDYhD3R8gSKk{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<cpp_h6>오브젝트 만들기</cpp_h6>*

과제는 DirectX 9를 사용하여 디바이스를 생성하고 삼각형을 그리는 것이었습니다. 그러나 과제가 지루해서 대신 모눈종이를 활용하여 나비를 그렸습니다. 나비의 주요 부위마다 점을 찍고, 모눈종이의 중심에도 점을 찍어서 이를 이용하여 시계 방향으로 삼각형을 그려 나비를 표현했습니다. 결과적으로 구현은 잘못되었지만, 이러한 접근 자체도 의미 있고 재미있는 시도였기에 수정하지 않았습니다.

<br>

### <server_h3> 2) 오브젝트 애니메이션 만들기 </server_h3><red1_error> (전체 제작 기여도: 100%)</red1_error>

<iframe width="100%" style="aspect-ratio:16/9" src="https://drive.google.com/file/d/1Ea2Pr9SA8qLOVIiOYsi5ruecvXwf0tnK/preview" title="오브젝트 애니메이션 만들기" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

수업에서는 태양을 중심으로 하는 행성 시스템을 구현하는 방법을 배웠습니다. 이를 기반으로 과제에서는 태양 주변에 행성을 배치하고, 이들에게 위성을 추가하여 애니메이션을 작성했습니다.

<br>

### <server_h3> 3) DX9를 이용하여 자유롭게 구현하기 </server_h3><red1_error> (전체 제작 기여도: 100%)</red1_error>

<iframe width="100%" style="aspect-ratio:16/9" src="https://drive.google.com/file/d/13N6NgfMr6GTqCS29YMbUK_Gj3UrBS7GC/preview" title="DX9를 이용하여 자유롭게 구현하기" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

마우스 포인터를 날개의 끝 부분으로 설정하여, 마우스의 움직임에 따라 날개 애니메이션을 구현하고자 했습니다. 비록 수학적인 계산이 부족하여 원하는 형태가 완벽하게 표현되지는 않았지만, 기본 아이디어는 구현되어 완성본을 제출했습니다. 이를 통해 새로운 시도와 노력의 결과물을 보여주고자 했습니다.

<br>

### <server_h3> 4) 오브젝트 바이너리 파일을 사용하여 불러오기 </server_h3><red1_error> (전체 제작 기여도: 100%)</red1_error>

<iframe width="100%" style="aspect-ratio:16/9" src="https://drive.google.com/file/d/1yVTVa60IhqG0mvyLQMiTfwlKmyUzBM2d/preview" title="오브젝트 바이너리 파일을 사용하여 불러오기" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

강의에서는 바이너리 텍스트 파일을 활용하여 오브젝트를 구현하는 방법에 대해 배웠습니다. 이를 활용하여 박스를 인덱스 버퍼로 인포트하는 기능을 구현했습니다

<br>

### <server_h3> 5)(모작)DX9를 이용하여 간단한 게임 만들기 </server_h3><red1_error> (전체 제작 기여도: 100%)</red1_error>

<iframe width="100%" style="aspect-ratio:16/9" src="https://drive.google.com/file/d/11i7mD-aw-F9F2LhHOmvDX0YD0lXw3JJ7/preview" title="(모작)DX9를 이용하여 간단한 게임 만들기" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

DX9를 이용하여 간단한 게임을 제작하는 것이 과제였습니다. DX sample을 모작하여 충돌처리, Xaudio를 이용하여 효과음 제생등을 구현하였습니다.

<br>

### <server_h3> 6) 렌더몽키를 사용하여 쉐이더 변형하기 </server_h3><red1_error> (전체 제작 기여도: 100%)</red1_error>

<iframe width="100%" style="aspect-ratio:16/9" src="https://drive.google.com/file/d/1QyICssbrfrQ5TB6lpc1rc7dHERdrwXCk/preview" title="렌더몽키를 사용하여 쉐이더 변형하기-색 변형" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>


<iframe width="100%" style="aspect-ratio:16/9" src="https://drive.google.com/file/d/1Sd5KaEQajlREHQLxtIQCwFMA42R7VnWm/preview" title="(모작)DX9를 이용하여 간단한 게임 만들기-빠르게 쏘기" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

수업에서 랜더몽키를 설치하는 방법에 대해서 배웠고 DX9에서 HLSL 쉐이더를 어떻게 구현하는지에 관해서 학습하였습니다. 이를 바탕으로 자유롭게 쉐이더를 개조해 보는 것이 과제였습니다. 따라서 공의 색을 빨간색에서 파란색으로 바꾸고 그림자의 크기를 증가시키고 평범하게 쏘던 공을 갑자기 빠른 속도로 출발시키는것으로 구현하였습니다.


## <unity_h2> 비고 및 여담 </unity_h2>

- 배운점 및 수정할 점
    - DX9에서 버텍스 버퍼, 인덱스 버퍼에 관해서 사용하는 방법을 알게 되었습니다.
    - DX9에서 애니메이션을 만드는 방법에 대해서 알게 되었습니다.
    - DX9에서 텍스트파일 임포트하여 오브젝트를 만드는 방법에 대해서 공부하였습니다.
    - DX9에서 충돌처리, 사운드 효과음을 넣는 방법에 대해서 알게되었습니다.
    - HLSL에 대해서 학습하고 수정하는 방법에 대해서 공부하였습니다. 