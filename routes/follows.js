const express = require('express');
const router = express.Router();
const { User, Follower, sequelize } = require('../models');


// follow vacation
router.post('/', async (req, res) => {
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
router.delete('/', async (req, res) => {
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

module.exports = router;
