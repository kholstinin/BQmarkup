export function getBoxCard(boxName, boxId) {
  return `
    <div class="stock_card">
            <div class="stock_card__image"></div>
            <div class="stock_card__content">
                <div class="stock_card__text_wrapper">
                    <div class="stock_card__title"><h3>${boxName}</h3></div>
                    <div class="stock_card__id">${boxId}</div>
                </div>

                <div class="stock_card__icon stock_card__icon_return"></div>
            </div>
        </div>
  `
}

export function getActiveBoxCard(deliveryAddress, arrivalTime, user, userPhone) {
  return `
  <div class="stock_card stock_card__active_delivery">
            <div class="stock_card__title_active"><h3>Активная доставка</h3></div>
            <div class="stock_card__address">
                <div class="stock_card__address_title">Команда QB выехала по адресу:</div>
                <div class="stock_card__address_value">${deliveryAddress}</div>
            </div>
            <div class="stock_card__arrival_time">
                <div class="stock_card__arrival_time_title">Примерное время прибытия:</div>
                <div class="stock_card__arrival_time_value">${arrivalTime}...</div>
            </div>
            <div class="stock_card__user">
                <div class="stock_card__user_info">
                    <div class="stock_card__user_name">${user}</div>
                    <div class="stock_card__phone_number">${userPhone}</div>
                </div>
                <div class="stock_card__user_avatar"></div>
            </div>
        </div>
  `
}