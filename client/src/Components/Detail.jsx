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
    console.log('id DETAIL ->', id);
    const detailDogData = useSelector((state) => state.detailDog);
    // const { name, image, temperaments, height_max, weight_min, life_span } = useSelector((state) => state.detailDog);
    console.log('detailDogData ->', detailDogData);

    useEffect(() => {
        dispatch(DetailDog(id));
        console.log("se mando");
    }, [id, dispatch]);

    return (
        <>
        
        <div className="cardContainerDetail">
            {
                detailDogData?.map((el) => {
                    return (
                        <>
                        <Link key={el.id} to='../home' ><button className="botonSubmit">volver</button></Link>
                        <div  className="containerDetail">
                            <div className="cardDetail">
                                <div className="card-img">
                                    <img src={el.image} />
                                </div>
                                <div className="contentDetail">
                                    <h2>{id}</h2>
                                    <h3>{el.name}</h3>
                                    {/* { 
                                        el.temperament.map(e => 
                                            e.name?(
                                                <ul className="listTemperament">
                                                    <li>{e.name}</li>
                                                </ul>
                                            )
                                            : 
                                            <li>{e}</li>
                                        )
                                    } */}
                                    
                                    {/* <p>{el.temperament}</p> */}
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
        </div>
        </>
    )
}

export default Detail;



{/* <div class="cardDetail">
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
</div> */}