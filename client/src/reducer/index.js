const initialState = {
    allCountries: [],
    countries: [],
    activities: [],
    detail: []
}

function rootReducer (state = initialState, action){
    switch(action.type) {
        case 'GET_COUNTRIES':
            return{
                ...state,
                countries: action.payload,
                allCountries: action.payload
            }
        case 'GET_ACTIVITY':
            return{
                ...state,
                activities: action.payload
            }
        case 'POST_ACTIVITY':
            return{
                ...state
            }
        case "FILTER_BY_CONTINENT":
            const allCountries = state.allCountries
            const continentFilter = action.payload === 'All' ? allCountries : allCountries.filter(g => g.continents === action.payload)
            return{
                ...state,
                countries: continentFilter
            }
        case "ORDER_BY_NAME":
            let positionOrder = action.payload === "asc" ?
                state.countries.sort(function (a,b) {
                    if(a.name > b.name) {
                        return 1;
                    }
                    if(b.name > a.name) {
                        return -1;
                    }
                    return 0;
                }) :
                state.countries.sort(function(a,b) {
                    if (a.name > b.name) {
                        return -1;
                    }
                    if (b.name > a.name) {
                        return 1;
                    }
                    return 0;
                })
            return {
                ...state,
                countries: positionOrder
            }
        case "ORDER_BY_POP":
            let popOrden = action.payload === "pop asc"?
                state.countries.sort(function(a, b) {
                    if (b.population > a.population) {
                        return 1;
                    }
                    if (a.population > b.population) {
                        return -1;
                    }
                    return 0;
                }) :
                state.countries.sort(function(a, b) {
                    if (b.population > a.population) {
                        return -1;
                    }
                    if (a.population > b.population) {
                        return 1;
                    }
                    return 0;
                })
            return {
                ...state,
                countries: popOrden
            }
        case "GET_NAME_COUNTRY":
            return {
                ...state,
                countries: action.payload
            }
        case 'ORDER_BY_ACTIVITY':
            const copia = state.allCountries;
			const acti = state.activities;
			const filterByActivity = action.payload === 'any'? copia
            : acti.filter((a) => a.name === action.payload)[0].countries.map((e) => e);
			return {
				...state,
				countries: filterByActivity,
			};
        case 'GET_DETAILS':
            return{
                ...state,
                detail: action.payload
            }
        default:
            return state;
    }
}

export default rootReducer;