import {createSlider, setInitialPosition} from "./slider";

export default function initSlider() {
  const controlAmountWrapper = $(".section_four__control_one");
  const controlTimeWrapper = $(".section_four__control_two");

  let deliveryPriceElem = $(".controls_price_time");
  let deliveryPriceElemText = $(".controls_price_info_time");
  let monthPayElem = $(".controls_price_amount");

  createSlider(controlAmountWrapper, "count", deliveryPriceElem, deliveryPriceElemText, monthPayElem);
  setInitialPosition(controlAmountWrapper, "count");
  createSlider(controlTimeWrapper, "time");
  setInitialPosition(controlTimeWrapper, "time");
}