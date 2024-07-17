---
layout: post
title: "Python과 Tenserflow을 사용하여 강화학습 연습하기"
date: 2024-03-24 09:00:00 +09:00
image: https://drive.google.com/thumbnail?id=1VAx0DvG4wDwxEvdlMF1jBbezJGM0A6-G
toc: true
categories: [AI]
keywords: AI, python, tenserflow, 린치 회귀, 데이터 전처리, 의사결정 트리
addsence: false
lastmod: 2024-05-31 09:00:00 +09:00
sitemap: 
  changefreq : daily
  priority : 1.0
excerpt: 이 프로젝트는 강화학습을 연습하기 위해 Python과 TensorFlow를 사용하여 모델을 학습시키고 분석했습니다.
related_links:
    - url: /ai/Unity_ML_Agent.html
    - url: /ai/TensorflowToBazel.html
---

## <ai_h2> 프로젝트 소개 </ai_h2>

이 프로젝트는 Python을 사용하여 강화학습을 연습하고, 구글 코랩의 가상 노트북 환경에서 진행되었습니다. 주요 기능으로는 데이터 전처리와 의사 결정 트리를 활용한 모델 훈련, 그리고 TensorFlow를 이용한 신경망 모델링이 포함됩니다.


<br>
<br>

## <ai_h2> 프로젝트 개요 </ai_h2>

- <span><ai_h5>프로젝트명:</ai_h5>python을 사용하여 강화학습 연습하기</span>
- <span><ai_h5>장르:</ai_h5> Toy Project</span>
- <span><ai_h5>기간:</ai_h5> 제작 완료</span>
    - ver.1: 2021.03.14~2021.03.15 (Assignment_test)
    - ver.2: 2021.05.27 (Test_DQN)
- <span><ai_h5>개발인원:</ai_h5> Developer(1명)</span>
- <span><ai_h5>플랫폼:</ai_h5> 가상 노트북</span>

<br>

### <ai_h3> 기술 스택 </ai_h3>

- <span><ai_h5>개발 도구:</ai_h5> Google Colab / tensorflow 2.4.1 / ml-agent 1.0.6 </span>
- <span><ai_h5>개발 언어:</ai_h5> python 3.7 </span>

<br>
<br>

## <ai_h2> 프로젝트 특징 및 기능 구현 </ai_h2>

구글 코랩의 가상 노트북 환경에서 강화학습을 연습하기 위해 진행한 프로젝트입니다.
 
<br>

### <ai_h3>Assignment test ver.1</ai_h3><red1_error> (전체 제작 기여도: 100%)</red1_error>

![Assignment]({{ site.google_drive }}1TxiJ47iLQpdIjUwpy6QTz57opgmaVFLe{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<ai_h6>Assignment test ver.1</ai_h6>*

머신러닝 챌린지에 참가했던 데이터 분석 코드입니다. 데이터 탐색과 전처리, 그리고 의사 결정 트리를 사용해서 모델을 훈련하였습니다. 주요 단계는 다음과 같습니다

1. 데이터 불러오기: CSV 파일을 불러와서 훈련 및 테스트 데이터 세트를 생성합니다.
2. 데이터 탐색: 각 데이터 프레임의 구조 및 열의 데이터 유형을 확인합니다. 결측치가 있는지, 범주형 열이 있는지 등을 확인합니다.
3. 데이터 전처리:
    - 범주형 변수를 수치형 변수로 변환합니다. 이를 위해 성별 데이터를 숫자형으로 변환하고, 결측치를 처리합니다.
    - 일부 수치형 열도 결측치를 처리하고, 필요에 따라 데이터 유형을 변경합니다.
    - 범주형 변수에 대한 더미 변수를 생성하여 모델에 사용할 수 있도록 준비합니다.
4. 데이터 모양 확인: 훈련 및 테스트 데이터 세트의 모양을 확인합니다.
5. 특성 엔지니어링: 범주형 변수를 더미 변수로 변환합니다.
6. 데이터 세트 준비 완료: 최종적으로 훈련 및 테스트 데이터 세트가 준비되고, 모델에 입력할 수 있도록 준비됩니다.
7. 모델의 훈련: 의사 결정 트리(Decision Tree) 분류기를 사용하여 모델을 훈련하고, 테스트 데이터에 대한 예측을 수행한 후 결과를 CSV 파일로 저장합니다.

<br>

### <ai_h3>Test DQN test ver.2</ai_h3><red1_error> (전체 제작 기여도: 100%)</red1_error>

![Test_DQN]({{ site.google_drive }}1VAx0DvG4wDwxEvdlMF1jBbezJGM0A6-G{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<ai_h6>Test DQN ver.2</ai_h6>*

Unity 강화학습 연동 전에 Python을 이용해서 연습한 코드입니다. 주요 내용은 다음과 같습니다

- 다항 회귀 분석과 릿지(Ridge) 회귀 분석을 사용하여 주어진 데이터에 대한 모델을 학습하고 시각화하는 예제입니다.
- 2048 게임을 환경으로 설정하고, 환경을 초기화하고 실행하며 그 결과를 출력합니다. 이 과정에서 관찰을 전처리 함수로 정의하고 TensorFlow를 사용하여 신경망 모델링을 합니다.
- Deep Q-Networks (DQN)의 핵심인 메모리 리플레이(memory replay)와 모델 학습(train) 함수를 정의합니다.


<br>
<br>

## <ai_h2> 결과(성과) 및 데모 </ai_h2>

- <span><ai_h5>성과:</ai_h5> Tenserflow를 이용해서 프로젝트 연습 </span>
- <span><ai_h5>깃허브(코드):</ai_h5> [https://github.com/kj1241/AI_Portfolio/tree/main/Tenserflow_Practice](https://github.com/kj1241/AI_Portfolio/tree/main/Tenserflow_Practice)</span>

<br>
<br>

## <ai_h2> 비고 및 여담 </ai_h2>

1. Test DQN 데이터 생성
    - x 값은 0에서 19까지의 정수로 구성된 배열입니다.
    - y 값은 x에 대한 다항식의 형태로 생성되었으며, 여기에 평균이 0이고 표준 편차가 40인 정규 분포로부터 노이즈가 추가되었습니다.

2. Test DQN 모델 학습 및 시각화
    - 3개의 서브플롯을 사용하여 데이터 포인트를 선택하고 릿지 회귀 모델을 학습한 결과를 보여줍니다.
    - 서브플롯 1: 데이터에서 무작위로 5개의 포인트를 선택하여 릿지 회귀 모델을 학습한 결과를 보여줍니다.
    - 서브플롯 2: 처음 5개의 데이터 포인트를 선택하여 릿지 회귀 모델을 학습한 결과를 보여줍니다.
    - 서브플롯 3: 마지막 5개의 데이터 포인트를 선택하여 릿지 회귀 모델을 학습한 결과를 보여줍니다.
    - 빨간색으로 표시된 점들은 해당 서브플롯에서 선택된 데이터 포인트를 나타내며, 파란색 선은 학습된 모델의 예측을 보여줍니다.
    
3. Test DQN 해석
    - 릿지 회귀는 선형 모델의 한 유형으로, L2 규제를 사용하여 가중치를 조절합니다. 이는 과적합을 방지하고 모델의 일반화 성능을 향상시킬 수 있습니다.
    - 각 서브플롯에서 모델이 선택한 데이터 포인트에 가장 잘 적합되도록 조정되었습니다.
    - 릿지 회귀의 alpha 매개변수는 규제의 강도를 조절합니다. 여기서는 alpha가 큰 값으로 설정되어 있으며, 이는 모델의 복잡도를 줄이고 일반화 성능을 향상시키는 데 도움이 됩니다.

이 포트폴리오는 제가 머신러닝을 통해 AI를 학습시키는 방법을 배운 과정을 보여줍니다. 프로젝트를 통해 얻은 교훈과 기술을 향후 프로젝트에 적용할 수 있을 것입니다.