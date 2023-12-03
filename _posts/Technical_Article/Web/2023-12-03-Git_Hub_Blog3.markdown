---
layout: post
title:  "Jekyll를 이용해서 github blog 만들기 3 트러블 슈팅과 마크다운 팁"
date:   2023-12-03 11:38:04 +0900
image: https://github.com/kj1241/kj1241.github.io/assets/22047442/ea08108f-a358-441c-9c9b-6a18572f2fe7
toc: true
categories: [Web]
tags: [Jkeyll, Ruby, HTML, SCSS, Java Script, Git Hub Blog ]
addsence: true
excerpt: 단순히 Git Hub Blog 제작을 위해서 만들어진 테마를 Fork를 이용하여 제작하는 것이 아닌 Jekyll + Ruby + HTML + SCSS + Java Script를 사용하여 제작하는 방법을 설명하고 있습니다. 해당 과정은 블로그를 제작함으로 인해 발생했던 트러블 슈팅과 마크다운의 팁에 대해서 이야기하고 있습니다. 
---

앞서서는 구글 검색엔진에 올리기 위해서 변경하거나 필요했던 코드들을 이야기했습니다.   
그럼 이제 블로그를 작성하면서 발생했던 트러블 슈팅과 마크다운 팁에 관해서 적어보겠습니다.  


<br>

---

<br>

## <blue1_h2> 1. 트러블 슈팅 </blue1_h2>

Git Hub Blog를 제작하면서 난감했던 트러블 슈팅을 적어보겠습니다.


<br>
### <blue1_h3> 1) _page 폴더 제작시 내용을 읽을 수 없는 에러 </blue1_h3>

_page 폴더 안에 카테고리 항목을 보여주는 페이지를 저장해 놨지만, 해당 디렉토리를 jekyll를 사용하여 불러 올 수 없었습니다.  
따라서 pages라는 폴더를 만들고 읽어오는 방식으로 코드를 수정하였습니다.  


<br>
### <blue1_h3> 2) 알수없는 Git Hub rendering 에러 </blue1_h3>

해당 트러블 슈팅 내용은 오랫동안 기억에 남을 것 같습니다.  
visual code를 사용하여 블로그의 형태를 html과 scss로 제작하였습니다.  
visual code를 사용했을 당시에는 아무 문제가 발생하지 않아서 Git Hub에 올리게 되었습니다.  

3분후에 깃 허브를 통해서 이메일로 알림을 받게 됩니다.  
![문제의 에러 메일](https://github.com/kj1241/kj1241.github.io/assets/22047442/826be0b2-ce48-4de5-a02b-89b71dadd725){: width="50%" }

깃 허브에 저장은 되고 빌드는 되었지만 페이지를 구축하지 못했다는 알림을 받게 되었습니다.  
  

![에러 당시 깃 허브 워크플로](https://github.com/kj1241/kj1241.github.io/assets/22047442/ea08108f-a358-441c-9c9b-6a18572f2fe7){: width="100%" }
![깃 허브 워크플로 빌드 에러 세부 사항](https://github.com/kj1241/kj1241.github.io/assets/22047442/1bfd90d6-94ac-4f9a-9fef-dad60be63b46){: width="100%" }


워크플로를 보는 당시 아무리 에러내용을 찾아보는 찾을 수가 없었습니다.  
깃 허브로 올리는 시간은 40초 밖에 안되었기 때문에 타임에러일 확률은 존재하지 않았습니다.  
어디서 에러가 났는지 제시해 주지 않아서 황당했습니다.   

에러에 대한 힌트도 없었음으로 무언가 검색 해서 도움을 받을 수도 없었습니다.  
제가 할 수 있는 유일한 방법은 탐색적 방법으로 하나 하나씩 제거해가면서 에러를 일으키는 원인을 찾는 것이였습니다. 
  
해당 방법으로 원인을 찾아서, color의 값으로 RGBA를 사용한거에 무언가 문제가 있다는 것을 확인한후 RGBA함수를 이용하는 것보다 16진수를 이용하여 사용하는 방식으로 바꾸어서 해결 하였습니다.  
  
물론 이런 실험으로 에러를 찾는 것은 재미있었으나, 브런치를 파서 실험해야된다는 생각을 하지 못해서 main으로 실험해서 히스토리 오염시켰기 때문에 새로 레파지토리를 만들게 되었습니다.  


<br>
<br>

## <blue1_h2> 2. 마크다운 글 작성할 때 팁 </blue1_h2>

일단, 미리 말씀드리면 웹 프론트에 전공하지 않았기 때문에 그냥 저의 마음대로 마크다운 작성하는 비법입니다.  
전부 공식적으로 적혀있는 방법은 아니기 때문에 그냥 이렇게 적었구나 하고 넘어가시면 됩니다.  

<br>

### <blue1_h3> 1) 색상 지정 </blue1_h3>

저도 특정한 색을 많이 사용하는데, 마크다운 사용하시는 분이나 html 사용하시는 분들 뭔가 고정적으로 많이 사용하는 색이 존재하실 겁니다.  
그러면 SCSS에 이상한 헤더 속성을 등록시키는 겁니다.

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

요런 방식으로 본인이 인식하고 있는 단어에 특정 색을 배합해 놓는 것입니다.  

{% raw %}
Input: &lt;yellow1_h2&gt;요런식으로 &lt;/yellow1_h2&gt; &lt;yellow1_h3&gt;작성해 봅시다.&lt;/yellow1_h3&gt;
{% endraw %}
Output: <yellow1_h2>요런식으로 </yellow1_h2> <yellow1_h3>작성해 봅시다.</yellow1_h3>
  

일단 위의 방법은 <red1_error>공식문서</red1_error>에 없습니다.  
html 방식을 넣어서 문서를 자주 작성하는게 피곤해서 다양하게 실험해보다 알아내었습니다.  
평소에 자주쓰는 색들을 지정해서 편히 글자에 색을 입히세요.


<br>

### <blue1_h3> 2) 이미지 크기 조절 </blue1_h3>


```markdown

{% raw %}
![예시 이미지](https://example.com/image.jpg)
{% endraw %}

```

[CommonMark 표준 마크다운 공식문서](https://commonmark.org/)에 보면 단순히 이미지 표현은 위와 같습니다.  
이미지 크기를 조절하려면 html문법을 이용해야합니다. 

```html

{% raw %}
<img src="https://example.com/image.jpg" alt="예시 이미지" style="width:300px;"/>
{% endraw %}

```

물론 이렇게 사용해도됩니다.  
어짜피 마크다운 문서는 html로 이루어저서 html 문법을 사용해서 작성해도됩니다.  
하지만 글을 작성하다보면 불편합니다.  

그렇기 때문에 마크다운 확장형식을 이용하여 코드를 작성할 수도 있습니다.  


```markdown

{% raw %}
![예시 이미지](https://example.com/image.jpg){: width="300px"  height="200px" }
{% endraw %}

```

이런 형식으로 작성하면됩니다.  
저희는 모바일의 시대에 살고 있습니다.  
위와 같은 형식은 이미지 크기를 고정시키기 때문에 반응형으로 포스트를 사용 할 수 없습니다.  
그렇기 때문에 포스트를 반응형으로 작성하시고 싶은 신 분들은 다음과 같이 사용하면 됩니다. 


```markdown

{% raw %}
![예시 이미지](https://example.com/image.jpg){: width="100%" }
{% endraw %}

```

위와 같이 코드를 작성하게 되면 가로의 크기는 정할 수 있지만 세로의 크기를 정할 수 없습니다.  
따라서 가로 세로를 원하는 비율로 만들고 싶으신분들은 다음과 같이 사용하시면 됩니다.  

```markdown

{% raw %}
![예시 이미지](https://example.com/image.jpg){: width="100%" style="aspect-ratio:16/9"}
{% endraw %}

```

위와 같이 사용하면 가로는 상위 부모 객체의 크기에 100%가 되고 세로는 가로 크기에 9/16으로 만들어질 것입니다.  
확장된 문법을 사용하면 좀더 편히 블로그를 작성 하실수 있습니다.  



<br>

### <blue1_h3> 3) 접는 글 사용하기 </blue1_h3>

깃허브 블로그에 접는 글을 필요한 경우가 있습니다.  
글의 가독성이 나빠지고 접는 글로 숨겨야하는 글이 필요할 때가 있습니다.  
마크다운은 오래된 문법이라 공식적으로는 접는 글이 존재하지 않습니다.  

따라서 html5에 존재하는 접는글을 가져올 필요성이 있습니다.  

```html 

<!--Input:-->

<details>
<summary> 접는 글 </summary>

이것은 접는 글입니다.  

</details>

```

위와 같이 코드를 작성하면 아래와 같이 결과를 얻을 수 있습니다.  

<blue1_h5> OutPut: </blue1_h5>

<details>
<summary> 접는 글 </summary>

이것은 접는 글입니다.  

</details>


이렇게 접는 글을 쉽게 만들 수 있습니다. 


<br>

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

하지만 위 처럼 접는 글 안에 이미지, 코드 하이라이트등을 사용하려면 위와 같이 에러가 발생합니다.  
마크다운 코드 자체가 안에서 작동 하지 않습니다. 

![깃 허브 gist 사용 접는 글](https://github.com/kj1241/kj1241.github.io/assets/22047442/d420ca90-042b-4f20-8016-40ba52ee3fdf){: width="100%" }

그러나 깃 허브 gist에서 빠르게 접는 글을 살펴본 결과 details 안에 마크다운이 사용 되었습니다.  
깃 허브, 루비 공식문서, 구글 전부 뒤저본 결과 마크다운에도 다양한 확장자와 버전들이 있다는 것을 알았습니다.  
따라서 여러분이 위의 Git hub gist처럼 접는 글 안에 이미지, 마크다운, 코드하이라트 등을 넣고 싶다면 이것을 지원하는 확장자를 선언해야합니다.

```

//_config.yml
kramdown:
  parse_block_html: true

```

_config.yml 파일 안에 위처럼 parse_block_html 버전으로 마크다운 사용하겠다고 선언하면 해결됩니다.  
하지만 버전이 여러개라는 말은 분명 마크다운 용법이 충돌 나는 경우의 수도 생긴다고 볼 수 있습니다.  
그럼 수십개 혹은 수백의 글을 고쳐야되는 상황이 올 수도 있습니다.  

따라서 _config.yml 사용하지 않고도 안에 적용하는 방법을 알아냈습니다.  

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


위처럼 코드를 작성하면 _config.yml를 작성하지 않고도 쉽게 마크다운 용법이 적용되는 details을 제작 할 수 있습니다.  

<br>

---

<br>

더 많은 트러블 슈팅과 팁이 있는 것 같았지만, 지금 당장 생각나는 팁은 이정도 인거 같습니다.  
혹시라도 더 좋은 팁이 생긴다면 추가로 적겠습니다.  
읽어주셔서 감사합니다.  