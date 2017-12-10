export default function registryTemplate(phoneNumber) {
  return `<div class=\"lightbox__content\">
             <div class=\"lightbox__title\">Подтвердите номер телефона</div>
             <div class=\"lightbox__title_comment\">
                 Для оформления заказа введите код, который<br> мы отправили на телефон ${phoneNumber}.<br>
                 Тогда курьер точно сможет вам дозвониться,<br>
                 а вы получите доступ в личный кабинет.
             </div>
             <div class=\"lightbox__btns_wrapper\">
                 <input class=\"custom_input lightbox__input\" placeholder=\"0000\">
                 <button type=\"button\" class=\"btn lightbox__btn btn__size_smallest btn__type_accent\">Подтвердить</button>
             </div>`;
};