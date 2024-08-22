---
layout: post
title: "게임인공지능 - Lua Script 연습 코드"
date: 2024-02-23 09:00:00 +09:00
image: https://drive.google.com/thumbnail?id=16RTi9EcTjJ13J1oU0mY6HSR6lkZ3qPdg
toc: true
categories: [AI]
keywords: Lua Script, C++, 게임 인공지능, 스크립팅, 동적 스크립팅, AI, 게임 개발, 프로그래밍 연습, 스크립트 언어, Lua 연동
addsence: false
lastmod: 2024-07-16 09:00:00 +09:00
sitemap:
  changefreq : daily
  priority : 1.0
excerpt: 해당 프로젝트는 C++와 Lua Script를 연동하여 다양한 기능을 구현하는 연습 코드입니다. 동적인 스크립팅 기능을 C++ 프로그램에 추가하는 방법을 학습하고, 게임 인공지능 개발에 필요한 기술을 터득하는 것을 목표로 합니다.
related_links:
  - url: /ai/GameAI_LuaGuessTheNumbers.html
  - url: /ai/GameAI_LuaRockScissorsPaper.html
  - url: /ai/GameAI_LuaFinalProject.html
---

## <ai_h2> 프로젝트 소개 </ai_h2>

해당 프로젝트는 C++와 Lua Script를 연동하여 다양한 기능을 구현하는 연습 코드입니다. Lua Script는 게임 개발에서 자주 사용되는 경량 스크립트 언어로, 동적인 스크립팅 기능을 C++ 프로그램에 추가하는 데 유용합니다. 본 프로젝트는 Lua Script를 단계적으로 학습하고, 이를 C++와 결합하여 실용적인 예제를 구현하는 것을 목표로 합니다. 이를 통해 복잡한 작업을 외부 스크립트로 분리하여 코드의 유지보수성을 높이고, 게임 인공지능 개발에 필요한 기술을 익히고자 했습니다.

<br>
<br>

## <ai_h2> 프로젝트 개요 </ai_h2>

- <span><ai_h5>프로젝트명:</ai_h5>Lua Script For c++를 사용하여 연습하기 </span>
- <span><ai_h5>장르:</ai_h5> Toy Project</span>
- <span><ai_h5>기간:</ai_h5> 제작 완료</span>
    - ver.1: 2018.06.01~2018.06.05(프로젝트 제작)
    - ver.2: 2024.07.13~2024.07.16(Lua Script 버전 업데이트)
- <span><ai_h5>개발인원:</ai_h5> Developer(1명)</span>
- <span><ai_h5>플랫폼:</ai_h5> PC (Window)</span>

<br>

### <ai_h3> 기술 스택 </ai_h3>

- <span><ai_h5>개발 도구:</ai_h5> Lua script 5.0.0 → 5.2.4 / visual stuido 2017 → 2019 </span>
- <span><ai_h5>개발 언어:</ai_h5> C++ </span>

<br>
<br>

## <ai_h2> 프로젝트 특징 및 기능 구현 </ai_h2>

해당 프로젝트는 Lua Script for C++를 단계적으로 학습하기 위해 작성되었던 프로젝트 입니다.

<br>

### <ai_h3> Hellow Lua ver.1</ai_h3><red1_error> (전체 제작 기여도: 100%)</red1_error>

![Hellow Lua]({{ site.google_drive }}1WkZ9-rG-KSFnz2JGx_YM3iAoU34zJUAv{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<ai_h6>Hellow Lua 실행 결과</ai_h6>* 

#### <ai_h4>main.cpp</ai_h4>

1. Lua 인터프리터 초기화
  - luaL_newstate() 함수로 새로운 Lua 상태를 생성합니다.
  - luaL_openlibs(L) 함수로 Lua 표준 라이브러리를 열어 Lua 상태에 로드합니다.
  
2. Lua 스크립트 문자열 정의
  - lua_script 변수에는 실행할 Lua 코드가 포함된 문자열이 정의됩니다.
  - <ai_h5>lua script는 덧셈 함수를 정의하고 결과값을 출력하는 예제입니다.</ai_h5>

3. Lua 스크립트 실행
  - luaL_dostring(L, lua_script) 함수를 사용하여 Lua 코드를 실행합니다.
  - 실행 중 오류가 발생하면 lua_tostring(L, -1) 함수를 사용하여 오류 메시지를 가져와서 출력합니다.

4. Lua 상태 닫기
  - Lua 상태를 닫아서 메모리 자원을 해제합니다.
  
해당 예제는, 처음 Lua를 접했을때, C++에서 Lua를 사용하여 Lua 스크립트를 실행하는 방법을 보여줍니다. Lua를 통해 동적인 스크립팅 기능을 C++ 프로그램에 추가할 수 있습니다.

<br>

### <ai_h3> Lua File Separation ver.1 </ai_h3><red1_error> (전체 제작 기여도: 100%)</red1_error>

![Lua File Separation]({{ site.google_drive }}14m_uC6xCMsSV84OTwr1jKyJ_m_Xq74ry{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<ai_h6>Lua File Separation 실행 결과</ai_h6>* 

#### <ai_h4>main.cpp</ai_h4>

1. Lua 인터프리터 초기화
  - luaL_newstate() 함수로 새로운 Lua 상태를 생성합니다.
  - luaL_openlibs(L) 함수로 Lua 표준 라이브러리를 열어 Lua 상태에 로드합니다.

2. Lua 스크립트 문자열 정의
  -  lua_script = ...: C++ 코드 내에 Lua 스크립트를 문자열로 정의합니다. 여기서는 덧셈 함수를 정의하고, 함수를 호출하여 결과를 출력하는 예제가 포함되어 있습니다.

3. Lua 스크립트 실행
  - luaL_dostring(L, lua_script) 함수를 사용하여 Lua 코드를 실행합니다.
  - 실행 중 오류가 발생하면 lua_tostring(L, -1) 함수를 사용하여 오류 메시지를 가져와서 출력합니다.

4. Lua 상태 닫기
  - Lua 상태를 닫아서 메모리 자원을 해제합니다.

#### <ai_h4>script.lua</ai_h4>

1. 변수 선언과 출력
  - print(message) "Hello from Lua!"를 출력합니다.

2. 함수 정의 및 호출
  - add(a, b) 두 개의 매개변수 a와 b를 받아서 더한 값을 반환합니다.
  - print("Result:", result) 함수의 결과값을 출력합니다. 
  
해당 예제는, 처음 Lua를 접했을때, C++에서 Lua를 사용하여 Lua 스크립트를 실행하는 방법을 보여줍니다. 복잡한 작업을 외부 스크립트로 분리하여 유지보수성을 높일 수 있습니다.

<br>

### <ai_h3> Cpp Using Lua ver.1 </ai_h3><red1_error> (전체 제작 기여도: 100%)</red1_error>

![Cpp Using Lua]({{ site.google_drive }}16RTi9EcTjJ13J1oU0mY6HSR6lkZ3qPdg{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<ai_h6>Cpp Using Lua 실행 결과</ai_h6>* 

#### <ai_h4>main.cpp</ai_h4>

1. Lua 인터프리터 초기화
  - luaL_newstate() 함수로 새로운 Lua 상태를 생성합니다.
  - luaL_openlibs(pL) 함수로 Lua 표준 라이브러리를 열어 Lua 상태에 로드합니다.

2. Lua 스크립트 실행
  - luaL_dofile(pL, filename.c_str()) 함수를 사용하여 외부 Lua 스크립트 파일을 실행합니다.
  - 실행 중 오류가 발생하면 lua_tostring(pL, -1) 함수를 사용하여 오류 메시지를 출력합니다.

3. Lua 변수 및 테이블 접근
  - lua_getglobal(pL, "age")와 lua_getglobal(pL, "name")을 사용하여 Lua 전역 변수를 C++로 가져옵니다.
  - lua_getglobal(pL, "simple_table")을 사용하여 Lua 전역 테이블을 C++로 가져옵니다.
  - 각각의 변수 및 테이블 데이터 타입을 확인하고, lua_tostring(pL, -1) 및 lua_tonumber(pL, -1)을 사용하여 값을 가져옵니다.

4. Lua 함수 호출
  - lua_getglobal(pL, "add")를 사용하여 Lua 전역 함수를 C++로 가져옵니다.
  - lua_pushnumber(pL, 5)와 lua_pushnumber(pL, 8)을 사용하여 함수에 파라미터를 전달합니다.
  - lua_call(pL, 2, 1)을 사용하여 함수를 호출하고 결과를 스택에서 가져옵니다.

5. Lua 함수 정의 및 호출
  - lua_getglobal(pL, "print_message")를 사용하여 Lua 전역 함수를 C++로 가져옵니다.
  - lua_pushstring(pL, "Hello from C++!")를 사용하여 함수에 파라미터를 전달하고 호출합니다.

6. Lua 테이블 관리
  - lua_getglobal(pL, "add_to_table")를 사용하여 Lua 전역 함수를 C++로 가져옵니다.
  - lua_getglobal(pL, "simple_table"), lua_pushstring(pL, "new_key"), lua_pushnumber(pL, 12345)를 사용하여 테이블에 요소를 추가합니다.
  - 추가된 요소를 확인하기 위해 lua_gettable(pL, -2)를 사용하여 값을 가져옵니다.

7. Lua 상태 닫기
  - lua_close(pL) 함수를 호출하여 Lua 상태를 닫아 메모리 자원을 해제합니다.

#### <ai_h4>script.lua</ai_h4>

1. 변수 선언과 출력
  - name = "연습용"과 age = 29와 같이 Lua 전역 변수를 정의하고 값을 출력합니다.

2. 함수 정의 및 호출
  - add(a, b) 함수를 정의하여 두 숫자를 더하는 예제를 제공하며, 함수를 호출하여 결과를 출력합니다.

3. 테이블 생성 및 관리
  - simple_table = {name="김철수", age=24}와 같이 Lua 테이블을 정의하고, 테이블에 요소를 추가하는 add_to_table(tbl, key, value) 함수를 통해 테이블에 요소를 추가합니다.

4. 제어 구조 예제
  - age 변수의 값에 따라 "미성년자입니다." 또는 "성인입니다."를 출력하는 예제입니다.

5. 반복 구조 예제
  - for 루프와 while 루프를 사용하여 1부터 10까지 순차적으로 출력하는 예제입니다.

6. 배열 및 해시 테이블 예제
  - 배열 array와 해시 테이블 person을 정의하고, 각각의 요소를 순회하며 출력하는 예제입니다.

7. 함수 호출 및 클래스 상속 예제
  - greet(name) 함수를 정의하고 호출하여 인사말을 출력하는 예제입니다.
  - Animal 클래스를 정의하고, 이를 상속받는 Pet 클래스를 정의하여 사용하는 예제입니다.

8. 코루틴 사용 예제
  - coroutine.create(worker) 병렬처리를 위한 worker 함수를 선언해서 코루틴을 만드는 에제입니다.
  - coroutine.yield() 코루틴 일시 정지합니다.
  - coroutine.resume(co) 코루틴을 재계합니다.


해당 예제는 Lua와 C++을 연동하여 Lua 스크립트를 실행하고, 변수 및 함수를 상호 작용하는 방법을 보여줍니다. Lua 스크립트 파일 script.lua에서는 전역 변수 초기화, 함수 정의, 제어 구조 예제, 반복 구조 예제, 배열 및 해시 테이블 사용 예제, 함수 호출 및 클래스 상속 예제를 다룹니다. 이를 통해 Lua의 다양한 기능과 구문을 활용하는 방법을 설명합니다.


<br>
<br>

## <ai_h2> 결과(성과) 및 데모 </ai_h2>

- <span><ai_h5>성과:</ai_h5> 프로젝트 완성 </span>
- <span><ai_h5>깃허브(코드):</ai_h5> [https://github.com/kj1241/AI_Portfolio/tree/main/GameAI/Abandoned-Project/Lua_Project](https://github.com/kj1241/AI_Portfolio/tree/main/GameAI/Abandoned-Project/Lua_Project)</span>

<br>
<br>

## <ai_h2> 비고 및 여담 </ai_h2>

- 배운점:
  - Lua Script를 C++와 연동하여 사용함으로써 동적 스크립팅의 이점을 학습하였습니다. 이를 통해 게임 인공지능 개발에 필요한 유연한 스크립팅 기법을 터득할 수 있었습니다.
  - Lua의 간단하면서도 강력한 기능을 활용하여 코드의 유지보수성을 높이는 방법을 이해하게 되었습니다.
  - C++와 Lua 간의 상호작용을 통해 복잡한 작업을 외부 스크립트로 분리하여 관리하는 기술을 익혔습니다.
    
- 여담:
  - 게임 인공지능 시간에는 Lua Script를 배우지 않았지만, 기말 프로젝트 주제를 자율적으로 선택해야 했기에 Lua Script를 연습하게 되었습니다. 해당 프로젝트가 기말 프로젝트가 되지 못한 이유는 Lua Script 라이브러리를 사용하는 것보다, AI 모델제작해서 보여주고 싶었기 때문에 채택하지 않았습니다. 하지만 충분히 흥미로울 수 있는 주제라서 때문에 블로그에 공개하게 되었습니다.