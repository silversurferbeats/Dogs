import  {
    GET_ALL_DOG,
    GET_NAME_DOG,
    GET_TEMPERAMENT,
    DETAIL_DOG,
    POST_DOG,
    ORDER_BY_RAZA,
    EXISTENT_DOG,
    PESO_DOG,
    TEMPERAMENT_DOG
}  from "../Actions/Action";

const inicialState = {
    allDogs: [],
    temperament: [],
    detailDog: [],
    allRaza: [],
    selectTemperament: []
}

// REDUCER

const rootReducer = (state = inicialState, action) => {
    switch(action.type){
        case GET_ALL_DOG:
            return {
                ...state,
                allDogs: action.payload,
                allRaza: action.payload,
                selectTemperament: action.payload
            }
        case GET_NAME_DOG:
            return {
                ...state,
                allDogs: action.payload
            }
        case GET_TEMPERAMENT:
            return {
                ...state, 
                temperament: action.payload
            }
        case DETAIL_DOG:
            return {
                ...state,
                detailDog: action.payload
            }
        case POST_DOG:
            return {
                ...state
            }
            
        // FILTROS:
        case ORDER_BY_RAZA:
            let newStateRaza = state.allRaza;
            let sortedArr = action.payload === 'desc' ? 
                newStateRaza.sort(function(a, b){
                    if(a.name > b.name){
                        return 1;
                    }
                    if(b.name > a.name){
                        return -1;
                    }
                    return 0;
                })
                :
                newStateRaza.sort(function (a, b){
                    if(a.name > b.name){
                        return -1;
                    }
                    if(b.name > a.name){
                        return 1;
                    }
                    return 0;
                })
            return {
                ...state,
                allDogs: sortedArr.map(e => e)
            }
        case EXISTENT_DOG:
            let newStateExistent = state.allRaza;
            const filterExistent = action.payload === 'created' ? 
                newStateExistent.filter(el => el.createdInDb)
                :
                newStateExistent.filter(el => !el.createdInDb);
            return{
                ...state,
                allDogs: action.payload === 'all' ? newStateExistent : filterExistent
            }
        case PESO_DOG:
            let newStatePeso = state.allRaza;
            let sortedArrPeso = action.payload === 'menor' ?
                newStatePeso.sort(function(a, b){
                    console.log('sortedArrPeso a ->', a.weight_max)
                    if(a.weight[1] > b.weight[1]){
                        return 1;
                    }
                    if(b.weight[1] > a.weight[1]){
                        return -1;
                    }
                    return 0;
                })
                :
                newStatePeso.sort(function(a, b){
                    if(a.weight[1] > b.weight[1]){
                        return -1;
                    }
                    if(b.weight[1] > a.weight[1]){
                        return 1;
                    }
                    return 0;
                })
                console.log('sortedArrPeso REDUCER ->', sortedArrPeso);
            return {
                ...state,
                allDogs: sortedArrPeso.map(e => e)
            }
        case TEMPERAMENT_DOG:
            let copyDataTemperament = state.selectTemperament;
            //let allTemperamentData = state.temperament;
            console.log('copyDataTemperament REDUCER->', copyDataTemperament);
            const resultTemperamentMap = copyDataTemperament.map(e =>{
                return {
                    id: e.id,
                    image: e.image,
                    name: e.name,
                    temperament: e.temperament?.replace(/\s+/g, '').split(','),
                    weight: e.weight
                }
            });
            const filterTemperament =  resultTemperamentMap.filter((el) => el.temperament?.includes(action.payload));
            console.log('filterTemperament ->>', filterTemperament);
            
            return {
                ...state,
                // allDogs: resultTemperamentMap.filter((el) => el.temperament?.includes(action.payload))
            }
        default: 
            return state;
    }
};

export default rootReducer;


//e.temperament?.replace(/\s+/g, '')
