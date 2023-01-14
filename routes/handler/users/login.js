const bcrypt = require('bcrypt');
const { User } = require('../../../models');
const validator = require('fastest-validator')
const validation = new validator()

module.exports = async (req, res) => {
    const schema = {
        email: 'email|empty:false',
        password: 'string|min:6',
    }
    const validate = validation.validate(req.body, schema);

    // jika ada error validasi biasanya memiliki data array
    if (validate.length) {
        return res.status(400).json({
            status: 'error',
            message: validate
        })
    }

    const user = await User.findOne({
        where: { email: req.body.email }
    })

    // pengecekan jika meail tidak ada
    if (!user) {
        // 409 conflict data already exist
        return res.status(409).json({
            status: 'error',
            message: 'account not found'
        })
    }

    // pengecekan password
    const isValidPassword = await bcrypt.compare(req.body.password, user.password)

    // pengecekan dan response jika password tidak ada
    if (!isValidPassword) {
        // 409 conflict data already exist
        return res.status(409).json({
            status: 'error',
            message: 'password is not correct'
        })
    }


    // response success find user
    return res.json({
        status: 'success',
        data: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            avatar: user.avatar,
            profession: user.profession,
        }
    })

}