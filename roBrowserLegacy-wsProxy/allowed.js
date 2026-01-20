// List of allowed server ip
// If empty, will be able to redirect everywhere
// Be aware: can be used for DDOS or forge evil request on other host
module.exports = [
    '127.0.0.1:6900',  // login
    '127.0.0.1:6121',  // char
    '127.0.0.1:5121'   // map
];