module.exports = function(sequelize, DataTypes) {
  var User= sequelize.define('User', {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    nickname: DataTypes.STRING
  }, {
    associate: function(models) {
      models.Plan.belongsTo(User);
    }
  });
  return User;
};