---
layout: post
title: "게임인공지능 - Lua Script (Guess The Numbers)"
date: 2024-02-24 09:00:00 +09:00
image: https://drive.google.com/thumbnail?id=1URfrTMRU2Rx1tgNkx4IVtiiz_sk50Zg7
toc: true
categories: [AI]
keywords: Lua Script, C++, 게임 인공지능, 숫자 맞추기 게임, 스크립팅, 게임 개발, 프로그래밍 연습, AI, 스크립트 언어, Lua for C++, 인공지능 프로젝트
addsence: false
lastmod: 2024-07-17 09:00:00 +09:00
sitemap:
  changefreq : daily
  priority : 1.0
excerpt: Lua Script와 C++를 사용하여 숫자 맞추기 게임을 제작한 프로젝트입니다. AI가 랜덤 숫자를 생성하고, 사용자가 이를 맞추는 과정을 통해 동적 스크립팅과 게임 메커니즘을 학습할 수 있습니다.
related_links:
  - url: /ai/GameAI_LuaPractice.html
  - url: /ai/GameAI_LuaRockScissorsPaper.html
  - url: /ai/GameAI_LuaFinalProject.html
---

## <ai_h2> 프로젝트 소개 </ai_h2>

해당 프로젝트는 Lua Script와 C++를 사용하여 간단한 숫자 맞추기 게임을 제작한 예제입니다. 이 게임에서는 AI가 랜덤으로 숫자를 생성하고, 사용자가 이 숫자를 맞추기 위해 추측을 하게 됩니다. Lua Script는 게임 개발에서 자주 사용되는 스크립트 언어로, C++ 프로그램에 동적 스크립팅 기능을 추가하는 데 매우 유용합니다. 본 프로젝트는 Lua Script를 단계적으로 학습하고, 이를 C++와 결합하여 실용적인 예제를 구현하는 것을 목표로 합니다. 이를 통해 게임 인공지능 개발에 필요한 기술을 익히는대 목적이 있습니다.

<br>
<br>

## <ai_h2> 프로젝트 개요 </ai_h2>

- <span><ai_h5>프로젝트명:</ai_h5>Lua Script를 사용하여 숫자 맞추기 게임 제작 </span>
- <span><ai_h5>장르:</ai_h5> Toy Project(아케이드)</span>
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

해당 프로젝트는 lua 스크립트를 이용하여 간단한 숫자 맞추기 게임입니다. 프로젝트의 특징은 다음과 같습니다.

<br>

### <ai_h3> Guess The Numbers ver.1</ai_h3><red1_error> (전체 제작 기여도: 100%)</red1_error>

![Guess The Numbers 다이어그램]({{ site.google_drive }}1URfrTMRU2Rx1tgNkx4IVtiiz_sk50Zg7{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<ai_h6>Guess The Numbers 시퀀스 & 다이어그램</ai_h6>* 

![Guess The Numbers 실행 결과]({{ site.google_drive }}1MKLh2XW2Asig8CzYkQm5ZRftgoFmPZIy{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<ai_h6>Guess The Numbers 실행 결과</ai_h6>* 

#### <ai_h4>main.cpp</ai_h4>

1. Lua 인터프리터 초기화
  - luaL_newstate() 함수로 새로운 Lua 상태를 생성합니다.
  - luaL_openlibs(L) 함수로 Lua 표준 라이브러리를 열어 Lua 상태에 로드합니다.

2. Lua 스크립트 실행 함수 정의
  - runLuaScript(lua_State* L, const std::string& script) 함수를 정의하여 Lua 스크립트를 실행합니다.
  - luaL_dofile(L, script.c_str()) 함수를 사용하여 파일에서 Lua 스크립트를 실행합니다.
  - 실행 중 오류가 발생하면 lua_tostring(L, -1) 함수를 사용하여 오류 메시지를 가져와서 출력합니다.

3. guessNumber 함수 호출
  - callGuessNumber(lua_State* L, int guess) 함수를 정의하여 Lua에서 정의한 guessNumber 함수를 호출합니다.
  - lua_getglobal(L, "guessNumber") 함수로 guessNumber 함수를 Lua 스택에 올립니다.
  - lua_pushinteger(L, guess) 함수로 추측한 숫자를 Lua 스택에 올립니다.
  - lua_pcall(L, 1, 1, 0) 함수를 사용하여 Lua 함수를 호출하고 결과를 받아옵니다.
  - 호출 중 에러가 발생하면 lua_tostring(L, -1) 함수를 사용하여 오류 메시지를 가져와서 출력합니다.

4. 메인 함수
  - 사용자에게 숫자 입력을 받고, callGuessNumber 함수를 통해 Lua 스크립트의 guessNumber 함수를 호출하여 결과를 확인합니다.
  - 정답을 맞추면 루프를 종료하고, 정답이 아니라면 사용자에게 알맞는 힌트를 제공합니다.

5. Lua 상태 닫기
  - lua_close(L) 함수를 호출하여 Lua 상태를 닫아 메모리 자원을 해제합니다.

#### <ai_h4>script.lua</ai_h4>

1. 난수 발생기 초기화
  - math.randomseed(os.time()) 함수를 사용하여 난수 발생기를 초기화합니다.

2. 정답 숫자 설정
  - math.random(1, 100) 함수를 사용하여 1부터 100 사이의 난수를 생성하여 targetNumber 변수에 저장합니다.

3. 숫자 맞추기 함수 정의
  - guessNumber(guess) 함수를 정의하여 사용자의 추측 숫자를 받아 정답과 비교합니다.
  - 정답을 맞추면 0을 반환하고, 추측한 숫자가 정답보다 작으면 1을 반환하고, 크면 -1을 반환합니다.
  - 그 외의 경우에는 에러 코드인 2를 반환합니다.

해당 예제는, lua 스크립트를 이용하여 간단한 숫자 맞추기 게임입니다. AI는 정답 숫자를 랜덤으로 만들면 플레이어는 해당 숫자를 찾기 위해서 숫자를 작성합니다. 그러면 만약 정답이 틀렸다면, AI는 플레이어 숫자가 정답보다 작거나 큰지알려줍니다. 또한 플레이어 숫자가 정답이면 해당 게임은 종료하게 됩니다.

<br>
<br>

## <ai_h2> 결과(성과) 및 데모 </ai_h2>

<iframe width="100%" style="aspect-ratio:16/9" src="https://www.youtube.com/embed/bWMnEyWWUSA" title="Guess The Numbers Game - Lua Script and C++ AI Project" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

- <span><ai_h5>성과:</ai_h5> 프로젝트 완성 </span>
- <span><ai_h5>깃허브(코드):</ai_h5> [https://github.com/kj1241/AI_Portfolio/tree/main/GameAI/Abandoned-Project/Lua_Project](https://github.com/kj1241/AI_Portfolio/tree/main/GameAI/Abandoned-Project/Lua_Project)</span>

<br>
<br>

## <ai_h2> 비고 및 여담 </ai_h2>

- 배운점:
  - 난수 생성과 사용자 입력 처리를 통해 게임의 기본 메커니즘을 이해하고 구현하는 능력을 향상시켰습니다.
  - Lua를 통해 C++ 코드의 유지보수성을 높이고, 복잡한 작업을 스크립트로 분리하여 관리하는 방법을 익혔습니다.
    
- 여담:
  - 게임 인공지능 시간에는 Lua Script를 배우지 않았지만, 기말 프로젝트 주제를 자율적으로 선택해야 했기에 Lua Script를 연습하게 되었습니다. 해당 프로젝트가 기말 프로젝트가 되지 못한 이유는 Lua Script 라이브러리를 사용하는 것보다, AI 모델제작해서 보여주고 싶었기 때문에 채택하지 않았습니다. 하지만 충분히 흥미로울 수 있는 주제라서 때문에 블로그에 공개하게 되었습니다.