---
layout: post
title:  "구글 드라이브를 사용하여 이미지 호스팅하기 - 깃허브 블로그에 적용"
date:   2024-03-01 10:00:00 +0900
image: https://github.com/kj1241/kj1241.github.io/assets/22047442/ea08108f-a358-441c-9c9b-6a18572f2fe7
toc: true
categories: [Web]
tags: [Goole Drive, Image Hosting, embed, Git Hub Blog]
addsence: true
excerpt: 최근에 업데이트된 구글 드라이브 이미지 호스팅 방법에 대해서 설명하고 있습니다. 이미지를 업로드하고 공유 링크를 얻어와 깃허브 블로그에 손쉽게 적용할 수 있습니다. 이는 이미지 관리를 간편하게하며 저장소 용량을 절약할 수 있습니다.
---

오랜만에 블로그를 들어왔는데 이게 왠걸 ... 블로그의 이미지 및 리소스가 전부 깨저있었습니다.
블로그를 보니 어지럽고 구글에 대해서 화가나네요.
저보다 더한 사람이 많기 때문에 참고 이 기회에 블로그를 리뉴얼 하는 기회로 여기겠습니다.


<br>

---

<br>

## <blue1_h2> 1. 2024년 1월 업데이트 이후 바뀐 코드</blue1_h2>

2023년 10월 쯤에 구글은 사용자 개인정보 보호를 강화하기 위해서 제 3자 쿠키를 제거하겠다고 발표했습니다.  
그에 따라 더 이상 과거에 이미지 호스팅하는 주소가 작동하지 않습니다. ~~(왜 기존에 코드는 작동 안되는 거냐고 구글...)~~  
구글 드라이브 이미지 호스팅하는 방법을 모르시는 분들은 2번 항목을 보시면 됩니다.  

  
```HTML
<img src="https://drive.google.com/uc?export=view&id=1taUeDcvRNHHmjZgkQOMWQ6O-KQ47_AFa" />

```

위와 같이 기존코드를 작성하면 작동하지 않고 403 오류가 반환됩니다.  
이와 관련된 내용은, [Goole 드라이브의 제 3자에 쿠키에 대한 항후 변경 사항](https://workspaceupdates.googleblog.com/2023/10/upcoming-changes-to-third-party-cookies-in-google-drive.html)에서 자세한 내용을 읽어보실 수 있습니다.  


이를 대체하기 위해서는 두가지 방법이 있습니다.  

<br>

### <blue1_h3> 1. iframe을 사용하여 코드 작성 </blue1_h3>

<br>


#### **html:**

```html

<iframe 
  src="https://drive.google.com/file/d/1taUeDcvRNHHmjZgkQOMWQ6O-KQ47_AFa/preview"
></iframe>

```

iframe은 이미지, 동영상등 다른 페이지를 임베드하는 코드입니다.

<iframe 
  src="https://drive.google.com/file/d/1taUeDcvRNHHmjZgkQOMWQ6O-KQ47_AFa/preview"
></iframe>

코드를 사용하여 이미지를 만들게 되면 위와 같이 테투리가 생김으로 style="border: 0"을 사용하여 테두리를 제거해주면 됩니다.  
그리고 높이와 너비를 대충 맞추기 위해 코드를 작성하면 다음과 같습니다.

<br>

#### **html:**

```html

<iframe 
  src="https://drive.google.com/file/d/1taUeDcvRNHHmjZgkQOMWQ6O-KQ47_AFa/preview"  height="200px" width="aspect-ratio:1"  style="border: 0; aspect-ratio:1;"
></iframe>

```

<iframe 
  src="https://drive.google.com/file/d/1taUeDcvRNHHmjZgkQOMWQ6O-KQ47_AFa/preview"  height="200px" width="aspect-ratio:1"  style="border: 0; aspect-ratio:1;"
></iframe>

제한사항
- iframe의 이미지가 반응하지 않습니다.
- 클릭 핸들러가 지저분해집니다.
- 너무 느립니다.
  
<br>

### <blue1_h3> 2. img를 사용하여 코드 작성 </blue1_h3>

iframe으로 이미지 임베드를 해도 상관없지만 단점이 존재합니다.  
이렇게 코드를 작성하면 너무 느리다는 것입니다.  
구글 검색에 상위 노출이 되려면, 정확성도 필요하지만 접속했을때 반응속도도 포함됩니다.  
물론 임베드로 인한 속도가 포함되는지는 알 수 없지만 로딩이 빠르면 좋으니 img로 쓰는 방법에 대해서 이야기 해보겠습니다.  
  
<br>

#### **html:**

```html

<img src="https://drive.google.com/thumbnail?id=1taUeDcvRNHHmjZgkQOMWQ6O-KQ47_AFa" alt="이미지"  height="200px" width="aspect-ratio:1">

```

<img src="https://drive.google.com/thumbnail?id=1taUeDcvRNHHmjZgkQOMWQ6O-KQ47_AFa" alt="이미지"  height="200px" width="aspect-ratio:1">

https://drive.google.com/thumbnail?id=<red1_error>id값</red1_error>을 사용하여 img 작성합니다.  
html 말고 마크다운을 사용하여 코드를 작성 할수도 있습니다. 

<br>

#### **markdown:**

```markdown

[이미지](https://drive.google.com/thumbnail?id=1taUeDcvRNHHmjZgkQOMWQ6O-KQ47_AFa){:height="200px" width="aspect-ratio:1" }

```

![이미지](https://drive.google.com/thumbnail?id=1taUeDcvRNHHmjZgkQOMWQ6O-KQ47_AFa){: :height="200px" width="aspect-ratio:1" }

<br>

### <blue1_h3> 3. Jekyll을 이용하여 매크로 만들기 </blue1_h3>

이미지 호스팅의 기존 주소가 작동하지 않고 코드가 바뀐 시점에서, 사실 구글이 서비스 차원에서 내부적으로 알아서 바꿔줬으면 했습니다.  
하지만 1달이 지난 지금도 계속 코드가 바뀌고 있는것을 보면 앞으로도 처음 주소로 돌아가지 않을 것 같습니다.  
두번 당하면 당한사람이 잘못이기 때문에 코드가 바뀌어도 문제없게 매크로를 사용하여 만들어 봅시다.  

물론 자바스크립트를 이용하여 이미지를 만들 수 있지만, 자바스크립트 보다 빠른 jekyll를 사용하여 매크로를 만드려고 합니다.  
~~(참고로 전 jekyll에 관해서 잘 모릅니다.)~~
  

<br> 

**_config.yml**

```yml

google_drive: https://drive.google.com/thumbnail?id=

```

**html**

```html

<img src= "{{ site.google_drive }}1taUeDcvRNHHmjZgkQOMWQ6O-KQ47_AFa" alt="이미지"  height="200px" width="aspect-ratio:1">

```

<img src= "{{ site.google_drive }}1taUeDcvRNHHmjZgkQOMWQ6O-KQ47_AFa" alt="이미지"  height="200px" width="aspect-ratio:1">



<br>

---

<br>

할일이 쌓인다...
비공개 글까지 언제 다시 바꾸지...
이미지호스팅 하는방법은 블로그 리뉴얼하고 추가 작성하로 오겠습니다.

참조: [https://issuetracker.google.com/issues/319531488?pli=1](https://issuetracker.google.com/issues/319531488?pli=1)

