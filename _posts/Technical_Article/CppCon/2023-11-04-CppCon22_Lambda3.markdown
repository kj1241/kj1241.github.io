---
layout: post
title:  "C++ ) 람다 관용구... 3 람다 정리(2)"
date:   2023-11-04 10:28:51 +0900
image: https://github.com/kj1241/kj1241.github.io/assets/22047442/daf6acb0-966a-4864-bff4-5deafbc0a716
toc: true
categories: [CppCon]
tags: [C++, Cppcon22, lambda, C++20]
addsence: true
---




<br>
<h2><blue1_h2> 6. C++ 14 람다 </blue1_h2></h2>

<br>
<h3><blue1_h3> 1) 매개변수의 암시적 auto타입 지정 </blue1_h3></h3>
  
```c++
std::map<int, std::string> Arrow{
	{0, "Up"},
	{1, "Down"},
	{2, "Left"},
	{3, "Right"}
};

int main()
{
	std::for_each(Arrow.begin(), Arrow.end(), [](const auto& item) {
		std::cout << item.first << ": " << item.second << "\n";
	});
}
```
![코드 결과](https://github.com/kj1241/kj1241.github.io/assets/22047442/84c4372a-5067-4db1-b341-0874956d1dbd){: width="100%" }
![컴파일러 언어](https://github.com/kj1241/kj1241.github.io/assets/22047442/5af7c349-816b-4751-9058-48647d16c69d){: width="100%" }

- C++14부터 매개 변수에 auto를 작성하여 암시적으로 컴파일러가 템플릿 인스터스화(변환)을 해 줍니다.
  
C++17 버전의 가변 매개변수 파라메터 팩과 조합하면, 다음과 같이 이용할 수 있습니다.

```c++

int main()
{
	auto f = [](auto && ... args){ // '...'  c++17 이상부터
		//(std::cout << ... << args); //output:: hellow world19C38.5
		((std::cout << args << "\n"), ...);
	};

	f("hellow world", 19, "C", 38.5);
}

```
![파라미터팩 조합](https://github.com/kj1241/kj1241.github.io/assets/22047442/9b35aec6-078e-424b-8491-674b571d189f){: width="100%" }

- ... 은 팩 패턴이며 가변 개수의 인자를 나타냅니다. 또한 && r-value는 참조를 뜻합니다.


![다른컴파일에서의 결과](https://github.com/kj1241/kj1241.github.io/assets/22047442/c5c31bff-54dd-41e1-8d36-327c065478c6){: width="100%" }


```c++

#include <algorithm>
#include <cstring>
#include <iomanip>
#include <iostream>
#include <string>
#include <chrono>
#include <variant>

using namespace std;
using namespace std::literals;

using ms = std::chrono::milliseconds;
using us = std::chrono::microseconds;
using ns = std::chrono::nanoseconds;

struct Time {
    std::variant<ms, ns, us> time;
    auto convert_time(const auto& convert) {
        return std::visit(convert, time);
    }
    Time(std::variant<ms, ns, us> t):time(t){};
};

template <typename T>
constexpr auto duration_cast = [](auto& time) {
    return std::chrono::duration_cast<T>(time);
};

int main() {
    Time t(us(3000));
    //std::cout << t.convert(std::chrono::duration_cast<us>).count(); //에러 
    std::cout << t.convert_time(duration_cast<ms>).count();
};

```
![코드 결과](https://github.com/kj1241/kj1241.github.io/assets/22047442/671448d3-f0e4-45d4-b023-ba64363d6903){: width="100%" }

std::chrono::duration 함수는 템플릿 코드가 들어가게 되면 에러가 발생합니다.  
이유는 바꿀 시간이 명확하지 않다는 거에 있습니다.  
따라서 ms, us, ns 같은 값을 받고 출력하는 코드를 작성하게 되면 함수로 전달받는 코드에 템플릿을 사용할 수 없으니 모든 변수들을 전부 선언하고 그에 따른 초기값이나 값을 입력받는 함수를 오버로딩 해줘야 합니다.  
그렇기 때문에 람다를 사용하면 좀 더 손쉽게 코드를 작성할 수 있습니다.  

제가 위의 람다 코드를 해석하는 방법이 이렇습니다.  
1. 어떠한 시간 변수가 들어갈지 모르지만 ms(chrono::microseconds)로 캐스팅할 객체를 만듭니다.
2. 이러한 객체 전에 방문자 패턴 객체의 타입이 결정됩니다.
3. 입력 시간은 us 3000입니다.
  
이는 us 3000이라는 변수를 입력받으면 variant를 사용하여 형변환을 사용한 후 ms로 시간을 캐스팅해 주는 코드라고 요약할 수 있습니다.  


<br>
<h3><blue1_h3> 2) 캡처의 초기값 설정 </blue1_h3></h3>
![캡처의 초기값](https://github.com/kj1241/kj1241.github.io/assets/22047442/58d9dbe9-b645-4440-9ffb-96ea6fef206d){: width="100%" }

- 캡처에 초기값을 설정하면 클래스 내부에 private 멤버 변수가 생성됩니다. 
- 해당 값으로 초기화를 합니다.

캡처의 초기화와 클로처의 함수 시간 비교

```c++

int main() {
	 std::vector<std::string> vs;
	 const std::string lastfix = "X";
	 for (int i = 0; i < 10000; ++i)
		 vs.push_back("temp" + std::to_string(i));
	 vs.push_back("tempX");
	 
	 auto startTime = std::chrono::high_resolution_clock::now();
	 auto result = std::find_if(vs.begin(), vs.end(), [&lastfix](const std::string s) {
		 return s == "temp" + lastfix;
	 });
	 auto endTime = std::chrono::high_resolution_clock::now();

	 std::chrono::duration<double> duration = std::chrono::duration_cast<std::chrono::duration<double>>(endTime - startTime);
	 double seconds = duration.count();

	 std::cout << "클로져 함수 실행 시간: " << seconds << " 초" << "\n";

	 if (result != vs.end())
		 std::cout << lastfix << "\n";
};

```

![코드실행결과](https://github.com/kj1241/kj1241.github.io/assets/22047442/b4a1a957-a7c1-4510-8800-433bfd414110){: width="100%" }

```c++
int main() {
	 std::vector<std::string> vs;
	 const std::string lastfix = "X";
	 for (int i = 0; i < 10000; ++i)
		 vs.push_back("temp" + std::to_string(i));
	 vs.push_back("tempX");
	 
	 auto startTime = std::chrono::high_resolution_clock::now();
	 auto result = std::find_if(vs.begin(), vs.end(), [str = "temp" + lastfix ](const std::string s) {
		 return s == str;
	 });
	 auto endTime = std::chrono::high_resolution_clock::now();

	 std::chrono::duration<double> duration = std::chrono::duration_cast<std::chrono::duration<double>>(endTime - startTime);
	 double seconds = duration.count();

	 std::cout << "매개변수 초기화 실행 시간: " << seconds << " 초" << "\n";

	 if (result != vs.end())
		 std::cout << lastfix << "\n";
};

```
![코드실행 결과](https://github.com/kj1241/kj1241.github.io/assets/22047442/c37a10a6-d293-4bc2-9a1b-b98c66d6e2bb){: width="100%" }

- 위의 코드를 보시면 주어진 백터에서 특정 접미사를 찾을 때 압도적으로 캡처에서 초기화를 이용하여 검색한 시간이 빠릅니다. (내부적으로 클로져 함수가 더 많이 실행되기 때문입니다.)


<br>
<br>
<h2><blue1_h2> 7. C++ 17 람다 </blue1_h2></h2>
 
<br>
<h3><blue1_h3> 1) 컴파일시간에 계산하는 constexpr </blue1_h3></h3>

```c++
int main() {
	auto f = [](int i) constexpr {
		return i;
	};

	std::array<int, f(3)> arr = {};
	std::cout << arr.size()<<"\n";
};
```
![코드실행결과](https://github.com/kj1241/kj1241.github.io/assets/22047442/dc43dcf2-1192-4952-9bc7-5a1fc3e8e049){: width="100%" }

- C++17에 추가된 constexpr 키워드입니다. 컴파일 시간에 계산되기 때문에 런타임 오버헤드가 없습니다.

<br>
<h3><blue1_h3> 2) 람다 오버로드 </blue1_h3></h3>
일반적인 함수 오버로드를 생각해 봅시다.  

정수(int)와 실수(float)들을 받아서 더하는 덧셈 프로그래밍을 만든다고 생각해 봅시다.  

```c++
int add(int a, int b)
{
	return a + b;
}

float add(float a, float b)
{
	return a + b;
}

int main()
{
	std::cout << add(3, 4) << "\n";
	std::cout << add(4.2f, 5.3f) << "\n";
	//std::cout<< add(3 , 4.5f) << "\n"; //error
}
```

![오버로드 결과](https://github.com/kj1241/kj1241.github.io/assets/22047442/5d37a111-236e-4366-ac5d-31d0d68a6900){: width="100%" }

매개변수의 종류가 많아질수록 함수 오버로딩의 코드가 매우 길어질 것입니다.  
람다식 오버로드를 이용하면 동작시키는 코드를 모을 수 있습니다.  

```c++

template <typename... T>
struct overload : T...
{
	using T::operator()...;
};

template <typename... T>
overload(T...)->overload<T...>;

int main()
{
	auto add = overload{
		[](int a,int b) { return a + b; },
		[](float a, float b) { return a + b; }
	};

	std::cout << add(3, 4) << "\n";
	std::cout << add(4.2f, 5.3f) << "\n";
}

```
![다른컴파일러 결과](https://github.com/kj1241/kj1241.github.io/assets/22047442/50bfee8f-30fb-4503-9fb7-9bd36f74e9e4){: width="100%" }
![실행 결과](https://github.com/kj1241/kj1241.github.io/assets/22047442/bd1df5f3-8d8c-4ce8-88f6-5a03477bd013){: width="100%" }

원래 위의 람다식 오버로드 코드는 정상적으로 작동해야 합니다.  

gcc, icc, clang 의 컴파일러에서는 정상적으로 작동하지만 2023.11.23일 최신 버전 기준으로 마이크로 소프트 컴파일러(msvc)에서 런타임 체크 실패 #2가 발생합니다. (이상한 나라의 마소마소야 C++17이야... 2023.2.22일 날 고쳤다고 했었잖니)  

에러가 발생한다고 해서 코드를 작성하지 못하는 건 아닙니다.  
마이크로소프트가 컴파일러를 고칠 때까지 잠시동안 쓸 수 있는 4가지 방법이 있습니다.  

1. 에러를 발생시크는 원인을 전역함수로 올립니다.

```c++
template <typename... T>
struct overload : T...
{
	using T::operator()...;
	
};

template <typename... T>
overload(T...)->overload<T...>;

auto add = overload{
		[](int a, int b) { return a + b; },
		[](float a, float b) { return a + b; }
};

int main()
{
	std::cout << add(3, 4) << "\n";
	std::cout << add(4.2f, 5.3f) << "\n";
}

```
![오버로드 에러 해결방법1 전역함수](https://github.com/kj1241/kj1241.github.io/assets/22047442/eebe8c10-fa24-4726-a70c-c9d517298ba7){: width="100%" }

Run-Time Check Failure #2는 배열 같은 정적사이즈 이상으로 큰 값을 넣을 때 나타나기도 하지만 스택에 할 다량 보다 크게 잡힐 때도 에러가 납니다.  실제로 오버로드를 빼면 정상적으로 작동하는 것을 확인할 수 있습니다.  
간단하게 코드를 데이터 영역으로 보내면 해결할 수 있습니다.  

   

2. 캡처 영억에 이상한 값으로 초기화를 넣는다.

```c++

template <typename... T>
struct overload : T...
{
	using T::operator()...;
};

template <typename... T>
overload(T...)->overload<T...>;

int main()
{
	auto add = overload{
		[n=0](int a,int b) { return a + b; },
		[n=0](float a, float b) {return a + b; }
	};

	std::cout << add(3, 4) << "\n";
	std::cout << add(4.2f, 5.3f) << "\n";
}

```
![오버로드 에러 해결방법2 초기값](https://github.com/kj1241/kj1241.github.io/assets/22047442/4db777af-a52c-4072-a4aa-fb6efa40fd66){: width="100%" }

- 디폴트 초기화에서 문제가 발생한 거 기 때문에 이상한 변수를 사용해서 초기화시켜 주면 문제없이 동작시킬 수 있습니다.

3. ★클래스나 구조체에 더미 변수를 사용한다.

```c++

template <typename... T>
struct overload : T...
{
	using T::operator()...;
	int dummy = 0;
};

template <typename... T>
overload(T...)->overload<T...>;

int main()
{
	auto add = overload{
		[](int a,int b) { return a + b; },
		[](float a, float b) {return a + b; }
	};

	std::cout << add(3, 4) << "\n";
	std::cout << add(4.2f, 5.3f) << "\n";
}

```

![오버로드 에러 해결방법 3 더미](https://github.com/kj1241/kj1241.github.io/assets/22047442/7aaf8118-ca1e-484b-88ad-f0deac3547e6){: width="100%" }

위와 같은 원리이지만 이 편이 좀 더 쉽게 코드를 작성할 수 있습니다.  

4. 코드 언어를 C++17에서 C++20으로 변경한다.

```c++
template <typename... T>
struct overload : T...
{
	using T::operator()...;
};

template <typename... T>
overload(T...)->overload<T...>;

int main()
{
	auto add = overload{
		[](int a,int b) { return a + b; },
		[](float a, float b) {return a + b; }
	};

	std::cout << add(3, 4) << "\n";
	std::cout << add(4.2f, 5.3f) << "\n";
}

```
![오버로드 에러 해결방법 4 c++20](https://github.com/kj1241/kj1241.github.io/assets/22047442/bba3f967-5083-480e-acb0-da9b12abcd21){: width="100%" }

P1814R0에 의하면 C++20에서는 추론 가이드를 컴파일러가 암시적으로 생성해 주기 때문에 더 관대하게 코드를 작성할 수 있습니다. (C++20은 추론가이드를 없앨 수 있습니다.) 

```c++

template <typename... T>
struct overload : T...
{
	using T::operator()...;
};

//template <typename... T>
//overload(T...)->overload<T...>;

int main()
{
	auto add = overload{
		[](int a,int b) { return a + b; },
		[](float a, float b) {return a + b; }
	};

	std::cout << add(3, 4) << "\n";
	std::cout << add(4.2f, 5.3f) << "\n";
}

```
![오버로드 추론가이드 삭제](https://github.com/kj1241/kj1241.github.io/assets/22047442/e2191fda-4bc2-4a0f-89fb-3b15e59f0754){: width="100%" }

~~(어쩌다 보니.. 람다 포스트에 템플릿 추론 트레블 슈팅을 쓰고 있는 거지?)~~


<br>
<br>
<h2><blue1_h2> 8. C++ 20 람다 </blue1_h2></h2>

<br>
<h3><blue1_h3> 1) 구조화된 바인딩 캡처 가능 </blue1_h3></h3>
다시 돌아와서 C++20에서 람다를 확인해 봅시다.  
람다는 매개변수 팩을 캡처 가능합니다.  

```c++

auto foo(auto ... args)
{
	std::cout << sizeof...(args) << "\n";
}

template <typename ...Args>
auto delay_invoke_foo(Args...args)
{
	std::cout << "A" << ": ";
	((std::cout << args << " "), ...) << "\n";
	return[args...]()->decltype(auto) {
		std::cout << "B" << ": ";
		((std::cout << args << " "), ...) << "\n";
		return foo(args...);
	};
}

int main()
{
	delay_invoke_foo("hellow", 3)();
}
```
![구조화된 바인드](https://github.com/kj1241/kj1241.github.io/assets/22047442/64639ed4-c1fb-4bee-b940-ab8cee79e183){: width="100%" }

- 매개변수 팩을 통하여 변수들을 좀 더 유동적으로 받을 수 있습니다.

<br>
<h3><blue1_h3> 2) 매개변수 auto 대신 명시적으로 템플릿 사용 </blue1_h3></h3>

```c++

int main()
{
	std::vector vc = { 1,2,3,4,5,6,7,8 };
	std::erase_if(vc, [](const auto &i) {
		return i % 2;
	});

	for (auto e:vc)
	{
		std::cout << e << " ";
	}
}

```
![매개변수 auto 사용](https://github.com/kj1241/kj1241.github.io/assets/22047442/3f2ea1c1-23a4-44d3-b9bc-bdcda50c30eb){: width="100%" }
*매개변수에 auto 코드 사용*

```c++
int main()
{
	std::vector vc = { 1,2,3,4,5,6,7,8 };
	std::erase_if(vc, []<typename T>(const T i) {
		return i % 2;
	});

	for (const auto e:vc)
	{
		std::cout << e << " ";
	}
}

```
![매개변수 템플릿 사용](https://github.com/kj1241/kj1241.github.io/assets/22047442/ba1d6d12-b97f-486c-9214-f821de904ae6){: width="100%" }
*매개 변수에 템플릿 변수 사용*

- 매개변수에 auto를 사용하여 컴파일러가 암시적으로 코드를 완성시켰으나 C++20부터는 매개변수에 템플릿을 사용하여 명시적으로 코드를 작성할 수 있습니다.

<br>
<h3><blue1_h3> 3) 람다의 이름 지정 </blue1_h3></h3>

```c++
class temp
{
	//auto f= []{};
	decltype([]() {}) f;
};

```
- C++20부터는 람다를 멤버 변수로 만들 수 있습니다.  
이 말은 초기화된 람다가 변수 타임이 될 수 있다는 이야기입니다.  

```c++
std::unique_ptr<int, decltype( [](int* p) { delete p; })> pVal( new int );
```
- 따라서 동적 할당된 소멸자를 람다로 만들 수 있습니다.

```c++
using pair_item = std::pair<char, double>;

struct compare
{
    bool operator()(const pair_item& lhs, const pair_item& rhs) const
    {
        return lhs.second < rhs.second;
    }
};


int main() {
    std::set < pair_item, compare > pq;
    pq.emplace('C', 30);
    pq.emplace('A', 20);
    pq.emplace('B', 10);

    for (auto e : pq)
        std::cout << e.first << "\n";
}
```
![set 초기화 조건 코드](https://github.com/kj1241/kj1241.github.io/assets/22047442/6fb0a60d-5f09-4102-95b9-fa59505f90e7){: width="100%" }

```c++
using pair_item = std::pair<char, double>;

int main() {
    std::set < pair_item, decltype([](auto e1, auto e2) {
        std::cout << "e1: " << e1.first;
        std::cout << " e2: " << e2.first;
        std::cout << "\n";
        return e1.second < e2.second;
        }) > pq;

    pq.emplace('C', 30);
    pq.emplace('A', 20);
    pq.emplace('B', 10);

    for (auto e : pq)
        std::cout << e.first << "\n";
}

```
![set 람다 조건 코드](https://github.com/kj1241/kj1241.github.io/assets/22047442/da989ba8-b31b-44a0-9c69-dcc4bd39148c){: width="100%" }

- 람다를 타입으로 사용하여 객체로 지정할 수 있기 때문에 람다를 STL 초기화 코드와 조건문등에 넣을 수 있습니다.
- p0315r0과 p0624r0 필요 이유에 대해서 설명되어 있습니다.


```c++

template<auto = [] {} >
struct foo { /* ... */ };

int main()
{
	foo<> f1;
	foo<> f2;

	typeid(decltype(f1)) == typeid(decltype(f2)) ? std::cout << "true" : std::cout << "false";
}

```
![리턴타입이 같아보이지만 서로다른 함수](https://github.com/kj1241/kj1241.github.io/assets/22047442/0eb79390-52d9-4b72-8963-00e668efca56){: width="100%" }

- 또한 람다를 타입으로 지정할 수 있지만 같은 모양의 람다라도 반복해서 정의되었으면 서로 다른 타입이 됩니다.
- 이는 코드가 같지만 다른 성질을 가진 객체를 만드는데 유용합니다.


<br>
<h2><blue1_h2> 9. C++ 23 람다 </blue1_h2></h2>

<details markdown =1>
<summary> 이 파트는 아직 C++23이 적용된 컴파일러를 확인 불가능함으로 생략하겠습니다. </summary>

- 매개변수에 this 인수를 사용하여 명시적으로 만들 수 있습니다.
- [ ] mutable { }; 더 이상 코드 레어가 아닙니다.([]() mutable {})
- 비어있는 디폴트 람다를 static을 사용하여 정적으로 변경할 수 있습니다
  
```c++
//재귀 함수
auto fact = [](this auto self, int n) -> int {
	return (n <= 1) ? 1 : n * self(n - 1);
}; //C++23

int main()
{
	std::cout << fact(5);
}

//트리 순회
struct Leaf {};
struct Node;
using Tree = std::variant<Leaf, Node*>;
struct Node {
	Tree left, right;
};

template <typename ... T>
struct overload :T...{using T::operator()...; };

int countLeaves(const Tree& tree)
{
	return std::visit(overload{
		[](const Leaf&) {return 1; },
		[](this const auto& self,const Node* node)->int {
			return std::visit(self,node->left) + std::visit(self,node->right);
		}

		}, tree);
}
```

</details>

<br>
<h2><blue1_h2> 10. 여담 </blue1_h2></h2>

시간이 흐를수록 언어는 발전하고 있고 있기 때문에 람다는 눈여겨볼 가치가 있습니다.  
물론 가장 중요한 건 "람다가 어떻게 컴파일 내부에서 변형되는지"가 아닐까 싶습니다.  
그럼 읽어 주셔서 감사합니다.  

<br>

---

<br>

<h6>
참조: <br>
<a herf=" https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p1814r0.html"> https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p1814r0.html </a> <br> 
<a herf="https://en.cppreference.com/w/cpp/20"> https://en.cppreference.com/w/cpp/20</a> <br> 
<a herf="https://www.ida.liu.se/~TDDD38/ISOCPP/expr.prim.lambda.html"> https://www.ida.liu.se/~TDDD38/ISOCPP/expr.prim.lambda.html</a> <br> 
<a herf="https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0624r0.pdf"> https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0624r0.pdf</a> <br> 
<a herf="https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0315r0.pdf"> https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0315r0.pdf</a>  
</h6>
