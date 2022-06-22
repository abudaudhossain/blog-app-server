const handler = require("../exceptions/handler");
const { nativeResponse, getJwtToken } = require("../helpers/utility");
const createNewSession = require("../services/createNewSession");
const userAccount = require("../services/userAccount");
const OTPValidation = require("../validations/AuthValidation/OTPValidation");
const createAccountRequestValidation = require("../validations/request/createAccountRequestValidation");
const numberValidationRequestValidation = require("../validations/request/numberValidationRequestValidation");
const validationHelper = require("../validations/validationsHelpers/validationHelper")

module.exports = {
    createAccount: async (req, res) => { 
        try {
            console.log(req.body)
            // Validation part
            createAccountRequestValidation(req, res);
            await validationHelper.accountExists(req.body.email)

            const account = await userAccount.createNewAccount(req.body);

            // set body account token and create new session
            req.body.appSetAccountToken = account[0].AccountNo;
            const newSession = await createNewSession(req.body);

            console.log("new session account =>>24",newSession);
            // ==> add to new session token 
            account[0].sessionToken = newSession.data.sessionToken;
            account[0].sessionStatus = newSession.data.status;

            // ==> add jwt token
            account[0].jwtToken = getJwtToken(account[0].AccountNo, account[0].sessionToken)
            console.log("accountAuth l27 :", account[0]);



            nativeResponse(account[0], "😎😉Create a new account😍💋", res)

        } catch (error) {
            console.log(error);
            handler(error, res)
        }
    },

    numberValidation: async (req, res) => {
        try {
            numberValidationRequestValidation(req);

            const account = await OTPValidation(req.body)
            nativeResponse(account, "💋Validation is success😍😘", res)

        } catch (error) {
            console.log(error);
            handler(error, res)
        }
    }
}