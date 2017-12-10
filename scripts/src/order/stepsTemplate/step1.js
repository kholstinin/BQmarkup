export default function getStepOne() {
  return `
    <div class="section__payment_header">
        <div class="section__payment_image"></div>
    </div>
    <div class="sections_wrapper">
        <div class="section">
            <div class="title_text section__payment_title">
                Откуда забрать вещи?
            </div>
            <div class="section__title_info">
                Введите ваш адрес.<br/>
                Наши курьеры заберут вещи в удобное время.
            </div>
        </div>
        <div class="section section__departure_form">
            <div class="departure_form"></div>
            <div class="departure_form__place"><input class="input" placeholder="Улица, дом, корпус, строение"></div>
            <div class="departure_form__row">
                <div class="departure_form__entrance"><input class="input" placeholder="Подъезд"></div>
                <div class="departure_form__floor"><input class="input" placeholder="Этаж"></div>
                <div class="departure_form__apartment"><input class="input" placeholder="Квартира"></div>
            </div>
            <div class="departure_form__name"><input class="input" placeholder="Ваше имя"></div>
            <div class="departure_form__commentary">
                <textarea class="departure_form__commentary_area" placeholder="Комментарии"></textarea>
            </div>
            <div class="departure_form__button">
                <button class="btn btn__type_accent btn__size_big">Далее</button>
            </div>
        </div>
    </div>
`;
}