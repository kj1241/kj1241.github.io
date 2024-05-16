---
layout: post
title: "DirectX 12 Tutorial - 들어가기 전에 WinAPI"
date: 2024-05-09 09:00:00 +09:00
image: https://drive.google.com/thumbnail?id=1ok5pevaEPOqg8bJM4DrILGceimMy_6uC
toc: true
categories: [Graphics_Development]
keywords: C++, WinpAPI
addsence: true
lastmod: 2024-05-09 09:00:00 +09:00
sitemap: 
  changefreq : daily
  priority : 1.0
excerpt: Directx 12를 사용하여 그리기를 시작하기 전에 그릴 수 있는 창을 만들어야 합니다. 이 튜토리얼에서는 direct3d를 그릴 수 있도록 Win32 API를 사용하여 창을 만들 예정입니다.
related_links:
    - url: /directX/DirectX12_Tutorial.html
---

오랜만에 아티클 작성으로 돌아왔습니다. DirectX 12 튜토리얼은 포트폴리오를 전부 정리하고 작성하고 싶었는데, 앞으로 남은 포트폴리오는 코드의 상태가 좀 많이 뜯어 고쳐서 올려야되서 당분간 보조 할일로 바꿀려고 합니다. DirectX 12는 만드는 것은 재미있는데 다른 사람들에게 설명하는게 너무 어렵다고 생각합니다. 무언가 만드는것보다 도큐멘트 작성하는데 더 많은 시간들이 걸리니 비효율적이라고 생각됩니다... 

<br>
<br>

## <com_h2> 1. 미리보기 </com_h2>

![InitWindows]({{ site.google_drive }}1plAKb4gzLI9ZqBfr51H_BuBbkewmsH0C{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<cpp_h6>InitWindows</cpp_h6>*

Directx 12를 사용하여 그리기를 시작하기 전에 그릴 수 있는 창을 만들어야 합니다. 이 튜토리얼에서는 direct3d를 그릴 수 있도록 Win32 API를 사용하여 창을 만들 예정입니다.

<br>
<br>

## <com_h2> 2. 구조 </com_h2>

![InitWindows UML]({{ site.google_drive }}1RcDUmu5I8GggAM0HDfVXW2G2t1GV9InK{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<cpp_h6>InitWindows UML</cpp_h6>*

구조에 관해서 살짝 집고 넘어가 보도록 하겠습니다.(딴길로 새는 중..) 최근 재미있는 이야기를 들었는데, main.cpp와 winAPI.h로 클래스를 분리시키는 거에 관해서 입니다. 사실 구조는 12년때 부터 작성해서 생각없이 작성을 했었는데 그 당시 왜 이런 결과를 사용하게 됬는지 한번더 고민하는 계기가 되었습니다. 이렇게 구조를 작성하는데에는 두가지 이유가 있습니다.  

첫째째 이유는 main 과 winAPI이 다르기 때문입니다. 프로젝트 속성을 창으로 바꿔서 winmain을 사용한다 해도 원래 프로그램은 콘솔에서 부터 시작해야되기 때문입니다.

![기본 윈도우 생성]({{ site.google_drive }}1ECLYKl85iRUIqWJRBh8Pq3lzd25XVnfR{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<cpp_h6>기본 윈도우 생성</cpp_h6>*

원래 링커 속성을 안만지고 기본적으로 윈도우 창을 생성하려면 도스창을 열고 생성하는게 맞습니다. 그래서 예전 프로그램을 실행하면 도스창이 열리고 사라지는 이유기도 합니다.

두번째 이유는 확장성 때문입니다. 저희 프로젝트에서는 PC용 창만 만들기 때문에 WinAPI를 사용하지만 만약 범용적인 프로그램을 만들고 싶다면 구조는 다음과 같이 확장 할 수 있기 때문입니다.

![어플리케이션 구조 확장]({{ site.google_drive }}12dSua1Uw-GAflQmxQi4QPgBPmPJAj2dh{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<cpp_h6>어플리케이션 구조 확장</cpp_h6>*


