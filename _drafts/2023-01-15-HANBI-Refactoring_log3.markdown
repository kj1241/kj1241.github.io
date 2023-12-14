---
layout: post
title:  "하나비 프로젝트) 리듬 게임 개발 로그 3 스파인 애니메이션 툴 이용"
date: 2023-01-15 16:25:33 +0900
image: https://drive.google.com/uc?export=view&id=1Rlq8GttXP_Nc6szIUhBCASzZajd8nxfY
toc: true
categories: [Unity]
tags: [C#, Unity, Puzzle, 3 Match Game]
addsence: true
excerpt: 
---

## <green1_h2>2. 스파인 애니메이션 툴을 이용한 설계 및 구현</green1_h2>

![세부 단계2](https://drive.google.com/uc?export=view&id=1Rlq8GttXP_Nc6szIUhBCASzZajd8nxfY){: width="100%" }

당시 게임잼에서 시간이 조금 많이 남았기 때문에 디자이너한테 다음 구현하고 싶은 목표가 무엇인지 이야기해서, 캐릭터 애니메이션을 추가 구현하게 되었습니다.  
'어떤 툴로 구현할 것인지?' 논의를 한 결과 스파인 툴을 쓰기로 했습니다.  
당시 유니티와 스파인 연동하는 예제도 도큐먼트 밖에는 없었고,  처음 연동 해보는 작업이라 코드자체가 회피용으로 지저분하게 적혀 있어서 리펙토링 하게 되었습니다.  

<br>

### <green1_h3>1) 스파인 애니메이션 package 설치 및 도큐먼트 리딩</green1_h3>

Esoteri Soft에서 제공하는 스파인 애니메이션 API를 사용하여 애니메이션 컨트롤을 하였습니다.  
(다운로드 주소는 밑에 있습니다.)  
제공되는 API 에니메이션은 DirectX에서 제공하는 Skinned Mesh의 애니메이션 블랜더와 거의 유사합니다.  
스프라이트 애니메이션을 훨신 부드럽게 처리 할 수 있습니다.  


<br>

### <green1_h3>2) 애니메이션 로직 설계</green1_h3>

Atlas 파일은 텍스처와 해당 텍스처의 UV 맵 정보를 포함하고 있습니다.  
Unity에서 Spine 애니메이션을 사용하려면 Spine 런타임을 프로젝트에 통합해야 합니다.  
일반적으로는 Spine 런타임 DLL 파일과 Atlas 파일을 Unity 프로젝트에 추가하여 사용합니다.  

#### <green1_h5>애니메이션 로직 설계</green1_h5>

![노드 애니메이션 로직 설계](https://drive.google.com/uc?export=view&id=1Hyc7R_vzdIlth3TXoAwCLeWy8TA82MSL){: width="100%" }

메인 캐릭터는 하나만 존재하기 때문에 싱글톤 패턴을 사용하여 스파인 애니메이션 처리를 하였습니다.  
스파인 애니메이션은 상태 스테이스 머신을 만들어서 애니메이션 전환으로 사용하였습니다.  

#### <green1_h5>시퀀스</green1_h5>

![애니메이션 시퀀스](https://drive.google.com/uc?export=view&id=1GdPudufiZSDF4h5o15oKXyrnBD2pTtUe){: width="100%" }

키를 누를때마다 코루틴으로 공격모션을 취하도록 하였습니다.  
두번의 공격을하면 다시 대기상태로 되돌아오는 대기 코루틴을 구현하였습니다.  

### <green1_h3>3) 애니메이션 로직 구현</green1_h3>

스파인 API를 살펴보면 DX9의 sample example skinned mesh 구조랑 비슷하다는 것을 눈치챌 수 있습니다.  
DX 아티클에서 한번 더 정리하겠지만, 스파인 툴에서 유니티로 import 하는 과정은 스파인 툴의 모델 좌표에서 유니티 월드 좌표로 월드좌표로 변환시키는 과정입니다.  
.atlas.txt 에는 2D 매쉬, 텍스쳐 UV, 스켈레톤 애니메이션 관련 정보들이 적혀 있을 것입니다.  

이러한 데이터들을 읽을 수 있는 방법이 적힌 스파인 API는 유니티에서 단 하나만 존재해야 하기 때문에, 두 가지 방법을 고민할 수 있습니다.  
첫 번째 방법은 static으로 선언된 전역 함수입니다.  
두 번째 방법은 싱글톤 패턴을 이용한 코드 작성입니다.  

둘 다 어디서든 접근할 수 있고, 단 한 개만 존재하는 동일한 주제를 가졌기 때문에 저는 객체 지향 관점에서 싱글톤 패턴을 선택하였습니다.  

```c#

using Spine.Unity; //스파인 에니메이션을 사용하기위해서

public partial class SingletonManager : MonoBehaviour
{
    [System.NonSerialized] public SkeletonAnimation skill; //스파인 스켈레톤 에니메이션 선언부분
    ...
    
    void SetAnimation(string name, bool loop, float speed) //스파인으로 만든 스켈렌톤 에니메이션 설정 함수(이름, 루프, 속도)
    {
        if (name == curAnimation) //먄약 지금 진행중인 에니메이션이 같다면 
        {
            return;
        }
        else
        {
            skill.state.SetAnimation(0, name, loop).TimeScale = speed; //스켈레톤 에니메이션을 설정하고 거기에 속도를 설정
            curAnimation = name; //현재 이름을 갱신해준다.
        }
    }

    public void CharactorIdle() //캐릭터 일시정지 상태
    {
        skill.state.SetAnimation(0, "idle", true).TimeScale = 0.01f; // 트랙0 에 "idle'에니메이션을 할당하고 무한루프 돌린다. 타임스케일은 0.01초
    }
    public void CharactorShotR() //캐릭터 오른쪽 공격 상태
    {
        skill.state.SetAnimation(0, "shot_r", true).TimeScale = 0.01f; // 트랙0 에 "shot_r'에니메이션을 할당하고 무한루프 돌린다. 타임스케일은 0.01초
    }
    public void CharactorShotL() //캐릭터 왼쪽 공격 상태
    {
        skill.state.SetAnimation(0, "shot_l", true).TimeScale = 0.01f; // 트랙0 에 "shot_l'에니메이션을 할당하고 무한루프 돌린다. 타임스케일은 0.01초
    }
}

```

아트스트와 협의된 애니메이션 관련 동작 구성은 idel → shot_L → idel → shot_R의 애니메이션 무한 루프 방식입니다.  
따라서 동작에 관해서 Enum으로 선언을 해줍니다.  

```c#

    enum CharacterAnimationState //아티스트와 협의된 에니메이션 동작
    {
        idle=0, // 정지상태
        shot_L=1, // 왼쪽 공격상태
        shot_R=3  // 오른쪽 공격상태
    }

```

애니메이션 관련 동작을 생각해 보면, 내가 키를 누르는 이벤트가 들어왔을 경우, idel → shot_L → idel의 상태 혹은  idel→ shot_R→ idel 상태로 늘 idel의 기본 스텐스가 유지되어야 합니다.  
위와 같이 로직을 처리해 주기 위해 시퀀스 그래프를 보시면 두 개의 코루틴으로 처리하도록 작성하였습니다.  

```c#

    IEnumerator CharacterAnimationCoroutine() //캐릭터 에니메이션 관련 코루틴 함수
    {
        while (true)
        {
            if (this.gameObject == null)
                yield break; // 혹시 가비지 컬렉터에 의해서 수집 안될 경우를 대비해서

            if (currentAnimationState == (int)CharacterAnimationState.idle&& SingltonManager.GetInstance().isAtteckButtonOn ==true) //현재의 상태가 idle과 공격버튼이 눌렀다면 이걸 해주는이유 혹시라도 코루틴 제어권이 돌아왔을때 미연의 불상사를 방지하기 위해서
            {
                if (isCurrentLeftAnimation == false) // 왼쪽공격 애니메이션이 아니라면 
                {
                    SingletonManager.GetInstance().CharactorShotL(); //왼쪽 공격 모션을 발동시기고
                    currentAnimationState = (int)CharacterAnimationState.shot_L; // 현재 상태는 왼쪽 공격상태
                    isCurrentLeftAnimation = true; // 왼쪽공격을 했음으로 
                    yield return StartCoroutine(ReturnCourtineIdle()); //ReturnCourtineIdel 실행중에 잠시 재어권 대기
                }
                else if (isCurrentLeftAnimation == true) // 왼쪽공격이라면 
                {
                    SingletonManager.GetInstance().CharactorShotR(); //오른쪽 공격 모션을 발동시키고
                    currentAnimationState = (int)CharacterAnimationState.shot_R; // 현재 상태는 오른쪽 공격상태
                    isCurrentLeftAnimation = false; // 왼쪽공격을 했음으로 
                    yield return StartCoroutine(ReturnCourtineIdle()); //ReturnCourtineIdel 실행중에 잠시 재어권 대기
                }
            }
            yield return null; //엡데이트를 실행후에 lateupdate 들어가기전에 코루틴제어권 넘김 이건 프레임마다 실행해주기위해서
        }
    }

    IEnumerator ReturnCourtineIdle() // idle 상태로 되돌리기
    {
        SingletonManager.GetInstance().isAtteckButtonOn = false; //공격버튼은 원래대로 (위에다 놓는 이유 재어권을 아직 게임루프에 넘어가기전에 처리해 주기 위해서)
        yield return new WaitForSecondsRealtime(0.1f); // 공격애니메이션 모션 대기 시간
        SingletonManager.GetInstance().CharactorIdle(); // idel 상태로 변형
        currentAnimationState = (int)CharacterAnimationState.idle; // 현재 상태는 idle 상태로 변경
    }

```

<br>

---

<br>

<span><green1_h5> 스파인 API 도큐먼트 및 다운로드 사이트: </green1_h5>
[http://ko.esotericsoftware.com/spine-applying-animations](http://ko.esotericsoftware.com/spine-applying-animations) </span>

