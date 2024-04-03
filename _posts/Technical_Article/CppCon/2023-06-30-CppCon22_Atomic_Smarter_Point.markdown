---
layout: post
title: "C++, 원자 스마트 포인터 1 - 효율적인 메모리 관리"
date: 2023-06-30 13:25:17 +09:00
image: https://drive.google.com/thumbnail?id=1YxlqLDBZ9zL4x-1OfFxUqXIyCUrI2v-x
toc: true
categories: [CppCon]
keywords: C++, Cppcon, Cppcon22, atomic smart pointer, 원자 스마트 포인터, 메모리 관리
addsence: true
lastmod: 2024-04-03 21:26:00 +09:00
sitemap:
  changefreq : daily
  priority : 1.0
excerpt: 이 글은 스마트 포인터와 멀티 스레드 환경에서 std::atomicstd::shared_ptr을 활용한 스마트 포인터의 안전성과 데이터 구조인 원자 스마트 포인터를 통한 스택 구현 실험을 다루고 스레드 간 데이터 충돌 문제 해결과 안전한 동작 확인하고 있습니다.
---

## <cpp_h2>1. 주제 : Smarter Cpp Atomic Smart Points</cpp_h2>

이번에 분석할 주제는 원자 스마트 포인터의 자료구조 스택에 관해서입니다. CppCon 22에서 발표된, [Smarter Cpp Atomic Smart Pointers - Effcient Concurrent Memory Management](https://www.youtube.com/watch?v=OS7Asaa6zmY&list=PLHTh1InhhwT6c2JNtUiJkaH8YRqzhU7Ag&index=27) 을 참조하여 분석해 보겠습니다. 영상 보시는 것을 추천해 드립니다.

<br>
<br>

## <cpp_h2>2. 스마트 포인터란?</cpp_h2>

원자 스마트 포인터를 설명하기 전에 스마트 포인터를 짚고 넘어갈 필요성이 있습니다.  
  
간단하게 스마트 포인터에 대한 정의를 하자면 메모리에 동적으로 직접 동적으로 할당하거나 해제해 주는 원시 포인터 대신 컴파일러에서 일정 스코프에서 벗어나면 자동으로 해제되는 템플릿입니다. 스마트 포인터의 종류에는 unique_ptr, shared_ptr, weak_ptr, auto_ptr 이렇게 구성되어 있습니다.  
  
스마트 포인터 처음 나온 당시에는 ＇왜 스마트 포인터를 사용해야 하는가?＇에 대한 논란이 있었습니다. 스마트 포인터에 대한 이점으로는 포인터에서 발생할 수 있는 메모리 릭을 예방하고 메모리 릭으로 발생하는 프로파일링 시간을 줄일 수 있으므로 안정성이 높아집니다. 하지만 단점으로는 원시 포인터에 비해서 마음대로 해제할 수 없으므로 원하는 시점에서 효율적으로 메모리관리가 불가능합니다. 혼자 무언가 개발하고 있을 당시에는 스마트 포인터가 별로라고 생각했었습니다. 하지만 다른 사람과 작업하니 내가 생각한 변수의 방향을 다르게 사용함으로써 그에 따라 발생하는 프로파일링의 시간이 훨씬 많이 든다는 사실을 깨달았습니다. 그래서 스마트 포인터가 훨씬 매력적이라 느꼈습니다. 또한, modern C++에서는 스마트 포인터의 사용을 권장하고 있습니다.  

<br>
<br>

### <cpp_h3>1) 스레드에서의 스마트 포인터의 에러</cpp_h3>

스마트 포인터 발표 당시 스마트 포인터를 싫어했던 이유는 안전성이라는 이유로 스마트 포인터 사용을 권고하고 있었지만 사용해 보면  에러에 안전하지 않았습니다.(물론 시간이 지난 지금은 많은 개정을 통하여 바뀌어서 안전성이 증가하였습니다.)  
  
그럼 '스레드에서 스마트 포인터를 사용하게 된다면?' 물론 우연히 잘 동작할 수도 있습니다만 메모리에서 무언가 삭제될 때 에러를 일으킬 확률이 매우 높습니다. 이런 문제를 좀 더 쉽게 파악하기 위해서 그림을 가져왔습니다.  

<br>

![초기 상태]({{ site.google_drive }}1YA5MJO3Hz64Rv0Te7FlEHBkP_3LAmNC9{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<cpp_h6>초기 상태</cpp_h6>*  

위와 같이 링크드 리스트가 존재한다고 합시다 혹은 무언가 관리하기 위해 연결시킨 데이터가 존재한다고 합시다. 

<br>

![스레드1작업]({{ site.google_drive }}1eB6Q7l3ES6mbgXs-s8oX0HvJEQ87DixZ{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<cpp_h6>스레드1의 작업</cpp_h6>*  

스레드 1에서 작업하고 병렬처리를 위해서 스레드 1은 스레드 상태를 Sleep으로 전환하고 제어권을 넘깁니다.

<br>

![스레드2작업]({{ site.google_drive }}1YxlqLDBZ9zL4x-1OfFxUqXIyCUrI2v-x{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<cpp_h6>스레드2의 작업</cpp_h6>*  

스레드 2가 나타나고 작업 처리를 전부 다했으므로 B를 제거해 버립니다. 그리고 제어권을 다시 스레드 1에게 돌려줍니다. 그러면 스레드 1이 깨어나고 메모리 에러가 발생합니다.  
  
위와 같은 에러에서 원시 포인트는 복잡하게 꼬아서 코드를 작성하면 어떻게든 에러 해결이 가능합니다. 하지만 스마트 포인터는 컴파일러에게 의존하는 부분이 크기 때문에 해결할 수가 없습니다.  
  
위의 문제 외에도 경쟁상태라던가 이중제거 같은 문제점들이 있습니다. 이를 해결하기 위해서 스마트 포인터를 제어하는 std::experimental::atomic_shared_ptr 템플릿이 나왔습니다. (C++20 현재 std::experimental::atomic_shared_ptr<T>은 → std::atomic<std::shared_ptr<T>>로 병합되었습니다. (P0718R2 2017.11 개정))  

<br>
<br>

## <cpp_h2> 3. 원자 스마트 포인터 (std::atomic<std::shared_ptr< T >>) </cpp_h2>
  
<br>

#### **<cpp_h4>cpp:</cpp_h4>**

```cpp

namespace std {
	namespace experimental {
		inline namespace concurrency_v1 {
			template <class T> struct atomic_shared_ptr {
				bool is_lock_free() const noexcept;
				void store(shared_ptr<T>, memory_order = memory_order_seq_cst) noexcept;
				shared_ptr<T> load(memory_order = memory_order_seq_cst) const noexcept;
				operator shared_ptr<T>() const noexcept;
				shared_ptr<T> exchange(shared_ptr<T>,
					memory_order = memory_order_seq_cst) noexcept;
				bool compare_exchange_weak(shared_ptr<T>&, const shared_ptr<T>&,
					memory_order, memory_order) noexcept;
				bool compare_exchange_weak(shared_ptr<T>&, shared_ptr<T>&&,
					memory_order, memory_order) noexcept;
				bool compare_exchange_weak(shared_ptr<T>&, const shared_ptr<T>&,
					memory_order = memory_order_seq_cst) noexcept;
				bool compare_exchange_weak(shared_ptr<T>&, shared_ptr<T>&&,
					memory_order = memory_order_seq_cst) noexcept;
				bool compare_exchange_strong(shared_ptr<T>&, const shared_ptr<T>&,
					memory_order, memory_order) noexcept;
				bool compare_exchange_strong(shared_ptr<T>&, shared_ptr<T>&&,
					memory_order, memory_order) noexcept;
				bool compare_exchange_strong(shared_ptr<T>&, const shared_ptr<T>&,
					memory_order = memory_order_seq_cst) noexcept;
				bool compare_exchange_strong(shared_ptr<T>&, shared_ptr<T>&&,
					memory_order = memory_order_seq_cst) noexcept;
				constexpr atomic_shared_ptr() noexcept = default;
				atomic_shared_ptr(shared_ptr<T>) noexcept;
				atomic_shared_ptr(const atomic_shared_ptr&) = delete;
				atomic_shared_ptr& operator=(const atomic_shared_ptr&) = delete;
				atomic_shared_ptr& operator=(shared_ptr<T>) noexcept;
			};
		} 
	} 
}

```

스마트 포인트 내부적으로는 위와 같은 비슷한 코드들이 있습니다. 이 글은 원자 스마트 포인트를 안다는 전제하에 진행하고 있기 때문에 혹시 부족하신 분들은 A Lock-free Atomic shared_ptr을 한번 보시는 것을 추천해 드립니다. 혹시 다음에 시간이 남으면 CppCon 22도 정리해 보도록 하겠습니다. 
  
현재로서는 std::atomic<std::shared_ptr<T>>  템플릿을 지원할 뿐, 설계에 대한 결함은 직접 구현하여서 해결해야 합니다. 제안서 N4162에서는 일관성, 정확성, 성능 3가지가 필요합니다.

<br>

#### **<cpp_h4>cpp:</cpp_h4>**

```cpp

//전역변수
std::atomic<std::shared_ptr<int>> ptr
{ 
    std::make_shared<int>(0) 
}; 

int main() 
{
    unsigned int maxThread
    { 
        std::thread::hardware_concurrency() 
    };

    std::cout << "코어 개수: " << maxThread << std::endl;

    for (int i = 0; i < maxThread; ++i) 
    {
        std::thread([] {
            for (int j = 0; j < 1000000; ++j) {
                ptr = std::make_shared<int>(*(ptr.load()) + 1);
            }
            }).join();

    }
    std::cout << *(ptr.load()) << std::endl;
}

```

![원자스마트포인트 실행결과]({{ site.google_drive }}1mG8qE8hfvfhWdRy-rTW3iuo1o3oro6rf{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<cpp_h6>원자 스마트 포인터 실행결과</cpp_h6>*  

<br>
<br>

### <cpp_h3>1) 원자 스마트 포인터를 이용한 자료구조 (스택)</cpp_h3>

주소를 나타내는 자료형이 생겼으니 그에 따른 자료구조나 알고리즘은 만들어줘야 합니다. N4162 논문을 보면 원자 스마트 포인트를 사용하는 스택을 제시하고 있습니다.  

<br>

#### **<cpp_h4>cpp:</cpp_h4>**

```cpp

//N4162 내용
#include <iostream>
#include <thread>
#include <optional>

template<typename T> class concurrent_stack 
{
    struct Node 
    { 
        T t; 
        std::shared_ptr<Node> next; 
    };
    //std::atomic<std::shared_ptr<T>>;
    std::atomic<std::shared_ptr<Node>> head;
    // in C++11: remove “atomic_” and remember to use the special
    concurrent_stack(concurrent_stack&) = delete;
    void operator=(concurrent_stack&) = delete;

public:
    concurrent_stack() = default;
    ~concurrent_stack() = default;
    class reference {
        std::shared_ptr<Node> p;
    public:
        reference(std::shared_ptr<Node> p_) : p{ p_ } { }
        T& operator* () 
        { 
            return p->t; 
        }
        T* operator->() 
        { 
            return &p->t; 
        }
    };

    auto find(T t) const {
        auto p = head.load();  // in C++11: atomic_load(&head)
        while (p && p->t != t)
            p = p->next;
        return reference(move(p));
    }
    auto front() const {
        return reference(head); // in C++11: atomic_load(&head)
    }
    void push_front(T t) {
        auto p = std::make_shared<Node>();
        p->t = t;
        p->next = head;         // in C++11: atomic_load(&head)
        while (!head.compare_exchange_weak(p->next, p)) {}
        // in C++11: atomic_compare_exchange_weak(&head, &p->next, p);     

    }
    void pop_front() {
        auto p = head.load();
        while (p && !head.compare_exchange_weak(p, p->next)){}
        // in C++11: atomic_compare_exchange_weak(&head, &p, p->next);
    }
};

```

여기까지는 논문의 제안 내용이었습니다. 그럼 '정말 std::atomic<std::shared_ptr<T>>가 스레드에서 안전한가?'에 대해 짚고 넘어가야 하므로 제안된 코드 구조를 바탕으로 내용을 채우고 오류를 해결해 봅시다. (이 부분은 실험하기 위해 코드를 직접 만든 부분이라 최적화되지 않을 수 있습니다.)  
  
경쟁 스택에 데이터를 채우는 부분을 확인해 봅시다.  

<br>

#### **<cpp_h4>cpp:</cpp_h4>**

```cpp

concurrent_stack<int> stack;
int count = 10000;

int main()
{
	unsigned int maxThread
	{ 
	    std::thread::hardware_concurrency() 
	};

	std::cout << "코어 개수: " << maxThread << std::endl;

	for (int i = 0; i < maxThread; ++i)
	{
		std::thread([i](int max) {
			for (int j = 0; j < count; ++j) {
				//ptr[(j * 5) + (i + 1)] = std::make_shared<int>((j * 5) + (i + 1));
				stack.push_front((j* max)+ (i+1));
			}
			}, maxThread).join();
	}
}

```

![메모리 에러]({{ site.google_drive }}1V0YTsHuhgT0UBF3C6jhmtIGjkQrOw3qm{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<cpp_h6>메모리 에러</cpp_h6>*  

경쟁 스택에 8만 개의 데이터를 넣었더니 에러가 생겼습니다. 소멸자 부분에서 에러가 있는 것은 알지만, 일단 데이터가 스택에 들어갔는지 확인하는 코드를 작성해 보겠습니다.  

<br>

#### **<cpp_h4>cpp:</cpp_h4>**

```cpp

//concurrent_stack
template<typename T> class concurrent_stack
{
	...
   void print_all() noexcept
	{
		std::shared_ptr<Node> p = head.load();
		while (p != nullptr)
		{
			std::cout << p->t << "\n";
			p = p->next;
		}
	}
}

int main()
{
    ...
    stack.print_all();
}

```

![소멸자 부분에서 에러]({{ site.google_drive }}1oUVH_ZKLdEsgkPYSL63OpRBwK5UUwt_H{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<cpp_h6>소멸자 부분에서 에러</cpp_h6>*  

스택에 데이터는 잘 들어가고 있는 것이 확인되지만, 여전히 소멸자 부분에서 에러가 존재합니다. 이 이유는 복합인 이유로 발생하는 에러입니다. (0xC00000FD)  

1) concurrent_stack의 변수 스택 메모리가 1MB를 초과했기 때문입니다.  
2) 가비지 컬렉터가 존재하지 않기 때문에 큰 메모리 할당을 해제시켜줄 수 없습니다.  

<br>

따라서 해결방법은 2가지입니다.  

1) 서버컴퓨터 같이 용량이 큰 메모리를 사용하신다면 여유롭게 스택 예약 크기를 변경하시면 됩니다.  

![스택크기변경]({{ site.google_drive }}1BDJ-OHhZVpb1N7FzkeqGJAJOybhDEW9r{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<cpp_h6>스택크기변경</cpp_h6>* 

'프로젝트 속성 → 링커 → 시스템 → 스택 예약 크기'로 들어가셔서 concurrent_stack에서 사용할 용량만큼 계산해서 예약 크기를 잡으시면 됩니다. (적용 예시는 100MB로 기본 스택 예약 크기는 1MB입니다.)  
  
2) 저처럼 노트북을 쓰시는 분들은 가비지 컬렉터를 모방하여 concurrent_stack이 소멸할 때 데이터들 제거해서 concurrent_stack의 크기를 줄이는 코드를 작성하겠습니다.  

<br>

#### **<cpp_h4>cpp:</cpp_h4>**

```cpp

template<typename T> class concurrent_stack
{
	...
	T pop_front() noexcept
	{
		std::shared_ptr<Node> p = head.load();

		//성공할때까지 빼는걸 시도하는거임
		while (p && !head.compare_exchange_weak(p, p->next)){}
		if (p != nullptr)
			return p->t;
		else
			return{};
		// in C++11: atomic_compare_exchange_weak(&head, &p, p->next);
	}
	...
}

```

데이터를 스택에서 제거했을 때 원하는 값을 얻어와야 하므로 pop_front 코드를 살짝 변경하였습니다.

<br>

#### **<cpp_h4>cpp:</cpp_h4>**

```cpp

template<typename T> class concurrent_stack
{
	...
	~concurrent_stack()
	{
		if (head.load()!=nullptr)
			while (head.load()!=nullptr)
				pop_front();
	}
	...
}

```

소멸자에 concurrent_stack에 있는 데이터를 전부 제거함으로 결국 남은 concurrent_stack 크기를 줄여서 에러를 해결하면 됩니다.  

<br>

#### **<cpp_h4>cpp:</cpp_h4>**

```cpp

template<typename T> class concurrent_stack
{
	...
    void print_all() noexcept
	{
		std::shared_ptr<Node> p = head.load();
		while (p != nullptr)
		{
			std::cout << p->t << "\n";
			p = p->next;
		}
	}
	int stack_size() noexcept
	{
		int size = 0;
		std::shared_ptr<Node> p = head.load();
		while (p != nullptr)
		{
			size++;
			p = p->next;
		}
		return size;
	}
	...
}

```

추가로 스택의 전체 크기를 얻는 코드와 안에 있는 데이터를 전부 탐색하는 코드를 작성하면 이제 실험할 준비가 끝났습니다. 

<br>
<br>

### <cpp_h3>2) 원자 스마트 포인터를 사용한 멀티 스레드 에러 실험 </cpp_h3>

여기까지 코드를 작성한 이유는 스레드에서 동기화인 크리티컬섹션, 뮤텍스, 세마포어등이 없어도 원자 스마터포인터의 안정성에 대한 실험입니다. 이론에 따르면 원자 스마트 포인터를 사용하면 하나의 스레드가 데이터를 탐색하는도 중 다른 스레드들이 데이터를 지우더라도 에러가 나지 않아야 합니다.  
  
그럼 실험 계획은 이렇습니다. 저의 노트북은 옥타코어 임으로 8개의 스레드를 생성할 것입니다. 각각의 스레드는 10000개의 데이터를 원자 스마터 포인터로 만들어진 concurrent_stack에 데이터를 쌓을 겁니다. 일정 시간이 지난 후, 하나의 스레드는 탐식을 시작하고 나머지 4개의 스레드는 20000개의 데이터를 지우기 시작할 것입니다.  

<br>

#### **<cpp_h4>cpp:</cpp_h4>**

```cpp

int main()
{
	unsigned int maxThread
	{ 
	    std::thread::hardware_concurrency() 
	};

	std::cout << "코어 개수: " << maxThread << std::endl;

	for (int i = 0; i < maxThread; ++i)
	{
		std::thread([i](int max) {
			for (int j = 0; j < count; ++j) {
				//ptr[(j * 5) + (i + 1)] = std::make_shared<int>((j * 5) + (i + 1));
				stack.push_front((j * max) + (i + 1));
			}
			}, maxThread).join();
	}

	std::cout << "스택 총 사이즈(시작) : " << stack.stack_size() << "\n";
	Sleep(5000);
	std::thread([] { stack.print_all(); }).join();

	for (int i = 0; i < 4; ++i)
	{
		std::thread([i] {
			for (int j = 0; j < count * 2; ++j)
			{
				stack.pop_front();
			}
		}).join();
	}
	std::cout << "스택 총 사이즈(끝) : " << stack.stack_size() << "\n";
}

```

![최종 실행]({{ site.google_drive }}1oYogHvaOJ-_85C4SqMZkyFg3spgBz9WG{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<cpp_h6>최종 실행</cpp_h6>*  

멀티 스레드에서 스마트 포인터를 사용하더라도 경쟁 상태 문제나 이중 제거 문제가 발생하지 않고 안전하게 종료된 화면을 볼 수 있습니다.  

<br>

---

<br>

###### <cpp_h6>참조:</cpp_h6> [https://www.justsoftwaresolutions.co.uk/threading/why-do-we-need-atomic_shared_ptr.html](https://www.justsoftwaresolutions.co.uk/threading/why-do-we-need-atomic_shared_ptr.html)