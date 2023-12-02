---
layout: post
title:  "Jekyll를 이용해서 github blog 만들기 2 세부 설정 팁"
date:   2023-12-02 17:45:04 +0900
image: https://github.com/kj1241/kj1241.github.io/assets/22047442/70e7a792-5510-4ff2-9f43-78775645a30e
toc: true
categories: [Web]
tags: [Jkeyll, Ruby, HTML, SCSS, Java Script, Git Hub Blog ]
addsence: true
description: 단순히 Git Hub Blog 제작을 위해서 만들어진 테마를 Fork를 이용하여 제작하는 것이 아닌 Jekyll + Ruby + HTML + SCSS + Java Script를 사용하여 제작하는 방법을 설명하고 있습니다. 세부 설정하는 방법에 대해서 고민하고 있습니다.
---


앞서서는 기본적으로 Jekyll를 설치하고 초기 블로그를 화면을 구성하는 방법을 설명하였습니다.  
그럼 이제 블로그를 어떻게 만드는지 고민해 봅시다.  
이론을 모르기 때문에 제 경험으로 설명해 보겠습니다.

<br>

---

<br>

## <blue1_h2> 1. 프로그래밍 언어 용도 </blue1_h2>

Jekyll, Ruby, HTML, SCSS, Java Script 의도치 않게 5개의 언어를 사용하게 되었습니다.  
프로그래밍이란 정말 다양한 방법이 있기 때문에 생각보다 더욱 폭넓게 코드를 작성 할 수 있습니다.  
그렇기 때문에 개개인마다 코드를 작성하는 방법이 틀립니다.  
저의 경우를 이야기 해보겠습니다.  

<br>
<br>

## <blue1_h2> 2. Jekyll </blue1_h2>
Jekyll은 정적 웹사이트를 생성하는데 사용되는 오픈 소스 프로그램입니다.  
Ruby 언어로 작성되었으며, Markdown이나 HTML과 같은 마크업 언어를 사용하여 콘텐츠를 작성하면 Jekyll이 해당 콘텐츠를 정적 웹사이트로 변환해 줍니다. 

<br>

### <blue1_h3> 1) Jekyll 특성 </blue1_h3>

- yml을 이용하여 정적 변수를 만들 수 있습니다. 
- Front은 jekyll 페이지나 포스트의 상단에 위치한 YAML 형식의 메타데이터 블록입니다.



<br>

### <blue1_h3> 2) Jekyll 디렉토리 구조 </blue1_h3>


```
.
|-- _config.yml
|-- _data
|-- _includes
|-- _layouts
|-- _posts
|-- _sass
|-- _site
|-- assets
|   |-- css
|   |-- images
|   |-- js
|-- _drafts
|-- _pages
|-- _plugins
|-- _collections
|-- index.html (또는 index.md)
|-- about.md
|-- ...

```

- _config.yml: Jekyll 설정 파일 및 전역 변수는 저장하고 있습니다.
- _data: YAML 파일을 저자하고 전반적인 데이터 구조를 저장하고 있습니다.
- _includes: 페이지나 레이아웃에서 재사용할 수 있는 템플릿을 저장하고 있습니다.
- _layouts: 템플릿 레이아웃 파일을 저장하는 디렉토리.
- _posts: 블로그 포스트를 저장하는 디렉토리입니다.
- _sass: Sass 파일을 저장하는 디렉토리입니다.
- _site: Jekyll에 의해 생성된 정적 사이트가 여기에 저장됩니다. 자동으로 생깁니다.
- assets: 이미지, 스타일시트, 자바스크립트 파일과 같은 정적 자산을 저장하는 디렉토리 입니다.
    - assets/css: CSS 파일 저장합니다.
    - assets/images: 이미지 파일 저장합니다.
    - assets/js: 자바스크립트 파일 저장합니다.
- _drafts: 아직 발행되지 않은 초안(드래프트)을 저장하는 디렉토리 입니다.
- _pages: 추가 페이지를 저장하는 디렉토리 입니다.  => 안되서 pages라는 폴더를 만듬
- _plugins: Jekyll 플러그인을 저장하는 디렉토리입니다.
- _collections: 컬렉션과 관련된 파일을 저장하는 디렉토리입니다.
- index.html (또는 index.md): 기본 홈페이지 사이트의 첫페이지 입니다.
- about.md: 깃허브 소개 페이지 입니다.


<br>
<br>

## <blue1_h2> 3. Ruby </blue1_h2>

- Jekyll를 사용하기 위한 언어입니다.


<br>

### <blue1_h3> 1) Liquid </blue1_h3>
- 루비 기반 템플릿 언어로 Jekyll의 동적콘텐츠를 생성하기 위해 사용됩니다.
- 기능 은 다음과 같습니다.

    - 변수 출력 
    page, site, content, data와 같은 객체들을 불러올 수 있습니다.

    ```liquid
        {% raw %}
        {{ page.tag }}
        {% endraw %}
    ```

    - if 문 
    
    ```liquid
        {% raw %}
        {% if page.title == "tag" %}
            Welcome, Admin!
        {% endif %}
        {% endraw %}
    ```

    - for문

    ```liquid
        {% raw %}
        {% for post in site.posts %}
            {{ post.title }}
        {% endfor %}
        {% endraw %}
    ```

    - 필터

    ```liquid
        {% raw %}
        {{ "Hello World" | downcase }}
        {% endraw %}
    ```

    - 다른 html 포함

    ```liquid
        {% raw %}
        {%- include header.html -%}
        {% endraw %}
    ```



   
<br>

### <blue1_h3> 2) 플러그인 제작 </blue1_h3>

_plugins 폴더에다 루비로 제작한 커스텀 플러그인을 넣으면 됩니다.


```ruby

{% raw %}
module Jekyll
  class CustomTag < Liquid::Tag
    def initialize(tag_name, text, tokens)
      super
      @text = text
    end

    def render(context)
      @text.upcase
    end
  end
end

Liquid::Template.register_tag("custom_tag", Jekyll::CustomTag)
{% endraw %}

```

<br>


```liquid

{% raw %}
---
layout: default
title: Plugin Test
---

{%- custom_tag "hello, world!" -%}
{% endraw %}

```

이 예시는 custom_tag라는 Liquid 태그를 정의하고 해당 테그가 사용되면 대문자로 바꿔줍니다.

<br>
<br>

## <blue1_h2> 4. HTML (HyperText Markup Language) </blue1_h2>

- HTML은 웹페이지의 구조를 정의하기 위해 사용되는 마크업 언어입니다.
- 웹 페이지를 렌더링하고 표현하는데 사용됩니다. 


<br>

### <blue1_h3> 1) 모바일 구조를 생각하지 말자 </blue1_h3>

네이버 페이지도 모바일 친화적인 웹디자인 바뀌는 시기에 이상한 이야기를 한다고 생각하시는 분들이 있을 것입니다.  
물론 저도, 깃허브 블로그를 제작할 당시에는, 처음부터 모바일 디자인 생각해서 한번에 코드를 작성하긴 했습니다.  
하지만 저는 예전에 티스토리 스킨을 작성할때 이미 연습해보기도 했습니다.  
처음 웹 페이지를 제작하시는 분들은 깊게 들어가지 마시고 웹 페이지를 제작하시고, 어떻게 바꿀 것인지 고민한다면 더 좋은 프론트 엔드 디자이너가 될 수 있다고 생각합니다.  



<br>

### <blue1_h3> 2) HTML 구조 </blue1_h3>
![HTML 구조](https://github.com/kj1241/kj1241.github.io/assets/22047442/70e7a792-5510-4ff2-9f43-78775645a30e){: width="100%" }
*HTML 구조*

html 구조를 분리하는 이유는 중복된 코드를 템플릿으로 제작해서 한번에 관리하기 위함입니다.  



<br>
<br>

## <blue1_h2> 5. SCSS (Sassy CSS) </blue1_h2>

- SCSS는 CSS의 확장된 형태로, 변수, 중첩 규칙, import 등과 같은 기능과 편의성을 제공합니다.
- SCSS 파일은 컴파일러를 통해 일반적인 CSS 파일로 변환됩니다.


<br>

### <blue1_h3> 1) SCSS 구조 분리 </blue1_h3>

가장 최하위 파일은 assets 폴더에있는 main.scss 파일입니다.


```html

{% raw %}
<!--head--> 
<link rel="stylesheet" href="{{ '/assets/main.css' | relative_url }}">
{% endraw %}

```
<br>

```scss

{% raw %}
// main.css
---
# Only the main Sass file needs front matter (the dashes are enough)
---

@import "KJ";
{% endraw %}

```

head.hmtl에서 가장 기본이되는 /assets/main.css 정의되 있음을 알려줍니다.  
그 다음 연결되있는 파일은 KJ(테마 이름).scss 파일입니다.   
KJ 파일에는 모든 html 템플릿에서 사용될 수 있는 변수들을 모아놨습니다.  

```scss
{% raw %}
// Import partials.
@import
  "KJ/_default.scss",
  "KJ/_side-bar/_left.scss",
  "KJ/_side-bar/_right.scss",
  "KJ/_head/_header.scss",
  "KJ/_home.scss",
  "KJ/_page.scss",
  "KJ/_post.scss",
  "KJ/_post-bookmark.scss",
  "KJ/_footer.scss",
  "KJ/_user-style.scss";
{% endraw %}

```

그 후 각자 html 파일과 css 파일이 매칭 될 수 있도록 제작하였습니다.  
특별한 건 존제하지 않습니다. 여러분이 생각하는데로 파일 구조를 제작하시면 됩니다.  


<br>
<br>

## <blue1_h2> 6. Java Script </blue1_h2>

- JavaScript는 웹 페이지를 이벤트를 동작시키는데 사용됩니다. 
- 다양한 브라우저에 지원됨으로 범용적으로 사용됩니다. 
  
<br>

### <blue1_h3> 1) 사이드 바 TOC 만들기 </blue1_h3>

이벤트를 만들어야 함으로 자바 스크릅트를 이용하여 목차를 제작하였습니다.

```java

{% raw %}
document.addEventListener("DOMContentLoaded", function () {
    var pageTitle = "{{ page.toc }}";
    var tocContainer = document.getElementById("toc_container");
    var headings = document.querySelectorAll('h2, h3');

    if (headings.length > 0 && pageTitle) {
        var tocList = document.createElement('ul');
        var tocTitle = document.createElement('dl');
        tocTitle.textContent = "TOC";
        tocList.appendChild(tocTitle);


        headings.forEach(function (heading) {

            var listItem = document.createElement('li');
            var link = document.createElement('a');
            link.textContent = heading.textContent;
            link.setAttribute('href', '#' + heading.id);
            listItem.appendChild(link);
            //에러가 어디있나했더니 대문자에서 망했네
            if (heading.tagName === 'H2') {
                //listItem.classList.add("tag_list_h2");
                listItem.setAttribute('id', "tag_list_h2");
            }
            else if (heading.tagName === 'H3') {
                //listItem.classList.add("tag_list_h3");
                listItem.setAttribute('id', "tag_list_h3");
            }

            tocList.appendChild(listItem);
            // 섹션으로 스크롤하는 클릭 이벤트 리스너 추가
            link.addEventListener('click', function (event) {
                event.preventDefault(); // 링크의 기본 동작 방지
                var targetId = heading.id;
                var targetElement = document.getElementById(targetId);
                window.scrollTo(0, heading.getBoundingClientRect().top + window.scrollY); //어우 아이디 입력못받아서 드디어 만들었네
            });
        });
        tocContainer.appendChild(tocList);
    }
});
{% endraw %}

```

markdown 포스트의 h2, ##  혹은  h3, ### 인식하면 li리스트로 넣는 코드를 작성하였습니다.  
그 후 그 글을 누르게 되면 해당되는 스크롤 위치로 이동하게 만들었습니다.  


<br>

### <blue1_h3> 2) 홈 화면 슬라이더 애니메이션 제작 </blue1_h3>

홈 화면의 슬라이더 애니메이션 제작하여 화면이 움직 일 수 있게 제작하였습니다.

```java

{% raw %}
var slideIndex = 0;
showSlides();

function showSlides() {
  var i;
  var slides = document.getElementsByClassName("slides_list");
  for (i = 0; i < slides.length; ++i) {
    slides[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > slides.length) {
    slideIndex = 1;
  }
  slides[slideIndex - 1].style.display = "block";
  setTimeout(showSlides, 5000); // 이미지가 5초마다 전환되도록 설정 (milliseconds 단위)
}

function plusSlides(n) {
    clearTimeout(timer);
    showSlides(slideIndex += n);
  }
  
  function currentSlide(n) {
    clearTimeout(timer);
    showSlides(slideIndex = n);
  }
{% endraw %}

```

<br>

---

<br>

이 처럼 본인이 변경하고 싶은 영역을 생각하고 해당하는 언어를 만지면 쉽게 블로그를 개조 할 수 있을 것입니다.  
다음 편에는 블로그를 제작하면서 황당했던 에러와 블로그 글을 작성하면서 나름 소소한 팁(?)으로 가져오겠습니다.  
