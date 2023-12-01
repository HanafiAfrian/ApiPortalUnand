const config = require('../configs/dbsiateknik');
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
                SELECT * FROM mahasiswa;
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
             SELECT mahasiswa.mhsNiu AS mhsNiu, mahasiswa.mhsNama AS mhsNama, mahasiswa.mhsAlamatMhs AS mhsAlamatMhs,
              mahasiswa.mhsKotaKodeLahir AS mhsKotaKodeLahir, mahasiswa.mhsTanggalLahir AS mhsTanggalLahir ,
               agama_ref.agmrNama AS agmrNama , mahasiswa.mhsJenisKelamin AS mhsJenisKelamin , 
               kota.kotaNamaResmi AS kotaNamaResmi, mahasiswa.mhsTanggalTerdaftar AS mhsTanggalTerdaftar ,
                program_studi.prodiNamaResmi AS prodiNamaResmi, fakultas.fakNamaResmi AS fakNamaResmi 
                FROM mahasiswa JOIN program_studi ON mahasiswa.mhsProdiKode = program_studi.prodiKode JOIN agama_ref ON mahasiswa.mhsAgmrId = agama_ref.agmrId JOIN kota ON mahasiswa.mhsKotaKodeLahir = kota.kotaKode JOIN fakultas ON program_studi.prodiFakKode = fakultas.fakKode where mhsNiu = ?;
                `
            , [id],

            function (error, results) {
                console.log(error);
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
                    message: 'Data Tidak ditemukan '+id,
                });
                    }
            });
            connection.release();
        })
    },
    
    // ambil data hasil studi setaip semester yang sudah dilewati atau yang ada saat ini
    getKRSMhs(req,res){
        let id = req.params.id;
        let semester = req.query.semester;
        let ganjil_genap = req.query.ganjil_genap;
        let semDB = semester.concat(ganjil_genap);
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(
                `
                SELECT
                s_matakuliah_kurikulum.mkkurKode AS kode,
                s_matakuliah_kurikulum.mkkurNamaResmi AS namaMatkul,
                s_semester_prodi.sempSemId AS semester,
                s_kelas.klsNama AS kelas,
                s_matakuliah_kurikulum.mkkurSfmkrKode AS wajibAtauPilihan,
                s_matakuliah_kurikulum.mkkurJumlahSksKurikulum as sks,
                s_krs_detil.krsdtKodeNilai as nilai

                
                FROM mahasiswa
                JOIN s_krs ON mahasiswa.mhsNiu = s_krs.krsMhsNiu
                JOIN s_krs_detil ON s_krs.krsId = s_krs_detil.krsdtKrsId
                JOIN s_matakuliah_kurikulum ON s_matakuliah_kurikulum.mkkurId = s_krs_detil.krsdtmkkurId
                JOIN s_semester_prodi ON s_semester_prodi.sempid = s_krs.krssempId
                JOIN s_kelas ON s_kelas.klsId = s_krs_detil.krsdtKlsId

                where mhsNiu = ? and s_semester_prodi.sempSemId = ?;
                `,
                [id, semDB]
            , function (error, results) {
                if(error) throw error;  
                res.send({ 
                    success: true, 
                    message: 'Success',
                    data: results 
                });
            });
            connection.release();
        })
    },
    
    getKodeProdi(req, res){
        let id = req.params.id;
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(
                `
                
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

    getDataMataKuliahYangDitawarkan(req,res){
        let id = req.params.id;
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(
                `
             SELECT mahasiswa.mhsNiu AS mhsNiu, mahasiswa.mhsNama AS mhsNama, mahasiswa.mhsAlamatMhs AS mhsAlamatMhs,
              mahasiswa.mhsKotaKodeLahir AS mhsKotaKodeLahir, mahasiswa.mhsTanggalLahir AS mhsTanggalLahir ,
               agama_ref.agmrNama AS agmrNama , mahasiswa.mhsJenisKelamin AS mhsJenisKelamin , 
               kota.kotaNamaResmi AS kotaNamaResmi, mahasiswa.mhsTanggalTerdaftar AS mhsTanggalTerdaftar ,
                program_studi.prodSELECT 
                a.vmktwkrsMkkurKode AS Kode,
                a.vmktwkrsMkkurNamaResmi AS MataKuliah,
                CASE
                        WHEN c.pegGelarBelakang = '' THEN
                            CONCAT_WS(' ', c.pegGelarDepan, c.pegNama)
                        ELSE
                            CONCAT_WS(' ', c.pegGelarDepan, CONCAT_WS(', ', c.pegNama, c.pegGelarBelakang))
                    END AS NamaDosen,
                a.vmktwkrsKlsNama AS Kelas,
                a.vmktwkrsSifatMatakuliahKrs AS WajibAtauPilihan,
                a.vmktwkrsJumlahSksKrs AS SKS
                
                
                FROM 
                's_v_matakuliah_ditawarkan_krs' AS a
                JOIN s_dosen_kelas AS b ON b.dsnkKlsId = a.vmktwkrsKlsId
                JOIN pegawai AS c ON b.dsnkDsnPegNip = c.PegNip
                 
                WHERE 'vmktwkrsSemId'="20231" AND ('vmktwkrsProdiKode'=71 OR 'vmktwkrsMkkurSfmkrKode'= "P") 
                
                `
            , [id],

            function (error, results) {
                console.log(error);
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
                    message: 'Data Tidak ditemukan '+id,
                });
                    }
            });
            connection.release();
        })
    },
}
