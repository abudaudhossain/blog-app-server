const handler = require("../../exceptions/handler");
const NotAcceptableError = require("../../exceptions/NotAcceptableError");
const NotFoundError = require("../../exceptions/NotFountError");

const AppAccount = require("../../models/account");// model
const validationHelper = require("../validationsHelpers/validationHelper");

module.exports = async (req) => {

    let { phone, password, amount, transactionType, toAccountPhoneNumber } = req.body;

    const fromAccountInfo = await AppAccount.findOne({ phone: phone });
    const toAccountInfo = await AppAccount.findOne({ phone: toAccountPhoneNumber }, { balance: 1, accountType: 1 });

    console.log(toAccountInfo)

    if (!fromAccountInfo) throw new NotFoundError("Your Account cannot Found. Please create new account or Try again");
    if (!toAccountInfo) throw new NotFoundError("Your Transaction Account cannot Found. Please Check  account number or Try again");

    // ==> transaction type validation
    const transactionService = ["sendMoney", "cashOut", "payment", "cashIn", "mobileRecharge"];
    if (transactionService.indexOf(transactionType) === -1) throw new NotFoundError("This transaction we are not provided");

    validationHelper.transactionAccountTypeValidation(transactionType, fromAccountInfo.accountType, toAccountInfo.accountType);

    if (fromAccountInfo.password !== password) throw new NotAcceptableError("Password is wrong . Please Try again");

    if (fromAccountInfo.balance < parseInt(amount)) throw new NotAcceptableError("Your Balance is low😯");
}