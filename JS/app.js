$(document).ready(function(){
    $('.image-slider').slick({
        slidesToShow: 4,
        arrows: false,
        dots: true,
    });
   });
//// go to back /////
   const gotoTop = document.querySelector(".go-to-top");
   window.addEventListener("scroll", () => {
    if(window.pageYOffset > 100){
       gotoTop.classList.add("top-active");
    }else{
        gotoTop.classList.remove("top-active");
    }
   })
////////////////