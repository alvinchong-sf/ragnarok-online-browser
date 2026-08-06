const opts = { key: 'Enter', code: 'Enter', keyCode: 13, which: 13, bubbles: true, cancelable: true };
const message = "@afk";
const inputDiv = '[contenteditable="true"]';
const keydown = 'keydown'

const element = document.querySelector(inputDiv);
element.focus();
element.textContent = message;

setTimeout(() => {
    document.dispatchEvent(new KeyboardEvent(keydown, opts));
}, 1000)

const interval = setInterval(() => {
    const element = document.querySelector(inputDiv);
    element.focus();
    element.textContent = message;

    setTimeout(() => {
        document.dispatchEvent(new KeyboardEvent(keydown, opts));
    }, 1000)
}, 930000)

