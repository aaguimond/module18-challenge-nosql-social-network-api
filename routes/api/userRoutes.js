// defining our router using express.js
const router = require('express').Router();

// importing our user route logic from userController.js
const {
    getUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend,
} = require('../../controllers/userController');

// Route: /api/users
// Get all users, create new user
router.route('/').get(getUsers).post(createUser);

// Route: /api/users/:userId
// Get specific user, update user, delete user
router.route('/:userId')
    .get(getSingleUser)
    .put(updateUser)
    .delete(deleteUser);

// Route: /api/users/:userId/friends/:friendId
// Add friend to user's friend list, delete friend from user's friend list
router.route('/:userId/friends/:friendId')
    .post(addFriend)
    .delete(removeFriend);

// exporting our router
module.exports = router;