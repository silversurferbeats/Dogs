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
        //console.log('se mando el handleSort');
    }

    function handleExistent(e){
        e.preventDefault();
        dispatch(orderExistent(e.target.value));
        //console.log('se mando handleExistent');
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
            <li><lavel>ordenamiento: </lavel><select 
                    className='selectMenu'
                    onClick={e => handleSort(e)}
                > 
                <option className='optionMenu' value='asc'> Ascendente </option>
                <option className='optionMenu' value='desc'> Descendente </option> 
            </select></li>

            <li><lavel>peso: </lavel><select
                    className='selectMenu'
                    onClick={e => handlePeso(e)}
                > 
                <option className='optionMenu' value='mayor'> Mayor Peso </option>
                <option className='optionMenu' value='menor'> Menor Peso </option>
            </select></li>

            <li><lavel>existentes: </lavel><select
                    className='selectMenu'
                    onClick={e => handleExistent(e)}
                > 
                <option className='optionMenu' value='all'>todos</option>
                <option className='optionMenu' value='created'>creado</option>
                <option className='optionMenu' value='existing'>existente</option> 
            </select></li>

            <li>
                <label>Temperamento: </label>
                <select
                    className='selectMenu'
                    onChange={handleChange}
                    onClick={e => handleTemperament(e)}
                    name='temperament'
                >
                    {
                        AllTemperament?.map((el) =>{
                            return (
                                <option
                                    className='optionMenu'
                                    key={el.id}
                                    name='temperament'
                                    value={el.temperament}
                                >
                                    {el.temperament}
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