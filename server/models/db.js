// dependency
const mongoose = require('mongoose');

// connects to database
mongoose.connect(process.env.DATABASE_URI);
const db = mongoose.connection;

// Error and Success messagess
db.on('error', console.error.bind(console, 'conection error'));
db.once('open', () => console.log('Connected'));