const { Router } = require('express')
const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Admin = mongoose.model('Admin')
const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken")
const { JWT_SERECTKEY } = require('../keys')
const requireLogin = require('../middleware/requirelogin')

router.post('/adminsignup', (req, res) => {
    const { name, email, password, clgId } = req.body
    if (!email || !password || !name || !clgId) {
        return res.status(422).json({ error: "please enter all the fields" })
    }
    Admin.findOne({ email: email })
        .then((savedUser) => {
            if (savedUser) {
                console.log(savedUser)
                return res.status(422).json({ error: "Admin already exists" })
            }
            bcrypt.hash(password, 13)
                .then(hashedpassword => {
                    const admin = new Admin({
                        email: email,
                        clgId,
                        password: hashedpassword,
                        name
                    })
                    admin.save()
                        .then(user => {
                            res.json({ message: "successfully Signup" })
                        })
                        .catch(error => {
                            console.log(error)
                        })
                })

        })
        .catch(error => {
            console.log(error)
        })
})

router.post('/adminsignin', (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        return res.status(422).json({ error: "please enter all the fields" })
    }
    Admin.findOne({ email: email })
        .then(savedUser => {
            if (!savedUser) {
                return res.status(422).json({ error: "Invalid mail or password" })
            }
            bcrypt.compare(password, savedUser.password)
                .then(doMatch => {
                    if (doMatch) {
                        //  res.json({message:"successfully signed in"})
                        const token = jwt.sign({ _id: savedUser._id }, JWT_SERECTKEY)
                        const { _id, email } = savedUser
                        res.json({ token: token, admin: { _id, email } })
                    }
                    else {
                        return res.status(422).json({ error: "Invalid mail or password" })
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        })
})
module.exports = router