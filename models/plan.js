module.exports = function(sequelize, DataTypes) {
  var Plan = sequelize.define('Plan', {
    name: DataTypes.STRING
  }, {
    associate: function(models) {
      User.hasMany(models.Plan);
    }
  });
 
  return Plan;
};