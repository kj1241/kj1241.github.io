---
layout: post
title: "GitHub blog에서 IndexNow 연동하기 - GitHub Action 사용"
date: 2024-07-24 09:00:00 +09:00
image: https://drive.google.com/thumbnail?id=1U514vC38J40UftFkXx61peJlR970hVpR
toc: true
categories: [Web]
keywords: IndexNow, GitHub blog, GitHub Actions, jekyll, 검색 엔진, 자동 인덱싱, 자동화
lastmod: 2024-08-18 20:53:00 +09:00
sitemap: 
  changefreq : weekly
  priority : 0.1
addsence: true
excerpt: GitHub 블로그에서 IndexNow를 연동하기 위해 GitHub Actions를 사용하여 변경 사항을 검색 엔진에 자동으로 알리는 방법을 설명합니다. 빌드 시마다 사이트맵을 전송하여 빠른 인덱싱을 유도합니다.
related_links:
  - url: /web_tp/Git_Hub_Blog_Skin.html
---

원래 GDC 분석글 하나 쓰려고 했는데 IndexNow를 만들어서 우선 먼저 쓰게 되었습니다.
이런 글은 어디에 초점을 맞춰야 할지 몰라서 일단 작성해 봅니다.
원래는 귀찮아서 글을 지우고 싶었지만, 모르는 사람들을 위해서 작성합니다.

<br>

---

<br>

## <web_h2>1. WebSite Index 와 IndexNow 정의</web_h2>

IndexNow는 2021년 10월에 최초로 도입되었습니다. 이 프로토콜은 마이크로소프트와 야후가 운영하는 검색 엔진인 Bing 및 Yandex가 주도하여 개발하고 정의하였습니다. 현재는 Bing, Yandex 외에도 Naver, Yep, Seznam 등이 IndexNow를 사용하고 있으며, Google 및 다른 검색엔진에서도 테스트와 채택을 검토하고 있습니다. 그럼 Index와 IndexNow에 대해서 알아보도록 하겠습니다.

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

앞서 Index와 IndexNow를 구경하였습니다. 위에 처럼 설명하면 IndexNow가 거창하고 복잡한 것처럼 느껴질 수 있습니다. 하지만 개념은 크게 어렵지 않습니다.

![색인화 요청]({{ site.google_drive }}1asCzC30g-UUUzyZ--tBrOVxUgwyKD-pn{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<web_h6>색인화 요청 페이지</web_h6>*

위 그림처럼 우리가 혹은 웹 마스터들이 빙 웹마스터 도구, 구글 서치콘솔, 네이버 서치어드바이스에서 사이트가 변화되었을 때, 혹은 어떠한 에러로 크롤링을 하지 못했을 경우 에러를 고치고 빠르게 알려야 할 필요가 있을 때 등 각 툴에서 사이트 색인화 요청을 합니다.
IndexNow는 이런 요청들을 통신하여 해결할 수 있습니다. 그러면 해당 검색엔진 봇들이 요청을 바탕으로 크롤링하고 인덱싱을 할 것입니다. 즉, IndexNow는 코드를 사용해서 자동화하는 것이지 기존의 것을 대체하는 것은 아닙니다. 따라서 IndexNow를 사용하기 전에 sitemap, robot.txt 등이 사이트에 기본적으로 있어야 하는 것들이 필요합니다.

<br>
<br>

## <web_h2>3. IndexNow는 어떻게 GitHub Blog에서 보낼수 있을까?</web_h2>

그럼 이제 언제, 어떤 방법, 어떠한 방식으로 이런 요청을 보내야 하는지 고민해야 합니다. 미리 말씀드리지만, 저는 제가 고민한 방식을 보여줄 수 있지만, 이것을 범용적으로 사용할 수 있게 규격화하거나 그런 코드는 작성하지 않을 것입니다. 이는 사용자가 보내야 하는 경우가 전부 다를 수 있기 때문입니다. (나머지는 응용해서 발전시키는 것은 여러분 몫입니다.)

사실 웹서버나 서버가 존재하면 좀 더 쉽습니다. 서버 프로그래머나 백엔드 프로그래머에게는 일정 주기마다 패킷을 보내는 방식으로 쉽게 처리할 수 있습니다. 하지만 GitHub 블로그는 정적 사이트를 사용하므로 어떻게 해야 할지 고민해봐야 합니다. 고민할 당시 두 가지 방안을 생각했습니다.

1. ~~사이트에 유저가 방문하면 그때 자바스크립트를 이용하여 보냄.~~<red1_error>폐기<red1_error>
2. 깃허브 블로그를 빌드할 때마다 검색 엔진에 변경 사항을 알림.

첫 번째 방법은 테스트 코드까지 작성했으나, 방문하는 유저의 인터넷망을 통해 패킷을 전송하는 방식이기에 잘못 사용하면 악의적으로 이용될 수 있어 제외했습니다. 따라서 두 번째 방법으로 깃허브 블로그를 빌드할 때마다 알리는 방안으로 결정하였습니다. 이제 어떤 방식으로 보내야 하는지 고민해야 합니다.


1. Ruby
2. Java Script
3. GitHub Action

어떠한 방식을 사용해도 위의 문제를 해결할 수 있지만, 저는 GitHub Action을 다뤄본 적이 없기 때문에 이번 기회를 통해 알아보고자 합니다. ~~(이거 완전 러키빅키잖아!)~~ 이렇게 사용할 방식, 방법을 정했으면 이제 구체적으로 어떻게 방식으로 자동화할지를 생각해봐야 합니다. 제가 정한 답은 다음과 같습니다.

- 처음 연동할 때는 사이트맵 수준으로 모든 사이트의 주소를 전송할 것.
- 그 후, 최신 글 기준으로 5~10개를 빌드할 때마다 전송할 예정.

<br>
<br>

## <web_h2>4. GitHub Action 정의</web_h2>

**GitHub Action 정의:** GitHub의 CI/CD 플랫폼으로, 리포지토리 내에서 자동화된 워크플로우를 설정할 수 있습니다.

- CI: 지속적 통합
- CD: 지속적 배포

CI를 하면 코드 품질 향상 효과와 통합 문제를 감소시키고, CD는 신속하고 안정된 기능 및 버그 수정 제공하며 시장 변화와 고객 피드백에 빠르게 대응할 수 있습니다.

개인적으로 이러한 용어가 와닿지 않아서 외워지지 않습니다. 또한 문제 해결하는 데 필요한 이론이 아니라고 생각합니다. 실제로 저는 관심 없는 분야이기도 하지만 누군가에게는 중요한 영역이기 때문에 짚고 넘어갔습니다.

저는 이제 GitHub Action을 통해 IndexNow를 구현하려고 합니다. 제가 생각하는 GitHub Action은 빌드 시 조건을 만들거나 커스터마이징하는 것입니다. 따라서 GitHub Action은 빌드할 때마다 실행되기 때문에, IndexNow의 패킷 보내는 POST 요청을 워크플로우에 담으면 된다고 생각합니다.

방법을 알려주기 앞서 제 워크플로우 실험 목록들을 잠시 보여드리겠습니다. 

![워크플로으 실험 목록들]({{ site.google_drive }}1U514vC38J40UftFkXx61peJlR970hVpR{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<web_h6>워크플로우 실험 목록들</web_h6>*

예전 이미지라 현재 제 워크플로우 목록은 이것보다 3배 이상으로 더럽습니다... 인터넷을 찾아도 제가 생각한 방식을 사용하여 만든 곳은 없어서 기본 이론들을 입각해서 실험해서 여러 방면을 체크해야 했기 때문입니다.  ~~(내 레포지토리는 오염됐어...)~~ 보통은 서브 브랜치를 파서 실험하는 것이 맞지만, 검색 엔진과 통신해야 하는데 서브 브랜치에서는 안될 것 같아서 메인에서 실험하게 되었습니다.

그 동안 실험한다고 일부러 만든 케이스들이 많은데. 그런 방법을 전부 작성하는 것은 힘들고 여러분에게는 어떤 방식으로 IndexNow를 성공적으로 작성할 수 있는지 예시를 알려드리겠습니다.

<br>
<br>

## <web_h2>5. GitHub Action 사용하여 IndexNow 제작</web_h2>

해당 파트는 이제 기본적으로 GitHub Action을 사용하고 IndexNow를 제작해보고 테스트해보는 코드입니다. 들어가기 전에 가장 중요한 점은 bing, naver, yep, Seznam, Yandex등 <web_h4>IndexNow를 사용하는 어느 검색엔진한테 보내도 다른 검색엔진 사이트들도 IndowNow를 수신받을 수 있다는 점</web_h4>입니다. 전 그냥 마소 빙으로 전송했습니다.

- <p><web_h5>IndexNow:</web_h5> https://api.indexnow.org/indexnow</p>
- <p><web_h5>Microsoft Bing:</web_h5> https://www.bing.com/indexnow</p>
- <p><web_h5>Naver:</web_h5> https://searchadvisor.naver.com/indexnow</p>
- <p><web_h5>Seznam.cz:</web_h5> https://search.seznam.cz/indexnow</p>
- <p><web_h5>Yandex:</web_h5> https://yandex.com/indexnow</p>
- <p><web_h5>Yep:</web_h5> https://indexnow.yep.com/indexnow</p>

<br>

### <web_h3>Generate API Key 텍스트 파일 생성</web_h3>

![Bing IndexNow GetStated Page]({{ site.google_drive }}1ODjybKS7rq2IOgaDkSE0zlXLAOQVmfMq{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<web_h6>Bing IndexNow GetStated Page</web_h6>*

가장 먼저 해야 할 일은 [Bing IndexNow GetStated Page](https://www.bing.com/indexnow/getstarted)에 들어가서 API Key를 생성하고 보내는 방법을 읽는 것입니다. 사이트에 있는 Generate API Key를 잘 기억해 주세요.

![Generate API Key 텍스트 파일 생성]({{ site.google_drive }}1FieZnIOEi7HyP8leH5hw0OVrrzcs5nOI{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<web_h6>Generate API Key 텍스트 파일 생성</web_h6>*

그럼 이제 블로그 루트 파일에 Generate API Key.txt 파일을 만들고 안에 내용을 Generate API Key로 작성해 주세요. 그러면 해당 키를 읽으러 검색엔진 크롤러가 올 것입니다.

> ![Repository secrets 실험]({{ site.google_drive }}1nmYi4P1QKScfq2pQ5y_HIAspW2mrvDJF{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
  *<web_h6>GitHub Blog Repository secrets 실험</web_h6>*
 처음에는 위의 방식처럼 Generate API Key를 암호화하고 사용하려고 했습니다. 암호화된 코드를 읽고 root 폴더에 txt 파일을 생성하게 만들어봤지만 결국 검색엔진이 크롤링해서 읽어야 하는데 읽지 못하는 것 같아서 기본으로 돌아가서 루트 폴더에 텍스트 파일을 작성하게 되었습니다. (사실 성격이 급해서 기다리지 못했습니다.)

<br>

### <web_h3>workfolows 폴더 생성</web_h3>

![workfolows 폴더 생성]({{ site.google_drive }}13OX-alE8mgWqOQGx7-1Rmfyjj-1GXbI5{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<web_h6>workfolows 폴더 생성</web_h6>*

터미널에서 mkdir -p .github/workflows를 사용해서 폴더를 생성해도 되고 아니면 폴더를 직접 만들으셔도 됩니다. 앞으로 이곳에 GitHub Action을 커스텀하기 위해서 yml 파일을 만들 것입니다.

<br>

### <web_h3>IndexNow.yml 파일 생성</web_h3>

![workfolows 폴더 생성]({{ site.google_drive }}13OX-alE8mgWqOQGx7-1Rmfyjj-1GXbI5{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<web_h6>workfolows 폴더 생성</web_h6>*

터미널에서 mkdir -p .github/workflows를 사용해서 폴더를 생성해도 되고 아니면 폴더를 직접 만들으셔도 됩니다. 앞으로 이곳에 GitHub Action을 커스텀하기 위해서 IndexNow.yml 파일을 만들 것입니다.

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

해당 내용은 <red1_error>응답 코드: 202</red1_error>로 내용을 보내는 데는 성공했습니다. 202 코드는 내용을 수신했지만 처리하는데 지연된다는 코드입니다. 그럼 몇일 동안 기다리면 됩니다. 저는 5일 정도 걸린 것 같습니다. 부족하지만 중요한 코드 부분만 설명해 보겠습니다.

- HOST: 본인의 홈페이지나 블로그 주소를 넣어야 합니다.
- KEY: Generate API Key 숫자를 넣으세요
- KEY_LOCATION: Generate API Key가 있는 위치를 넣는 곳입니다. 보통은 root 위치에 넣음으로 (홈페이지 주소 / Generate API Key.txt) 위치가 됩니다.
- urlList: IndexNow에 전송할 URL 주소를 넣으세요. 여기 예제는 실험하기 위해서 제 블로그 주소와 사이트맵을 보내봤습니다.

![BWT IndexNow Portal 변화]({{ site.google_drive }}1GvAG26BBSVpmPJssUIfiYDPPYLpU11tN{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<web_h6> Bing Webmaster Tools Portal 변화</web_h6>*

만약 정상적으로 IndexNow를 수신하고 Bing에서 처리하게 되면 Bing Webmaster Tools에서 IndexNow 탭은 위처럼 변하게 될 것입니다.

> ![IndexNow 패킷 에러]({{ site.google_drive }}1YH9tLLO2bsh64P8v9zdtCTCOYiBP-g2p{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
  *<web_h6>IndexNow 패킷 에러</web_h6>*
  패킷을 일부러 잘못 보내면 위의 그림과 같이 <red1_error>응답 코드: 400</red1_error> (주어진 요청이 null이거나 유효하지 않음)이 롤백됩니다.

<br>
<br>

## <web_h2>6. Jekyll를 이용해서 GitHub Action에서 IndexNow 보내기 </web_h2>

기본적으로 보내는 코드가 성공했다면 이제는 좀 더 심화 과정으로 들어가야 합니다. 원할 때마다 URL_LIST를 키보드로 직접 작성하여 패킷을 보내야 한다면 안 하는 것만 못할 겁니다. 사실 귀찮기도 합니다. 신경 안 써도 알아서 알려주는 자동화 로직을 작성할 것입니다.

<br>

### <web_h3>딱 한번 전체사이트 보내기</web_h3>

해당 코드는 처음 연동할 때, 한번 전체 사이트 보내는 방법입니다.

![루비 버전 찾기]({{ site.google_drive }}1_sQRea7RCPQ9NYnSYU9Vn6iqFmvmEiBo{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<web_h6>루비 버전 찾기</web_h6>*

터미널에서 ruby -v를 사용하여 설치된 루비 버전을 찾습니다. 저 같은 경우는 블로그 만들 당시 최신 버전을 설치해서 3.2.2 버전입니다.

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

저희는 Jekyll의 Liquid 템플릿 언어를 사용하기 위해 Jekyll을 설치할 예정입니다. 이를 위해 루비가 필요합니다.

```bash
{% raw %}
{% for post in site.posts %}
  {{ site.url  }}{{ post.url| remove: '.html' }}
{% endfor %}
{% endraw %}
```
동적 사이트 맵을 보내는 방식을 활용해서 IndexNow로 전체 사이트를 보낼겁니다.

1. 루비 버전을 확인하고 Jekyll을 설치합니다.
2. Jekyll을 빌드합니다.
3. 위의 Liquid를 활용하여 전체 사이트를 탐색하고 URL_LIST에 담습니다.

![BWT에 전체 사이트 보낸 결과]({{ site.google_drive }}1ePRx0lmbtKp3bRbiInH95oanBHKD1kkb{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<web_h6>BWT에 전체 사이트 보낸 결과</web_h6>*

처음 2개였던 사이트가 137개로 늘어났습니다. 이제 해당 사이트들은 Bing 검색엔진이 참조하여 크롤링할 것입니다.

<br>

### <web_h3>최신순으로 작성된 5개 아티클 보내기</web_h3>

빌드할 때마다 IndexNow로 전체 사이트를 전송할 수 있지만, 이는 좋은 선택이 아닙니다. 그래서 게시물을 정리하여 최근 작성한 5개의 게시물만 IndexNow로 보내려고 합니다.

```bash
{% raw %}
---
layout: null
permalink: /url-list.html
---

[
{% assign sorted_posts = site.posts | sort: 'lastmod' | reverse %}
{% for post in sorted_posts limit:5 %}
  "{{ site.url }}{{ post.url | remove: '.html' }}"
  {% if forloop.last == false %},{% endif %}
{% endfor %}
]
{% endraw %}
```
![url-list.html 생성]({{ site.google_drive }}1L1jpG8F19sus-GG_5VZp1EHWv6TH8ZmW{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<web_h6>루트 디렉토리에 url-list.html 생성</web_h6>*

root 폴더 아래에 url-list.html 파일을 생성하고 위와 같은 코드를 작성합니다. 그러면 최신순으로 작성된 5개의 글의 주소가 있습니다. 이때 주의할 점은 다음과 같습니다.

![front matter 수정한 날짜]({{ site.google_drive }}1Q18_FaemWpA2llY76tYnQRxsH8OMUydN{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<web_h6>front matter 수정한 날짜</web_h6>*

제 글은 언제든지 수정될 수 있어서 작성 날짜와 수정한 날짜가 다르기 때문에 front matter에 위의 그림과 같이 lastmod라는 것이 있습니다. 하지만 템플릿을 사용하시는 분들은 없을 수도 있습니다. 그러면 lastmod 대신에 date를 사용해 주시면 됩니다.

```yml

name: IndexNow API Trigger

on:
  push:
    branches:
      - main

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
      
      # 4. URL 목록 읽기
      - name: Read URL list
        id: read_url_list
        run: |
          URL_LIST=$(cat _site/url-list.html | tr -d '\n')
          echo "URL_LIST=$URL_LIST" >> $GITHUB_ENV

      # 5. Bing에 IndexNow API 전송
      - name: Send POST request to IndexNow API
        env:
          HOST: kj1241.github.io
          KEY: Generate API Key # 여러분의 Generate API Key을 입력하세요
          KEY_LOCATION: https://kj1241.github.io/Generate API Key.txt  # 여러분의 Generate API Key을 입력하세요
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

![feed 처럼 최신 게시글 5개 보내는 결과]({{ site.google_drive }}1DpV4gT8MiSpfv2UgoJ2owibcOmijbykF{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<web_h6>feed 처럼 최신 게시글 5개 보내는 결과</web_h6>*

이를 동작시키는 방식은 다음과 같습니다.

1. 루비 버전을 확인하고 Jekyll과 의존 파일들을 설치합니다.
2. Jekyll을 빌드합니다.
3. root 파일에 url-list.html 파일이 있기 때문에 빌드하면 _site/url-list.html이 생성됩니다.
4. _site/url-list.html에서 데이터를 읽고 URL_LIST에 저장합니다.
5. 데이터를 채운 패킷을 Bing으로 Post합니다.

![BWT에 최신 게시글 5개 보낸 결과]({{ site.google_drive }}1fZxV-QqniyEpiFiwdLem4TG4_V31lir8{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<web_h6>BWT에 최신 게시글 5개 보낸 결과</web_h6>*

그러면 Bing Webmaster Tool에서 최신 게시글 5개를 수신받은 것을 확인할 수 있습니다.

<br>
<br>


## <web_h2>7. 끝으로 </web_h2>

이제 모든 설정이 완료되었습니다. url-list.html 파일을 생성하고, GitHub Actions를 설정하여 최신 5개의 게시물을 IndexNow API를 통해 검색 엔진에 전송할 수 있습니다. 이 과정을 통해 사이트의 콘텐츠가 더 신속하게 인덱싱되고, 검색 결과에서의 가시성이 향상될 것입니다.

추가적으로, 이러한 자동화된 업데이트는 사이트의 유지보수를 더욱 용이하게 만들어 주며, 웹사이트 관리에 드는 시간을 절약할 수 있습니다. 모든 설정이 올바르게 되었는지 확인하기 위해, GitHub Actions의 실행 로그를 검토하고 문제 발생 시 적절히 대응하면 됩니다.

이제 최신 콘텐츠를 검색 엔진에 효과적으로 전송하고, 웹사이트의 성능을 향상시킬 수 있는 준비가 완료되었습니다. 부족한 글 읽어주셔서 감사합니다.

<p><web_h5>ps)</web_h5> 더 정교하게 작성할 수 있을 것 같지만, 제가 웹마스터도 아니고 GitHub Action을 잘 아는 사람이 아니라서 부족하다고 생각합니다.<s>(슬슬 귀찮아져서 그런 거 아닙니다!?)</s></p>