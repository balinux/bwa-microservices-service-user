const { RefreshToken } = require('../../../models');

module.exports = async (req, res) => {
    const { refresh_token } = req.query;

    const token = await RefreshToken.findOne({
        where: { token: refresh_token }
    })

    // jika ada token di temukan
    if (!token) {
        return res
            .status(400) // bad parameter
            .json({
                status: 'error',
                message: 'invalid token'
            })
    }

    // success get refresh token
    return res.json({
        status: 'success',
        token
    })
}