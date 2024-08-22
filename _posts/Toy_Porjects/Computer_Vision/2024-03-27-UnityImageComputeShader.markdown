---
layout: post
title: "유니티 이미지 합성(컴퓨트 쉐이더) ver.2"
date: 2024-03-27 09:00:00 +0900
image: https://drive.google.com/thumbnail?id=1m_mUTuNW8zP-wdiPuxuelmzq3IJU-wQJ
toc: true
categories: [Computer_Vision] 
tags: [C#, Unity, ComputeShader]
keywords: C#, Unity, ComputeShader
related_links:
    - url: /computer_vision/ImageComposition.html
    - url: /graphics_development/ImageComposition1.html
    - url: /graphics_development/ImageComposition2.html
    - url: /graphics_development/ImageComposition3.html
---

## <unity_h2> 프로젝트 소개 </unity_h2>

기술 면접 보기 위해서 3일동안 논문보고 공부해서 만들었던 컴퓨트 쉐이더입니다. 당시에는 단순히 이미지 합성으로만 만들었지만 좀 더 기술을 확장하여 카메라에 컴퓨트 쉐이더를 걸어서 툴을 구현하였습니다.


<br>
<br>

## <unity_h2> 프로젝트 개요 </unity_h2>

- <span><unity_h5>프로젝트명:</unity_h5> 유니티 이미지 합성(컴퓨트 쉐이더)</span>
- <span><unity_h5>게임 장르:</unity_h5> toy Proejct(tool)</span>
- <span><unity_h5>기간:</unity_h5> 제작 완료</span>
    - ver.1: 2024.01.08~2024.01.09(합성곱 필터링) 
    - ver.2: 2024.04.02(카메라 포스트 이펙트)
- <span><unity_h5>개발인원:</unity_h5> Developer(1명)</span>
- <span><unity_h5>플랫폼:</unity_h5> PC (Window)</span>

<br>

### <unity_h3> 기술 스택 </unity_h3>

- <span><unity_h5>개발 도구:</unity_h5> Unity 2019.4.22f1 / visual stuido </span>
- <span><unity_h5>개발 언어:</unity_h5> C# / mono </span>

<br>
<br>

## <unity_h2> 프로젝트 특징 및 기능 구현 </unity_h2>

아래는 프로젝트 특징과 기능입니다.

<br>

### <unity_h3> 합성곱 필터링 ver.1</unity_h3><red1_error> (전체 제작 기여도: 100%)</red1_error>

아래의 참조 논문을 보고 이미지 필터를 제작하였습니다. 정확하지 않을 수 있습니다.

#### <unity_h4> 원본 </unity_h4>

![원본]({{ site.google_drive }}1NWvlpys3XJ6B-Immkrz-CeYGyXZE-Axr{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<unity_h6> 원본 </unity_h6>*

인터넷에서 검색한 무료이미지의 원본입니다.


#### <unity_h4> Convolution Kernels </unity_h4>

![Sharpness Filter]({{ site.google_drive }}1swF18-byhR89iLkbYohYCDCpXgXLIkTS{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<unity_h6> Sharpness Filter compute shader </unity_h6>*

- 사프니스 필터란 어두운 부분을 더욱 어둡게 밝은 부분을 더욱 밝게 만들어서 날카로운 느낌을 주는 방법입니다.

![GrayScale Filter]({{ site.google_drive }}1mFLEVY4mXdfUaCywmKp8U5h--5RYY-hb{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<unity_h6> GrayScale Filter compute shader </unity_h6>*

- 그레이 스케일 필터란 색을 회색으로 바꾸는 방법입니다.

![Edge Detection(Sobel Edge Detection)]({{ site.google_drive }}1JYlL5i8BkWqpFS6IMF0K1VsX9qWLx9Kq{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<unity_h6> Edge Detection(Sobel Edge Detection) Filter compute shader </unity_h6>*

- 윤곽선 검출 필터입니다. 1:2:1의 가중치를 주는 소벨 필터를 이용해서 제작하였습니다.

![Edge Detection(Prewitt)]({{ site.google_drive }}1Q3doS5eTW2O1poHiUb25h2DgcDnPyvON{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<unity_h6> Edge Detection(Prewitt) Filter compute shader </unity_h6>*

- 운곽선 검출 필터입니다. 1:1:1의 가중치를 주는 프라윗 필터를 이용해서 제작하였습니다.

![Embossing Filter]({{ site.google_drive }}1MQrfYPMeg_IWpWAbl9UMwqYGLiQc4h2G{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<unity_h6> Embossing Filter compute shader </unity_h6>*

- 직물, 종이, 금속 등의 표면에 돋을새김으로 무늬를 찍어내는 가공 방법으로 만든 엠보싱 기법을 사용했습니다.

<br>

#### <unity_h4> Separable Kernels </unity_h4>

![Box Filter (Averaging)]({{ site.google_drive }}1EsIkin_MdJgZNZZy-960Az9_j3ZXMLuF{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<unity_h6>Box Filter (Averaging) compute shader </unity_h6>*

- 이미지를 손상시키고 bluring 효과를 주는 박스 필터입니다. 특정 영역의 픽셀을 1/9주는 Averaging 필터입니다.

![Gaussian Filter ]({{ site.google_drive }}1EsIkin_MdJgZNZZy-960Az9_j3ZXMLuF{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<unity_h6>Gaussian Filter compute shader </unity_h6>*

- 평균 필터보다 부드러운효과를 주기위해 사용한 가우시안 필터입니다.


<br>

### <unity_h3> 카메라 포스트 이펙트 제작 ver.1</unity_h3><red1_error> (전체 제작 기여도: 100%)</red1_error>

#### <unity_h4> Camera compute shader </unity_h4>

![Cmaera Filter]({{ site.google_drive }}1JN4bs6n7MAKwwhpyorm0I2IzxD_HtKW2{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<unity_h6>Camera compute shader</unity_h6>*

- 이미지에 합성을 걸었다면 이런 이론을 확장시켜서 게임 영상이나 카메라에도 컴퓨트 쉐이더를 걸 수 있을 것입니다. 해당 영상은 유니티 카메라의 화면을 그레이스케일 필터를 거는 방법입니다.

#### <unity_h4> 유니티 인스펙터를 사용해서 슬라이더 추가하기 </unity_h4>

![Cmaera tool]({{ site.google_drive }}1DBLC1pd2Qdf5sbLjfD1oPvzNXyLhbp5d{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<unity_h6>Camera compute shader tool</unity_h6>*

- 외곽선 검사를 위해서 컴퓨트 쉐이더로는 그레이스케일과 소벨 필터를 합성시켰습니다.
- 또한 임계점값을 유저가 툴을 사용해서 변경해 주기 위해서 인스펙터 창을 수정하였습니다.


<br>
<br>

## <unity_h2> 결과(성과) 및 데모 </unity_h2>

![ImageConvolution]({{ site.google_drive }}1KTnd54iRlK0q-WU2DkRVxOwvMpMmgEzZ{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<unity_h6>ImageConvolution compute shader 유니티 화면 </unity_h6>*

![FlowEffectTest]({{ site.google_drive }}1m_mUTuNW8zP-wdiPuxuelmzq3IJU-wQJ{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<unity_h6>Camera - sobal compute shader 유니티 화면 </unity_h6>*

- <span><unity_h5>성과:</unity_h5> 토이프로젝트 제작 </span>
- <span><unity_h5>깃허브(코드):</unity_h5> 생각 중입니다. </span>

<br>
<br>

## <unity_h2> 비고 및 여담 </unity_h2>

- 여담:
    - GPU 최적화를 진행하려면, 유니티 자체를 커스터마이징을 해야되서 넘어가겠습니다.
    - 특정 회사의 면접전 과제 였는데 원래는 DirectX12로 구현 하려다가 당시에는 DirectX12 자체 포트폴리오가 비공개라 그냥 유니티를 사용해서 만들었습니다.
    
<br>

---

<br>

###### <unity_h6>참조 논문:</unity_h6> [https://cg.ivd.kit.edu/downloads/assignment3_GPUC.pdf](https://cg.ivd.kit.edu/downloads/assignment3_GPUC.pdf)