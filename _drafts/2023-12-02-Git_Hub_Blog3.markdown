---
layout: post
title:  "Jekyll를 이용해서 github blog 만들기 3 트러블 슈팅과 마크다운 작성 팁"
date:   2023-12-02 23:00:04 +0900
image: 
toc: true
categories: [Web]
tags: [Jkeyll, Ruby, HTML, SCSS, Java Script, Git Hub Blog ]
addsence: true
description: 단순히 Git Hub Blog 제작을 위해서 만들어진 테마를 Fork를 이용하여 제작하는 것이 아닌 Jekyll + Ruby + HTML + SCSS + Java Script를 사용하여 제작하는 방법을 설명하고 있습니다. 제작하는 과정에서 발생한 트러블 슈팅과 마크다운 제작 팁음 담았습니다.
---

앞서서는 Git Hub Blog에 제작된 언어별로 어떻게 역활을 맡고 있는지 확인 했습니다.  
그럼 이제 구글 서치 콘솔에 필요한 팁과 제작하면서 발생한 트러블 슈팅, 마크다운 작성할 때 개인적인 팁에 대해서 작성해 보겠습니다.


<br>

---

<br>

## <blue1_h2> 1. 깃 허브 블로그 완성하면 체크해야 될 일들 </blue1_h2>
블로그 완성하면 여간 손이 가는게 아닙니다.  
티스토리에서는 내부적으로 지원해주던 것들을 깃 허브 블로그는 전부 유저가 채크해야 합니다.  
그럼 한번 살펴 봅시다.

<br>

### <blue1_h3> 1) 구글 PageSpeed Insights 성능 체크하기 </blue1_h3>

블로그 품질을 객관적으로 채크해주는 사이트가 있습니다.  
PageSpeed Insights에 들어가서 문제되는 부분들을 수정하고 성능을 끌어올리시면 됩니다.

![구글 PageSpeed Insights 수정 전](https://github.com/kj1241/kj1241.github.io/assets/22047442/edf188c1-7bce-41ba-9ec2-9706c99022f3){: width="100%" }
*구글 PageSpeed Insights 수정 전*
  
1. 링크에 설명 텍스트가 없음
description이 존재하지 않아서 생기는 문제입니다.  

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
page마다 description을 추가해주거나, 존재하지 않으면 _config.yml에 있는 description을 참조하게 해줍니다.
  
  
2. 링크를 크롤링 할 수 없음

<a herf ='uml'> 로 이루어져야 하지만, 링크는 없고 <a>만 존재하는 html을 전부 <div>로 수정해 줍니다.









<br>

---

<br>

이 처럼 본인이 변경하고 싶은 영역을 생각하고 해당하는 언어를 만지면 쉽게 블로그를 개조 할 수 있을 것입니다.  
다음 편에는 블로그를 제작하면서 황당했던 에러와 블로그 글을 작성하면서 나름 소소한 팁(?)으로 가져오겠습니다.  
