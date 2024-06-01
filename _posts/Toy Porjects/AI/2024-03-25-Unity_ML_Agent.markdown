---
layout: post
title: "유니티 ML-Agent를 이용한 머신러닝 (w.구글 코렙)"
date: 2023-03-25 09:00:00 +0900
image: https://drive.google.com/thumbnail?id=1wn87kMW53ktmkc0fIIHJRYT5BHJPcZau
toc: true
categories: [AI]
keywords: AI, c#, Unity, Machine Learning Agents, python, tenserflow
addsence: false
lastmod: 2024-05-31 00:01:00 +09:00
sitemap:
  changefreq : daily
  priority : 1.0
excerpt: 게임 잼 출전을 위해 시작한 토이 프로젝트로, Unity ML-Agent를 활용하여 강화학습 AI를 개발했습니다.
related_links:
    - url: /other_articles/ComparisonDeepLearningFramework.html
---

## <ai_h2> 프로젝트 소개 </ai_h2>

게임 잼에 출전해서, 머신러닝으로 학습된 AI를 이용하여 게임을 만들고 싶어서 시작한 토이 프로젝트입니다. 유니티 ML-Agent를 사용하여 머신러닝 코드를 작성하였습니다.


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

유유니티에서 제공하는 ML-Agents를 이용하여 퐁 게임을 학습시키는 과정을 보여줍니다.


<br>

#### <ai_h4> PythonAPI를 사용한 머신러닝(tenserflow이용)</ai_h4>

<iframe width="100%" style="aspect-ratio:16/9" src="https://www.youtube.com/embed/7pZ6HOA3r9Y" title="PythonAPI를 사용한 머신러닝(tenserflow이용)" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

노트북을 사용하여 ML-Agents를 학습시키는 과정에서 GPU 프리징 문제가 발생했습니다. 이를 해결하기 위해 Google Colab을 사용하여 Python API를 통해 학습을 수행하는 과정을 보여줍니다.


<br>

### <ai_h3>player를 따라다니는 agent 만들기 ver.2</ai_h3><red1_error> (전체 제작 기여도: 100%)</red1_error>

플레이어를 따라다니는 펫등의 AI를 만들기 위해서 학습시키는 과정입니다.

<br>

#### <ai_h4> 싱글 환경으로 학습시키기</ai_h4>

![WaterTestEffectRenader]({{ site.google_drive }}1k6oC2SezrrSjU8sfWRaHeHiZxnzYolDD{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<unity_h6> 싱글 환경으로 학습시키기 </unity_h6>*

<br>

#### <ai_h4> 멀티 환경으로 학습시키기</ai_h4>

<iframe width="100%" style="aspect-ratio:16/9" src="https://www.youtube.com/embed/jXnS1w-NhSE" title="Unity 자체 ml-agents 이용 멀티 환경 모델 훈련" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

AI가 플레이어를 따라다니기 위해 유니티 ML-Agent를 사용하여 학습시키는 과정을 보여줍니다. 해당 영상에서는 10개의 환경을 만들어 학습 속도를 10배 빠르게 증가시켰습니다.  

<br>
<br>

## <ai_h2> 결과(성과) 및 데모 </ai_h2>

![Tenserborad그래프1]({{ site.google_drive }}1gaCEs8pHTLZJJ78_EdxmrDHHqJy-IsDm{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}

![Tenserborad그래프2]({{ site.google_drive }}1v6F2d829RjvvEcsMHI4UhcMKWHOlhGGT{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}


<iframe width="100%" style="aspect-ratio:16/9" src="https://www.youtube.com/embed/zjCOXWc5wQ0" title="Unity 자체 ml-agents 이용 멀티 환경 모델 훈련" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>


- <span><ai_h5>성과:</ai_h5> Unity ML-Agent를 이용한 프로젝트 연습 </span>
- <span><ai_h5>깃허브(코드):</ai_h5> [https://github.com/kj1241/AI_Portfolio/tree/main/Pong_UnityMLAgent](https://github.com/kj1241/AI_Portfolio/tree/main/Pong_UnityMLAgent)</span>

<br>
<br>

## <ai_h2> 비고 및 여담 </ai_h2>

- 머신러닝 학습을 시작한 이유:
    - 게임 잼에서 새로운 도전을 위해 연습하게 되었습니다. 당시 게임 잼(패럴림픽)에서는 결과가 좋지 않았지만, 준비 과정에서 머신러닝을 학습하고 데이터셋을 준비했습니다. 이 과정은 AI 데이터셋을 준비하기 전에 머신러닝을 학습하는 단계였습니다.

- 퐁 게임의 결과가 없는 이유:
    - 프로젝트를 직접 다운받아보시면 아시겠지만, AI가 너무 뛰어나서 모든 공을 막아내기 때문에 원하는 결과물이 나오지 않았습니다.

- 배운 점:
    - ML-Agent의 코드를 확인하고 응용하여 Google Colab에서 학습시킬 수 있었습니다. 현재는 코드 작성 방법이 기억나지 않더라도 프로젝트를 다시 살펴보면 다시 작동시킬 수 있습니다. ~~그래서 테스트 코드만 짜지 말고 도큐먼트를 작성하라고...~~
    - 머신러닝을 이용하여 AI를 학습시키는 방법을 공부했습니다.

이 포트폴리오는 제가 머신러닝을 통해 AI를 학습시키는 방법을 배운 과정을 보여줍니다. 프로젝트를 통해 얻은 교훈과 기술을 향후 프로젝트에 적용할 수 있을 것입니다.