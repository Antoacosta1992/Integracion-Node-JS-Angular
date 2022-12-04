const  {Recipe}  = require('../models/recipe')

const save = async (req, res) => {
	try {
		const recipes = req.body;
		await Recipe.deleteMany({});

		//una receta a la vez
		//for each le paso una funciion, me va a dar un element que representa una receta
		recipes.forEach(async element => { 
			const recipe = new Recipe(element); //convierte
			await recipe.save(); //guarda
		});

		res.status(200).json({
			msg: "The recipes were saved successfully"
		});

	} catch (error) {
		console.log(error);

		res.status(500).json({
			msg: "The recipes could not save, talk to the administrator"
		});
	}
}

const fetch = async (req, res) => {
	try {
		const recipesList = await Recipe.find();

		res.status(200).json(recipesList);
	} catch (error) {
		console.log(error);

		res.status(500).json({
			msg: "The data could not fetch, talk to the administrator"
		});
	}
}

module.exports = {
	save,
	fetch
}