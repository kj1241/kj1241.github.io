---
layout: post
title: "이미지 합성곱 필터링 1 - 합성곱 필터링 기초"
date: 2024-04-11 09:00:00 +09:00
image: https://drive.google.com/thumbnail?id=156pV5r2Pys9r-c7mXceHP78Xr_0Aa-nw
toc: true
categories: [Graphics_Development]
keywords: Computer_Vision, Graphics, 이미지 합성곱 필터링, python, Open CV
addsence: true
lastmod: 2024-04-11 09:00:00 +09:00
sitemap:
  changefreq : daily
  priority : 1.0
excerpt:  이미지 합성 곱 필터링을 이해하고 Python 및 Open CV를 사용하여 Box 및 Embossing 필터를 적용한 예제를 제공합니다. 필터 변수에 수학적으로 도출된 값들을 다양하게 적용하여 이미지를 변환할 수 있습니다.
related_links:
    - url: /computer_vision/ImageComposition.html
    - url: /computer_vision/UnityImageComputeShader.html
    - url: /graphics_development/ImageComposition2.html
    - url: /graphics_development/ImageComposition3.html
---

이 아티클을 작성할 때, 왜 이렇게 작성하기 힘든지 고민을 많이 해서 작성하기까지 오랜 시간이 걸렸습니다. 그 이유는 면접에서처럼 저의 생각을 남에게 보여주기 부끄럽기 때문입니다. 토이 프로젝트의 과정은 '수식을 보고 코드를 작성 → 최적화 방안 고안 → 응용 방법 고안' 이런 과정으로 목적 없이 즐기면서 코드를 작성하였습니다. 하지만 아티클은 남에게 알려주기 위해서 목적들을 담아야 하기 때문에 많이 부끄러운 상태입니다. 이렇게 코드를 작성하는 게 이해 안될 수도 있습니다. 이 아티클은 이미지 합성곱 필터 기초와 CPU 최적화, GPU 최적화 및 응용 세가지 챕터로 구성되어 있습니다.

<br>
<br>

## <com_h2> 1. 이미지 </com_h2>

이미지 합성곱 필터를 알아보기 앞서서 이미지에 대해서 알아보도록 합시다. 물론 Open CV를 사용하여 Python으로 이미지 합성곱 필터링 코드를 작성한다면, 이미지의 기본지식에 대해서 생각하실 필요가 없습니다. 하지만 제가 추구했던 방향은 단순히 기술 구현 뿐만아니라 최적화 방안이였기 때문에 이미지에 관해서 집고 넘어가야 좀 더 이해하시기 편할 수 있으실 겁니다. 

<br>

### <com_h3> 1) 이미지란 </com_h3>

일반적인 의미의 이미지는 시각적 정보를 포함하는 미디어의 한 형태로, 주로 시각적 감각을 통해 인식되는 정보를 담고 있습니다. 그러나 우리에게 보이는 이런 이미지는 그래픽스의 산물입니다. 0과 1로 이루어져 있는 컴퓨터에서 이미지는 헤더를 포함하고 있는 단순한 바이너리 파일 입니다. 이해가 안 되시는 분들의 위해서 다음과 같은 코드를 준비하였습니다. 주어진 코드는 BMP 파일을 읽고 저장하는 함수들로 구성된 C++ 코드입니다. 아래에 주어진 설명에는 코드의 구조와 주요 기능에 대한 간략한 설명이 포함되어 있습니다.

#### **<com_h4>C++:</com_h4>**

```cpp

#pragma pack(push, 1) // 구조체 패딩 비활성화

// BMP 파일 헤더 구조체
struct BMPFileHeader {
    char signature[2];
    uint32_t fileSize;
    uint16_t reserved1;
    uint16_t reserved2;
    uint32_t dataOffset;
};

// BMP 정보 헤더 구조체
struct BMPInfoHeader {
    uint32_t headerSize;
    int32_t width;
    int32_t height;
    uint16_t planes;
    uint16_t bitsPerPixel;
    uint32_t compression;
    uint32_t imageSize;
    int32_t xPixelsPerMeter;
    int32_t yPixelsPerMeter;
    uint32_t totalColors;
    uint32_t importantColors;
};

#pragma pack(pop) // 구조체 패딩 활성화

```

위의 구조체는 BMP 파일을 생성할 때 정의하는 헤더 구조입니다. 다음, <red1_error>#pragma pack(push, 1) </red1_error> 정렬을 제거함으로써 메모리의 내부 단편화를 줄이는 데 사용합니다.

바이너리 파일의 헤더(Header)는 해당 파일의 구조와 내용을 설명하는 정보를 포함한 부분입니다. 헤더는 파일의 시작 부분에 있으며, 파일이 어떤 종류의 데이터를 포함하고 있는지, 그리고 파일의 다양한 속성에 대한 정보를 제공합니다. 바이너리 파일의 헤더는 해당 파일을 해석하고 올바르게 처리하는 데 필요한 정보를 포함하고 있습니다. jpg, png 등 다른 이미지 포맷도 역시 각각의 헤더가 존재하며 그 안에 필요한 정보들이 저장되어있습니다.

#### **<com_h4>C++:</com_h4>**

```cpp

std::vector<std::vector<std::vector<unsigned char>>> readBMP(const std::string& filePath) {
    std::ifstream file(filePath, std::ios::binary);
    if (!file.is_open()) {
        std::cerr << "파일을 열 수 없습니다." << std::endl;
        return {};
    }

    // BMP 파일 헤더 읽기
    BMPFileHeader fileHeader;
    file.read(reinterpret_cast<char*>(&fileHeader), sizeof(BMPFileHeader));

    // BMP 정보 헤더 읽기
    BMPInfoHeader infoHeader;
    file.read(reinterpret_cast<char*>(&infoHeader), sizeof(BMPInfoHeader));

    // 파일에서 이미지 데이터 읽기
    file.seekg(fileHeader.dataOffset, std::ios::beg);

    std::vector<std::vector<std::vector<unsigned char>>> pixels(
        infoHeader.height, std::vector<std::vector<unsigned char>>(infoHeader.width, std::vector<unsigned char>(3)));

    for (int y = infoHeader.height - 1; y >= 0; --y) {
        for (int x = 0; x < infoHeader.width; ++x) {
            file.read(reinterpret_cast<char*>(&pixels[y][x][2]), 1); // Blue 채널
            file.read(reinterpret_cast<char*>(&pixels[y][x][1]), 1); // Green 채널
            file.read(reinterpret_cast<char*>(&pixels[y][x][0]), 1); // Red 채널
        }

        // BMP 이미지의 각 행은 4의 배수 크기로 끝나므로 나머지 부분은 무시
        file.seekg(infoHeader.width % 4, std::ios::cur);
    }

    file.close();
    return pixels;
}

...

void saveBMP(const std::string& filePath, const std::vector<std::vector<std::vector<unsigned char>>>& pixels) {
    std::ofstream file(filePath, std::ios::binary);
    if (!file.is_open()) {
        std::cerr << "파일을 열 수 없습니다." << std::endl;
        return;
    }

    // BMP 파일 헤더 작성
    BMPFileHeader fileHeader;
    fileHeader.signature[0] = 'B';
    fileHeader.signature[1] = 'M';
    fileHeader.fileSize = sizeof(BMPFileHeader) + sizeof(BMPInfoHeader) + pixels.size() * (pixels[0].size() * 3 + pixels[0].size() % 4);
    fileHeader.reserved1 = 0;
    fileHeader.reserved2 = 0;
    fileHeader.dataOffset = sizeof(BMPFileHeader) + sizeof(BMPInfoHeader);

    file.write(reinterpret_cast<const char*>(&fileHeader), sizeof(BMPFileHeader));

    // BMP 정보 헤더 작성
    BMPInfoHeader infoHeader;
    infoHeader.headerSize = sizeof(BMPInfoHeader);
    infoHeader.width = pixels[0].size();
    infoHeader.height = pixels.size();
    infoHeader.planes = 1;
    infoHeader.bitsPerPixel = 24; // R, G, B 각각 8비트
    infoHeader.compression = 0;
    infoHeader.imageSize = 0;
    infoHeader.xPixelsPerMeter = 0;
    infoHeader.yPixelsPerMeter = 0;
    infoHeader.totalColors = 0;
    infoHeader.importantColors = 0;

    file.write(reinterpret_cast<const char*>(&infoHeader), sizeof(BMPInfoHeader));

    // 이미지 데이터 작성
    for (int y = pixels.size() - 1; y >= 0; --y) {
        for (int x = 0; x < pixels[0].size(); ++x) {
            file.write(reinterpret_cast<const char*>(&pixels[y][x][2]), 1); // Blue 채널
            file.write(reinterpret_cast<const char*>(&pixels[y][x][1]), 1); // Green 채널
            file.write(reinterpret_cast<const char*>(&pixels[y][x][0]), 1); // Red 채널
        }

        // BMP 이미지의 각 행은 4의 배수 크기로 끝나므로 나머지 부분은 0으로 채움
        for (int i = 0; i < pixels[0].size() % 4; ++i) {
            char padding = 0;
            file.write(&padding, 1);
        }
    }
    file.close();
}

```

이미지는 c++의 파일 입출력을 사용하여 손쉽게 다른 파일로 복사 생성할 수 있습니다. readBMP 함수는 BMP 파일을 열고 헤더 정보를 읽은 후, 이미지 데이터를 읽어 3채널(RGB)의 3D 벡터로 반환합니다. saveBMP 함수는 3채널(RGB) 이미지 데이터를 받아 BMP 파일로 저장하는 코드입니다.

빛의 정보를 표현하는 Red, blue, Green이 3가지를 3채널 픽셀이라고 표현합니다. 여기에 투명도 alpha를 더해서 4채널 픽셀이라고 이야기합니다. 어떠한 이미지 포맷도 헤더 + 픽셀로 조합되어 있습니다.

<br>
<br>

## <com_h2> 2. 이미지 합성곱 필터링 </com_h2>

이미지에 대해서 알아봤으면 이미지 합성 곱 필터링에 대해서 알아봅시다. (저는 단순히 수식으로 보고 코드를 작성했으나, 그러면 안 되기 때문에 쉽게 설명해보려고 논문을 자주 봤으나 힘들더군요...)


<br>

### <com_h3> 1) 이미지 합성곱 필터링 이란 </com_h3>

합성 곱 필터링(Convolution Filtering)은 디지털 이미지 처리에서 사용되는 기술로, 이미지에 대해 필터(또는 커널)를 적용하여 이미지를 변경하거나 향상하게 시키는 데 사용됩니다. 이 기술은 이미지의 각 픽셀에 대해 주변 픽셀들과 필터의 가중치를 조합하여 새로운 픽셀값을 생성하는 과정을 의미합니다. 그럼 논문에 나와 있는 수식을 보도록 합시다.

$$
(f*g)(t) = \int_{-\infty}^{\infty} f(\tau)g(t-\tau)\,d\tau = \lim_{i,j \to 0}\sum_{}^{} f(\tau)g(t-\tau)
$$

위의 수식은 두 연속 함수 f(t), g(t)에 대한 합성 적분입니다. 좀 더 풀어쓰자면, 시간 축에 있는 어떠한 함수 f(t)에 대해서 g(t)를 사용하여 새로운 함수를 도출하는 식입니다. 즉, f(t)의 형태를 g(t)로 변환시키는 데 사용합니다. 이러한 연산은 주파수의 신호처리, 필터링, 확률과 통계 등에 사용되는 기초적인 함수입니다.

그럼 우리는 이산적인 2D 이미지에서 어떻게 수식을 작성해야 할까요? 그것은 픽셀이 가장 미세하다고 가정하는 것입니다. 그러면 픽셀과 픽셀 사이의 델타값이 수렴할 수 있다고 가정되고 확장 할 수 있습니다. 실제 물리학에서 비슷한 방법으로 확장하곤 합니다. 그럼 이산적인 합성 곱 필터링 수식을 살펴봅시다.

$$
(f*g)(x,y) = \sum_{i=-k}^{k}\sum_{j=-k}^{k} f(x-i,x-j)g(i,j)
$$

겉보기에는 수식이 어려워 보일 수도 있습니다. 하지만 좀 더 풀어쓰면 단순히 새로운 픽셀은 주변 픽셀값이 영향을 미치고 있다고 생각하시면 됩니다. 예를 들면 새로운 픽셀을 주변 픽셀과 가중치를 계산하여 이미지의 흐림 효과나 날카로운 효과, 경계를 감지하는 효과, 특정한 패턴을 찾는 효과들을 만듭니다. 이미지 합성에 관한 논문들이 많은 이유는 g(t) 즉, 가중치에 관한 도출과 유도과정이 많기 때문입니다.

세세한 부분, 예를 들어 외곽선 검출에 관해서만 이야기하면 도함수의 미분부터 이야기해야 하지만, 저는 코드 결과물을 만드는데 치중하고 있기 때문에 넘어가도록 하겠습니다.


<br>

### <com_h3> 2) 이미지 합성곱 필터링 사용처 </com_h3>

이미지 합성 곱의 수식에 대해서 알아봤다면, 이미지 합성 곱 필터링 사용처에 대해서 알아봅시다. 이미지 합성 곱 필터링은 다양한 이미지 처리 및 컴퓨터 비전 작업에 사용됩니다. 주요 사용처는 다음과 같습니다.

1. **노이즈 제거:** 이미지에서 잡음을 제거하기 위해 사용됩니다. 이를 통해 이미지의 품질을 향상시키고 후속 분석 및 처리 작업의 정확도를 높일 수 있습니다.
2. **흐림 효과(모자이크):** 이미지를 흐리게 만들어 세부 사항을 감소시키는 데 사용됩니다. 이는 이미지의 선명도를 감소시키거나 특정한 시각적 효과를 만드는 데 사용될 수 있습니다.
3. **에지 감지:** 이미지의 경계 또는 에지를 감지하고 강조하는 데 사용됩니다. 이는 객체 검출, 이미지 분할 및 세분화 등의 작업에 유용합니다.
4. **특징 추출:** 이미지에서 특정한 패턴이나 특징을 추출하는 데 사용됩니다. 이는 객체 인식, 얼굴 인식, 손글씨 인식 등의 작업에 필요한 전처리 단계로 사용될 수 있습니다.
5. **이미지 강화:** 이미지의 세부 사항을 강조하거나 이미지를 보다 선명하게 만드는 데 사용됩니다. 이는 이미지의 품질을 향상하거나 특정한 특징을 강조하는 데 도움이 됩니다.
6. **필터링 및 특징 추출:** 이미지를 처리하여 특정한 패턴이나 특징을 추출하는 데 사용됩니다. 이는 패턴 인식, 이미지 검색 및 분류, 재구성 및 재생성 등의 작업에 필요한 전처리 단계로 사용될 수 있습니다.

이미지 합성 곱 필터링은 딥 러닝과 함께 사용되기도 합니다. 합성 곱 신경망(Convolutional Neural Network, CNN)과 같은 딥 러닝 모델은 이미지 분류, 객체 검출 및 분할, 이미지 생성 등의 작업에 이미지 합성 곱 필터링을 적용하여 특징을 추출하고 이를 사용하여 복잡한 패턴을 인식합니다.


<br>

### <com_h3> 3) 이미지 합성곱 필터링 예제 코드 </com_h3>

지금 현재 단계에서는 내부적으로 생각하지 않고 테스트 코드를 작성 할 것임으로 python과 openCV 라이브러리를 이용하여 이미지 변환 코드를 작성할 것입니다.

<br>

#### <com_h4> python:Box Filter (Averaging) </com_h4>

```python

#구글 코렙사용
from google.colab.patches import cv2_imshow
import sys
import numpy as np
import cv2

src = cv2.imread('/content/gdrive/My Drive/Colab Notebooks/lenna.jpg', cv2.IMREAD_COLOR)
cv2_imshow(src)
filter =np.array([[1,1,1],
                   [1,1,1],
                   [1,1,1]])*1/9

src = cv2.filter2D(src, -1, filter)
cv2_imshow(src)
cv2.waitKey(0)
cv2.destroyAllWindows()

```

![Box Filter 결과물]({{ site.google_drive }}1B_ULhpaxF0tI0eKLT9iKj254nE_MrGSR{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<com_h6>이미지 Box Filter 적용 결과</com_h6>*

<br>

#### <com_h4> python:Embossing Filter </com_h4>

```python

#구글 코렙사용
from google.colab.patches import cv2_imshow
import sys
import numpy as np
import cv2

src = cv2.imread('/content/gdrive/My Drive/Colab Notebooks/lenna.jpg', cv2.IMREAD_COLOR)
cv2_imshow(src)
filter = np.array([[2,0,0],
                   [0,-1,0],
                   [0,0,-1]])*2

src = cv2.filter2D(src, -1, filter)
cv2_imshow(src)
cv2.waitKey(0)
cv2.destroyAllWindows()

```

![Embossing Filter]({{ site.google_drive }}156pV5r2Pys9r-c7mXceHP78Xr_0Aa-nw{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<com_h6>이미지 Embossing Filter 적용 결과</com_h6>*


<br>

필터 변수에 수학적으로 도출된 다양한 값을 적용하면 더 다양한 결과를 얻을 수 있습니다. 다음 챕터에서는 이미지 필터링을 위한 CPU 최적화 방법에 대해 다룰 예정입니다. 읽어주셔서 감사합니다.


<br>

---

<br>

###### <com_h6>참조:</com_h6> [https://cg.ivd.kit.edu/downloads/assignment3_GPUC.pdf](https://cg.ivd.kit.edu/downloads/assignment3_GPUC.pdf)