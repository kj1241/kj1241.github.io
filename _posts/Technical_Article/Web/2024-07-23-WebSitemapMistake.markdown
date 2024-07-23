---
layout: post
title: "GitHub Blog에서 Jekyll을 사용해 동적 사이트맵을 만들 때 실수"
date: 2024-07-23 09:00:00 +09:00
image: https://drive.google.com/thumbnail?id=14XnGQgkgaROJf8ah95BqBEvK9r5J9tda
toc: true
categories: [Web]
keywords: Jekyll, GitHub 블로그, 동적 사이트맵, 사이트맵 오류
lastmod: 2024-07-23 09:00:00 +09:00
sitemap: 
  changefreq : daily
  priority : 0.1
addsence: true
excerpt: GitHub 블로그에서 Jekyll로 동적 사이트맵을 만들 때 발생한 실수를 다룬 글입니다. 사이트맵 생성 오류와 해결 과정을 통해 얻은 교훈을 공유합니다. 비슷한 문제를 겪는 분들께 도움이 되길 바랍니다.
related_links:
---

블로그를 시작한 주된 이유는 제가 하는 실수들을 기록하기 위해서입니다. 남들 눈에는 제 성격이 내성적인 면도 있어서 실수에 대해서 지나칠 때도 있다고 생각하시는 분들도 있을 수 있습니다. 하지만 원래 일할 때는 남들의 실수는 크게 상관하지 않고 에러를 고치지만, 저의 실수에는 화가 나는 성격입니다. 생각보다 기본 이론을 바탕으로 코드를 작성하다 보면 다양한 케이스를 챙기지 못할 때도 있습니다. 이런 부분들이 제가 생각하기에 아직 많이 부족하다고 느끼고 있는 점이기도 합니다.

<br>
<br>

## <web_h2>1. 사건의 배경</web_h2>

Jekyll을 사용하여 GitHub 블로그를 제작할 때 사이트맵을 만들게 되었습니다. 기존 라이브러리를 사용하면 sitemap.xml의 코드가 자동으로 완성되어 검색엔진에 모든 글을 알려줬어야 했습니다.

```bash

http://kj1241.github.io/1.html
http://kj1241.github.io/1

```

라이브러리에서 생성된 사이트맵과 인터넷 사이트에서 만들어주는 사이트맵은 위와 같이 동일한 두 개의 주소가 생성됩니다. 또한, 사이트맵에 내가 원하는 사이트만 등록할 수 없다는 단점이 있었습니다. 그래서 Liquid 코드를 이용해 동적으로 관리되는 사이트맵을 제작하려고 했습니다.

#### <web_h4>sitemap<web_h4>

```xml
{% raw %}
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd"
        xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    {% for post in site.posts %}
    <url>
        <loc>{{ site.url  }}{{ post.url| remove: '.html' }}</loc>
   
        {% if post.lastmod %}
        <lastmod>{{ post.lastmod | date_to_xmlschema }}</lastmod>
        {% else %}
        <lastmod>{{ post.date | date_to_xmlschema }}</lastmod>
        {% endif %}

        <changefreq>{% if post.sitemap.changefreq %}{{ post.sitemap.changefreq }}{% else %}weekly{% endif %}</changefreq>
        <priority>{% if post.sitemap.priority %}{{ post.sitemap.priority }}{% else %}0.5{% endif %}</priority>
        
    </url>
    {% endfor %}
</urlset>
{% endraw %}
```
사이트맵 도큐먼트를 참고해 수정할 주소는 퍼머링크 규칙에 따라 사이트맵을 고정주소 + 가변주소로 제작하기 위해 _config.yml에 정의된 url을 사용해 고정주소를 정의하고, 각 포스트의 고유주소에서 가변주소를 가져와 만들었습니다.

<br>
<br>

## <web_h2>2. 사건의 발단</web_h2>

아이디어는 좋았으나, 디버깅할 때 문제가 발생했습니다.

```bash

httsp://kj1241.github.io//1

```

위 코드처럼 고정주소와 가변주소 사이에 슬래시가 하나 더 생기는 문제가 있었습니다. 그래서 해당 에러를 해결하기 위해 고정주소의 슬래시 하나를 지우는 코드를 작성했습니다.

```xml

<loc>{{ site.url | remove: '/'  }}{{ post.url| remove: '.html' }}</loc>

```

그리고 구글 서치 콘솔에 제출해서 아무 문제가 없어서 해결되었다고 생각하고 시간이 흐르게 되었습니다.
시간이 흐른 후 마이크로소프트 빙 웹마스터에 사이트맵을 제출하는데 계속 오류가 발생하였습니다. 인터넷 검색으로 빙 웹마스터에서 오류가 발생하면 크롬 캐시 파일을 지우고 다시 시도하면 된다는 걸 찾게 되었습니다. 사실 생각해보면 논리적으로 이상하지 않습니까? 서버에 결과를 보여주는 것인데, 내 크롬 캐시랑 무슨 상관이 있는지 하지만 해결됐다는 것을 보고 저도 따라서 해봤습니다. 그래도 해결되지 않아 결국 빙 웹마스터 팀에 문의하게 되었습니다.

<br>
<br>

## <web_h2>3. 사건의 원인</web_h2>

메일로 문의했는데 친절하게 웹마스터 엔지니어가 '최종 목적지 URL이 포함된 사이트맵을 제출'해 달라고 연락이 왔습니다. 이 말은 제가 작성한 주소가 잘못되었다는 말이기 때문에 처음에는 '.html'을 제거한 게 문제인 줄 알았습니다. 근데 곰곰이 생각해 보니 주소 전체를 다시 봐야겠다는 생각이 들었습니다.

```bash

httsp:kj1241.github.io//1

```
체크해보니 위와 같은 주소로 사이트맵이 생성되고 있었습니다. 근본적인 원인은 슬래시를 만들던 고정주소에 있었습니다.

```yml

url: httsp://kj1241.github.io/

```

옛날 디렉토리를 사용하던 습관으로 뒤에 슬래시를 붙여 사용했기 때문에, 고정주소와 가변주소 사이에 두 개의 슬래시가 생긴 것입니다.

<br>
<br>

## <web_h2>3. 반성 및 교훈</web_h2>

이번 에러의 원인은 피곤하다는 이유로 단순하게 처리한 데 있었습니다. 정적 사이트를 2일 만에 제작하고 사이트맵을 동적으로 제작하려다 보니 논리적인 로직은 작성했으나 에러에 대해 너무 관대하게 처리했습니다. 차선의 방법은 코드를 사용해 고정주소 뒤의 슬래시를 제거하거나, 가변주소 앞의 슬래시를 제거하는 것입니다. 최선의 방법은 _config.yml에 있는 url 주소 뒤의 슬래시를 제거하는 것입니다. 이번 기회를 통해 다음에는 좀 더 확실하게 여러 방면에서 체크해야 한다고 생각했습니다.
