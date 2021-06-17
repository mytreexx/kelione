const express = require('express');
const router = express.Router();

const { User, Vacation, Follower, Op, sequelize } = require('../models');
const { cloudinary } = require('../utils/cloudinary');


// show vacations
router.post('/', async (req, res) => {
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

// search vacations
router.get('/search', async (req, res) => {
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
router.post('/new', async (req, res) => {
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
router.patch('/', async (req, res) => {
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
router.delete('/', async (req, res) => {
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

// Show followd vacations for graph
router.get('/graph', async (req, res) => {
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


module.exports = router;