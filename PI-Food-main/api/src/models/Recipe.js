const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('recipe', {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    Nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Descripcion: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    NivelDeSalud: {
      type: DataTypes.INTEGER,
      validate: {
        min: 0,
        max: 10,
      },
    },
    Pasos: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  });
};
