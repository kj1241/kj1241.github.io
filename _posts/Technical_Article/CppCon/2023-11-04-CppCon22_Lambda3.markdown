---
layout: post
title: "C++, 람다 관용구... 3 - 람다 정리 확장"
date: 2023-11-04 10:28:51 +09:00
image: https://drive.google.com/thumbnail?id=1RHOxgMEnBNCFNuCm7RfrHzFGCnm2ygF7
toc: true
categories: [CppCon]
keywords: C++, Cppcon, Cppcon22, lambda, C++20, 람다의 이름 지정
addsence: true
lastmod: 2024-06-21 09:00:00 +09:00
sitemap:
  changefreq : daily
  priority : 1.0
excerpt: C++의 람다 함수는 C++14부터 지원되며, C++17 및 C++20에서 확장되었습니다. 람다를 활용하면 코드를 간결하게 작성할 수 있으며, C++20에서는 람다를 멤버 변수로도 사용할 수 있습니다.  
related_links:
  - url: /algorithm/CppCon22Example.html
  - url: /cppcon/CppCon22_Lambda1.html
  - url: /cppcon/CppCon22_Lambda2.html
---



## <cpp_h2>1. C++ 14 람다</cpp_h2>

c++14에서 확장된 람다 코드입니다.

<br>

### <cpp_h3>1) 매개변수의 암시적 auto타입 지정</cpp_h3>

#### **<cpp_h4>cpp:</cpp_h4>**
  
```cpp

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

![암시적 코드 변환]({{ site.google_drive }}1SOFLLhCIrwm6L1j02fgtOkMgTdi1fiH5{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<cpp_h6>람다 암시적 코드 변환</cpp_h6>* 

![암시적 코드 컴파일러 형태]({{ site.google_drive }}1JJ7qFe2TbCjpuWCxOVlnuSOHnxH-osek{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<cpp_h6>람다 암시적 코드 컴파일러 형태</cpp_h6>* 

- C++14부터 매개 변수에 auto를 작성하여 암시적으로 컴파일러가 템플릿 인스터스화(변환)을 해 줍니다.
  
C++17 버전의 가변 매개변수 파라메터 팩과 조합하면, 다음과 같이 이용할 수 있습니다.

<br>

#### **<cpp_h4>cpp:</cpp_h4>**

```cpp

int main()
{
	auto f = [](auto && ... args){ // '...'  c++17 이상부터
		//(std::cout << ... << args); //output:: hellow world19C38.5
		((std::cout << args << "\n"), ...);
	};

	f("hellow world", 19, "C", 38.5);
}

```

![파라미터 팩과 람다 조합]({{ site.google_drive }}18IbnYn4-J8I4GTGwFrPpX0tqgck_8r2E{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<cpp_h6>파라미터 팩과 람다 조합</cpp_h6>* 

- ... 은 팩 패턴이며 가변 개수의 인자를 나타냅니다. 또한 && r-value는 참조를 뜻합니다.

![다른 컴파일에서의 결과]({{ site.google_drive }}1FG2Fz1qUy889USaAGJg5oT0InGJTIMY9{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<cpp_h6>컴파일러들에서의 결과</cpp_h6>* 

<br>

#### **<cpp_h4>cpp:</cpp_h4>**

```cpp

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

![람다 활용 결과]({{ site.google_drive }}1kYf-NOekhKTDoa4C_e1DZ1gOQk8MgOv-{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<cpp_h6>람다 활용 결과</cpp_h6>* 

std::chrono::duration 함수는 템플릿 코드가 들어가게 되면 에러가 발생합니다. 이유는 바꿀 시간이 명확하지 않다는 거에 있습니다. 따라서 ms, us, ns 같은 값을 받고 출력하는 코드를 작성하게 되면 함수로 전달받는 코드에 템플릿을 사용할 수 없으니 모든 변수를 전부 선언하고 그에 따른 초기값이나 값을 입력받는 함수를 오버로딩 해줘야 합니다. 그러므로 람다를 사용하면 좀 더 손쉽게 코드를 작성할 수 있습니다. 제가 위의 람다 코드를 해석하는 방법이 이렇습니다.

1. 어떠한 시간 변수가 들어갈지 모르지만 ms(chrono::microseconds)로 캐스팅할 객체를 만듭니다.
2. 이러한 객체 전에 방문자 패턴 객체의 타입이 결정됩니다.
3. 입력 시간은 us 3000입니다.

이는 us 3000이라는 변수를 입력받으면 variant를 사용하여 형 변환을 사용한 후 ms로 시간을 캐스팅해 주는 코드라고 요약할 수 있습니다.


<br>

### <cpp_h3>2) 캡처의 초기값 설정</cpp_h3>

![캡처의 초기값]({{ site.google_drive }}1odAaswRJHfufOr8aVy0PhLDaBmjrwZrh{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<cpp_h6>캡처의 초기값</cpp_h6>* 

- 캡처에 초기값을 설정하면 클래스 내부에 private 멤버 변수가 생성됩니다. 
- 해당 값으로 초기화를 합니다.

캡처의 초기화와 클로처의 함수 시간 비교

<br>

#### **<cpp_h4>cpp:</cpp_h4>**

```cpp

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
![클로저 함수 코드 결과]({{ site.google_drive }}1hiADSS101l6BtLXjcrRTB9FTR18WHHoB{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<cpp_h6>클러저 함수 코드 결과</cpp_h6>* 

<br>

#### **<cpp_h4>cpp:</cpp_h4>**

```cpp
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

![매개변수 함수 코드 결과]({{ site.google_drive }}1u9dPEPhjQs_wQug4ZeINYD3Z6sqqOibE{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<cpp_h6>매개변수 함수 코드 결과</cpp_h6>* 

- 위의 코드를 보시면 주어진 벡터에서 특정 접미사를 찾을 때 압도적으로 캡처에서 초기화를 이용하여 검색한 시간이 빠릅니다. (내부적으로 클로져 함수가 더 많이 실행되기 때문입니다.)

<br>
<br>

## <cpp_h2>2. C++ 17 람다 </cpp_h2>
 
<br>

### <cpp_h3>1) 컴파일시간에 계산하는 constexpr</cpp_h3>

#### **<cpp_h4>cpp:</cpp_h4>**

```cpp

int main() {
	auto f = [](int i) constexpr {
		return i;
	};

	std::array<int, f(3)> arr = {};
	std::cout << arr.size()<<"\n";
};

```

![람다 constexpr 실행 결과]({{ site.google_drive }}1vl7w0e0vkao6LvjUNraYKlU6a97h6KKY{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<cpp_h6>람다 constexpr 실행 결과</cpp_h6>*  

- C++17에 추가된 constexpr 키워드입니다. 컴파일 시간에 계산되기 때문에 런타임 오버헤드가 없습니다.

<br>

### <cpp_h3>2) 람다 오버로드</cpp_h3>

일반적인 함수 오버로드를 생각해 봅시다. 정수(int)와 실수(float)들을 받아서 더하는 덧셈 프로그래밍을 만든다고 생각해 봅시다.

#### **<cpp_h4>cpp:</cpp_h4>**

```cpp

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

![람다 오버로드 실행 결과]({{ site.google_drive }}1aqz7boXuLj_R0nG3ayqn1TxCsJTTBrhA{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<cpp_h6>람다 오버로드 실행 결과</cpp_h6>*  


매개변수의 종류가 많아질수록 함수 오버로딩의 코드가 매우 길어질 것입니다. 람다식 오버로드를 이용하면 동작시키는 코드를 모을 수 있습니다. 

<br>

#### **<cpp_h4>cpp:</cpp_h4>**

```cpp

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

![msvn 실행 결과]({{ site.google_drive }}1RHOxgMEnBNCFNuCm7RfrHzFGCnm2ygF7{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<cpp_h6>msvn 실행 결과</cpp_h6>*  

위의 코드는 msvn에서 실행을 시킬 때 에러가 납니다. 그럼 코드가 문제가 있는지 확인해보겠습니다.

![다른 컴파일러에서 실행 결과]({{ site.google_drive }}1jZGAZlr54ipnCpPi02hcpOxXBWUJE6_V{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<cpp_h6>다른 컴파일러에서 실행 결과</cpp_h6>*  

해당 코드는 다른 컴파일러에서는 정상적으로 작동하는 것을 볼 수 있습니다. 원래 위의 람다식 오버로드 코드는 정상적으로 작동해야 합니다.
gcc, icc, clang 의 컴파일러에서는 정상적으로 작동하지만 2023.11.23일 최신 버전 기준으로 마이크로 소프트 컴파일러(msvc)에서 런타임 체크 실패 #2가 발생합니다. (이상한 나라의 마소마소야 C++17이야... 2023.2.22일 날 고쳤다고 했었잖니)

에러가 발생한다고 해서 코드를 작성하지 못하는 건 아닙니다. 마이크로소프트가 컴파일러를 고칠 때까지 잠시동안 쓸 수 있는 4가지 방법이 있습니다.

<br>

#### **<cpp_h4>1. 에러를 발생시크는 원인을 전역함수로 올립니다. </cpp_h4>**

```cpp

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

![해결1 전역함수로 해결]({{ site.google_drive }}16KM6bbt01FVvCJ6LXKyy6BZf1hRu_KqM{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<cpp_h6>해결1 전역함수로 해결</cpp_h6>*  

Run-Time Check Failure #2는 배열 같은 정적사이즈 이상으로 큰 값을 넣을 때 나타나기도 하지만 스택에 할 다량보다 크게 잡힐 때도 에러가 납니다.  실제로 오버로드를 빼면 정상적으로 작동하는 것을 확인할 수 있습니다. 간단하게 코드를 데이터 영역으로 보내면 해결할 수 있습니다.  

<br>

#### **<cpp_h4>2. 캡처 영억에 이상한 값으로 초기화를 넣는다.</cpp_h4>**

```cpp

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

![해결2 캡처영역 이상한 값으로 초기화]({{ site.google_drive }}1l2HlC9JNGJMPVh7sANA-3cqt827e5AOX{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<cpp_h6>해결2 캡처영역 이상한 값으로 초기화</cpp_h6>*  

- 디폴트 초기화에서 문제가 발생한 것이기 때문에 이상한 변수를 사용해서 초기화시켜 주면 문제없이 동작시킬 수 있습니다.


<br>

#### **<cpp_h4>3.</cpp_h4> <red1_error>★</red1_error><cpp_h4>클래스나 구조체에 더미 변수를 사용한다.</cpp_h4>**

```cpp

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

![해결3 구조체에 더미 변수 추가]({{ site.google_drive }}1WeprteqZBPXWwrvxzowJqLF8jJ1UUGYS{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<cpp_h6>해결3 구조체에 더미 변수 추가</cpp_h6>*  


위와 같은 원리이지만 이편이 좀 더 쉽게 코드를 작성할 수 있습니다.

<br>

#### **<cpp_h4>4. 코드 언어를 C++17에서 C++20으로 변경한다.</cpp_h4>**

```cpp

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

![해결4 c++20으로 변경]({{ site.google_drive }}10u9eFs-kCQiMnCaunDmsXufxkbZBQML7{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<cpp_h6>해결4 c++20으로 변경</cpp_h6>*  

P1814R0에 의하면 C++20에서는 추론 가이드를 컴파일러가 암시적으로 생성해 주기 때문에 더 관대하게 코드를 작성할 수 있습니다. (C++20은 추론가이드를 없앨 수 있습니다.) 

<br>

#### **<cpp_h4>cpp:</cpp_h4>**

```cpp

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

![오버로드 추론가이드 삭제]({{ site.google_drive }}1BhZ2b00NPZrlPs9HlN2FU9lZw_JyRkF7{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<cpp_h6>오버로드 추론가이드 삭제</cpp_h6>*  

~~(어쩌다 보니.. 람다 포스트에 템플릿 추론 트레블 슈팅을 쓰고 있는 거지?)~~

<br>
<br>

## <cpp_h2>3. C++ 20 람다</cpp_h2>

### <cpp_h3>1) 구조화된 바인딩 캡처 가능</cpp_h3>

다시 돌아와서 C++20에서 람다를 확인해 봅시다. 람다는 매개변수 팩을 캡처 가능합니다.  

#### **<cpp_h4>cpp:</cpp_h4>**

```cpp

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

![구조화된 바인드 캡처]({{ site.google_drive }}1MTh2SKt_u1VRE8dP7YJsbe7VF8B911I_{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<cpp_h6>구조화된 바인드 캡처</cpp_h6>*  

- 매개변수 팩을 통하여 변수들을 좀 더 유동적으로 받을 수 있습니다.

<br>

### <cpp_h3> 2) 매개변수 auto 대신 명시적으로 템플릿 사용 </cpp_h3>

#### **<cpp_h4>cpp:</cpp_h4>**

```cpp

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

![매개변수 auto 사용]({{ site.google_drive }}1UaXBHPw9yKX_wv3KR0UX2aOspj9M8PnP{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<cpp_h6>매개변수 auto 사용</cpp_h6>*  

<br>

#### **<cpp_h4>cpp:</cpp_h4>**

```cpp

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
![매개변수 템플릿 사용]({{ site.google_drive }}1OZpkQYuWiN49OKh-wn9Oi82yNZf96N3_{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<cpp_h6>매개 변수에 템플릿 변수 사용</cpp_h6>*  

- 매개변수에 auto를 사용하여 컴파일러가 암시적으로 코드를 완성했으나 C++20부터는 매개변수에 템플릿을 사용하여 명시적으로 코드를 작성할 수 있습니다.

<br>

### <cpp_h3>3) 람다의 이름 지정</cpp_h3>

#### **<cpp_h4>cpp:</cpp_h4>**

```cpp

class temp
{
	//auto f= []{};
	decltype([]() {}) f;
};

```
- C++20부터는 람다를 멤버 변수로 만들 수 있습니다. 이 말은 초기화된 람다가 변수 타임이 될 수 있다는 이야기입니다.  

<br>

#### **<cpp_h4>cpp:</cpp_h4>**


```cpp

std::unique_ptr<int, decltype( [](int* p) { delete p; })> pVal( new int );

```
- 따라서 동적 할당된 소멸자를 람다로 만들 수 있습니다.

<br>

#### **<cpp_h4>cpp:</cpp_h4>**

```cpp

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

![set 초기화 조건 코드]({{ site.google_drive }}1ZEwlxES_AzE8t_-HRP7ZOmNZyKwUfFh9{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<cpp_h6>set 초기화 조건 코드</cpp_h6>*  

set 초기화 조건 코드는 아래 람다 코드를 사용해서도 만들 수 있습니다.

<br>

#### **<cpp_h4>cpp:</cpp_h4>**

```cpp

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

![set 람다 조건 코드]({{ site.google_drive }}1RDl3wo1NlzhOmDrMr1v-mKiY3h9bYoQ4{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<cpp_h6>set 람다 조건 코드</cpp_h6>*  

- 람다를 타입으로 사용하여 객체로 지정할 수 있기 때문에 람다를 STL 초기화 코드와 조건문 등에 넣을 수 있습니다.
- p0315r0과 p0624r0 필요 이유에 대해서 설명되어 있습니다.

<br>

#### **<cpp_h4>cpp:</cpp_h4>**

```cpp

template<auto = [] {} >
struct foo { /* ... */ };

int main()
{
	foo<> f1;
	foo<> f2;

	typeid(decltype(f1)) == typeid(decltype(f2)) ? std::cout << "true" : std::cout << "false";
}

```

![리턴타입이 같아보이지만 서로다른 함수]({{ site.google_drive }}1ZjhI3KUHko1zFEhjXlZivUNQOq5wpAgw{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<cpp_h6>리턴타입이 같아보이지만 서로다른 함수</cpp_h6>*  

- 또한, 람다를 타입으로 지정할 수 있지만 같은 모양의 람다라도 반복해서 정의되었으면 서로 다른 타입이 됩니다.
- 이는 코드가 같지만 다른 성질을 가진 객체를 만드는데 유용합니다.

<br>
<br>

## <cpp_h2>4. C++ 23 람다</cpp_h2>

<details markdown =1>
<summary> 이 파트는 아직 C++23이 적용된 컴파일러를 확인 불가능함으로 생략하겠습니다. </summary>

- 매개변수에 this 인수를 사용하여 명시적으로 만들 수 있습니다.
- [ ] mutable { }; 더 이상 코드 레어가 아닙니다.([]() mutable {})
- 비어있는 디폴트 람다를 static을 사용하여 정적으로 변경할 수 있습니다
  
<br>

#### **<cpp_h4>cpp:</cpp_h4>**

```cpp

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
<br>

## <cpp_h2>5. 여담</cpp_h2>

시간이 흐를수록 언어는 발전하고 있기 때문에 람다는 눈여겨볼 가치가 있습니다. 물론 가장 중요한 건 "람다가 어떻게 컴파일 내부에서 변형되는지"가 아닐까 싶습니다. 그럼 읽어 주셔서 감사합니다.

<br>

---

<br>


###### <cpp_h6>참조:</cpp_h6>
###### - [https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p1814r0.html](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p1814r0.html)
###### - [https://en.cppreference.com/w/cpp/20](https://en.cppreference.com/w/cpp/20)  
###### - [https://www.ida.liu.se/~TDDD38/ISOCPP/expr.prim.lambda.html](https://www.ida.liu.se/~TDDD38/ISOCPP/expr.prim.lambda.html)
###### - [https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0624r0.pdf](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0624r0.pdf)
###### - [https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0315r0.pdf](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0315r0.pdf)

