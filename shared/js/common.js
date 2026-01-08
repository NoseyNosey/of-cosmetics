$(function(){
  
  $('.p_header_hamburger').click(function() {
    $(this).toggleClass('active');
    $('.nav-wrapper').toggleClass('active');
  
    if ($(this).hasClass("active")) {
        $("html").addClass("is-fixed");
        $.fn.fullpage.setAllowScrolling(false); // ← ここを追加
    } else {
        $("html").removeClass("is-fixed");
        $.fn.fullpage.setAllowScrolling(true); // ← ここを追加
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

$(window).on('load', function () {
  let isFullpageInitialized = false;

  function initFullpage() {
    $('#fullpage').fullpage({
      autoScrolling: true,
      fitToSection: true,
      scrollBar: false,
      scrollOverflow: true,
      touchSensitivity: 15,
      scrollOverflowReset: true,
      afterLoad: function(anchorLink, index) {
        if (index === 1) {
          $('header').removeClass('active');
        } else {
          $('header').addClass('active');
        }
      }
    });
    isFullpageInitialized = true;
  }

  function destroyFullpage() {
    if ($.fn.fullpage.destroy && isFullpageInitialized) {
      $.fn.fullpage.destroy('all');
      isFullpageInitialized = false;
    }
  }

  // 初期化
  initFullpage();

  // toTop ボタン
  $('#toTopBtn').on('click', function (e) {
    e.preventDefault();
    $.fn.fullpage.moveTo(1);
  });

  // Intersection Observer の設定
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
      }
    });
  }, { threshold: 0.3 });

  document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
  });

  // ウィンドウリサイズ時に fullpage をリセット
  let resizeTimeout;
  $(window).on('resize', function () {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(function () {
      destroyFullpage();
      initFullpage();
    }, 300); // 連続リサイズ時の負荷軽減
  });


  // モーダルを開く
  $('.open-modal').on('click', function () {
    const target = $(this).data('target');
    $(target).addClass('show');

    // fullpageスクロール無効化
    if ($.fn.fullpage && $.fn.fullpage.setAllowScrolling) {
      $.fn.fullpage.setAllowScrolling(false);
      $.fn.fullpage.setKeyboardScrolling(false);
    }

    // 背景固定（オプション）
    $('html').addClass('is-fixed');
  });

  $('.p_product_modal').on('click', function (e) {
    if ($(e.target).hasClass('p_product_modal')) {
      $(this).removeClass('show');
      enableFullpage();
    }
  });
  
  $('.p_product_modal_close').on('click', function () {
    $(this).closest('.p_product_modal').removeClass('show');
    enableFullpage();
  });
  
  function enableFullpage() {
    if ($.fn.fullpage && $.fn.fullpage.setAllowScrolling) {
      $.fn.fullpage.setAllowScrolling(true);
      $.fn.fullpage.setKeyboardScrolling(true);
    }
    $('html').removeClass('is-fixed');
  }

});

document.addEventListener("DOMContentLoaded", function () {
  const settings = [
    { selector: '.fade-in-up', delay: 400 },
    { selector: '.fade-in-up2', delay: 800 },
    { selector: '.fade-in-up3', delay: 1200 },
    { selector: '.fade-in-up4', delay: 1600 },
    { selector: '.fade-in-up5', delay: 2000 }
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
