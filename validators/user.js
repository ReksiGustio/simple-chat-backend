const { body } = require('express-validator');
const prisma = require('../prisma/index');

// Definisikan validasi untuk create user
const validateUser = [
    body('name').notEmpty().withMessage('Name is required'),
    body('userName')
        .notEmpty().withMessage('Username is required')
        .custom(async (value, { req }) => {
            if (!value) {
                throw new Error('Username is required');
            }

            if (/\s/.test(value)) {
                throw new Error('Username cannot contains whitespaces');
            }

            const user = await prisma.user.findUnique({ where: { userName: value } });
            if (user && user.id !== Number(req.params.id)) {
                throw new Error('Username already exists');
            }
            return true;
        }),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
];

module.exports = { validateUser }