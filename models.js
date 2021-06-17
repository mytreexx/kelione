const { Sequelize, Op, DataTypes } = require("sequelize");

const databaseUrl = process.env.CLEARDB_DATABASE_URL || 'mysql://root:@localhost:3306/vacations';

const sequelize = new Sequelize(databaseUrl); 

const testConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

testConnection();


const User = sequelize.define('User', {
    first_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    last_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    is_admin: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
}, {
    timestamps: false
});


const Vacation = sequelize.define('Vacation', {
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    destination: {
        type: DataTypes.STRING,
        allowNull: false
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false
    },
    starting_date: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    ending_date: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
}, {
    timestamps: false
});


const Follower = sequelize.define('Follower', {
    vacation: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    following_user: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
}, {
    timestamps: false
});


Follower.hasOne(User, { foreignKey: 'id', sourceKey: 'following_user' });
Follower.hasOne(Vacation, { foreignKey: 'id', sourceKey: 'vacation' });

module.exports = {
    sequelize,
    Op,
    User,
    Vacation,
    Follower
}
