---
layout: post
title: "CppCon22 - 연습 예제 모음"
date: 2024-06-20 09:00:00 +09:00
image: https://drive.google.com/thumbnail?id=1_7fRS-F3NiOwnV5SkiUgnZ0q_GnbvIIA
toc: true
categories: [Algorithm] 
keywords: CppCon22, C++, 코루틴, 방문자 패턴, std::variant, 원자 스마트 포인터, 디자인 패턴, 최신 C++ 표준, 비동기 프로그래밍, 멀티스레드 안전성, lambda
addsence: false
lastmod: 2024-06-21 09:00:00 +09:00
sitemap: 
  changefreq : daily
  priority : 1.0
excerpt: CppCon22 내용을 기반으로 C++ 최신 기능을 실습하고 다양한 프로그래밍 기법을 분석한 프로젝트입니다.
related_links:
  - url: /cppcon/CppCon22_Variant.html
  - url: /cppcon/CppCon22_Generators_Coroutine1.html
  - url: /cppcon/CppCon22_Generators_Coroutine2.html
  - url: /cppcon/CppCon22_Generators_Coroutine3.html
  - url: /cppcon/CppCon22_Atomic_Smarter_Point.html
  - url: /cppcon/CppCon22_Lambda1.html
  - url: /cppcon/CppCon22_Lambda2.html
  - url: /cppcon/CppCon22_Lambda3.html
---

## <cpp_h2>프로젝트 소개</cpp_h2>

이 프로젝트는 CppCon22에서 발표된 내용을 바탕으로 C++의 최신 기능들을 연습하고 실험하기 위해 제작되었습니다. 각 버전에서는 C++의 다양한 프로그래밍 기법과 다양한 코드들을 비교 분석하였습니다. 프로젝트는 총 네 가지 주요 버전으로 나누어져 있으며, 각 버전은 특정 카테고리에 따라서 나눠저 있습니다.

<br>
<br>

## <cpp_h2>프로젝트 개요</cpp_h2>

- <span><cpp_h5>프로젝트명:</cpp_h5> CppCon22 연습용 예제</span>
- <span><cpp_h5>게임 장르:</cpp_h5> Toy Project</span>
- <span><cpp_h5>기간:</cpp_h5> 제작 완료</span>
    - ver.1: 2023.03.12~2023.03.13(Variant_Visitor)
    - ver.2: 2023.03.15~2023.03.20(Generators_Coroutine)
    - ver.3: 2023.06.18~2023.06.20(Atomic_Smarter_Point)
    - ver.4: 2023.11.01~2023.11.04(Lambda)
- <span><cpp_h5>개발인원:</cpp_h5> Developer(1명)</span>
- <span><cpp_h5>플랫폼:</cpp_h5> PC (console)</span>

<br>

### <cpp_h3> 기술 스택 </cpp_h3>

- <span><cpp_h5>개발 도구:</cpp_h5> visual studio 2019</span>
- <span><cpp_h5>개발 언어:</cpp_h5> c++  </span>

<br>
<br>

## <cpp_h2> 프로젝트 특징 및 기능 구현 </cpp_h2>

Cppcon22에서 발표된 내용을 바탕으로 공부한 내용과 추가 자료를 활용하여 작성한 예제 코드입니다. 이 프로젝트는 여러 가지 프로그래밍 기법을 비교 및 실험하여 가독성, 유지보수성, 성능 등을 분석하는 데 중점을 두고 있습니다. 단순히 코드들만 가지고는 이해하기 힘드신 분들은 블로그의 아티클을 읽어주시면 감사하겠습니다.

<br>

### <cpp_h3> Variant_Visitor ver.1 </cpp_h3><red1_error> (전체 제작 기여도: 100%)</red1_error>

코드의 유지보수성과 가독성을 향상시키기 위해 대표적인 네 가지 형태를 바탕으로 메모리 사용량과 로직 시간을 비교하는 코드를 작성했습니다. 이 코드는 윈도우 프로그램과 콘솔 두 가지 버전으로 구현되었습니다.

<br>

#### <cpp_h4> EnumSolution </cpp_h4><red1_error> (전체 제작 기여도: 100%)</red1_error>

![Enum Solution Consol]({{ site.google_drive }}1WuBZVYyjidqETLX87_jEddqhABTr2kTm{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<cpp_h6>Enum Solution Consol 코드 결과</cpp_h6>*  

![Enum Solution]({{ site.google_drive }}1FS5G3b01QIP_0Y_keeCFKHW7ykOhIVgb{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<cpp_h6>Enum Solution 윈도우 프로그래밍 결과</cpp_h6>* 

- 열거형(Enum)을 사용하여 일정한 상수 집합을 정의합니다. 이는 코드의 가독성과 유지보수성을 향상시킵니다.
- 절차지향 프로그래밍 환경에서 코드의 구조를 보다 명확하게 하고 상수 값을 일관되게 관리할 수 있습니다.

<br>

#### <cpp_h4> OOSolution </cpp_h4><red1_error> (전체 제작 기여도: 100%)</red1_error>

![OO Solution Consol]({{ site.google_drive }}1Aaqh3eJLLXLY5CQVGhhYk7iHi3iKur1I{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<cpp_h6>OO Solution Consol 코드 결과</cpp_h6>*  

![OO solution WinAPI]({{ site.google_drive }}1wSBy89CPw80bh1GprgN_XymJ48BGWfeP{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<cpp_h6>OO Solution 윈도우 프로그래밍 결과</cpp_h6>* 

- 객체지향 프로그래밍(OOP) 원칙(캡슐화, 상속, 다형성 등)을 사용하여 솔루션을 설계 및 구현합니다.
- 클래스를 통해 현실 세계의 엔티티와 그 상호작용을 모델링하고, 유지보수와 확장성을 개선합니다.

<br>

#### <cpp_h4> VisitorSolutionConsol </cpp_h4><red1_error> (전체 제작 기여도: 100%)</red1_error>

![Visit Solution Consol]({{ site.google_drive }}1KAAeBlGEJ0HS1VKR1AYvAdjAzItmU0UT{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<cpp_h6>Visit 패턴 Consol 코드 결과</cpp_h6>* 

![Visit Solution WinAPI]({{ site.google_drive }}1aRWc74Xtcu8q8RLZcOHj7QISzYWM-xUl{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<cpp_h6>Visit 패턴 윈도우 프로그래밍 결과</cpp_h6>* 

- 방문자 디자인 패턴을 사용하여 알고리즘을 객체의 구조로부터 분리하였습니다. 이는 새로운 연산을 추가할 때 객체 구조를 변경하지 않도록 합니다.
- 복잡한 계층 구조로 인한 유지보수 문제를 해결하고, 객체 타입과 연산 로직을 분리하여 코드의 유연성을 높입니다.

<br>

#### <cpp_h4> VariantSolutionConsol </cpp_h4><red1_error> (전체 제작 기여도: 100%)</red1_error>

![Variant Solution Consol]({{ site.google_drive }}1ICQa7O0lDa7asgP2eShwN3cPyAEQH6QW{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<cpp_h6>std::variant 패턴 Consol 코드 결과</cpp_h6>* 

![Variant Solution WinAPI]({{ site.google_drive }}1vXLP3YIxg68GBLrXXqnMpUebPWcXfUcj{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<cpp_h6>std::variant 패턴 윈도우 프로그래밍 결과</cpp_h6>* 

- std::variant를 사용하여 코드의 안전성과 가독성을 높이는 기법입니다.
- 다양한 타입이나 상태를 타입 안전하게 표현할 수 있으며, 함수형 프로그래밍의 장점을 도입하여 코드의 유연성과 안정성을 확보합니다.

<br>

### <cpp_h3> Generators_Coroutine ver.2 </cpp_h3><red1_error> (전체 제작 기여도: 100%)</red1_error>

C++20에 도입된 코루틴을 바탕으로 Generators Coroutine을 만들어 활용하는 코드입니다. 코루틴을 통해 비동기 작업을 보다 효율적으로 관리할 수 있습니다.

<br>

#### <cpp_h4> GeneratorCoroutine </cpp_h4><red1_error> (전체 제작 기여도: 100%)</red1_error>

![Generator Coroutine]({{ site.google_drive }}1UmvN-i0zggqXu75PjuqGiYFJWjcdeZma{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<cpp_h6>Generator Coroutine 코드 결과</cpp_h6>*  

Cppcon 내용을 바탕으로 가장 기초적인 Generator Coroutine을 작성한 코드입니다. 이 코드는 코루틴의 기본적인 구조와 동작 방식을 이해하는 데 도움이 됩니다.

<br>

#### <cpp_h4> GeneratorCoroutine2 </cpp_h4><red1_error> (전체 제작 기여도: 100%)</red1_error>

![GeneratorCoroutine2]({{ site.google_drive }}1ykguLf4R6agMgcALmOpvIi7WlyyhPHBp{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<cpp_h6>Generator Coroutine2 코드 결과</cpp_h6>* 

기본적인 Generator Coroutine에 반복자 오퍼레이터를 추가한 코드입니다. 이를 통해 코루틴이 반복자처럼 작동하게 하여 보다 직관적인 데이터 처리가 가능합니다.

<br>

#### <cpp_h4> GeneratorCoroutine3 </cpp_h4><red1_error> (전체 제작 기여도: 100%)</red1_error>

![GeneratorCoroutine3]({{ site.google_drive }}1v9eafmqeyOY1Mqv2c4QqBbymV2fOB553{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<cpp_h6>Generator Coroutine3 코드 결과</cpp_h6>* 

해당 코드에는 게으른 초기화(lazy initialization)가 추가되었습니다. 게으른 초기화는 필요한 시점에 객체를 초기화하여 초기화 비용을 절감하고 성능을 향상시킬 수 있습니다.

<br>

#### <cpp_h4> FiboCoroutine </cpp_h4><red1_error> (전체 제작 기여도: 100%)</red1_error>

![FiboCoroutine]({{ site.google_drive }}16RSyygqHNyJHxvoO57Ldq14aw4DWcIfq{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<cpp_h6>Fibo Coroutine2 코드 결과</cpp_h6>* 

Generator Coroutine을 사용하여 피보나치 수열을 생성한 코드입니다. 이 코드는 코루틴의 장점을 실용적으로 활용하는 예시로, 피보나치 수열의 계산을 간결하고 효율적으로 구현합니다.

<br>

#### <cpp_h4> FIboRecursion </cpp_h4><red1_error> (전체 제작 기여도: 100%)</red1_error>

![FIboRecursion]({{ site.google_drive }}1kI8GUJQ3AVV6DzzdZxkTl0vrUZLnT5TO{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<cpp_h6>Fibo 제귀용법 코드 결과</cpp_h6>* 

Generator Coroutine을 활용하기 전에 재귀용법을 사용하여 만든 피보나치 수열 코드입니다. 이 코드는 전통적인 재귀 방식을 사용하여 피보나치 수열을 생성하지만, 성능이 상대적으로 떨어집니다.

<br>

#### <cpp_h4> FiboAlgorithm </cpp_h4><red1_error> (전체 제작 기여도: 100%)</red1_error>

![FiboAlgorithm]({{ site.google_drive }}19y4ZVdyPuMjhtw63nh5wPbmER9GVxf7i{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<cpp_h6>Fibo 알고리즘 변형 코드 결과</cpp_h6>* 

Generator Coroutine을 활용한 코드의 성능을 비교하기 위해 제작한 코드입니다. 재귀용법 코드는 성능이 너무 느려서 알고리즘을 변형하여 성능을 개선했습니다. 이를 통해 코루틴 기반 피보나치 수열 생성의 효율성을 강조합니다.

<br>

### <cpp_h3> Atomic_Smarter_Point ver.3 </cpp_h3><red1_error> (전체 제작 기여도: 100%)</red1_error>

해당 프로젝트는 원자 스마트 포인터를 보면서 작성한 코드입니다.

<br>

#### <cpp_h4> Atomic_Smart_Pointer </cpp_h4><red1_error> (전체 제작 기여도: 100%)</red1_error>

![Atomic Smart Pointer]({{ site.google_drive }}1oYogHvaOJ-_85C4SqMZkyFg3spgBz9WG{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<cpp_h6>Atomic Smart Pointer 실행 코드</cpp_h6>*  

여러 스레드가 동시에 작업할 수 있는 스레드 안전한 스택(concurrent_stack)을 보여줍니다.

- 스레드 안전성: 스택 연산(push_front 및 pop_front)은 std::atomic과 compare_exchange_weak을 사용하여 스레드 안전성을 보장합니다.
- 동시성: 여러 스레드를 사용하여 요소를 동시에 추가 및 제거하여 다중 코어의 이점을 활용합니다.
- 자원 관리: std::shared_ptr를 사용하여 적절한 메모리 관리 및 메모리 누수를 방지합니다.
- 타이밍: Sleep(5000) 함수 호출로 특정 작업 전후에 스택의 상태를 관찰할 수 있도록 지연을 추가합니다.

<br>

#### <cpp_h4> SimpleAtomic </cpp_h4><red1_error> (전체 제작 기여도: 100%)</red1_error>

![Simple Atomic]({{ site.google_drive }}16R7uuuOHCVU8q7tMCQLq86LwG-617PFB{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<cpp_h6>Simple Atomic 실행 코드</cpp_h6>*  

std::atomic을 사용하여 원자적 연산을 수행하는 AtomicInt 클래스를 구현합니다. 단순한 atomic 변수를 사용하여 어떻게 연산을 수행하는지를 잘 나타냅니다. 

- 원자적 읽기 및 쓰기: load()와 store() 함수는 원자적으로 값을 읽고 쓰기 위해 사용됩니다. std::memory_order_seq_cst는 가장 강력한 메모리 순서를 제공하여 모든 스레드에서 일관된 순서를 보장합니다.
- CAS: compare_exchange 함수는 비교 교환 연산을 수행합니다. 이 연산은 다중 스레드 환경에서 흔히 사용되며, 값이 기대 값과 같을 때만 값을 바꾸고 그렇지 않으면 기대 값을 현재 값으로 업데이트하여 실패를 알립니다. 이 연산은 경쟁 상태에서 안전하게 값을 업데이트하는 데 유용합니다.

<br>

#### <cpp_h4> Atomic </cpp_h4><red1_error> (전체 제작 기여도: 100%)</red1_error>

![Atomic]({{ site.google_drive }}1XgbIUZf1dQCs7MafqLckh_dtLe4uMx00{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<cpp_h6>Atomic 실행 코드</cpp_h6>*  

해당 코드는 앞선 프로젝트 SimpleAtomic에서 std::atomic을 사용하였지만 std::atomic을 사용하지 않고 WinAPI를 사용하여 구현한 코드 예제입니다.
원자적 연산은 다중 스레드 환경에서 동시에 실행되어도 데이터 일관성을 유지할 수 있는 연산을 의미합니다. 이 코드는 Interlocked 함수를 이용하여 원자적 연산을 구현합니다. ~~(아티클 작성하려다가 포기한 코드입니다.)~~

AtomicInt 클래스 :
  - volatile LONG value : Windows의 원자적 연산 함수들이 사용되는 LONG 타입의 변수를 선언합니다.
  - load() : InterlockedCompareExchange를 사용하여 현재 값을 원자적으로 읽습니다.여기서는 InterlockedCompareExchange(const_cast<LONG*>(&value), 0, 0)를 통해 현재 값을 읽어옵니다.
  - store(int newValue) : InterlockedExchange를 사용하여 원자적으로 값을 저장합니다.이는 value를 newValue로 설정합니다.
  - compare_exchange(int& expected, int desired) : InterlockedCompareExchange를 사용하여 CAS 연산을 수행합니다.value가 expected와 같다면 desired로 설정하고 true를 반환합니다.그렇지 않으면 false를 반환하고 expected를 현재 값으로 업데이트합니다.

main 함수 :
  - AtomicInt 객체를 생성하고, CAS 연산을 시도한 후 값을 읽고 저장하는 예제를 보여줍니다.

추가 설명
  - InterlockedCompareExchange는 value가 expected와 같다면 desired로 설정하고, 그렇지 않으면 현재 값을 반환합니다.
  - InterlockedExchange는 value를 newValue로 설정하고, 이전 값을 반환합니다.

<br>

#### <cpp_h4> LockFreeStack </cpp_h4><red1_error> (전체 제작 기여도: 100%)</red1_error>

![Lock-Free Stack]({{ site.google_drive }}1whGRoMbJN6cl71YSWJ-4cj-ZVaT_jQ90{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<cpp_h6>Lock-Free Stack 실행 코드</cpp_h6>*  

해당 코드는 위의 Atomic 프로젝트를 활용하여 스레드가 동시에 작업할 수 있는 스레드 안전한 스택 Lock-Free Stack을 구현한 코드입니다.

Node 구조체 :
  - Node 구조체는 스택의 각 노드를 나타냅니다.각 노드는 데이터(data)와 다음 노드를 가리키는 포인터(next)를 가집니다.

ConcurrentStack 클래스 :
  - Node * head : 스택의 머리 노드를 가리키는 포인터입니다.
  - push(T value) : 새로운 노드를 스택에 추가합니다.InterlockedCompareExchangePointer를 사용하여 머리 노드를 원자적으로 업데이트합니다.
  - pop(T& result) : 스택에서 노드를 제거하고, 제거된 노드의 데이터를 반환합니다.InterlockedCompareExchangePointer를 사용하여 머리 노드를 원자적으로 업데이트합니다.
  - isEmpty() const : 스택이 비어 있는지 확인합니다.

main 함수 :
  - ConcurrentStack<int> 객체를 생성하고, 값을 스택에 추가(push)한 후, 스택에서 값을 제거(pop)하여 출력합니다.

주의사항
  - InterlockedCompareExchangePointer 함수는 32비트와 64비트 시스템에서 모두 작동합니다.이 함수는 void* 포인터 타입을 사용하므로 이를 Node * 타입으로 캐스팅해야 합니다.
  - Interlocked 함수들은 원자적 연산을 보장하지만, 이러한 구현은 여전히 고도의 동기화와 정확성을 요구합니다.

<br>

### <cpp_h3> Lambda ver.4 </cpp_h3><red1_error> (전체 제작 기여도: 100%)</red1_error>

cpp11~cpp20 까지 함수형 언어인 람다를 연습하기 위해서 제작한 코드입니다.

<br>

#### <cpp_h4> LambdaAlgorithm </cpp_h4><red1_error> (전체 제작 기여도: 100%)</red1_error>

![Sort Algorithm]({{ site.google_drive }}1C_zSQAxbxMwIUlTL3ZeCEqHtzrRITakf{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<cpp_h6>Sort Algorithm 코드 결과</cpp_h6>*  

![Lambda Algorithm]({{ site.google_drive }}1Kp7EQL4-ElbjcVsTBWMFQHCIOWmyfymP{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<cpp_h6>Lambda Algorithm 코드 결과</cpp_h6>*  

sort 정렬에서 전역함수를 사용하여 걸린 시간과 람다를 사용하여 걸린시간을 비교하기 위해 제작 한 프로젝트입니다.

<br>

#### <cpp_h4> HellowLambda </cpp_h4><red1_error> (전체 제작 기여도: 100%)</red1_error>

![Hellow Lambda]({{ site.google_drive }}1A1p7EyDi8-7P49mmeXQElcLXI-jotKbs{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<cpp_h6>Hellow Lambda 코드 결과</cpp_h6>*  

명령어 언어와 함수형 언어를 비교하기 위해 제작한 코드입니다.

<br>

#### <cpp_h4> LambdaCpp11 </cpp_h4><red1_error> (전체 제작 기여도: 100%)</red1_error>

![Lambda Cpp11]({{ site.google_drive }}1_7fRS-F3NiOwnV5SkiUgnZ0q_GnbvIIA{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<cpp_h6>Lambda Cpp11 코드 결과</cpp_h6>*  

cpp11에서 사용되는 람다 함수들을 정리하여 작성한 코드입니다.

<br>

#### <cpp_h4> LambdaCpp14 </cpp_h4><red1_error> (전체 제작 기여도: 100%)</red1_error>

![Lambda Cpp141]({{ site.google_drive }}1bPzjIH4pOKaWW2p3D5qSFr6Kfz6GE1aA{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<cpp_h6>Lambda Cpp14 코드 결과</cpp_h6>*  

cpp14에서 사용되는 람다 함수들을 정리하여 작성한 코드입니다.

<br>

#### <cpp_h4> LambdaCpp17 </cpp_h4><red1_error> (전체 제작 기여도: 100%)</red1_error>

![Lambda Cpp17]({{ site.google_drive }}1zDLnzvwils8zVFwdlv6ARQqE2nfN2aLR{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<cpp_h6>Lambda Cpp17 코드 결과</cpp_h6>*  

cpp17에서 사용되는 람다 함수들을 정리하여 작성한 코드입니다.

<br>

#### <cpp_h4> LambdaCpp20 </cpp_h4><red1_error> (전체 제작 기여도: 100%)</red1_error>

![Lambda Cpp20]({{ site.google_drive }}1H82Gh0CL4ibfXmX7LSpuy1wpEykOPann{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<cpp_h6>Lambda Cpp20 코드 결과</cpp_h6>*  

cpp20에서 사용되는 람다 함수들을 정리하여 작성한 코드입니다.

<br>
<br>

## <cpp_h2> 결과(성과) 및 데모 </cpp_h2>

- <span><cpp_h5>성과:</cpp_h5> CppCon22 연습용 예제 </span>
- <span><cpp_h5>깃허브(코드): </cpp_h5>[https://github.com/kj1241/Algorithm_Portfolio/tree/main/Cppcon22](https://github.com/kj1241/Algorithm_Portfolio/tree/main/Cppcon22)</span>

<br>
<br>

## <cpp_h2> 비고 및 여담 </cpp_h2>

- 배운점 

  - 이번 프로젝트를 통해 최신 C++ 표준(C++11, C++14, C++17, C++20)의 다양한 기능들을 직접 활용하고, 각 기능들의 장단점을 체험할 수 있었습니다. 특히, C++20의 코루틴과 같은 최신 기능을 활용하여 비동기 프로그래밍의 효율성을 경험하였고, std::variant와 방문자 패턴을 통해 코드의 가독성과 유지보수성을 크게 향상시킬 수 있었습니다. 이러한 경험은 앞으로의 C++ 프로그래밍에서 매우 유용하게 쓰일 것입니다.

  - 원자 스마트 포인터와 같은 고급 기법을 사용하여 멀티스레드 환경에서의 안전한 자원 관리를 실습하였습니다. 이 과정에서 스레드 안전성을 확보하는 다양한 방법들을 배웠고, 이러한 기술들이 실제 프로젝트에서 어떻게 적용될 수 있는지를 이해하게 되었습니다.

	
- 여담
  - 이번 프로젝트를 진행하면서 C++의 깊이와 넓이를 다시 한 번 느낄 수 있었습니다. CppCon22에서 소개된 여러 가지 기법들을 직접 코드로 구현해보는 과정은 매우 흥미로웠고, 동시에 많은 도전과제를 제공했습니다. 특히, Generators Coroutine과 같이 처음 접해보는 개념들을 구현하고 테스트하는 과정에서 많은 시행착오가 있었지만, 그만큼 큰 성취감을 느낄 수 있었습니다.