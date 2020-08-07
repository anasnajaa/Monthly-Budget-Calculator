const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    amount: { type: Number, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true }
},
{ timestamps: true}, 
{ _id: true });

const Budget = mongoose.model('Budget', schema);

module.exports = Budget; 