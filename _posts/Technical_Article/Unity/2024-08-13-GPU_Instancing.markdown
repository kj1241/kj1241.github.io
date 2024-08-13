---
layout: post
title: "GPU 인스턴싱 개념부터 Unity 구현까지"
date: 2024-08-13 10:06:01 +09:00
image: https://drive.google.com/thumbnail?id=16sUQB_zQNmCvJXRI8yu083v2q0HRMgM-
toc: true
categories: [Unity]
keywords: GPU Instancing, Unity, 3D Graphics Optimization, Material Property Block, RenderMeshInstanced, Graphics Rendering
addsence: true
lastmod: 2024-08-13 10:06:01 +09:00
sitemap:
  changefreq : daily
  priority : 1.0
excerpt: GPU 인스턴싱은 동일한 객체를 여러 번 렌더링할 때 성능을 최적화하는 3D 그래픽 기술입니다. 이 글에서는 GPU 인스턴싱의 기본 개념, 장단점, 그리고 Unity에서의 실제 적용 방법을 설명합니다. 또한 유니티에서 GPU 인스턴싱을 구현하는 코드 예제를 제공합니다.
related_links:
  - url: /graphics_development/UnityGDC24_GPUResidentDrawer.html
---

## <unity_h2>1. GPU Instancing 이란 </unity_h2>

GPU 인스턴싱(GPU Instancing)은 3D 그래픽스에서 동일한 객체(예: 나무, 돌, 캐릭터 등)를 여러 번 화면에 렌더링할 때, 성능을 최적화하기 위해 사용하는 기술입니다. 이 방법은 특히 게임 개발이나 시뮬레이션에서 자주 사용되며, GPU 자원을 효율적으로 활용하여 동일한 객체를 대량으로 빠르게 렌더링할 수 있게 합니다.

<br>

### <unity_h3>1) GPU 인스턴싱의 기본 개념 </unity_h3>

기본적으로 3D 엔진에서 다수의 오브젝트를 렌더링할 때, 각 오브젝트는 독립적으로 처리됩니다. 그러나 동일한 메쉬를 여러 번 렌더링하는 경우, 각 오브젝트가 별도의 드로우 콜(Draw Call)을 필요로 하게 되며, 이는 성능에 큰 영향을 미칠 수 있습니다. 드로우 콜이 많아지면 CPU에서 GPU로 명령을 전달하는 오버헤드가 커지기 때문입니다.

GPU 인스턴싱은 이 문제를 해결하기 위한 방법으로, 동일한 메쉬를 여러 번 렌더링할 때, 각 오브젝트의 데이터를 개별적으로 보내는 대신, 한 번의 드로우 콜로 여러 개의 오브젝트를 렌더링할 수 있게 합니다. 이때 각 인스턴스는 위치, 회전, 크기 등 다양한 속성에서 차이를 가질 수 있습니다.

<br>
<br>

## <unity_h2>2. GPU Instancing 장단점 </unity_h2>

#### <unity_h4>GPU Instancing 장점 </unity_h4>

- 성능 향상: 많은 객체를 한 번에 렌더링할 수 있어 프레임률이 높아집니다.
- 메모리 절약: 동일한 모델 데이터를 공유하기 때문에 GPU 메모리를 절약할 수 있습니다.
- 확장성: 복잡한 장면에서 수천 개의 객체를 효율적으로 렌더링할 수 있습니다.

#### <unity_h4>GPU Instancing 단점 </unity_h4>

- 복잡성: 구현이 복잡할 수 있으며, 모든 그래픽스 엔진이나 API가 GPU 인스턴싱을 동일하게 지원하지 않을 수 있습니다.
- 동일한 메쉬와 머티리얼만 가능: 인스턴싱은 동일한 메쉬와 머티리얼을 가진 객체에만 적용되므로, 다양한 형태의 객체를 렌더링할 때는 적합하지 않을 수 있습니다
- GPU 메모리 제한: 인스턴싱 데이터가 많아질수록 GPU 메모리를 많이 차지할 수 있으며, 메모리 제한을 초과할 수 있습니다.

<br>
<br>

## <unity_h2>3. GPU Instancing 사용 사례 </unity_h2>

- 자연 환경 렌더링: 나무, 풀, 바위 등 자연물을 대량으로 배치할 경우
- 군집 시뮬레이션: 병사, 차량, 동물 등 대규모 군집을 표현할 경우
- 파티클 시스템: 많은 양의 파티클을 효율적으로 렌더링할 경우

<br>
<br>

## <unity_h2>4. 유니티 GPU Instancing 적용 코드 </unity_h2>

GPU Instancing이 무엇인지 보다 설명해 주기 위해서 유니티 도큐먼트를 보고 코드를 작성하였습니다.

<br>

### <unity_h3>1) 랜더러가 적용된 게임 오브젝트가 존재할때 GPU 인스턴싱 작성 </unity_h3>

![게임 오브젝트 GPU Instancing 스크립트 적용 전]({{ site.google_drive }}1h9eVKCHiy4QoLe1LmdscCp3v9sj8X8dL{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<unity_h6>게임 오브젝트 GPU Instancing 스크립트 적용 전 </unity_h6>*

그림 처럼 보시면 큐브를 7*7 = 49개를 구를 7*2 = 14개를 생성하였습니다.  그러면 49+14 = 63의 드로우 콜이 발생하게 됩니다.

#### <unity_h4> InstancingExample.cs </unity_h4>

```c#

using UnityEngine;

public class InstancingExample : MonoBehaviour
{
    private MeshRenderer meshRender;
    private MaterialPropertyBlock mpb;

    // Start is called once before the first execution of Update after the MonoBehaviour is created
    void Start()
    {
        meshRender = GetComponent<MeshRenderer>();
        mpb = new MaterialPropertyBlock();
        meshRender.SetPropertyBlock(mpb);
    }

    // Update is called once per frame
    void Update()
    {
       
    }
}

```

![게임 오브젝트 GPU Instancing 스크립트 적용 후]({{ site.google_drive }}16sUQB_zQNmCvJXRI8yu083v2q0HRMgM-{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<unity_h6>게임 오브젝트 GPU Instancing 스크립트 적용 전 </unity_h6>*

랜더러가 부착된 오브젝트에 해당 코드를 적용하면 됩니다. Material에서 GPU Instancing을 적용하신 후에 SetPropertyBlock을 사용하면 2~3 인스턴스 프레임으로 줄일 수 있습니다.

#### <unity_h4> Material에서 GPU Instancing 적용 안할 시 생기는 에러 </unity_h4>

![Material에서 GPU Instancing 적용 X]({{ site.google_drive }}1tSNPrS7RMDvPOBEbwHlXeEIbIrSS9Igm{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<unity_h6>Material에서 GPU Instancing 적용 X </unity_h6>*

구에만 Material에서GPU Instancing 적용하지 않았습니다. 그렇게 되면 프레임 디버거에서 드로우 콜 하나씩 보이게 됩니다. <red1_error>주의사항: </red1_error>  'meshRender.SetPropertyBlock(mpb);' 이 코드는 update에서 사용하지 마세요 유니티 엔진 터집니다.

<br>

### <unity_h3>2) mesh와 Material으로 랜더링부터 구현 할 경우 </unity_h3>

#### <unity_h4> InstanceRenderingExample.cs </unity_h4>

```c#

using UnityEngine;
using System.Collections.Generic;

public class InstanceRenderingExample : MonoBehaviour
{
    public Mesh cubeMesh;
    public Material cubeMaterial;

    RenderParams cubeRP;

    private List<Matrix4x4> cubeMatrices;

    void Start()
    {
        // 큐브와 구의 위치 및 회전을 담을 행렬 리스트 초기화
        cubeMatrices = new List<Matrix4x4>();


        // 큐브 10개에 대한 행렬 초기화
        for (int i = 0; i < 7; ++i)
        {
            for (int j = 0; j < 7; ++j)
            {
                Vector3 position = new Vector3(-4.5f + (1.5f * i), -4.5f + (1.5f * j), 0);
                Quaternion rotation = Quaternion.identity;
                Vector3 scale = Vector3.one;

                Matrix4x4 matrix = Matrix4x4.TRS(position, rotation, scale);
                cubeMatrices.Add(matrix);
            }
        }
        cubeRP = new RenderParams(cubeMaterial);
    }

    void Update()
    {
                // 큐브 10개 인스턴싱 렌더링
        Graphics.RenderMeshInstanced(cubeRP, cubeMesh, 0, cubeMatrices);
    }
}


```

![GPU 인스턴싱 렌더링]({{ site.google_drive }}1CwGOPvnoADFomF5uVFZ9kAxkHFCGhUso{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<unity_h6>GPU 인스턴싱 렌더링 </unity_h6>*

빈 오브젝트에 해당 코드를 적용하면 됩니다. 큐브 7*7개가 1프레임으로 적용되는 것을 확인 할수 있습니다.

<br>
<br>

## <ai_h2>4. 끝으로 </ai_h2>

GPU 인스턴싱은 그래픽스 성능 최적화에 매우 유용한 기술로, 특히 대규모 환경을 렌더링하거나 많은 객체를 화면에 동시에 표시해야 하는 상황에서 큰 차이를 만들어낼 수 있습니다.

