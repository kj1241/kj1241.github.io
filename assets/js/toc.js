document.addEventListener("DOMContentLoaded", function () {
    var pageTitle = "{{ page.toc }}";
    var tocContainer = document.getElementById("toc_container");
    var headings = document.querySelectorAll('h2, h3');

    if (headings.length > 0 && pageTitle) {
        var tocList = document.createElement('ul');
        var tocTitle = document.createElement('dl');
        tocTitle.textContent = "TOC";
        tocList.appendChild(tocTitle);


        headings.forEach(function (heading) {

            var listItem = document.createElement('li');
            var link = document.createElement('a');
            link.textContent = heading.textContent;
            link.setAttribute('href', '#' + heading.id);
            listItem.appendChild(link);
            //에러가 어디있나했더니 대문자에서 망했네
            if (heading.tagName === 'H2') {
                //listItem.classList.add("tag_list_h2");
                listItem.setAttribute('id', "tag_list_h2");
            }
            else if (heading.tagName === 'H3') {
                //listItem.classList.add("tag_list_h3");
                listItem.setAttribute('id', "tag_list_h3");
            }

            tocList.appendChild(listItem);
            // 섹션으로 스크롤하는 클릭 이벤트 리스너 추가
            link.addEventListener('click', function (event) {
                event.preventDefault(); // 링크의 기본 동작 방지
                var targetId = heading.id;
                var targetElement = document.getElementById(targetId);
                window.scrollTo(0, heading.getBoundingClientRect().top + window.scrollY); //어우 아이디 입력못받아서 드디어 만들었네
            });
        });
        tocContainer.appendChild(tocList);
    }
});

// function createTOC() {
//     // 목차를 표시할 요소
//     var tocElement = document.getElementById('toc_container');

//     // h2 및 h3 태그를 모두 선택
//     var headings = document.querySelectorAll('h2, h3');

//     // 목차에 각 제목을 추가
//     headings.forEach(function (heading, index) {
//         var titleText = heading.innerText;
//         var link = document.createElement('a');
//         link.setAttribute('href', '#' + heading.id);
//         link.textContent = titleText;

//         // h2인 경우 더 큰 글꼴로 표시
//         if (heading.tagName === 'H2') {
//             link.style.fontWeight = 'bold';
//             link.style.fontSize = '1.2em';
//         }

//         // 목차에 추가
//         tocElement.appendChild(link);
//         tocElement.appendChild(document.createElement('br'));
//     });
// }

// // 페이지 로드 시 목차 생성
// window.onload = createTOC;