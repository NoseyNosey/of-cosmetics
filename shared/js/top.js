const loader = document.getElementById("loader");
const content = document.getElementById("content");
const isFirstVisit = !localStorage.getItem("hasVisited");
const textInner = document.querySelector(".text_inner");
const logoInner = document.querySelector(".logo_inner");
const p_top_kv_image = document.querySelector(".p_top_kv_image");

if (isFirstVisit) {
  localStorage.setItem("hasVisited", "true");
  p_top_kv_image.classList.add("load");

  setTimeout(() => {
    textInner.classList.add("show");
  }, 1000);

  // 2. テキストフェードアウト（スライドイン完了後、例えば3秒後）
  setTimeout(() => {
    textInner.classList.add("hide");

    // 3. ロゴ表示（フェードアウト完了後 ＝ 1秒後）
    setTimeout(() => {
      loader.classList.add("show");
      textInner.style.display = "none";
    }, 1000);
  }, 3500); // テキストを4秒表示


  let isPageLoaded = false;
  let isMinTimePassed = false;

  setTimeout(() => {
    isMinTimePassed = true;
    tryFinishLoading();
  }, 6000);

  window.addEventListener("load", () => {
    isPageLoaded = true;
    tryFinishLoading();
  });

  function tryFinishLoading() {
    if (isPageLoaded && isMinTimePassed) {
      // loader.style.transition = "opacity 1.5s ease";
      loader.style.opacity = "0";
      p_top_kv_image.classList.add("active");

      setTimeout(() => {
        loader.style.display = "none";
        content.style.display = "block";
      }, 1500); // CSS transition時間と合わせる
    }
  }
} else {
  loader.style.display = "none";
  content.style.display = "block";
}
