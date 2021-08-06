require('./env')
const mongoose = require('mongoose')


const mongodbUri = process.env.MAIN_DB_URI || 'mongodb://localhost:27017/whatsapp'
mongoose.connect(mongodbUri,
    {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
    }
).then(() => {
    console.log('Success to connect to main db');
}).catch((error) => {
    console.log(error.message);
})