---
layout: post
title: "유니티 컴퓨트 쉐이더 작성하기 ver.3"
date: 2024-03-26 09:00:00 +09:00
image: https://drive.google.com/thumbnail?id=1TzEkCfSQEXmbL_HQC3RuE7CwnkDKFcvU
toc: true
categories: [Computer_Vision] 
keywords: C#, Unity, ComputeShader
addsence: false
lastmod: 2024-06-11 09:00:00 +09:00
sitemap:
  changefreq : daily
  priority : 1.0
excerpt: Unity를 사용하여 시각 효과 및 컴퓨트 쉐이더를 연습하는 것입니다. 주요 초점은 단순한 모방 VFX 및 파티클 효과입니다.
related_links:

---

## <unity_h2> 프로젝트 소개 </unity_h2>

언리얼의 나이아가라 및 유니티의 VFX 그래프의 기초가 되는 컴퓨트 쉐이더로 파티클을 만들고 코드를 작성해봤습니다. 해당 코드들은 연습하는 과정들을 담고 있습니다.

<br>
<br>

## <unity_h2> 프로젝트 개요 </unity_h2>

- <span><unity_h5>프로젝트명:</unity_h5> 유니티 컴퓨트 쉐이더 사용하기</span>
- <span><unity_h5>게임 장르:</unity_h5> toy Proejct</span>
- <span><unity_h5>기간:</unity_h5> 제작 완료</span>
    - ver.1: 2022.12.04~2022.12.05(TestComputeShader) 
    - ver.2: 2022.12.09~2022.12.10(WaterTestEffect)
    - ver.3: 2022.12.16~2022.12.17(FlowEffectTest)
- <span><unity_h5>개발인원:</unity_h5> Developer(1명)</span>
- <span><unity_h5>플랫폼:</unity_h5> PC (Window)</span>

<br>

### <unity_h3> 기술 스택 </unity_h3>

- <span><unity_h5>개발 도구:</unity_h5> Unity 2021.3.3f1 / visual stuido </span>
- <span><unity_h5>개발 언어:</unity_h5> C# / HLSL </span>
- <span><unity_h5>그래픽 디자인:</unity_h5> Adobe Photoshop </span>
- <span><unity_h5>음향 효과:</unity_h5> Adobe Audiition </span>

<br>
<br>

## <unity_h2> 프로젝트 특징 및 기능 구현 </unity_h2>

아래 프로젝트는 컴퓨터 쉐이더를 사용해서 제작한 결과물 입니다.


<br>

### <unity_h3> TestComputeShader ver.1</unity_h3><red1_error> (전체 제작 기여도: 100%)</red1_error>

![TestComputeShader]({{ site.google_drive }}16RmVl1UUkGndZluad_OZ-tUkHYSxd6L0{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}

컴퓨트 쉐이더를 가지고 목적없는 연습용 프로젝트를 만들고 싶었습니다. 하지만 컴퓨트 쉐이더에 대해서 해본 적이 없고 데이터가 없었기 때문에 인터넷에 돌아다니는 예제를 보고 프로젝트를 작성하게 되었습니다.


<br>

### <unity_h3> WaterTestEffect ver.2</unity_h3><red1_error> (전체 제작 기여도: 100%)</red1_error>

<unity_h4>HLSL에서 파동 높이 계산 구현:</unity_h4>

```c#

RWTexture2D<float4> curState;
RWTexture2D<float4> beforState;
RWTexture2D<float4> afterState;
int2 resolution;
float3 effect;
float dispersion;

[numthreads(8, 8, 1)]
void CSMain(uint3 id : SV_DispatchThreadID) {
    float cur_ij = curState[id.xy].x;
    float befor_ij = beforState[id.xy].x;
    float newWaveHeight = cur_ij * 2 - befor_ij + 0.25 * (cur_ip1j + cur_ijp1 + cur_im1j + cur_ijm1 - 4 * cur_ij);
    newWaveHeight *= dispersion;

    if (id.x == effect.x && id.y == effect.y) {
        newWaveHeight = effect.z;
    }
    afterState[id.xy] = float4(newWaveHeight, newWaveHeight, newWaveHeight, 1);
}

```

#### <unity_h4> 렌더 텍스쳐로 보는 파동효과 </unity_h4>

![WaterTestEffectRenader]({{ site.google_drive }}1u9VjHYLLstj1Icsjn5JztRYqZZPhEFFY{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<unity_h6> 렌더 텍스쳐로 보는 파동효과 </unity_h6>*

#### <unity_h4> 실제 머터리얼 적용 </unity_h4>

![WaterTestEffectreal]({{ site.google_drive }}13pk-gNvwDVF4a5dtmQdUQyfzOwh3YdEq{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<unity_h6> 실제 머터리얼 적용 </unity_h6>*




유체 역학 중에 기초 파동을 구현해보고 싶어서 논문 내용을 참조하여 컴퓨트 쉐이더로 작성하였습니다. 공이 좌우로 움직일 때 물이 파동으로 퍼지고, 가운데 블록인 장애물이 있다는 설정으로 가운데 벽에 반사되어 파동이 일어납니다. (해당 논문은 아래에 참조로 작성하였습니다.)



<br>

### <unity_h3> FlowEffectTest ver.3</unity_h3><red1_error> (전체 제작 기여도: 100%)</red1_error>

<unity_h4>파티클 효과:</unity_h4>

```c#

float random(float value, float mutation = 0.546) {
    return frac(sin(value + mutation) * 141421.3562);
}

float3 random3d(float value) {
    return float3(random(value, 2.5), random(value, 5.0), random(value, 7.5));
}

[numthreads(64, 1, 1)]
void Spheres(uint3 id : SV_DispatchThreadID) {
    float3 baseDir = normalize(random3d(id.x) - 0.5) * (random(id.x) * 0.5 - 1);
    float3 orthogonal = normalize(cross(baseDir, random(id.x + 9.9) - 0.5)) * (random(id.x + 3.3) * 0.9 + 0.1);
    float scaledTime = Time * 2 + random(id.x);
    float3 dir = baseDir * sin(scaledTime);
    Result[id.x] = dir * 20;
}

```

#### <unity_h4> 구에서 퍼지는 포인트 클라우드 애니메이션 </unity_h4>

![FlowEffectTestDiffusion]({{ site.google_drive }}1FxfJJ1qfwKIjR4EFXRXoDdZUnrcQ7n6l{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<unity_h6> 구에서 퍼지는 포인트 클라우드 애니메이션 </unity_h6>*

#### <unity_h4> 차원문 효과 포인트 클라우드 애니메이션 </unity_h4>

![FlowEffectTestPortal]({{ site.google_drive }}14Ch_KX-KKsYfOT_buAkKcyELiUWarl6A{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<unity_h6> 차원문 효과 포인트 클라우드 애니메이션</unity_h6>*


앞선 두 개의 구현으로 컴퓨트 쉐이더에 익숙해져서 머리 속에 있는 로직을 작성해봤습니다.


<br>
<br>

## <unity_h2> 컴퓨트 쉐이더 구조 </unity_h2>

<unity_h4>텍스처 및 벡터 설정:</unity_h4>

```c#

WaveComputers.SetTexture(0, "beforState", beforState);
WaveComputers.SetTexture(0, "afterState", afterState);
WaveComputers.SetVector("effect", effect);
WaveComputers.SetVector("resolution", new Vector2(resolution.x, resolution.y));
WaveComputers.SetFloat("dispersion", dispersion);
WaveComputers.Dispatch(0, resolution.x / 8, resolution.y / 8, 1);

```

<unity_h4>텍스처 초기화:</unity_h4>

```c#

void InitializeTexture(ref RenderTexture tex) {
    tex = new RenderTexture(resolution.x, resolution.y, 1, 
    UnityEngine.Experimental.Rendering.GraphicsFormat.R16G16B16A16_SNorm);
    tex.enableRandomWrite = true;
    tex.Create();
}

```

![ComputeShaerLogic]({{ site.google_drive }}1MHgyEbMti-HD5Jt_qGS7Mi2kx4Pz4UJr{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<unity_h6> 코드 구조</unity_h6>*

코드를 연습하다보니 제가 사용한 로직 구조입니다. (위의 로직이 최선의 방법이 아닐수도 있습니다.)

<br>
<br>

## <unity_h2> 결과(성과) 및 데모 </unity_h2>

![WaterTestWave]({{ site.google_drive }}1TzEkCfSQEXmbL_HQC3RuE7CwnkDKFcvU{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}

물 효과: 렌더 텍스처를 활용하여 물 표면의 장애물 및 소스를 시뮬레이션.

![FlowEffectTest]({{ site.google_drive }}1G-KrGOxS-gtXegQ3f_AZ4ISH_SrEtpuu{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}

파티클 효과: 랜덤 벡터와 시간에 의해 영향을 받는 동적 파티클을 렌더링하는 파티클 쉐이더를 구현.

- <span><unity_h5>성과:</unity_h5> 토이프로젝트 제작 </span>
- <span><unity_h5>깃허브(코드):</unity_h5> 디렉토리 정리 후 공개 예정</span>

<br>
<br>

## <unity_h2> 비고 및 여담 </unity_h2>

- 여담:
    - 간단한 모방 VFX 이펙트 파티클 구현 연습하기 위에 코드를 작성하였습니다.
    - 만들때는 분명 재미있게 만들었는데 어떻게 만드는지 설명하라면 조금 난감한 부분들이 있습니다. 예를 들어 차원문 효과 같은 경우에는 머리속으로 관성적으로 생각해서 작성해서 수식을 정리하기 어렵습니다. 또한 해당 구현들이 전부 GPU 최적화 되어있는지는 차근차근 고민해봐야 합니다.(미래에 내가 고민하겠지...)

- 오류처리:
    - 컴퓨트 쉐이더 주석에 비ASCII 문자를 사용할 때 발생하는 'INVALID_UTF8_STRING' 오류와 같은 일반적인 문제를 다룹니다.

이 요약은 문서의 주요 내용을 설명하며 프로젝트와 그 구현 세부 사항을 체계적으로 제공합니다.


<br>

---

<br>

###### <unity_h6>참조 논문:</unity_h6> [https://inside.mines.edu/~jpaone/papers/renderingWater.pdf](https://inside.mines.edu/~jpaone/papers/renderingWater.pdf)