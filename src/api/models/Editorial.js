const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const editorialSchema = new Schema(
    {
        name: { type: String, required: true },
        country: { type: String, required: true },
        booksCatalog: { type: Schema.Types.ObjectId, ref: 'Book' }
    },
    {
        timestamps: true,
        collection: 'editorials'
    }
);

const Editorial = mongoose.model('editorials', editorialSchema, 'editorials');

module.exports = Editorial;