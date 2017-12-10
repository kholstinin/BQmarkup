import firstEnterTemplate from "./lightbox_templates/login";
import registryTemplate from "./lightbox_templates/registry";
import confirmTemplate from "./lightbox_templates/confirm";

import 'whatwg-fetch';

export default function initLightbox() {
  const lightboxWrapper = $(".lightbox_overlay");
  const lightbox = $(".lightbox");
  const lightbox_content = $(".lightbox__content");
  const lightbox_close_btn = $(".lightbox__close_button");
  const lightbox_error = $(".lightbox__error_block");

  function setLightboxCentered() {
    const lightboxWidth = lightbox.width();
    const lightboxHeight = lightbox.height();
    const windowHeight = $(window).height();
    const windowWidth = $(window).width();

    lightbox.css({
      top: windowHeight / 2 - lightboxHeight + "px",
      left: (windowWidth - lightboxWidth) / 2 + "px"
    });
  }

  function showLightbox() {
    lightboxWrapper.show();
    lightbox.show();
  }

  function hideLightbox() {
    lightboxWrapper.hide();
    lightbox.hide();
    clearErrors();
  }

  function fillWithTemplate(templateName, phone, name) {
    lightbox_content.empty();
    switch (templateName) {
      case "firstEnter":
        lightbox_content.html(firstEnterTemplate);
        break;
      case "registry":
        lightbox_content.html(registryTemplate(phone));
        break;
      case "confirm":
        lightbox_content.html(confirmTemplate(phone, name));
        break;
    }
  }

  lightboxWrapper.click(() => {
    hideLightbox();
  });

  lightbox_close_btn.click(() => {
    hideLightbox();
  });

  function showInputError() {
    const input = $(".lightbox__input");
    const button = $(".lightbox__btn");
    input.addClass("input__error");
    button.addClass("btn__status_error");
    input.keydown(function () {
      input.removeClass("input__error");
      button.removeClass("btn__status_error");
      lightbox_error.text("");
      input.unbind('keydown');
    })
  }

  function showError(errorText) {
    lightbox_error.text(errorText);
  }

  function clearErrors() {
    lightbox_error.empty();
  }

  $(".header__login, .header__btn, .feedback_card__btn, .btn_get_boxes").click(() => {
    fillWithTemplate("firstEnter");
    setLightboxCentered();
    showLightbox();

    $(".lightbox__btn").click(() => {
      const phoneNumber = $(".lightbox__input").val();
      const phoneNumberWithCode = "+7" + phoneNumber;
      const regExp =/^\d+$/;
      const isPhoneValid = regExp.test(phoneNumber) && phoneNumber.length === 10;
      if (isPhoneValid) {
        $(this).prop('disabled', true);
        $.ajax({
          method: "POST",
          url: "http://api.qb.604.ru/user",
          data: JSON.stringify({phone: phoneNumberWithCode, account_type: 1}),
        }).done(function (data) {
          console.log(data);
          if (data.success) {
            if (data.first_name !== "") {
              fillWithTemplate("confirm", phoneNumberWithCode, data.first_name);
            } else {
              fillWithTemplate("registry", phoneNumberWithCode);
            }

            $(".lightbox__btn").click(() => {
              const code = $(".lightbox__input").val();
              const isCodeValid = regExp.test(code) && code.length === 4;

              if (isCodeValid) {
                $.ajax({
                  method: "POST",
                  url: "http://api.qb.604.ru/user",
                  data: JSON.stringify({phone: phoneNumberWithCode, code: code})
                }).done(function (data) {
                  if (data !== "error") {
                    if (data !== "code error") {
                      localStorage.setItem('userKey', data.key);
                      location.href = "./stock.html";
                    } else {
                      showError("Код введен неверно");
                    }
                  } else {
                    showError("Произошла непредвиденая ошибка, пожалуйста, повторите позднее.");
                  }
                });
              } else {
                showInputError();
              }
            });
          } else {
            showError("Произошла непредвиденая ошибка, пожалуйста, повторите позднее.");
          }
        });
      } else {
        showInputError();
      }

    });
  });
}