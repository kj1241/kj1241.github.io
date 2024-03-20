---
layout: post
title: "C++) 람다 관용구... 1 - 람다에 관한 이해"
date: 2023-11-02 13:13:24 +0900
image: https://drive.google.com/thumbnail?id=1fy2gMRHWXN7qvrVQhHcOt6jGKOKX5SJu
toc: true
categories: [CppCon]
tags: [C++, Cppcon22, lambda, C++20]
addsence: true
excerpt: c++ 람다에 관해서 기본적으로 알아야 할 내용을 정리하고 있습니다.
---
 
이번 분석 내용은 C++ 람다라는 주제로 돌아왔습니다. 개인적으로 영상 내용이 하드 해서 볼 때는 10분이면 충분했었지만, 글로 정리하려니깐 생각보다 오래 걸렸습니다. 개인적으로 영상 내용이 하드 해서 볼 때는 10분이면 충분했었지만, 글로 정리하려니깐 생각보다 오래 걸렸습니다. 영상을 보시길 추천드립니다.

<br>

---

<br>

## <cpp_h2>1. 주제 : C++ Lambda Idioms </cpp_h2>

이번 분석할 주제는 C++의 람다에 관해서입니다. 이번 분석은, CppCon에서 발표된, [Lambda Idioms](https://www.youtube.com/watch?v=xBAduq0RGes)을 참조하여 분석해보겠습니다. 람다가 도입될 당시 람다에 대한 부정적인 견해가 많았으나, 이 영상을 보고 다시 고찰해보려고 합니다.  


<br>
<br>

## <cpp_h2>2. C++ 람다의 장단점</cpp_h2>

람다는 보는 관점에 따라 프로그래머마다 차이가 있을 수 있습니다. 따라서 객관적인 생각을 위해서 람다의 장단점을 짚고 넘어가겠습니다.  

<br>

<cpp_h5> 코루틴의 장점: </cpp_h5>

1. 간결한 문법: 람다함수는 코드를 함축시키기 때문에 코드가 간단해집니다.
2. ★인라인 함수: 컴파일러는 람다함수를 인라인 함수로 최적화할 수 있으면, 함수 오버헤드가 감소합니다.( 캐시 지역성 향상, 프로그램 성능 향상)

<br>

<cpp_h5> 람다의 단점:  </cpp_h5>

1. 가독성: 지나치게 복잡한 람다는 코드 가독성을 저해할 뿐만 아니라 함수의 이름이 없기 때문에 주석 없이는 동작의 유추가 어려워질 수 있습니다.
2. ★재사용의 어려움: 람다 함수는 지역적인 함수 객체로 다른 함수나 클래스에서 재사용하기 어렵습니다.

<br>

<cpp_h5> 총평 </cpp_h5>

함수 객체의 캡슐화를 하는 데 사용할 수 있지만, 코드 재사용성이 떨어집니다.
  

글만 읽어서는 람다에 대해서 장단점을 이해하기 어렵습니다. 그럼 예제를 통하여 살펴봅시다.  

<br>

### <cpp_h3>1) 코루틴의 장점: 람다와 전역함수 동작시간 비교</cpp_h3>
  
마이크로소프트 도큐먼트에 있는 람다식 예제를 사용하여 람다식과 전역함수의 동작시간을 비교해 보겠습니다. 방법은 다음과 같습니다.  

- 백터 컨테이너의 원소의 개수를 50000개로 설정하고 안의 내용을 채워줍니다.
- sort 함수를 이용하여, 전역함수를 사용하여 정렬한 시간과 람다를 사용하여 정렬한 시간을 측정합니다.

<br>

#### **<cpp_h4>cpp:</cpp_h4>**

```cpp

#define _CRT_SECURE_NO_WARNINGS
#include <iostream>
#include <string>
#include <chrono>
#include <vector>
#include <algorithm>

struct Person
{
    std::string name;
    int timeOfJoin;
};

std::vector<Person> people(50000);

static bool compare(const Person lhs, const Person rhs) {
    return lhs.name < rhs.name;
}

int main()
{
    for (int i = 0; i < 50000; ++i)
    {
        people[i].name = "Kim" + std::to_string(10000-i);
        people[i].timeOfJoin = i;
    }   
    
    auto startTime = std::chrono::high_resolution_clock::now();
    //std::sort(people.begin(), people.end(), [](const Person& lhs, const Person& rhs) {return lhs.name < rhs.name; });
    std::sort(people.begin(), people.end(), compare);
    auto endTime = std::chrono::high_resolution_clock::now();
    std::chrono::duration<double> duration = std::chrono::duration_cast<std::chrono::duration<double>>(endTime - startTime);
    double seconds = duration.count();

    for (auto p : people) 
        std::cout << p.name<< " " <<p.timeOfJoin<<"\n";

    std::cout << "전역함수 알고리즘 실행 시간: " << seconds << " 초" << "\n";
}

```

![전역함수 코드결과]({{ site.google_drive }}1C_zSQAxbxMwIUlTL3ZeCEqHtzrRITakf{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<cpp_h6>sort정렬에 전역함수를 사용하여 걸린 시간</cpp_h6>*  

<br>

#### **<cpp_h4>cpp:</cpp_h4>**

```cpp

#define _CRT_SECURE_NO_WARNINGS
#include <iostream>
#include <string>
#include <chrono>
#include <vector>
#include <algorithm>

struct Person
{
    std::string name;
    int timeOfJoin;
};

std::vector<Person> people(50000);

static bool compare(Person lhs, Person rhs) {
    return lhs.name < rhs.name;
}

int main()
{
    for (int i = 0; i < 50000; ++i)
    {
        people[i].name = "Kim" + std::to_string(10000-i);
        people[i].timeOfJoin = i;
    }   
    
    auto startTime = std::chrono::high_resolution_clock::now();
    std::sort(people.begin(), people.end(), [](const Person& lhs, const Person& rhs) {return lhs.name < rhs.name; }); //이름순 비교
    //std::sort(people.begin(), people.end(), compare);
    auto endTime = std::chrono::high_resolution_clock::now();
    std::chrono::duration<double> duration = std::chrono::duration_cast<std::chrono::duration<double>>(endTime - startTime);
    double seconds = duration.count();

    for (auto p : people) 
        std::cout << p.name<< " " <<p.timeOfJoin<<"\n";

    std::cout << "람다 알고리즘 실행 시간: " << seconds << " 초" << "\n";
}

```

![람다 코드 결과]({{ site.google_drive }}1Kp7EQL4-ElbjcVsTBWMFQHCIOWmyfymP{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<cpp_h6>람다 코드 결과</cpp_h6>*  

실험결과 50000개 원소가 있는 백터 컨테이너를 이름순으로 정렬하는데 람다를 사용하면 1.17초가 걸리며 전역함수는 4.85초가 걸립니다.  
  
전역함수를 사용할 때와 다르게 람다를 사용하면 EIP 레지스터 주소가 변하지 않기 때문에 빠릅니다. 좀 더 자세히 말하면 전역함수는 호춣하기위해 프로그램 카운터가 변합니다. 하지만 람다는 프로그램 카운터가 변하지 않고 컴파일 함수 호출을 직접 본문으로 대체하기 때문에 속도가 빠릅니다.

<details markdown=1>
<summary> ~~번외) 람다와 비슷한 원리로 인라인함수를 만들어서 코드를 더욱 최적화하기(?)~~ </summary>

#### **<cpp_h4>cpp:</cpp_h4>**

```cpp

struct Person
{
    std::string name;
    int timeOfJoin;
};

std::vector<Person> people(50000);

struct compare {
    inline bool operator() (const Person& lhs, const Person& rhs) const {
        return lhs.name < rhs.name;
    };
};

int main()
{
    for (int i = 0; i < 50000; ++i)
    {
        people[i].name = "Kim" + std::to_string(10000-i);
        people[i].timeOfJoin = i;
    }
    
    auto startTime = std::chrono::high_resolution_clock::now();
        std::sort(people.begin(), people.end(), compare());
    auto endTime = std::chrono::high_resolution_clock::now();
    std::chrono::duration<double> duration = std::chrono::duration_cast<std::chrono::duration<double>>(endTime - startTime);
    double seconds = duration.count();

    for (auto p : people) 
        std::cout << p.name<< " " <<p.timeOfJoin<<"\n";

    std::cout << "인라인함수 알고리즘 실행 시간: " << seconds << " 초" << "\n";
}

```

![인라인함수 코드결과]({{ site.google_drive }}1TX9bcmvM915TmLIW-yYnt83wxkMU3-N1{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<cpp_h6>인라인함수 코드결과</cpp_h6>*  

</details>

<br>

### <cpp_h3>2) 코루틴의 단점: 가독성</cpp_h3>

![코드를 읽는 시선]({{ site.google_drive }}1eNzEihf9yKv-gGOGXVoJWa-5gMP1YP-T{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<cpp_h6>코드를 읽는 시선</cpp_h6>*  

보통 C++에서 프로그래머가 코드를 읽는 방향은 우리가 책을 읽는 방향과 비슷하게 좌횡서를 따르게 됩니다. 하지만 람다는 매개변수에 들어가는 값을 찾고 초기화 변수의 값을 찾아서 읽어야 되기 때문에 가독성이 떨어집니다.아래는 람다를 읽는 방법 예제입니다.  

![람다를 읽는 방법]({{ site.google_drive }}1i5mug8B_ZLVRJc6swomgdnelRTOe35UE{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<cpp_h6>람다를 읽는 방법</cpp_h6>* 

1. 람다 매개변수에 들어가는 실제 값을 찾습니다.
2. 람다 캡처에 들어가는 변수들을 확인합니다.
3. 이렇게 찾은 값들을 클로져에 있는 식에 대입합니다.

<br>
<br>

## <cpp_h2>3.  함수형 언어</cpp_h2>

평소 C++ 보편적으로 쓰는 로직은 튜링 머신에서 진화한 명령어 언어입니다. 하지만 람다는 알론소 처지의 람다 계산법부터 시작은 함수형 언어라고 합니다. 이 키워드를 소개하는 이유는 람다의 논리적 구조를 살피기 전에 명령어 언어와 함수형 언어에 관해서 짚고 넘어가야 하기 때문입니다. 프로그래머마다 명령어 언어와 함수형 언어가 대척점에 있다고 생각하시는 분도 있고 아니라고 생각하시는 분들도 있기 때문입니다. (여러분이 생각하는 것이 답입니다) 

<br>

![명령어 언어와 함수형 언어]({{ site.google_drive }}1fy2gMRHWXN7qvrVQhHcOt6jGKOKX5SJu{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<cpp_h6>명령어 언어와 함수형 언어</cpp_h6>*  

<br>

#### **<cpp_h4>cpp:</cpp_h4>**

```cpp

//명령어 언어
int add(int i) //구현부
{
    return i + i;
}

int main() {
    int number = 10; //입력 값
    std:; cout << add(10) <<"\n"; //계산 -> 결과값 
}


//함수형 언어
int input_data(int(* f)(int)) //데이터
{
    return f(10);
}

int main() {
    auto f = [](int i){return i+i; }; // 입력 람다
    std::cout << input_data(f) <<"\n"; //계산 -> 결과값 
}

```

(로직 비교를 위해서 일부로 최적화하지 않고 코드를 늘려 사용했습니다.)  
결국은 우리는 결론을 도출해야 되는 코드를 작성해야 하는 입장에서는 입력 값이 람다라는 객체로 대체되었기 때문에 구조는 크게 다르지 않습니다. 대신 식에 값을 넣는 명령어 언어와 값에 식을 대입하는 함수형 언어는 행위 자체가 반대이기 때문에 대착점에 있다고도 생각할 수 있습니다.  

<br>
<br>

## <cpp_h2>4. ★기본 람다와 컴파일러의 코드</cpp_h2>

앞서 논리적 구조에서 람다는 객체라고 말했습니다. 그럼 컴파일러는 람다를 어떻게 객체 코드로 인식하는지 알면 좀 더 람다에 대해서 명확하게 이해할 실 수 있으실 겁니다.  

![기본 람다 해석 코드]({{ site.google_drive }}1pvANkAtWdB7EiDnsFe7caY6Pq8R34qX9{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<cpp_h6>명령어 언어와 함수형 언어</cpp_h6>*  

어셈블리어를 해석한 완벽한 코드는 아니지만, 좀 더 대조를 쉽게 하기 위해서 같은 의미는 비슷한 색으로 입력하였습니다. 