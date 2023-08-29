const router = require('express').Router();
const { mhs } = require('../controllers');


router.get('/mhs', mhs.getDataMhs);


router.get('/mhs/:id', mhs.getDataMhsByID);
module.exports = router;
