import React from "react";
import { Link } from  'react-router-dom';
import { 
    useState, 
    useEffect 
} from "react";
import { 
    useDispatch, 
    useSelector 
} from "react-redux";
import './Creation.css';

import { getTemperament } from '../Redux/Actions/Action';
import { postDog } from '../Redux/Actions/Action';



function Creacion(){
    const dispatch = useDispatch();
    const AllTemperament = useSelector((state) => state.temperament)
    
    
    // INICIALIZO VALORES INICIALES INPUT
    const [input, setInput ] = useState({
        name:"",
        image: "",
        temperaments: [],
        height: 0,
        weight: 0,
        life_span: 0
    })

    // inicializacion de rangos input "range":
    const [rangoHp, setRangoHp] = useState(0);
    const [rangoAttack, setRangoAttack] = useState(0);
    const [rangoDefense, setRangoDefense] = useState(0);

    // VALIDACIONES :
    const validation = (input) => {
        let error = {}
        if(input.name.length < 3 || input.name.length > 15) error.name = 'invalid name';
        if(input.image.length < 3 ) error.image = 'invalid image';
        // if(input.temperament.length > 1) error.temperament = 'invalid temperament';
        if(input.height_max < 1 || input.height_max > 100) error.height_max = 'invalid height';
        if(input.weight_min < 1 || input.weight_min > 100) error.weight_min = 'invalid weight';
        if(input.life_span < 1 || input.life_span > 100) error.life_span = 'invalid year';
        return error
    }
    function invalidCreated(input){
        let error = validation(input)
        if(error.name || error.image || error.temperament || error.height_max || error.weight_min || error.life_span) return true
    }
    // ---->
    useEffect(() => {
        dispatch(getTemperament());
    }, [dispatch])


    function handleChange(e){
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }

    function handleTemperament(e){
        if(!input.temperaments.includes(e.target.value)){
            setInput({
                ...input,
                temperaments: [...input.temperaments, e.target.value]
            })
        }
        if(input.temperaments.includes(e.target.value)){
            alert('no se puede elegir el mismo temperamento.');
        }
    }

    function handleSubmit(e){
        e.preventDefault();
        // setInput({...input.name=input.name.toLowerCase()});
        alert('Mascota creada!! Puedes encontrarla en el Home :)');
        setInput({
            name:"",
            image: "",
            temperament: [],
            height_max: 0,
            weight_min: 0,
            life_span: 0
        })
        dispatch(postDog(input));
    }


    return (
        <>
        <Link to='./home' ><button className="botonSubmit">volver</button></Link>
        <h1 className="tituloCreacion">Crea tu mascota</h1>
        <form 
            id='form'
            className="formCreation"
            onSubmit={(e)=>handleSubmit(e)}
        >
            <div>
                <div>
                    <label>Nombre:</label>
                    <input 
                        id='name'
                        className="field"
                        type='text'
                        value={input.name}
                        name='name'
                        onChange={handleChange}
                    />
                    {validation(input).name?<p className="validacionText">invalid name</p>:<p></p>}
                </div>
                <div>
                    <label>Imagen:</label>
                    <input 
                        id='image'
                        className="field"
                        type='text'
                        value={input.image}
                        name='image'
                        onChange={handleChange}
                    />
                    {validation(input).image?<p className="validacionText">invalid image</p>:<p></p>}
                </div>
                <div>
                    <label>Temperamento:</label>
                    <select
                        id='temperament'
                        className="field"
                        onChange={handleTemperament}
                        value={input.temperaments}
                        name='temperaments'
                    >
                        {
                            AllTemperament?.map((el) =>{
                                return (
                                    <option
                                        key={el.id}
                                        // value={el.temperament}
                                        // name='temperament'
                                    >
                                        {el.name}
                                    </option>
                                )
                            })
                        }    
                    </select>
                    {validation(input).temperament?<p className="validacionText">invalid temperament</p>:<p></p>}
                </div>
            </div>

            <div>
                <div>
                    <label>Altura: {rangoHp}</label>
                    <input 
                        id='height'
                        className="field"
                        type='range'
                        value={input.height_max}
                        name='height_max'
                        onInput={(e) => setRangoHp(e.target.value)}
                        onChange={handleChange}
                    />
                    {validation(input).height_max?<p className="validacionText">invalid height</p>:<p></p>}
                </div>
                <div>
                    <label>Peso: {rangoAttack}</label>
                    <input 
                        id='weight'
                        className="field"
                        type='range'
                        value={input.weight_min}
                        name='weight_min'
                        onInput={(e) => setRangoAttack(e.target.value)}
                        onChange={handleChange}
                    />
                    {validation(input).weight_min?<p className="validacionText">invalid weight</p>:<p></p>}
                </div>
                <div>
                    <label>Año: {rangoDefense}</label>
                    <input
                        id='year'
                        className="field"
                        type='range'
                        value={input.life_span}
                        name='life_span'
                        onInput={(e) => setRangoDefense(e.target.value)}
                        onChange={handleChange}
                    />
                    {validation(input).life_span?<p className="validacionText">invalid year</p>:<p></p>}
                </div>

                <button className="botonSubmit" type="submit" disabled={invalidCreated(input)}>Crear Perro</button>
            </div>
        </form>        
        </>
    )
}

export default Creacion;
