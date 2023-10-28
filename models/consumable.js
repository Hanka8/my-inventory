const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { DateTime } = require("luxon");

const consumableSchema = new Schema({
    name: { type: String, required: true },
    freezed: { type: Boolean, required: true },
    chilled: { type: Boolean, required: true },
    unit: {type: String, required: true},
    quantity: {type: Number, required: true},
    expirationDate: {type: Date, required: false}
}, { timestamps: true });

consumableSchema.virtual("date_formatted").get(function () {
    return DateTime.fromJSDate(this.expirationDate).toLocaleString(DateTime.DATE_MED);
});

consumableSchema.virtual("expiring_soon").get(function () {
    const now = DateTime.now();
    const expirationDate = DateTime.fromJSDate(this.expirationDate);
    const diff = expirationDate.diff(now, "days").toObject().days;
    return diff <= 3;
});

module.exports = mongoose.model('Consumable', consumableSchema);