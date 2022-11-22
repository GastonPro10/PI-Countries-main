import React from "react";
import { Link } from "react-router-dom";
import '../Estilos/LandingPage.css'
import style from "../Estilos/LandingPage.css"

export default function LandingPage(){
    return(
        <div>
        <div className="fondo">
            <h1 className="text1">Country</h1>
            <h1 class="text2">Página diseñada para conocer sobre <br /> los paises del mundo</h1>
            <Link to = '/home'>
                <button className= 'boton1'>Iniciar</button>
            </Link>
        </div>
        </div>
    )
}