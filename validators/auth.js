const { body } = require('express-validator');
const prisma = require('../prisma/index');

// Definisikan validasi untuk register
const validateRegister = [
    body('name').notEmpty().withMessage('Name is required'),
    body('userName')
        .notEmpty().withMessage('Username is required')
        .custom(async (value) => {
            if (!value) {
                throw new Error('Username is required');
            }
            
            if (/\s/.test(value)) {
                throw new Error('Username cannot contains whitespaces');
            }

            const user = await prisma.user.findUnique({ where: { userName: value } });
            if (user) {
                throw new Error('Username already exists');
            }

            return true;
        }),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
];

//definisikan validasi untuk login
const validateLogin = [
    body('userName').notEmpty().withMessage('Username is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
];

module.exports = { validateRegister, validateLogin };