---
layout: post
title: "개발자 도구를 이용하여 분석하기(w. 티스토리 스킨)"
date: 2023-01-14 17:59:05 +09:00
image: https://drive.google.com/thumbnail?id=1Ab2WxHJ2Y7lgwkacQ8M7Pu4aJ-N0lRWM
toc: true
categories: [Web]
keywords: Web Fornt, Web Developer Tools, 티스토리 스킨
lastmod: 2024-04-03 19:01:00 +09:00
sitemap:
  changefreq : daily
  priority : 1.0
addsence: true
excerpt: 우리가 사용하고 있는 크롬, 엣지와 같은 인터넷에는 필수적으로 개발을 위해서 개발자 도구(F12)를 제공합니다. 이 글은 개발자 도루를 사용하여 HTML + CSS를 사용한 티스토리 스킨을 제작한 경험에 관해 이야기하고 있습니다.
related_links:
  - url: /web_tp/Tstory_Skin.html
---

제가 처음으로 쓰는 블로그에 관한 주제입니다. (사실 블로그보다는 웹 디버깅에 관한 내용입니다.) 우리가 사용하고 있는 크롬, 엣지와 같은 인터넷에는 필수적으로 개발을 위해서 개발자 도구(F12)를 제공합니다. 이 글은 개발자 도구를 사용하여 티스토리 스킨을 제작한 경험에 대해 이야기하고 있습니다.

<br>

---

<br>

## <web_h2>1. 리버스 엔지니어링</web_h2>

어떤 제품, 시스템, 소프트웨어, 또는 기술의 내부 동작 원리를 이해하고 분석하기 위해 사용되는 과정이나 기술입니다. 주로 제품이나 소프트웨어의 동작 원리, 디자인, 코드 등을 역으로 분석하여 이해하거나 수정하는 데 활용됩니다.
  
  
<p><red1_error>※주의사항:</red1_error> 이진 코드를 분석하지 않으면 불법은 아니지만 <red1_error>악용하면 불법</red1_error>이 될 수 있습니다.</p>  

<br>
<br>

## <web_h2>2. 개발자 도구(F12) </web_h2>

종종 웹 프런트 프로그래밍을 하다 보면, 벤치마킹한 웹들 혹은 다른 오픈 소스 파일을 사용하거나 협력 작업을 할 때, 코드 구조가 궁금해질 때가 있습니다. 이때 우리가 이용할 수 있는 강력한 도구가 있습니다.
  
바로 인터넷의 <web_h5>개발자 도구(F12)</web_h5>입니다.  
  
개발자 도구는 웹 브라우저에서 제공되는 도구 모음으로, 웹 페이지의 디버깅, 프로파일링, 테스팅 등을 위한 기능들을 포함하고 있습니다. 대부분 주요 웹 브라우저들은 자체적으로 개발자 도구를 내장하고 있습니다. 이 도구들은 웹 개발자가 웹 애플리케이션을 개발하고 디버깅하는 데 도움을 주는 다양한 기능을 제공합니다.
  
또한, 개발자 도구의 강력한 기능은, 디버깅을 사용할 때뿐만 아니라, HTML+CSS+JS 정보 및 구조 코드를 편하게 알 수 있게 하여 줍니다.

<br>
<br>

## <web_h2>3. 티스토리에서의 개발자 도구 적용</web_h2>

티스토리 스킨을 구성하고 제작하기 위해서, HTML + CSS 코드를 작성하다 보면, 티스토리에서 제공하는 API 안에 바꿀 수 있는 코드가 숨겨져 있는 경우도 있습니다. 
  
이러한 알 수 없는 코드를 찾을 때, 가장 확실한 방법은 <web_h5>담당자한테 문의</web_h5>하는 것입니다. 하지만 '담당자를 알지 못하고 인터넷으로  문의했을 때 1주일 넘겨서 대답을 받을 수 있을 거 같다.'라고 생각되는 경우 빠르게 개발자 도구를 사용해서 해당 API를 찾는 것입니다.  

<br>

### <web_h3>티스토리 사이드바 광고 API 찾기<web_h3>

구글 애드센스를 통해서 광고를 직접 부착하는 방법이 있습니다. 물론 이런 방법을 사용할 수 있지만, 다른 사람들도 사용할 수 있는 테마를 제작하려면 구글 애드센스를 사용하지 못하는 사람들도 고려해야 합니다. 처음 테마를 제작해서 광고를 노출하려는 입장에서는, 티스토리가 제공하는 광고 사이드바 API를 알 수가 없었습니다.
  
따라서 티스토리 테마에 적용하기 위해서는, 티스토리가 제공하는 광고 사이드바 API를 적용하고 있는 사이트를 찾습니다.  
그 후에는 궁금한 해당 위치를 <web_h5>마우스로 우클릭 - 검사</web_h5>를 두 번 눌러줍니다.  
(<red1_error>반드시</red1_error> <web_h5>두 번</web_h5> 눌러주세요.)
 
![광고 개발자 도구 검사]({{ site.google_drive }}1D8kXCK92yelXETEdTF1ZIwp9ys6GKkHa{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
  
웹 개발자 도구 코드가 이해가 안 가시면, 제가 깃 허브로 제공한 HTML + CSS 코드와 개발자 도구(F12)에서 변형된 코드를 비교해서 보신다면 쉽게 HTML 구조에 관해서 이해하실 수 있으실 것입니다.
  
티스토리가 제공하는 광고 사이드바 API 구문은 다음과 같습니다.  

#### **<web_h4>html:</web_h4>**

```html

<!--HTML 코드입니다-->
<s_sidebar>
<!-- 이 사이가 T스토리 사이드바 콘텐츠 부착-->
</s_sidebar>

```

위의 html 코드를 스킨에 작성하고, 티스토리에서 관리에 들어가서 사이드바 광고를 적용 시킬 수 있습니다.

![광고 적용된 화면]({{ site.google_drive }}1Ab2WxHJ2Y7lgwkacQ8M7Pu4aJ-N0lRWM{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}

위와 같이 사이드바에 광고가 붙여진 것을 확인할 수 있습니다. 그러면 개발자 도구를 사용할 수 있는 다른 예를 확인해 보겠습니다. 

<br>

### <web_h3>티스토리에서 제공하는 에디터 스타일 변경하기</web_h3>

예시 한 개만 보시면 이해가 안될 수 있으니, 다른 예제를 보시도록 합시다. HTML을 이리저리 코드를 고쳐서 흰색 배경에서 검은 배경으로 바꿨다고 합시다. 그다음은 해야 할 일은 게시글을 작성하는 것입니다.
  
하지만 <red1_error>문제</red1_error>는 이곳에서 일어납니다. 티스토리 블로그 에디터 스타일은 전부 흰색 배경에 맞춰져 있기 때문에 일부 에디터에서 제공하는 스타일이 안 보여 질 수 있습니다. 예를 들어서 구분 선을 확인해 봅시다.

<br>

![T 스토리 구분선(흰색 배경-검은색 줄)]({{ site.google_drive }}1-LUL8KBC83oOzDxKyH24BPK8_cTqfR1g{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy" style="border: 3px solid #feffaa6b;"}
*<web_h6>T 스토리 구분선(흰색 배경-검은색 줄)</web_h6>*  

흰색 배경일 때에는 기본적으로 검은색 줄을 가지고 있으므로 잘 보이게 됩니다. 하지만 <web_h5>검은색 배경</web_h5>이라면 어떻게 될까요?  

<br>

![현실(검은색 배경-검은색 줄)]({{ site.google_drive }}1QrF7JmC8CEc7-puWCgOvNxWEW8uo7DIh{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy" style="border: 3px solid #feffaa6b;"}
*<web_h6>현실(검은색 배경-검은색 줄)</web_h6>*  

위의 그림처럼 티스토리에서 기본적으로 제공하는 구분선 검은색이기 때문에, html을 사용하여 검은색 배경과 합쳐지면 구분 선이 안 보이게 됩니다. 이것을 해결하기 위해서 자바스크립트를 이용해서 전체적인 색반전을 일으켜서 전체적인 색을 뒤집어 버릴 수도 있습니다.

#### **<web_h4>java:</web_h4>**

```java

a =255 - a 

```

위와 같은 원리를 사용하면 색반전을 일으킬 수 있습니다만, 위와 같은 방식은 단순히 문제를 <web_h5>회피</web_h5>하는 방법입니다. 개별적으로 세세하게 바꾸고 싶다면 개발자 도구를 이용해서 해당 속성의 아이디나 클래스를 추적하면 됩니다.  

![티스토리 에디터 속성 추적]({{ site.google_drive }}18QpLElSasbj6IE7hbjkDSq6B6T_euTw9{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}

개발자 도구를 사용해서, API를 추적하면 tt-body-page 속성 클래스를 얻으실 수 있습니다.  

#### **<web_h4>css:</web_h4>**

```css

/*CSS 코드입니다.*/
#tt-body-page hr[data-ke-style='style5'] {     
  height: 2px;
  color: #c4c4c4;  
  background-color: #c4c4c4;
  border: none;
}

```

위의 CSS 코드를 사용해서 입맛대로 에디터 스타일을 변경할 수 있습니다. 

<br>

![결과(검은색 배경-흰색 줄)]({{ site.google_drive }}1gv4scdKU0P03lalS62ByA01oVe0dfH07{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy" style="border: 3px solid #feffaa6b;"}
*<web_h6>css에서 색을 변경한 줄(검은색 배경-회색 줄)</web_h6>*  

CSS 코드를 사용해서 변경하게 되면 다음과 같이 티스토리에서 제공하는 선에 원하는 색을 부여할 수 있습니다.

<br>
<br>

## <web_h2>4. 끝으로</web_h2>

개발자 도구는 여러분이 상상하는 것보다 훨씬 강력합니다. 코드확인뿐만 아니라 크롤링, 자바스크립트확인 등 다양한 분야로 사용할 수 있습니다.
위의 예제처럼 만약 웹상에서 제공하는 API를 모르거나 궁금하실 경우, 개발자 도구를 사용하여 마음대로 ~~코드 스틸~~ <web_h5>벤치 마킹</web_h5>을 적용하시면 됩니다. 읽어주셔서 감사합니다.  
