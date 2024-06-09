const express = require("express");
const prisma = require("../prisma/index");

//function getMessage
const fetchMessage = async (req, res) => {

    const sender = req.params.sender;
    const receiver = req.params.receiver;

    try {

        const fetchText = await prisma.message.findMany({
            where: {
                userRelated: { search: `+${sender} +${receiver}`, },
            },
            select: {
                id: true,
                userRelated: true,
                text: true,
                image: true,
                date: true,
            },
        });

        //send response
        res.status(200).send({
            success: true,
            message: 'Message fetched successfully',
            data: fetchText,
        });

    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Error 500: Internal server error",
            data: error,
        });
    }
};

//function sendMessage
const sendMessage = async (req, res) => {

    const sender = req.params.sender;
    const receiver = req.params.receiver;

    try {

        const sendText = await prisma.message.create({
            data: {
                userRelated: `${sender}, ${receiver}`,
                text: req.body.message,
                image: req.body.image,
            },
        });

        //send response
        res.status(200).send({
            success: true,
            message: 'Message sent successfully',
            data: sendText,
        });

    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Error 500: Internal server error",
            data: error,
        });
    }
};

module.exports = { fetchMessage, sendMessage };