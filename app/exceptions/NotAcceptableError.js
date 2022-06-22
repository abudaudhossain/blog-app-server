module.exports = class NotAcceptableError extends Error {
    constructor(message) {
        super(message);
        this.name = "NotAcceptableError";
    }
}