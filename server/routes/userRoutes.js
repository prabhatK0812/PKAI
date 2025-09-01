import express from 'express'
import { getPublishedCreations, getUserCreations, toggleLikeCreations } from '../controllers/userController.js';
import { auth } from '../middlewares/auth.js';

const userRouter = express.Router();

// we will pass path auth middleware & controller fun in these methods :
userRouter.get('/get-user-creations', auth, getUserCreations)
userRouter.get('/get-published-creations', auth, getPublishedCreations)
// we will use post method because in this we will send creation id from the body :
userRouter.post('/toggle-like-creations', auth, toggleLikeCreations)

// #in first two api we are not sending anything from body(frontend) therfore get method is used.

// exporting router :
export default userRouter;

// add this user router in server.js file
