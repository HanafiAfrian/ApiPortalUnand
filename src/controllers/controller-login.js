const config = require('../configs/dbportal');
const mysql = require('mysql');
const pool = mysql.createPool(config);

pool.on('error',(err)=> {
    console.error(err);
});

module.exports ={

 
    loginAuth(req,res){
      
      let username = req.body.username;
        let password = req.body.password;
        if (username && password) {
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(
            `SELECT * FROM t_user WHERE tusrNama = ? AND tusrPassword = ?`
                , [username, password],
            function (error, results) {
                if(error) throw error;  
                if (results.length > 0) {

                res.send({ 
                    success: true, 
                    message: 'Succes',
					   data: results 
                    
                });
                }
                else {
                    res.send({ 
                    success: false, 
                    message: 'failed',
                });
                    }
            });
            connection.release();
        })
        }
        else {
           
            res.send({ 
                    success: false, 
                    message: 'null',
                });
        }
    },

}
