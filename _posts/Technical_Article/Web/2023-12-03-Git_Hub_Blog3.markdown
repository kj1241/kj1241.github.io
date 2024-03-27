---
layout: post
title: "Jekyll를 이용해서 github blog 만들기 3 - 블로그 품질 올리기"
date: 2023-12-03 11:38:04 +0900
image: https://drive.google.com/thumbnail?id=1PAg7qqGcq268lTcFRqwgpXv6FQpvT5oF
toc: true
categories: [Web]
tags: [Jkeyll, Ruby, HTML, SCSS, Java Script, Git Hub Blog ]
keywords: Jkeyll, Ruby, HTML, SCSS, Java Script, Git Hub Blog 
addsence: true
excerpt: 단순히 Git Hub Blog 제작을 위해서 만들어진 테마를 Fork를 이용하여 제작하는 것이 아닌 Jekyll + Ruby + HTML + SCSS + Java Script를 사용하여 제작하는 방법을 설명하고 있습니다. 해당 과정은 블로그의 품질을 올리기위해 PageSpeed Insights와 Seo-tag 최적화하는 방법에 대해 설명하고 있습니다.
related_links:
    - url: /web_tp/Git_Hub_Blog_Skin.html
    - url: /web/Git_Hub_Blog1.html
    - url: /web/Git_Hub_Blog2.html
    - url: /web/Git_Hub_Blog4.html
---

앞서서는 Git Hub Blog에 제작된 언어별로 어떤 역확을 맞고 있는지 기초를 확인하였습니다. 그럼 이제 구글 검색엔진에 올리기 위해서 본격적으로, 구글 서치 콘솔의 PageSpeed Insights와 Seo-tag 최적화를 하기 위해 했던 예제를 작성해 보겠습니다.

<br>

---

<br>

## <web_h2>1. 깃 허브 블로그 완성하면 체크해야 될 일들</web_h2>

깃허브 블로그 완성했다고 해서 다 끝난게 아닙니다. 운영하기 위해서 처리해야될 일이 많습니다. 티스토리에서는 내부적으로 지원해주던 것들을 깃 허브 블로그는 전부 유저가 채크해 줘야 합니다. 그럼 한번 살펴 봅시다.

<br>
<br>

## <web_h2>2. 구글 PageSpeed Insights 성능 체크하기</web_h2>

구글에서 제공하는 블로그 품질을 객관적으로 채크해주는 사이트가 있습니다. 바로 <web_h5>PageSpeed Insights</web_h5> 입니다. 이 곳에 들어가서 문제되는 부분들을 수정하고 성능을 끌어 올리면 됩니다. 저의 경우를 보여 드리겠습니다.  

<br>

![구글 PageSpeed Insights 모바일 수정 전]({{ site.google_drive }}1wBp1ORGGsH0YpaYLmqICLzixncuPqLfq{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<web_h6>구글 PageSpeed Insights 모바일 수정 전</web_h6>*

<br>

![구글 PageSpeed Insights 데스크톱 전]({{ site.google_drive }}1uGhDSLZrCHQHwm7wdYbckGBey2szDTSJ{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<web_h6>구글 PageSpeed Insights 데스크톱 수정 전</web_h6>*


위의 사진이 제가 블로그를 처음 만들고 체크했던 성능 점수입니다. 100점 만점에 모바일은 97점으로 데스크톱은 99점으로 높은 점수이지만 마음에 안듭니다. 그럼 구글에서 부족하다는 부분을 고쳐보겠습니다.  

<br>

### <web_h3>1) 링크에 설명 텍스트가 없음  </web_h3>

위의 링크가 설명에 텍스트 없음은 seo-tag에 관해서 두가지 문제가 발생할때 경고가 나타납니다.

1. description이 존재하지 않기 떄문입니다.
2. alt 요소가 정확하지 않을 때 일어납니다. 

<br>

#### **<web_h4>html:</web_h4>**

```html
    {% raw %}
    <!--head-->
    ...
    {%- if page.description -%}
        <meta name="description" content="여기에 페이지의 간략한 설명을 입력합니다.">
    {%- else -%}
        <meta name="description" content= "{{ site.description }}">
    {%- endif -%}
    ...
    {% endraw %}
```
  
page마다 description을 추가 해주거나, 존재하지 않으면 _config.yml에 있는 description을 참조하게 설정 해줍니다.

<br>

#### **<web_h4>html:</web_h4>**

```html 
    {% raw %}
    <a herf ="uml"> {{ image.title | remove: ".webp" }}  자세히 보기 </a> 
    {% endraw %}
```
  
위의 처럼 중복되는 alt 요소를 중복되지 않게 바꿔줍니다.  
  
<br>

### <web_h3>2) 링크를 크롤링 할 수 없음</web_h3>

위의 제목으로 보면 보통은 robots.txt 인터넷 크롤러 접근에 관해서 문제가 있어보입니다. 하지만 문제는 a를 사용해서 하이퍼링크를 설정했지만 내용이 없기 때문에 일어난 문제입니다.

<br>

#### **<web_h4>html:</web_h4>**

```html
    {% raw %}
    <!--수정 전-->
    <a>  text </a>

    <!--수정 후-->
    <div>  text </div>
    {% endraw %}
```

위의 문제는 링크가 존재하지 않고 설명만 있어서 그렇습니다. 따라서 하이퍼링크를 사용할 경우, herf ='uml' 로 이루어져야 하지만, 링크는 없고 만 존재하는 html을 전부 a → div로 수정해 줍니다.

<br>

### <web_h3>3) 포커스할 수 있는 활성 요소에 중복되는 [id] 속성이 있음</web_h3>

위의 문제는 중복되서 나타나는 id 속성을 찾고 <web_h5> id 대신 class로 변경</web_h5>해 주면 해결됩니다.

<br>

### <web_h3>4) [aria-*] 속성이 역할과 일치하지 않음 </web_h3>

aria-label의 역활이 불분명하다면 삭제해도 무방합니다. 따라서 <div aria-label="right-Side-bar" id="right-side-bar"> 에서 <web_h5>aria-label="right-Side-bar" 삭제</web_h5>해 줍니다. 해당 aria 사용법은 [aria 공식문서](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/navigation_role)을 읽어 보시는 것을 추천드립니다.

<br>

### <web_h3>5) 백그라운드 및 포그라운드 색상의 대비율이 충분하지 않습니다</web_h3>

백 그라운드 색은 검정색인데 시그니처 컬러를 보라색으로 정해서 글자색과 배경색의 대비율이 충분하지 않아서 가독성이 떨어진 문제를 지적하고 있습니다. 글자색은 그대로 쓰고 싶기 때문에 조금 고쳐보겠습니다.

<br>

#### **<web_h4>scss:</web_h4>**

```scss
   
-webkit-text-stroke: 1px #e6e6e680; /* 웹킷 브라우저 (Chrome, Safari 등)에서 사용 */
text-stroke: 1px #e6e6e680; /* 표준 속성 */

```
색은 그대로 유지하고 외곽선 효과를 줌으로서 배경과 글자의 대비율을 올리는 방식으로 문제를 해결 하였습니다.  

<br>

### <web_h3>6) 목록에 <li> 요소와 스크립트 지원 요소(script 및 template)만 포함되지 않음</web_h3>

구글에서는 위의 문제점으로 이야기했지만, 실제로 저의 경우 코드를 살펴보면 HTML에서 목록을 생성하는 태그 ul과 ol의 문제점입니다.  

<br>

#### **<web_h4>html:</web_h4>**

```html
{% raw %} <!--수정 전-->
<ul>
   <li>
        <a id="categories_title" href="{{ site.data._categories.url | relative_url }}">
            {{ site.data._categories.categories_title }} ({{site.posts | size}})
         </a>
        {% for item in site.data._categories.categories_list %}
            <dlv id="categories_list">
                <ul>
                    <li>
                        <div id="categories_item"> <!--href="{{ item.url }}"-->
                            {{ item.title }} 
                        </div>
                    </li>
                    <dlv id="categories_sub">
                        <ul>
                            {% for subitem in item.categories_sub_list %}
                                <li>
                                    <a href="{{ subitem.url }}">
                                        {{ subitem.title }} ({{site.categories[subitem.title] | size}})
                                    </a>
                                </li>
                            {% endfor %}
                        </ul>
                    </dlv>
                </ul>
            </dlv>
        {% endfor %}
    </li>
</ul>
{% endraw %}
```

위는 수정 전 문제입니다. ul 밑에 div 또는 dlv을 사용함으로서 지적받은 코드입니다. 실제로 동작하는데는 문제가 일어나지 않지만 블로그 평가에 점수가 매겨짐으로 인해 고쳐보도록 합시다.

<br>

#### **<web_h4>html:</web_h4>**

```html
{% raw %} <!--수정 후-->
<div id="categories">
    <ul>
        <li id="categories_li">
            <a id="categories_title" href="{{ site.data._categories.url | relative_url }}">
                {{ site.data._categories.categories_title }} ({{ site.posts | size }})
            </a>
             <ul id="categories_list">
                {% for item in site.data._categories.categories_list %}
                    <li id="categories_list_li">
                        <div id="categories_item">
                            {{ item.title }}
                            <ul id="categories_sub">
                                {% for subitem in item.categories_sub_list %}
                                    <li>
                                        <a href="{{ subitem.url }}">
                                            {{ subitem.title }} ({{ site.categories[subitem.title] | size }})
                                        </a>
                                    </li>
                                {% endfor %}
                            </ul>
                        </div>
                    </li>
                {% endfor %}
            </ul>
        </li>
    </ul>
</div>
{% endraw %}
```

이런식으로 고치면 에러를 해결 할 수 있습니다.

<br>

### <web_h3>7) 사용하지 않는 자바스크립트 줄이기/web_h3>

블로그를 만들다보면 동적 이벤트들을 활용하기 위해서 이것 저것 제작하게 됩니다. 만들어보고 필요없는 것들은 놔둘떄가 있는데, 필요없는 자바 스크립들을 전부 지워줍니다.

<br>

#### **<web_h4>html:</web_h4>**

```html 
{% raw %}
<!-- Google Tag Manager (noscript) -->
    <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-5KWD8S2B"  height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>  
<!-- End Google Tag Manager (noscript) -->
{% endraw %}
```

필요없는 자바 스크립트 예시입니다.

<br>

#### **<web_h4>html:</web_h4>**

```html
{% raw %}
{%- include google/google-analytics.html -%}
{% endraw %}
```

html에서 필요없는 자바스크립트 연동코드들은 전부 제거해줍니다.

<br>

### <web_h3>8) 차세대 형식을 사용해 이미지 제공하기</web_h3>

차세대 형식을 사용하여 이미지를 제공하는 것은 웹 성능을 향상시키고 사용자 경험을 개선하는 데 도움이 됩니다. 따라서 이미지확장자 형식인 png를 webp로 형식으로 변환 해주면 해결 됩니다.

<br>

### <web_h3>9) 오프스크린 이미지 지연하기</web_h3>

오프스크린 이미지(Offscreen Images)를 지연하여 웹 페이지의 초기 로딩 속도를 향상시키는 방법은 이미지의 로딩을 늦추거나 필요할 때 로딩되도록 하는 것입니다. 따라서 이미지 속성 로딩에 지연을 걸도록 합시다.

<br>

#### **<web_h4>html:</web_h4>**

```html 
{% raw %}
<img src="image.jpg" alt="대체 텍스트" loading="lazy">
{% endraw %}
```

위와 같이 만약 페이지가 노출되지 않는 이미지를 로딩시키려고 한다면 lazy 속성을 주어서 지연시키면 됩니다.  

<br>

## <web_h3>10) 결과물</web_h3>

PageSpeed Insights에서 제시했던 문제점을 고쳤다면, 결과를 확인해 봅시다.

<br>

![구글 PageSpeed Insights 데스크톱 수정 후]({{ site.google_drive }}1Ed3p2V9dC5yWQdtGgTRijQ58hmOhsmLI{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<web_h6>구글 PageSpeed Insights 데스크톱 수정 후</web_h6>*

위의 에러를 해결하면, 수정 전 데스크톱 99점 점수에서 수정 후 100점으로 바뀐 것을 볼 수 있습니다.

<br>

![구글 PageSpeed Insights 모바일 수정 후]({{ site.google_drive }}1PAg7qqGcq268lTcFRqwgpXv6FQpvT5oF{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<web_h6>구글 PageSpeed Insights 모바일 수정 후</web_h6>*

마찬가지로 수정 전 데스크톱 97점 점수에서 수정 후 100점으로 바뀐 것을 볼 수 있습니다.

<br>
<br>

## <web_h2>3. Seo-tag 최적화 하기</web_h2>

구글 검색 엔진에 노출시키고 검색 결과에서 더 잘 나타내도록 하려면 Seo-tag를 최적화 할 필요가 있습니다. 그럼 Seo-tag를 최적화 하는 방법에 대해서 알아보도록 합시다.

<br>

### <web_h3>1) 제목과 설명</web_h3>

웹 페이지의 제목을 정의합니다. 각 페이지마다 고유하고 명확한 제목을 작성하여 검색 결과에서 해당 페이지가 노출될 때 사용자에게 명확한 정보를 제공합니다. 

<br>

#### **<web_h4>html:</web_h4>**

```html
{% raw %}
    <title>
        {{ page.title | default: site.title | escape }}
    </title>
{% endraw %}
```

위와 같이 포스트의 제목을 설정해 주었습니다.

<br>

#### **<web_h4>html:</web_h4>**

```html
    {% raw %}
        <meta name="description" content="{{ page.excerpt | default: site.description | strip_html | normalize_whitespace | escape }}">
    {% endraw %}
```

또한 해당 설명을 메타 테그로 설정해 두었습니다.  

<br>

#### **<web_h4>html:</web_h4>**

```html
  {% raw %}
  {% if page.tags %}
    <meta name="keywords" content="{{ page.tags | join: ', ' }}">
  {% endif %}
  {% endraw %}
```

해당 키워드도 메타 태그로 설정해 두었습니다.


<br>

### <web_h3>2) sitemap</web_h3>

Sitemap은 검색 엔진 크롤러에게 사이트의 어떤 페이지가 있으며 어떤 구조로 이루어져 있는지를 알려줍니다. 검색 엔진이 웹사이트를 색인화할 때 페이지를 더 잘 찾고 색인화할 수 있도록 도와줍니다.

<br>

#### **<web_h4>xml:</web_h4>**

```xml
{% raw %}
---
layout: null
---

<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd"
        xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    {% for post in site.posts %}
    <url>
        <loc>{{ site.url | remove: '/'}}{{ post.url | remove: '.html' }}</loc>
        {% if post.lastmod == null %}
        <lastmod>{{ post.date | date_to_xmlschema }}</lastmod>
        {% else %}
        <lastmod>{{ post.lastmod | date_to_xmlschema }}</lastmod>
        {% endif %}

        {% if post.sitemap.changefreq == null %}
        <changefreq>weekly</changefreq>
        {% else %}
        <changefreq>{{ post.sitemap.changefreq }}</changefreq>
        {% endif %}

        {% if post.sitemap.priority == null %}
        <priority>0.5</priority>
        {% else %}
        <priority>{{ post.sitemap.priority }}</priority>
        {% endif %}

    </url>
    {% endfor %}
</urlset>
{% endraw %}
```

사이트맵을 jekyll-sitemap 플러그 인으로 설정해도 되지만 xml파일을 만들어서 설정하였습니다. 원하는 도메인이 전부 다름으로 처음하시는 분은 xml파일 만들기 보다는 플러그인 받으시는 것을 추천 드립니다.   

<br>

### <web_h3>3) robots.txt</web_h3>

robots.txt 파일은 웹사이트의 루트 디렉토리에 위치한 텍스트 파일로, 검색 엔진 크롤러에게 웹사이트의 어떤 부분을 색인화할 수 있는지 지시하는 역할을 합니다.

<br>

#### **<web_h4>txt:</web_h4>**

```cmd

User-agent: Googlebot
Disallow: /Game_Jam/
Disallow: /Hackaton/
Disallow: /DirectX/
Disallow: /WinAPI/
Disallow: /Unity_TP/
Disallow: /Unreal_TP/
Disallow: /Server_TP/
Disallow: /AI/
Disallow: /Data_Base/
Disallow: /3Ds_Max/
Disallow: /Hackaton/
Disallow: /Houdini/
Disallow: /Tstory_Skin/
Disallow: /Git_Hub_Blog/

User-agent: Bingbot
Disallow: /Game_Jam/
Disallow: /Hackaton/
Disallow: /DirectX/
Disallow: /WinAPI/
Disallow: /Unity_TP/
Disallow: /Unreal_TP/
Disallow: /Server_TP/
Disallow: /AI/
Disallow: /Data_Base/
Disallow: /3Ds_Max/
Disallow: /Hackaton/
Disallow: /Houdini/
Disallow: /Tstory_Skin/
Disallow: /Git_Hub_Blog/

User-agent: *
Disallow: / 

Sitemap: https://kj1241.github.io/sitemap.xml

```

구글 봇과 빙봇의 접근만 허용하고 너머지 로봇의 접근을 허용하지 않기 위해 설정하였습니다. 그리고 특정 포트폴리오용 사이트는 로봇이 접근하지 못하도록 설정하였습니다.  

<br>

### <web_h3>4) Open Graph Tags</web_h3>

Open Graph는 웹사이트가 소셜 미디어 플랫폼에서 공유될 때 정보를 제공하는 데 사용되는 메타 데이터 프로토콜입니다. 포스트가 소셜 사이트에 링크 되었을때 표시되는 내용에 대해 작업을 해야합니다. Open Graph Tags 프로토콜에 대해서 작업해줘야 할 필요성이 있습니다.  
위의 방법도 두가지가 있습니다.  

1. jekyll-seo-tag 플러그 인을 사용하여 관리하는 방법이 있습니다.
2. 직접 코드를 작성하는 방법이 있습니다.

<br>

#### **<web_h4>html:</web_h4>**

```html
{% raw %}
    {%- seo -%} 
{% endraw %}
```

위의 방식은 플러그 인을 사용하여 seo-tag를 사용하는 방법입니다.

<br>

#### **<web_h4>html:</web_h4>**

```html
{% raw %}
<meta name="og:site_name" content="{{ site.title }}" />
<meta name="og:title" content="{{ page.title | default: site.title | escape }}" />
<meta
  name="og:description"
  content="{{ page.excerpt | default: site.description | strip_html | normalize_whitespace | escape }}"
/>
<meta name="og:type" content="website" />
<meta name="og:url" content="{{ page.url | absolute_url }}" />
<meta
  name="og:image"
  content="{{ page.img }}"
/>
{% endraw %}
```

직접 코드를 작성하려면 위의 코드처럼 필요한 것을 찾아서 작성하면 됩니다. 자세한 사항은 [Open Graph 공식 사이트](https://ogp.me/)를 확인인하시면서 작성하시면 됩니다.

<br>

### <web_h3>5) favicon 추가하기</web_h3>

SEO (검색 엔진 최적화)에서 favicon은 웹사이트의 아이콘을 의미합니다. 웹 브라우저 탭에 표시되거나 북마크로 추가될 때 해당 웹사이트를 식별하는 아이콘입니다. Favicon은 웹사이트의 브랜드를 시각적으로 강조하고 사용자가 웹사이트를 쉽게 식별할 수 있도록 도와줍니다.

<br>

#### **<web_h4>html:</web_h4>**

```html
{% raw %}
      <link rel="icon" href="{{ '/assets/img/profile_img256px.ico' | relative_url }}">
{% endraw %}
```

브랜드 품질을 올리기위해서 추가해야하는 파비콘입니다. ICO는 다양한 크기를 담고 있음으로 상관없기 때문에 하나만 지정해두면 됩니다.

<br>

위의 정도만 하시면 기본적으로 검색엔진에 올려 놓을 준비는 완료되었습니다.  
다음 편에서는 블로그를 작성하면서 일어났던 트러블 슈팅과 마크다운 작성 팁으로 돌아오겠습니다.  
읽어주셔서 감사합니다.