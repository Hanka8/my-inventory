const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const consumableSchema = new Schema({
    name: String,
    freezed: Boolean,
    chilled: Boolean,
    unit: String,
    quantity: Number,
}, { timestamps: true });

module.exports = mongoose.model('Consumable', consumableSchema);