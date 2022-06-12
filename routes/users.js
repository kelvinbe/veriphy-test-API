import express from "express";


import {signin, signup, getUsers, deleteUser} from '../controllers/users.js'





const router = express.Router()


router.post('/signin', signin)
router.post('/signup', signup)
router.get('/', getUsers)
router.delete('/:id', deleteUser)




export default router