const { Schema, model } = require('mongoose');

const ObjectSchema = new Schema({
    id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    surface: {
        type: String,
        required: true
    },
    matches: [{ type: Schema.Types.ObjectId, ref: 'Match' }]

});

module.exports = model('Object', ObjectSchema);
