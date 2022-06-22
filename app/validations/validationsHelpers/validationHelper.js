const NotFoundError = require("../../exceptions/NotFountError");
const ValidationError = require("../../exceptions/ValidationError");
const userAccount = require("../../services/userAccount")
const { getOperator, phoneNumberValidation } = require("../../helpers/utility");
const NotAcceptableError = require("../../exceptions/NotAcceptableError");

module.exports = {
    ObjExists: (keys, obj) => {
        for (let i = 0; i < keys.length; i++)  if (!obj.hasOwnProperty(keys[i])) throw new NotFoundError(`${keys[i]} is keys required`);

        return true;
    },

    isEmpty: (values) => {
        for (let i = 0; i < values.length; i++) if (values[i].length === 0) throw new ValidationError("Required Should  Be not empty property")
    },

    // check account already exists or not 
    accountExists: async (email) => {
        if (await userAccount.myAccount(email)) throw new ValidationError("This email already Exists")
    },

    phoneValidation: (v) => {
        if (v.phone.length !== 11) throw new ValidationError("Required Should  Be 11 digit Phone Number");

        // => validation 2: required to valid number 
        if (phoneNumberValidation(v.phone)) throw new ValidationError("Required Should Be Number not any character")

        // => validation 4: check phone operator
        let operator = getOperator(v.phone);
        if (!operator) throw new ValidationError("Required Should Be Bangladesh Phone operator")

        return true

    },

    nameValidation: (name) => {
        var regEx = /^[A-Za-z\s]+$/;
        if (!regEx.test(name)) throw new ValidationError("Should be use Only character in name")

    },

    emailValidation: (e) => {
        var filter = /^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/;
        if (!(String(e).search(filter) != -1)) throw new ValidationError("Required Should Be Valid Email")
    },

    passwordValidation: (pass) => {
        if (pass.length !== 6) throw new ValidationError("Required Should Be 6 digit number password")
        // var regEx = /^[0-9\s]+$/;
        // if (!regEx.test(pass)) throw new ValidationError("Only use Number In password")
    },

    transactionAccountTypeValidation: (transactionType, fromAccountType, toAccountType,) => {
        console.log("Transaction type validationHelper l: 55", transactionType, fromAccountType, toAccountType,)
        if (transactionType === "cashIn") {
            if (fromAccountType !== "agent") throw new NotAcceptableError("without agent account cannot cashIn")
            if (toAccountType !== "personal") throw new NotAcceptableError("only cashIn personal account")
        }
        else if (transactionType === "cashOut") {
            if (fromAccountType !== "personal") throw new NotAcceptableError("only cash out personal account")
            if (toAccountType !== "agent") throw new NotAcceptableError("without agent account cannot cashIn")
        }
        else if (transactionType === "cashOut") {
            if (fromAccountType !== "personal") throw new NotAcceptableError("only cash out personal account")
            if (toAccountType !== "agent") throw new NotAcceptableError("without agent account cannot cashIn")
        }
        else if (transactionType === "payment") {
            if (fromAccountType !== "personal") throw new NotAcceptableError("only payment personal account")
            if (toAccountType !== "merchant") throw new NotAcceptableError("Payment in only merchant account")
        }
        else if (transactionType === "sendMoney") {
            if (fromAccountType !== "personal") throw new NotAcceptableError("only sendMoney personal account")
            if (toAccountType !== "personal") throw new NotAcceptableError("only sendMoney In personal account")
        }
        else {
            throw new NotFoundError("Your transaction is invalid")
        }
    }

}
