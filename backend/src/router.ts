import express from 'express';
import {
	AuthController,
	EmployeeController,
	RatingController,
	UserController,
} from './controllers/index';
import { authMiddleware } from './middleware/authMiddleware';

const router = express.Router();

// Auth
router.post('/auth', AuthController.auth);
router.post('/check', AuthController.checkAuth);
router.get('/check', AuthController.checkAuth);

// Logout
router.get('/logout', AuthController.logout);

// Employees, Profile
router.get('/employees', EmployeeController.employees);
router.get('/user', authMiddleware, UserController.getUser);
router.get('/profile', authMiddleware, UserController.profile);
router.get('/searchUsers', authMiddleware, UserController.searchEmployees);
router.post('/updateSalary', authMiddleware, UserController.updateSalary);

// Rating
router.post('/updateRating', authMiddleware, RatingController.updateRating);
router.get('/rating', authMiddleware, RatingController.getRaging);

router.get('/generatePassword', AuthController.generatePassword);


export { router };
