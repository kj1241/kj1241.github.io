---
layout: post
title: "WinAPI를 이용해서 라인 차트 그리기 연습하기"
date: 2023-04-05 11:50:19 +09:00
image: https://drive.google.com/thumbnail?id=1OLxPpY_r1T-Gkbka9_MpTRFmFArJ86i5
toc: true
categories: [WinAPI]
keywords: Line Chart, WinAPI, C++, Graph Drawing, Performance Measurement
addsence: true
lastmod: 2024-10-07 12:00:19 +09:00
sitemap: 
  changefreq : daily
  priority : 1.0
excerpt: LineChart 그리기 연습 프로젝트는 WinAPI와 C++을 사용해 간단한 라인 차트를 구현한 코드입니다. MoveToEx, LineTo API를 활용해 10개의 데이터 포인트를 시각화합니다.
related_links:
    - url: /cppcon/CppCon22_Variant.html
---

## <cpp_h2> 프로젝트 소개 </cpp_h2>

툴을 만들때 그래프를 그려야 할 필요성이 생겼습니다. 따라서 빠르게 만들 수 있는 방법을 고민하다가 WinAPI를 사용해서 그래프를 그리는 연습을 한 코드입니다.

<br>
<br>

## <cpp_h2>프로젝트 개요</cpp_h2>

- <span><cpp_h5>프로젝트명:</cpp_h5> LineChart 그리기 연습</span>
- <span><cpp_h5>게임 장르:</cpp_h5> Toy Project</span>
- <span><cpp_h5>기간:</cpp_h5> 제작 완료</span>
    - ver.1: 2023.03.11(제작)
- <span><cpp_h5>개발인원:</cpp_h5> Developer(1명)</span>
- <span><cpp_h5>플랫폼:</cpp_h5> PC (Window)</span>


<br>

### <cpp_h3> 기술 스택 </cpp_h3>

- <span><cpp_h5>개발 도구:</cpp_h5> Visual Studio 2019  </span>
- <span><cpp_h5>개발 언어:</cpp_h5> C++ / winAPI  </span>


<br>
<br>

## <cpp_h2> 프로젝트 특징 및 기능 구현 </cpp_h2>

프로젝트 특징과 기능 구현 내용입니다.

<br>

### <cpp_h3>라인 차트 그리기 연습 ver.1</cpp_h3><red1_error> (전체 제작 기여도: 100%)</red1_error>

<details markdown=1>
<summary> 라인 차트 전체 코드 </summary>

```cpp

#include <Windows.h>

const int ChartWidth = 600;
const int ChartHeight = 400;
const int NumPoints = 10;
const int Data[] = { 20, 30, 40, 50, 60, 55, 45, 35, 25, 20 };

LRESULT CALLBACK ChartWndProc(HWND hWnd, UINT msg, WPARAM wParam, LPARAM lParam)
{
    switch (msg)
    {
    case WM_PAINT:
    {
        PAINTSTRUCT ps;
        HDC hdc = BeginPaint(hWnd, &ps);

    
        MoveToEx(hdc, 50, ChartHeight - 50, NULL);
        LineTo(hdc, ChartWidth - 50, ChartHeight - 50);
        MoveToEx(hdc, 50, ChartHeight - 50, NULL);
        LineTo(hdc, 50, 50);

      
        int xStep = (ChartWidth - 100) / (NumPoints - 1);
        int yStep = (ChartHeight - 100) / 100;
        int x = 50, y = ChartHeight - 50 - Data[0] * yStep;
        for (int i = 1; i < NumPoints; i++)
        {
            int nextY = ChartHeight - 50 - Data[i] * yStep;
            MoveToEx(hdc, x, y, NULL);
            LineTo(hdc, x + xStep, nextY);
            x += xStep;
            y = nextY;
        }

        EndPaint(hWnd, &ps);
        break;
    }
    case WM_DESTROY:
        PostQuitMessage(0);
        break;
    default:
        return DefWindowProc(hWnd, msg, wParam, lParam);
    }

    return 0;
}

int WINAPI WinMain(HINSTANCE hInstance, HINSTANCE hPrevInstance, LPSTR lpCmdLine, int nCmdShow)
{

    WNDCLASS wc = {};
    wc.lpfnWndProc = ChartWndProc;
    wc.hInstance = hInstance;
    wc.hbrBackground = (HBRUSH)(COLOR_WINDOW + 1);
    wc.lpszClassName = L"ChartWindowClass";
    RegisterClass(&wc);

    HWND hWnd = CreateWindow(wc.lpszClassName, L"Line Chart",
        WS_OVERLAPPEDWINDOW | WS_VISIBLE, CW_USEDEFAULT, CW_USEDEFAULT,
        ChartWidth, ChartHeight, NULL, NULL, hInstance, NULL);


    MSG msg = {};
    while (GetMessage(&msg, NULL, 0, 0))
    {
        TranslateMessage(&msg);
        DispatchMessage(&msg);
    }

    return (int)msg.wParam;
}

```

</details>

1. 그래프의 데이터 포인트 수는 10개입니다.
2. MoveToEx , LineTo를 사용해서 선을 그렸습니다.



<br>
<br>

## <cpp_h2> 결과(성과) 및 데모 </cpp_h2>

![WinAPI 라인 차트 결과]({{ site.google_drive }}1OLxPpY_r1T-Gkbka9_MpTRFmFArJ86i5{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<cpp_h6>WinAPI 라인 차트 결과</cpp_h6>*

- <span><cpp_h5>성과:</cpp_h5> LineChat 그리기 연습 </span>
- <span><cpp_h5>깃허브(코드):</cpp_h5> [https://github.com/kj1241/WinAPI_Portfolio/tree/main/LineChat_Practice](https://github.com/kj1241/WinAPI_Portfolio/tree/main/LineChat_Practice)</span>

<br>
<br>

## <cpp_h2> 비고 및 여담 </cpp_h2>

- 배운점
    - WinAPI를 사용해서 그래프 그리는 방법에 대해서 생각해 봤습니다.
    - CppCon에서 발표된 코드를 참고하여 실시간 성능을 측정하는 방법을 연습하기 위해 이 프로젝트를 진행하게 되었습니다. 이를 통해 WinAPI를 활용한 그래프 그리기와 성능 측정의 기초를 다질 수 있었습니다.