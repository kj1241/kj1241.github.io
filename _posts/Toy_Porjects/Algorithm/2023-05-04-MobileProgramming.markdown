---
layout: post
title: "모바일증강현실프로그래밍실습 - 일반 과제(탐색)"
date: 2024-05-04 09:00:00 +09:00
image: https://drive.google.com/thumbnail?id=15Wsx-472gvuoiPCc2bq_-vot0r9csmBm
toc: true
categories: [Algorithm] 
keywords: C++, 알고리즘, BFS, DFS, Astar
addsence: false
lastmod: 2024-06-21 09:00:00 +09:00
sitemap: 
  changefreq : daily
  priority : 1.0
excerpt: C++로 깊이 우선 탐색(DFS), 넓이 우선 탐색(BFS), A* 알고리즘을 구현한 탐색 알고리즘 프로젝트입니다.
related_links:
  - url: /unity_tp/MobileProgramming.html
  - url: /unity_tp/MobileProgramming_FinalExam.html
---

## <cpp_h2>프로젝트 소개</cpp_h2>

해당 프로젝트는 깊이 우선 탐색(DFS), 넓이 우선 탐색(BFS), 그리고 A* 알고리즘을 C++로 구현한 탐색 알고리즘 프로젝트입니다. 2016년 2학기 모바일증강현실프로그래밍실습 일반 과제로 진행하였습니다.

<br>
<br>

## <cpp_h2>프로젝트 개요</cpp_h2>

- <span><cpp_h5>프로젝트명:</cpp_h5> 탐색 알고리즘 구현하기</span>
- <span><cpp_h5>과제:</cpp_h5> 2016년 2학기 모바일증강현실프로그래밍실습 일반 과제</span>
- <span><cpp_h5>게임 장르:</cpp_h5> Toy Project</span>
- <span><cpp_h5>기간:</cpp_h5> 제작 완료</span>
   - ver.1: 2016.09.03~2016.10.10(제작)
- <span><cpp_h5>개발인원:</cpp_h5> Developer(1명)</span>
- <span><cpp_h5>플랫폼:</cpp_h5> PC (console)</span>

<br>

### <cpp_h3> 기술 스택 </cpp_h3>

- <span><cpp_h5>개발 도구:</cpp_h5> viusal studio 2010 → visual studio 2019</span>
- <span><cpp_h5>개발 언어:</cpp_h5> c++  </span>

<br>
<br>

## <cpp_h2> 프로젝트 특징 및 기능 구현 </cpp_h2>

탐색 알고리즘을 공부하고 해당되는 내용을 구현한 코드입니다.

<br>

### <cpp_h3> 1) 깊이 우선 탐색(DFS)</cpp_h3><red1_error> (전체 제작 기여도: 100%)</red1_error>

![DFS 코드 실행 결과]({{ site.google_drive }}1HibenJEiZkUeWni7Sljhj3OMYPqtAj5n{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<cpp_h6>DFS 코드 실행 결과</cpp_h6>*

깊이 우선 탐색(DFS)은 한 경로를 끝까지 탐색한 후 다른 경로로 이동하는 방식으로, 목표 노드를 찾을 수 있습니다. 모든 경로를 탐색하지 않고도 목표를 찾을 수 있는 효율적인 탐색 방법입니다.

- InitializeNodes: 노드 초기화를 진행합니다.
- DFSInsertStack: 스택에 노드를 삽입합니다.
  - 노드가 맵 범위를 벗어나거나 장애물이거나 이미 방문한 경우 무시합니다.
  - 부모 노드 설정 후 스택에 삽입합니다.
- DFSSetObstacleBlock: 특정 좌표에 장애물 설정합니다.
- DFSSetStartEndPoints: 시작점과 끝점 설정합니다.(시작점은 스택에 삽입합니다.)
- DFSFindRoute: 경로 찾습니다.
  - 스택이 비어있지 않을 동안 반복합니다.
  - 스택에서 노드를 꺼내서 처리합니다.
  - 현재 노드가 목표 노드이면 탐색 종료합니다.
  - 인접한 모든 노드를 검사하여 스택에 삽입합니다.
- TestPrint: 맵 데이터를 출력합니다.(각 노드의 위치와 방문 여부를 출력합니다.)
- DFSMakePath: 경로 출력을 합니다.


<br>

### <cpp_h3> 2) 넓이 우선 탐색(BFS)</cpp_h3><red1_error> (전체 제작 기여도: 100%)</red1_error>

![BFS 코드 실행 결과]({{ site.google_drive }}1F5UxDUWi3xMC8F5S-GthnJxV0uw9SWn_{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<cpp_h6>BFS 코드 실행 결과</cpp_h6>*

너비 우선 탐색(BFS)은 시작점에서부터 같은 거리에 있는 모든 노드를 탐색한 후 다음 거리를 탐색합니다. 이를 통해 최단 경로를 보장하는 방식으로, 모든 노드를 차례대로 탐색하여 목표 노드를 찾습니다.

- InitializeNodes: 노드 초기화합니다.
- BFSInsertQueue: 큐에 노드를 삽입합니다.
  - 노드가 맵 범위를 벗어나거나 장애물이면 무시합니다.
  - 이미 부모 노드가 설정된 노드는 무시합니다.
  - 부모 노드와의 거리를 설정하고 큐에 삽입합니다.
- BFSSetObstacleBlock: 특정 좌표에 장애물 설정합니다.
- BFSSetStartEndPoints: 시작점과 끝점 설정합니다.(시작점을 큐에 삽입합니다.)
- BFSFindRoute: 경로 찾습니다.
  - 큐가 비어있지 않을 동안 반복합니다.
  - 큐에서 노드를 꺼내서 처리합니다.
  - 현재 노드가 목표 노드이면 탐색 종료합니다.
  - 인접한 모든 노드를 검사하여 큐에 삽입합니다.
- TestPrint: 맵 데이터를 출력합니다.(각 노드의 위치와 거리를 출력합니다.)
- BFSMakePath: 최단 경로 출력합니다.(목표 노드에서 시작 노드까지 부모 노드를 따라가며 경로 출력합니다.)

<br>

### <cpp_h3> 3) 최단 거리 알고리즘(Astar)</cpp_h3><red1_error> (전체 제작 기여도: 100%)</red1_error>

![Astar 코드 실행 결과]({{ site.google_drive }}15Wsx-472gvuoiPCc2bq_-vot0r9csmBm{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<cpp_h6>Astar 코드 실행 결과</cpp_h6>*

깊이 우선탐색에서 발전한 A* 알고리즘은 깊이 우선 탐색에서 발전된 휴리스틱 탐색 알고리즘으로, 시작점에서 목표점까지의 최단 경로를 찾습니다. 장애물을 고려하며, 가장 비용이 적은 노드부터 탐색하여 최단 경로를 찾습니다.

- InitializeNodes: 노드 초기화합니다.(모든 노드를 초기화하여 위치를 설정하고 초기 비용을 0으로 설정하며, 장애물이 아닌 상태로 설정합니다.)
- AstarInsertOpenList: 오픈 리스트에 노드를 삽입합니다.
  - 노드가 맵 범위를 벗어나거나 장애물이면 무시합니다.
  - 이미 오픈 리스트에 있는 노드면, 비용을 비교하여 업데이트 합니다.
  - 노드의 비용을 계산하고 적절한 위치에 삽입합니다.
- AstarSetObstacleBlock: 특정 좌표에 장애물 설정합니다.(주어진 좌표의 노드를 장애물로 설정합니다.)
- AstarSetStartEndPoints: 시작점과 끝점 설정합니다.(시작점과 끝점을 설정하고, 시작점을 오픈 리스트에 삽입합니다.)
- AstarFindRoute(): 경로 찾습니다.
  - 오픈 리스트가 비어있지 않을 동안 반복합니다.
  - 오픈 리스트에서 비용이 가장 낮은 노드를 꺼내서 처리합니다.
  - 현재 노드가 목표 노드이면 탐색 종료합니다.
  - 인접한 모든 노드를 검사하여 오픈 리스트에 삽입합니다.
- TestPrint(): 맵 데이터를 출력합니다.(각 노드의 위치와 비용을 출력합니다.)
- AstarMakePath(): 최단 경로 출력합니다.(목표 노드에서 시작 노드까지 부모 노드를 따라가며 경로 출력합니다.)


<br>
<br>

## <cpp_h2> 결과(성과) 및 데모 </cpp_h2>

- <span><cpp_h5>성과:</cpp_h5> 2016년 2학기 모바일증강현실프로그래밍실습 일반 과제 </span>
- <span><cpp_h5>깃허브(코드): </cpp_h5>[https://github.com/kj1241/Algorithm_Portfolio/tree/main/MobileProgramming](https://github.com/kj1241/Algorithm_Portfolio/tree/main/MobileProgramming)</span>

<br>
<br>

## <cpp_h2> 비고 및 여담 </cpp_h2>

- 배운점 
  - 이번 프로젝트를 통해 다양한 탐색 알고리즘의 원리와 구현 방법을 깊이 이해하게 되었습니다. 각 알고리즘이 어떻게 동작하는지, 어떤 상황에서 유리한지에 대해 실습하며 학습할 수 있었습니다. DFS와 BFS는 비교적 간단한 알고리즘이지만, A* 알고리즘은 비용 계산과 휴리스틱을 활용하는 부분이 있어 좀 더 복잡했습니다. 이를 구현하면서 문제 해결 능력과 논리적 사고력을 크게 향상시킬 수 있었습니다.