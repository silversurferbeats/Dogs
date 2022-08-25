import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from  'react-router-dom';
import { useParams } from 'react-router-dom';
import { DetailDog } from '../Redux/Actions/Action';
import './Detail.css';

function Detail(){
    const dispatch = useDispatch();
    const { id } = useParams();
    console.log('estamos aca ->>', id);
    const detailDogData = useSelector((state) => state.detailDog);

    useEffect(() => {
        dispatch(DetailDog(id));
    }, [dispatch]);

    return (
        <>
        <Link to='../home' ><button className="botonSubmit">volver</button></Link>
        <div className="cardContainerDetail">
            {
                detailDogData?.map((el) => {
                    return (
                        <div class="cardDetail">
                            <div class="card-img">
                                <img src={el.image} />
                            </div>
                            <div class="card-info">
                                <p class="text-title"> {el.name} </p>
                                <p class="text-body">Temperamento: {el.temperament} </p>
                                <p class="text-body">Altura: {el.height_max} </p>
                                <p class="text-body">Peso: {el.weight_min} </p>
                                <p class="text-body">Años: {el.life_span} </p>
                            </div>
                        </div>
                    )
                })
            }
        </div>
        </>
    )
}

export default Detail;
