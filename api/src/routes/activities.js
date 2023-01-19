require('dotenv').config();
const axios = require('axios');
const { Router } = require('express');
const { TimeoutError } = require('sequelize');
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
	try {
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
		
	} catch (error) {
		res.status(400).send({error: error.message})
	}
});

const deleteActivity = async (name) => {
	const activity = await Activity.findOne({where:{name}});
	await activity.destroy();
}

router.delete('/', async (req,res) => {
    try{
        const {name} = req.body;
        await deleteActivity(name);
        res.status(201).send("La actividad fue eliminada correctamente");
    }catch(error){
        res.status(404).send("La actividad no pudo ser eliminada"); 
    }
});


module.exports = router;