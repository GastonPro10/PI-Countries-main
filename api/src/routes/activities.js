require('dotenv').config();
const axios = require('axios');
const { Router } = require('express');
const { Activity, Country } = require('../db');


const router = Router();

const getDbActivity = async () => {
	return await Activity.findAll({
		include: {
			model: Country,
			attribute: ['name', 'img', 'continents', 'capital'],
			through: {
				attributes: [],
			},
		},
	});
};


router.get('/', async (req, res) => {
	
	const activities = await getDbActivity();
	if (activities) {
		return res.status(200).json(activities);

	} else {
		return res.status(404).json(activities.length ? activities : "No se encontraron actividades")
	}
}
)

router.post('/', async (req, res) => {
	let { name, difficulty, duration, season, countries } = req.body;

	const createActivity = await Activity.create({
		name,
		difficulty,
		duration,
		season,
	});

	if (countries) {

		await createActivity.addCountries(countries); 
	} 

	return res.status(200).json({ mesage: 'exito', createActivity });
});


module.exports = router;