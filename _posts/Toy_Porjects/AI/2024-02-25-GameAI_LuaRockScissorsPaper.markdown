---
layout: post
title: "게임인공지능 - Lua Script (Rock Scissors Paper)"
date: 2024-02-25 09:00:00 +09:00
image: https://drive.google.com/thumbnail?id=1K1terXx4nc_Cz0VuwtSc51jLcw2vq3SO
toc: true
categories: [AI]
keywords: Lua Script, C++, 게임 인공지능, 가위 바위 보 게임, 스크립팅, 동적 스크립팅, 게임 개발, AI, 스크립트 언어, Lua For C++, 인공지능 프로젝트
addsence: false
lastmod: 2024-07-17 09:00:00 +09:00
sitemap:
  changefreq : daily
  priority : 1.0
excerpt: Lua Script와 C++를 사용하여 가위 바위 보 게임을 제작한 프로젝트입니다. AI가 랜덤 선택을 하고, 사용자가 이에 맞서며 게임을 진행합니다. 동적 스크립팅과 게임 메커니즘을 학습할 수 있습니다.
related_links:
  - url: /ai/GameAI_LuaPractice.html
  - url: /ai/GameAI_LuaGuessTheNumbers.html
  - url: /ai/GameAI_LuaFinalProject.html
---

## <ai_h2> 프로젝트 소개 </ai_h2>

이 프로젝트는 Lua Script와 C++를 사용하여 가위 바위 보 게임을 제작한 예제입니다. AI가 랜덤으로 가위, 바위, 보 중 하나를 선택하고, 사용자가 이를 맞추는 방식으로 진행됩니다. Lua Script는 게임 개발에서 자주 사용되는 스크립트 언어로, C++ 프로그램에 동적 스크립팅 기능을 추가하는 데 매우 유용합니다. 본 프로젝트는 Lua Script를 단계적으로 학습하고, 이를 C++와 결합하여 실용적인 예제를 구현하는 것을 목표로 합니다. 이를 통해 게임 인공지능 개발에 필요한 기술을 익히는대 목적이 있습니다.

<br>
<br>

## <ai_h2> 프로젝트 개요 </ai_h2>

- <span><ai_h5>프로젝트명:</ai_h5>Lua Script를 사용하여 가위 바위 보 게임 제작 </span>
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

해당 프로젝트는 lua 스크립트를 이용하여 가위 바위 보 게임입니다. 프로젝트의 특징은 다음과 같습니다.

<br>

### <ai_h3> Rock Scissors Paper ver.1</ai_h3><red1_error> (전체 제작 기여도: 100%)</red1_error>

![Rock Scissors Paper 다이어그램]({{ site.google_drive }}1K1terXx4nc_Cz0VuwtSc51jLcw2vq3SO{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<ai_h6>Rock Scissors Paper 시퀀스 & 다이어그램</ai_h6>* 

![Rock Scissors Paper 실행 결과]({{ site.google_drive }}13-KwW1_FlkM2Jp2jpxrl1Ba_Q0SZY_EO{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<ai_h6>Rock Scissors Paper 실행 결과</ai_h6>* 


#### <ai_h4>main.cpp</ai_h4>

1. Lua 인터프리터 초기화
  - luaL_newstate() 함수로 새로운 Lua 상태를 생성합니다.
  - luaL_openlibs(L) 함수로 Lua 표준 라이브러리를 열어 Lua 상태에 로드합니다.

2. Lua 스크립트 실행
  - RunLuaScript(L, "script.lua") 함수를 호출하여 Lua 스크립트를 실행합니다.
  - Lua 스크립트 실행 중 오류가 발생하면 lua_tostring(L, -1) 함수를 사용하여 오류 메시지를 가져와서 출력합니다.

3. C++ 함수 정의 및 Lua에서 호출할 수 있도록 등록
  - GetComputerMove, Lua_GetComputerMove, EvaluateMoves, Lua_EvaluateMoves 함수를 정의하여 게임 로직을 구현합니다.
  - lua_register(L, "GetComputerMove", Lua_GetComputerMove) 및 lua_register(L, "EvaluateMoves", Lua_EvaluateMoves) 함수를 사용하여 C++ 함수를 Lua에서 호출할 수 있도록 등록합니다.

4. 게임 로직 구현
  - GetRandomInt(int min, int max) 함수는 주어진 범위 내의 난수를 반환합니다.
  - GetComputerMove() 함수는 "가위", "바위", "보" 중 하나를 무작위로 선택하여 반환합니다.
  - MoveToIndex(const string& move) 함수는 "가위", "바위", "보" 문자열을 인덱스로 변환합니다.
  - EvaluateMoves 함수는 사용자와 컴퓨터의 선택을 평가하여 점수를 업데이트합니다.

5. Lua 상태 닫기
  - Lua 상태를 닫아서 메모리 자원을 해제합니다.

#### <ai_h4>script.lua</ai_h4>

1. 난수 발생기 초기화
  - math.randomseed(os.time()) 함수를 사용하여 난수 발생기를 초기화합니다.

2. 전역 변수 선언
  - player_score와 computer_score 변수를 선언하여 플레이어와 컴퓨터의 점수를 저장합니다.

3. 메인 게임 루프
  - 무한 루프를 통해 게임을 진행합니다.
  - 현재 점수를 출력하고, 사용자에게 가위(r)/바위(p)/보(s) 중 선택을 요청합니다.
  - 사용자 입력을 받아 처리합니다.

4. 사용자 입력 처리
  - possible_moves 테이블을 사용하여 사용자 입력을 "가위", "바위", "보" 문자열로 변환합니다.
  - GetComputerMove() 함수를 호출하여 컴퓨터의 선택을 가져옵니다.
  - EvaluateMoves 함수를 호출하여 사용자와 컴퓨터의 선택을 평가하고 점수를 업데이트합니다.

5. 게임 종료 조건
  - 사용자가 'q'를 입력하면 게임을 종료합니다.
  - 잘못된 입력이 있을 경우, 오류 메시지를 출력하고 다시 입력을 요청합니다.

해당 예제는, lua 스크립트를 이용하여 가위 바위 보 게임입니다. AI는 정답 숫자를 랜덤으로 가위, 바위, 보중 정하면 플레이어는 입력을 통하여 대결을 겨루게 됩니다. 만약 Q를 입력하게되면 게임은 종료하게 됩니다.

<br>
<br>

## <ai_h2> 결과(성과) 및 데모 </ai_h2>

<iframe width="100%" style="aspect-ratio:16/9" src="https://www.youtube.com/embed/IpWc-ZTWbEw" title="Rock Scissors Paper Game - Lua Script and C++ AI Project" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

- <span><ai_h5>성과:</ai_h5> 프로젝트 완성 </span>
- <span><ai_h5>깃허브(코드):</ai_h5> [https://github.com/kj1241/AI_Portfolio/tree/main/GameAI/Abandoned-Project/Lua_Project](https://github.com/kj1241/AI_Portfolio/tree/main/GameAI/Abandoned-Project/Lua_Project)</span>

<br>
<br>

## <ai_h2> 비고 및 여담 </ai_h2>

- 배운점:
  - Lua Script와 C++의 결합을 통해 스크립팅 언어의 유연성과 시스템 프로그래밍 언어의 성능을 활용하는 방법을 배웠습니다.
  - 난수 생성 및 사용자 입력 처리와 같은 기본적인 게임 개발 기술을 익혔습니다.
  - 스크립트와 시스템 언어 간의 상호 운용성을 높이는 방법을 학습했습니다.
    
- 여담:
  - 게임 인공지능 시간에는 Lua Script를 배우지 않았지만, 기말 프로젝트 주제를 자율적으로 선택해야 했기에 Lua Script를 연습하게 되었습니다. 해당 프로젝트가 기말 프로젝트가 되지 못한 이유는 Lua Script 라이브러리를 사용하는 것보다, AI 모델제작해서 보여주고 싶었기 때문에 채택하지 않았습니다. 하지만 충분히 흥미로울 수 있는 주제라서 때문에 블로그에 공개하게 되었습니다.