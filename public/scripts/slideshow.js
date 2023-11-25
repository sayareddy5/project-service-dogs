var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("mySlides");
    if (n > slides.length) {
        slideIndex = 1;
    }
    if (n < 1) {
        slideIndex = slides.length;
    }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slides[slideIndex - 1].style.display = "block";
    slides[slideIndex - 1].style.transform = "translateX(0%)"; // Reset transform
    setTimeout(function() {
        slides[slideIndex - 1].style.transform = "translateX(-100%)";
    }, 10);
}

// Auto transition every 3000 milliseconds (3 seconds)
setInterval(function () {
    plusSlides(1);
}, 3000);