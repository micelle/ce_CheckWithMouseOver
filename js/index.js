const CheckWithMouseOver = function() {};
CheckWithMouseOver.prototype.start = () => {
  const body = document.body;
  if (!body) return setTimeout(CheckWithMouseOver.prototype.start, 500);
  CheckWithMouseOver.prototype.event();
  CheckWithMouseOver.prototype.observer(body);
};
CheckWithMouseOver.prototype.event = () => {
  const inputs = document.querySelectorAll('input[type="checkbox"], input[type="radio"]');
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
        const elm = e.target.querySelector('input[type="checkbox"], input[type="radio"]');
        CheckWithMouseOver.prototype.checked(elm);
      }
    }
  });
};
CheckWithMouseOver.prototype.checked = (elm) => {
  if (elm && window.event.altKey) elm.checked = !elm.checked;
};
CheckWithMouseOver.prototype.observer = (elm) => {
  const observer = new MutationObserver((m) => CheckWithMouseOver.prototype.event());
  observer.observe(elm, {
    childList: true,
    subtree: true
  });
};
window.addEventListener('load', () => {
  CheckWithMouseOver.prototype.start();
});