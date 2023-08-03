const targetName = 'input[type="checkbox"], input[type="radio"]';
const CheckWithMouseOver = function () { };
CheckWithMouseOver.prototype.start = () => {
  const body = document.body;
  if (!body) return setTimeout(CheckWithMouseOver.prototype.start, 500);
  CheckWithMouseOver.prototype.event();
  CheckWithMouseOver.prototype.observer(body);
};
CheckWithMouseOver.prototype.event = (mutations) => {
  const inputs = document.querySelectorAll(targetName);
  if (inputs) CheckWithMouseOver.prototype.eventInput(inputs);
  const labels = document.querySelectorAll('label');
  if (labels) CheckWithMouseOver.prototype.eventLabel(labels);
};
CheckWithMouseOver.prototype.eventInput = (inputs) => {
  inputs.forEach((input) => {
    input.onmouseover = (e) => {
      const elm = e.target;
      CheckWithMouseOver.prototype.checked(elm);
    }
  });
};
CheckWithMouseOver.prototype.eventLabel = (labels) => {
  labels.forEach((label) => {
    const attr = label.getAttribute('for');
    if (attr) {
      label.onmouseover = (e) => {
        const elm = document.getElementById(attr);
        CheckWithMouseOver.prototype.checked(elm);
      }
    } else {
      label.onmouseover = (e) => {
        const elm = e.target.querySelector(targetName);
        CheckWithMouseOver.prototype.checked(elm);
      }
    }
  });
};
CheckWithMouseOver.prototype.checked = (elm) => {
  if (elm && window.event.altKey) elm.checked = !elm.checked;
};
CheckWithMouseOver.prototype.observer = (elm) => {
  const observer = new MutationObserver((mutations) => CheckWithMouseOver.prototype.event(mutations));
  observer.observe(elm, {
    childList: true,
    subtree: true
  });
};
window.addEventListener('load', () => {
  CheckWithMouseOver.prototype.start();
});