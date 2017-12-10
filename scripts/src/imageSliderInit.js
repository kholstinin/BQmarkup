import createImageSlider from "./imageSlider";

export default function initImageSlider() {
  const sectionOneSlider = $(".section_one__slider");
  const sectionFourSlider = $(".section_four__slider");

  createImageSlider(sectionOneSlider);
  createImageSlider(sectionFourSlider);
}