const validationHelper = require("../validationsHelpers/validationHelper");
const ValidationError = require("../../exceptions/ValidationError");


module.exports = (req) => {

    const {phone,otp } = req.body;

    // ==> check required key exists or not
    validationHelper.ObjExists(["phone","otp"], req.body);

    // ==> Required Should  Be not empty Value
    validationHelper.isEmpty([otp, phone,]);

    // ==> Phone number Validation
    validationHelper.phoneValidation({ phone });

    return true;

}