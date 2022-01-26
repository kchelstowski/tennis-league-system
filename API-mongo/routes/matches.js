const express = require('express');
const router = express.Router();
const Match = require('../models/Match');
const mongoose = require('mongoose');
const Player = require('../models/Player')
const Object = require('../models/Object')


router.get('/', async (req, res) => {
    try {
        const result = await Match.find()
        return res.send(result)
    } catch (err) {
        res.status(500).send(err);
    }
});

router.post('/', async (req, res) => {
    const data = []
    try {
        const result = await new Match({
            id: req.body.id,
            player1: req.body.player1,
            player2: req.body.player2,
            winner: req.body.winner,
            object: req.body.object,
            date: req.body.date


        }).save()
        data.push(result)
        await Player.findByIdAndUpdate(req.body.player1,{
                $push: {
                    matches: result._id
                }
            }
            )
        await Player.findByIdAndUpdate(req.body.player2,{
                $push: {
                    matches: result._id
                }
            }
        )
        await Object.findByIdAndUpdate(req.body.object,{
                $push: {
                    matches: result._id
                }
            }
        )

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
            player1: [req.body.player1],
            player2: [req.body.player2],
            winner: [req.body.winner],
            date: req.body.date,
            object: [req.body.object]
        }
        console.log("Data to update" + dataToUpdate)

        await Match.findByIdAndUpdate(req.params.id, dataToUpdate, (err, docs) => {
            if (err) {
                return res.status(500).send("ERROR WHILE UPDATING")
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
        await Match.findByIdAndDelete(req.params.id)
        return res.status(200).send({message: "MATCH DELETED"})
    } catch (e) {
        console.log(e)
    }


})
module.exports = router;
