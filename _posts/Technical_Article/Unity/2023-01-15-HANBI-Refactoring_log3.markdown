---
layout: post
title: "하나비 프로젝트(리듬 게임) 개발 로그 3 - 스파인 애니메이션 API 이용"
date: 2023-01-15 16:25:33 +0900
image: https://drive.google.com/thumbnail?id=1Rlq8GttXP_Nc6szIUhBCASzZajd8nxfY
toc: true
categories: [Unity]
tags: [C#, Unity, Rhythm Game]
addsence: true
excerpt: Unity 및 C#로 개발한 리듬게임 '하나비 프로젝트'의 로그입니다. 애니메이션을 추가하기 위해서 스파인 에니메이션 API를 이용하여 2D 에니메이션을 제작한 경험을 공유하고 있습니다.
---

## <unity_h2>1. 요약</unity_h2>

게임 개발 시 캐릭터의 애니메이션을 처리하는 것은 중요한 요소 중 하나입니다. 이를 위해 Unity 엔진을 사용하여 간단한 공격 시퀀스를 구현해 보겠습니다.

<br>


![세부 단계2]({{ site.google_drive }}1Rlq8GttXP_Nc6szIUhBCASzZajd8nxfY{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<unity_h6>현재 단계</unity_h6>*

게임잼 도중 여유 시간을 활용하여 디자이너와의 논의를 통해 추가 구현 목표를 정하는 과정에서, 다음으로 구현하고 싶은 내용으로 캐릭터 애니메이션을 선택했습니다. 어떤 툴을 사용할지에 대한 논의 끝에, 스파인 툴을 활용하기로 결정했습니다.  
  
당시에는 유니티와 스파인을 연동하는 예제가 문서 외에는 찾기 어려웠으며, 첫 연동 작업이었기 때문에 코드가 회피적으로 작성되어 있었습니다. 이에 따라 코드를 보기 좋게 리팩토링하게 되었습니다.  

<br>
<br>

## <unity_h3>2. 스파인 애니메이션 package 설치 및 도큐먼트 리딩</unity_h3>

Esoteri Soft에서 제공하는 스파인 애니메이션 API를 활용하여 애니메이션 컨트롤을 성공적으로 구현했습니다. (API 다운로드는 공식 홈페이지에서 가능합니다.)  
  
이 API는 DirectX에서 제공하는 Skinned Mesh의 애니메이션 블렌딩과 유사한 기능을 제공합니다. 특히, 스프라이트 애니메이션을 매우 부드럽게 처리할 수 있어서 우리 게임에 더 나은 시각적 효과를 부여할 수 있었습니다.  
  
API를 활용하면서 얻은 주요 이점 중 하나는 DirectX의 Skinned Mesh 애니메이션 블렌더와 유사한 동작을 통해 캐릭터 애니메이션을 자연스럽게 조절할 수 있다는 점입니다. 이로써 게임의 캐릭터 움직임이 훨씬 자연스러워지고 유동적으로 표현될 수 있었습니다.  
  
더불어, 스프라이트 애니메이션을 처리하는 데 있어서도 API가 탁월한 성능을 보여주었습니다. 부드럽고 섬세한 스프라이트 애니메이션을 구현하여 게임의 시각적 품질을 높일 수 있었습니다.  
  
이 경험을 통해 Esoteri Soft의 스파인 애니메이션 API는 우리 게임의 애니메이션 컨트롤에 효과적으로 활용될 수 있음을 확인하였습니다. 더불어, API의 강력한 기능을 이용하여 스프라이트 애니메이션을 부드럽게 처리 할 수 있었습니다.  

<br>
<br>

## <unity_h2>3. 애니메이션 로직 설계</unity_h2>


Atlas 파일은 텍스처와 해당 텍스처의 UV 맵 정보를 담고 있어, Unity에서 Spine 애니메이션을 사용하려면 Spine 런타임을 프로젝트에 통합해야 합니다.  일반적으로는 Spine 런타임 DLL 파일과 Atlas 파일을 Unity 프로젝트에 추가하여 사용합니다.  
  
Spine 런타임을 Unity 프로젝트에 통합하는 단계는 다음과 같습니다: 

1. <span><unity_h5>Spine 런타임 다운로드:</unity_h5> Esoteri Soft 또는 Spine 공식 웹사이트에서 Spine 런타임 DLL 파일을 다운로드합니다. </span>

2. <span><unity_h5>DLL 파일 추가:</unity_h5> Unity 프로젝트의 Assets 폴더나 Plugins 폴더 등에 다운로드 받은 Spine 런타임 DLL 파일을 추가합니다. </span> 

3. <span><unity_h5>Atlas 파일 추가:</unity_h5> Spine 애니메이션에서 사용할 Atlas 파일도 Unity 프로젝트에 추가합니다. (보통 Resources 폴더나 StreamingAssets 폴더에 추가하는 것이 일반적입니다.)</span>

4. <span><unity_h5>Spine 컴포넌트 추가:</unity_h5> Unity Scene에 Spine 애니메이션을 표시할 오브젝트를 만들고, 해당 오브젝트에 Spine 컴포넌트를 추가합니다.</span>

5. <span><unity_h5>Atlas 할당:</unity_h5> Spine 컴포넌트의 Inspector에서 Atlas 파일을 할당합니다. 이를 통해 Spine 애니메이션은 정확한 텍스처와 UV 맵 정보를 참조할 수 있습니다.</span>

6. <span><green1_h5>애니메이션 제어:</green1_h5> Spine 컴포넌트를 통해 애니메이션을 제어하고, Unity Animator 또는 코드를 통해 애니메이션을 시작하거나 조절할 수 있습니다.</span>
  
이렇게 하면 Spine 애니메이션을 Unity 프로젝트에 성공적으로 통합할 수 있습니다.  
주의할 점은 Spine 런타임과 Atlas 파일의 버전이 서로 호환되어야 하며, Unity 버전과도 호환되는지 확인하는 것이 중요합니다.  

<br>

### <unity_h3>애니메이션 로직 설계</unity_h3>

애니메이션 로직 설계에 관한 내용입니다.

<br>


![세부 단계2]({{ site.google_drive }}1Hyc7R_vzdIlth3TXoAwCLeWy8TA82MSL{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<unity_h6>노드 애니메이션 로직 설계</unity_h6>*

게임 내에서 메인 캐릭터가 단 하나만 존재하므로, 싱글톤 패턴을 활용하여 캐릭터 인스턴스를 전역적으로 관리합니다. 이를 통해 어디서든 간편하게 메인 캐릭터에 접근하여 상태 및 애니메이션을 제어할 수 있습니다.  
  
또한, 상태 스테이트 머신을 사용하여 캐릭터의 여러 상태를 정의하고, 각 상태에 따른 애니메이션을 효과적으로 관리합니다. 상태 스테이트 머신을 통해 캐릭터의 행동을 상태에 따라 구분하고 애니메이션을 전환할 수 있습니다.  
  
이러한 설계를 통해 코드의 가독성과 유지보수성을 높이며, 게임 내에서 메인 캐릭터의 애니메이션을 효과적으로 다룰 수 있었습니다.  

<br>

### <unity_h3>시퀀스</unity_h3>

애니메이션 시퀀스는 게임 또는 애니메이션에서 연속적으로 발생하는 애니메이션의 일련의 순서를 의미합니다. 이는 특정 상황이나 행동에 따라 캐릭터나 오브젝트가 취하는 다양한 동작들을 정의하고 관리하는 데 사용됩니다.  

애니메이션 시퀀스를 구현하는 방법은 다양합니다. 보통은 상태 기반 또는 이벤트 기반 방식으로 구현됩니다. 상태 기반 방식은 캐릭터의 상태에 따라 애니메이션을 변경하는 방식이며, 이벤트 기반 방식은 특정 이벤트가 발생할 때 애니메이션을 변경하는 방식입니다.  

<br>

![애니메이션 시퀀스]({{ site.google_drive }}1GdPudufiZSDF4h5o15oKXyrnBD2pTtUe{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<unity_h6>애니메이션 시퀀스</unity_h6>*

게임에서 키를 누를 때마다 공격 모션을 취하고, 두 번의 공격을 한 후에는 대기 상태로 돌아오도록 구현했습니다. 이러한 동작을 코루틴을 활용하여 구현했습니다.  

<br>
<br>

## <unity_h2>4. 애니메이션 로직 구현</unity_h2>

스파인 API를 통해 DX9의 샘플 예제와 유사한 스파인 툴의 모델 좌표를 유니티 월드 좌표로 변환하는 작업을 수행했습니다. .atlas.txt 파일에는 2D 매쉬, 텍스쳐 UV, 스켈레톤 애니메이션과 관련된 정보들이 담겨있을 것입니다.  

이러한 데이터를 읽을 수 있는 스파인 API는 유니티에서 하나의 인스턴스만 존재해야 하기 때문에 두 가지 접근 방법을 고려할 수 있습니다. 첫 번째 방법은 static으로 선언된 전역 함수를 사용하는 것이고, 두 번째 방법은 싱글톤 패턴을 이용한 코드 작성입니다.  
  
각 방법은 어디서든 접근 가능하고, 유일한 인스턴스를 유지해야 한다는 공통된 목적을 가지고 있습니다. 그러나 객체 지향 관점에서는 싱글톤 패턴을 사용하는 것이 더 적절하다고 판단하여 이 방법을 선택했습니다.  
  
싱글톤 패턴은 클래스 인스턴스가 하나만 생성되도록 보장하며, 전역적인 접근이 필요한 경우에 효과적으로 사용됩니다. 따라서 스파인 API를 관리하는 데에는 싱글톤 패턴이 적합하며, 코드의 일관성과 관리 용이성을 확보할 수 있게 됩니다.  

<br>

#### **<web_h4>c#:</web_h4>**


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

위의 코드는 애니메이션 상태에 관한 로직 구현입니다.

<br>

#### **<web_h4>c#:</web_h4>**

```c#

    enum CharacterAnimationState //아티스트와 협의된 에니메이션 동작
    {
        idle=0, // 정지상태
        shot_L=1, // 왼쪽 공격상태
        shot_R=3  // 오른쪽 공격상태
    }

```
게임에서는 아트스트와 협의된 애니메이션 동작 구성이 "idle → shot_L → idle → shot_R"의 무한 루프 방식입니다. 이러한 동작을 명확하게 표현하기 위해 Enum을 사용했습니다.  
Enum은 각 동작을 명명하고 코드에서 가독성을 높이는데 도움을 주는데, 이러한 이유로 Enum을 도입하여 애니메이션 상태를 관리하고 있습니다. 위와 같이 로직을 처리해 주기 위해 시퀀스 그래프를 보시면 두 개의 코루틴으로 처리하도록 작성하였습니다.  

<br>

#### **<web_h4>c#:</web_h4>**

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

상태 머신과 코루틴과 같은 기법을 사용하여 애니메이션을 처리하고 있습니다.

<br>

---

<br>

###### <unity_h6> 참조 </unity_h6>

###### - 스파인 API 도큐먼트 및 다운로드 사이트: [http://ko.esotericsoftware.com/spine-applying-animations](http://ko.esotericsoftware.com/spine-applying-animations)
