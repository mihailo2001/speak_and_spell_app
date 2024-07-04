module.exports = (sequelize, DataTypes) => {

    const File = sequelize.define('File', {
        filename: {
            type: DataTypes.STRING,
            allowNull: false
        },
        filepath: {
            type: DataTypes.STRING,
            allowNull: false
        },
    });
    
    return File;
  };
  