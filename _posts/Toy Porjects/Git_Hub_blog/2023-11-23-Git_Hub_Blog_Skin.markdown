---
layout: post
title: "깃 허브 블로그 스킨 제작 ver.4"
date: 2023-11-23 09:00:00 +0900
image: https://drive.google.com/thumbnail?id=1OzqLMBVTtXSBCgmB8SjPgV9n9eaGn61Q
toc: true
categories: [Git_Hub_Blog]
tags: [ Git Hug Blog, JavaScript, HTML, SCSS, Jekyll, Markdown, Ruby]
---

##  <web_h2> 프로젝트 소개 </web_h2>

우주적 감각을 담은 심플한 디자인으로 눈길을 사로잡는 우주 테마 스킨입니다. 미니멀한 인터페이스와 고요한 색감으로 집중력과 시각적 효과를 증가시켜줍니다. 단순함 속에 심장을 뛰게 하는 우주적 아름다움을 느껴보세요.

<br>
<br>

## <web_h2> 프로젝트 개요 </web_h2>

- <span><web_h5>프로젝트명:</web_h5> KJ_Skin v0.4</span>
- <span><web_h5>장르:</web_h5> Toy Project(Blog Theme)</span>
- <span><web_h5>기간:</web_h5> 운영중</span>
    - ver.1: 2023.11.18~2023.11.20 
    - ver.2: 2023.11.25  
    - ver.3: 2023.12.02~2023.12.03 
    - ver.4: 2024.03.11~2024.03.13 
- <span><web_h5>개발인원:</web_h5> Developer(1명)</span>
- <span><web_h5>플랫폼:</web_h5> PC(Chorm / Microsoft Edge / Firefox / Opera)</span>

<br>

### <web_h3> 기술 스택 </web_h3>

- <span><web_h5>개발 도구:</web_h5> visual code / Git hub</span>
- <span><web_h5>개발 언어:</web_h5> HTML / SCSS / JavaScript / Jekyll / Markdown / Ruby</span>
- <span><web_h5>그래픽 디자인:</web_h5> Adobe Photoshop</span>

<br>
<br>

## <web_h2> 프로젝트 특징 및 기능 구현 </web_h2>

업데이트 별 프로젝트 특징과 기능 구현 내용입니다.

<br>

### <web_h3>단순형 스킨 제작 ver.1</web_h3><red1_error> (전체 제작 기여도: 100%)</red1_error>

1. 라이브러리 없이 테마를 처음부터 제작하였습니다.
2. 홈 커버에 슬라이더 애니메이션을 제작하여 추가하였습니다.
3. 카테고리를 제작하였습니다.
4. 목차를 제작하였습니다.

<br>

#### <web_h4>1) 홈커버 화면</web_h4>

![깃허브블로그 홈커버]({{ site.google_drive }}1OzqLMBVTtXSBCgmB8SjPgV9n9eaGn61Q{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}

- JavaScript 사용하여 라이브러리 없이 직접 슬라이더를 제작하였습니다.
- 홈 커버에 슬라이더를 만들고 생동감을 부여하였습니다.  

<br>

#### <web_h4>2) 카테고리 페이지 화면</web_h4>

![깃허브블로그 홈커버]({{ site.google_drive }}1Q9YyrCUtPyOfZSDsuwRZeajwHBsGD3_q&{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}

- HTML + SCSS를 이용하여 카테고리 제작하였습니다.
- 카테고리를 제작하여 사용자가 편하게 제작할 수 있도록 구성하였습니다.
- Jekyll를 이용하여 페이지 화면을 구성하였습니다.

<br>

#### <web_h4>3) 포스터 화면 및 목차</web_h4>

![깃허브 블로그 포스터]({{ site.google_drive }}1QAh73nYwJTAb3UOWDCYgyBkK9tYn1Z0Y{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}

- JavaScript 사용하여 동적으로 목차를 생성하게 코드 작성하였습니다.
- 목차를 누르면 해당 페이지 위치로 이동합니다.
- Jekyll를 이용하여 포스터 화면을 제작하였습니다.

<br>

### <web_h3>모바일 스킨 제작 ver.2</web_h3><red1_error> (전체 제작 기여도: 100%)</red1_error>

1. 모바일 버전을 제작하기 위해서 반응형, 적응형 디자인 둘을 섞어서 만들었습니다.
    + 메인 콘텐츠의 박스는 웹페이지 크기로 반응형입니다.
    + 1350px 이상은 사이드바가, 1350px 이하는 header가 만들어지는 적응형입니다.
2. 모바일용 카테고리 헤더를 제작하였습니다.

<br>

#### <web_h4>4) 반응형& 적응형 디자인</web_h4>

![반응형&적응형 디자인]({{ site.google_drive }}1bdHRggPHlKQLcHW0L_2eIwwy12idXyJI{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}

- HTML + SCSS를 이용하여 반응형 및 적응형 디자인을 제작하였습니다.
- 1350px 이상은 사이드바, 1350px 이하는 header가 만들어지는 적응형으로 만들어집니다.

<br>

#### <web_h4>5) 모바일용 카테고리 헤더 제작</web_h4>

![모바일용 카테고리 헤더]({{ site.google_drive }}1vQRTrNEeIzGEkuvmKGb15Uq4sr9VDw8d{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}

- Jekyll를 이용하여 버튼 이벤트를 만들었습니다.
- HTML + SCSS 카테고리 코드를 사용하였습니다.
- svg를 이용하여 간편한 심볼을 넣었습니다.

<br>

### <web_h3>최적화 설정 ver.3</web_h3><red1_error> (전체 제작 기여도: 100%)</red1_error>

1. tilte, description, keywords를 설정 및 구현하였습니다.
2. seo-tag 설정하여 보다 검색에 친숙하게 구현하였습니다.
3. robots.txt, sitmap.xml 설정하여 구글 서치콘솔 및 빙 웹마스터에 연동하였습니다.
4. 파비콘 추가하여 사용자 경험을 확대하였습니다.
5. 각종 최적화 진행하였습니다. ( png → webp 변경등 )


<br>

### <web_h3>에러해결 및 리뉴얼 ver.4</web_h3><red1_error> (전체 제작 기여도: 100%)</red1_error>

1. 웹의 분위기를 환기하고자 폰트를 바꾸었습니다.
2. 구글 정책 변경에 따라서 [이미지 호스팅](/web/GoogleDriveImageEmbed)을 바꾸고 매크로를 작성하였습니다.

<br>

#### <web_h4>6) 웹 폰트 변경</web_h4>

![웹 폰트 변경]({{ site.google_drive }}1wJPMRBKT77DCekpcagAlxd5Ahy4YmtJu{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}

- 넥슨[배찌체], 네이버[부장님 눈치체], 한국교육학술정보원[학교 안심 봄방학체], 구글 폰트[Whisper, WindSong] 폰트를 사용하였습니다.
- 폰트를 바꿈으로서 분위기를 환기하였습니다.

<br>

### <web_h3>제작 후 폐기된 코드들</web_h3><red1_error> (전체 제작 기여도: 100%)</red1_error>

가독성에 이유로 다음과 같은 코드들이 폐기되었습니다.

1. 백그라운드에서 유성이 떨어지는 효과가 폐기되었습니다.
2. 마우스를 쫒차다니면서 시간을 알려주던 효과가 폐기되었습니다.


<br>

#### <web_h4>7) 백그라운드 유성 효과</web_h4>

![유성 효과]({{ site.google_drive }}1nJaErEEOcZOi2bR5ZdwA7QyiiHLi-kCF{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}

- JavaScript를 사용하여 동적으로 유성이 떨어지는 효과를 제작하였습니다.
- HTML + SCSS를 유성을 만들었습니다.

<br>

#### <web_h4>8) 마우스를 따라 다니는 시계 효과</web_h4>

![마우스를 따라 다니는 시계 효과]({{ site.google_drive }}1fPY3vhUusIWtjalKpuLCnZomHraqlYbM{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}

- JavaScript를 사용하여 마우스 위치찾아서 시계가 따라다니는 효과를 제작하였습니다.


<br>
<br>

## <web_h2> 프로그래밍 로직 및 파일 구조 </web_h2>

![웹페이지 구조]({{ site.google_drive }}10UrW2c4mn_YSR_bZ9kh1X2ZEsz9FB4Qd{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}

- 머리속에 있는 프로그래밍 로직 구조를 도식화 시킨 그림입니다.

<br>
<br>

## <web_h2> 결과(성과) 및 데모 </web_h2>

![깃허브블로그 평가]({{ site.google_drive }}1QJ617PH-_g2y71uz4FUDYXht1VbCtEKX{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}

- <span><web_h5>성과:</web_h5> 웹 페이지 PC 버전 및 모바일 버전 제작 </span>
- <span><web_h5>깃 허브(코드):</web_h5> [https://github.com/kj1241/kj1241.github.io](https://github.com/kj1241/kj1241.github.io)</span>

<br>
<br>

## <web_h2> 비고 및 여담 </web_h2>

- <span><web_h5>깃 허브 블로그로 옮긴 이유:</web_h5></span>
    - 티스토는 UI부터 초보자가 사용하기 좋은 사이트임에는 틀림없지만, 원하는대로 만들수 없는 사이트이기 때문에 저의 니즈를 충족시키지 못하여서 옮기게 되었습니다.

- <span><web_h5>깃 허브 제작시 트러블 슈팅:</web_h5></span>
    - jekyll에서 _Page폴더를 만들고 내용을 읽어 올 수 없습니다. 따라서 pages라는 폴더로 만들었습니다.
    - 구글 이미지 호스팅 주소가 변경됨에 따라 주소를 변경하고 매크로를 제작하였습니다.

<br>

### <green1_h3> 배운 점 및 앞으로 수정할 점 </green1_h3>

- Ruby와 jekyll를 사용해서 어떻게 테마를 제작는지 학습하는 시간이 되었습니다.
- 나중에 여유가 된다면 반응형 디자인으로 모바일도 지원할 계획이 있습니다. (완료)
- 백그라운드 애니메이션과 마우스 이펙트 효과를 주고 싶습니다. (폐기)

