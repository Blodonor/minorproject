const express = require('express')
const app = express()
const mongoose = require('mongoose')
const { MONGOURI } = require('./keys')
const PORT = process.env.PORT || 5000

mongoose.connect(MONGOURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
mongoose.connection.on('connected', () => {
    console.log("mongo yeah")
})
mongoose.connection.on('error', () => {
    console.log("mongo error", err)
})
mongoose.set('useFindAndModify', false);

const countMiddleware = (req, res, next) => {
    console.log("Middleware executed")
    next()
}
app.get('/', countMiddleware, (req, res) => {
    res.send("Hello world")
})
require('./models/user')
require('./models/post')
require('./models/admin')
require('./models/notification')
require('./models/allbooks')
app.use(express.json())
app.use(require('./routes/auth'))
app.use(require('./routes/notify'))
app.use(require('./routes/admins'))
app.use(require('./routes/post'))
app.use(require('./routes/books'))

if (process.env.NODE_ENV == "production") {
    app.use(express.static("client/build"))
    const path = require('path')
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })

}
app.listen(PORT, () => {
    console.log("listenig at server", PORT)
})