---
layout: post
title: "자료구조및프로그래밍실습 - 일반 과제"
date: 2024-05-01 09:00:00 +09:00
image: https://drive.google.com/thumbnail?id=15OhinU-3ksazQ6mwEas63Hw00-Cuzmp1
toc: true
categories: [Algorithm] 
keywords: C++, 자료구조,링크드 리스트, 스택, 큐, 트리, 해쉬테이블, 그래프
addsence: false
lastmod: 2024-06-17 09:00:00 +09:00
sitemap:
  changefreq : daily
  priority : 1.0
excerpt: 이 프로젝트는 C++을 사용하여 다양한 자료구조를 구현하고, 각 자료구조의 주요 기능을 학습하고 이해하는 것을 목표로 합니다. 
related_links:
---

## <cpp_h2>프로젝트 소개</cpp_h2>

이 프로젝트는 C++을 사용하여 다양한 자료구조를 구현하고, 각 자료구조의 주요 기능을 직접 코드로 작성해 보는 것을 목표로 합니다. 자료구조는 컴퓨터 과학의 중요한 분야로, 데이터를 효율적으로 저장하고 관리하는 방법을 배우는 데 중점을 두고 있습니다. 이 프로젝트를 통해 C++의 기본 문법과 메모리 관리, 포인터 사용법을 학습하고, 자료구조의 내부 동작 원리를 이해할 수 있었습니다.  

구현한 자료구조에는 LinkedList, SingleLinkedList, DoublyLinkedList, Stack, ArrayStack, LinkedListStack, Queue, LinkedQueue, CircularQueue, LCRSTree, BTreeNode, HashTable, Chaining, Graph 등이 포함되어 있으며, 각 자료구조는 다양한 기능을 제공하고 있습니다. 이를 통해 자료구조가 갖는 특성과 용도에 대해 명확히 이해하고, 알고리즘을 설계하고 디버깅하는 과정에서 문제 해결 능력을 키울 수 있었습니다.  

<br>
<br>

## <cpp_h2>프로젝트 개요</cpp_h2>

- <span><cpp_h5>프로젝트명:</cpp_h5> 다양한 C++ 자료구조 제작하기</span>
- <span><cpp_h5>과제:</cpp_h5> 2015년 2학기 자료구조및프로그래밍실습 일반 과제</span>
- <span><cpp_h5>게임 장르:</cpp_h5> Toy Project</span>
- <span><cpp_h5>기간:</cpp_h5> 제작 완료</span>
    - ver.1: 2015.09.02~2015.12.02
- <span><cpp_h5>개발인원:</cpp_h5> Developer(1명)</span>
- <span><cpp_h5>플랫폼:</cpp_h5> PC (console)</span>

<br>

### <cpp_h3> 기술 스택 </cpp_h3>

- <span><cpp_h5>개발 도구:</cpp_h5> viusal studio 2010 → visual studio 2019</span>
- <span><cpp_h5>개발 언어:</cpp_h5> c++  </span>

<br>
<br>

## <cpp_h2> 프로젝트 특징 및 기능 구현 </cpp_h2>

해당 프로젝트는 다양한 C++ 자료구조를 직접 구현한 것입니다. 각 자료구조는 중요한 알고리즘과 데이터 관리 방법을 학습하고 이해하는 데 중점을 두고 설계되었습니다. 아래는 각 자료구조의 주요 특징과 기능입니다.

<br>

### <cpp_h3> 1) LinkedList</cpp_h3><red1_error> (전체 제작 기여도: 100%)</red1_error>

![LinkedList]({{ site.google_drive }}176LHDJBMWd7vJF4sCo7HM0hs1gPxkyk0{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<cpp_h6>LinkedList 코드 실행</cpp_h6>*

해당 코드는 간단한 연결 리스트(Linked List) 자료 구조를 구현합니다. 해당 코드는 링크드 리스트의 개념만 배우고 과제로 구현한 내용입니다.

1. 생성자와 소멸자: 연결 리스트의 초기화와 메모리 해제를 처리합니다.
2. 노드 삽입: 리스트에 정렬된 순서로 노드를 삽입합니다.
3. 노드 삭제: 리스트에서 특정 데이터를 가진 노드를 삭제합니다.
4. 노드 검색: 리스트에서 특정 데이터를 가진 노드를 찾습니다.
5. 노드 출력: 리스트의 모든 노드를 출력합니다.

<br>

### <cpp_h3> 2) SingleLinkedList</cpp_h3><red1_error> (전체 제작 기여도: 100%)</red1_error>

![SingleLinkedList]({{ site.google_drive }}1Ksyc0ff3wQa3YOYA9gi-F0GwboFJdh5n{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<cpp_h6>SingleLinkedList 코드 실행</cpp_h6>*

해당 코드는 단일 링크드 리스트(Singly Linked List)를 구현한 C++ 프로그램입니다.

1. 노드 생성 및 해제 함수: 메모리 할당에 실패하면 에러 메시지를 출력하고 프로그램을 종료합니다.
2. 노드 삽입: 특정 데이터를 가진 노드 뒤에 새로운 데이터를 삽입합니다. 리스트가 비어있을 경우 새로운 노드를 리스트의 첫 노드로 설정합니다.
3. 노드 삭제: 특정 데이터를 가진 노드를 리스트에서 삭제합니다.
4. 노드 검색: 
	- 리스트에서 특정 데이터를 가진 노드의 개수를 셉니다.
	- 리스트에서 특정 데이터를 가진 첫 번째 노드를 찾습니다.
	- 정 데이터를 가진 노드의 이전 노드를 찾습니다.
5. 특정 데이터의 위치와 개수 찾기:
	- 리스트에서 특정 데이터가 몇 번째 위치에 있는지 찾습니다.
	- 리스트에서 특정 데이터가 몇 번 나타나는지 찾습니다.

<br>

### <cpp_h3> 3) DoublyLinkedList</cpp_h3><red1_error> (전체 제작 기여도: 100%)</red1_error>

![DoublyLinkedList]({{ site.google_drive }}1ULIJfwi1P7M1W0-KyqOvp95hDomo_bRO{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<cpp_h6>DoublyLinkedList 코드 실행</cpp_h6>*

해당 코드는 더블 링크드 리스트(Singly Linked List)를 구현한 C++ 프로그램입니다.

1. 노드 생성 및 해제 함수: 메모리 할당에 실패하면 에러 메시지를 출력하고 프로그램을 종료합니다.
2. 노드 삽입: 특정 데이터를 가진 노드 뒤에 새로운 데이터를 삽입합니다. 리스트가 비어있을 경우 새로운 노드를 리스트의 첫 노드로 설정합니다.
3. 노드 삭제: 특정 데이터를 가진 노드를 리스트에서 삭제합니다.
4. 노드 검색: 
	- 리스트에서 특정 데이터를 가진 노드의 개수를 셉니다.
	- 리스트에서 특정 데이터를 가진 첫 번째 노드를 찾습니다.
	- 정 데이터를 가진 노드의 이전 노드를 찾습니다.
5. 특정 데이터의 위치와 개수 찾기:
	- 리스트에서 특정 데이터가 몇 번째 위치에 있는지 찾습니다.
	- 리스트에서 특정 데이터가 몇 번 나타나는지 찾습니다.

<br>

### <cpp_h3> 4) Stack</cpp_h3><red1_error> (전체 제작 기여도: 100%)</red1_error>

![Stack]({{ site.google_drive }}1_oO_wtoyLUSWvHVnUfNEnDtMU2EeLUU9{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<cpp_h6>Stack 코드 실행</cpp_h6>*

해당 코드는 간단한 스택(Stack) 자료구조를 구현한 C++ 프로그램입니다. 해당 코드는 스택의 특징만 듣고 구현한 코드입니다.

1. 구조체: 스택을 나타내는 구조체 stack를 정의합니다.
2. 초기화 함수: 스택을 초기화합니다.
3. 푸시 함수: 스택에 요소를 추가합니다.
4. 팝 함수: 스택에서 요소를 제거하고 반환합니다.

<br>

### <cpp_h3> 5) ArrayStack</cpp_h3><red1_error> (전체 제작 기여도: 100%)</red1_error>

![ArrayStack]({{ site.google_drive }}18lzA5_CJWgdXUOUf4Xj793kA4sDO8coj{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<cpp_h6>ArrayStack 코드 실행</cpp_h6>*

해당 코드는 정수형 데이터를 저장하는 고정 크기 배열 기반의 스택(Stack) 클래스 ArrayStack을 구현한 C++ 프로그램입니다. 

1. 구조체 정의:클래스 내에 Node 구조체를 정의하여 스택의 각 요소를 나타냅니다. Data 필드는 스택에 저장될 데이터를 의미합니다.
2. 초기화 함수: 스택의 최대 용량(Capacity)을 설정하고, 이를 기반으로 Nodes 배열을 동적으로 할당합니다.
3. 푸시 함수: 함수는 스택에 데이터를 추가합니다.
4. 팝 함수:스택에서 데이터를 제거하고 반환합니다.

<br>

### <cpp_h3> 6) LinkedListStack</cpp_h3><red1_error> (전체 제작 기여도: 100%)</red1_error>

![LinkedListStack]({{ site.google_drive }}1o_BLjp5SxbfrvCi7_L-jJJfbt0P27iRY{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<cpp_h6>LinkedListStack 코드 실행</cpp_h6>*

해당 코드는 정수형 데이터를 저장하는 고정 크기 링크드 리스트 기반의 스택(Stack) 클래스 LinkedListStack을 구현한 C++ 프로그램입니다. 

1. 구조체 정의:클래스 내에 Node 구조체를 정의하여 스택의 각 요소를 나타냅니다. Data 필드는 스택에 저장될 데이터를 의미합니다.
2. 초기화 함수: 스택의 최대 용량(Capacity)을 설정하고, 이를 기반으로 Nodes 배열을 동적으로 할당합니다.
3. 푸시 함수: 함수는 스택에 데이터를 추가합니다.
4. 팝 함수:스택에서 데이터를 제거하고 반환합니다.

<br>

### <cpp_h3> 7) Queue</cpp_h3><red1_error> (전체 제작 기여도: 100%)</red1_error>

![Queue]({{ site.google_drive }}1grRUv18zvoPemYOpTVaYo43X_co-9xGh{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<cpp_h6>Queue 코드 실행</cpp_h6>*

해당 코드는 정적 배열을 사용하여 구현된 간단한 큐(Queue)입니다. 큐는 FIFO(First-In-First-Out) 방식으로 데이터를 저장하고 관리합니다.

1. enqueue 함수: 큐의 끝(rear)에 데이터를 추가합니다.
2. dequeue 함수: 큐의 앞(front)에서 데이터를 제거하고 반환합니다.
3. 상태 확인 함수: is_Empty()와 is_End() 함수를 사용하여 큐의 상태를 확인합니다.

<br>

### <cpp_h3> 8) LinkedQueue</cpp_h3><red1_error> (전체 제작 기여도: 100%)</red1_error>

![LinkedQueue]({{ site.google_drive }}13O7FmSWworTnwlga0ciAyLhjQQ-WhWZi{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<cpp_h6>LinkedQueue 코드 실행</cpp_h6>*

해당 코드는 Node 클래스와 LinkedQueue 클래스를 정의하고, 이를 사용하여 문자열 데이터를 저장하고 처리하는 간단한 링크드 큐(Linked Queue)를 구현합니다.

1. Enqueue 함수: 새로운 노드를 큐의 뒤에 추가합니다.
2. Dequeue(): 큐의 앞쪽 노드를 제거하고 반환. 큐가 비어 있으면 nullptr 반환합니다.
3. 상태 확인 함수: is_Empty()와 is_End() 함수를 사용하여 큐의 상태를 확인합니다.

<br>

### <cpp_h3> 9) CircularQueue</cpp_h3><red1_error> (전체 제작 기여도: 100%)</red1_error>

![CircularQueue]({{ site.google_drive }}15OhinU-3ksazQ6mwEas63Hw00-Cuzmp1{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<cpp_h6>CircularQueue 코드 실행</cpp_h6>*

해당 코드는 원형 큐(Circular Queue)를 구현한 것으로, 원형 큐의 초기화, 삽입, 삭제, 상태 확인 등의 기능을 포함하고 있습니다. 

1. CQ_init: 새로운 큐를 초기화하고 지정된 용량만큼 메모리를 할당합니다.
2. CQ_deinit: 큐와 큐의 데이터를 저장하는 배열의 메모리를 해제합니다.
3. CQ_isFull: 큐가 가득 찼는지 확인합니다.
4. CQ_isEmpty: 큐가 비어 있는지 확인합니다.
5. CQ_size: 큐의 현재 크기를 반환합니다.
6. CQ_print_all: 큐의 모든 요소를 출력합니다.
7. CQ_enqueue: 새로운 요소를 큐의 뒤에 추가합니다. 큐가 가득 찬 경우 오버플로 메시지를 출력하고 삽입을 취소합니다.
8. CQ_dequeue: 큐의 앞쪽 요소를 제거하고 반환합니다. 큐가 비어 있는 경우 언더플로 메시지를 출력하고 제거를 취소합니다.

<br>

### <cpp_h3> 10) LCRSTree</cpp_h3><red1_error> (전체 제작 기여도: 100%)</red1_error>

![LCRSTree]({{ site.google_drive }}13DO3-G-ByoiYnLFxmzY_E_S3fDIytLc-{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<cpp_h6>LCRSTree 코드 실행</cpp_h6>*

해당 코드는 LCRS(Left-Child Right-Sibling) 트리 구조를 구현합니다. 주요 기능은 트리 노드 생성, 추가, 출력, 소멸입니다.

1. CreateNode: 새로운 노드 생성합니다.
2. DestroyNode: 노드 파괴합니다.
3. DestroyTree: 트리를 후위 순회 방식으로 파괴합니다.
4. AddChildNode: 부모 노드에 자식 노드 추가합니다.
5. PrintTree: 트리 깊이 우선 출력합니다.

<br>

### <cpp_h3> 11) BTreeNode</cpp_h3><red1_error> (전체 제작 기여도: 100%)</red1_error>

![BTreeNode]({{ site.google_drive }}1hZHaF3H_GgJg1e5fliQoE-fTL9CZSt4L{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<cpp_h6>BTreeNode 코드 실행</cpp_h6>*

해당 코드는 이진 트리(Binary Tree)를 구현하는 예제입니다. 트리의 노드를 생성, 설정, 연결 및 삭제하는 기능을 포함하고 있습니다. 

1. MakeBTreeNode: 새로운 노드를 동적으로 생성하여 반환합니다.
2. DeleteBTreeNode: 후위 순회 방식으로 트리의 모든 노드를 재귀적으로 삭제합니다.
3. GetData: 노드의 데이터를 반환합니다.
4. SetData: 노드의 데이터를 설정합니다.
5. GetLeftSubTree: 왼쪽 자식 노드를 반환합니다.
6. GetRightSubTree: 오른쪽 자식 노드를 반환합니다.
7. MakeLeftSubTree: 왼쪽 자식 노드를 설정합니다.
8. MakeRightSubTree: 오른쪽 자식 노드를 설정합니다.

<br>

### <cpp_h3> 12) HashTable</cpp_h3><red1_error> (전체 제작 기여도: 100%)</red1_error>

![HashTable]({{ site.google_drive }}1rRZLfTwnWwlg5g0k9OXvelE5D8xP5t0w{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<cpp_h6>HashTable 코드 실행</cpp_h6>*

해당 코드는 기본적인 해시 테이블(Hash Table)을 구현합니다. 주요 기능은 키-값 쌍을 저장하고 검색하는 것입니다.

1. Set: 키-값 쌍을 해시 테이블에 저장합니다.
2. Get: 키에 해당하는 값을 반환합니다.
3. Hash: 해시 함수를 이용해 키의 주소를 계산합니다.

<br>

### <cpp_h3> 13) Chaining</cpp_h3><red1_error> (전체 제작 기여도: 100%)</red1_error>

![Chaining]({{ site.google_drive }}1gulc2bprYpdaAtisVrXO60DH1q-2VMLv{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<cpp_h6>Chaining 코드 실행</cpp_h6>*

해당 코드는 체이닝 방법을 사용하는 해시 테이블(Hash Table)을 구현한 것입니다. 체이닝은 해시 충돌을 해결하기 위해 각 해시 버킷을 링크드 리스트로 관리하는 방법입니다.

1. Set: 키-값 쌍을 해시 테이블에 저장합니다.
2. Get: 키에 해당하는 값을 반환합니다.
3. Hash: 해시 함수를 사용해 키의 주소를 계산합니다.
4. DestroyNode: 노드를 삭제합니다.
5. DestroyList: 리스트를 삭제합니다.

<br>

### <cpp_h3> 14) Graph</cpp_h3><red1_error> (전체 제작 기여도: 100%)</red1_error>

![Graph]({{ site.google_drive }}18AVymjvRiuBU9bKoZfl63sZEH8OwPga8{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<cpp_h6>Graph 코드 실행</cpp_h6>*

해당 코드는 정점(Vertex)과 간선(Edge)으로 구성된 그래프(Graph)를 구현한 것입니다. 각 정점은 다른 정점과의 연결(간선)을 가지고 있으며, 이를 통해 그래프를 표현합니다.

1. AddVertex: 그래프에 정점을 추가합니다.
2. AddEdge: 정점에 간선을 추가합니다.
3. PrintGraph: 그래프를 출력을 합니다.
4. DestroyVertex: 정점과 연결된 모든 간선을 삭제합니다.
5. DestroyEdge: 간선을 삭제합니다.


<br>
<br>

## <cpp_h2> 결과(성과) 및 데모 </cpp_h2>

- <span><cpp_h5>성과:</cpp_h5> 2015년 2학기 자료구조및프로그래밍실습 일반 과제 </span>
- <span><cpp_h5>깃허브(코드):</cpp_h5> [https://github.com/kj1241/Algorithm_Portfolio/tree/main/DataStructure](https://github.com/kj1241/Algorithm_Portfolio/tree/main/DataStructure)</span>

<br>
<br>

## <cpp_h2> 비고 및 여담 </cpp_h2>

- 배운점 
	- 다양한 자료구조를 직접 구현하면서 C++의 기본 문법과 메모리 관리, 포인터 사용법에 대해 깊이 있게 이해하게 되었습니다.
	- 자료구조의 내부 동작 원리를 학습하며, 각 자료구조가 갖는 특성과 용도에 대해 명확히 알게 되었습니다.
	- 알고리즘을 설계하고 디버깅하는 과정에서 문제 해결 능력을 키울 수 있었습니다.
	- 단순히 이론으로 배운 내용을 실제 코드로 구현해 보며, 이론과 실제의 차이를 느끼고 보완하는 과정을 경험할 수 있었습니다.
- 여담
	- 처음에는 코드 스타일이 정립되지 않아 공개하기를 주저했지만, 시간이 지나고 나서 보면 이 또한 성장 과정의 일부라는 것을 깨닫게 되었습니다.
	- 다른 사람들에게 완벽한 결과만 보여주고 싶어 연습 과정을 숨기고 싶었지만, 이러한 과정을 공유함으로써 많은 것을 배우고, 더 나은 개발자가 될 수 있다는 것을 알게 되었습니다.
	- 지금은 과거의 프로젝트를 되돌아보며 부족한 점을 보완하고, 더 나은 코드와 설계를 추구하는 개발자가 되기 위해 노력하고 있습니다.
