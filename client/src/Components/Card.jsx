import React from "react";
import './Card.css';

// ++++++++++

// import Card from '@mui/material/Card';

// import CardContent from '@mui/material/CardContent';
// import CardMedia from '@mui/material/CardMedia';
// import Typography from '@mui/material/Typography';
// import { CardActionArea } from '@mui/material';




function Card({name, temperament, img}) {
    return (
        <div className="card">
            <img src={img} alt='img'/>
            <div className="contenidoCard">
                <div>
                    <h3 className="nombre_card">{name}</h3>
                </div>
                {
                    temperament.map((e, i) => {
                        return (
                            <p key={i} className="temperamentCard">{e}</p>
                        )
                    })
                }
            </div>
        </div>



        // <Card sx={{ maxWidth: 345 }}>
        //     <CardActionArea>
        //         <CardMedia
        //         component="img"
        //         height="140"
        //         image={img}
        //         alt="green iguana"
        //         />
        //         <CardContent>
        //             <Typography gutterBottom variant="h5" component="div">
        //                 {name}
        //             </Typography>
        //             <Typography variant="body2" color="text.secondary">
        //                 {
        //                     temperament.map((e, i) => {
        //                         return (
        //                             <p key={i} className="temperamentCard">{e}</p>
        //                         )
        //                     })
        //                 }
        //             </Typography>
        //         </CardContent>
        //     </CardActionArea>
        // </Card>
    )
}

export default Card;

{/* <option hidden disabled selected value>Order by</option> */}
// ::-webkit-calendar-picker-indicator { background: orange; }