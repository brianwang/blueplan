///**
// * New node file
// */
//var orm = require('orm');
//var connstr = "mysql://root:9dYt?1/I@localhost/blueplan"; 
//orm.connect(connstr, function (err, db) {
//	  if (err) throw err;
//	    var Plan= db.define("plan", {
//	    	id: long,
//	        name      : String,
//	        age       : Number,
//	        male      : Boolean,
//	        continent : [ "Europe", "America", "Asia", "Africa", "Australia", "Antartica" ], // ENUM type
//	        photo     : Buffer, // BLOB/BINARY
//	        data      : Object // JSON encoded
//	    }, {
//	        methods: {
//	            fullName: function () {
//	                return this.name + ' ' + this.surname;
//	            }
//	        },
//	        validations: {
//	            age: orm.enforce.ranges.number(18, undefined, "under-age")
//	        }
//	    });
//});

var Sequelize = require('sequelize')
        , sequelize = new Sequelize('blueplan', 'root', '9dYt?1/I', {
            dialect: "mysql", // or 'sqlite', 'postgres', 'mariadb'
            port: 3306, // or 5432 (for postgres)
        });


var User = sequelize.define('User', {
  username: Sequelize.STRING,
  password: Sequelize.STRING,
  nickname: Sequelize.STRING
});
var Plan = sequelize.define('Plan',{
    name: Sequelize.STRING
});
var Item = sequelize.define('Item',{
    text: Sequelize.STRING,
    sid: Sequelize.BIGINT
});

User.hasMany(Plan);
Plan.belongsTo(User);
Plan.hasMany(Item);
Item.belongsTo(Plan);

sequelize
        .sync({ force: true })
        .complete(function(err) {
            if (!!err) {
                console.log('Unable to connect to the database:', err);
            } else {
                console.log('Connection has been established successfully.');
            }
        });