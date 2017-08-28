$(document).ready(function () {
    var count = 2;
    var time = 6;

    var deliveryPriceElem = $(".controls_price_time");
    var deliveryPriceElemText = $(".controls_price_info_time");
    var monthPayElem = $(".controls_price_amount");

    function createSlider(wrapper, max, type) {
        var sliderIcon = wrapper.find(".control__progress_icon");
        var sliderProgress = wrapper.find(".control__progress");
        var titleText = wrapper.find(".controls_text_value");

        var elemWidth = wrapper.width();
        var iconWidth = sliderIcon.width();
        var scalePoint = elemWidth / max;

        sliderIcon.mousedown(function (e) {
            var parentCoords = wrapper.offset();

            $(document).bind("mousemove", (function (e) {
                var newCoord = e.pageX - parentCoords.left - iconWidth / 2;

                if (newCoord < scalePoint) {
                    newCoord = scalePoint;
                }

                var rightEdge = elemWidth - iconWidth / 2;
                if (newCoord > rightEdge) {
                    newCoord = rightEdge;
                }

                sliderProgress.css("width", newCoord + iconWidth / 2);
                sliderIcon.css("left", newCoord);

                if (type === "box") {
                    count = Math.round((newCoord / elemWidth * max));
                    titleText.text(count + " бокс" + getEnding(count));
                } else {
                    time = Math.round((newCoord / elemWidth * max));
                    titleText.text(time + " месяц" + getEnding(count, "month"));
                }
                updatePrices();
            }));

            $(document).mouseup(function () {
                $(document).unbind("mousemove");
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

    createSlider(controlAmountWrapper, 15, "box");
    createSlider(controlTimeWrapper, 12);



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
    for(var i = 0; i < elemsForClick.length; i++) {
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
    scrollBtn.click(function() {
        $('html, body').animate({
            scrollTop: anchor.offset().top
        }, 500);
    });


    var spoilerSwitcher = $('.spoiler__switcher');
    spoilerSwitcher.click(function() {
        var elem = $(this);
        var spoilerText = $(this).parent().parent().find('.card__text');

        if (spoilerText.is(":visible")) {
            elem.attr('src', 'img/plus.png');
            spoilerText.hide();
        } else {
            elem.attr('src', 'img/minus.png');
            spoilerText.show();
        }
    });

    var mySwiper = new Swiper('.swiper-container', {
        speed: 400
    });

});