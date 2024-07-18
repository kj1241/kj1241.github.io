---
layout: post
title: "Lua 스크립트 정리"
date: 2024-07-15 09:00:00 +09:00
image: https://drive.google.com/thumbnail?id=
toc: true
categories: [Other_Articles]
keywords: 
addsence: true
lastmod: 2024-04-11 09:00:00 +09:00
sitemap:
  changefreq : daily
  priority : 1.0
excerpt:  
related_links:

---

오랜만에 돌아온 아티클 입니다. 이 글은 사실, 대학교때 루아스크립트를 처음 접하고 응용해서 프로그램을 만든 후, 발표용 리포트를 조금 더 확장한 내용입니다. 


<br>
<br>

## <cpp_h2> 1. Lua 스크립트란? </cpp_h2>

루아 스크립트(Lua Script)는 경량의 다중 패러다임 프로그래밍 언어로, 임베디드 시스템과 게임 개발에서 주로 사용됩니다. 2010년 [GDC(Game Developers Conference)](https://gdcvault.com/play/1012427/Lua-Scripting-in-Game)에서 Lua에 대한 종합적인 기술 개요와 다양한 사례 연구가 발표될 정도로, 단순하고 유연한 문법 덕분에 많은 개발자들에게 인기를 끌고 있습니다.


<br>
<br>

## <cpp_h2> 2. Lua 스크립트를 사용한 게임 </cpp_h2>

Lua는 다양한 게임 엔진과 장르에서 광범위한 사용자 정의, 모딩 및 동적 콘텐츠 생성을 허용하여 게임 개발을 향상시킵니다. 다음은 Lua 스크립트 사용하여 만든 게임들 입니다. 게임에서 어떻게 루아 스크립트가 사용됬는지 알아보겠습니다.

<br>

### <cpp_h3> 1) WoW(월드오브워크래프트) </cpp_h3>

블리자드의 대표 MMORPG인 와우에서는 주로 Lua 스크립트를 사용자 인터페이스(UI) 수정(애드온)을 제작 할 수 있습니다.
와우 API와 상호 작용하는 액션바, 유닛 프레임, 인벤토리 관리등의 UI 요소를 추가하거나 수정할 수 있습니다. 또한 전투 이벤트, 플레이어 액션, 시스템 이벤트 같은 요소도 처리할 수 있습니다. 예를 들어 플레이어 채력이 일정 이하로 떨어지면 플레이어게 알려 줄 수 있습니다. 
이처럼 자신의 필요에 따라서 게임환경을 조성할 수 있습니다.


<br>

### <cpp_h3> 2) 로블록스 </cpp_h3>

현재 학생들 사이에서 인기 많은 로블록스는 Lua 스크립트를 사용하여 게임 로직, 상호작용 요소 제작등 복잡한 게임 매커니즘을 만들 수 있습니다.
플레이어의 움직임, 게임 규칙, 스코어링 시스템, NPC 행동을 제어하기 위해 Lua 스크립트를 사용할 수 있습니다. 또한 게임 내의 GUI를 만들고 관리하며 사용자 정의 메뉴, HUD 및 대화형 요소를 활성합니다.


<br>

### <cpp_h3> 3) 앵그리버드 </cpp_h3>

한때 인기가 있던 앵그리버드도 Lua 스크립트를 사용하여 게임 레벨, 메커니즘, 상호작용을 스크립팅하는 데 사용하였습니다.
새 종류, 돼지 배치등 레벨 디자인을 Lua 스크립트로 정의하였습니다. 또한 물리 상호 작용, 스코어링 및 진행 로직을 처리합니다. 예를들어 새가 건축물에 맞았을때 어떻게 부셔지고 점수가 매겨지는지 관여합니다.

<br>

### <cpp_h3> 4) 문명 V </cpp_h3>

Lua 스크립트는 게임 기능을 모딩하고 사용자 지정하는 데 사용됩니다.
사용하여 사용자 지정 시나리오를 정의하고 게임 규칙, 승리 조건, 시작 조건을 변경할 수 있습니다. 또한 UI 정보 패널, 오버레이와 같은 인터페이스를 수정 할 수 있습니다. 그리고 외교 활동, 도시 개발 같은 이벤트 트리거를 조정 할 수 있습니다.

<br>

### <cpp_h3> 5) Don't Starve</cpp_h3>

Lua 스크립트는 게임플레이 메커니즘, AI 동작, 모딩을 스크립팅하는 데 사용됩니다.
캐릭터가 환경, 다른 캐릭터 및 객체와 상호 작용하는 방식을 정의합니다. 즉 NPC의 행동과 플레이어의 동작에 대한 응답을 처리합니다. 또한 낮/밤 주기, 날씨 변화, 자원 생성 같은 이벤트를 처리합니다.
이 처럼 모딩 시스템은 새로운 아이템, 생물, 게임플레이 기능을 추가하기 때문에 사용자 지정 콘텐츠를 만들 수 있습니다.

<br>
<br>

## <cpp_h2> 3. Lua 스크립트 사용 장단점 </cpp_h2>

흔히 알려진 루나 스크립트의 장단점입니다. 어떠한 부분이 있는지 같이 확인해 봅시다.

<br>

### <cpp_h3> 1) 장점 </cpp_h3>

1) 경량성과 빠른 성능 

Lua는 매우 가벼운 언어로, 다른 스크립팅 언어에 비해 메모리 사용량이 적습니다. 이는 특히 리소스가 제한된 임베디드 시스템이나 모바일 게임 개발에서 큰 장점이 됩니다. 또한, Lua는 빠른 실행 속도를 자랑하며, JIT(Just-In-Time) 컴파일러를 사용하면 성능을 더욱 향상시킬 수 있습니다.
    
#### <cpp_h4> .lua </cpp_h4>
  
```lua

-- Lua의 빠른 실행 속도를 보여주는 예제
local startTime = os.clock()
local sum = 0
for i = 1, 1e6 do
    sum = sum + i
end
local endTime = os.clock()
print("Sum:", sum)
print("Time taken:", endTime - startTime)

```

이 코드는 1부터 1,000,000까지의 숫자를 더하고, 걸린 시간을 출력합니다.

2. 쉬운 임베딩
  - Lua는 C API를 통해 다른 프로그래밍 언어와 쉽게 통합할 수 있습니다. 이는 게임 엔진이나 어플리케이션에 Lua를 스크립팅 언어로 임베드하기 쉽게 만듭니다. C/C++ 코드와의 자연스러운 상호 작용 덕분에 개발자는 Lua를 사용하여 게임 로직을 구현하고, 고성능이 요구되는 부분은 C/C++로 최적화할 수 있습니다.

#### <cpp_h4> .cpp </cpp_h4>
  
  ```cpp

  #include <lua.h>
  #include <lualib.h>
  #include <lauxlib.h>

  int main() {
      lua_State *L = luaL_newstate(); // Lua 상태 생성
      luaL_openlibs(L);               // Lua 표준 라이브러리 열기

      luaL_dostring(L, "print('Hello from Lua!')"); // Lua 코드 실행

      lua_close(L); // Lua 상태 닫기
      return 0;
  }

  ```

  이 처럼 c++를 사용하여 Lua 스크립트를 임베딩하고 실행합니다.

3. 유연성과 단순성
  - Lua는 문법이 간결하고 배우기 쉽습니다. 이는 프로그래밍 초보자부터 숙련된 개발자까지 모두에게 접근성을 높여줍니다. 또한, Lua의 유연한 테이블 구조는 배열과 해시 테이블 기능을 모두 제공하여 데이터 구조를 간편하게 다룰 수 있습니다.

  #### <cpp_h4> .lua </cpp_h4>

  ```lua

  -- Lua의 간단한 테이블 사용 예제
  local person = {
      name = "John",
      age = 30,
      address = {
          city = "New York",
          zip = "10001"
      }
  }

  print(person.name)           -- John
  print(person.address.city)   -- New York

  ```

  Lua 스크립트는 테이블을 보다 간단하게 표현할 수 있습니다.

4. 강력한 커뮤니티와 라이브러리 지원
  - Lua는 오랜 기간 동안 커뮤니티의 지원을 받아 왔으며, 다양한 오픈 소스 라이브러리와 툴이 존재합니다. 특히, 게임 개발을 위한 LOVE, Defold 등의 프레임워크와의 호환성은 개발자들에게 큰 도움이 됩니다.

  #### <cpp_h4> .lua </cpp_h4>

  ```lua

  -- LOVE를 사용한 간단한 게임 예제
  function love.load()
      love.graphics.setBackgroundColor(0.5, 0.5, 0.5)
      player = { x = 200, y = 200, speed = 150 }
  end

  function love.update(dt)
      if love.keyboard.isDown("left") then
          player.x = player.x - player.speed * dt
      elseif love.keyboard.isDown("right") then
          player.x = player.x + player.speed * dt
      end

      if love.keyboard.isDown("up") then
          player.y = player.y - player.speed * dt
      elseif love.keyboard.isDown("down") then
          player.y = player.y + player.speed * dt
      end
  end

  function love.draw()
      love.graphics.setColor(1, 0, 0)
      love.graphics.rectangle("fill", player.x, player.y, 50, 50)
  end

  ```

  LOVE 프레임워크를 사용하여 간단한 게임을 구현하니다.

<br>

### <cpp_h3> 2) 단점 </cpp_h3>

1. 제한된 표준 라이브러리
  - Lua의 기본 제공 라이브러리는 다른 언어에 비해 다소 제한적입니다. 이를 보완하기 위해 외부 라이브러리를 사용해야 하는 경우가 많습니다. 이는 추가적인 학습과 설정이 필요하므로 초보자에게는 부담이 될 수 있습니다.

  #### <cpp_h4> .lua </cpp_h4>

  ```lua

  -- 외부 라이브러리를 사용하여 HTTP 요청을 보내는 예제
  local http = require("socket.http")

  local response, status = http.request("http://www.example.com")
  if status == 200 then
      print(response)
  else
      print("HTTP request failed with status:", status)
  end

  ```

  해당 코드는 외부 라이브러리를 사용하여 HTTP 요청을 보내는 예제입니다.

2. 멀티스레딩 지원 부족
  - Lua는 기본적으로 멀티스레딩을 지원하지 않습니다. 이는 멀티코어 프로세서를 활용한 고성능 애플리케이션 개발에 제한이 될 수 있습니다. LuaJIT의 경우 일부 멀티스레딩 기능을 제공하지만, 여전히 C/C++에 비해 한계가 존재합니다.

  #### <cpp_h4> .lua </cpp_h4>

  ```lua

  -- Lua의 코루틴을 사용한 병렬 처리 예제
  local function worker()
      for i = 1, 5 do
          print("Worker: " .. i)
          coroutine.yield()
      end
  end

  local co = coroutine.create(worker)
  for i = 1, 5 do
      print("Main: " .. i)
      coroutine.resume(co)
  end

  ```
  Lua의 코루틴을 사용하여 간단한 병렬 처리를 구현할 수 있지만 코루틴과 멀티 쓰래드는 다른 이야기 입니다.

3. 정적 타입 검사 부족
  - Lua는 동적 타입 언어로, 정적 타입 검사가 제공되지 않습니다. 이는 대규모 프로젝트에서 코드의 안정성과 유지보수를 어렵게 만들 수 있습니다. 이를 보완하기 위해 TypeScript와 같은 정적 타입 검사 도구를 사용할 수도 있지만, 이는 추가적인 학습과 도입 비용이 발생합니다.

  #### <cpp_h4> .lua </cpp_h4>

  ```lua

  -- Lua의 동적 타입 특성을 보여주는 예제
  local function add(a, b)
      return a + b
  end

  print(add(5, 10))   -- 15
  print(add("5", 10)) -- 런타임 에러 발생

  ```

  위 처럼 코드를 작성하면 프로그램이 실행되는 도중 에러가 발생합니다.


4. 배우기 쉬우나 숙달이 어려움
  - Lua의 간결한 문법은 배우기 쉽지만, 최적의 성능을 끌어내기 위해서는 깊은 이해와 경험이 필요합니다. 특히, 메모리 관리와 성능 최적화 측면에서 숙련된 개발자에게 요구되는 지식이 많습니다.

  #### <cpp_h4> .lua </cpp_h4>

  ```lua

  -- 메모리 관리와 성능 최적화를 위해 Lua의 메타테이블을 사용하는 예제
  local mt = {
      __index = function(table, key)
          print(key .. " not found")
          return nil
      end
  }

  local t = setmetatable({}, mt)
  print(t.someKey) -- "someKey not found" 출력

  ```
  
  이 처럼 메모리 관리와 성능 최적화를 위해선 특정한 방법을 알아야 합니다.


<br>
<br>

## <cpp_h2> 4. Lua와 Cpp의 성능 비교 </cpp_h2>

제가 기말과제에서 Lua로 작성한 프로젝트를 폐기한 이유는 cpp을 사용하여 코드를 작성하는 것과 Lua를 사용하여 코드를 작성하는 것이 크게 차이를 느끼지 못했기 때문입니다. ~~Lua의 장점이 크게 와닿지 않았습니다.~~
그럼 임의적인 코드를 만들어 cpp과 Lua의 속도 메모리를 비교해보겠습니다.

목적
- 메모리 사용량과 함수 호출의 걸린 시간을 측정합니다.

실험 조건
- add 함수를 100만 번 호출하여 Lua 스크립트와 C++ 간의 성능 비교 입니다.
- 실험 환경은 동일한 구성입니다.

실제 코드:

<details markdown=1>
<summary> #### <cpp_h4> .lua </cpp_h4> </summary>

```lua

#include <iostream>
#include <chrono>
#include <windows.h>
#include <psapi.h>
#include <lua.hpp>

void callLuaFunction(lua_State* L, const char* func, double a, double b) {
    lua_getglobal(L, func);    // Lua 함수 가져오기
    lua_pushnumber(L, a);      // 첫 번째 인자 푸시
    lua_pushnumber(L, b);      // 두 번째 인자 푸시

    if (lua_pcall(L, 2, 1, 0) != LUA_OK) {
        std::cerr << "함수 실행 오류 " << func << ": " << lua_tostring(L, -1) << std::endl;
        lua_pop(L, 1);
        return;
    }

    if (lua_isnumber(L, -1)) {
        double result = lua_tonumber(L, -1);  // 결과 가져오기
    } else {
        std::cerr << "잘못된 반환 값" << std::endl;
    }

    lua_pop(L, 1);
}

void printMemoryUsage() {
    PROCESS_MEMORY_COUNTERS pmc;
    if (GetProcessMemoryInfo(GetCurrentProcess(), &pmc, sizeof(pmc))) {
        std::cout << "메모리 사용량: " << pmc.WorkingSetSize / 1024 << " KB" << std::endl;
    } else {
        std::cerr << "메모리 사용량을 가져올 수 없습니다." << std::endl;
    }
}

int main() {
    lua_State* L = luaL_newstate();   // 새로운 Lua 상태 생성
    luaL_openlibs(L);                 // Lua 표준 라이브러리 열기

    if (luaL_dofile(L, "math_operations.lua") != LUA_OK) {   // Lua 스크립트 실행
        std::cerr << "스크립트 로딩 오류: " << lua_tostring(L, -1) << std::endl;
        return 1;
    }

    auto start = std::chrono::high_resolution_clock::now();  // 시작 시간 기록
    for (int i = 0; i < 1000000; ++i) {
        callLuaFunction(L, "add", 5.0, 3.0);  // Lua 함수 호출
    }
    auto end = std::chrono::high_resolution_clock::now();    // 종료 시간 기록
    std::chrono::duration<double> diff = end - start;        // 경과 시간 계산
    std::cout << "Lua: " << diff.count() << " 초" << std::endl;

    printMemoryUsage();  // 메모리 사용량 출력

    lua_close(L);        // Lua 상태 닫기
    return 0;
}


```

</details>


<details markdown=1>
<summary> #### <cpp_h4> .cpp </cpp_h4> </summary>

```lua

#include <iostream>
#include <chrono>
#include <windows.h>
#include <psapi.h>

double add(double a, double b) {
    return a + b;  // 더하기 함수
}

void printMemoryUsage() {
    PROCESS_MEMORY_COUNTERS pmc;
    if (GetProcessMemoryInfo(GetCurrentProcess(), &pmc, sizeof(pmc))) {
        std::cout << "메모리 사용량: " << pmc.WorkingSetSize / 1024 << " KB" << std::endl;
    } else {
        std::cerr << "메모리 사용량을 가져올 수 없습니다." << std::endl;
    }
}

int main() {
    auto start = std::chrono::high_resolution_clock::now();  // 시작 시간 기록
    for (int i = 0; i < 1000000; ++i) {
        add(5.0, 3.0);  // C++ 함수 호출
    }
    auto end = std::chrono::high_resolution_clock::now();    // 종료 시간 기록
    std::chrono::duration<double> diff = end - start;        // 경과 시간 계산
    std::cout << "C++: " << diff.count() << " 초" << std::endl;

    printMemoryUsage();  // 메모리 사용량 출력

    return 0;
}


```

</details>


  
  




