var slideIndex = 0;
showSlides();

function showSlides() {
  var i;
  var slides = document.getElementsByClassName("slides_list");
  for (i = 0; i < slides.length; ++i) {
    slides[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > slides.length) {
    slideIndex = 1;
  }
  slides[slideIndex - 1].style.display = "block";
  setTimeout(showSlides, 5000); // 이미지가 5초마다 전환되도록 설정 (milliseconds 단위)
}

function plusSlides(n) {
    clearTimeout(timer);
    showSlides(slideIndex += n);
  }
  
  function currentSlide(n) {
    clearTimeout(timer);
    showSlides(slideIndex = n);
  }
  