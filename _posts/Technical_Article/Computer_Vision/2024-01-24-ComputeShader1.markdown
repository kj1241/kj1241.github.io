---
layout: post
title: "이미지 필터링"
date: 2024-01-24 02:00:00 +0900
image: https://drive.google.com/uc?export=view&id=1NyOWh78_JxYBGA7qZNJ6zfsdgN92M5pL
toc: true
categories: [Computer_Vision]
tags: [Computer_Vision, Graphics, Compute Shader, 최적화, SIMD]
keywords: Computer_Vision, Graphics, Compute Shader, 최적화, SIMD
addsence: true
excerpt:  
---


---


## <yellow1_h2> 1. 이미지란 </yellow1_h2>

앞서 보이는 이미지는 시각적 정보를 포함하는 미디어의 한 형태로, 주로 시각적 감각을 통해 인식되는 정보를 담고 있습니다.  
근데 우리에게 보여지는 이런 이미지는 그래픽스의 산물입니다.

0과 1로 이루어져 있는 컴퓨터에서 이미지는 위와 같이 헤더를 포함하고 있는 단순 바이너리파일 입니다.
이해가 안되시는 분들을 위해 다음과 같은 코드를 준비하였습니다.

주어진 코드는 BMP 파일을 읽고 저장하는 함수들로 구성된 C++ 코드입니다.  
아래에 주어진 설명에는 코드의 구조와 주요 기능에 대한 간략한 설명이 포함되어 있습니다.  
  
```c++

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
  
위의 구조체는 BMP 파일을 생성할때 정의하는 헤더 구조입니다.  
다음, <red1_error>#pragma pack(push, 1) </red1_error> 정렬을 제거함으로서 메모리의 내부 단편화를 줄이는데 사용합니다.
    
```c++

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
  
이미지는 c++의 파일 입출력을 사용하여 손쉽게 다른 파일로 복사 생성 할수 있습니다.  
readBMP 함수는 BMP 파일을 열고 헤더 정보를 읽은 후, 이미지 데이터를 읽어 3채널(RGB)의 3D 벡터로 반환합니다.  
saveBMP 함수는 3채널(RGB) 이미지 데이터를 받아 BMP 파일로 저장합니다.  
  
JPG와 같이 BMP를 손실 압축한 파일들도 이와 비슷하게 헤더와 RGB 3채널 혹은 해더와 RGBA 4채널 등으로 구성되어 있습니다.  


<br>

### <yellow1_h3> 1) 이미지에서 그래픽스의 의미</yellow1_h3>

이미지에 있어서 그래픽스는 자유로움입니다.  
이렇게 이야기하면 이해가 안되시는 분들이 계실 겁니다.  
  
이미지를 만들기 위해서 정해진 해더의 규칙, 압축 알고리즘, RGB 채널등 규칙에 얽매이지 않고도 이미지를 그래픽 적으로 그릴 수 있습니다.


<br>
<br>

## <yellow1_h2> 2. 필터 convolution </yellow1_h2>






$$
(f*g)(t) = \int_{-\infty}^{\infty} f(\tau)g(t-\tau)\,d\tau = \lim_{i,j \to 0}\sum_{}^{} f(\tau)g(t-\tau)
$$




<br>

### <yellow1_h3> 1) 합성 곱 식 </yellow1_h3>


<br>
<br>

## <yellow1_h2> 3. 코드 </yellow1_h2>


<br>

### <yellow1_h3> 1) Open CV를 이용한 이미지 변환 (python) </yellow1_h3>

<details markdown = 1>
<summary> python 코드 </summary>

```python

#구글 콜렙사용
from google.colab.patches import cv2_imshow
import sys
import numpy as np
import cv2

src = cv2.imread('/content/gdrive/My Drive/Colab Notebooks/lenna.jpg', cv2.IMREAD_COLOR)
cv2_imshow(src)
kernel = np.array([[2,0,0],
                   [0,-1,0],
                   [0,0,-1]])*2

src = cv2.filter2D(src, -1, kernel)
cv2_imshow(src)
cv2.waitKey(0)
cv2.destroyAllWindows()

```
</details>





<br>

### <yellow1_h3> 2) Cpu를 이용한 이미지 변환 (c++) </yellow1_h3>


<details markdown = 1>
<summary> c++ 코드 </summary>

```c++
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
</details>
  


  
<br>

### <yellow1_h3> 3) Simd 병렬처리를 이용하여 코드 최적화 하기 (C++) </yellow1_h3>

```c++

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
            __m256i weights = _mm256_set_epi16(0, 0, 0, 299, 0, 587, 0, 114, 0, 0, 0, 0, 0, 0, 0, 0);

            // 가중치를 사용하여 RGB 값을 곱하고 더함
            __m256i result = _mm256_maddubs_epi16(rgb, weights);

            // 결과를 8비트 오른쪽으로 시프트
            result = _mm256_srli_epi16(result, 8);

            // 그레이 스케일 값 추출
            alignas(32) unsigned char gray[32];
            _mm256_storeu_si256((__m256i*)gray, result);

            // R, G, B 값을 그레이 스케일 값으로 설정
            pixel[0] = gray[0] + gray[8] + gray[16]; // R
            pixel[1] = gray[0] + gray[8] + gray[16]; // G
            pixel[2] = gray[0] + gray[8] + gray[16]; // B
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






<br>

### <yellow1_h3> 4) GPGPU를 이용하여 코드 최적화 하기(Compute Shader) </yellow1_h3>


---