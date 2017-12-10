export default function initAnchors() {
  const anchor = $('.section_one');
  const scrollBtn = $('.header__bottom_icon');
  scrollBtn.click(function () {
    $('html, body').animate({
      scrollTop: anchor.offset().top
    }, 500);
  });
}