const NotFoundError = require("../../exceptions/NotFountError");
const UnauthorizedError = require("../../exceptions/UnauthorizedError");

const AppAccount = require("../../models/account"); // model
const { updateNumberValidationStatus } = require("../../services/userAccount");

module.exports = async (data) => {

    // ==> get account in database
    const accountInfo = await AppAccount.findOne({ phone: data.phone }, { validationOTP: 1, OTPExpireAt: 1 });
    // ==> check account Exists or not
    if (!accountInfo) throw new NotFoundError("Please Create Account Now")

    // ==> check otp time is Expired or not
    const NowTime = new Date();
    console.log(NowTime, accountInfo.OTPExpireAt);
    if (NowTime > accountInfo.OTPExpireAt) throw new UnauthorizedError("Your OTP date Expired");

    // ==> check otp
    if (data.otp !== accountInfo.validationOTP) throw new UnauthorizedError("Your OTP is wrong");

    console.log("userAccount l:40 Otp: ", accountInfo);

    return await updateNumberValidationStatus(data.phone)
}
