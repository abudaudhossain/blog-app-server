const jwt = require('jsonwebtoken');
/*
phoneNumberValidation() ---> check to Phone Number here have any character
numberSubToken() ---> create 5 digit random number
getRandomIndex() ---> create new index for array less then 52
stringSubToken() ---> create random string length 5
getToken()       ---> create final unique token

*/
const numberSubToken = () => {
    const otp = Math.floor(Math.random() * 100000).toString();
    if (otp.length > 4) {
        return otp;
    } else {
        return numberSubToken(); 
    }
}


module.exports = {
    phoneNumberValidation: (num) => {
        var re = /^[0-9]+$/;
        if (re.test(num))
            return false;
        else
            return true;
    },

    getToken: (content) => {

        const getRandomIndex = () => {
            const index = Math.floor(Math.random() * 100);
            if (index < 52) {
                return index;
            } else {
                return getRandomIndex();
            }
        }

        const stringSubToken = () => {
            const characters = "ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
            let stToken = "";
            for (let i = 0; i < 5; i++) {
                stToken += characters[getRandomIndex()];
            }
            return stToken;
        }

        return numberSubToken() + stringSubToken() + content + stringSubToken() + numberSubToken()
    },
    numberSubToken,
    getJwtToken: (userToken, sessionToken) => {
        return jwt.sign({ userToken, sessionToken }, process.env.SECRET, {
            expiresIn: '30d'
        })
    },

    getOperator: (num) => {
        const USSDCode = num.slice(0, 3);
        switch (USSDCode) {
            case "019":
            case "014":
                return "Banglalink"

            case "017":
            case "013":
                return "GrameenPhone "
            case "018":
                return "Robi"

            case "016":
                return "Airtel"
            case "015":
                return "Teletalk"
            default:
                return false;
        }
    },

    // native response
    nativeResponse(data, msg, res) {
        res.status(200).send({
            type: "success",
            message: msg,
            data
        })
    }
}



