---
layout: post
title: "TensorFlow vs PyTorch 심층 비교"
date: 2021-02-25 09:00:00 +09:00
image: https://drive.google.com/thumbnail?id=1wuH9GsGPTFfJv1opoC_MIUq2CxpAahFf
toc: true
categories: [Other_Articles]
keywords: 머신 러닝, 딥 러닝, 소프트웨어 개발, 데이터 과학
addsence: true
lastmod: 2024-05-30 09:00:00 +09:00
sitemap:
  changefreq : daily
  priority : 1.0
excerpt: 유니티 ML 에이전트를 사용해서 프로젝트를 만들기 앞서 TensorFlow와 PyTorch의 역사, 주요 기능, 응용 사례를 비교하여 어떤 프레임워크가 적합한지 고민하고 조사한 글입니다.
related_links:
    - url: /ai/Unity_ML_Agent.html
---

딥 러닝 분야에서 TensorFlow와 PyTorch는 가장 인기 있는 두 프레임워크로 자리잡았습니다. 두 프레임워크 모두 각각의 강점과 독특한 기능을 가지고 있어 다양한 프로젝트와 개발자에게 적합합니다. 이 글에서는 TensorFlow와 PyTorch의 역사, 주요 기능, 다양한 응용 프로그램에 대한 적합성을 비교하여 다음 프로젝트에서 어떤 프레임워크가 가장 적합한지 결정하는 데 도움을 드리고자 합니다.

<br>
<br>

## <ai_h2> TensorFlow: 구글이 지원하는 거대 프레임워크 </ai_h2>

### <ai_h3> 간략한 역사 </ai_h3>

TensorFlow는 2015년 구글에 의해 오픈 소스로 출시되었습니다. 이 프레임워크는 구글의 지원과 풍부한 생태계 덕분에 머신 러닝 분야에서 빠르게 주류가 되었습니다. TensorFlow의 주요 데이터 구조는 다차원 배열을 나타내는 텐서입니다. TensorFlow라는 이름 자체는 데이터가 일련의 처리 노드를 통해 흐르는 방식을 설명하는 데이터 흐름 그래프에서 유래했습니다.

<br>

### <ai_h3> TensorFlow 1.x: 초기 버전 </ai_h3>

초기 버전의 TensorFlow는 가파른 학습 곡선으로 잘 알려져 있었습니다. 개발자는 데이터 흐름 그래프를 수동으로 작성한 후 세션 내에서 실행해야 했습니다. 이는 API 호출(예: tf.placeholder, tf.Variable)을 통해 추상 구문 트리(AST)를 생성하고, 텐서를 session.run()을 통해 수동으로 컴파일하는 과정을 포함했습니다. 세션은 TensorFlow 1.x에서 중심 객체로서, 데이터 흐름 그래프에서 작업을 실행하는 컨텍스트 관리자로 작동했습니다.
  
이 접근 방식은 큰 유연성과 제어를 가능하게 했지만, 특히 머신 러닝이나 프로그래밍에 익숙하지 않은 사람들에게는 복잡하고 직관적이지 않았습니다.

<br>

### <ai_h3> TensorFlow 2.x: 사용성 개선 </ai_h3>

2019년에 출시된 TensorFlow 2.x는 사용의 용이성과 파이썬 친화적 코딩 방식을 중시하는 방향으로 큰 변화를 가져왔습니다. 이 버전에서는 신경망을 구축하고 훈련하기 위한 고수준 API인 Keras가 TensorFlow의 핵심에 통합되었습니다. TensorFlow 2.x는 기본적으로 eager execution을 사용하여 그래프를 작성하지 않고도 연산을 즉시 평가할 수 있어 디버깅과 개발이 더 직관적이고 사용자 친화적입니다.

TensorFlow의 주요 기능
- 생태계와 도구: TensorFlow는 TensorFlow Lite(모바일 및 임베디드 장치용), TensorFlow.js(브라우저 내 머신 러닝용), TensorFlow Extended(TFX, 프로덕션 ML 파이프라인 배포용)를 포함한 풍부한 생태계를 자랑합니다.
- 모델 최적화: TensorFlow Lite를 사용하면 IoT(사물 인터넷) 장치에 배포할 모델을 압축하고 최적화할 수 있어 엣지 컴퓨팅을 촉진합니다.
- 다중 언어 지원: TensorFlow는 Python 외에도 C++, Java, Swift 등 여러 프로그래밍 언어를 지원하여 다양한 플랫폼과 사용 사례에 적합합니다.

<br>
<br>

## <ai_h2> PyTorch: 연구자를 위한 프레임워크 </ai_h2>

### <ai_h3> 간략한 역사 </ai_h3>

PyTorch는 2016년 페이스북에 의해 소개되었으며, Lua로 작성된 이전 머신 러닝 라이브러리인 Torch의 성공을 기반으로 하고 있습니다. PyTorch는 동적 계산 그래프, 직관적인 인터페이스, 뛰어난 성능 덕분에 연구 커뮤니티에서 빠르게 인기를 얻었습니다.

<br>

### <ai_h3> PyTorch의 주요 기능 </ai_h3>

- 동적 계산 그래프: TensorFlow 1.x와 달리 PyTorch는 정의하면서 실행되는 동적 계산 그래프를 사용합니다. 이는 연산이 실행될 때 그래프가 동적으로 생성되어 즉각적인 피드백과 쉬운 디버깅을 가능하게 합니다.
- 기본적으로 Eager Execution 사용: TensorFlow 2.x와 유사하게 PyTorch는 eager execution을 기본으로 사용하여 연산을 즉시 실행할 수 있게 합니다.
- Numpy와의 통합: PyTorch의 텐서는 NumPy 배열과 호환되도록 설계되어 데이터 조작 및 전처리 작업에서 손쉽게 통합 및 변환이 가능합니다.
- Pythonic하고 유연한: PyTorch의 API는 Python 개발자에게 직관적으로 설계되어 저수준 코드를 작성하지 않고도 신경망 구성 요소를 만들 수 있습니다.

<br>

### <ai_h3> 프로덕션에서의 발전 </ai_h3>

PyTorch는 연구자들 사이에서 유연성과 사용 편의성으로 인기를 끌었지만, 프로덕션 준비 상태에서도 큰 진전을 이루었습니다. TorchScript의 도입으로 모델을 Python과 독립적으로 실행 가능한 형식으로 변환할 수 있게 되어 프로덕션 환경에 배포할 수 있습니다. 또한, PyTorch의 ONNX(Open Neural Network Exchange) 통합을 통해 모델을 다른 프레임워크와 플랫폼으로 내보낼 수 있습니다.

<br>
<br>

## <ai_h2> 올바른 프레임워크 선택하기 </ai_h2>

### <ai_h3> 고려해야 할 요소 </ai_h3>

TensorFlow와 PyTorch 사이에서 선택할 때 여러 요소를 고려해야 합니다

1. 프로그래밍 언어와 개발자 경험:

- TensorFlow: 여러 언어(C++, Java, Swift)를 지원하여 다양한 응용 프로그램에 적합합니다.
- PyTorch: Python에 최적화되어 있어 Python 개발자에게 선호됩니다.

2. 사용 용이성과 학습 곡선:

- TensorFlow: TensorFlow 2.x는 eager execution과 Keras 통합으로 사용성이 크게 개선되었습니다.
- PyTorch: 직관적이고 Pythonic한 인터페이스로 연구자와 개발자에게 인기가 높습니다.

3. 생태계와 도구:

- TensorFlow: 다양한 플랫폼(모바일, 웹 등)에 배포할 수 있는 포괄적인 생태계를 제공합니다.
- PyTorch: TorchScript와 ONNX 같은 도구로 모델 내보내기와 배포에서 큰 진전을 이루었지만, 생태계의 폭은 TensorFlow에 미치지 못할 수 있습니다.

4. 커뮤니티와 산업 채택:

- TensorFlow: 산업 전반에서 널리 채택되고 있으며, 방대한 문서와 커뮤니티 지원을 제공합니다.
- PyTorch: 학계 연구에서 강력한 존재감을 가지고 있으며, 산업에서의 채택도 증가하고 있습니다.


<br>

### <ai_h3> 특정 사용 사례 </ai_h3>

- 크로스 플랫폼 배포: 다양한 플랫폼(모바일, 웹 등)에 모델을 배포해야 한다면 TensorFlow의 광범위한 도구가 더 적합할 수 있습니다.
- 연구 및 개발: 빠른 프로토타이핑과 연구를 위해 PyTorch의 동적 계산 그래프와 쉬운 디버깅이 유리할 수 있습니다.
- 프로덕션 준비 애플리케이션: 두 프레임워크 모두 프로덕션 배포를 지원하도록 성숙해졌지만, TensorFlow의 TFX와 모델 최적화 도구는 더 많은 기본 솔루션을 제공할 수 있습니다.

<br>
<br>

## <ai_h2> 결론 </ai_h2>

TensorFlow와 PyTorch는 각각 고유의 강점을 가지고 있으며, 개발자와 연구자의 요구에 맞춰 계속 진화하고 있습니다. TensorFlow는 다양한 플랫폼에 걸친 배포를 위한 포괄적인 생태계와 도구를 제공하는 반면, PyTorch는 연구자들이 선호하는 직관적이고 유연한 환경을 제공합니다. 두 프레임워크 중 하나를 선택할 때는 특정 프로젝트 요구 사항, 프레임워크에 대한 익숙함, 배포 대상 등을 고려해야 합니다. TensorFlow와 PyTorch의 핵심 차이점과 강점을 이해함으로써 목표와 워크플로우에 맞는 정보를 바탕으로 결정을 내릴 수 있습니다.