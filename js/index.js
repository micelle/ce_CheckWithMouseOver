const targetName = 'input[type="checkbox"], input[type="radio"]';
/**
 * クロスサイトオリジンか判定
 * @param {object} frameElm フレーム要素 
 * @returns ture:同一ホスト, false:クロスサイトオリジン
 */
const checkeHost = frameElm => {
  const hostName = window.location.hostname
  const frameSrc = frameElm.getAttribute('src')
  const frameHostName = new URL(frameSrc, window.location.origin).hostname
  // trueなら同一、falseなら別
  const isOrigin = new RegExp(frameHostName).test(hostName)
  // テスト用
  const test = false
  if (test) {
    console.group(frameSrc)
    console.log('👘 - checkeHost - frameElm:', frameElm)
    console.log('👘 - checkeHost - hostName:', hostName)
    console.log('👘 - checkeHost - frameSrc:', frameSrc)
    console.log('👘 - checkeHost - frameHostName:', frameHostName)
    console.log('👘 - checkeHost - isOrigin:', isOrigin)
    console.groupEnd(frameSrc)
  }
  // クロスサイトオリジンの場合はすぐに返す
  if (!isOrigin) return isOrigin
  // 同一ホストでも Uncaught DOMException: Blocked a frame with origin となるケースもある
  try {
    const body = elm.contentWindow.document.body // 試しにbodyを取得
  } catch (error) {
    return false // エラーとなる場合はfalseを返す
  }
  return isOrigin
}
const CheckWithMouseOver = function () { };
CheckWithMouseOver.prototype.start = () => {
  const body = document.body;
  if (!body) return setTimeout(CheckWithMouseOver.prototype.start, 500);
  CheckWithMouseOver.prototype.event();
  CheckWithMouseOver.prototype.observer(body);
  // iframe, frame
  document.querySelectorAll('iframe, frame').forEach(elm => {
    //if (!checkeHost(elm)) return
    try {
      CheckWithMouseOver.prototype.observer(elm.contentWindow.document.body)
    } catch (error) { }
  })
};
CheckWithMouseOver.prototype.event = (mutations) => {
  const inputs = document.querySelectorAll(targetName);
  if (inputs) CheckWithMouseOver.prototype.eventInput(inputs);
  const labels = document.querySelectorAll('label');
  if (labels) CheckWithMouseOver.prototype.eventLabel(labels);
  // iframe, frame
  document.querySelectorAll('iframe, frame').forEach(elm => {
    //if (!checkeHost(elm)) return
    try {
      const frameInputs = elm.contentWindow.document.querySelectorAll(targetName)
      if (frameInputs.length) CheckWithMouseOver.prototype.eventInput(frameInputs)
      const frameLabels = elm.contentWindow.document.querySelectorAll('label')
      if (frameLabels.length) CheckWithMouseOver.prototype.eventLabel(frameLabels)
    } catch (error) { }
  })
};
CheckWithMouseOver.prototype.eventInput = (inputs) => {
  inputs.forEach((input) => {
    input.onmouseover = (e) => {
      const elm = e.target;
      if (e.altKey) CheckWithMouseOver.prototype.checked(elm);
    }
  });
};
CheckWithMouseOver.prototype.eventLabel = (labels) => {
  labels.forEach((label) => {
    if (label.htmlFor) {
      label.onmouseover = (e) => {
        const htmlFor = e.target.htmlFor
        const htmlForElm = document.getElementById(htmlFor) || e.view.document.getElementById(htmlFor);
        if (e.altKey) CheckWithMouseOver.prototype.checked(htmlForElm);
      }
    } else {
      label.onmouseover = (e) => {
        const elm = e.target.querySelector(targetName);
        if (e.altKey) CheckWithMouseOver.prototype.checked(elm);
      }
    }
  });
};
CheckWithMouseOver.prototype.checked = (elm) => {
  if (elm === null || elm.disabled || elm.readOnly) return;
  elm.checked = !elm.checked;
  //if (elm && window.event.altKey) elm.checked = !elm.checked;
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