---
layout: post
title: "이미지 합성곱 필터링 3 - GPU 최적화 유니티 Compute Shader 및 응용"
date: 2024-04-13 09:00:00 +09:00
image: https://drive.google.com/thumbnail?id=18b5Oib3n9kwL4lCRa9xLbpjLYNPrONhx
toc: true
categories: [Graphics_Development]
keywords: Computer_Vision, Graphics, 이미지 합성곱 필터링, Unity, Compute Shader, GPU 최적화, 컴퓨트 쉐이더 코드 예제
addsence: true
lastmod: 2024-04-15 09:00:00 +09:00
sitemap: 
  changefreq : daily
  priority : 1.0
excerpt:  이미지 합성 곱 필터링을 구현하는 데에 컴퓨트 쉐이더를 사용하는 것은 흥미로운 선택입니다. 이 글은 유니티를 사용하여 이미지 합성 곱 필터링을 컴퓨트 쉐이더를 사용하여 텍스쳐에 적용하고, 카메라 화면에 컴퓨트 쉐이더를 사용하여 유니티 합성 곱 필터링을 코드 위주로 작성하고 있습니다.
related_links:
    - url: /computer_vision/ImageComposition.html
    - url: /computer_vision/UnityImageComputeShader.html
    - url: /graphics_development/ImageComposition1.html
    - url: /graphics_development/ImageComposition2.html
---

앞서 CPU 레지스터에 병렬처리를 사용해서 최적화를 했다면 이번에는 GPU를 사용하여 최적화를 구현해봅시다. 따라서 GPGPU를 사용하여 최적화하려고 합니다. 당시 GPU를 사용하는 최적화 방법에 대해서 고민을 해봤습니다. DirectX 12 Wave Matrix, CUDA, Compute shader 중에서 고민했으나 유니티의 Compute Shader를 사용하여 작성하기로 하였습니다. 유니티는 무언가 빠르게 만드는데 편리하다는 장점이 있습니다.

<br>
<br>

## <com_h2> 1. GPGPU를 사용해서 이미지 합성곱 필터링 최적화 </com_h2>

컴퓨트 쉐이더 아티클을 작성하기까지 오래 걸리고 공개하지 않으려고 했던 이유는 부끄럽기 때문입니다. 머릿속으로 구조를 생각하고 완성했지만, 엔진을 커스터마이징 하는 것처럼 최선의 선택은아니라고 생각합니다. 또한, 코드가 최적화되어있느냐고 물어보면, 없는 개념을 강제로 구현한것이기 때문에 비슷한 레퍼런스를 본 적 없어서 확신하지 못하기 때문입니다. 생각보다 더 엉망일 수도 있으니 이점 유의하고 봐주세요.

<br>

### <com_h3> 1) 컴퓨트 쉐이더를 이용하여 이미지 합성곱 필터링하여 머테리얼로 사용하기  </com_h3>

이와 같은 방식을 사용한 것은 여러분에게 결과물을 보여주기 위해서 입니다. 그럼 구조를 한번 보시고 가시죠

![머테리얼 코드 구조]({{ site.google_drive }}18b5Oib3n9kwL4lCRa9xLbpjLYNPrONhx{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<com_h6>컴퓨트 쉐이더 머테리얼 코드 구조 </com_h6>*

기존의 JPG 파일을 텍스처로 사용하고, 오브젝트에 쉐이더를 적용하여 텍스처 매핑을 구현하는 방식을 확장시켜 구현하였습니다. 컴퓨트 쉐이더를 통해 이미지 합성 곱 필터링을 사용하여 변형시키고, 이후 오브젝트에 쉐이더를 적용하여 텍스처 매핑을 구현한 방식을 활용하였습니다. 그럼 구현 코드를 함께 보시죠

#### **<com_h4>C#:</com_h4>**

```c#

public class TextureFilterExample : MonoBehaviour
{
    public ComputeShader filterComputeShader;
    public Texture2D inputTexture;
    public Material outputMaterial;

    void Start()
    {
        ApplyFilter();
    }

    void ApplyFilter()
    {
        int width = inputTexture.width;
        int height = inputTexture.height;

        // 결과에 대한 RenderTexture 생성
        RenderTexture resultTexture = new RenderTexture(width, height, 0);
        resultTexture.enableRandomWrite = true;
        resultTexture.Create();

        // 컴퓨팅 셰이더 매개변수 설정
        filterComputeShader.SetTexture(0, "InputTexture", inputTexture);
        filterComputeShader.SetTexture(0, "ResultTexture", resultTexture);

        // 컴퓨팅 셰이더 디스패치
        int threadGroupsX = Mathf.CeilToInt(width / 8.0f);
        int threadGroupsY = Mathf.CeilToInt(height / 8.0f);
        filterComputeShader.Dispatch(0, threadGroupsX, threadGroupsY, 1);

        // 결과를 머티리얼이나 다른 GameObject에 적용
        outputMaterial.mainTexture = resultTexture;
    }
}

```

1. 해당 코드를 살펴보면 전역변수로 Compute Shader랑 이미지 합성 곱 필터링에 사용할 jpg 파일 Texture 2D와 결과적으로 쉐이더를 통해서 반환해줄 Material을 입력받습니다.
2. 컴퓨트 쉐이더에 필요한 텍스처를 설정합니다. ＂Input Texture＂에는 입력 텍스처를, ＂Result Texture＂에는 결과 텍스처를 메모리에 올려놓습니다.
3. 컴퓨트 쉐이더를 실행하여 디스패치합니다. 이때, 스레드 그룹의 개수는 입력 텍스처의 너비와 높이에 따라 결정됩니다. 여기서는 너비와 높이를 각각 8로 나누어 스레드 그룹의 개수를 계산합니다. 8로 나누는 이유는 컴퓨트 쉐이더의 스레드 그룹의 크기를 결정하기 위해서입니다. 보통 8의 배수를 사용하는 것이 일반적으로 효율적이며, 이는 GPU 아키텍처의 특성에 기인합니다.
4. 생성된 결과 텍스처를 출력 마테리얼의 주 텍스처로 설정합니다.

<br>

위와 같이 구조를 작성했다면 이제 컴퓨트 쉐이더를 작성해보도록 합시다. 다양한 예제를 통해서 이미지 합성 곱 필터링의 화면을 보여 드리도록 하겠습니다.

#### **<com_h4>Compute Shader:Sharpness Filter</com_h4>**

```c#

#pragma kernel CSMain

Texture2D<float4> InputTexture;
RWTexture2D<float4> ResultTexture;

[numthreads(8, 8, 1)]
void CSMain(uint3 id : SV_DispatchThreadID) {
    int2 texCoord = int2(id.xy);

    float4 centerPixel = InputTexture[texCoord + int2(0, 0)];

    float4 topPixel = InputTexture[texCoord + int2(0, -1)];
    float4 bottomPixel = InputTexture[texCoord + int2(0, 1)];
    float4 leftPixel = InputTexture[texCoord + int2(-1, 0)];
    float4 rightPixel = InputTexture[texCoord + int2(1, 0)];

    float4 result = 5.0 * centerPixel - (topPixel + bottomPixel + leftPixel + rightPixel);

    ResultTexture[texCoord] = result;
}

```

![Sharpness Filter]({{ site.google_drive }}1swF18-byhR89iLkbYohYCDCpXgXLIkTS{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<com_h6> Sharpness Filter compute shader </com_h6>*

$$ Filter =
\Bigl(
\begin{array}{ccc}
0 & -1 & 0 \\
-1 & 5 & -1 \\
0 & -1 & 0 \\
\end{array}
\Bigr)
$$

위의 수식은 가중치 값(필터)를 가진 Sharpness 필터입니다. 중심 픽셀에서 이웃 픽셀의 값을 빼고 결과를 증폭함으로써 보다 이미지를 선명하고 날카로게 만들어줍니다.
조금 코드 적으로 어려운 부분을 설명해보겠습니다. [numthreads(8, 8, 1)]은 커널이 실행될 때, 셰이더에 디스패치할 스레드 그룹의 수를 설정합니다. 여기서는 저는 8*8 스레드 그룹으로 만들었습니다. 여기에서 <com_h5>커널</com_h5>은 이미지 합성 필터링의 가중치 값으로 쓰이는 커널이 아니고 컴퓨트 쉐이더 GPU의 실행단위입니다. 

#### **<com_h4>Compute Shader:GrayScale Filter</com_h4>**

```c#

#pragma kernel CSMain

Texture2D<float4> InputTexture;
RWTexture2D<float4> ResultTexture;

[numthreads(8, 8, 1)]
void CSMain(uint3 id : SV_DispatchThreadID) {
    float4 color = InputTexture[id.xy];

    float gray = dot(color.rgb, float3(0.299, 0.587, 0.114));
    ResultTexture[id.xy] = float4(gray, gray, gray, color.a);
}

```

![GrayScale Filter]({{ site.google_drive }}1mFLEVY4mXdfUaCywmKp8U5h--5RYY-hb{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<com_h6> GrayScale Filter compute shader </com_h6>*

$$ Filter =
\Bigl(
\begin{array}{ccc}
R*0.299 + G*0.587 + B*0.114 \\
\end{array}
\Bigr)
$$

위의 수식은 픽셀의 색을 조절하는 GrayScale 필터입니다. RGB 픽셀에 (0.299,0.587,0.114)를 곱하고 더해주어서 이미지를 회색 톤으로 바꿔줍니다. 모든 이미지 합성 곱 필터링의 기초입니다.

#### **<com_h4>Compute Shader:Edge Detection(Sobel Edge Detection) Filter</com_h4>**

```c#

#pragma kernel CSMain

Texture2D<float4> InputTexture;
RWTexture2D<float4> ResultTexture;

[numthreads(8, 8, 1)]
void CSMain(uint3 id : SV_DispatchThreadID) {
    int2 texCoord = int2(id.xy);

    float4 topLeft = InputTexture[texCoord + int2(-1, -1)];
    float4 topCenter = InputTexture[texCoord + int2(0, -1)];
    float4 topRight = InputTexture[texCoord + int2(1, -1)];

    float4 centerLeft = InputTexture[texCoord + int2(-1, 0)];
    float4 centerRight = InputTexture[texCoord + int2(1, 0)];

    float4 bottomLeft = InputTexture[texCoord + int2(-1, 1)];
    float4 bottomCenter = InputTexture[texCoord + int2(0, 1)];
    float4 bottomRight = InputTexture[texCoord + int2(1, 1)];

    float4 gx = -topLeft - 2 * centerLeft - bottomLeft + topRight + 2 * centerRight + bottomRight;
    float4 gy = -topLeft - 2 * topCenter - topRight + bottomLeft + 2 * bottomCenter + bottomRight;

    float4 result = sqrt(gx * gx + gy * gy);

    ResultTexture[texCoord] = result;
}

```

![Edge Detection(Sobel Edge Detection)]({{ site.google_drive }}1JYlL5i8BkWqpFS6IMF0K1VsX9qWLx9Kq{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<com_h6> Edge Detection(Sobel Edge Detection) Filter compute shader </com_h6>*

$$ width Filter =
\Bigl(
\begin{array}{ccc}
-1 & 0 & +1 \\
-2 & 0 & +2 \\
-1 & 0 & +1 \\
\end{array}
\Bigr)
 , 
height Filter =
\Bigl(
\begin{array}{ccc}
-1 & -2 & -1 \\
0 & 0 & 0 \\
+1 & +2 & +1 \\
\end{array}
\Bigr)
$$

위의 수식은 윤곽선을 검출하는 Sobel 필터입니다. 수학적으로 유도하려면 한참 걸림으로 결과만 적겠습니다. 윤곽선만 검출하려면 그레이스케일도 함께 걸어야 하지만, 저는 카툰렌더링의 느낌이 더 좋아서 그레이스케일은 걸지 않았습니다. 소벨은 (1,2,1)의 가중치를 줌으로, 픽셀 주변 중심의 엣지를 더 잘 검출 합니다. 미세한 엣지를 더 잘 검출할 수 있다는 장점이 있습니다.

#### **<com_h4>Compute Shader:Edge Detection(Prewitt) Filter</com_h4>**

```c#

#pragma kernel CSMain

Texture2D<float4> InputTexture;
RWTexture2D<float4> ResultTexture;

[numthreads(8, 8, 1)]
void CSMain(uint3 id : SV_DispatchThreadID) {
    int2 texCoord = int2(id.xy);

    float4 topLeft = InputTexture[texCoord + int2(-1, -1)];
    float4 topCenter = InputTexture[texCoord + int2(0, -1)];
    float4 topRight = InputTexture[texCoord + int2(1, -1)];

    float4 bottomLeft = InputTexture[texCoord + int2(-1, 1)];
    float4 bottomCenter = InputTexture[texCoord + int2(0, 1)];
    float4 bottomRight = InputTexture[texCoord + int2(1, 1)];

    float4 gx = -topLeft - topCenter - topRight + bottomLeft + bottomCenter + bottomRight;
    float4 gy = -topLeft - bottomLeft + topRight + bottomRight;

    float4 result = sqrt(gx * gx + gy * gy);

    ResultTexture[texCoord] = result;

}

```

![Edge Detection(Prewitt)]({{ site.google_drive }}1Q3doS5eTW2O1poHiUb25h2DgcDnPyvON{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<com_h6> Edge Detection(Prewitt) Filter compute shader </com_h6>*


$$ width Filter =
\Bigl(
\begin{array}{ccc}
-1 & 0 & +1 \\
-1 & 0 & +1 \\
-1 & 0 & +1 \\
\end{array}
\Bigr)
 , 
height Filter =
\Bigl(
\begin{array}{ccc}
-1 & 0 & -1 \\
0 & 0 & 0 \\
+1 & 0 & +1 \\
\end{array}
\Bigr)
$$


위의 수식은 윤곽선을 검출하는 Prewitt 필터입니다.  프리윗은 (1,1,1)의 가중치를 줌으로, 소벨보다 픽셀 주변의 엣지가 동등하게 검출되어서 엣지 결과가 좀 더 부드럽고 노이즈에 민감하지 않습니다. 

#### **<com_h4>Compute Shader:Embossing Filter</com_h4>**

```c#

#pragma kernel CSMain

Texture2D<float4> InputTexture;
RWTexture2D<float4> ResultTexture;

[numthreads(8, 8, 1)]
void CSMain(uint3 id : SV_DispatchThreadID) {
    int2 texCoord = int2(id.xy);

    // Embossing Filter
    float4 topLeft = InputTexture[texCoord + int2(-1, -1)];
    float4 topCenter = InputTexture[texCoord + int2(0, -1)];
    float4 topRight = InputTexture[texCoord + int2(1, -1)];

    float4 centerLeft = InputTexture[texCoord + int2(-1, 0)];
    float4 centerRight = InputTexture[texCoord + int2(1, 0)];

    float4 bottomLeft = InputTexture[texCoord + int2(-1, 1)];
    float4 bottomCenter = InputTexture[texCoord + int2(0, 1)];
    float4 bottomRight = InputTexture[texCoord + int2(1, 1)];

    float4 result = 2.0 * centerRight + topRight + bottomRight - 2.0 * centerLeft - topLeft - bottomLeft;
    //result = result / 8.0 + 0.5;
    ResultTexture[texCoord] = result;
}

```

![Embossing Filter]({{ site.google_drive }}1MQrfYPMeg_IWpWAbl9UMwqYGLiQc4h2G{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<com_h6> Embossing Filter compute shader </com_h6>*


$$ width Filter =
\Bigl(
\begin{array}{ccc}
-1 & 0 & 1 \\
-2 & 0 & 2 \\
-1 & 0 & 1 \\
\end{array}
\Bigr)
$$

위의 수식은 이미지 경계를 강조하는 Embossing 필터입니다. 엠보싱 필터는 실감이 나는 입체효과를 얻기 위해서 사용됩니다. 중심픽셀의 밝기 차이를 계산합니다. 소벨과의 차이점은 소벨은 윤곽선(외곽선) 검출하기 위해서 사용되지만 엠보싱은 이미지 경계를 부각하게 시키는데 사용됩니다. 그리고 엠보싱 필터는 종종 정규화를 위해 결과를 가중치 값으로 조절하는데 저는 사용하지 않았습니다.

#### **<com_h4>Compute Shader:Box Filter (Averaging)</com_h4>**

```c#

#pragma kernel CSMain

Texture2D<float4> InputTexture;
RWTexture2D<float4> ResultTexture;

[numthreads(8, 8, 1)]
void CSMain(uint3 id : SV_DispatchThreadID) {
    int2 texCoord = int2(id.xy);

    // Box (Averaging) Filter
    float4 topLeft = InputTexture[texCoord + int2(-1, -1)];
    float4 topCenter = InputTexture[texCoord + int2(0, -1)];
    float4 topRight = InputTexture[texCoord + int2(1, -1)];

    float4 centerLeft = InputTexture[texCoord + int2(-1, 0)];
    float4 center = InputTexture[texCoord];
    float4 centerRight = InputTexture[texCoord + int2(1, 0)];

    float4 bottomLeft = InputTexture[texCoord + int2(-1, 1)];
    float4 bottomCenter = InputTexture[texCoord + int2(0, 1)];
    float4 bottomRight = InputTexture[texCoord + int2(1, 1)];

    float4 result = (topLeft + topCenter + topRight + centerLeft + center + centerRight + bottomLeft + bottomCenter + bottomRight) / 9.0;

    ResultTexture[texCoord] = result;
}

```

![Box Filter (Averaging)]({{ site.google_drive }}1EsIkin_MdJgZNZZy-960Az9_j3ZXMLuF{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<com_h6>Box Filter (Averaging) compute shader </com_h6>*


$$ Filter =
\Bigl(
\begin{array}{ccc}
1/9 & 1/9 & 1/9 \\
1/9 & 1/9 & 1/9 \\
1/9 & 1/9 & 1/9 \\
\end{array}
\Bigr)
$$

위의 수식은 이미지 선명함을 흐리게 만드는 Box 필터입니다. 박스 필터는 이미지의 잡음을 감소시키고 이미지를 흐리게 만들기 위해서 주변 픽셀을 더하고 평균을 내어서 부드럽게 만듭니다. 

#### **<com_h4>Compute Shader:Gaussian Filter </com_h4>**

```c#

#pragma kernel CSMain

Texture2D<float4> InputTexture;
RWTexture2D<float4> ResultTexture;

// Gaussian Weights
static const float GaussianWeights[5][5] = {
    {1,  4,  7,  4, 1},
    {4, 16, 26, 16, 4},
    {7, 26, 41, 26, 7},
    {4, 16, 26, 16, 4},
    {1,  4,  7,  4, 1}
};

[numthreads(16, 16, 1)]  
void CSMain(uint3 id : SV_DispatchThreadID) {
    int2 texCoord = int2(id.xy);

    // Gaussian Filter
    float4 result = float4(0.0, 0.0, 0.0, 0.0);

    for (int i = -2; i <= 2; ++i) {
        for (int j = -2; j <= 2; ++j) {
            float4 pixel = InputTexture[texCoord + int2(i, j)];
            float weight = GaussianWeights[i + 2][j + 2];
            result += weight*pixel/ 273;
        }
    }

    ResultTexture[texCoord] = result;
}

```

![Gaussian Filter ]({{ site.google_drive }}1EsIkin_MdJgZNZZy-960Az9_j3ZXMLuF{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<com_h6>Gaussian Filter compute shader </com_h6>*


$$ Filter =
\Bigl(
\begin{array}{ccc}
1 & 4 & 7 & 4 & 1 \\
4 & 16 & 26 & 16 & 4\\
7 & 26 & 41 & 26 & 7 \\
4 & 16 & 26 & 16 & 4 \\
1 &  4 &  7 &  4 & 1 \\
\end{array}
\Bigr)
$$

위의 수식은 우리가 아는 수학자 가우스(가우시안) 필터입니다. 이미지를 흐린 효과를 주기 위해서 사용됩니다. 박스 필터는 같은 픽셀값을 더하면서 부자연스러울 수 있으나, 가우시안 필터는 거리에 따른 가중치를 가우시안 분포를 함수를 곱하여 만들어서 픽셀의 더욱 부드러운 그레디언트를 생성합니다. 가우시안 필터를 작성하기 전까지는 코드가 간단해서 필터값을 따로 빼지 않았으나, 더 좋은 코드를 위해서 필터값을 빼서 구현하였습니다.

<br>

### <com_h3> 2) 카메라에 컴퓨트 쉐이더 걸어서 효과 주기 </com_h3>

이미지 합성곱 필터링은 다양한 방면으로 응용이 가능합니다. 이미지 뿐만아니라 바이너리로 이루어진 소리, 영상에서도 적용할 수 있습니다. 그렇다면 개념을 확장시켜서 실시간 인계임 화면에서도 컴퓨트 쉐이더를 걸어서 이미지 합성 곱 필터링은 사용할 수 있습니다. 

![Camera Compute Shader]({{ site.google_drive }}17fJJUAsDkjvacqbxZTNCbhTdwnzdzzkl{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<com_h6>Camera Compute Shader 논리 구조 </com_h6>*

생각해보면 구조는 간단합니다. 
1. 사용할 오브젝트에 유니티 카메라 클래스를 만들어줍니다. 
2. 카메라 뷰포트 화면을 렌더 텍스쳐로 받아옵니다. 
3. 렌더 텍스처를 컴퓨트 쉐이더를 통하여 이미지 합성 곱 필터링을 적용해줍니다.
4. 이런 렌더 텍스처를 OnGUI를 통해 다시 화면으로 디스플레이 해줍니다.

<br>

이는 예제 코드를 보면 이해하실 수 있습니다.

#### **<com_h4>C#</com_h4>**

```c#

public class ComputeShaderCamera : MonoBehaviour
{

    public Texture2D sourceTexture; // 보여줄 텍스쳐
    public Material blitMaterial; // 텍스쳐를 그릴 재질

    private Camera renderCamera; // 렌더링을 위한 카메라
    private RenderTexture renderTexture; // 렌더링 텍스쳐

    public ComputeShader filterComputeShader;
    RenderTexture resultTexture;
    public float weight;
    // Start is called before the first frame update
    void Start()
    {
        
        renderCamera = gameObject.AddComponent<Camera>();
        renderCamera.clearFlags = CameraClearFlags.SolidColor;
        renderCamera.backgroundColor = Color.black;
        renderCamera.orthographic = true;
        renderCamera.nearClipPlane = 0.1f;
        renderCamera.farClipPlane = 1000f;
        renderCamera.depth = -100; // 다른 요소들 위에 표시하기 위해 깊이 설정

        // 렌더링 텍스쳐 생성
        renderTexture = new RenderTexture(Screen.width, Screen.height, 0);
        renderTexture.enableRandomWrite = true;
        renderTexture.Create();

        renderCamera.targetTexture = renderTexture;
     
        resultTexture = new RenderTexture(Screen.width, Screen.height, 0);
        resultTexture.enableRandomWrite = true;
        resultTexture.Create();


    }

    // Update is called once per frame
    void Update()
    {
        // 렌더링 텍스쳐에 텍스쳐를 그리기 위해 설정
        Graphics.SetRenderTarget(renderTexture);

        // 텍스쳐를 그릴 재질과 텍스쳐를 사용하여 Graphics.Blit() 호출
        //Graphics.Blit(sourceTexture, renderTexture, blitMaterial);

        ApplyFilter();

    }
    void OnGUI()
    {
        // 게임뷰 화면에 렌더링 텍스쳐를 표시
        GUI.DrawTexture(new Rect(0, 0, Screen.width, Screen.height), resultTexture);
    }
    //void OnRenderImage(RenderTexture src, RenderTexture dest)
    //{
    //    // 게임뷰에 렌더링 텍스쳐를 표시
    //    Graphics.Blit(renderTexture, dest);
    //}

    void ApplyFilter()
    {
        // 컴퓨팅 셰이더 매개변수 설정
        filterComputeShader.SetTexture(0, "InputTexture", renderTexture);
        filterComputeShader.SetTexture(0, "ResultTexture", resultTexture);
        filterComputeShader.SetFloat("weight", weight);

        // 컴퓨팅 셰이더 디스패치
        int threadGroupsX = Mathf.CeilToInt(renderTexture.width / 8.0f);
        int threadGroupsY = Mathf.CeilToInt(renderTexture.height / 8.0f);
        filterComputeShader.Dispatch(0, threadGroupsX, threadGroupsY, 1);

    }
}

[CustomEditor(typeof(ComputeShaderCamera))] 
public class ComputeShaderCameraEditor : Editor
{
    public override void OnInspectorGUI()
    {
        ComputeShaderCamera Script = (ComputeShaderCamera)target;

        EditorGUI.BeginChangeCheck();
        float value = EditorGUILayout.Slider("Value", Script.weight, 0f, 1f);
        if (EditorGUI.EndChangeCheck())
        {
            Script.weight = value;
        }
    }
}

```

![FlowEffectTest]({{ site.google_drive }}1m_mUTuNW8zP-wdiPuxuelmzq3IJU-wQJ{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<unity_h6>Camera - sobal compute shader 유니티 화면 </unity_h6>*

이 처럼 카메라를 움직이면 컴퓨트 쉐이더가 카메라 화면에 적용되어 디스플레이 됩니다. 위의 구조에 추가적으로 유니티 인스펙터 창으로 컴퓨트 쉐이더에 들어가는 임계점 값을 개발자가 조절 할 수 있도록 툴로 제작하였습니다.

<br>
<br>

## <com_h2> 2. 끝으로 </com_h2>

3부작에 걸처 이미지 합성 곱 필터링 아티클을 작성하였습니다. 아티클은 코드를 작성하는데 포커싱을 맞춰서 생각보다 컴퓨트 쉐이더 이론이라던가 아니면 합성 곱 필터링의 세부적인 종류의 이론에 관해서 적지 못한 거 같아서 많이 아쉽습니다. 또한, 아쉬운 점은 유니티를 커스텀마이징을 사용하면 카메라의 뷰포트를 바로 컴퓨트 쉐이더로 적용하고 다시 디스플레이로 보낼 수 있을 것 같습니다. 이런 비슷한 레퍼런스가 찾을 수가 없고 머릿속의 로직을 작성해서 부끄럽고 부족할 부분이 존재할 수 있습니다. 읽어주셔서 감사합니다.