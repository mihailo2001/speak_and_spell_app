// models/payment.js
module.exports = (sequelize, DataTypes) => {

    const Payment = sequelize.define('Payment', {
        amount: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false
        },
        status: {
            type: DataTypes.STRING,
            defaultValue: 'unpaid'
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });

    Payment.associate = (models) => {
        Payment.belongsTo(models.User, {
            foreignKey: 'userId',
            allowNull: false
        });
    }
    return Payment;
  };
  