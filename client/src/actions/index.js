import axios from 'axios';

export function getCountries(){
    return async function(dispatch){
        var json = await axios.get('http://localhost:3001/countries');
        return dispatch({
            type: 'GET_COUNTRIES',
            payload: json.data
        });
    }
}

export function filterCountryByContinent(payload){
    return{
        type: 'FILTER_BY_CONTINENT',
        payload
    }
}

export function orderByName(payload){
    return {
        type: 'ORDER_BY_NAME',
        payload
    }
}

export function orderByPop(payload){
    return{
        type: 'ORDER_BY_POP',
        payload
    }
}

export function filterActivity(payload){
    return{
        type: 'ORDER_BY_ACTIVITY',
        payload
    }
}

export function getNameCountry(name){
    return async function (dispatch){
        try {
            var json = await axios.get("http://localhost:3001/countries?name=" + name)
            return dispatch({
                type: "GET_NAME_COUNTRY",
                payload: json.data
            })
        } catch (error) {
            console.log(error);
        }
    }
}

export function getActivities() {
    return async function (dispatch) {
        var json = await axios.get("http://localhost:3001/activities");
        return dispatch({
            type: "GET_ACTIVITY",
            payload: json.data
        })
    }
}

export function postActivity(info) {
    return async function (dispatch) {
        var json = await axios.post("http://localhost:3001/activities",info)
        return json
    }
}

export const deleteActivity = (name) => {
    return async function (dispatch){
        var json = await axios.delete("http://localhost:3001/activities", {data:{name}})
        return dispatch({
            type: "DELETE_ACTIVITY",
            payload: name
        })
    }
}

export function getDetail(id){
    return async function (dispatch){
        try {
            var json = await axios.get("http://localhost:3001/countries/"+id)
            return dispatch({
                type: 'GET_DETAILS',
                payload: json.data
            })
        } catch (error) {
            console.log(error);
        }
    }
}
