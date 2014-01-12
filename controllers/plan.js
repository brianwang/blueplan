/**
 * New node file
 */
var mysql = 
exports.create = function(req,res){
    var params =req.params;
    if(params.hasOwnProperty('pid')
    && params.hasOwnProperty('name')){
        


    }else{
        res.send({result: 'missing pid or name'});
    }
    
    
}