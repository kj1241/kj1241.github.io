---
layout: post
title: "[진행중]Git Hub blog에서 IndexNow 연동해보기 - Gti Hub Action 사용"
date: 2024-07-20 09:00:00 +09:00
image: https://drive.google.com/thumbnail?id=1U514vC38J40UftFkXx61peJlR970hVpR
toc: true
categories: [Web]
keywords: GitHub Actions, IndexNow, Git Hub Blog, 웹 인덱싱, 검색 엔진 최적화 (SEO), API 통신, Bing Webmaster Tools
lastmod: 2024-07-21 09:00:00 +09:00
sitemap: 
  changefreq : week
  priority : 0.1
addsence: true
excerpt: 해당 글은 GitHub Actions를 활용하여 정적 사이트에서 IndexNow를 구현하는 방법을 실험한 기록입니다. 실험 과정과 결과를 통해 GitHub 블로그에서 IndexNow를 사용하는 방안을 구체적으로 설명합니다.
related_links:
---

일단 이 아티클을 보고 있는 분들께 말씀드립니다...
이 글은 실험 중에 작성한 것이기 때문에 정보 제공에는 도움이 되지 않을 수 있습니다. 또한 작성자의 판단에 따라 언제든지 삭제될 수 있습니다. 다른 작업과 병행하면서 기억하려고 작성한 글입니다. 정보를 얻으러 오셨다면 뒤로가기를 눌러주시기 바랍니다.

<br>

---

<br>

## <web_h2>1. WebSite Index 와 IndexNow</web_h2>

Index와 IndexNow는 마치 능동태와 수동태 같은 차이입니다. 자세히 알아보겠습니다.

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

## <web_h2>2. IndexNow는 어떻게 Git Hub Blog에서 보낼수 있을까?</web_h2>

IndexNow는 웹사이트 소유자가 콘텐츠 변경 사항을 검색 엔진에 빠르게 반영할 수 있도록 돕습니다. 크롤링을 기다리지 않고 변경된 사항을 주기적으로 알리면 됩니다.  
서버가 있다면 주기적으로 패킷을 보내는 방식으로 쉽게 해결할 수 있지만, 정적 사이트에서는 어떻게 해야 할까요? 당장 두 가지 방안을 생각해볼 수 있습니다.

1. ~~사이트에 유저가 방문하면 그때 자바스크립트를 이용하여 보낸다.~~<red1_error>페기<red1_error>
2. 깃허브 블로그를 빌드할 때마다 검색 엔진에 변경 사항을 알린다.

첫 번째 방법은 방문하는 유저의 인터넷망을 통해 패킷을 전송하기 때문에 악의적으로 이용될 수 있어 제외했습니다.  
두 번째 방법으로 깃허브 블로그를 빌드할 때마다 알리는 방안을 고민해야 합니다. 제가 생각하는 방식은 다음과 같습니다.  

1. Ruby
2. Java Script
3. Git Hub Action

어떤 방식을 사용해도 무방하다고 생각되지만, GitHub Action을 다뤄본 적이 없기 때문에 이번 기회에 시도해보고자 합니다. ~~(이거 완전 러키비키잖아)~~

<br>
<br>

## <web_h2>3. Git hub Action</web_h2>

**Git Hub Action 정의:** GitHub의 CI/CD 플랫폼으로, 리포지토리 내에서 자동화된 워크플로우를 설정할 수 있습니다.

- CI: 지속적 통합
- CD: 지속적 배포

CI를 하면 코드 품질 향상 효과와 통합 문제를 감소시키고 CD는 신속하고 안정된 기능 및 버그 수정 제공하며 시장 변화와 고객 피드백에 빠르게 대응할 수 있다는데, 솔직히 마음속에 와닿지도 않습니다. ~~(이런게 문제를 해결하는데 왜 중요한데)~~

이력서에 자주 나오는 CI/CD에 대해 개인적으로 크게 관심이 없지만, 여기서는 GitHub Action을 통해 IndexNow를 구현하려고 합니다.
제가 생각하는 GitHub Action은 빌드 시 조건을 만들거나 커스터마이징하는 것입니다. IndexNow는 작성자가 빌드할 때마다 알려줘야 하기 때문에 워크플로우에 패킷 보내는 POST 요청을 추가하면 된다고 생각합니다.

![내 워크플로 실험]({{ site.google_drive }}1U514vC38J40UftFkXx61peJlR970hVpR{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<web_h6>내 워크플로 실험</web_h6>*

도큐먼트를 보고 이론적으로 접근한 것이라 여러 번 실험했습니다. 보통 서브 브랜치를 파는 것이 맞지만 검색 엔진과 통신하는데 맞지 않아 메인 브랜치에서 실험했습니다. ~~(내 레파지토리는 오염됬어...)~~

<br>

### <web_h3>실험하기 전의 세팅</web_h3>

![Bing IndexNow GetStated Page]({{ site.google_drive }}1ODjybKS7rq2IOgaDkSE0zlXLAOQVmfMq{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<web_h6>Bing IndexNow GetStated Page</web_h6>*

가장 먼저 해야 할 일은 [Bing IndexNow GetStated Page](https://www.bing.com/indexnow/getstarted)에 들어가서 API Key를 생성하고 보내는 방법을 읽는 것입니다. 생성된 API Key를 암호화하여 Web Master 쪽으로 전송하겠습니다. (사실 이게 되는지 안 되는지 잘 모르겠습니다.)  
Settings - Secrets and variables - Action - Repository secrets에서 해당 키를 암호화 시킬 것입니다.

![Repository secrets 위치]({{ site.google_drive }}1nmYi4P1QKScfq2pQ5y_HIAspW2mrvDJF{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<web_h6>Git Hub Blog Repository secrets 위치</web_h6>*

처음 하시는 분은 원래 Repository secrets 칸에 아무것도 존재하지 않을 겁니다. New Repository secret을 눌러주세요.

![Repository secrets 암호화 방법]({{ site.google_drive }}1gTw__0HOlgRytxZ9oCpthWPdUKlIW53s{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<web_h6>Git Hub Blog Repository secrets 암호화 방법</web_h6>*

1. Name 부분에 'INDEXNOW_KEY'를 작성합니다.
2. Secret 부분에 위의 Bing IndexNow GetStarted Page 제공하는 Generate API Key를 작성합니다.
3. Add secret을 작성합니다.

그러면 처음 그림과 같이 Repository secrets에 INDEXNOW_KEY가 작성된 것이 보일 것입니다.
그다음에는 워크플로우 폴더를 생성할 것입니다.

![workfolows 폴더 생성]({{ site.google_drive }}13OX-alE8mgWqOQGx7-1Rmfyjj-1GXbI5{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<web_h6>workfolows 폴더 생성</web_h6>*

터미널에서 mkdir -p .github/workflows을 사용해서 폴더를 생성해도 되고 아니면 폴더를 만들으셔도 됩니다. 앞으로 이곳에 GitHub Action을 커스텀하기 위해서 yml 파일을 만들 것입니다.

<br>

### <web_h3>실험1. IndexNow Post 할때 틀린 데이터 보내기</web_h3>

그럼 이제 암호화도 했으니 Post로 패킷을 만들어서 보내보도록 합시다. 해당 실험 내용은 틀린 패킷을 보내서 어떻게 반응하는지 확인하는 실험입니다.

#### <web_h4>IndexNow.yml</web_h4>

```r

name: IndexNow API Trigger

on:
  push:
    branches:
      - main  # 원하는 브랜치를 지정하세요

jobs:
  indexnow:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout repository
        uses: actions/checkout@v3

      - name: Send POST request to IndexNow API
        env:
          HOST: kj1241.github.io
          KEY: ${{ secrets.INDEXNOW_KEY }}
          KEY_LOCATION: https://kj1241.github.io/${{ secrets.INDEXNOW_KEY }}.txt
          URL_LIST: '["https://kj1241.github.io/", "https://kj1241.github.io/sitemap.xml"]'
        run: |
          RESPONSE=$(curl -s -w "\n%{http_code}" -X POST "https://api.indexnow.org/indexnow" \
          -H "Content-Type: application/json; charset=utf-8" \
          -d '{
            "host": "${{ env.HOST }}",
            "key": "${{ env.KEY }}",
            "keyLocation": "${{ env.KEY_LOCATION }}",
            "urlList": ${URL_LIST}
          }')
          # Split the response and the HTTP status code
          HTTP_BODY=$(echo "$RESPONSE" | sed '$d')
          HTTP_STATUS=$(echo "$RESPONSE" | tail -n1)
          echo "Response Body: $HTTP_BODY"
          echo "HTTP Status: $HTTP_STATUS"


```

![실험1 결과]({{ site.google_drive }}1YH9tLLO2bsh64P8v9zdtCTCOYiBP-g2p{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<web_h6>실험1 결과</web_h6>*

결과: <red_error>응답 코드:400</red_error> 주어진 요청이 null이거나 유효하지 않다고 전달받았습니다. 
일부러 잘못 보냈다고 주장하고 싶지만 사실 제가 GitHub Action 쓰는데 미숙해서 틀린 데이터가 보내진 것입니다.
Json 데이터를 처리하는 과정에서 잘못 전송된 것입니다.

<br>

### <web_h3>실험2. IndexNow Post 전송하기</web_h3>

그러면 Json 방식의 데이터를 수정하여 다시 전송해 보겠습니다.

#### <web_h4>IndexNow.yml</web_h4>

```r

name: IndexNow API Trigger

on:
  push:
    branches:
      - main  # 원하는 브랜치를 지정하세요

jobs:
  indexnow:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout repository
        uses: actions/checkout@v2

      - name: Send POST request to IndexNow API
        env:
          HOST: kj1241.github.io
          KEY: ${{ secrets.INDEXNOW_KEY }}
          KEY_LOCATION: https://kj1241.github.io/${{ secrets.INDEXNOW_KEY }}.txt
        run: |
          URL_LIST=$(cat <<EOF
          [
            "https://kj1241.github.io/",
            "https://kj1241.github.io/sitemap.xml"
          ]
          EOF
          )

          RESPONSE=$(curl -s -D - -w "\n%{http_code}" -X POST "https://api.indexnow.org/indexnow" \
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

![실험2 결과]({{ site.google_drive }}11tyUc6hHlp7jGxLOuLacCbITbzPQaun1{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<web_h6>실험2 결과</web_h6>*

결과: <red_error>응답 코드:202</red_error>로 내용을 보내는 데는 성공했습니다.  
하지만 해당 내용이 처리 중이니 답변이 안 오는 애매한 상태입니다. 그래도 반 정도 성공했습니다. 예전에 일할 때는 서버-클라이언트 양쪽 패킷이 송수신되는데 확인해서 이런 답답함은 없었었는데 사실 조금 답답하기도 합니다.

원래 성공하면 느낌상 Bing Webmaster Tools Portal에서 IndexNow 탭이 열려야 하는데 5일 동안 기다려도 처리되지 않는 것으로 봐서 Bing Webmaster에게 문의를 넣기 전에 조금 수정하겠습니다.

<br>

### <web_h3>실험3. Root에 Txt파일 없으면 만들어주기</web_h3>

루트 파일에 해당 Generate API Key.txt파일이 존재하지 않으면 생성하게 코드를 작성하였습니다.

#### <web_h4>IndexNow.yml</web_h4>

```r

name: IndexNow API Trigger

on:
  push:
    branches:
      - main  # 원하는 브랜치를 지정하세요

jobs:
  indexnow:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout repository
        uses: actions/checkout@v3

      - name: IndexNow Setup
        run: |
          if [ ! -f "${{ secrets.INDEXNOW_KEY }}.txt" ]; then
            echo ${{ secrets.INDEXNOW_KEY }} > ${{ secrets.INDEXNOW_KEY }}.txt
          fi

      - name: Send POST request to IndexNow API
        env:
          HOST: kj1241.github.io
          KEY: ${{ secrets.INDEXNOW_KEY }}
          KEY_LOCATION: https://kj1241.github.io/${{ secrets.INDEXNOW_KEY }}.txt
        run: |
          URL_LIST=$(cat <<EOF
          [
            "https://kj1241.github.io/",
            "https://kj1241.github.io/sitemap.xml"
          ]
          EOF
          )

          RESPONSE=$(curl -s -D - -w "\n%{http_code}" -X POST "https://api.indexnow.org/indexnow" \
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

![실험3 결과]({{ site.google_drive }}1gTw__0HOlgRytxZ9oCpthWPdUKlIW53s{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<web_h6>실험3 결과</web_h6>*

해당 결과를 보시면 루트파일에 Generate API Key.txt이 만들어 진 것이 보일 것입니다.
그리고 Bing Webmaster 팀에게 문의할 내용을 정리해 봅시다.
1. 최근 언제 패킷을 보냈는지?
2. 내 웹사이트 주소가 무엇인지?
3. 패킷의 내용이 정확하게 받았는지?
4. 처리되지 않은 이유는 무엇인지?


-------------- 아직 진행중입니다.------------