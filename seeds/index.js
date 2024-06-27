const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');
 
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
 
const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/yelp-camp';
 
mongoose.connect(dbUrl, {
    useNewUrlParser    : true,
    useUnifiedTopology : true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 400; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '667cce25dbf296b1244b35bd',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!',
            price,
            geometry: {
                type: 'Point',
                coordinates: [cities[random1000].longitude,
                              cities[random1000].latitude
                            ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/ddbeant4h/image/upload/v1719202242/YelpCamp/hkf2fjxsol8gy8sv2zik.jpg',
                    filename: 'YelpCamp/hkf2fjxsol8gy8sv2zik',
                },
                {
                    url: 'https://res.cloudinary.com/ddbeant4h/image/upload/v1719202245/YelpCamp/ahmdblow3gqgbqyt5gqb.jpg',
                    filename: 'YelpCamp/ahmdblow3gqgbqyt5gqb',
                },
                {
                    url: 'https://res.cloudinary.com/ddbeant4h/image/upload/v1719202248/YelpCamp/emubn0hhdgaekgnho6uq.jpg',
                    filename: 'YelpCamp/emubn0hhdgaekgnho6uq',
                }
            ]
        })
        await camp.save();
    }
}

seedDB()
    .then(() => {
        mongoose.connection.close()
    })