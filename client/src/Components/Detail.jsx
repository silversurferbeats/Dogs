import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from  'react-router-dom';
import { useParams } from 'react-router-dom';
import { DetailDog } from '../Redux/Actions/Action';
import './Detail.css';

// +++++++++++++++++++
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { GlassCard } from "./GlassCard";





function Detail(){
    const dispatch = useDispatch();
    const { id } = useParams();
    const detailDogData = useSelector((state) => state.detailDog);
    console.log('detailDogData ->', detailDogData);
    
    useEffect(() => {
        dispatch(DetailDog(id));
    }, [id, dispatch]);

    return (
        <>
        {/* <div className="cardContainerDetail">
            {
                detailDogData?.map((el) => {
                    return (
                        <>
                        <Link key={el.id} to='../home' ><button className="botonSubmit">volver</button></Link>
                        <div  className="containerDetail">
                            <div className="cardDetail">
                                <div className="card-img">
                                    <img src={el.image} alt="card_img"/>
                                </div>
                                <div className="contentDetail">
                                    <h2>{id}</h2>
                                    <h3>{el.name}</h3>
                                    { 
                                        el.temperament.map((e, i) => 
                                            e.name?(
                                                <ul key={i} className="listTemperament">
                                                    <li>{e.name}</li>
                                                </ul>
                                            )
                                            : 
                                            <li key={i} >{e}</li>
                                        )
                                    }
                                    <p className="text-body">Altura: {el.height_max} </p>
                                    <p className="text-body">Peso: {el.weight_min} </p>
                                    <p className="text-body">Años: {el.life_span} </p>
                                </div>

                            </div>
                        </div>
                        </>
                    )
                })
            }
        </div> */}




        {/* ++++++++++++++++++++++ */}

        <div className="cardContainerDetail">
            {
                detailDogData.map((el) => {
                    return (
                        <>
                        <Card sx={{ maxWidth: 500 }}>
                            <GlassCard>
                                <CardActionArea>
                                    <CardMedia
                                    component="img"
                                    height="140"
                                    image={el.image}
                                    alt="green iguana"
                                    />
                                    <CardContent>
                                        <Typography>
                                            <h2>{id}</h2>
                                        </Typography>
                                        <Typography gutterBottom variant="h5" component="div">
                                            {el.name}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {
                                                el.temperament.map((e, i) => {
                                                    return (
                                                        <p key={i} className="temperamentCard">{e}</p>
                                                    )
                                                })
                                            }
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </GlassCard>
                        </Card> 
                        </>
                    )
                })
            }
            <Link to='../home' ><button className="botonSubmit">volver</button></Link>
        </div>



        {/*
        <Card sx={{ maxWidth: 345 }}>
            <CardActionArea>
                <CardMedia
                component="img"
                height="140"
                image={img}
                alt="green iguana"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {
                            temperament.map((e, i) => {
                                return (
                                    <p key={i} className="temperamentCard">{e}</p>
                                )
                            })
                        }
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card> 
        */}

        </>
    )
}

export default Detail;
