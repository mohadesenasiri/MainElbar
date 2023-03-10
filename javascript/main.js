const slides = document.querySelector('.slides');
const slidesCount = slides.childElementCount;
const maxLeft = (slidesCount - 1)* -100 ;
let current = 0;

setInterval(function(){
    if (current > maxLeft) {
        current -= 100;
        slides.style.right = current + '%';
    }
    else {
        current = 0;
        slides.style.right = 0;
    }
},5000)


