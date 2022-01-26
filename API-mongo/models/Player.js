const { Schema, model } = require('mongoose');

const PlayerSchema = new Schema({
    id: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    dateOfBirth: {
        type: Date,
        required: true
    },
    gender: {
      type: String,
      required: true
    },
    handed: {
        type: String,
        required: true
    },
    height: {
        type: Number,
        required: true
    },
    weight: {
        type: Number,
        required: true
    },
    matches: [{ type: Schema.Types.ObjectId, ref: 'Match' }],
});

module.exports = model('Player', PlayerSchema);
