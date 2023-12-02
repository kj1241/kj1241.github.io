---
layout: post
title:  "RTTI에 대해서"
date:   2023-03-06 11:11:56 +0900
image: https://github.com/kj1241/kj1241.github.io/assets/22047442/8d81001b-b298-4a81-8c0c-e0ef0552abd1
toc: true
categories: [CppCon]
tags: [C++, RTTI, Reverse Engineering ]
addsence: true


---


<h2><blue1_h2> 1. 주제 :RTTI  </blue1_h2></h2>
이번에 분석할 주제는 RTTI에 관해서입니다.
이 주제를 선택한 이유는 면접에서 물어본 주제인데요.  
면접 당시에는 정확하게 몰랐기 때문에 인지하고자 공부하게 되었습니다.

<br>
<br>
<h2><blue1_h2> 2. RTTI이란? </blue1_h2></h2>

마이크로 소프트의 정의에 의하면, RTTI는 Run Time Type Informaiton의 약자로 프로그램 실행 중에 객체의 형식이 결정될 수 있도록 하는 메커니즘라고 합니다.  
많은 라이브러리에서는 자체적으로 구현하고 있었으나, 라이브러리가 호환되지 않는 문제 때문에 컴파일러에서 추가되었다고 합니다.  
  
RTTI(런타임 형식 정보)에는 3가지 기본 c++ 요소가 있습니다.
- dynamic_cast 연산자
- typeid 연산자
- type_info 추상 클래스

연관되어 있는 디자인 패턴을 살펴보자면 Java, C#의 플러그 인에 들어가는 리플렉터 패턴을 생각하시면 됩니다.  
★리플렉션 패턴: 객체를 통해서 클래스 정보를 분석하는 프로그래밍 기법  
  
즉, 구체적 클래스의 구체적 타입을 알지 못해도 메소드, 타입, 변수에 접근할 수 있도록 해주는 기법입니다.  
(여기서 C# 같은 경우에는 메모리에 sturct는 스택에 할당 class는 힙에 할당되기 때문에 class는 참조형식, 즉 동적으로 올라가도록 됩니다.  
자바의 경우 모든 상속이 virtual 입니다.)  

![RTTI구조](https://github.com/kj1241/kj1241.github.io/assets/22047442/e8b0a657-6b94-4ff9-b460-9cb5cfe4f245){: width="100%" style="aspect-ratio:16/9"}
*Reflection pattern*


<br>
<br>
<h2><blue1_h2> 3. RTTI에 대해서 </blue1_h2></h2>

C++에서 4가지 종류의 type_cast을 공부한 사람이라면, dynamic_cast가 어떻게 동작하는지는 알고 계실 겁니다.   
또한 단순하게 위의 3가지(dynamic_cast, typeid, type_info)를 쓰는데 그렇게 크게 어려운 문법들은 아닙니다.  
코드를 작성하는 데 있어서 위의 내용만 알면 됩니다.  

 

하지만 여기서 한 가지 제일 궁금한 정보가 빠졌습니다.  
"그래서 RTTI의 알고리즘은 어떻게 동작하는가?"에 대해서 마소는 전혀 설명하고 있지 않죠.  
C++ 표준에 따르면, RTTI는 정확히 어떻게 구현되는지는 결정하지 않으며 그 구현은 애플리케이션 바이너리 인터페이스(ABI)에 "위임" 한다고 합니다.  
ABI란,  Application Binary Interface의 약자로 응용 프로그래밍과 라이브러리의 Binary(2진수)로 이루어진 인터페이스(연결/통신)를 뜻합니다.  
위의 RTTI 정의를 풀어서 말하면, 컴파일러와 사용하는 플랫폼에 따라서 달라집니다.  

 

RTTI가 동작하게 되면 당연하게 런타임에서 동작하기 때문에 느립니다. 또한 RTTI는 컴파일러와 플랫폼에 따라서 달라지기 때문에 오버헤드에 대해서 얼마나 걸릴지 알 수 없는 미지의 공포가 있습니다. (stack oveflow에 보면 RTTI가 동작하기 위한 비용이라고 말하시는 사람도 있지만 CppCone을 보면 오버헤드가 맞습니다.)  
따라서 RTTI를 컴파일러 수준에서 사용 안 하도록 설정할 수도 있습니다.  
MSVC(visual studio): /GR -   
gcc: -fno-rtti  
위의 옵션을 사용하면 RTTI의 사용을 끌 수 있습니다. 또한 RTTI 옵션을 사용하지 않아도 예외적용, 동적 디스패치(오버라이딩)를 사용하는데 문제가 없습니다.  


<br>
<br>
<h2><blue1_h2> 4. RTTI를 확인해 보기 </blue1_h2></h2>

이제 우리는 미지의 공포를 탐험할 시간입니다. 아마... 리버스 엔지니어링 비슷하게 말이죠... (대학교 2학년 이후로 안 해도 될 줄 알았는데... 3D 직업 같으니라고... )  
일단 간단한 코드를 작성하여 RTTI의 흔적을 찾아보도록 합시다.  

```c++
#include <iostream>

class Animal
{
public:
    virtual ~Animal(void) {}
};
class Cat : public Animal {};
class Dog : public Animal {};

int main(void)
{
    Animal* pAnimal = new Cat;

    std::cout << "고양이 클래스 인가요? " << (dynamic_cast<Cat*>(pAnimal) ? "true" : "false") << std::endl;
    std::cout << "강아지 클래스 인가요? " << (dynamic_cast<Dog*>(pAnimal) ? "true" : "false") << std::endl;
    delete pAnimal;
    return 0;
}
```
![코드결과](https://github.com/kj1241/kj1241.github.io/assets/22047442/5b3bafa2-721a-4c5e-a685-49b82bcab259){: width="100%" style="aspect-ratio:16/9"}
코드의 결과는 위와 같이 나올 것입니다. 그럼 이제 여기서 좀 더 들어가 보도록 하겠습니다.  

<br>
<h3><blue1_h3> 1) virtual function table 확인 </blue1_h3></h3>
C++를 입문하시고 가상함수를 공부하면 빼놓을 수 없는 이야기가 나옵니다. vritual function table입니다.  
그럼 우리는 실제로 존재하는 vritual table을 확인을 하로 가야 합니다.  

vritual function table을 가장 편리하게 확인할 수 있는 방법은 빌드창에서 확인하는 방법입니다.  
그러기 위해서는 마이크로소프트 비주얼 스튜디오 도큐먼트에서 언제부터인가 사라진 플래그 설정이 필요합니다.  
![/d1 reportAllClassLayout 설정](https://github.com/kj1241/kj1241.github.io/assets/22047442/9f7aa6fe-27b9-45d6-9154-08a55e763aa8){: width="100%" style="aspect-ratio:16/9"}
*/d1 reportAllClassLayout 설정*

디버그 → 속성 → C/C++ → 명령줄 → /d1 reportAllClassLayout을 작성하면 됩니다.  

![/d1 reportAllClassLayout 결과](https://github.com/kj1241/kj1241.github.io/assets/22047442/e07ee7a3-1a0b-4cf1-bb12-491e2ca5401b){: width="100%" style="aspect-ratio:16/9"}
*/d1 reportAllClassLayout 결과*

빌드를 실행하면 정의할 virtual function table을 확인 및 더 자세한 사항을 찾아볼 수 있습니다.  


<br>
<h3><blue1_h3> 2) 메모리 확인 </blue1_h3></h3>
![어셈블리어](https://github.com/kj1241/kj1241.github.io/assets/22047442/b4cf0f3c-6456-4428-ab4b-d8461991d172){: width="100%" style="aspect-ratio:16/9"}
코드 영역에 올라간 어셈블리어입니다.  
lea r9, [Cat 'RTTI Type Desciptor'(07FF6 1175 F198h)]  r9 영역에 RTTI Type Desciptor의 주소를 저장하였습니다.  

![메모리주소](https://github.com/kj1241/kj1241.github.io/assets/22047442/a60bfc7a-9b3b-45c7-b7fb-e1188412cfc9){: width="100%" style="aspect-ratio:16/9"}

7FF6 1175 F198 - 7FF6 1174 0000 = 1 F198 을 도출할 수 있습니다.  

분석툴로 1F198을 확인하면 .Data(메모리 데이터 영역) 위치로 올라간 것을 확인할 수 있습니다.  
![분석툴 사용](https://github.com/kj1241/kj1241.github.io/assets/22047442/22551cd5-f2e2-4eaf-a357-985f15aafb98){: width="100%" style="aspect-ratio:16/9"}

데이터 주소 시작 위치는: 1F000, 사이즈 크기는: C30, 로우 데이타 위치는 : D400 입니다.   
1F198 -1F000 < C30 임으로 로우 데이타 위치, (D400+198= D598) .Data를 추적하면 다음과 같습니다.  

![세부위치](https://github.com/kj1241/kj1241.github.io/assets/22047442/ff30be59-6cba-4169-a180-0aca80bd9deb){: width="100%" style="aspect-ratio:16/9"}

014001BCB0 주소값 위치와 클래스의 관계를 나타내고 있습니다.  
이 위치를 계산해 보면  014001BCB0 - 0x140000000(.exe base image 64bit 기본값) = 1 BC B0 즉 .text 세션 위치로 들어가고 있는 것을 알 수 있습니다.  
이에 따라서 추측할 수 있는 내용은 RTTI는 데이터 영역에 올라가는데 그 내용은 메모리의 .text세션 위치에 적혀 있습니다.  

이와 같이 가상테이블 __vfptr의 주소 값 07ff61175bc58을 확인해보면 .rdata 세션(읽기 전용)에 올라가는 것을 확인할 수 있습니다.  




<br>
<br>
<h2><blue1_h2> 5. 요약 </blue1_h2></h2>
1. RTTI는 ABI로 런타임에 형식을 결정하는 방법이다.
2. RTTI는 컴파일과 플랫폼에 따라 알고리즘이 다르다.
3. RTTI는 프로젝트에 따라서 사용 안 할 수 있으며, 동적 디스패치와는 무관하다.
4. RTTI Type Disciptor는 메모리 .data 위치에 올라가며, virtual table은 메모리 .rdata 위치에 올라간다.