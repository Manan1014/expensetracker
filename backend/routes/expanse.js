const express = require('express');
const router = express();
// Require controller modules.
const expanse = require('../model/expanse');
// var multer = require('multer')

router.get('/expanse', (req, res) => {
    res.send("hello");
})
router.post('/credit', async(req, res) => {
    let e1 = new expanse({
            id: req.body.id,
            category: req.body.category,
            amount: req.body.amount,
            type: "CREDIT",
            description: req.body.description
        })
        // let e1 = new expanse(id, category, amount, type);
    console.log(e1);

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
    // res.send("hello")
})

router.post('/debit', async(req, res) => {
    let e1 = new expanse({
        id: req.body.id,
        category: req.body.category,
        amount: -req.body.amount,
        type: "DEBIT",
        description: req.body.description
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
    // res.send("hello")
    router.get("/test/:id", function(req, res) {
        expanse.findById(req.params.id, function(err, data) {
            if (!err)
                res.send(data);
            else
                console.log('Error while getting user information');
        })
    })
})
module.exports = router;