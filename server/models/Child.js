module.exports = (sequelize, DataTypes) => {

    const Child = sequelize.define('Child', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        birthdate: {
            type: DataTypes.DATE,
            allowNull: false
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });
    
    Child.associate = (models) => {
        Child.belongsTo(models.User, {
            foreignKey: 'userId',
            allowNull: false
        });
        Child.hasMany(models.Enrollment, {
            onDelete: 'cascade',
        });
    }

    return Child;
}