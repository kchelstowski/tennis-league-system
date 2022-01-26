const express = require('express');
const router = express.Router();
const Player = require('../models/Player');
const mongoose = require('mongoose');




router.get('/', async (req, res) => {
    try {
        const result = await Player.find()
        return res.send(result)
    } catch (err) {
        res.status(500).send(err);
    }
});

router.post('/', async (req, res) => {
    const data = []
    try {
        const result = await new Player({
            id: req.body.id,
            firstName: `${req.body.firstName}`,
            lastName: req.body.lastName,
            dateOfBirth: req.body.dateOfBirth,
            gender: req.body.gender,
            handed: req.body.handed,
            height: parseInt(req.body.height),
            weight: parseInt(req.body.weight)


        }).save()
        data.push(result)
        return res.status(200).send(data)
    } catch (err) {
        res.status(500).send(err);
    }
});

router.delete('/:id', async (req,res) => {

    try {
        await Player.findByIdAndDelete(req.params.id)
        return res.status(200).send({message: "PLAYER DELETED"})
    } catch (e) {
        console.log(e)
    }


})

router.put("/:id", async (req,res) => {
    try {
        const dataToUpdate = {
            _id: req.body._id,
            id: req.body.id,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            dateOfBirth: req.body.dateOfBirth,
            gender: req.body.gender,
            handed: req.body.handed,
            height: req.body.height,
            weight: req.body.weight
        }
        console.log("Data to update" + dataToUpdate)

        await Player.findByIdAndUpdate(req.params.id, dataToUpdate, (err, docs) => {
            if (err) {
                return res.status(500).send("ERROR WHILE UPDATING PLAYER")
            }
            console.log("Docs: " + docs)
            return res.status(200).send([dataToUpdate])
        })
    } catch (e) {
        console.log(e)
    }

})

module.exports = router;
