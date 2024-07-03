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
    });

    Child.associate = (models) => {
        Child.hasMany(models.Enrollment, {
            onDelete: 'cascade',
        });
    }

    return Child;
}