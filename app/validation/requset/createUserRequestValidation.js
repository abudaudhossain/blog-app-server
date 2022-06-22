module.exports = (v, res) => {
    if (v.name === undefined || v.email === undefined || v.password === undefined) {
       return true;
    }
    else if (v.name.length === 0 || v.email.length === 0 || v.password.length === 0) {
        return true;
    }
}