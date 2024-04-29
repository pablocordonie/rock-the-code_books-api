const Editorial = require('../models/Editorial');

const getEditorials = async (req, res, next) => {
    try {
        const editorials = await Editorial.find();
        return res.status(200).json(editorials);
    } catch (err) {
        console.log(err);
        return res.status(400).json('Ha ocurrido un error mostrando la lista de editoriales');
    }
};

const getEditorialById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const editorial = await Editorial.findById(id);
        return res.status(200).json(editorial);
    } catch (err) {
        console.log(err);
        return res.status(400).json('Ha ocurrido un error mostrando esta editorial');
    }
};

module.exports = { getEditorials, getEditorialById };