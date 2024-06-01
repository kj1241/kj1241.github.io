---
layout: post
title: "Unity Coroutine에 관한 모든 것"
date: 2022-12-24 09:00:00 +09:00
image: https://drive.google.com/thumbnail?id=1_Fvz_63RJqRM1WskRj3pP3TmiM-Wjeu-
toc: true
categories: [Unity]
keywords: Unity, Coroutine, 비동기 프로그래밍, C#, IEnumerator, 게임 성능 최적화
addsence: true
lastmod: 2024-06-01 09:00:00 +09:00
sitemap:
  changefreq : daily
  priority : 1.0
excerpt: Unity 코루틴에 대한 포괄적인 가이드로, 비동기 프로그래밍의 이해와 사용 방법을 다양한 예제와 함께 설명합니다.
related_links:
    - url: /unity/BoxingAndUnBoxing.html
    - url: /unity/UnityNonSerialized.html
    - url: /unity/IEnumerator.html
---


## <unity_h2> 코루틴이란 무엇인가?</unity_h2>

코루틴(Coroutine)은 단일 쓰레드 내에서 시분할 멀티태스킹을 수행하는 루틴을 말합니다. 코루틴은 다른 루틴을 호출하는 일반적인 함수와는 달리, 실행을 잠시 멈추었다가 이후 특정 시점에서 다시 실행을 재개할 수 있습니다. 이는 게임 개발에서 비동기적인 작업을 처리할 때 매우 유용합니다.

<br>
<br>

## <unity_h2> 코루틴을 쓰는 이유 </unity_h2>

코루틴을 사용하는 주요 이유는 비동기 프로그래밍을 가능하게 하기 때문입니다. 게임 로직을 처리할 때 처리 시간이 예상치 못하게 길어질 수 있으며, 이로 인해 게임이 멈추거나 느려질 수 있습니다. 코루틴을 사용하면 특정 시간 동안 혹은 특정 조건이 만족될 때까지 실행을 일시 중지하고, 메인 로직의 실행과는 독립적으로 로직을 처리할 수 있습니다.

예를 들어, 적의 스폰 주기를 제어하거나, 플레이어의 입력을 기다리는 동안 다른 작업을 수행할 수 있습니다. 이는 게임의 프레임 속도를 유지하고 사용자 경험을 향상시키는 데 큰 도움이 됩니다.

```c#

using UnityEngine;
using System.Collections;

public class CoroutineExample : MonoBehaviour
{
    void Start()
    {
        StartCoroutine(WaitAndPrint());
    }

    IEnumerator WaitAndPrint()
    {
        Debug.Log("Start waiting");
        yield return new WaitForSeconds(2f);
        Debug.Log("Waited for 2 seconds");
    }
}

```

위 코드에서 WaitAndPrint 코루틴은 2초 동안 대기한 후에 메시지를 출력합니다. 이 동안 다른 게임 로직은 계속해서 실행됩니다.

<br>
<br>

## <unity_h2> 코루틴은 Unity만의 특별한 함수인가? </unity_h2>

많은 사람들이 오해하는 부분입니다. 코루틴은 Unity만의 특별한 함수나 API가 아닙니다. 코루틴의 개념은 컴퓨터 과학의 전반에 걸쳐 존재하며, 여러 언어에서 지원됩니다. 예를 들어, C++20에서는 코루틴 API를 지원합니다.
  
Unity에서 코루틴이 널리 사용되는 이유는 주로 모바일 프로그래밍에서의 효율성 때문입니다. Unity, Xamarin, Google Android 같은 모바일 환경에서는 하드웨어 자원이 제한적이기 때문에, 멀티 쓰레드보다 가벼운 코루틴을 사용하는 것이 더 적합합니다. 코루틴은 특히 메모리 사용과 스케줄링에서 효율적입니다.


<br>
<br>

## <unity_h2> C#의 IEnumerator는 코루틴인가? </unity_h2>

이 부분에 대해 많은 사람들이 혼동하고 있습니다. C#에서 IEnumerator는 코루틴을 구현하는 방법 중 하나일 뿐입니다. 다음 예제를 통해 이를 살펴보겠습니다.

```c#

using UnityEngine;
using System.Collections;

public class IEnumeratorExample : MonoBehaviour
{
    void Start()
    {
        IEnumerator enumerator = SimpleEnumerator();
        while (enumerator.MoveNext())
        {
            Debug.Log(enumerator.Current);
        }
    }

    IEnumerator SimpleEnumerator()
    {
        yield return 0;
        yield return 1;
        yield return 2;
    }
}

```

위 예제에서 SimpleEnumerator는 IEnumerator를 사용하여 간단한 숫자 시퀀스를 반환합니다. 이는 Unity의 메인 루틴인 게임 루프와는 독립적으로 실행됩니다.

- IEnumerator는 코루틴의 본질적인 특성을 가지고 있지만, Unity 메인 루프에서 실행되는 것이 아닙니다.
- IEnumerator의 리턴 값은 항상 Unity 특정 API를 리턴하는 것이 아니라, 사용자가 자유롭게 정의할 수 있습니다.

따라서, IEnumerator는 코루틴의 특성을 가진 함수일 수 있지만, 항상 그렇지는 않습니다.

<br>
<br>

## <unity_h2> Unity 라이프 사이클과 코루틴의 관계 </unity_h2>

Unity의 라이프 사이클과 코루틴은 밀접한 관계가 있습니다. Unity는 다양한 yield return 구문을 통해 코루틴의 실행을 제어할 수 있는 API를 제공합니다.

![유니티 엔진]({{ site.google_drive }}1_Fvz_63RJqRM1WskRj3pP3TmiM-Wjeu-{{ site.google_drive_end }}){:width="50%"  style="aspect-ratio:1/4.75" loading="lazy" align="left"}


<br>

### <unity_h3> yield return new WaitForSeconds(float time) </unity_h3>

지정된 시간 동안 코루틴의 실행을 일시 중지합니다. WaitForSeconds는 Time.timeScale에 영향을 받습니다.

```c#

yield return new WaitForSeconds(2.0f);

```



### <unity_h3> yield return new WaitForSecondsRealtime(float time) </unity_h3>

WaitForSeconds와 유사하지만, Time.timeScale의 영향을 받지 않습니다. 이는 주로 정밀한 타이밍이 필요한 경우에 사용됩니다.

```c#

yield return new WaitForSecondsRealtime(2.0f);

```


### <unity_h3> yield return new WaitForFixedUpdate() </unity_h3>

다음 FixedUpdate()가 호출될 때까지 코루틴을 일시 중지합니다. FixedUpdate는 일정한 시간 간격으로 호출되지만, 이 간격이 일정하지 않을 수 있습니다.

```c#

yield return new WaitForFixedUpdate();

```



### <unity_h3> yield return new WaitForEndOfFrame() </unity_h3>

현재 프레임이 끝날 때까지 코루틴을 일시 중지합니다. 이는 Update, LateUpdate 이후에 실행됩니다.

```c#

yield return new WaitForEndOfFrame();

```



### <unity_h3> yield return null </unity_h3>

다음 Update가 실행될 때까지 코루틴을 일시 중지합니다. 이는 현재 프레임이 끝날 때까지 기다리는 것과 유사합니다.(Update -> null -> LateUpdate)

```c#

yield return null;

```



### <unity_h3> yield return new WaitUntil </unity_h3>

지정된 조건이 true가 될 때까지 코루틴을 일시 중지합니다.

```c#

yield return new WaitUntil(() => someCondition);

```


### <unity_h3> yield return new WaitWhile </unity_h3>

지정된 조건이 false 될 때까지 코루틴을 일시 중지합니다.

```c#

yield return new WaitWhile (() => someCondition);

```



### <unity_h3> yield return StartCoroutine(IEnumerator coroutine) </unity_h3>

코루틴 내에서 다른 코루틴을 호출하고, 해당 코루틴이 완료될 때까지 대기합니다.

```c#

yield return StartCoroutine(AnotherCoroutine());

```

<br>

위와 같은 다양한 yield return 구문은 코루틴을 통해 복잡한 비동기 작업을 효과적으로 처리할 수 있도록 도와줍니다. 이를 통해 게임의 다양한 이벤트와 로직을 제어하고 관리할 수 있습니다.

<br>
<br>

## <unity_h2> 결론 </unity_h2>

코루틴은 Unity에서 비동기 프로그래밍을 처리하는 강력한 도구입니다. 코루틴의 리턴 값은 상황에 따라 다르며, 이를 통해 다양한 비동기 작업을 효율적으로 처리할 수 있습니다. Unity에서 코루틴을 이해하고 활용하면, 더 나은 성능과 사용자 경험을 제공하는 게임을 개발할 수 있습니다.

코루틴의 다양한 사용 예제와 함께, Unity의 다양한 API와의 관계를 이해하면 더욱 효과적으로 코루틴을 사용할 수 있습니다. 이를 통해 복잡한 게임 로직을 보다 쉽게 구현하고, 성능을 최적화할 수 있습니다.
