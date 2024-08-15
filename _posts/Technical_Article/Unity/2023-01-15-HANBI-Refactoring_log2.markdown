---
layout: post
title: "하나비 프로젝트(리듬 게임) 개발 로그 2 - 노드의 생성 로직 설계 및 구현"
date: 2023-01-15 12:35:34 +09:00
image: https://drive.google.com/thumbnail?id=1UllzH4E31dOgljV2taZ-_y-UhLR9N8rH
toc: true
categories: [Unity]
keywords: C#, Unity, Rhythm Game, game log
lastmod: 2024-08-15 20:53:00 +09:00
sitemap: 
  changefreq : weekly
  priority : 0.1
addsence: true
excerpt: Unity 및 C#로 개발한 리듬게임 '하나비 프로젝트'의 로그입니다. 노드 설계 시 구성 방식과 구현에 대한 고민과 경험을 간결하게 공유하고 있습니다.
related_links:
    - url: /game_jam/HANABI.html
    - url: /unity/HANBI-Refactoring_log1.html
    - url: /unity/HANBI-Refactoring_log3.html
    - url: /unity/HANBI-Refactoring_log4.html
---


## <unity_h2>1. 요약</unity_h2>

리듬 게임에서 노드를 생성하는 로직 설계 및 구현에 대해 설명하겠습니다.

<br>

![세부 단계1]({{ site.google_drive }}1UllzH4E31dOgljV2taZ-_y-UhLR9N8rH{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<unity_h6>현재 단계</unity_h6>*

리듬 게임의 핵심 요소 중 하나는 <red1_error>노드의 생성 및 처리</red1_error>입니다. 노드는 화면에 표시되며, 플레이어는 노드에 맞춰 정확한 타이밍에 입력을 해야 합니다. 이 노드 생성 로직은 게임의 난이도, 속도, 그리고 음악과의 동기화를 고려하여 설계되어야 합니다.

1. <p><unity_h5>음악과의 동기화:</unity_h5> 음악의 비트에 맞춰 생성되어야 합니다. 이를 위해 음악 파일에서 비트 정보를 추출하거나 특정 비트 타이밍에 맞춰 노드를 생성하는 방법을 사용할 수 있습니다.</p>

2. <p><unity_h5>노드 생성 주기 및 위치 설정:</unity_h5> 노드는 일정한 주기로 생성되어야 합니다. 예를 들어, 초당 생성할 노드의 개수와 노드가 표시될 위치를 설정합니다.</p>

3. <p><unity_h5>플레이어와의 상호작용:</unity_h5> 플레이어가 노드에 반응할 때의 동작을 정의합니다. 이에는 키 입력, 터치, 클릭과 같은 사용자의 입력 처리 등이 포함됩니다.</p>

4. <p><unity_h5>노드의 제거:</unity_h5> 플레이어가 노드에 정확히 반응하면 해당 노드는 제거되거나 처리됩니다. 이에 따라 점수를 계산하고, 피드백을 제공합니다.</p>

5. <p><unity_h5>특수 노드 및 효과:</unity_h5> 특수한 노드와 효과를 추가하여 게임을 더욱 흥미롭게 만듭니다.</p>

<br>
<br>

## <unity_h2>2. 노드 생성 로직 설계</unity_h2>

노드 생성 로직을 설계할 때 고려해야 할 사항은 다음과 같습니다.

<br>

![노드 생성 로직 설계]({{ site.google_drive }}1VINXpIa33UaenKSAllY0yLIsREh_G65W{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<unity_h6>노드 생성 로직 설계</unity_h6>*

해당 이미지는 제가 구상한 노드 생성 로직 설계 부분입니다.

<br>

### <unity_h3>1) 메인 프로그래머의 역할: 노드 생성 및 채보 데이터 파싱</unity_h3>
  
저는 메인 프로그래머로서, **"노드를 어떻게 생성할 것인가?"**에 대해 고민했고, 채보를 만드는 동료와 논의하여 해결 방안을 도출했습니다.

결론적으로, 메모장을 활용해 채보 데이터를 작성하고, 이를 파싱하는 코드를 개발하기로 했습니다. 이렇게 생성된 노드들은 큐에 저장됩니다. 우리는 5키로 게임을 진행하기로 했기 때문에, 딕셔너리를 활용해 노드와 키를 매칭했습니다. 이는 C++의 해시 테이블과 유사한 역할을 하며, 코드의 효율성을 높이기 위한 선택이었습니다.

또한, 코루틴을 활용해 일정 시간마다 노드를 생성하고 이를 처리하는 코드를 구현했습니다. 이를 통해 작업 분배가 효율적으로 이루어졌으며, 노드 생성 프로세스도 원활하게 진행되었습니다.

<br>

### <unity_h3>2) 시퀀스</unity_h3>

시퀀스 다이어그램을 통해 노드 생성 프로그램의 전반적인 흐름을 설명하겠습니다.

<br>

![노드 생성 로직 설계]({{ site.google_drive }}10BgqeNt2baV9WrggZgSiCAwGA_g2rdkx{{ site.google_drive_end }}){:width="100%" height="auto" style="aspect-ratio:16/9"  loading="lazy"}
*<unity_h6>노드 생성 로직 설계</unity_h6>*


1. <p><unity_h5>시작:</unity_h5> 프로그램이 시작되면 파일 시스템에서 채보 파일을 읽어옵니다.</p>
2. <p><unity_h5>채보 데이터 파싱:</unity_h5> 읽어온 채보 데이터를 파싱하여 노드 생성에 필요한 정보로 변환합니다. 각 키에 대한 노드 정보가 생성됩니다.</p>
3. <p><unity_h5>코루틴 시작:</unity_h5> 일정한 지연 후에 노드 생성을 시작하는 코루틴이 시작됩니다.</p>
4. <p><unity_h5>노드 생성:</unity_h5> 코루틴이 실행되면서 노드를 생성하고 화면에 표시합니다. 채보 데이터에 따라 노드의 생성 여부가 결정됩니다.</p>
5. <p><unity_h5>종료:</unity_h5> 모든 노드가 생성되면 프로그램이 종료됩니다.</p>  
   
이 프로그램은 텍스트 파일에서 데이터를 읽고, 일정한 시간 간격으로 코루틴을 통해 노드를 생성하는 방식으로 작동합니다.

<br>
<br>

## <unity_h2>3. 노드 생성 로직 구현</unity_h2>

아래는 Unity 게임 엔진에서 C#을 사용하여 노드 생성 로직을 구현한 예시 코드입니다. 이 코드는 코루틴을 사용하여 일정한 시간 간격으로 노드를 생성하도록 설계되었습니다.

<br>

#### **<web_h4>txt:</web_h4>**

```

//sampleExample.txt
0 1 0 0 1
1 0 0 1 0

```

채보 프로그래머와 협의한 내용을 바탕으로 단위 프로그램을 테스트하기 위해 작성된 코드입니다. 이 코드는 5키로 구성된 5열을 가지고 있으며, 0은 노드가 없음을, 1은 노드가 있음을 나타냅니다. 각 행은 협의된 시간 간격에 따라 채워집니다.

파일 입출력을 활용해 데이터를 읽어온 후, 큐로 사용할 리스트에 저장하는 코드를 작성했습니다. 이 코드는 읽어온 데이터를 큐에 순서대로 저장하여 나중에 처리할 수 있도록 합니다.

<br>

#### **<web_h4>c#:</web_h4>**


```c#

    List<int>[] KeyNodesList = new List<int>[keyCount]; 
    ...
    void Start()
    {
        string path = Application.dataPath + "/Resources/sampleExample.txt"; //채보 파일이 위치한 유니티 빌드또는 프로젝트 상대 경로
        string[] textValue = System.IO.File.ReadAllLines(path); // 채보 파일 읽어오기

        if (textValue.Length > 0)
        {
            for (int i = 0; i < textValue.Length; ++i)
            {
                for (int j = 0; j < textValue[i].Length; ++j)
                {
                    if (textValue[i].Length > keyCount) //혹시 길이가 생각한 키노드보다 넘어간다면 에러나지 않게 코딩
                        continue;

                    KeyNodesList[j].Add(textValue[i][j] - 48); //당시 -48을한 이유: 아스키 코드를 이용하여 작성한 키 system.char 를 system.int 로 빠르게 변환시킬수 있는 효과가 있어서 작성
                }
            }
        }
        Invoke("startCoroutines", delaytimeCoroutinesTime); //시작시간을 좀더 딜레이 시키기 위해서
    }

```

코드 중 중요한 부분을 살펴보겠습니다.

<br>

#### **<web_h4>c#:</web_h4>**


```c#

KeyNodesList[j].Add(textValue[i][j] - 48);

```

코드를 문자 형식으로 읽는 메모장에서의 문제로부터 출발하여 숫자 형식이 아닌 문자 형식(system.char '0')으로 캐스팅되기 때문입니다. 해당 변수를 문자로 지정하고 Convert.ToInt32() 메서드를 사용하여 문자를 숫자로 변환할 수도 있습니다. 그러나 게임 잼에서는 속도를 높이고자 특별한 최적화를 시도했습니다. 메서드 내부에서는 문자를 숫자로 변환하기 위해 아스키 코드를 활용하고, 이때 -48을 사용하여 강제 캐스팅했습니다.  
  
이런 선택은 코드의 빠른 동작을 가능케 하지만, 유지보수 관점에서는 좋지 않을 수 있습니다. 코드를 읽기 위해 추가 함수를 작성하는 과정에서 메모리 스택이 한 번 더 쌓이기 때문입니다.  
  
코드의 장점은 빠른 동작이 가능하다는 점이지만, 이는 가독성과 유지보수성을 희생한 결과일 수 있습니다. 따라서 향후 코드 리뷰 및 수정을 고려할 때에는 주의가 필요합니다.  
  
마지막으로, 일정한 노드 송출 시간을 만들기 위해 코루틴을 사용한 것은 효과적인 선택 중 하나입니다. 이를 통해 코드의 가독성을 유지하면서도 비동기적인 작업을 수행할 수 있습니다. 개발 과정에서는 항상 성능 최적화와 코드의 가독성 사이에서 균형을 잡는 것이 중요하다고 생각합니다. 

<br>

#### **<web_h4>c#:</web_h4>**

```c#

    public void startCoroutines()
    {
        for (int i = 0; i < keyCount; ++i)
            StartCoroutine(CreateNodeNumber(i)); // 키 개수만큼  노드를 생성하기위해서 코루틴 작성
    }

```

위의 코드는 키 개수만큼 노드를 생성하기 위해 코루틴을 사용하는 예시입니다. 


<br>

#### **<web_h4>c#:</web_h4>**

```c#

Dictionary<int, string> nodeKeyTable = new Dictionary<int, string>(); //node에 원하는 key 값을 
const int keyCount = 5;    //키보드 키 갯수// 작성한 이유: 추후 레벨디자인에서 키보드 변화 할 수 있도록 변경
List<int>[] KeyNodesList = new List<int>[keyCount]; //키보드의 개수만큼 키 노드들을 담은 리스트를 생성

public float delaytime = 0.571428571428571f;   // 채보와 협의된 채보 간격시간 
public GameObject prefabNodes; //노드들을 생성하기위해서 프리팹을 담는 곳

...
//일정하게 노드를 생성하기 위해서 코루틴을 이용하여 생성
    IEnumerator CreateNodeNumber(int i)
    {
        int count = 0;

        while (true)
        {
            if (KeyNodesList[i].Count - 1 < count) //while 탈출 조건
                break;
            if (KeyNodesList[i][count] == 1) //만약 채보 텍스트에서 1을 읽었다면 
            {
                GameObject node = Instantiate(prefabNodes, new Vector3(-3+(2*i), -5, 0), Quaternion.identity) as GameObject; //프리팹 노드를 생성
                PrefabNodes nodePrefabScrit =  node.GetComponent<PrefabNodes>(); //prefabNodes의 스크립트 붙이기
                if (nodePrefabScrit) // 찾는스크립트가 존재한다면
                    nodePrefabScrit.NodeKey = nodeKeyTable[i]; //딕셔너리를 이용한 맵핑 테이블로 좀더 성능 최적화
            }
            yield return new WaitForSeconds(delaytime); // 채보에서 협의된 시간만큼 지연
            count++;
        }
        yield return null; //코루틴 끝나면 탈출
    }

```

게임 잼 당시에는 While 문 안에  Dictionary를 사용하지 않고 swtich-case 문 사용하였습니다. 하지만 최근 컴파일 단계에서는 swtich-case문의 속도가 Dictionary 보다 빠르지만, 런타임 단계로 들어가면 Dictionart가 빠르다는 아티클을 읽고  refactoring 코드에서는 Dictionary로 작성하였습니다.  

이처럼 리듬 게임의 노드 생성 로직은 성능 최적화와 코드 가독성 간의 균형을 유지하며 구현하는 것이 중요합니다.

<br>

---

<br>

###### <unity_h6> 참조 </unity_h6>

###### - swtich-case  vs Dictionary: [https://stackoverflow.com/questions/11617091/in-a-switch-vs-dictionary-for-a-value-of-func-which-is-faster-and-why](https://stackoverflow.com/questions/11617091/in-a-switch-vs-dictionary-for-a-value-of-func-which-is-faster-and-why)



