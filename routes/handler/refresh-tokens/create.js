const { User, RefreshToken } = require('../../../models');
const validator = require('fastest-validator');
const validation = new validator();

module.exports = async (req, res) => {
    const { user_id, refresh_token } = req.body;

    // schema validation
    const schema = {
        refresh_token: 'string',
        user_id: 'number'
    }

    const validate = validation.validate(req.body, schema);

    // jika ada error biasanya memiliki data array
    if (validate.length) {
        return res
            .status(400) // bad parameter
            .json({
                status: 'error',
                message: validate
            })
    }

    const user = await User.findByPk(user_id);
    console.log(user);

    if (!user) {
        // 409 conflict data already exist
        return res.status(404).json({
            status: 'error',
            message: 'user not found'
        })
    }

    // create refresh token

    const data = {
        token: refresh_token,
        user_id
    }

    const createRefreshToken = await RefreshToken.create(data);

    // success create refresh token
    return res.json({
        status: 'success',
        data: {
            id: createRefreshToken.id,
            refresh_token: createRefreshToken.token
        }
    })
}