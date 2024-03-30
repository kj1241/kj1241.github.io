---
layout: post
title: "유니티 ML-Agent를 이용한 머신러닝 (w.구글 코렙)"
date: 2023-03-25 09:00:00 +0900
image: https://drive.google.com/thumbnail?id=1wn87kMW53ktmkc0fIIHJRYT5BHJPcZau
toc: true
categories: [AI]
tags: [AI, c#, Unity, Machine Learning Agents, python, tenserflow]
keywords: AI, c#, Unity, Machine Learning Agents, python, tenserflow
related_links:
---

## <ai_h2> 프로젝트 소개 </ai_h2>

게임 잼에 출전해서, 머신러닝으로 학습된 ai를 가지고 게임을 만들고 싶어서 시작하게 된 토이 프로젝트입니다. 유니티 ml-agent를 이용하여 머신러닝 코드를 작성하였습니다. 


<br>
<br>

## <ai_h2> 프로젝트 개요 </ai_h2>

- <span><ai_h5>프로젝트명:</ai_h5>Unity Machine Learning Agents 연습하기</span>
- <span><ai_h5>장르:</ai_h5> Toy Project</span>
- <span><ai_h5>기간:</ai_h5> 제작 완료</span>
    - ver.1: 2021.03.09~2021.03.10 (Pong Game)
    - ver.2: 2021.03.09~2021.03.10 (machineLearing_tutorial)
- <span><ai_h5>개발인원:</ai_h5> Developer(1명)</span>
- <span><ai_h5>플랫폼:</ai_h5> PC (Window)</span>

<br>

### <ai_h3> 기술 스택 </ai_h3>

- <span><ai_h5>개발 도구:</ai_h5> Unity 2019.4.2f1  / visual stuido / tensorflow 2.4.1 / ml-agent 1.0.6 / Google Colab</span>
- <span><ai_h5>개발 언어:</ai_h5> C# / python 3.7 </span>

<br>
<br>

## <ai_h2> 프로젝트 특징 및 기능 구현 </ai_h2>

강화학습 ai를 연습하기 위해서 해당 프로젝트를 만들어 학습시키는 내용입니다. 노트북의 성능은 다음과 같습니다.

1. cpu: intel core i7-4720Q
2. 그래픽카드: NVIDA Geforce GTX-950
 

<br>

### <ai_h3>Pong Game ver.1</ai_h3><red1_error> (전체 제작 기여도: 100%)</red1_error>

퐁 게임에서 상대 ai를 DQN 강화학습 알고리즘으로 학습시키는 영상입니다.


#### <ai_h4>Unity 자체 ml-agents 이용</ai_h4>

<iframe width="100%" style="aspect-ratio:16/9" src="https://www.youtube.com/embed/u32zX3alOY4" title="Unity 자체 ml-agents 이용" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

유니티에서 나온 ml-agnet를 이용해서 퐁게임을 학습시는 것을 연습하는 영상입니다.


<br>

#### <ai_h4> PythonAPI를 사용한 머신러닝(tenserflow이용)</ai_h4>

<iframe width="100%" style="aspect-ratio:16/9" src="https://www.youtube.com/embed/7pZ6HOA3r9Y" title="PythonAPI를 사용한 머신러닝(tenserflow이용)" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

노트북을 사용해서 위의 자체 ml-agents를 이용해서 학습시키게 되면 문제가 발생했습니다. 학습시키면서 gpu 프리징이 일어납니다. 따라서 위의 문제를 해결하기 위해서 가상 노트북인 구글 코랩을 이용하여, api를 보내서 구글 코렙에서 학습시키는 영상입니다.


<br>

### <ai_h3>player를 따라다니는 agent 만들기 ver.2</ai_h3><red1_error> (전체 제작 기여도: 100%)</red1_error>

<iframe width="100%" style="aspect-ratio:16/9" src="https://www.youtube.com/embed/jXnS1w-NhSE" title="Unity 자체 ml-agents 이용 멀티 환경 모델 훈련" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

ai가 플레이어를 따라다니기 위해서, 유니티 ml-agent를 이용해서 학습시키는 영상입니다. 해당 영상에서는 10개의 환경을 만들어 학습시키는 속도를 10배 빠르게 증가시켰습니다.  



<br>
<br>

## <ai_h2> 결과(성과) 및 데모 </ai_h2>

![Tenserborad그래프1]({{ site.google_drive }}1gaCEs8pHTLZJJ78_EdxmrDHHqJy-IsDm{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}

![Tenserborad그래프2]({{ site.google_drive }}1v6F2d829RjvvEcsMHI4UhcMKWHOlhGGT{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}


<iframe width="100%" style="aspect-ratio:16/9" src="https://www.youtube.com/embed/zjCOXWc5wQ0" title="Unity 자체 ml-agents 이용 멀티 환경 모델 훈련" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>


- <span><ai_h5>성과:</ai_h5> Unity ML-agent를 이용해서 프로젝트 연습 </span>
- <span><ai_h5>구글 드라이브(코드):</ai_h5> [https://drive.google.com/drive/folders/1O5O3LPw9qtpunLd2UOB4AleKmCslQLCT](https://drive.google.com/drive/folders/1O5O3LPw9qtpunLd2UOB4AleKmCslQLCT)</span>

<br>
<br>

## <ai_h2> 비고 및 여담 </ai_h2>

- 머신러닝 학습할 하게 된 이유:
    - 단순히 게임 잼에서 좀 더 하지 못했던 도전을 하려고 연습하게 되었습니다. 당시의 게임 잼(페럴림픽)에서 비록 결과가 안좋았지만 준비하는 과정에서 머신러닝을 학습하고 데이터 셋까지 준비하였습니다. 이 과정은 제가 ai 데이터 셋을 준비하기 전에 머신러닝에 대해서 학습하는 과정입니다. 

- 퐁 게임의 결과가 없는 이유:
    - 프로젝트들 다운받고 해보시면 아시겠지만, ai가 너무 뛰어납니다. 무조건 전부 막기 때문에 원하는 방향이 아니라서 결과물을 도출하지 않았습니다.

- 배운 점:
    - ml-agent의 코드를 확인하고 응용하여 구글 코렙으로 학습을 시킬 수 있습니다.(현재는 코드 작성했던 방법이 기억 안나도, 프로젝트를 차근차근 다시 살펴보면 다시 작동시킬 수 있습니다.) ~~그러게 맨날 테스트 코드만 짜지말고 도큐먼트 작성좀하라고...~~
    - 머신러닝을 이용하여 ai를 학습시키는 방법에 대해서 공부하였습니다.

