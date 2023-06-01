import express from 'express';
import { AuthController, EmployeeController } from './controllers/index';
import { authMiddleware } from './middleware/authMiddleware';
import UserController from './controllers/UserController';

const router = express.Router();

router.get('/employees', EmployeeController.employees);

router.get('/user', authMiddleware, UserController.getUser);
router.get('/profile', authMiddleware, UserController.profile);
router.get('/searchUsers', authMiddleware, UserController.searchEmployees);

router.post('/auth', AuthController.auth);
router.post('/check', AuthController.checkAuth);
router.get('/check', AuthController.checkAuth);

router.get('/logout', AuthController.logout);
router.get('/generatePassword', AuthController.generatePassword);

export { router };
