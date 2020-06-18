import { Router } from 'express'
const router = Router();

import { indexPush, registerUser, loginUser, updateUser } from "../controllers/index.controller"

router.route('/')
	.get(indexPush);

router.route('/registerUser')
	.post(registerUser)

router.route('/loginUser')
	.post(loginUser)

router.route('/updateUser')
	.put(updateUser)

export default router;