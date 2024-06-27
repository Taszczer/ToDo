const mongoose = require('mongoose');

const createDB = (dbname) => {
    return (
        mongoose.createConnection(`mongodb+srv://Taszczer:FAg0Q27SzJf7rxPr@database.4qapfqd.mongodb.net/${dbname}`, console.log(`${dbname} connected`))
    )
}

module.exports = createDB
// const connectDB = async () => {
//     try {
//         mongoose.set('strictQuery', false);
//         const conn = await mongoose.connect('mongodb+srv://Taszczer:FAg0Q27SzJf7rxPr@database.4qapfqd.mongodb.net/blog')
//         console.log('MongoDB Connected');
//     } catch (err) {
//         console.error(err.message);
//         process.exit(1);
//     }
// }

// module.exports = connectDB
