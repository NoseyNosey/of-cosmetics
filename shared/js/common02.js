$(function(){
    $('a[href^="#"]').click(function(){
		var speed = 500;
		var href= $(this).attr("href");
		var target = $(href == "#" || href == "" ? 'html' : href);
		var position = target.offset().top;
		$("html, body").animate({scrollTop:position}, speed, "swing");
		return false;
  });
  $('.p_header_hamburger').click(function() {
    $(this).toggleClass('active');
    // $('.nav-wrapper').fadeToggle(500);
    $('.nav-wrapper').toggleClass('active');
  
    if ($(this).hasClass("active")) {
        $("html").addClass("is-fixed");
    } else {
        $("html").removeClass("is-fixed");
    }
  });
  $('.nav-wrapper a').click(function() {
    // target="_blank" の場合は処理しない
    if ($(this).attr('target') === '_blank') {
      return; // ここで処理を中断
    }
    $('.p_header_hamburger').toggleClass('active');
    // $('.nav-wrapper').fadeToggle(500);
    $('.nav-wrapper').toggleClass('active');
  
    if ($('.p_header_hamburger').hasClass("active")) {
        $("html").addClass("is-fixed");
    } else {
        $("html").removeClass("is-fixed");
    }
  });
});
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
  if (window.scrollY > 0) {
    header.classList.add('active');
  } else {
    header.classList.remove('active');
  }
});


document.addEventListener("DOMContentLoaded", function () {
  const settings = [
    { selector: '.fade-in-up', delay: 400 },
    { selector: '.fade-in-up2', delay: 800 },
    { selector: '.fade-in-up3', delay: 1200 }
  ];

  settings.forEach(({ selector, delay }) => {
    const elements = document.querySelectorAll(selector);

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('in-view');
          }, delay);

          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.3
    });

    elements.forEach(el => observer.observe(el));
  });
});
