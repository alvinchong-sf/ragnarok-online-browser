let intervalId = null;

function autoDoubleClick(hotkey, intervalTime) {
    const opts = { bubbles: true, cancelable: true };
    let inner = document.querySelector(`[data-tooltip="[ ${hotkey} ] Infinite Fly Wing"]`).querySelector('[draggable="true"]');
    
    let intervalId = setInterval(() => {
        inner = document.querySelector(`[data-tooltip="[ ${hotkey} ] Infinite Fly Wing"]`).querySelector('[draggable="true"]');
        inner.dispatchEvent(new MouseEvent('dblclick', opts));
    
    }, intervalTime)

    return intervalId;
}

function stopAutoDoubleClick(intervalId) {
    clearInterval(intervalId);
}

intervalId = autoDoubleClick('2', 5000);
// stopAutoDoubleClick(intervalId)