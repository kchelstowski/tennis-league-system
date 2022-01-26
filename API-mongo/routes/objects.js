const express = require('express');
const router = express.Router();
const Object = require('../models/Object');
const mongoose = require('mongoose');




router.get('/', async (req, res) => {
    try {
        const result = await Object.find()
        return res.send(result)
    } catch (err) {
        res.status(500).send(err);
    }
});

router.post('/', async (req, res) => {
    const data = []
    try {
        const result = await new Object({
            id: req.body.id,
            name: req.body.name,
            surface: req.body.surface


        }).save()
        data.push(result)
        return res.status(200).send(data)
    } catch (err) {
        res.status(500).send(err);
    }
});

router.put("/:id", async (req,res) => {
    try {
        const dataToUpdate = {
            _id: req.body._id,
            id: req.body.id,
            name: req.body.name,
            surface: req.body.surface
        }
        console.log("Data to update" + dataToUpdate)

        await Object.findByIdAndUpdate(req.params.id, dataToUpdate, (err, docs) => {
            if (err) {
                return res.status(500).send("ERROR WHILE UPDATING OBJECT")
            }
            console.log("Docs: " + docs)
            return res.status(200).send([dataToUpdate])
        })
    } catch (e) {
        console.log(e)
    }

})

router.delete('/:id', async (req,res) => {

    try {
        await Object.findByIdAndDelete(req.params.id)
        return res.status(200).send({message: "OBJECT DELETED"})
    } catch (e) {
        console.log(e)
    }


})


module.exports = router;
