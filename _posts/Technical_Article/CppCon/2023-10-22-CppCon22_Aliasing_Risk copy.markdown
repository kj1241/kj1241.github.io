---
layout: post
title: "C++) 앨리어싱 리스크에 관하여"
date: 2023-10-22 11:10:54 +0900
image: https://drive.google.com/thumbnail?id=1cyQviGk_PGB1mVgAmi1eAs97T-iyF3cx
toc: true
categories: [CppCon]
tags: [C++, Cppcon22, Aliasing Risks]
addsence: true
excerpt: 그래픽 왜곡형상의 디질털 샘플링 엘리어싱이 아닌 동일한 메모리를 참조하는 현상에 관해서 설명하고 있습니다.
---

## <cpp_h2>1. 주제 : Aliasing Risks</cpp_h2>

이번 포스팅할 주제는 C++ 앨리어싱에 관해서입니다. 그래픽스 디지털 샘플링 앨리어싱 왜곡 현상에 관해서 찾아들어오신 분들은 살포시 뒤로 가기를 눌러주세요. CppCon22에서 발표된, [Aliasing in C++ -Risks, Opportunities and Techniques](https://www.youtube.com/watch?v=zHkmk1Y-gqM&list=PLHTh1InhhwT6c2JNtUiJkaH8YRqzhU7Ag&index=112)관한 내용으로 참조하여 작성하였습니다.

<br>
<br>

## <cpp_h2>2. 앨리어싱이란?</cpp_h2>

앨리어싱은 프로그램에서 메모리 위치나 변수가 동일한 메모리를 참조하는 현상을 말합니다. 앨리어싱의 본질은 메모리 종속성에 관한 이야기이며, 컴파일 단계에서 경쟁 조건을 처리할 때 발생한다고 생각합니다. ~~사실 저도 용어 같은 건 잘 모르고 못 외웁니다...~~  
말로 풀어서 어렵게 느껴지실 수 있습니다만, 실제로 코드를 보시면 이해 하 실 수 있으실 겁니다. 단순히 스쳐 지나가면 나중에 엄청난 버그로 돌아올 수 있기 때문에 앨리어싱은 항상 조심해야 합니다. (저는 개인적으로 앨리어싱 문제는 과도한 최적화 때문에 일어난다고 생각합니다.)  

<br>
<br>

## <cpp_h2>3. 앨리어싱이 발생하는 경우</cpp_h2>

그럼 앨리어싱 문제가 뭘까요? 앨리어싱 문제를 고찰하기 전에, 프로그래머가 실수할 수 있는 케이스를 단순하게 만들어서 설명해 보겠습니다.  
K는 단순히 a*a라는 프로그램 코드가 작성한다고 합니다.  

<br>

#### **<cpp_h4>cpp:</cpp_h4>**

```cpp

int a = 10;
int b = a;
std::cout<< a*b <<"\n";

```

위와 같이 작성하게 되면 코드리뷰 시간에 핀잔을 먹게 됩니다. 메모리에 쓸데없는 int 4byte를 b를 선언하여 a 값을 b에 복사함으로 인해 어셈블리어 코드량으로 인한 속도를 저하 문제부터 r-vatue, l-vaule, 가독성과 같은 질타를 듣게 됩니다. 물론 매우 좋은 말임은 틀림없습니다. K는 그럼 최적화된 코드를 작성합니다.  

<br>

#### **<cpp_h4>cpp:</cpp_h4>**

```cpp

int a = 10;
a *= a;
std::cout<< a <<"\n";

```

이후 K는 위의 코드를 확장하여, a*a였던 코드를 (a , b)*a라는 코드로 변형시키려고 합니다.  

<br>

#### **<cpp_h4>cpp:</cpp_h4>**

```cpp

complex<int> x{10, 20};
x *= reinterpret_cast<int*>(&x)[0]; // <-앨리어싱 문제
std::cout << x << "\n";

```

이러는 순간 앨리어싱 문제가 발생합니다. 코드만 보면 (10 , 20) * 10를 생각하며 작성하였지만 실제로 코드를 돌리게 되면 (100,2000)이라는 결과값을 받게 됩니다. 어셈블리어 순서를 보면 10 * 10을 진행하고 그다음 x[0] = 100이 되기 때문에  20 * 100을 하여 2000이 되게 됩니다. x, x[0] 둘 다 동일한 메모리를 사용하기 때문에 앨리어싱 문제라고 이야기할 수 있습니다.  

<br>

#### **<cpp_h4>cpp:</cpp_h4>**

```cpp

auto concat = [](string& result, const auto&... args) 
{
        ((result += args), ...);
};

string x{"hello "}, y{"world "};
concat(x, y, x); // <- 앨리어싱 문제 발생
cout << x << "\n";

```

![결과]({{ site.google_drive }}11z3H74JBzXNhTOY3iM81tT_uRBFZFL0N{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<cpp_h6>코드 결과</cpp_h6>*  

람다를 사용하여 string 문자열 합성 코드를 작성하게 되면 코드만 보면 "hello world hello"가 작성되어야 하지만 처음 x = x+y 가 이루어져서 hello world가 되고 x = x+x 가 됨으로 "helle world hello world"가 됩니다.  

<br>

#### **<cpp_h4>cpp:</cpp_h4>**

```cpp

template <typename Function>
void test(string_view name, Function F) {
    char buffer[50] = "hello ";
    F(buffer + 1, buffer, 6); // <- 앨리어싱 에러
    buffer[0] = ' ';
    cout << name <<" " << buffer << (" hello "sv == buffer ? "true" : "false") << "\n";
}

int main()
{
    test("strcpy ", [](auto dst, auto src, auto...) { strcpy(dst, src); });
    test("strncpy ", strncpy);
    test("memcpy ", memcpy);
    test("memmove", memmove);
    test("copy_n ", [](auto dst, auto src, auto size) { copy_n(src, size, dst); });
}

```

![버퍼복사]({{ site.google_drive }}1cyQviGk_PGB1mVgAmi1eAs97T-iyF3cx{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<cpp_h6>버퍼 복사</cpp_h6>*  

![버퍼복사 결과]({{ site.google_drive }}1iXJlTSkG6EV-M32oOR_KrsP8hTv80JHq{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<cpp_h6>버퍼 복사 결과</cpp_h6>*  

임베디드처럼 극한의 제한된 메모리를 사용하지 않는 이상 버퍼에 자기 자신을 참조하여 사용하는 것은 위험합니다. (하지만 코드 로직 구성이 아름다워서 가져와 봤습니다.)  
최적화가 정말 필요해서 사용하더라도 컴파일러마다 코드 동작이 다를 수 있음으로 유의해야 합니다. (어셈블리코드가 메모리 주소에서 실행하는 게 아니라 레지스터에서 직접 수행하고 컴파일러가 최적화하기 때문입니다.)  
단순하게 코드를 작성하였지만 lambda, vector, string 등 포인트를 사용하는 곳에서 발생할 수 있으며, 코드가 복잡할수록 찾기 힘들 수 있습니다.  

<br>
<br>

## <cpp_h2> 4. 앨리어싱이 대처하는 방법</cpp_h2>

코드 작성 제한 사항 부분을 제외하고 실질적으로 프로그래머가 대처해야 하는 방법에 대해 적어 보도록 하겠습니다.

1. call by value을 생각하자 - 인수를 계수를 값으로 전달받으면 복사 오버헤드는 있지만 엘리어싱이 발생하지는 않습니다.
2. 포인트에 관해서 방어적 코드를 작성하자 - 실질적 코드 사용자가 버퍼 복사 코스트 값을 선택할 수 있도록 오버로딩을 통하여 함수를 작성합니다.
3. 문서화를 하여 앨리어싱 위험을 줄이자


읽으시느라 고생하셨습니다.