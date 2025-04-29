const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Club = sequelize.define('Club', {
      nome: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
      },
      telefone: DataTypes.STRING,
      cidade_sede: DataTypes.STRING,
      data_criacao: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowUpdate: false
      }
    }, {
      timestamps: false,
      tableName: 'clubes'
    });
  
    return Club;
  };