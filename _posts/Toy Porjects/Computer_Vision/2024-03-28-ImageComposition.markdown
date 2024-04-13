---
layout: post
title: "이미지 합성( OpenCV & SIMD ) ver.2"
date: 2024-03-28 09:00:00 +0900
image: https://drive.google.com/thumbnail?id=1KWjlUo13C9geJY5EnLKU12Qru22lqBiO
toc: true
categories: [Computer_Vision] 
keywords: C++, python, SIMD, OpenCV, Image Composition, 이미지 합성
related_links:
    - url: /computer_vision/UnityImageComputeShader.html
    - url: /graphics_development/ImageComposition1.html
    - url: /graphics_development/ImageComposition2.html

---

## <unity_h2> 프로젝트 소개 </unity_h2>

기술 면접 보기 위해서 3일동안 논문보고 구현 했던 파이썬 OpenCV 코드입니다. OpenCV 내부적 구현을 알 수 없으니 좀 더 확장시켜서 C++을 사용해서 이미지 합성을 최적화 시켰습니다.

<br>
<br>

## <unity_h2> 프로젝트 개요 </unity_h2>

- <span><unity_h5>프로젝트명:</unity_h5> 이미지 합성( OpenCV & SIMD )</span>
- <span><unity_h5>게임 장르:</unity_h5> toy Proejct(tool)</span>
- <span><unity_h5>기간:</unity_h5> 제작 완료</span>
    - ver.1: 2024.01.08~2024.01.09(OpenCV) 
    - ver.2: 2024.01.13(SIMD)
- <span><unity_h5>개발인원:</unity_h5> Developer(1명)</span>
- <span><unity_h5>플랫폼:</unity_h5> PC (Window)</span>

<br>

### <unity_h3> 기술 스택 </unity_h3>

- <span><unity_h5>개발 도구:</unity_h5> Google colab / visual stuido </span>
- <span><unity_h5>개발 언어:</unity_h5> python / c++ </span>


<br>
<br>

## <unity_h2> 프로젝트 특징 및 기능 구현 </unity_h2>

아래는 프로젝트 특징과 기능입니다.

<br>

### <unity_h3> Python - OpenCV ver.1</unity_h3><red1_error> (전체 제작 기여도: 100%)</red1_error>

![Box Filter (Averaging)]({{ site.google_drive }}1B_ULhpaxF0tI0eKLT9iKj254nE_MrGSR{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<unity_h6> Box Filter (Averaging) </unity_h6>*

![Embossing Filter]({{ site.google_drive }}156pV5r2Pys9r-c7mXceHP78Xr_0Aa-nw{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<unity_h6> Embossing Filter </unity_h6>*

- 면접을 위해서 논문 보고 Python OpenCV를 사용해서 만든 이미지 합성입니다.
- python OpenCV를 사용한 이유는 아무것도 신경쓰지 않고 논문 보고 빠르게 결과물을 도출하기 위해서 사용하였습니다.



<br>

### <unity_h3> Cpp 파일 입출력을 사용한 이미지 합성 ver.2</unity_h3><red1_error> (전체 제작 기여도: 100%)</red1_error>

![ImageComposition_SIMD]({{ site.google_drive }}1KWjlUo13C9geJY5EnLKU12Qru22lqBiO{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<unity_h6> Image Composition cpp SIMD</unity_h6>*

- CPP를 사용해서 이미지 합성인 그레이 스케일을 적용시켰습니다.
- 이미지 구조화를 위해서 BMP를 사용하였습니다.
- 최적화를 위해서 SIMD를 사용하여 레지스터에서 CPU 병렬처리를 하였습니다.

<br>
<br>

## <unity_h2> 결과(성과) 및 데모 </unity_h2>

- <span><unity_h5>성과:</unity_h5> 토이프로젝트 제작 </span>
- <span><unity_h5>깃허브(코드):</unity_h5> 생각 중입니다. </span>

<br>
<br>

## <unity_h2> 비고 및 여담 </unity_h2>

- 여담:
    - JPG 비손실 압축을 사용하려면, 디코더를 작성하거나 WIC를 사용하여 팩토리를 만들면됩니다. 하지만 해당 프로젝트는 CPU 최적화를 중점에 두고 있어서 BMP를 사용하였습니다.
    
<br>

---

<br>

###### <unity_h6>참조 논문:</unity_h6> [https://cg.ivd.kit.edu/downloads/assignment3_GPUC.pdf](https://cg.ivd.kit.edu/downloads/assignment3_GPUC.pdf)