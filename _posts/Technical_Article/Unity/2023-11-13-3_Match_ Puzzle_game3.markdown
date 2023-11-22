---
layout: post
title:  "3-Match Puzzle game 만들기 3 블록 탐색 및 삭제"
date:   2023-11-13 20:09:00 +0900
image: https://github.com/kj1241/kj1241.github.io/assets/22047442/2e8397ce-1a69-4189-be7b-cf513e6b903a
toc: true
categories: [Unity]
tags: [C#, Unity, Puzzle, 3 Match Game]
---

<br>
<h2><green1_h2> 4. 3-Match Game의 블록 탐색 및 삭제 </green1_h2></h2>


저희는 앞서 사용자 입력 및 블록 이동까지, 생각을 로직화 하는 방법으로 코드를 작성하고 있습니다.  
인터넷에 3-Match game 최적화된 알고리즘이 많이 존재하지만 신경 쓰지 않고 논리로 풀어 보겠습니다.그럼 이제 블록 탐색 및 삭제에 관해서 생각해 봅시다.  
"어떻게 블록을 지울 것인가?"   

1. 블록들이 정의되어 있는 그리드 매니저를 통해서 블록을 지운다.  
2. 캡슐화를 위해 블록 클래스에서 자체적으로 지우는 함수를 작성한다.  

   
![코루틴의효율](https://github.com/kj1241/kj1241.github.io/assets/22047442/acc081d7-770b-4dc1-8c62-611aa0da0683){: width="740" height="250"}


어떠한 방법을 이용해도 논리로 풀어나가면 코드를 동작시킬 수 있습니다.결론적으로는 1번 방법을 사용해서 블록을 지울 것이지만, 2번 방법으로 코드를 작성할 수 있다는 것을 보여드리겠습니다.  
 
일단 기본적으로 블록파괴에 로직에 대해서 생각을 해봅시다.3개의 연속된 블록을 탐색으로 찾은 후 블록을 파괴할 것입니다.그럼 이 로직에 문제가 있습니다. 블록들이 랜덤으로 생성되기 때문에 초기화때 4~7개 이런 블록들이 검출되면 삭제하면서 검출할 수 없습니다그렇기 때문에 삭제를 유예해야합니다.유예하는 방법은 두 가지가 있습니다.

리스트, 해쉬테이블 같은 임시 STL 컨테이너를 만들어서 삭제 유예된 블록을 저장해 놓습니다.그 후 한 번에 블록들을 삭제합니다.
코루틴을 사용하여 삭제하는 로직을 지연시킵니다.

 


블록의 이동을 애니메이션으로 보여주기 위해서는 언제나 일정 시간이 보장되어야 합니다.동기화 식으로 로직을 작성하게 된다면 생각보다 긴 시간을 기다려야 하므로, 위와 같이 코루틴을 사용해서 비동기적으로 코드를 작성할 것입니다.물론 하드웨어 성능에 따라 코루틴을 사용하는 것이 더 안 좋은 영향을 끼칠 수 있다는 건 분명한 사실입니다.원래대로 하면 PIX나 유니티 프로파일링을 통해서 확인해 봐야 하는 상황인 건 맞습니다. 하지만 버택스 (6*7*4) 168개와 드로우콜 84개를 사용하는 프로그램 상 크게 하드웨어는 크게 영향을 미치지 않을 것입니다.
 
그럼 블록 클래스에서 블록을 자체적으로 파괴하는 함수를 작성해 보겠습니다.
```c#
public class Block : MonoBehaviour
{
    ...
    public void DestoryBlock()
    {
        StartCoroutine(DestoryBlockCorutine());
    }

    IEnumerator DestoryBlockCorutine()
    {
        yield return new WaitForEndOfFrame();
        if(this.gameObject)
            Destroy(this.gameObject);
    }
}
```
유니티 엔진 구조를 확인해 보시면, Destory가 불린다고 바로 파괴되지는 않습니다.하지만 로직이 진행되는 과정이랑 파괴되는 과정을 확인할 수 없음으로 최소한의 1프레임을 확보하기 위해서 코루틴으로 작성하였습니다.
 
그럼 이제 3개의 연속되는 블록을 탐색하는 방법에 대해서 이야기해 봅시다.
![블록탐색png](https://github.com/kj1241/kj1241.github.io/assets/22047442/bd569631-923e-4a7d-a9e0-9f9adb509f82){: width="740" height="250"}



```c#
for (int i = 0; i < col - 2; ++i) //가로 검출
    for (int j = 0; j < row; ++j)
    {
        if (Grid[i, j].BlockColor == Grid[i + 1, j].BlockColor && Grid[i, j].BlockColor == Grid[i + 2, j].BlockColor)
        {
            Grid[i, j].DestoryBlock();
            Grid[i + 1, j].DestoryBlock();
            Grid[i + 2, j].DestoryBlock();

        }
    }

for (int i = 0; i < col; ++i) //세로 검출
    for (int j = 0; j < row - 2; ++j)
    {
        if (Grid[i, j].BlockColor == Grid[i, j + 1].BlockColor && Grid[i, j].BlockColor == Grid[i, j + 2].BlockColor)
        {
            Grid[i, j].DestoryBlock();
            Grid[i, j + 1].DestoryBlock();
            Grid[i, j + 2].DestoryBlock();
        }
    }
```

이제 위의 그림의 논리를 로직 코드로 변경하면 됩니다.저희에게는 Grid라는 만능열쇠가 있기 때문에 Grid를 탐색하면서 3개의 동일한 블록이 있는지 확인하고 파괴해 주시면 됩니다.
 
위의 코드를 사용해서 프로그램을 동작시켜도 문제없이 돌아갈 겁니다.여기서 주목해야 하는 점은 Gird를 탐색하는 목적도 동일하고 비슷한 크기의 For문을 사용하고 있습니다.Effect C++에 의하면 이런 동일한 For문을 한 개로 최적화할 수 있습니다.

```c#
public class GridManager : MonoBehaviour
{
	void Start()
    {
        ...
        DeleteCheckAllBlock();
    }
    
     void DeleteCheckAllBlock()
    {
        for (int i = 0; i < col; ++i)
        {
            for (int j = 0; j < row; ++j)
            {
                if (i < col - 2&&Grid[i, j].BlockColor == Grid[i + 1, j].BlockColor && Grid[i, j].BlockColor == Grid[i + 2, j].BlockColor )
                {
                    Grid[i, j].DestoryBlock();
                    Grid[i + 1, j].DestoryBlock();
                    Grid[i + 2, j].DestoryBlock();
                }
                if (j < row - 2&&Grid[i, j].BlockColor == Grid[i, j + 1].BlockColor && Grid[i, j].BlockColor == Grid[i, j + 2].BlockColor )
                {
                    Grid[i, j].DestoryBlock();
                    Grid[i, j + 1].DestoryBlock();
                    Grid[i, j + 2].DestoryBlock();
                }
            }
        }
    }
}
```
![초기화_삭제](https://github.com/kj1241/kj1241.github.io/assets/22047442/5388bba7-3193-4771-b3aa-d1dee9d8d517){: width="740" height="250"}

최적화하기 전의 로직과 아래 로직은 똑같이 시간 복잡도는 O( n^2 )입니다.그러나 실질적으로 블록 메모리 주소에 접근하는 횟수가 약 2배 정도 적음으로 속도를 매우 단축시킬 수 있습니다.
 
지금까지 초기화 시 연속된 3개의 동일한 블록을 탐색하는 방법에 대해서 살펴봤습니다.그럼 이제 블록을 움직였을 때, 블록을 탐색하는 방법에 대해서 살펴봐야 합니다.물론 이동시키고 위의 코드로 연속 매칭된 블록이 있는지 확인하는 코드를 작성하셔도 됩니다.하지만 좀 더 최적화를 생각해 봅시다.
앞서 저희는 초기화 상태에서 3개의 연속된 같은 색의 블록을 전부 지웠습니다.따라서 이동 전에는 3개의 연속된 같은 색의 블록이 존재하지 않습니다.그럼 저희는 가로 3가지 세로 3가지 6가지 케이스만 생각하면 됩니다.



![탐색](https://github.com/kj1241/kj1241.github.io/assets/22047442/02db35da-0fa5-45c5-8bb8-4c55092d63c6){: width="740" height="250"}

```c#
public class GridManager : MonoBehaviour
{
    ...
    //A와 B를 스왑
    void swap( Block A,  Block B ) 
    {
        ...
        DeleteCheckMoveBlock(A.Col, A.Row);
        DeleteCheckMoveBlock(B.Col, B.Row);
    }
    
    IEnumerator MoveBlock(Block block, Vector3 goal)
    {
        int Speed = 5;

        while(block!=null && block.transform.position!=goal)
        {
            block.transform.position = Vector3.MoveTowards(block.transform.position, goal, Speed * Time.deltaTime);
            yield return new WaitForEndOfFrame();
        }

    }    
    
    void DeleteCheckMoveBlock(int i, int j)
    {
        if (i > 1 && (Grid[i, j].BlockColor == Grid[i - 2, j].BlockColor && Grid[i, j].BlockColor == Grid[i - 1, j].BlockColor))
        {
            Grid[i - 2, j].DestoryBlock();
            Grid[i - 1, j].DestoryBlock();
            Grid[i, j].DestoryBlock();
        }
        if ((i > 0 && i < col - 1) && (Grid[i, j].BlockColor == Grid[i - 1, j].BlockColor && Grid[i, j].BlockColor == Grid[i + 1, j].BlockColor))
        {
            Grid[i - 1, j].DestoryBlock();
            Grid[i, j].DestoryBlock();
            Grid[i + 1, j].DestoryBlock();
        }
        if (i < col - 2 && (Grid[i, j].BlockColor == Grid[i + 1, j].BlockColor && Grid[i, j].BlockColor == Grid[i + 2, j].BlockColor))
        {
            Grid[i, j].DestoryBlock();
            Grid[i + 1, j].DestoryBlock();
            Grid[i + 2, j].DestoryBlock();
        }
        if (j > 1 && (Grid[i, j].BlockColor == Grid[i, j - 2].BlockColor && Grid[i, j].BlockColor == Grid[i, j - 1].BlockColor))
        {
            Grid[i, j - 2].DestoryBlock();
            Grid[i, j - 1].DestoryBlock();
            Grid[i, j].DestoryBlock();
        }
        if ((j > 0 && j < row - 1) && (Grid[i, j].BlockColor == Grid[i, j - 1].BlockColor && Grid[i, j].BlockColor == Grid[i, j + 1].BlockColor))
        {
            Grid[i, j - 1].DestoryBlock();
            Grid[i, j].DestoryBlock();
            Grid[i, j + 1].DestoryBlock();
        }
        if (j < row - 2 && (Grid[i, j].BlockColor == Grid[i, j + 1].BlockColor && Grid[i, j].BlockColor == Grid[i, j + 2].BlockColor))
        {
            Grid[i, j].DestoryBlock();
            Grid[i, j + 1].DestoryBlock();
            Grid[i, j + 2].DestoryBlock();
        }
    }
 }
```
![이동_삭제](https://github.com/kj1241/kj1241.github.io/assets/22047442/c9952112-c1c4-4175-87f4-21c2e15b3883){: width="740" height="250"}

IEnumerator MoveBlock 블록을 이동시키는 코루틴에서 블록이 존재할 때만 움직일 수 있도록 예외 처리를 했습니다.이는"애니메이션으로 움직이는 프레임> 로직 계산 + 1프레임 이후 오브젝트 삭제"라서 오브젝트가 존재하지 않는데도 오브젝트를 움직이게 하려고 하기 때문에 발생하는 에러입니다.실행 결과에서도 삭제와 블록 애니메이션 이동이 거의 동시에 일어나는 것을 확인하실 수 있습니다.
 
![요약](https://github.com/kj1241/kj1241.github.io/assets/22047442/2e8397ce-1a69-4189-be7b-cf513e6b903a){: width="740" height="200"}
