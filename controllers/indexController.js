const asyncHandler = require("express-async-handler");
const Consumable = require("../models/consumable");
const axios = require('axios');


exports.index = asyncHandler(async (req, res, next) => {
  try {
    // Fetch all consumables with quantity > 0
    const all_consumables = await Consumable.find({ 
      "quantity": { $gt: 0 }
    }, null, { sort: { name: 1 } }).exec();

    // Function to fetch nutrition data for a consumable
    const fetchRecipesData = async (consumables) => {
      const response = await axios.get(
        'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients',
        {  
        params: {
            ingredients: `${consumables.join(',')}`,
            ranking: '2',
            ignorePantry: 'true',
            number: '10'
        },
        headers: {
            'X-RapidAPI-Key': 'bb1eda250cmsh7a72288ff56c541p172b91jsn129ee7ffe099',
            'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
        }
        });
      return response.data;
    };

    const recipes = await fetchRecipesData(all_consumables.map(consumable => consumable.name));

    // Render the "index" view with consumables and nutrition data
    res.render("index", { title: "My inventory", consumables: all_consumables, recipes: recipes, update: false});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

exports.index_update = asyncHandler(async (req, res, next) => {
  try {
    // Fetch all consumables with quantity > 0
    const all_consumables = await Consumable.find({ 
      "quantity": { $gt: 0 }
    }, null, { sort: { name: 1 } }).exec();

    // Function to fetch nutrition data for a consumable
    const fetchRecipesData = async (consumables) => {
      const response = await axios.get(
        'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients',
        {  
        params: {
            ingredients: `${consumables.join(',')}`,
            ranking: '2',
            ignorePantry: 'true',
            number: '10'
        },
        headers: {
            'X-RapidAPI-Key': 'bb1eda250cmsh7a72288ff56c541p172b91jsn129ee7ffe099',
            'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
        }
        });
      return response.data;
    };

    const recipes = await fetchRecipesData(all_consumables.map(consumable => consumable.name));
    // Render the "index" view with consumables and nutrition data
    res.render("index", { title: "My inventory", consumables: all_consumables, recipes: recipes, update: true, consumableIdClicked: req.params.id});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


exports.index_post = asyncHandler(async (req, res, next) => {
    const consumable = new Consumable({
        name: req.body.name,
        freezed: Boolean(req.body.freezed),
        chilled: Boolean(req.body.chilled),
        unit: req.body.unit,
        quantity: req.body.quantity,
        expirationDate: req.body.expirationDate
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

exports.freezer_delete = asyncHandler(async (req, res, next) => {
    const result = await Consumable.findByIdAndDelete(req.params.id);
    if (!result) {
        res.status(404).json({ error: "Resource not found" });
    } else {
        console.log(res.json())
    }
});

exports.cupboard = asyncHandler(async (req, res, next) => {
        const freezed_consumables = await Consumable.find({ 
        "chilled": false,
        "freezed": false
    })
        .exec();
    res.render("cupboard", { title: "Cupboard", consumables: freezed_consumables });
});

exports.cupboard_delete = asyncHandler(async (req, res, next) => {
    const result = await Consumable.findByIdAndDelete(req.params.id);
    if (!result) {
        res.status(404).json({ error: "Resource not found" });
    } else {
        console.log(res.json())
    }
    
});

exports.recipe = asyncHandler(async (req, res, next) => {

    const fetchRecipeData = async (id) => {
        const response = await axios.get(
            `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${id}/information`,
            {  
            headers: {
                'X-RapidAPI-Key': 'bb1eda250cmsh7a72288ff56c541p172b91jsn129ee7ffe099',
                'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
            }
        });
      return response.data;
    };

    const recipe = await fetchRecipeData(req.params.id);
    console.log(recipe);
    res.render("recipe", { title: "Recipe", recipe: recipe });
});

