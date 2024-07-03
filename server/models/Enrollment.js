module.exports = (sequelize, DataTypes) => {

    const Enrollment = sequelize.define('Enrollment', {
        status: {
            type: DataTypes.STRING,
            defaultValue: 'pending'
        }
    });
    
    return Enrollment;
};
  