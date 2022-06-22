const AppTransaction = require("../models/transaction");// model
const { getToken } = require("../helpers/utility");

module.exports = (data) => {
    console.log("create new transaction file save geven data", data);
    let { phone, appSetSessionToken, amount, transactionType, toAccountPhoneNumber } = data;
    const newTransaction = new AppTransaction({
        token: getToken("TS"),
        fromAccountPhoneNUmber: phone,
        toAccountPhoneNumber,
        sessionToken: appSetSessionToken,
        transactionType,
        transactionFee: 0,
        amount
    })
    newTransaction.save();

    return {
        type: "success",
        msg: "Transaction is successful",
        data: {
            newTransaction
        }
    }
}