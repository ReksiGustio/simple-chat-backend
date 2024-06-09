const express = require("express");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const prisma = require("../prisma/index");

const register = async (req, res) => {

    // Periksa hasil validasi
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        // Jika ada error, kembalikan error ke pengguna
        return res.status(422).json({
            success: false,
            message: "Error 422: Validation error",
            data: errors.array(0),
        });
    }

    //hash password
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    try {
        //insert data
        const user = await prisma.user.create({
            data: {
                name: req.body.name,
                userName: req.body.userName,
                password: hashedPassword,
            },
        });

        //return response json
        res.status(201).send({
            success: true,
            message: "Register successfully",
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Error 500: Internal server error",
        });
    }
};

module.exports = {register};