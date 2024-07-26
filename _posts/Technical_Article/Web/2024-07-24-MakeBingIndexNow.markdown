---
layout: post
title: "Git Hub blog에서 IndexNow 연동해보기 - Gti Hub Action 사용"
date: 2024-07-24 09:00:00 +09:00
image: https://drive.google.com/thumbnail?id=1U514vC38J40UftFkXx61peJlR970hVpR
toc: true
categories: [Web]
keywords: bing, naver, yep, Seznam, Yandex
lastmod: 2024-07-24 09:00:00 +09:00
sitemap: 
  changefreq : weekly
  priority : 0.1
addsence: true
excerpt: 
related_links:
---

원래 GDC 분석글 하나 쓰려고했는데 IndexNow를 만들어서 우선 먼저 쓰게 되었습니다.
이런 글은 어디에 초점을 맞출지 몰르겠어서 일단 작성해봅니다.
원래는 귀찮아서 글을 지우고 싶었는데, 모르는 사람들을 위해서 작성합니다.

<br>

---

<br>

## <web_h2>1. WebSite Index 와 IndexNow 정의</web_h2>

IndexNow는 2021년 10월에 최초로 도입되었습니다. 이 프로토콜은 마이크로소프트와 야후가 운영하는 검색 엔진인 Bing 및 Yandex가 주도하여 개발하고 정의하였습니다. 현재는 Bing, Yandex 외에도 naver, yep, Seznam등이 IndexNow를 사용하고 있으며, Google 및 다른 검색엔진에서도 테스트와 채택을 검토하고 있습니다. 그럼 Index와 IndexNow에 대해서 알아보도록 하겠습니다.

<br>

### 1) Index

정의: Index는 검색 엔진이 정보를 빠르게 검색할 수 있도록 구조화된 데이터베이스입니다.

작동방식:
1. **데이터 수집:** 검색 엔진의 크롤러가 웹페이지를 방문해 콘텐츠, 메타데이터, 링크 등을 수집합니다.
2. **데이터 구조화:** 수집된 데이터를 검색 엔진이 효율적으로 검색할 수 있도록 구조화합니다.
3. **빠른 검색 결과 제공:** 인덱스를 통해 검색 엔진은 사용자 쿼리에 대해 관련성 높은 결과를 신속하게 제공합니다.


<br>

### 2) IndexNow

정의: IndexNow는 Bing과 같은 검색 엔진에서 제공하는 프로토콜로, 웹사이트 변경 사항을 검색 엔진에 신속하게 알릴 수 있습니다.

작동방식:
1. **변경 사항 알림:** 웹페이지가 추가되거나 업데이트되거나 삭제될 때, 웹사이트 소유자는 IndexNow 프로토콜을 통해 검색 엔진에 이를 즉시 알립니다.
2. **즉각적 인덱싱:** 검색 엔진은 이 알림을 받고 해당 페이지를 빠르게 크롤링하고 인덱싱합니다.

<br>
<br>

## <web_h2>2. IndexNow의 동작</web_h2>

앞서 Index와 IndexNow를 구경하였습니다. 위에 처럼 설명하면 IndexNow가 거창하고 복잡한것 처럼 느껴지실수 있습니다. 하지만 개념은 크게 어렵지 않습니다. 

![색인화 요청]({{ site.google_drive }}1asCzC30g-UUUzyZ--tBrOVxUgwyKD-pn{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<web_h6>색인화 요청 페이지</web_h6>*

위에 그림처럼 우리가 혹은 웹 마스터들이 빙 웹마스터 도구, 구글 서치콘솔, 네이버 서치어드바이스에서 사이트가 변화 되었을때, 혹은 어떠한 에러로 크롤링을 하지 못했을 경우 에러를 고치고 빠르게 알려야 할 필요가 생길때등 각 툴에서 사이트에서 색인화 요청을 합니다.
IndexNow는 이런 요청들을 통신하여 해결 할 수 있습니다. 그러면 해당 검색엔진 봇들이 요청을 바탕으로 크롤링하고 인덱싱을 할 것입니다. 즉, IndexNow는 코드를 사용해서 자동화하는 것이지 기존의 것을 대체하는 것은 아닙니다. 따라서 IndexNow를 사용하기전에 sitemap, robot.txt등이 사이트에 기본적으로 있어야 되는 것들이 필요합니다.

<br>
<br>

## <web_h2>3. IndexNow는 어떻게 Git Hub Blog에서 보낼수 있을까?</web_h2>

그럼 이제 언제, 어떤 방법, 어떠한 방식으로 이런 요청을 보내야하는지 고민해야 합니다. 미리 말씀드리지만, 저는 제가 고민한 방식을 보여줄 순 있지만, 이것을 범용적으로 사용할 수 있게 규격화 한다거나 그런 코드는 작성하지 않을 것입니다. 이는 사용자가 보내야하는 경우가 전부 다를 수 있기 때문입니다. (나머지 응용해서 발전시키는 것은 여러분 몫입니다.)

사실 웹서버나 서버가 존재하면 좀 더 쉽습니다. 서버 프로그래머나 백엔드 프로그래머한태는 일정 주기마다 패킷을 보내는 방식으로 쉽게 처리 할 수 있습니다. 하지만 Git Hub blog는 정적 사이트를 사용함으로 어떻게 해야할지 고민해봐야 합니다. 고민할 당시 두가지 방안을 생각했습니다.

1. ~~사이트에 유저가 방문하면 그때 자바스크립트를 이용하여 보냄.~~<red1_error>페기<red1_error>
2. 깃허브 블로그를 빌드할 때마다 검색 엔진에 변경 사항을 알림.

첫 번째 방법은 테스트 코드까지 작성했으나, 방문하는 유저의 인터넷망을 통해 패킷을 전송방식이기에 잘못 사용하면 악의적으로 이용될 수 있어 제외했습니다. 따라서 두 번째 방법으로 깃허브 블로그를 빌드할 때마다 알리는 방안으로 결정하였습니다. 이제 어떤한 방식으로 보내야 하는지 고민해야 합니다.

1. Ruby
2. Java Script
3. Git Hub Action

어떠한 방식을 사용해도 위의 문제를 해결 할 수 있지만, 저는 GitHub Action을 다뤄본 적이 없기 때문에 이번 기회를 통해 알아보고자 합니다. ~~(이거 완전 러키비키잖아!)~~ 이렇게 사용할 방식, 방법을 정했으면 이제 구체적으로 어떻게 방식으로 자동화 할지를 생각해봐야 합니다. 제가 정한 답은 다음과 같습니다.

- 처음 연동할 떄에는 사이트맵 수준으로 모든 사이트의 주소를 전송할 것.
- 그 후, 최신 글 기준으로 5~10개를 빌드할때마다 전송할 예정.

<br>
<br>

## <web_h2>4. Git hub Action 정의</web_h2>

**Git Hub Action 정의:** GitHub의 CI/CD 플랫폼으로, 리포지토리 내에서 자동화된 워크플로우를 설정할 수 있습니다.

- CI: 지속적 통합
- CD: 지속적 배포

CI를 하면 코드 품질 향상 효과와 통합 문제를 감소시키고, CD는 신속하고 안정된 기능 및 버그 수정 제공하며 시장 변화와 고객 피드백에 빠르게 대응할 수 있습니다.

개인적으로 이러한 용어가 와닿지 않아서 외워지지 않습니다 또한 문제해결하는데 필요한 이론이 아니라고 생각합니다. 실제로 저는 관심없는 분야기도 하지만 누군가한테는 중요한 영역이기 때문에 집고 넘어갔습니다.

저는 이제  GitHub Action을 통해 IndexNow를 구현하려고 합니다. 제가 생각하는 GitHub Action은 빌드 시 조건을 만들거나 커스터마이징하는 것입니다. 따라서 GitHub Action은 빌드할때마다 실행되기 때문에, IndexNow의 패킷 보내는 POST요청을 워크플로우에 담으면 된다고 생각합니다.

방법을 알려주기 앞서 제 워크플로우 실험 목록들을 잠시 보여드리겠습니다. 

![워크플로으 실험 목록들]({{ site.google_drive }}1U514vC38J40UftFkXx61peJlR970hVpR{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<web_h6>워크플로우 실험 목록들</web_h6>*

예전 이미지라 현재 제 워크플로우 목록은 이것보다 3배 이상으로 더럽습니다... 인터넷을 찾아도 제가 생각한 방식을 사용하여 만든 곳은 없어서 기본 이론들을 입각해서 실험해서 여러 방면을 체크해야 했기 때문입니다.  ~~(내 레파지토리는 오염됬어...)~~ 보통은 서브 브랜치를 파서 실험 하는 것이 맞지만, 검색 엔진과 통신해야하는데 서브 브랜치에서는 안될 것 같아서 메인에서 실험하게 되었습니다.

그 동안 실험한다고 일부로 만든 케이스들이 많은데. 그런 방법을 전부 작성하는 것은 힘들고 여러분들에게는 어떤 방식으로하면 IndexNow를 성공적으로 작성할 수 있는지 예시를 알려드리겠습니다.


<br>
<br>

## <web_h2>5. Git hub Action 사용하여 IndexNow 제작</web_h2>

해당 파트는 이제 기본적으로 Git hub Action을 사용하고 IndexNow를 제작해보고 테스트해보는 코드입니다.

<br>

### <web_h3>Generate API Key 텍스트 파일 생성</web_h3>

![Bing IndexNow GetStated Page]({{ site.google_drive }}1ODjybKS7rq2IOgaDkSE0zlXLAOQVmfMq{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<web_h6>Bing IndexNow GetStated Page</web_h6>*

가장 먼저 해야할 일은 [Bing IndexNow GetStated Page](https://www.bing.com/indexnow/getstarted)에 들어가서 API Key를 생성하고 보내는 방법을 읽는 것입니다. 사이트에 있는 Generate API Key를 잘 기억해 주세요.

![Generate API Key 텍스트 파일 생성]({{ site.google_drive }}1FieZnIOEi7HyP8leH5hw0OVrrzcs5nOI{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<web_h6>Generate API Key 텍스트 파일 생성</web_h6>*

그럼 이제 블로그 루트파일에 Generate API Key.txt 파일을 만들고 안에 내용을 Generate API Key를 작성해주세요. 그러면 해당 키를 읽으로 검색엔진 크롤러가 올 것입니다.

> ![Repository secrets 실험]({{ site.google_drive }}1nmYi4P1QKScfq2pQ5y_HIAspW2mrvDJF{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
  *<web_h6>Git Hub Blog Repository secrets 실험</web_h6>*
  처음에는 위의 방식처럼 Generate API Key를 암호화하고 사용하려고 했습니다. 암호화된 코드를 읽고 root 폴더에 txt파일을 생성하게 만들어봤지만 결국 검색엔진이 크롤링해서 읽어야하는데 읽지 못하는것 같아서 기본으로 돌아가서 루트폴더에 텍스트파일을 작성하게 되었습니다.

<br>

### <web_h3>workfolows 폴더 생성</web_h3>

![workfolows 폴더 생성]({{ site.google_drive }}13OX-alE8mgWqOQGx7-1Rmfyjj-1GXbI5{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<web_h6>workfolows 폴더 생성</web_h6>*

터미널에서 mkdir -p .github/workflows을 사용해서 폴더를 생성해도 되고 아니면 폴더를 만들으셔도 됩니다. 앞으로 이곳에 GitHub Action을 커스텀하기 위해서 yml 파일을 만들 것입니다.


<br>

### <web_h3>IndexNow.yml 파일 생성</web_h3>

![workfolows 폴더 생성]({{ site.google_drive }}13OX-alE8mgWqOQGx7-1Rmfyjj-1GXbI5{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<web_h6>workfolows 폴더 생성</web_h6>*

터미널에서 mkdir -p .github/workflows을 사용해서 폴더를 생성해도 되고 아니면 폴더를 만들으셔도 됩니다. 앞으로 이곳에 GitHub Action을 커스텀하기 위해서 IndexNow.yml 파일을 만들 것입니다.

```yml

name: IndexNow API Trigger

on:
  push:
    branches:
      - main  # 원하는 브랜치를 지정하세요

jobs:
  indexnow:
    runs-on: ubuntu-latest

    steps:
      # 1. 리포지토리 체크아웃
      - name: Checkout repository
        uses: actions/checkout@v3
      
      # # 2. 비밀값을 텍스트 파일로 저장
      # - name: Create secret text file
      #   run: |
      #     if [ ! -f "$ {{ secrets.INDEXNOW_KEY }}.txt" ]; then
      #       echo $ {{ secrets.INDEXNOW_KEY }} > $ {{ secrets.INDEXNOW_KEY }}.txt
      #     fi

      # # 3. 생성된 파일을 업로드
      # - name: Upload secret text file
      #   uses: actions/upload-artifact@v2
      #   with:
      #     name: secret-file
      #     path: "$ {{ secrets.INDEXNOW_KEY }}.txt"
      
      # 4. Bing 에게 IndexNow API 전송
      - name: Send POST request to IndexNow API
        env:
          HOST: kj1241.github.io
          KEY: Generate API Key # $ {{ secrets.INDEXNOW_KEY }}
          KEY_LOCATION: https://kj1241.github.io/Generate API Key.txt   # $ {{ secrets.INDEXNOW_KEY }}.txt
        run: |
          URL_LIST=$(cat <<EOF
          [
            "https://kj1241.github.io/",
            "https://kj1241.github.io/sitemap.xml"
          ]
          EOF
          )
          
          RESPONSE=$(curl -s -D - -w "\n%{http_code}" -X POST "https://www.bing.com/indexnow" \
          -H "Content-Type: application/json; charset=utf-8" \
          -d '{
            "host": "'"${HOST}"'",
            "key": "'"${KEY}"'",
            "keyLocation": "'"${KEY_LOCATION}"'",
            "urlList": '"${URL_LIST}"'
          }')

          # Split the response, headers, and the HTTP status code
          HTTP_HEADERS=$(echo "$RESPONSE" | sed -n '1,/^$/p')
          HTTP_BODY=$(echo "$RESPONSE" | sed '1,/^$/d' | sed '$d')
          HTTP_STATUS=$(echo "$RESPONSE" | tail -n1)

          echo "Response Headers: $HTTP_HEADERS"
          echo "Response Body: $HTTP_BODY"
          echo "HTTP Status: $HTTP_STATUS"

```

![IndexNow 전송 결과]({{ site.google_drive }}11tyUc6hHlp7jGxLOuLacCbITbzPQaun1{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<web_h6>IndexNow 전송 결과</web_h6>*

<red_error>응답 코드:202</red_error>로 내용을 보내는 데는 성공했습니다. 202코드는 내용을 수신했지만 처리하는데 지연된다는 코드입니다. 그럼 몇일 동안 기다리면 됩니다. 저는 5일정도 걸린거 같습니다. 부족하지만 중요한 코드 부분만 설명해보겠습니다. 
- HOST: 본인의 홈페이지나 블로그 처음 주수를 넣어야합니다.
- KEY: Generate API Key 숫자를 넣으세요
- KEY_LOCATION: Generate API Key가 있는 위치를 넣는 곳입니다. 보통은 root위치에 넣음으로 (홈페이지 주소 / Generate API Key.txt) 위치가 됩니다.
- urlList: IndexNow에 전송할 url 주소를 넣으세요. 여기 예제는 실험하기 위해서 제 블로그 주소와 사이트맵을 보내봤습니다.

![BWT IndexNow Portal 변화]({{ site.google_drive }}1GvAG26BBSVpmPJssUIfiYDPPYLpU11tN{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<web_h6> Bing Webmaster Tools Portal 변화</web_h6>*

만약 정상적으로 IndexNow를 수신하고 Bing에서 처리하게 되면 Bing Webmaster Tools에서 indexNow 탭은 위처럼 변하게 될 것입니다.

> ![IndexNow 패킷 에러]({{ site.google_drive }}1YH9tLLO2bsh64P8v9zdtCTCOYiBP-g2p{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
  *<web_h6>IndexNow 패킷 에러</web_h6>*
  패킷을 일부로 잘못 보내면 위의 그림과 같이 <red_error>응답 코드:400</red_error> (주어진 요청이 null이거나 유효하지 않다고 전달받았습니다.)이 롤백받게 됩니다.

<br>
<br>

## <web_h2>6. Jekyll를 이용해서 Git hub Action에서 IndexNow 보내기 </web_h2>

기본적으로 보내는 코드가 성공했다면 이제는 좀 더 심화과정으로 들어가야합니다. 원할때마다 URL_LIST를 키보드로 직접 작성하여 패킷을 보내야한다고 하면 안하는 것만 못할 겁니다. 사실 귀찮기도 합니다. 신경안써도 알아서 알려주는 자동화 로직을 작성할 것입니다.

<br>

### <web_h3>딱 한번 전체사이트 보내기</web_h3>

해당 코드는 처음 연동할때, 한번 전체 사이트 보내는 방법입니다.

![루비 버전 찾기]({{ site.google_drive }}1_sQRea7RCPQ9NYnSYU9Vn6iqFmvmEiBo{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<web_h6>루비 버전 찾기</web_h6>*

터미널에서 ruby -v 사용하여 설치된 루비버전을 찾습니다. 저 같은 경우는 블로그 만들 당시 최신버전을 설치해서 3.2.2버전입니다.

```yml

name: IndexNow API Trigger

on:
  push:
    branches:
      - main  # 원하는 브랜치를 지정하세요

jobs:
  indexnow:
    runs-on: ubuntu-latest

    steps:
      # 1. 리포지토리 체크아웃
      - name: Checkout repository
        uses: actions/checkout@v3
      
      # 2. Jekyll 설치
      - name: Setup Ruby
        uses: ruby/setup-ruby@v1
        with:
          ruby-version: '3.2.2'
      
      - name: Install Jekyll and Bundler
        run: gem install jekyll bundler

      - name: Install dependencies
        run: bundle install
      
      # 3. Jekyll 빌드
      - name: Build the site
        run: bundle exec jekyll build
      
      # 4. URL 목록 생성
      - name: Generate URL list
        run: |
          URL_LIST=$(find ./_site -type f -name "*.html" | sed 's/^\.\/_site//;s/\/index.html$//;s/.html$//' | awk '{ print "\"https://kj1241.github.io"$1"\"," }' | tr '\n' ' ' | sed 's/, $//')
          echo "Generated URL List: [$URL_LIST]"
          echo "URL_LIST=[$URL_LIST]" >> $GITHUB_ENV

      # 5. Bing 에게 IndexNow API 전송
      - name: Send POST request to IndexNow API
        env:
          HOST: kj1241.github.io
          KEY: Generate API Key # 여러분의 Generate API Key을 입력하세요
          KEY_LOCATION: https://kj1241.github.io/Generate API Key.txt # 여러분의 Generate API Key을 입력하세요
          URL_LIST: ${{ env.URL_LIST }}
        run: |
          echo "Using URL List: ${URL_LIST}"
          RESPONSE=$(curl -s -D - -w "\n%{http_code}" -X POST "https://www.bing.com/indexnow" \
          -H "Content-Type: application/json; charset=utf-8" \
          -d '{
            "host": "'"${HOST}"'",
            "key": "'"${KEY}"'",
            "keyLocation": "'"${KEY_LOCATION}"'",
            "urlList": '"${URL_LIST}"'
          }')

          # Split the response, headers, and the HTTP status code
          HTTP_HEADERS=$(echo "$RESPONSE" | sed -n '1,/^$/p')
          HTTP_BODY=$(echo "$RESPONSE" | sed '1,/^$/d' | sed '$d')
          HTTP_STATUS=$(echo "$RESPONSE" | tail -n1)

          echo "Response Headers: $HTTP_HEADERS"
          echo "Response Body: $HTTP_BODY"
          echo "HTTP Status: $HTTP_STATUS"

```

![전체 사이트 보내기]({{ site.google_drive }}1o9FBFjL1tBLxzHh4R1LBxwfePnqzviIT{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<web_h6>sitemap처럼 전체 사이트 보내기</web_h6>*

저희가 이용할 방법은 jekyll의 Liquid 템플릿 언어를 사용하기 위해서 jekyll를 설치할 예정입니다. 그러기 위해선 루비가 필요합니다.

```bash
{% raw %}
{% for post in site.posts %}
  {{ site.url  }}{{ post.url| remove: '.html' }}
{% endfor %}
{% endraw %}
```
동적 사이트 맵을 보내는 방식을 응용해서 IndexNow로 전체 사이트를 보낼겁니다.

1. 루비 버전을 확인하고 jekyll를 설치
2. jekyll를 빌드
3. 위의 Liquid를 응용해서 전체 사이트를 탐색하고 URL_LIST로 담기

![BWT에 전체 사이트 보낸 결과]({{ site.google_drive }}1ePRx0lmbtKp3bRbiInH95oanBHKD1kkb{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<web_h6>BWT에 전체 사이트 보낸 결과</web_h6>*

처음 2개였던 사이트가 137개로 늘어났습니다. 이제 해당 사이트들은 bing 검색엔진이 참조하여 크롤링 할 것입니다.

<br>

### <web_h3>최신순으로 작성된 5개 아티클 보내기</web_h3>

빌드할때마다 IndexNow로 전체 사이트를 전송할 수 있지만 좋지 못한 선택입니다. 그래서 게시물을 정리해서 최근 작성한 5개의 게시물만 indexNow로 보낼려고 합니다.

```bash
{% raw %}
[
{% assign sorted_posts = site.posts | sort: 'lastmod' | reverse %}
{% for post in sorted_posts limit:5 %}
  "{{ site.url }}{{ post.url | remove: '.html' }}"
  {% if forloop.last == false %},{% endif %}
{% endfor %}
]
{% endraw %}
```
![url-list.html 생성]({{ site.google_drive }}1LTLZcYsQcT-CqgF5wjSk0bhoCU9pYjU4{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<web_h6>url-list.html 생성</web_h6>*

_includes폴더 밑에 url-list.html 파일을 생성해주고 위와 같이 코드를 작성합니다. 그러면 최신순으로 작성된 5개의 글이 있습니다. 이때 주의할 점은 다음과 같습니다.

![front matter 수정한 날짜]({{ site.google_drive }}1Q18_FaemWpA2llY76tYnQRxsH8OMUydN{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<web_h6>front matter 수정한 날짜</web_h6>*

제 글은 언제든지 수정될 수 있어서 작성날짜 수정한 날짜와 다르기 때문에 front matter에 위의 그림과 같이 lastmod라는 것이 있습니다. 하지만 템플릿을 사용하시는 분들은 없을수도 있습니다. 그러면 'lastmod' 대신에 'data'를 사용해 주시면 됩니다.

```yml

name: IndexNow API Trigger

on:
  push:
    branches:
      - main  # 원하는 브랜치를 지정하세요

jobs:
  indexnow:
    runs-on: ubuntu-latest

    steps:
      # 1. 리포지토리 체크아웃
      - name: Checkout repository
        uses: actions/checkout@v3
      
      # 2. Jekyll 설치
      - name: Setup Ruby
        uses: ruby/setup-ruby@v1
        with:
          ruby-version: '3.2.2'
      
      - name: Install Jekyll and Bundler if not present
        run: |
          if ! gem list -i jekyll > /dev/null; then
            gem install jekyll
          fi
          if ! gem list -i bundler > /dev/null; then
            gem install bundler
          fi

      # 3. Dependencies 설치
      - name: Install dependencies if not present
        run: |
          if ! bundle check > /dev/null 2>&1; then
            bundle install
          else
            echo "Dependencies are already installed"
          fi
      
      # 4. Jekyll 빌드
      - name: Build the site if not already built
        run: |
          if [ ! -d "_site" ] || [ -z "$(ls -A _site)" ]; then
            bundle exec jekyll build
          else
            echo "Site already built"
          fi
      
      # 5. URL 목록 생성
      - name: Generate URL list
        run: |
          URL_LIST=$(bundle exec jekyll build --config _config.yml,_includes/url-list.html)
          URL_LIST=$(cat _site/_includes/url-list.html | grep -o '\[.*\]')
          echo "Generated URL List: $URL_LIST"
          echo "URL_LIST=$URL_LIST" >> $GITHUB_ENV

      # 6. Bing 에게 IndexNow API 전송
      - name: Send POST request to IndexNow API
        env:
          HOST: kj1241.github.io
          KEY: Generate API Key # 여러분의 Generate API Key을 입력하세요
          KEY_LOCATION: https://kj1241.github.io/Generate API Key.txt # 여러분의 Generate API Key을 입력하세요
          URL_LIST: ${{ env.URL_LIST }}
        run: |
          echo "Using URL List: ${URL_LIST}"
          RESPONSE=$(curl -s -D - -w "\n%{http_code}" -X POST "https://www.bing.com/indexnow" \
          -H "Content-Type: application/json; charset=utf-8" \
          -d '{
            "host": "'"${HOST}"'",
            "key": "'"${KEY}"'",
            "keyLocation": "'"${KEY_LOCATION}"'",
            "urlList": '"${URL_LIST}"'
          }')

          # Split the response, headers, and the HTTP status code
          HTTP_HEADERS=$(echo "$RESPONSE" | sed -n '1,/^$/p')
          HTTP_BODY=$(echo "$RESPONSE" | sed '1,/^$/d' | sed '$d')
          HTTP_STATUS=$(echo "$RESPONSE" | tail -n1)

          echo "Response Headers: $HTTP_HEADERS"
          echo "Response Body: $HTTP_BODY"
          echo "HTTP Status: $HTTP_STATUS"

```

이를 동작시키는 방식은 다음과 같습니다.

1. 루비 버전을 확인하고 jekyll를 체크하고 존재하지 않으면 설치
2. 의존 파일 체크하고 설치 되지 않았으면 설치
3. jekyll 빌드 체크하고 빌드되지 않으면 빌드
4. _includes/url-list.html를 빌드하여 생성된 _site/_includes/url-list.html에서 URL 목록을 축출하여 URL_LIST에 담습니다.
5. 주소를 담은 패킷을 Bing으로 Post합니다.

<br>
<br>

## <web_h2>7. 끝으로 </web_h2>

뭔가 더 정교하게 작성 할 수 있을 것 같은데, 제가 web master도 아니고 Gti Hub Action을 잘 아는 사람이 아니라서 부족하다고 생각합니다. 부족한 글 읽어주셔서 감사합니다.