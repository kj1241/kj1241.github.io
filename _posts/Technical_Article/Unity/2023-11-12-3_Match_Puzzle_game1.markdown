---
layout: post
title:  "3-Match Puzzle game 만들기 1 생각 단계 및 초기화"
date:   2023-11-12 19:06:00 +0900
image: https://github.com/kj1241/kj1241.github.io/assets/22047442/fe45614d-056e-4c6e-938a-9414b9f86352
toc: true
categories: [Unity]
tags: [C#, Unity, Puzzle, 3 Match Game]
addsence: true
---

안녕하세요, 여러분. 오랜만에 게임 콘텐츠를 작성하게 되어 어떻게 시작해야 할지 고민이 많았습니다. 제 포트폴리오를 꾸미는 것이나 조리 있게 말하는 능력이 없어도, 여러분과 함께 나만의 사고 논리를 따라가며 3-Match Puzzle 게임을 만들어보려고 합니다. 개발에 2일이 걸렸다면, 글 쓰는 데는 며칠이 걸리는지 모르겠지만 사고 논리의 흐름에 맞춰서 함께 가봅시다.

---

<br>
<h2><green1_h2> 0. 3-Match Game 이란? </green1_h2></h2>
3-Match Game은 일반적으로 "매치-3 퍼즐 게임"으로 알려져 있습니다.   이 게임은 주로 격자 형태의 보드에서 동일한 종류의 아이템을 세 개 이상 매치하여 제거하고, 목표를 달성하는 것이 목적입니다.  
대표적으로 애니팡, 캔디 크러쉬 사가등이 있습니다.  

<br>
<br>
<h2><green1_h2> 1. 3-Match Game의 기본로직 </green1_h2></h2>
게임 개발에서 기초적이고 중요한 부분은 생각을 로직화하는 것입니다.  
이런로직화가 3-Match Game 뿐만 아니라 퍼즐, 리듬, 액션, 서버, 프로시듀얼 맵 리깅등 모든 컴퓨터를 응용해서 만드는 작업들의 필수적인 부분이라고 생각합니다. 
3-Match Puzzle 게임을 기초적으로 동작하는 부분으로 나누어보면 다음과 같습니다.  

![기본로직](https://github.com/kj1241/kj1241.github.io/assets/22047442/fe45614d-056e-4c6e-938a-9414b9f86352){: width="740" height="100"}


<br>
<h3><green1_h3> 1) 게임 보드 초기화 및 생성 </green1_h3></h3>
- 목표: 게임 시작 시, 플레이어가 상호작용할 게임 보드를 초기화하고 생성합니다. 
- 동작 로직:
    1. 보드 크기와 형태 결정
    2. 무작위로 블록 배치
    3. 초기 상태에서 매치되는 아이템이 없도록 조정


<br>
<h3><green1_h3> 2) 사용자 입력 및 블록 이동 </green1_h3></h3>
- 목표: 플레이어의 입력을 받아 두 아이템을 교환합니다.  
- 동작 로직: 
    - 터치나 클릭 등의 입력 감지  
    - 선택된 블록을 교환  


<br>
<h3><green1_h3> 3) 매치 체크 및 제거 </green1_h3></h3>
- 목표: 매치되는 블록을 찾아 제거합니다.  
- 동작 로직:
    - 매치 여부 체크 (수직, 수평)
    - 매치된 아이템 제거


<br>
<h3><green1_h3> 4) 비어있는 공간 정렬 및 블록 생성 </green1_h3></h3>
- 목표: 비어있는 공간에 새로운 블록을 생성합니다.  
- 동작 로직:
    - 매칭되어 제거된 블록들을 아래로 정렬
    - 비어있는 공간 무작위 블록 생성

<br>
이러한 로직을 구성하면 여러분은 이미 게임의 50%는 완성시킨 것과 다름없습니다.  
이후에는 이를 확장하고 다양한 특성을 추가할 수 있습니다.  
게임 개발에서는 작은 부분부터 시작하여 조금씩 기능을 추가하고 테스트하며 전체를 완성해 나가는 것이 중요합니다. 


<br>
<br>
<h2><green1_h2> 2. 초기화 단계 </green1_h2></h2>

당연히, 게임 개발은 최적화보다는 초기 단계에는 기능 구현과 게임의 핵심 메커니즘에 초점을 맞춰야 합니다.문제를 세분화하고, 디바이드 앤 컨쿼(Devide and Conquer)한 후에 생각의 흐름대로 코드를 작성하면 어떤 프로그램이라도 코딩할 수 있습니다.
 

<br>
<h3><green1_h3> 1) 기본적인 구성 </green1_h3></h3>

'카메라 화면의 크기를 얼마나 잡을 것인지?'  
'블록들이 들어있는 보드 크기를 얼마나 잡을 것인지?'  
'블록의 개수를 몇 개로 만들 것인지?'  
위의 생각들은 레벨디자이너랑 상의해야 하는 부분입니다.  
제가 3-Match game 퍼즐 게임이 출시 목적이 아님으로 대략적으로 잡아 보겠습니다.  

- 카메라 화면의 크기: 900*1600
- 블록의 보드 크기: 6*7
- 블록의 개수: 5개

<br>

![처음화면](https://github.com/kj1241/kj1241.github.io/assets/22047442/14c560bd-13d5-46db-ba7d-c4e43d02ab24){: width="740" height="400"}


인터넷에서 굴려다니는 무료 아이콘을 긁은 후에 대략적으로 포토샵 편집해서 블록을 만들었습니다.  
위의 구성에다 좀 더 게임 다워 질 수 있도록  
  
'처음 시작화면을 어떤 방식으로 채워줄 것인지?'  

1. 플래시 게임 형식처럼 완전히 블록을 랜덤 한 방식으로 보드를 채워준다.  
2. 모바일 게임형식으로 레벨 디자이너가 정할 수 있도록 고정한 방식으로 보드를 채워준다.
3. 장애물 같은 건 레벨 디자이너가 정 할 수 있고 나머지 블록들은 랜덤 한 방식으로 채워준다.
  
위의 이러한 디테일한 사항은 요구사항 명세서나 협의의 영역입니다.  
게임성과 재사용성 레벨 디자인을 위해서 어떤 방식을 채택해도 이상하지 않습니다.  
먄약 제가 게임을 출시한다면 1, 2번의 중간인 3번을 고를 것입니다.  
이와 같이 크게 어려운 코드가 아님으로 코드를 확인해 보도록 하겠습니다.  
  

ⓘ 시작화면의 방식을 채우기 전 블록의 정보
블록(Block)이라는 공통된 프리팹을 만들고, 현재 자신의 상태를 저장할 Block.cs이라는 클래스를 만들 것입니다.  
색깔별로 따로 프리팹을 만들어도 되지만,색만다르고 같은 블록이기 때문에 추상적인 개념으로 묶어 버리겠습니다.  
현재 블록의 클래스에는 색과 행렬이라는 상태 정보를 가지고 있고 있습니다. 

```c#
public class Block : MonoBehaviour
{
    public List<Sprite> SpritesList = new List<Sprite>();

    //none = -1,
    //red = 0,
    //orange = 1,
    //yellow = 2,
    //green = 3,
    //purple = 4,
    //total = 5
    int blockColor = -1;
    public int BlockColor{
        get{ return blockColor; }
        set{ blockColor = value; }
    }

    int col; //행
    int row; //열
    public int Col
    {
        get { return col; }
        set { col = value; }
    }

    public int Row
    {
        get { return row; }
        set { row = value; }
    }

    void Start()
    {
        SpritesList.Capacity = SpritesList.Count; //메모리 최적화를 위해서
        if (gameObject.GetComponent<SpriteRenderer>() && blockColor != -1 && blockColor < SpritesList.Count)
            gameObject.GetComponent<SpriteRenderer>().sprite = SpritesList[blockColor];
    }

    void Update()
    {
    }
}

```
Start() 함수는 오브젝트가 생성되고 2 프레임 후에 발동합니다.  
블록 오브젝트가 생성되자마자 클래스의  BlockColor변수에 현재 색이 저장되어 있고 2프레임후에 본인의 색으로 스프라이트 이미지를 교체해줍니다.




② 플래쉬 게임처럼 블록을 랜덤하게 채워주는 방법
```c#
public class GridManager : MonoBehaviour
{
    const int col = 6;
    const int row = 7;

    GameObject blockParent; //블럭들을 관리하기 위한 오브젝트
    public GameObject blockPrefab;
    public static Vector3 offset = new Vector3(2.5f, 3.5f, 0); //중앙으로 맞춰지게
    public Block[,] Grid;
    
    // Start is called before the first frame update
    void Start()
    {
        Grid = new Block[col, row];
        blockParent = this.gameObject;
        init();
    }
    
   // Update is called once per frame
    void Update()
    {
    }
    
    void init()
    {
        for (int i = 0; i < col; ++i)
            for (int j = 0; j < row; ++j)
            {
                GameObject block = Instantiate(blockPrefab, new Vector3(i, j, 0) - offset, Quaternion.identity, blockParent.transform) as GameObject;
                Block blockScript = block.GetComponent<Block>();
                blockScript.BlockColor = (Random.Range(0, 5));
                blockScript.Col = i;
                blockScript.Row = j;
                Grid[i, j] = blockScript;
            }

    }
}

```

![랜덤체우기](https://github.com/kj1241/kj1241.github.io/assets/22047442/ac02e2e5-1032-49c2-9476-76046c400c42){: width="740" height="400"}
blockScript.BlockColor = (Random.Range(0, 5)): 보드에서 0 ~ 5중 랜덤한 번호를 생성합니다.  
그 후 블록의 상태정보를 저장하고 블록을 관리하는 그리드에 생성된 블록을 연결해 줍니다.  


③ 레벨 디자이너가 정할 수 있도록 고정한 방식으로 보드를 채워주는 방법

```c#
public class GridManager : MonoBehaviour
{
    const int col = 6;
    const int row = 7;

    GameObject blockParent; //블럭들을 관리하기 위한 오브젝트
    public GameObject blockPrefab;
    public static Vector3 offset = new Vector3(2.5f, 3.5f, 0); //중앙에 가게
    public static int[,] InitBlocks;
    public Block[,] Grid;
        
    // Start is called before the first frame update
    void Start()
    {
        //나중에 텍스트로 만들기 90 회전 되어있음
        InitBlocks = new int[col, row]{
            {1,2,3,4,2,1,3 },
            {1,1,1,1,1,1,1 },
            {1,1,1,1,1,1,3 },
            {3,3,2,3,1,1,1 },
            {1,1,1,1,1,1,2 },
            {1,1,1,1,1,1,3 },

        };

        Grid = new Block[col, row];
        blockParent = this.gameObject;
        init();
    }
    
    // Update is called once per frame
    void Update()
    {
    }
    
    void init()
    {
        for (int i = 0; i < col; ++i)
            for (int j = 0; j < row; ++j)
            {
                GameObject block = Instantiate(blockPrefab, new Vector3(i, j, 0) - offset, Quaternion.identity, blockParent.transform) as GameObject;
                Block blockScript = block.GetComponent<Block>();
                blockScript.BlockColor = InitBlocks[i,j];
                blockScript.Col = i;
                blockScript.Row = j;

                Grid[i, j] = blockScript;
            }
    }
}

```

![랜덤2](https://github.com/kj1241/kj1241.github.io/assets/22047442/2323c5ba-c101-4442-9bc2-d22762a97a1e){: width="740" height="400"}

InitBlocks를 선언해 줍니다.  
그 후 정보를 바탕으로 블록에 색을 전달해 주는 방식입니다.  
이렇게 코드를 적은 이유는 혹시라도 추후에 레벨 디자이너를 위해서 InitBlocks의 함수를 메모장에서 불러올 수 있는 툴작업을 할 수 있기 때문에 따로 적어 놨습니다.
 
나머지 3번은 깃허브에 있는 전체 소스코드를 보시면 알 수 있습니다.  
소스 코드를 보기전에 한번 생각해보고 작성하시는걸 추천 드립니다.
