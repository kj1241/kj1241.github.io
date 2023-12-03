---
layout: post
title:  "Jekyll를 이용해서 github blog 만들기 1 기본 설치"
date:   2023-12-02 13:45:04 +0900
image: https://github.com/kj1241/kj1241.github.io/assets/22047442/8c8c4576-8cd2-4bb6-b337-46067fa5449d
toc: true
categories: [Web]
tags: [Jkeyll, Ruby, HTML, SCSS, Java Script, Git Hub Blog ]
addsence: true
excerpt: 단순히 Git Hub Blog 제작을 위해서 만들어진 테마를 Fork를 이용하여 제작하는 것이 아닌 Jekyll + Ruby + HTML + SCSS + Java Script를 사용하여 제작하는 방법을 설명하고 있습니다. 해당 내용은 처음부터 Jekyll를 사용하여 기본 블로그를 만들기 위해서 필요 프로그램을 설치하는 방법에 대해서 설명하고 있습니다.
---

앞서 이야기해드릴 것이 있습니다.  
우선 저는 front-end의 전문적인 이론에 관해서 하나도 모릅니다.  
기본적인 프로그래밍 지식으로 어떻게 사이트를 만들었는지에 관해서 로그를 작성합니다.  
  
다른사람이 만들어 놓은 Jekyll 테마를 이용하여 Git Hub Fork를 이용하여 30분만에 간단하게 사이트를 만드실 분은 다른 좋은 사이트들나 무료 유튜브 강의들이 있으니 참고하시면 됩니다.  
그럼 한번 살펴봅시다.

<br>

---

<br>

## <blue1_h2> 1.새로운 Repository 생성 </blue1_h2>

![깃 허브 레포지토리 생성](https://github.com/kj1241/kj1241.github.io/assets/22047442/5862148e-cfe9-47e4-a387-4a546848c9a7){: width="100%" }
*깃허브 레포지토리 생성*
  
이미 깃 허브가 있으시거나, 새로 아이디를 만드신 후 새로운 레포지토리(repository)를 생성해줍니다.  
레포지토리 이름은 다르게 지으셔도 되지만, 처음부터 다르게 지으면 설정하기 힘들 수 있으니, <blue1_h5><"깃허브 id">.github.io</blue1_h5>로 지정합니다.
  
<br>
<br>

## <blue1_h2> 2.로컬 환경에서 블로그 Repository 복제 </blue1_h2>

![로컬로 Repository 복제](https://github.com/kj1241/kj1241.github.io/assets/22047442/011d8664-9a01-4f77-90e9-c2f9f3b0a2ba){: width="100%" }
*로컬로 Repository 복제*
  
원하는 로컬 폴더 주소창에 "CMD"를 사용하여 명령 프롬프트를 열어 줍니다.  
(아니면 터미널 또는 Git Bash를 열어도 됩니다.)  

```bash
    git clone https://github.com/username/username.github.io.git
```

그럼 <blue1_h5>git clone <"git 레파지토리 복제 주소"></blue1_h5>를 사용하여 로컬 환경으로 폴더를 복사 해줍니다.  

<br>
<br>

## <blue1_h2> 3. (Window 10) Ruby 설치 </blue1_h2>

![Ruby 설치](https://github.com/kj1241/kj1241.github.io/assets/22047442/8c8c4576-8cd2-4bb6-b337-46067fa5449d){: width="100%" }
*Ruby 설치 화면*
  
리눅스라면 Jekyll를 사용하기 위해서 구지 루비를 받을 필요가 없습니다.  
하지만 운영체제가 Window 10이기 때문에 Jekyll를 사용하려면 루비를 다운받아야 합니다.  
[Ruby 공식사이트](https://www.ruby-lang.org/en/downloads/)에서 설치 하실 수 있습니다.  
( 저 같은 경우는 현재 최신 버전 3.22를 다운 받았습니다. )  


## <blue1_h2> 4. Jekyll 과 Bundler 설치 </blue1_h2>

<br>

### <blue1_h3> 1) 로컬에 Jekyll 설치 </blue1_h3>
  
```bash
    gem install jekyll bundler
```

명령어 gem을 통하여 Jekyll와 bundler을 설치해 줍니다.


<br>

### <blue1_h3> 2) Jekyll 블로그 생성 </blue1_h3>

![Jekyll 생성](https://github.com/kj1241/kj1241.github.io/assets/22047442/bde6b996-69a1-46b5-b7f0-224105c1f1f6){: width="100%" }
*Jekyll 생성 화면*

```bash
    jekyll new username.github.io -- force
    cd username.github.io
```

이미 <blue1_h5>username.github.io 존재</blue1_h5>하기 때문에 강제로 Jekyll를 설치해줍니다.
<h6> 여기서 "--force"는 강제로 설치하는 옵션입니다.</h6> 


<br>
<br>

##  <blue1_h2> 5. (Window) minima 테마를 로컬 폴더에 복사</blue1_h2>

Jekyll를 설치했지만 실행이 안되시는 분들이 있을 수도 있습니다.  
그러면 해결 할 수 있는 방법을 알려드리겠습니다.  

```bash
    C:\Ruby32-x64\lib\ruby\gems\3.2.0\gems\minima-2.5.1
```


리눅스는 명령어로 minima 테마를 옮길 수 있지만, 루비를 설치해야하는 윈도우는 직접 찾아서 들어가야합니다.

![윈도우 minima테마 옮기기](https://github.com/kj1241/kj1241.github.io/assets/22047442/832997eb-a94d-4289-896c-2f75249771c7){: width="100%" }
*Window minima 테마 옮기기*

minima 테마를  (nickname).github.io 폴더에 옮기면 됩니다.


<br>
<br>

##  <blue1_h2> 6. Thema Minima 지우기 </blue1_h2>

기본적으로 Jekyll을 생성하면 Minima 테마는 제공해 줍니다.  
하지만 Minima 테마를 사용하지 않을 것이기 때문에 __config.yml과 Gemfile에 있는 Minima의 흔적을 제거해 줍니다.

![_config minima 제거](https://github.com/kj1241/kj1241.github.io/assets/22047442/82c96f08-1d34-4455-8b7d-45c34f9a9575){: width="100%" }
*_config minima 제거*

  
![Gemfile minima 제거](https://github.com/kj1241/kj1241.github.io/assets/22047442/a267dd1f-db88-495b-a013-52361ef6de24){: width="100%" }
*Gemfile minima 제거*
  

### <blue1_h3> Minima 제거시 에러 처리 방법 </blue1_h3>

위와 같이 minima를 주석처리하게 되면, 분명 에러가 발생 할 것입니다.  

![minima 제거시 에러 발생 ](https://github.com/kj1241/kj1241.github.io/assets/22047442/c446a942-7bb3-45fb-a68e-82e16d7e40a4){: width="100%" }
*minima 제거시 발생하는 에러*

이 이유는 포스터에서 기본적으로 minima 테마에서 seo-tag를 사용하고 있기 때문입니다.

![seo-tag 설치](https://github.com/kj1241/kj1241.github.io/assets/22047442/a107e024-aeb2-470f-8275-76c0ebd89f24){: width="100%" }
*seo-teg 설치*

```bash
    gem install jekyll-seo-tag
```

따라서seo-tag를 설치해 줍니다.

![_config seo-tag 추가](https://github.com/kj1241/kj1241.github.io/assets/22047442/4c4d8de3-664d-46c1-8739-54d482ac6e69){: width="100%" }
*__config에 seo-teg 추가*
  
![Gemfile seo-tag 추가](https://github.com/kj1241/kj1241.github.io/assets/22047442/a4118ecb-8510-45b0-9f87-7960aca51857){: width="100%" }
*Gemfile에 seo-teg 추가*

그리고 나서 __config.yml과 Gemfile에 jekyll-seo-tag를 추기하면됩니다.

<br>
<br>

## <blue1_h2> 7. 생성 확인 </blue1_h2>

![설치 생성 확인](https://github.com/kj1241/kj1241.github.io/assets/22047442/eaa0b052-ad49-452a-96b6-0cd61ccb1895){: width="100%" }
*설치 생성 확인*

```bash
   bundle exec jekyll serve
```

생성된 블로그를 확인하기 위해서 <blue1_h5>웹 브라우저에서 http://localhost:4000에 접속</blue1_h5> 해서 확인해 봅시다.   

![결과](https://github.com/kj1241/kj1241.github.io/assets/22047442/663c3d09-02b2-4295-bd06-ed52b67e683a){: width="100%" }

다음과 같이 결과물을 얻으실 수 있습니다.
저는 visual code를 사용하여 블로그를 작성하고 있습니다.


<br>

---
***

참고자료:
1. [Bill Raymond님의 유튜브](https://www.youtube.com/@bill-raymond/featured)
2. [Jekyll 공식 사이트](https://jekyllrb.com/docs/collections/)
3. [Git hub 문서](https://docs.github.com/en/pages/setting-up-a-github-pages-site-with-jekyll/about-github-pages-and-jekyll)

***
---

<br>

그럼 이제 블로그를 만들 준비가 끝났습니다.  
다음 편에는 좀 더 블로그 세부적인 내용에 대해서 이야기 하겠습니다.  
