---
layout: post
title: "사운드디자인및편집 - 연계 프로젝트"
date: 2024-03-03 09:00:00 +09:00
image: https://drive.google.com/thumbnail?id=12q8mRqk4ZHc9D1FJkU2CKr7Cd1eM4kLx
toc: true
categories: [Unity_TP] 
keywords: Unity Audio, Sound Design, Game Audio, Audio Mixing, 사운드 디자인, FFT
ddsence: false
lastmod: 2024-07-12 09:00:00 +09:00
sitemap:
  changefreq : daily
  priority : 1.0
excerpt: AAA 게임 개발을 위한 오디오 디자인 연습 프로젝트로 Unity를 사용하여 다양한 오디오 효과와 믹싱 기법을 적용했습니다.
related_links:
    - url: /other_projects/SoundDesignAndEditing.html
---

## <unity_h2> 프로젝트 소개 </unity_h2>

해당 프로젝트는 AAA 게임 개발을 위한 오디오 디자인 및 편집을 목표로 한 연습 프로젝트입니다. Unity를 사용하여 다양한 오디오 효과와 믹싱 기법을 적용하고, 실습한 코드와 기술을 통해 게임 오디오 개발의 기본과 고급 기술을 익혔습니다. VikingVillage, Keyboard, DynamicMixing, GameAudioVisualizations 씬을 통해 다양한 사운드 디자인과 구현 방법을 탐구했습니다.

<br>
<br>

## <unity_h2> 프로젝트 개요 </unity_h2>

- <span><unity_h5>프로젝트명:</unity_h5> AAA 게임 프로젝트를 위한 오디오 개발 </span>
- <span><unity_h5>게임 장르:</unity_h5> toy Proejct</span>
- <span><unity_h5>기간:</unity_h5> 제작 완료</span>
    - ver.1: 2018.12.07~2018.12.12(제작) 
    - ver.2: 2024.07.07~2024.07.10(버전 업데이트 및 수정)
- <span><unity_h5>개발인원:</unity_h5> Developer(1명)</span>
- <span><unity_h5>플랫폼:</unity_h5> PC (Window)</span>

<br>

### <unity_h3> 기술 스택 </unity_h3>

- <span><unity_h5>개발 도구:</unity_h5> Unity 5.3.6.f1 → 2019.4.22f1 / visual stuido </span>
- <span><unity_h5>개발 언어:</unity_h5> C# / mono </span>
- <span><unity_h5>그래픽 디자인:</unity_h5> Adobe Photoshop </span>
- <span><unity_h5>음향 효과:</unity_h5> Uinity Audio mixer </span>

<br>
<br>

## <unity_h2> 프로젝트 특징 및 기능 구현 </unity_h2>

Game Audio Development with Unity 5.X 참고도서를 보며 연습한 오디오 작업과 구현한 코드들입니다.

<br>

### <unity_h3> Scene1_VikingVillage</unity_h3><red1_error> (전체 제작 기여도: 100%)</red1_error>

![버티컬 어뎁티브 오디오 트리거]({{ site.google_drive }}12q8mRqk4ZHc9D1FJkU2CKr7Cd1eM4kLx{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<unity_h6>버티컬 어뎁티브 오디오 트리거</unity_h6>*

![스냅샷을 사용한 환경 존]({{ site.google_drive }}1_eEjFGNBhpvJ66XwCKh4twsxwKT8gfpT{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<unity_h6>스냅샷을 사용한 환경 존</unity_h6>*

![바람 영향]({{ site.google_drive }}1bUFvvUoMpd_O6rndL_dOsDvcgCce2vtb{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<unity_h6>바람 영향</unity_h6>*

![도끼 오브젝트 풀]({{ site.google_drive }}1rsgf0LCMJMXvvb9eEG74YvzrtNpFx4FW{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<unity_h6>도끼 오브젝트 풀</unity_h6>*

![유니티 오디오 믹서]({{ site.google_drive }}1DMvz8iDUa_l_OLCvZy7mCaaCumAHserT{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<unity_h6>유니티 오디오 믹서</unity_h6>*

- 오브젝트 구현
    - 유니티에서 제공하는 VikingVillage에셋을 사용하여 기본적으로 구성하였습니다.(현재는 urp 버전밖에 존재하지 않음)
    - 구름(클라우드 메이커)은 쉐이더와 인터넷의 머터리얼을 이용하여 제작하엿습니다.
    - 땅 혹은 물이 구름과 경계선이 이상해 보이지 않도록 안개를 설정하였습니다.
    - 오브젝트 풀을 사용하여 플레이어가 도끼를 만들어 던지는 코드를 작성하였습니다.
    - 일시 정지를 구현하였습니다.
  
- 다이어제틱 사운드 디자인 구현
    - 물 사운드 이펙트를 오디오로 붙이고 믹서로 조정하였습니다.
    - 토치의 파티클양에 따라서 사운드 이펙트를 오디오로 붙이고 믹서로 조정하였습니다.
    - 도끼 날라가는 소리 오디오로 붙이고 믹서로 조정하였습니다.
    - 도끼가 벽에 부딪히는 소리 오디오로 붙이고 믹서로 조정하였습니다.
    - 도끼를 날리기 위해 지르는 함성 오디오로 붙이고 믹서로 조정하였습니다.
    - 어뎁티브 발걸음 소리 오디오로 붙이고 믹서로 조정하였습니다.
    - 일시정지와 재생 스냅샷 오디오로 붙이고 믹서로 조정하였습니다.
    - 오디오 믹서에 피치와 덕볼륨을 설정하여 주파수와 트랙의 볼륨을 조절하였습니다.

- 논 다이어제틱 사운드 디자인 구현
    - 배경 음악 오디오로 붙이고 믹서로 조정하였습니다.
    - 동적 오디오 윈드 이펙트를 구역별로 레벨을 정하여 스크립트를 사용하여 효과를 조절하였습니다.
    - 환경 오디오 존 구현하고 스냅샷을 사용하여 리버브나 에코를 조절하여 레벨 디자인을 구현하였습니다.
    - 어뎁티브 버티컬 리믹싱을 사용하기 위해 레벨별로 스냅샷을 만든후 변화를 주었습니다.

<br>

### <unity_h3> Scene2_Keyboard</unity_h3><red1_error> (전체 제작 기여도: 100%)</red1_error>

#### <unity_h4> Keyboard</unity_h4><red1_error> (전체 제작 기여도: 100%)</red1_error>

![Keyboard]({{ site.google_drive }}1TlZHrnkdwPy8xxeYegHjep1UKjoArVoj{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<unity_h6>Keyboard</unity_h6>*

- GUI를 스크립트를 사용하여 버튼을 구현하였습니다.
- 가상 키보드를 구현하기 위해서 재공된 음의 피치값을 조절하였습니다.
- 리스트를 사용하여 재생을 구현하였습니다.

#### <unity_h4> VocalsRecorder</unity_h4><red1_error> (전체 제작 기여도: 100%)</red1_error>

![VocalsRecorder]({{ site.google_drive }}1-oRPYD3kfq8CpylD1KVllMs3wKME9qaV{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<unity_h6>Vocals Recorder</unity_h6>*

- 마이크로 폰을 이용하여 녹음된 사운드를 재생시켰습니다.
- 마이크로 폰을 사용하여 녹음된 사운드를 wave 파일로 전환하였습니다.

<br>

### <unity_h3> Scene3_DynamicMixing</unity_h3><red1_error> (전체 제작 기여도: 100%)</red1_error>

![DynamicMixing]({{ site.google_drive }}1boaHr-gZz_PQdFve7PxvMJbBxBrkrget{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<unity_h6>Dynamic Mixing</unity_h6>*

- 동적 음악 믹싱을 위해서 제공된 음악에 피치와 덕 볼륨을 조정하여 변경했습니다.

<br>

### <unity_h3> Scene4_GameAudioVisualizations</unity_h3><red1_error> (전체 제작 기여도: 100%)</red1_error>

#### <unity_h4> GameAudioVisualizations</unity_h4><red1_error> (전체 제작 기여도: 100%)</red1_error>

![GameAudioVisualizations]({{ site.google_drive }}1bT3b6QyGWLvtwN-2SCsJUgJ2xPEEGCeZ{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<unity_h6>Game Audio Visualizations</unity_h6>*

- FFT와 윈도잉을 사용하여 사인 웨이브 주파수 분리하는걸 공부하였습니다.
- FFT와 윈도잉을 사용하여 그래픽 적으로 보여주는 예제를 연습하였습니다. 

#### <unity_h4>BlendShapeAnimation </unity_h4><red1_error> (전체 제작 기여도: 100%)</red1_error>

![BlendShapeAnimation]({{ site.google_drive }}1bOWOjBPDFIxj8NQFYueDddltIPx2LAK2{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<unity_h6>Blend Shape Animation</unity_h6>*

- 유니티 에셋스토어의 무료 에셋인 iclone lzzy를 사용하여 사운드에 따른 블렌드 셰이프 애니메이션을 연습하였습니다. 

## <unity_h2> 결과(성과) 및 데모 </unity_h2>

#### <unity_h4> AudioProject - The_Viking_Village 영상 결과</unity_h4><red1_error> (전체 제작 기여도: 100%)</red1_error>

<iframe width="100%" style="aspect-ratio:16/9" src="https://drive.google.com/file/d/1i3Rylo9SLVuMLPhlTv_T1siaqeT8GYah/preview" title="AudioProject - The_Viking_Village" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

#### <unity_h4> AudioProject - Keyboard 영상 결과</unity_h4><red1_error> (전체 제작 기여도: 100%)</red1_error>

<iframe width="100%" style="aspect-ratio:16/9" src="https://drive.google.com/file/d/1fDE_Cnf9poXf118nMoinu6vNzsK6O7_T/preview" title="AudioProject - Keyboard" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

#### <unity_h4> AudioProject - Vocals Recorder 영상 결과</unity_h4><red1_error> (전체 제작 기여도: 100%)</red1_error>

<iframe width="100%" style="aspect-ratio:16/9" src="https://drive.google.com/file/d/1OEzoDD2R1xTRmrGnqtsnr4R9ma_qF9Dp/preview" title="AudioProject - Vocals Recorder" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

#### <unity_h4> AudioProject - DynamicMixing 영상 결과</unity_h4><red1_error> (전체 제작 기여도: 100%)</red1_error>

<iframe width="100%" style="aspect-ratio:16/9" src="https://drive.google.com/file/d/11iVIxaO26bAkxLo7SqWEOFD4Ro25MwWI/preview" title="AudioProject - DynamicMixing" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

#### <unity_h4> AudioProject - GameAudioVisualizations 영상 결과</unity_h4><red1_error> (전체 제작 기여도: 100%)</red1_error>

<iframe width="100%" style="aspect-ratio:16/9" src="https://drive.google.com/file/d/1rzh0TwH_2R8wePBTjupPLicrqsu-0woQ/preview" title="AudioProject - GameAudioVisualizations" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

#### <unity_h4> AudioProject - BlendShapeAnimation 영상 결과</unity_h4><red1_error> (전체 제작 기여도: 100%)</red1_error>

<iframe width="100%" style="aspect-ratio:16/9" src="https://drive.google.com/file/d/1TjzUVv-YE_Otmb-MefPANL4FXa74sswP/preview" title="AudioProject - BlendShapeAnimation" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

- <span><unity_h5>성과:</unity_h5> 토이 프로젝트 제작 </span>
- <span><unity_h5>깃허브(코드):</unity_h5> 공개 예정</span>


<br>
<br>

## <unity_h2> 비고 및 여담 </unity_h2>

- 배운점
    - 다양한 사운드 디자인 기술과 구현 방법을 익혔습니다.
    - Unity Audio Mixer와 같은 도구를 사용하여 오디오 효과를 조정하고 믹싱하는 방법을 배웠습니다.
    - 오디오 믹서를 사용한 피치와 덕볼륨 조정, 어뎁티브 발걸음 소리 구현 등 다양한 오디오 효과를 적용해보았습니다.
    - 동적 오디오 윈드 이펙트와 환경 오디오 존 설정을 통해 게임의 몰입감을 높이는 방법을 익혔습니다.
    - FFT와 윈도잉을 사용하여 주파수 분석 및 그래픽 시각화하는 기술을 연습했습니다.
    - 가상 키보드와 마이크 녹음을 통해 오디오 입력과 재생의 기본적인 개념을 이해했습니다.
- 여담
    1. 대학교에서 수강한 사운드디자인 및 편집 이론을 실습하기 위해 이 프로젝트를 시작했습니다. Michael Lanham의 "Game Audio Development with Unity 5.X" 도서가 큰 도움이 되었습니다.
    2. 이 프로젝트를 통해 사운드 디자인의 중요성을 깨닫게 되었고, 미래에 발생할 수 있는 오디오 최적화 문제를 해결하기 위해 더 깊이 공부하게 되었습니다.
    3. 다양한 사운드 디자인 기술을 익히면서 더 많은 학습과 연습이 필요함을 느꼈습니다. 특히, 복잡한 사운드 믹싱을 더 많이 시도해봐야 한다고 느꼈습니다.
    4. 앞으로도 사운드 디자인 관련 프로젝트를 진행하여 기술을 더욱 향상시키고, 또한 자체 엔진 개발에도 적용할 기반이 되었습니다.
    5. 참고도서에서 오디오 소스와 이론을 바탕으로 프로그래밍 코드를 작성했으며, 따라서 책의 코드와 다를 수 있습니다.
    6. 평소에는 라이브러리 제작이나 그래픽 요소들을 만들어 연습하지만, 이 프로젝트는 사운드 디자인을 연습하기 위해 에셋스토어에서 제공된 에셋을 많이 사용하였습니다.
  
<br>

---

<br>

###### <unity_h6>참고도서:</unity_h6> Game Audio Development with Unity 5.X - Michael Lanham
