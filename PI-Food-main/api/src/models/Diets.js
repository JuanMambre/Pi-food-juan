const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define(
    'diet',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      Nombre: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
    },
    { timestamps: false }
  );
};
