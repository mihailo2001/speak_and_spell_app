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
        postId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });

    File.associate = function(models) {
      File.belongsTo(models.User, { as: 'Uploader', foreignKey: 'uploadedBy' });
    };
    
    return File;
  };
  