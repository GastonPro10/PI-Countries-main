import React from "react";
import '../Estilos/Paginado.css'

export default function Paginado({countryPerPage, allCountries, paginado}){
    const pageNumbers = []
    
    for (let i=1; i<=Math.ceil(allCountries/countryPerPage); i++){
        pageNumbers.push(i)
    }

    return (
        <nav>
            <ul className="paginado">
                {pageNumbers && pageNumbers.map(number =>(
                    <li className="number" key= {number}>
                        <a className="numbera" onClick={() => paginado(number)}>{number}</a>
                    </li>
                ))}
            </ul>
        </nav>
    )
}