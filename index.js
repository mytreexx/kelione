const express = require('express');
const cors = require('cors');
const app = express();
const path = require("path");
const port = process.env.PORT || 5000;

const { User, Vacation, Follower, Op, sequelize } = require('./models');

const { cloudinary } = require('./utils/cloudinary');

app.use(cors());
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json({
    limit: '100mb'
}));

app.use(express.static(path.join(__dirname, "client", "build")))

//register
app.post('/register', async (req, res) => {
    const { firstName, lastName, username, password, confirmPassword } = req.body;
    const registeredUser = await User.findOne({ where: { username } });

    if (registeredUser) {
        res.status(401).send('Username already exists')
    } else if (password && password.length < 6) {
        res.status(401).send('Password should be at least 6 characters long')
    } else if (password !== confirmPassword) {
        res.status(401).send('Passwords should match')
    } else {
        try {
            await sequelize.sync();
            const user = await User.create({
                first_name: firstName,
                last_name: lastName,
                username,
                password,
                is_admin: false
            });
            res.send();
        } catch (e) {
            console.error(e)
            res.send(e)
        }
    }
})

//login
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    const loggingInUser = await User.findOne({ where: { username } });

    if (!loggingInUser) {
        res.status(404).send('User not found!')
    } else if (loggingInUser.password !== password) {
        res.status(401).send('Wrong password!')
    } else {
        res.send(loggingInUser.username);
    }
})

// show vacations
app.post('/vacations', async (req, res) => {
    const { username } = req.body;
    const loggedUser = await User.findOne({ where: { username } });
    const followedVacations = await Follower.findAll({ where: { following_user: loggedUser.id } })
    const vacations = await Vacation.findAll({});

    try {
        res.send({
            followedVacations,
            vacations
        })
    } catch (e) {
        console.eror(e)
        res.send(e)
    }
})

// follow vacation
app.post('/follow', async (req, res) => {
    const { username, vacationId } = req.body;
    const followingUser = await User.findOne({ where: { username } });

    try {
        await sequelize.sync();
        const follower = await Follower.create({
            following_user: followingUser.id,
            vacation: vacationId
        });
        res.send(follower);
    } catch (e) {
        console.error(e)
        res.send(e)
    }
})

// unfollow vacation
app.delete('/follow', async (req, res) => {
    const { username, vacationId } = req.body;
    const followerToRemove = await User.findOne({ where: { username } });

    try {
        await sequelize.sync();
        Follower.destroy({
            where: {
                [Op.and]: [
                    { vacation: vacationId },
                    { following_user: followerToRemove.id }
                ]
            }
        });
        res.send(follow);
    } catch (e) {
        console.error(e)
        res.send(e)
    }
})

// search vacations
app.get('/', async (req, res) => {
    const { startingDate, endingDate, searchTerm } = req.query;
    const conditions = [];

    if (searchTerm) conditions.push({ description: { [Op.like]: `%${searchTerm}%` } });
    if (startingDate && endingDate) {
        conditions.push({ starting_date: { [Op.between]: [startingDate, endingDate] } })
    } else if (startingDate) {
        conditions.push({ starting_date: { [Op.gte]: startingDate } })
    } else if (endingDate) {
        conditions.push({ starting_date: { [Op.lte]: endingDate } })
    };

    const foundVacations = await Vacation.findAll({
        where: {
            [Op.or]: conditions
        }
    })
    res.send(foundVacations)
})

// add vacation
app.post('/vacation', async (req, res) => {
    const { description, destination, image, startingDate, endingDate, price } = req.body;

    try {
        const uploadResponse = await cloudinary.uploader.upload(image);
        await sequelize.sync();
        const vacation = await Vacation.create({
            description,
            destination,
            image: uploadResponse.secure_url,
            starting_date: startingDate,
            ending_date: endingDate,
            price
        });
        res.send(vacation);
    } catch (err) {
        console.error(err);
        res.status(500).json({ err: 'Something went wrong' });
    }
})

// edit vacation
app.patch('/vacation', async (req, res) => {
    const { vacationId, description, destination, image, startingDate, endingDate, price } = req.body;
    const vacation = await Vacation.findOne({ where: { id: vacationId } });
    const uploadResponse = await cloudinary.uploader.upload(image);

    description && (vacation.description = description);
    destination && (vacation.destination = destination);
    image && (vacation.image = uploadResponse.secure_url);
    startingDate && (vacation.starting_date = startingDate);
    endingDate && (vacation.ending_date = endingDate);
    price && (vacation.price = price);

    try {
        await vacation.save();
        res.send(vacation);
    } catch (e) {
        console.error(e)
        res.send(e)
    }
})

// delete vacation 
app.delete('/vacation', async (req, res) => {
    const { vacationId } = req.body;

    try {
        await sequelize.sync();

        await sequelize.sync();
        Follower.destroy({
            where: { vacation: vacationId }
        });

        Vacation.destroy({
            where: { id: vacationId }
        });

        res.send({ message: "Vacation deleted" });
    } catch (e) {
        console.error(e)
        res.send(e)
    }
})

// Show vacations by followers
app.get('/vacations/graph', async (req, res) => {
    const graphData = [];
    const vacations = await Vacation.findAll({})

    for (let vacation of vacations) {
        const numberOfFollowers = await Follower.findAll({ where: { vacation: vacation.id } })

        if (numberOfFollowers.length > 0) {
            graphData.push({
                vacationId: vacation.id,
                vacationDestination: vacation.destination,
                vacationDescription: vacation.description,
                numberOfFollowers: numberOfFollowers.length
            })
        }
    }
    res.send(graphData)
})


app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.listen(port, () => {
    console.log('the server is listening on port 5000')
})
