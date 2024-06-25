const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');
mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '667517fac8de3fc0b17d58d0',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!',
            price,
            geometry: {
                type: 'Point',
                coordinates: [-113.13311532139778, 47.02007823890639]
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