const validationHelper = require("../validationsHelpers/validationHelper");
const ValidationError = require("../../exceptions/ValidationError");
const NotFoundError = require("../../exceptions/NotFountError");

module.exports = (req) => {
 console.log("reqValidation: bodyInfo ", req.body)
    // ==> check required key exists or not
    validationHelper.ObjExists(["phone", "password", "appSetSessionToken", "toAccountPhoneNumber", "transactionType", "amount"], req.body);

    const { phone, password, appSetSessionToken, amount, transactionType, toAccountPhoneNumber } = req.body;

    // ==> Required Should  Be not empty Value
    validationHelper.isEmpty([phone, password, appSetSessionToken, amount, transactionType, toAccountPhoneNumber]);

    // ==> Phone number Validation
    validationHelper.phoneValidation({ phone });
    validationHelper.phoneValidation({phone:toAccountPhoneNumber });

    // ==> password Validation
    validationHelper.passwordValidation(password);

    return true;

}
