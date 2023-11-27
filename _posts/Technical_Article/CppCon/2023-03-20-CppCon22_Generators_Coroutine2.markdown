---
layout: post
title:  "Generators 코루틴 2 Generator 분석"
date:   2023-03-20 13:06:54 +0900
image: https://github.com/kj1241/kj1241.github.io/assets/22047442/b27622b3-9c20-4ed0-943a-604cbf70bb62
toc: true
categories: [CppCon]
tags: [C++, Cppcon22, Generators Coroutine , Coroutine, C++20]
addsence: true


---

비동기 프로그래밍 방법 혹은 코루틴 개념을 알고 싶은 분들은 앞의 파트 1 내용만 보시면 됩니다.  
이 파트의 내용은 정말로 코드를 작성하는 데 있어서 크게 영향을 미치는 부분이 아닙니다.  
<br>

---

<br>
<h2><blue1_h2> 4. Naive Generator 분석 </blue1_h2></h2>
Generator의 구현버전은 정말 많습니다.  
캐싱을 이용하여 구현한 버전, 일반적으로 함수를 돌리는 버전 등 다양하게 존재합니다.  
그래서 외국이나 다른 곳에서 검색하면 미묘하게 구현 방법이 다릅니다.  
저는 Cppcon에서 공개된 버전으로 가져왔습니다.  
~~(이 방법이 개인적으로 괜찮아 보였기 때문입니다.)~~

```c++
template<typename T>
class Generator {  // 컴파일러는 'co_yield' 키워드의 존재로 코루틴을 인식합니다.
public:
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

			return (std::holds_alternative<T>(result)) ? std::get<T>(result) : *std::get<T*>(result);
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

```



<br>
<h3><blue1_h3> 1) Generator </blue1_h3></h3>
Generator는 C++20에서 코루틴을 정식으로 지원하기 전부터 사용했던 명칭입니다.  
yield로 코루틴을 구성하면 앞에 Generator를 붙이고 awake로 코루틴을 구성하게 되면 task로 보통 구문 작성을 합니다. 
물론 다른 이름을 붙여도 되지만 다른 사람들과 같이 작업을 하기 위해서는 이름을 사용하는 편이 좋다고 생각합니다.  
(C++23 문서를 확인해 본 결과 VS에서 템플릿으로 std::generator을 지원한다고 합니다.)


<br>
<h3><blue1_h3> 2) stackless</blue1_h3></h3>
코루틴 내부로직을 깊게 들어가면 좀 더 복잡한 이야기를 해야 합니다.  
stackful과 stackless 용어가 나옵니다.  
처음 접하시는 분들은 용어가 생소하고 낯설게 느껴지는 게 당연합니다.  
이는 내부적 구현 차이입니다.  
  

Java, python, c#으로 코루틴 작업을 하신 분들은 코루틴이 stackless로 이루어져 있습니다.  
반면 lua, Boost.Fiber는 내부적으로 코루틴이 stackful로 이루어져 있습니다.  
C++20에서 지원하는 코루틴은 stackless입니다.  
  

stackful, stackless 이름만 보면 반대되는 상황인 것 같지만, 내부 구현은 전혀 다릅니다.  
자세한건 하드웨어 아키텍처를 보고 이야기해야하지만 간략하게 알아봅시다.  
Stackful Coroutine은 자체적으로 코루틴이 스택을 가지고 있는 경우를 말합니다.  
그렇기 떄문에 외부에서 실행되는 중간 함수들을 중단 할수 있습니다.  
stackless Coroutine은 내부 스택을 사용하며, 코루틴 데이터를 힙에 할당하게 됩니다.  
최상위 함수에서만 코루틴을 중단 시킬 수 있습니다.  
stackful처럼 동시다발적으로 메모리 할당을 하지 않기 때문에 문맥교환이 적기 떄문에 stackless의 성능이 더 빠르다고 이야기 할 수 있습니다.
대신 단점은 독립적은 스택을 사용하지 않음으로 스택의 수명은 객체의 수명만큼 유지됩니다.  


<br>
<h3><blue1_h3> 3) 동작 코드</blue1_h3></h3>
대략적으로 내부가 어떻게 구성돼야 되는지 확인하였습니다.  
위의 stackless를 당연하게 생각하시는 분도 있고 이해되지 않으시는 분들도 있을 것입니다.  
코드를 집어가면서 다시 한번 이야기하겠습니다.  
stackless 코루틴은 중단 재개 기능을 가지고 있을 뿐, 크게 어려울 것이 없습니다.  
그럼 코루틴의 동작 과정을 살펴보겠습니다.  

(1) 초기 부분
![코루틴](https://github.com/kj1241/kj1241.github.io/assets/22047442/e39564c7-6e03-4308-8fdc-2fc9f0935c97){: width="100%" style="aspect-ratio:16/9"}

1. 메인함수에서 객체 foo()를 생성합니다.
2. Generator 객체를 생성하게 됩니다.
	- promise_type이라는 데이터 구조체를 Generator의 coroutine_handle 힙에 할당하게 됩니다.
	- promise_type의 initial suspend 위치는 그림과 같이 위치하게 됩니다.

<br>  
(2) 루틴실행
![루틴실행](https://github.com/kj1241/kj1241.github.io/assets/22047442/5d25266f-dc47-411a-9d33-5838f719cb51){: width="100%" style="aspect-ratio:16/9"}

1. 오퍼레이터로 f()를 호출합니다.
2. coroutine_handle에 정의돼 있는 coro()에 의해 Generaotr 함수가 스택으로 호출합니다.
3. 그 후 co_yield, co_awake, co_return를 만나게 될 때까지 코드를 진행하게 됩니다.
	- stackless 코루틴임으로 Generator 함수 안에서는 코루틴 시작점 main이 아님으로 코루틴을 정지 혹은 재개 혹은 동작시킬 수 없습니다.
4. co_yield 구분으로 suspend_aways 코드를 부르고 coroutine_handle안에 데이터를 저장하게 됩니다.
5. 함수를 호출했던 스택을 리턴 시킵니다.
6.  coroutine_handle 값을 참조하여 값을 리턴 시킵니다.

<br>
(3) 반복 루틴
![반복](https://github.com/kj1241/kj1241.github.io/assets/22047442/6dd56e0e-5e58-4e6e-a084-5674dffed6be){: width="100%" style="aspect-ratio:16/9"}

위의 로직과 비슷하게 동작을 반복합니다.

<br>
(4) 강제로 만약 코루틴을 한번 더 호출하게 되면(CppCon 코드 기반)
![종료](https://github.com/kj1241/kj1241.github.io/assets/22047442/b27622b3-9c20-4ed0-943a-604cbf70bb62){: width="100%" style="aspect-ratio:16/9"}
1. 오퍼레이터로 f()를 호출합니다.
2. coroutine_handle에 정의돼 있는 coro()에 의해 Generaotr 함수가 스택으로 호출합니다.
3. 아직 스택이 종료되지 않았으므로 코드가 진행하게 됩니다. 끝나면 final suspend를 지정해 줍니다.
4. 코드가 끝났으므로 retrun_void 코드로 들어가게 됩니다.(co_retrun도 같은 맥락입니다.)
5. 그 후 스택을 종료시키고 저장한 값을 리턴합니다.


그럼 다음과 같이 결과 화면이 보여집니다.
![결과](https://github.com/kj1241/kj1241.github.io/assets/22047442/d630bb9e-45e6-4784-a202-0cd09029ccb9){: width="100%" style="aspect-ratio:16/9"}

이후에 한 번 더 함수를 호출하게 되면 맨 위의 문제와 같이  호출할 수 있는 코루틴 스택이 없음으로 try_catch에 들어가지 않고 프로그램이 터져 버립니다.

위와 같은 상황을 방지하기 위해서 코루틴 함수가 종료되었거나 예외 상황인지 확인하는 코드가 존재합니다.  
Advence() = 코루틴이 동작하지 않거나 예외상황인지 확인해 주는 코드입니다.  
GetValue() = 값을 가져오는 코드입니다.  

![코루틴 호출 예시](https://github.com/kj1241/kj1241.github.io/assets/22047442/44666fe4-e522-490d-8d4c-5c586ddacced){: width="80%"}

<!-- $ echo -e "<details><summary>Collapsed Block\n</summary>\n\n## Header\n</details>" | kramdown --parse-block-html -->
<details markdown=1>
<summary>코루틴 개조하다 망해버린 버전</summary>
 

2023.02.20 cppcon 바탕으로 위에 일어나는 에러가 싫어서 로직을 try_catch으로 들어갈 수 있게 코드를 수정하였습니다.  
하지만 이 또한 잘못된 버전 만들었다는 것을 깨달았습니다.  

```c++
#include <iostream>
#include <coroutine>
#include <exception>
#include <iostream>
#include <variant>
#include <stdexcept>
#include <cassert>

template<typename T>
struct Generator {  // 컴파일러는 'co_yield' 키워드의 존재로 코루틴을 인식합니다.
public:
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
		void return_void() noexcept
		{
			plugAlive=(plugAlive)? false: true;
		}
		bool hasException() //예외가 있는지 확인
		{
			return std::holds_alternative<std::exception_ptr>(result);
		}
		bool isValueInitalized() const noexcept  //데이터 팩토링 값 초기화
		{ 
			return !std::holds_alternative<std::monostate>(result);  //모노상태가 아닌지 확인하고 비어있지 않음을 시사
		}
		T& getValue()
		{
			return (std::holds_alternative<T>(result) && plugAlive) ? std::get<T>(result) : *std::get<T*>(result);
		}
		void throwIfException()
		{
			if (hasException())
				std::rethrow_exception(std::get<std::exception_ptr>(result));
		}

	private:
		bool plugAlive = true;
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
		coro.promise().throwIfException();
		return coro.promise().getValue();
	}

	bool hasException() const noexcept
	{
		return coro.promise().hasException();
	}

	T operator()()const
	{
		coro(); //coro.resume() 이랑 같음
		coro.promise().throwIfException();
		return coro.promise().getValue();
	}



private:
	explicit Generator(promise_type& promise) noexcept : coro(std::coroutine_handle<promise_type>::from_promise(promise)) {};
	handle_type coro;
};

Generator<std::string> foo(std::string greeting)
{
	co_yield greeting;

	const auto s = std::string{ "world" };
	
	co_yield s;
}

int main()
{
	Generator<std::string> const f = foo("hello");

	std::cout << f() << "\n";
	std::cout << f() << "\n";

	try
	{
		std::cout << f() << "\n";
	}
	catch (const std::exception e)
	{
		std::cout << "exception: " << e.what() << "\n";
	}
	return 0;
}
```
![불법개조](https://github.com/kj1241/kj1241.github.io/assets/22047442/e651237e-1ac6-42f3-a707-be9ed6bac6f9){: width="100%" style="aspect-ratio:16/9"}

![불법개조_결과물](https://github.com/kj1241/kj1241.github.io/assets/22047442/2ff645e2-ea25-4810-ad59-e0096c69e6b7){: width="100%" style="aspect-ratio:16/9"}

![실행_코드](https://github.com/kj1241/kj1241.github.io/assets/22047442/b0466596-e6c2-4b55-a83f-220a32f9f3f1){: width="100%" style="aspect-ratio:16/9"}

- 로직 자체을 생각한 이유:
	- 코드를 잘못 사용해도 try_catch 문으로 코드의 에러를 잡기 위해서 작성했습니다.
	- co_return에 의하여 코드를 반복 사용하게 될 경우 프로그램이 정지하는 상황을 막을 수 있도록 설계하였습니다.
	- 코루틴 함수가 종료되면 co_return을 일으킬 수 있기 때문에 co_return의 중간 사용을 배제하였습니다.


- 로직 자체가 틀린 이유
	-  co_return 위의 로직으로 코드를 작성하게 되면 프로그램이 멈추게 됩니다.(너무 단순하게 생각했다.)

- 결론
	-  Advence()  코드를 사용하여 에러와 코루틴이 종료되었는 확인하는 방어적 코드를 작성하세요.
	(시간나면 추후 다시 생각해볼 예정)

</details>




<br>
<h2><blue1_h2> 5. 문제점 </blue1_h2></h2>
코루틴을 남발할 경우 힙에 데이터를 할당하게 됨으로 **동적메모리 할당**이 많아지게 됩니다.  
그럼 문제점이 무엇인가 하면 코루틴 함수의 수명주기는 객체의 수명주기와 같게 됩니다.  
이 말은 객체 해제되지 않으면 코루틴도 해제되지 않습니다.  
C#에는 가비지 컬렉터가 존재해서 신경 쓸 필요가 없었지만, C++ 좀 더 생각해 봐야 되는 문제라고 생각합니다.  

~~(어차피 C++23에서 std::generator 나오면 알아서 다 해결해 주겠지...)~~ 

  
  
저는 이만 IOCP에서 코드를 사용할 수 있는지 언리얼에서 플러그인으로 만들 수 있는 확인해보로 가겠습니다.  
읽으시느라 고생 많으셨습니다.  
언제나 틀린 점은 지적은 환영합니다.  