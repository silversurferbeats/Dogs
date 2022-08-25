import React from "react";
import './Card.css';
function Card({name, temperament, img}) {

    return (
        <div className="card">
            <img src={img} alt='img'/>
            <div className="contenidoCard">
                <h3 className="nombre_card">{name}</h3>
                <h5>{temperament}</h5>
            </div>
        </div>
    )
}

export default Card;