var db = require('../models')

exports.create = function(req,res){
    var params =req.params;
    if(params.hasOwnProperty('name')){
       db.Plan.create({
           name: params.name        
       }).success(function(){
          console.log('success');
       }).error(function(){
		   
	   }):
    }else{
        res.send({result: 'missing pid or name'});
    }
    
    
}
