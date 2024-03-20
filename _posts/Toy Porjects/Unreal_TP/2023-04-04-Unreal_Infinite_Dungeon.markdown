---
layout: post
title: "언리얼 프로젝트 모방하기"
date: 2023-06-27 01:29:24 +0900
image: https://drive.google.com/thumbnail?id=1dbJKQ2djN8JaGhojxg8vW-828_AHDGlk
toc: true
categories: [Unreal_TP]
tags: [C++,Unreal]
---

## <cpp_h2> 프로젝트 소개 </cpp_h2>

언리얼 엔진을 사용한 무한던전 모방 프로젝트는 C++로 구현되며, 랜덤 생성된 던전과 캐릭터를 포함하며, 플레이어는 계속해서 던전을 탐험하며 적들과 전투합니다.  

<br>
<br>

## <cpp_h2>프로젝트 개요</cpp_h2>

- <span><cpp_h5>프로젝트명:</cpp_h5> Infinite Dungeon 모방하기</span>
- <span><cpp_h5>게임 장르:</cpp_h5> Toy Project</span>
- <span><cpp_h5>기간:</cpp_h5> 제작 완료</span>
    - ver.1: 2023.05.22~2023.06.15(제작)
- <span><cpp_h5>개발인원:</cpp_h5> Developer(1명)</span>
- <span><cpp_h5>플랫폼:</cpp_h5> PC (Window)</span>


<br>

### <cpp_h3> 기술 스택 </cpp_h3>

- <span><cpp_h5>개발 도구:</cpp_h5> Unreal 4.26.2 / viusal studio 2019 </span>
- <span><cpp_h5>개발 언어:</cpp_h5> C++ / bluePrint  </span>

<br>
<br>

## <cpp_h2> 프로젝트 특징 및 기능 구현 </cpp_h2>

1. 게임을 제작함으로써, 10년 만에 사용하는 언리얼 엔진의 숙련도를 높이는데 목표를 두고 있습니다.
2. 참고 도서를 보고, 지금까지 게임 만든 방식들을 돌아보며, 다른 개발자의 제작 방식을 살펴보는 데에 초점을 맞추었습니다.
3. 블루 프린터를 사용한 언리얼 툴에 대해서 집중적으로 보았습니다.

<br>

### <cpp_h3>무한 던전 토이 프로젝트 제작 ver.1</cpp_h3><red1_error> (전체 제작 기여도: 100%)</red1_error>

![화면]({{ site.google_drive }}1dbJKQ2djN8JaGhojxg8vW-828_AHDGlk{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}

1. GTA와 비슷한 3인칭 컨트롤 구현하였습니다.
2. 애니메이션 몽타주를 활용하여 애니메이션 콤보 공격을 구현하였습니다.
3. 콜리전을 이용하여 대미지 전달 방식을 구현하였습니다.
4. 에셋을 활용하여 캐릭터에 무기를 장착하는 방식을 구현하였습니다.
5. 블루 프린터를 이용하여 UI와 AI기능을 구현하였습니다.
6. 엑셀로 간편하게 레벨 디자인을 할 수 있도록 구현하였습니다.


<br>
<br>

## <cpp_h2> 결과(성과) 및 데모 </cpp_h2>

<iframe width="100%" style="aspect-ratio:16/9" src="https://www.youtube.com/embed/MkTLRH3twNg" title="언리얼 프로젝트 모방하기 Ver.1(무한던전)" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>


- <span><cpp_h5>성과:</cpp_h5> 토이 프로젝트 데모 제작 </span>
- <span><cpp_h5>깃허브(코드):</cpp_h5> [https://github.com/kj1241/Unreal_Toy_Project](https://github.com/kj1241/Unreal_Toy_Project)</span>
<br>
<br>

## <cpp_h2> 비고 및 여담 </cpp_h2>

- 실행하는 데 있어서 발생한 각종 에러는 구글링과 언리얼 개발자 커뮤니티를 참조하여 해결하였습니다.

<br>

### <cpp_h3> 배운 점 및 앞으로 수정할 점 </cpp_h3>

- 배운점
    - 블루 프린터를 사용하여 애니메이션, UI, 비헤이어 비어 트리등을 사용하는 방법을 익혔습니다.
    - C++ 사용하여 원활하게 블루프린터와 연동하는 방식에 대해서 익혔습니다. 
    - 책에 나와있지 않는 부분 (소켓 생성, 블루프린트 로직 작성등) 연습하기 위해 직접 제작하였습니다. 
- 보안해야될 사항
    - 실행하는데 문제가 없지만 캐릭터선택 화면에서 UI 블루프린터의 로직에러에 대해서 조사 중입니다.
    - 에셋을 사용하여 배경을 제작하였는데, 배경에 관해서 좀 더 심도 있게 진행할 예정입니다.

<br>

---

<br>

###### <cpp_h6>참조:</cpp_h6> 이득우의 언리얼 C++ 게임 개발의 정석

