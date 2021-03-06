const handler = require("../exceptions/handler");
const validationHelper = require("../validations/validationsHelpers/validationHelper");
const jwt = require('jsonwebtoken');
const AppAuthSession = require("../models/authSession");
const ValidationError = require("../exceptions/ValidationError");
const NotFoundError = require("../exceptions/NotFountError");

module.exports = async (req, res, next) => {
    try {
        validationHelper.ObjExists(["authorization", "devicetoken"], req.headers);

        // json web token verification
        const JWToken = req.headers.authorization.split(" ")[1];
        let decoded = jwt.verify(JWToken, process.env.SECRET, (err, decoded) => {
            if (err) throw new ValidationError("๐ค๐ค๐ค๐พ๐พjwt Is wrong.Please Login Now.๐ฝ๐ฝ๐พ๐ฝ๐ฝ๐ฝ");
            return decoded;
        });
        
        console.log('I am validUserRequestMiddleware ==>', decoded)
        const deviceToken = req.headers.devicetoken;
        const sessionToken = decoded.sessionToken;
        const userToken = decoded.userToken;


        const session = await AppAuthSession.findOne({ token: sessionToken })

        // ==> session token validation
        if (!session) throw new NotFoundError("๐ค๐ค๐ค๐พ๐พPlease given valid session๐ฝ๐ฝ๐พ๐ฝ๐ฝ๐ฝ");

        // ==> device token validation
        if (session.deviceToken !== deviceToken) throw new ValidationError("๐ค๐ค๐ค๐พ๐พdeviceToken is invalid. Please Login Now.๐ฝ๐ฝ๐พ๐ฝ๐ฝ๐ฝ");

        // ==> account token validation
        if (session.accountToken !== userToken) throw new ValidationError("๐ค๐ค๐ค๐พ๐พAccountNo in invalid . Please Login Now.๐ฝ๐ฝ๐พ๐ฝ๐ฝ๐ฝ");



        //==> check session status
        if (session.status === "Inactive") throw new ValidationError("๐ค๐ค๐ค๐พ๐พsession Is inactive.Please Login Now.๐ฝ๐ฝ๐พ๐ฝ๐ฝ๐ฝ")




        console.log("validUerRequest l: 44 session", session)

        req.body.appSetSessionToken = sessionToken;
        req.body.appSetUserToken = userToken;
        req.body.appSetDeviceToken = deviceToken;

        next();
    } catch (error) {
        console.log(error);
        handler(error, res);
    }
}