---
layout: post
title:  "Jekyll를 이용해서 github blog 만들기 3 블로그 품질 올리기"
date:   2023-12-03 11:38:04 +0900
image: https://github.com/kj1241/kj1241.github.io/assets/22047442/5671456a-1f9f-4efe-9ed1-d446e592ca0e
toc: true
categories: [Web]
tags: [Jkeyll, Ruby, HTML, SCSS, Java Script, Git Hub Blog ]
addsence: true
excerpt: 단순히 Git Hub Blog 제작을 위해서 만들어진 테마를 Fork를 이용하여 제작하는 것이 아닌 Jekyll + Ruby + HTML + SCSS + Java Script를 사용하여 제작하는 방법을 설명하고 있습니다. 해당 과정은 블로그의 품질을 올리기위해 PageSpeed Insights와 Seo-tag 최적화하는 방법에 대해 설명하고 있습니다.
---

앞서서는 Git Hub Blog에 제작된 언어별로 어떻게 역활을 맡고 있는지 확인 했습니다.  
그럼 이제 구글 검색엔진에 올리기 위해서 본격적으로, 구글 서치 콘솔의 PageSpeed Insights와 Seo-tag 최적화를 하기위해 했던 예제를 작성해 보겠습니다.


<br>

---

<br>

## <blue1_h2> 1. 깃 허브 블로그 완성하면 체크해야 될 일들 </blue1_h2>
블로그 완성하면 여간 손이 가는게 아닙니다.  
티스토리에서는 내부적으로 지원해주던 것들을 깃 허브 블로그는 전부 유저가 채크해야 합니다.  
그럼 한번 살펴 봅시다.

<br>
<br>

## <blue1_h2> 2. 구글 PageSpeed Insights 성능 체크하기 </blue1_h2>

블로그 품질을 객관적으로 채크해주는 사이트가 있습니다.  
PageSpeed Insights에 들어가서 문제되는 부분들을 수정하고 성능을 끌어올리시면 됩니다.

![구글 PageSpeed Insights 수정 전](https://github.com/kj1241/kj1241.github.io/assets/22047442/edf188c1-7bce-41ba-9ec2-9706c99022f3){: width="100%" }
*구글 PageSpeed Insights 모바일 수정 전*


![구글 PageSpeed Insights 수정 전](https://github.com/kj1241/kj1241.github.io/assets/22047442/9d3318de-c79f-4dbb-ac16-86cd68236423){: width="100%"}
*구글 PageSpeed Insights 데스크톱 수정 전*

<br>

### <blue1_h3> 1) 링크에 설명 텍스트가 없음  </blue1_h3>

위의 링크가 설명에 텍스트 없음은 seo-tag에 관해서 두가지 문제가 발생할때 경고가 나타납니다.
1. description이 존재하지 않기 떄문입니다.
2. alt 요소가 정확하지 않을 때 일어납니다. 
  
<br>

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

  


```html 

    {% raw %}
    <a herf ="uml"> {{ image.title | remove: ".webp" }}  자세히 보기 </a> 
    {% endraw %}

```
  
위의 처럼 중복되는 alt 요소를 중복되지 않게 바꿔줍니다.  


  
<br>

### <blue1_h3> 2) 링크를 크롤링 할 수 없음  </blue1_h3>

```html

    {% raw %}
    <!--수정 전-->
    <a>  text </a>

    <!--수정 후-->
    <div>  text </div>
    {% endraw %}

```


위의 문제는 링크가 존재하지 않고 설명만 있어서 그렇습니다.  
따라서 하이퍼링크를 사용할 경우, herf ='uml' 로 이루어져야 하지만, 링크는 없고 만 존재하는 html을 전부 a → div로 수정해 줍니다.


<br>

### <blue1_h3> 3) 포커스할 수 있는 활성 요소에 중복되는 [id] 속성이 있음  </blue1_h3>

중복되서 나타나는 id 속성을 찾고 <blue1_h5> id 대신 class로 변경</blue1_h5>해 주면 해결됩니다.




<br>

### <blue1_h3> 4) [aria-*] 속성이 역할과 일치하지 않음  </blue1_h3>

aria-label의 역활이 불분명하다면 삭제해도 무방합니다.  
따라서 <div aria-label="right-Side-bar" id="right-side-bar"> 에서 <blue1_h5>aria-label="right-Side-bar" 삭제</blue1_h5>해 줍니다.  
해당 aria 사용법은 [aria 공식문서](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/navigation_role)을 읽어 보시는 것을 추천드립니다.


<br>

### <blue1_h3> 5) 백그라운드 및 포그라운드 색상의 대비율이 충분하지 않습니다  </blue1_h3>


```scss
   
-webkit-text-stroke: 1px #e6e6e680; /* 웹킷 브라우저 (Chrome, Safari 등)에서 사용 */
text-stroke: 1px #e6e6e680; /* 표준 속성 */

```
색은 그대로 유지하고 싶다고 생각하시면 배경과 대비되는 외각선 효과를 주면 해결됩니다.


<br>

### <blue1_h3> 6) 목록에 <li> 요소와 스크립트 지원 요소(<script> 및 <template>)만 포함되지 않음  </blue1_h3>


```html

<!--수정 전-->
{% raw %}
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


```html

<!--수정 후-->
{% raw %}
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

위의 내용처럼 ul 또는 ol 안에 div 혹은 dlv가 존재하면 안됩니다.  
따라서 구조를 아래와 같이 전부 바꿔줍니다.  


<br>

### <blue1_h3> 7) 사용하지 않는 자바스크립트 줄이기  </blue1_h3>

```java 

{% raw %}
<!-- Google Tag Manager (noscript) -->
    <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-5KWD8S2B"  height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>  
<!-- End Google Tag Manager (noscript) -->
{% endraw %}

```


```java

{% raw %}
{%- include google/google-analytics.html -%}
{% endraw %}

```

해당 사용되지 않는 자바 스크립트를 전부 삭제 해줍니다.  

<br>

### <blue1_h3> 8) 차세대 형식을 사용해 이미지 제공하기  </blue1_h3>

이미지확장자 형식인 png를 webp로 형식으로 변환 해주면 해결 됩니다.



<br>

### <blue1_h3> 9) 오프스크린 이미지 지연하기  </blue1_h3>


```html 

{% raw %}
<img src="image.jpg" alt="대체 텍스트" loading="lazy">
{% endraw %}

```

위와 같이 만약 페이지가 노출되지 않는 이미지를 로딩시키려고 한다면 lazy 속성을 주어서 지연시키면 됩니다.  


<br>

### <blue1_h3> 10) 결과물  </blue1_h3>

![구글 PageSpeed Insights  데스크톱 수정 후](https://github.com/kj1241/kj1241.github.io/assets/22047442/7702b0b5-db1c-4878-b7d8-c7f97711e53c){: width="100%"}
*구글 PageSpeed Insights  데스크톱 수정 후*
  
![구글 PageSpeed Insights  모바일 수정 후](https://github.com/kj1241/kj1241.github.io/assets/22047442/5671456a-1f9f-4efe-9ed1-d446e592ca0e){: width="100%"}
*구글 PageSpeed Insights  모바일 수정 후*
  

<br>
<br>

## <blue1_h2> 3. Seo-tag 최적화 하기 </blue1_h2>

구글 검색에 올릴려면 Seo-tag를 최적화 할 필요가 있습니다.  
그럼 Seo-tag를 최적화 하는 방법에 대해서 알아보도록 합시다.


<br>

### <blue1_h3> 1) 제목과 설명 </blue1_h3>

```html

{% raw %}
    <title>
        {{ page.title | default: site.title | escape }}
    </title>
{% endraw %}

```

위와 같이 포스트의 제목을 설정해 주었습니다.

```html

    {% raw %}
        <meta name="description" content="{{ page.excerpt | default: site.description | strip_html | normalize_whitespace | escape }}">
    {% endraw %}

```

또한 해당 설명을 메타 테그로 설정해 두었습니다.  

```html

  {% raw %}
  {% if page.tags %}
    <meta name="keywords" content="{{ page.tags | join: ', ' }}">
  {% endif %}
  {% endraw %}

```

해당 키워드도 메타 태그로 설정해 두었습니다.


<br>

### <blue1_h3> 2) sitemap </blue1_h3>

웹사이트 전체 구조를 담고있습니다.  

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

사이트맵을 jekyll-sitemap 플러그 인으로 설정해도 되지만 xml파일을 만들어서 설정하였습니다.  
원하는 도메인이 전부 다름으로 처음하시는 분은 xml파일 만들기 보다는 플러그인 받으시는 것을 추천 드립니다.   

<br>

### <blue1_h3> 3) robots.txt </blue1_h3>

```txt

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

구글 봇과 빙봇의 접근만 허용하고 너머지 로봇의 접근을 허용하지 않기 위해 설정하였습니다.  
그리고 특정 포트폴리오용 사이트는 로봇이 접근하지 못하도록 설정하였습니다.  


<br>

### <blue1_h3> 4) Open Graph Tags </blue1_h3>

포스트가 소셜 사이트에 링크 되었을때 표시되는 내용에 대해 작업을 해야합니다.  
Open Graph Tags 프로토콜에 대해서 작업해줘야 할 필요성이 있습니다.  

위의 방법도 두가지가 있습니다.  
1. jekyll-seo-tag 플러그 인을 사용하여 관리하는 방법이 있습니다.
2. 직접 코드를 작성하는 방법이 있습니다.

```html

{% raw %}
    {%- seo -%} 
{% endraw %}

```

위의 방식 처럼 플러그인을 통하여 작성하셔도 됩니다.  


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
이처럼 [Open Graph 공식 사이트](https://ogp.me/)를 확인하시고 직접 작성하셔도 됩니다.  


<br>

### <blue1_h3> 5) favicon 추가하기 </blue1_h3>


```html

{% raw %}
      <link rel="icon" href="{{ '/assets/img/profile_img256px.ico' | relative_url }}">
{% endraw %}

```

브랜드 품질을 올리기위해서 추가해야하는 파비콘입니다.  
ICO는 다양한 크기를 담고 있음으로 상관없기 때문에 하나만 지정해두면 됩니다.




<br>

---

<br>

위의 정도만 하시면 기본적으로 검색엔진에 올려 놓을 준비는 완료되었습니다.  
다음 편에서는 블로그를 작성하면서 일어났던 트러블 슈팅과 마크다운 작성 팁으로 돌아오겠습니다.  
읽어주셔서 감사합니다.