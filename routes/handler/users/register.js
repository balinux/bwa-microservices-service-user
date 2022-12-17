const { User } = require('../../../models');
const bcrypt = require('bcrypt');
const validator = require('fastest-validator')
const validation = new validator()

module.exports = async (req, res) => {
    const schema = {
        name: 'string|empty:false',
        email: 'email|empty:false',
        password: 'string|min:6',
        profession: 'string|optional'
    }

    const validate = validation.validate(req.body, schema);

    // jika ada error biasanya memiliki data array
    if (validate.length) {
        return res.status(400).json({
            status: 'error',
            message: validate
        })
    }

    const user = await User.findOne({
        where: { email: req.body.email }
    })

    if (user) {
        // 409 conflict data already exist
        return res.status(409).json({
            status: 'error',
            message: 'email already exist'
        })
    }

    const password = await bcrypt.hash(req.body.password, 10)

    const data = {
        password,
        name: req.body.name,
        email: req.body.email,
        profession: req.body.profession,
        role: 'student', // set user baru menjadi default student
    }

    // store user
    const createUser = await User.create(data)

    return res.json({
        status: 'success',
        data: {
            id: createUser.id
        }
    })
}