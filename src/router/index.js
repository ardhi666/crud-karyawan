const express = require('express')
const router = express.Router()

// Controllers

const {register,getsKaryawan,getKaryawan,updateKaryawan,deleteKaryawan} = require('../controllers/karyawan')

// Route

router.post('/karyawan', register)
router.get('/karyawan', getsKaryawan)
router.get('/karyawan/:id', getKaryawan)
router.patch('/karyawan/:id', updateKaryawan)
router.delete('/karyawan/:id', deleteKaryawan)

module.exports = router