module.exports = function(sequelize, DataTypes) {
  var Item = sequelize.define('Item', {
    name: DataTypes.STRING
  }, {
    associate: function(models) {
      User.hasMany(models.Plan)
    }
  });
 
  return Plan;
};