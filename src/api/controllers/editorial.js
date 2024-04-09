const Editorial = require('../models/Editorial');

const getEditorials = async (req, res, next) => {
    try {
        const editorials = await Editorial.find();
        return res.status(200).json(editorials);
    } catch (err) {
        next(err);
    }
};

module.exports = { getEditorials };