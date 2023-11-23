<!-- ---
layout: post
title:  "Web Front 개발자 도구를 이용하여 스타일 분석하고 사용하기"
date:   2023-01-14 17:59:05 +0900
image: https://github.com/kj1241/kj1241.github.io/assets/22047442/2e8397ce-1a69-4189-be7b-cf513e6b903a
toc: true
categories: []
tags: [HTML, CSS, Web Front, 리버스 엔지니어링]
addsence: ture
---
 -->


<h2><green1_h2> 0.리버스 엔지니어링 </green1_h2></h2>
리버스 엔지니어링(Reverse Engineering)은 어떤 제품, 시스템, 소프트웨어 등의 내부 동작 원리를 이해하거나 재구축하기 위해 진행되는 프로세스를 가리킵니다.  
이는 주로 이미 제품이나 소프트웨어가 존재하는 상황에서, 그 내부 동작 원리를 파악하고자 할 때 사용됩니다.  
   
<highlight_orange>즉, 시스템 구조 분석을 통해 그 원리를 발견하는 과정입니다.</highlight_orange>
  
<span><red1_error>※주의사항:</red1_error> 이진코드를 분석하지 않으면 불법은 아니지만 <red1_error>악용</red1_error>하면 불법이 될 수 있습니다.</span>

<br>
종종 웹 프런트 프로그래밍을 하다 보면, 벤치마킹한 웹들 혹은 다른 오픈소스 파일을 사용하거나 협력 작업을 할 때  코드 구조가 궁금해질 때가 있습니다.  
이때 우리가 이용할 수 있는 강력한 도구가 있습니다.
  
바로 인터넷의 <highlight_orange>개발자 도구(F12)</highlight_orange>입니다.
  
개발자 도구는 디버깅을 사용할 때뿐만 아니라, HTML+CSS+JS 정보 및 구조 코드를 편하게 알 수 있도록 만들어 줍니다.  
이를 통해 웹 페이지의 동작 원리를 분석하고 코드 구조를 쉽게 확인할 수 있습니다.  


<h2><green1_h2> 1.리버스 엔지니어링 </green1_h2></h2>

