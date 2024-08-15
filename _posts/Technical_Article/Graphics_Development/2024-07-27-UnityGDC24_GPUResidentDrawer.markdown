---
layout: post
title: "GDC24 Unity 1 - GPU Resident Drawer"
date: 2024-07-27 09:00:00 +09:00
image: https://drive.google.com/thumbnail?id=1iiQM2W6mu8FIG_h4BrAlg9vVlpO9N8rU
toc: true
categories: [Graphics_Development]
keywords: Unity, GPU Resident Drawer, 컴퓨트 셰이더, GPU 인스턴싱, 렌더링 최적화, 메모리 효율화, 실시간 렌더링
addsence: true
lastmod: 2024-08-13 09:00:00 +09:00
sitemap:
  changefreq : daily
  priority : 1.0
excerpt:  유니티의 GPU Resident Drawer는 컴퓨트 셰이더를 활용해 다수의 동일한 오브젝트를 효율적으로 렌더링하는 기능입니다. 이 기능은 특히 복잡한 씬에서 프레임률을 향상시키고, 메모리 사용을 최적화하는 데 유용합니다. GPU 인스턴싱과 결합하면 대규모 씬에서도 성능을 크게 개선할 수 있습니다.
related_links:
  - url: /unity/GPU_Instancing.html
  - url: /graphics_development/UnityGDC24_GPUOcclusionCulling.html
---

안녕하세요. 오랜만에 아티클 작성으로 돌아왔습니다. 원래 이 주제는 제가 Unity GDC 2024 영상이 처음 발표된 4개월 전에 작성할까 고민하던 글입니다.
1주일이라는 시간이 걸린 이유는 빌드 시간과 어떻게 글을 작성해야 하는지 고민했기 때문입니다. ~~(인크레디빌드 마렵다...)~~ 면접에서 말하는 것과 같이 글이 완벽하지 않으니깐 보여주고 싶지 않다고 느꼈습니다. GDC를 통해서 전부 처음 보는 것들입니다. 따라서 지금 현재 글에 집중해서 작성해보겠습니다.

<br>
<br>

## <unity_h2> 1. GPU Resident Drawer 적용하기 앞서 </unity_h2>

이번에 분석할 내용은 [GDC 2024 Unity6](https://www.youtube.com/watch?v=o9AGkB9nnkc)에서 나오는 Boosted rendering performance 파트에서 언급된 GPU Resident Drawer에 관해서 적어보려고 합니다.

처음에는 CPU와 GPU 간의 빈도를 최소화하여 최적화 했다고 했을 때, 데이터 전송을 최적화하는 데는 데이터 전송과 계산을 중첩하여 성능을 [개선하는 방법](https://developer.nvidia.com/blog/how-optimize-data-transfers-cuda-cc/)을 생각했습니다. 그런데 실제로 GPU Resident Drawer를 적용해서 실험해보니 위와는 전혀 다른 내용 같았습니다.

<br>

### <unity_h3> 1) GPU Resident Drawer 이란?  </unity_h3>

개념 같은 내용은 유니티에서 설명해주는 영상이 가장 베스트입니다. 하지만 지금 시점에서 그런 내용이 부족하기 때문에 제가 단순하게 분석한 내용을 이야기해보겠습니다. GPU Resident Drawer는 원래의 매쉬들을 추적해서 중복된 매쉬를 GPU 인스턴싱해서 드로우 콜을 드로우 인스턴스 콜로 만들어서 오버헤드를 줄이는 방식입니다.

뭔가 명료하지 않고 이렇게 기억하면 설명이 너무 깊습니다. 그래서 여러분의 이해를 돕기 위해 실험 데이터를 가져왔습니다. 제가 사용할 프로젝트는 Unity GDC 2024에서도 나오고 유니티6 프리뷰에서 예시로 제공되는 Garden을 사용하였습니다.

<iframe width="100%" style="aspect-ratio:16/9" src="https://drive.google.com/file/d/1XXcfV8uuACvhTsGJY2zst-Fa3OdmYdN5/preview" title="GPU Resident Drawer 프레임 디버깅 비교" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

- 공통 사항(PC 사항)
    - CPU: Intel(R) Core(TM) i7-4720HQ 
    - GPU: Nvidia GTX 950

- 비교 옵션
    - GPU Resident Drawer off - forword rendering
    - GPU Resident Drawer on - forword+ rendering

위의 실험 표는 URP에서 유니티에서 그려지는 최대한 비슷한 장면을 프레임 디버거로 디버깅하여 GPU Resident Drawer 사용 전, 후를 비교한 데이터입니다. 보시면 GPU Resident Drawer Off 상태에서 드로우 콜이 GPU Resident Drawer ON 상태에서 드로우 콜 + 인스턴스와 비슷합니다. GPU Resident Drawer를 사용하면 GPU 인스턴싱을 해서 프레임에 영향을 미치는 드로우 인스턴스 콜 + 드로우 콜이 확연히 준 것을 볼 수 있습니다.

위의 내용이 정확하게 무슨 이득이 발생하는지 인식하기 힘드실 수도 있습니다. 따라서 두 개의 영상을 준비하였습니다.

#### <unity_h4> GPU Resident Drawer off  </unity_h4>

<iframe width="100%" style="aspect-ratio:16/9" src="https://drive.google.com/file/d/1h5_mtwT873csDeII3n4fygVGh4NQ8gmD/preview" title="GPU Resident Drawer off" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>


#### <unity_h4> GPU Resident Drawer on  </unity_h4>

<iframe width="100%" style="aspect-ratio:16/9" src="https://drive.google.com/file/d/1E0ycZBafpo9v0Iu0Ul6-FRbrJVE9HAgz/preview" title="GPU Resident Drawer on" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

편의성을 위해서 UI로 FPS 계산하는 공식을 작성하였습니다. 그리고 확인을 위해서 PIX를 사용하였습니다. 해당 프로젝트는 화면 녹화 때문에 영상에서는 낮게 잡히지만 실제로는 60을 방어할 수 있습니다. GPU Resident Drawer 사용하지 않은 상태와 사용한 상태를 비교해 보면 실제로 약 평균 10프레임 정도 차이나는 것을 알 수 있습니다. GPU Resident Drawer 사용하는 것이 FPS를 올리는 데 도움이 됩니다.

<br>

### <unity_h3> 2) GPU Resident Drawer 사용전 생각해야되는 점  </unity_h3>

대부분의 상황에서 GPU Resident Drawer 사용하는 것이 크게 도움이 되지만 도움이 되지 않는 상황도 존재합니다. 그런 상황을 알아보도록 합시다.


#### <unity_h4> 1. G-buffer가 존재하지 않음 </unity_h4>

FForward+ 자체는 현대 그래픽스 렌더링 기법입니다. Forward의 장점과 Deferred의 일부 장점을 결합하여 조명을 처리할 수 있습니다. 즉, 화면 공간을 클러스터로 나누고 각 클러스터에 뎁스 값을 계산합니다. 그리고 이렇게 조명 리스트를 만듭니다. 그러면 쉐이더에서 조명 리스트를 사용하여 조명을 계산하면 됩니다. 
이때 포스트 프로세싱이나 Deferred를 사용함으로 G-buffer가 존재해야 합니다. 모바일에서는 아키텍처를 봐야 하지만 아직 지오메트릭스 버퍼가 존재하나 높은 메모리 사용량과 대역폭을 사용하지 못함으로 체크해 봐야 합니다. 따라서 모바일에서는 GPU Resident Drawer가 의미 없을 수도 있습니다.

#### <unity_h4> 2. GPU 인스턴싱을 포함하는 확장자 사용</unity_h4>

게임에서 자주 사용하는 오브젝트인 FBX와 OBJ는 기본적으로 GPU 인스턴싱을 포함하지 않습니다. 하지만 특수한 확장자인 웹에서 사용되는 .glb, Pixar에서 개발한 .usd, 시뮬레이터 데이터와 애니메이션 캐시 데이터로 사용되는 .abc 등에서는 기본적으로 GPU 인스턴싱을 담고 있기 때문에 GPU Resident Drawer를 사용해도 이득을 크게 보지 못할 수 있습니다.

#### <unity_h4> 3. 프로그래머가 만든 GPU 인스턴싱 </unity_h4>

유니티6에서는 엔진 단에서 GPU 인스턴싱을 지원하지만 프로그래머가 직접 GPU 인스턴싱을 만들 수 있습니다. 예전에 일할 때 프레임을 올리기 위해서 잠시 실험했던 코드들을 생각해보면 .obj와 .fbx는 GPU 인스턴싱을 포함하고 있지 않지만 .obj는 g 태그를 사용해서 동일 오브젝트를 표현하고, .fbx는 프로퍼티를 사용하여 인스턴싱 정보가 포함되게 만들었습니다. 그리고 유니티에서 [BatchRendererGroup API](https://docs.unity3d.com/ScriptReference/Rendering.BatchRendererGroup.html)를 사용해서 엔진을 커스터마이징 할 수 있습니다.

[쉐이더](https://docs.unity3d.com/Manual/gpu-instancing-shader.html)를 사용해서 GPU 인스턴싱을 사용할 수 있습니다.

```c

Shader "Custom/InstancedShader"
{
    Properties
    {
        _Color ("Color", Color) = (1, 1, 1, 1)
    }
    SubShader
    {
        Tags { "RenderType"="Opaque" }
        LOD 100

        Pass
        {
            CGPROGRAM
            #pragma vertex vert
            #pragma fragment frag
            #pragma multi_compile_instancing
            #include "UnityCG.cginc"

            struct appdata
            {
                float4 vertex : POSITION;
                UNITY_VERTEX_INPUT_INSTANCE_ID
            };

            struct v2f
            {
                float4 vertex : SV_POSITION;
                UNITY_VERTEX_INPUT_INSTANCE_ID
            };

            UNITY_INSTANCING_BUFFER_START(Props)
            UNITY_DEFINE_INSTANCED_PROP(float4, _Color)
            UNITY_INSTANCING_BUFFER_END(Props)

            v2f vert(appdata v)
            {
                v2f o;
                UNITY_SETUP_INSTANCE_ID(v);
                UNITY_TRANSFER_INSTANCE_ID(v, o);
                o.vertex = UnityObjectToClipPos(v.vertex);
                return o;
            }

            fixed4 frag(v2f i) : SV_Target
            {
                UNITY_SETUP_INSTANCE_ID(i);
                return UNITY_ACCESS_INSTANCED_PROP(Props, _Color);
            }
            ENDCG
        }
    }
}

```
UNITY_VERTEX_INPUT_INSTANCE_ID을 사용하여 정점 인스턴스 ID를 추가하고 UNITY_SETUP_INSTANCE_ID를 이용하여 액세스할 수 있습니다. 이렇게 하면 동일한 오브젝트를 묶어 효율적으로 렌더링할 수 있도록 셰이더를 작성할 수 있습니다.

하지만 프로그래머가 직접 GPU 인스턴싱을 구현한다면, 엔진에서 제공하는 GPU Resident Drawer를 사용하더라도 프레임 감소 효과가 크게 없을 수 있습니다.

#### <unity_h4> 4. 컴퓨트 쉐이더 무분별한 사용 </unity_h4>

컴퓨트 셰이더는 GPU의 스레드를 사용하여 최적화된 작업을 수행할 수 있지만, 잘못 사용하면 오히려 프레임을 증가시킬 수 있습니다. GPU Resident Drawer는 조명 계산 부분에 컴퓨트 셰이더를 사용하므로, 카메라에 컴퓨트 셰이더를 사용하여 필터 효과나 특수 효과를 적용할 때는 GPU 프로파일링을 통해 확인해야 합니다.


<br>
<br>

## <unity_h2> 2. Unity6에서 GPU Resident Drawer 적용하기 </unity_h2>

[깃허브 도큐먼트](https://github.com/Unity-Technologies/Graphics/blob/master/Packages/com.unity.render-pipelines.universal/Documentation~/gpu-resident-drawer.md)를 읽으면 GPU Resident Drawer를 적용할 수 있습니다. 해당 내용이 어려운 분들을 위해 스크린샷을 준비했습니다. ~~(귀찮지만 내가 고생하면 남들이 편하니깐)~~


<br>

### <unity_h3> 1) GPU Resident Drawer 설정하기 </unity_h3>

#### <unity_h4> a) BatchRendererGroup Variants 설정 </unity_h4>

![프로젝트 설정]({{ site.google_drive }}1P5d50KC_GPxskPCrS8HhFwG_pmCExxRw{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<unity_h6>프로젝트 설정 </unity_h6>*

- 에디터 > 프로젝트 설정을 클릭합니다.

![BatchRendererGroup Variants 설정]({{ site.google_drive }}1v1LUOc5VDU_K5Z7ZUYBFpH4rXyzJJb6F{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<unity_h6>BatchRendererGroup Variants 설정 </unity_h6>*

- 그래픽 탭에서 셰이더 스트리밍 섹션을 찾아 BatchRendererGroup Variants을 'Keep All'로 설정합니다.

<br>

#### <unity_h4> b) SRP Batcher를 활성화 </unity_h4>

![기본 URP Asset 찾기]({{ site.google_drive }}1l0uaNx7lWFAxUYsRgYLYcopUWFnUPflS{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<unity_h6>기본 URP Asset 찾기 </unity_h6>*

- 그래픽 탭에서 기본으로 설정된 URP 에셋을 찾아 더블클릭합니다. (비어 있다면 원하는 URP 에셋을 설정합니다.)

![랜더링 파이프라인 에셋 설정]({{ site.google_drive }}1rOKClOhZOkjtoXJJCwbHoL7HMwpwvTa3{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<unity_h6>랜더링 파이프라인 에셋 설정 </unity_h6>*

- 퀄리티 탭에서 Levels, Name을 설정하고 랜더링 파이프라인 에셋에 위의 URP 에셋을 설정합니다. 그러면 메인카메라 랜더러 탭에서 디폴트 랜더러가 바뀐 것을 볼 수 있습니다.

![Advanced Properties 체크]({{ site.google_drive }}1kDm16Nc6iNMTrqez2a87214JvdAvYDfp{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<unity_h6>Advanced Properties 체크 </unity_h6>*

- 처음 SRP Batcher를 적용하려고 하면 안 보일 수 있습니다. 점 3개 있는 부분을 클릭해서 'Advanced Properties'를 체크하면 SRP Batcher가 보입니다.

![SRP Batcher 설정]({{ site.google_drive }}1NQ_dlkl0qZxoR2cuwu3d21bS5g6X6-68{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<unity_h6>SRP Batcher 설정 </unity_h6>*

- 기본으로 설정된 URP 에셋의 인스펙터 창에서 SRP Batcher를 체크합니다.

<br>

#### <unity_h4> c) Forward+를 활성화 </unity_h4>

![URP 에셋 인스펙터 창]({{ site.google_drive }}1XDu1ioGzzdN67YFj-iInnCefS-vwsUk5{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<unity_h6>URP 에셋 인스펙터 창 </unity_h6>*

- URP 에셋 인스펙터 창에서 랜더러 리스트에 있는 유니버설 랜더러 데이터를 모두 수정합니다.

![Forward+로 변경]({{ site.google_drive }}156UJ503_oBDAUBHeAAv3gdOJulBXwllh{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<unity_h6>Forward+로 변경 </unity_h6>*

- 유니버설 랜더 데이터에서 Rendering 섹션의 Rendering Path를 Forward+로 변경합니다. 이처럼 위의 모든 팬더러 데이터를 수정해 줍니다.

<br>

#### <unity_h4> d) GPU Resident Drawer를 Instanced Drawing로 변경 </unity_h4>

![Instanced Drawing 설정]({{ site.google_drive }}1iiQM2W6mu8FIG_h4BrAlg9vVlpO9N8rU{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<unity_h6>Instanced Drawing 설정</unity_h6>*

- URP 에셋 인스펙터 창으로 돌아가 GPU Resident Drawer 설정에서 Instanced Drawing으로 변경합니다.

<br>

#### <unity_h4> e) GPU Resident Drawer가 적용되었는지 확인 </unity_h4>

![프레임 디버거 확인]({{ site.google_drive }}1qh_muHJ7SoViOB1R8p0gGvudin4JniUS{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<unity_h6>프레임 디버거 확인</unity_h6>*

- Window > Analysis > Frame Debugger를 클릭합니다.

![Hybrid Batch Group 확인]({{ site.google_drive }}1pYLtGaWYgmdTi9ID5bQ_YF3459US_w2i{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<unity_h6>Hybrid Batch Group 확인</unity_h6>*

- 프레임 디버거에서 장면을 찍어보면 SRP Batch가 Hybrid Batch Group으로 바뀐 것을 볼 수 있습니다.


<br>

### <unity_h3> 2) GPU Resident Drawer 최적화 하기 </unity_h3>

프레임을 가장 많이 저하시키는 원인은 조명입니다. 많은 조명을 배치하면 그래픽카드에서 CPU와 GPU 간의 계산이 많아져 프레임이 저하됩니다. 따라서 최적화하기 위해 Fixed Lightmap Size를 사용하여 동적으로 조절함으로써 높은 해상도가 필요할 때만 사용하고, 작은 크기를 사용해 품질을 유지하면서 메모리를 최적화할 수 있습니다. Mipmap은 텍스처의 여러 해상도 버전을 저장하여 거리와 각도에 따라 적절한 해상도의 텍스처를 사용할 수 있게 해줍니다. 이를 비활성화함으로써 GPU가 여러 해상도의 텍스처를 관리하지 않아도 되어 성능이 향상됩니다. 이들의 사용은 GPU 메모리의 대역폭을 줄이고 제한된 환경에서 유용하게 사용할 수 있습니다.

#### <unity_h4> a) Static Batching 비활성화</unity_h4>

![프로젝트 설정]({{ site.google_drive }}1P5d50KC_GPxskPCrS8HhFwG_pmCExxRw{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<unity_h6>프로젝트 설정</unity_h6>*

- Edit > Project Setting을 클릭합니다.

![Static Batching 비활성화]({{ site.google_drive }}15PE4N72Fh3lmZ_KSj784RsowIg1ofheT{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<unity_h6>Static Batching 비활성화</unity_h6>*

- Player 탭에 가서 Static Batching을 비활성화합니다.

#### <unity_h4> b) Fixed Lightmap Size 설정 및 Use Mipmap 비활성화 </unity_h4>

![Lighting 설정]({{ site.google_drive }}1sEQQio3CxCxWtDmL3fd0vFAjx-Y7DkBg{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<unity_h6>Lighting 설정</unity_h6>*

- Window > Rendering > Lighting을 클릭합니다.

![Fixed Lightmap Size 설정 및 Use Mipmap 비활성화]({{ site.google_drive }}1GpCnzfWUk2I7fJISOrXEEb5FHtQZI1qI{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<unity_h6>Fixed Lightmap Size 설정 및 Use Mipmap 비활성화</unity_h6>*

- Scene에서 Fixed Lightmap Size를 체크 해제하고 Use Mipmap을 비활성화합니다.


<br>

### <unity_h3> 3) GPU Resident Drawer 관련해서 알아두면 좋은 것</unity_h3>

#### <unity_h4> a) Mesh Renderer가 있는 Game Object에서 개별적으로 GPU Resident Drawer 비활성화</unity_h4>

![Disallow GPU Driven Rendering 스크립트 부착]({{ site.google_drive }}1QseMN-QjO5VmoSaxRW__v3ofcbuRHRmy{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<unity_h6>Disallow GPU Driven Rendering 스크립트 부착</unity_h6>*

- GPU Resident Drawer를 비활성화하려는 오브젝트에서 Add Component를 클릭하고 'Disallow GPU Driven Rendering' 스크립트를 부착합니다.

![자식 오브젝트도 모두 적용하기]({{ site.google_drive }}1O4iKXJjV3WNByXGo471N38uhehYxdcRO{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<unity_h6>자식오브젝트도 모두 적용하기</unity_h6>*

- 게임 오브젝트의 하위 자식들에게 모두 적용하려면 'Apply to Children Recursively' 옵션을 선택합니다. ~~~~(이거 재귀용법이더라)~~


<br>
<br>

## <unity_h2> 3. 끝으로 </unity_h2>

유니티의 GPU Resident Drawer는 컴퓨트 셰이더를 통해서 계산되기 때문에, 컴퓨트 셰이더를 사용할 수 없는 컴퓨터에서는 사용할 수 없습니다. GPU 인스턴싱을 사용하면 한 장면에 중복되는 오브젝트가 많을수록 계산 면에서 더 많은 이득을 볼 수 있습니다. 따라서 그래픽적으로 복잡한 프로젝트에서 성능을 크게 향상시킬 수 있다고 생각합니다. ~~( 분석하는건 재미있는데 지금 가이드 쓰는거에 현타가와서 GDC unity 분석대신 다른 것좀 하겠습니다.)~~