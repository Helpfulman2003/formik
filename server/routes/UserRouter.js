const express = require('express');
const userController = require('../controllers/UserController');
const middlewareController = require('../middleware/authMiddleware');
const userRouter = express.Router();

userRouter.post('/sign-up', userController.createUser)
userRouter.post('/sign-in', userController.loginUser)
userRouter.put('/update-user/:id', middlewareController.verifyToken, userController.updateUser)
userRouter.delete('/delete-user/:id', middlewareController.verifyToken, userController.deleteUser)
userRouter.get('/getAll', middlewareController.verifyToken, userController.getAllUser)
userRouter.get('/get-detail/:id', middlewareController.verifyToken, userController.getDetailUser)
userRouter.post('/refresh-token', userController.refreshToken)
userRouter.post('/logout', /*middlewareController.verifyToken,*/ userController.userLogout)
userRouter.post('/deletemany-user', /*middlewareController.verifyToken,*/ userController.deleteManyUser)

module.exports = userRouter;
