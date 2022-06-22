const utility = require("../helpers/utility");
const AppAuthSession = require("../models/authSession");

module.exports = async (data) => {
    console.log("CrateNewSession l: 5", data)
    const { appSetAccountToken, email, appSetDeviceToken, appSetIPAddress } = data;
   

    const newAuthSession = new AppAuthSession({
        token: utility.getToken('AUTHSes'),
        email,
        deviceToken: appSetDeviceToken,
        ipAddress: appSetIPAddress,
        accountToken: appSetAccountToken,
        status: "Active"
    })
    await newAuthSession.save();

    console.log("CrateNewSession l20: ", newAuthSession)
    return {
        type: "success",
        msg: "Create new session😎😉",
        data: {
            sessionToken: newAuthSession.token,
            status: newAuthSession.status
        }
    }
}