---
layout: post
title: "Graphics 기술면접 인터뷰1 - Graphics Pipeline"
date: 2024-08-27 12:00:00 +09:00
image: https://drive.google.com/thumbnail?id=1qnoS7KFiwWDFdThqaRZpDwrh5ySB6-L8
toc: true
categories: [Graphics]
keywords: Graphics Pipeline
addsence: false
lastmod: 2024-08-27 12:00:00 +09:00
sitemap: 
  changefreq : daily
  priority : 1.0
excerpt: 파이프라인은 쉐이더 중심으로 진화하여 버텍스, 테셀레이션, 지오메트리, 픽셀 쉐이더 등의 단계로 세분화되며, 각 단계에서 더 복잡한 그래픽스 처리가 가능합니다.
related_links:
---

## 에전 전공책에 있던 파이프라인 구조

대학교 그래픽스 전공책에서 배우던 파이프라인 구조입니다.

1. 3D 모델 구축
  - 3D 모델의 정점, 폴리곤 등 기본 데이터를 준비합니다.
2. 정점 단계의 음영 (Vertex Shading)
  - 각 정점의 색상, 위치, 조명 등 기본적인 음영 처리를 수행합니다.
3. 컬링 (Culling)
  - 보이지 않는 면을 제거합니다.
4. 조명 (Lighting)
  - 씬에 존재하는 조명을 반영하여 정점 색상을 조정합니다.
5. 클리핑 (Clipping)
  - 뷰포트 밖에 있는 정점을 제거합니다.
6. 투영 (Projection):
  - 3D 공간을 2D 화면에 투영합니다.
7. 뷰포트 변환 (Viewport Transform):
  - 투영된 좌표를 화면 좌표로 변환합니다.
8. 레스터라이제이션 (Rasterization):
  - 정점 데이터를 픽셀로 변환하여 화면에 표시할 수 있도록 합니다.
9. 픽셀 단계의 음영 (Pixel Shading):
  - 각 픽셀에 대해 최종적인 색상, 조명 등을 계산합니다.
10. 텍스쳐 적용 (Texturing):
  - 픽셀에 텍스처를 적용합니다.
11. 출력:
  - 화면에 최종 이미지를 출력합니다.

<br>
<br>

## 현재 쉐이더 중심 파이프라인 구조

그래픽스 프로그래밍이 쉐이더 중심으로 넘어 오면서 파이프라인 자체가 변했습니다.

1. **버텍스 쉐이더 (Vertex Shader):**
    - **입력:** 3D 모델의 정점 데이터
    - **출력:** 변환된 정점 데이터 및 특수 효과를 위한 정보
    - **역할:** 정점의 위치, 크기, 조명, 텍스쳐에 관한 특수 효과 등을 계산하여 출력합니다.
2. **테셀레이터 (Tessellation):**
    - **입력:** 헐 쉐이더에서 생성된 정점 데이터
    - **출력:** 세분화된 정점 데이터
    - **역할:** 기본 정점을 세분화하고, 이를 통해 더 상세한 표현을 만듭니다. 헐 쉐이더, 테셀레이터, 도메인 쉐이더가 함께 작동하여 세션을 생성하고 위치를 계산합니다.
    1. **헐 쉐이더 (Hull Shader):**
        - **입력:** 정점 데이터
        - **출력:** 세션을 위한 정보 및 세분화 관련 설정
        - **역할:** 정점을 어떻게 분할할지, 얼마나 세분화할지 등의 정보를 생성합니다.
    2. **도메인 쉐이더 (Domain Shader):**
        - **입력:** 세분화된 정점 데이터 및 헐 쉐이더에서 생성된 정보
        - **출력:** 분할된 정점의 최종 위치
        - **역할:** 세분화된 정점의 최종 위치를 계산합니다.
3. **지오메트릭스 쉐이더 (Geometry Shader):**
    - **입력:** 테셀레이터에서 생성된 정점 데이터 또는 스트림 출력에서 받은 정점 데이터
    - **출력:** 수정된 정점 데이터 또는 레스터라이즈에 보낼 정점 데이터
    - **역할:** 지오메트릭 처리를 수행하며, 버텍스 쉐이더에서 할 수 없는 정점의 추가, 제거 등의 작업을 수행합니다.
4. **스트림 출력 (Stream Output):**
    - **입력:** 지오메트릭스 쉐이더에서 생성된 정점 데이터
    - **출력:** 메모리의 정점 버퍼에 저장된 데이터
    - **역할:** 정점 데이터를 메모리에 저장하거나 다음 랜더링 단계로 전달합니다.
5. **레스터라이제이션 (Rasterization):**
    - **입력:** 정점 데이터
    - **출력:** 픽셀 데이터
    - **역할:** 정점 값을 보강하여 픽셀로 변환하며, 컬링, 클리핑, 투영, 뷰포트 매핑, 픽셀 쉐이더 호출 등의 단계를 포함합니다.
6. **픽셀 쉐이더 (Pixel Shader):**
    - **입력:** 레스터라이제이션에서 생성된 픽셀 데이터
    - **출력:** 최종적인 픽셀의 색상 데이터
    - **역할:** 색상을 결정하고, 조명 후처리, 다중 텍스쳐 제작, 깊이/스텐실 검사 등을 수행합니다. 이 단계에서 쉐이더를 선택적으로 사용할 수 있습니다.