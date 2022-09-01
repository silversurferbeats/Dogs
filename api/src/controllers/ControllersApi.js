const axios = require('axios');
const { Dog , Temperament } = require('../db');


// TRAIGO  LA INFO DE LA API
const getApi = async () => {
    const getApi = await axios.get("https://api.thedogapi.com/v1/breeds");
    const infoApi = getApi.data.map((response) => {
        return {
            id: response.id,
            name: response.name,
            weight_min: response.weight.metric.split("-"),
            temperament: (response.temperament ? response.temperament.split(',') : ['n/a']).map((e) => e.trim()),
            image: response.image.url
        };
    });
    return infoApi;
};
// -------->

// GET ALL DOGS
const getDogAll = async (req, res) => {
    const { name } = req.query;
    try {
        // API ---------------->
        if (!name) {
            // pido la data de la API
            const ApiInfoData = await getApi()
            
            // Inicio DB: creo el modelo de DB
            const getDb = async () => {
                return await Dog.findAll({
                        include: [{
                        model: Temperament,
                        through: {
                            attribute: [],
                        },
                    }]
                });
            };
            // seteo la data de DB
            let dbInfo = await getDb();
            const dbinfoFinal = dbInfo.map((e) => {
                return {
                    id: e.id,
                    name: e.name,
                    temperament: (e.temperament ? e.temperament.split(',') : ['n/a']).map((e) => e.trim()),
                    height_max: e.height_max,
                    weight_min: e.weight_min, 
                    image: e.image,
                    createdInDb: e.createdInDb
                }
            })
            const informacion = ApiInfoData.concat(dbinfoFinal);
            res.send(informacion);
        } else {
            // CUANDO EXISTE EL NOMBRE :
            const apiUrl2 = await axios.get(`https://api.thedogapi.com/v1/breeds/`);
            const apiInfo2 = apiUrl2.data.filter((e) => e.name.toUpperCase().includes(name.toUpperCase())); // -> filtro la data por el nombre.

            //ACA PIDO EL NOMBRE A LA BASE DE DATOS :
            const nameDog = await Dog.findAll({
                includes: {
                    model: Temperament,
                    attributes: ["name"],
                    through: { temperament: [] },
                },
            });

            // creo el JSON que cincida con el nombre de DB
            const resultName = nameDog.map(e =>{
                return{
                    id: e.id,
                    image: e.image.url,
                    name: e.name,
                    temperament: (e.temperament ? e.temperament.split(',') : ['n/a']).map(e => e.trim()),
                    height_max: e.height_max,
                    height_min: e.height_min,
                    weight_max: e.weight_max,
                    weight_min: e.weight_min,
                }
            })
            console.log('resultName ->', resultName);
            // ACA MAPEO SOLO LO QUE QUIERO DE LA API
            const apiInfo5 = apiInfo2?.map((e) => {
                return {
                    id: e.id,
                    image: e.image.url,
                    name: e.name,
                    temperament: e.temperament? [e.temperament] : "La raza no se encuentra",
                    height_max: e.height.metric.split(" - ").shift(),
                    height_min: e.height.metric.split(" - ").pop(),
                    weight_max: e.weight.metric.split(" - ").shift(),
                    weight_min: e.weight.metric.split(" - ").pop(),
                };
            });

            const getDbAll = [...resultName, ...apiInfo5];
            res.send(getDbAll);
        }
    }catch (e){
        res.send('404', new Error(e))
    }
}

// GET BY ID
const getApiId = async (req, res, next) => {
    const { id } = req.params;
    if(id) {
        if(Number(id)){
            const api_id = await axios.get(`https://api.thedogapi.com/v1/breeds/`);
            // Si tiene id lo filtra de la API
            const api_id1 = api_id.data.filter(e => e.id == [id]);
            const apiResult = api_id1.map(e => {
                return {
                    name: e.name,
                    image: e.image.url,
                    temperament: (e.temperament ? e.temperament.split(',') : ['n/a']).map((e) => e.trim()),
                    life_span: e.life_span,
                    height_min: e.height.metric.split(" - ").shift(),
                    height_max: e.height.metric.split(" - ").pop(),
                    weight_min: e.height.metric.split(" - ").shift(),
                    weight_min: e.height.metric.split(" - ").pop(),
                }
            })
            res.send(apiResult);
        } else {
            // busco los dog en base de dato
            const id_db = await Dog.findAll({//-> aca tengo el error! //-> posivilidades: findOne,  findByPk -> pero devuelve un objeto
                include: [{
                    model: Temperament,
                    attributes: ['name'],
                    through: {
                        attribute: []
                    }
                }]
            });

            const resultFuilterId = id_db.filter(e => e.id == [id]);
            console.log('aca estooy --->', resultFuilterId)
            // let DbInfoId = await id_db;
            const DbInfoFinalId = resultFuilterId.map((e) => {
                return {
                    id: e.id,
                    name: e.name,
                    temperament: (e.temperament ? e.temperament.split(',') : ['n/a']).map((e) => e.trim()),
                    height_max: e.height_maxm,
                    image: e.image,
                    createdInDb: e.createdInDb
                }
            })

            // Pusheo el objeto a un array para poder devolver con el FindOne -> basicamente lo transformo
            // let arrDB = Objet.sntries(id_db)
        
            res.send(DbInfoFinalId);
        }
    } else {
        res.send({ e: 'error'});
    }
}

// POST DOGS
const postDog = async (req, res) => {
    const { name, height_max, weight_min, life_span, temperaments, image } = req.body;
    try {
        const createDogPost = await Dog.create({
            name,
            height_max,
            weight_min,
            life_span,
            image
        })

        let temperamentDB = await Temperament.findAll({
            where: {name: temperaments}
        })

        createDogPost.addTemperament(temperamentDB);
        res.status(201).send(createDogPost);

    } catch(e){
        console.log("error al enviar post ->",e);
    }
}

// GET TEMPERAMETS
const getTemperamets = async () => {
    const apiInfoget = await getApi()
    const filtro = apiInfoget.map((t) => t.temperament); // por cada temperamento lo guardo separado
    // let tempFilt = [...new Set(filtro)]// hago un nuevo array con los temperamentos que tenia guardados y los nuevos, si se repiten se quitan
    const tempEnd = filtro.flat().filter((i, e, a) => a.indexOf(i) === e);
    // console.log('tempEnd ->', tempEnd);
    
    // AGREGO EL ARRAY DE TEMPERAMENTOS A LA BASE DE DATOS
    //  tempFilt.forEach((e) => {
    //   Temperament.findOrCreate({
    //     where: {temperament:e},
    //   });
    // });

    await Temperament.bulkCreate(tempEnd.map(e => {
        return {
            name: e
        }
    }))




    // if (!(await Temperament.findAll()).length) {
    //   try {
    //     // const apiTemp = await tempUrl.data?.map((e) => e.temperament? e.temperament : ['not temperament'])
    //     //   .toString()
    //     //   .trim()
    //     //   .split(",");
    //     const apiInfoget = await getApi()
    //       const filtro = apiInfoget.map((t) => t.temperament); // por cada temperamento lo guardo separado
    //       // let tempFilt = [...new Set(filtro)]// hago un nuevo array con los temperamentos que tenia guardados y los nuevos, si se repiten se quitan
    //       const tempEnd = filtro.flat().filter((i, e, a) => a.indexOf(i) === e);
    //       console.log('tempEnd ->', tempEnd);
    //     // AGREGO EL ARRAY DE TEMPERAMENTOS A LA BASE DE DATOS
    //     //  tempFilt.forEach((e) => {
    //     //   Temperament.findOrCreate({
    //     //     where: {temperament:e},
    //     //   });
    //     // });

    //     await Temperament.bulkCreate(tempEnd.map(e => {
    //         return {
    //             name: e
    //         }
    //     }))




    //     // Para cada e del arrayDeTemp traido de la api hace un findOrCreate al modelo Temperament donde name sea ahora sea cada temperamento(e)

    //     // const db = await Temperament.findAll();
    //     // res.send(db);
    //   } catch (e) {
    //     console.log(e);
    //   }
    // } else {
    // //   res.send({ message: "Temperamento no encontrado" });
    // console.log('temperamento no encontrado.')
    // }
};
getTemperamets()

const funcionTemperament = async (req, res) => {
    let dbTemp = await Temperament.findAll({})
    res.send(dbTemp)
}

module.exports = {
    getDogAll,
    getApiId,
    // getTemperamets,
    funcionTemperament,
    postDog
};
