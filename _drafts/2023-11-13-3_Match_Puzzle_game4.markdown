---
layout: post
title:  "3-Match Puzzle game 만들기 4 블록 정렬 및 생성"
date:   2023-11-13 20:09:00 +0900
image: https://github.com/kj1241/kj1241.github.io/assets/22047442/2e8397ce-1a69-4189-be7b-cf513e6b903a
toc: true
categories: [Unity]
tags: [C#, Unity, Puzzle, 3 Match Game]
---



<br>
<h2><green1_h2> 5. 블록 정렬 및 생성 </green1_h2></h2>


저희는 앞서 블록 탐색 및 삭제까지, 생각을 로직화 하는 방법으로 코드를 작성하고 있습니다.  
그리드 매니저에서 블록을 지우는 것과 캡슐화를 생각해서 블록 오브젝트 내에서 블록을 지우는 방식을 고민하였습니다.  
오브젝트 삭제만 생각했을 경우에 객체의 특성과 캡슐화적 측면에서는 후자가 좋아 보이긴 합니다.하지만 블록 생성이 들어가면 조금 달라질 수 있음으로 로직을 생각해 봅시다.

```c#
for (int i = 0; i < col; ++i)
    for (int j = 0; j < row; ++j)
    {
        if (Grid[i, j] == null)
        {
            GameObject block = Instantiate(blockPrefab, new Vector3(i, j, 0) - offset, Quaternion.identity, blockParent.transform) as GameObject;
            Block blockScript = block.GetComponent<Block>();
            blockScript.BlockColor = (Random.Range(0, 5));
            blockScript.Col = i;
            blockScript.Row = j;

            Grid[i, j] = blockScript;
        }
    }
```


만약 오브젝트가 파괴돼서 없다면 Grid에서 확인하고 랜덤 한 블록 오브젝트를 생성하는 코드입니다.  
이 코드를 사용해서 위의 상황을 생각해 보도록 하겠습니다.  
블록 오브젝트가 파괴되어야 생성할 수 있습니다.이 말은 블록 오브젝트 파괴와 생성이 인과관계에 있다는 이야기입니다.  
다시 말해, 블록 오브젝트가 파괴되는 시점을 알아야 생성할 수 있습니다.  
하지만 블록 클래스에서 파괴되는 시점을 캡슐화했으므로 파괴되는 시점을 알 수 없습니다.그럼 이를 저희에게 이를 해결할 두 가지 방법이 있습니다.  

1. 블록 클래스가 파괴된 시점에서 bord에게 콜백으로 파괴되었다고 알려준다.  
2. bord 내부에서 프레임마다 Gird를 확인하면서 파괴됐는지 확인한다.  

 
1번 방법은 전역변수, 전역함수 또는 싱글톤으로 선언해서 특정 함수나 변수에 접근하여 값을 수정하면 됩니다.  
메모리의 데이터영역에 올라갔으므로 코드가 좀 더 보안적 영역으로 위험해졌습니다.  
```c#
    IEnumerator WaitBlock()
    {
        while(isEnptyCheck())
        {
             yield return new WaitForEndOfFrame(); //프레임마다 검사할 것임
        }
        
        for (int i = 0; i < col; ++i)
            for (int j = 0; j < row; ++j)
            {
                if (Grid[i, j] == null)
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
    
    bool isEnptyCheck()
    {
        foreach (Block b in Grid)
        {
            if (b == null)
                return false;
        }
        return true;
    }

```

![삭제후 생성](https://github.com/kj1241/kj1241.github.io/assets/22047442/d4adb6f4-15f5-4cf2-90c3-ed83d384f682)


대신 2번 방법은 프레임마다 Gird에서 파괴되어 null 바뀌었는지 확인해야 하는 코드입니다.  
보안적으로는 조금 더 좋을 수 있지만 프레임마다 로직을 돌리기에 오버헤드가 있습니다.
 
생각하는 대로 로직을 작성하고 동작시킬 수 있다는 것을 보여주기 위해서 블록 파괴를 캡슐화하여 코드를 작성하였습니다.하지만 블록을 객체 내부에서 삭제하지 않고 bord(GirdManager.cs)에서 블록을 삭제하면 크게 생각할 필요가 없습니다.
bool isBlcokDestroy = false;
```c#
...
void DeleteCheckAllBlock()
    {
        for (int i = 0; i < col; ++i)
        {
            for (int j = 0; j < row; ++j)
            {
                if (i < col - 2&&Grid[i, j].BlockColor == Grid[i + 1, j].BlockColor && Grid[i, j].BlockColor == Grid[i + 2, j].BlockColor )
                {
                    //Grid[i, j].DestoryBlock();
                    //Grid[i + 1, j].DestoryBlock();
                    //Grid[i + 2, j].DestoryBlock();
                    StartCoroutine(DeleteBlocks(Grid[i, j], Grid[i + 1, j], Grid[i +2 , j]));

                }
                if (j < row - 2&&Grid[i, j].BlockColor == Grid[i, j + 1].BlockColor && Grid[i, j].BlockColor == Grid[i, j + 2].BlockColor )
                {
                    //Grid[i, j].DestoryBlock();
                    //Grid[i, j + 1].DestoryBlock();
                    //Grid[i, j + 2].DestoryBlock();
                    StartCoroutine(DeleteBlocks(Grid[i, j], Grid[i, j+1], Grid[i , j+2]));
                }
            }
        }
        StartCoroutine(WaitBlock());
    }

    void DeleteCheckMoveBlock(int i, int j)
    {
        if (i > 1 && (Grid[i, j].BlockColor == Grid[i - 2, j].BlockColor && Grid[i, j].BlockColor == Grid[i - 1, j].BlockColor))
        {
            //Grid[i - 2, j].DestoryBlock();
            //Grid[i - 1, j].DestoryBlock();
            //Grid[i, j].DestoryBlock();
            StartCoroutine(DeleteBlocks(Grid[i - 2, j], Grid[i - 1, j], Grid[i, j]));
        }
        if ((i > 0 && i < col - 1) && (Grid[i, j].BlockColor == Grid[i - 1, j].BlockColor && Grid[i, j].BlockColor == Grid[i + 1, j].BlockColor))
        {
            //Grid[i - 1, j].DestoryBlock();
            //Grid[i, j].DestoryBlock();
            //Grid[i + 1, j].DestoryBlock();
            StartCoroutine(DeleteBlocks(Grid[i - 1, j], Grid[i, j], Grid[i+1, j]));
        }
        if (i < col - 2 && (Grid[i, j].BlockColor == Grid[i + 1, j].BlockColor && Grid[i, j].BlockColor == Grid[i + 2, j].BlockColor))
        {
            //Grid[i, j].DestoryBlock();
            //Grid[i + 1, j].DestoryBlock();
            //Grid[i + 2, j].DestoryBlock();
            StartCoroutine(DeleteBlocks(Grid[i, j], Grid[i+1, j], Grid[i + 2, j]));
        }

        if (j > 1 && (Grid[i, j].BlockColor == Grid[i, j - 2].BlockColor && Grid[i, j].BlockColor == Grid[i, j - 1].BlockColor))
        {
            //Grid[i, j - 2].DestoryBlock();
            //Grid[i, j - 1].DestoryBlock();
            //Grid[i, j].DestoryBlock();
            StartCoroutine(DeleteBlocks(Grid[i, j-2], Grid[i , j-1], Grid[i, j]));
        }
        if ((j > 0 && j < row - 1) && (Grid[i, j].BlockColor == Grid[i, j - 1].BlockColor && Grid[i, j].BlockColor == Grid[i, j + 1].BlockColor))
        {
            //Grid[i, j - 1].DestoryBlock();
            //Grid[i, j].DestoryBlock();
            //Grid[i, j + 1].DestoryBlock();
            StartCoroutine(DeleteBlocks(Grid[i, j-1], Grid[i, j], Grid[i, j+1]));
        }
        if (j < row - 2 && (Grid[i, j].BlockColor == Grid[i, j + 1].BlockColor && Grid[i, j].BlockColor == Grid[i, j + 2].BlockColor))
        {
            //Grid[i, j].DestoryBlock();
            //Grid[i, j + 1].DestoryBlock();
            //Grid[i, j + 2].DestoryBlock();
            StartCoroutine(DeleteBlocks(Grid[i, j ], Grid[i, j+1], Grid[i, j + 2]));
        }
    }
    IEnumerator WaitBlock()
    {
       
        while (isBlcokDestroy==false)
        {
           // Debug.Log(isBlcokDestroy);
            yield return new WaitForEndOfFrame(); //프레임마다 검사할꺼임
        }
        
        yield return new WaitForEndOfFrame(); // 일프레임 더 기다리는건 오브젝트가 삭제될때까지 기대려야함으로


        for (int i = 0; i < col; ++i)
            for (int j = 0; j < row; ++j)
            {
                if (Grid[i, j] == null)
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
     IEnumerator DeleteBlocks(Block b1, Block b2, Block b3 )
    {
        yield return new WaitForEndOfFrame();
        if (b1 != null)
        {
            Destroy(b1.gameObject);
        }
        if (b2 != null)
        {
            Destroy(b2.gameObject);
        }
        if (b3 != null)
        {
            Destroy(b3.gameObject);
        }
        isBlcokDestroy = true;
    }
```
![삭제후 생성2](https://github.com/kj1241/kj1241.github.io/assets/22047442/a0a1bf3b-7350-486f-96bd-8ef2be3594d6)


DeleteBlocks 코루틴에서  bord가  블록 오브젝트를 삭제할 수 있도록 코드를 작성하였습니다.유니티 엔진상 Destroy가 불림에도 바로 삭제 되는 것이 아님으로 WaitBlock 함수에서 1프레임 추가로 더 기다렸습니다.
 
이렇게 3연속 같은 색인 블록 오브젝트를 삭제한 후 바로 오브젝트 생성시켜도 되지만, 결국 부서진 부분을 제외하고 나머지 부분은 영향을 못 미침으로 게임이 단조로워질 것입니다.  
그렇기 때문에 오브젝트를 파괴하면 남아있는 오브젝트를 밑으로 내리는 정렬 아이디어를 작성하겠습니다.
![블록이동로직1](https://github.com/kj1241/kj1241.github.io/assets/22047442/b28675a5-1b32-4dac-a71c-341aebcf905d)
![블록이동로직2](https://github.com/kj1241/kj1241.github.io/assets/22047442/d2a39c35-9716-4dc0-93ed-588639120b4e)



Grid에서 임의의 세로축을 선택합니다.  
저희의 목적은 블록을 위에서 아래로 떨어지게 보여지게 하는 것입니다.  
빈칸을 찾기 위해 아래에서부터 비어있는 블록을 찾기 시작합니다.만약 빈칸을 찾았다면 rowCount라는 변수를 만들어서 j+1위 치에서부터 블록이 있는 위치까지 탐색한 후 블록을 이동시키면 됩니다.이런 행위를 반복하면 모든 오브젝트를 밑으로 낼 수 있습니다.

```c#

    void BlockDown()
    {
        for(int i=0; i<col;++i)
        {
            int rowCount = -1; //초기화
            for(int j=0; j<row;++j)
            {
                if (Grid[i, j] != null) // 블럭이 존재하면 넘어감
                    continue;

                //만약 초기화 상태이면
                if (rowCount == -1)
                    rowCount = j + 1;
                if (rowCount == row)
                    break;

                for(int k= rowCount;k<row; ++k)
                {
                    if(Grid[i,k]!=null) // 블록이 존재하면
                    {
                        StartCoroutine(MoveBlock(Grid[i, k], indexChangePos(i, j))); //움직이기 시작

                        //블록정보 갱신
                        Grid[i, k].col = i;
                        Grid[i, k].row = j;
                        Grid[i, j] = Grid[i, k];
                        Grid[i, k] = null;
                        rowCount = k +1;
                        break;
                    }
                }
            }
        }
    }
```

![매치 삭제후 이동](https://github.com/kj1241/kj1241.github.io/assets/22047442/1d5cb64d-892a-426d-9ce8-b4151e128ccc)
