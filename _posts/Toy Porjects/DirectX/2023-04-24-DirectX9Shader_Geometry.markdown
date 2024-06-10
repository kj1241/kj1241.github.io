---
layout: post
title: "DirectX9 쉐이더 공부 1 - 지오메트릭스(추가 중)"
date: 2024-04-24 09:00:00 +09:00
image: https://drive.google.com/thumbnail?id=1J7Evwz8enUw6iI0IX7USUkA5cqo05qHV
toc: true
categories: [DirectX]
keywords: C++, DirectX 9, shader, Geometry
related_links:
---

## <cpp_h2>프로젝트 소개</cpp_h2>

이 프로젝트는 구글 드라이브에 박혀있던 코드입니다. 원래 공개하지 않으려고했던 이유는 프로젝트의 목정성이 쉐이더 공부에 초점이 마춰있기도 했고, 대학교 학부생 시절 코드를 보면서 혼자 공부했던것들이라 부끄럽기도 합니다. 만드는게 재미있어서 시작한 쉐이더 공부지만 최대한 쉐이더를 무엇을 공부했는지 보여드리겠습니다.

<br>
<br>

## <cpp_h2>프로젝트 개요</cpp_h2>

- <span><cpp_h5>프로젝트명:</cpp_h5> DirectX9 지오메트릭스</span>
- <span><cpp_h5>게임 장르:</cpp_h5> Toy Project</span>
- <span><cpp_h5>기간:</cpp_h5> 제작 완료</span>
    - ver.1: 2016.04.22~2016.05.31
	- ver.2: 2024.06.08~2024.06.09
- <span><cpp_h5>개발인원:</cpp_h5> Developer(1명)</span>
- <span><cpp_h5>플랫폼:</cpp_h5> PC (Window)</span>

<br>

### <cpp_h3> 기술 스택 </cpp_h3>

- <span><cpp_h5>개발 도구:</cpp_h5> viusal studio 2010 → 2019 / DirectX 9 </span>
- <span><cpp_h5>개발 언어:</cpp_h5> c++ / hlsl </span>

<br>
<br>

## <cpp_h2> 프로젝트 특징 및 기능 구현 </cpp_h2>

쉐이더에 대해서 학부시절 개인적으로 공부하고 코드를 수정과 구현 내용입니다.

<br>

### <cpp_h3> 1) DisplacementCompression ver.3 </cpp_h3><red1_error> (전체 제작 기여도: 100%)</red1_error>

![멘델브로 프렉탈 코드]({{ site.google_drive }}1SqWzmhVGUOdYffrx1M28RqIyvWEtr_jD{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<cpp_h6>멘델브로 프렉탈 개선 코드</cpp_h6>*

ver.1 테셀레이트 제작 및 만델브로트 프렉탈 코드 개선

1. MinRe, MaxRe, MinIm, MaxIm 값을 더 일반적인 값으로 변경했습니다.
2. 반복 횟수를 1000으로 늘려 더 자세한 패턴을 생성하도록 했습니다.
3. 값이 4를 초과하는지 확인하는 조건을 zre2 + zim2 > 4.0f로 변경했습니다.
4. 패턴을 저장하는 배열인 displacementTexture를 함수 매개변수로 전달하여 메모리 관리를 더 명확하게 했습니다.
5. 주석을 추가하여 각 단계의 의미를 설명했습니다.

ver.2 변경 내용: 쉐이더 모델 1에서 쉐이더 모델 3 업데이트
1. 입력 및 출력 구조체 확장
2. 텍스처 매핑 추가
3. 조명 계산 추가

추가된 기능 설명

1. 입력 및 출력 구조체 확장
	- VS_IN 구조체에 texcoord 필드를 추가하여 텍스처 좌표를 전달합니다.
	- VS_OUT 구조체에 texcoord, norm, worldPos 필드를 추가하여 텍스처 좌표, 정점의 법선, 월드 좌표를 전달합니다.

2. 텍스처 매핑 추가
	- TextureSampler 샘플러를 정의하여 텍스처 샘플링을 추가합니다.
	- 텍스처 좌표를 VS_OUT 구조체로 전달하고, 픽셀 셰이더에서 텍스처 색상을 샘플링합니다.

3. 조명 계산 추가
	- 디렉셔널 라이트 방향(LightDirection), 색상(LightColor), 앰비언트 색상(AmbientColor)을 추가합니다.
  	- 픽셀 셰이더에서 조명 계산을 수행합니다.노말 벡터와 라이트 방향의 내적(dot product)을 계산하여 확산 조명(diffuse lighting)을 적용합니다.
  	- 최종 색상은 텍스처 색상과 조명 색상의 합으로 계산됩니다.

4. 그라데이션 추가
	- gradientFactor는 월드 좌표의 Y 위치를 기반으로 계산됩니다. 여기서 Y 좌표를 10으로 나누어 정규화하고, saturate 함수를 사용하여 0과 1 사이로 클램핑합니다. 필요에 따라 그라데이션 범위를 조정할 수 있습니다.
	- gradientColor는 lerp 함수를 사용하여 빨강 (1, 0, 0, 1)과 파랑 (0, 0, 1, 1) 사이를 보간합니다.
	- 최종 색상(finalColor)에 그라데이션 색상(gradientColor)을 곱하여 출력 색상(outp.col)을 계산합니다.

![펄린 노이즈 코드]({{ site.google_drive }}1J7Evwz8enUw6iI0IX7USUkA5cqo05qHV{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<cpp_h6>펄린 노이즈 코드</cpp_h6>*

ver.3 만델브로트 프렉탈 코드를 펄린 노이즈 코드로 변경

1. Perlin Noise 함수
	- Fade: S-곡선을 사용하여 스무스하게 보간합니다.
	- Lerp: 선형 보간을 수행합니다.
	- Grad: 해시 값을 사용하여 그라디언트를 계산합니다.
	- PerlinNoise: Perlin Noise 값을 계산합니다.

2. 패턴 생성 함수
	- GeneratePerlinNoisePattern 함수에서 Perlin Noise를 사용하여 패턴을 생성합니다.

3. Permutation 배열:
	- permutation 배열은 0부터 255까지의 값이 섞인 배열로, 512개의 값으로 확장됩니다.
	- 실제 배열 값을 생략했지만, 실제 구현에서는 모든 값을 채워야 합니다.

<br>

### <cpp_h3> 2) SurfaceBasis </cpp_h3><red1_error> (전체 제작 기여도: 100%)</red1_error>

<iframe width="100%" style="aspect-ratio:16/9" src="https://drive.google.com/file/d/1_OdcgWgArDiPbC3SXsTG-fHLuWJLRudh/preview" title="SurfaceBasis" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

삼각형 메쉬에 적용되는 빛을 좀 더 세분화 하기위해서 테셀레이터를 사용해서 분할 합니다.

- Direct3D를 사용하여 레벨 오브 디테일(LOD)에 따라 패치를 생성하고 이를 정점 버퍼(Vertex Buffer)에 저장하는 두 가지 함수
- 일반적인 정점 버퍼를 생성과 선형 버퍼를 생성
- 두 함수 모두 특정 레벨의 디테일(LOD)에 따라 삼각형 패치를 분할(tessellate)하고 그 결과를 정점 버퍼에 저장
- 바리센트릭 좌표를 사용하여 각 정점을 표현
- 정점을 N-Patch (Bezier Patch)로 변환하고 조명 계산을 위해 법선 벡터를 보간하고 제어점 생성

```

                    /' b300 = v0
                   /  '
                  /    '
             b210/      'b201
                /        '
               /          '
          b120/     b111   'b102
             /              '
            /                '
  v1 = b030/__________________'b003 = v2  
                b021    b012  

```

<br>

### <cpp_h3> 3) VertexCompression </cpp_h3><red1_error> (전체 제작 기여도: 100%)</red1_error>

<iframe width="100%" style="aspect-ratio:16/9" src="https://drive.google.com/file/d/1sTpmsqPZG8tzqEgkR6X7L95mp5KD5xjX/preview" title="VertexCompression" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

3D 메쉬 압축 기법들은 메쉬 데이터를 효율적으로 저장하고 전송하기 위해 사용됩니다. 각 기법마다 데이터의 정밀도, 크기, 압축률 등에서 차이가 있습니다.

1. 정규화된 양자화된 메쉬 (Normalized Quantized Mesh)
	- 특징: 메쉬의 위치 데이터를 정규화한 후 양자화(Quantization)합니다.
	- 장점: 저장 공간을 절약하고, 압축률을 높일 수 있습니다.
	- 단점: 양자화 과정에서 정밀도가 떨어질 수 있습니다.

2. 8비트 스케일 오프셋 위치 메쉬 (8-bit Scale Offset Position Mesh)
	- 특징: 위치 데이터를 8비트로 압축하여 저장합니다. 이는 특정 범위 내에서 위치 값을 스케일링하고 오프셋을 적용합니다.
	- 장점: 매우 작은 크기로 데이터 저장이 가능합니다.
	- 단점: 낮은 비트 수로 인해 위치 정보의 정밀도가 낮아질 수 있습니다.

3. 8비트 위치 압축 변환 메쉬 (8-bit Position Compression Transformed Mesh)
	- 특징: 위치 데이터를 8비트로 압축하여 변환합니다.
	- 장점: 데이터 크기 감소.
	- 단점: 위치 정밀도가 낮아질 수 있습니다.

4. 16비트 스케일 오프셋 위치 메쉬 (16-bit Scale Offset Position Mesh)
	- 특징: 위치 데이터를 16비트로 압축하여 저장합니다. 8비트 스케일 오프셋 메쉬와 유사하지만 더 높은 비트 수를 사용합니다.
	- 장점: 더 높은 정밀도를 제공하면서도 데이터 크기를 줄일 수 있습니다.
	- 단점: 8비트 기법보다 상대적으로 큰 데이터 크기.

5. 16비트 위치 압축 변환 메쉬 (16-bit Position Compression Transformed Mesh)
	- 특징: 위치 데이터를 16비트로 압축하여 변환합니다.
	- 장점: 데이터 크기를 줄이면서도 8비트보다 높은 정밀도를 제공.
	- 단점: 원래 데이터보다 약간 더 큰 데이터 크기.

6. 16비트 슬라이딩 압축 변환 메쉬 (16-bit Sliding Compression Transformed Mesh)
	- 특징: 슬라이딩 창(sliding window)을 사용하여 위치 데이터를 16비트로 압축 변환합니다.
	- 장점: 특정 패턴을 가진 데이터에 대해 더 효율적인 압축 가능.
	- 단점: 특정 경우에만 최적의 압축률을 제공.

7. DEC3N 위치 압축 변환 메쉬 (DEC3N Position Compression Transformed Mesh)
	- 특징: 32비트 정수로 변환하여 위치 데이터를 압축합니다.
	- 장점: 효율적인 정수 압축을 통해 데이터 크기를 줄입니다.
	- 단점: 변환 과정에서 약간의 정밀도 손실이 있을 수 있습니다.

8. 10, 10, 12비트 (32bit) 위치 압축 변환 메쉬 (10, 10, 12-bit (32-bit) Position Compression Transformed Mesh)
	- 특징: 각 좌표를 10비트, 10비트, 12비트로 압축하여 총 32비트로 만듭니다.
	- 장점: 비교적 높은 정밀도를 유지하면서도 압축률이 높습니다.
	- 단점: 10비트와 12비트 사이의 정밀도 차이로 인해 미세한 정밀도 손실 가능성.


<br>
<br>

## <cpp_h2> 결과(성과) 및 데모 </cpp_h2>

- <span><cpp_h5>성과:</cpp_h5> DirectX9 지오메트릭스 작성 </span>
- <span><cpp_h5>깃허브(코드):</cpp_h5> [https://github.com/kj1241/DirectX_Portfolio/tree/main/DX9/Shader](https://github.com/kj1241/DirectX_Portfolio/tree/main/DX9/Shader)</span>

<br>
<br>

## <cpp_h2> 비고 및 여담 </cpp_h2>

- 코드를 공개하지 않은 이유
	- 프로그램 작성하는 것이 재미있어서 공부했지만, 어셈블리어로 작성된 쉐이더 코드와 레지스트리 등록하는 방법은 더 이상 현업에서 사용되지 않는다고 생각해서 공개를 하지 않았습니다.

- 면접 때 압축관련해서 질문 받았는데 대답 못한 이유
	1. 압축이라는 용어가 애매한게 이미지등을 압축해서 파일형식 변환과정을 이야기하는지 아니면 위처럼 쉐이더 형식에서 메쉬를 비트 압축해서 사용하지 정확하지 못했기 때문입니다.
	2. 머리속에 여러가지 압축기술이 떠오르는데 최신 기술들을 알지 못하고 뭔가 얼핏 생각나서 이야기 하지 못했습니다.