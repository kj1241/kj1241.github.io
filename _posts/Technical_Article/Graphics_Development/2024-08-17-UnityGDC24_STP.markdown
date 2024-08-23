--- 
layout: post
title: "GDC24 Unity 3 - Spatial-Temporal Post-processing"
date: 2024-08-06 09:00:00 +09:00
image: https://drive.google.com/thumbnail?id=1kv3qO7_cvVJLx7MbEjvD4OZ0XyeD-9QR
toc: true
categories: [Graphics_Development]
keywords: Spatial-Temporal Post-processing, Unity6, STP 디버깅, 셰이더 분석, Temporal Anti-Aliasing, 그래픽 품질, 렌더링 최적화
addsence: true
lastmod: 2024-08-13 21:00:00 +09:00
sitemap: 
  changefreq : daily
  priority : 1.0
excerpt: Unity6에서 도입된 Spatial-Temporal Post-processing(STP) 기술을 분석합니다. 이 기술은 공간적 및 시간적 데이터를 결합하여 그래픽 품질을 향상시키며, 디버깅 도구 및 셰이더 코드를 통해 STP의 작동 원리와 최적화 과정을 설명합니다.
related_links:
  - url: /graphics_development/UnityGDC24_GPUResidentDrawer.html
  - url: /graphics_development/UnityGDC24_GPUOcclusionCulling.html
---

안녕하세요. 오랜만에 돌아온 분석글입니다. 원래 수요일날까지 작성하려고 했다가 개인적인 용무때문에 목요일은 피곤해서 지금 토요일인 지금 작성하게 되었습니다. 전편들처럼 뭔가 쉽게 설명하고 싶은데, 전편들과는 다르게 쉽게 설명이 안될거 같습니다.~~(예전 교수님이 쉽게 풀어 못쓰면 애매하게 아는거라고 했는데...)~~ 난이도를 조금 올려서 쉐이더도 분석해 보겠습니다.


## <unity_h2> 1. Spatial-Temporal Post-processing 적용하기 앞서 </unity_h2>

이전에 GPU Occlusion Culling"에 대해 설명드렸습니다. 이번에는 [GDC 2024 Unity6](https://www.youtube.com/watch?v=o9AGkB9nnkc)에서 소개된 Boosted Rendering Performance 섹션에서 언급된 Spatial-Temporal Post-processing에 대해 알아보겠습니다. STP를 사용하시려면 Shader Model 5.0을 지원해야 합니다.

<br>

### <unity_h3> 1) Spatial-Temporal Post-processing 이란?  </unity_h3>

<p><unity_h5>Spatial-Temporal Post-processing</unity_h5> 기술은 게임 그래픽의 품질을 향상시키기 위해 도입된 최신 기술 중 하나입니다. 이 기술은 공간적 및 시간적 데이터를 결합하여 보다 매끄럽고 선명한 비주얼을 구현하는 것을 목표로 합니다.</p>

<br>

### <unity_h3> 2) Spatial-Temporal Post-processing 주요 개념  </unity_h3>

1. Spatial Processing (공간적 처리)
    - 공간적 처리는 현재 프레임의 픽셀 데이터를 활용하여 이미지 품질을 개선합니다.
    - 이를 통해 각 프레임의 해상도와 디테일을 높이고, 노이즈를 줄이며, 보다 정확한 그림자와 조명을 구현할 수 있습니다.
    - 대표적인 기법으로는 Anti-Aliasing, Ambient Occlusion, Depth of Field 등이 포함됩니다.

2. Temporal Processing (시간적 처리)
    - 시간적 처리는 이전 프레임의 데이터를 이용하여 현재 프레임의 품질을 향상시킵니다.
    - 프레임 간의 연속성을 유지하고, 모션 블러를 제거하며, 시간적 앨리어싱을 줄이는 데 효과적입니다.
    - 대표적인 기법으로는 Temporal Anti-Aliasing (TAA)와 Temporal Upsampling 등이 있습니다.

<br>
<br>

## <unity_h2> 2. Unity6에서 Spatial-Temporal Post-processing 적용하기 </unity_h2>

Spatial-Temporal Post-processing을 사용하는 방법입니다.

<br>

### <unity_h3> 1) Spatial-Temporal Post-processing 설정하기 </unity_h3>

![Spatial-Temporal Post-processing 설정]({{ site.google_drive }}1N7LubqJKsKcqs_NkTaXcUzRFlEKpMffm{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<unity_h6>Spatial-Temporal Post-processing 설정 </unity_h6>*

Spatial-Temporal Post-processing을 설정하는 방법은 간단합니다. URP Asset에서Quality 탭에서 Upscaling Filter에서 Spatial-Temporal Post-processing을 체크해주세요

<br>

### <unity_h3> 2) Spatial-Temporal Post-processing Debugger 디버깅 방법</unity_h3>

Unity에서는 Spatial-Temporal Post-processing의 작동 상태를 시각적으로 확인할 수 있는 도구를 제공합니다. 이 도구는 렌더링 성능을 최적화하는 데 유용합니다. 

![Rengering Debugger 실행 방법]({{ site.google_drive }}1bEgEJnDTSUiP3fXgX9oHbitsLdgz8Jcl{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<unity_h6>Rengering Debugger 실행 방법 </unity_h6>*

widnow > Analysis > Rengering Debugger를 실행합니다.

![Rengering Debugger STP 디버깅]({{ site.google_drive }}17_9w0UMBLFiGZMgqXVzu9gZDNHuzNpzv{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<unity_h6>Rengering Debugger STP 디버깅</unity_h6>*

Rendering Debugger의 Rendering 탭에서 Map Overlays를 STP로 변경해주세요. 

![Rengering Debugger STP 디버깅 뷰]({{ site.google_drive }}1kv3qO7_cvVJLx7MbEjvD4OZ0XyeD-9QR{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<unity_h6>Rengering Debugger STP 디버깅 뷰</unity_h6>*

그럼 이제 게임 창과 씬 창에서 STP 뷰가 보이게 될 것입니다.

<br>

### <unity_h3> 2) GSpatial-Temporal Post-processing Debugger 디버깅 종류</unity_h3>

유니티 디버깅 뷰에 접속했다면 디버깅할수 있는 종류들에 관해서 집어보도록 하겠습니다. [유니티 공식 설명](https://docs.unity3d.com/Packages/com.unity.render-pipelines.universal@17.0/manual/stp/stp-debug-views.html)에 내용이 존재하는데 많이 부족한거 같아서 제가 보충설명을 해보겠습니다.

#### <unity_h4> Clipped Input Color </unity_h4>

![Clipped Input Color]({{ site.google_drive }}1CazjpPXkD-IoRydiNJr2TOvqUVG_0fhA{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<unity_h6>Clipped Input Color</unity_h6>*

- <p><unity_h5>유니티 공식 설명:</unity_h5> 0과 1 사이에서 클리핑된 HDR 입력 색상을 표시합니다. </p>
- <p><unity_h5>추가 설명:</unity_h5> 과도한 조명이나 톤매핑 오류로 인해 발생할 수 있는 비정상적인 색상 출력을 시각적으로 확인할 수 있습니다. </p>

#### <unity_h4> Log Input Depth </unity_h4>

![Log Input Depth]({{ site.google_drive }}1DM8V58NHpMrSSexIWObITBUJdlNVVmP2{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<unity_h6>Log Input Depth</unity_h6>*

- <p><unity_h5>유니티 공식 설명:</unity_h5> 대수적 스케일로 입력 깊이를 표시합니다. </p>
- <p><unity_h5>추가 설명:</unity_h5> 근거리와 원거리의 깊이 차이를 효과적으로 볼 수 있습니다. </p>

#### <unity_h4> Reversible Tonemapped Input Color </unity_h4>

![Reversible Tonemapped Input Color]({{ site.google_drive }}190JTmGrYEm0z-dAtUZ9yS2HVta1UPNi2{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<unity_h6>Reversible Tonemapped Input Color</unity_h6>*

- <p><unity_h5>유니티 공식 설명:</unity_h5> 가역 톤매퍼를 사용하여 0-1 범위에 매핑된 입력 색상을 표시합니다. </p>
- <p><unity_h5>추가 설명:</unity_h5> 톤매핑 과정에서 정보가 얼마나 손실됬는지, 톤매핑 후에 원본데이터를 얼마나 복원할수 있는지 확인힐수 있습니다. </p>

#### <unity_h4> Shaped Absolute Input Motion </unity_h4>

![Shaped Absolute Input Motion]({{ site.google_drive }}17K6BfcWufQHOdC5l_PIPKpaGYn-GB3Jk{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<unity_h6>Shaped Absolute Input Motion</unity_h6>*

- <p><unity_h5>유니티 공식 설명:</unity_h5> 입력 동작 벡터를 시각화합니다. </p>
- <p><unity_h5>추가 설명:</unity_h5> 모션 벡터는 이전 프레임과 현재 프레임 간의 픽셀 이동량을 나타냅니다. 이 뷰는 각 픽셀의 모션 벡터 크기를 시각적으로 보여줍니다. </p>

#### <unity_h4> Motion Reprojection </unity_h4>

![Motion Reprojection]({{ site.google_drive }}1s36WDVnak-RKkFrfqR_Pwc93MTRcQxHh{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<unity_h6>Motion Reprojection</unity_h6>*

- <p><unity_h5>유니티 공식 설명:</unity_h5> 여러 프레임에서 재투영된 색상 차이를 시각화합니다. </p>
- <p><unity_h5>추가 설명:</unity_h5> 시간적 재투영은 이전 프레임의 데이터를 현재 프레임에 재활용하여 성능을 최적화하고 노이즈를 줄이는 기술입니다. 모션 벡터 값이 적절하게 계산되었는지 또는 모션의 크기와 방향이 예상한 대로 표현되는지 확인할 수 있습니다. </p>

#### <unity_h4> Sensitivity </unity_h4>

![Sensitivity]({{ site.google_drive }}1PuIAE_6y84y7IlLPWQzhnX0WyHzWyAK1{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<unity_h6>Sensitivity</unity_h6>*

- <p><unity_h5>유니티 공식 설명:</unity_h5> 픽셀 감도를 시각화합니다. 녹색 영역은 STP가 동작 동작을 예측할 수 없는 곳을 보여줍니다. 이러한 영역은 시각적 품질이 저하되어 렌더링될 가능성이 높습니다. STP는 가려진 객체가 처음 보이거나 빠른 움직임이 있는 영역에서 동작을 예측하는 데 어려움을 겪습니다. 잘못된 객체 동작 벡터도 동작 예측에 문제를 일으킬 수 있습니다. </p>
- <p><unity_h5>추가 설명:</unity_h5> 각 픽셀이 얼마나 민감하게 반응하는지를 나타냅니다. 민감도는 특정 픽셀이 과거 프레임 데이터와 현재 프레임 데이터 사이에서 얼마나 변화할지를 결정합니다. 민감도가 높으면 픽셀이 빠르게 새로운 프레임 데이터로 업데이트되며, 민감도가 낮으면 픽셀 업데이트가 더 천천히 이루어집니다. 움직임이 많은 씬에서 잔상(Ghosting) 또는 모션에 민감한 픽셀들을 찾아내는 데 도움됩니다. </p>

<br>
<br>

## <unity_h2> 3. Unity6에서 Spatial-Temporal Post-processing 분석하기 </unity_h2>

관련 내용이 어렵기 떄문에 예전에 쓴글보다 조금 더 딥하게 분석해보겠습니다. [유니티 STP](https://github.com/Unity-Technologies/Graphics/tree/27341ce4f5c8853d7f15e9420bff499f1087aceb/Packages/com.unity.render-pipelines.core/Runtime/STP)는 해당 사이트에서 코드를 확인 할 수 있습니다.

<br>

### <unity_h3> 1) STP 쉐이더 분석</unity_h3>

대략적으로 쉐이더 코드를 보고 과정을 분석해 보겠습니다.

1. 그래픽 리소스 초기화 및 내부 튜닝
    - 차선 리매핑 (스레드 재매핑 작업): 렌더링에서의 스레드 할당을 최적화하기 위해 작업을 재배치하여 성능을 개선합니다.
    - 내부 튜닝: 렌더링 품질을 개선하기 위해 여러 설정을 미세 조정합니다.
    - 안티 플리커 가중치 제한: 화면의 깜빡임 현상을 최소화하기 위한 가중치 값을 제한합니다.
    - 디더링 설정: 색상 밴딩 아티팩트를 줄이기 위해 디더링을 설정합니다.
    - 휘도 계산 (BT.709 표준 사용): 명암비 및 색상 정확도를 유지하기 위해 BT.709 표준을 사용하여 휘도를 계산합니다.
2. 피드백 관리 및 패턴 매칭
    - 피드백 프레임 제한 (최대 32 프레임 보관): 시간적으로 일관된 프레임 처리를 위해 피드백 프레임의 수를 제한합니다.
    - 모션 매칭 및 패턴 관리: 렌더링 품질을 높이기 위해 모션과 패턴을 분석하고 조정합니다.
    - 모션 매치 컨트롤: 화면의 움직임을 감지하고 그에 맞게 렌더링을 조정합니다.
    - 패턴 데모리 (모아레 패턴 제거): 화면에 나타날 수 있는 모아레 패턴을 제거하여 시각적 품질을 개선합니다.
    - 패턴 민감도 및 반응성 조정:  패턴의 민감도와 반응성을 조정하여 최적의 렌더링 결과를 얻습니다.
3. 안티 플리커 처리
    - 안티 플리커 블렌딩: 깜빡임 현상을 줄이기 위해 프레임 간의 블렌딩을 최적화합니다.
    - 공간적 및 시간적 안티앨리어싱 혼합 조정: 화면 깜빡임과 계단 현상을 동시에 처리하기 위해 공간적 및 시간적 안티앨리어싱의 혼합 지점을 조정합니다.
    - 지터 관리 (지터 워치) ~~(현재 미구현인듯?)~~: 지터 현상(작은 흔들림)을 관리하여 더욱 부드러운 영상 표현을 목표로 합니다.
    - 깊이 인코딩: 깊이 값을 효율적으로 처리하기 위한 과정입니다.
    - 깊이 값 패킹 및 언패킹: 깊이 값을 효율적으로 처리하기 위해 패킹하고, 필요 시 이를 언패킹하여 사용합니다.
    - 선택적 디더링 적용: 깊이 정보를 처리할 때, 필요한 경우 디더링을 적용하여 시각적 아티팩트를 줄입니다.
4. 기하학적 모션 및 프로젝션 처리
    - 정적 기하학 모션 전방 투영: 정적 기하학 객체의 움직임을 화면에 투영합니다.
    - 모션 벡터 매칭: 모션 벡터를 사용하여 움직임을 추적하고, 이를 화면에 맞게 조정합니다.
    - 프로젝션 로직: 3D 객체를 화면에 표시하기 위한 프로젝션 계산 과정입니다.
    - 전방 및 후방 투영: 3D 객체를 화면에 투영하는 두 가지 방식으로, 각각 전방과 후방으로의 투영을 수행합니다.
    - 모션 벡터 인코딩 (셰이더 구현): 모션 벡터를 인코딩하여 셰이더에서 효율적으로 사용할 수 있도록 합니다.
5. 색상 처리 및 톤 매핑
    - HDR 톤 매핑 및 역 톤 매핑: 고화질의 HDR(High Dynamic Range) 콘텐츠를 적절한 톤으로 매핑하고, 필요 시 이를 다시 되돌립니다.
    - 감마 디더링 (밴딩 아티팩트 감소): 디더링을 사용하여 색상 밴딩 현상을 최소화합니다.
    - 색상 변환 및 조명 계산: 색상과 조명을 최적화하여 화면의 품질을 향상시킵니다.
    - 선형에서 sRGB로 변환: 색상을 선형 공간에서 sRGB 공간으로 변환하여 올바른 조명 계산을 수행합니다.
6. 상수 생성 및 설정
    - StpDilateCon: 확장 및 이미지 처리 상수 생성: 이미지 확장 및 관련 작업에 필요한 상수를 생성합니다.
    - StpPatCon: 패턴 및 TAA 관련 상수 설정:패턴 처리와 TAA(시간적 안티앨리어싱) 과정에 필요한 상수를 설정합니다.
    - StpTaaCon: TAA용 상수 생성 (지터, 그레인, 피드백 변환 포함): TAA에 필요한 상수를 생성하여, 지터, 그레인, 피드백 변환 등을 포함합니다.
7. 안티앨리어싱 준비
    - 시간적 안티앨리어싱 준비:
        - 샘플링 (픽셀 색상 수렴 추적): 여러 프레임에 걸쳐 픽셀 색상이 얼마나 잘 수렴했는지 추적합니다.
        - 동작 및 깊이 정보 처리 (모션 벡터 및 깊이 값 사용): 픽셀의 정확한 위치를 재투영하기 위해 모션 벡터와 깊이 정보를 처리합니다.
        - 디더링 적용: 디더링을 통해 밴딩 아티팩트를 줄입니다.
        - 시간 재투영 (모션 벡터 기반 픽셀 위치 재투영): 모션 벡터를 사용해 픽셀의 위치를 재투영합니다.
        - 루마 및 컨버전스 관리 (2프레임 재투영 히스토리 및 저주파 수렴 데이터 활용): 시간적 안정성을 유지하기 위해 루마와 컨버전스를 관리합니다.
        - 확장된 페칭 (고스트 및 시간적 아티팩트 최소화): 고스트 및 시간적 아티팩트를 최소화하기 위해 확장된 페칭을 사용합니다.
    - 공간적 안티앨리어싱 준비:
        - 패턴 확장 (피드백에 따라 저주파 세부 사항 개선): 피드백을 기반으로 저주파 세부 사항을 개선하기 위한 패턴 확장을 준비합니다.
        - 공간 엘리어싱 관리 (가장자리 엘리어싱 감소): 가장자리에서 발생할 수 있는 엘리어싱 현상을 관리합니다.
8. 시간적 안티앨리어싱 처리
    - 깊이 및 동작 정보 처리: 깊이 및 모션 정보를 사용해 TAA를 적용합니다.
    - 색상 사전 처리: TAA 적용 전, 색상 정보를 처리하여 최적의 결과를 도출합니다.
    - 톤 매핑 및 디더링 적용 TAA 적용 전, 톤 매핑과 디더링을 통해 색상을 미리 처리합니다.
    - 휘도 처리: 휘도 값을 계산하여 밝기와 대비를 조정합니다.
    - 모션 매칭 및 민감도 조정: 모션 매칭을 통해 움직임을 추적하고, 민감도를 조정하여 최적의 결과를 얻습니다.
    - 이웃 분석 및 시간적 변화 관리: 이웃 픽셀 간의 변화와 시간적 변화를 분석하여, 일관성을 유지합니다.
    - 블렌딩 및 컨버전스
    - 블렌딩 비율 및 수렴 계산: 블렌딩 비율을 조정하고, 수렴 계산을 통해 부드러운 화면을 구현합니다.
    - Lanczos 필터링 및 디링잉 적용: Lanczos 필터링을 통해 가장자리와 고빈도 영역을 부드럽게 처리하고, 디링잉을 통해 계단 현상을 줄입니다.
9. 공간적 안티앨리어싱 처리
    - 공간 엘리어싱 관리
    - 가장자리 엘리어싱 감소
    - 일반화된 에지 안티앨리어싱 (GEAA): 에지 감지 및 방향 설정, 서브픽셀 위치 조정 등 다양한 기법을 사용해 가장자리의 엘리어싱을 제거합니다.
    - 에지 감지 및 방향 설정: 이미지의 가장자리를 감지하고, 그에 맞는 방향을 설정합니다.
    - 서브픽셀 위치 및 조정: 서브픽셀의 위치를 조정하여 최적의 렌더링 결과를 얻습니다.
    - 루마 샘플링 및 기울기 계산: 루마 샘플링을 통해 기울기를 계산하고, 이를 바탕으로 에지 처리를 수행합니다.
    - 대조 이웃 선택 및 샘플링 위치 계산: 대조 이웃을 선택하고, 이를 바탕으로 샘플링 위치를 계산하여 에지 엘리어싱을 최소화합니다.
    - 쌍선형 페치 시뮬레이션 및 불투명도 계산: 쌍선형 페치 시뮬레이션을 통해 불투명도를 계산하고, 이를 통해 엘리어싱을 줄입니다.

간단하게 요약해보겠습니다. 3D 공간에서의 기하학적 움직임을 처리하고, 이를 2D 화면에 투영하고 톤 맵핑을 처리한 후, 렌더링한 화면을 비트 쉬프트 연산으로 1/4로 줄인후 강재로 늘려서 시간적 안티엘리어싱과 공간적 안티엘리어싱을 처리합니다. 

<br>

### <unity_h3> 2) 그래픽 및 비디오 처리 기술 비교 화면</unity_h3>

![그래픽 및 비디오 처리 기술 비교]({{ site.google_drive }}1RwRe77uWCtqgpUI39grkzWeeJNHIZlxx{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<unity_h6>그래픽 및 비디오 처리 기술 비교</unity_h6>*

- Bilinear Filtering: 텍스처 매핑에서 사용되는 보간 방법 중 하나입니다. 주로 2D 이미지를 확대하거나 축소할 때 사용됩니다.네 개의 인접한 텍셀(텍스처의 픽셀) 값을 사용하여 보간하여 최종 색상을 결정합니다. 비교적 간단하며 성능이 좋지만, 이미지가 블러(blur)되거나 뚜렷하지 않게 될 수 있습니다. 연산 비용을 최소화해야 할 때 유리합니다.
- Nearest-Neighbor: 미지를 확대하거나 축소할 때 가장 가까운 텍셀의 값을 그대로 복사하여 픽셀을 결정하는 방법입니다. 고해상도 그래픽에서 세밀한 디테일보다는 부드러움이 중요할때 사용합니다. 결과 이미지가 계단 현상이나 픽셀화되어 보일 수 있습니다.
- FidelityFX Super Resolution: AMD에서 개발한 오픈 소스 업스케일링 기술입니다. 이 기술은 낮은 해상도의 이미지를 더 높은 해상도로 업스케일링하여 게임 성능을 향상시키는 데 사용됩니다.
- Spatial-Temporal Post-processing: 이미지나 비디오 처리를 개선하기 위한 기술입니다. 이 기술은 시간적(Temporal) 및 공간적(Spatial) 데이터를 결합하여 영상의 품질을 높입니다

위의 이미지만보면 Spatial-Temporal Post-processing의 프레임이 떨어져 보일수 있습니다. 하지만 위의 이미지는 STP는 화면을 줄인 후 늘려서 엘리어싱으로 처리하는것을 보여주기 위해서 가져왔습니다. FidelityFX Super Resolution은 움직인 영상에서 프레임이 약한데, Spatial-Temporal Post-processing 애니메이션이 심한 장면에서 보다 효율적으로 처리할 수 있습니다. 

<br>
<br>

## <unity_h2> 4. 끝으로 </unity_h2>

Spatial-Temporal Post-processing(STP)는 공간적 처리와 시간적 처리 기법을 결합하여 게임 그래픽의 품질을 향상시키는 최신 기술입니다. Unity6에서 STP를 사용하면 해상도 향상, 노이즈 제거, 모션 블러 최소화 등 다양한 이점을 얻을 수 있습니다. STP의 핵심 요소는 Anti-Aliasing, Ambient Occlusion, Depth of Field와 같은 공간적 처리 기법과, Temporal Anti-Aliasing(TAA)와 Temporal Upsampling과 같은 시간적 처리 기법입니다.

이 기술을 Unity에서 효과적으로 사용하기 위해서는 Shader Model 5.0을 지원해야 하며, Spatial-Temporal Post-processing Debugger를 활용해 STP의 작동 상태를 시각적으로 확인하고 디버깅할 수 있습니다. 디버깅은 다양한 색상 및 깊이 표현, 모션 재투영, 민감도 시각화 등 여러 항목을 통해 수행할 수 있습니다. 또한, STP 쉐이더 분석을 통해 내부적인 처리 과정을 이해하면 더욱 정교한 렌더링 최적화가 가능해집니다.

STP는 고성능의 그래픽과 일관된 비주얼 품질을 유지하기 위한 중요한 도구이며, 앞으로 더 많은 게임에서 활용될 가능성이 높습니다.

