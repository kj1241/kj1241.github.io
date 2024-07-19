---
layout: post
title: "게임인공지능 - Lua Script (Final Project)"
date: 2024-02-25 09:00:00 +09:00
image: https://drive.google.com/thumbnail?id=1kEB_I9vlMFnJVx2eRUk5ZcErTC4jCydc
toc: true
categories: [AI]
keywords: Lua Script, C++, 게임 인공지능, RPG 게임, 스크립팅, 동적 스크립팅, 게임 개발, AI,  사용자 입력 처리, 스크립트 언어, Lua for C++,  인공지능 프로젝트, 게임 메커니즘
addsence: false
lastmod: 2024-07-17 09:00:00 +09:00
sitemap:
  changefreq : daily
  priority : 1.0
excerpt: 
related_links:
  - url: /ai/GameAI_LuaPractice.html
  - url: /ai/GameAI_LuaGuessTheNumbers.html
  - url: /ai/GameAI_LuaRockScissorsPaper.html
  - url: /ai/GameAI_FinalExam.html
---

## <ai_h2> 프로젝트 소개 </ai_h2>

해당 프로젝트는 2018년 1학기 게임 인공지능 수업의 기말 과제로 제출하기 위해서 RPG 게임을 Lua Script와 C++를 사용하여 구현한 것입니다. 
[GDC(Game Developers Conference)](https://gdcvault.com/play/1012427/Lua-Scripting-in-Game) 2010에서 발표된 내요을 보고 Lua Script를 사용해서 만든 프로젝트를 제작하고 싶어서 시작하게 되었습니다. 
프로젝트의 핵심은 Lua Script를 이용해 게임의 주요 로직을 스크립트로 작성하고, C++를 통해 게임의 실행과 사용자 인터페이스를 처리하는 것입니다. 플레이어는 고블린과의 전투를 통해 게임을 진행하며, 아이템을 사용하여 체력을 회복할 수 있습니다. 게임의 목표는 모든 고블린을 물리치는 것이며, 플레이어의 체력이 0이 되면 게임이 종료됩니다. 

<br>
<br>

## <ai_h2> 프로젝트 개요 </ai_h2>

- <span><ai_h5>프로젝트명:</ai_h5>2018년 1학기 게임인공지능 기말 과제였던 프로젝트 </span>
- <span><ai_h5>장르:</ai_h5> Toy Project(RPG)</span>
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

게임은 Lua Script로 주요 로직을 처리하고, C++로 게임의 실행과 사용자 인터페이스를 처리합니다. 이 프로젝트의 주요 특징은 다음과 같습니다:

<br>

### <ai_h3> Final Project ver.1</ai_h3><red1_error> (전체 제작 기여도: 100%)</red1_error>

![Final Project 다이어그램]({{ site.google_drive }}1kEB_I9vlMFnJVx2eRUk5ZcErTC4jCydc{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<ai_h6>Final Project 시퀀스 & 다이어그램</ai_h6>* 

![Final Project 실행 결과]({{ site.google_drive }}17gIysnEmEFdobWy9bxvLcFgHVKCpMvRi{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<ai_h6>Final Project 실행 결과</ai_h6>* 

#### <ai_h4>main.cpp</ai_h4>

1. Lua 인터프리터 초기화
  - luaL_newstate() 함수를 사용하여 새로운 Lua 상태를 생성합니다.
  - luaL_openlibs(L) 함수를 사용하여 Lua 표준 라이브러리를 열어 Lua 상태에 로드합니다.

2. Lua 스크립트 실행 함수 정의
  - runLuaScript(lua_State* L, const std::string& script) 함수로 Lua 스크립트 파일을 실행합니다. 
  - 스크립트 실행 중 오류가 발생하면 lua_tostring(L, -1) 함수를 사용하여 오류 메시지를 가져와서 출력합니다.

3. Lua 함수 호출 헬퍼 함수 정의
  - callLuaFunction(lua_State* L, const std::string& func) 함수로 Lua에서 정의된 함수를 호출합니다. 
  - 함수 호출 중 오류가 발생하면 lua_tostring(L, -1) 함수를 사용하여 오류 메시지를 가져와서 출력합니다.

4. Lua 스크립트 실행 및 게임 초기화
  - runLuaScript(L, "game.lua") 함수를 사용하여 game.lua 스크립트를 실행합니다.
  - callLuaFunction(L, "startGame") 함수를 사용하여 게임을 초기화합니다.

5. 게임 루프 및 사용자 입력 처리
  - 사용자의 입력에 따라 공격(attack), 아이템 사용(useItem), 인벤토리 보기(showInventory) 등의 Lua 함수를 호출합니다.
  - 종료 조건을 확인하기 위해 callLuaFunction(L, "checkEndCondition") 함수를 호출합니다.

6. Lua 상태 닫기
  - lua_close(L) 함수를 사용하여 Lua 상태를 닫고 메모리 자원을 해제합니다.

#### <ai_h4>game.lua</ai_h4>

1. Lua 스크립트 파일 로드
  - dofile("player.lua"), dofile("enemy.lua"), dofile("inventory.lua")를 사용하여 Lua 스크립트 파일을 로드합니다.
  
2. 플레이어 및 적 객체 생성
  - Player:new(nil, "Hero", 100, 10)으로 플레이어 객체를 생성합니다.
  - Enemy:new(nil, "Goblin1", 30, 10), Enemy:new(nil, "Goblin2", 40, 12), Enemy:new(nil, "Goblin3", 50, 14)으로 여러 적 객체를 생성합니다.

3. 인벤토리 객체 생성
  - Inventory:new()으로 인벤토리 객체를 생성합니다.

4. 게임 시작 함수 정의
  - startGame() 함수로 게임 시작 메시지를 출력합니다.

5. 공격 함수 정의
  - attack() 함수로 플레이어가 적을 공격하고, 적이 플레이어를 반격하는 로직을 포함합니다.
  - 적의 체력이 0 이하가 되면 적을 물리쳤다는 메시지를 출력합니다.

6. 아이템 사용 함수 정의
  - useItem() 함수로 플레이어가 인벤토리에서 아이템을 사용하도록 합니다.

7. 인벤토리 보기 함수 정의
  - showInventory() 함수로 현재 인벤토리의 아이템 목록을 출력합니다.

8. 종료 조건 확인 함수 정의
  - checkEndCondition() 함수로 플레이어의 체력 또는 모든 적의 체력을 확인하여 게임 종료 조건을 판단합니다.

#### <ai_h4>inventory.lua</ai_h4>

1. 인벤토리 객체 초기화
  - Inventory:new(o) 함수로 새로운 인벤토리 객체를 생성하고, 여러 개의 포션을 아이템 목록에 추가합니다.

2. 인벤토리 출력 함수 정의
  - show() 함수로 현재 인벤토리에 있는 아이템 목록을 출력합니다.

3. 아이템 사용 함수 정의
  - useItem(player) 함수로 플레이어가 인벤토리에서 선택한 아이템을 사용하도록 합니다. 포션을 사용하면 플레이어의 체력이 20 회복됩니다.

#### <ai_h4>player.lua</ai_h4>

1. 플레이어 객체 초기화
  - Player:new(o, name, hp, attackPower) 함수로 새로운 플레이어 객체를 생성합니다.

2. 플레이어 공격 함수 정의
  - attack(target) 함수로 플레이어가 적을 공격하고, 적의 체력을 감소시킵니다.

#### <ai_h4>enemy.lua</ai_h4>

1. 적 객체 초기화
  - Enemy:new(o, name, hp, attackPower) 함수로 새로운 적 객체를 생성합니다

2. 적 공격 함수 정의
  - attack(target) 함수로 적이 플레이어를 공격하고, 플레이어의 체력을 감소시킵니다.

해당 코드는. Lua 스크립트를 이용하여 글로적는 RPG를 제작한 프로젝트입니다. 플레이어는 고블린 3마리와 마주치게되고 고블린을 잡는 과정에서 플레이어는 데미지를 입게 됩니다. 포션을 사용하여 플레이어 채력을 회복할 수 있습니다. 플레이어 피가 0이 되면 게임은 지게 되고 고블린 3마리를 모두 잡으면 플레이어는 승리하게 됩니다.

<br>
<br>

## <ai_h2> 결과(성과) 및 데모 </ai_h2>

<iframe width="100%" style="aspect-ratio:16/9" src="https://www.youtube.com/embed/0Cm8m5B2Erw" title="RPG Game with Lua Script and C++ - Final Project" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

- <span><ai_h5>성과:</ai_h5> 프로젝트 완성 </span>
- <span><ai_h5>깃허브(코드):</ai_h5> [https://github.com/kj1241/AI_Portfolio/tree/main/GameAI/Abandoned-Project/Lua_Project](https://github.com/kj1241/AI_Portfolio/tree/main/GameAI/Abandoned-Project/Lua_Project)</span>

<br>
<br>

## <ai_h2> 비고 및 여담 </ai_h2>

- 배운점:
  - Lua Script와 C++의 결합을 통해 스크립팅 언어의 유연성과 시스템 프로그래밍 언어의 성능을 활용하는 방법을 배웠습니다.
  - 스크립트와 시스템 언어 간의 상호 운용성을 높이는 방법을 학습했습니다.
  - 간단한 RPG 게임 메커니즘을 설계하고 구현하는 과정을 통해 게임 개발에 필요한 전반적인 프로세스를 경험했습니다.
    
- 여담:
  - 게임 인공지능 시간에는 Lua Script를 배우지 않았지만, 기말 프로젝트 주제를 자율적으로 선택해야 했기에 Lua Script를 연습하게 되었습니다. 해당 프로젝트가 기말 프로젝트가 되지 못한 이유는 Lua Script 라이브러리를 사용하는 것보다, AI 모델제작해서 보여주고 싶었기 때문에 채택하지 않았습니다. 하지만 충분히 흥미로울 수 있는 주제라서 때문에 블로그에 공개하게 되었습니다.