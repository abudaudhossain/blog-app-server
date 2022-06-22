const validationHelper = require("../validationsHelpers/validationHelper");
const ValidationError = require("../../exceptions/ValidationError");


module.exports = (req, res) => {

    const { name, email,  password } = req.body;
    validationHelper.ObjExists(["devicetoken"], req.headers); //check divice token

    req.body.appSetIPAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    req.body.appSetDeviceToken = req.headers.devicetoken;

    // ==> check required key exists or not
    validationHelper.ObjExists(["name", "email",  "password"], req.body);

    // ==> Required Should  Be not empty Value
    validationHelper.isEmpty([name, email, password]);

    // ==> name validation
    if (validationHelper.nameValidation(name)) throw new ValidationError("Should be use Only character in name");

    // ==> password Validation
    validationHelper.passwordValidation(password);

    // ==> email number Validation
    validationHelper.emailValidation(email);

    return true;

}