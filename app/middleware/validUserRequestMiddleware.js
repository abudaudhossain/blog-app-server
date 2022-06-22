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
            if (err) throw new ValidationError("🤑🤑🤑👾👾jwt Is wrong.Please Login Now.👽👽👾👽👽👽");
            return decoded;
        });
        
        console.log('I am validUserRequestMiddleware ==>', decoded)
        const deviceToken = req.headers.devicetoken;
        const sessionToken = decoded.sessionToken;
        const userToken = decoded.userToken;


        const session = await AppAuthSession.findOne({ token: sessionToken })

        // ==> session token validation
        if (!session) throw new NotFoundError("🤑🤑🤑👾👾Please given valid session👽👽👾👽👽👽");

        // ==> device token validation
        if (session.deviceToken !== deviceToken) throw new ValidationError("🤑🤑🤑👾👾deviceToken is invalid. Please Login Now.👽👽👾👽👽👽");

        // ==> account token validation
        if (session.accountToken !== userToken) throw new ValidationError("🤑🤑🤑👾👾AccountNo in invalid . Please Login Now.👽👽👾👽👽👽");



        //==> check session status
        if (session.status === "Inactive") throw new ValidationError("🤑🤑🤑👾👾session Is inactive.Please Login Now.👽👽👾👽👽👽")




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