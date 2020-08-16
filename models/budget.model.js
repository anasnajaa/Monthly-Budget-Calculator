const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const obschema = new Schema({
    amount: { type: Number, required: true },
    title: { type: String, required: true },
    notes: { type: String, required: false },
    groupId: { type: String, required: true },
    type: { type: String, required: true },
},
{ timestamps: true}, 
{ _id: true });

const Budget = mongoose.model('Budget', obschema);

module.exports = Budget; 