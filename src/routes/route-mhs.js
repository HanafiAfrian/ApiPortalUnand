const router = require('express').Router();
const { mhs } = require('../controllers');
router.get('/mhs', mhs.getDataMhs);
router.get('/mhs/:id', mhs.getDataMhsByID);
router.get('/mhs/:id/krs', mhs.getKRSMhs);
router.get('/mhs/:id/mkdt', mhs.getDataMataKuliahYangDitawarkan);
module.exports = router;
