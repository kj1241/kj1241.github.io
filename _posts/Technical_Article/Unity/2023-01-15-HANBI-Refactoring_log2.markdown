---
layout: post
title:  "하나비 프로젝트 - 리듬 게임 개발 로그 2 노드의 생성 로직 설계 및 구현"
date: 2023-01-15 12:35:34 +0900
image: https://drive.google.com/uc?export=view&id=1UllzH4E31dOgljV2taZ-_y-UhLR9N8rH
toc: true
categories: [Unity]
tags: [C#, Unity, Rhythm Game]
addsence: true
excerpt: Unity 및 C#로 개발한 리듬게임 '하나비 프로젝트'의 로그입니다. 노드 설계 시 구성 방식과 구현에 대한 고민과 경험을 간결하게 공유하고 있습니다.
---

## <green1_h2>1. 노드의 생성 로직 설계 및 구현</green1_h2>

![세부 단계1](https://drive.google.com/uc?export=view&id=1UllzH4E31dOgljV2taZ-_y-UhLR9N8rH){: width="100%" }

이 단계에서는 노드를 어떻게 생성할 것인지 고민하고 설계하는 단계입니다.  
  
리듬 게임의 핵심적인 부분 중 하나는 <red1_error>노드의 생성과 처리</red1_error>입니다.  
노드는 화면 상에서 사용자에게 표시되며, 플레이어는 정확한 타이밍에 입력을 해서 노드에 맞게 반응해야 합니다.  
노드의 생성 로직은 게임의 난이도, 속도, 및 음악과의 동기화를 고려해야 합니다.  


1. <green1_h5>음악과의 동기화:</green1_h5>
    - 음악의 비트에 맞춰서 노드를 생성해야 합니다.  
    음악 파일에서 비트 정보를 추출하거나 특정 비트 타임마다 노드를 생성하는 방식을 고려할 수 있습니다.

2. <green1_h5>노드 생성 주기 및 위치 설정:</green1_h5>
    - 노드는 플레이어에게 일정한 주기로 표시되어야 합니다.  
    예를 들어, 초당 몇 개의 노드를 생성할지, 노드가 표시되는 위치 등을 결정합니다.

3. <green1_h5>플레이어와의 상호작용:</green1_h5>
    - 플레이어가 노드에 반응할 때의 동작을 정의합니다.  
    이는 키 입력, 터치, 클릭 등과 같은 사용자 입력에 대한 처리를 의미합니다.

4. <green1_h5>노드의 제거:</green1_h5>
    - 플레이어가 정확한 타이밍에 노드에 반응하면 해당 노드는 제거되거나 처리되어야 합니다.  
    게임의 규칙에 따라 점수를 계산하고 플레이어에게 피드백을 주는 등의 동작을 수행합니다.

5. <green1_h5>특수 노드 및 효과:</green1_h5>
    - 게임에 특수한 노드나 효과를 추가하고, 이를 통해 게임 플레이를 더 흥미롭게 만듭니다.

<br>

### <green1_h3>1) 노드 생성 로직 설계</green1_h3>

![노드 생성 로직 설계](https://drive.google.com/uc?export=view&id=1VINXpIa33UaenKSAllY0yLIsREh_G65W){: width="100%" }

#### <green1_h4>메인 프로그래머의 역할: 노드 생성 및 채보 데이터 파싱</green1_h4>
  
프로젝트에서 나의 주요 역할은 메인 프로그래머로서, <red1_error>"노드를 어떻게 생성시킬 것인지?"</red1_error>에 대한 고민을 하고, 채보를 만드는 동료 프로그래머와의 대화를 통해 해결 방안을 찾아냈습니다.  
  
결과적으로, 메모장을 활용하여 채보 데이터를 작성하면, 이를 파싱하는 코드를 개발하기로 결정했습니다.  
해당 노드들은 큐에 저장되며, 사전에 5키를 만들 것으로 협의하여, 딕셔너리를 사용하여 노드와 키를 매칭해 두었습니다.  
이는 C++에서 해시 테이블과 유사한 역할로, 코드를 빠르게 동작시키기 위한 것입니다.  
  
코루틴을 활용하여, 일정 시간마다 노드를 생성하고 이를 전송하는 형태로 코드를 구현했습니다.  
이로써 효율적인 작업 분배와 노드 생성 프로세스의 원활한 진행이 가능해졌습니다.  

<br>

#### <green1_h4> 시퀀스</green1_h4>

![생성 시퀀스](https://drive.google.com/uc?export=view&id=10BgqeNt2baV9WrggZgSiCAwGA_g2rdkx){: width="50%" }

시퀀스로 진행되는 일반적인 프로그램 흐름을 설명하겠습니다.  
이 프로그램은 텍스트 파일에서 데이터를 읽고, 일정한 시간 간격으로 코루틴을 통해 노드를 생성합니다.  

<br>

## <green1_h2>2) 노드 생성 로직 구현</green1_h2>

```

//sampleExample.txt
0 1 0 0 1
1 0 0 1 0

```

프로그래밍 작업을 시작하면서, 먼저 채보 프로그래머와 함께 협의된 내용을 기반으로 단위 프로그램을 테스트하는 코드를 작성했습니다.  
이 코드는 5키로에 맞게 5열을 가지고 있으며, 노드는 0이면 노드가 존재하지 않음을, 1이면 싱글 노드를 나타냅니다.  
계속해서 협의된 시간마다 해당 행을 채워 나갈 것입니다.  
  
테스트 코드를 받은 후, 다음 단계로는 파일 입출력을 활용하여 데이터를 읽어와 큐로 사용할 리스트에 저장하는 코드를 작성했습니다.  
이 코드는 읽어온 데이터를 큐에 순서대로 저장하여 나중에 처리할 수 있도록 합니다.


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

여기서 잠시 코드를 살펴보겠습니다.  

```c#

KeyNodesList[j].Add(textValue[i][j] - 48);

```

코드를 문자 형식으로 읽는 메모장에서의 문제로부터 출발하여 숫자 형식이 아닌 문자 형식(system.char '0')으로 캐스팅되기 때문입니다.  
해당 변수를 문자로 지정하고 Convert.ToInt32() 메서드를 사용하여 문자를 숫자로 변환할 수도 있습니다.  
그러나 게임 잼에서는 속도를 높이고자 특별한 최적화를 시도했습니다.  
메서드 내부에서는 문자를 숫자로 변환하기 위해 아스키 코드를 활용하고, 이때 -48을 사용하여 강제 캐스팅했습니다.  
  
이런 선택은 코드의 빠른 동작을 가능케 하지만, 유지보수 관점에서는 좋지 않을 수 있습니다.  
코드를 읽기 위해 추가 함수를 작성하는 과정에서 메모리 스택이 한 번 더 쌓이기 때문입니다.  
  
코드의 장점은 빠른 동작이 가능하다는 점이지만, 이는 가독성과 유지보수성을 희생한 결과일 수 있습니다.  
따라서 향후 코드 리뷰 및 수정을 고려할 때에는 주의가 필요합니다.  
  
마지막으로, 일정한 노드 송출 시간을 만들기 위해 코루틴을 사용한 것은 효과적인 선택 중 하나입니다.  
이를 통해 코드의 가독성을 유지하면서도 비동기적인 작업을 수행할 수 있습니다.  
개발 과정에서는 항상 성능 최적화와 코드의 가독성 사이에서 균형을 잡는 것이 중요하다고 생각합니다. 

```c#

    public void startCoroutines()
    {
        for (int i = 0; i < keyCount; ++i)
            StartCoroutine(CreateNodeNumber(i)); // 키 개수만큼  노드를 생성하기위해서 코루틴 작성
    }

```

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

게임 잼 당시에는 While 문 안에  Dictionary를 사용하지 않고 swtich-case 문 사용하였습니다.  
하지만 최근 컴파일 단계에서는 swtich-case문의 속도가 Dictionary 보다 빠르지만, 런타임 단계로 들어가면 Dictionart가 빠르다는 아티클을 읽고  refactoring 코드에서는 Dictionary로 작성하였습니다.  

<br>

---

<br>

#### <green1_h4> 참조 </green1_h4>

- swtich-case  vs Dictionary: [https://stackoverflow.com/questions/11617091/in-a-switch-vs-dictionary-for-a-value-of-func-which-is-faster-and-why](https://stackoverflow.com/questions/11617091/in-a-switch-vs-dictionary-for-a-value-of-func-which-is-faster-and-why)



