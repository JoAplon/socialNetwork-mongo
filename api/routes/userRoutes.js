const router = require('express').Router();

const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
} = require('../../controllers/userController');

router.route('/').get(getAllUsers).post(createUser);

router.route('/:userId').get(getUserById).put(updateUser).delete(deleteUser);

router.route('/users/:userId/friends/:friendId').post(addFriend);

module.exports = router;