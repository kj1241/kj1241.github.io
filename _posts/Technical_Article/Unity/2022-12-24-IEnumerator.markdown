---
layout: post
title: "IEnumerator에 대한 깊이 있는 이해와 활용"
date: 2022-12-24 09:00:00 +09:00
image: https://drive.google.com/thumbnail?id=1NKEfBqtbfyLUQweLcQ2JNkGnUF3q-F4X
toc: true
categories: [Unity]
keywords: 
addsence: true
lastmod: 2024-06-01 09:00:00 +09:00
sitemap:
  changefreq : daily
  priority : 1.0
excerpt: 
related_links:
    - url: /unity/BoxingAndUnBoxing.html
    - url: /unity/UnityNonSerialized.html    
    - url: /unity/UnityCoroutine.html
---

프로그래머로서 C#에서 중요한 인터페이스 중 하나인 IEnumerator에 대해 깊이 있게 다루어 보겠습니다. 이는 단순한 인터페이스 이상의 의미를 지니며, 특히 Unity와 같은 게임 개발 환경에서 자주 사용됩니다. 이번 글에서는 IEnumerator의 정의, 목적, 사용 방법, 그리고 고급 개념인 덕 타이핑에 대해 살펴보겠습니다.

<br>
<br>

## <unity_h2> IEnumerator란?</unity_h2>

IEnumerator는 단순히 열거자 인터페이스로 정의됩니다. Microsoft 문서에 따르면, IEnumerator는 컬렉션을 반복할 수 있도록 지원하는 인터페이스입니다. IEnumerator의 이름을 분석해보면, I(인터페이스) + enum(열거형) + er(행위자) + ator(행위자)로 구성되어 있습니다. IEnumerator는 .NET 표준 인터페이스 중 하나로, 모든 컬렉션이 상속받는 IEnumerable 인터페이스에서 유래합니다.

IEnumerable은 “열거형을 할 수 있는 인터페이스”라는 의미로, 모든 컬렉션(데이터 구조)이 이를 상속받아 동일한 성격의 데이터를 담을 수 있도록 합니다. IEnumerator 인터페이스는 다음과 같은 세 가지 메소드를 포함합니다

- bool MoveNext(): 컬렉션의 다음 요소로 이동합니다.
- object Current { get; }: 현재 요소를 가져옵니다.
- void Reset(): 열거자를 초기 위치로 재설정합니다.

<br>

### <unity_h3> 코드 예제: IEnumerator 인터페이스 구현 </unity_h3>

```c#

using System;
using System.Collections;

public class SimpleEnumerator : IEnumerator
{
    private string[] _data;
    private int _position = -1;

    public SimpleEnumerator(string[] data)
    {
        _data = data;
    }

    public bool MoveNext()
    {
        _position++;
        return (_position < _data.Length);
    }

    public void Reset()
    {
        _position = -1;
    }

    public object Current
    {
        get
        {
            if (_position == -1 || _position >= _data.Length)
                throw new InvalidOperationException();
            return _data[_position];
        }
    }
}

```

이 예제에서는 문자열 배열을 반복하는 SimpleEnumerator 클래스를 구현했습니다.

<br>
<br>

## <unity_h2> IEnumerator의 목적성 </unity_h2>

IEnumerator 인터페이스는 주로 foreach 문을 위해 존재합니다. foreach 문은 실제로 컴파일러에 의해 IEnumerator 함수로 변환됩니다. 즉, 기능적으로 foreach와 IEnumerator는 동등합니다. IEnumerator는 foreach를 사용하기 위해 만들어진 함수라고 볼 수 있습니다.

<br>

### <unity_h3> 코드 예제: IEnumerator와 foreach의 관계 </unity_h3>

```c#

using System;
using System.Collections;

public class ForeachExample
{
    public static void Main()
    {
        string[] data = { "one", "two", "three" };
        IEnumerator enumerator = data.GetEnumerator();
        
        while (enumerator.MoveNext())
        {
            string item = (string)enumerator.Current;
            Console.WriteLine(item);
        }
        
        // Foreach version
        foreach (string item in data)
        {
            Console.WriteLine(item);
        }
    }
}

```

이 예제에서 enumerator와 foreach는 동일한 결과를 출력합니다.

<br>
<br>

## <unity_h2> Yield의 의미 </unity_h2>

C# 2.0에서 추가된 yield 키워드는 현재 위치를 저장하고 다음 위치로 넘어갈 수 있는 반복문을 수행하는 데 사용됩니다. IEnumerator는 인터페이스이므로 반드시 실제 클래스를 가져야 합니다. yield는 IEnumerator 구현을 단순화하고, 반환할 값과 상태를 자동으로 관리합니다.

<br>

### <unity_h3> 코드 예제: Yield 키워드 사용 </unity_h3>

```c#

using System;
using System.Collections;

public class YieldExample
{
    public static IEnumerable SimpleGenerator()
    {
        yield return "one";
        yield return "two";
        yield return "three";
    }

    public static void Main()
    {
        foreach (string item in SimpleGenerator())
        {
            Console.WriteLine(item);
        }
    }
}

```

이 예제에서 SimpleGenerator 메소드는 yield return을 사용하여 값을 반환하고, 호출자는 이를 foreach를 통해 반복합니다.

<br>
<br>

## <unity_h2> IEnumerator의 덕 타이핑 </unity_h2>

덕 타이핑은 런타임에서 타입을 결정하는 동적 타이핑의 일종으로, 객체의 변수 및 메소드의 집합에 따라 타입을 결정합니다. C# 4.0에서는 dynamic 키워드를 사용하여 덕 타이핑을 구현할 수 있습니다.

<br>

### <unity_h3> 덕 타이핑과 박싱 </unity_h3>

기존의 IEnumerator는 object 타입으로 값을 반환하므로 박싱-언박싱이 발생할 수 있습니다. 이는 성능 저하를 초래할 수 있습니다. 그러나 C#에서는 IEnumerator<T>를 사용하여 박싱을 최소화하고 성능을 최적화할 수 있습니다.

<br>

### <unity_h3> 코드 예제: 덕 타이핑과 dynamic </unity_h3>

```c#

using System;

public class DuckTypingExample
{
    public static void Main()
    {
        dynamic dyn = "Hello, World!";
        Console.WriteLine(dyn);

        dyn = 12345;
        Console.WriteLine(dyn);
    }
}

```

이 예제에서 dynamic 키워드를 사용하여 런타임에 타입을 변경할 수 있습니다.

<br>

### <unity_h3> (추가) 구조적 타이핑(struct typing) </unity_h3>

덕 타이핑과 비교되는 개념인 구조적 타이핑은 실제 구조 정의에 의해 타입이 결정되는 시스템입니다. C#에서는 지원하지 않지만, COM 위조 등을 통해 사용할 수 있습니다. 그러나 이러한 방식은 권장되지 않습니다.
  
구조적 타이핑의 예로, 두 개의 타입이 동일한 멤버를 가지고 있으면 동일한 타입으로 간주할 수 있습니다. 예를 들어, 다음과 같이 Vector2D와 Vector3D가 있다고 가정해봅시다

```c#

struct Vector2D {
    public double x;
    public double y;
}

struct Vector3D {
    public double x;
    public double y;
    public double z;
}

```

위의 예에서 Vector2D는 Vector3D 타입의 부분 집합이라고 볼 수 있습니다. 이러한 방식은 Rust, Go, F# 등에서 볼 수 있습니다. 장점으로는 재사용성과 생성성을 들 수 있지만, 단점으로는 예기치 않은 곳에서 동일한 타입으로 간주될 수 있습니다. 이러한 방식은 사용자가 코드를 쉽게 접근하는 데 편리할 수 있지만, 개인적으로는 선호하지 않습니다.

이와 비슷한 질문으로 'C++과 C# 중 어떤 것을 더 잘 아시나요?'라는 질문을 받았을 때와 같은 느낌입니다. C#도 초창기에는 C++의 주소 방식(call by reference, call by address)이 어렵고 위험하기 때문에 개선되어 나왔지만, 깊이 파고들수록 어렵고 복잡하다고 생각하기 때문입니다. 그렇기 때문에 편리한 언어일수록 더욱 복잡하다고 생각됩니다.


<br>
<br>

## <unity_h2> 결론 </unity_h2>

IEnumerator는 C#의 중요한 인터페이스로, 컬렉션을 반복하고 foreach 문을 지원하는 데 사용됩니다. yield 키워드는 반복자를 쉽게 구현할 수 있도록 도와주며, 덕 타이핑을 통해 성능을 최적화할 수 있습니다. 구조적 타이핑은 덕 타이핑과 비교되는 개념으로, 일부 다른 언어에서 사용되며 각각의 장단점을 가지고 있습니다. 이를 통해 복잡한 데이터 구조와 반복 작업을 효과적으로 관리할 수 있습니다.

IEnumerator와 관련된 개념을 깊이 이해하면, 더 나은 코드 작성과 최적화된 프로그램을 개발할 수 있습니다. 이를 통해 개발 효율성을 높이고, 성능을 향상시킬 수 있습니다.

