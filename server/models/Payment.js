// models/payment.js
module.exports = (sequelize, DataTypes) => {

    const Payment = sequelize.define('Payment', {
        amount: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },
        month: {
            type: DataTypes.DATE,
            allowNull: false
        },
        status: {
            type: DataTypes.STRING,
            defaultValue: 'unpaid'
        }
    });
    
    return Payment;
  };
  