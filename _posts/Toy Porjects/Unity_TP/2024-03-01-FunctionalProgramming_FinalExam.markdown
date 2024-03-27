---
layout: post
title: "유니티 기능성 프로그래밍 - 기말 과제(Plattach)"
date: 2024-03-01 17:36:45 +0900
image: https://drive.google.com/thumbnail?id=18Lc_zcIY3zjgbyejhMAH7RMGcXXuzdEF
toc: true
categories: [Unity_TP] 
tags: [C#, Unity, 3D Platformer Game, 3D Defense game]
keywords: C#, Unity, 3D Platformer Game, 3D Defense game
---

## <unity_h2> 프로젝트 소개 </unity_h2>

Unity와 C#을 활용하여 제작된 이 게임은 PC(Windows)에서 플레이할 수 있으며, 독특한 플레이어 캐릭터 및 적 AI 캐릭터의 움직임과 전략적 요소가 특징입니다. 또한, 게임의 자원 관리와 체력 시스템이 도입되어 플레이어의 전략성을 강조하고 있습니다.

<br>
<br>

## <unity_h2> 프로젝트 개요 </unity_h2>

- <span><unity_h5>프로젝트명:</unity_h5> Plattach ver.1</span>
- <span><unity_h5>과제:</unity_h5> 2018년 1학기 팀 기능성 프로그래밍 기말 과제</span>
- <span><unity_h5>게임 장르:</unity_h5> 3D 플랫폼 게임 → 3D Defense Game</span>
- <span><unity_h5>기간:</unity_h5> 제작 완료</span>
    - ver.1: 2018.05.10~2018.05.20(제작)
- <span><unity_h5>개발인원:</unity_h5> Developer(1명)</span>
- <span><unity_h5>플랫폼:</unity_h5> PC (Window)</span>

<br>

### <unity_h3> 기술 스택 </unity_h3>

- <span><unity_h5>개발 도구:</unity_h5> Unity 2017.2.0f3 → 2019.4.22f1 / visual stuido </span>
- <span><unity_h5>개발 언어:</unity_h5> C# / mono </span>
- <span><unity_h5>그래픽 디자인:</unity_h5> Adobe Photoshop / Adobe Illustrator / World Creator </span>
- <span><unity_h5>음향 효과:</unity_h5> Adobe Audiition </span>

<br>
<br>


## <unity_h2> 프로젝트 특징 및 기능 구현 </unity_h2>

![Plattach_levelDesign]({{ site.google_drive }}1VenKqqn3F3RDKBAs1jfFZhNkHaQiUTHj{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<unity_h6>Plattach levelDesign</unity_h6>*

시험 내용: 기존의 Plattach 프로젝트에서 특징 3가지 기능을 추가하여 프로젝트를 완성해야 합니다.
기본규칙:
    - 게임의 자원 그 효과
        아이템(자원) / 캐릭터 체력 / 우주선 수리 / 움직일 때 체력의 감소
        사과 / 큼 / 불가능 / 작음
        식물 / 작음 / 작음 / 작음
        철광석 / 불가능 / 큼 / 큼
    - 플레이어 캐릭터는 전후좌우 이동할 수 있고, 자원을 들거나 내려 놓을 수 있음
    - 게임은 우주선 수리가 끝나면 성공, 그전에 채력이 고갈되면 실패.


<br>

### <unity_h3>디펜스 게임 제작 ver.1</unity_h3><red1_error> (전체 제작 기여도: 100%)</red1_error>

1. 다양한 에셋과 무료 모델링을 사용하여 제작하였습니다.
2. 디펜스 게임으로 장르를 변경하였습니다.
3. 배경음 사운드와 효과음을 삽입 하였습니다.
4. 메카님을 사용하여 에니메이션을 만들 어줬습니다.


<br>

#### <unity_h4>부드럽게 처리되는 카메라</unity_h4>

<details markdown=1>
<summary> SmoothFollow(C#) </summary>

```c#

public class SmoothFollow : MonoBehaviour
{

    [SerializeField]
    private Transform target;
    [SerializeField]
    private float distance = 10.0f;
    [SerializeField]
    private float height = 5.0f;

    [SerializeField]
    private float rotationDamping;
    [SerializeField]
    private float heightDamping;

    void Start() { }

    void LateUpdate()
    {
        if (!target)
            return;

        // 현재 회전 각도를 계산
        System.Single wantedRotationAngle = target.eulerAngles.y;
        System.Single wantedHeight = target.position.y + height;

        System.Single currentRotationAngle = transform.eulerAngles.y;
        System.Single currentHeight = transform.position.y;

        // y축을 중심으로 회전을 감쇠
        currentRotationAngle = Mathf.LerpAngle(currentRotationAngle, wantedRotationAngle, rotationDamping * Time.deltaTime);

        // 높이를 감쇠
        currentHeight = Mathf.Lerp(currentHeight, wantedHeight, heightDamping * Time.deltaTime);

        // 각도를 회전으로 변환
        UnityEngine.Quaternion currentRotation = Quaternion.Euler(0, currentRotationAngle, 0);

        // x-z 평면에서 카메라 위치를 다음과 같이 설정
        // 타겟 뒤의 거리 미터
        transform.position = target.position;
        transform.position -= currentRotation * Vector3.forward * distance;

        // 카메라의 높이를 설정
        transform.position = new Vector3(transform.position.x ,currentHeight , transform.position.z);

        // 항상 목표를 바라봄
        transform.LookAt(target);
    }
}

```

</details>


<br>

#### <unity_h4> 플레이어 캐릭터 </unity_h4>

![플레이어 캐릭터]({{ site.google_drive }}18Lc_zcIY3zjgbyejhMAH7RMGcXXuzdEF{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<unity_h6>플레이어 캐릭터</unity_h6>*

- 플레이어 캐릭터는 무기를 들고 있습니다.
- 플레이어 캐릭터의 애니메이션은 idel, walk, attack, pick, hit ,death로 구성되어 있습니다.
- 플레이어 애니메이션은 메카님으로 이루어져 있습니다.
- 플레이어는 특정 오브젝트에 충동 처리를 하여 공격 혹은 벽과의 충돌등으로 처리되어 있습니다.

<br>

#### <unity_h4> 적 AI 캐릭터 </unity_h4>

![적 AI 캐릭터]({{ site.google_drive }}1xe-HPCQoKVQ5tg6paUI1ZRhRcoHsmTI3{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<unity_h6>적 AI 캐릭터</unity_h6>*

- 늑대는 플레이어와 충돌하면 터집니다. 좀비는 플레이어와 충돌하면 공격합니다.
- 늑대 AI 캐릭터의 에니메이션은 idel, walk로 구성되어있습니다.
- 늑대 AI는 네비게이션 메쉬를 사용하여 캐릭터의 위치를 찾아서 길찾기를 합니다.


<br>
<br>

## <unity_h2> 수정된 규칙의 기획안 </unity_h2>

- 오브젝트: 
    - 로켓 → 마을 중앙의 책
    - 적군: 늑대, 좀비
    - 맵: 중세 시대 마을
    - item: 
        - 빨간 포션 = 자신의 HP를 회복 시켜준다.
        - 파란 포션 = 책에 마나를 불어 넣어준다.

- 승리 조건:
    - 파란포션을 5개 집어 책에 넣으면 승리.

- 패배 조건:
    - 플래이어는 책의 체력이 부셔지면 실패.
    - 플래이어의 체력이 고갈되면 실패.

- 게임에서 추가된 UI
    - 컨트롤을 일부로 어렵게 만들어놨기 때문에 미니맵을 제공하여 현재 위치를 측정할 수 있다.
    -  플레이어, 책, 적군 채력 UI 제작

- 배경음악 및 효과음
    - 배경음악 삽입
    - 효과음 : 공격할 경우, 빨간 포션 먹을때, 파란 포션 먹을 때

- 게임 시퀸스 : 인트로 → 메인 → 엔드 화면으로 씬전환
- 레벨 디자인: 파란포션을 책에 넣을 때마다 몬스터의 리젠 수가 많아진다.

<br>
<br>

## <unity_h2> 결과(성과) 및 데모 </unity_h2>

<iframe width="100%" style="aspect-ratio:16/9" src="https://drive.google.com/file/d/1W468hHxpJJyaHUFjYbDoafolLJGzV51r/preview" title="Plattach_FinalExam" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

- <span><unity_h5>성과:</unity_h5> 2018년 1학기 팀 기능성 프로그래밍 기말 과제 </span>
- <span><unity_h5>깃허브(코드):</unity_h5> </span>

<br>
<br>

## <unity_h2> 비고 및 여담 </unity_h2>

- 게임 장르가 변경된 이유: 
    - 당시 기존의 프로젝트로 3개를 수정하는 것은 재미없었기 때문에 3D 플랫폼 게임을 3D 디펜스 게임으로 변환했습니다.

- 배운점:
    - 3D 캐릭터들의 애니메이션을 다루는 방법에 대해서 학습하였습니다.
    - 충돌처리 로직에 관하여 학습하게 되었습니다.
    - 카메라를 부드럽게 만드는 방법에 대해서 고민하였습니다.
    - 프로젝트 내용을 응용하여 다른 장르로 바꿔버리는 방법에 대해서 고민하였습니다.

- 수정할 점:
    - 유저를 괴롭히기 위한 게임을 제작 했기 때문에 캐릭터 조작 난이도가 최상위 입니다. (상하키: 이동 , 좌우키 회전) 따라서 유저에게 편하게 바꿔야 합니다.
    - 책에 c를 누르면 모든 몬스터가 죽도록 만들어 졌으나 패널티가 없어서 패널티를 만들어야 합니다.
    - 많은 수의 에셋과 무료모델링들을 사용 했기 때문에 에셋을 정리할 필요가 있습니다.
    - 카메라 로직을 생각해서 구현하였지만 실제로 적용해 봤을때 생각보다 딱딱한 느낌이 있어서 로직 수정이 필요합니다.
    - 당시에는 디렉토리 위치, 클래스 네임등 완성을 위해서 주먹구구식으로 완성을 했기 때문에 좀 더 리팩토링해서 코드를 공개할 예정입니다.