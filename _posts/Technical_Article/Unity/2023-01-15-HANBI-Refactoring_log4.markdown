---
layout: post
title:  "하나비 프로젝트 - 리듬 게임 개발 로그 4 점수 판정 로직 설계 및 구현"
date: 2023-01-15 16:25:33 +0900
image: https://drive.google.com/uc?export=view&id=18wxwskWh3qPBLEq9KZYqXFzDlb3wwJyl
toc: true
categories: [Unity]
tags: [C#, Unity, Rhythm Game]
addsence: true
excerpt: Unity 및 C#로 개발한 리듬게임 '하나비 프로젝트'의 로그입니다. 점수 판정 로직 설계와 당시 리듬게임 제작하기 위해서 고민했던 부분을 공유하고 있습니다.
---

## <green1_h2>3. 판정 로직의 설계 및 구현 </green1_h2>

![세부 단계3](https://drive.google.com/uc?export=view&id=18wxwskWh3qPBLEq9KZYqXFzDlb3wwJyl){: width="100%" }

리듬게임은 리듬에 맞춰 플레이어가 키를 입력하는 동안 전유의 감정을 경험하게 합니다.  
게임은 키 입력 판정과 함께 렌더링 처리를 통해 사용자에게 강렬한 시각적 피드백을 제공하여, 음악과 상호작용하는 독특한 체험을 선사합니다.  
이 글에서는 키 입력과 렌더링이 어떻게 구현되고, 이로써 어떻게 플레이어의 감정을 공감시키는지 알아보겠습니다.

<br>

### <green1_h3>1) 판정 로직의 설계 </green1_h3>

리듬게임의 판정 로직에서 노드 판정의 상태는 보통 다음과 같이 정의됩니다.

```

perfect
sw.ElapsedMilliseconds >= distance * 1000 - (100 / NodeSpeed) && sw.ElapsedMilliseconds < distance * 1000 + (100 / NodeSpeed)
→ 1225<=sw.ElapsedMilliseconds<1275
Good:
((sw.ElapsedMilliseconds >= distance * 1000 - (250 / NodeSpeed) && sw.ElapsedMilliseconds < distance * 1000 - (100 / NodeSpeed)) || (sw.ElapsedMilliseconds >= distance * 1000 + (100 / NodeSpeed) && sw.ElapsedMilliseconds < distance * 1000 + (250 / NodeSpeed))
→1187.5<=sw.ElapsedMilliseconds<1225 || 1275<= sw.ElapsedMilliseconds < 1312.5
Bad:
((sw.ElapsedMilliseconds >= distance * 1000 - (400 / NodeSpeed) && sw.ElapsedMilliseconds < distance * 1000 - (250 / NodeSpeed)) || (sw.ElapsedMilliseconds >= distance * 1000 + (250 / NodeSpeed) && sw.ElapsedMilliseconds < distance * 1000 + (400 / NodeSpeed))
→1150<=sw.ElapsedMilliseconds<1187.5 || 1312.5<= sw.ElapsedMilliseconds<1350
Miss:
노드가 끝까지 올라갔을 경우

```

1. Perfect (퍼펙트)
    - 사용자 입력이 노드의 정확한 타이밍과 일치함.
    - 최고 판정 등급으로, 정확한 시간에 입력했을 경우 적용.

2. Good (굿)
    - 사용자 입력이 노드의 일정 범위 내에 포함되지만 완벽하지 않음.
    - 정확한 시간에 근접했으나 완벽하지 않은 경우에 적용.

3. Bad (배드)
    - 사용자 입력이 노드의 판정 범위를 벗어남.
    - 타이밍이 크게 벗어났거나, 일정 정도의 오차가 발생한 경우에 해당.

4. Miss (미스)
    - 사용자 입력이 노드와 전혀 일치하지 않음.
    - 입력이 노드의 타이밍과 상당히 멀리 떨어진 경우에 해당.

이러한 판정 상태는 사용자의 입력이 리듬노트와 얼마나 일치하는지에 따라 결정되며, 게임의 난이도와 사용자 경험을 조절하는 중요한 부분입니다.  
판정 상태에 따라 게임에서의 스코어나 플레이어의 진행 상태를 조절할 수 있습니다.

<br>

### <green1_h3>2) 판정 로직의 구현 </green1_h3>

리듬게임에서의 키 입력 판정 및 렌더링 처리는 다음과 같습니다

```c#

    IEnumerator NodePerfectZone()
    {
        sw.Start();  // 스탑원치 시작 
        while (true)
        {
            if (!gameObject|| sw.ElapsedMilliseconds > 8000 / NodeSpeed) //while 문 탈출 조건
                break;

            if (this.gameObject.transform.position.y < 0.5 && this.gameObject.transform.position.y > -0.5) // 노드가 판정 라인에 올라왔는지 확인
            {
                if (Input.GetKeyDown(nodekey)) //키를 입력 받았는지 확인 
                {
                    if (!SingletonManager.GetInstance().isAtteckButtonOn) //공격 에니메이션이 꺼저있다면 
                        SingletonManager.GetInstance().isAtteckButtonOn = true; //실행하게 만들어줌

                    //판정 기준 (유니티는 DirectX와 다르게 일정한 프레임을 만들수 없음으로 정확한 시간에 따라서 판정을 함)
                    if (sw.ElapsedMilliseconds >= distance * 1000 - (100 / NodeSpeed) && sw.ElapsedMilliseconds < distance * 1000 + (100 / NodeSpeed)) 
                    {   //퍼펙트일 경우
                        Instantiate(EffectParticle[0], vec, Quaternion.identity); //퍼펙트 노드 터지는 이펙트 생성
                        SingletonManager.GetInstance().SetJudgmentPerfect(); // 판정을 퍼펙트로 전환
                        SingletonManager.GetInstance().ComboJudgmentExecution();//콤보 판정 실행 
                        sw.Stop(); //스탑워치 종료  
                        Destroy(this.gameObject); // 이 노드 게임 오브젝트를 파괴                 
                        yield break; //코루틴을 바로 종료시킨다
                    }
                    else if ((sw.ElapsedMilliseconds >= distance * 1000 - (250 / NodeSpeed) && sw.ElapsedMilliseconds < distance * 1000 - (100 / NodeSpeed)) || (sw.ElapsedMilliseconds >= distance * 1000 + (100 / NodeSpeed) && sw.ElapsedMilliseconds < distance * 1000 + (250 / NodeSpeed)))
                    {   //좋음일 경우
                        Instantiate(EffectParticle[1], vec, Quaternion.identity); //좋음 노드 터지는 이펙트 생성
                        SingletonManager.GetInstance().SetJudgmentGood(); // 판정을 좋음으로 전환
                        SingletonManager.GetInstance().ComboJudgmentExecution();//콤보 판정 실행 
                        sw.Stop(); //스탑워치 종료 
                        Destroy(this.gameObject); // 이 노드 게임 오브젝트를 파괴  
                        yield break; //코루틴을 바로 종료시킨다
                    }
                    else if ((sw.ElapsedMilliseconds >= distance * 1000 - (400 / NodeSpeed) && sw.ElapsedMilliseconds < distance * 1000 - (250 / NodeSpeed)) || (sw.ElapsedMilliseconds >= distance * 1000 + (250 / NodeSpeed) && sw.ElapsedMilliseconds < distance * 1000 + (400 / NodeSpeed)))
                    {   //나쁨일 경우
                        Instantiate(EffectParticle[2], vec, Quaternion.identity); // 나쁨 노드 터지는 이펙트 생성
                        SingletonManager.GetInstance().SetJudgmentBad(); // 판정을 나쁨 전환
                        SingletonManager.GetInstance().ComboJudgmentExecution();//콤보 판정 실행 
                        sw.Stop(); //스탑워치 종료 
                        Destroy(this.gameObject); // 이 노드 게임 오브젝트를 파괴  
                        yield break; //코루틴을 바로 종료시킨다
                    }
                    else
                    {   //실패일 경우
                        Instantiate(EffectParticle[3], vec, Quaternion.identity); // 실패 노드 터지는 이펙트 생성
                        SingletonManager.GetInstance().SetJudgmentMiss(); // 판정을 실패로 전환
                        SingletonManager.GetInstance().ComboJudgmentExecution();//콤보 판정 실행                                                      
                        break; //실패했을 경우 기회를 여러 번 줄것인가 고민했으나 게임이 쉬워질 수 있음으로 
                    }
                }
            }
            yield return null; //유니티 엔진 순서 Update -> null -> LateUpdate 
        }
        
        if (this.gameObject) //게임오브젝트가 만약에 파괴되지 않고 살아 있다면
        {
            Instantiate(EffectParticle[3], vec, Quaternion.identity);
            SingletonManager.GetInstance().ComboJudgmentFail();
            sw.Stop(); //스탑워치 종료
            Destroy(this.gameObject); // 이 노드 게임 오브젝트를 파괴 
        }

    }

```


1. 키 입력 판정
    - 키 입력을 감지하고, 현재 노트의 타이밍과 비교하여 판정 상태를 결정합니다.
    - 퍼펙트, 굿, 배드, 미스 등의 상태로 구분하며, 각각의 판정에 따라 플레이어에게 점수를 부여할 수 있습니다.

2. 렌더링 처리
    - 판정 상태에 따라 화면에 적절한 피드백(점수)을 제공합니다.
    - 판정 상태에 따라서 노드 판정의 상태를 파티클로 표현하고 사용자에게 전달하고 있습니다.

이러한 처리를 통해 사용자는 자신의 입력이 얼마나 정확한지를 시각적으로 확인할 수 있으며, 게임 경험이 풍부해집니다.

<br>
<br>

## <green1_h2>4. 추가 코드 개선 사항 및 고민 사항 </green1_h2>

처음 게임잼에서 고민했던 로직은 코루틴 안에서 키 입력과 랜더링과 함수를 전부 처리하는 코드 로직이 아니었습니다.  
  
당시 고민했던 로직을 설명하기 전에 프레임부터 이야기를 하겠습니다.  
DX로 코드를 작성하게 되면 매우 복잡한 일이지만 가장 좋은 점은 유연한 프레임 관리입니다.  
저수준 API까지 원하는 프레임에 유연하게 코드를 작성할 수 있기 때문입니다.  
  
하지만 엔진을 사용하게 되면 우리가 가장 직면해야 하는 문제가 프레임입니다.  
엔젠 자체도 무겁지만 엔진에 사용된 알 수 없는 에셋들과 관리되지 않는 드로우 콜과 텍스쳐 로딩 이런 것들이 많아지게 되면, 엔진에서 고정 프레임을 선언하였지만, 자동적으로 프레임이 떨어질 수밖에 없습니다.  
  
그러면 이때부터 갖은 꼼수들을 동원하게 됩니다.  
특정한 너무 큰 로딩은 2 프레임에 걸쳐서 로딩할 수 있게 만들거나, 특정하게 오래 걸릴 거 같은 계산도 computer shader를 통해 GPU로 넘겨버립니다.  
  
엔진을 사용하는 거대한 프로젝트에서는 리듬게임의 속도 중요성에서 '입력 + 1 프레임 > 출력'을 항상 보장하기 어려웠습니다.  
리듬게임에서는 노래와 렌더링 처리 시간이 미묘하게 다르기 마련이었습니다.  
따라서 '눈으로 처리되는 렌더링을 우선적으로 판정하는 로직을 작성할 것인가?' 아니면 '랜더링이 약간 지연되더라도 노래와 타이밍을 맞춰 처리하는 로직을 작성할 것인지?'에 대한 고민 끝에 노래에 맞춰 처리하는 것이 중요하다고 판단했습니다.  
  
자연스럽게 코드의 흐름은 렌더링이 지연되더라도 처리할 수 있는 방향으로 나아갔습니다.  
이로 인해 컴퓨터 시간을 활용하자는 결론에 도달했습니다.  
렌더링이 지연되더라도 노래가 흐르는 동안 메인 스레드에서 렌더링 지연이 발생한다고 간주했습니다.  
서브 스레드가 입력 이벤트를 감시하면 발생한 입력 이벤트를 밀리초 단위로 기록할 수 있습니다.  
이 기록이 완료되면 다음 렌더링 프레임에서 판정 로직이나 렌더링 처리를 완료하면 된다고 판단했습니다.

하지만 게임잼 당시 비슷하게 스레드를 이용해서 로직을 작성했을 때는 에러에서 벗어나질 못해서 프로젝트 완성을 위해 위 로직으로 작성을 하였습니다.  

코드를 작성하며 생긴 고민에 대해 답하면서, 유사한 로직을 DX 프로그래밍할 때 경험이 있었고, 이와 유사한 방식은 유니티 서버-클라이언트 코드를 작성할 때도 사용되어 왔다고 판단했습니다.  
그러나 게임잼 기간 동안 지속적인 작업으로 인해 피로한 상태에서는 로직의 오류를 처리하지 못할 수 있다고 생각했습니다.  

그런데 집에서 푹 쉬고 난 후에 다시 고민해본 결과, 유니티 엔진 코드는 모두 메인 스레드에서만 실행되며, 간단한 계산만 서브 스레드로 넘겨줄 수 있다는 사실을 깨달았습니다.  
이것은 유니티가 멀티 플랫폼 지원을 위해 메인 스레드에서만 작동하도록 설계되었기 때문입니다.

'이 로직은 사용 못하는가?' 윈도우 한정으로 쉽게 프로그래밍하는 방법이 있습니다.  
그러면 위의 판정 + 렌더링 방법 말고 다른 로직을 설명하겠습니다.  
  
윈도우 OS는 하드웨어 키보드의 키값을 직접 받아올 수 있는 GetAsyncKeyState() 함수가 있습니다.  
이 함수는 메크로 제작과 같은 용도로 사용되며, DX에서는 keyDown, keyUp 함수를 구현하는 데 활용할 수 있을 정도로 강력한 기능을 제공합니다.  
이 함수를 통해 키보드의 키값을 메시지 큐를 거치지 않고 직접 표현할 수 있게 됩니다.  

```c#

using System.Windows.Input;
using System.Runtime.InteropServices; //dll 불러오기

public class PrefabNodes : MonoBehaviour
{
    [DllImport("User32.dll")] //dll 가저오자
    public static extern bool GetAsyncKeyState(int ArrowKeys); //선언부분
    ...
}

``` 

User32.dll에 존재하는 GetAsyncKeyState C++ 코드를 DLL을 이용하여 C# 코드로 불러와주는 작업을 수행합니다.  
그리고 랜더링을 처리하는 메인 스레드와 키 입력 값을 받을 서브 스레드가 모두 사용할 수 있는 버퍼를 만들어 동적으로 할당하고 힙에 올립니다.  

```c#

    struct InputBackGroundThreadBuffer
    {
        public int timeCount; //시간 코드
        public int keyCode; //코드
        public bool isKeyDown; // 키가 눌렸는지 확인
        public bool isDestory; // 서브 쓰래드가 파괴욌는지 확인
    }
    InputBackGroundThreadBuffer buffer
    
    ...
    
    void start()
    {
        buffer = new InputBackGroundThreadBuffer();
        buffer.timeCount= 0;
        buffer.isKeyDown = false;
        buffer.isDestory = false;
        
        swtich(nodekey)
        {
          case "d":
                buffer.keyCode = 0x44;
                break;
            case "f":
                buffer.keyCode = 0x46;
                break;
            case "space":
                buffer.keyCode = 0x20;
                break;
            case "j":
                buffer.keyCode = 0x4A;
                break;
            case "k":
                buffer.keyCode = 0x4B;
                break;
        
        }
        
        ...
    }
    
    ...

```

람다식을 활용하여 C#에서 스레드를 생성하고, 동작 코드를 채워줍니다.

```c#

using System.Threading;

public class PrefabNodes : MonoBehaviour
{
    ...
    Thread inputBackGroundThread;
    
    void start()
    {
        ...
        inputBackGroundThread = new Thread(() => InputBackGroundThread(ref buffer, ref sw));
        inputBackGroundThread.IsBackground = true;
        inputBackGroundThread.Start();
        ...    
    }
    
    ....
    
    void InputBackGroundThread(ref InputBackGroundThreadBuffer buffer, ref Stopwatch sw)
    {
        while (!buffer.isDestory) //무한루프 방지
        {
            if (sw.IsRunning && sw.ElapsedMilliseconds >= 1150 && sw.IsRunning && sw.ElapsedMilliseconds < 1350) //다른 노드들과 겹치지 않게
                if (GetAsyncKeyState(buffer.keyCode)) //키보드가 눌렀다면
                {
                    buffer.isKeyDown = true;
                    buffer.timeCount = sw.ElapsedMilliseconds;
                }
            Thread.Sleep(30); //메인 랜더링을 처리할 수 있도록 메인 쓰레드에게 제어권을 넘겨줌
        }
    }
}

```

keyDown flag 값이 변하면 메인 스레드의 코루틴에서 랜더링 판정 및 랜더링 로직을 처리합니다.

```c#

    IEnumerator NodePerfectZone()
    {
        sw.Start();  // 스탑원치 시작 
        while (true)
        {
            if (!gameObject|| sw.ElapsedMilliseconds > 8000 / NodeSpeed) //while 문 탈출 조건
                break;

            if (this.gameObject.transform.position.y < 0.5 && this.gameObject.transform.position.y > -0.5) // 노드가 판정 라인에 올라왔는지 확인
            {
                if (buffer.isKeyDown) //키를 입력 받았는지 확인 
                {
                    if (!SingletonManager.GetInstance().isAtteckButtonOn) //공격 에니메이션이 꺼저있다면 
                        SingletonManager.GetInstance().isAtteckButtonOn = true; //실행하게 만들어줌

                    if (buffer.timeCount >= 1225 && buffer.timeCount < 1275) 
                    {   //퍼펙트일 경우
                        Instantiate(EffectParticle[0], vec, Quaternion.identity); //퍼펙트 노드 터지는 이펙트 생성
                        SingletonManager.GetInstance().SetJudgmentPerfect(); // 판정을 퍼펙트로 전환
                        SingletonManager.GetInstance().ComboJudgmentExecution();//콤보 판정 실행 
                        sw.Stop(); //스탑워치 종료  
                        Destroy(this.gameObject); // 이 노드 게임 오브젝트를 파괴                 
                        yield break; //코루틴을 바로 종료시킨다
                    }
                    else if ((buffer.timeCount >= 1187.5 && buffer.timeCount < 1225) || (buffer.timeCount >= 1275 && buffer.timeCount < 1312.5))
                    {   //좋음일 경우
                        Instantiate(EffectParticle[1], vec, Quaternion.identity); //좋음 노드 터지는 이펙트 생성
                        SingletonManager.GetInstance().SetJudgmentGood(); // 판정을 좋음으로 전환
                        SingletonManager.GetInstance().ComboJudgmentExecution();//콤보 판정 실행 
                        sw.Stop(); //스탑워치 종료 
                        Destroy(this.gameObject); // 이 노드 게임 오브젝트를 파괴  
                        yield break; //코루틴을 바로 종료시킨다
                    }
                    else if ((buffer.timeCount >= 1150 && buffer.timeCount < 1187.5) || (buffer.timeCount >= 1312.5 && buffer.timeCount < 1350))
                    {   //나쁨일 경우
                        Instantiate(EffectParticle[2], vec, Quaternion.identity); // 나쁨 노드 터지는 이펙트 생성
                        SingletonManager.GetInstance().SetJudgmentBad(); // 판정을 나쁨 전환
                        SingletonManager.GetInstance().ComboJudgmentExecution();//콤보 판정 실행 
                        sw.Stop(); //스탑워치 종료 
                        Destroy(this.gameObject); // 이 노드 게임 오브젝트를 파괴  
                        yield break; //코루틴을 바로 종료시킨다
                    }
                    else
                    {   //실패일 경우

                        debug.Log(sw.ElapsedMilliseconds + "M");

                        Instantiate(EffectParticle[3], vec, Quaternion.identity); // 실패 노드 터지는 이펙트 생성
                        SingletonManager.GetInstance().SetJudgmentMiss(); // 판정을 실패로 전환
                        SingletonManager.GetInstance().ComboJudgmentExecution();//콤보 판정 실행
                        break; //실패했을경우 기회를 더줄까 고민했으나 게임이 쉬워질수 있음으로 
                    }
                }
            }
            yield return null; //유니티 엔진 순서 Update -> null -> LateUpdate 
        }

```

'입력 + 1 프레임 > 출력'과 1 프레임이 짧을수록 메인 스레드(키 입력 + 판정 + 렌더링) 처리 로직과 서브 스레드(키 입력) + 메인 스레드(판정 + 렌더링) 로직의 동작은 유사해질 것입니다

<br>
<br>

## <green1_h2>5. 여담 </green1_h2>

복잡한 구조도 단순하게 쪼개면, 좀 더 간편하게 코드를 작성 할 수 있으실 것입니다.  
읽어 주셔서 감사합니다.  
