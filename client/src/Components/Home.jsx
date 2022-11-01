import React, { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import {useDispatch, useSelector} from 'react-redux';
import { getAllDogs } from '../Redux/Actions/Action';
import { Link } from "react-router-dom";
import Nav from "./Nav";
import './Home.css'
// import BackgroundBubble from './Background';

import Card from "./Card";
import Paginado from "./Paginado";
import Loader from "./Loader";
import { useMediaQuery, useTheme } from "@mui/material";
//PAGINATION MUI
import { Pagination, Box } from '@mui/material';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';




function Home(){

    const dispatch = useDispatch();
    // getteo  el estado global de Redux:
    const AllDogs = useSelector((state) => state.allDogs);

    // PAGINADO:
    const [ currentPage, setCurrentPage ] = useState(1);
    const [ dogPerPage, setDogPerPage ] = useState(8);
    const indexOfLastDog = currentPage * dogPerPage;
    const indexOfFirstDog = indexOfLastDog - dogPerPage;
    const currentDog = AllDogs?.slice(indexOfFirstDog, indexOfLastDog);
    console.log('currentDog --------->',currentDog)


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
        console.log('pageNumber ---->', pageNumber)
        setCurrentPage(pageNumber);
    }

    // new pagination MUI
    const [page, setPage] = React.useState(1);
    const handleChangePage = (event, page) => {
        console.log('handleChangePage ---->', event, page)
        setPage(page);
    };






    //  ------------------>
    const theme = useTheme();
    console.log(theme);
    const isMatch = useMediaQuery(theme.breakpoints.down("md"));
    console.log(isMatch);

    useEffect(()=>{
        dispatch(getAllDogs())
    }, [dispatch]);
    

    return (
        <>
        
        <div>
            <SearchBar />
        </div>

        <div className="bodyContainer">
            {
                isMatch ? 
                (
                    <></>
                ) : (
                    <div className="menuContainer">
                        <Nav />
                    </div>
                )
            }
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
                {/* <button className="buttonPaginado" onClick={e => handleAnterior(e)}>anterior</button>
                <Paginado 
                    dogPerPage={dogPerPage}
                    allDogs={AllDogs.length}
                    paginado={paginado}
                    currentPage={page}
                />
                <button className="buttonPaginado" onClick={e => handleSiguiente(e)}>siguiente</button> */}
                




                
                <Box sx={{width: '100%', display: 'flex', justifyContent: 'center'}}>
                    <Stack spacing={2}>
                        <Typography>Page: {page}</Typography>
                        <Pagination 
                            count={8} 
                            variant="outlined" 
                            color="primary" 
                            onChange={handleChangePage} 
                        />
                    </Stack>
                </Box>
            </div>
        </footer>
        </>
    )
}

export default Home;