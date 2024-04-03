---
layout: post
title: "Jekyll를 이용해서 github blog 만들기 4 - 트러블 슈팅과 마크다운 팁"
date: 2023-12-03 21:05:04 +0900
image: https://drive.google.com/thumbnail?id=1sn76DNyZFbKc99Q0v-cfWPT7Biao9Hex
toc: true
categories: [Web]
keywords: Jkeyll, Ruby, HTML, SCSS, Java Script, Git Hub Blog, 트레블 슈팅, 마크 다운 접는 글, 마크 다운 이미지 크기 조절  
addsence: true
lastmod: 2024-04-03 18:34:00 +09:00
sitemap:
  changefreq : daily
  priority : 1.0
excerpt: Git Hub 블로그 운영 시 발생한 문제 해결과 마크다운 작성 팁을 다룬 글입니다. 트러블 슈팅으로는 _page 폴더 에러와 Git Hub rendering 에러를 다루었고, 색상 지정과 이미지 크기 조절을 위한 팁을 제시했습니다. 또한, 접는 글 작성방법에 대해 소개했습니다.
related_links:
    - url: /web_tp/Git_Hub_Blog_Skin.html
    - url: /web/Git_Hub_Blog1.html
    - url: /web/Git_Hub_Blog2.html
    - url: /web/Git_Hub_Blog3.html
---

앞서서는 구글 검색엔진에서 블로그 품질을 올리기 위해서 변경하거나 필요했던 코드들을 이야기했습니다. 그럼 이제 블로그를 작성하면서 발생했던 트러블 슈팅과 마크다운 팁에 관해서 적어보겠습니다.  

<br>

---

<br>

## <web_h2>1. 트러블 슈팅</web_h2>

제가 Git Hub Blog를 제작하면서 난감했던 트러블 슈팅들에 관해서 적어 보겠습니다. 현재로는 전부 해결했습니다.

<br>

### <web_h3>1) _page 폴더 제작시 내용을 읽을 수 없는 에러</web_h3>

깃 허브 블로그에 있는 Jekyll 공식 홈페이지에서 살펴보면 _page 폴더를 사용할 수 있다고 적혀 있습니다. 근데 제 경우에는 _page 폴더 안에 카테고리 항목을 보여주는 <web_h5>page.html 파일을 저장하면 Jekyll에서 불러올 수 없었습니다.</web_h5> 이런 문제를 해결하기 위해서 pages라는 폴더를 개별적으로 만들고 읽어오는 방식으로 코드를 수정하였습니다.

<br>

### <web_h3>2) 알수 없는 Git Hub rendering 에러</web_h3>

해당 트러블 슈팅 내용은 오랫동안 기억에 남을 것 같습니다. visual code를 사용하여 블로그의 형태를 html과 scss로 제작하였습니다. visual code를 사용하고 bundle 로컬 웹으로 확인했을 당시 아무 문제가 발생하지 않았습니다. 그래서 코드를 Git Hub에 올렸습니다.

그러나 3분 후에 깃 허브를 통해서 이메일로 알림을 받게 됩니다. 

<br>

![문제의 에러 메일]({{ site.google_drive }}1FmPuumzRcD5nW3HLNXd6JRkEs8AySANk{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<web_h6>Git Hub 에러 메일</web_h6>*

깃 허브에 저장은 되고 빌드는 했지만 깃 허브 블로그 페이지를 구축하지 못했다는 알림을 받게 되었습니다.

<br>

![에러 당시 깃 허브 워크플로]({{ site.google_drive }}1sn76DNyZFbKc99Q0v-cfWPT7Biao9Hex{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<web_h6>에러 당시 깃 허브 워크플로</web_h6>*

위의 내용은 에러 당시에 깃 허브 워크플로우 입니다. 에러 display에 연결 안됐으므로 페이지 구축을 하지 못한 것을 볼 수 있습니다. 

<br>

![깃 허브 워크플로 빌드 에러 세부 사항]({{ site.google_drive }}1hT0kHA5e_8cLgRBJiv8MoZbgRFotRAVB{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<web_h6>깃 허브 워크플로 빌드 에러 세부 사항</web_h6>*

워크플로를 보는 당시 아무리 에러내용을 찾아보는 찾을 수가 없었습니다. 비주얼 스튜디오처럼 어디가 에러 나는지 알 수 없기 때문입니다. 또한, 번들을 사용해서 로컬 웹에서는 문제가 없었기 때문에 더욱 찾기 힘들었습니다. 따라서 에러에 대한 힌트도 없었으므로 무언가 검색해서 도움을 받을 수도 없었습니다.

일단 가장 많이 일어날 수 있는 <web_h5>에러 원인의 가설</web_h5>을 세워봅시다. ＂깃 허브에서 오류 나는 원인은 타임 에러 때문인가?＂
이 경우 깃 허브에 올리는 시간이 40초밖에 안되기 때문에 타임 에러일 경우를 제거합니다.  

그렇다면 제가 할 수 있는 두 번째 방법은 <web_h5>탐색적 방법</web_h5>으로 하나하나씩 제거해가면서 에러를 일으키는 원인을 찾는 것이었습니다. 해당 방법으로 원인을 찾아서, color의 값으로 RGBA를 사용한 것에 무언가 문제가 있다는 것을 확인한 후 RGBA함수를 이용하는 것보다 16진수를 이용하여 사용하는 방식으로 바꾸어서 해결하였습니다.

물론 이런 실험으로 에러를 찾는 것은 재미있었으나, 브런치를 파서 실험해야 된다는 생각을 하지 못해서 main으로 실험해서 히스토리 오염시켰기 때문에 새로 레파지토리를 새로 만들게 되었습니다.

<br>
<br>

## <web_h2>2. 마크다운 글 작성할 때 팁</web_h2>

일단, 미리 말씀드리면 웹 프론트에 전공하지 않았기 때문에 그냥 저의 마음대로 마크다운 작성하는 비법입니다. 전부 공식적으로 적혀있는 방법은 아니므로 그냥 이렇게 적었구나 하고 넘어가시면 됩니다. 저만의 팁 방출입니다. 

<br>

### <web_h3>1) 색상 지정</web_h3>

저도 특정한색을 많이 사용하는데, 마크다운 사용하시는 분이나 html 사용하시는 분들 뭔가 고정적으로 많이 사용하는 색이 존재하실 겁니다. 그러면 SCSS에 이상한 헤더 속성을 등록시키는 겁니다.

<br>

#### **<web_h4>scss:</web_h4>**

```scss
{% raw %}
yellow1_h2 {
    color: #ffe314;
}

yellow1_h3 {
    color: #fffab7;
}
{% endraw %}
```

이런 방식으로 본인이 인식하고 있는 단어에 특정 색을 배합해 놓는 것입니다.  

<br>

{% raw %}
Input: &lt;yellow1_h2&gt;이런식으로 &lt;/yellow1_h2&gt; &lt;yellow1_h3&gt;작성해 봅시다.&lt;/yellow1_h3&gt;
{% endraw %}
Output: <yellow1_h2>이런식으로 </yellow1_h2> <yellow1_h3>작성해 봅시다.</yellow1_h3>
  
<br>

일단 위의 방법은 <red1_error>공식문서</red1_error>에 없습니다. html 방식을 넣어서 문서를 자주 작성하는 게 피곤해서 다양하게 실험해보다 알아내었습니다. 평소에 자주 쓰는 색들을 지정해서 편히 글자에 색을 입히세요.

<br>

### <web_h3>2) 마크다운 이미지 크기 조절 </web_h3>

이런 것이 어떻게 팁일까 하는 사람들도 있을 수 있습니다. 마크다운에 html의 img를 사용하면 이미지 크기를 조절 할 수 있습니다. 하지만 마크다운 자체로 사용하는 방법을 이야기할 예정입니다.

<br>

#### **<web_h4>markdown:</web_h4>**

```markdown
{% raw %}
![예시 이미지](https://example.com/image.jpg)
{% endraw %}
```

[CommonMark 표준 마크다운 공식문서](https://commonmark.org/) 에 보면 단순히 이미지 표현은 위와 같습니다. 이미지 크기를 조절하려면 html 문법을 이용해야 한다고 이야기하고 있습니다.

<br>

#### **<web_h4>html:</web_h4>**

```html
{% raw %}
<img src="https://example.com/image.jpg" alt="예시 이미지" style="width:300px;"/>
{% endraw %}
```

위의 코드처럼 마크다운 문서에 html을 사용해서 작성해도 됩니다. 원래 마크다운 문서는 html로 이루어져 있기 때문입니다. 하지만 글을 작성하다 보면 불편합니다. 그러므로 마크다운 확장형식을 이용하여 코드를 작성할 수도 있습니다.

<br>

#### **<web_h4>markdown:</web_h4>**

```markdown
{% raw %}
![예시 이미지](https://example.com/image.jpg){: width="300px"  height="200px" }
{% endraw %}
```

위의 형식처럼 작성하면 됩니다. 하지만 단순히 이렇게 작성하면 뭔가 아쉬울 수 있기 때문에 좀 더 확장해서 코드를 작성해 봅시다. 위의 형식은 이미지를 가로 300픽셀 세로 200픽셀로 고정하고 있습니다. 하지만 요즘은 모바일에 시대기 때문에 반응형으로 포스트를 관리해야 할 필요성이 있습니다. 그러면 이미지도 반응형으로 바꿔야 할 필요성이 있습니다.

<br>

#### **<web_h4>markdown:</web_h4>**

```markdown
{% raw %}
![예시 이미지](https://example.com/image.jpg){: width="100%" }
{% endraw %}
```

위의 코드처럼 작성하면 가로의 크기는 크기에 비율에 따라서 변하게 됩니다. 하지만 문제점이 존재합니다. 가로는 정할 수 있지만, 세로의 크기를 정할 수 없다는 점입니다. 이 문제를 해결하기 위해 다음 코드를 봅시다.

<br>

#### **<web_h4>markdown:</web_h4>**

```markdown
{% raw %}
![예시 이미지](https://example.com/image.jpg){: width="100%" style="aspect-ratio:16/9"}
{% endraw %}
```

위와 같이 사용하면 가로는 상위 부모 객체의 크기에 영향을 받게 되고 세로는 가로기의 비율에 영향을 받아 9/16로 만들어질 것입니다. 이런 형식으로 확장하여서 편하게 문법을 사용해서 이미지를 작성하면 됩니다.

<br>

### <web_h3>3) 접는 글 사용하기</web_h3>

깃 허브 블로그에서 접는 글이 필요할 수가 있습니다. 글의 가독성 때문에 나빠지고 있다고 생각하면 글을 접는 글로 숨겨야 할 필요가 있습니다. 마크다운은 오래된 문법이기 때문에 공식적으로는 접는 글이 존재하지 않습니다. 따라서 HTML5에 존재하는 접는 글을 가져올 필요성이 있습니다.

<br>

#### **<web_h4>html:</web_h4>**

```html 

<!--Input:-->
<details>
<summary> 접는 글 </summary>

이것은 접는 글입니다.  

</details>

```

위와 같은 코드를 작성하면 접는 글을 만들 수 있습니다. 결과는 아래에서 확인해 보실 수 있습니다.  

<web_h5> OutPut: </web_h5>

<details>
<summary> 접는 글 </summary>

이것은 접는 글입니다.  

</details>

이런 형식으로 접는 글을 만들 수 있습니다. 하지만 이런 방식은 마크다운과 연계할 수 없습니다. 어떤 에러들이 발생하는지 확인해 봅시다.  

<br>

#### **<web_h4>html:</web_h4>**

```html 

<!--Input-->
<details>
<summary> 접는 글 </summary>

#### 이것은 h4 입니다.

</details>

```

<blue1_h5> OutPut: </blue1_h5>

<details>
<summary> 접는 글 </summary>

#### 이것은 h4 입니다.

</details>

위의 코드처럼 작성하게 되면 접는 글 안에 마크다운, 이미지, 코드 하이라이트 등을 사용하려면 에러는 발생하지 않지만 역시 적용되지 않습니다. 그래서 적용할 수 있는 방법이 없는지 인터넷에서 확인을 해봤습니다.

<br>

![깃 허브 gist 사용 접는 글]({{ site.google_drive }}190ignvZwt1V1Q1HhdnqHiXR1pNhHlHCx{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<web_h6>에러 당시 깃 허브 워크플로</web_h6>*

깃 허브 gist에서 빠르게 접는 글을 살펴본 결과 details 안에 마크다운이 적용돼서 사용되는 것을 확인할 수 있었습니다. 그래서 마크다운에 대해서 확인해 본 결과 마크다운에도 다양한 확장자 버전이 있다는 것을 알게 되었습니다. 따라서 Git hub gist처럼 접는 글 안에 마크다운을 넣고 싶다면 지원하는 확장자를 선언해 줘야 합니다.

<br>

#### **<web_h4>_config.yml:</web_h4>**

```yml

//_config.yml
kramdown:
  parse_block_html: true

```

_config.yml 파일 안에 위처럼 parse_block_html 버전으로 마크다운을 사용 하겠다고 선언하면 해결됩니다. 하지만 버전이 여러 개라는 말은 분명 마크다운 용법이 충돌 나는 경우의 수도 생긴다고 볼 수 있습니다. 그럼 수십 개 혹은 수백의 글을 고쳐야 하는 상황이 올 수도 있습니다. 따라서 _config.yml 사용하지 않고도 안에 적용하는 방법을 알아냈습니다.

<br>

#### **<web_h4>html:</web_h4>**


```html 

<details markdown=1>
<summary> 접는 글 </summary>

#### 이것은 h4 입니다.

</details>

```

<blue1_h5> OutPut: </blue1_h5>

<details markdown=1>
<summary> 접는 글 </summary>

#### 이것은 h4 입니다.

</details>

위처럼 details markdown=1로 사용해서 코드를 작성하면 _config.y ml을 작성하지 않고도 쉽게 마크다운 용법이 적용되는 details를 제작할 수 있습니다.

<br>

더 많은 트러블 슈팅과 팁이 있는 것 같았지만, 지금 당장 생각나는 팁은 이 정도 인 거 같습니다. 혹시라도 더 좋은 팁이 생긴다면 추가로 적겠습니다. 읽어주셔서 감사합니다.