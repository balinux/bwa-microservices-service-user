const { User, RefreshToken } = require('../../../models');

module.exports = async (req, res) => {
    const { user_id } = req.body;

    const user = await User.findByPk(user_id);

    if (!user) {
        return res.status(404).json({
            status: 'error',
            message: 'account not found'
        })
    }

    // remove refreh token
    await RefreshToken.destroy({
        where: { user_id }
    })

    // response success find user
    return res.json({
        status: 'success',
        message: ' refresh token deleted'
    })

}