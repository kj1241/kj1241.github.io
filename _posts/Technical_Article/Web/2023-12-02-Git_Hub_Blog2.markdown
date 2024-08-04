---
layout: post
title: "Jekyll를 이용해서 GitHub blog 만들기 2 - 언어별 용도"
date: 2023-12-02 17:45:04 +09:00
image: https://drive.google.com/thumbnail?id=1cgQdmRjbkLnICVlV7E0FZx8Q7_icG0VC
toc: true
categories: [Web]
keywords: Jkeyll, Ruby, HTML, SCSS, Java Script, GitHub Blog, Liquid, 플러그인 제작, 목차 제작, TOC
addsence: true
lastmod: 2024-08-03 16:24:00 +09:00
sitemap:
  changefreq : daily
  priority : 1.0
excerpt: 이 글은 Jekyll을 사용하여 블로그를 제작하는 과정을 경험을 바탕으로 설명합니다. Jekyll, Ruby, HTML, SCSS, JavaScript 등 다양한 기술을 활용하여 블로그를 만드는 방법을 다루며, 코드 작성 방법과 각 언어 및 도구의 활용법에 대한 경험을 공유합니다.
related_links:
    - url: /web_tp/Git_Hub_Blog_Skin.html
    - url: /web/Git_Hub_Blog1.html
    - url: /web/Git_Hub_Blog3.html
    - url: /web/Git_Hub_Blog4.html
---

앞서서는 기본적으로 Jekyll을 설치하고 초기 블로그 화면까지 구성하는 방법을 설명하였습니다. 생각보다 제가 이론에 정통한 사람이 아니라서 딱히 이론적으로는 어떻게 만드는지는 도와드릴 수는 없을 것 같습니다. 저 같은 경우에는 머릿속으로 이미지를 상상하고 코딩을 작성합니다. 대신 에러나 궁금한 점이 있다면 같이 해결해 줄 수는 있습니다.
따라서 이번 챕터에서는 경험을 적어 보도록 하겠습니다.

<br>

---

<br>

## <web_h2>1. 프로그래밍 언어 용도 </web_h2>

Jekyll을 사용하여 정적 깃 허브 블로그 템플릿을 제작하게 되면 의도치 않게 5개의 언어를 사용하게 됩니다. 프로그래밍이란 정말 다양한 방법이 있기 때문에 생각보다 더욱 여러 방향으로 코드를 작성할 수 있습니다. 그래서 개인마다 코드를 작성하는 방법이 다릅니다.
저는 기본만 알면 무엇이든지 만들 수 있다고 생각합니다. 저의 블로그를 보면서 대략 이야기해 보겠습니다.

![레파지토리 생성]({{ site.google_drive }}1cgQdmRjbkLnICVlV7E0FZx8Q7_icG0VC{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}

실제로 깃 허브 블로그 테마를 작성하면서 머릿속으로 담았던 구조입니다. 제가 깃 허브 블로그를 만들었을 때 머릿속에 담았던 파일 구조입니다. 그럼 이 구조를 보고 하나씩 살펴보도록 합시다.

<br>
<br>

## <web_h2>2. Jekyll </web_h2>

Jekyll은 정적 사이트 생성기(Static Site Generator)로, Ruby 언어로 작성된 오픈 소스 프레임워크입니다. Jekyll은 마크다운(Markdown)과 Liquid 템플릿 엔진을 사용하여 웹사이트를 생성합니다.
Jekyll을 사용하면 마크다운 파일을 작성하고, 이를 HTML 파일로 변환하여 웹사이트를 만들 수 있습니다. 이는 동적인 서버가 아닌 정적인 파일로 웹 사이트를 생성하기 때문에 빠르고 안정적입니다.

<br>

### <web_h3>1) Jekyll 특성 </web_h3>

- 다양한 플러그인을 지원하여 기능을 확장할 수 있습니다. 이를 통해 이미지 압축, 자동화, SEO 최적화 등의 작업을 자동화하고 개선할 수 있습니다.
- yml을 이용하여 정적 변수들을 만들고 렌더링할 수 있습니다. (Front Matter는 Jekyll 페이지나 포스트의 상단에 있는 YAML 형식의 메타데이터 블록입니다.)
  
위의 Front Matter는 대략 설명해서 와닿지 않을 수도 있습니다. Jekyll 위에 YAML 형식의 메타데이터가 있습니다. 이 메타데이터 블록은 해당 페이지나 포스트에 대한 정보를 정의합니다. 그리고 Jekyll은 이를 처리하고 렌더링합니다.

#### **<web_h4>Front Matter:</web_h4>**

```

---
layout: post
title: "첫 번째 포스트"
date: 2024-03-16 10:00:00 +0900
categories: [Jekyll, Tutorial]
tags: [static site generator, YAML, Front Matter]
permalink: /:title/
---

```

위의 예제를 Font Matter라고 부릅니다. Jekyll을 사용하기 때문에 정의할 수 있는 파트입니다.

<br>

### <web_h3>2) Jekyll 디렉터리 구조 </web_h3>

Jekyll에서 필수적으로 필요한 디렉터리는 맨 앞에 언더바(_)로 이름이 정의되어 있고, 제가 직접 만든 디렉터리는 언더바를 사용하지 않았습니다. 그럼 저의 블로그의 Jekyll 디렉터리 구조를 한번 보도록 합시다.

#### **<web_h4>Jekyll 디렉터리:</web_h4>**

```

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
- _data: YAML 파일을 저장하고 전반적인 데이터 구조를 저장하고 있습니다.
- _includes: 페이지나 레이아웃에서 재사용할 수 있는 템플릿을 저장하고 있습니다.
- _layouts: 템플릿 레이아웃 파일을 저장하는 디렉터리.
- _posts: 블로그 포스트를 저장하는 디렉터리입니다.
- _sass: Sass 파일을 저장하는 디렉터리입니다.
- _site: Jekyll에 의해 생성된 정적 사이트가 여기에 저장됩니다. 자동으로 생깁니다.
- assets: 이미지, 스타일 시트, 자바스크립트 파일과 같은 정적 자산을 저장하는 디렉터리 입니다.
- assets/css: CSS 파일 저장합니다.
- assets/images: 이미지 파일 저장합니다.
- assets/js: 자바스크립트 파일 저장합니다.
- _drafts: 아직 발행되지 않은 초안(드래프트)을 저장하는 디렉터리 입니다.
- _pages: 추가 페이지를 저장하는 디렉터리 입니다. => 안돼서 pages라는 폴더를 만들었습니다.
- _plugins: Jekyll 플러그인을 저장하는 디렉터리입니다.
- _collections: 컬렉션과 관련된 파일을 저장하는 디렉터리입니다.
- index.html (또는 index.md): 기본 홈페이지 사이트의 첫 페이지 입니다.
- about.md: 깃 허브 소개 페이지입니다.

<br>
<br>

## <web_h2> 3. Ruby </web_h2>

Ruby는 동적 프로그래밍 언어로, 객체지향 프로그래밍 언어입니다. Jekyll은 이 루비 언어를 기반으로 작성된 정적 사이트 생성기(Static Site Generator)입니다. 정적 사이트 생성기는 웹사이트를 생성할 때 서버에 동적으로 처리되는 것이 아니라, 미리 웹페이지를 생성하여 그것을 제공하는 방식을 사용합니다.

이는 보다 안정적이고 빠른 웹사이트를 만들 수 있게 해주며, 특히 개인 블로그나 간단한 프로젝트용 웹사이트를 운영할 때 적합합니다.

<br>

### <web_h3>1) Liquid </web_h3>

Liquid는 루비 기반의 템플릿 언어로, 주로 웹 템플릿을 동적으로 생성하기 위해 사용됩니다. 주로 Jekyll과 같은 정적 사이트 생성기에서 템플릿을 작성하는 데 사용됩니다. Liquid는 간단하고 읽기 쉽게 설계되어 있으며, 다양한 템플릿 엔진에서 사용될 수 있습니다.
기능은 다음과 같습니다.
 
#### **<web_h4>liquid 변수:</web_h4>**
  
```liquid
    {% raw %}
    {{ page.tag }}
    {% endraw %}
```

변수 출력: page, site, content, data와 같은 객체들을 불러올 수 있습니다.

#### **<web_h4>liquid if:</web_h4>**

```liquid
    {% raw %}
    {% if page.title == "tag" %}
        Welcome, Admin!
    {% endif %}
    {% endraw %}
```

if 문으로 프로그램 분기를 줄 수 있습니다.

#### **<web_h4>liquid for:</web_h4>**
  
```liquid
    {% raw %}
    {% for post in site.posts %}
        {{ post.title }}
    {% endfor %}
    {% endraw %}
```

for 문 비슷한 동작을 여러 번 돌릴 수 있습니다.

#### **<web_h4>liquid 필터:</web_h4>**

```liquid
    {% raw %}
    {{ "Hello World" | downcase }}
    {% endraw %}
```

필터로서 문자열을 소문자로 만들 수 있습니다.

#### **<web_h4>liquid html 포함:</web_h4>**

```liquid
    {% raw %}
    {%- include header.html -%}
    {% endraw %}
```

header 디렉터리에 있는 html 파일을 자신의 html 파일 안에 포함할 수 있습니다. 따라서 html 파일로 일종에 템플릿을 만들 수 있습니다.

위와 같이 이러한 Liquid의 특징들은 Jekyll을 비롯한 많은 웹사이트 및 웹 애플리케이션에서 사용되며, 간편한 문법과 다양한 기능으로 유용하게 활용됩니다.
   
<br>

### <web_h3>2) 플러그인 제작</web_h3>

Ruby Jekyll 플러그인은 Jekyll 정적 사이트 생성기를 확장하고 추가 기능을 제공하기 위해 개발된 Ruby 코드의 모음입니다. Jekyll은 유연한 플러그인 아키텍처를 갖추고 있어, 사용자가 필요에 따라 플러그인을 작성하여 Jekyll의 기능을 확장할 수 있습니다. _plugins 폴더에다 루비로 제작한 커스텀 플러그인을 넣으면 됩니다.

#### **<web_h4>ruby:</web_h4>**

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

루비는 다음과 같이 작성할 수 있습니다. 그럼 Jekyll에서는 어떻게 사용해야 하는지 예제를 보여 드리겠습니다.

#### **<web_h4>liquid:</web_h4>**

```liquid
{% raw %}
---
layout: default
title: Plugin Test
---

{%- custom_tag "hello, world!" -%}
{% endraw %}
```

이 예시는 custom_tag라는 Liquid 태그를 정의하고 해당 태그가 사용되면 대문자로 바꾸는 예제입니다.

<br>
<br>

## <web_h2>4. HTML (HyperText Markup Language)</web_h2>

Jekyll의 HTML이란 Jekyll이 생성하는 웹 페이지의 HTML 코드를 가리킵니다. Jekyll은 마크다운(Markdown)과 같은 간단한 마크업 언어를 사용하여 콘텐츠를 작성하고, 이를 HTML로 변환하여 최종적으로 웹 페이지를 생성합니다.

- HTML은 웹페이지의 구조를 정의하기 위해 사용되는 마크업 언어입니다.
- 웹 페이지를 렌더링하고 표현하는 데 사용됩니다.

<br>

### <web_h3>팁: 모바일 구조를 생각하지 말자 </web_h3>

위의 주제는 처음 블로그를 작성하시는 분들을 위해 특별히 작성하였습니다.
네이버 홈페이지는 모바일 친화적인 UI 디자인으로 바뀌었습니다. 최신 트렌드는 모바일 친화적인 웹디자인입니다만 처음 웹 페이지를 제작하시는 분들은 모바일 구조를 생각하지 않는 게 좋습니다.
저도 깃허브 블로그를 제작할 당시에는, 처음부터 모바일 디자인을 생각해서 코드를 작성하지는 않았습니다. 여러 번 PC 버전을 통해서 디버깅하고 바꾸고 했습니다.
깊게 생각하지 마시고 머릿속 구조대로 차근차근 제작하시다 보면 어느새 여러분만의 블로그를 제작할 수 있을 것입니다.

<br>
<br>

## <web_h2> 5. SCSS (Sassy CSS) </web_h2>

JJekyll의 SCSS는 Jekyll 프로젝트에서 Sass(Syntactically Awesome Style Sheets)를 사용하는 것을 의미합니다. SCSS는 Sass의 확장된 문법으로, CSS를 더욱 간결하고 유연하게 작성할 수 있도록 돕는 스타일 시트 언어입니다.
Jekyll은 기본적으로 SCSS를 지원하며, 이를 사용하여 웹사이트의 스타일을 정의할 수 있습니다. SCSS를 사용하면 다음과 같은 이점이 있습니다.

- SCSS는 CSS의 확장된 형태로, 변수, 중첩 규칙, import 등과 같은 기능과 편의성을 제공합니다.
- SCSS 파일은 컴파일러를 통해 일반적인 CSS 파일로 변환됩니다.

<br>

### <web_h3>1) SCSS 구조 분리 </web_h3>

SCSS를 사용하여 스타일 시트를 구조적으로 분리하는 것은 유지보수성과 코드의 가독성을 향상하는 데 도움이 됩니다. 일반적으로 큰 프로젝트에서는 스타일 시트를 여러 파일로 분리하여 각 요소 및 모듈을 별도로 관리하는 것이 좋습니다. 이를 위해 주로 다음과 같은 방법을 사용합니다. 가장 최하위 파일은 assets 폴더에 있는 main.scss 파일입니다.

#### **<web_h4>SCSS 구조:</web_h4>**

```

|-- KJ/
|   |-- _head.scss
|   |   |-- _header.scss
|-- |   _side-bar/
|   |   |-- _left.scss
|   |   |-- _right.scss
|   |-- _default.scss
|   |-- _footer.scss
|   |-- _home.scss
|   |-- _page.scss
|   |-- _post_bookmark.scss
|   |-- _post.scss
|   |-- _syntax-highlighting.scss
|-- KJ.scss
|-- main.scss

```

저의 블로그 같은 경우에는 위의 구조로 SCSS 파일들이 구조화되어 있습니다.

#### **<web_h4>html:</web_h4>**

```html
  {% raw %}
  <!--head--> 
  <link rel="stylesheet" href="{{ '/assets/main.css' | relative_url }}">
  {% endraw %}
```

이 코드는 HTML 문서에서 외부 스타일 시트를 불러오는 링크를 설정하는 데 사용됩니다. HTML 문서에서 main.css라는 스타일 시트를 불러오는 링크를 설정합니다. Jekyll과 같은 정적 사이트 생성기에서 사용되며, 상대 경로를 사용하여 파일을 참조합니다.

#### **<web_h4>scss:</web_h4>**


```scss
{% raw %}
// main.css
---
# Only the main Sass file needs front matter (the dashes are enough)
---

@import "KJ";
{% endraw %}
```

head.html에서 가장 기본이 되는 /assets/main.css 정의되어 있음을 알려줍니다. 그다음 연결되어 있는 파일은 KJ(테마 이름).scss 파일입니다. KJ 파일에는 모든 HTML 템플릿에서 사용될 수 있는 변수들을 모아놨습니다.

#### **<web_h4>scss:</web_h4>**

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

그 후 각자 HTML 파일과 CSS 파일이 매칭될 수 있도록 제작하였습니다. 특별한 건 존재하지 않습니다. 여러분이 생각하는 대로 파일 구조를 제작하시면 됩니다.

<br>
<br>

## <blue1_h2> 6. Java Script </blue1_h2>

JavaScript는 웹 페이지를 이벤트를 동작시키는 데 사용됩니다. 이 말은 JavaScript를 사용하여 웹사이트의 동적인 요소를 구현하거나 사용자와의 상호 작용을 향상할 수 있습니다. 다양한 브라우저에 지원됨으로 범용적으로 사용할 수 있습니다.
  
<br>

### <blue1_h3> 1) 사이드 바 TOC 만들기 </blue1_h3>

이벤트를 만들어야 하므로 자바스크립트를 이용하여 목차를 제작하였습니다.

#### **<web_h4>javascript:</web_h4>**

```javascript
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

markdown 포스트의 h2, ## 혹은 h3, ###를 인식하면 li 리스트로 넣는 코드를 작성하였습니다. 그 후 그 글을 누르게 되면 해당하는 스크롤 위치로 이동하게 하였습니다.


<br>

### <blue1_h3> 2) 홈 화면 슬라이더 애니메이션 제작 </blue1_h3>

홈 화면의 슬라이더 애니메이션을 제작하여 화면이 움직일 수 있게 제작하였습니다.

#### **<web_h4>javascript:</web_h4>**

```javascript
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

이처럼 본인이 변경하고 싶은 영역을 생각하고 해당하는 언어를 만지면 쉽게 블로그를 개조할 수 있을 것입니다. 다음 편에는 구글 검색엔진에 올려놓기 위해 수정해야 하는 사항과 SEO 최적화로 돌아오겠습니다. 읽어주셔서 감사합니다.