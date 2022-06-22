const setters = require("../helpers/setters");
const utility = require("../helpers/utility");

const AppAccount = require("../models/account")// model

module.exports = {
    // ==> create new account
    createNewAccount: async (data) => {
        const { name, email, image, password } = data;
        const token = utility.getToken("ACC");
        const newAccount = new AppAccount({
            token,
            name, 
            email, 
            image, 
            password
            
        })
        await newAccount.save();

        return setters.accountSetter([newAccount]);
    },

    // ==> get all account list
    accountList: async () => {
        return setters.accountSetter(await AppAccount.find({}));
    },

    // ==> find account by phone number
    myAccount: async (email) => {
        return await AppAccount.findOne({ email: email });
    },

    // ==> check phone number is validation
    updateNumberValidationStatus: async (phone) => {
        return setters.accountSetter([await AppAccount.findOneAndUpdate({ phone: phone }, { $set: { numberValidation: true } })])
    },
    AccountBalanceUpdate: async (phone, balance) => {
        return setters.accountSetter([await AppAccount.findOneAndUpdate({ phone: phone }, { $set: { balance: balance } })])
    }

}