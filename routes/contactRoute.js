const express = require("express");
const bodyParser = require("body-parser")

const router = express.Router();
router.use(bodyParser.json())
const contactModel = require("../models/contactModel");

// 1 
router.post("/v1/contacts", async (req, res) => {
    try {
        const user = await contactModel.create(req.body);
        res.status(201).json({
            user
        })
    }
    catch (err) {
        if (err) {
            if (err.errors.phone) {
                res.status(500).json({
    
                    error: `Missing required field(s): ${err.errors.phone.path}`
                })
            }
            else if (err.errors.email) {
                res.status(500).json({
                    
                    error: `Missing required field(s): ${err.errors.email.path}`
                })
            }
            else if (err.errors.firstName) {
                res.status(500).json({
                 
                    error: `Missing required field(s): ${err.errors.firstName.path}`
                })
            } 
            else if (err.errors.lastName) {
                res.status(500).json({
                    error: `Missing required field(s): ${err.errors.lastName.path}`
                })
            }

        }

    }
})

// 2
router.get("/v1/contacts", async (req, res) => {
    try {
        const user = await contactModel.find();
        res.json({
            user
        })
    }
    catch (e) {
        console.log(e);
        res.status(500).json({
            status: "Failed",
            message: e.message
        })
    }
})

// 3
router.get("/v1/contacts/:id", async (req, res) => {
    
    try {
        const user = await contactModel.findOne({_id : req.params.id});
        // console.log(user)
        if (!user) {
            res.status(404).json({
                error: "There is no contact with that id"
            })
        }
        else {
            res.json({
                user
            })
        }

    }
    catch (e) {
        res.status(404).json({
            error: "There is no contact with that id"
        })
    }
})

//4
router.delete("/v1/contacts/:id", async (req, res) => {
    try {
        const user = await contactModel.deleteOne({ _id: req.params.id });
        res.status(204).json({

        })
    }
    catch (e) {
        res.status(204).json({

        })
    }
})

//5

router.put("/v1/contacts/:id", async (req, res) => {
    try {
        //console.log(req.body);
        const user = await contactModel.find({ _id: req.params.id })
        if (user) {
            const updatUser = await contactModel.updateOne({ _id: req.params.id }, req.body);
            res.status(204).json({

            })
        }
        else {
            res.status(404).json({
                message: "There is no contact with that id"
            })
        }

    }
    catch (e) {
        res.status(404).json({
            error: "There is no contact with that id"
        })
    }
})

//6

router.patch("/v1/contacts/:id", async (req, res) => {
    try {
        //console.log(req.body);
        const user = await contactModel.updateOne({ _id: req.params.id }, req.body);
        if(user){
            res.status(204).json({
                user
            })
        }
        else{
            res.status(404).json({
                message: "There is no contact with that id"
            })
        }
     
    }
    catch (e) {
        res.status(404).json({
            error: "There is no contact with that id"
        })
    }
})


module.exports = router