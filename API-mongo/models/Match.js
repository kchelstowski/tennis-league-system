const { Schema, model } = require('mongoose');

const MatchSchema = new Schema({
    id: {
        type: String,
        required: true
    },
    player1: [{ type: Schema.Types.ObjectId, ref: 'Player' }],
    player2: [{ type: Schema.Types.ObjectId, ref: 'Player' }],
    winner: [{ type: Schema.Types.ObjectId, ref: 'Player' }],
    object: [{ type: Schema.Types.ObjectId, ref: 'Object' }],
    date: {
        type: Date,
        required: true
    },


});

module.exports = model('Match', MatchSchema);
