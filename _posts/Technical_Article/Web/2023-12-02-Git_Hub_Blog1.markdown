---
layout: post
title: "Jekyll를 이용해서 GitHub blog 만들기 1 - 기본 설치"
date: 2023-12-02 13:45:04 +09:00
image: https://drive.google.com/thumbnail?id=161gUg11aSRhUYWbw-QZtPiKdd30S9_yI
toc: true
categories: [Web]
keywords: Jkeyll, Ruby, HTML, SCSS, Java Script, GitHub Blog , 깃 허브 블로그 제작 시작하기
lastmod: 2024-08-03 15:53:00 +09:00
sitemap:
  changefreq : daily
  priority : 1.0
addsence: true
excerpt: 이 글은 GitHub 블로그를 만드는 방법과 팁에 대해 설명합니다. GitHub에서 새로운 리포지토리를 생성하고, Jekyll을 이용하여 로컬에서 블로그를 설정하는 방법을 안내합니다. 또한, Minima 테마를 제거하고 필요한 플러그인을 설치하는 과정도 포함되어 있습니다.
related_links:
  - url: /web_tp/Git_Hub_Blog_Skin.html
  - url: /web/Git_Hub_Blog2.html
  - url: /web/Git_Hub_Blog3.html
  - url: /web/Git_Hub_Blog4.html
---

깃 허브 블로그를 만드는 방법과 팁에 관해서 이야기하고 있습니다. 저의 블로그는 서식부터 제작했기 때문에 제 맘대로 만들었습니다. 따라서 이 글은 이론을 설명하기보다 깃 허브 블로그를 만드시는 분들에게 줄 수 있는 팁에 대해서 설명하고 있습니다. 예전에는 누구랑 논쟁하기 싫어서 그냥 모른다고 적어놨지만, 궁금하신 점이 있으면 물어보셔도 됩니다.  
  
혹시 다른 사람들이 만들어놓은 Jekyll 테마를 이용하거나, GitHub Fork를 이용하여 30분 만에 간단하게 사이트를 만드실 분들은 다른 사이트 혹은 유튜브에 강의가 많음으로 참조하시면 됩니다.  

그럼 시작해봅시다.

<br>

---

<br>

## <web_h2>1.새로운 Repository 생성</web_h2>

깃 허브 블로그를 만들기 위해 가장 먼저 해야 할 일은 새로운 레포지토리를 생성하는 것입니다.

![레파지토리 생성]({{ site.google_drive }}1D8aol0Wml3xSNjkqvnTYXY5g3Wq_7VQO{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<web_h6>깃 허브 레포지토리 생성</web_h6>*  
  
깃 허브 아이디가 있으시거나 새로 아이디를 만드신 후에 새로운 레포지토리(repository)를 생성합니다. 레포지토리 이름은 다르게 지어도 되지만, 처음부터 다르게 지으면 설정이 힘들 수 있으니,  <web_h5>＂깃 허브 id＂.github.io</web_h5>로 지정합니다. 규칙대로 이름을 안 지어도 상관없지만, 설정이 귀찮아질 수 있으므로 웬만하면 규칙대로 이름을 짓고 레포지토리를 생성해 주세요.
  
<br>
<br>

## <web_h2>2.로컬 환경에서 블로그 Repository 복제</web_h2>

깃 허브에서 레포지토리를 생성했다면 로컬에서 작업할 공간이 필요합니다. 따라서 로컬 환경으로 복제해 봅시다.

![로컬로 Repository 복제]({{ site.google_drive }}1R6r6OV96c77eq98if0BLFXv1jNwLWV5d{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<web_h6>로컬로 Repository 복제</web_h6>*
  
디렉터리를 설치하기 위해 원하는 로컬 폴더 주소창에 "cmd"를 사용하여 명령 프롬프트를 열고 명령어를 작성해 줍니다. (아니면 터미널 또는 Git Bash를 열어도 됩니다.)

#### **<web_h4>cmd:</web_h4>**

```bash

    git clone https://github.com/username/username.github.io.git

```

username이란 곳에는 여러분의 깃 허브 아이디를 넣으시면 됩니다. 위와 같이 명령 프롬프트 창에 명령어를 사용하셨으면, 정상적으로 로컬 환경에 폴더가 생겼을 것입니다.

<br>
<br>

## <web_h2>3. (Window 10) Ruby 설치</web_h2>

리눅스에서 Jekyll을 사용하시면 굳이 루비까지는 설치할 필요가 없습니다. 리눅스에서는 Jekyll만 설치해도 실행이 됩니다. 하지만 윈도우 운영체제를 사용하시면 Jekyll을 사용하기 위해 루비를 설치해야 합니다.

![루비설치]({{ site.google_drive }}161gUg11aSRhUYWbw-QZtPiKdd30S9_yI{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<web_h6>Ruby 설치 화면</web_h6>*

루비는 [Ruby 공식사이트](https://www.ruby-lang.org/en/downloads/)에서 설치할 수 있습니다. (설치 당시 최신버전 3.22를 다운 받았습니다.)

<br>
<br>

## <web_h2>4. Jekyll 과 Bundler 설치 </web_h2>

루비 안에 Jekyll이 있으므로 함께 설치해줍니다. Bundler는 루비에서 필요한 gem들의 올바른 버전을 추적하고 설치해 일관된 환경을 제공해주는 역할을 합니다. 따라서 Jekyll을 올바르게 관리할 수 있도록 설치해 줘야 합니다.

<br>

### <web_h3>1) 로컬에 Jekyll과 Bundler 설치</web_h3>
  
루비에 들어있는 Jekyll과 Bundler을 설치하는 방법입니다.

#### **<web_h4>cmd:</web_h4>**

```bash

    gem install jekyll bundler

```

cmd 창에서 위의 명령어를 입력하시면 Jekyll과 Bundler을 설치할 수 있습니다.

<br>

### <web_h3>2) Jekyll 블로그 생성 </web_h3>

Jekyll과 Bundler을 설치하셨으면, 이제는 기본 블로그를 생성해야 합니다.

![Jekyll 설치]({{ site.google_drive }}1UNjZGFFdW7giPeSRoUGxCetn7PbVW6yw{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<web_h6>Jekyll 생성 화면</web_h6>*

#### **<web_h4>cmd:</web_h4>**

```bash

    jekyll new username.github.io -- force
    cd username.github.io

```

블로그를 생성하는 명령에서 --force를 사용하는 이유는 이미 깃 허브 레포지토리에서 폴더를 생성했기 때문입니다. 따라서 강제로 설치해서 생성하는 옵션입니다.

<br>
<br>

## <web_h2>5. (Window) minima 테마를 로컬 폴더에 복사</web_h2>

만약 Jekyll을 설치했지만, 실행이 안 되시는 분들이 있을 수 있습니다. 혹은 Jekyll을 처음 접해서 시작해 보시는 분들에게 가장 기본적 구성을 어떻게 작성해야 하는지 모르실 수 있습니다. 이때 참고하는 방법을 알려 드리겠습니다.  

#### **<web_h4>cmd:</web_h4>**
 
```bash

    C:\Ruby32-x64\lib\ruby\gems\3.2.0\gems\minima-2.5.1

```

minima 테마는 루비를 설치할 때 제공하는 예시 서식입니다. 리눅스에서는 명령어로 간단하게 minima 테마를 옮길 수 있지만, 윈도우 버전에서는 루비 폴더에서 찾아 수동적으로 옮겨야 합니다.

![윈도우에서 minima테마 옮기기]({{ site.google_drive }}1lllsKSTBp-pIOK0amg1zsV98IQONFjPg{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<web_h6>Window minima 테마 옮기기</web_h6>*

위와 같이 루비 폴더에서 minima 테마를 찾으셨다면 복사해서 깃 허브 블로그로 옮긴 후 커밋해봅시다. 이제 인터넷 창에 &lt;＂깃 허브 id＂&gt;.github.io 주소로 접속하시면 블로그가 생성되었을 것입니다. 커밋한 다음 최대 10분 동안 기다려야 보일 수 있습니다.

<br>
<br>

##  <web_h2>6. Thema Minima 지우기 </web_h2>

처음부터 폴더 구조와 코드를 작성하신 분들은 참고하지 않으셔도 됩니다. 만약 Minima 테마를 설치하고 지워서 활용하시는 분들은 이 파트를 보시면 됩니다. 

![루비설치]({{ site.google_drive }}1tXAajZL62GTXHwMz1I9xc7Kd23Iv-HAm{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<web_h6>_config.yml minima 제거</web_h6>*

#### **<web_h4>_config.yml:</web_h4>**

```bash

#hema: minima

```

minima 테마를 설치하셨다면 _config.yml에서 minima를 주석 처리하시면 됩니다.

![Gemfile minima 제거]({{ site.google_drive }}1AtGQEbXTi13uQMRdLg315z2xtxKFuCwL{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<web_h6>Gemfile minima 제거</web_h6>*

#### **<web_h4>Gemfile:</web_h4>**

```bash

#gem "minima", "~> 2.5"

```

버전 2.5로 설치하고 관리하던 minima 테마를 Gemfile에서 주석 처리해줍니다.

<br>

### <web_h3> Minima 제거시 에러 처리 방법 </web_h3>

위의 코드를 제거하거나 주석 처리하면 관련된 부분에서 에러가 발생할 것입니다. 발생한 에러의 원인을 찾아서 해결해 봅시다.

![minima 제거시 에러 발생]({{ site.google_drive }}15hOSPf0724ZARvdf9f8RczA0re3SL3Sl{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<web_h6>minima 제거시 발생하는 에러</web_h6>*

Minima를 제거하면 위와 같은 에러를 마주하게 됩니다. 이는 기본적으로 minima 테마에서 정의되지 않은 seo-tag를 사용하고 있기 때문입니다.

![seo-tag 설치]({{ site.google_drive }}10IqVDZa7HzcRsCr4ZmDWJJ960xemRj1d{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<web_h6>seo-teg 설치</web_h6>*

#### **<web_h4>cmd:</web_h4>**

```bash

    gem install jekyll-seo-tag

```

터미널에 들어가 명령어를 사용해 jekyll-seo-tag를 설치해줍니다. 설치 후 _config.yml과 Gemfile 파일에 seo tag를 정의해줘야 합니다.

![_config.yml seo-tag 추가]({{ site.google_drive }}13XkADrWAcKDvCci2DAxvLSpTkIM3VGot{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<web_h6>__config.yml seo-teg 추가</web_h6>*

```bash

    Plugin:
        ...  #다른 플러그인이 더 있을수 있습니다.
        - jekyll-seo-tag

```

_config.yml plugins에 seo tag를 선언해 줍니다. _config.yml는 전역 변수를 설정하는 파일입니다. 여기에 추가해도 에러가 날 수 있습니다. 

![Gemfile seo-tag 추가]({{ site.google_drive }}1QHTHmacI-QP9vjldTqj8sahgUCegIIv_{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<web_h6>__config.yml seo-teg 추가</web_h6>*

```bash

    gem 'jekyll-seo-tag'

```

에러를 피하고자 버전 관리할 수 있는 Gemfile에도 seo tag를 정의해주면 트레블 슈팅도 해결할 수 있습니다.

<br>
<br>

## <web_h2>7. 생성 확인</web_h2>

에러를 해결했으면 이제 정상적으로 생성되는지 확인해 봅시다.

![Gemfile seo-tag 추가]({{ site.google_drive }}1sS4jIfLUrpo0Q6VMvrSotK3MDvnJM5WV{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<web_h6>설치 생성 확인</web_h6>*

다음의 코드를 사용하여 로컬 서버를 만들 수 있습니다.

#### **<web_h4>cmd:</web_h4>**

```bash

    bundle exec jekyll serve

```

이 명령어를 사용하면 정적 페이지를 확인할 수 있는 서버가 만들어집니다. 그러면 블로그를 확인하기 위해 <web_h5>웹 브라우저에서 http://localhost:4000에 접속</web_h5>해 확인해 봅시다.

![Gemfile seo-tag 추가]({{ site.google_drive }}1IvM2V-6s7W7KHjsXSMQRNxvMjfdVzedE{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<web_h6>웹 페이지 접속 결과</web_h6>*

이제 깃 허브에 커밋하면 여러분만의 블로그를 제작할 수 있습니다. 저는 Visual Studio Code를 사용해 블로그를 작성하고 있습니다. 이제 블로그를 만들 준비가 끝났습니다. 다음 편에서는 블로그 커스터마이징 방법을 알려 드리겠습니다.

<br>

---

<br>

###### <web_h6>참고자료:</web_h6>
- ###### [Bill Raymond님의 유튜브](https://www.youtube.com/@bill-raymond/featured)
- ###### [Jekyll 공식 사이트](https://jekyllrb.com/docs/collections/)
- ###### [Github 문서](https://docs.github.com/en/pages/setting-up-a-github-pages-site-with-jekyll/about-github-pages-and-jekyll)
