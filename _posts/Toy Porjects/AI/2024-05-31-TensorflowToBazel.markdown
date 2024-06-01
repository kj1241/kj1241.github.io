---
layout: post
title: "Python과 Tenserflow을 사용하여 강화학습 연습하기"
date: 2023-05-31 09:00:00 +09:00
image: https://drive.google.com/thumbnail?id=1LJeC32Z2NK8yXfu_etJ1UPKjIAr59Bdi
toc: true
categories: [AI]
keywords: AI, python, tenserflow, 린치 회귀, 데이터 전처리, 의사결정 트리
addsence: false
lastmod: 2024-05-31 09:00:00 +09:00
sitemap: 
  changefreq : daily
  priority : 1.0
excerpt: Bazel을 활용해 TensorFlow를 C++ 애플리케이션에 통합한 기계학습 프로젝트입니다. TensorFlow의 C API를 사용하여 선형 회귀 모델을 구축하고 학습시킵니다.

related_links:
---

## <ai_h2> 프로젝트 소개 </ai_h2>

Bazel을 사용하여 모델 라이브러리를 만들기 위한 기계학습 프로그래밍 연습 및 실습 프로젝트입니다. 당시 버전에서는 CMake를 지원하지 않으므로, 다양한 언어를 지원하는 Bazel을 사용하는 것이 권장됩니다.
또한 이 프로젝트는 TensorFlow를 C++ 애플리케이션에 통합하여 머신러닝 모델을 사용하는 것을 연습하기 위해 진행되었습니다. 주로 파일 입출력, 메모리 관리, TensorFlow 세션 관리와 같은 작업을 포함하며, 데이터 전처리 및 모델 로딩을 위한 다양한 기능이 구현되었습니다.  
이 프로젝트는 제가 tensorflow 2.4.0 베타 테스터 때 제작했던 코드로 설명하는 방법이 부족해서 구글드라이브에 박아놨던 코드입니다.

<br>
<br>

## <ai_h2> 프로젝트 개요 </ai_h2>

- <span><ai_h5>프로젝트명:</ai_h5>TensorFlow를 C++ 애플리케이션에 통합</span>
- <span><ai_h5>장르:</ai_h5> Toy Project</span>
- <span><ai_h5>기간:</ai_h5> 제작 완료</span>
    - ver.1: 2021.02.15~2021.02.22 ( MakeModelToPython / TensorflowToBazel )
- <span><ai_h5>개발인원:</ai_h5> Developer(1명)</span>
- <span><ai_h5>플랫폼:</ai_h5> PC</span>

<br>

### <ai_h3> 기술 스택 </ai_h3>

- <span><ai_h5>개발 도구:</ai_h5> TensorFlow C API / Python 3.7.9 / MSVC 2019 (Visual Studio) / Bazel 3.1.0 </span>
- <span><ai_h5>개발 언어:</ai_h5> C++ / Python </span>

<br>
<br>

## <ai_h2> 프로젝트 특징 및 기능 구현 </ai_h2>

tensorflow을 c++ 코드로 작성하기 위해서 bazel을 이용하여 DLL로 변환시키고 c++ 코드로 작성하는 과정입니다.

<br>

### <ai_h3> Bazel을 이용하여 Tensorflow DLL 포팅 ver.1</ai_h3><red1_error> (전체 제작 기여도: 100%)</red1_error>

![Bazel 구조]({{ site.google_drive }}19Q94MHOOZb2_w93R2T9--EAurFlxaJfp{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<ai_h6>Bazel 구조</ai_h6>*

이번 프로젝트는 다양한 버전의 TensorFlow, Python, Bazel 및 CUDA 설정을 통해 최적의 개발 환경을 구축하고, 기계학습 모델을 빌드하는 과정에서 발생하는 다양한 문제들을 해결하는 것을 목표로 합니다.

<br>

#### <ai_h4>설치 및 설정 과정</ai_h4><red1_error> (전체 제작 기여도: 100%)</red1_error>

1. MSYS2 다운로드 및 설치

    ![MSYS2설치]({{ site.google_drive }}1-W8LJkd-8cdXOGMTfu8xLDJmkK2a6tW9{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
    *<ai_h6>'pacman -S git patch unzip' MSYS2설치</ai_h6>*

    - TensorFlow 빌드에 필요한 bin 도구 설치합니다.
    - CMD를 이용하여 pacman -S git patch unzip 추가 설정합니다.
    

2. Bazel 설치 및 설정
    - 환경 변수 설정: %Path% 경로에 Bazel과 MSYS2 추가합니다.
    - 다양한 Bazel 버전을 테스트 후, 최적 버전으로 3.7.2 선택합니다.

3. TensorFlow 빌드
    - bazel build //tensorflow/tools/pip_package:build_pip_package 명령어 사용합니다.

4. CUDA 및 cuDNN 설치

    ![GPU버전 설치]({{ site.google_drive }}1nt39UHWNQOSvkGzgebO8oBYieWyWP9QB{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
    *<ai_h6>GPU버전 설치</ai_h6>*

    - GPU 사용을 위해 CUDA 10 및 연동되는 cuDNN 7.5.6 설치합니다.
    CUDA 11.2 및 cuDNN 8.1도 시도하였으나 호환성 문제 발생했습니다.

<br>

### <ai_h3>Tensorflow To Bazel(Cpp) ver.1</ai_h3><red1_error> (전체 제작 기여도: 100%)</red1_error>

TensorFlow 모델을 C++ 애플리케이션에 통합하기 위해 다음과 같은 주요 기능을 구현하였습니다.

<br>

#### <ai_h4>Check Tensorflow Version</ai_h4><red1_error> (전체 제작 기여도: 100%)</red1_error>

![Check Tensorflow Version]({{ site.google_drive }}1AqfTHoT8PsctpHh3hiQZ5wId9wOuFgLk{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<ai_h6>Check Tensorflow Version</ai_h6>*

- 처음 튜토리얼 연습용 코드 
    - 텐서플로우 버전을 확인합니다.

<br>

#### <ai_h4>Make Graph Example</ai_h4><red1_error> (전체 제작 기여도: 100%)</red1_error>

![Make Graph Example]({{ site.google_drive }}1dUlCxo7PJ3PFmqxXErNWXqMStRTwy7OF{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<ai_h6>Make Graph Example</ai_h6>*

- 그래프 생성 예제 코드
    - 노드와 그래프를 생성합니다.

<br>

#### <ai_h4>Linear Analysis Prediction Model Example</ai_h4><red1_error> (전체 제작 기여도: 100%)</red1_error>

![Linear Analysis Prediction Model Example]({{ site.google_drive }}1LJeC32Z2NK8yXfu_etJ1UPKjIAr59Bdi{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<ai_h6>Linear Analysis Prediction Model Example</ai_h6>*

1. 파일 읽기 및 모델 로드
    - ReadFile 함수는 주어진 파일을 읽어 TensorFlow 버퍼로 반환합니다.
    - 모델 파일을 읽고 TF_Graph 객체로 불러옵니다.

2. TensorFlow 초기화
    - TF_Status, TF_Graph, TF_SessionOptions, TF_Session 객체를 생성하여 TensorFlow 세션을 초기화합니다.

3. 플레이스홀더와 변수 정의
    - 입력 데이터를 위한 플레이스홀더 (x와 y)를 정의합니다.
    - 선형 회귀의 가중치 (w)와 편향 (b) 변수를 정의합니다.

4. 변수 초기화 연산 정의
    - Assign 연산을 사용하여 가중치와 편향을 초기화하는 연산을 정의합니다. (w_assign 및 b_assign)

5. 예측 함수 및 손실 함수 정의
    - 예측 함수 (hypothesis)는 x * w + b로 정의됩니다.
    - 손실 함수 (loss)는 예측 값과 실제 값의 차이의 제곱으로 정의됩니다. ((hypothesis - y)^2)

6. 경사 하강법 옵티마이저 정의
    - ApplyGradientDescent 연산을 사용하여 경사 하강법 옵티마이저를 정의합니다.
    - 학습률은 상수 텐서로 정의됩니다.

7. 세션 실행 및 학습
    - 변수 초기화 연산을 실행하여 가중치와 편향을 초기화합니다.
    - 주어진 학습 데이터를 사용하여 세션을 반복적으로 실행하여 모델을 학습시킵니다.
    - 각 에포크에서 손실 값을 출력합니다.

8. 정리 및 종료
    - 학습이 완료되면 세션과 다른 TensorFlow 객체들을 삭제하여 메모리를 정리합니다.

이 프로그램은 TensorFlow C API를 사용하여 기본적인 선형 회귀 모델을 구축하고 학습시키는 예제입니다. 이를 통해 TensorFlow의 C API를 어떻게 사용하는지, 그리고 모델의 각 구성 요소를 어떻게 정의하고 실행하는지 알 수 있습니다.


<br>

### <ai_h3>Make Model To Python ver.1</ai_h3><red1_error> (전체 제작 기여도: 100%)</red1_error>

![Make Model To Python]({{ site.google_drive }}13nSt2918u3DLxxaB0ufPCHkhJd6OAU6H{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<ai_h6>Make Model To Python</ai_h6>*

- model.pb 학습용 모델 파일을 제작합니다.
- 학습 모델을 검증합니다.

<br>
<br>

## <ai_h2> 결과(성과) 및 데모 </ai_h2>

- <span><ai_h5>성과:</ai_h5> TensorFlow를 C++ 애플리케이션에 성공적으로 통합하여 모델 추론 작업을 효율적으로 수행할 수 있게 되었습니다. </span>
- <span><ai_h5>깃허브(코드):</ai_h5> [https://github.com/kj1241/AI_Portfolio/tree/main/Tenserflow_Practice](https://github.com/kj1241/AI_Portfolio/tree/main/Tenserflow_Practice)</span>

<br>
<br>

## <ai_h2> 비고 및 여담 </ai_h2>

- 머신러닝 학습을 시작한 이유
    - 기계학습 모델을 빌드하고 테스트하는 과정을 통해 실무에서의 문제 해결 능력을 키우기 위해 시작하게 되었습니다.

- 향후 계획
    - GPU 설정 문제를 해결하여 더 효율적인 모델 학습 환경 구축하였습니다.
    - 최신 버전의 TensorFlow와 Bazel을 사용하여 안정적인 빌드 환경 조성하였습니다.

게임 엔진에 텐서플로우를 최적화하고 마음대로 사용하기 위해서 코드를 작성해 봤으나 기초 선형 학습 시키는데도 코드량이 말이 안되서 그만두게 되었습니다.
이 프로젝트를 통해 TensorFlow의 C API를 활용하여 머신러닝 모델을 C++ 애플리케이션에 통합하는 방법을 배웠습니다. 파일 입출력, 메모리 관리, TensorFlow 세션 및 그래프 관리 등의 기술을 익힐 수 있었습니다.

<br>

### <ai_h3> Bazel을 사용하여 tensorflow dll 포팅 과정에서 에러 처리  </ai_h3>

1. Bazel 버전 오류
    
    ![버전 호환성 에러]({{ site.google_drive }}1h9_EX1ZR7ZATQTpwrHhMp-xG--A3X-W_{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
    *<ai_h6>버전호환성 에러</ai_h6>*

    - 초기 설치 시 도큐먼트에 있는대로 설치하였지만, 버전 호환성 문제로 재설치하였습니다. 따라서 여러번 시도하여 해당 텐서플로우에 맞는 바질 버전을 찾았습니다.


2. 환경 변수 설정
    - TensorFlow 환경변수 설정 확인하였습니다.
    - 경로 설정을 수동으로 수정하여 오류 해결하였습니다.

3. GPU 설정 및 오류 처리

    ![CPU버전 설치 시도]({{ site.google_drive }}129UO1iIG0V_9WhJyhvdU-8gwB-g0sJMg{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
    *<ai_h6>CPU버전 설치 시도</ai_h6>*

    ![CPU버전 설치 에러]({{ site.google_drive }}15D7QUG0P3-3U510Z9nNy9rlhFoLXJmAz{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
    *<ai_h6>CPU버전 설치 에러</ai_h6>*

    - CPU버전으로 설치를 시도하였으나 실패해서 GPU 버전으로 바꿨습니다.

    ![opt 에러]({{ site.google_drive }}1_zJ2IC_iJqq-wVpkwZscWuVP7PDxiiv8{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
    *<ai_h6>opt 에러</ai_h6>*

    - 도큐먼트에는 Opt 값을 쓰라고 되있지만, 실제로는 정의 되지 않았다고 에러발생 따라서 --config=opt 이 부분 제외하고 설치
