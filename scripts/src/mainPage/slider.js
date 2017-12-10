import {getDeliveryPrice, getPrice} from "./prices";

const initialCount = 2;
const initialTime = 3;

const maxValue = {
  time: 12,
  count: 15
};

let count = initialCount;
let time = initialTime;

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

export function setInitialPosition(wrapper, type) {
  const sliderIcon = wrapper.find(".control__progress_icon");
  const sliderProgress = wrapper.find(".control__progress");
  const max = maxValue[type];

  const elemWidth = wrapper.width();
  const offset = sliderIcon.children().width() / 2;
  const scalePoint = elemWidth / max;

  let initialValue;
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

export function createSlider(wrapper, type, deliveryPriceElem, deliveryPriceElemText, monthPayElem) {
  const sliderIcon = wrapper.find(".control__progress_icon");
  const sliderProgress = wrapper.find(".control__progress");
  const titleText = wrapper.find(".controls_text_value");
  const max = maxValue[type];

  const elemWidth = wrapper.width();
  const iconWidth = sliderIcon.children().width();
  const scalePoint = elemWidth / max;

  sliderIcon.on("mousedown touchstart", function (e) {
    const parentCoords = wrapper.offset();

    $(document).bind("mousemove touchmove", (function (e) {
      const pageX = e.pageX || e.originalEvent.touches[0].pageX;
      let newCoord = pageX - parentCoords.left - iconWidth / 2;

      if (newCoord < scalePoint) {
        newCoord = scalePoint;
      }

      const rightEdge = elemWidth - iconWidth / 2;
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

      const deliveryPrice = getDeliveryPrice(count);

      deliveryPriceElem.text(deliveryPrice + " руб.");
      deliveryPriceElemText.text("Цена доставки за " + count + " бокс" + getEnding(count));
      monthPayElem.text(getPrice(count, time) + " руб. в месяц");

    }));

    $(document).on("mouseup touchend", function () {
      $(document).unbind("mousemove touchmove");
    });

    return false;
  });
}