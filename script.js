const selectElement = (selector) => {
  const element = document.querySelector(selector);
  if (element) return element;
  throw new Error(`Cannot find the element ${selector}`);
};
const form = selectElement("form");
const input = selectElement("input");
const result = selectElement(".result");
const hamburger = selectElement(".hamburger");
const navMenu = selectElement(".nav-menu");