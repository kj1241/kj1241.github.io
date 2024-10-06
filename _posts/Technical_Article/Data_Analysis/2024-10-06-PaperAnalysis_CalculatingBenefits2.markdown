---
layout: post
title: "논문 분석 - 인프라 투자에 의한 계산 이익2"
date: 2024-10-06 09:00:00 +09:00
image: https://drive.google.com/thumbnail?id=1qY54TRjjMb9eo3OXrmT1FAiSQG9axZcy
toc: true
categories: [Data_Analysis]
keywords: 비용 편익 분석, 회귀 분석, 중력 모델, 로짓 모델, 프랭크-울프 알고리즘, 인프라 투자, 프랭크-울프 알고리즘
addsence: true
lastmod: 2024-10-06 09:00:00 +09:00
sitemap: 
  changefreq : daily
  priority : 1.0
excerpt: 이 글은 인프라 투자 분석 논문에 등장하는 비용-편익 분석, 회귀 분석, 중력 모델, 로짓 모델, 프랭크-울프 알고리즘 등을 C++ 로직으로 구현하고 해석하는 과정을 담고 있습니다.
related_links:
  - url: /data_analysis/PaperAnalysis_CalculatingBenefits1.html
---

## <data_h2>시작하기 전에</data_h2>

저번 파트는 모두를 위한 파트였다면, 이 파트에서는 프로그래머를 위한 내용을 다룹니다. Calculating benefits of infrastructural investment 논문에서 제시한 모델, 분석, 알고리즘을 로직으로 구현하고, 이를 통해 프로그램을 작성하여 결과를 도출해 봅니다.

<br>
<br>

## <data_h2>비용-편익 분석</data_h2>

특정 사업이나 정책이 가져올 이익과 그에 따른 비용을 비교하여, 경제적 타당성을 비교하는 방법입니다.

<br>

### <data_h3>로직<data_h3>

1. 비용 편익 데이터를 입력
2. 미래가치를 현제가치로 할인

	$$ PV = \frac{ \text{amount} }{ (1 + \text{discount\_rate})^{\text{year}} } $$
	```cpp

	double present_value(double amount, int year, double discount_rate) {
    	return amount / std::pow(1 + discount_rate, year);
	}

	```
3. 순 현재가치 계산(NPV)

	$$ NPV = \sum_{t=0}^{n} \frac{ \text{benefits}[t] - \text{costs}[t] }{ (1 + \text{discount\_rate})^t } $$
	```cpp

	double npv(const std::vector<double>& costs, const std::vector<double>& benefits, double discount_rate) {
    	double net_benefit = 0.0;
    	for (size_t year = 0; year < costs.size(); ++year) {
        	net_benefit += present_value(benefits[year] - costs[year], year, discount_rate);
    	}
    	return net_benefit;
	}

	```
4. 결과 분석 
	![비용-편익 분석]({{ site.google_drive }}1LbMkHzKK5vWF09k0OHRsFPJEFb3G8Lmu{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
	*<data_h6>비용-편익 분석</data_h6>*


<br>
<br>

## <data_h2>회귀 분석(여행 생성 모델)</data_h2>

여행 생성 모델에 대한 회귀 분석은 여행자의 여행 빈도, 경로, 거리 등에 영향을 미치는 요인을 수집하고, 이를 이용해 회귀 분석을 수행하는 방식입니다.

<br>

### <data_h3>로직<data_h3>

1. 여행 관련 데이터를 입력

	평균 소득 계산: $$ \bar{x} = \frac{ \sum_{i=1}^{n} x_i }{n} $$
	```cpp

	double mean_income = sum_income / n;	

	```
	평균 여행 횟수 계산:$$ \bar{y} = \frac{ \sum_{i=1}^{n} y_i }{n} $$
	```cpp

	double mean_travel_count = sum_travel_count / n;

	```

2. 선형 회귀 분석을 통한 관계 도출

	기울기 (slope) 계산: $$ slope = \frac{\sum (x_i - \bar{x})(y_i - \bar{y})}{\sum (x_i - \bar{x})^2} $$
	```cpp

	double numerator = 0, denominator = 0;
    for (const auto& d : data) {
		numerator += (d.income - mean_income) * (d.travel_count - mean_travel_count);
		denominator += (d.income - mean_income) * (d.income - mean_income);  
	}
	slope = numerator / denominator;

	```
	절편 (intercept) 계산: $$ intercept = \bar{y} - slope \times \bar{x} $$
	```cpp

	intercept = mean_travel_count - slope * mean_income;

	```

3. 여행 횟수 예측

	예측되는 여행 횟수: $$ travel\_count = slope \times income + intercept $$
	```cpp

	double predicted_travel_count = slope * new_income + intercept;  

	```

4. 결과 분석
	![회귀분석]({{ site.google_drive }}1qRCIT5H9mWhl1IdMnd8GOlyJ3ZlSaPnS{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
	*<data_h6>회귀분석</data_h6>*

<br>
<br>

## <data_h2>중력 모델(여행 분포 모델)</data_h2>

출발지와 도착지 간에 여행분포를 예측하는 모델입니다.

<br>

### <data_h3>로직<data_h3>

1. 출발지와 도착지의 여행 수 데이터를 입력

2. 이동 비용 또는 거리 데이터 입력

3. 저항 함수와 중력 모델을 적용하여 여행 분포 계산

	저항: $$ resistance = \frac{1}{cost^2} $$
	```cpp

	double resistance(double cost) {
    	return 1.0 / pow(cost, 2);
	}

	```
 	여행 분포: $$ T_{ij} = P_i \times A_j \times resistance(C_{ij}) $$ 
	```cpp

	for (int i = 0; i < n; ++i) {
        for (int j = 0; j < n; ++j) {
            T[i][j] = P[i] * A[j] * resistance(C[i][j]);
        }
    }

	```
	정규화: $$ T_{ij} = \frac{T_{ij}}{\sum_{k} T_{ik}} $$
	
	```cpp

	for (int i = 0; i < n; ++i) {
		double rowSum = 0.0;
		for (int j = 0; j < n; ++j) {
			rowSum += T[i][j];
		}
		for (int j = 0; j < n; ++j) {
				
			T[i][j] /= rowSum; // 각 행에 대해 비율을 맞춤
		}
	}

	```
	
4. 결과 분석
	![중력 모델]({{ site.google_drive }}1ywPqtBOe_UPJyD9PNVTJkIi0-CYVyd26{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
	*<data_h6>중력 모델</data_h6>*

<br>
<br>

## <data_h2>로짓 모델(모달 분할 모델)</data_h2>

출발지에서 목적지까지 사람들이 어떤 교통수단을 이용할지 예측하는 모형입니다.

<br>

### <data_h3>로직<data_h3>

1. 교통수단 별 비용 및 시간 데이터를 입력

2. 유용성 계산

	유용성 함수: $$ U = -0.5 \times cost - 0.3 \times time $$

	```cpp

	double utility(double cost, double time) {
    	return -0.5 * cost - 0.3 * time;  // 가중치는 임의로 설정 가능
	}

	```

3. 로짓 모델을 적용하여 선택 확률 계산

	로짓 모델 확률 계산: $$ P_i = \frac{e^{U_i}}{\sum_{j} e^{U_j}} $$
	```cpp

	double denominator = 0.0;
    for (int i = 0; i < n; ++i) {
        denominator += exp(utilities[i]);
    }

    // 선택 확률 계산
    for (int i = 0; i < n; ++i) {
        probabilities[i] = exp(utilities[i]) / denominator;
    }

	```

4. 결과 분석
	![로짓 모델]({{ site.google_drive }}1rV_cPg6ky7KQdFPESD2wF_-IXa33xYX-{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
	*<data_h6>로짓 모델</data_h6>*

<br>
<br>

## <data_h2>할당 모델</data_h2>

택된 교통수단에 대해 배정된 교통량을 특정 조건에 맞게 나누는 과정입니다. 즉, 각 교통수단의 선택 확률에 따라 교통량을 배분하는 방식입니다.

<br>

### <data_h3>로직<data_h3>

1. 교통량 할당
	
	교통량 할당: $$ 할당된 교통량 = 총 교통량 \times 선택 확률 $$
	```cpp

	void allocateTrafficVolume(vector<TransportOption>& options, double totalTraffic) {
		for (auto& option : options) {
			// $$ 할당된 교통량 = 총 교통량 \times 선택 확률 $$
			option.allocatedVolume = totalTraffic * option.probability;
		}
	}

	```

2. 결과 분석
	![할당]({{ site.google_drive }}1tO5qLIkaDOXbgMyo1NUlzMK0EXHmTPP6{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
	*<data_h6>할당</data_h6>*

<br>
<br>

## <data_h2>추가) 프랭크-울프 알고리즘</data_h2>

프랭크-울프(Frank-Wolfe) 알고리즘은 최적화 문제를 풀 때 사용되는 경사하강법(gradient descent)의 일종입니다. 이 알고리즘은 제약 조건이 있는 최적화 문제에서 사용됩니다. 교통 배분 문제에서 프랭크-울프 알고리즘은 교통량의 평형 상태를 구하기 위해 사용됩니다.

<br>

### <data_h3>로직<data_h3>

1. 초기화: 초기 교통량을 설정합니다.
2. 최적화 문제 설정: 교통망의 비용 함수는 각 경로에서의 시간과 비용에 의해 정의됩니다.
	
	비용 함수: $$ 비용(time) = 시간(time) + \alpha \cdot 교통량(flow) $$
	```cpp

	double costFunction(double time, double flow, double alpha) {
    	return time + alpha * flow;
	}

	``` 
3. 경사 계산: 비용 함수에 대해 경사를 계산합니다.
4. 방향 탐색: 경사 방향에 따라 새로운 교통량을 탐색합니다.
5. 교통량 업데이트: 탐색한 방향에 따라 교통량을 업데이트합니다.
6. 수렴 여부 확인: 수렴 조건을 확인하고, 만족하지 않으면 반복합니다.
7. 결과 확인
	![프랭크-울프 알고리즘]({{ site.google_drive }}1qY54TRjjMb9eo3OXrmT1FAiSQG9axZcy{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
	*<data_h6>프랭크-울프 알고리즘</data_h6>*

<br>

<details markdown=1>
<summary> 전체 코드 </summary>

```cpp

#include <iostream>
#include <vector>
#include <cmath>

using namespace std;

// 교통수단 구조체 정의
struct TransportOption {
    string name;
    double cost;  // 비용
    double time;  // 시간
    double flow;  // 현재 교통량
    double initialFlow; // 초기 교통량
};

// 비용 함수 정의 (시간과 교통량에 따라 비용이 증가)
double costFunction(double time, double flow, double alpha) {
    return time + alpha * flow;
}

// 교통량에 따른 비용을 계산하여 비용 합을 반환
double calculateTotalCost(const vector<TransportOption>& options, double alpha) {
    double totalCost = 0.0;
    for (const auto& option : options) {
        totalCost += costFunction(option.time, option.flow, alpha) * option.flow;
    }
    return totalCost;
}

// 프랭크-울프 알고리즘을 이용한 교통량 할당 함수
void frankWolfeAlgorithm(vector<TransportOption>& options, double totalTraffic, double alpha, int maxIterations, double tolerance) {
    int numOptions = options.size();

    // 1. 초기 교통량 설정 
    for (auto& option : options) {
        option.flow = totalTraffic / numOptions;
        option.initialFlow = option.flow;
    }

    // 2. 반복 알고리즘 시작
    for (int iter = 0; iter < maxIterations; ++iter) {
        cout << "Iteration " << iter + 1 << ":" << endl;

        // 3. 비용에 대한 경사 계산 (최단 시간 경로 탐색)
        vector<double> newFlow(numOptions, 0.0);
        for (int i = 0; i < numOptions; ++i) {
            newFlow[i] = totalTraffic * (1.0 / costFunction(options[i].time, options[i].flow, alpha));
        }

        // 4. 최적 경로로의 교통량 배분
        double stepSize = 2.0 / (iter + 2);  // step size는 보통 2/(k+2)로 설정
        for (int i = 0; i < numOptions; ++i) {
            options[i].flow = (1 - stepSize) * options[i].flow + stepSize * newFlow[i];
        }

        // 5. 비용의 총 변화량을 계산하여 수렴 여부 확인
        double totalCostChange = 0.0;
        for (int i = 0; i < numOptions; ++i) {
            double oldCost = costFunction(options[i].time, options[i].initialFlow, alpha);
            double newCost = costFunction(options[i].time, options[i].flow, alpha);
            totalCostChange += abs(newCost - oldCost);
        }

        // 수렴 조건을 만족하면 종료
        if (totalCostChange < tolerance) {
            cout << "수렴 완료!" << endl;
            break;
        }

        for (const auto& option : options) {
            cout << option.name << " 교통량: " << option.flow << "명" << endl;
        }
    }
}

void analyzeResult(const vector<TransportOption>& options) {
    cout << "최종 교통량 배분 결과:" << endl;
    for (const auto& option : options) {
        cout << option.name << " : " << option.flow << "명" << endl;
    }
}

int main() {
    vector<TransportOption> options = {
        {"버스", 2000, 30, 0.0, 0.0},
        {"지하철", 1500, 25, 0.0, 0.0},
        {"택시", 10000, 10, 0.0, 0.0}
    };

    double totalTraffic = 10000.0;

    double alpha = 0.01;  // 교통량에 따른 비용 증가 비율
    int maxIterations = 100;  // 최대 반복 횟수
    double tolerance = 1e-3;  // 수렴 조건

    frankWolfeAlgorithm(options, totalTraffic, alpha, maxIterations, tolerance);
    analyzeResult(options);

    return 0;
}

```

</details>


<br>
<br>

## <data_h2>향후 계획</data_h2>

이로써 논문에서 제시한 기존 모델들을 모두 프로그래밍적으로 살펴보았습니다. 다음 편에서는 아직 다루지 못한 비집계 접근 방식과 에이전트 기반 모델에 대한 로직도 작성할 예정입니다. 이를 통해 더 세밀한 분석과 예측이 가능하도록 확장해 나가겠습니다.