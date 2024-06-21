---
layout: post
title: "C++, Generators 코루틴 - 1 코루틴 이해"
date: 2023-03-17 08:58:07 +09:00
image: https://drive.google.com/thumbnail?id=1W4TCYw-awdDHHLA0pq45nKwH4X5Dz9Iv
toc: true
categories: [CppCon]
keywords: C++, Cppcon, Cppcon22, Generators Coroutine , Coroutine, C++20
lastmod: 2024-06-21 09:00:00 +09:00
sitemap:
  changefreq : daily
  priority : 1.0
addsence: true
excerpt: C++20의 코루틴에 대한 기본 개념과 예제를 다룬 글입니다. 코루틴은 동시성 프로그래밍을 위한 유용한 도구로, 가볍고 효율적인 비동기 프로그래밍을 가능케 합니다. 기본적인 코루틴 이론부터 C++에서의 구현과 활용까지 상세히 설명되어 있습니다.
related_links:
  - url: /algorithm/CppCon22Example.html
  - url: /cppcon/CppCon22_Generators_Coroutine2.html
  - url: /cppcon/CppCon22_Generators_Coroutine3.html
---

## <cpp_h2>1. 주제: Breaking Dependencies</cpp_h2>

이번 분석은, CppCon에서 발표된 [Understanding C++ Coroutines by Example: Generators](https://www.youtube.com/watch?v=lm10Cj-HNKQ&list=PLHTh1InhhwT6c2JNtUiJkaH8YRqzhU7Ag&index=97) 으로 가져왔습니다. 해당 내용을 참조하여 분석해 보겠습니다.

C#, Python 유니티를 사용하시는 분들은 코루틴에 관해서 익숙하시겠지만, C++은 C++20부터 코루틴을 사용할 수 있습니다. (언리얼에서 코루틴을 가능한지는 사용해 보고 알려 드리도록 하겠습니다.) 코루틴의 예제와 함께, 제가 가지고 있는 지식을 녹여 보도록 하겠습니다.

<br>
<br>

## <cpp_h2>2. 코루틴 이론</cpp_h2>

C++20 코루틴을 살펴보기전에 기본적인 코루틴 이론에 관해서 이야기하고 넘어 가겠습니다.

<br>

### <cpp_h3>1) 코루틴의 정의</cpp_h3>

Coroutine 어원은 co + routine으로 co는 협동이라는 의미가 있습니다. 즉, 협동 루틴(패턴)입니다. 코루틴(coroutine)은 동시성 프로그래밍에서 사용되는 개념 중 하나로, 여러 실행 흐름을 갖는 함수입니다. 코루틴은 일반적인 함수와 다르게 실행을 일시 중지하고 재개할 수 있습니다. 이로써 여러 작업 간에 효율적으로 전환하면서 비동기적인 프로그래밍을 구현하는 데 유용합니다.

<br>

### <cpp_h3> 2) 코루틴이 최근 주목받는 이유 </cpp_h3>

이유는 간단합니다. 스레드보다 가볍기 때문입니다. 조금 TMI를 이야기하자면 스마트폰 초창기 시절 유니티로 게임을 제작할 때 스레드를 사용하지 말라는 소리를 많이 들었을 것입니다. 그 이유는 유니티는 모바일을 위주로 사용하던 엔진인데, 당시 모바일의 하드웨어의 성능이 좋지 않았기 때문입니다. 그렇기 때문에 동시성 프로그래밍하기 위해서 스레드보다 코루틴을 많이 사용하였습니다. 하지만 요즘에는 스마트 폰의 성능이 좋아져서 스레드도 돌리는 것으로 알고 있습니다.

<br>

### <cpp_h3>3) 코루틴의 방식</cpp_h3>

병렬처리 방식에 관해서 이야기하려면 먼저 코루틴이 어떻게 동작하는지 알아야 합니다. 코루틴은 C 분할 운영체제에서 병렬 처리하는 방식과 비슷합니다. 그럼 옛날 방식의 코루틴을 살펴봅시다.

<br>

![코루틴 시퀀스]({{ site.google_drive }}1W4TCYw-awdDHHLA0pq45nKwH4X5Dz9Iv{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<cpp_h6>코루틴 시퀀스</cpp_h6>*  

시퀀스를 살펴보면 다음과 같습니다. ~~(대충 만들어서 허접합니다.)~~
  
메인 함수에서 코루틴 함수를 콜 하게 되면 코루틴 함수가 실행되고 콜백으로 메인함수에 값을 전달받게 됩니다. 그럼 스케줄러에는 메인함수와 코루틴 함수가 반복적으로 동작하게 됩니다. 여기서 가장 스레드와 다른 점은 프로그래머가 스케줄러를 컨트롤할 수 있다는 점입니다. 로직으로 콜을 하지 않으면 점프를 발생시킬 수 있습니다.  
  
그와 반대로 스레드는 운영체제가 관리하는 영역입니다. 물론 Sleep은 프로그래머가 사용하긴 합니다. Sleep 함수를 사용하면 스레드 상태 전의 도처럼 스레드를 지연대기 상태로 만들 수 있습니다. 이마저도 운영체제가 하는 역할입니다.
  
메모리에 관해서 이야기해 봅시다. 코루틴을 만들게 되면 메인의 메모리에 스택 영역만 분할하게 됩니다. 시스템 콜을 통해 커널이 스레드의 실행을 중단하고 다른 스레드로 전환하는 스레드와 달리 코루틴은 자신의 상태를 유지하고 다른 코루틴으로 전환될 때 해당 상태를 복원하기 때문에 코루틴의 문맥 교환의 오버헤드가 좀 더 가볍습니다.  
  
코루틴이 비동기인 이유는 프로세스 안에서 코루틴 함수가 동작을 중단되어도 스케줄러에서 점프가 발생하여 메인함수가 실행되기 때문에 비동기 함수라고 불립니다. 또한, 게임 프로그래밍에서 단일 스레드에서 일어나기 때문에 main 함수와 coroutine 합쳐서 1프레임으로 구성하게 됩니다. ~~(멀티코어 환경에서 일부 언어나 일부 하드웨어에서 동작하는 코루틴이 내부적으로는 스레드로 이루어져 있습니다.)~~

<br>

### **<cpp_h3>4) 요약(코루틴을 사용하는 이유)</cpp_h3>**

- 스레드보다는 가볍게 동시성을 처리할 수 있습니다.
- 스레드에서는 운영체제에 기대했던 스케쥴러를 프로그래머가 조절할 수 있습니다.  


<br>
<br>

## <cpp_h2>3. C++ 코루틴 연습 (C++ 20) </cpp_h2>

코루틴이 지원된다는 소리를 듣고 테스트 코드를 작성하려고 N4680 문서를 보고 코루틴 관련 블로그 작성을 접을까도 생각했습니다. 문서에서는 co_return , co_yield, co_await이 3가지 유형의 프레임 워크만 정의하고 있을 뿐, 코루틴의 구문 자체는 없기 때문입니다. 참고로 C#의 코루틴을 살펴보면 간단하게 코루틴을 작성할 수 있습니다.  

<br>

#### **<cpp_h4>c#:</cpp_h4>**

```c#

IEnumerator Function()
{
	yield return ;
}

```

위의 C#과는 달리 C++의 문제점은 IEnumerator 즉, 열거자의 가상 인터페이스가 존재하지 않는다는 것입니다. (C#의 IEnumerator는 C#의 컬렉션 즉 데이터 변수들이 모두 상속받는 인터페이스로 C#의 클래스는 동적 다형성을 지원하기 때문에 재사용 가능한 알고리즘을 만드는 데 필요합니다.) C++과 C#의 디자인은 엄밀히 말해 다르기 때문입니다. 그럼 우리는 지금까지 나온 회의와 위의 문서에서 주어진 정보를 이용하여 코루틴을 구동시키려면 템플릿 라이브러리를 제작해야 합니다. ~~(C++23에서는 제발 STL로 지원해 줘... )~~  
  
일단 전체 코드를 확인하러 갑시다.

<br>

#### **<cpp_h4>cpp:</cpp_h4>**

```cpp

#include <iostream>
#include <coroutine>
#include <exception>
#include <iostream>
#include <variant>
#include <stdexcept>

template<typename T>
struct Generator {  // 컴파일러는 'co_yield' 키워드의 존재로 코루틴을 인식합니다.
	struct	promise_type
	{
		auto get_return_object() noexcept
		{
			return Generator{ *this };
		}
		std::suspend_always initial_suspend() const noexcept
		{
			return {};
		}
		std::suspend_always final_suspend() const noexcept
		{
			return {};
		}
		void unhandled_exception()noexcept(std::is_nothrow_copy_constructible_v<std::exception_ptr>)
		{
			result = std::current_exception();
		}
		std::suspend_always yield_value(const T& value) noexcept(std::is_nothrow_copy_constructible_v<T>)
		{
			result = value;
			return{};
		}
		std::suspend_always yield_value(T&& value) noexcept
		{
			result = std::addressof(value);
			return{};
		}
		void return_void() const noexcept
		{
		}
		bool hasException()
		{
			return std::holds_alternative<std::exception_ptr>(result);
		}
		T& getValue()
		{
			if (hasException())
				std::rethrow_exception(std::get<std::exception_ptr>(result));

			return std::holds_alternative<T>(result) ? std::get<T>(result) : *std::get<T*>(result);
		}
	private:
		std::variant<std::monostate, T, T*, std::exception_ptr> result;
	};

	using handle_type = std::coroutine_handle<promise_type>;

	Generator(handle_type&& other) noexcept : coro(std::exchange(other.coro, nullptr)) {};
	Generator& operator=(Generator&& other) noexcept
	{
		if (coro)
			coro.destroy();
		coro = std::exchange(other.coro, nullptr);
	}
	~Generator()
	{
		if (coro)
			coro.destroy();
	}
	bool Advence()const noexcept
	{
		coro();
		return !coro.done() || coro.promise().hasException();
	}
	T& GetValue() const
	{
		return coro.promise().getValue();
	}
	bool hasException() const noexcept
	{
		return coro.promise().hasException();
	}
	T operator()()const
	{
		coro(); //coro.resume() 이랑 같음
		return coro.promise().getValue();
	}

private:
	explicit Generator(promise_type& promise) noexcept : coro(std::coroutine_handle<promise_type>::from_promise(promise)) {};


	handle_type coro;
};

Generator<std::string> foo(/*std::string greeting*/)
{
	co_yield "hello";

	const auto s = std::string{ "world" };
	co_yield s;
}

int main()
{
	auto const f = foo();
	/*std::cout << f() << " ";
	std::cout << f() << "\n";
	std::cout << f();*/
	try {
		while (f.Advence())
		{
			if (f.hasException())
			{

			}
			std::cout << f.GetValue() << "\n";
		}
	}
	catch(const std::exception e)
	{
		std::cout << "exception: " << e.what() << "\n";
	}
}

```

![Generator Coroutine]({{ site.google_drive }}1UmvN-i0zggqXu75PjuqGiYFJWjcdeZma{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<cpp_h6>Generator Coroutine 코드 결과</cpp_h6>*  

위의 코드를 visual studio 2019에서 동작을 시키면, 그림과 같은 결과를 얻을 수 있습니다. (프로젝트 속성에서 C++20으로 작동시켜 주세요.) 그러면 "Naive" Generator 부분을 제외하고 위의 c#의 IEnumerator 코드처럼 실질적 동작하는 부분을 알아보도록 합시다.  

<br>

#### **<cpp_h4>cpp:</cpp_h4>**

```cpp

Generator<std::string> foo(/*std::string greeting*/)
{
	co_yield "hello";

	const auto s = std::string{ "world" };
	co_yield s;
}


int main()
{
	auto const f = foo();
	/*std::cout << f() << " ";
	std::cout << f() << "\n";
	std::cout << f();*/
	try {
		while (f.Advence())
		{
			if (f.hasException())
			{

			}
			std::cout << f.GetValue() << "\n";
		}
	}
	catch(const std::exception e)
	{
		std::cout << "exception: " << e.what() << "\n";
	}
}

```

![코루틴_예시]({{ site.google_drive }}1UGhP3_NI3_IXP5VbchfqQhpYVtIhsSPY{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<cpp_h6>코루틴 코드 FOO 함수 예시</cpp_h6>* 

위의 부분은 코루틴을 이용하여 로직을 구성하는 부분입니다.로직과 금을 함께 보시면 이해하기 쉬우실 겁니다. 보통은 update() 로직과 물려야 하므로 코루틴 함수 안에서 while() 작성하는 것이 일반적이긴 합니다만, 동작을 보여주기 위해서 절차적으로 코드를 작성하였습니다.  

  
위의 부분만 알고 있어도 어디 가서 <cpp_h5>"코루틴으로 비동기 프로그래밍 작성할 수 있습니다."</cpp_h5>라고 대답할 수 있습니다. 실제로 유니티에서 사용하는 코루틴은 위의 부분만 인식하고 코드를 작성하면 됩니다. 이 정도 부분만 알고 있으면 비동기 프로그래밍을 작성하는 데 문제가 없기 때문입니다. 

이와 같이 코루틴에 관해서 기초적인 이론을 알아봤습니다.여기서 끝나는 건 너무 아쉬운 일입니다. 코루틴에 관한 다음 편에서는 Generator에 관해서 좀 더 자세하게  이야기할 예정입니다. ~~(아.. 세상에는 왜 이렇게 분석할 내용이 많은지... 할 일이 너무 많아...)~~