export default function createImageSlider(sliderElem) {
  const sliderControl = sliderElem.find(".slider__control");
  const sliderBody = sliderElem.find(".slider__body");
  let offset = sliderElem.width();
  if (sliderBody.hasClass("slider__large")) {
    offset -= 20;
  }

  sliderControl.find(".slider__point_wrapper").click(function () {
    const elem = $(this).children();
    const sliderWrapper = sliderElem.find(".slider__wrapper");
    let multiplier = 0;

    if (!elem.hasClass("slider__point_active")) {
      sliderControl.find(".slider__point_active").removeClass("slider__point_active");
      elem.addClass("slider__point_active");
      multiplier = elem.data().count;
      sliderWrapper.css("transform", "translate(-" + offset * multiplier + "px)");
    }
  });
}