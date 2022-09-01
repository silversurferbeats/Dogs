import React, { useState, useEffect } from "react";
import './Nav.css';
import { useDispatch, useSelector } from 'react-redux';
import { 
    orderByRaza, 
    orderExistent,
    orderPeso,
    orderTemperament
} from '../Redux/Actions/Action';
import { getTemperament } from '../Redux/Actions/Action';


function Nav(){
    const dispatch = useDispatch();
    const AllTemperament = useSelector((state) => state.temperament);
    const [input, setInput] = useState('');


    // FILTROS ->
    function handleChange(e){
        e.preventDefault()
        console.log('valor input-->', input)
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }

    function handleSort(e){
        e.preventDefault();
        dispatch(orderByRaza(e.target.value))
    }

    function handleExistent(e){
        e.preventDefault();
        dispatch(orderExistent(e.target.value));
        console.log('se mando handleExistent');
    }

    function handlePeso(e){
        e.preventDefault();
        dispatch(orderPeso(e.target.value))
        console.log('se mando el handlePeso')
    }

    function handleTemperament(e){
        e.preventDefault();
        dispatch(orderTemperament(e.target.value));
        console.log('se mando el HandleTemperamen!! ->')
    }


    useEffect(() => {
        dispatch(getTemperament());
    }, [dispatch])

    return (
        <ul className="ulMenu">
            <li><label className="lavelMenu" >ordenamiento: </label><select 
                    className='selectMenu'
                    onChange={handleSort}
                > 
                <option className='optionMenu' value='asc'> Ascendente </option>
                <option className='optionMenu' value='desc'> Descendente </option> 
            </select></li>

            <li><label className="lavelMenu">peso: </label><select
                    className='selectMenu'
                    onChange={handlePeso}
                > 
                <option className='optionMenu' value='mayor'> Mayor Peso </option>
                <option className='optionMenu' value='menor'> Menor Peso </option>
            </select></li>

            <li><label className="lavelMenu">existentes: </label><select
                    className='selectMenu'
                    onChange={handleExistent}
                > 
                <option className='optionMenu' value='all'>todos</option>
                <option className='optionMenu' value='created'>creado</option>
                <option className='optionMenu' value='existing'>existente</option> 
            </select></li>

            <li>
                <label className="lavelMenu">Temperamento: </label>
                <select
                    className='selectMenu'
                    onChange={handleTemperament}
                    // onClick={e => handleTemperament(e)}
                    name='temperament'
                >
                    <option value='all'>all</option>
                    {
                        AllTemperament?.map((el) =>{

                            return (

                                <option
                                    className='optionMenu'
                                    key={el.id}
                                    name='temperament'
                                    value={el.name}
                                >
                                    {el.name}
                                </option>
                            )
                        })
                    }    
                </select>
            </li>
        </ul>

        
    )
}
export default Nav;