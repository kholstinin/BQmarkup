$(document).ready(function () {
    var md = new MobileDetect(window.navigator.userAgent);
    var initialCount = 2;
    var initialTime = 3;

    var count = initialCount;
    var time = initialTime;

    var maxValue = {
        time: 12,
        count: 15
    };

    var deliveryPriceElem;
    var deliveryPriceElemText;
    var monthPayElem;

    if (md.mobile()) {
        deliveryPriceElem = $(".controls_mobile_price_time h3");
        deliveryPriceElemText = $(".controls_mobile_price_info_time");
        monthPayElem = $(".controls_mobile_price_amount h3");
    } else {
        deliveryPriceElem = $(".controls_price_time");
        deliveryPriceElemText = $(".controls_price_info_time");
        monthPayElem = $(".controls_price_amount");
    }

    function setInitialPosition(wrapper, type) {
        var sliderIcon = wrapper.find(".control__progress_icon");
        var sliderProgress = wrapper.find(".control__progress");
        var max = maxValue[type];

        var elemWidth = wrapper.width();
        var offset = sliderIcon.width() / 2;
        var scalePoint = elemWidth / max;

        var initialValue;
        if (type === "count") {
            initialValue = initialCount;
        } else if (type === "time") {
            initialValue = initialTime;
        } else {
            throw new Error("Такого прогресса не существует");
        }

        sliderIcon.css("left", scalePoint * initialValue);
        sliderProgress.css("width", scalePoint * initialValue + offset);
    }

    function createSlider(wrapper, type) {
        var sliderIcon = wrapper.find(".control__progress_icon");
        var sliderProgress = wrapper.find(".control__progress");
        var titleText = wrapper.find(".controls_text_value");
        var max = maxValue[type];

        var elemWidth = wrapper.width();
        var iconWidth = sliderIcon.width();
        var scalePoint = elemWidth / max;

        sliderIcon.on("mousedown touchstart", function (e) {
            var parentCoords = wrapper.offset();

            $(document).bind("mousemove touchmove", (function (e) {
                var pageX = e.pageX || e.originalEvent.touches[0].pageX;
                var newCoord = pageX - parentCoords.left - iconWidth / 2;

                if (newCoord < scalePoint) {
                    newCoord = scalePoint;
                }

                var rightEdge = elemWidth - iconWidth / 2;
                if (newCoord > rightEdge) {
                    newCoord = rightEdge;
                }

                sliderProgress.css("width", newCoord + iconWidth / 2);
                sliderIcon.css("left", newCoord);

                if (type === "count") {
                    count = Math.round((newCoord / elemWidth * max));
                    titleText.text(count + " бокс" + getEnding(count));
                } else if (type === "time") {
                    time = Math.round((newCoord / elemWidth * max));
                    titleText.text(time + " месяц" + getEnding(count, "month"));
                }
                updatePrices();
            }));

            $(document).on("mouseup touchend", function () {
                $(document).unbind("mousemove touchmove");
            });

            return false;
        });
    }

    function getPrice() {
        var getter;
        if (time > 0 && time < 3) {
            getter = 1;
        } else if (time > 2 && time < 6) {
            getter = 3;
        } else if (time > 5 && time < 12) {
            getter = 6;
        } else if (time === 12) {
            getter = 12;
        }
        return prices[count][getter];
    }

    function updatePrices() {
        var deliveryPrice = count * 150;
        if (count < 3) {
            deliveryPrice = 400;
        }

        if (count > 10) {
            deliveryPrice = 1500;
        }

        deliveryPriceElem.text(deliveryPrice + " руб.");
        deliveryPriceElemText.text("Цена доставки за " + count + " бокс" + getEnding(count));
        monthPayElem.text(getPrice() + " руб. в месяц")
    }

    function getEnding(num, type) {
        if (num === 1) {
            return "";
        } else if (num > 1 && num < 5) {
            return "а";
        } else if (num > 4) {
            if (type === "month") {
                return "ев";
            }
            return "ов";
        }
    }


    // prices
    var controlAmountWrapper = $(".section_four__control_one");
    var controlTimeWrapper = $(".section_four__control_two");

    createSlider(controlAmountWrapper, "count");
    setInitialPosition(controlAmountWrapper, "count");
    createSlider(controlTimeWrapper, "time");
    setInitialPosition(controlTimeWrapper, "time");


    // lightbox
    var lightboxWrapper = $(".lightbox_overlay");
    var lightbox = $(".lightbox");
    var lightbox_close_btn = $(".lightbox__close-icon");
    var btns = $(".btn");
    var downloadAppBtn = $('.header__download');
    var loginBtn = $('.header__login');

    var input = $(".lightbox__input");
    var sendBtn = $(".lightbox__btn");
    var errorTooltip = $(".error__tooltip");
    var doneIcon = $('.lightbox__done_icon');

    function showLightbox() {
        lightboxWrapper.show();
        lightbox.show();
    }

    function hideLightbox() {
        lightboxWrapper.hide();
        input.val('');
        resetValidation();
        lightbox.hide();
        doneIcon.hide();
    }

    var elemsForClick = [downloadAppBtn, loginBtn, btns];
    for (var i = 0; i < elemsForClick.length; i++) {
        elemsForClick[i].click(function () {
            showLightbox();
        });
    }

    lightboxWrapper.click(function () {
        hideLightbox();
    });

    lightbox_close_btn.click(function () {
        hideLightbox();
    });

    function validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    function resetValidation() {
        input.css("outline", "none");
        errorTooltip.hide();
    }

    sendBtn.click(function () {
        if (validateEmail(input.val())) {
            $.ajax({
                method: "POST",
                url: "http://misc.agileburo.com/rest/email/create", //http://misc.agileburo.com/rest/email/create
                data: {
                    "email": input.val(),
                    "name": "my email",
                    "project": "QB"
                }
            }).done(function () {
                input.val("Спасибо!");
                input.prop('disabled', true);
                sendBtn.text("Закрыть");
                doneIcon.show();
                sendBtn.click(function () {
                    hideLightbox();
                })
            });
        } else {
            input.css("outline", "1px solid red");
            errorTooltip.show();
            input.focus(resetValidation);
        }
    });

    var anchor = $('.section_one');
    var scrollBtn = $('.header__bottom_icon');
    scrollBtn.click(function () {
        $('html, body').animate({
            scrollTop: anchor.offset().top
        }, 500);
    });


    // Mobile slider logic

    if (md.mobile()) {
        var spoilerSwitcher = $('.spoiler__switcher');
        var currentOpenedSpoiler = null;

        spoilerSwitcher.click(function () {
            var elem = $(this);
            var spoilerText = elem.parent().parent().find('.card__text');

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
            var currentControl = controls.children(".slider__point_active");
            currentControl.removeClass("slider__point_active");
            controls.children().eq(number).addClass("slider__point_active");
        }

        var feedbackSlider = $("#feedbackSlider");
        var feedbackControls = feedbackSlider.next();
        var cardSlider = $("#cardSlider");
        var cardControls = cardSlider.next();

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

        // Desktop slider logic
    } else {
        // sectionOneSlider.on("mousedown", function() {
        //     $(document).bind("mousemove", function (e) {
        //         sectionOneSliderBody.css("transform", "translate(-px)");
        //     });
        //
        //     $(document).on("mouseup", function() {
        //         $(document).unbind("mousemove");
        //     })
        // });

        function initSlider(sliderElem) {
            var sliderControl = sliderElem.find(".slider__control");
            var sliderBody = sliderElem.find(".slider__body");
            var offset = sliderElem.width();
            if (sliderBody.hasClass("slider__large")) {
                offset -= 20;
            }

            sliderControl.children().click(function () {
                var elem = $(this);
                var sliderWrapper = sliderElem.find(".slider__wrapper");
                var multiplier = 0;

                if (!elem.hasClass("slider__point_active")) {
                    elem.parent().find(".slider__point_active").removeClass("slider__point_active");
                    elem.addClass("slider__point_active");
                    console.log(elem.data());
                    multiplier = elem.data().count;
                    sliderWrapper.css("transform", "translate(-" + offset * multiplier + "px)");
                }
            });
        }

        var sectionOneSlider = $(".section_one__slider");
        var sectionFourSlider = $(".section_four__slider");

        initSlider(sectionOneSlider);
        initSlider(sectionFourSlider);
    }
});