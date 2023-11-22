---
layout: post
title:  "3-Match Puzzle game 만들기 2 사용자 입력 & 이동"
date:   2023-11-13 13:05:00 +0900
image: https://github.com/kj1241/kj1241.github.io/assets/22047442/fe45614d-056e-4c6e-938a-9414b9f86352
toc: true
categories: [Unity]
tags: [C#, Unity, Puzzle, 3 Match Game]
---



<br>
<h2><green1_h2> 3. 3-Match Game의 사용자 입력 </green1_h2></h2>


저희는 앞서 블록 초기화에 이어, 생각을 로직화 하는 방법으로 코드를 계속 작성하고 있습니다.  
이다음은 사용자 입력과 블록 이동에 관해서입니다.  
입출력 장치와 오브젝트 컨트롤의 상호작용이 없으면 게임이라고 할 수 없습니다.키보드, 마우스, 조이패드 등의 입출력 장치 중에 마우스를 사용하여 블록을 컨트롤해 보겠습니다.  
- 마우스를 이용한 블록 컨트롤 및 상호작용
  
 
'유니티에서 마우스를 이용하여 오브젝트와 상호작용 할 수 있는 방법에 대해서?'  

1. UI로 만들어서  IPointerClickHandle 인터페이스를 사용하여 클릭 이벤트를 만든다.
2. 레이케스트를 사용하여 적중(힛)된 오브젝트를 가져온다.
3. 동작 로직을 직접 만든다.

 
뉴 인풋 시스템을 사용해서 만들 수도 있지만, 인풋 시스템과 뉴 인풋 시스템은 조이패드, 키보드등과 같이 여러 입출력 장치를 사용하는데 용의 합니다.  따라서 크게 신경 쓸 필요는 없습니다.  
게임의 최적화를 고려하지 않는다면 그 어떤 방식을 사용해도 무관합니다.  
어떤 방식을 사용하던지 게임이 플레이 할 수 있게 만들 수 있기 때문입니다.  
1번은 오브젝트를 UI로 제작하여 UI패널에 있는 마우스 이벤트를 작동시키는 방식입니다.  
이렇게 코드를 작성하고자 한다면, "UI에서 마우스와 상호작용 후 이벤트 발생 → 전역변수나 싱글톤으로 구현되어 있는 Gird에 접근 → 블록 동작 처리" 이러한 방식으로 코드를 작성할 수 있습니다.  
2번은 유니티의 레이케스트를 이용하는 방식입니다.  
여기의 문제점은 레이가 오브젝트에 적중(힛)하기 위해서는 콜라이더가 필요합니다.  
즉 다시 말해서 물리엔진을 탑재해야 한다는 이야기입니다.  
이런 가변운 게임에 물리엔진까지 적용해야 할 만큼 크게 필요하지 않습니다.따라서 동작을 직접 만드는 것이 가장 효율적입니다.  
  
그럼 일단 마우스가 클릭되면 해당 오브젝트가 확대되도록 제작해 봅시다.  


```c#
public class GridManager : MonoBehaviour
{

    public Block selectedBlock;
    
    void Update()
    {
        if (Input.GetMouseButtonDown(0))
        {
            //마우스 클릭한 좌표값 가져오기
            Vector2 pos = Camera.main.ScreenToWorldPoint(Input.mousePosition);
            pos += offset;
            pos += new Vector3(0.5f, 0.5f, 0);

            int _selectCurrentCol= -1;
            int _selectCurrentRow= -1;

            _selectCurrentCol = (int)pos.x / 1;
            _selectCurrentRow = (int)pos.y / 1;
            
            selectedBlock = Grid[_selectCurrentCol, _selectCurrentRow];
            selectedBlock.transform.localScale += new Vector3(0.5f, 0.5f, 0.5f);
        }
        if (Input.GetMouseButtonUp(0))
        {
            selectedBlock.transform.localScale -= new Vector3(0.5f, 0.5f, 0.5f);
            selectedBlock = null;
        }
    }
}
```


![블록확대](https://github.com/kj1241/kj1241.github.io/assets/22047442/0838e168-4648-4606-9e8d-6de5c841c4dd){: width="740" height="250"}


Vector2 pos = Camera.main.ScreenToWorldPoint(Input.mousePosition);오브젝트가 모니터 화면까지 보여주기 위해서 오브젝트상의 월드 좌표를 모니터 화면 좌표로 바꿔줘야 합니다.  
이런 그래픽스의 원리를 이용하여 역행렬과 도달하는 z 깊이의 위치를 알고 있으면 화면 좌표에서 월드 좌표까지 역으로 계산할 수 있습니다.  
요런 원리를 이용하여 현재 위치하고 있는 마우스 위치를 월드 좌표로 변환하여 얻었습니다.  




```c#
//pos += offset;
//pos += new Vector3(0.5f, 0.5f, 0);

int _selectCurrentCol= -1;
int _selectCurrentRow= -1;

//_selectCurrentCol = (int)pos.x / 1;
//_selectCurrentRow = (int)pos.y / 1;

if (pos.x < 3.0f && pos.x > 2.0f)
    _selectCurrentCol = 5;
else if (pos.x < 2.0f && pos.x > 1.0f)
    _selectCurrentCol = 4;
else if (pos.x < 1.0f && pos.x > 0.0f)
    _selectCurrentCol = 3;
else if (pos.x < 0.0f && pos.x > -1.0f)
    _selectCurrentCol = 2;
else if (pos.x < -1.0f && pos.x > -2.0f)
    _selectCurrentCol = 1;
else if (pos.x < -2.0f && pos.x > -3.0f)
    _selectCurrentCol = 0;


if (pos.y < 3.0f && pos.y > 2.0f)
    _selectCurrentRow = 6;
else if (pos.y < 2.0f && pos.y > 1.0f)
    _selectCurrentRow = 5;
else if (pos.y < 1.0f && pos.y > 0.0f)
    _selectCurrentRow = 4;
else if (pos.y < 0.0f && pos.y > -1.0f)
    _selectCurrentRow = 3;
else if (pos.y < -1.0f && pos.y > -2.0f)
    _selectCurrentRow = 2;
else if (pos.y < -2.0f && pos.y > -3.0f)
    _selectCurrentRow = 1;
else if (pos.y < -3.0f && pos.y > -4.0f)
    _selectCurrentRow = 0;

```
클릭을 할 시 마우스 위치에 있는 오브젝트를 얻기 위해서 위와 같이 코드를 작성할 수 도 있습니다.  
이렇게 작성하게 되면 마우스 위치와 블록 오브젝트의 영역 바운드 크기에 초점은 맞추고 그에 따라서 행렬의 번호를 얻는 방법입니다.  
하지만 만약 블록의 관리하는 그리드의 크기 즉, 행렬의 최대 값이 바뀔 시 (축소되거나 확대될 시) 코드를 재사용할 수 없습니다.  
또한 크기 개수에 맞게 else if문을 추기를 하거나 삭제해야 합니다.  
 
그렇기 때문에 저희는 약간의 꼼수를 사용할 것입니다.  
```c#
Vector2 pos = Camera.main.ScreenToWorldPoint(Input.mousePosition);
pos += offset;
pos += new Vector3(0.5f, 0.5f, 0);

int _selectCurrentCol= -1;
int _selectCurrentRow= -1;

_selectCurrentCol = (int)pos.x / 1;
_selectCurrentRow = (int)pos.y / 1;
```

블록 한 개의 반지름이 0.5f를 가지고 있기 때문에 블록의 좌표에서 그리드의 좌표 조절인 offset 크기와 블록의 반지름을 더해주게 되면 index 0인 블록의 왼쪽 부분을 0으로 잡을 수 있습니다.  
이런 그리드가 블록의 연속성을 가지고 있다는 것에 착안하여 블록의 크기만큼 나누게 되면 현재 행렬의 번호를 쉽게 얻을 수 있습니다.
  
이 처럼 어떻게 코드를 작성해도 게임을 동작시킬 수 있음으로 여러분이 생각하는 논리대로 코드를 작성하게 가장 중요하다고 생각합니다.
  
마우스를 누를 시 원하는 행과 열의 번호를 얻게 되었다면 그다음은 다른 오브젝트와 교환하는 것입니다.처음에는 가장 간단한 방법으로 코드를 작성해 봅시다.  

```c#
    ...
    void Update()
    {
        if (Input.GetMouseButtonDown(0))
        {
            //마우스 클릭한 좌표값 가져오기
            Vector3 pos = Camera.main.ScreenToWorldPoint(Input.mousePosition);
            pos += offset;
            pos += new Vector3(0.5f, 0.5f, 0);

            int _selectCurrentCol= -1;
            int _selectCurrentRow= -1;

            _selectCurrentCol = (int)pos.x / 1;
            _selectCurrentRow = (int)pos.y / 1;

            if (firstSelectdBlock == null)
            {
                firstSelectdBlock = Grid[_selectCurrentCol, _selectCurrentRow];
                firstSelectdBlock.transform.localScale += new Vector3(0.5f, 0.5f, 0.5f);
            }
            else
            {
                secondSelectedBlock = Grid[_selectCurrentCol, _selectCurrentRow];
                secondSelectedBlock.transform.localScale += new Vector3(0.5f, 0.5f, 0.5f);

                swap(ref firstSelectdBlock, ref secondSelectedBlock);
            }
        }
        //if (Input.GetMouseButtonUp(0))
        //{
        //    selectedBlock.transform.localScale -= new Vector3(0.5f, 0.5f, 0.5f);
        //    selectedBlock = null;
        //}
    }
    ...

    void swap(ref Block A, ref Block B ) 
    {
        //위치 바꾸기
        Vector3 tempPos = B.transform.position;
        B.transform.position = A.transform.position;
        A.transform.position = tempPos;
        
        //위치 번호 바꾸기
        Block tempBlock = B;
        int tempCol = B.Col;
        int tempRow = B.Row;

        Grid[B.Col, B.Row] = A;
        Grid[A.Col, A.Row] = tempBlock;

        B.Col = A.Col;
        B.Row = A.Row;

        A.Col = tempCol;
        A.Row = tempRow;
 
        A.transform.localScale -= new Vector3(0.5f, 0.5f, 0.5f);
        B.transform.localScale -= new Vector3(0.5f, 0.5f, 0.5f);

        firstSelectdBlock = null;
        secondSelectedBlock = null;
    }
    ...
```
![블록교체gif](https://github.com/kj1241/kj1241.github.io/assets/22047442/f32ae56b-3745-4e23-94a0-089a92afcf1c){: width="740" height="250"}

Swap()은 두 번째 블록 오브젝트의 행렬을 얻을 수 있는 변수를 만든 후, 마우스클릭으로 두 번째 블록 오브젝트의 행렬을 얻게 되면 첫 번째 오브젝트 위치와 두 번째 오브젝트의 위치를 교환하는 함수를 만들었습니다.  
   
위의 문제는 카드 교체가 순식간에 일어나게 됩니다.단순히 결과만 도출하는 게임이 재미없기 때문에, 이동할 때 사이 보간값을 프레임에 넣어서 애니메이션을 만들어 봅시다.  

```c#

  void swap(ref Block A, ref Block B ) 
    {
        //위치 바꾸기
        Vector3 tempPos = B.transform.position;
        // B.transform.position = A.transform.position;
        StartCoroutine(MoveBlock(B, A.transform.position));
        //A.transform.position = tempPos;
        StartCoroutine(MoveBlock(A, tempPos));
        
        ....
    }
    
    //블럭을 목표 지점으로 이동시킨다
    IEnumerator MoveBlock(Block block, Vector3 goal)
    {
        int Speed = 5;

        while(block.transform.position!=goal)
        {
            block.transform.position = Vector3.MoveTowards(block.transform.position, goal, Speed * Time.deltaTime);
            yield return new WaitForEndOfFrame();
        }

    }
출처: https://kyeoungju.tistory.com/86 [_:티스토리]



```




![블록 교체 애니메이션](https://github.com/kj1241/kj1241.github.io/assets/22047442/71dff06b-6a03-49ec-b77c-26e309e26a83){: width="740" height="250"}


Vector3.MoveTowards() 함수를 사용하여 프레임마다 보간값을 만들어 줌으로 코루틴을 이용하여 카드 이동 애니메이션을 만들 수 있었습니다.
 
재미있는 점은 여기에 두 가지 문제가 있습니다.

1. 먼 거리에 있는 오브젝트도 교환할 수 있기 때문에 게임이 너무 쉬워져서 재미가 없습니다.
2. 랜더링 순서를 고려하지 않았기 때문에 랜더링 최적화를 위해서 오클러스 컬링이 적용되어 있기 때문에, 이동되는 카드보다 멈춰있는 카드가 위로 랜더링 되어 있습니다.  
따라서 z 깊이 버퍼를 앞으로 잡아줘야 이동대는 카드가 멈춰있는 카드보다 위로 렌더링 될 수 있습니다.

 
1번의 강력한 단점을 보안하기 위해서 제한을 만들기 위해, 뼈대에 살을 좀 더 붙여 보도록 하겠습니다.

```c#
bool isMouseButton = false;

void Update()
    {
        if (Input.GetMouseButtonDown(0)&& !isMouseButton)
        {
            //마우스 클릭한 좌표값 가져오기
            Vector3 pos = Camera.main.ScreenToWorldPoint(Input.mousePosition);
            pos += offset;
            pos += new Vector3(0.5f, 0.5f, 0);

            int _selectCurrentCol= -1;
            int _selectCurrentRow= -1;

            _selectCurrentCol = (int)pos.x / 1;
            _selectCurrentRow = (int)pos.y / 1;
           
            firstSelectdBlock = Grid[_selectCurrentCol, _selectCurrentRow];
            firstSelectdBlock.transform.localScale += new Vector3(0.5f, 0.5f, 0.5f);

            isMouseButton = true;
            //else
            //{
            //    secondSelectedBlock = Grid[_selectCurrentCol, _selectCurrentRow];
            //    secondSelectedBlock.transform.localScale += new Vector3(0.5f, 0.5f, 0.5f);

            //    swap(ref firstSelectdBlock, ref secondSelectedBlock);
            //}
        }
        //마우스를 누르고 있을때
        if (Input.GetMouseButton(0) && isMouseButton)
        {
            //마우스 위치를 추적한다
            Vector3 pos = Camera.main.ScreenToWorldPoint(Input.mousePosition);
            pos += offset;
            pos += new Vector3(0.5f, 0.5f, 0);

            int _selectCurrentCol = -1;
            int _selectCurrentRow = -1;

            _selectCurrentCol = (int)pos.x / 1;
            _selectCurrentRow = (int)pos.y / 1;

            //영역밖으로 벗어났다면
            if(_selectCurrentCol>=6|| _selectCurrentCol<0|| _selectCurrentRow>=7|| _selectCurrentRow<0)
            {
                firstSelectdBlock.transform.localScale -= new Vector3(0.5f, 0.5f, 0.5f);
                firstSelectdBlock = null;
                isMouseButton = false;
                return;
            }

            //마우스가 현재 영역에서 벗어났다면
            if (firstSelectdBlock.Col != _selectCurrentCol || firstSelectdBlock.Row != _selectCurrentRow)
            {

                //가로를 일딴 우선 검사하자
                if (firstSelectdBlock.Col != _selectCurrentCol)
                {
                    swap( firstSelectdBlock,  Grid[_selectCurrentCol, firstSelectdBlock.Row]);
                    return;
                }
                else
                {
                    swap( firstSelectdBlock,  Grid[firstSelectdBlock.Col, _selectCurrentRow]);
                    return;
                }
            }
        }
        if (Input.GetMouseButtonUp(0) && isMouseButton)
        {
            firstSelectdBlock.transform.localScale -= new Vector3(0.5f, 0.5f, 0.5f);
            firstSelectdBlock = null;
            isMouseButton = false;
        }
    }
    ...
    
    void swap( Block A,  Block B ) 
    {
        B.transform.localScale += new Vector3(0.5f, 0.5f, 0.5f);

        //위치 바꾸기
        Vector3 tempPos = B.transform.position;
        //B.transform.position = A.transform.position;
        StartCoroutine(MoveBlock(B, A.transform.position));
        //A.transform.position = tempPos;
        StartCoroutine(MoveBlock(A, tempPos));

        //위치 번호 바꾸기
        int tempCol = B.Col;
        int tempRow = B.Row;
        Block tempBlock = B;

        Grid[B.Col, B.Row] = A;
        Grid[A.Col, A.Row] = tempBlock;

        B.Col = A.Col;
        B.Row = A.Row;

        A.Col = tempCol;
        A.Row = tempRow;

        A.transform.localScale -= new Vector3(0.5f, 0.5f, 0.5f);
        B.transform.localScale -= new Vector3(0.5f, 0.5f, 0.5f);

        firstSelectdBlock = null;
        //secondSelectedBlock = null;
        isMouseButton = false;
    }
```

![드래그시 교체](https://github.com/kj1241/kj1241.github.io/assets/22047442/28cd8be6-2656-41e9-9b2b-82393ecf5be8){: width="740" height="250"}


위의 먼 거리에 있는 오브젝트 교환을 막고자 코드를 작성하게 되었습니다.
마우스를 누르는 순간 블록 오브젝트가 선택되고 그 후부터 드래그하고 있을 시 마우스 위치를 추적하게 됩니다.해야 영역 밖으로 나가는 순간 마우스의 위치를 판별하여 위치에 있는 오브젝트와 교체가 일어나도록 설계하였습니다.


![현재까지요약](https://github.com/kj1241/kj1241.github.io/assets/22047442/8bd6e4f5-2f16-4576-98bb-7c405673984e){: width="740" height="200"}



