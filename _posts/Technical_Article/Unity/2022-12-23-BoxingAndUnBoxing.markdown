---
layout: post
title: "Dictionary와 HashTable의 차이 및 박싱과 언박싱의 영향"
date: 2022-12-23 09:00:00 +09:00
image: https://drive.google.com/thumbnail?id=1Bl_E1svW7ELWkyUUqER01pfooZSh6w6p
toc: true
categories: [Unity]
keywords: Dictionary, HashTable, 성능, 타입 안전성, 동기화, 박싱(Boxing), 언박싱(Unboxing)
addsence: true
lastmod: 2024-06-01 09:00:00 +09:00
sitemap:
  changefreq : daily
  priority : 1.0
excerpt: 프로그래밍에서 성능은 중요합니다. Dictionary와 HashTable의 차이 및 박싱과 언박싱의 영향을 살펴봅니다.
related_links:
    - url: /unity/UnityNonSerialized.html  
    - url: /unity/IEnumerator.html
    - url: /unity/UnityCoroutine.html  
---

프로그래밍을 할 때 데이터 저장 및 검색에 있어 성능은 매우 중요한 요소입니다. 이러한 맥락에서 Dictionary와 HashTable의 차이는 특히 성능 최적화 측면에서 중요하게 다뤄질 수 있습니다. 이 글에서는 Dictionary와 HashTable의 차이점을 설명하고, 박싱(Boxing)과 언박싱(Unboxing)이 이 두 자료구조의 성능에 어떤 영향을 미치는지 알아보겠습니다.

<br>
<br>

## <unity_h2>Dictionary와 HashTable의 차이</unity_h2>

### <unity_h3>타입 안전성(Type Safety)</unity_h3>

**HashTable:** 모든 키와 값이 object 타입으로 저장됩니다. 이는 박싱과 언박싱이 발생할 가능성을 높이고, 런타임 오류를 유발할 수 있습니다. 예를 들어, 정수형 키를 저장할 때마다 int 값이 object 타입으로 박싱됩니다.

**Dictionary:** 제너릭 타입을 사용합니다. 따라서 키와 값을 특정 타입으로 강제할 수 있어 타입 안전성이 보장됩니다. 이는 컴파일 타임에 오류를 잡아낼 수 있게 하여 더욱 안전한 코드를 작성할 수 있게 합니다.

<br>

### <unity_h3>성능</unity_h3>

**HashTable:** 키와 값이 object 타입으로 저장되기 때문에 박싱과 언박싱이 빈번하게 발생할 수 있습니다. 이는 메모리 할당과 해제에 추가적인 비용을 발생시켜 성능을 저하시킬 수 있습니다.

**Dictionary:** 제너릭 타입을 사용하기 때문에 박싱과 언박싱이 발생하지 않습니다. 따라서 메모리 사용이 효율적이며 성능이 더 뛰어납니다.

<br>

### <unity_h3>동기화(Synchronization)</unity_h3>

**HashTable:** 기본적으로 스레드 안전합니다. 즉, 여러 스레드가 동시에 접근할 수 있도록 동기화되어 있습니다. 하지만 동기화로 인해 단일 스레드 환경에서는 성능이 저하될 수 있습니다.

**Dictionary:** 기본적으로 스레드 안전하지 않습니다. 따라서 필요에 따라 동기화를 구현해야 합니다. 단일 스레드 환경에서는 HashTable보다 빠를 수 있습니다. (스레드 안전한 대안으로 ConcurrentDictionary를 사용할 수 있습니다.)

<br>
<br>

## <unity_h2> 박싱(Boxing)과 언박싱(Unboxing)</unity_h2>

**박싱(Boxing):** 값 타입 데이터를 참조 타입으로 변환하여 힙 영역에 저장하는 과정입니다. 예를 들어, 스택에 있는 int 값을 힙에 저장하려면 object 타입으로 변환하는 과정이 필요합니다. 이 과정에서 추가적인 메모리 할당과 CPU 오버헤드가 발생합니다.

**언박싱(Unboxing):** 힙 영역에 저장된 참조 타입 데이터를 다시 값 타입으로 변환하는 과정입니다. 예를 들어, 힙에 저장된 object 타입의 데이터를 스택의 int 값으로 변환하려면 언박싱이 필요합니다. 이 과정에서도 추가적인 비용이 발생합니다.

<br>

### <unity_h3> Dictionary와 HashTable에서의 박싱과 언박싱</unity_h3>

**HashTable:** 키와 값이 object 타입으로 저장되기 때문에 정수형, 실수형 등의 값 타입 데이터를 저장할 때마다 박싱이 발생합니다. 데이터를 조회할 때는 언박싱이 발생합니다. 이러한 박싱과 언박싱 과정은 성능 저하의 원인이 됩니다.

**Dictionary:** 제너릭 타입을 사용하므로 키와 값이 특정 타입으로 저장됩니다. 값 타입 데이터를 저장할 때 박싱이 발생하지 않으며, 조회할 때 언박싱이 필요하지 않습니다. 따라서 성능 면에서 HashTable보다 유리합니다.

<br>

### <unity_h3> 예제 코드</unity_h3>

다음은 Dictionary와 HashTable을 비교하는 간단한 예제 코드입니다.

```c#

using System;
using System.Collections;
using System.Collections.Generic;

class Program
{
    static void Main()
    {
        // Hashtable 예제
        Hashtable hashTable = new Hashtable();
        hashTable.Add(1, "One");
        hashTable.Add(2, "Two");

        int key1 = 1;
        string value1 = (string)hashTable[key1]; // 캐스팅 필요
        Console.WriteLine($"Hashtable: Key = {key1}, Value = {value1}");

        // Dictionary 예제
        Dictionary<int, string> dictionary = new Dictionary<int, string>();
        dictionary.Add(1, "One");
        dictionary.Add(2, "Two");

        int key2 = 1;
        string value2 = dictionary[key2]; // 캐스팅 필요하지 않음
        Console.WriteLine($"Dictionary: Key = {key2}, Value = {value2}");
    }
}

```

<br>
<br>

## <unity_h2> 결론</unity_h2>

Dictionary와 HashTable은 모두 키-값 쌍 데이터를 저장하고 검색하기 위한 자료구조이지만, 성능과 타입 안전성 측면에서 큰 차이를 보입니다. 특히 박싱과 언박싱이 빈번하게 발생하는 HashTable과 달리, Dictionary는 제너릭 타입을 사용하여 이러한 성능 저하를 피할 수 있습니다. 따라서 높은 성능과 타입 안전성이 요구되는 상황에서는 Dictionary를 사용하는 것이 더 적합합니다.

이와 같은 이유로, 토이 프로젝트에서 Dictionary를 선택한 것은 현명한 결정이라 할 수 있습니다. 박싱과 언박싱을 피함으로써 성능 저하를 최소화하고, 타입 안전성을 높여 더 안정적이고 빠른 코드를 작성할 수 있게 됩니다.