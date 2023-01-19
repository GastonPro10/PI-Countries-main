import React from "react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCountries, postActivity } from "../actions";
import '../Estilos/ActivityCreate.css'


function validate(input){
    let errors = {};
    if(!input.name) {
        errors.name = 'Se requiere un Nombre'
    } else if(!input.difficulty){
        errors.difficulty = 'Selecionar dificultad entre 1 a 5'
    } else if(!input.season){
        errors.difficulty = 'Marcar la estacion ideal'
    } else if(input.duration < 1 || input.duration > 24) {
        errors.duration = "La duracion debe ser de 1 a 24 hs"
    } 
    
    return errors;
}

export default function ActivityCreate(){
    const dispatch = useDispatch()
    const countries = useSelector((state) => state.countries)
    
    useEffect(() => {
        dispatch(getCountries());
    }, [])
    
    const [errors,setErrors] = useState({})
    
    
    const [input,setInput] = useState({
        name:'',
        difficulty:"",
        duration:'',
        season:'',
        countries:[]
    })
    

    function handleChange(g){
        setInput({
            ...input,
            [g.target.name] : g.target.value
        })
        setErrors(validate({
            ...input,
            [g.target.name]: g.target.value
        }))
    }

    function handleCheck(g){
        if (g.target.checked){
            setInput({
                ...input,
                season: g.target.value
            })
            console.log(input)
        }
        setErrors(validate({
            ...input,
            season: g.target.value
        }))
    }

    function countrySelect(g){
        setInput({
            ...input,
            countries: [...input.countries , g.target.value]
        })
        
    }

    function handleSubmit(g){
        g.preventDefault()
        dispatch(postActivity(input))
        alert("Actividad Creada")
        setInput({
            name:'',
            difficulty:"",
            duration:'',
            season:'',
            countries:[]
        })
    }


    return(
        <div className="contenedor2">
            <form id="form" className="formg" onSubmit={(g) => handleSubmit(g)}>
            <h1>Crear Actividades</h1>
                <div className="group">
                    <label className="letter">Nombre </label>
                    <input required type= 'text' value={input.name} name='name' onChange={handleChange}/>
                    {errors.name && (
                        <p>{errors.name}</p>
                        )}
                </div>
                <div className="group">
                    <label className="letter">Dificultad </label>
                    <input required type= 'range' min="1" max="5" value={input.difficulty} name='difficulty' onChange={handleChange}/>
                    {errors.difficulty && (
                        <p>{errors.difficulty}</p>
                        )}
                </div>
                <div className="group">
                    <h3>Estaciones</h3>
                    <label></label>
                    <label><input required type= 'radio' name="season" value="Verano" onChange={handleCheck}/>Verano</label>
                    <h5></h5>
                    <label><input required type= 'radio' name="season" value="Primavera" onChange={handleCheck}/>Primavera</label>
                    <h5></h5>
                    <label><input required type= 'radio' name="season" value="Otoño" onChange={handleCheck}/>Otoño</label>
                    <h5></h5>
                    <label><input required type= 'radio' name="season" value="Invierno" onChange={handleCheck}/>Invierno</label>
                    
                    <br/>{errors.season && (
                        <p>{errors.season}</p>
                        )}
                </div>
                <div className="group">
                    <label className="letter">Duracion </label>
                    <input required type= 'number' value={input.duration} name='duration' onChange={handleChange}/>
                    {errors.duration && (
                        <p>{errors.duration}</p>
                        )}
                </div>
                <label className="letter">Paises </label>
                <div className="group">
                    <select required onChange={(g) => countrySelect(g)}>
                        {countries.map((con) => (
                            <option key={con.id} value={con.id}>{con.name}</option>
                            ))}
                    </select>

                    <ul>{input.countries.map(g => " - " + g + " - ")}</ul>
                    
                </div>

                <button type= 'submit'>Crear Actividad</button>
                <br/><Link to ='/home'><button>Volver</button></Link>
            </form>
        </div>
    )
}