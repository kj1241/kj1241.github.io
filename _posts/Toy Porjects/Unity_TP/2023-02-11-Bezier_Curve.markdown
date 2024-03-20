---
layout: post
title: "베지어 곡선을 이용한 스킬 제작 ver.3"
date: 2023-02-11 00:24:51 +0900
image: https://drive.google.com/thumbnail?id=1gryui0JdDUhYkZ_1ADllHXbXmypPypWz
toc: true
categories: [Unity_TP]
tags: [C#, Unity, Shader, Bezier Curve]
---

## <unity_h2> 프로젝트 소개 </unity_h2>

Unity와 C#을 이용하여 개발된 토이프로젝트입니다. 이 프로젝트는 리그 오브 레전드(League of Legends) 챔피언인 카이사(Kai'Sa)의 Q 스킬을 모방하여, 베지어 곡선을 활용한 독특한 스킬을 제작하였습니다. 이를 통해 게임 내 스킬 구현 및 애니메이션에 대한 실전 경험을 쌓았습니다.  

<br>
<br>

## <unity_h2> 프로젝트 개요 </unity_h2>

- <span><unity_h5>프로젝트명:</unity_h5> 3D 전투 액션 스킬 제작하기</span>
- <span><unity_h5>게임 장르:</unity_h5> Toy Project</span>
- <span><unity_h5>기간:</unity_h5> 제작 완료</span>
    - ver.1: 2022.11.24~2022.11.25(베지어 곡선)
    - ver.2: 2022.12.20 (트레일 렌더러)
    - ver.3: 2023.02.13 (시각적 효과 업데이트)
- <span><unity_h5>개발인원:</unity_h5> Developer(1명)</span>
- <span><unity_h5>플랫폼:</unity_h5> PC (Window)</span>

<br>

### <unity_h3> 기술 스택 </unity_h3>

- <span><web_h5>개발 도구:</web_h5> Unity 2021.3.14f1 / Visual studio</span>
- <span><web_h5>개발 언어:</web_h5> c# / mono</span>
- <span><web_h5>그래픽 디자인:</web_h5> Adobe Photoshop</span>

<br>
<br>

## <unity_h2> 프로젝트 특징 및 기능 구현 </unity_h2>

업데이트 별 프로젝트 특징과 기능 구현 내용입니다.

<br>

### <unity_h3>베지어 곡선을 사용하여 선그리기 ver.1</unity_h3><red1_error> (전체 제작 기여도: 100%)</red1_error>

1. 카이사 Q 스킬 모방하여, 스킬 파이어볼을 제작하였습니다.
   - 프리넬 반사를 적용하여 파이어볼 느낌을 더했습니다.
   - 민맵을 사용하여 날라가는 백터 방향으로 꼬리를 표현하였습니다.
2. 스킬에 베지어 곡선을 적용하여 유닛 타게팅을 만들었습니다.


<br>

#### <unity_h4>적용할 베지어 곡선</unity_h4>

![베지어 곡선]({{ site.google_drive }}1xPG5PMS-TIrYmQ_FfAMpe7gC6BCxRbMm{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<unity_h6>적용할 베지어 곡선</unity_h6>*

- 오브젝트에 응용한 베지어 곡선 예시입니다.

<br>

#### <unity_h4>오브젝트에 적용된 베지어 곡선</unity_h4>

![오브젝트에 적용된 베지어 곡선]({{ site.google_drive }}1izKTJYmBtOz6siLTxp-7DMv8pVKu3kdR{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<unity_h6>적용할 베지어 곡선</unity_h6>*

- 오브젝트에 적용된 베지어 곡선입니다.

<br>

#### <unity_h4>움직일시 쉐이더를 사용하여 오브젝트 변경</unity_h4>

![움직일시 쉐이더를 사용하여 오브젝트 변경]({{ site.google_drive }}19qErx-QM3G3aEwzKA6nxZGmSeXoFRujd{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<unity_h6>움직일시 쉐이더를 사용하여 오브젝트 변경</unity_h6>*

- 이동시 백터를 계산하여 오브젝트 변형을 만들었습니다.

<br>

#### <unity_h4>파이어 볼 오브젝트</unity_h4>

![움직일시 쉐이더를 사용하여 오브젝트 변경]({{ site.google_drive }}17xW8cVaWby4MOx5ns76_uEzxZIovwyQG{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<unity_h6>파이어 볼 오브젝트</unity_h6>*

- 텍스쳐와 프리넬 반사(림 라이트)를 조합하여 불투명한 파이어볼을 제작하였습니다.
- 노이즈 맵을 적용하여 날라가는 방향으로 꼬리가 생기도록 쉐이더를 제작하였습니다.


<br>

### <unity_h3>Trail Render를 이용하여 혜성효과 주기 ver.2</unity_h3><red1_error> (전체 제작 기여도: 100%)</red1_error>

![Trail Render]({{ site.google_drive }}1gryui0JdDUhYkZ_1ADllHXbXmypPypWz{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<unity_h6>Trail Render를 적용한 파이어볼</unity_h6>*

- Trail Render를 사용하여 혜성의 꼬리효과를 주었습니다.

<br>

### <unity_h3>스킬 비주얼 다듬기 ver.3</unity_h3><red1_error> (전체 제작 기여도: 100%)</red1_error>

1. 쿨타임 버튼을 제작하였습니다.
2. 유니티의 Trail Render를 다듬어서 좀 더 날아가는 느낌을 주었습니다.
3. 오브젝트와 충돌하면 충돌 파티클이 생성되도록 코드를 작성하였습니다.


<br>
<br>

## <unity_h2> 결과(성과) 및 데모 </unity_h2>

<iframe width="100%" style="aspect-ratio:16/9" src="https://www.youtube.com/embed/D5vNHpiF63I" title="Skill imitation bezier curve (기능 추가)" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

- <span><unity_h5>성과:</unity_h5> 토이 프로젝트 데모 프로그램 제작 </span>
- <span><unity_h5>지드라이브(코드):</unity_h5> [https://github.com/kj1241/Unity_practice/tree/main/Bezier_Curves_test](https://github.com/kj1241/Unity_practice/tree/main/Bezier_Curves_test)</span>


<br>
<br>

## <unity_h2> 비고 및 여담 </unity_h2>

- 배운점
    - 베지어 곡선을 사용하여 이동, 스킬 구현을 할 수 있게 되었습니다.
    - 유니티 Trail Render를 이용하여 오브젝트의 퀘적효과를 구현할 수 있게 되었습니다.