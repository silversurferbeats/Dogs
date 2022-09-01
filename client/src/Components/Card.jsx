import React from "react";
import './Card.css';
function Card({name, temperament, img}) {
    return (
        <div className="card">
            <img src={img} alt='img'/>
            <div className="contenidoCard">
                <div>
                    <h3 className="nombre_card">{name}</h3>
                </div>
                {
                    temperament.map(e => {
                        return (
                            <p className="temperamentCard">{e}</p>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Card;

{/* <option hidden disabled selected value>Order by</option> */}
// ::-webkit-calendar-picker-indicator { background: orange; }