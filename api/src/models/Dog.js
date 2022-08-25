const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('dog', {
    id: {
       type: DataTypes.UUID,
       defaultValue: DataTypes.UUIDV4,
       allowNull: false,
       primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      //allowNull: false
    },
    height: {
      type: DataTypes.INTEGER,
      //allowNull: false
    },
    weight: {
      type: DataTypes.INTEGER,
      //allowNull: false
    },
    life_span: {
      type: DataTypes.INTEGER,
      //allowNull: false
    },
    image: {
      type: DataTypes.TEXT,
      //allowNull: false
    },
    createdInDb: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
  }, {timestamps: false});
};
