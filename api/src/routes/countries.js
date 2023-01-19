require('dotenv').config();
const axios = require('axios');
const { Router } = require('express');
const { Activity, Country } = require('../db');

 
const router = Router();

const getApiInfo = async () => { //trabajamos de manera asincronica porque no sabemos cuanto vaya a tardar la funcion en traer la infromacion de la api
	try{
	const { data } = await axios.get('https://restcountries.com/v3/all'); //creamos la constante con la que vamos hacer el llamado a la api
	const apiInfo = await data.map((g) => { 
		return {
			id: g.cca3,
			name: g.name.common,
			img: g.flags[0],
			continents: g.continents[0],
			capital: g.capital? g.capital[0] : 'No contiene' , 
			subregion: g.subregion ? g.subregion : '',  // de lo contrario no accedo
			area: g.area,
			population: g.population,
			currencies: g.currencies ? Object.values(g.currencies[Object.keys(g.currencies)[0]]).join(', Simbolo:')  :  "No contiene moneda"
			
		};
	});
	const countryResult = await Country.bulkCreate(apiInfo); // utilice el metodo bulkcreate para que me cree la informacion de una manera mas rapida. 
	return countryResult; //retorne toda la infromacion creada
}catch(error){
	console.log(error); 
}
};

const getDb = async () => {
	//traigo la informacion ahora de la base de daros 
	return await Country.findAll({
		include: {
			model: Activity, //incluyo el modelo de actividad para poder crear la relacion.
			attributes: ['name', 'difficulty', 'duration', 'season'], //estos son los atributos de las actividades que quiero que me traiga
			through: {
				attributes: []
			},
		},
});
};

router.get('/', async (req, res) => {
	// /countries?name=argentina
	const { name } = req.query;
	// countries = await getApiInfo();
	let countries;
	const countryDB = await Country.count();
	countries =
		countryDB === 0
			? await getApiInfo() // asi que si la db esta vacia llamo a la api
			: await getDb(); // si no saco de la bd
	if (name) {
		
		const byName = countries.filter((n) =>
			n.name.toLowerCase().includes(name.toLowerCase())
		);
		byName.length
			? res.status(200).send(byName)
			: res.status(404).json({ error: 'no se encontro ningun pais' });
	} else {
		res.status(200).send(countries);
	}
});

router.get('/:id', async function (req, res) {
	const id = req.params.id.toUpperCase();
	const allCountries = await getDb();
	if (id) {
		const idCountries = allCountries.filter((i) => i.id === id);
		idCountries.length
			? res.status(200).send(idCountries)
			: res.status(404).send('id no valido');
	}
});


module.exports = router;