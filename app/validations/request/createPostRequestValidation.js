const validationHelper = require("../validationsHelpers/validationHelper");
const ValidationError = require("../../exceptions/ValidationError");


module.exports = (req, res) => {

    const { title, description, category, tags, image } = req.body;

    // ==> check required key exists or not
    validationHelper.ObjExists(["title", "description", "category", "tags", "image"], req.body);

    // ==> Required Should  Be not empty Value
    validationHelper.isEmpty([title, description, category, tags, image]);

    return true;

}