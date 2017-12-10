export default function confirmTemplate(phoneNumber, name) {
  return `<div class=\"lightbox__title\">Добрый день, ${name}!<br>
                                        Введите пароль</div>
           <div class=\"lightbox__title_comment\">
               Для входа в личный кабинет введите код, который мы отправили на номер<br>
               ${phoneNumber}.
           </div>
           <div class=\"lightbox__btns_wrapper\">
               <input class=\"custom_input lightbox__input\" placeholder=\"000000\">
               <button type=\"button\" class=\"btn lightbox__btn btn__size_smallest btn__type_accent lightbox__btn_confirm\">Войти</button>
           </div>`;
};