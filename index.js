const express = require('express');
const cors = require('cors');
const app = express();
const path = require("path");
const port = process.env.PORT || 5000;

const authRoute = require('./routes/auth');
const followsRoute = require('./routes/follows');
const vacationsRoute = require('./routes/vacations');

app.use(cors());
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json({
    limit: '100mb'
}));

app.use(express.static(path.join(__dirname, "client", "build")))


app.use(authRoute)
app.use('/follow', followsRoute)
app.use('/vacations', vacationsRoute)


app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.listen(port, () => {
    console.log(`the server is listening on port ${port}`)
})
