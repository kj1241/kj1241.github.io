---
layout: post
title: "이미지 합성곱 필터링 2 - CPU 최적화 SIMD 병렬 처리"
date: 2024-04-12 09:00:00 +09:00
image: https://drive.google.com/thumbnail?id=1wZ1L5GLacdMpe8m2p1rrnP9bMBDn8hmH
toc: true
categories: [Graphics_Development]
keywords: Computer_Vision, Graphics, 이미지 합성곱 필터링, C++, SIMD, SIMD 병렬처리 예제 코드, CPU 최적화, SIMD 구조, 그레이 스케일
addsence: true
lastmod: 2024-04-12 09:00:00 +09:00
sitemap: 
  changefreq : daily
  priority : 1.0
excerpt:  이 코드는 BMP 이미지 처리를 통해 SIMD 기술을 활용하여 이미지 합성곱 필터링으로 변환하는 방법을 보여줍니다. SIMD는 한 번에 여러 데이터를 처리함으로써 병렬성을 극대화하여 성능을 향상시킵니다. 이를 통해 이미지 처리 속도를 최적화하고 효율적인 알고리즘을 구현할 수 있습니다.
related_links:
    - url: /computer_vision/ImageComposition.html
    - url: /computer_vision/UnityImageComputeShader.html
    - url: /graphics_development/ImageComposition1.html
    - url: /graphics_development/ImageComposition3.html
---

이 챕터에서는 더는 Python과 Open CV를 사용해서 이미지 합성 곱 필터링을 만들지 않을 것입니다. Python은 분명 테스트 코드 작성하기 좋은 언어임이 틀림없습니다. 하지만 Python의 라이브러리 내부를 찾아보려면 라이브러리 도큐먼트를 정독해도 안에 내용이 없을 때가 있습니다. 예전 경험에서 어떠한 이미지를 공유메모리로 올리려고 하는데, Python 라이브러리 자체에 크기 제한이 있어서 고생해본 경험이 있습니다. 따라서 언어를 다양하게 사용해서 최적화를 시도해보겠습니다.

<br>
<br>

## <com_h2> 1. CPU를 사용해서 이미지 합성곱 필터링 최적화 </com_h2>

처음 계획은 추가로 논문을 읽고 좀 더 알고리즘 적으로 어려운 코드를 작성할까 고민하였습니다. 하지만 그런 방법보다는 남들이 생각하지 방법으로 코드를 확장시켜보고자 작성하게 되었습니다. 딱히 특정한 목적을 가지고 코드를 작성하지 않았습니다. 이미지 합성 곱 필터링 코드를 보고 좀 더 확장시켜보고자 재미삼아 작성한 내용입니다.

<br>

### <com_h3> 1) C++을 사용해서 이미지 변환하기  </com_h3>

앞선 챕터에서 설명한 이미지의 개념을 사용해서 이미지 변환을 만들 것입니다. 

#### **<com_h4>C++:</com_h4>**

```cpp

#include <iostream>
#include <fstream>
#include <vector>

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

// BMP 파일에서 텍스처 읽기 함수
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

// 이미지를 그레이 스케일로 변환하는 함수
void convertToGrayScale(std::vector<std::vector<std::vector<unsigned char>>>& pixels) {
    for (auto& row : pixels) {
        for (auto& pixel : row) {
            // RGB 값을 그레이 스케일로 변환
            unsigned char gray = static_cast<unsigned char>(
                0.299 * pixel[0] +
                0.587 * pixel[1] +
                0.114 * pixel[2]
                );

            // R, G, B 값을 그레이 스케일 값으로 설정
            pixel[0] = gray;
            pixel[1] = gray;
            pixel[2] = gray;
        }
    }
}

// 그레이 스케일 이미지를 BMP 파일로 저장하는 함수
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

int main() {
    std::string originalTextureFilePath = "원본텍스처.bmp"; // 원본 BMP 텍스처 파일 경로 설정
    std::vector<std::vector<std::vector<unsigned char>>> pixels = readBMP(originalTextureFilePath); // BMP 파일에서 텍스처 읽기

    convertToGrayScale(pixels);  // 이미지를 그레이 스케일로 변환

    std::string savedTextureFilePath = "그레이스케일텍스처.bmp"; // 저장할 BMP 텍스처 파일 경로 설정
    saveBMP(savedTextureFilePath, pixels);   // 그레이 스케일 이미지를 BMP 파일로 저장

    std::cout << "그레이 스케일 이미지를 저장했습니다." << "\n";
    return 0;
}

```

![Cpp를 사용한 이미지 합성곱 필터링]({{ site.google_drive }}1j8lUlwSScFZjiu-rNGOQFFgA-0xauqU_{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<com_h6>CPP를 사용한 이미지 합성곱 필터링 그레이스케일 결과</com_h6>*

해당 코드는 BMP 파일 형식의 이미지를 읽어와 각 픽셀의 RGB 값을 벡터로 저장합니다. 그리고 이러한 RGB 값에 각각 0.299, 0.587, 0.114를 곱하여 이미지를 회색 톤으로 만드는 방법을 사용합니다. 이는 이미지를 흑백으로 변환하는 흔한 방법의 하나입니다. RGB 값의 가중치를 조정하여 각 픽셀의 밝기를 조절하게 됩니다. 

해당 코드는 BMP 파일 형식의 이미지를 처리하는 기본적인 기능을 수행하며, 이미지를 읽고 쓰는 과정에서 BMP 파일의 헤더 구조를 이해하고 이를 처리하는 방법을 보여줍니다. 만약 JPG 같은 손실 압축 이미지를 사용하려면 헤더에 디코더를 작성하거나 아니면 WIC를 사용하여 팩토리를 만들면 됩니다. (WIC 사용하는 방법은 DirectX 12 텍스트 튜토리얼에서 작성할 예정입니다.)


<br>

### <com_h3> 2) SIMD를 사용하여 이미지 합성곱 필터링 병렬처리로 최적화 하기  </com_h3>

위의 코드를 SIMD를 사용하여 최적화해봅시다. SIMD는 ＂Single Instruction, Multiple Data＂의 약자로, 한 번의 명령어를 통해 다수 데이터를 동시에 처리하는 컴퓨터 아키텍처를 나타냅니다. CPU 레지스터를 사용하여 병렬처리를 하기 때문에 프로그램의 실행 속도를 항상 시키는데 도움이 됩니다.

#### **<com_h4>C++:</com_h4>**

```cpp

#include <iostream>
#include <fstream>
#include <vector>
#include <immintrin.h>
#include <cstring> 

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

// BMP 파일에서 텍스처 읽기 함수
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

// 이미지를 그레이 스케일로 변환하는 함수 (SIMD 사용)
void convertToGrayScaleSIMD(std::vector<std::vector<std::vector<unsigned char>>>& pixels) {
    for (auto& row : pixels) {
        for (auto& pixel : row) {
            // RGB 값을 SIMD 레지스터에 로드
            __m256i rgb = _mm256_set_epi8(
                0, 0, 0, 0,
                0, 0, 0, pixel[2],
                0, 0, 0, 0,
                0, 0, 0, pixel[1],
                0, 0, 0, 0,
                0, 0, 0, pixel[0],
                0, 0, 0, 0,
                0, 0, 0, 0
            );

            // RGB를 그레이 스케일로 변환하기 위한 가중치 생성
            __m256i weights = _mm256_set_epi16(0, 0, 0, 299, 0, 0, 0, 587, 0, 0, 0, 114, 0, 0, 0, 0);

            // 가중치를 사용하여 RGB 값을 곱하고 더함
            __m256i result = _mm256_maddubs_epi16(rgb, weights);

            // 결과를 8비트 오른쪽으로 시프트
            result = _mm256_srli_epi16(result, 8);

            // 그레이 스케일 값 추출
            alignas(32) unsigned char gray[32];
            _mm256_storeu_si256((__m256i*)gray, result);

            // R, G, B 값을 그레이 스케일 값으로 설정
            pixel[0] = gray[8] + gray[16] + gray[24]; // R
            pixel[1] = gray[8] + gray[16] + gray[24]; // G
            pixel[2] = gray[8] + gray[16] + gray[24]; // B
        }
    }
}
// 그레이 스케일 이미지를 BMP 파일로 저장하는 함수
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

int main() {
    // 원본 BMP 텍스처 파일 경로 설정
    std::string originalTextureFilePath = "원본텍스처.bmp";

    // BMP 파일에서 텍스처 읽기
    std::vector<std::vector<std::vector<unsigned char>>> pixels = readBMP(originalTextureFilePath);

    // 이미지를 그레이 스케일로 변환 (SIMD 사용)
    convertToGrayScaleSIMD(pixels);

    // 저장할 BMP 텍스처 파일 경로 설정
    std::string savedTextureFilePath = "그레이스케일텍스처_SIMD.bmp";

    // 그레이 스케일 이미지를 BMP 파일로 저장
    saveBMP(savedTextureFilePath, pixels);

    std::cout << "그레이 스케일 이미지를 SIMD를 사용하여 저장했습니다." << std::endl;

    return 0;
}

```

![SIMD를 사용하여 최적화]({{ site.google_drive }}1KWjlUo13C9geJY5EnLKU12Qru22lqBiO{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<com_h6>SIMD 병렬 처리를 사용한 이미지 합성곱 필터링 그레이스케일 결과</com_h6>*

제가 가장 어려운 게 어떻게 코드를 작성했느냐고 물어보면 '이미지 필터를 SIMD를 이용해서 병렬처리했다'라고 밖에 대답을 못합니다. 그 이유는 코드를 작성할 때 보통 머릿속에서 로직을 만들거나 아니면 구조를 만들고 있습니다. 그럼 머릿속에 있는 구조를 함께 보시죠.

![SIMD 병렬 처리를 사용한 레지스터 구조]({{ site.google_drive }}1wZ1L5GLacdMpe8m2p1rrnP9bMBDn8hmH{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<com_h6>SIMD 병렬 처리를 사용한 레지스터 구조</com_h6>*

위의 구조를 보면서 코드를 살펴보시면 이해가 좀더 쉽게 되실 것입니다. 코드가 조금더 난해할 수 있으니 분해해서 살펴보도록 합시다. 해당 코드는 CPU에서 백터화된 연산을 하도록 코드를 작성하였습니다.

1. <span><com_h5>_mm256_set_epi8</com_h5>은 256비트의 레지스터에 8 비트식 나눠놓은 것입니다. 256 /8 =32 임으로 8비트가 총 32개를 가지고 있습니다. 8비트로 설정한 이유는 비트의 한 채널이 0~255까지 8비트로 전부 표현 할 수 있기 때문입니다.</span>

2. <span><com_h5>_mm256_set_epi16</com_h5>을 사용하여 16비트의 가중치 값을 할당하였습니다. float 형은 원래 4바이트인데 32비트로 나타내야 합니다. 하지만 16비트로 적은 이유는 부동소수점을 사용하기 위해서입니다.</span>

3. <span><com_h5>_mm256_maddubs_epi16</com_h5>은 RGB 값과 가중치를 곱셈한 결과 값입니다. 8비트의 RGB를 16비트로 확장하여 multiply-add를 사용하여 음수가 아닌 부동소수점 계산을 하게 됩니다. 따라서 3개의 채널을 한 번에 병렬처리하여 계산합니다.</span>

4. <span><com_h5>_mm256_srli_epi16</com_h5>은 16비트에서 다시 8비트로 만드는 방법입니다. 이는 부동소수점을 계산하고 나온 결과 값을 다시 0~255로 표현해주기 위해서 사용하였습니다.</span>

5. <span><com_h5>_mm256_storeu_si256</com_h5>을 사용하여 레지스터의 값을 메모리 unsigned char 배열로 저장하였습니다.</span>

<br>

위의 코드처럼 머릿속으로 구조를 생각하면, 픽셀의 병렬처리를 통하여 최적화를 더욱 쉽게 구현할 수 있습니다. ~~(코드 설명하고 있는데 왜 이렇게 현타가....)~~ 다음 챕터에서는 이미지 필터링을 위한 GPU 최적화 방법과 응용에 대해 다룰 예정입니다. 읽어주셔서 감사합니다.