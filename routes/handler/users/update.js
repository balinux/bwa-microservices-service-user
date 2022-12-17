const { User } = require('../../../models');
const bcrypt = require('bcrypt');
const validator = require('fastest-validator')
const validation = new validator()

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns 
 * membuat fitur update untuk mengubah email dengan email yang terbaru dan uniq, beserta username dan password, dan data lainnya
 */
module.exports = async (req, res) => {
    const schema = {
        name: 'string|empty:false',
        email: 'email|empty:false',
        password: 'string|min:6',
        profession: 'string|optional',
        avatar: 'string|optional'
    }

    const validate = validation.validate(req.body, schema);

    // jika ada error biasanya memiliki data array
    if (validate.length) {
        return res.status(400).json({
            status: 'error',
            message: validate
        })
    }

    // mencari user
    const { id } = req.params;

    const user = await User.findByPk(id)

    if (!user) {
        // 409 conflict data already exist
        return res.status(404).json({
            status: 'error',
            message: 'user not found'
        })
    }

    // pengecekan email
    const { email, profession, avatar, name } = req.body

    // pengecekan apakan email di body ada di database
    if (email) {
        const checkEmail = await User.findOne({
            where: { email }
        });

        // pengecekan apakah yang melakukan update benar memiliki email yang sama
        if (checkEmail && email !== user.email) {
            return res.status(409).json({
                status: 'error',
                message: 'email already exist'
            })
        }
    }

    // // hashing password 
    const password = await bcrypt.hash(req.body.password, 10)

    const data = {
        email,
        password,
        name,
        profession,
        avatar
    }

    // // // update user
    const updateUser = await user.update(data)

    // respoonse success update
    return res.json({
        status: 'success',
        data: {
            id: updateUser.id,
            name,
            email,
            profession,
            avatar
        }
    })
}