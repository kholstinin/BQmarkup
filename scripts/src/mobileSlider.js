function initSlider(sliderElem) {
  const sliderControl = sliderElem.find(".slider__control");
  const sliderBody = sliderElem.find(".slider__body");
  let offset = sliderElem.width() + 100;
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

if (md.mobile()) {
  const spoilerSwitcher = $('.spoiler__switcher');
  let currentOpenedSpoiler = null;

  spoilerSwitcher.click(function () {
    const elem = $(this);
    const spoilerText = elem.parent().parent().find('.card__text');

    if (currentOpenedSpoiler && !currentOpenedSpoiler.is(elem)) {
      var opened = currentOpenedSpoiler.parent().parent().find('.card__text');
      currentOpenedSpoiler.attr('src', 'img/plus.png');
      opened.hide();
    }

    if (spoilerText.is(":visible")) {
      elem.attr('src', 'img/plus.png');
      spoilerText.hide();
    } else {
      elem.attr('src', 'img/minus.png');
      spoilerText.show();
    }
    currentOpenedSpoiler = elem;
  });

  function changeDot(number, controls) {
    const currentControl = controls.children(".slider__point_active");
    currentControl.removeClass("slider__point_active");
    controls.children().eq(number).addClass("slider__point_active");
  }

  const feedbackSlider = $("#feedbackSlider");
  const feedbackControls = feedbackSlider.next();
  const cardSlider = $("#cardSlider");
  const cardControls = cardSlider.next();

  feedbackSlider.HammerSlider({
    beforeSlideChange: function (number) {
      changeDot(number, feedbackControls);
    }.bind(this)
  });

  cardSlider.HammerSlider({
    beforeSlideChange: function (number) {
      changeDot(number, cardControls);
    }.bind(this)
  });
} else {
  const sectionOneSlider = $(".section_one__slider");
  const sectionFourSlider = $(".section_four__slider");

  initSlider(sectionOneSlider);
  initSlider(sectionFourSlider);
}