/**
 * New node file
 */
var orm = require('orm');
var connstr = "mysql://root:9dYt?1/I@localhost/blueplan"; 
orm.connect(connstr, function (err, db) {
	  if (err) throw err;
	    var Plan= db.define("plan", {
	    	id: long,
	        name      : String,
	        age       : Number,
	        male      : Boolean,
	        continent : [ "Europe", "America", "Asia", "Africa", "Australia", "Antartica" ], // ENUM type
	        photo     : Buffer, // BLOB/BINARY
	        data      : Object // JSON encoded
	    }, {
	        methods: {
	            fullName: function () {
	                return this.name + ' ' + this.surname;
	            }
	        },
	        validations: {
	            age: orm.enforce.ranges.number(18, undefined, "under-age")
	        }
	    });
});