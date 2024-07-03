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
        }
    });

    User.associate = (models) => {
        User.hasMany(models.Child, {
            onDelete: 'cascade',
        });

        User.hasMany(models.Course, {
            onDelete: 'cascade',
        });

        User.hasMany(models.Payment, {
            onDelete: 'cascade',
        });

        User.hasMany(models.Post, {
            onDelete: 'cascade',
        });
    }

    return User;
}