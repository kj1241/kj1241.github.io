---
layout: post
title: "방문자 패턴 의존성 깨기"
date: 2023-03-13 13:08:33 +0900
image: https://drive.google.com/thumbnail?id=10KWTPUjOShEUyDOAsLC3MK7mgTKvnVvc
toc: true
categories: [CppCon]
tags: [C++, Cppcon22, Virtual , Visit, std::variant, 다형성]
addsence: true
---

## <cpp_h2>1. 주제: Breaking Dependencies - The Visitor Design Pattern in Cpp</cpp_h2>

이번 분석은, CppCon에서 발표된 <a herf= "https://www.youtube.com/watch?v=PEcy1vYHb8A"> Breaking Dependencies - The Visitor Design Pattern in Cpp</a>으로 가저왔습니다.  

블로그를 이주하면서 Cppcon과 관련된 내용을 다시 작성하는 주제인데, 블로그를 이주하기 전에는 코드가 모든 것을 표현 해준다고 생각 했습니다. 따라서 단순하게  Enum Solution, OO Solution, 방문자 패턴, variant를 이용한 코드 작성 이렇게 4가지의 성능 비교표와 코드만 실험해서 올렸습니다. 단순한 성능 측정을 넘어 코드의 전반적인 측면을 강조하는, 좀 더 고차원적인 주제로 위의 내용을 다뤄보고자 합니다. 방문자 패턴 리포터를 찾으로 오신 분은 뒤로가기를 눌러주세요.  

<br>
<br>

## <cpp_h2> 2. 코드 분석 </cpp_h2>

영상에서 이야기하는 <cpp_h5>Enum Solution, OO Solution, 방문자 패턴,variant를 이용한 코드 작성 이 4가지 코드</cpp_h5>는 다형성이라는 소재로 묶여있습니다.    
  
이 주제를 풀어쓰기 힘들었던 점은, 단순히 디자인 패턴을 맹목적으로 옳다고 생각하고 디자인 패턴대로 작성해야 된다는 사람들과 논쟁하기 싫었기 때문입니다. 코드의 형태에는 코드를 작성하는 사람의 목적이 들어있고, 상황에 따라 코드의 형태는 언제든지 바뀔 수 있기 때문이라고 생각합니다.  
따라서  효율적으로 코드 형태를 작성하기 위해서는 코드 형태의 장단점 파악이 가장 중요하다고 생각기 때문에 함께 알아보도록 합시다.   

<br>

### <cpp_h3>1) Enum Solution </cpp_h3>

c에서 사용했던 정통적 방식의 상태변화 입니다.

<br>

#### **<cpp_h4>cpp:</cpp_h4>**

```cpp

#include <iostream>
#include <vector>
#include <memory>
#include <variant> 
#include <ctime>
#include <windows.h>
#include <psapi.h>

enum ShapeType
{
	circle,
	square,
	ellipse,
	rectangle
};
struct Vector2
{
	double x;
	double y;
	Vector2(double x, double y) :x(x), y(y) {};
};

class Shape
{
public:
	explicit Shape(ShapeType t) :type(t)
	{
	}
	virtual ~ Shape() = default;
	ShapeType GetType() const noexcept
	{
		return type;
	}
private:
	ShapeType type;
};
class Circle : public Shape
{
public:
	explicit Circle(double rad) :Shape(circle), radius(rad)
	{
	}
	double GetRadius() const noexcept
	{
		return radius;
	}

private:
	double radius;
};

//void Translate(Circle&, Vector2 const&);
void Rotate(Circle&, double const&);
void Draw(Circle const& c)
{
	std::cout << c.GetRadius()<<"\n";
}


class Square : public Shape
{
public:
	explicit Square(double side) :Shape(square), side(side)
	{
	}
	double GetSide() const noexcept
	{
		return side;
	}

private:
	double side;
};

//void Translate(Circle&, Vector2 const&);
void Rotate(Square&, double const&);
void Draw(Square const&s)
{
	std::cout << s.GetSide() << "\n";
}

class _Ellipse : public Shape
{
public:
	explicit _Ellipse(double r1, double r2) :Shape(ellipse), radius(r1,r2)
	{
	}
	Vector2 GetRadius() const noexcept
	{
		return radius;
	}

private:
	Vector2 radius;
};

//void Translate(Circle&, Vector2 const&);
void Rotate(_Ellipse&, double const&);
void Draw(_Ellipse const& c)
{
	std::cout << c.GetRadius().x<<" " << c.GetRadius().y << "\n";
}

class _Rectangle : public Shape
{
public:
	explicit _Rectangle(double s1, double s2) :Shape(rectangle), side(s1,s2)
	{
	}
	Vector2 GetSide() const noexcept
	{
		return side;
	}

private:
	Vector2 side;
};

//void Translate(Circle&, Vector2 const&);
void Rotate(_Rectangle&, double const&);
void Draw(_Rectangle const& s)
{
	std::cout << s.GetSide().x<<" " << s.GetSide().y << "\n";
}


void DrawAllShapes(std::vector<std::unique_ptr<Shape>>const& shapes)
{
	for (auto const& s: shapes)
	{
		switch ((s->GetType()))
		{
		case circle:
			Draw(*static_cast<Circle const*>(s.get()));
			break;
		case square:
			Draw(*static_cast<Square const*>(s.get()));
			break;
		case ellipse:
			Draw(*static_cast<_Ellipse const*>(s.get()));
			break;
		case rectangle:
			Draw(*static_cast<_Rectangle const*>(s.get()));
			break;
		}			
	}
}

int main()
{
	PROCESS_MEMORY_COUNTERS_EX pmc;
	memset(&pmc, 0, sizeof(PROCESS_MEMORY_COUNTERS_EX));
	pmc.cb = sizeof(PROCESS_MEMORY_COUNTERS_EX);

	clock_t start, end;
	double duration;

	using Shapes = std::vector<std::unique_ptr<Shape>>;

	Shapes shapes;
	for (int i = 0; i < 10000; ++i)
	{
		switch (rand() % 4)
		{
		case 0:
			shapes.emplace_back(std::make_unique<Circle>(rand()));
			break;
		case 1:
			shapes.emplace_back(std::make_unique<Square>(rand()));
			break;
		case 2:
			shapes.emplace_back(std::make_unique<_Ellipse>(rand(), rand()));
			break;
		case 3:
			shapes.emplace_back(std::make_unique<_Rectangle>(rand(), rand()));
			break;
		}
	}

	start = std::clock();
	{
		DrawAllShapes(shapes);
	}
	end = std::clock();
	GetProcessMemoryInfo(GetCurrentProcess(), reinterpret_cast<PROCESS_MEMORY_COUNTERS*>(&pmc), sizeof(pmc));

	std::cout << "\n";
	std::cout << "로직 실행 시간: " <<end - start<<"\n";
	std::cout << "가상 메모리 사용량: " << pmc.PrivateUsage << "\n";
	std::cout << "물리 메모리 사용량: " << pmc.WorkingSetSize << "\n";
}

```

![Enum_Solution]({{ site.google_drive }}1WuBZVYyjidqETLX87_jEddqhABTr2kTm{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<cpp_h6>Enum_Solution 코드 결과</cpp_h6>*  

책이나 흔히 오래된 코드에서 볼 수 있는 Enum Solution 코드입니다. 도형들을 그려주는 Draw() 함수에 도형의 타입을 규정해주는 열거형을 사용해서 동작을 수행하게 해 줍니다. 장점으로는 Enum을 활용함으로서 코드의 <highlight_blue>가독성이 향상</highlight_blue>되고, 도형의 유형을 명확하게 표현할 수 있습니다. 하지만 문제점은 복잡한 구조를 사용하거나 다양한 동작을 수행하는 경우 코드 switch 문과 if-esle으로 작성되어 있기 대문에 <highlight_orange>코드길이가 길어</highlight_orange>지게 됩니다. 또한 c에서 c++과도기에 나온 코드이기 떄문에 <highlight_orange>객체지향적인 다형성을 사용하기 어려운 점</highlight_orange>이 있습니다.  

<br>

### <cpp_h3>2) OO Solution</cpp_h3>

![oo_구조]({{ site.google_drive }}1CGSHSmTRhfQDlXVN-qX3LmXBnaImpr2F{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<cpp_h6>oo 코드 결과</cpp_h6>*  

<br>

#### **<cpp_h4>cpp:</cpp_h4>**

```cpp

#include <iostream>
#include <vector>
#include <memory>
#include <variant> 
#include <ctime>
#include <windows.h>
#include <psapi.h>

struct Vector2
{
	double x;
	double y;
	Vector2(double x, double y) :x(x), y(y) {};
};

class Shape
{
public:
	Shape() = default;
	virtual ~ Shape() = default;

	virtual void Draw() const = 0;	
private:
	
};
class Circle : public Shape
{
public:
	explicit Circle(double rad) : radius(rad)
	{
	}
	double GetRadius() const noexcept
	{
		return radius;
	}
	void Draw() const override
	{
		std::cout << radius << "\n";
	}

private:
	double radius;
};

//void Translate(Circle&, Vector2 const&);
//void Rotate(Circle&, double const&);



class Square : public Shape
{
public:
	explicit Square(double side) :side(side)
	{
	}
	double GetSide() const noexcept
	{
		return side;
	}
	void Draw() const override
	{
		std::cout << side << "\n";
	}

private:
	double side;
};

//void Translate(Circle&, Vector2 const&);
//void Rotate(Square&, double const&);


class _Ellipse : public Shape
{
public:
	explicit _Ellipse(double r1, double r2) :radius(r1,r2)
	{
	}
	Vector2 GetRadius() const noexcept
	{
		return radius;
	}
	void Draw() const override
	{
		std::cout << radius.x << " " << radius.y << "\n";
	}


private:
	Vector2 radius;
};

//void Translate(Circle&, Vector2 const&);
//void Rotate(_Ellipse&, double const&);

class _Rectangle : public Shape
{
public:
	explicit _Rectangle(double s1, double s2) : side(s1,s2)
	{
	}
	Vector2 GetSide() const noexcept
	{
		return side;
	}
	void Draw() const override
	{
		std::cout << side.x << " " << side.y << "\n";
	}

private:
	Vector2 side;
};

//void Translate(Circle&, Vector2 const&);
//void Rotate(_Rectangle&, double const&);



void DrawAllShapes(std::vector<std::unique_ptr<Shape>>const& shapes)
{
	for (auto const& s: shapes)
	{
		s->Draw();
	}
}

int main()
{
	PROCESS_MEMORY_COUNTERS_EX pmc;
	memset(&pmc, 0, sizeof(PROCESS_MEMORY_COUNTERS_EX));
	pmc.cb = sizeof(PROCESS_MEMORY_COUNTERS_EX);

	clock_t start, end;
	double duration;

	using Shapes = std::vector<std::unique_ptr<Shape>>;

	Shapes shapes;
	for (int i = 0; i < 10000; ++i)
	{
		switch (rand() % 4)
		{
		case 0:
			shapes.emplace_back(std::make_unique<Circle>(rand()));
			break;
		case 1:
			shapes.emplace_back(std::make_unique<Square>(rand()));
			break;
		case 2:
			shapes.emplace_back(std::make_unique<_Ellipse>(rand(), rand()));
			break;
		case 3:
			shapes.emplace_back(std::make_unique<_Rectangle>(rand(), rand()));
			break;
		}
	}

	start = std::clock();
	{
		DrawAllShapes(shapes);
	}
	end = std::clock();
	GetProcessMemoryInfo(GetCurrentProcess(), reinterpret_cast<PROCESS_MEMORY_COUNTERS*>(&pmc), sizeof(pmc));

	std::cout << "\n";
	std::cout << "로직 실행 시간: " <<end - start<<"\n";
	std::cout << "가상 메모리 사용량: " << pmc.PrivateUsage << "\n";
	std::cout << "물리 메모리 사용량: " << pmc.WorkingSetSize << "\n";
}

```
![OO Solution]({{ site.google_drive }}1Aaqh3eJLLXLY5CQVGhhYk7iHi3iKur1I{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<cpp_h6>OO Solution 코드 결과</cpp_h6>*  

객체 지향 솔루션은 다형성과 캡슐화를 활용하여 유연하고 확장 가능한 코드를 작성하는 방법입니다. 장점으로는자식 클래스가 많아저도 동일한 Draw 함수를 부르기 떄문에 코드가 길어질 필요가 없어서  <highlight_blue>가독성이 항상</highlight_blue>됩니다. 단점으로는 클래스안에 Draw함수를 작성해야 하기 떄문에 <highlight_orange>코드를 해석</highlight_orange>할때 어렵습니다. 또한 코드의 수정사항이 발생할 경우 모든 코드를 수정해야함으로 <highlight_orange>유지보수</highlight_orange>가 어렵습니다.  

<br>

### <cpp_h3>3) Visit 패턴</cpp_h3>


![Visit]({{ site.google_drive }}1Y0ntUtQRj6zUF3HP5wvlu5JRMR0S1HmG{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<cpp_h6>Visit 패턴 코드 구조</cpp_h6>*  

<br>

#### **<cpp_h4>cpp:</cpp_h4>**

```cpp

#include <iostream>
#include <vector>
#include <memory>
#include <variant> 
#include <ctime>
#include <windows.h>
#include <psapi.h>

class Circle;
class Square;
class _Ellipse;
class _Rectangle;

struct Vector2
{
	double x;
	double y;
	Vector2(double x, double y) :x(x), y(y) {};
};

class ShapeVisitor
{
public:
	ShapeVisitor() = default;
	virtual ~ShapeVisitor() = default;

	virtual void Visit(Circle const& c) const = 0;
	virtual void Visit(Square const& s) const = 0;
	virtual void Visit(_Ellipse const& c) const = 0;
	virtual void Visit(_Rectangle const& s) const = 0;
};

class Shape
{
public:
	Shape() = default;
	virtual ~ Shape() = default;

	virtual void Accept(ShapeVisitor const&) = 0;
private:
	
};

class Circle : public Shape
{
public:
	explicit Circle(double rad) : radius(rad)
	{
	}
	double GetRadius() const noexcept
	{
		return radius;
	}
	virtual void Accept(ShapeVisitor const& v) override
	{
		v.Visit(*this);
	}

private:
	double radius;
};

//void Translate(Circle&, Vector2 const&);
//void Rotate(Circle&, double const&);



class Square : public Shape
{
public:
	explicit Square(double side) :side(side)
	{
	}
	double GetSide() const noexcept
	{
		return side;
	}
	virtual void Accept(ShapeVisitor const& v) override
	{
		v.Visit(*this);
	}

private:
	double side;
};

//void Translate(Circle&, Vector2 const&);
//void Rotate(Square&, double const&);


class _Ellipse : public Shape
{
public:
	explicit _Ellipse(double r1, double r2) :radius(r1,r2)
	{
	}
	Vector2 GetRadius() const noexcept
	{
		return radius;
	}
	virtual void Accept(ShapeVisitor const& v) override
	{
		v.Visit(*this);
	}


private:
	Vector2 radius;
};

//void Translate(Circle&, Vector2 const&);
//void Rotate(_Ellipse&, double const&);

class _Rectangle : public Shape
{
public:
	explicit _Rectangle(double s1, double s2) : side(s1,s2)
	{
	}
	Vector2 GetSide() const noexcept
	{
		return side;
	}
	virtual void Accept(ShapeVisitor const& v) override
	{
		v.Visit(*this);
	}

private:
	Vector2 side;
};

//void Translate(Circle&, Vector2 const&);
//void Rotate(_Rectangle&, double const&);


class Draw : public ShapeVisitor
{
public:
	void Visit(Circle const& c) const override
	{
		std::cout << c.GetRadius() << "\n";
	}
	void Visit(Square const& c) const override
	{
		std::cout << c.GetSide() << "\n";
	}
	void Visit(_Ellipse const& c) const override
	{
		std::cout << c.GetRadius().x<< c.GetRadius().y << "\n";
	}
	void Visit(_Rectangle const& s) const override
	{
		std::cout << s.GetSide().x << s.GetSide().y << "\n";
	}


};


void DrawAllShapes(std::vector<std::unique_ptr<Shape>>const& shapes)
{
	for (auto const& s: shapes)
	{
		s->Accept(Draw{});
	}
}

int main()
{
	PROCESS_MEMORY_COUNTERS_EX pmc;
	memset(&pmc, 0, sizeof(PROCESS_MEMORY_COUNTERS_EX));
	pmc.cb = sizeof(PROCESS_MEMORY_COUNTERS_EX);

	clock_t start, end;
	double duration;

	using Shapes = std::vector<std::unique_ptr<Shape>>;

	Shapes shapes;
	for (int i = 0; i < 10000; ++i)
	{
		switch (rand() % 4)
		{
		case 0:
			shapes.emplace_back(std::make_unique<Circle>(rand()));
			break;
		case 1:
			shapes.emplace_back(std::make_unique<Square>(rand()));
			break;
		case 2:
			shapes.emplace_back(std::make_unique<_Ellipse>(rand(), rand()));
			break;
		case 3:
			shapes.emplace_back(std::make_unique<_Rectangle>(rand(), rand()));
			break;
		}
	}

	start = std::clock();
	{
		DrawAllShapes(shapes);
	}
	end = std::clock();
	GetProcessMemoryInfo(GetCurrentProcess(), reinterpret_cast<PROCESS_MEMORY_COUNTERS*>(&pmc), sizeof(pmc));

	std::cout << "\n";
	std::cout << "로직 실행 시간: " <<end - start<<"\n";
	std::cout << "가상 메모리 사용량: " << pmc.PrivateUsage << "\n";
	std::cout << "물리 메모리 사용량: " << pmc.WorkingSetSize << "\n";
}

```



![Visit]({{ site.google_drive }}1KAAeBlGEJ0HS1VKR1AYvAdjAzItmU0UT{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<cpp_h6>Visit 패턴 코드 결과</cpp_h6>* 


방문자 패턴은, 여러 유형의 객체가 동일한 인터페이스를 공유할수 있는 능력인, 다형성을 활용하여 객체 구조를 처리하는 방법입니다. 장점으로는 <highlight_blue>객체와 객체 상태를 분리함으로서 유지보수 코드</highlight_blue>를 짜기에 용의하게 만들었습니다. 하지만 단점으로는 처음 구조를 설계할때 복잡하고, 다향성을 작성하는 코드 중 가장 <highlight_orange>느리다는</highlight_orange> 단점이 있습니다.  

<br>

### <cpp_h3>4) std::variant를 이용한 코드(c++17)</cpp_h3>

![variant_구조]({{ site.google_drive }}1hAxgYyuNPW_FJw9_vYMRWgNqRpMex4e5{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<cpp_h6>std::variant 패턴 코드 구조</cpp_h6>* 

<br>

#### **<cpp_h4>cpp:</cpp_h4>**


```cpp

#include <iostream>
#include <vector>
#include <memory>
#include <variant> 
#include <ctime>
#include <windows.h>
#include <psapi.h>


struct Vector2
{
	double x;
	double y;
	Vector2(double x, double y) :x(x), y(y) {};
};

class Circle 
{
public:
	explicit Circle(double rad) : radius(rad)
	{
	}
	double GetRadius() const noexcept
	{
		return radius;
	}
private:
	double radius;
};

//void Translate(Circle&, Vector2 const&);
//void Rotate(Circle&, double const&);



class Square 
{
public:
	explicit Square(double side) :side(side)
	{
	}
	double GetSide() const noexcept
	{
		return side;
	}

private:
	double side;
};

//void Translate(Circle&, Vector2 const&);
//void Rotate(Square&, double const&);


class _Ellipse 
{
public:
	explicit _Ellipse(double r1, double r2) :radius(r1,r2)
	{
	}
	Vector2 GetRadius() const noexcept
	{
		return radius;
	}

private:
	Vector2 radius;
};

//void Translate(Circle&, Vector2 const&);
//void Rotate(_Ellipse&, double const&);

class _Rectangle 
{
public:
	explicit _Rectangle(double s1, double s2) : side(s1,s2)
	{
	}
	Vector2 GetSide() const noexcept
	{
		return side;
	}

private:
	Vector2 side;
};

//void Translate(Circle&, Vector2 const&);
//void Rotate(_Rectangle&, double const&);


class Draw 
{
public:
	void operator()(Circle const& c) const
	{
		std::cout << c.GetRadius() << "\n";
	}
	void operator()(Square const& s) const
	{
		std::cout << s.GetSide() << "\n";
	}
	void operator()(_Ellipse const& c) const
	{
		std::cout << c.GetRadius().x<< c.GetRadius().y << "\n";
	}
	void operator()(_Rectangle const& s) const
	{
		std::cout << s.GetSide().x<< s.GetSide().y << "\n";
	}
};

using Shape = std::variant<Circle, Square, _Ellipse, _Rectangle>;


void DrawAllShapes(std::vector<Shape>const& shapes)
{
	for (auto const& s: shapes)
	{
		std::visit(Draw{}, s);
	}
}

int main()
{
	PROCESS_MEMORY_COUNTERS_EX pmc;
	memset(&pmc, 0, sizeof(PROCESS_MEMORY_COUNTERS_EX));
	pmc.cb = sizeof(PROCESS_MEMORY_COUNTERS_EX);

	clock_t start, end;
	double duration;

	using Shapes = std::vector<Shape>;

	Shapes shapes;
	for (int i = 0; i < 10000; ++i)
	{
		switch (rand() % 4)
		{
		case 0:
			shapes.emplace_back(Circle(rand()));
			break;
		case 1:
			shapes.emplace_back(Square(rand()));
			break;
		case 2:
			shapes.emplace_back(_Ellipse(rand(), rand()));
			break;
		case 3:
			shapes.emplace_back(_Rectangle(rand(), rand()));
			break;
		}
	}

    start = std::clock();
	{
		DrawAllShapes(shapes);
	}
	end = std::clock();
	GetProcessMemoryInfo(GetCurrentProcess(), reinterpret_cast<PROCESS_MEMORY_COUNTERS*>(&pmc), sizeof(pmc));

	std::cout << "\n";
	std::cout << "로직 실행 시간: " <<end - start<<"\n";
	std::cout << "가상 메모리 사용량: " << pmc.PrivateUsage << "\n";
	std::cout << "물리 메모리 사용량: " << pmc.WorkingSetSize << "\n";
}

```

![방문자패턴_결과]({{ site.google_drive }}1ICQa7O0lDa7asgP2eShwN3cPyAEQH6QW{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<cpp_h6>std::variant 패턴 코드 결과</cpp_h6>* 

std::variant는 C++17에서 도입된 템플릿 기반의형적 타입을 표현하는 컨테이너 클래스입니다. 이 컨테이너는 여러 타입 중 하나를 포함하며, 런타임에 해당 타입을 안전하게 접근할 수 있게 해줍니다. std::visit을 사용하여 다형성을 보다 <highlight_blue>간결하고 유연</highlight_blue>하게 코드를 작성할 수 있습니다. 하지만 런타임시간에 동적으로 타입을 추가하거나, <highlight_orange>코드가 분산</highlight_orange>되어 이해하기 살짝 어렵게 만들 수 있습니다.  

<br>
<br>

## <cpp_h2>3. 성능 분석 검증</cpp_h2>

그럼 정말로 이 코드 형식들의 성능이 어떻게 나오지는 확인해 봅시다.  
  
2023.03.10에는 동작 코드인 Draw()  한 개 가지고 데이터 개수를 늘려가면서 코드를 비교하였습니다. 하지만 크게 차이가 없다는 것을 깨닫고 실험자체가 실패했다는 것을 깨달았습니다.  
  
2022.03.12 그래서 이번에는 WinAPI를 사용하여 제대로 측정해 보려고 합니다. 단순히 Draw() 함수뿐만 아니라 Translate()이라는 도형을 대각선을 포함한 각 방향으로 이동시키는 동작함수 8종을 추가하여 실행파일로 테스트하기 위해 툴을 제작하였습니다.  
  
<br>

![예시]({{ site.google_drive }}10KWTPUjOShEUyDOAsLC3MK7mgTKvnVvc{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<cpp_h6>예시</cpp_h6>* 

멀티 스레드를 이용한 WinAPI 툴의 로직은 다음과 같습니다.

- 메인 스레드(메인 윈도우)  
    1. 로직을 처리하는 FixedUpdate()와 화면에 뿌려주는 Rending() 함수로 Update() 함수 구현하였습니다.  
    2. 간단한 측정을 위해서 이중버퍼링, 화면 찢김 방지하는 수직랜더링은 사용하지 않았습니다.  
    3. 서브 스레드로 데이터를 넘기기 위해서 큐를 동적할당하여 사용하였습니다.  

- 서브 스레드(자식 윈도우)  
    1. 메인 윈도의 데이터를 받아서 UI로 처리해 주는 역할을 합니다.  
    2. 라인 차트는 적당한 라이브러리를 찾지 못해서 직접 구현하였습니다.  

<br>

실험 조건은 다음과 같습니다.  

1. Shpae를 상속받는 클래스 Circle, Square, _Ellipse, _Rectangle 총 4종  
2. 도형 오브젝트 랜덤으로 100000개 생성  
3. 오브젝트당 동작시키는 로직 랜덤 8종을 25회 동작 (총 25000000번)  
4. CPU: intel i7-4720HQ  


<br>

### <cpp_h3>1) Enum solution 결과</cpp_h3>

![Enum_solution]({{ site.google_drive }}1FS5G3b01QIP_0Y_keeCFKHW7ykOhIVgb{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<cpp_h6>Enum_solution</cpp_h6>* 

로직 걸린 시간: 2689 ms  
가상 메모리: 11173888 byte  
물리 메모리: 23093248 byte  

<br>

### <cpp_h3>2) OO solution 결과</cpp_h3>

![OO_solution]({{ site.google_drive }}1wSBy89CPw80bh1GprgN_XymJ48BGWfeP{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<cpp_h6>OO_solution</cpp_h6>* 

로직 걸린 시간: 2738 ms  
가상 메모리: 11042816 byte  
물리 메모리: 23015424 byte  

<br>

### <cpp_h3>3) visit 패턴 결과</cpp_h3>

![visit]({{ site.google_drive }}1aRWc74Xtcu8q8RLZcOHj7QISzYWM-xUl{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<cpp_h6>visit 패턴</cpp_h6>* 

로직 걸린 시간: 2981 ms
가상 메모리: 11034624 byte
물리 메모리: 23138304 byte

<br>

### <cpp_h3>4) std::variant를 이용한 코드(c++17) 결과</cpp_h3>

![variant]({{ site.google_drive }}1vXLP3YIxg68GBLrXXqnMpUebPWcXfUcj{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<cpp_h6>std::variant</cpp_h6>* 

로직 걸린 시간: 2780 ms
가상 메모리: 10899456 byte
물리 메모리: 21016576 byte

<br>

## <cpp_h3> 4. 성능분석 결론 </cpp_h3>

퍼포먼스: Enum Solution >> OO Solution >= Variant Solution >> 방문자 패턴  
추가 사항: Variant 실험 도중 성능이 크게 불안정하였지만, 방문자 패턴보다 퍼포먼스가 좋았습니다.  

1. 동적 바인딩 이용하는 방문자 패턴은 코드작성에 따라서 성능 최하위에 위치할 수밖에 없습니다.
2. 코드의 목적에 맞는 형태를 골라서 작성하시면 됩니다.

<br>
  
<p><cpp_h5>추가사항 2023.03.14</cpp_h5></p>
  
원래 포트폴리오 정도로 생각하지 않은 코드들은 버리지만, 코드를 요청하신 분이 계셔서 코드를 올립니다. Draw 부분만 바꿔서 사용하시면 다른 variant 헤더 뿐만아니라 다른 버전도 들어있습니다. 연결해주시고 Draw 부분만 바꿔주시면 다른 버전들도 확인 하실 수 있습니다. 

<br>

---

<br>

###### <cpp_h6>깃 허브 코드:</cpp_h6> [https://github.com/kj1241/WinAPI_ToyProejct/tree/main/Variant_Visitor](https://github.com/kj1241/WinAPI_ToyProejct/tree/main/Variant_Visitor)