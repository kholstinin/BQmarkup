import price from "./data.js";

export function getPrice(count, time) {
  let getter;
  if (time > 0 && time < 3) {
    getter = 1;
  } else if (time > 2 && time < 6) {
    getter = 3;
  } else if (time > 5 && time < 12) {
    getter = 6;
  } else if (time === 12) {
    getter = 12;
  }

  return price[count][getter];
}

export function getDeliveryPrice(count) {
  let deliveryPrice = count * 150;
  if (count < 3) {
    deliveryPrice = 400;
  }

  if (count > 10) {
    deliveryPrice = 1500;
  }

  return deliveryPrice;
}