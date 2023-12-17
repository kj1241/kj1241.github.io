---
layout: post
title:  "개발자 도구를 이용하여 분석하기(w. 티 스토리 스킨)"
date:   2023-01-14 17:59:05 +0900
image: https://drive.google.com/uc?export=view&id=1Ab2WxHJ2Y7lgwkacQ8M7Pu4aJ-N0lRWM
toc: true
categories: [Web]
tags: [Web Fornt, Web Developer Tools]
addsence: true
excerpt: 우리가 사용하고 있는 크롬, 엣지와 같은 인터넷에는 필수적으로 개발을 위해서 개발자 도구(F12)를 제공합니다. 이 글은 개발자 도루를 사용하여 HTML + CSS를 사용한 티스토리 스킨을 제작한 경험에 대해 서술하고 있습니다.
---

제가 처음 블로그 주제입니다.  
우리가 사용하고 있는 크롬, 엣지와 같은 인터넷에는 필수적으로 개발을 위해서 개발자 도구(F12)를 제공합니다.  
이 글은 개발자 도루를 사용하여 티스토리 스킨을 제작한 경험에 대해 서술하고 있습니다.  

<br>

---

<br>

## 리버스 엔지니어링

어떤 제품, 시스템, 소프트웨어, 또는 기술의 내부 동작 원리를 이해하고 분석하기 위해 사용되는 과정이나 기술입니다.   
주로 제품이나 소프트웨어의 동작 원리, 디자인, 코드 등을 역으로 분석하여 이해하거나 수정하는데 활용됩니다.  
  
  
<red1_error>※주의사항:</red1_error> 이진코드를 분석하지 않으면 불법은 아니지만 <red1_error>악용하면 불법</red1_error>이 될 수 있습니다.  

<br>
<br>

## 개발자 도구(F12) 

종종 웹 프런트 프로그래밍을 하다 보면, 벤치마킹한 웹들 혹은 다른 오픈소스 파일을 사용하거나 협력 작업을 할 때, 코드 구조가 궁금해질 때가 있습니다.  
이때 우리가 이용할 수 있는 강력한 도구가 있습니다.  
  
바로 인터넷의 개발자 도구(F12)입니다.
  
개발자 도구는 웹 브라우저에서 제공되는 도구 모음으로, 웹 페이지의 디버깅, 프로파일링, 테스팅 등을 위한 기능들을 포함하고 있습니다.  
대부분의 주요 웹 브라우저들은 자체적으로 개발자 도구를 내장하고 있습니다.  
이 도구들은 웹 개발자가 웹 애플리케이션을 개발하고 디버깅하는 데 도움을 주는 다양한 기능을 제공합니다.  
  
또한 개발자 도구의 강력한 기능은, 디버깅을 사용할 때뿐만 아니라, HTML+CSS+JS 정보 및 구조 코드를 편하게 알 수 있도록 만들어 줍니다.  

<br>
<br>

## 티스토리에서의 개발자 도구 적용


티스토리 스킨을 구성하고 제작하기 위해서, HTML + CSS 코드를 작성하다보면, 티스토리에서 제공하는 API안에 바꿀수 있는 코드가 숨겨져 있는 경우도 있습니다.  
  
이러한 알 수 없는 코드를 찾을 때, 가장 확실한 방법은 **담당자한테 문의**하는 것입니다.  
하지만 '담당자를 알지 못하고 인터넷으로 문의했을 경우 1주일 넘겨서 대답을 받을 수 있을 거 같다.'라고 생각되는 경우 빠르게 개발자 도구를 사용해서 해당 API를 찾는 것입니다.

<br>

### 티스토리 사이드바 광고 API 찾기

구글 에드센스를 통해서 광고를 직접 부착하는 방법이 있습니다.  
물론 이런 방법을 사용할 수 있지만, 다른 사람들도 사용할 수 있는 테마를 제작하려면 구글 에드센스를 사용하지 못하는 사람들도 고려해야 합니다.  
처음 테마를 제작해서 광고를 노출시키려는 입장에서는, 티스토리가 제공하는 광고 사이드바 API를 알 수가 없었습니다.  
  
따라서 티스토리 테마에 적용하기 위해서는, 티스토리가 제공하는 광고 사이드바 API를 적용하고 있는 사이트를 찾습니다.  
그 후에는 궁금한 해당 위치를 **마우스로 우클릭 - 검사**를 두번 눌러줍니다.  
(<error_red>반드시<error_red> 두번 눌러주세요.)
  
![광고 개발자 도구 검사](https://drive.google.com/uc?export=view&id=1D8kXCK92yelXETEdTF1ZIwp9ys6GKkHa){: width="100%"}
  
웹 개발자 도구 코드가 이해가 안가시면, 제가 깃허브로 제공한 HTML + CSS 코드와 개발자 도구(F12)에서 변형된 코드를 비교해서 보신다면 쉽게 HTML 구조에 관해서 이해 하실 수 있으실 것입니다.  
  
티스토리가 제공하는 광고 사이드바 API 구문은 다음과 같습니다.  


```html

<!--HTML 코드입니다-->
<s_sidebar>
<!-- 이 사이가 T스토리 사이드바 콘텐츠 부착-->
</s_sidebar>


```


위의 html 코드를 스킨에 작성하면, 티스토리에서 관리에 들어가서 사이드바 광고를 적용 시킬수 있습니다.  

![광고 적용된 화면](https://drive.google.com/uc?export=view&id=1Ab2WxHJ2Y7lgwkacQ8M7Pu4aJ-N0lRWM){: width="100%"}

위와 같이 사이드바에 광고가 붙인 것을 알 수 있습니다.  



<br>

### 티스토리에서 제공하는 에디터 스타일 변경하기

에졔 한개만 보시면 이해가 안될수 있으니, 다른 예제를 보시도록 합시다.  
HTML을 이리저리 코드를 개조해서 흰색 배경에서 검은 배경으로 바궜다고 합시다.  
그 다음은 해야 할 일은 게시글을 작성하는 것입니다.  
  
하지만 <error_red>문제</error_red>는 이곳에서 일어납니다.  
티스토리 블로그 에디터 스타일은 전부 흰색 배경에 마춰저 있기 때문에 일부 에디터에서 제공하는 스타일이 안보여 질 수 있습니다.  
예를 들어서 구분선을 확인해 봅시다.  

![T 스토리 구분선(흰색 배경-검은색 줄)](https://drive.google.com/uc?export=view&id=1-LUL8KBC83oOzDxKyH24BPK8_cTqfR1g){: width="100%"}
*T 스토리 구분선(흰색 배경-검은색 줄)*

![현실(검은색 배경-검은색 줄)](https://drive.google.com/uc?export=view&id=1QrF7JmC8CEc7-puWCgOvNxWEW8uo7DIh){: width="100%"}
*현실(검은색 배경-검은색 줄)*


티스토리에서 기본적으로 제공하는 구분선은 html 배경과 합쳐지면 구분선이 안보이게 됩니다.  

이것을 해결하기 위해서 자바스크립트를 이용해서 전체적인 색반전을 일으켜서 전체적인 색을 뒤집어 버릴수도 있습니다.  

```java

a =255 - a 

```

위와 같은 원리를 사용하면 색반전을 일으킬 수 있습니다만, 위와 같은 방식은 단순히 문제를 회피하는 방법입니다.  
개별적으로 세세하게 바꾸고 싶다면 개발자 도구를 이용해서 해당 속성의 아이디나 클래스를 추적하면 됩니다.  

![티스토리 에디터 속성 추적](https://drive.google.com/uc?export=view&id=18QpLElSasbj6IE7hbjkDSq6B6T_euTw9){: width="100%"}

개발자 도구를 사용하여 API를 추적하면 tt-body-page 속성 클래스를 얻으실수 있습니다.  

```css

/*CSS 코드입니다.*/
#tt-body-page hr[data-ke-style='style5'] {     
  height: 2px;
  color: #c4c4c4;  
  background-color: #c4c4c4;
  border: none;
}

```
위처럼 css 코드를 사용해서 입맛대로 에디터 스타일을 변경 할 수 있습니다.  

![결과(검은색 배경-흰색 줄)](https://drive.google.com/uc?export=view&id=1gv4scdKU0P03lalS62ByA01oVe0dfH07){: width="100%"}



## 마지막 말

위의 예제처럼 웹 상에서 제공하는 API를 모르거나 궁금하실 경우, 개발자 도구를 사용하여 마음대로 ~~코드 스틸~~ **벤치 마킹**을 적용하시면 됩니다.  
  
읽어주셔서 감사합니다.  




