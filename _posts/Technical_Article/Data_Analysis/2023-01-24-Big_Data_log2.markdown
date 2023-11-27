---
layout: post
title:  "빅데이터 해커톤 로그2 주제 선정 & 자료 수집"
date:   2023-01-24 11:16:30 +0900
image: https://github.com/kj1241/kj1241.github.io/assets/22047442/20490a4d-03be-4fbc-8289-6a5ca24ec672
toc: true
categories: [Data_Analysis]
tags: [R, Python, Virtual , Data Analysis, Big Data, Regression Analysis]
addsence: true
---



주제 선정과 자료 수집은 데이터 분석 프로젝트를 시작하는 핵심적인 단계입니다.  
주제 선정 시 흥미로운 분야 선택과 명확한 문제 정의가 필요하며, 데이터 수집에는 수집 계획 수립, 데이터 원천 확인, 정제 및 전처리, 윤리 및 법적 고려 등이 중요합니다.  
이러한 단계를 철저히 거쳐 프로젝트 목표를 명확히 하고 안정적인 데이터를 확보하여 분석에 활용해야 합니다. 

![단계](https://github.com/kj1241/kj1241.github.io/assets/22047442/20490a4d-03be-4fbc-8289-6a5ca24ec672){: width="50%" }

<br>
<br>
<h2><blue1_h2> 2. 주제 선정  </blue1_h2></h2>
주제 선정 시 자신이나 조직의 관심 분야를 고려하고, 해당 주제에서 해결하고자 하는 명확한 문제를 정의해야 합니다.  
또한, 선정한 주제와 관련된 데이터의 가용성을 확인하고, 프로젝트의 목적을 설정하여 명확한 분석 방향을 결정해야 합니다.  
이렇게 하면 효과적인 데이터 분석을 수행할 수 있습니다.

<br>
<h3><blue1_h3> 1) 주제 정하기  </blue1_h3></h3>
기업의 데이터를 분석하는 파트면 별로 신경 쓰지 않아도 되는 파트입니다.  
비즈니스에 활용되는 주제들은 정해져 있기 때문입니다.  
그나마 자유롭게 정할 수 있는 게임 회사에서는 벨런스 기획, 기계학습 분석등 요구사항에 맞는 주제들을 분석해야 합니다.  
해커톤 대회에서는 주제가 자유였기 때문에 주제를 정하기 위해 1일에 걸쳐 팀원들과 아이디어 회의를 하였습니다.  
저희 팀이 주제를 정할 때, '공공성에 좀 더 부합하는지?', '현재 이슈가 되고 있는 문제인지?'의 부분을 중점적으로 고민하였습니다. 


<br>
<br>
<h2><blue1_h2> 3. 데이터 분석 계획 수립 </blue1_h2></h2>
위의 사항에서 팀원들의 토른으로 "고령운전자와 고통안전"이라는 주제를 정하게 되었습니다.  

팀에서 제가 맡은 역할은 프로그래밍을 이용한 데이터 분석이었습니다.  
데이터 분석을 진행하기 위해서는 우선적으로 해야 할 일은 탐색적 자료수집을 위하여 "고령운전자과 교통안전에 연관되어있다." 가설을 일단 세웠습니다.  
그런 다음 <blue1_h5>"어떻게 분석을 할 것인지?"</blue1_h5>에 관해서 고민하였습니다.  

데이터 사이언티스트나 통계학자와 어떤 주제에 관해서 이야기를 나누면 어떠한 분석을 사용해야 하는지 금방 답이 나옵니다.
그들은 경험이나 학습을 통해서 '교통사고'라는 주제를 들으면 '포아송 회귀분석'을 연관 시킬 수 있습니다.  
하지만 저는 머글이기 때문에 빠르게 통계 분석 방법을 정할 수 없었습니다.  
제가 사용했던 방법을 소계하겠습니다.

<br>
<h3><blue1_h3> 1) 통계 분석 방법 찾기  </blue1_h3></h3>

<blue1_h5>⑴ 논문을 통하여 분석 방법 찾기  </blue1_h5>
첫번째 방식은 논문을 통해서 분석 방법을 찾는 방법입니다.  
논문을 통하여서 분석 방법 찾는 것은 비유하자면, 수학문제에서 비슷한 유형의 문제풀이 정답지를 보는 것과 비슷합니다.  
'고령운전'이라는 주제를 종속변수로 설정하였고 논문을 검색하여 10~20개의 눈문들을 찾아봤습니다.  
```
(2005) 고령운전자의 교통사고 특성
(2016) 고령화시대에 대비한 고령운전자 교통안전 개선방향
(2016) 주행환경이 고령운전자의 교통사고 심각성에 미치는 영향분석
(2019) 고령 보행자 교통사고에 영향을 미치는 환경요인에 관한 연구_부산광역시를 중심으로
...

```
이러한 논문들을 읽고 대중적으로 사용되는 통계 분석은 포아송 회귀분석이라는 것을 도출하였습니다.  
그리고 팀원들과 이 논문들에서 사용된 독립변수와 우리가 추가적으로 생각하는 요인들을 (ex. 신호등의 개수등..)을 추가로 자료조사 하였습니다. 
  
<br>
<blue1_h5>⑵ 통계표로 분석방법 찾기  </blue1_h5>
두번째 방법은 통계표로 분석 방법을 추론하는 방식입니다.  
추가적인 논리를 얻기 위해 정말 저희 팀이 고른 주제가 포아송 회귀분석 통계 방법을 사용해야 되는지, 통계 분석 방법론으로 점검하였습니다.  

![통계표](https://github.com/kj1241/kj1241.github.io/assets/22047442/406f813e-8f8b-458c-842a-ea77e76e6b15){: width="100%" style="aspect-ratio:16/9"}

위의 다이어 그램을 보면 우리가 분석할 내용은 '종속변수 연속형 → 독립변수 2개이상 → 공변량 혼합 → GLM 일반화 선형 모형'을 사용하여 분석할 것입니다. 
위의 이미지는 통계 분석 방법은 통계학 책마다 혹은 분류하는 기준이 다를 수는 있지만 큰 범위에서는 벗어나지 않습니다.
~~(대학교 통계학 시간에 이거 암기시키는 교수님 속으로 욕했는데... 죄송합니다.)~~



<br>
<h3><blue1_h3> 2) 자료 수집하기 방법 정하기 </blue1_h3></h3>
<blue1_h5>⑴ 분석방법 정하기  </blue1_h5>
통계 분석 방법을 정했다면 추가적으로 어떻게 통계 분석을 진행할 것인지에 관해서 고민해야 했습니다.  
씨에스리 후원한 소프트웨어도 많이 매력적이었지만, 해커톤 대회가 서울~제주도까지 모든 시도에서 열리는 것이라 단기간 집중되다 보니 병목현상으로 서버가 많이 불안정해서 사용하지 않기로 하였습니다.  
또한 SAS프로그램은 대학교, 공공기관에서 많이 사용하는 소프트웨어이지만 유료라서 취지에 적합하지 않다고 생각하였습니다.  
마이크로 소프트에서 제공하는 엑셀은 소규모 데이터 분석을 할 수 있으나, 열의 개수가 104876개 밖에 존재하지 않을뿐더러  용량제한으로 못 여는 가능성이 있어서 제외하였습니다.  

따라서 프로그래밍을 이용해서 <blue1_h5>자료수집은 Python을 이용하고, 데이터 분석은 무료인 R을 사용</blue1_h5>하기로 결정하였습니다.  
![분석](https://github.com/kj1241/kj1241.github.io/assets/22047442/dd5b0173-48f3-4333-b549-d25c8b1e534e){: width="50%" }

<br>
<blue1_h5>⑵ 저장 방식 정하기  </blue1_h5>
그리고 데이터 저장 방식에 관해서도 고민하였습니다.  
엑셀 파일을 마이크로소프트웨어 프로그램으로 읽지 못하는 상황이 발생하더라도,  Python, R을 이용하면 한계 없이 데이터를 읽고 쓸 수 있기 때문에 csv 형태로 저장하기로 하였습니다.  


<br>
<br>
<h2><blue1_h2> 4. 자료 수집 </blue1_h2></h2>
위에서 데이터 분석 게획을 수립했으면, 이에 맞는 자료들을 수집해야합니다.  
저희가 사용했던 자료수집은 다음과 같습니다.  


<br>
<h3><blue1_h3> 1) 논문등에서 독립 변수 도출 하기 </blue1_h3></h3>
주제 선정 회의로 저희 팀에서는 '고령운전자의 교통사고'관련 주제가 선정되고 GML회귀분석을 사용하기로 하였습니다.  
가장 먼저 한일은 관련 있는 변수들을 모두 찾는 것이었습니다.  
기사, 논문, 블로그등 여러 가지에서 변수를 도출하였습니다.  
그리고 고령이 되면 시력이 반응이 떨어진다는 논문을 바탕으로 **'고령 교통사고에도 신호등의 불빛이 연관되지 않을까?'**라는 사고가 확장되었고 신호등과 같이 특별한 변수들도 독립변수에 넣었습니다.  

<br>
<h3><blue1_h3> 2) 공공 Open API 사용 </blue1_h3></h3>
이렇게 팀에서 뽑은 종속변수 기반으로 데이터를 확보하기 위해 정부에서 운영하는 공공 데이터 포털과 서울시에 운영하는 열린 데이터광장에서 데이터를 추출하였습니다.  
지도는 국토 교통부에서 데이터를 추출하였습니다.  

```python
import requests
import json
import pandas as pd

//http 통신
url = 'http://api.data.go.kr/openapi/tn_pubr_public_cctv_apiserviceKey=개인인증키입력&pageNo=1&numOfRows=10&type=json'
html = requests.get(url)
contents = html.text

//json을 이용해 필요한 아이템만 꺼내기
json_ob = json.loads(contents)
body = json_ob['response']['body']['items']

//dataframe으로 변환후 csv로 저장
dataframe = pd.json_normalize(body)
dataframe.to_csv('XXX.csv',index=False)
```
python을 사용하여 공공 API에서 csv데이터를 바꾸는 방법입니다.


<br>
<h3><blue1_h3> 3) 크롤링 사용 </blue1_h3></h3>
부족한 정보 온도를 데이터를 얻기 위해서 기상청에서 뷰티풀수프를 이용하여 크롤링을 이용하였고 통계청 같은 곳에서도 크롤링을 하였습니다.  
(현재 기상청 사이트가 바뀐 것으로 알고 있습니다.)  
또한 교통사고시스템과 서울시 교통정보 시스템에서도 데이터를 수집하였습니다.  

```python
import requests
from bs4 import BeautifulSoup

source = requests.get('https://www.weather.go.kr/weather/observation/currentweather.jsp')
soup = BeautifulSoup(source.content,"html.parser")

table = soup.find('table',{'class':'table_develop3'})
data = []

for tr in table.find_all('tr'):
    tds = list(tr.find_all('td'))
    for td in tds:
        if td.find('a'):
            point = td.find('a').text
            temp = tds[5].text
            humidity = tds[9].text
            print("{0:<7} {1:<7} {2:<7}".format(point,temp,humidity))
            data.append([point,temp,humidity])
            
with open('weather.csv','w') as f:
    f.write('지역, 온도, 습도\n')
    for i in data:
        f.write('{0},{1},{2}\n'.format(i[0],i[1],i[2]))

```
해당 코드는 파이썬을 사용하여 크롤링하는 코드입니다.  


<br>
<h3><blue1_h3> 4) 부족한 데이터 직접 전화 </blue1_h3></h3>
원래 기획은 서울특별시만이 아닌 전국적으로 코드를 돌려서 데이터 분석을 하고자 하였습니다.  
하지만 Open API를 통해 알게 된 점은 각 지방마다 올리는 데이터 기준이 다르다는 점이었습니다.  
어떤 지방은 데이터가 없는 곳도 있고 아니면 세세하게 안 돼 있고 한 줄로만 나타난 곳도 있었습니다.  
이런 방법으로는 분석을 할 수가 없었기 때문에 저희 팀이 시도한 방법은 데이터를 가지고 있는 구청, 경찰서에 직접 전화하는 방법이었습니다.  
7일 넘게 시도를 했지만 데이터를 받은 곳도 있고 데이터를 제공하는 것이 불가라고 답변받은 곳도 있었습니다.  
이런 과정을 통하여, 분석범위를 전국에서 서울특별시로 줄이게 되었습니다.  


<br>
<h3><blue1_h3> 5) 종합 결과 </blue1_h3></h3>
위의 방법대로 32개 독립변수들의 데이터를 확보하였습니다.  
독립변수들은 다음과 같습니다.  
![독립변수](https://github.com/kj1241/kj1241.github.io/assets/22047442/5bfe72f9-5ee9-4dbf-ac75-0d72dc00c0df){: width="100%" style="aspect-ratio:16/9"}
