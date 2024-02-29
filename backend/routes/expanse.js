const express = require('express');
const router = express();
// Require controller modules.
const expanse = require('../model/expanse');

router.post('/credit', async(req, res) => {
    let e1 = new expanse({
            id: req.body.id,
            category: req.body.category,
            amount: req.body.amount,
            type: "CREDIT",
            description: req.body.description,
            date: req.body.date
        })
        // let e1 = new expanse(id, category, amount, type);
        // console.log(e1);

    try {
        let save = await e1.save();
        if (save) {

            res.status(200).json({ message: "Data added successfully!" });
        } else {

            res.status(400).json({ error: "Unable to add data" });
        }
    } catch (error) {
        res.status(400).json({ error: error });
    }
    // res.send("hello")
})

router.post('/debit', async(req, res) => {
    let e1 = new expanse({
        id: req.body.id,
        category: req.body.category,
        amount: req.body.amount,
        type: "DEBIT",
        description: req.body.description,
        date: req.body.date
    })
    try {
        let save = await e1.save();
        if (save) {
            res.json({ message: "Data added successfully!" });
        } else {
            res.status(400).json({ error: "Unable to add data" });
        }
    } catch (error) {
        res.status(400).json({ error: "Unable to add data" });
    }
})

router.get('/expanse/:id', async(req, res) => {
    let id = req.params.id;
    let result = await expanse.find({ id: id });
    res.json(result);
    // console.log(result);
})
router.post('/expanse', async(req, res) => {
    let date = new Date()
    let id = req.body.id;
    let result = await expanse.find({ id: id });
    // console.log(result);
    if (!result[0]) {
        res.send("you have not any transaction");
    } else {
        res.json(result);
    }
})

router.put('/update/:id', async(req, res) => {
    let _id = req.params.id;
    const updateItem = await expanse.findByIdAndUpdate(_id, {
            $set: {
                'type': req.body.type,
                'amount': req.body.amount,
                'category': req.body.category,
                'remarks': req.body.remarks,
                'date': req.body.date
            },
        })
        .then(() => {
            res.json('Data is updated')
        }).catch((err) => {
            res.status(400).send("Error updating the data")
        })
});
// delete a item by its `id`
router.delete('/remove/:id', async(req, res) => {
    try {
        const removed = await expanse.deleteOne({ _id: req.params.id })
        if (removed.deletedCount == 0) {
            return res.status(404).send(`No entry with the id ${req.params.id}`)
        } else {
            res.status(200).json(removed);
        }
    } catch (err) {
        res.status(400).json(err)
    }
})
module.exports = router;