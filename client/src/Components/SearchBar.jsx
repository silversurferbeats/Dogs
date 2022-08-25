import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { FaSearch } from "react-icons/fa"; // instalar react icon!
import { Link } from 'react-router-dom';
import { getNameDog } from '../Redux/Actions/Action';
import './SearchBar.css';
import img from '../Assets/logoDog4.png';

function SearchBar(){
    const dispatch = useDispatch();

    const [name, setName] = useState('');

    function hanldeInputChange(e){
        e.preventDefault()
        setName(e.target.value)
        console.log('esto es lo que busco ->',name)
    }

    function handleSubmit(e){
        e.preventDefault();
        dispatch(getNameDog(name));
    }

    return (
        <>
            <nav>
                <div>
                    <img className="logo" src={img} alt='logoDogs' />
                </div>
                <ul className="menu">
                    <form 
                        className="formSearch"
                        onClick={(e) => handleSubmit(e)}
                        target="_blank"
                    >
                        <input 
                            type='text' 
                            placeholder='Buscar...'  
                            onChange={(e) => hanldeInputChange(e)}
                        />
                        
                        <button 
                            className="botonNav" 
                            type='submit' 
                            onSubmit={(e) => handleSubmit(e)}
                        ><span><FaSearch/></span>Buscar</button>
                    </form>
                    <Link to={'./creation'}>
                        <button className="botonNav">
                            Crea tu cachorro
                        </button>
                    </Link>
                </ul>
            </nav>
        </>
    )
}
export default SearchBar;