const asyncHandler = require("express-async-handler");
const Consumable = require("../models/consumable");

exports.index = asyncHandler(async (req, res, next) => {
    res.render('index', { title: 'My inventory' });
});

exports.index_post = asyncHandler(async (req, res, next) => {
    const consumable = new Consumable({
        name: req.body.name,
        freezed: Boolean(req.body.freezed),
        chilled: Boolean(req.body.chilled),
        unit: req.body.unit,
        amount: req.body.amount,
    });
    await consumable.save();
    res.redirect("/");
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
    console.log("#########deleting consumable");
    const result = await Consumable.findByIdAndDelete(req.params.id);
    if (!result) {
        // The resource was not found, respond with a 404 status
        res.status(404).json({ error: "Resource not found" });
    } else {
        res.redirect("/fridge");
    }
});


exports.freezer = asyncHandler(async (req, res, next) => {
    res.render('freezer', { title: 'My freezer' })
    console.log('freezerController.js');
});

exports.cupboard = asyncHandler(async (req, res, next) => {
    res.render('cupboard', { title: 'My cupboard' });
});