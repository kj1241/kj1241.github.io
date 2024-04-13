---
layout: post
title: "구글 드라이브를 사용하여 이미지 호스팅하기 - 깃허브 블로그에 적용"
date: 2024-03-01 10:00:00 +09:00
image: https://drive.google.com/thumbnail?id=1aQQOxVbmCAj0e0wJ5j6UdKijAWzBWXL6
toc: true
categories: [Web]
keywords: Goole Drive, Image Hosting, embed, Git Hub Blog , 구글 드라이브 이미지 호스트, 임베드
lastmod: 2024-04-03 11:05:00 +09:00
sitemap:
  changefreq : daily
  priority : 1.0
addsence: true
excerpt: 최근에 업데이트된 구글 드라이브 이미지 호스팅 방법에 대해서 설명하고 있습니다. 이미지를 업로드하고 공유 링크를 얻어와 깃 허브 블로그에 손쉽게 적용할 수 있습니다. 이는 이미지 관리를 간편하게 하며 저장소 용량을 절약할 수 있습니다.
related_links:
    - url: /web_tp/Git_Hub_Blog_Skin.html
---
  
오랜만에 블로그를 들어왔는데 이게 왠걸 ... 구글 드라이브에서 호스팅한 블로그의 이미지 및 리소스들이 전부 깨져있었습니다. 블로그를 보니 어지럽고, 구글에 대해서 화가 나네요. 저보다 더한 사람이 많으므로 참고 이 기회로 삼아 블로그를 리뉴얼 하는 기회로 여기겠습니다.

<br>

---

<br>

## <web_h2>1. 2024년 1월 업데이트 이후 바뀐 코드</web_h2>

2023년 10월쯤에 구글은 사용자 개인정보 보호를 강화하기 위해서 제 3자 쿠키를 제거하겠다고 발표했습니다. 그에 따라 이제는 과거에 이미지 호스팅하는 주소가 작동하지 않습니다. ~~(왜 기존에 코드는 작동 안 되는 거냐고 구글...)~~ 이 단락은 기존에 이미지 호스팅 실패를 어떻게 바꿔야 하는지를 이야기하고 있습니다. <web_h5>이미지 호스팅을 처음 하시는 분들은 2번 단락을 확인해 주세요. </web_h5>

<br>

#### **<web_h4>html:</web_h4>**
  
```html

<img src="https://drive.google.com/uc?export=view&id=1taUeDcvRNHHmjZgkQOMWQ6O-KQ47_AFa">

```

위와 같이 기존코드를 작성하면 작동하지 않고 403 오류가 반환됩니다. 이와 관련된 내용은, [Goole 드라이브의 제 3자에 쿠키에 대한 항후 변경 사항](https://workspaceupdates.googleblog.com/2023/10/upcoming-changes-to-third-party-cookies-in-google-drive.html)에서 자세한 내용을 읽어보실 수 있습니다. 그럼 기존의 주소를 대체하기 위해서는 <web_h5>두 가지 방법</web_h5>이 있습니다.  

<br>

### <web_h3> 1. iframe을 사용하여 코드 작성 </web_h3>

첫 번째 방식으로는 구글 드라이브 공유 링크를 이용하여 이미지, 동영상, 문서 등을 임베드 하는 방법입니다.  

<br>

#### **<web_h4>html:</web_h4>**

```html

<iframe 
  src="https://drive.google.com/file/d/1taUeDcvRNHHmjZgkQOMWQ6O-KQ47_AFa/preview"
></iframe>

```

<iframe 
  src="https://drive.google.com/file/d/1taUeDcvRNHHmjZgkQOMWQ6O-KQ47_AFa/preview"
></iframe>

해당 코드를 사용해보시면, 테두리와 여백이 생깁니다. 따라서 이를 기존의 이미지처럼 사용하기 위해서 style="border: 0" 테두리를 제거해주면 됩니다. 또한, 이미지 높이와 너비를 생각한 대로 맞추고 코드를 작성하면 됩니다. 밑은 임베드 코드를 변형한 예시입니다. 

<br>

#### **<web_h4>html:</web_h4>**

```html

<iframe 
  src="https://drive.google.com/file/d/1taUeDcvRNHHmjZgkQOMWQ6O-KQ47_AFa/preview"  height="200px" width="aspect-ratio:1"  style="border: 0; aspect-ratio:1;"
></iframe>

```

<iframe 
  src="https://drive.google.com/file/d/1taUeDcvRNHHmjZgkQOMWQ6O-KQ47_AFa/preview"  height="200px" width="aspect-ratio:1"  style="border: 0; aspect-ratio:1;"
></iframe>

<web_h5>제한사항</web_h5>
- iframe의 이미지가 반응하지 않습니다.
- 클릭 핸들러가 지저분해집니다.
- 너무 느립니다.

<br>

### <web_h3> 2. img를 사용하여 코드 작성 </web_h3>

iframe 으로 이미지 임베드를 사용하면 단점이 존재합니다. 바로 <web_h5>이미지 로딩속도가 느리다는 것</web_h5>입니다. 구글 검색에 상위 노출이 되려면, 정확성도 필요하지만 접속했을 때 반응속도도 포함됩니다. 물론 임베드로 인한 속도가 포함되는지는 알 수 없지만, 로딩이 빠르면 좋음으로 IMG 코드를 사용하는 방법에 관해서 이야기해 보겠습니다. 
  
<br>

#### **<web_h4>html:</web_h4>**

```html

<img src="https://drive.google.com/thumbnail?id=1taUeDcvRNHHmjZgkQOMWQ6O-KQ47_AFa" alt="이미지"  height="200px" width="aspect-ratio:1">

```

<img src="https://drive.google.com/thumbnail?id=1taUeDcvRNHHmjZgkQOMWQ6O-KQ47_AFa" alt="이미지"  height="200px" width="aspect-ratio:1">

해당 코드는 구글 드라이브의 공유 링크의 id 값을 아신다면 "https://drive.google.com/thumbnail?id=<web_h5>id값</web_h5>"로 작성하면 됩니다. 
(혹시 이 방법을 모르시면 2번 단락을 참조해주세요.) html 말고 마크다운을 사용하여 코드를 작성 할 수도 있습니다. 

<br>

#### **<web_h4>markdown:</web_h4>**

```markdown

![이미지](https://drive.google.com/thumbnail?id=1taUeDcvRNHHmjZgkQOMWQ6O-KQ47_AFa){:height="200px" width="aspect-ratio:1" }

```

![이미지](https://drive.google.com/thumbnail?id=1taUeDcvRNHHmjZgkQOMWQ6O-KQ47_AFa){:height="200px" width="aspect-ratio:1" }

html보다 markdown을 사용해서 작성하는 경우가 더 많음으로 참고해서 활용하시면 됩니다.  

<br>

### <web_h3> 3. Jekyll을 이용하여 매크로 만들기 </web_h3>

한 달 정도 포스팅을 늦게 한 이유는 구글이 서비스 차원에서 내부적으로 알아서 바꿔주길 원해서였습니다. 1달정도 지난 지금도 계속해서 호스팅 주소가 내부적으로 계속 바뀌고 있는 것을 보면, 앞으로도 계속 주소가 계속 바뀔 수 있다고 생각합니다. 두번 당하면 당한 사람이 잘못이기 때문에, 코드가 바뀌어도 문제없게 매크로를 사용하여 만들어 봅시다. 물론, 자바스크립트를 이용하면 범용적으로 사용할 수 있지만, 저는 자바스크립트보다 빠른 Jekyll을 사용하여 매크로를 만들려고 합니다. 

<br> 

#### **<web_h4>_config.yml:</web_h4>**

```yml

...
google_drive: https://drive.google.com/thumbnail?id=

```

#### **<web_h4>html:</web_h4>**


```html

<img src= "{{ site.google_drive }}1taUeDcvRNHHmjZgkQOMWQ6O-KQ47_AFa" alt="이미지"  height="200px" width="aspect-ratio:1">

```

<img src= "{{ site.google_drive }}1taUeDcvRNHHmjZgkQOMWQ6O-KQ47_AFa" alt="이미지"  height="200px" width="aspect-ratio:1">

_config.yml 파일이 전역변수와 비슷한 개념이라고 보시면 됩니다.  
_config.yml 파일 안에 <web_h5>변수</web_h5> = value 이런 형식으로 입력하시면, 웹 페이지에서는 site.<web_h5>(변수)</web_h5> = value로 치환해줍니다.  

<br>

### <web_h3> 추가. 혹시 구글드라이브 이미지 호스팅시 해상도 높이는 방법 </web_h3>

혹시, 여러분이 구글 드라이브에서 이미지 호스팅을 했는데 품질이 떨어지고 앨리어싱 현상이 생긴다고 생각하시면, 다음과 같이 코드를 작성하시면 됩니다.

```html

<img src="https://drive.google.com/thumbnail?id=1taUeDcvRNHHmjZgkQOMWQ6O-KQ47_AFa&sz=w1000" alt="이미지"  height="200px" width="aspect-ratio:1">

```

<img src="https://drive.google.com/thumbnail?id=1taUeDcvRNHHmjZgkQOMWQ6O-KQ47_AFa&sz=w1000" alt="이미지"  height="200px" width="aspect-ratio:1">

고유 ID 뒤에 "&sz=w1000" 사이즈 코드를 추가해주시면 좀 더 고화질로 이미지 호스팅을 하실 수 있습니다.

<br>
<br>

## <web_h2> 2. 구글 드라이브에서 이미지 호스팅하는 방법</web_h2>

옛날 같으면 이런 초심자들을 위한 글은 작성하지 않았겠지만, 구글 드라이브를 사용하여 이미지 호스팅을 처음 사용하시는 분들의 위해서 작성해보고자 합니다. 

<br>

### <web_h3> 1. 이미지 공유하기 </web_h3>

<img src= "{{ site.google_drive }}1HGdA19Ozl4sZZnl808V_6B6YotnE1Y8G&sz=w1000" alt="이미지"  width="800px" height="aspect-ratio:16/9">

1. 이미지에 오른쪽 클릭을 눌러 공유 탭에서 공유를 들어갑니다.

<p><br></p>

<img src= "{{ site.google_drive }}1sHqOLws4Sro7R6HwcwrvoKaYC6RCTiHO&sz=w1000" alt="이미지"  width="800px" height="aspect-ratio:16/9">

1. 제한된 사용자에서 링크가 있는 사용자로 바꿔줍니다.
2. 완료를 눌러주면 이제 다른 사람들도 링크가 있으면 이미지를 볼 수 있습니다.

<p><br></p>

### <web_h3> 2. 이미지 고유 ID값 확인하기 </web_h3>

<img src= "{{ site.google_drive }}1yJ82Bwy8emWecMfL55ytRjXJdJcEfORx&sz=w1000" alt="이미지"  width="800px" height="aspect-ratio:16/9">

1. 이미지 오른쪽 클릭을 눌러 공유 탭에서 링크 복사를 누릅니다.

<p><br></p>

<img src= "{{ site.google_drive }}1aQQOxVbmCAj0e0wJ5j6UdKijAWzBWXL6&sz=w1000" alt="이미지"  width="800px" height="aspect-ratio:16/9">

1. 예전에는 링크 주소를 바로 확인할 수 있었지만, 최근에는 컴퓨터 클립보드로 복사되기 때문에 메모장으로 확인해 봅시다.
2. 메모장에서 드래그로 선택한 영역이 바로 ID 값입니다.
<p><br></p>

### <web_h3> 3. html을 사용하여 이미지 호스팅 </web_h3>

#### **<web_h4>html:</web_h4>**

```html

<img src="https://drive.google.com/thumbnail?id=1taUeDcvRNHHmjZgkQOMWQ6O-KQ47_AFa" alt="이미지"  height="200px" width="aspect-ratio:1">

```

<img src="https://drive.google.com/thumbnail?id=1taUeDcvRNHHmjZgkQOMWQ6O-KQ47_AFa" alt="이미지"  height="200px" width="aspect-ratio:1">

위의 코드를 사용하면 손쉽게 다음과 같이 블로그 혹은 쇼핑몰 홈페이지 등 구글 드라이브에서 이미지 호스팅을 사용하실 수 있습니다.

원래는 direct x 12 튜토리얼 작성하려고 했는데 블로그 리뉴얼부터 해야겠네요. (비공개 포스터까지... 할 일이 쌓인다...)
저같이 이미지 주소를 모두 찾아서 바꾸시는 분들 화이팅 입니다.

<br>

---

<br>

###### <web_h6>참조:</web_h6> [https://issuetracker.google.com/issues/319531488?pli=1](https://issuetracker.google.com/issues/319531488?pli=1)
