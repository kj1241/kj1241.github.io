---
layout: post
title: "Unity에서 [NonSerialized] 사용법과 C# 직렬화의 이해"
date: 2022-12-23 12:00:00 +09:00
image: https://drive.google.com/thumbnail?id=1lx_21AuSI84OgjYoJetu25iVQk8yuXFb
toc: true
categories: [Unity]
keywords: C#, Unity, [NonSerialized] 어트리뷰트, 직렬화, 역직렬화, 마샬링, Serializable, 메모리 관리, 성능 최적화
addsence: true
lastmod: 2024-06-01 09:00:00 +09:00
sitemap:
  changefreq : daily
  priority : 1.0
excerpt: C#의 [NonSerialized] 어트리뷰트와 직렬화, 마샬링 개념을 Unity에서의 사용 예제와 함께 설명합니다.
related_links:
    - url: /unity/BoxingAndUnBoxing.html
    - url: /unity/IEnumerator.html
    - url: /unity/UnityCoroutine.html
---

Unity를 사용하면서 public 변수를 Inspector에 노출시키고 싶지 않을 때 사용하는 [NonSerialized] 어트리뷰트는 많은 개발자에게 유용한 도구입니다. 그러나 이 어트리뷰트는 Unity 고유의 기능이 아니라, 원래 C# 자체 문법에 속하는 것입니다. 이번 글에서는 [NonSerialized] 어트리뷰트의 역할과 C#의 직렬화와 마샬링(Marshalling)에 대해 깊이 있게 다뤄보겠습니다.

<br>
<br>

## <unity_h2> [NonSerialized] 어트리뷰트란?</unity_h2>

[NonSerialized] 어트리뷰트는 C#에서 직렬화되지 않아야 하는 필드에 적용하는 어트리뷰트입니다. 직렬화가 적합하지 않은 멤버가 포함되어 있을 경우 이 어트리뷰트를 사용하여 해당 필드를 직렬화 과정에서 제외할 수 있습니다. Unity에서는 주로 public 필드를 Inspector에 노출시키지 않기 위해 사용됩니다.

<br>

### <unity_h3> 코드 예제: [NonSerialized] 사용 </unity_h3>

```c#

using UnityEngine;
using System;

public class ExampleClass : MonoBehaviour
{
    [NonSerialized]
    public int nonSerializedField;

    public int serializedField;

    void Start()
    {
        nonSerializedField = 10;
        serializedField = 20;
    }
}

```

이 예제에서 nonSerializedField는 public 필드이지만 Inspector에 노출되지 않습니다. 반면 serializedField는 Inspector에 노출됩니다.

<br>
<br>

## <unity_h2> 직렬화와 마샬링의 이해 </unity_h2>

C#에서 직렬화(Serialization)는 객체의 상태를 저장하거나 전송할 수 있도록 바이트 스트림으로 변환하는 과정입니다. 직렬화된 데이터는 파일, 데이터베이스 또는 네트워크를 통해 다른 시스템으로 전송될 수 있습니다. 직렬화의 반대 개념은 역직렬화(Deserialization)로, 바이트 스트림을 원래 객체로 복원하는 과정입니다.

<br>

### <unity_h3> 마샬링(Marshalling)이란? </unity_h3>

![마샬링 변환표]({{ site.google_drive }}1lx_21AuSI84OgjYoJetu25iVQk8yuXFb{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<unity_h6>마샬링 변환표</unity_h6>*

마샬링은 데이터를 전송, 통신 및 저장 형태에 적합하게 가공하는 과정입니다. 직렬화는 마샬링의 한 부분으로 볼 수 있으며, 데이터를 메모리나 데이터베이스에 저장하거나 전송하기 위해 바이트 스트림으로 변환하는 것입니다. 마샬링은 특히 다양한 시스템 간의 상호 운용성을 보장하는 데 중요한 역할을 합니다.

<br>

### <unity_h3> 코드 예제: 직렬화와 역직렬화 </unity_h3>

```c#

using System;
using System.IO;
using System.Runtime.Serialization.Formatters.Binary;

[Serializable]
public class Person
{
    public string Name;
    public int Age;

    [NonSerialized]
    public string TemporaryData;
}

public class SerializationExample
{
    public static void Main()
    {
        Person person = new Person { Name = "John", Age = 30, TemporaryData = "This will not be serialized" };

        // Serialize
        BinaryFormatter formatter = new BinaryFormatter();
        using (FileStream stream = new FileStream("person.dat", FileMode.Create))
        {
            formatter.Serialize(stream, person);
        }

        // Deserialize
        using (FileStream stream = new FileStream("person.dat", FileMode.Open))
        {
            Person deserializedPerson = (Person)formatter.Deserialize(stream);
            Console.WriteLine($"Name: {deserializedPerson.Name}, Age: {deserializedPerson.Age}, TemporaryData: {deserializedPerson.TemporaryData}");
        }
    }
}

```

이 예제에서 Person 클래스는 Serializable 특성을 사용하여 직렬화될 수 있습니다. 그러나 TemporaryData 필드는 [NonSerialized] 어트리뷰트를 사용하여 직렬화에서 제외되었습니다. 따라서 직렬화된 데이터에는 TemporaryData가 포함되지 않습니다.

<br>
<br>

## <unity_h2> [NonSerialized]를 사용하는 경우 </unity_h2>

[NonSerialized] 어트리뷰트는 다음과 같은 경우에 유용합니다

- **리소스 관리:** 파일이나 창 같은 리소스를 보유하는 필드는 다른 시스템에서 필요하지 않을 수 있습니다. 이러한 리소스는 직렬화할 필요가 없습니다.
- **캐싱된 데이터:** 계산되거나 캐싱된 데이터는 필요 시 다시 계산할 수 있으므로 직렬화할 필요가 없습니다.
- **민감한 정보:** 직렬화된 데이터에 포함되면 안 되는 민감한 정보는 [NonSerialized] 어트리뷰트를 사용하여 보호할 수 있습니다.

<br>

### <unity_h3> 코드 예제: 리소스 관리와 캐싱 </unity_h3>

```c#

using UnityEngine;
using System;

public class ResourceExample : MonoBehaviour
{
    [NonSerialized]
    public Texture2D runtimeTexture;

    public int cachedValue;

    void Start()
    {
        // runtimeTexture는 런타임에만 사용되며, 직렬화되지 않습니다.
        runtimeTexture = new Texture2D(128, 128);

        // cachedValue는 계산된 값이며, 필요 시 다시 계산할 수 있습니다.
        cachedValue = CalculateValue();
    }

    int CalculateValue()
    {
        // 복잡한 계산
        return 42;
    }
}

```

이 예제에서 runtimeTexture는 런타임에만 사용되므로 직렬화되지 않으며, cachedValue는 필요 시 다시 계산할 수 있으므로 직렬화되지 않아도 됩니다.

<br>
<br>

## <unity_h2> 결론 </unity_h2>

[NonSerialized] 어트리뷰트는 Unity뿐만 아니라 C# 전반에서 직렬화되지 않아야 하는 필드를 지정하는 데 유용합니다. 직렬화와 마샬링의 개념을 이해하면 더 나은 메모리 관리와 성능 최적화를 할 수 있습니다. 직렬화가 필요 없는 데이터를 적절히 처리하여 효율적인 프로그램을 작성하는 것이 중요합니다.