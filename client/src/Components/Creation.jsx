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
        temperament: "",
        height: 0,
        weight: 0,
        life_span: 0
    })

    // inicializacion de rangos input "range":
    const [rangoHp, setRangoHp] = useState(0);
    const [rangoAttack, setRangoAttack] = useState(0);
    const [rangoDefense, setRangoDefense] = useState(0);
    const [ temperamentoActual, setTemperamentoActual ] = useState('');

    useEffect(() => {
        dispatch(getTemperament());
    }, [dispatch])


    function handleChange(e){
        console.log('valor input-->', input)
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }

    function handleSubmit(e){
        e.preventDefault();
        // setInput({...input.name=input.name.toLowerCase()});
        alert('personaje creado');
        setInput({
            name:"",
            image: "",
            temperament: "",
            height: 0,
            weight: 0,
            life_span: 0
        })
        dispatch(postDog(input));
        //useHistory.push('/home');
    }

    // let validateName = /^[a-zA-Z\s]+$/;
    // let validateUrl = /(http(s?):)([/|.|\w|\s|-])*.(?:jpg|gif|png)/;

    return (
        <>
        <Link to='./home' ><button className="botonSubmit">volver</button></Link>
        <h1 className="tituloCreacion">Crea tu mascota</h1>
        <form 
            className="formCreation"
            onSubmit={(e)=>handleSubmit(e)}
        >
            <div>
                <div>
                    <label>Nombre:</label>
                    <input 
                        className="field"
                        type='text'
                        value={input.name}
                        name='name'
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Imagen:</label>
                    <input 
                        className="field"
                        type='text'
                        value={input.image}
                        name='image'
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Temperamento:</label>
                    <select
                        className="field"
                        
                        onChange={handleChange}
                    >
                        {
                            AllTemperament?.map((el) =>{
                                return (
                                    <option
                                        key={el.id}
                                        name='temperament'
                                        value={el.temperament}
                                        name='temperament'
                                    >
                                        {el.temperament}
                                    </option>
                                )
                            })
                        }    
                    </select>
                </div>
            </div>

            <div>
                <div>
                    <label>Altura: {rangoHp}</label>
                    <input 
                        className="field"
                        type='range'
                        value={input.height}
                        name='height'
                        onInput={(e) => setRangoHp(e.target.value)}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Peso: {rangoAttack}</label>
                    <input 
                        className="field"
                        type='range'
                        value={input.weight}
                        name='weight'
                        onInput={(e) => setRangoAttack(e.target.value)}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Año: {rangoDefense}</label>
                    <input
                        className="field"
                        type='range'
                        value={input.life_span}
                        name='life_span'
                        onInput={(e) => setRangoDefense(e.target.value)}
                        onChange={handleChange}
                    />
                </div>
          
                <button className="botonSubmit" type="submit">Crear Personaje</button>
            </div>
        </form>
        </>
    )
}

export default Creacion;




// Ruta de creación de raza de perro: debe contener

    // [ ] Un formulario controlado con JavaScript con los siguientes campos:
    // Nombre -> ESTRING
    // Altura (Diferenciar entre altura mínima y máxima) -> NUMBER
    // Peso (Diferenciar entre peso mínimo y máximo) -> NUMBER
    // Años de vida -> NUMBER

    // [ ] Posibilidad de seleccionar/agregar uno o más temperamentos -> SELECT CON TEMPERAMENTOS

    // [ ] Botón/Opción para crear una nueva raza de perro -> STRING?
    // validaciones =>
    // Es requisito que el formulario de creación esté validado con JavaScript y no sólo con validaciones HTML. Pueden agregar las validaciones que consideren. 
    
    // Por ejemplo: Que el nombre de la raza no pueda contener números o símbolos, que el peso/altura mínimo no pueda ser mayor al máximo y viceversa, etc.
