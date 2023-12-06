const router = require('express').Router();
const { matkul } = require('../controllers');
const {query} = require("express-validator");

router.get('/mkdt/:kodeprodi',[ 
    query('semester').isLength({min:4, max:4}).withMessage('semester dibutuhkan'),
    query('ganjil_genap').isLength({min: 1, max: 1}).withMessage('ganjil_genap harus berisi satu digit').bail().isInt({min:1, max:2}).withMessage('ganjil_genap harus diisi dengan angka 1 atau 2 saja')
], matkul.getDataMataKuliahYangDitawarkan);

module.exports = router;

