---
layout: post
title: "알고리즘 - 기말 과제(레드-블랙 트리)"
date: 2024-05-03 09:00:00 +09:00
image: https://drive.google.com/thumbnail?id=1yt9r6cjeMMDtnz7IztU40JlBrJwINiqT
toc: true
categories: [Algorithm] 
keywords: C++, 알고리즘, 레드 블랙 트리
addsence: false
lastmod: 2024-06-17 09:00:00 +09:00
sitemap: 
  changefreq : daily
  priority : 1.0
excerpt: C++을 사용하여 레드-블랙 트리를 구현하고, 삽입, 삭제, 탐색 등의 트리 연산을 효율적으로 수행하는 프로젝트입니다.
related_links:
    - url: /algorithm/Algorithm_FinalExam.html
---

## <cpp_h2>프로젝트 소개</cpp_h2>

해당 프로젝트는 C++을 사용하여 레드-블랙 트리를 구현하고, 삽입, 삭제, 탐색과 같은 다양한 트리 연산을 효율적으로 수행하는 기능을 제공합니다. 레드-블랙 트리는 자가 균형 이진 탐색 트리로, 로그 시간 복잡도로 다양한 연산을 처리할 수 있습니다. 이를 통해 데이터 구조와 알고리즘에 대한 깊은 이해와 실전 적용 능력을 키우는 것이 목적입니다.

<br>
<br>

## <cpp_h2>프로젝트 개요</cpp_h2>

- <span><cpp_h5>프로젝트명:</cpp_h5> 레드-블렉 트리 제작하기</span>
- <span><cpp_h5>과제:</cpp_h5> 2016년 1학기 알고리즘 기말 과제</span>
- <span><cpp_h5>게임 장르:</cpp_h5> Toy Project</span>
- <span><cpp_h5>기간:</cpp_h5> 제작 완료</span>
    - ver.1: 2016.05.05~2016.05.10
- <span><cpp_h5>개발인원:</cpp_h5> Developer(1명)</span>
- <span><cpp_h5>플랫폼:</cpp_h5> PC (console)</span>

<br>

### <cpp_h3> 기술 스택 </cpp_h3>

- <span><cpp_h5>개발 도구:</cpp_h5> viusal studio 2010 → visual studio 2019</span>
- <span><cpp_h5>개발 언어:</cpp_h5> c++  </span>

<br>
<br>

## <cpp_h2> 프로젝트 특징 및 기능 구현 </cpp_h2>

해당 프로젝트는 C++을 사용하여 레드-블랙 트리를 구현하고 다양한 기능을 제공하는 것을 목표로 합니다. 레드-블랙 트리는 자가 균형 이진 탐색 트리로, 삽입, 삭제, 탐색 연산에서 효율적인 성능을 보장합니다. 다음은 프로젝트의 주요 특징과 구현된 기능입니다

레드-블랙 트리는 삽입 및 삭제 연산 후에도 트리의 균형을 유지하여, 최악의 경우에도 로그 시간 복잡도를 보장합니다.
.

<br>

### <cpp_h3> 1) RedBlackTree</cpp_h3><red1_error> (전체 제작 기여도: 100%)</red1_error>

![RedBlackTree]({{ site.google_drive }}1yt9r6cjeMMDtnz7IztU40JlBrJwINiqT{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<cpp_h6>RedBlackTree 코드 실행</cpp_h6>*

해당 코드의 함수들을 통해 레드-블랙 트리를 구현하고 사용할 수 있습니다. 각 함수는 트리의 특정 동작을 수행하며, 트리의 균형과 성능을 유지하는 역할을 합니다

1. RBT_CreateNode: 새로운 노드를 생성합니다.
2. RBT_DestroyNode: 노드를 삭제합니다.
3. RBT_DestroyTree: 트리를 후위 순회하며 모든 노드를 삭제합니다.
4. RBT_SearchNode: 트리에서 특정 데이터를 가진 노드를 검색합니다.
5. RBT_SearchMinNode: 트리에서 가장 작은 데이터를 가진 노드를 검색합니다.
6. RBT_InsertNodeHelper: 트리에 노드를 삽입하는 헬퍼 함수입니다.
7. RBT_RotateRight: 오른쪽으로 회전하여 트리의 균형을 맞춥니다.
8. RBT_RotateLeft: 왼쪽으로 회전하여 트리의 균형을 맞춥니다.
9. RBT_RebuildAfterInsert: 삽입 후 트리의 균형을 재조정합니다.
10. RBT_InsertNode: 노드를 트리에 삽입하고 균형을 맞춥니다.
11. RBT_RemoveNode: 트리에서 노드를 제거하고 균형을 맞춥니다.
12. RBT_RebuildAfterRemove: 제거 후 트리의 균형을 재조정합니다.
13. RBT_PrintTree: 트리를 깊이 우선 탐색하며 출력합니다.


<br>
<br>

## <cpp_h2> 결과(성과) 및 데모 </cpp_h2>

<iframe width="100%" style="aspect-ratio:16/9" src="https://drive.google.com/file/d/194_Ta25rZCovwTM7MJ1v-gc9YeSwL7-5/preview" title="RedBlackTree" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

- <span><cpp_h5>성과:</cpp_h5> 2016년 1학기 알고리즘 기말 과제 </span>
- <span><cpp_h5>깃허브(코드): </cpp_h5>[https://github.com/kj1241/Algorithm_Portfolio/tree/main/Algorithm](https://github.com/kj1241/Algorithm_Portfolio/tree/main/Algorithm)</span>

<br>
<br>

## <cpp_h2> 비고 및 여담 </cpp_h2>

- 배운점 
	- 이번 프로젝트를 통해 레드-블랙 트리와 같은 균형 이진 탐색 트리의 구현과 작동 원리를 깊이 이해하게 되었습니다. 
	
- 여담
	- 교수님께서 MIT 사이트에서 만든 레드-블랙 트리를 보여주셨고, 이를 계기로 직접 레드-블랙 트리를 구현해보고 싶다는 생각이 들어서 제작하게 되었습니다.	