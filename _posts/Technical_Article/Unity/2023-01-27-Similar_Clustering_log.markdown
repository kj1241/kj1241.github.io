---
layout: post
title: "Game AI 기말 과제 - 유사 Clustering AI 기획 및 제작 로그"
date: 2023-01-27 16:06:01 +0900
image: https://drive.google.com/thumbnail?id=1s0G2EkeJhKOyJ8Gl-tlwd20R9g-m3dhP
toc: true
categories: [Unity]
tags: [C#, Unity, Similar Clustering]
keywords: C#, Unity, Similar Clustering
addsence: true
excerpt: Unity 및 C#을 활용한 리듬게임 '하나비 프로젝트'의 개발 로그입니다. 용어, 구성 방식, 프로세스를 소개하며, 게임잼 동안의 경험과 과정을 공유하고 있습니다.
related_links:
    - url: /ai/Similar_Clusters.html
---

## <ai_h2>1. 주제 선택의 이유</ai_h2>

AI 수업 첫 시간에서 새들이 날아가는 군집 영상을 보게 되면서 프로젝트 아이디어를 얻었습니다. 해당 영상이 저에게 큰 영향을 미쳤고, 그로부터 관련 주제를 선택하게 되었습니다. 군집과 비슷한 형태로 프로그램을 제작해 보기로 하였습니다.

<br>
<br>

### <ai_h3>1) 주제에 대한 고려사항</ai_h3>

프로젝트 주제를 선정할 때는 이미 존재하는 K-mean Clustering 알고리즘에 대한 인식이 있었습니다. 그러나 이 알고리즘이 비지도 학습 방식으로 동작하며 데이터의 내부 유사성을 기반으로 클러스터를 형성하는 특징을 감안할 때, 게임에 적용하기 어려울 것으로 판단하였습니다. 따라서 <unity_h5>유사 군집학습</unity_h5>을 만들기 위해 특징을 작게 나누어서 코드를 작성하기로 결정하였습니다.   

<br>
<br>

## <ai_h2>2. 분석 및 필요한 특징 도출</ai_h2>

새들이 비행하는 동영상을 연구한 결과, 두 가지 주요 특징을 발견했습니다.

1. 군집을 형성하기 위해 <unity_h5>우두머리</unity_h5> 가 필요하다는 점입니다.   
   리더 하이어라키(계층) 구조를 도입하여 군집체의 우두머리를 지정했습니다.

2. 군집체가 <unity_h5>일정한 간격</unity_h5>으로 비행해야 한다는 것이었습니다.  
   특정 거리를 벗어나면 군집체가 인력으로 이동하고 너무 가까워지면 척력이 발생하여 군집체가 멀어지도록 구현했습니다. 또한 리더가 움직일 때 하위 군집체가 속도를 받아 이동할 것인지 여부를 고민했지만, 리더가 움직임을 종료한 후 군집체 위치를 조정하기로 결정했습니다.

<br>
<br>

## <ai_h2>3. 구현 과정</ai_h2>

실제로 유니티로 구현하기위해 생각했던 과정들 입니다. 

<br>

![우두머리]({{ site.google_drive }}11vCqxaKjstL0ZpGZ_FlkX61Aacq_v9cn{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<unity_h6>우두머리의 존재</unity_h6>*

리더를 설정하여 군집체의 계층적 구조를 형성하였습니다. 이를 통해 군집체 간의 소속을 명확하게 정의하고 우두머리의 역할을 부여하였습니다.
  
<br>

![인력과 척력]({{ site.google_drive }}1bkylGn6qbIJ_nmiJsLU9hzRU64fPfa71{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<unity_h6>인력과 척력을 이용한 군집 위치 지정</unity_h6>*

특정 거리 이내 혹은 이외로 이동하는 군집체에 대해 인력과 척력을 도입하여 군집체의 이동을 조절하였습니다. 또한, 리더의 움직임에 따라 하위 군집체의 속도를 어떻게 조절할지에 대한 고민을 거쳐, 리더가 움직임을 종료한 후 군집체 위치를 조정하기로 결정하였습니다.

<br>
<br>

## <ai_h2>4. 미니게임 설명</ai_h2>

![미니게임]({{ site.google_drive }}1s0G2EkeJhKOyJ8Gl-tlwd20R9g-m3dhP{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<unity_h6>유사 군집 알고리즘을 이용한 미니 게임</unity_h6>*

- <unity_h5>목표:</unity_h5> 플레이어는 AI에게서 군집체를 빼앗아 많이 획득해야 합니다.
- <unity_h5>조건:</unity_h5>
    - 리더들의 특정 영역 안으로 군집체가 들어오면 군집체의 색상이 해당 리더의 색으로 변경됩니다. (영역 밖이면 흰색)
    - 리더들의 영역이 겹치면 군집체는 가까운 리더의 소속으로 변경됩니다.
    - 소속이 변경되면 군집체는 리더 쪽으로 인력과 척력이 발생하며, 군집체의 속도보다 리더의 속도가 더 빠릅니다.

<br>
<br>

## <ai_h2>5. 여담</ai_h2>

- 위의 겸험을 통하여 코드를 좀더 세분화 하여 작성하는 방법을 터득하였습니다.
- 이러한 상세한 변경과 추가 기능을 통해 미니게임은 더 흥미롭고 다양한 전략을 사용할 수 있는 경험을 얻었습니다.  
    


