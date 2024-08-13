---
layout: post
title: "GDC24 Unity 2 - GPU Occlusion Culling"
date: 2024-08-06 09:00:00 +09:00
image: https://drive.google.com/thumbnail?id=1j7NSf7cxX7wuYrU0hiKM3I0zQLH2C6Ak
toc: true
categories: [Graphics_Development]
keywords: GPU Occlusion Culling, Hierarchical Z-Buffering, 컴퓨트 셰이더, 렌더링 최적화
addsence: true
lastmod: 2024-08-13 21:00:00 +09:00
sitemap:
  changefreq : daily
  priority : 1.0
excerpt: Unity6에서 GPU Occlusion Culling을 적용하여 숨겨진 객체에 대해서 불필요한 드로우 콜을 방지하고 렌더링 성능을 최적화하는 기능입니다. Occlusion Culling의 다양한 종류와 사용법과 프레임 디버거와 랜더링 디버거를 사용해서 GPU Occlusion Culling을 확인합니다.
related_links:
  - url: /computer_vision/ImageComposition.html
---


## <unity_h2> 1. GPU Occlusion Culling 적용하기 앞서 </unity_h2>

이전에 GPU Resident Drawer에 대해 설명드렸습니다. 이번에는 [GDC 2024 Unity6](https://www.youtube.com/watch?v=o9AGkB9nnkc)에서 소개된 Boosted Rendering Performance 섹션에서 언급된 GPU Occlusion Culling에 대해 알아보겠습니다. 이 부분은 GPU Resident Drawer가 적용되어 있어야 사용이 가능하니, 만약 아직 GPU Resident Drawer에 대해 익숙하지 않으시다면 앞서 설명한 글을 참고해주시기 바랍니다.

<br>

### <unity_h3> 1) Occlusion Culling 이란?  </unity_h3>

<p><unity_h5>Occlusion Culling</unity_h5>은 3D 렌더링 성능을 최적화하기 위해 사용되는 기술로, 플레이어의 시점에서 가려져 보이지 않는 물체들을 렌더링하지 않음으로써 GPU의 불필요한 연산을 줄이고 프레임 레이트를 향상시킵니다. 예를 들어, 벽 뒤에 숨겨진 물체는 플레이어가 볼 수 없기 때문에, 렌더링하지 않도록 하여 게임이나 그래픽 애플리케이션의 성능을 높이는 데 기여합니다.</p>


<br>

### <unity_h3> 2) Occlusion Culling 종류  </unity_h3>

1. Z-Buffering (Z-Culling)
    - 설명: Z-Buffering은 깊이 정보를 사용하여 화면에 가까운 물체만 렌더링하고, 뒤에 있는 물체는 렌더링하지 않는 기법입니다.
    - 작동 방식: 각 픽셀에 대해 깊이 값을 저장하고, 새로운 픽셀을 그릴 때 기존 깊이 값과 비교하여 더 가까운 픽셀만 화면에 표시합니다.
    - 특징: 그래픽 하드웨어에서 널리 사용되며, 비교적 구현이 쉽지만 모든 객체를 렌더링해야 하므로 오버헤드가 발생할 수 있습니다.

2. Portal Culling
    - 설명: 이 기법은 주로 실내 환경에서 사용되며, 플레이어가 볼 수 있는 특정 섹션만 렌더링합니다.
    - 작동 방식: 방과 방 사이에 '포털'이라는 연결점을 정의하고, 포털을 통해 보이는 객체만 렌더링합니다.
    - 특징: 큰 실내 환경에서 매우 효율적이며, 특정 영역의 렌더링을 효과적으로 제한할 수 있습니다.

3. Hierarchical Z-Buffering
    - 설명: Z-Buffering을 계층적으로 확장한 기법으로, 씬을 여러 레벨로 나누어 깊이 정보를 관리합니다.
    - 작동 방식: 깊이 맵을 여러 해상도로 다운샘플링하여 각 레벨에서 깊이 값을 비교하고, 불필요한 객체를 배제합니다.
    - 특징: 넓은 범위의 객체에 대해 효율적으로 Occlusion Culling을 수행할 수 있으며, GPU에서 최적화된 처리로 성능을 향상시킬 수 있습니다.

4. Software Occlusion Culling
    - 설명: CPU에서 Occlusion을 계산하는 방식으로, GPU가 실제 렌더링에 집중할 수 있도록 도와줍니다.
    - 작동 방식: CPU가 Occlusion 여부를 미리 계산하여 GPU로 전달하고, GPU는 전달된 정보에 따라 렌더링할 객체를 결정합니다.
    - 특징: GPU의 부하를 줄이고, 복잡한 장면에서도 효율적인 렌더링이 가능합니다. 그러나 CPU의 성능에 크게 의존합니다.

<br>
<br>

## <unity_h2> 2. Unity6에서 GPU Occlusion Culling 적용하기 </unity_h2>

GPU Occlusion Culling을 적용하려면 GPU Resident Drawer가 활성화되어 있어야 합니다. 따라서 아직 GPU Resident Drawer를 적용하지 않았다면, 먼저 이전 글을 참고해 주세요.

<br>

### <unity_h3> 1) GPU Occlusion Culling 설정하기 </unity_h3>

![GPU Occlusion Culling 설정]({{ site.google_drive }}1arvTm0mebPYdO1YVn4VPG9kEiD4agh0U{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<unity_h6>GPU Occlusion Culling 설정 </unity_h6>*

GPU Occlusion Culling을 설정하는 방법은 간단합니다. URP Asset에서 GPU Resident Drawer를 활성화하면 GPU Occlusion Culling을 체크할 수 있는 옵션이 나타납니다. 이 옵션을 체크해주면 됩니다.

<br>

### <unity_h3> 2) GPU Occlusion Culling Debugger 보는 방법</unity_h3>

Unity에서는 GPU Occlusion Culling의 작동 상태를 시각적으로 확인할 수 있는 도구를 제공합니다. 이 도구는 렌더링 성능을 최적화하는 데 유용합니다. Rendering Debugger를 통해 어떤 오브젝트가 Occlusion되어 보이지 않는지 확인할 수 있습니다.

![Rengering Debugger 실행 방법]({{ site.google_drive }}1berddR-OLz24zzFl6lhLzp6A-sKyIFP9{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<unity_h6>Rengering Debugger 실행 방법 </unity_h6>*

widnow > Analysis > Rengering Debugger를 실행합니다.

![Occlusion Debugger 실행 방법]({{ site.google_drive }}1j7NSf7cxX7wuYrU0hiKM3I0zQLH2C6Ak{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<unity_h6>Rengering Debugger Occlusion 확인 </unity_h6>*

Occlusion Test Overlay와 Occlusion Context State와 같은 기능들을 사용하면, 특정 오브젝트가 오클루전되어 보이지 않게 되는 상황을 시각적으로 확인하고, 그 상태를 파악할 수 있습니다.

<br>
<br>

## <unity_h2> 3. GPU Occlusion Culling 개인적인 생각 </unity_h2>

이제까지는 최대한 객관적인 정보를 제공하려고 노력했지만, 이번에는 제 개인적인 의견을 말씀드리겠습니다. <red1_error>주의사항: </red1_error> 현재 테스트한 버전은 Unity 60000.0.11f Preview이며, 이후 업데이트에 따라 내용이 달라질 수 있습니다.

GPU Resident Drawer를 처음 접했을 때와 비교하면, GPU Occlusion Culling은 다소 애매한 부분이 있습니다. 따라서 이 기능을 테스트하고 분석하기 위해 별도의 프로젝트를 만들어 진행해보았습니다.

<br>

### <unity_h3> 1) 프로젝트 구성 </unity_h3>

![GPU Occlusion Culling test 구성]({{ site.google_drive }}1h3E8ut-nP3Jrrw6RiFuM1ujV5Kwbpvvc{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<unity_h6>GPU Occlusion Culling test 구성 </unity_h6>*

GPU Occlusion Culling을 테스트하기 위해 Quad 1개, Sphere 49개, Cube 7개를 생성하여 장면을 구성했습니다. 

![test 프로젝트의 프레임 디버거]({{ site.google_drive }}1WBivES_J3byaVF_9S3OyoKrrBou4yUO4{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<unity_h6>test 프로젝트의 프레임 디버거 </unity_h6>*

프레임 디버거를 통해 확인해보면 오브젝트들이 하나의 Hybrid Batch Group에 담기게 됩니다.

![Hybrid Batch Group 분할]({{ site.google_drive }}1aJwy63SiZe7xn9lLROhKU7IKnXsX8D8Q{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<unity_h6>Hybrid Batch Group 분할 </unity_h6>*

원하는 그룹으로 Hybrid Batch Group을 나누기 위해 몇 가지 방법을 시도해봤는데, API를 통한 직접적인 방법이 없어 셰이더를 살짝 변형하여 각 그룹을 따로 구성했습니다.

<br>

### <unity_h3> 2)  GPU Occlusion Culling 분석 </unity_h3>

#### <unity_h4> GPU Occlusion Culling 비교 </unity_h4>

![GPU Occlusion Culling 사용 전]({{ site.google_drive }}1UYvnJIh1d8x43P8zDna5ZWyL4enhiSvl{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<unity_h6>Hybrid Batch Group 분할된 GPU Occlusion Culling 사용 전 프레임 디버거</unity_h6>*

이제 GPU Occlusion Culling 사용 전과 사용 후의 상황을 비교할 예정입니다. 먼저 GPU Occlusion Culling 사용 전의 장면을 캡처해보겠습니다. Hybrid Batch Group에서 각각 Quad는 Draw Calls 1, Cube는 Draw Instanced Calls 1, Sphere는 Draw Instanced Calls 1입니다.

![GPU Occlusion Culling 사용 후]({{ site.google_drive }}1eeiVQ6B5XHWyuHynQoJFthvS-3ZMQhmH{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<unity_h6>Hybrid Batch Group 분할된 GPU Occlusion Culling 사용 후 프레임 디버거</unity_h6>*

이제 최적화된 Hybrid Batch Group에서 GPU Occlusion Culling을 사용해보면 Quad는 Draw Calls 1, Cube도 Draw Calls 1, Sphere도 Draw Calls 1이 발생하는 것을 확인할 수 있습니다.

사용 전에는 각 오브젝트가 개별 Draw Calls로 처리되지만, 사용 후에는 Occlusion Culling 덕분에 효율적으로 렌더링이 이루어지는 것을 확인할 수 있었습니다.

#### <unity_h4> GPU Occlusion Culling 과정 </unity_h4>

![GPU Occlusion Culling Compute Shader]({{ site.google_drive }}1edMYT6CkRZLD9QFo32_7AHVRlXCdufor{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<unity_h6>프레임 디버거에서 GPU Occlusion Culling Compute Shader 확인</unity_h6>*

프레임 디버거에서 확인해보니, GPU Occlusion Culling은 컴퓨트 셰이더를 사용하고 있음을 알 수 있습니다.

![GPU Occlusion Culling 계층 구조 확인]({{ site.google_drive }}1kVUEi9uxaPzYSzFsel39Ifg8OPK7_qet{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<unity_h6>랜더링 디버거에서 GPU Occlusion Culling 계층 구조 확인</unity_h6>*

Window > Analysis > Rendering Debugger에서 GPU Resident Drawer 탭의 Occlusion Culling 섹션에서 Occluder Debug View를 켜시면 계층 구조를 확인할 수 있습니다.

```cpp

#define MIP_LEVELS 5

#pragma kernel CSMain

Texture2D<float> _InputDepthTexture;

RWTexture2DArray<float> _PyramidTextures;

[numthreads(8, 8, 1)]
void CSMain (uint3 id : SV_DispatchThreadID)
{
    float2 texelSize = 1.0 / float2(_InputDepthTexture.GetDimensions().xy);

    if (mipLevel == 0) 
    {
        _PyramidTextures[id.xy, 0] = _InputDepthTexture[id.xy];
    } 
    else 
    {
        uint2 mipSize = uint2(_PyramidTextures.GetDimensions().xy >> mipLevel);

        float2 uv = (float2(id.xy) + 0.5) * texelSize * float2(mipSize);
        
        float depth0 = _PyramidTextures.SampleLevel(_PyramidTextures, uv, mipLevel - 1, int2(0, 0));
        float depth1 = _PyramidTextures.SampleLevel(_PyramidTextures, uv, mipLevel - 1, int2(1, 0));
        float depth2 = _PyramidTextures.SampleLevel(_PyramidTextures, uv, mipLevel - 1, int2(0, 1));
        float depth3 = _PyramidTextures.SampleLevel(_PyramidTextures, uv, mipLevel - 1, int2(1, 1));

        _PyramidTextures[id.xy, mipLevel] = min(min(depth0, depth1), min(depth2, depth3));
    }
}

```
프레임 디버거에 보이는 Occluder Depth Pyramid Kernels compute shader를 간단하게 구현해 보면 Hierarchical Z-Buffer를 구축할 수 있습니다.

- MIP_LEVELS: 피라미드의 MIP 레벨 수를 정의합니다. 이 레벨은 다양한 해상도에서의 깊이 맵을 생성하는 데 사용됩니다.
- CSMain: Compute Shader의 메인 함수입니다. 각 MIP 레벨에 대해 작업을 수행하며, 첫 번째 레벨은 입력 깊이 텍스처의 복사본으로 시작하고, 이후 레벨에서는 이전 레벨의 텍스처에서 최소 깊이 값을 샘플링하여 피라미드를 구축합니다.

위와 같이 Hierarchical Z-Buffer를 구축하기 위한 간단한 컴퓨트 셰이더 코드를 통해 Unity의 GPU Occlusion Culling이 Hierarchical Z-Buffering 기법을 사용하고 있음을 알 수 있습니다.

#### <unity_h4> GPU Occlusion Culling 프레임 체크 </unity_h4>
 
마지막으로, GPU Occlusion Culling을 사용했을 때와 사용하지 않았을 때의 프레임을 비교해보았습니다. 아래의 영상을 통해 그 차이를 확인할 수 있습니다.

<iframe width="100%" style="aspect-ratio:16/9" src="https://drive.google.com/file/d/1nIMfTfrDwwMP4tXylvK01JWCZXyc2b9a/preview" title="GPU Occlusion Culling off" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>


<iframe width="100%" style="aspect-ratio:16/9" src="https://drive.google.com/file/d/1o6pRik5-oCfm9qVmwzpUyPJbOHwA_v08/preview" title="GPU Occlusion Culling on" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

현재로서는 DirectX 12에서 GPU Occlusion Culling을 사용하는 것이 큰 이점을 제공하는지 확신하기 어렵습니다.

<br>
<br>

## <unity_h2> 4. 끝으로 </unity_h2>

GPU Occlusion Culling은 GPU Resident Drawer와 함께 사용할 때 효율적으로 렌더링 성능을 향상시킬 수 있는 강력한 도구입니다. 다만, 설정과 구현에 있어서 몇 가지 주의사항이 필요하며, 실제 프로젝트에서의 효과를 정확히 분석하는 것이 중요합니다. 현재 프리뷰 버전이기 때문에 추후 변화를 지켜보는게 좋을 것 같습니다.
