module.exports = (sequelize, DataTypes) => {
    
    const Course = sequelize.define('Course', {
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        weekday: {
            type: DataTypes.STRING,
            allowNull: false
        },
        time: {
            type: DataTypes.TIME,
            allowNull: false
        },
        cost: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });

    Course.associate = (models) => {
        Course.hasMany(models.Enrollment, {
            foreignKey: 'courseId',
            onDelete: 'CASCADE'
        });
        
        Course.belongsTo(models.User, {
            foreignKey: 'userId',
            allowNull: false
        });
    }

    return Course;
  };
  