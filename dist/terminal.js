"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.color = void 0;
exports.getTimestamp = getTimestamp;
exports.info = info;
exports.warn = warn;
exports.error = error;
exports.success = success;
exports.debug = debug;
exports.color = {
    red: "\x1b[31m",
    orange: "\x1b[38;5;202m",
    yellow: "\x1b[33m",
    green: "\x1b[32m",
    blue: "\x1b[36m",
    reset: "\x1b[0m",
};
function getTimestamp() {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const formattedMonth = month <= 9 ? `0${month}` : `${month}`;
    const formattedDay = day <= 9 ? `0${day}` : `${day}`;
    const formattedHours = hours <= 9 ? `0${hours}` : `${hours}`;
    const formattedMinutes = minutes <= 9 ? `0${minutes}` : `${minutes}`;
    const formattedSeconds = seconds <= 9 ? `0${seconds}` : `${seconds}`;
    return `${year}-${formattedMonth}-${formattedDay} ${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}
function info(message) {
    console.log(`${exports.color.yellow}[${getTimestamp()}]${exports.color.reset} ${message}`);
}
function warn(message) {
    console.log(`${exports.color.orange}[${getTimestamp()}]${exports.color.reset} ${message}`);
}
function error(message) {
    console.log(`${exports.color.red}[${getTimestamp()}]${exports.color.reset} ${message}`);
}
function success(message) {
    console.log(`${exports.color.green}[${getTimestamp()}]${exports.color.reset} ${message}`);
}
function debug(message) {
    console.log(`${exports.color.blue}[${getTimestamp()}]${exports.color.reset} ${message}`);
}
//# sourceMappingURL=terminal.js.map