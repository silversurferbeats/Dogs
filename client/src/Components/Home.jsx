import React, { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import {useDispatch, useSelector} from 'react-redux';
import { getAllDogs } from '../Redux/Actions/Action';
import { Link } from "react-router-dom";
import Nav from "./Nav";
import './Home.css'

import Card from "./Card";
import Paginado from "./Paginado";
import Loader from "./Loader";

function Home(){

    const dispatch = useDispatch();
    // geteo  el estado global de Redux:
    const AllDogs = useSelector((state) => state.allDogs);
    // console.log('useSelector ->', AllDogs);

    // PAGINADO:
    const [ currentPage, setCurrentPage ] = useState(1);
    const [ dogPerPage, setDogPerPage ] = useState(8);
    const indexOfLastDog = currentPage * dogPerPage;
    const indexOfFirstDog = indexOfLastDog - dogPerPage;
    const currentDog = AllDogs?.slice(indexOfFirstDog, indexOfLastDog);

    const handleAnterior = (e) => {
        e.preventDefault();
        if (currentPage > 1){
            setCurrentPage(currentPage - 1);
        }
    }

    const handleSiguiente = (e) => {
        e.preventDefault();
        let ValorPagina = Math.ceil(AllDogs.length / dogPerPage);
        if(ValorPagina !== currentPage){
            setCurrentPage(currentPage + 1);
        }
    }

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber);
    }
    //  ------------------>

    useEffect(()=>{
        dispatch(getAllDogs())
    }, [dispatch]);

    return (
        <>
        <div>
            <SearchBar />
        </div>
        <div className="bodyContainer">
            <div className="menuContainer">
                <Nav />
            </div>
            <div className="cardContainer">
                {
                    currentDog.length ?
                    currentDog?.map((el) => {
                        return (
                            <div key={el.id}>
                                <Link to={'/detail/' + el.id}>
                                    <Card  
                                        id={el.id} 
                                        name={el.name} 
                                        temperament={el.temperament} 
                                        img={el.image} 
                                    />
                                </Link>
                            </div>
                        )
                    })
                    :
                    <div className="Loader">
                        <Loader/>
                    </div>
                }
            </div>
        </div>

        <footer>
            <div>
                <button onClick={e => handleAnterior(e)}>anterior</button>
                <Paginado 
                    dogPerPage={dogPerPage}
                    allDogs={AllDogs.length}
                    paginado={paginado}
                    currentPage={currentPage}
                />
                <button onClick={e => handleSiguiente(e)}>siguiente</button>
            </div>
        </footer>
        </>
    )
}

export default Home;