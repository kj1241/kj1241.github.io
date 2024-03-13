function createMeteor() {
  const colors = ["#c77eff", "#f6ff7e", "#ff8d7e", "#ffffff"];
  const randomColor = colors[Math.floor(Math.random() * colors.length)]; // 랜덤한 색상 선택

  const meteor = document.createElement('div');
  meteor.className = 'meteor';
  meteor.style.left = Math.random() * window.innerWidth + 'px';
  meteor.style.top = '-20px';
  meteor.style.backgroundColor = randomColor; // 선택된 랜덤 색상 적용

  // main-wrapper 요소 뒤에 추가
  const mainWrapper = document.querySelector('.main-wrapper');
  mainWrapper.parentNode.insertBefore(meteor, mainWrapper.nextSibling);

  const speed = 1 + Math.random() * 2; // 유성 속도
  const angle = Math.PI * 3 / 4; // 135도 각도

  // 유성 이동 애니메이션
  function moveMeteor() {
      const x = parseFloat(meteor.style.left);
      const y = parseFloat(meteor.style.top);
      const newX = x + Math.cos(angle) * speed;
      const newY = y + Math.sin(angle) * speed;

      // 유성이 화면을 벗어나면 제거
      if (newY < -20 || newX < -20 || newX > window.innerWidth) {
          meteor.remove();
      } else {
          meteor.style.left = newX + 'px';
          meteor.style.top = newY + 'px';
          requestAnimationFrame(moveMeteor);
      }
  }

  moveMeteor();
}

// 일정 시간 간격으로 유성 생성
setInterval(createMeteor, 1000);
