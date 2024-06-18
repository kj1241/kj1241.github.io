---
layout: post
title: "알고리즘 - 일반 과제"
date: 2024-05-02 09:00:00 +09:00
image: https://drive.google.com/thumbnail?id=1lhYywRYsm7T5qR5FUF2dGShqRkwb0_1E
toc: true
categories: [Algorithm] 
keywords: C++, 알고리즘, 정렬, 탐색, 버블 정렬, 선택 정렬, 삽입 정렬, 퀵 정렬, 이진 탐색, KMP, Boyer-Moore, Karp-Rabin
addsence: false
lastmod: 2024-06-17 09:00:00 +09:00
sitemap:
  changefreq : daily
  priority : 1.0
excerpt: 이 프로젝트는 다양한 C++ 정렬 및 탐색 알고리즘을 구현하여 알고리즘의 원리와 성능을 학습하는 것을 목적으로 합니다.
related_links:
    - url: /algorithm/Algorithm_FinalExam.html
---

## <cpp_h2>프로젝트 소개</cpp_h2>

해당 프로젝트는 다양한 C++ 알고리즘을 구현하고 테스트하는 것을 목적으로 합니다. 정렬 알고리즘과 탐색 알고리즘을 주제로 하여, 알고리즘의 기본 원리와 성능을 이해하고, 실전에서의 적용 방법을 학습할 수 있습니다. 이 프로젝트는 2016년 1학기 알고리즘 일반 과제로 수행되었습니다.

주요 기능으로는 버블 정렬, 선택 정렬, 삽입 정렬, 퀵 정렬과 같은 정렬 알고리즘과 이진 탐색, 보간 탐색, KMP, Boyer-Moore, Karp-Rabin 등의 문자열 검색 알고리즘이 포함되어 있습니다. 각 알고리즘은 개별적으로 실행 가능하며, 결과를 시각적으로 확인할 수 있도록 설계되었습니다.

<br>
<br>

## <cpp_h2>프로젝트 개요</cpp_h2>

- <span><cpp_h5>프로젝트명:</cpp_h5> 다양한 C++ 알고리즘 제작하기</span>
- <span><cpp_h5>과제:</cpp_h5> 2016년 1학기 알고리즘 일반 과제</span>
- <span><cpp_h5>게임 장르:</cpp_h5> Toy Project</span>
- <span><cpp_h5>기간:</cpp_h5> 제작 완료</span>
    - ver.1: 2016.03.02~2016.05.02
- <span><cpp_h5>개발인원:</cpp_h5> Developer(1명)</span>
- <span><cpp_h5>플랫폼:</cpp_h5> PC (console)</span>

<br>

### <cpp_h3> 기술 스택 </cpp_h3>

- <span><cpp_h5>개발 도구:</cpp_h5> viusal studio 2010 → visual studio 2019</span>
- <span><cpp_h5>개발 언어:</cpp_h5> c++  </span>

<br>
<br>

## <cpp_h2> 프로젝트 특징 및 기능 구현 </cpp_h2>

해당 프로젝트는 다양한 정렬 알고리즘과 탐색 알고리즘을 구현한 C++ 프로그램입니다. 이를 통해 알고리즘의 작동 원리와 효율성을 학습할 수 있습니다. 각 알고리즘은 개별적으로 테스트되고, 결과를 시각적으로 확인할 수 있도록 설계되었습니다. 아래는 각 알고리즘의 주요 기능과 구현된 내용을 설명합니다.

<br>

### <cpp_h3> 1) BubbleSort</cpp_h3><red1_error> (전체 제작 기여도: 100%)</red1_error>

![BubbleSort]({{ site.google_drive }}1Mpcd69MtYDKk3x3Q1WmSw3kXV5qZmFuC{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<cpp_h6>BubbleSort 코드 실행</cpp_h6>*

해당 코드는 사용자가 입력한 정수 배열을 버블 정렬 알고리즘을 사용하여 오름차순으로 정렬하는 프로그램입니다. 정렬 설명만 듣고 바로 작성한 코드입니다.

<br>

### <cpp_h3> 2) sort</cpp_h3><red1_error> (전체 제작 기여도: 100%)</red1_error>

![sort]({{ site.google_drive }}163x2Sxml5rF0WGMkZrXdRMSVRL-zcW8O{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<cpp_h6>sort 코드 실행</cpp_h6>*

이 코드는 다양한 정렬 알고리즘(버블 정렬, 선택 정렬, 삽입 정렬, 퀵 정렬)과 탐색 알고리즘(선형 탐색, 이진 탐색, 보간 탐색)을 구현하여 배열을 정렬하고 특정 값을 찾는 프로그램입니다.

1. bubble_sort: 배열을 오름차순으로 정렬하는 버블 정렬 알고리즘입니다.
2. select_sort: 배열을 오름차순으로 정렬하는 선택 정렬 알고리즘입니다.
3. SelectionSort: 또 다른 구현 방식의 선택 정렬 알고리즘입니다.
4. insert_sort: 배열을 오름차순으로 정렬하는 삽입 정렬 알고리즘입니다.
5. InsertionSort: 또 다른 구현 방식의 삽입 정렬 알고리즘입니다.
6. partition: 배열을 오름차순으로 정렬하는 퀵 정렬 알고리즘입니다.
7. LinearSearch: 배열에서 특정 값을 찾는 선형 탐색 알고리즘입니다.
8. binarySearch: 배열에서 특정 값을 찾는 이진 탐색 알고리즘입니다.
9. interpolationSearch: 배열에서 특정 값을 찾는 보간 탐색 알고리즘입니다.

<br>

### <cpp_h3> 3) BinarySearch</cpp_h3><red1_error> (전체 제작 기여도: 100%)</red1_error>

![BinarySearch]({{ site.google_drive }}1R7pgH3OzPT9DzAymrMNmvJB3SOZ59Ljo{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<cpp_h6>BinarySearch 코드 실행</cpp_h6>*

해당 코드는 Score 구조체 배열에서 특정 점수를 이진 탐색으로 찾아내는 C++ 프로그램입니다. 주요 기능은 데이터 세트의 점수를 정렬하고, 이진 탐색을 통해 특정 점수를 가진 학생을 찾는 것입니다.

1. BinarySearch: 정렬된 Score 배열에서 특정 점수를 이진 탐색하여 찾는 함수입니다. 점수를 찾으면 해당 Score 구조체의 포인터를 반환하고, 찾지 못하면 nullptr를 반환합니다.
2. CompareScore: Score 구조체의 점수를 비교하여 정렬하는 데 사용되는 함수입니다. qsort 함수와 함께 사용되어 Score 배열을 오름차순으로 정렬합니다.

<br>

### <cpp_h3> 4) BinarySearch2</cpp_h3><red1_error> (전체 제작 기여도: 100%)</red1_error>

![BinarySearch2]({{ site.google_drive }}1mymMUVGntQdZY9jZu_kMlpGiMxy8xlPy{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<cpp_h6>BinarySearch2 코드 실행</cpp_h6>*

해당 코드는 Score 구조체 배열에서 특정 점수를 이진 탐색으로 찾아내는 C++ 프로그램입니다. std::bsearch을 사용하여 이진탐색을 합니다.

1. std::bsearch을 사용하여 정렬된 이진 탐색을 합니다.
2. CompareScore: Score 구조체의 점수를 비교하여 정렬하는 데 사용되는 함수입니다. qsort 함수와 함께 사용되어 Score 배열을 오름차순으로 정렬합니다.

<br>

### <cpp_h3> 5) BinarySearchTree</cpp_h3><red1_error> (전체 제작 기여도: 100%)</red1_error>

![BinarySearchTree]({{ site.google_drive }}1HvEYv_1cUjAAOMbiSyb-TmA05LZnyHVv{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<cpp_h6>BinarySearchTree 코드 실행</cpp_h6>*

해당 코드들은 트리의 생성, 소멸, 탐색, 삽입, 삭제, 중위 순회를 구현한 함수들로 구성되어 있습니다. 각 함수는 이진 탐색 트리의 특정 작업을 수행합니다.

1. BST_CreateNode: 새로운 노드를 생성하는 함수입니다.
2. BST_DestroyNode: 노드를 삭제하는 함수입니다.
3. BST_DestroyTree: 트리를 순회하면서 모든 노드를 삭제하는 함수입니다.
4. BST_SearchNode: 트리에서 특정 값을 가진 노드를 찾는 함수입니다.
5. BST_SearchMinNode: 트리에서 가장 작은 값을 가진 노드를 찾는 함수입니다.
6. BST_InsertNode: 트리에 새로운 노드를 삽입하는 함수입니다.
7. BST_RemoveNode: 트리에서 특정 값을 가진 노드를 제거하는 함수입니다.
8. BST_InorderPrintTree: 트리를 중위 순회하면서 노드의 값을 출력하는 함수입니다.
9. main: 트리를 생성하고, 노드를 삽입, 탐색, 삭제, 출력하는 예제 함수입니다.

<br>

### <cpp_h3> 6) BruteForce</cpp_h3><red1_error> (전체 제작 기여도: 100%)</red1_error>

![BruteForce]({{ site.google_drive }}1wBvOkDFTB51a70K3UutS66-jNsce5N-A{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<cpp_h6>BruteForce 코드 실행</cpp_h6>*

해당 코드는 브루스포스를 사용하여 함수들을 통해 파일에서 특정 패턴을 검색하고 그 결과를 출력하는 프로그램을 구현할 수 있습니다. 각 함수는 명확하게 정의된 역할을 가지고 있어 코드의 유지보수성과 확장성을 높여줍니다.

1. BruteForce: 주어진 텍스트에서 특정 패턴을 찾기 위해 브루트 포스 알고리즘을 사용합니다.

<br>

### <cpp_h3> 7) KnuthMorrisPratt</cpp_h3><red1_error> (전체 제작 기여도: 100%)</red1_error>

![KnuthMorrisPratt]({{ site.google_drive }}1fyua9tteqz33i30Z4NXUi3GGr7r2eQZm{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<cpp_h6>KnuthMorrisPratt 코드 실행</cpp_h6>*

해당 코드는 Knuth-Morris-Pratt (KMP) 알고리즘을 사용하여 텍스트 파일에서 특정 패턴을 찾는 프로그램입니다. 입력된 파일의 각 줄을 읽고, 패턴이 존재하는 줄과 그 위치를 출력합니다.

1. Preprocess: 턴 문자열을 전처리하여 경계 배열(Border)을 생성합니다. 이 배열은 패턴 내의 접두사와 접미사의 일치 정보를 저장하여 검색 시 효율성을 높입니다.
2. KnuthMorrisPratt: 텍스트 문자열에서 패턴을 검색합니다. 패턴이 발견되면 시작 위치를 반환하고, 그렇지 않으면 -1을 반환합니다. 이 함수는 Preprocess를 호출하여 경계 배열을 생성한 후, 이를 사용해 패턴 검색을 수행합니다.

<br>

### <cpp_h3> 8) BoyerMoore</cpp_h3><red1_error> (전체 제작 기여도: 100%)</red1_error>

![BoyerMoore]({{ site.google_drive }}1lhYywRYsm7T5qR5FUF2dGShqRkwb0_1E{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<cpp_h6>BoyerMoore 코드 실행</cpp_h6>*

해당 코드는 보이드모어 (BoyerMoore) 알고리즘을 사용하여 텍스트 파일에서 특정 패턴을 찾는 프로그램입니다. 입력된 파일의 각 줄을 읽고, 패턴이 존재하는 줄과 그 위치를 출력합니다.

1. BuildBCT: 패턴의 각 문자에 대해 Bad Character Table(BCT)을 구성합니다.
2. BuildGST: Good Suffix Table(GST)을 구성합니다.
3. Max: 두 값 중 더 큰 값을 반환합니다.
4. BoyerMoore: 텍스트에서 패턴을 검색합니다.

<br>

### <cpp_h3> 8) KarpRabin</cpp_h3><red1_error> (전체 제작 기여도: 100%)</red1_error>

![KarpRabin]({{ site.google_drive }}1voTSOq4JJU00_ctmvrQcluYikSQd8fi5{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<cpp_h6>KarpRabin 코드 실행</cpp_h6>*

해당 코드는 Karp-Rabin 문자열 검색 알고리즘을 구현하여 텍스트 내에서 특정 패턴을 검색합니다. Karp-Rabin 알고리즘은 문자열의 해시 값을 사용하여 빠르게 패턴을 찾는 방법입니다.

1. Hash: 주어진 문자열의 앞부분 Size 길이만큼의 해시 값을 계산합니다.
2. ReHash: 이전 해시 값을 사용하여 새로운 해시 값을 계산합니다.
3. KarpRabin: 텍스트에서 패턴을 검색하여 시작 위치를 반환합니다.


<br>
<br>

## <cpp_h2> 결과(성과) 및 데모 </cpp_h2>

- <span><cpp_h5>성과:</cpp_h5> 2016년 1학기 알고리즘 일반 과제 </span>
- <span><cpp_h5>깃허브(코드): </cpp_h5>[https://github.com/kj1241/Algorithm_Portfolio/tree/main/Algorithm](https://github.com/kj1241/Algorithm_Portfolio/tree/main/Algorithm)</span>

<br>
<br>

## <cpp_h2> 비고 및 여담 </cpp_h2>

- 배운점 
	- 다양한 정렬 알고리즘과 탐색 알고리즘을 구현하면서 알고리즘의 기본 개념과 작동 방식을 깊이 이해하게 되었습니다.
	- 코드를 작성하고 디버깅하는 과정에서 문제 해결 능력을 키웠습니다.
	- 여러 알고리즘을 비교하고 분석하면서 각 알고리즘의 장단점과 사용 사례를 명확히 알게 되었습니다.
	
- 여담
	- 처음에는 코드 스타일이 정립되지 않아 공개하기를 주저했지만, 시간이 지나고 나서 보면 이 또한 성장 과정의 일부라는 것을 깨닫게 되었습니다.
	- 다른 사람들에게 완벽한 결과만 보여주고 싶어 연습 과정을 숨기고 싶었지만, 이러한 과정을 공유함으로써 많은 것을 배우고, 더 나은 개발자가 될 수 있다는 것을 알게 되었습니다.
	- 지금은 과거의 프로젝트를 되돌아보며 부족한 점을 보완하고, 더 나은 코드와 설계를 추구하는 개발자가 되기 위해 노력하고 있습니다.
