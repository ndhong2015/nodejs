'use strict';
module.exports = (sequelize, DataTypes) => {
  var OrderDetail = sequelize.define('OrderDetail', {
    quantity: DataTypes.INTEGER,
    price: DataTypes.DECIMAL
  }, {});
  OrderDetail.associate = function(models) {
    // associations can be defined here
    OrderDetail.belongsTo(models.Product);
    OrderDetail.belongsTo(models.Order);
  };
  return OrderDetail;
};