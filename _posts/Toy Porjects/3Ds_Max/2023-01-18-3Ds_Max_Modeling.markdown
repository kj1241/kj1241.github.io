---
layout: post
title: "3D 모델링 실습 - 기말 과제(모델링 및 애니메이션 제작)"
date: 2023-01-18 21:58:00 +09:00
image: https://drive.google.com/thumbnail?id=11dTOwOQaBJmV5-aG2VqQFQO7c8ekZ7Ho
toc: true
categories: [3Ds_Max]
keywords: 3Ds Max, 애니메이션 리깅, 3D 모델링, UV 매핑, 디퓨즈 맵, 노멀 맵, 본 스켈레톤, 프레임 애니메이션, 컴퓨터그래픽스
addsence: false
lastmod: 2024-07-05 09:00:00 +09:00
sitemap:
  changefreq : daily
  priority : 1.0
excerpt: 해당 프로젝트는 3Ds Max를 활용해 친근한 감성의 용 모델링과 애니메이션을 제작하는 것을 목표로 하였습니다.
related_links:
  - url: /3ds_max/3Ds_Max_Terrain.html
---

## <art_h2>프로젝트 소개</art_h2>

이 프로젝트는 부족함을 인정하면서도 열정적인 노력으로 만들어진 아기자기한 용 모델링과 애니메이션을 소개합니다. 전통적인 용의 이미지를 따르지 않고, 친근하고 따뜻한 감성으로 표현된 모델은 작은 디테일들을 만들기 위해 노력했습니다.

<br>
<br>

## <art_h2>프로젝트 개요</art_h2>

- <span><art_h5>프로젝트명:</art_h5> 3Ds Max를 사용해서 모델링 및 애니메이션 제작하기</span>
- <span><art_h5>과제:</art_h5> 2016년 2학기 3D 모델링 실습 기말 과제</span>
- <span><art_h5>게임 장르:</art_h5> Toy Project</span>
- <span><art_h5>기간:</art_h5> 제작 완료</span>
    - ver.1: 2016.10 ~ 2016.12(제작)
- <span><art_h5>개발인원:</art_h5> artist(1명)</span>
- <span><art_h5>플랫폼:</art_h5> PC (Window)</span>

<br>

### <art_h3> 기술 스택 </art_h3>

- <span><art_h5>개발 도구:</art_h5> 3Ds Max  </span>
- <span><art_h5>개발 언어:</art_h5> (none)  </span>
- <span><art_h5>그래픽 디자인: </art_h5> Adobe Photoshop / 3Ds Max</span>

<br>
<br>

## <art_h2> 프로젝트 특징 및 기능 구현 </art_h2>

1. 모델의 구조를 배우고 상상속에 용을 표현하기 위해 모델링을 제작하였습니다.
2. 비늘의 효과를 부여하기 위해 텍스쳐와 노멀맵을 제작하였습니다.
3. 애니메이션에 대해서 공부하고 모델링에 본 스켈레톤을 연결하였습니다.

<br>

### <art_h3>용 캐릭터 모델링 및 애니메이션 제작 ver.1</art_h3><red1_error> (전체 제작 기여도: 100%)</red1_error>

#### **<art_h4>용 모델링:</art_h4>**

![용 모델링]({{ site.google_drive }}11dTOwOQaBJmV5-aG2VqQFQO7c8ekZ7Ho{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<art_h6>용 모델링</art_h6>*  

#### **<art_h4>용 모델링:</art_h4>**

![용 텍스처]({{ site.google_drive }}1Y5QnAVGfoG5xIes8wDi2yPj3Idm0MwiB{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<art_h6>용 텍스처</art_h6>*  

#### **<art_h4>용 노멀맵:</art_h4>**

![용 노멀맵]({{ site.google_drive }}1jkIJxuHGWWTFToo058VMxZxBaic0O2me{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<art_h6>용 노멀맵</art_h6>*  

#### **<art_h4>용 프레임 애니메이션:</art_h4>**

![용 프레임 애니메이션]({{ site.google_drive }}1Z9Uy8SNwKCZvHBGFHUrDqab2DFua2Dvx{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<art_h6>용 프레임 애니메이션</art_h6>*

1. 로우 폴리곤을 사용하여 3D 캐릭터 모델 제작 .
2. uv를 사용하여 디퓨즈 맵과 노멀맵을 제작하여 모델에 적용.
3. TurboSmooth를 이용하여 하이 폴리곤 변경.
4. 핫 키로 스켈레톤 매트릭스의 프레임을 찍어서 애니메이션 제작

<br>

### <art_h3>어세신 크리드 애니메이션 제작 ver.1</art_h3><red1_error> (전체 제작 기여도: 100%)</red1_error>

#### **<art_h4>본 스켈레톤 애니메이션:</art_h4>**
![본 스켈레톤 애니메이션]({{ site.google_drive }}1CPcGnt-IP87DVQENC_lCltXc6wDCvF3T{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<art_h6>본 스켈레톤 애니메이션</art_h6>*

1. 3D 모델링과 본 스켈레톤 바이패드 연결(애니메이션 학습과 DirectX9 엔진 연동학습을 위해 무료 3D 모델링인 어세신 크리드 인터넷에서 받음).
2. 다중 애니메이션[0~2프레임 idle 상태, 2~28프레임 walk 상태, 28~50 magic attack (주문 상태)] 애니메이션 제작


<br>
<br>

## <art_h2> 결과(성과) 및 데모 </art_h2>

- <span><art_h5>성과:</art_h5> 2016년 2학기 3D 모델링 실습 기말 과제 </span>
- <span><art_h5>지드라이브(코드):</art_h5> [https://drive.google.com/drive/folders/1x99lGePjKCvnHu4Y311ybhlrHAa3iIcI?usp=share_linkg](https://drive.google.com/drive/folders/1x99lGePjKCvnHu4Y311ybhlrHAa3iIcI?usp=share_link)</span>


<br>
<br>

## <art_h2> 비고 및 여담 </art_h2>

- 배운점 
    - 캐릭터 모델링의 제작 프로세스를 이해하고 습득하였습니다.  
    - 3D 모델링에 대한 깊은 이해로 다양한 오브젝트를 창조하고 수정하는 기술적 역량을 획득하였습니다.
    - 직접 UV 매핑을 통해 디퓨즈 맵과 노멀 맵을 제작하며 텍스처 입히기에 도전할 기회 얻었습니다.
    - 3D 애니메이션에 관해서 이해하고 제작하는 방법에 대해 습득하였습니다.
    - 본 스켈레톤과 프레임 애니메이션 차이에 대해서 이해하고 멀티 애니메이션 만드는 방법에대해서 습득하였습니다.

- 수정할 점
    - 용 모델링 텍스쳐와 모델링(살점) 좀 더 수정하여 생동감 있게 제작해야합니다.
