import React from "react";
import '../Estilos/Card.css'

export default function Card ({name, img, continents}) {
    return (
        <div className="Card1">
            <div className="countrydiv">
                <div className="image">
                    <img src={img} alt= 'img not found' />
                </div>
                <h3 className="name1">{name}</h3>

                <h4>{continents}</h4>
            </div>
        </div>
    )
}