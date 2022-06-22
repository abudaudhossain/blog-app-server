const AppUser = require("../models/user");
const createUserRequestValidation = require("../validation/requset/createUserRequestValidation");

module.exports = {
    welcome: async (req, res) => {
        res.send("skaila bego")
    },

    addUser: async (req, res) => {
        try {
            const name = req.body.name;
            const email = req.body.email;
            const password = req.body.password;
            const deviceToken = req.headers.devicetoken;
            let proceed = true;

            console.log(req.body);
            // @validation part
            // => validation 1: required are not empty
            if (createUserRequestValidation({ name, email, password })){
                proceed = false
                res.send({
                    type: "error",
                    msg: "vlaidation error",
                })
            }


                // @business logic
                if (proceed) {
                    const token = "userToken237498"
                    const newUser = new AppUser({
                        token,
                        name,
                        email,
                        password
                    })

                    await newUser.save();
                    console.log(newUser)
                    res.send({
                        type: "ok",
                        data: { user: newUser },
                        errorLog: {}
                    })
                }



        } catch (error) {
            console.log(error);
            res.send({
                type: "error",
                data: {},
                errorLog: { error: error }
            })
        }
    }
}