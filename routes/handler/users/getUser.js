const { User } = require('../../../models');

module.exports = async (req, res) => {
    const { id } = req.params
    // find user
    const user = await User.findByPk(id, {
        // limit data yang di tampilkan
        attributes: [
            'id',
            'name',
            'email',
            'role',
            'avatar',
            'profession'
        ]
    })

    // pengecekan jika user tidak ada
    if (!user) {
        // 409 conflict data already exist
        return res.status(404).json({
            status: 'error',
            message: 'user not found'
        })
    }

    return res.status(200).json({
        status: 'success',
        data: user
    })
}