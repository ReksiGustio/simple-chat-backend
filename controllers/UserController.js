const express = require("express");
const prisma = require("../prisma/index");

//function findUsers
const findUsers = async (req, res) => {
    try {

        //get all users from database
        const users = await prisma.user.findMany({
            select: {
                userName: true,
            },
        });

        //send response
        res.status(200).send({
            success: true,
            message: "Get all users successfully",
            data: users,
        });

    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Error 500: Internal server error",
        });
    }
};

//function findUserByUsername
const findUserByUsername = async (req, res) => {

    //get Username from params
    const { userName } = req.params;

    try {

        //get user by ID
        const user = await prisma.user.findUnique({
            where: {
                userName: String(userName),
            },
            select: {
                id: true,
                name: true,
                userName: true,
                status: true,
                picture: true,
            },
        });

        if (!user)
            return res.status(404).json({
                success: false,
                message: "Error 404: User not found",
            });

        //send response
        res.status(200).send({
            success: true,
            message: `Get user: :${userName}`,
            data: user,
        });

    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Error 500: Internal server error",
        });
    }
};

//function updateUser
const updateUser = async (req, res) => {

    //get ID from params
    const { userName } = req.params;

    try {

        //update user
        const user = await prisma.user.update({
            where: {
                userName: String(userName),
            },
            data: {
                name: req.body.name,
                status: req.body.status,
                picture: req.body.picture,
            },
        });

        const { password, ...userWithoutPassword } = user;

        //send response
        res.status(200).send({
            success: true,
            message: 'User updated successfully',
            data: userWithoutPassword,
        });

    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Internal server error",
        });
    }
};

module.exports = { findUsers, findUserByUsername, updateUser };