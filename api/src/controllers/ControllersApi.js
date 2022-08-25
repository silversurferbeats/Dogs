const axios = require('axios');
const { Dog , Temperament } = require('../db');

// GET ALL DOGS
const getDogAll = async (req, res) => {
    const { name } = req.query;

    try {
        // API ---------------->        
        if (!name) {
            
            const getApi = async () => {
                const getApi = await axios.get("https://api.thedogapi.com/v1/breeds");
                const infoApi = getApi.data.map((response) => {
                    return {
                    id: response.id,
                    name: response.name,
                    weight: response.weight.metric.split("-"),
                    temperament: response.temperament,
                    image: response.image.url,
                    };
                });
                return infoApi;
            };
              
            const getDb = async () => {
            return await Dog.findAll({
                include: {
                model: Temperament,
                attribute: {
                    include: ["name"],
                },
                through: {
                    attribute: [],
                },
                },
            });
            };
            
            let apiInfo = await getApi();
            let dbInfo = await getDb();
            const informacion = apiInfo.concat(dbInfo);
            res.send(informacion);

        } else {
            
            // cuando el nombre existe
            // ACA EMPIEZA EL GET BY NAME
            const apiUrl2 = await axios.get(`https://api.thedogapi.com/v1/breeds/`);
            const apiInfo2 = apiUrl2.data.filter((e) => e.name.toUpperCase().includes(name.toUpperCase()));
            
            //ACA PIDO EL NOMBRE A LA BASE DE DATOS
            const nameDog = await Dog.findAll({
                // where: {
                //     name: {
                //         [Op.iLike]: `%${name}%`,
                //     },
                // },
                includes: {
                    model: Temperament,
                    attributes: ["name"],
                    through: { temperament: [] },
                },
            });

            const resultName = nameDog.map(e =>{//map para que los temperamentos los traiga en array pero por name
                return{
                    id: e.id,
                    image: e.image.url,
                    name: e.name,
                    temperament: e.Temperaments?.map(n => n.name),
                    height_max: e.height_max,
                    height_min: e.height_min,
                    weight_max: e.weight_max,
                    weight_min: e.weight_min,
                }
            })

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
            
            const api_id1 = api_id.data.filter(e => e.id == [id]);
            const apiResult = api_id1.map(e => {
                return {
                    name: e.name,
                    image: e.image.url,
                    temperament: e.temperament,
                    life_span: e.life_span,
                    height_min: e.height.metric.split(" - ").shift(),
                    height_max: e.height.metric.split(" - ").pop(),
                    weight_min: e.height.metric.split(" - ").shift(),
                    weight_min: e.height.metric.split(" - ").pop(),
                }
            })
            res.send(apiResult);
        } else {
            const id_db = await Dog.findOne({
                includes: {
                    model: Temperament,
                },
            });
            res.send(id_db);
        }
    } else {
        res.send({ e: 'error'});
    }
}

// POST DOGS
const postDog = async (req, res) => {
    const { name, height, weight, life_span, temperament, image } = req.body;
    try {


        const payloadDog = {
            name,
            height,
            weight,
            life_span,
            //temperament: temperament,
            image,
            createdInBd: true,
        };

        const newDog = await Dog.create(payloadDog)
        
        //console.log('esto es el perro creado ->',newDog )
        // const tempID = await Temperament.findAll({
        //     where: {name: temperament},
        //     attributes: ['id'],
        // })
        //newDog.addTemperaments(tempID);
        res.status(201).send(newDog);

    } catch(e){
        console.log("error al enviar post ->",e);
    }
}

// GET TEMPERAMETS 
const getTemperamets = async (req, res) => {
    const tempUrl = await axios.get(`https://api.thedogapi.com/v1/breeds`);
    // console.log('temperament desde la api -->', tempUrl.data.temperament);

    if (tempUrl) {
      try {
        const apiTemp = await tempUrl.data?.map((e) => e.temperament)
          .toString() 
          .trim() 
          .split(","); 
          const filtro = apiTemp.filter((t) => t); // por cada temperamento lo guardo separado
          let tempFilt = [...new Set(filtro)]// hago un nuevo array con los temperamentos que tenia guardados y los nuevos, si se repiten se quitan
        // AGREGO EL ARRAY DE TEMPERAMENTOS A LA BASE DE DATOS
         tempFilt.forEach((e) => {
          Temperament.findOrCreate({
            where: { temperament:e},
          });
        }); 
        // Para cada e del arrayDeTemp traido de la api hace un findOrCreate al modelo Temperament donde name sea ahora sea cada temperamento(e)
        const db = await Temperament.findAll();
        res.send(db);
      } catch (e) {
        console.log(e);
      }
    } else {
      res.send({ message: "Temperamento no encontrado" });
    }
};

module.exports = {
    getDogAll,
    getApiId,
    getTemperamets,
    postDog
};
