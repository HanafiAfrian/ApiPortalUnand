const config = require('../configs/database');
const mysql = require('mysql');
const pool = mysql.createPool(config);

pool.on('error',(err)=> {
    console.error(err);
});

module.exports ={
    // Ambil data semua Users
    getDataMhs(req,res){
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(
                `
                SELECT * FROM t_user;
                `
            , function (error, results) {
                if(error) throw error;  
                res.send({ 
                    success: true, 
                    message: 'Data DI Temukan',
                    data: results 
                });
            });
            connection.release();
        })
    },
    // Ambil data Users berdasarkan ID
    getDataMhsByID(req,res){
        let id = req.params.id;
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(
                `
                SELECT * FROM t_user WHERE tusrNama = ?;
                `
            , [id],
            function (error, results) {
                if(error) throw error;  
                     if (results.length > 0) {
                res.send({ 
                    success: true, 
                    message: 'Data di Temukan',
                    data: results
                });
                }
                   else {
                    res.send({ 
                    success: false, 
                    message: 'Data Tidak ditemukan',
                });
                    }
            });
            connection.release();
        })
    },
   
}
