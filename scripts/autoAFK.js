const opts = { key: 'Enter', code: 'Enter', keyCode: 13, which: 13, bubbles: true, cancelable: true };
const message = "@afk";
const inputDiv = '[contenteditable="true"]';
const keydown = 'keydown'
let interval;

const element = document.querySelector(inputDiv);
element.focus();
element.textContent = message;

setTimeout(() => {
    document.dispatchEvent(new KeyboardEvent(keydown, opts));
}, 1000)

interval = setInterval(() => {
    console.log('AFK trigger firing at', new Date().toLocaleTimeString());
    const element = document.querySelector(inputDiv);
    element.focus();
    element.textContent = message;
    console.log('AFK trigger2');

    setTimeout(() => {
        document.dispatchEvent(new KeyboardEvent(keydown, opts));
        console.log('AFK trigger3');
    }, 1000)
}, 930000)

console.log('AFK script started, interval ID:', interval);