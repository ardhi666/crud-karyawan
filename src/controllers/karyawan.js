const {profile} = require('../../models/')
const Joi = require("joi");


exports.register = async (req, res) => {
    try {

        const schema = Joi.object({
            nama: Joi.string().min(4).required(),
            email: Joi.string().email().min(4).required(),
            alamat: Joi.string().min(4).required(),
        });

        const { error } = schema.validate(req.body);

        if (error)
        return res.status(400).send({
            error: {
                message: error.details[0].path + ' cannot be empty',
            },
        });

        const request = req.body

        const emailCheck = await profile.findOne({
            where:{
                email:req.body.email
            }
        })

        if(emailCheck){
            return res.send({
                message:"email has registered"
            })
        }
        const data = await profile.create(request)

        res.status(201).send({
            status:"success",
            data
        })
    } catch (error) {
        console.log(error);
        res.status(400).send({
            status:"error",
            error
        })
    }
}

exports.getsKaryawan = async (req, res) => {
    try {
        const data = await profile.findAll()

        res.status(200).send({
            status:"success",
            data
        })
    } catch (error) {
        res.status(400).send({
            status:"error",
            error
        })
    }
}

exports.getKaryawan = async (req, res) => {
    try {
        const {id} = req.params
        const data = await profile.findOne({
            where:{
                id:id
            }
        })

        res.status(200).send({
            status:"success",
            data
        })
    } catch (error) {
        res.status(404).send({
            status:"error",
            error
        })
    }
}

exports.updateKaryawan = async (req, res) => {
    try {
        const {id} = req.params
        const request = req.body
        await profile.update(request,{
            where:{
                id:id
            }
        })

        const data = await profile.findOne({
            where:{
                id:id
            }
        })

        res.status(201).send({
            status:"success",
            message:`Karyawan dengan id ${id} berhasil diupdate`,
            data
        })
    } catch (error) {
        res.status(400).send({
            status:"error",
            error
        })
    }
}

exports.deleteKaryawan = async (req, res) => {
    try {
        const {id} = req.params
        await profile.destroy({
            where:{
                id:id
            }
        })

        res.status(200).send({
            status:"success",
            message:`Karyawan dengan id ${id} berhasil dihapus`
        })
    } catch (error) {
        
    }
}