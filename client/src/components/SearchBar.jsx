import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getNameCountry } from "../actions";
import '../Estilos/SearchBar.css'

export default function SearchBar () {
    const dispatch = useDispatch();
    const [name,setName] = useState("")

    function handleInputChange(g){
        g.preventDefault()
        setName(g.target.value)
        
    }

    function handleSubmit(g){
        g.preventDefault()
        dispatch(getNameCountry(name))
    }

    return (
        <div className="Banner4">
            <input className="input5" type= "text" placeholder="Buscar.." onChange={handleInputChange}/>
            <button className="button5" type="submit" onClick={(g) => handleSubmit(g)}>Buscar</button>
        </div>
    )
}