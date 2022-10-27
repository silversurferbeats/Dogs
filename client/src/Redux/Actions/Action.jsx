import axios from 'axios';
//export type ->
export const GET_ALL_DOG = 'GET_ALL_DOG';
export const GET_NAME_DOG = 'GET_NAME_DOG';
export const GET_TEMPERAMENT = 'GET_TEMPERAMENT';
export const POST_DOG = 'POST_DOG';
export const DETAIL_DOG = 'DETAIL_DOG';
//SSELECTORES filtros->
export const ORDER_BY_RAZA = 'ORDER_BY_RAZA';
export const EXISTENT_DOG = 'EXISTENT_DOG';
export const PESO_DOG = 'PESO_DOG';
export const TEMPERAMENT_DOG = 'TEMPERAMENT_DOG';


// GET ALL DOGS
export function getAllDogs(){
    return async function(dispatch){
        let json = await axios.get('/dogs');
        return dispatch({
            type: 'GET_ALL_DOG',
            payload: json.data
        })
    }
}

// BUSCADOR SEARCHBAR
export function getNameDog(name){
    return async function(dispatch){
        try {
            let jsonName = await axios.get(`/dogs?name=${name}`);
            return dispatch({
                type: 'GET_NAME_DOG',
                payload: jsonName.data
            })
        } catch(e){
            console.log(e);
        }
    }
}

// DETALLES DOG
export function DetailDog(id){
    return async function(dispatch){
        try {
            let dataDetail = await axios.get(`/dogs/${id}`);
            console.log('dataDetail', dataDetail)
            return dispatch({
                type: 'DETAIL_DOG',
                payload: dataDetail.data
            })
        } catch(e){
            console.log(e)
        }
    }
}

// TEMPERAMENTO DEL SELECT FORMULARIO DE CREACION
export const getTemperament = () => {
    return async function(dispatch){
        try {
            let urlTemperament = await axios.get('/temperament');
            return dispatch({
                type: 'GET_TEMPERAMENT',
                payload: urlTemperament.data
            })
        } catch(e){
            console.log(e);
        }
    }
}

// POST CREACION
export function postDog(payload){
    return async function(dispatch){
        try{
            const responsePost = await axios.post('/dogs', payload);
            return dispatch({
                type: 'POST_DOG',
                payload: responsePost
            })
        } catch(e){
            console.log(e)
        }
    }
}







// FILTROS ->
 
export function orderByRaza(payload){
    return {
        type: 'ORDER_BY_RAZA',
        payload
    }

}

export function orderPeso(payload){

    return {
        type: 'PESO_DOG',
        payload
    }
}

export function orderExistent(payload){
    return {
        type: 'EXISTENT_DOG',
        payload
    }
}

export function orderTemperament(payload){
    return {
        type: 'TEMPERAMENT_DOG',
        payload
    }
}