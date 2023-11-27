---
layout: post
title:  "Generators 코루틴 3 Generator 인터페이스 구현 및 성능 분석"
date:   2023-03-27 10:58:06 +0900
image: https://github.com/kj1241/kj1241.github.io/assets/22047442/34b1a2c5-165a-49f4-916b-a456d6a64f85
toc: true
categories: [CppCon]
tags: [C++, Cppcon22, Generators Coroutine , Coroutine, C++20]
addsence: true


---


<h2><blue1_h2> 1. 주제: Understanding C++ Coroutines by Example: Generators(Part 2) </blue1_h2></h2>
이번 분석 주제는, CppCon에서  발표된 <a herf= "https://www.youtube.com/watch?v=lz3F036_OvU"> Understanding C++ Coroutines by Example: Generators(Part2)로 가져왔습니다. 
part1에서는 기본적 코루틴 동작에 관해서 설명하였다면, part2에서는 generator로 사용하여 연계할 수 있는 인터페이스 코드들을 구현에 관해서 가져왔습니다.  
위의 동영상에서는 Generator의 인터페이스 구현하는 방법에 대해서 공부할 수 있는 좋은 기회였습니다.  

<br>
<br>
<h2><blue1_h2> 2.iterator (반복자) </blue1_h2></h2>

![기본](https://github.com/kj1241/kj1241.github.io/assets/22047442/34b1a2c5-165a-49f4-916b-a456d6a64f85){: width="100%" style="aspect-ratio:16/9"}

~~(역시 프로그래밍 3D 직업 존경합니다...)~~  
기본적으로 우리가 iterator를 사용하기 위해서는 관련코드를 정의해야 합니다.  
위는 iterator를 사용하는 3가지 방법입니다.  
일단 iterator 인터페이스 구현에 필요한 연산자를 체크해 보도록 합시다.  

![반복자](https://github.com/kj1241/kj1241.github.io/assets/22047442/2bd38c89-0c98-4899-a2a8-ee296ad1a40b){: width="100%" style="aspect-ratio:16/9"}

위의 그림과 같이  Iterator를 사용하려면 3가지 종류의 오퍼레이터를 구현해줘야 합니다.  

<br>
<h3><blue1_h3> 1) != 오퍼레이터 (연산자 오버로딩) 구현 </blue1_h3></h3>
```c++
friend bool operator==(const Iterator&, const Iterator&) noexcept = default;
friend bool operator!= (const Iterator&, const Iterator&) noexcept = default;//c++20 이후로는 안해도됨
```
!= 구현은 비교적 쉽습니다.  
디폴트 형태로 구현하면 됩니다.  
또한 C++ 20부터는 밑의!= 오퍼레이터는 따로 구현 안 해도 동작합니다.  

<br>
<h3><blue1_h3> 2) ★++ 오퍼레이터 (연산자 오버로딩) 구현 </blue1_h3></h3>
```c++
Iterator& operator++()
{
	assert(coro != nullptr);
	assert(!coro->done());
	coro->resume();
	if (coro->done())
	{
		auto coroHandle = std::exchange(coro, nullptr); 
		coroHandle->promise().throwIfException();
	}
	return *this;
}

```

코루틴 함수를 움직이는 실질적 코드가 들어가 있습니다.  
coro->resume()으로 코루틴을 진행하게 됩니다.  
코루틴 함수에서 suspend가 되면 다시 넘어와서 핸들에 상태를 저장하게 됩니다.  
만약 코루틴 핸들 값의 상태가 final_suspend() 상태라면 코루틴 핸들 값을 널로 만들고 예외처리를 해줍니다.  
이렇게 처리한 Iterator를 리턴해 줍니다.  

<br>
<h3><blue1_h3> 3) * 오퍼레이터 (연산자 오버로딩) 구현 </blue1_h3></h3>

```c++
auto& operator* () const noexcept
{
	assert(coro != nullptr);
	assert(!coro->done());
	return coro->promise().getValue();
}
```
++ 오퍼레이터에서 예외를 처리했기 때문에 * 연산자에서는 값을 리턴해주면 됩니다.

![++오퍼레이터](https://github.com/kj1241/kj1241.github.io/assets/22047442/00e8cd4a-710f-4bb9-b399-d0d50439a73c){: width="100%" style="aspect-ratio:16/9"}
오퍼레이터 구현이 끝났으면, 이렇게 구현된 Iterator 구조체를 for문에서 코드를 사용하려면 begin() 함수와 end() 함수가 필요합니다.  


<br>
<h3><blue1_h3> 4) begin() 구현 </blue1_h3></h3>

```c++
Iterator begin() const
{
	if (coro.done())
		return end();

	auto i = Iterator(coro);
	if (!coro.promise().isValueInitalized())
		++i; //*this == end()
	return i;
}

```
이 함수를 설명하기 전에 코루틴 핸들 이 가지는 상태를 설명해야 합니다.  
![begin구현](https://github.com/kj1241/kj1241.github.io/assets/22047442/b4f1ee51-3748-47d5-9aa8-23e2117d0d9a){: width="100%" style="aspect-ratio:16/9"}
처음 코루틴 함수를 부르면 코루틴 핸들은 inital_suspend()의 상태를 가지고 있습니다.  
이런 상태는 값을 리턴해주는 상태가 아님으로 begin() 시작점으로 쓰기 적당하지 않습니다.  
따라서 결과 값이 존재하는지 존재하지 않는지 확인하는 함수를 정의해 줘야 합니다.  

```
bool isValueInitalized() const noexcept  //데이터 팩토링 값 초기화 확인
{ 
	return !std::holds_alternative<std::monostate>(result);  //모노상태가 아닌지 확인하고 비어있지 않음을 시사
}
```

코루틴 핸들의 상태가 initial_suspend() 상태이면 ++ 오퍼레이트를 사용하여 코루틴을 진행시킨 후, 첫 번째 suspend() 상태에서 Iterator를 리턴 시켜줍니다.  
이렇게 코드를 진행시키고 코루틴 핸들이 final_suspend() 상태이면 Iterator를 end()으로 리턴 시켜 줍니다.  


<br>
<h3><blue1_h3> 5) end() 구현 </blue1_h3></h3>
```
Iterator end() const noexcept
{
	return{};
}
```

<br>
<h3><blue1_h3> 6) 전체 코드 및 결과 </blue1_h3></h3>

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
			//plugAlive=false;
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
			return (std::holds_alternative<T>(result) /* && plugAlive*/) ? std::get<T>(result) : *std::get<T*>(result);
		}
		void throwIfException()
		{
			if (hasException())
				std::rethrow_exception(std::get<std::exception_ptr>(result));
		}

	private:
		//bool plugAlive = true;
		std::variant<std::monostate, T, T*, std::exception_ptr> result;
	};

	struct Iterator
	{
		using iterator_catgory = std::input_iterator_tag;
		using difference_type = std::ptrdiff_t;
		using value_type = T;
		using reference = T&;
		using pointer = T*;

		Iterator() noexcept = default;
		explicit Iterator(const std::coroutine_handle<promise_type>& coro) noexcept :coro(&coro) {} //핵심루틴을 위한 반복자
		friend bool operator==(const Iterator&, const Iterator&) noexcept = default;
		friend bool operator!= (const Iterator&, const Iterator&) noexcept = default;//c++20 이후로는 안해도됨
		Iterator& operator++()
		{
			assert(coro != nullptr);
			assert(!coro->done());
			coro->resume();
			if (coro->done())
			{
				auto coroHandle = std::exchange(coro, nullptr); 
				coroHandle->promise().throwIfException();
			}
			return *this;
		}
		auto& operator* () const noexcept
		{
			assert(coro != nullptr);
			assert(!coro->done());
			return coro->promise().getValue();
		}

	private:
		const std::coroutine_handle<promise_type>* coro = nullptr;
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

	Iterator begin() const
	{
		if (coro.done())
			return end();

		auto i = Iterator(coro);
		if (!coro.promise().isValueInitalized())
			++i; //*this == end()
		return i;
	}
	Iterator end() const noexcept
	{
		return{};
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

	//for (auto& i : f)
	//{
	//	std::cout << i << "\n";
	//}

	for (auto it = f.begin(); it != f.end(); ++it)
	{	
		std::cout << (*it) << "\n";
	}

	//auto i = f.begin();
	//while (i != f.end())
	//{
	//	std::cout<<(*i)<<"\n";
	//	++i;
	//}
}

```
![결과](https://github.com/kj1241/kj1241.github.io/assets/22047442/94361216-5554-4e0d-9462-6991262188e9){: width="100%" style="aspect-ratio:16/9"}



<br>
<br>
<h2><blue1_h2> 3.LazeIterator 게으른 초기화 </blue1_h2></h2>
이번 주제 블로그를 작성하지 말까 고민했던 부분입니다.  
이 부분은 동영상에서도 대략적 로직만 설명하고 넘어감으로 저의 생각과 구현이 틀렸을 수도 있습니다.  

(이론은 머릿속으로 하는데 생각보다 다양한 경험이 부족해서 아직 부족하다는 생각이 많이 들었습니다.)  
Generator는 연산이 필요할 때까지 일으킬 필요가 없습니다.  
그렇게 때문에 게으른 연산이 필요합니다.  

```c++
#include <iostream>
#include <coroutine>
#include <exception>
#include <iostream>
#include <variant>
#include <stdexcept>
#include <cassert>
#include <vector>
#include <string>

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
			//plugAlive=false;
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
			return (std::holds_alternative<T>(result) /* && plugAlive*/) ? std::get<T>(result) : *std::get<T*>(result);
		}
		void throwIfException()
		{
			if (hasException())
				std::rethrow_exception(std::get<std::exception_ptr>(result));
		}

	private:
		//bool plugAlive = true;
		std::variant<std::monostate, T, T*, std::exception_ptr> result;
	};

	struct LazyIterator
	{
		using iterator_catgory = std::input_iterator_tag;
		using difference_type = std::ptrdiff_t;
		using value_type = T;
		using reference = T&;
		using pointer = T*;

		LazyIterator() noexcept = default;
		explicit LazyIterator(const std::coroutine_handle<promise_type>& coro) noexcept :coro(&coro) {} //핵심루틴을 위한 반복자
		friend bool operator==(const LazyIterator&, const LazyIterator&) noexcept = default;
		friend bool operator!= (const LazyIterator&, const LazyIterator&) noexcept = default;//c++20 이후로는 안해도됨
		LazyIterator& operator++() noexcept
		{
			assert(coro != nullptr);
			assert(!coro->done());
			coro->resume();
			if (coro->done() && !coro->promise().hasException())
			{
				coro = nullptr;
			}
			return *this;
		}
		auto & operator*() const
		{
			assert(coro != nullptr);
			coro->promise().throwIfException();
			return coro->promise().getValue();
		}
		friend bool hasException(const LazyIterator& i) noexcept
		{
			return i.coro && i.coro->promise().hasException();
		}

	private:
		const std::coroutine_handle<promise_type>* coro = nullptr;
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

	LazyIterator begin() const
	{
		if (coro.done())
			return end();

		auto i = LazyIterator(coro);
		if (!coro.promise().isValueInitalized())
			++i; //*this == end()
		return i;
	}
	LazyIterator end() const noexcept
	{
		return{};
	}

private:
	explicit Generator(promise_type& promise) noexcept : coro(std::coroutine_handle<promise_type>::from_promise(promise)) {};
	handle_type coro;
};
```

<br>
<br>
<h2><blue1_h2> 4. 성능 </blue1_h2></h2>

'그럼 왜 코루틴을 사용해야 하는가?'에 대한 질문을 찾기 위해 성능을 알아보도록 하겠습니다.  
코루틴은 무언가 반복적인 결과를 도출하는데 효과적으로 줄일 수 있습니다.   
재귀 용법의 대표적 케이스인 피보나치수열을 이용하여 성능 측정을 해보겠습니다.  

상황은 다음과 같습니다.  
1. 0 ~ 1000000까지 피보나치 수열의 결과 값을 unsigned long long int의 최대 크기로 나머지 구하기  
2. 유지보수를 위한 출력과 연산 부분 분리  
3. CPU: intel i7-4720HQ  

<br>
<h3><blue1_h3> 1) 재귀 용법 </blue1_h3></h3>
피보나치 수열을 생각하면 가장 간단하게 사용할 수 있는 재귀 용법을 작성해 봅시다.  

```c++
long long int Fibonacci(int num) 
{
	if(num < 1) 
		return 0;
	else if(num == 1)
		return 1;
	else 
		return (Fibonacci(num - 1) + Fibonacci(num - 2));
}

int main()
{
	PROCESS_MEMORY_COUNTERS_EX pmc;
	memset(&pmc, 0, sizeof(PROCESS_MEMORY_COUNTERS_EX));
	pmc.cb = sizeof(PROCESS_MEMORY_COUNTERS_EX);

	clock_t start, end;
	double duration;

	start = std::clock();
	{
		std::cout << Fibonacci(50)<<"\n";
	}
	end = std::clock();
	GetProcessMemoryInfo(GetCurrentProcess(), reinterpret_cast<PROCESS_MEMORY_COUNTERS*>(&pmc), sizeof(pmc));

	std::cout << "현재 로직 동작 시간: " << end - start << "\n";
	std::cout << "현재 가상 메모리: " << pmc.PrivateUsage << "\n";
	std::cout << "현재 물리 메모리: " << pmc.WorkingSetSize << "\n";
}
```
![피보나치수열](https://github.com/kj1241/kj1241.github.io/assets/22047442/aa061220-8c3d-41e7-8e82-17b8d2cd3147){: width="100%" style="aspect-ratio:16/9"}


<br>
<h3><blue1_h3> 2) 알고리즘 변형 </blue1_h3></h3>
위의 재귀 용법은 생각하는데 용의 하지만 느립니다. 따라서 공식을 이용하여 코드를 변형해 봅시다.  
```c++
long long int Fibonacci(int num) 
{
	long long int answer = 0;
	bool flag = false;
	long long int a =0, b=1;

	if (num < 1) 
		return 0;
	if (num = 1)
		return 1;

	for (int i = 0; i < num-1; ++i)
	{
		if (!flag)
		{
			a += b;
			flag = true;
		}
		else
		{
			b += a;
			flag = false;
		}
	}
	return (a>b)? answer=a: answer=b;
}

int main()
{
	PROCESS_MEMORY_COUNTERS_EX pmc;
	memset(&pmc, 0, sizeof(PROCESS_MEMORY_COUNTERS_EX));
	pmc.cb = sizeof(PROCESS_MEMORY_COUNTERS_EX);

	clock_t start, end;
	double duration;

	start = std::clock();
	{
		std::cout << "피보나치 수열 50 결과: " << Fibonacci(50) << "\n";
	}
	end = std::clock();
	GetProcessMemoryInfo(GetCurrentProcess(), reinterpret_cast<PROCESS_MEMORY_COUNTERS*>(&pmc), sizeof(pmc));

	std::cout << "현재 로직 동작 시간: " << end - start << "\n";
	std::cout << "현재 가상 메모리: " << pmc.PrivateUsage << "\n";
	std::cout << "현재 물리 메모리: " << pmc.WorkingSetSize << "\n";
}
```
![로직변경](https://github.com/kj1241/kj1241.github.io/assets/22047442/76db6086-dd21-40d6-9fdc-eea0fb963b2b){: width="100%" style="aspect-ratio:16/9"}
위의 로직을 이용해서 1~1000000까지 피보나치수열을 출력하는 코드를 만들어 보겠습니다.  
물로 배열을 이용하면 피보나치수열의 정확한 수를 만들 수 있지만 로직을 시간을 확인하는 용도 임으로 %를 이용하여 나머지 계산만 하겠습니다.  

<br>
```c++
unsigned long long int Fibonacci(int num)
{
	long long int answer = 0;
	bool flag = false;
	long long int a =0, b=1;

	if (num < 1) 
		return 0;
	if (num == 1)
		return 1;

	for (int i = 0; i < num-1; ++i)
	{
		if (!flag)
		{
			(a += b)%= 18446744073709551615;
			flag = true;
		}
		else
		{
			(b += a)%= 18446744073709551615;
			flag = false;
		}
	}
	return (a>b)? answer=a: answer=b;
}



int main()
{
	PROCESS_MEMORY_COUNTERS_EX pmc;
	memset(&pmc, 0, sizeof(PROCESS_MEMORY_COUNTERS_EX));
	pmc.cb = sizeof(PROCESS_MEMORY_COUNTERS_EX);

	clock_t start, end;
	double duration;

	start = std::clock();
	{
		for(int i=0; i<100001;++i)
			std::cout << "피보나치 수열"<<i<<" 결과: " << Fibonacci(i) << "\n";
	}
	end = std::clock();
	GetProcessMemoryInfo(GetCurrentProcess(), reinterpret_cast<PROCESS_MEMORY_COUNTERS*>(&pmc), sizeof(pmc));

	std::cout << "현재 로직 동작 시간: " << end - start << "\n";
	std::cout << "현재 가상 메모리: " << pmc.PrivateUsage << "\n";
	std::cout << "현재 물리 메모리: " << pmc.WorkingSetSize << "\n";
}
```
![변형](https://github.com/kj1241/kj1241.github.io/assets/22047442/1120308b-e778-4747-ae14-7e4046b2e0f8){: width="100%" style="aspect-ratio:16/9"}


<br>
<h3><blue1_h3> 3) 코루틴 사용 </blue1_h3></h3>

```c++
Generator<unsigned long long int> Fibonacci(int num)
{
	
	long long int answer = 0;
	bool flag = false;
	long long int a =0, b=1;

	co_yield 0;
	co_yield 1;

	for (int i = 0; i < num-1; ++i)
	{
		if (!flag)
		{
			(a += b)%= 18446744073709551615;
			flag = true;
		}
		else
		{
			(b += a)%= 18446744073709551615;
			flag = false;
		}
		co_yield (a > b) ? answer = a : answer = b;
	}
}

int main()
{
	PROCESS_MEMORY_COUNTERS_EX pmc;
	memset(&pmc, 0, sizeof(PROCESS_MEMORY_COUNTERS_EX));
	pmc.cb = sizeof(PROCESS_MEMORY_COUNTERS_EX);

	clock_t start, end;
	double duration;

	start = std::clock();
	{
		Generator<unsigned long long int> f = Fibonacci(100000);
		int num = 0;
		for (auto& i : f)
		{
			std::cout <<"피보나치 수열"<<num << " 결과: " << i << "\n";
			num++;
		}
			
	}
	end = std::clock();
	GetProcessMemoryInfo(GetCurrentProcess(), reinterpret_cast<PROCESS_MEMORY_COUNTERS*>(&pmc), sizeof(pmc));

	std::cout << "현재 로직 동작 시간: " << end - start << "\n";
	std::cout << "현재 가상 메모리: " << pmc.PrivateUsage << "\n";
	std::cout << "현재 물리 메모리: " << pmc.WorkingSetSize << "\n";
}
```
![코루틴](https://github.com/kj1241/kj1241.github.io/assets/22047442/93dee8ba-c3ba-4724-af3d-e2620824b205){: width="100%" style="aspect-ratio:16/9"}

출력 시간을 포함한 0~100000의 나머지 계산 값의 시간은 코루틴을 사용하는 것이 압도적으로 좋습니다.  
생각해 보면 일반적 함수는 O(N^2)의 시간 복잡도를 가지지만 코루틴은 O(N)의 시간 복잡도를 가지게 됩니다.  
물론 전역 변수로 해쉬테이블이나 배열, 큐, 백터 등을 사용하면 일반 함수를 이용하는 방법도 출력시간을 단축할 수 있습니다.  
하지만 알고리즘 대회 로직을 보면 메모리 사용량을 많이 무시하는 경향이 있는데, 이런 해쉬테이블 배열등을 사용하게 되면 공간복잡도도 같이 올라가서 퍼포먼스가 떨어질 수밖에 없습니다.  
(메모리는 무한하지 않습니다.)  
따라서 복잡하면서 반복적이면서 복잡한 계산은 코루틴을 사용하는 것이 효율 적입니다.  
  
  
지금까지 C++23에 나올 std::generator 동기 코루틴을 살자고 살펴보았습니다.물론 비동기 코루틴은....  
시스템적인 코드를 너무 많이 봐서 다음에는 GDC 분석으로 돌아오겠습니다. (당분간 도망처...)
감사합니다.  


<br>

---

<br>

<h6>참조: <a herf="https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2021/p2168r3.pdf">https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2021/p2168r3.pdf</a></h6>