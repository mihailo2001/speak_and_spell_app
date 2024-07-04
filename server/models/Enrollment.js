module.exports = (sequelize, DataTypes) => {

    const Enrollment = sequelize.define('Enrollment', {
        status: {
            type: DataTypes.STRING,
            defaultValue: 'pending'
        },
        childId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        courseId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });
    
    Enrollment.associate = (models) => {
        Enrollment.belongsTo(models.Child, {
            foreignKey: 'childId',
            allowNull: false
        });
        Enrollment.belongsTo(models.Course, {
            foreignKey: 'courseId',
            allowNull: false
        });
    };


    return Enrollment;
};
  