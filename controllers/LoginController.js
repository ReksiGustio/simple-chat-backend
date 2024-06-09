const express = require("express");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const prisma = require("../prisma/index");

//function login
const login = async (req, res) => {
    // Periksa hasil validasi
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        // Jika ada error, kembalikan error ke pengguna
        return res.status(422).json({
            success: false,
            message: "Error 422: Validation error",
            errors: errors.array(0),
        });
    }

    try {

        //find user
        const user = await prisma.user.findFirst({
            where: {
                userName: req.body.userName,
            },
            select: {
                id: true,
                name: true,
                userName: true,
                password: true,
                status: true,
                picture: true,
            },
        });

        //user not found
        if (!user)
            return res.status(404).json({
                success: false,
                message: "Error 404: User not found",
            });

        //compare password
        const validPassword = await bcrypt.compare(
            req.body.password,
            user.password
        );

        //password incorrect
        if (!validPassword)
            return res.status(401).json({
                success: false,
                message: "Error 401: Invalid password",
            });

        //generate token JWT
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
            expiresIn: "7d",
        });

        // Destructure to remove password from user object
        const { password, ...userWithoutPassword } = user;

        //return response
        res.status(200).send({
            success: true,
            message: "Login successfully",
            data: {
                user: userWithoutPassword,
                token: token,
            },
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Error 500: Internal server error",
        });
    }
};

module.exports = { login };