---
layout: post
title: "졸업 과제 - 엔진 제작(DirectX9)"
date: 2024-05-04 09:00:00 +09:00
image: https://drive.google.com/thumbnail?id=1Q2aD85HtGIikiI1Z70ND8UNcShE-h4NT
toc: true
categories: [DirectX]
keywords: C++, DirectX 9
addsence: false
lastmod: 2024-07-07 09:00:00 +09:00
sitemap:
  changefreq : daily
  priority : 1.0
excerpt: 이 프로젝트는 DirectX 9 기반의 게임 엔진 제작을 졸업 과제로 진행했습니다. C++와 Visual Studio 2015를 사용하여 WIN API, 지형 구성, 애니메이션, UI 등을 구현했습니다.
related_links:
---

## <cpp_h2>프로젝트 소개</cpp_h2>

이 프로젝트는 졸업 과제로 진행된 DirectX 9 기반의 게임 엔진 제작입니다. 개발자는 Visual Studio 2015를 사용하여 C++로 구현하였고, Windows 플랫폼을 타겟으로 하였습니다. 프로젝트는 주로 WIN API, DirectX 9, 그리고 C++을 활용하여 게임 엔진의 기능들을 구현하였습니다.

<br>
<br>

## <cpp_h2>프로젝트 개요</cpp_h2>

- <span><cpp_h5>프로젝트명:</cpp_h5> DirectX 9를 이용한 엔진 제작</span>
- <span><cpp_h5>과제:</cpp_h5> 졸업 과제</span>
- <span><cpp_h5>게임 장르:</cpp_h5> 엔진 제작</span>
- <span><cpp_h5>기간:</cpp_h5> 제작 완료</span>
    - ver.1: 2018.06.01~2018.09.10
- <span><cpp_h5>개발인원:</cpp_h5> Developer(1명)</span>
- <span><cpp_h5>플랫폼:</cpp_h5> PC (Window)</span>

<br>

### <cpp_h3> 기술 스택 </cpp_h3>

- <span><cpp_h5>개발 도구:</cpp_h5> viusal studio 2015 / DirectX 9 / Window 7</span>
- <span><cpp_h5>개발 언어:</cpp_h5> c++ </span>

<br>
<br>

## <cpp_h2> 프로젝트 특징 및 기능 구현 </cpp_h2>

![졸업작품 UML]({{ site.google_drive }}1GIhH_EJvNqiAUa_ml9J3sBVdgVirdfZS{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<cpp_h6>졸업작품 UML</cpp_h6>*


졸업과제 기능 구현입니다.


<br>

### <cpp_h3> 화면 구성 </cpp_h3><red1_error> (전체 제작 기여도: 100%)</red1_error>

![졸업작품 비주얼 스튜디오 화면]({{ site.google_drive }}1plAKb4gzLI9ZqBfr51H_BuBbkewmsH0C{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<cpp_h6>졸업작품 비주얼 스튜디오 화면</cpp_h6>*

1. WIN API를 클래스로 구현할 때, MFC 구조처럼, win API 실제 사용 부분과 main 부분을 모듈화 하고 싶어서 프로시저에 this 포인트를 만들어 주기 위해 WInAPI 본인 포인터를 static으로 만들고 프로시저를 클리스화 처리하였습니다.
2. 마우스와 키보드 입력을 사용하기 위해 WIN API 와 DirectX 9 클래스에서 동시에 접근할 수 있도록 싱글 톤 패턴으로 처리하였습니다.
3. 키보드는 핸들 값으로 처리하는 WINAPI를 사용하지 않고 메크로 함수를 사용하여 키다운과 키업등을 구현하여 이벤트들을 처리하였습니다.
4. Stage를 구성하기 위해서 순수 가상함수의 추상화 Stage를 만든 후 다른 개별적인 클래스를 자식 클래스로 구현하였습니다.
	- intro-stage-dummy stages-end 화면으로 스테이지를 구성하였습니다.



<br>

### <cpp_h3> 지형 구성 </cpp_h3><red1_error> (전체 제작 기여도: 100%)</red1_error>

![졸업작품 지형 구성 화면]({{ site.google_drive }}1vOh0MEBboDZJhkXGbemohl8IJYgU0xrl{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<cpp_h6>졸업작품 지형 구성 화면</cpp_h6>*

1. Hight Map 지형을 만들기 위해서 3D 모델링 실습에서 제작한 Hight map 파일을 가져온 뒤, RGB 비트값(명도)를 이용하여 높이를 생성하였습니다.
2. Hight Map을 최적화하기 위해서 카메라의 위치에 따른 LOD를 생성, Hight Map을 구역별로 만들고 4개의 사각형을 1개로 만드는 방식인 쿼드트리를 사용하여 LOD를 구현하였습니다.
3. 추가적인 최적화를 위해서 카메라가 보이는 시야 밖으로 걸리는 mesh들을 렌더링 하지 않기 위해 절두체 컬링을 사용하였습니다.
4. 배경을 구현하기 위해서 스카이 박스 구현하였습니다.
5. 눈 내리는 효과를 만들기 위해서 STL<Vector>를 사용하여, 최대 제한을 걸어 최적화를 시켰으며, 눈 particle 입자를 넣은 후 랜덤 함수를 이용하여 약간의 랜덤 방향을 지정하여 밑으로 떨어지도록 구현하였습니다.
6. 안개 효과를 만들기 위해 shader 함수의 파이프라인을 구성해준 후 HLSL(FX)를 통하여 기본 안개 shader 구성하였습니다.
7. 카메라를 바라보는 오브젝트 및 UI를 구현하기 위해 빌보드를 구현하였습니다.
8. 테셀레이터 구현을 확인하기 위해서 텍스쳐를 빼고 정점 구성으로 볼 수 있도록 키를 배정하였습니다.


<br>

### <cpp_h3> 모델링 - 애니메이션 </cpp_h3><red1_error> (전체 제작 기여도: 100%)</red1_error>

![졸업작품 본 스켈레톤 모델링]({{ site.google_drive }}1NRrM-sPClZ-NS0ZpfolNVvV9r781ulXx{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<cpp_h6>졸업작품 본 스켈레톤 모델링</cpp_h6>*

![3D Max에서 애니메이션 수정]({{ site.google_drive }}1MrQNwHLkC4XHxHJGZD1Y_jGJquD8YJ65{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<cpp_h6>3D Max에서 애니메이션 수정</cpp_h6>*


1. 인터넷에서 무료 모델링을 다운로드하여 3D MAX에서 약간의 애니메이션 수정을 했습니다. 
	- 예를 들어 걷기 애니메이션을 추가했습니다.
2. 모델링에 skinning mesh를 제작하기 위해서 재귀함수를 사용하여, 본 스켈레톤 뼈대를 제작하였습니다.
3. 각각의 뼈마다 특정 충돌처리를 위해서 뼈에 mesh의 최소, 최댓값을 저장하여 바운드 박스를 구현하였습니다.
4. 3D MAX의 모델링을 DirectX 9로 사용하기 위해서 import export부분을 구현하였습니다.
5. 애니메이션은 키프레임 애니메이션과, 본 스켈레톤을 사용하였습니다. 
	- 용은 키 프레임을 사용하여 애니메이션을 처리하였고, 전사는 본 스켈레톤을 사용하여 구현하였습니다.
6. 본 스켈레톤 애니메이션을 구현하기 위해서 허리의 행렬을 사용해서 추가적으로 본에 영향을 미치도록 구현하고 추가적으로 다른 애니메이션 IK(또는 각 뼈대에 미치는 영향)을 구현하기 위해서 추가적으로 행렬을 STL<vector>로 저장하였습니다.
7. 구를 이용한 OBB와 박스를 이용한 AABB 구현하여 충돌처리 하였습니다. 캐릭터는 AABB 충돌 처리를 위해서 본에서 최대값과 최소값의 정보를 가져왔습니다.
8. 클래스 상속을 사용하여 FSM을 구현하여 캐릭터 상태를 만들었습니다.
	- 용은 AI를 구현하기 위해서 idel, walk, fly등 상태를 구현하였습니다.
	- 전사는 스킬을 구현하기 위해서 일반공격, 막기, 스킬1, 스킬2, 스킬3 상태를 구현하였습니다.

<br>

### <cpp_h3> UI구현 </cpp_h3><red1_error> (전체 제작 기여도: 100%)</red1_error>

![졸업작품 UI 구현]({{ site.google_drive }}1Q2aD85HtGIikiI1Z70ND8UNcShE-h4NT{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<cpp_h6>3졸업작품 UI 구현</cpp_h6>*

1. 배경 UI sprite 이미지와 폰트를 불러와서 사용하여 구현하였습니다.
2. Main window 뿐만 아니라 자식 window를만들어서 추가적으로 개임 내의 데이터를 실시간으로 볼 수 있도록 LOG window 생성하였습니다.
3. GPU 버튼 UI 제작하였습니다. picking 개념을 반대로 이용하여 월드 좌표에서 모델좌표로 변환시킨 후 마우스와 충돌 처리하였습니다.
	- 마우스와 충돌 시: UI 스케일 반전
	- 마우스 프레스 시: 알파 값 반전
	- 마우스 프레스 시: 알파 값 반전

<br>
<br>

## <cpp_h2> 결과(성과) 및 데모 </cpp_h2>

<iframe width="100%" style="aspect-ratio:16/9" src="https://www.youtube.com/embed/u7B57ykVUjg" title="FinalProject_CurrentStatus" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

<iframe width="100%" style="aspect-ratio:16/9" src="https://www.youtube.com/embed/XBUoXnueVog" title="FinalProject_Terrain" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

<iframe width="100%" style="aspect-ratio:16/9" src="https://www.youtube.com/embed/1o2gfec_aro" title="FinalProject_Anymation1" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

- <span><cpp_h5>성과:</cpp_h5> 졸업작품 완성 </span>

<br>
<br>

## <cpp_h2> 비고 및 여담 </cpp_h2>

- 여담
	- 마음대로 코드를 작성하여, 생각보다 더 코드가 엉망입니다.
	- 원래 계획은 IOCP 서버를 붙일 예정이였지만 지도교수님이 한소리 듣고 제작한 서버를 버렸습니다.