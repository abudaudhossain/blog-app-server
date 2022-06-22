const handler = require("../exceptions/handler");
const { nativeResponse, getJwtToken } = require("../helpers/utility");
const createNewSession = require("../services/createNewSession");
const loginAuthValidation = require("../validations/AuthValidation/loginAuthValidation");
const loginRequestValidation = require("../validations/request/loginRequestValidation");

module.exports = {
    login: async (req, res) => {
        try {

            // request data validation
            loginRequestValidation(req);

            // ==> account password validation
            const accountInfo = await loginAuthValidation(req.body)

            // set body account token and create new session
            req.body.appSetAccountToken = accountInfo.data.AccountNo;
            const newSession = await createNewSession(req.body);

            console.log(newSession);
            // ==> add to new session token 
            accountInfo.data.sessionToken = newSession.data.sessionToken;
            accountInfo.data.sessionStatus = newSession.data.status;

            // ==> jwt token add
            accountInfo.data.jwtToken = getJwtToken(accountInfo.data.AccountNo, accountInfo.data.sessionToken)
            console.log("accountAuth l27 :", accountInfo);



            // ==> send to response
            nativeResponse(accountInfo.data, accountInfo.msg, res)

        } catch (error) {
            console.log(error);
            handler(error, res)
        }
    }
}