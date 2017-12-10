import {getOrders, getUserInfo} from "../requests";

$(document).ready(() => {
  const headerUserName = $(".header__username a");
  const titleText = $(".title_text")[0].textContent;
  console.log(titleText);
  getUserInfo()
    .done((data) => {
      const userInfo = JSON.parse(data);
      if (userInfo.first_name) {
        headerUserName.text(userInfo.first_name);
      }

      switch (titleText) {
        case "Мой склад":
          const cardTable = $(".cards__wrapper");
          const cardTableTitle = $(".stock__header");

          getOrders()
            .done((orders) => {
              if (orders.length !== 0) {
                // изменить заголовок, на то сколько сейчас коробок
                // добавить карточки в коллекцию
              }
            });
          break;
        case "Настройки":
          console.log(userInfo);
          if (userInfo.first_name) {
            const userNameBlock = $(".settings_table__username");
            let fullName = userInfo.first_name;
            if (userInfo.last_name) {
              fullName += " " + userInfo.last_name;
            }
            userNameBlock.text(fullName);
          }
          if (userInfo.email) {
            const userEmail = $(".settings_table__email");
            console.log(userInfo.email);
            userEmail.text(userInfo.email);
          }
          if (userInfo.phone) {
            const userPhoneNumberBlock = $(".settings_table__phonenumber");
            userPhoneNumberBlock.text(userInfo.phone);
          }
          break;
        case "Бесплатное хранение для вас и ваших друзей":
          const promoCodeBlock =$(".invite_block__link_text");
          promoCodeBlock.text(`http://invite.qb.com/${userInfo.promo}`);
          const freeStorageValueBlock = $(".free_storage__value");
          freeStorageValueBlock.text(userInfo.promo_balance);
          const friendsNumberBlock = $(".free_storage__friends_number");
          friendsNumberBlock.text(userInfo.users.length);
          break;
      }
    });

});