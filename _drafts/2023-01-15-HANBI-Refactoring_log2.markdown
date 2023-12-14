---
layout: post
title:  "하나비 프로젝트) 리듬 게임 개발 로그 2 노드의 생성 로직 설계 및 구현"
date: 2023-01-15 12:35:34 +0900
image: https://drive.google.com/uc?export=view&id=1UllzH4E31dOgljV2taZ-_y-UhLR9N8rH
toc: true
categories: [Unity]
tags: [C#, Unity, Puzzle, 3 Match Game]
addsence: true
excerpt: 
---

## <green1_h2>1. 노드의 생성 로직 설계 및 구현</green1_h2>

![세부 단계1](https://drive.google.com/uc?export=view&id=1UllzH4E31dOgljV2taZ-_y-UhLR9N8rH){: width="100%" }

이 단계에서는 노드를 어떻게 생성할 것인지 고민하고 설계하는 단계였습니다.  

<br>

### <green1_h3>1) 노드 생성 로직 설계</green1_h3>

![노드 생성 로직 설계](https://drive.google.com/uc?export=view&id=1VINXpIa33UaenKSAllY0yLIsREh_G65W){: width="100%" }

제가 맡은 역활은 메인 프로그래머였습니다.  
**"노드를 어떻게 생성시킬 것인지?"**에 관한 생각을 한 후, 채보를 만드는 프로그래머와 대화하였습니다.  
그 결과 메모장을 통해서 채보 데이터를 만들어주면, 파싱하는 코드를 제작하기로 하였습니다.  
해당 되는 노드를 큐에 저장합니다.  
미리 사전에 5키를 만들기로 협의를 했음으로, 딕셔너리를 사용하여 노드와 연관되는 키를 매칭해 두었습니다.  
(C++에서 해쉬테이블 비슷한 역활로 코드에서 좀 더 빠르게 동작시키기 위함입니다.)  
그 후 코루틴을 사용하여, 일정 시간마다 노드를 뿌려주는 형식으로 제작하였습니다.  

<br>

#### <green1_h5> 시퀀스</green1_h5>


![생성 시퀀스](https://drive.google.com/uc?export=view&id=10BgqeNt2baV9WrggZgSiCAwGA_g2rdkx){: width="50%" }

텍스트 파일로 데이터를 읽고, 그 후 코루틴을 사용하여 정해진 시간마다 노드를 생성합니다.

<br>

## <green1_h2>2) 노드 생성 로직 구현</green1_h2>

```

//sampleExample.txt
0 1 0 0 1
1 0 0 1 0

```

가장 먼저 한 일은, 위의 텍스트처럼, 채보 프로그래머와 협의된 내용을 바탕으로 단위 프로그램을 할 수 있는 테스트 코드를 작성한 것입니다.  
5키로 작성했기 때문에 5열을 가지고 있습니다.
노드는 싱글 노드만 제작할 것임으로 0은 노드가 존재하지 않음, 1은 싱글 노드를 나타내 줍니다.  
또한 협의된 시간마다 행을 채워줄 것입니다.

이런 테스트 코드를 받은 후, 파일 입출력으로 데이터를 읽어서 큐로 사용할 리스트에 저장하는 코드를 작성 하였습니다.  


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

이러한 코드를 작성하게 된 이유는 메모장에서 c#으로 읽는 형식은 숫자 형식이 아닌 문자 형식(system.char '0')으로 캐스팅되기 때문입니다.  

물론 이런 변수를 문자로 지정하고 Convert.ToInt32()이라는 메서드를 사용하여 문자를 숫자로 변환시킬 수도 있습니다.  
결국 위의 메서드 내부를 살펴보면, 문자를 숫자로 변할 때 아스킷 코드를 이용해서 변환시킵니다.  
그래서 -48을 사용한 이유는 아스킷 코드를 이용하여 문자를 숫자 형식으로 강제 캐스팅 하려고 작성하였습니다.  

게임잼 당시 이렇게 작성하게 된 이유는 조금이라도 속도를 올리고 싶었기 때문입니다.  
코드가 동작하는 과정을 생각해 보면 코드를 읽기 위해서 추가 함수를 작성하게 되는데 결국 메모리에서 함수를 읽기 위해 스택을 한 번 더 쌓아야 하기 때문입니다.  

이런 코드의 장점은 빠르게 동작시킬 수 있습니다.  
하지만 단점은 유지보수의 관점으로 보게 되면 매우 나쁜 코드라고 생각할 수 있습니다.  

마지막으로  일정한 노드 송출 시간(△t)을 만들기 위해서 코루틴을 사용하였습니다.  


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

<span><green1_h5> swtich-case  vs Dictionary   (관련 아티클) </green1_h5>
[https://stackoverflow.com/questions/11617091/in-a-switch-vs-dictionary-for-a-value-of-func-which-is-faster-and-why](https://stackoverflow.com/questions/11617091/in-a-switch-vs-dictionary-for-a-value-of-func-which-is-faster-and-why) </span>

