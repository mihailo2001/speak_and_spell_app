module.exports = (sequelize, DataTypes) => {

    const User = sequelize.define('User', {
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        role: {
            type: DataTypes.STRING,
            defaultValue: 'parent'
        },
        description: DataTypes.TEXT,
    });

    User.associate = (models) => {
        User.hasMany(models.Child, {
            onDelete: 'cascade',
            foreignKey: 'userId'
        });
        User.hasMany(models.Course, {
            onDelete: 'cascade',
            foreignKey: 'userId'
        });
        User.hasMany(models.Payment, {
            onDelete: 'cascade'
        });
        User.hasMany(models.Post, {
            onDelete: 'cascade'
        });
    }

    return User;
}