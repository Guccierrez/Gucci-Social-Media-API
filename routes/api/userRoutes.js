const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  deleteUser,
  updateUser,
  addFriend,
  removeFriend,
} = require('../../controllers/userController');

// /api/users
router.route('/').get(getUsers).post(createUser);

// /api/students/:studentId
router.route('/:userId').get(getSingleUser).delete(deleteUser).put(updateUser);

// /api/students/:studentId/assignments/:assignmentId
router.route('/:userId/friends/:friendId').post(addFriend).delete(removeFriend);

module.exports = router;
