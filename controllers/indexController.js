const asyncHandler = require("express-async-handler");
const Consumable = require("../models/consumable");

exports.index = asyncHandler(async (req, res, next) => {
        const all_consumables = await Consumable.find({ 
            "quantity": { $gt: 0 }
        }, null, { sort: { name: 1 } })
        .exec();
    res.render("index", { title: "My inventory", consumables: all_consumables });
});

exports.index_post = asyncHandler(async (req, res, next) => {
    const consumable = new Consumable({
        name: req.body.name,
        freezed: Boolean(req.body.freezed),
        chilled: Boolean(req.body.chilled),
        unit: req.body.unit,
        quantity: req.body.quantity,
    });
    await consumable.save();
    res.redirect("/");
});

exports.index_delete = asyncHandler(async (req, res, next) => {
    const result = await Consumable.findByIdAndDelete(req.params.id);
    if (!result) {
        res.status(404).json({ error: "Resource not found" });
    } else {
        console.log(res.json())
    }
});


exports.fridge = asyncHandler(async (req, res, next) => {
    const chilled_consumables = await Consumable.find({ 
        "chilled": true,
        "freezed": false
    })
        .exec();
    res.render("fridge", { title: "Fridge", consumables: chilled_consumables });
});

exports.fridge_delete = asyncHandler(async (req, res, next) => {
    const result = await Consumable.findByIdAndDelete(req.params.id);
    if (!result) {
        res.status(404).json({ error: "Resource not found" });
    } else {
        console.log(res.json())
    }
});

exports.freezer = asyncHandler(async (req, res, next) => {
    const freezed_consumables = await Consumable.find({ 
        "chilled": false,
        "freezed": true
    })
        .exec();
    res.render("freezer", { title: "Freezer", consumables: freezed_consumables });
});

exports.cupboard = asyncHandler(async (req, res, next) => {
        const freezed_consumables = await Consumable.find({ 
        "chilled": false,
        "freezed": false
    })
        .exec();
    res.render("cupboard", { title: "Cupboard", consumables: freezed_consumables });
});