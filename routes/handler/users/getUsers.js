const { User } = require('../../../models');

module.exports = async (req, res) => {
    // get All user

    const userIds = req.query.user_ids || [];

    const sqlOptions = {
        // limit data yang di tampilkan
        attributes: [
            'id',
            'name',
            'email',
            'role',
            'avatar',
            'profession'
        ]
    }

    if (userIds.length) {
        sqlOptions.where = {
            id:userIds
        }
    }
    
    const user = await User.findAll(sqlOptions)

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