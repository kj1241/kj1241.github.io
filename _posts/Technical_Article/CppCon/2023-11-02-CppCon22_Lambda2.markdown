---
layout: post
title:  "C++ ) 람다 관용구... 2 람다 정리(1)"
date:   2023-11-02 16:43:08 +0900
image: https://github.com/kj1241/kj1241.github.io/assets/22047442/daf6acb0-966a-4864-bff4-5deafbc0a716
toc: true
categories: [CppCon]
tags: [C++, Cppcon22, lambda, C++20]
addsence: true
---




<br>
<h2><blue1_h2> 5. C++ 11 람다 </blue1_h2></h2>

<br>
<h3><blue1_h3> 1) 기본적인 람다식과 컴파일러 코드 </blue1_h3></h3>
  
앞서서 이야기했지만 중요하니 한번더 짚고 넘어가겠습니다.  
저처럼 람다가 익숙하지 않으신 분들은 코드가 컴파일 단계에서 어떻게 변형되는지 알아두면 편합니다.  
(실제로는 더욱 복잡하지만, 색에 따라서 비교하여 생각하시면 더욱 편하게 이해 하실수 있습니다.)  

![컴파일러변형코드](https://github.com/kj1241/kj1241.github.io/assets/22047442/daf6acb0-966a-4864-bff4-5deafbc0a716){: width="100%" }

- 클로져 유형과 클로져 이름은 사용자가 지정할 수 없습니다.  
(인라인 호출 연산자를 사용하여 해당 클로저 유형을 생성합니다.)
- 컴파일러는 이 클로저의 이름 없는 임시 인스턴스(객체)를 생성합니다.  
- C+11와 C에서는 클래스의 기본 생성자와 할당이 불가능합니다.  




![mutealbe](https://github.com/kj1241/kj1241.github.io/assets/22047442/02016d2b-6adf-46b1-915f-9dae173278e3){: width="100%" }
- 람다는 기본적으로 const라서  외부변수를 수정할 수 없습니다.  
수정하고 싶으면 mutable을 사용하여 const를 지워야 합니다.  

![리턴타입](https://github.com/kj1241/kj1241.github.io/assets/22047442/a8b4246b-f129-4767-82c2-a24264cc0e94){: width="100%" }
- 또한 흥미로운 점은 반환유형이 컴파일러에 의해서 추론됩니다.  
만약 반환 유형을 명시적으로 사용하고 싶으면 "->"을 사용하여 작성하면 됩니다.  


<br>
<h3><blue1_h3> 2) 람다와 원시 함수 포인터 </blue1_h3></h3>

람다는 객체기도 하지만 본질적으로는 함수입니다.   
따라서 C++11 이전의 만들어진 원시 객체 함수 포인터와도 호환 (레거시 콜)을 사용할 수 있습니다.   

```c++
int add(int i) //구현부
{
    return i + i;
}

void LegacyEx(int(* f)(int)) //출력파트
{
    std::cout << "10의 연산값은 " << f(10) << "입니다.\n";
}

int main() {
    LegacyEx(add); //함수 포인터 
    LegacyEx([](int i) { return i + i; }); // 람다
}

```
![코드결과](https://github.com/kj1241/kj1241.github.io/assets/22047442/0f4e247b-bab9-44d1-84c0-a1f3fbcb3aee){: width="100%" }

  
람다는 객체이지만 본질은 함수"F(x)"라는 추상적 개념입니다.  
아무것도 없기 때문에 함수 포인터에 컴파일러가 암시적 변환으로 원시 함수 포인터를 변환해 줍니다.   
static_cast을 이용하여 때때로 명시적 변환이 필요할 때가 있습니다.  
```c++
int main() {
    //auto *fuc = [](int i) { return i + i; }; <- 에러 이유: 람다 자체의 타입 추론불가
    auto* fuc = static_cast<int(*)(int)>([](int i) { return i + i; }); // 암시적변환 -> 명시적변환
    std::cout << fuc << "\n";
}
```
![명시적 변환 코드결과](https://github.com/kj1241/kj1241.github.io/assets/22047442/6a56c24a-d632-4ca6-ae21-13049f00cd8e){: width="100%" }
![컴파일 언어](https://github.com/kj1241/kj1241.github.io/assets/22047442/338d8451-1085-4489-a1ca-b120c7070c38){: width="100%" style="aspect-ratio:16/9"}

- 컴파일러 코드 내부적으로 변환에 관해 선언되어있기 때문에 static_cast를 사용하여 암시적 변환을 명시적으로 형변환 할 수 있습니다.  


한 가지 영상에서 나온 코드를 추가하겠습니다.  
개인적으로 작성된 코드가 높은 코드 이해도를 요함으로 대단했다고 생각합니다.  
하지만 영상에서 경고했던 것처럼 현업에서는 사용하지 마세요  

```c++

int main() {
    auto* fuc = +([](int i) { return i + i; }); // 결국 암시적변환이 이루어짐
    //auto * fuc = +([](auto i) { return i+i }); //C++14 error 결국 코드가 리턴값을 추정할 수 없다.
    std::cout << fuc << "\n";
}

```
![코드 결과](https://github.com/kj1241/kj1241.github.io/assets/22047442/82bfc0e4-3c23-4900-8339-a91675cd6704){: width="100%" }
- 단항 연산자는 클로저의 일부도 아닙니다.   
단일성 더하기 연산자는 함수에 대한 포인터를 포함하고 있기 때문에 이런 코드가 가능합니다.  
근데 이 행위는 프로그래머가 명시적 변환하는 것이 아니라 암시적 변환으로 다시 컴파일러가 계산합니다.  



<br>
<h3><blue1_h3> 3) 캡처 </blue1_h3></h3>
캡처는 간단하게 말해서 외부함수를 람다라는 클래스 안에서 사용할 수 있도록 만들어줍니다.  
이 말은 람다라는 클래스 안에서 변수 생성과 초기화 부분을 맡고 있습니다.  

```c++
int i , j = 0;
auto f =[](int i) {return i;}; //외부 접근을 허용하지 않음

```

- "[ ]"는 디폴트 캡처로서 캡처에 비어있는 상태로 외부접근을 허용하지 않는 상태입니다.

```c++
int i , j = 0;
auto f =[=]() {return i == j;};
```
![캡쳐'='](https://github.com/kj1241/kj1241.github.io/assets/22047442/433ee6e0-a7b4-4530-a16e-0b595bc1e95d){: width="100%" }

- "[ = ]"을 사용하게 되면 부모스택에서 사용 가능한 모든 변수들을 데이터 복사의 형태인 call of value 형태로 값을 복사하여 사용할 수 있습니다.  
- "[ i , j ]" 같이 특정 변수를 데이터를 복사하여 람다 내부로 사용할 수도 있습니다.  

![캡쳐 '&'](https://github.com/kj1241/kj1241.github.io/assets/22047442/ce924535-ea82-4529-9fcd-dd053c54b507){: width="100%" }

- "[ & ]"을 사용하게 되면 부모스택에서 사용 가능한 모든 변수들을 데이터 참조 형태인 call of reference 형태로 주소를 공유하게 됩니다.
- "[ &i , &j ]" 같이 특정 변수를 데이터를 참조하여 람다 내부로 사용 할 수도 있습니다

다음의 코드는 변수의 주소와 캡처를 통하여 복사 혹은 참조를 거친 변수의 주소를 확인한 코드입니다.
```c++
int main() {
    int i1 = 1;
 
    auto f1 = [=]() mutable { return &i1; };
    auto f2 = [&]() mutable { return &i1; };

    std::cout << "주소 값 i1: " << &i1 << " / 주소 값 f1: " << f1() << "\n";
    std::cout << "주소 값 i1: " << &i1 << " / 주소 값 f2: " << f2() << "\n";
};

```
![주소](https://github.com/kj1241/kj1241.github.io/assets/22047442/ce938c39-b09c-4b81-8ef8-cbdca9e0b2f2){: width="100%" }

다음은 캡처를 통하여 외부변수를 복사 혹은 참조를 사용했을 때 속도를 비교한 코드입니다.
```c++
template<typename Functor>
void temp(Functor functor)
{
    auto startTime = std::chrono::high_resolution_clock::now();
    for (int i = 0; i < 100000000; ++i)
    {
        functor();
    }
    auto endTime = std::chrono::high_resolution_clock::now();

    std::chrono::duration<double> duration = std::chrono::duration_cast<std::chrono::duration<double>>(endTime - startTime);
    double seconds = duration.count();

    std::cout << "캡쳐 실행 시간: " << seconds << " 초" << "\n";
}

int main() {
    int i1 = 1;
    int i2 = 2;

    auto f1 = [=]() mutable { i1 = 10; };
    auto f2 = [&]() mutable { i2 = 20; };

    temp(f1);
    temp(f2);
};

```
![속도비교결과](https://github.com/kj1241/kj1241.github.io/assets/22047442/e26b84ad-2790-482c-ac38-36b971a5357d){: width="100%" }
놀랍게도 복사나 참조 둘다 크게 차이 안나는것을 볼 수 있습니다.  


람다가 생성되기 전 스택의 외부 변수 캡처 말고도, 클래스나 구조체에서를 가리키는 포인터(this)를 참조하거나 복사할 수도 있습니다.  
```c++
struct X {
    void printAsync() {
        std::async([this] {
            std::cout << a + b<<"\n";
            });
    }

private:
    int a = 3;
    int b = 4;
};

int main()
{
    X x;
    x.printAsync();
}
```
![클래스 참조 복사](https://github.com/kj1241/kj1241.github.io/assets/22047442/91132534-8831-496e-b72a-b85761377913){: width="100%" }
![컴파일러 언어](https://github.com/kj1241/kj1241.github.io/assets/22047442/38f85337-7f17-4949-b162-fb3a12defa95){: width="100%" }

- "[this]"를 사용하게 되면 외부 클래스의 포인터를 참조하기 때문에 객체에 접근할 수 있습니다.
- "[*this]"를 사용하면 클래스의 있는 객체를 복사하여 람다 내부에서 사용할 수 있습니다.

  
메모리의 데이터 영역의 코드와 람다함수의 관계 코드입니다.  
```c++
static int a = 0; //전역변수로서 데이터영역에 올라감
auto f1 = [=](){return a;}; // 함수 복사는 일어나지만 전역변수임으로 복사와 상관없습니다.
auto f2 = [ ](){return a;};
```

- 람다 내부 함수 안에서도 아무런 변수 캡처 없이 전역변수를 사용할 수 있습니다.
- const , constexpr 역시 선언을 하게 되면 전역변수와 같이 변수들을 메모리의 데이터영역으로 올리게 됨으로 람다 내부에서 캡처 없이 사용할 수 있습니다.


<br>
<h3><blue1_h3> 4) 즉시 호출되는 람다(IIFE) </blue1_h3></h3>
![IIFE](https://github.com/kj1241/kj1241.github.io/assets/22047442/b8f913e0-a0c9-4ed4-bc5f-ff710e714bcb){: width="100%" }

```c++
struct Temp
{
    bool isNumber = 0;
    int value = 10;
    int x_value = 20;
    int y_value = 30;
    int z_value = 40;
};

int value(Temp temp)
{
    if (temp.isNumber==0)
        return temp.x_value;
    else if (temp.isNumber == 1)
        return temp.y_value;
    else
        return temp.z_value;
}


int main() {
	 std::vector<int> temps;
     Temp temp;
    
    temps.push_back(value(temp)); // 전역변수 실행
    temps3.push_back([&temp](){
        if (temp.isNamber == 0)
            return temp.x_value;
        else if (temp.isNamber == 1)
            return temp.y_value;
        else
            return temp.z_value;
    }()); //람다로 실행 위와 같은 방식
}
```
- 객체 상황에 따라 다르게 초기화 할 필요성이 있을때, 함수를 따로 만들어서 초기화하는 것보다 IIFE 람다를 만들어서 초기화는게 더 효율적입니다.




<br>
<h3><blue1_h3> 5) 한번만 불리는 람다. </blue1_h3></h3> 

```c++
struct oneCall {
    oneCall(int &i) {
        static auto _ = [](int &j) mutable { 
            ++j;
            std::cout << "call fuction" << "\n";
            return 0;
        }(i); // _ : 임의의 함수
    }
};

int main()
{
    int i = 0;

    oneCall x1(i);
    oneCall x2(i);
    oneCall x3(i);

    std::cout << i << "\n";
}
```
![한번만 불리는 람다 결과](https://github.com/kj1241/kj1241.github.io/assets/22047442/9d24d2e0-1206-4f3b-ab04-e3674ccd710f){: width="100%" }

- 정적 객체 초기화는 프로그램이 실행될 때 단 한번 초기화 된다는 보장이 있음으로 다른 객체로부터 안전합니다.  
다른 객체들이 이 함수를 초기화 하지 못하도록 암시적으로 컴파일러가 일종의 원자 플래그를 만들 것입니다.
- 사용처 : 멀티 쓰레드, 멀티 프로세서
